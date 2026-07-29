"""Build the browser and device icons from the GS mark.

    python scripts/build-icons.py

The mark is set from myfonts/DrukWideBold.ttf rather than traced from a raster.
The supplied reference in brand/ is a 130x47 bitmap of the same letterforms:
same typeface, same proportions (2.77 against the font's 2.79), but scaling it
to 512px meant an eleven-fold upscale and visibly ragged edges. Setting the two
characters from the site's own display face gives the identical mark, crisp at
every size, and ties the icon to the typography rather than to a screenshot.

The mark is trimmed to its ink and composed onto a square white tile with
rounded corners, so the icon reads the same wherever it lands.

The tile is not decoration. A bare black mark on transparency vanishes against
dark browser chrome, and a mark on an opaque white rectangle shows as a hard
white block. The rounded tile is the only version that survives both.

Two details that matter more than they look:

  * The area outside the rounded corners is painted white *before* the alpha
    mask goes on. Downscaling samples neighbouring pixels, so leaving it dark
    would drag a grey fringe around the corners at 16 px.
  * The mask is drawn at 4x and averaged down, because PIL's rounded_rectangle
    draws hard-edged corners at 1x.

Apple deliberately gets an opaque square with no rounding: iOS applies its own
mask, and a pre-rounded icon is clipped twice.

Requires: pillow.
"""

from __future__ import annotations

import sys
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

REPO = Path(__file__).resolve().parent.parent
MARK_FONT = REPO / "myfonts" / "DrukWideBold.ttf"
MARK_TEXT = "GS"
# Large enough that the trimmed mark is always bigger than any icon it feeds,
# so every output is a downscale.
MARK_RENDER_SIZE = 400
APP = REPO / "app"

# Measured off the original square master: a 168px radius on a 1254px side.
CORNER_RATIO = 168 / 1254

# How much of the tile the mark is allowed to occupy. Pushed high because the
# wordmark is far wider than it is tall, and every pixel of height counts once
# the browser renders this at 16px.
MARK_EXTENT = 0.88

# Next's file conventions. app/icon.png and app/apple-icon.png become the
# <link> tags on their own; nothing has to be registered in layout.tsx.
ICON_SIZE = 512
ICON_COLOURS = 64
APPLE_SIZE = 180
FAVICON_SIZES = [16, 32, 48]

MASK_SUPERSAMPLE = 4
INK_THRESHOLD = 200


def rounded_mask(size: int) -> Image.Image:
    big = size * MASK_SUPERSAMPLE
    mask = Image.new("L", (big, big), 0)
    ImageDraw.Draw(mask).rounded_rectangle(
        (0, 0, big - 1, big - 1), radius=round(big * CORNER_RATIO), fill=255
    )
    return mask.resize((size, size), Image.LANCZOS)


def render_mark() -> Image.Image:
    """Set the two characters and crop to their ink, ignoring font side bearings."""
    font = ImageFont.truetype(str(MARK_FONT), MARK_RENDER_SIZE)
    pad = MARK_RENDER_SIZE
    canvas = Image.new("L", (MARK_RENDER_SIZE * 8, MARK_RENDER_SIZE * 3), 255)
    ImageDraw.Draw(canvas).text((pad, pad // 2), MARK_TEXT, font=font, fill=0)

    box = canvas.point(lambda v: 255 if v < INK_THRESHOLD else 0).getbbox()
    if box is None:
        raise SystemExit("nothing was drawn; check the font path")
    return canvas.crop(box).convert("RGBA")


def build_tile(mark: Image.Image, size: int) -> Image.Image:
    """Centre the mark on a white square, scaled to fit within MARK_EXTENT."""
    limit = size * MARK_EXTENT
    scale = min(limit / mark.width, limit / mark.height)
    w, h = max(1, round(mark.width * scale)), max(1, round(mark.height * scale))

    tile = Image.new("RGB", (size, size), (255, 255, 255))
    resized = mark.resize((w, h), Image.LANCZOS)
    tile.paste(resized, ((size - w) // 2, (size - h) // 2), resized)
    return tile


def main() -> int:
    if not MARK_FONT.exists():
        print(f"not found: {MARK_FONT}", file=sys.stderr)
        return 1

    mark = render_mark()
    print(f"  mark set in {MARK_FONT.name}: {mark.size[0]}x{mark.size[1]}")

    # Whichever of width or height binds first is the one that decides whether
    # the largest icon is a downscale. Checking height alone reports a false
    # alarm on a mark this wide.
    limit = ICON_SIZE * MARK_EXTENT
    if min(limit / mark.width, limit / mark.height) > 1:
        print("  note: the largest icon upscales the mark; raise MARK_RENDER_SIZE")

    APP.mkdir(exist_ok=True)

    # Rendered at each target size rather than resized from one big tile, so the
    # corner radius and the mark stay in proportion at every size.
    def tile_rgba(size: int) -> Image.Image:
        tile = build_tile(mark, size)
        tile.putalpha(rounded_mask(size))
        return tile

    tile_rgba(ICON_SIZE).quantize(colors=ICON_COLOURS, method=Image.FASTOCTREE).save(
        APP / "icon.png", optimize=True
    )

    # Opaque, unrounded: iOS rounds it itself.
    build_tile(mark, APPLE_SIZE).save(APP / "apple-icon.png", optimize=True)

    largest = max(FAVICON_SIZES)
    tile_rgba(largest).save(APP / "favicon.ico", sizes=[(s, s) for s in FAVICON_SIZES])

    for name in ("icon.png", "apple-icon.png", "favicon.ico"):
        p = APP / name
        print(f"  {name:16s} {p.stat().st_size / 1024:6.1f} kB")

    return 0


if __name__ == "__main__":
    raise SystemExit(main())

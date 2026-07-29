"""Build the browser and device icons from the GS mark in brand/.

    python scripts/build-icons.py

The master arrives as a flat RGB image: a white rounded square sitting on a
black field. Left alone it would show as a black tile in any dark browser
chrome, so this cuts the corners out properly.

Two things it does that a plain resize does not:

  * The area outside the rounded square is painted white *before* the alpha
    mask goes on. Downscaling samples neighbouring pixels, so leaving it black
    would drag a grey fringe around the corners at 16 px.
  * The mask is drawn at 4x and averaged down, because PIL's rounded_rectangle
    draws hard-edged corners at 1x.

Apple deliberately gets an opaque square with no rounding: iOS applies its own
mask, and a pre-rounded icon ends up with the corners clipped twice.

Requires: pillow.
"""

from __future__ import annotations

import sys
from pathlib import Path

from PIL import Image, ImageDraw

REPO = Path(__file__).resolve().parent.parent
SOURCE = REPO / "brand" / "gs-mark.png"
APP = REPO / "app"

# Measured off the master: the square is flush with the canvas and its corner
# radius is 168px on a 1254px side.
CORNER_RATIO = 168 / 1254

# Next's file conventions. app/icon.png and app/apple-icon.png become the
# <link> tags on their own; nothing has to be registered in layout.tsx.
ICON_SIZE = 512
ICON_COLOURS = 64
APPLE_SIZE = 180
FAVICON_SIZES = [16, 32, 48]

MASK_SUPERSAMPLE = 4


def rounded_mask(size: int) -> Image.Image:
    big = size * MASK_SUPERSAMPLE
    mask = Image.new("L", (big, big), 0)
    ImageDraw.Draw(mask).rounded_rectangle(
        (0, 0, big - 1, big - 1), radius=round(big * CORNER_RATIO), fill=255
    )
    return mask.resize((size, size), Image.LANCZOS)


def main() -> int:
    if not SOURCE.exists():
        print(f"not found: {SOURCE}", file=sys.stderr)
        return 1

    master = Image.open(SOURCE).convert("RGB")
    side = min(master.size)
    if master.size[0] != master.size[1]:
        print(f"warning: master is {master.size}, cropping to {side}x{side} square")
        master = master.crop((0, 0, side, side))

    mask = rounded_mask(side)

    # Paint the outside white so the corners have nothing dark to bleed from.
    flat = Image.new("RGB", master.size, (255, 255, 255))
    flat.paste(master, mask=mask)

    transparent = flat.copy()
    transparent.putalpha(mask)

    APP.mkdir(exist_ok=True)

    # The mark is three flat colours plus antialiasing, but the master is a
    # generated image carrying a full 24-bit range of near-identical whites.
    # Quantising throws that away and takes the icon from ~167 kB to a size
    # that belongs on a site this careful about its font budget.
    icon = transparent.resize((ICON_SIZE, ICON_SIZE), Image.LANCZOS)
    icon.quantize(colors=ICON_COLOURS, method=Image.FASTOCTREE).save(
        APP / "icon.png", optimize=True
    )

    # Opaque, unrounded: iOS rounds it itself.
    flat.resize((APPLE_SIZE, APPLE_SIZE), Image.LANCZOS).save(
        APP / "apple-icon.png", optimize=True
    )

    transparent.save(
        APP / "favicon.ico",
        sizes=[(s, s) for s in FAVICON_SIZES],
    )

    for name in ("icon.png", "apple-icon.png", "favicon.ico"):
        p = APP / name
        print(f"  {name:16s} {p.stat().st_size / 1024:6.1f} kB")

    return 0


if __name__ == "__main__":
    raise SystemExit(main())

"""Convert the licensed TTF/OTF sources in myfonts/ to WOFF2 for the web.

The originals stay in the repo as the masters; only the WOFF2 output is what the
browser downloads. Re-run after replacing or adding a source face:

    python scripts/build-webfonts.py

Requires: fonttools, brotli.
"""

from __future__ import annotations

import sys
from pathlib import Path

from fontTools.ttLib import TTFont

REPO = Path(__file__).resolve().parent.parent
SRC = REPO / "myfonts"
OUT = SRC / "webfonts"

# Only the faces the site actually references. Adding a weight to layout.tsx
# means adding it here too.
SOURCES = [
    SRC / "DrukWideBold.ttf",
    SRC / "OTF" / "Noirden-Light.otf",
    SRC / "OTF" / "Noirden-LightOblique.otf",
    SRC / "OTF" / "Noirden-Regular.otf",
    SRC / "OTF" / "Noirden-RegularOblique.otf",
    SRC / "OTF" / "Noirden-SemiBold.otf",
    SRC / "OTF" / "Noirden-SemiBoldOblique.otf",
    SRC / "OTF" / "Noirden-Bold.otf",
    SRC / "OTF" / "Noirden-BoldOblique.otf",
]


def main() -> int:
    missing = [p for p in SOURCES if not p.is_file()]
    if missing:
        for p in missing:
            print(f"missing source: {p.relative_to(REPO)}", file=sys.stderr)
        return 1

    OUT.mkdir(parents=True, exist_ok=True)
    before = after = 0

    for src in SOURCES:
        dst = OUT / (src.stem + ".woff2")
        font = TTFont(src)
        font.flavor = "woff2"
        font.save(dst)
        font.close()

        s, d = src.stat().st_size, dst.stat().st_size
        before += s
        after += d
        print(f"{src.name:<32} {s/1024:7.1f} KB  ->  {d/1024:7.1f} KB  "
              f"({100 - d / s * 100:4.1f}% smaller)")

    print(f"\ntotal {before/1024:.1f} KB -> {after/1024:.1f} KB "
          f"({100 - after / before * 100:.1f}% smaller)")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

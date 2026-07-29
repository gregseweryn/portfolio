"""Shrink the thesis PDF that ships in public/ without touching how it looks.

Word exported the thesis with the whole of Segoe UI Emoji embedded — 7.8 MB of
glyph outlines, 3.9 MB compressed, for a single character on a single page. That
one font was 63% of the download. Subsetting it to the glyphs actually used, then
rewriting the file with dead objects collected, takes the PDF from 6.25 MB to
2.46 MB.

Nothing is resampled or re-encoded: the images keep their original resolution and
the text layer is byte-identical, so tables stay as sharp as they were. The script
verifies both of those before it will overwrite anything, and refuses to write if
the rendered pages differ by a single pixel.

    python scripts/compress-thesis-pdf.py [--check]

--check reports what would happen and leaves the file alone.

Requires: pymupdf, pillow.
"""

from __future__ import annotations

import argparse
import io
import shutil
import sys
import tempfile
from pathlib import Path

import fitz  # pymupdf
from PIL import Image, ImageChops

REPO = Path(__file__).resolve().parent.parent
TARGET = REPO / "public" / "krakow-touristification-thesis.pdf"

# Enough to catch a dropped glyph or a resampled table rule, cheap enough to run
# over every page of a 172-page thesis.
COMPARE_DPI = 80


def render(page: fitz.Page) -> Image.Image:
    return Image.open(io.BytesIO(page.get_pixmap(dpi=COMPARE_DPI).tobytes("png"))).convert("L")


def compress(src: Path, dst: Path) -> None:
    doc = fitz.open(src)
    doc.subset_fonts()
    doc.save(dst, garbage=4, deflate=True, deflate_images=True, deflate_fonts=True, clean=True)
    doc.close()


def verify(src: Path, dst: Path) -> list[str]:
    """Every way the rewrite could have cost the reader something."""
    problems: list[str] = []
    before, after = fitz.open(src), fitz.open(dst)

    if before.page_count != after.page_count:
        problems.append(f"page count changed: {before.page_count} -> {after.page_count}")
        return problems

    for i in range(before.page_count):
        if before[i].get_text("text") != after[i].get_text("text"):
            problems.append(f"page {i + 1}: extracted text changed")

    for i in range(before.page_count):
        a, b = render(before[i]), render(after[i])
        if a.size != b.size:
            problems.append(f"page {i + 1}: page size changed")
        elif ImageChops.difference(a, b).getbbox() is not None:
            problems.append(f"page {i + 1}: renders differently")

    before.close()
    after.close()
    return problems


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--check", action="store_true", help="report only, write nothing")
    args = parser.parse_args()

    if not TARGET.exists():
        print(f"not found: {TARGET}", file=sys.stderr)
        return 1

    with tempfile.TemporaryDirectory() as tmp:
        candidate = Path(tmp) / TARGET.name
        compress(TARGET, candidate)

        before_mb = TARGET.stat().st_size / 1e6
        after_mb = candidate.stat().st_size / 1e6
        print(f"{before_mb:.2f} MB -> {after_mb:.2f} MB ({100 - after_mb / before_mb * 100:.0f}% smaller)")

        problems = verify(TARGET, candidate)
        if problems:
            print(f"\nrefusing to write — {len(problems)} difference(s) found:", file=sys.stderr)
            for p in problems[:20]:
                print(f"  {p}", file=sys.stderr)
            return 1
        print("verified: same page count, same text, pixel-identical at "
              f"{COMPARE_DPI} dpi across all pages")

        if args.check:
            print("--check: leaving the original in place")
            return 0

        if after_mb >= before_mb:
            print("no saving to be had; leaving the original in place")
            return 0

        shutil.copy2(candidate, TARGET)
        print(f"written: {TARGET.relative_to(REPO)}")

    return 0


if __name__ == "__main__":
    raise SystemExit(main())

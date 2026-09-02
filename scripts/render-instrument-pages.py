# -*- coding: utf-8 -*-
"""
Renders named pages of the thesis research instruments into public/work/thesis/.

The thesis study carries seven charts and no pictures of the research itself,
which leaves a reader to take on trust that there was an instrument behind the
numbers. These are that instrument.

WHAT MAY BE PUBLISHED, and why the list is short:

    yes   04_Narzedzia_badawcze/Kwestionariusz_ankiety_Google_Forms.pdf
          The blank questionnaire. No responses, no respondents.
    yes   04_Narzedzia_badawcze/scenariusz_IDI.docx
          The blank interview guide.
    no    01_Baza_danych/*, 07_Analiza_jakosciowa/*, 05_Aneksy_dodatkowe/Aneks_D*
          Raw responses, coded quotes and transcripts. These identify people.

The source folder is gitignored precisely because it holds respondent contact
details, so this script names its pages explicitly rather than walking a
directory: a loop over "every page" is how something that should not have been
published gets published.

Every page listed below was read before it was added. Page 22 of the
questionnaire is deliberately absent — it is the blank invitation asking a
willing respondent for contact details, and while it contains nobody's data, a
portfolio has no reason to reproduce a contact-collection form.

Usage: python scripts/render-instrument-pages.py
"""

import os
import sys

import fitz  # PyMuPDF

sys.stdout.reconfigure(encoding="utf-8")

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(ROOT, "Wszystkie aktualne pliki związane z pracą", "04_Narzedzia_badawcze")
OUT = os.path.join(ROOT, "public", "work", "thesis")

# 2x, matching the mockup captures, so every raster on the site is retina.
SCALE = 2

PAGES = [
    {
        "pdf": "Kwestionariusz_ankiety_Google_Forms.pdf",
        "page": 1,
        "out": "questionnaire-opening.png",
        "shows": "The screening question and the covering letter, as 446 people met them.",
        # Guards against the file being reordered under us: if the page no
        # longer contains this, the render is of something else.
        "expect": "Kilka pyta",
    },
    {
        "pdf": "Kwestionariusz_ankiety_Google_Forms.pdf",
        "page": 7,
        "out": "questionnaire-cost-block.png",
        "shows": "Items C3 and C4 — the cost block, including the statement that drew the strongest agreement in the whole questionnaire.",
        "expect": "ceny najmu",
    },
]

errors = []

for spec in PAGES:
    path = os.path.join(SRC, spec["pdf"])
    if not os.path.exists(path):
        errors.append("missing source: %s" % spec["pdf"])
        continue

    doc = fitz.open(path)
    index = spec["page"] - 1
    if index >= doc.page_count:
        errors.append("%s has %d pages, wanted %d" % (spec["pdf"], doc.page_count, spec["page"]))
        continue

    page = doc[index]
    text = " ".join(page.get_text().split())
    if spec["expect"] not in text:
        errors.append(
            "%s page %d no longer contains %r — the file changed, so nothing was written"
            % (spec["pdf"], spec["page"], spec["expect"])
        )
        continue

    os.makedirs(OUT, exist_ok=True)
    pix = page.get_pixmap(matrix=fitz.Matrix(SCALE, SCALE))
    target = os.path.join(OUT, spec["out"])
    pix.save(target)
    print("  %-34s %d x %d   %s" % (spec["out"], pix.width, pix.height, spec["shows"]))

if errors:
    print("\n%d problem(s):" % len(errors))
    for e in errors:
        print("  FAIL  %s" % e)
    sys.exit(1)

print("\n  wrote %d pages to public/work/thesis/" % len(PAGES))

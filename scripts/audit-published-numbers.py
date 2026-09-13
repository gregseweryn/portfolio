"""Final gate: audit every number in each case study's hand-written text.

Scope is deliberate. Numbers inside the SVGs and the screen-reader tables are
emitted from lib/data/*/*.json, which the extraction scripts already gate against
their sources. The risk this catches is different: a figure typed by hand into
prose, a caption or a stat row that drifted from the source.

Every study on the site needs an entry in STUDIES. A study with no entry is a
study whose numbers nobody is checking, which is the failure this file exists to
prevent.
"""
import re
import sys
from html.parser import HTMLParser
from pathlib import Path

sys.stdout.reconfigure(encoding="utf-8")

# Relative to this file, so the audit runs wherever the repo is checked out.
BUILD = Path(__file__).resolve().parent.parent / ".next" / "server" / "app" / "work"

SKIP_TAGS = {"script", "style", "svg"}


class Prose(HTMLParser):
    """Collects text, skipping scripts, SVGs and anything marked sr-only."""

    def __init__(self):
        super().__init__()
        self.parts = []
        self.depth = 0          # inside a skipped subtree
        self.stack = []

    def handle_starttag(self, tag, attrs):
        cls = dict(attrs).get("class", "")
        skip = tag in SKIP_TAGS or "sr-only" in cls
        self.stack.append(skip)
        if skip:
            self.depth += 1

    def handle_startendtag(self, tag, attrs):
        pass

    def handle_endtag(self, tag):
        if self.stack:
            if self.stack.pop():
                self.depth -= 1

    def handle_data(self, data):
        if self.depth == 0:
            self.parts.append(data)


# Values verified against the thesis; see lib/data/thesis/SOURCES.md.
THESIS = {
    # scope and sample
    "446", "10", "3", "6", "20.1", "2026",
    # context (chapter II)
    "14.7", "2024", "8", "42",
    # cost items (table 4.3)
    "88.1", "88", "76.8", "65.7", "4.39",
    # benefits (table 4.4)
    "2.87", "3.41", "2.59", "2.52",
    # institutions (table 4.6)
    "8.5", "5.0", "3.5",
    # short-term rental (table 4.5)
    "73.3",
    # districts (table 4.7)
    "3.04", "2.62", "2.57",
    # models (tables 4.8, 4.9)
    "428", "0.80", "80", "430", "68", "5.54", "5.5", "0.54", "1.45",
    "0.44", "2.43", "13.9", "17.8",
    # typology (table 4.10)
    "57.3", "57", "42.7", "43", "0.73", "92.5",
    # reliability (chapter III)
    "0.86", "0.92", "0.87", "0.72", "0.69",
    # promoter-directed subgroup test
    "29", "2", "0.35", "0.62", "0.12", "0.37", "0.26",
    # qualitative corpus
    "9", "11", "5", "172",
    # transcript paragraph references in quote attributions
    "17", "33", "45", "12", "20",
    # joint display (table 6.1): district means, effect sizes, p values
    "3.31", "3.77", "2.47", "3.93", "3.79", "2.79", "4.15", "3.81",
    "1.99", "2.24", "48.7", "0.177", "0.148", "0.189", "0.193", "0.28",
    # citations of thesis tables and figures, not data
    "4.3", "4.7", "4.8", "4.9", "4.10", "6.1",
    # ordered-list markers rendered by the list block
    "01", "02", "03", "04",
    # single digits left by tokenising "446", "14.7" etc. and ordinary prose
    "1", "4",
    # interview length, from the IDI protocol (scenariusz_IDI: "45-70 minut")
    "70",
    # part of the contact email address, not a finding
    "99",
}

# Portfolio Desk. Every figure traces to the project repository,
# github.com/gregseweryn/uxportfolio: the eighteen findings and their severities
# to docs/audit/heuristic-audit.md, the task times to docs/audit/klm-baseline.md
# and klm-after.md, the contrast pairs to docs/design/contrast-carbon.md, and the
# portfolio itself to the seeded snapshot recorded in docs/research/data-method.md.
#
# The contrast figures are the Carbon ones on purpose. contrast.md covers the
# earlier OKLCH screens, which are not the screens this study shows, and its
# numbers must not be copied here.
PORTFOLIO_DESK = {
    # --- the measured task times, before and after -----------------------
    "23.33", "2.66", "88.6",
    "13.35", "6.68", "50.0",
    "24.22", "11.96", "50.6",
    # the three tasks together, and the round trips they cost. "60" and "90"
    # appear separately because "60.90 s" tokenises on the decimal point; "90"
    # is also the name of the worst delinquency bucket, 90+ days.
    "60.90", "21.30", "65.0", "65", "8", "4", "90",
    # task 3 under its other two framings, where the redesign is slower
    "7.42", "61.2", "31.07", "28.3", "60",
    # the dropdown version the measurement killed
    "23.86",
    # --- the audited book ------------------------------------------------
    # seeded portfolio: loans, value, delinquent count and share, arrears
    "500", "568.7", "150", "30", "18.4",
    # the one product that dominates it, and the SBA term it follows
    "489", "120",
    # the saved view the first task uses, and the loans it returns
    "30", "79",
    # the loan the detail screens show
    "119", "94",
    # --- the audit -------------------------------------------------------
    # eighteen findings by severity: 2 catastrophic, 6 serious, 7 minor, 3 cosmetic
    "18", "2", "6", "7", "3",
    # the findings named in the text, and the report's column count
    "01", "02", "05", "06", "19",
    # --- research and method ---------------------------------------------
    # products compared, capabilities they were compared on
    "6", "5",
    # the reference date the portfolio is frozen at, and the model's viewport
    "1", "2026", "1440", "900",
    # contrast: pairs measured, pairs carrying a threshold, and the standard
    "42", "38", "2.2",
    # the SBA dataset
    "7",
    # ordinary prose, list markers and the year
    "0",
    # part of the contact email address in the footer, not a finding
    "99",
}

# The fourth field says whether the study is currently published. A published
# study with no built page is an error; an unpublished one is skipped. Nothing
# is held back right now, so every entry is published.
STUDIES = [
    ("portfolio-desk", PORTFOLIO_DESK,
     "figure recorded in the Portfolio Desk repository", True),
    ("krakow-touristification", THESIS, "verified thesis value", True),
]


def audit(slug, verified, source_label, published):
    path = BUILD / f"{slug}.html"
    if not path.exists():
        if not published:
            print(f"\n{slug}\n  held back from the site, nothing published to audit.")
            return 0
        print(f"{slug}: MISSING BUILD OUTPUT at {path}")
        return 1

    parser = Prose()
    parser.feed(path.read_text(encoding="utf-8"))
    text = re.sub(r"\s+", " ", " ".join(parser.parts))

    tokens = re.findall(r"\d+(?:\.\d+)?", text)
    unknown = {}
    for t in tokens:
        if t not in verified:
            m = re.search(r".{0,55}" + re.escape(t) + r".{0,30}", text)
            unknown.setdefault(t, m.group(0).strip() if m else "")

    print(f"\n{slug}")
    print(f"  numbers in hand-written text: {len(tokens)} ({len(set(tokens))} distinct)")
    print(f"  unaccounted for: {len(unknown)}")
    for v, ctx in sorted(unknown.items(), key=lambda kv: kv[0]):
        print(f"    {v:>7}   …{ctx}…")
    if not unknown:
        print(f"  every figure traces to a {source_label}.")
    return len(unknown)


total = sum(audit(*s) for s in STUDIES)
print(f"\nunaccounted across all studies: {total}")
sys.exit(1 if total else 0)

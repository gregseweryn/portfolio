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
    # download size of the thesis PDF, not a finding
    "2.5",
}

# Values measured on otodom.pl, 4 August 2026. Every figure below is reproduced
# by scripts/analyse-rental-audit.py from the saved dataset; run it if any of
# these need checking. Nothing here comes from user research, because none has
# been run.
RENTAL = {
    # --- scaled audit, 423 listings over six pages -----------------------
    "423", "397",
    # administrative rent not stated, and stated as zero
    "26", "6.1", "10",
    # administrative rent distribution, zl
    "537", "700", "856", "3100",
    # administrative rent as a share of the advertised price
    "22.4", "22",
    # a 3000 zl filter: returned, over budget, share
    "213", "139", "65.3", "65",
    # the same filter narrowed to two-room listings
    "85.2",
    # ranking disagreements. "76,335" and "5,219" tokenise on the comma,
    # which is why the halves appear here separately.
    "6.8", "76", "335", "5", "219",
    # the first-page figure the scaled audit corrected downwards
    "100",
    # the search and its result set
    "3000", "8", "2",
    # overshoot range and the worst case
    "17", "35", "2980", "4050",
    # admin rents observed across the eight listings
    "700", "1200", "400",
    # the listing whose headline price reverses the real order
    "2500", "4000", "6500",
    # cheapest real cost on the page, and the scenario budget
    "3500", "3800",
    # the estimate conventions, stated in the interface
    "300",
    # unit-price example quoted from a card
    "92", "59",
    # thesis figures referenced in the opening section
    "446", "88.1",
    # accessibility measurements
    "4.51", "4.57", "7", "375", "44",
    # audit date and study scale
    "2026", "4", "11", "6",
    # ordinary prose and list markers
    "1", "3", "01", "02", "03",
    # "0 of 8": nothing on the page fits a 3500 zl budget
    "0",
    # part of the contact email address in the footer, not a finding
    "99",
}

# Every figure below is re-derived by scripts/extract-synthetic-audit.py and read
# out of lib/data/synthetic/*.json at build time. Each group names the file and
# key it comes from, so a number can be traced without opening a chart component.
# Prose in this study is deliberately thin on hand-typed figures: one interpolated
# into a caption cannot drift from its data file, and the parser sees it either
# way, because figcaption is not a skipped subtree.
SYNTHETIC = {
    # distributions.json -> basePrice.measured {min, max, sd}
    "1880", "6000", "557",
    # distributions.json -> basePrice.generated {min, max, sd}
    "2450", "3300", "243",
    # distributions.json -> basePrice.scenarioBudget
    "3500",
    # impacts: basePrice.measured.sd / basePrice.generated.sd, 557/243
    "2.3",
    # distributions.json -> adminRent.measured {median, n}
    "700", "208",
    # distributions.json -> adminRent.generated {median, n}
    "780", "23",
    # distributions.json -> adminRent.shareAbove900 {measured, generated},
    # and the threshold the split is drawn at
    "15.4", "34.8", "900",
    # claims.json -> W1.reDerived {share, n, band, overshootMedian}
    "97", "101", "2500", "3000", "16.7",
    # claims.json -> W1.asNarrated {overshootLow, overshootHigh, n}
    "17", "35", "8",
    # claims.json -> W2.reDerived.share, cross-checked against the figure the
    # krakow-rental-search study publishes from the same file
    "6.8",
    # provenance.json -> auditRows, referenceN
    "423", "250",
    # the constant the generated corpus used for utilities in every listing,
    # constants.json -> variables[Utilities], and the two extreme administrative
    # rents it put into the comparison task, from oferty-uzyte.csv
    "300", "1200", "1250",
    # impacts: two generated variables with a standard deviation of zero
    "0",
    # audit date, study year, contents-bar section count, download weight
    "4", "2026", "7", "12",
    # part of the contact email address in the footer, not a finding
    "99",
}

STUDIES = [
    ("krakow-touristification", THESIS, "verified thesis value"),
    ("krakow-rental-search", RENTAL, "measured audit value"),
    ("synthetic-data-audit", SYNTHETIC,
     "value re-derived by scripts/extract-synthetic-audit.py"),
]


def audit(slug, verified, source_label):
    path = BUILD / f"{slug}.html"
    if not path.exists():
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

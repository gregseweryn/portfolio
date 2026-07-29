"""Final gate: audit every number in the case study's hand-written text.

Scope is deliberate. Numbers inside the SVGs and the screen-reader tables are
emitted from lib/data/thesis/*.json, which the extraction script already gates
against the printed thesis. The risk this catches is different: a figure I typed
by hand into prose, a caption or a stat row that drifted from the source.
"""
import re
import sys
from html.parser import HTMLParser
from pathlib import Path

sys.stdout.reconfigure(encoding="utf-8")

HTML = Path(r"C:\Users\grzeg\Documents\portfolio\.next\server\app\work\krakow-touristification.html")

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
VERIFIED = {
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
}

parser = Prose()
parser.feed(HTML.read_text(encoding="utf-8"))
text = re.sub(r"\s+", " ", " ".join(parser.parts))

tokens = re.findall(r"\d+(?:\.\d+)?", text)
unknown = {}
for t in tokens:
    if t not in VERIFIED:
        m = re.search(r".{0,55}" + re.escape(t) + r".{0,30}", text)
        unknown.setdefault(t, m.group(0).strip() if m else "")

print(f"numbers in hand-written text: {len(tokens)} ({len(set(tokens))} distinct)")
print(f"unaccounted for: {len(unknown)}")
for v, ctx in sorted(unknown.items(), key=lambda kv: kv[0]):
    print(f"  {v:>7}   …{ctx}…")
if not unknown:
    print("\nEvery figure traces to a verified thesis value.")

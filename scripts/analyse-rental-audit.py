# -*- coding: utf-8 -*-
"""
Recomputes every figure the rental case study publishes, from the saved audit.

The numbers were first calculated in the browser during collection. This script
exists so they do not have to be taken on trust: it reads the CSV on disk and
derives each published claim again. If a figure in
lib/studies/krakow-rental-search.ts disagrees with this output, the study is
wrong, not the script.

Source: otodom-cost-mockup/data/listings-audit-2026-08-04.csv
        423 listings, otodom.pl, Krakow rentals, pages 1-6, 4 August 2026.

Usage:
    python scripts/analyse-rental-audit.py
"""

import csv
import io
import os
import sys

sys.stdout.reconfigure(encoding="utf-8")

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CSV = os.path.join(ROOT, "..", "otodom-cost-mockup", "data", "listings-audit-2026-08-04.csv")


def q(values, p):
    s = sorted(values)
    if not s:
        return None
    i = (len(s) - 1) * p
    lo, hi = int(i), min(int(i) + 1, len(s) - 1)
    return round(s[lo] + (s[hi] - s[lo]) * (i - lo), 1)


def num(v):
    v = (v or "").strip()
    if v == "":
        return None
    try:
        return float(v)
    except ValueError:
        return None


with io.open(CSV, encoding="utf-8") as f:
    rows = [
        {"price": num(r["price"]), "admin": num(r["admin"]), "rooms": num(r["rooms"])}
        for r in csv.DictReader(f)
    ]
rows = [r for r in rows if r["price"] is not None]

with_admin = [r for r in rows if r["admin"] is not None]
missing = len(rows) - len(with_admin)
admins = [r["admin"] for r in with_admin]
shares = [r["admin"] / r["price"] * 100 for r in with_admin if r["price"]]

print(f"listings collected                {len(rows)}")
print(f"  administrative rent stated      {len(with_admin)}")
print(f"  not stated                      {missing}  ({missing / len(rows) * 100:.1f}%)")
print(f"  stated as zero                  {sum(1 for a in admins if a == 0)}")
print()
print("administrative rent, zl")
print(f"  min / Q1 / median / Q3 / max    {min(admins):.0f} / {q(admins, .25):.0f} / "
      f"{q(admins, .5):.0f} / {q(admins, .75):.0f} / {max(admins):.0f}")
print("administrative rent as % of the advertised price")
print(f"  Q1 / median / Q3                {q(shares, .25):.1f}% / {q(shares, .5):.1f}% / {q(shares, .75):.1f}%")
print()

# The central claim: a filter that matches on the advertised price returns
# listings the searcher cannot afford, and this quantifies how many.
print("what a price filter returns, and how much of it breaks the budget")
print("  budget   returned   over budget   share")
for b in (2500, 3000, 3500, 4000, 4500, 5000):
    ret = [r for r in with_admin if r["price"] <= b]
    over = [r for r in ret if r["price"] + r["admin"] > b]
    pct = f"{len(over) / len(ret) * 100:.1f}%" if ret else "n/a"
    print(f"  {b:>6}   {len(ret):>8}   {len(over):>11}   {pct:>6}")

# Closest comparison to the original single-page observation, which was a
# two-room search filtered to 3000 zl.
two = [r for r in with_admin if r["rooms"] == 2]
ret = [r for r in two if r["price"] <= 3000]
over = [r for r in ret if r["price"] + r["admin"] > 3000]
print()
print(f"two-room listings                 {len(two)}")
print(f"  returned by a 3000 zl filter    {len(ret)}")
print(f"  actually over 3000 zl           {len(over)}  ({len(over) / len(ret) * 100:.1f}%)")

# How often ordering by advertised price disagrees with ordering by real cost.
inv = pairs = 0
for i in range(len(with_admin)):
    a = with_admin[i]
    for j in range(i + 1, len(with_admin)):
        b = with_admin[j]
        ta, tb = a["price"] + a["admin"], b["price"] + b["admin"]
        if a["price"] == b["price"] or ta == tb:
            continue
        pairs += 1
        if (a["price"] < b["price"]) != (ta < tb):
            inv += 1
print()
print(f"comparable pairs                  {pairs}")
print(f"  ordered wrongly by price        {inv}  ({inv / pairs * 100:.1f}%)")

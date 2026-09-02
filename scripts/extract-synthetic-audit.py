# -*- coding: utf-8 -*-
"""
Aggregates the synthetic-data audit into the JSON the charts read.

Same contract as the retired scripts/extract-rental-data.py: this script is the
only thing allowed to write lib/data/synthetic/, it recomputes every published
number from the rawest column available, and it writes nothing at all if a
single check fails. A chart can then be trusted because the number behind it was
derived here, not copied from a spreadsheet that might have drifted.

Three corpora of three different evidence classes go in, and every number that
comes out carries the class it came from:

  measured    research/data/audyt/listings-audit-2026-08-04.csv
              423 listings read off otodom.pl on 4 August 2026. The arbiter.
  generated   research/data/testy/oferty-uzyte.csv + retest/retest-metryki.csv
              The corpus a language model produced for sessions that never ran.
  web-anchor  research/data/walidacja/zrodla-rynkowe.csv, via the reference set
              regenerated in-process from generuj-oferty-rynkowe.py. Covers only
              what the audit does not carry: utilities, deposit, commission.

Deliberately does NOT read research/data/walidacja/porownanie-ai-vs-rynek.csv or
oferty-rynkowe-syntetyczne.csv. Those are pre-computed outputs of the very
comparison this script exists to derive; reading them would make the
verification circular. The reference set is rebuilt by calling the generator's
generuj() with its recorded seed instead.

Usage:
    python scripts/extract-synthetic-audit.py          # verify + write
    python scripts/extract-synthetic-audit.py --check  # verify only, write nothing
    python scripts/extract-synthetic-audit.py --src DIR # verify against a copy
"""

import csv
import hashlib
import importlib.util
import io
import json
import os
import statistics as st
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, "lib", "data", "synthetic")

CHECK_ONLY = "--check" in sys.argv

# --src lets the fail-closed behaviour be demonstrated against a corrupted copy
# without touching the real inputs. A gate nobody has watched fail is a guess.
SRC = os.path.join(ROOT, "research", "data")
if "--src" in sys.argv:
    SRC = os.path.abspath(sys.argv[sys.argv.index("--src") + 1])

# The audit file is the arbiter, so its identity is pinned. A silent edit to the
# ground truth would invalidate every comparison on the page without any other
# check noticing.
AUDIT_SHA256 = "efd2ab2f0238e9342ce7c0456b0d026775da45436f38e8dc758075b943edd672"
AUDIT_ROWS = 423
AUDIT_COLUMNS = ["price", "admin", "rooms"]

# Recorded when the reference set was calibrated, in
# research/data/walidacja/raport-odchylen.md section 3. If the generator drifts,
# the reference set stops being the thing the report describes and the run stops.
REFERENCE_SEED = 20260902
REFERENCE_N = 250
REFERENCE_CALIBRATION = {
    "medianBasePrice": (2800, 0),      # exact: the tuning coefficient targets it
    "meanBasePrice": (2897, 25),
    "meanPricePerSqm": (66.8, 1.0),
    "meanFloorArea": (43.8, 0.5),
    "medianUtilities": (420, 20),
}

# Anchors that have no source at all. They are allowed to exist, but never to
# pass as measurements, so they are emitted with an explicit evidence class.
ASSUMPTION_ANCHORS = {"K-15", "K-16"}

errors = []
warnings = []


def fail(msg):
    errors.append(msg)


def read(rel):
    path = os.path.join(SRC, rel)
    if not os.path.exists(path):
        fail("missing input file: %s" % rel)
        return []
    with io.open(path, encoding="utf-8", newline="") as f:
        return list(csv.DictReader(f))


def num(row, key, ctx):
    raw = (row.get(key) or "").strip()
    if raw == "":
        return None
    try:
        return float(raw.replace(",", "."))
    except ValueError:
        fail("%s: %s is not a number (%r)" % (ctx, key, raw))
        return None


def pct(xs, q):
    s = sorted(xs)
    if not s:
        return None
    return s[min(len(s) - 1, int(q * len(s)))]


def spread(xs):
    """The five-number summary plus the standard deviation, which is the finding."""
    return {
        "n": len(xs),
        "min": round(min(xs)),
        "p10": round(pct(xs, 0.10)),
        "median": round(st.median(xs)),
        "p90": round(pct(xs, 0.90)),
        "max": round(max(xs)),
        "sd": round(st.pstdev(xs)),
    }


def histogram(xs, width, lo, hi):
    bins = []
    edge = lo
    while edge < hi:
        bins.append({"from": edge, "to": edge + width,
                     "n": sum(1 for x in xs if edge <= x < edge + width)})
        edge += width
    return bins


# --------------------------------------------------------------- load

audit_path = os.path.join(SRC, "audyt", "listings-audit-2026-08-04.csv")
audit = []
if not os.path.exists(audit_path):
    fail("missing the measured arbiter: audyt/listings-audit-2026-08-04.csv")
else:
    raw = io.open(audit_path, "rb").read()
    digest = hashlib.sha256(raw).hexdigest()
    if digest != AUDIT_SHA256:
        fail("audit file has changed: sha256 %s, expected %s" % (digest, AUDIT_SHA256))
    audit = read(os.path.join("audyt", "listings-audit-2026-08-04.csv"))
    if len(audit) != AUDIT_ROWS:
        fail("audit has %d rows, expected %d" % (len(audit), AUDIT_ROWS))
    if audit and list(audit[0].keys()) != AUDIT_COLUMNS:
        fail("audit columns are %s, expected %s" % (list(audit[0].keys()), AUDIT_COLUMNS))

offers = read(os.path.join("testy", "oferty-uzyte.csv"))
retest = read(os.path.join("retest", "retest-metryki.csv"))
anchors_rows = read(os.path.join("walidacja", "zrodla-rynkowe.csv"))

# The reference set is rebuilt from the generator's own code, not read back from
# the CSV it wrote. See the module docstring.
reference = []
gen_path = os.path.join(SRC, "walidacja", "generuj-oferty-rynkowe.py")
if not os.path.exists(gen_path):
    fail("missing the reference-set generator: walidacja/generuj-oferty-rynkowe.py")
else:
    spec = importlib.util.spec_from_file_location("generator_odniesienia", gen_path)
    generator = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(generator)
    if generator.ZIARNO != REFERENCE_SEED:
        fail("generator seed is %s, expected %s" % (generator.ZIARNO, REFERENCE_SEED))
    reference = generator.generuj(n=REFERENCE_N, ziarno=REFERENCE_SEED)


# --------------------------------------------------------------- measured arbiter

two_room = [r for r in audit if (r.get("rooms") or "").strip() == "2"]
m_price = [num(r, "price", "audit") for r in two_room]
m_price = [p for p in m_price if p is not None]
m_admin = [num(r, "admin", "audit") for r in two_room]
m_admin_present = [a for a in m_admin if a is not None]

if audit and len(two_room) < 100:
    fail("audit has only %d two-room listings, too few to be the arbiter" % len(two_room))
if len(m_price) != len(two_room):
    fail("audit: %d two-room rows have no price" % (len(two_room) - len(m_price)))


# --------------------------------------------------------------- generated corpus

# The eight-row table in research/01-problem.md is a MEASUREMENT, not model
# output: it is the first page of the same 4 August audit. It belongs to the
# arbiter and must never be counted as part of the generated corpus.
g_price, g_admin, g_utilities, g_deposit_mult, g_commission = [], [], [], [], []

for r in offers:
    ctx = "offer %s" % r.get("oferta_id")
    base = num(r, "cena_bazowa", ctx)
    adm = num(r, "czynsz_adm", ctx)  # empty for role C by design: the card omits it
    util = num(r, "media_szacowane", ctx)
    dep = num(r, "kaucja", ctx)
    fee = num(r, "prowizja", ctx)
    if base is not None:
        g_price.append(base)
        if dep is not None:
            g_deposit_mult.append(round(dep / base, 2))
    if adm is not None:
        g_admin.append(adm)
    if util is not None:
        g_utilities.append(util)
    if fee is not None:
        g_commission.append(fee)

for r in retest:
    ctx = "retest %s" % r.get("uczestnik_retest")
    base = num(r, "cena_bazowa", ctx)
    adm = num(r, "czynsz_adm", ctx)
    if base is not None:
        g_price.append(base)
    if adm is not None:
        g_admin.append(adm)

if not g_price or not g_admin:
    fail("generated corpus is empty; nothing to compare")


# --------------------------------------------------------------- anchors

anchors = {}
for r in anchors_rows:
    aid = (r.get("kotwica_id") or "").strip()
    if not aid:
        fail("anchor row with no kotwica_id")
        continue
    klasa = (r.get("klasa_dowodu") or "").strip()
    if not klasa:
        fail("%s: empty klasa_dowodu" % aid)
    evidence = "assumption" if aid in ASSUMPTION_ANCHORS else "web-anchor"
    if aid in ASSUMPTION_ANCHORS and klasa.upper() not in ("ZAŁOŻENIE", "ZALOZENIE"):
        fail("%s is on the assumption list but its klasa_dowodu reads %r" % (aid, klasa))
    anchors[aid] = {"id": aid, "variable": r.get("zmienna"), "evidence": evidence,
                    "sourceName": r.get("zrodlo"), "url": r.get("url")}

for aid in ASSUMPTION_ANCHORS:
    if aid not in anchors:
        fail("%s is required to be present and flagged, but is missing" % aid)


# --------------------------------------------------------------- reference calibration

if reference:
    got = {
        "medianBasePrice": st.median([r["cena_bazowa"] for r in reference]),
        "meanBasePrice": st.mean([r["cena_bazowa"] for r in reference]),
        "meanPricePerSqm": st.mean([r["cena_za_m2"] for r in reference]),
        "meanFloorArea": st.mean([r["metraz_m2"] for r in reference]),
        "medianUtilities": st.median([r["media_szacowane"] for r in reference]),
    }
    for key, (expected, tol) in REFERENCE_CALIBRATION.items():
        if abs(got[key] - expected) > tol:
            fail("reference set drifted: %s = %.1f, calibrated at %.1f (tolerance %.1f)"
                 % (key, got[key], expected, tol))


# --------------------------------------------------------------- payload

def row(key, label, unit, generated, ref, ground_truth, anchor_ids, note):
    """One comparison row. A row with no ground-truth class is a failure."""
    if ground_truth not in ("measured", "web-anchor"):
        fail("%s: ground truth is %r, must be measured or web-anchor" % (key, ground_truth))
    for aid in anchor_ids:
        if aid not in anchors:
            fail("%s cites anchor %s, which is not in zrodla-rynkowe.csv" % (key, aid))
    return {
        "key": key,
        "label": label,
        "unit": unit,
        "nGenerated": len(generated),
        "medianGenerated": round(st.median(generated)) if generated else None,
        "sdGenerated": round(st.pstdev(generated), 1) if generated else None,
        "nReference": len(ref),
        "medianReference": round(st.median(ref)) if ref else None,
        "sdReference": round(st.pstdev(ref), 1) if ref else None,
        "deviationPct": (
            round(100 * (st.median(generated) - st.median(ref)) / st.median(ref), 1)
            if generated and ref and st.median(ref) else None
        ),
        "groundTruth": ground_truth,
        "anchors": [anchors[a] for a in anchor_ids if a in anchors],
        "note": note,
    }


r_utilities = [r["media_szacowane"] for r in reference]
r_deposit_mult = [float(r["krotnosc_kaucji"]) for r in reference]
r_commission = [r["prowizja"] for r in reference]

deviations = [
    row("admin-rent", "Administrative rent", "zl", g_admin, m_admin_present, "measured", [],
        "The variable the whole project is about. The generated corpus sits above the "
        "measured median and puts far more weight in the expensive tail."),
    row("base-price", "Advertised rent", "zl", g_price, m_price, "measured", [],
        "The medians nearly agree. The spreads do not, and the spread is the finding."),
    row("utilities", "Utilities", "zl", g_utilities, r_utilities, "web-anchor", ["K-09", "K-10", "K-11"],
        "No measured ground truth exists: not one card in the audit stated utilities. "
        "The generated corpus used a single constant for every listing."),
    row("deposit", "Deposit, as a multiple of rent", "x", g_deposit_mult, r_deposit_mult, "web-anchor", ["K-12"],
        "No measured ground truth. The generated corpus applied the textbook rule to "
        "every listing without exception."),
]

# The commission row is deliberately NOT published as a bar. O-5 rests entirely
# on K-16, an assumption with no source, and a chart would give a guess the same
# visual weight as a measurement. It is emitted as data with its class attached
# so the limits section can cite it in prose.
commission_row = row("commission", "Agency commission", "zl", g_commission, r_commission,
                     "web-anchor", ["K-13", "K-16"],
                     "Rests on an assumed 45% share of agency listings, which has no source. "
                     "Reported in prose only, never drawn.")
commission_row["chartable"] = False
deviations.append(commission_row)

distributions = {
    "adminRent": {
        "measured": spread(m_admin_present),
        "generated": spread(g_admin),
        "binWidth": 100,
        "measuredBins": histogram(m_admin_present, 100, 0, 1500),
        "generatedBins": histogram(g_admin, 100, 0, 1500),
        "shareAbove900": {
            "measured": round(100 * sum(1 for a in m_admin_present if a > 900) / len(m_admin_present), 1)
                        if m_admin_present else None,
            "generated": round(100 * sum(1 for a in g_admin if a > 900) / len(g_admin), 1)
                         if g_admin else None,
        },
        "missingOnCard": {
            "measured": round(100 * (len(two_room) - len(m_admin_present)) / len(two_room), 1)
                        if two_room else None,
            "assumedInReference": round(100 * (1 - generator.UDZIAL_Z_CZYNSZEM_NA_KARCIE), 1)
                                  if reference else None,
        },
    },
    "basePrice": {
        "measured": spread(m_price),
        "generated": spread(g_price),
        "scenarioBudget": 3500,
    },
    "source": "Measured: 423-listing Otodom audit, 4 August 2026, two-room subset. "
              "Generated: the corpus produced for sessions that were never run.",
}

constants = {
    "variables": [
        {"variable": "Utilities", "unit": "zl",
         "uniqueGenerated": len(set(g_utilities)), "nGenerated": len(g_utilities),
         "sdGenerated": round(st.pstdev(g_utilities), 1) if g_utilities else None,
         "uniqueReference": len(set(r_utilities)), "nReference": len(r_utilities),
         "sdReference": round(st.pstdev(r_utilities), 1) if r_utilities else None,
         "groundTruth": "web-anchor"},
        {"variable": "Deposit, multiple of rent", "unit": "x",
         "uniqueGenerated": len(set(g_deposit_mult)), "nGenerated": len(g_deposit_mult),
         "sdGenerated": round(st.pstdev(g_deposit_mult), 2) if g_deposit_mult else None,
         "uniqueReference": len(set(r_deposit_mult)), "nReference": len(r_deposit_mult),
         "sdReference": round(st.pstdev(r_deposit_mult), 2) if r_deposit_mult else None,
         "groundTruth": "web-anchor"},
        {"variable": "Administrative rent", "unit": "zl",
         "uniqueGenerated": len(set(g_admin)), "nGenerated": len(g_admin),
         "sdGenerated": round(st.pstdev(g_admin), 1) if g_admin else None,
         "uniqueReference": len(set(m_admin_present)), "nReference": len(m_admin_present),
         "sdReference": round(st.pstdev(m_admin_present), 1) if m_admin_present else None,
         "groundTruth": "measured"},
        {"variable": "Advertised rent", "unit": "zl",
         "uniqueGenerated": len(set(g_price)), "nGenerated": len(g_price),
         "sdGenerated": round(st.pstdev(g_price), 1) if g_price else None,
         "uniqueReference": len(set(m_price)), "nReference": len(m_price),
         "sdReference": round(st.pstdev(m_price), 1) if m_price else None,
         "groundTruth": "measured"},
    ],
    "source": "Unique values and standard deviation per variable. Two rows have a measured "
              "arbiter; two rest on web anchors because the audit does not carry them.",
}


# --------------------------------------------------------------- claims, on the 423

def claims_payload():
    band = [r for r in two_room
            if num(r, "price", "W1") is not None and num(r, "admin", "W1") is not None
            and 2500 <= float(r["price"]) <= 3000]
    over = [r for r in band if float(r["price"]) + float(r["admin"]) > 3000]
    overshoot = [100 * (float(r["price"]) + float(r["admin"]) - 3000) / 3000 for r in over]

    under_filter = [r for r in two_room
                    if num(r, "price", "W1") is not None and num(r, "admin", "W1") is not None
                    and float(r["price"]) <= 3000]
    over_all = [r for r in under_filter if float(r["price"]) + float(r["admin"]) > 3000]

    # W2: every comparable pair, both members stating an admin rent.
    #
    # Counted on two populations, because the krakow-rental-search study already
    # publishes this figure over ALL listings. Publishing only the two-room
    # subset here would look like the two studies disagreeing when they are
    # simply counting different stock. The chart uses the all-listings figure so
    # the two pages match; the subset is carried alongside it.
    def inversion(rows_):
        pairs = [(float(r["price"]), float(r["price"]) + float(r["admin"]))
                 for r in rows_
                 if num(r, "price", "W2") is not None and num(r, "admin", "W2") is not None]
        total_ = inverted_ = 0
        for i in range(len(pairs)):
            for j in range(i + 1, len(pairs)):
                ai_, ar = pairs[i]
                bi, br = pairs[j]
                if ai_ == bi or ar == br:
                    continue
                total_ += 1
                if (ai_ < bi) != (ar < br):
                    inverted_ += 1
        return len(pairs), total_, inverted_

    listings_all, total, inverted = inversion(audit)
    listings_two, total_two, inverted_two = inversion(two_room)

    # The existing study publishes 5219 of 76335. If this ever stops matching,
    # one of the two pages is wrong and the reader has no way to tell which.
    if (total, inverted) != (76335, 5219):
        fail("W2 recomputed as %d of %d pairs; krakow-rental-search publishes 5219 of 76335"
             % (inverted, total))

    return {
        "W1": {
            "claim": "A 3000 zl price filter returns listings that cost more than 3000 zl",
            "asNarrated": {"share": 100.0, "overshootLow": 17, "overshootHigh": 35,
                           "n": 8, "note": "Eight listings from the top of the filter band"},
            "reDerived": {
                "band": "2500-3000 zl",
                "n": len(band),
                "share": round(100 * len(over) / len(band), 1) if band else None,
                "overshootMin": round(min(overshoot), 1) if overshoot else None,
                "overshootP10": round(pct(overshoot, 0.10), 1) if overshoot else None,
                "overshootMedian": round(st.median(overshoot), 1) if overshoot else None,
                "overshootP90": round(pct(overshoot, 0.90), 1) if overshoot else None,
                "overshootMax": round(max(overshoot), 1) if overshoot else None,
                "wholeFilterN": len(under_filter),
                "wholeFilterShare": round(100 * len(over_all) / len(under_filter), 1)
                                    if under_filter else None,
            },
            "verdict": "confirmed; the narrated range describes the upper half",
        },
        "W2": {
            "claim": "Ordering by advertised price reverses the ordering by real cost",
            "asNarrated": {"n": 1, "note": "Demonstrated on a single pair"},
            "reDerived": {"listings": listings_all,
                          "pairs": total,
                          "inverted": inverted,
                          "share": round(100 * inverted / total, 1) if total else None,
                          "twoRoomListings": listings_two,
                          "twoRoomPairs": total_two,
                          "twoRoomInverted": inverted_two,
                          "twoRoomShare": round(100 * inverted_two / total_two, 1) if total_two else None},
            "verdict": "confirmed, and rarer than one worked example suggests",
        },
        "W3": {
            "claim": "A missing administrative rent is indistinguishable from a zero one",
            "validatable": False,
            "reason": "A property of how the card renders absence, not a quantity in the "
                      "listing data. No count settles it.",
        },
        "source": "Re-derived on the 423-listing Otodom audit of 4 August 2026, two-room subset.",
    }


claims = claims_payload() if two_room else {}

payload = {
    "deviations.json": {"rows": deviations,
                        "source": "Generated corpus against its arbiter, one row per variable. "
                                  "Every row declares whether its reference is measured or anchored."},
    "distributions.json": distributions,
    "constants.json": constants,
    "claims.json": claims,
    "provenance.json": {
        "auditSha256": AUDIT_SHA256,
        "auditRows": AUDIT_ROWS,
        "auditTwoRoom": len(two_room),
        "referenceSeed": REFERENCE_SEED,
        "referenceN": REFERENCE_N,
        "referenceCalibration": {k: v[0] for k, v in REFERENCE_CALIBRATION.items()},
        "generatorCoefficients": {
            "districtPanelRescale": round(generator.KALIBRACJA, 4) if reference else None,
            "medianTuning": generator.DOSTROJENIE if reference else None,
        },
        "assumptionAnchors": sorted(ASSUMPTION_ANCHORS),
        "note": "The two generator coefficients are researcher choices, not measurements. "
                "They are published here so the reference set cannot be mistaken for data.",
    },
}


# --------------------------------------------------------------- report + write

print("checks run against %d audit rows (%d two-room), %d generated listings, %d anchors"
      % (len(audit), len(two_room), len(g_price), len(anchors)))

for w in warnings:
    print("  WARN  %s" % w)

if errors:
    print("\n%d CHECK(S) FAILED - nothing written:\n" % len(errors))
    for e in errors:
        print("  FAIL  %s" % e)
    sys.exit(1)

print("  all consistency checks passed")

if CHECK_ONLY:
    print("--check: no files written")
    sys.exit(0)

os.makedirs(OUT, exist_ok=True)
for name, data in payload.items():
    path = os.path.join(OUT, name)
    with io.open(path, "w", encoding="utf-8", newline="\n") as f:
        f.write(json.dumps(data, indent=2, ensure_ascii=False))
        f.write("\n")
    print("  wrote lib/data/synthetic/%s" % name)

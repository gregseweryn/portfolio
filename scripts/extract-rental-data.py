# -*- coding: utf-8 -*-
"""
Aggregates the rental-search fieldwork into the JSON the charts read.

Same contract as scripts/extract-thesis-data.py: this script is the only thing
allowed to write lib/data/rental/, it recomputes every published number from the
rawest column available, and it writes nothing at all if a single check fails.
A chart can then be trusted because the number behind it was derived here, not
copied from a spreadsheet that might have drifted.

Deliberately does NOT read research/data/analiza/*.csv. Those files contain
pre-computed results; re-deriving them from the session primitives is the whole
point, and reading them would make the verification circular.

Usage:
    python scripts/extract-rental-data.py          # verify + write
    python scripts/extract-rental-data.py --check  # verify only, write nothing
"""

import csv
import io
import json
import os
import sys
from collections import Counter

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(ROOT, "research", "data")
OUT = os.path.join(ROOT, "lib", "data", "rental")

CHECK_ONLY = "--check" in sys.argv

# The cost convention is a researcher's decision, not a fact from the listings,
# so it lives here in one place rather than being implied by arithmetic
# scattered through the file. Documented in research/data/README.
#   month 1 = base + admin rent + deposit + agency fee
#   month 2 = base + admin rent + utilities
COST_COMPONENTS = [
    ("czynsz_wlasciciela", "Rent to the owner"),
    ("czynsz_administracyjny", "Administrative rent"),
    ("kaucja", "Deposit"),
    ("media", "Utilities"),
    ("internet", "Internet"),
    ("prowizja", "Agency fee"),
]

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


def median(xs):
    s = sorted(xs)
    n = len(s)
    if n == 0:
        return None
    mid = n // 2
    return s[mid] if n % 2 else (s[mid - 1] + s[mid]) / 2.0


# --------------------------------------------------------------- load

sessions = read(os.path.join("testy", "metryki-sesji.csv"))
tasks = read(os.path.join("testy", "metryki-zadania-long.csv"))
offers_rows = read(os.path.join("testy", "oferty-uzyte.csv"))
retest = read(os.path.join("retest", "retest-metryki.csv"))
survey = read(os.path.join("ankieta", "ankieta-odpowiedzi.csv"))

# offers keyed by (session, role) so a session's chosen/A/B/C are addressable
offers = {}
for r in offers_rows:
    offers[(r["sesja"], r["rola"])] = r


# --------------------------------------------------------------- verify

def offer_cost(o, ctx):
    """Recompute both months from the listing's own components."""
    base = num(o, "cena_bazowa", ctx)
    adm = num(o, "czynsz_adm", ctx)  # None for role C: the listing omits it
    dep = num(o, "kaucja", ctx) or 0
    fee = num(o, "prowizja", ctx) or 0
    util = num(o, "media_szacowane", ctx) or 0
    if base is None or adm is None:
        return None, None
    return base + adm + dep + fee, base + adm + util


for s in sessions:
    u = s["uczestnik"]
    ctx = "session %s" % u

    chosen = offers.get((u, "wybrana_Z2"))
    if not chosen:
        fail("%s: no offer row with role wybrana_Z2" % ctx)
        continue

    if chosen["oferta_id"] != s.get("Z2_oferta_id"):
        fail("%s: Z2_oferta_id=%s but offers table has %s"
             % (ctx, s.get("Z2_oferta_id"), chosen["oferta_id"]))

    m1, m2 = offer_cost(chosen, ctx)
    for label, computed, stored_key in (("m1", m1, "Z3_rzeczywisty_m1"),
                                        ("m2", m2, "Z3_rzeczywisty_m2")):
        stored = num(s, stored_key, ctx)
        if computed is not None and stored is not None and abs(computed - stored) > 0.5:
            fail("%s: %s recomputed as %.0f but stored as %.0f"
                 % (ctx, stored_key, computed, stored))

    # The headline metric, re-derived. If this check ever fires, every number
    # in the case study built on it is wrong.
    for month in ("m1", "m2"):
        est = num(s, "Z3_oszacowanie_%s" % month, ctx)
        real = num(s, "Z3_rzeczywisty_%s" % month, ctx)
        stored = num(s, "Z3_blad_%s_zl" % month, ctx)
        if None in (est, real, stored):
            continue
        if abs(abs(est - real) - stored) > 0.5:
            fail("%s: Z3_blad_%s_zl stored as %.0f, |%.0f-%.0f| = %.0f"
                 % (ctx, month, stored, est, real, abs(est - real)))

    # Z4 asks which of A/B is cheaper per month. The task only tests the
    # hypothesis if B really is cheaper despite the higher headline price.
    a, b = offers.get((u, "A")), offers.get((u, "B"))
    if a and b:
        _, a_m2 = offer_cost(a, ctx + " offer A")
        _, b_m2 = offer_cost(b, ctx + " offer B")
        if a_m2 is not None and b_m2 is not None:
            if not (float(b["cena_bazowa"]) > float(a["cena_bazowa"]) and b_m2 < a_m2):
                fail("%s: offers A/B do not form a reversal, so Z4 does not test H3" % ctx)
            cheaper = "A" if a_m2 < b_m2 else "B"
            correct = "tak" if s.get("Z4_wskazal") == cheaper else "nie"
            if s.get("Z4_trafnie") != correct:
                fail("%s: Z4_trafnie=%s but %s is the cheaper offer and participant said %s"
                     % (ctx, s.get("Z4_trafnie"), cheaper, s.get("Z4_wskazal")))

    # Role C exists to test H4: it must be the listing with no admin rent.
    c = offers.get((u, "C"))
    if c and (c.get("czynsz_adm") or "").strip() != "":
        fail("%s: offer C has an admin rent, so Z5 does not test H4" % ctx)

    if s.get("Z1_czy_odjal") == "tak":
        budget = num(s, "Z1_budzet_scenariusza", ctx)
        filt = num(s, "Z1_kwota_filtra", ctx)
        cut = num(s, "Z1_ile_odjal", ctx)
        if None not in (budget, filt, cut) and abs((budget - cut) - filt) > 0.5:
            fail("%s: filter %.0f != budget %.0f - deduction %.0f" % (ctx, filt, budget, cut))

for r in retest:
    ctx = "retest %s" % r["uczestnik_retest"]
    base = num(r, "cena_bazowa", ctx)
    adm = num(r, "czynsz_adm", ctx)
    dep = num(r, "kaucja", ctx) or 0
    est = num(r, "Z3_oszacowanie_m1", ctx)
    stored_real = num(r, "Z3_rzeczywisty_m1", ctx)
    stored_err = num(r, "Z3_blad_m1_zl", ctx)
    if None not in (base, adm, stored_real):
        if abs((base + adm + dep) - stored_real) > 0.5:
            fail("%s: month 1 recomputed as %.0f, stored %.0f"
                 % (ctx, base + adm + dep, stored_real))
    if None not in (est, stored_real, stored_err):
        if abs(abs(est - stored_real) - stored_err) > 0.5:
            fail("%s: error stored as %.0f, recomputed %.0f"
                 % (ctx, stored_err, abs(est - stored_real)))

seq_seen = [(t["uczestnik"], t["zadanie"], t["SEQ"]) for t in tasks]
for u, z, v in seq_seen:
    if v.strip() and not (1 <= int(v) <= 7):
        fail("SEQ out of range: %s %s = %s" % (u, z, v))

# The long task table and the wide session table carry SEQ twice. They must agree.
for s in sessions:
    for z in ("Z1", "Z2", "Z3", "Z4", "Z5"):
        wide = (s.get("%s_SEQ" % z) or "").strip()
        long_ = [v for (u, zz, v) in seq_seen if u == s["uczestnik"] and zz == z]
        if wide and long_ and long_[0].strip() != wide:
            fail("%s %s: SEQ %s in session table, %s in task table"
                 % (s["uczestnik"], z, wide, long_[0]))

if len(sessions) != 6:
    warnings.append("expected 6 sessions, found %d" % len(sessions))
valid_survey = [r for r in survey if r.get("S1") == "Tak"]
if not (30 <= len(valid_survey) <= 50):
    warnings.append("survey has %d valid responses, plan says 30-50" % len(valid_survey))


# --------------------------------------------------------------- aggregate

def per_participant():
    out = []
    for s in sessions:
        out.append({
            "id": s["uczestnik"],
            "tenancy": s.get("S3_ktory_najem", ""),
            "outcome": s.get("S2_rezultat", ""),
            "filter": num(s, "Z1_kwota_filtra", ""),
            "budget": num(s, "Z1_budzet_scenariusza", ""),
            "deducted": s.get("Z1_czy_odjal") == "tak",
            "estimate": num(s, "Z3_oszacowanie_m1", ""),
            "actual": num(s, "Z3_rzeczywisty_m1", ""),
            "error": num(s, "Z3_blad_m1_zl", ""),
            "errorPct": num(s, "Z3_blad_m1_proc", ""),
            "z4Correct": s.get("Z4_trafnie") == "tak",
            "z5Noticed": s.get("Z5_zauwazyl_brak") == "tak",
            "components": [
                k for k, _ in COST_COMPONENTS
                if (s.get("Z3_uwzglednil_%s" % k) or "0").strip() == "1"
            ],
        })
    return out


people = per_participant()
errs1 = [p["error"] for p in people if p["error"] is not None]
errs2 = [num(r, "Z3_blad_m1_zl", "") for r in retest]
errs2 = [e for e in errs2 if e is not None]

summary = {
    "round1": {
        "n": len(errs1),
        "medianError": median(errs1),
        "minError": min(errs1) if errs1 else None,
        "maxError": max(errs1) if errs1 else None,
        "zeroError": sum(1 for e in errs1 if e == 0),
        "filterEqualsBudget": sum(1 for p in people if p["filter"] == p["budget"]),
        "z4Correct": sum(1 for p in people if p["z4Correct"]),
        "z5Noticed": sum(1 for p in people if p["z5Noticed"]),
    },
    "retest": {
        "n": len(errs2),
        "medianError": median(errs2),
        "minError": min(errs2) if errs2 else None,
        "maxError": max(errs2) if errs2 else None,
        "returning": sum(1 for r in retest if r.get("brał_udział_w_rundzie_1") == "tak"),
    },
    "source": "Moderated usability sessions, Otodom, Kraków. Round 1 n=%d, retest n=%d."
              % (len(errs1), len(errs2)),
}

component_counts = Counter()
for p in people:
    for c in p["components"]:
        component_counts[c] += 1

components = {
    "items": [
        {"key": k, "label": label, "count": component_counts.get(k, 0), "of": len(people)}
        for k, label in COST_COMPONENTS
    ],
    "source": "Cost components named unprompted in task Z3, n=%d." % len(people),
}

survey_fields = {}
for key in ("S7", "S8"):
    survey_fields[key] = dict(Counter(
        (r.get(key) or "").strip() for r in valid_survey if (r.get(key) or "").strip()
    ))

survey_out = {
    "n": len(valid_survey),
    "screenedOut": len(survey) - len(valid_survey),
    "distributions": survey_fields,
    "source": "Recruitment and quantification survey, Kraków rental seekers, n=%d." % len(valid_survey),
}

retest_people = [
    {
        "id": r["uczestnik_retest"],
        "returning": r.get("brał_udział_w_rundzie_1") == "tak",
        "estimate": num(r, "Z3_oszacowanie_m1", ""),
        "actual": num(r, "Z3_rzeczywisty_m1", ""),
        "error": num(r, "Z3_blad_m1_zl", ""),
        "z4Correct": r.get("Z4_trafnie") == "tak",
    }
    for r in retest
]

payload = {
    "summary.json": summary,
    "participants.json": {
        "people": people,
        "retest": retest_people,
        "source": summary["source"],
    },
    "cost-components.json": components,
    "survey.json": survey_out,
}


# --------------------------------------------------------------- report + write

print("checks run against %d sessions, %d retest rows, %d survey rows"
      % (len(sessions), len(retest), len(survey)))

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
    print("  wrote lib/data/rental/%s" % name)

# Provenance of the synthetic-data audit

Three corpora go into this study, and they are not equally trustworthy. This file records
which is which, so that no figure on the page can quietly borrow authority from a source
that does not have it.

Verified: 2 September 2026.

## The three corpora

### 1. Measured — the arbiter

`research/data/audyt/listings-audit-2026-08-04.csv`

423 listings read off otodom.pl on 4 August 2026: Kraków rentals, pages one to six.
Columns are `price`, `admin`, `rooms` and nothing else. Copied byte-for-byte from
`../otodom-cost-mockup/data/listings-audit-2026-08-04.csv`, which remains the origin of
record; the copy lives in this repository so the site build does not depend on a sibling
checkout existing.

Pinned by hash in `scripts/extract-synthetic-audit.py`:
`efd2ab2f0238e9342ce7c0456b0d026775da45436f38e8dc758075b943edd672`. A silent edit to the
ground truth would invalidate every comparison on the page without any other check noticing,
so the run stops if the digest moves.

Two-room subset: 220 listings, 208 of which state an administrative rent.

**Authoritative for:** advertised rent, administrative rent, the share of cards that omit
the administrative rent, and both re-derived claims in `claims.json`.

**Carries nothing about:** utilities, deposit, commission, floor area, district. Not one
card in the audit stated any of them.

### 2. Generated — the object under study

`research/data/testy/oferty-uzyte.csv` (24 listings) and
`research/data/retest/retest-metryki.csv` (5 listings)

The listing corpus a language model produced for moderated sessions that were never run.
Documented as generated rather than collected in `docs/HANDOFF-rental-study.md`, section
BLOKADA. It is cited here **only for its statistical properties** — medians, spreads, unique
value counts. None of its findings about people appear anywhere on the site.

**One exclusion matters.** The eight-row table in `research/01-problem.md` is a
*measurement*, not model output: it is the first page of the same 4 August audit. It belongs
to corpus 1 and is never counted as generated. An earlier draft of this comparison did count
it, which inflated the generated corpus's median administrative rent from 780 zl to 850 zl
and the reported deviation from +11% to +55%.

### 3. Web-anchored — the fallback reference

`research/data/walidacja/zrodla-rynkowe.csv` — 16 anchors, each with a URL, a date, a
population and an evidence class.

Used to build a 250-listing reference set for the three variables the audit does not carry.
The set is rebuilt inside the extraction script by calling `generuj()` from
`research/data/walidacja/generuj-oferty-rynkowe.py` with the recorded seed `20260902`, not by
reading the CSV that script writes. Reading its output would make the verification circular:
the script would be checking its own previous run instead of recomputing.

**Two anchors have no source at all** and are emitted with `evidence: "assumption"`, never
silently:

| Anchor | Assumed | Measured, once the audit was consulted |
|---|---|---|
| K-15 — share of cards omitting the administrative rent | 30% | **5.5%** |
| K-16 — share of agency listings | 45% | not measurable from the audit |

K-15 turned out to be wrong by a factor of five. It is left in the generator rather than
quietly corrected, because the reference set is evidence about what an unanchored assumption
does, and rewriting it after seeing the answer would destroy that evidence. The measured value
is what the page publishes.

## Researcher's choices, not measurements

The reference set carries two scaling coefficients, chosen by hand and published in
`provenance.json` so the set cannot be mistaken for data:

- `districtPanelRescale = 0.8779` — the six-district panel in the source over-represents the
  expensive centre, so its weighted mean (3161 zl) is scaled to the city mean anchor K-02.
- `medianTuning = 1.055` — after that rescale the panel hits the mean but not the median
  anchor K-01. Determined empirically.

Both are recorded in `research/data/walidacja/raport-odchylen.md` section 3, and the
extraction script re-checks that the regenerated set still reproduces that calibration table
before it writes anything.

## Field-by-field

| Output | File | Evidence class |
|---|---|---|
| `adminRent.measured`, `basePrice.measured` | `distributions.json` | measured |
| `adminRent.generated`, `basePrice.generated` | `distributions.json` | generated |
| `shareAbove900`, `missingOnCard.measured` | `distributions.json` | measured |
| `missingOnCard.assumedInReference` | `distributions.json` | assumption (K-15) |
| `admin-rent`, `base-price` rows | `deviations.json` | measured arbiter |
| `utilities`, `deposit` rows | `deviations.json` | web-anchor (K-09..K-13) |
| `commission` row | `deviations.json` | assumption (K-16), `chartable: false` |
| `W1`, `W2` | `claims.json` | measured |
| `W3` | `claims.json` | not validatable by counting |

The commission row is emitted as data but never drawn. It rests entirely on K-16, and a bar
would give a guess the same visual weight as a measurement.

## How to re-check

```bash
python scripts/extract-synthetic-audit.py --check
```

Writes nothing. To watch it fail closed, copy `research/data` to a scratch directory, change
one value in the audit CSV, and point the script at the copy with `--src`.

`W2` is cross-checked against the figure the `krakow-rental-search` study already publishes:
5,219 inverted orderings among 76,335 comparable pairs. If that stops matching, one of the two
pages is wrong and the extraction run fails rather than letting the reader guess which.

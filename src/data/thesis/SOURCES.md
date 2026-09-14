# Provenance of the thesis data

Every number the case study displays traces to the defended thesis. This file records
where each figure comes from, how it was checked, and the one place where the site
knowingly differs from the printed text.

Verified: 28 July 2026.

## Sources, in order of authority

1. `pracamagisterska_gseweryn.pdf` — the defended thesis. Authoritative for every
   published figure.
2. `07_Analiza_jakosciowa/Analiza_jakosciowa_zweryfikowana.docx` — qualitative themes,
   coding matrix and joint display. Its header states the material was reconciled with
   the final thesis; spot checks against chapters V–VI agree.
3. `01_Baza_danych/zbior_analityczny.csv` — the analytic dataset. Used to recompute
   distributions and confidence intervals that the printed tables do not carry.

**Not a source:** `03_Wyniki/agregaty/*.json`. Those files carry the status
`WYNIKI ROBOCZE — do potwierdzenia źródła danych` and were produced from an earlier
run. They disagree with the thesis on the interview pseudonyms (Ewa/Janina/Ryszard…
rather than Hanna/Stefania/Marian…), on C3 (4.21 vs 4.15), on C4 agreement
(88.9% vs 88.1%), on the regression sample sizes and on several odds ratios. Nothing
in `lib/data/thesis/` is derived from them.

## How the data was checked

`scripts/extract-thesis-data.py` recomputes everything from the analytic dataset and
compares it to values transcribed from the printed tables. It writes nothing unless
every check passes. As of the last run:

- 24 item means and 24 agreement percentages against tables 4.3–4.6 — all exact to 2 dp.
- 24 district means against table 4.7 — all exact to 2 dp.
- OLS: N = 428 and R² = 0.80 against table 4.8 — exact.
- Logit: N = 430, 68 events, and all nine odds ratios against table 4.9 — exact to 2 dp.
- Typology: shares, index means and move-out rates against table 4.10 — exact.

Re-run it after any change to the source folder:

```bash
python scripts/extract-thesis-data.py "<path to the thesis folder>"
```

## Where the site follows the thesis over the recomputation

**OLS β for perceived costs — published as −0.52, the value in the archived thesis.**

The reproduced model returns β = −0.5135, which would round to −0.51. N (428),
R² (0.8009) and every other coefficient reproduce exactly, so the difference is rounding
in the printed table rather than a different model, and nothing in the interpretation
changes — size, sign and significance are unaffected.

The thesis deposited in the Jagiellonian University APD repository is the version a
reader can actually check, and the case study links to it. Where the two disagree at
this level, the archived document wins: the site publishes −0.52.

`PUBLISHED_OVERRIDES` in the extraction script records this and still asserts that the
recomputed value lands within 0.01 of the published one, so a genuine change in the data
would break the gate rather than hide behind the override.

## File map

| File | Content | Source |
|---|---|---|
| `cost-items.json` | Block C items: means, agreement, full 1–5 distributions | Table 4.3 + dataset |
| `benefit-items.json` | Block D items, same shape | Table 4.4 + dataset |
| `registers.json` | District means for the city-wide vs graded contrast; ε² and p quoted from the thesis | Table 4.7 |
| `models.json` | OLS betas and logit odds ratios, both with 95% CIs recomputed from the dataset | Tables 4.8, 4.9 |
| `typology.json` | Cluster profiles plus 438 anonymised cost × benefit points | Table 4.10, figure 4.9 |
| `themes.json` | 11 themes × 10 interviewees, coded 0/1/2 | Verified qualitative analysis |
| `joint-display.json` | Integration of both strands, dimension by dimension | Table 6.1 |

## What is deliberately absent

Interview transcripts, the raw survey exports and respondent-level records are not in
this repository and must not be published. `typology.json` carries only two index values
and a cluster label per row — no identifier, no demographics — which cannot be linked
back to an individual.

# Charts, as standalone SVG

Exported from the built site by `scripts/extract-chart-svgs.mjs`. Drop a file straight
into Figma and it arrives as editable vector, with every colour already converted from
oklch to sRGB.

**Type is text, not outlines.** That is deliberate — an outlined chart cannot be edited,
which is the whole reason to export one. Figma will substitute a face for **Druk Wide**
and **Noirden** unless they are installed locally. Both are licensed commercially and
are not redistributable, so they are not shipped with these files.

Build: d1f99b7 · Exported: 2026-09-02

| file | size | from | what it says |
|---|---|---|---|
| `krakow-touristification-hero.svg` | 1000×470 | krakow-touristification | Three districts chosen as three phases of one process, positioned here by the cost index their residents actually reported. Old Town and Kazimierz land on top of each other; Podgórze sits apart, and expects to follow. |
| `cost-items.svg` | 1000×564 | krakow-touristification | Costs are led by money, not by nuisance. Agreement that tourism drives up rents reaches 88%, the highest-scoring statement in the questionnaire and the one with the least spread. |
| `registers.svg` | 1000×600 | krakow-touristification | Two registers, one process. Rent pressure, short-term rental and distrust of the city sit at the same level in all three districts. Noise and the sense of losing a home fan out sharply: Kazimierz at one end, Podgórze at the other. |
| `attitude-model.svg` | 1000×526 | krakow-touristification | Attitude is a balance sheet, not a demographic. Perceived costs and benefits carry the whole model; age, gender, tenure, occupation and ownership sit flat on zero. |
| `move-out-model.svg` | 1000×526 | krakow-touristification | Costs push far harder than benefits hold. A standard deviation more perceived cost multiplies the odds of seriously considering leaving by 5.5; owning your home roughly halves them. |
| `typology.svg` | 1000×660 | krakow-touristification | Two types, one axis. 57% sit in conflict and 43% reconciled, but the indices correlate at -0.73, so the clusters lie along a single diagonal. The typology names the poles of a continuum; it does not prove two separate populations exist. |
| `themes.svg` | 1000×704 | krakow-touristification | The coding trail, not just the conclusion. Every theme is shown against every interviewee, so the counts quoted in the text can be checked, including the one theme all ten raised and the demand for short-term rental regulation that nine of them brought up unprompted. |
| `variance-collapse.svg` | 1000×340 | synthetic-data-audit | Both sources agree on the middle and disagree about everything else. The measured listings run from 1880 to 6000 zl with a standard deviation of 557; the generated corpus spans 2450 to 3300 with a standard deviation of 243. The generated band is not a sample of the market. It is the neighbourhood of the 3500 zl budget the sessions were written around. |
| `admin-distribution.svg` | 1000×430 | synthetic-data-audit | Administrative rent above 900 zl a month is uncommon: 15.4% of the measured listings. In the generated corpus it is 34.8%, more than twice as often. The medians are close, 780 zl against 700, so the error is not in the middle of the distribution. It is in how often the model reached for the end of it. |
| `constants-not-distributions.svg` | 1000×400 | synthetic-data-audit | Across twenty-four generated listings, utilities took one value and the deposit took one value: 300 zl and one month&#x27;s rent, every time, with a standard deviation of exactly zero. The two variables the model did vary, it varied over a smaller vocabulary than the market uses. A constant is what a rule looks like when it is asked to stand in for a distribution. |
| `claim-survival.svg` | 1000×320 | synthetic-data-audit | The claim holds: 97% of the 101 audited listings priced between 2500 and 3000 zl cost more than 3000 zl once the administrative rent is added. The narrated range is where it slipped. 17–35% was read off 8 listings, and against the full band it runs from the median to the maximum. The typical overshoot is 16.7%, not 17%. |

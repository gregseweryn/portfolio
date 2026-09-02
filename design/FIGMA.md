# Building the Figma file

A build order for **Otodom rental cost — redesign**, the file someone could open,
understand and fork. Everything it needs already exists in this repository; nothing below
requires the Figma MCP, and the last section says what that server would make faster if it
ever reconnects.

## Scope, stated on the cover

This file covers **the Otodom redesign only**. It deliberately does not mirror the portfolio
site's own design system, for two reasons worth writing on the cover rather than discovering:

- the site's tokens are OKLCH and Figma variables are sRGB, so a mirror would be a lossy copy;
- its two typefaces, Druk Wide and Noirden, are licensed commercially and are not
  redistributable. They are in `.gitignore` for that reason and must not ship inside a shared
  file.

The site's system has exactly one source of truth, `app/globals.css`. A second copy in Figma
would be a second thing to keep in step, and the case study claims the two are the same system
expressed twice — a claim that only survives while there is one of them.

## What is already exported and ready to place

| Where | What | Notes |
|---|---|---|
| `design/charts/*.svg` | 11 charts as standalone SVG | Editable vector on import. Colours already converted from oklch to sRGB |
| `design/charts/index.md` | Each chart's caption, source and screen-reader table | The text that sits beside each frame |
| `public/work/rental/*.png` | 12 captures of the running prototype, 2x | States asserted at capture time |
| `public/work/rental/stimuli/*.png` | 4 comprehension-test stimuli | Copied verbatim, not re-rendered |
| `public/work/rental/CAPTURES.md` | Per-capture provenance | URL, viewport, asserted DOM state, source hash, Chromium version |
| `../otodom-cost-mockup/tokens.css` | The token source | Variables and text styles below are transcribed from it |

Regenerate the SVGs after any chart change with `npm run build && node scripts/extract-chart-svgs.mjs`.

---

## 1. Variables — collection `Tokens`

One collection, **one mode**. The code has no dark mode; inventing one here would create a
design the product does not have.

**`color/neutral/`** — `0 #ffffff` · `50 #f7f8f9` · `100 #eef0f2` · `200 #dfe3e7` ·
`400 #9aa3ac` · `600 #5b6570` · `900 #1a1f24`

**`color/primary/`** — `600 #0f766e` · `50 #ecf9f8`

**`color/known/`** — `600 #0e5d2d` · `50 #dcfce7`

**`color/unknown/`** — `600 #833c06` · `50 #fef3c7`

The two semantic 600s carry darkened values from a contrast pass — badge labels moved from
4.5:1 to 7.2:1. Do not "correct" them back toward the brighter originals.

**`space/`** — `1 4` · `2 8` · `3 12` · `4 16` · `5 20` · `6 24` · `8 32` · `10 40` · `12 48`

**`radius/`** — `sm 4` · `md 8` · `lg 12` · `pill 999`

## 2. Text styles

Face: **Inter**, which the mockup now self-hosts, so the file and the code are set in the same
thing. Names match the CSS classes.

| Style | Size / line | Weight | Tracking |
|---|---|---|---|
| `t-display` | 32 / 38 | 700 | −0.4 |
| `t-h24` | 24 / 30 | 600 | −0.2 |
| `t-h20` | 20 / 26 | 600 | −0.2 |
| `t-price28` | 28 / 32 | 700 | −0.4 |
| `t-price22` | 22 / 26 | 700 | −0.2 |
| `t-body` | 15 / 22 | 400 | — |
| `t-body-str` | 15 / 22 | 600 | — |
| `t-small` | 13 / 18 | 400 | — |
| `t-label` | 11 / 14 | 500 | +0.6, uppercase |

## 3. Components

Every fill bound to a variable, every padding bound to `space/*`. Build these before any
screen: the screens are assemblies, and pasting rectangles now means rebuilding them later.

| Component | Variants | Notes |
|---|---|---|
| `Card / Listing` | `state = current \| redesigned` × `cost = known \| partial` × `budget = within \| over` | Text properties for title, district, tags, seller |
| `Badge` | `type = known \| unknown` | Bound to `color/known/*` and `color/unknown/*` |
| `Cost block` | `known \| partial` | Partial renders "from X zl" |
| `Panel / Cost rows` | panel `Co miesiąc \| Pierwszy miesiąc`; row `normal \| gap \| sum` | The `gap` row is the "not stated" line |
| `Empty state` | — | The dashed panel |
| `Budget control` | `default \| focus` | |
| `Group header` | — | "Nie można ustalić kosztu (n)" |

**Label the `budget = over` variant "not reachable in the prototype".** Its CSS exists but
`render()` filters over-budget listings before drawing them, so no screenshot of it exists and
none was manufactured to fill the gap. A variant that quietly implies otherwise would be the
same error the study is about.

## 4. Pages

**`Screens`** — before; after at 3500, 4100 and 5000; listing a1, a8 and b1. At 375 and 720
wide. **Assembled from the components above**, not pasted PNGs — this is the page a person
forks.

**`Captures`** — the twelve PNGs, with a standing note: *the HTML is the source of truth; this
file mirrors it.* The prototype was built as working code, and the case study says so; the
Figma file must not present itself as its origin.

**`Charts`** — the eleven SVGs, one frame each, titled with the chart id, with its caption and
source line from `index.md` alongside. Add the note that **Druk Wide and Noirden will be
substituted** unless installed locally, and that this is expected.

**`Cover`** — 1920 × 960:
- what it is, and what it is not: an independent concept, not an Otodom product, no logo or
  brand use;
- provenance: 423 listings measured on otodom.pl, 4 August 2026;
- the mockup and FigJam URLs recorded in `../otodom-cost-mockup/README.md`;
- how to fork it: which page is the source of truth for what, and the note that the portfolio
  site's own system is not mirrored here and lives in `app/globals.css`.

## 5. What the Figma MCP would change

Nothing above needs it. If `use_figma` reconnects it removes the tedious parts, in this order:

1. generate the variable collection directly from `tokens.css` — about forty hand
   transcriptions, and forty chances to mistype a hex;
2. bulk-create the `Card / Listing` variant matrix;
3. bind properties programmatically instead of by hand.

At the time of writing the connected Figma server exposes only shader and generative-plugin
tools — no `use_figma`, `create_new_file`, `generate_diagram`, `get_screenshot` or
`upload_assets` — and `figma-desktop` refuses the connection. Load the `figma:figma-use` skill
before the first `use_figma` call if that changes; skipping it causes failures that are hard to
diagnose from the error alone.

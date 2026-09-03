# Audit — the rental study's screens and the system behind them

Scope: everything case study 2 ships as design. The prototype in `../../otodom-cost-mockup`
(`tokens.css`, `before.html`, `after.html`, `listing.html`), the React component library in
that repository's `src/`, the generated screen kit in `otodom-screen-kit/`, the Figma build
order in `FIGMA.md`, and the claims the published study makes about all of it in
`lib/studies/krakow-rental-search.ts`.

Measured 3 September 2026 in Chromium at 320, 375 and 900 px wide, against the prototype
served by `serve.py` on port 3300. Numbers below are readings, not estimates.

## Health score

| # | Dimension | Score | Key finding |
|---|---|---|---|
| 1 | Accessibility | 2/4 | The React library silently drops every state rule: pressed, hover, focus, and the reduced-motion override |
| 2 | Performance | 3/4 | Static, self-hosted subset font, but the whole result list is re-rendered through `innerHTML` on every keystroke |
| 3 | Responsive | 3/4 | Zero horizontal scroll at 320, 375 and 900; one breakpoint, and a panel gap that does not do what its `calc()` says |
| 4 | Theming | 3/4 | Tokens are used nearly everywhere; one off-token hover colour, one inline style, no semantic layer, no motion tokens |
| 5 | Anti-patterns | 4/4 | No AI tells. Restrained, purposeful, and the card list is the right affordance for a listings product |
| **Total** | | **15/20** | **Good — address accessibility and the library's extraction gate** |

## Anti-patterns verdict: pass

No gradient text, no glassmorphism, no hero-metric block, no eyebrow scaffolding, no
side-stripe accents, no bounce easing. The palette is a real product palette with two
semantic pairs that carry meaning (`known` / `unknown`) rather than decoration. The one
easing curve in use is `cubic-bezier(0.22, 1, 0.36, 1)` — ease-out-quart, correct.

The restraint is load-bearing here rather than timid: both builds deliberately share one
stylesheet so the only variable between them is the structure of the cost information.

## Findings

### P1 — the component library ships without its state rules

**Location**: `otodom-cost-mockup/scripts/extract-styles.mjs`, the `NEEDED` map and the
selector matcher; consequence in `src/styles.css` and `dist/index.css`.

The extractor keeps a rule only when one of its comma-separated selectors is *exactly* a
string in `NEEDED`. Every state selector is therefore dropped, silently, because none of them
is a bare class:

| Dropped rule | Consequence in the library |
|---|---|
| `.filter-chip[aria-pressed="true"]` | `FilterBar` renders active filters identical to inactive ones — state conveyed by nothing at all |
| `.card:hover`, `.card:focus-within` | No hover or keyboard affordance on a result |
| `.budget-input:hover`, `.budget-input:focus-visible` | The field's own focus treatment is gone (the global ring in `tokens.css` still applies) |
| `.btn--primary:hover`, `.btn--ghost:hover` | Buttons do not respond to the pointer |
| `.row:first-child { border-top: 0 }` | Doubled rule at the top of every panel list |
| `@media (prefers-reduced-motion: reduce)` | `.btn` keeps its 160 ms transition with **no** reduced-motion alternative — the project's own non-negotiable rule, broken in the published package |

`grep -c ":hover\|:focus\|@media\|aria-pressed" src/styles.css` returns `0`.

The gate in that script fails closed on a *missing class* and open on a *missing state*, which
is the worse of the two failure modes: a component whose class resolves to nothing looks
broken, a component that has lost its focus ring looks finished.

**Recommendation**: extend `NEEDED` to name the states each component owns, and match on
selector *prefix* (`.card:hover` belongs to whoever owns `.card`) so an at-rule group and a
state rule ride along with their base. Keep the fail-closed gate, and extend it: a component
that declares a transition and has no reduced-motion counterpart should stop the build.

### P1 — the published "touch targets at 44 px" claim is false

**Location**: `lib/studies/krakow-rental-search.ts:372`; mirrored in
`otodom-cost-mockup/README.md` ("cele dotykowe: przyciski 44 px i więcej") and asserted
against in `src/components/FilterBar.tsx`'s doc comment ("below the 44 px minimum the
redesign holds itself to").

Measured, at 320 px:

| Control | Size | 
|---|---|
| `.btn` (both, `listing.html`) | 115 × 70, 161 × 70 ✓ |
| `.budget-input` (`after.html`) | 84 × **43** |
| `.back` link (`listing.html`) | 168 × **38** |
| `.filter-chip` (`before.html`, reconstruction) | 73 × **37** |

All clear WCAG 2.2 AA's 24 px minimum, so nothing here fails a standard. What fails is the
sentence: the redesign's own primary control is 43 px, and the study says 44. On a portfolio
whose argument is that every published number can be checked against its source, this is the
most expensive kind of defect — small, true-sounding, and checkable in thirty seconds.

**Recommendation**: pick one. Either raise `min-height` to 44 px on `.budget-input` and
`.back` and make the claim true, or restate the claim as "44 px on the primary actions,
24 px minimum elsewhere". Raising the two is the better story — but it changes pixels, so it
requires `npm run capture:mockup` and `npm run build:kit` afterwards, and twelve published
screenshots change with it.

### P2 — `after.html` has no `h1`, and its headings run backwards

**Location**: `otodom-cost-mockup/after.html`.

The document outline reads `h3, h3, … h2, h3, h3, h3` — the result cards' titles precede the
group heading in the DOM, and no `h1` exists at all. `before.html` gets this right
(`h1` on the results heading, `h2` per card).

The redesign's page title is doing real work — "Wyniki wyszukiwania" is what tells a screen
reader user which of the two screens they are on — and it is not in the document.

**Recommendation**: add the results `h1` that `before.html` already has (the pair should not
differ in anything but cost structure), and demote the group heading's siblings so the order
climbs.

### P2 — the live region re-announces on every keystroke

**Location**: `after.html`, `#summary` (`role="status"`, `aria-live="polite"`), re-rendered
from the `input` event.

Typing `4100` into the budget field fires four renders and four announcements, three of them
about budgets the user is passing through rather than choosing. The number arrives
character by character, so an assistive-technology user hears "0 of 8 … 0 of 8 … 5 of 8".

**Recommendation**: debounce the announcement (not the render) by ~400 ms, or announce on
`change` while rendering on `input`.

### P2 — React and HTML disagree, in a library that says they cannot

**Location**: `otodom-cost-mockup/src/components/`.

The library's own entry comment says a screen built from these components and a screenshot
from the prototype "cannot disagree". Three places where they do:

- `BudgetControl` has no `aria-describedby`; the prototype's input points at
  `#budget-scope`. The scope sentence is also worded differently in the two ("Liczymy
  wszystko: …" vs "Kwota obejmuje …").
- `Panel` renders `<section>` with no `aria-labelledby`; the prototype names both panels.
- `PanelRow` emits the literal string `SZACUNEK` where the prototype emits `szacunek` and
  uppercases it in CSS. Some screen readers spell out all-caps words.

**Recommendation**: bring the three back into line, and add the parity check the library
implies — render each component to HTML and diff the attribute set against the prototype's
node.

### P2 — `ListingCard`'s `over` state is a contrast failure waiting to be used

**Location**: `src/components/ListingCard.tsx` (`over` prop), `.over { opacity: 0.55 }`.

Not reachable in the prototype — `render()` filters over-budget listings before drawing them,
which the code, `screens.md` and `FIGMA.md` all say plainly, and no screenshot was
manufactured for it. But it *is* reachable in the library, and at 0.55 opacity the card's
`--color-neutral-600` body text lands near 2.4:1 against white. The one exported state that
was never measured is the one that fails.

**Recommendation**: either delete the prop until a screen needs it, or re-specify the dimming
as a background and border change with text held at full strength, then measure it.

### P3 — theming leaks

- `listing.html`: `.btn--primary:hover { background: #0b5d57 }` — the only colour in the
  system not coming from a variable. It wants a `--color-primary-700`.
- `listing.html`: `<div style="padding: 0 var(--space-4);">` — an inline style attribute doing
  a class's job.
- Motion is hard-coded twice (`180ms` in `after.html`, `160ms` in `listing.html`, same curve).
  Two durations, one easing, no tokens.
- `--color-neutral-600` carries five unrelated roles (secondary text, labels, disabled-ish
  values, borders on ghost buttons, the estimate marker). The raw scale is fine; what is
  missing is a semantic layer naming those roles, which is also what a Figma variable
  collection wants.

### P3 — the panel gap does not do what it says

**Location**: `listing.html`, `.panel + .panel { margin-top: calc(var(--space-4) * -1 + var(--space-6)) }`.

The computed value is 8 px, which then collapses against the previous panel's 16 px bottom
margin. Measured gap between the two panels: **16 px**. The intended 24 px never happens, and
the `calc()` reads as though it were carefully derived.

### P3 — documentation drift

`public/work/rental/CAPTURES.md` says "The mockup is not a git repository, so the hash above
stands in for a commit." It has been one since 2 September (three commits). The mockup's own
README already records this; the captures file has not caught up.

## Systemic patterns

1. **Generated artifacts are trusted more than they have earned.** The screen kit, the
   extracted stylesheet and the captures are all machine-produced from the prototype, which is
   the right architecture — but two of the three gates only check what is easy to check. The
   extraction gate misses states; the capture gate misses everything that is not a pixel.
2. **The claims are ahead of the measurements in exactly one place** (44 px) and behind them
   nowhere. The habit is sound; one sentence outran it.
3. **There is no written visual system.** Tokens exist in three places (`tokens.css`,
   `tokens.md`, `FIGMA.md`), each a transcription of the first, and none of them states the
   rules — when a badge is used, what the two semantic pairs mean, why there is no elevation
   scale, what the motion budget is. The component doc comments carry that reasoning today,
   which means it is only visible to somebody reading the source.

## What is working

- **Contrast is genuinely clean.** Every text/background pair on all three pages, measured at
  320 px, clears its threshold. The two semantic 600s were darkened deliberately and the
  reason is written down in three places so nobody "corrects" them back.
- **Zero horizontal scroll** at 320, 375 and 900 px, on all three pages.
- **The refusal to invent states.** `screens.md` lists only states the prototype reaches, and
  says so; the unreachable `over` card is labelled rather than screenshotted. That discipline
  is rarer than the design work it protects.
- **One stylesheet across both builds**, which is what makes the before/after comparison mean
  anything.
- **`.est` separated in the content, not by margin**, so a screen reader does not read
  "MediaSZACUNEK" — a detail almost nobody catches.
- **Self-hosted variable Inter, one file per subset, `latin-ext` included.** Correct, and
  correct for the reason stated: the screenshots and the Figma frames now share a face.

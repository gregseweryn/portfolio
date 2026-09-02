# Screens, and every state each one reaches

Generated from the mockup's own markup. A state that is not listed here is a state the
prototype cannot be put into by using it — and building a screen for one would be drawing
an artifact to fit the story rather than showing the thing.

Device frame: **375 × 812**, which is the study's stated context. Captures are 2x.

## 1. Current state — search results (`before.html`)

One screen, no interaction. The filter chips are decorative: `aria-pressed` with no handler.
Renders all 8 of search A and never renders search B, so **there is no
current-state screen showing a listing whose cost cannot be derived.** That case exists only
in the redesign and in the detail view. Do not invent one.

Each card: base rent as the headline (`t-price22`), administrative rent demoted to a grey
second line (`t-small`), then title, address, tags, seller. Nothing adds the two together.

Reference: `public/work/rental/before-top.png`, `before-three.png`, `before-card-a8.png`.

## 2. Redesign — search results (`after.html`)

One screen, parameterised by a budget input: min 500, max 20000, step 100, default 3500.
Re-renders on every input event. Reachable states, computed from the listing data:

| Budget | Result | Summary line |
|---|---|---|
| 3500 zl | 0 of 8 | **0 z 8** ofert mieści się w 3500 zł. Najtańsza: 3800 zł. |
| 4100 zl | 5 of 8 | **5 z 8** ofert mieści się w 4100 zł miesięcznie. |
| 5000 zl | 8 of 8 | **8 z 8** ofert mieści się w 5000 zł miesięcznie. |

Every 100 zl step is its own state. The cheapest listing costs **3800 zl** a month, so
any budget below that returns the empty state.

**Below the fold, always rendered:** a group headed `Nie można ustalić kosztu (3)` holding
the three search-B listings. Each shows a floor rather than a total, carries a
`Brak czynszu` badge, and marks the missing row in words. This group is the argument the
whole redesign rests on and it appears in no exported frame before September 2026.

**Not reachable:** the dimmed `.over` card. Its CSS exists but `render()` filters
over-budget listings before drawing them. In Figma it may exist as a variant, labelled
*not reachable in the prototype*. It must not be made reachable to obtain a screenshot.

Reference: `after-top.png`, `after-3500-empty.png`, `after-4100.png`, `after-5000.png`,
`after-unknown-group.png`.

## 3. Redesign — listing detail (`listing.html?id=`)

**11 reachable instances**, one per listing id. Two shapes:

- **8 complete** (a1–a8): two panels, *Co miesiąc* and *Pierwszy miesiąc*,
  each itemised, with estimate tags on utilities and deposit, and a full total.
- **3 partial** (b1–b3): totals read *od X zł*, the administrative rent row
  says it is not stated, the badge reads `Brak czynszu`, and the note is different.

The deposit is shown separately and named as returnable rather than folded into a single
figure, because a combined number cannot be interpreted.

Worth drawing first: **a8** — advertised at 2500 zl, the cheapest headline on the page,
**4000 zl** a month and
**6500 zl**
to move in. It is the reversal the study is about.

Reference: `listing-a1.png`, `listing-a8.png`, `listing-b1.png`, `listing-a8-recurring.png`.

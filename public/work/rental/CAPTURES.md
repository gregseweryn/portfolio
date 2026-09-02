# Provenance of the mockup captures

Written by `scripts/capture-mockup.mjs`. Every image in `public/work/rental/` is a
screenshot of the prototype in `../otodom-cost-mockup` running in a real browser, not
a rendering of a design file. This file records what was true when each was taken, so
the claim can be checked rather than trusted.

Captured: 2026-09-02
Mockup source hash (sha256 of tokens.css, listings.js, before.html, after.html, listing.html): b735f849c0419f1c88e122487c9b0d84be610c9f3274a378e921f0933429fd92
Chromium: 151.0.7922.34
Viewport: 375x812 at 2x unless a row says otherwise, locale pl-PL, reduced motion

The mockup is not a git repository, so the hash above stands in for a commit: change
any of those five files and it moves.

| file | px | page | state asserted before capture | shows |
|---|---|---|---|---|
| `before-top.png` | 750x1624 | `/before.html` | `() => document.querySelectorAll("#list .card").length === 8` | The current product, as the search returns it. |
| `before-three.png` | 750x3000 | `/before.html` | `() => document.querySelectorAll("#list .card").length === 8` | Three of the eight results a 3000 zl filter returns, each priced on a number nobody pays. |
| `before-card-a8.png` | 686x900 | `/before.html` | `() => document .querySelector("#list .card:nth-child(8) .price-main") .textContent.replace` | The a8 card as the current product presents it: 2500 zl in the headline. |
| `after-top.png` | 750x1624 | `/after.html` | budget 5000; `() => document.querySelector("#summary").textContent.includes("8 z 8")` | The redesign at a budget that returns everything, leading with the total. |
| `after-3500-empty.png` | 750x1624 | `/after.html` | budget 3500; `() => document.querySelector("#summary").textContent.includes("0 z 8")` | The scenario budget: nothing fits, and the page says how far off it is. |
| `after-4100.png` | 750x1624 | `/after.html` | budget 4100; `() => document.querySelector("#summary").textContent.includes("5 z 8")` | Five of eight, at 4100 zl. |
| `after-5000.png` | 750x1624 | `/after.html` | budget 5000; `() => document.querySelector("#summary").textContent.includes("8 z 8")` | Eight of eight, at 5000 zl. |
| `after-unknown-group.png` | 750x3252 | `/after.html` | budget 5000; `() => { const g = document.querySelector("#unknown-group"); return !g.hidden && document.q` | The three listings whose cost cannot be derived, grouped and named as such. |
| `listing-a1.png` | 750x2096 | `/listing.html?id=a1` | `() => !document.querySelector("#recurring-total").textContent.includes("od ")` | A listing that can state its total: every component present. |
| `listing-a8.png` | 750x2036 | `/listing.html?id=a8` | `() => { const t = document.body.textContent.replace(/\s/g, ""); return t.includes("4000zł"` | The reversal in full: 2500 zl advertised, 4000 zl a month, 6500 zl to move in. |
| `listing-b1.png` | 750x2132 | `/listing.html?id=b1` | `() => document.querySelector("#recurring-total").textContent.includes("od ")` | A listing that cannot state its total, and says so instead of guessing. |
| `listing-a8-recurring.png` | 686x460 | `/listing.html?id=a8` | `() => document.querySelectorAll("#recurring-rows li").length >= 3` | The recurring-cost panel alone, itemised. |

## Copied, not captured

The four files under `stimuli/` are the images shown to participants in the
comprehension test. They are copied byte-for-byte from the mockup repository rather
than re-rendered: their provenance is *the stimulus that was used*, and a fresh render
would quietly substitute something else for it.

## Retired

These four were exported from Figma and are set in Inter, while a browser capture on
Windows was set in Segoe UI until the mockup began self-hosting the face. Mixing the
two put two renderers inside one before/after pair, so they were replaced:

- `results-before.png`
- `results-after.png`
- `results-nothing-fits.png`
- `listing-detail.png`

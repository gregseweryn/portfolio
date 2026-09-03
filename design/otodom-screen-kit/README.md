# Otodom screen kit

Everything needed to draw the rental study's screens somewhere other than this repository —
in Figma, on paper, or in another tool entirely.

**Generated, not maintained.** Every file here is produced by `scripts/build-screen-kit.mjs`
from the running prototype in `../../../otodom-cost-mockup`. Do not edit them; change the
mockup and re-run:

```bash
npm run build:kit
```

Source hash (sha256 of tokens.css, listings.js and the three HTML files):
`8f04706a5f1190836f32df3666a322a5ad218349157d3c79fb338523c8d2be85`

If that hash and the one in `public/work/rental/CAPTURES.md` disagree, the kit and the
published screenshots were built from different versions of the prototype.

## What is here

| File | What it carries |
|---|---|
| `tokens.md` | Colour, spacing, radius and the nine type styles, ready to enter as Figma variables and text styles |
| `listings.csv` | All 11 listings with every derived figure: base, admin, utilities, monthly total, deposit, first-month total, and whether the cost can be derived at all |
| `screens.md` | Every screen and every state it can actually be put into, with the numbers each state produces |
| `copy.csv` | The Polish interface strings, so a screen can be built without reading the HTML |

## What is deliberately not here

**The reference images.** They live in `public/work/rental/` — twelve captures of the running
prototype plus four comprehension-test stimuli — and `CAPTURES.md` beside them records the URL,
viewport and asserted DOM state of each. Copying them here would make two sets of binaries that
can disagree about which is current.

**Anything invented.** `screens.md` lists states the prototype reaches by being used. A state
absent from that list is absent because the prototype cannot be put into it, and drawing it
anyway would be building an artifact to fit the story. The clearest case: `before.html` renders
only search A, so **no current-state screen exists showing a listing whose cost cannot be
derived**, and none should be drawn.

## Where to start

`../FIGMA.md` is the build order for a Figma file: variables, then text styles, then the
component variant matrix, then screens assembled from those components. The chart SVGs in
`../charts/` import as editable vector.

The single most useful screen to draw first is listing **a8**: advertised at 2500 zl, the
cheapest number on the results page, and the most expensive place to end up.

# Editorial Restyle — Design Spec

**Date:** 2026-09-13
**Source of the direction:** https://nit-hello-41400667.figma.site/ (Figma Make
prototype, "editorial" tab only — the "RAVE" tab is out of scope).

## 1. What this changes

The site keeps its content, routes, components and information architecture.
What changes is the visual system: the near-monochrome "Disciplined Statement"
look is replaced by a Swiss/brutalist editorial look — heavy black rules,
full-bleed colour bands, a marquee, numbered index rows, and hard-edged chips.

The homepage section order already matches the prototype almost one-to-one, so
this is a restyle plus three new presentational components, not a rebuild.

## 2. What we measured off the prototype

Colour (sampled from computed styles):

| Role in prototype | Hex | Frequency |
|---|---|---|
| key (ink, borders, bands) | `#0A0A0A` | 270 uses |
| bone (paper) | `#F2F0EA` / `#F4F2ED` | 147 uses |
| magenta | `#E6007E` | 15 uses |
| cyan | `#00B4E6` | 11 uses |
| yellow | `#FFDE00` | 10 uses |
| muted | `#6A675D` | 10 uses |
| red | `#E2412A` | 2 uses |

Type in the prototype: Anton (display, 120px / 103.2px line-height /
-1.2px tracking), Inter (body), Space Mono and JetBrains Mono (labels).

Structural chrome: every `<section>` carries `border-bottom: 2px solid #0A0A0A`;
the featured band is a full-bleed `#00B4E6` fill; a black marquee strip runs the
method names; index rows are numbered `01` / `02`; kickers read `FIG.00 —`,
`INDEX / 02`, `FEATURED / 01`.

## 3. Decisions taken

### 3.1 Type — keep Druk Wide + Noirden (decided by the site owner)

The prototype's Anton is not adopted. The site keeps its licensed
`DrukWideBold` (display) and `Noirden` (body/label) faces, already built to
WOFF2 in `myfonts/webfonts/`.

Consequence: Druk Wide sets roughly 1.6x the width of Anton at the same optical
size, so the prototype's 120px display size cannot be copied. The display scale
rises but stays width-governed:

- `--text-display` ceiling moves from `3.75rem` to `4.5rem`.
- `--lh-tight` moves from `1.08` to `0.94` to get the prototype's stacked,
  tightly-leaded headline block.
- `--ls-display` stays at or above `0`. Druk Wide is already tight; tracking it
  negative collides the sidebearings.

### 3.2 Labels stay in Noirden, not mono

The prototype uses Space Mono / JetBrains Mono for chips and kickers. DESIGN.md
section 3 already rules mono out by name ("a researcher isn't a developer; mono
read as borrowed costume"). That rule is kept: `--font-label` stays Noirden set
small, uppercase and tracked. The brutalist read comes from the black chips,
the 2px rules and the colour bands, not from the typeface.

### 3.3 Colour — one ink, one text accent, two surface-only colours

Not every prototype colour can carry text. Measured against paper `#F4F2ED`:

| Colour | Contrast on paper | Verdict |
|---|---|---|
| key `#0A0A0A` | ~18.5:1 | ink |
| magenta `#E6007E` | ~4.8:1 | text accent, passes AA for body |
| cyan `#00B4E6` | ~2.1:1 | **surface only** — fails AA as text |
| yellow `#FFDE00` | ~1.1:1 | **surface only** |
| red `#E2412A` | ~3.9:1 | **surface only**, or large text only |

Rule for the system: **cyan, yellow and red are fills that carry near-black
text. They are never a text or icon colour on paper.** Black on cyan measures
~8.8:1 and black on yellow ~15:1, so the bands themselves are comfortably AA.

`--accent` becomes magenta `#E6007E`; `--on-accent` stays near-white
(~5.3:1 on magenta).

### 3.4 The prototype's hero is not ported

The prototype's first `<section>` is 172,291px tall — a scroll-jacked pin over
roughly 170 viewport heights. That is an artefact of Figma Make's export, not a
design decision, and it would destroy the site's scroll behaviour and its
Lenis/GSAP setup. The hero keeps its current height and its existing
`ShaderField` canvas, restyled to the new palette.

### 3.5 Dark band keeps its job, changes its colour

`.darkSection` currently remaps tokens to a cobalt-tinted near-black. It stays
as the mechanism, but remaps to key `#0A0A0A` with magenta as the accent on
dark. Magenta on `#0A0A0A` measures ~4.1:1, which is under AA for body text, so
on dark surfaces the accent is used for display-size text and fills only, and a
lightened magenta is used where accent-coloured body text is needed.

## 4. New presentational components

1. **`Chip`** — the small hard-edged label. Variants: `key` (black fill, bone
   text), `accent` (magenta fill, white text), `line` (2px black outline,
   transparent fill).
2. **`Marquee`** — the black full-bleed strip that scrolls the method names.
   Replaces the current static methods strip on the homepage. Must freeze under
   `prefers-reduced-motion` and render all items statically without JS.
3. **`StatBand`** — the four-figure band (`2` end-to-end studies, `446` survey
   respondents, `3` Kraków districts, `8` research methods), cells divided by
   2px rules.

## 5. Out of scope

- The "RAVE" tab of the prototype.
- Any change to study content, `lib/studies/*`, or the study page's reading
  chrome (`ReadingProgress`, `SectionIndex`, `ImageZoom`).
- Adding a chart to the homepage featured slot. The prototype shows a
  74s -> 26s bar pair there; the site's real measured figures are 60.90s ->
  21.30s and live on the study page. Porting that chart is deferred rather than
  shipped with wrong numbers.

## 6. Acceptance

- `npm run build` succeeds.
- Every colour pairing that carries text measures >= 4.5:1 (>= 3:1 for text at
  or above 24px, and for control borders per WCAG 2.2 SC 1.4.11).
- The homepage, `/about`, `/contact`, `/cv`, `/work/portfolio-desk` and
  `/work/krakow-touristification` all render with no orphaned cobalt.
- `scripts/check-no-placeholders.mjs` passes.
- DESIGN.md describes the shipped system, not the old one.

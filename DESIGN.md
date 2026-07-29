<!-- SEED: re-run /impeccable document once there's code to capture the actual tokens and components. -->
---
name: Grzegorz Seweryn — Portfolio
description: A UX researcher's portfolio — Swiss rigor expressed through a clear, confident typographic voice.
---

# Design System: Grzegorz Seweryn — Portfolio

## 1. Overview

**Creative North Star: "The Disciplined Statement"**

A systematic, grid-driven foundation carrying a bold typographic voice. The backbone is
Swiss: a strict grid, near-monochrome restraint, generous whitespace, nothing arbitrary.
The voice is confident: large, decisive display type and considered motion that make the
site feel authored, not assembled. The reference is [Ragged Edge](https://raggededge.com/) —
big, self-assured headlines, work-led layouts, restrained color, smooth motion — held to
the rigor of an International-style grid. Two forces, one system: **a quiet structure that
lets loud type speak.**

This system explicitly rejects three things, carried forward from the project's strategy:
the **generic template** look (off-the-shelf, no point of view), the **corporate SaaS**
landing page (identical card grids, gradient hero metrics, rounded-everything), and the
**dark dev-terminal** aesthetic (monospace neon-on-black). Restraint is the personality —
but restraint expressed through scale, weight, and space, never through timidity. The
work is always the loudest thing on screen; the system frames, it does not compete.

**Key Characteristics:**
- Near-monochrome (ink on paper), a single disciplined accent on ≤10% of any screen.
- Bold display typography as the primary expressive material; hierarchy from scale + weight.
- Strict, visible grid; generous, varied whitespace for rhythm.
- Considered, smooth motion — feedback and transitions, never gimmickry.
- Flat by default; depth comes from type scale and space, not shadow.

## 2. Colors

A near-monochrome ink-on-paper palette punctuated by a single deliberate accent. Restrained
strategy: tinted neutrals plus one accent that never exceeds ~10% of a screen.

### Primary
- **Ink** `[to be resolved during implementation]`: The near-black used for display type,
  body text, and primary marks. Should sit just off true black for warmth/depth.

### Neutral
- **Paper** `[to be resolved during implementation]`: The off-white page background. A true
  off-white at near-zero chroma, *not* a warm cream/sand/beige tint.
- **Mute** `[to be resolved during implementation]`: A mid-grey for secondary text, metadata,
  and dividers. Must still clear 4.5:1 on Paper for any text use.

### Accent (single)
- **Accent** `[to be resolved during implementation]`: One saturated punctuation color for
  links, key marks, and a single CTA. **Hue to be drawn from Mobbin inspiration at build
  time** — a precise cobalt, a decisive vermillion, or a sharp acid green are all on-brief;
  pick one and commit.

### Named Rules
**The One Voice Rule.** The accent appears on ≤10% of any given screen. Its rarity is the
point — the moment it's everywhere, the system reads as corporate SaaS, not as design judgment.

**The True-Neutral Rule.** The paper background is a true off-white at near-zero chroma.
Never a warm cream/sand/beige. Warmth, if any, is carried by the work and the type — never
defaulted into the background.

## 3. Typography

**Display Font:** `[bold grotesque — to be chosen at implementation]`
**Body Font:** `[clean grotesque / sans — to be chosen at implementation]`
**Label Font:** `[same family or a precise mono — to be decided at implementation]`

**Character:** Typography is the system's primary expressive material. The lane is
grotesque-led — either a single neo-grotesque family worked across many weights (the
canonical Swiss move) or a bold display grotesque paired with a quieter sans for text.
Big, confident, exactingly set, in the spirit of Ragged Edge's headlines.

### Hierarchy
- **Display** (bold, large clamp up to ~6rem ceiling, line-height ~1): Hero and section
  statements. The loudest element on the page; tight but never touching (letter-spacing
  ≥ -0.04em).
- **Headline** (semibold–bold, ~2–3rem): Project titles, major section heads.
- **Title** (medium–semibold, ~1.25–1.5rem): Sub-sections, card/case headers.
- **Body** (regular, ~1–1.125rem, line-height ~1.5): Running text. Cap measure at 65–75ch.
- **Label** (medium, ~0.75–0.875rem, tracked if uppercase): Metadata, captions, nav.

### Named Rules
**The Scale-Is-Hierarchy Rule.** Hierarchy comes from size and weight, not from color or
decoration. If a heading needs a colored underline or a box to read as a heading, the type
isn't doing its job.

## 4. Elevation

Flat by default. This system conveys depth through type scale, generous whitespace, and the
grid — not through shadows. Surfaces sit on the same plane; the page reads as a precisely
composed sheet, not a stack of floating cards. Motion is **responsive**: considered, smooth
micro-transitions (hover, focus, page/section transitions) in the spirit of Ragged Edge,
never orchestrated scroll-jacking. Every motion needs a `prefers-reduced-motion` alternative.

### Named Rules
**The Flat-By-Default Rule.** Shadows, if ever used, appear only as a response to state
(hover, focus) — never as ambient decoration at rest.

## 5. Components

*No component library exists yet. Components will be documented on the next `/impeccable
document` run, once there's code. They will inherit: square-to-minimal radii, flat surfaces,
near-monochrome fills, the single accent reserved for primary actions, and visible
keyboard-focus states.*

## 6. Do's and Don'ts

### Do:
- **Do** lead with big, confident display type — it is the primary expressive material.
- **Do** keep the page near-monochrome (ink on paper) and reserve the accent for ≤10% of any screen.
- **Do** hold a strict, visible grid and vary whitespace for rhythm.
- **Do** keep motion responsive and smooth — feedback and transitions — with a reduced-motion fallback for every animation.
- **Do** let the work be the loudest thing on screen; the system frames, it does not compete.
- **Do** keep body text ≥4.5:1 contrast; never drift into light-grey-on-white "elegance."

### Don't:
- **Don't** ship the **generic template** look — off-the-shelf, no point of view.
- **Don't** use **corporate SaaS** clichés: identical card grids, gradient hero metrics, rounded-everything.
- **Don't** reach for the **dark dev-terminal** aesthetic — monospace neon-on-black.
- **Don't** over-animate: no scroll-jacking, no everything-flies-in, no motion for its own sake.
- **Don't** tint the background warm (cream/sand/beige); keep paper a true near-zero-chroma off-white.
- **Don't** add decoration that doesn't earn its place — no side-stripe borders, no gradient text, no glassmorphism.

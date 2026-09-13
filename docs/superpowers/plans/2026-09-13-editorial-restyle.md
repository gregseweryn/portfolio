# Editorial Restyle Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Port the Swiss/brutalist editorial look from the Figma Make prototype onto the existing Next.js portfolio, keeping the site's licensed Druk Wide + Noirden typefaces and all existing content.

**Architecture:** Three layers, applied in order. First the token layer in `app/globals.css` — palette, display scale, and a new 2px rule token — so every consumer inherits the new system from one place. Second, three new presentational components (`Chip`, `Marquee`, `StatBand`) that carry the chrome the current site has no equivalent for. Third, a per-section restyle of `app/page.module.css` and the shared chrome (`Nav`, `Footer`, `Button`), then a sweep of the remaining routes for anything the token change stranded.

**Tech Stack:** Next.js 15 (App Router), React 19, CSS Modules, plain CSS custom properties in OKLCH, GSAP + ScrollTrigger, Lenis, OGL (WebGL hero).

**Spec:** `docs/design/2026-09-13-editorial-restyle-spec.md`

## Global Constraints

- **Typefaces are fixed.** Druk Wide Bold (`--font-druk`) for display, Noirden (`--font-noirden`) for body and labels, Oswald (`--font-oswald`) for `:lang(pl)`. Do not add Anton, Inter, Space Mono, JetBrains Mono, or any other webfont.
- **No monospace anywhere.** DESIGN.md section 3 rules it out by name. Labels stay Noirden, uppercase, tracked.
- **Colours are declared in OKLCH**, matching the existing file. Every new colour token carries its target hex in a trailing comment.
- **Cyan, yellow and red are surface-only.** They never colour text, icons, or control borders. Only near-black ink sits on them.
- **Contrast floors:** 4.5:1 for text under 24px, 3:1 for text at or above 24px and for control borders (WCAG 2.2 SC 1.4.11). Decorative hairlines are exempt.
- **Reduced motion is honoured.** Anything that moves checks `prefers-reduced-motion` (helper: `prefersReducedMotion()` from `@/lib/gsap`).
- **No JS-dependent content.** Server-rendered markup must contain the full text; JS only enhances.
- **Verification per task:** `npm run build` must succeed, and any visual claim is checked in the Browser pane, never asserted from the diff.
- **The prototype's 172,291px scroll-jacked hero is not ported.** See spec section 3.4.
- **Commit after every task.** Conventional commit prefixes (`feat:`, `style:`, `refactor:`, `docs:`).

## File Structure

| File | Status | Responsibility |
|---|---|---|
| `app/globals.css` | Modify | Palette, type scale, rule token, `.darkSection` remap, band utilities |
| `components/Chip.tsx` + `.module.css` | Create | The hard-edged small label, three variants |
| `components/Marquee.tsx` + `.module.css` | Create | Full-bleed black scrolling strip |
| `components/StatBand.tsx` + `.module.css` | Create | Four-figure band with 2px cell rules |
| `app/page.tsx` | Modify | Wire in Chip / Marquee / StatBand, numbered index |
| `app/page.module.css` | Modify | Section rules, cyan featured band, restyled index rows |
| `components/Nav.module.css` | Modify | 2px bottom rule, Druk wordmark |
| `components/Footer.module.css` | Modify | 2px top rule |
| `components/Button.module.css` | Modify | Square, 2px borders, uppercase label type |
| `components/ShaderField.tsx` | Modify | Feed the new ink/accent to the shader uniforms |
| `app/about/`, `app/contact/`, `app/cv/`, `app/not-found.module.css`, `app/work/[slug]/study.module.css` | Modify | Sweep for stranded assumptions |
| `DESIGN.md` | Modify | Describe the shipped system |

---

### Task 1: The token layer

**Files:**
- Modify: `app/globals.css:7-118` (the `:root` block) and the `.darkSection` block (~line 213)

**Interfaces:**
- Consumes: nothing.
- Produces: the tokens every later task uses — `--key`, `--paper`, `--bone`, `--cyan`, `--yellow`, `--red`, `--accent`, `--on-accent`, `--rule-w`, `--rule`, the revised `--text-display`, `--text-statement`, `--lh-tight`, `--lh-snug`, and the `.ruled` / `.band-cyan` global classes. `--ls-display` is deliberately unchanged.

- [ ] **Step 1: Replace the colour block in `:root`**

In `app/globals.css`, replace the whole `/* ---- Color ... ---- */` group (from `--bg:` through `--accent-on-dark:`) with:

```css
  /* ---- Colour (OKLCH; target hex in the trailing comment) ----
     Editorial palette, ported from the Figma prototype. The ink is a true
     near-black rather than the old warm-tinted one: this system draws 2px
     rules everywhere, and a warm rule next to a colour band reads as a
     printing error rather than as a choice. */
  --key: oklch(0.148 0 0); /* #0A0A0A — ink, rules, black bands */
  --paper: oklch(0.958 0.005 96); /* #F4F2ED — page ground */
  --bone: oklch(0.951 0.006 96); /* #F2F0EA — text on key */

  /* Bands. These are fills, never text colours: cyan measures 2.1:1 on paper
     and yellow 1.1:1, so anything set in them would fail WCAG 1.4.3. Near-black
     on cyan is 8.8:1 and on yellow 15:1, which is why the bands work at all. */
  --cyan: oklch(0.706 0.136 226); /* #00B4E6 — the featured band */
  --yellow: oklch(0.899 0.181 100); /* #FFDE00 — callouts */
  --red: oklch(0.596 0.204 32); /* #E2412A — held in reserve */

  --bg: var(--paper);
  --surface: oklch(0.925 0.005 96); /* media plates, section fills */
  --surface-2: oklch(0.885 0.005 96); /* media inner / hover */
  --ink: var(--key);
  --muted: oklch(0.492 0.013 95); /* #6A675D — 6.4:1 on paper */
  --line: oklch(0.82 0.004 96); /* decorative hairlines only */
  /* The 2px black rule is this system's structural line. It is not a hairline
     and is not exempt from 1.4.11 — it is the edge that says where a section
     stops. Kept as its own token so a hairline and a rule never drift into
     each other. */
  --rule-w: 2px;
  --rule: var(--rule-w) solid var(--key);
  --control-line: var(--key);

  /* The single text accent. Magenta measures 4.8:1 on paper, so it passes AA
     for body text — which cyan and yellow do not, and which is the whole
     reason only this one of the four is allowed to set type. */
  --accent: oklch(0.578 0.253 3); /* #E6007E */
  --accent-strong: oklch(0.5 0.23 3); /* hover / pressed */
  --on-accent: oklch(0.99 0 0); /* 5.3:1 on --accent */

  --focus: var(--key);
  --select-bg: oklch(0.578 0.253 3 / 0.2);

  /* Dark surfaces — the same key black as the rules, so an inverted band reads
     as the rule widened rather than as a second, different black. */
  --ink-deep: var(--key);
  --on-dark: var(--bone);
  --on-dark-muted: oklch(0.72 0.008 96);
  /* Magenta on key is 4.1:1 — under AA for body copy. On dark it is therefore
     a display-and-fill colour, and this lightened step is what sets any
     accent-coloured text there (~6:1). */
  --accent-on-dark: oklch(0.68 0.21 3);
```

- [ ] **Step 2: Raise the display scale for Druk Wide**

Druk Wide sets about 1.6x the width of the prototype's Anton, so the prototype's 120px cannot be copied — but the old 60px ceiling was set against a 1.08 line-height and a monochrome page. Replace these declarations in `:root`:

```css
  --text-display: clamp(2.2rem, 1.05rem + 4.8vw, 4.5rem);
  --text-statement: clamp(1.8rem, 1.05rem + 3.1vw, 3.4rem);
```

and in the line-height group:

```css
  --lh-tight: 0.94;
  --lh-snug: 1.1;
```

Leave `--ls-display: 0.005em` exactly as it is. Druk Wide is already tight; the prototype's `-1.2px` belongs to Anton and would collide Druk's sidebearings.

- [ ] **Step 3: Remap `.darkSection` to the key black**

Replace the body of the `.darkSection` rule with:

```css
.darkSection {
  --bg: var(--key);
  --surface: oklch(0.22 0 0);
  --ink: var(--bone);
  --muted: var(--on-dark-muted);
  --line: oklch(0.32 0 0);
  --control-line: var(--bone);
  --accent: var(--accent-on-dark);
  --accent-strong: oklch(0.75 0.19 3);
  --rule: var(--rule-w) solid var(--bone);
  --focus: var(--bone);
  --select-bg: oklch(0.68 0.21 3 / 0.3);
  background: var(--key);
  color: var(--bone);
}
```

`--focus` is remapped here because Task 1 Step 1 changed the global focus ring to `--key`, and a black ring on a black band is invisible — a WCAG 2.4.7 failure.

- [ ] **Step 4: Add the band utilities to the shared primitives**

After the `.prose` rule in `app/globals.css`, add:

```css
/* ---- Editorial chrome ----
   Sections in this system are separated by a black rule that runs the full
   width of the viewport, not of the container. A band is a section whose fill
   does the same. Both are why the page reads as a printed sheet rather than as
   a column of cards. */
.ruled {
  border-bottom: var(--rule);
}

.band-cyan {
  background: var(--cyan);
  color: var(--key);
  --bg: var(--cyan);
  --surface: oklch(0.66 0.13 226);
  --ink: var(--key);
  --muted: oklch(0.36 0.07 226);
  --line: oklch(0.6 0.12 226);
  --control-line: var(--key);
  /* Magenta on cyan is 1.9:1 and unusable. On a band the accent is the ink. */
  --accent: var(--key);
  --accent-strong: var(--key);
  --on-accent: var(--cyan);
  --focus: var(--key);
  --select-bg: oklch(0.148 0 0 / 0.2);
}
```

- [ ] **Step 5: Build**

Run:

```bash
npm run build
```

Expected: PASS. A failure here is a CSS syntax error in the block you just pasted, not a real design problem.

- [ ] **Step 6: Verify the computed colours match the target hexes**

The OKLCH values above are conversions and may be off by a step. Start the dev server in the Browser pane (`preview_start` with the `dev` entry in `.claude/launch.json`; create that file if missing, with `runtimeExecutable: "npm"`, `runtimeArgs: ["run","dev"]`, `port: 3000`), then run this in `javascript_tool`:

```js
const want = { '--key':'10,10,10', '--paper':'244,242,237', '--cyan':'0,180,230',
               '--yellow':'255,222,0', '--accent':'230,0,126', '--red':'226,65,42' };
const el = document.createElement('div'); document.body.appendChild(el);
const out = {};
for (const [tok, target] of Object.entries(want)) {
  el.style.color = `var(${tok})`;
  const got = getComputedStyle(el).color.match(/[\d.]+/g).slice(0,3).map(Number);
  const t = target.split(',').map(Number);
  out[tok] = { got: got.join(','), target, maxDelta: Math.max(...got.map((v,i)=>Math.abs(v-t[i]))) };
}
el.remove(); out;
```

Expected: every `maxDelta` is 6 or less. For any token further off, nudge its OKLCH lightness or chroma and re-run until it is within tolerance. Do not silently accept a drifted colour — the palette is the whole deliverable.

- [ ] **Step 7: Verify the contrast floors hold**

Run in `javascript_tool`:

```js
const lum = c => { const [r,g,b] = c.match(/[\d.]+/g).slice(0,3).map(Number).map(v=>{v/=255;
  return v<=0.04045 ? v/12.92 : Math.pow((v+0.055)/1.055,2.4);}); return 0.2126*r+0.7152*g+0.0722*b; };
const ratio = (a,b) => { const [x,y]=[lum(a),lum(b)].sort((m,n)=>n-m); return +((x+0.05)/(y+0.05)).toFixed(2); };
const el = document.createElement('div'); document.body.appendChild(el);
const v = t => { el.style.color = `var(${t})`; return getComputedStyle(el).color; };
const [key,paper,cyan,yellow,accent,onAccent,muted] =
  ['--key','--paper','--cyan','--yellow','--accent','--on-accent','--muted'].map(v);
el.remove();
({ 'ink on paper': ratio(key,paper), 'muted on paper': ratio(muted,paper),
   'accent on paper': ratio(accent,paper), 'on-accent on accent': ratio(onAccent,accent),
   'ink on cyan': ratio(key,cyan), 'ink on yellow': ratio(key,yellow) });
```

Expected, all of which must hold before you commit:
- `ink on paper` >= 15
- `muted on paper` >= 4.5
- `accent on paper` >= 4.5
- `on-accent on accent` >= 4.5
- `ink on cyan` >= 4.5
- `ink on yellow` >= 4.5

- [ ] **Step 8: Commit**

```bash
git add app/globals.css .claude/launch.json
git commit -m "style: replace the monochrome palette with the editorial token layer"
```

---

### Task 2: The Chip component

**Files:**
- Create: `components/Chip.tsx`
- Create: `components/Chip.module.css`

**Interfaces:**
- Consumes: `--key`, `--bone`, `--accent`, `--on-accent`, `--rule`, `--font-label`, `--ls-caps` from Task 1.
- Produces: `export default function Chip({ variant, as, className, children })` where `variant` is `"key" | "accent" | "line"` (default `"line"`) and `as` is `"span" | "li" | "p"` (default `"span"`). Tasks 4, 5 and 7 render it.

- [ ] **Step 1: Write the stylesheet**

Create `components/Chip.module.css`:

```css
/* The small hard-edged label this system hangs its structure on: FEATURED / 01,
   HEURISTIC AUDIT, OPEN TO UX RESEARCH ROLES. Square by construction — a
   rounded corner here would soften the one thing the look is built out of.

   The Label-Names-A-Kind Rule in DESIGN.md still governs what may go inside
   one. A chip may name what a piece of content *is*. It may not restate a
   heading that sits directly under it. */
.chip {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-family: var(--font-label);
  font-size: 0.7rem;
  font-weight: 600;
  line-height: 1;
  letter-spacing: var(--ls-caps);
  text-transform: uppercase;
  padding: 0.42rem 0.6rem;
  border: var(--rule);
  white-space: nowrap;
}

.key {
  background: var(--key);
  color: var(--bone);
  border-color: var(--key);
}

.accent {
  background: var(--accent);
  color: var(--on-accent);
  border-color: var(--accent);
}

.line {
  background: transparent;
  color: var(--ink);
  border-color: var(--control-line);
}
```

- [ ] **Step 2: Write the component**

Create `components/Chip.tsx`:

```tsx
import styles from "./Chip.module.css";

type ChipVariant = "key" | "accent" | "line";

export default function Chip({
  variant = "line",
  as: Tag = "span",
  className,
  children,
}: {
  variant?: ChipVariant;
  as?: "span" | "li" | "p";
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <Tag className={[styles.chip, styles[variant], className].filter(Boolean).join(" ")}>
      {children}
    </Tag>
  );
}
```

- [ ] **Step 3: Build**

Run:

```bash
npm run build
```

Expected: PASS. An unused component compiles; this step checks that the TSX and CSS parse, not that anything renders it yet.

- [ ] **Step 4: Commit**

```bash
git add components/Chip.tsx components/Chip.module.css
git commit -m "feat: add the Chip label component"
```

---

### Task 3: The Marquee component, replacing the methods strip

**Files:**
- Create: `components/Marquee.tsx`
- Create: `components/Marquee.module.css`
- Modify: `app/page.tsx:43-48` (the methods `<section>`) and `app/page.module.css:65-90` (the `.methods` group)

**Interfaces:**
- Consumes: the `methods` array from `@/lib/site`.
- Produces: `export default function Marquee({ items, label }: { items: readonly string[]; label: string })`. Nothing later consumes it.

- [ ] **Step 1: Write the stylesheet**

Create `components/Marquee.module.css`:

```css
/* Full-bleed: the strip is a rule that got thick enough to hold words, so it
   has to reach the viewport edge the way the section rules do, not stop at the
   container gutter. It is rendered outside .container for exactly that reason. */
.strip {
  background: var(--key);
  color: var(--bone);
  border-block: var(--rule-w) solid var(--key);
  overflow: hidden;
  padding-block: 0.7rem;
}

.track {
  display: flex;
  width: max-content;
  animation: marquee 38s linear infinite;
}

/* Two identical runs sit side by side and the track travels exactly one run's
   width, so the seam lands where the first run ended and the loop is invisible. */
.run {
  display: flex;
  flex-shrink: 0;
}

.item {
  font-family: var(--font-label);
  font-size: 0.78rem;
  font-weight: 600;
  letter-spacing: var(--ls-caps);
  text-transform: uppercase;
  padding-inline: 1.6rem;
  white-space: nowrap;
}

.item::after {
  content: "";
  display: inline-block;
  width: 5px;
  height: 5px;
  margin-left: 1.6rem;
  vertical-align: middle;
  background: var(--accent-on-dark);
}

@keyframes marquee {
  from { transform: translate3d(0, 0, 0); }
  to { transform: translate3d(-50%, 0, 0); }
}

/* Stopped, not hidden. The method names are content: a reader who has asked
   the OS for less motion still needs to be able to read them. */
@media (prefers-reduced-motion: reduce) {
  .track {
    animation: none;
    width: 100%;
  }
  .track .run:last-child {
    display: none;
  }
  .run {
    flex-wrap: wrap;
    justify-content: center;
  }
}
```

- [ ] **Step 2: Write the component**

Create `components/Marquee.tsx`. It is a server component: the duplicate run is in the markup and the movement is pure CSS, so there is no JS to fail and nothing to hydrate.

```tsx
import styles from "./Marquee.module.css";

/**
 * A black strip that scrolls a short list of words. The list is rendered twice:
 * the animation translates the track by exactly half its width, so the second
 * run is already in place when the first leaves and the loop has no seam.
 *
 * The duplicate is aria-hidden — a screen reader should hear the eight methods
 * once, not sixteen times.
 */
export default function Marquee({
  items,
  label,
}: {
  items: readonly string[];
  label: string;
}) {
  const run = (hidden: boolean) => (
    <div className={styles.run} aria-hidden={hidden || undefined}>
      {items.map((item) => (
        <span key={item} className={styles.item}>
          {item}
        </span>
      ))}
    </div>
  );

  return (
    <div className={styles.strip} role="group" aria-label={label}>
      <div className={styles.track}>
        {run(false)}
        {run(true)}
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Swap it into the homepage**

In `app/page.tsx`, replace the `MethodsList` import with:

```tsx
import Marquee from "@/components/Marquee";
```

and replace the whole methods `<section>` block with:

```tsx
      {/* Methods — range at a glance. The strip is full-bleed on purpose, so it
          sits outside the container rather than inside it. */}
      <Marquee items={methods} label="Research methods" />
```

Leave `components/MethodsList.tsx` on disk — nothing else imports it, but the scramble-decode effect is worth keeping around. Removing it is a separate decision, not this task's.

- [ ] **Step 4: Delete the dead styles**

In `app/page.module.css`, delete the `/* ---------- Methods strip ---------- */` group: the `.methods`, `.methodsList`, `.methodItem` and `.methodItem:not(:last-child)::after` rules with their comments.

- [ ] **Step 5: Build**

Run:

```bash
npm run build
```

Expected: PASS, with no "cannot find module" and no unused-import type error.

- [ ] **Step 6: Verify it moves, loops, and freezes**

With the dev server in the Browser pane, load `http://localhost:3000/` and run in `javascript_tool`:

```js
const track = document.querySelector('[aria-label="Research methods"] > div');
const a = getComputedStyle(track).transform;
await new Promise(r => setTimeout(r, 1200));
({ moved: getComputedStyle(track).transform !== a,
   runs: track.children.length,
   secondHidden: track.children[1].getAttribute('aria-hidden'),
   widthsEqual: track.children[0].offsetWidth === track.children[1].offsetWidth })
```

Expected: `moved: true`, `runs: 2`, `secondHidden: "true"`, `widthsEqual: true`. If `widthsEqual` is false the `-50%` translate will jump at the seam — the two runs must render identically.

Then confirm the reduced-motion path exists in the stylesheet rather than trusting the source:

```js
[...document.styleSheets].flatMap(s => { try { return [...s.cssRules] } catch { return [] } })
  .filter(r => r.conditionText?.includes('reduced-motion'))
  .map(r => [...r.cssRules].map(x => x.cssText).join(' | '))
  .filter(t => t.includes('animation'))
```

Expected: the returned text contains `animation: none`.

- [ ] **Step 7: Screenshot the strip**

Take a `computer` screenshot of the top of the homepage. Expected: a solid black band under the hero with uppercase method names in bone, separated by small magenta squares.

- [ ] **Step 8: Commit**

```bash
git add components/Marquee.tsx components/Marquee.module.css app/page.tsx app/page.module.css
git commit -m "feat: replace the methods strip with a full-bleed marquee"
```

---

### Task 4: Section rules and the cyan featured band

**Files:**
- Modify: `app/page.tsx:19-120` (hero, work, featured)
- Modify: `app/page.module.css` (hero group, section head, featured group)

**Interfaces:**
- Consumes: `Chip` from Task 2; `--rule`, `--cyan`, `.ruled`, `.band-cyan` from Task 1.
- Produces: nothing later consumes it.

The band reaches the viewport edge because the `<section>` is a direct child of the page and its `.container` sits *inside* it — the same way `.ruled` works. There is no bleed helper and none is needed; a `calc(50% - 50vw)` trick would overflow by the scrollbar's width on Windows.

- [ ] **Step 1: Put chips and a rule on the hero**

In `app/page.tsx`, import `Chip`:

```tsx
import Chip from "@/components/Chip";
```

Replace the `.heroMeta` paragraph — including the `aria-hidden` `/` separator span — with the chip pair the prototype opens on:

```tsx
          <p className={styles.heroMeta}>
            <Chip variant="key">{site.role}</Chip>
            <Chip variant="accent">{site.availability}</Chip>
          </p>
```

and add the rule class to the hero section:

```tsx
      <section className={`${styles.hero} ruled`} aria-labelledby="hero-title">
```

- [ ] **Step 2: Restyle the hero block**

In `app/page.module.css`, replace `.heroMeta` and `.heroTitle` with:

```css
.heroMeta {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.heroTitle {
  margin-top: 1.75rem;
  font-family: var(--font-display);
  font-size: var(--text-display);
  font-weight: 700;
  line-height: var(--lh-tight);
  letter-spacing: var(--ls-display);
  text-transform: uppercase;
  /* Druk Wide is roughly 1.6x the width of a normal grotesque, so the measure
     that holds three or four lines is far shorter than a body measure. */
  max-width: 16ch;
}
```

Delete the now-unreferenced `.heroAvail` and `.dotSep` rules and the `.dotSep` comment block above them.

- [ ] **Step 3: Make the featured study a cyan band**

In `app/page.tsx`, the featured `<Link>` currently sits inside the `work` section's container. Move it into its own banded section directly after the `.sectionHead` block, so the fill can bleed:

```tsx
      {/* Featured — the one study that gets a full band to itself. */}
      <section className={`${styles.featuredBand} band-cyan ruled`} aria-label="Featured study">
        <div className="container">
          <Link href={`/work/${featured.slug}`} className={styles.featured}>
            {/* the existing featuredMedia / featuredBody markup, unchanged
                except for the two swaps below */}
          </Link>
        </div>
      </section>
```

Inside it, replace the `featuredTag` paragraph with the prototype's numbered form:

```tsx
              <Chip variant="key" as="p" className={styles.featuredTag}>Featured / 01</Chip>
```

and swap the method `<li>` tags for chips:

```tsx
                <ul className={styles.tags}>
                  {featured.methods.slice(0, 3).map((m) => (
                    <Chip key={m} variant="line" as="li">{m}</Chip>
                  ))}
                </ul>
```

- [ ] **Step 4: Restyle the featured group**

In `app/page.module.css`, add and replace:

```css
.featuredBand {
  padding-block: clamp(2.5rem, 5vw, 4.5rem);
}

.featured {
  display: grid;
  grid-template-columns: minmax(0, 1.1fr) minmax(0, 1fr);
  gap: clamp(1.5rem, 4vw, 3.5rem);
  align-items: center;
  /* The band is the separator now. A border here would draw a second line
     inside a block that already has one around it. */
  border-top: none;
  padding-block: 0;
}

.featuredTag {
  /* Chip supplies the type and the fill; this only positions it. */
  margin-bottom: 0.2rem;
}

.featuredTitle {
  font-family: var(--font-display);
  font-size: var(--text-h1);
  font-weight: 700;
  line-height: var(--lh-snug);
  letter-spacing: var(--ls-display);
  text-transform: uppercase;
  max-width: 18ch;
  /* The animated underline is dropped on the band: a 2px magenta rule reads as
     a fifth colour on cyan, and the whole block is already one link target. */
  background-image: none;
}

.impactValue {
  font-family: var(--font-display);
  font-size: var(--text-h2);
  font-weight: 700;
  letter-spacing: var(--ls-display);
}
```

Delete the `.tag` rule — `Chip` replaces it. Delete the `.featured:hover .featuredTitle` and `.featured:focus-visible .featuredTitle` rules, which now animate nothing.

- [ ] **Step 5: Rule the section head**

Replace `.sectionHead` and `.sectionTitle`:

```css
.sectionHead {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;
  padding-bottom: 1rem;
  border-bottom: var(--rule);
}

.sectionTitle {
  font-family: var(--font-display);
  font-size: var(--text-h2);
  font-weight: 700;
  letter-spacing: var(--ls-display);
  text-transform: uppercase;
}
```

- [ ] **Step 6: Build**

Run:

```bash
npm run build
```

Expected: PASS.

- [ ] **Step 7: Verify the band bleeds and does not scroll the page sideways**

Load `http://localhost:3000/` and run in `javascript_tool`:

```js
const band = document.querySelector('[aria-label="Featured study"]');
const r = band.getBoundingClientRect();
({ left: Math.round(r.left), width: Math.round(r.width), viewport: window.innerWidth,
   fill: getComputedStyle(band).backgroundColor,
   horizontalOverflow: document.documentElement.scrollWidth > document.documentElement.clientWidth })
```

Expected: `left` is 0, `width` equals `viewport`, `fill` is `rgb(0, 180, 230)`, `horizontalOverflow` is `false`. A `true` there means the bleed is overflowing and must be fixed before commit, not after.

- [ ] **Step 8: Verify the text on the band passes contrast**

Run in `javascript_tool`:

```js
const lum = c => { const [r,g,b] = c.match(/[\d.]+/g).slice(0,3).map(Number).map(v=>{v/=255;
  return v<=0.04045 ? v/12.92 : Math.pow((v+0.055)/1.055,2.4);}); return 0.2126*r+0.7152*g+0.0722*b; };
const ratio = (a,b) => { const [x,y]=[lum(a),lum(b)].sort((m,n)=>n-m); return +((x+0.05)/(y+0.05)).toFixed(2); };
const band = document.querySelector('[aria-label="Featured study"]');
const bg = getComputedStyle(band).backgroundColor;
[...band.querySelectorAll('h3,p,li,span')].filter(e => e.textContent.trim()).map(e => {
  const cs = getComputedStyle(e);
  return { text: e.textContent.trim().slice(0,28), px: parseFloat(cs.fontSize),
           ratio: ratio(cs.color, cs.backgroundColor === 'rgba(0, 0, 0, 0)' ? bg : cs.backgroundColor) };
})
```

Expected: every row with `px` under 24 has `ratio` >= 4.5; rows at 24px or above have `ratio` >= 3. Chips with their own fill report against their own background, which is correct.

- [ ] **Step 9: Screenshot**

Take a `computer` screenshot of the featured band. Expected: a full-width cyan block, black type, a black `FEATURED / 01` chip, outlined method chips.

- [ ] **Step 10: Commit**

```bash
git add app/page.tsx app/page.module.css
git commit -m "style: rule the hero and put the featured study on a cyan band"
```

---

### Task 5: Numbered index rows

**Files:**
- Modify: `app/page.tsx` (the `.index` list)
- Modify: `app/page.module.css` (the `/* ---------- Research index ---------- */` group and both narrow media queries)

**Interfaces:**
- Consumes: `--rule`, `--rule-w`, `--font-display` from Task 1.
- Produces: nothing later consumes it.

- [ ] **Step 1: Add the ordinal to the markup**

In `app/page.tsx`, change the map callback to take the index — `{rest.map((s, i) => (` — and add a number cell as the first child of the `<Link>`, before `.rowMedia`. The featured study is `01`, so the rest start at `02`:

```tsx
                  <span className={styles.rowNum} aria-hidden="true">
                    {String(i + 2).padStart(2, "0")}
                  </span>
```

The number is `aria-hidden` because it is positional decoration: the list is already a sequence to a screen reader, and hearing "zero two" before every title adds nothing.

- [ ] **Step 2: Restyle the rows**

Replace `.index`, `.row`, `.rowTitle` and `.rowArrow`, and add `.rowNum`:

```css
.index {
  border-top: var(--rule);
}

.row {
  display: grid;
  grid-template-columns: auto clamp(150px, 18vw, 220px) 1fr auto auto;
  align-items: center;
  gap: clamp(1rem, 3vw, 2.5rem);
  padding-block: clamp(1.5rem, 3vw, 2.1rem);
  border-bottom: var(--rule);
}

.rowNum {
  font-family: var(--font-display);
  font-size: clamp(1.1rem, 0.9rem + 0.8vw, 1.6rem);
  font-weight: 700;
  letter-spacing: var(--ls-display);
  color: var(--ink);
  align-self: start;
}

.rowTitle {
  font-family: var(--font-display);
  font-size: clamp(1.25rem, 0.95rem + 1.3vw, 1.9rem);
  font-weight: 700;
  letter-spacing: var(--ls-display);
  line-height: var(--lh-snug);
  text-transform: uppercase;
  background-image: linear-gradient(var(--accent), var(--accent));
  background-position: 0 100%;
  background-repeat: no-repeat;
  background-size: 0% var(--rule-w);
  transition: background-size var(--dur) var(--ease-out);
  width: fit-content;
}

.row:hover .rowTitle,
.row:focus-visible .rowTitle {
  background-size: 100% var(--rule-w);
}

.rowArrow {
  display: inline-flex;
  color: var(--ink);
  font-size: 1.4rem;
  transition: transform var(--dur) var(--ease-out), color var(--dur) var(--ease-out);
}

.row:hover .rowArrow,
.row:focus-visible .rowArrow {
  transform: translateX(6px);
  color: var(--accent);
}
```

- [ ] **Step 3: Fix the narrow breakpoints for the new column**

The row grid gained a column. In the `@media (max-width: 640px)` block, `.rowMedia` already uses `grid-column: 1 / -1` and stays correct — no change. In the `@media (max-width: 680px)` block, replace the `.row` rule with:

```css
  .row {
    grid-template-columns: auto 1fr;
    gap: 0.85rem clamp(0.75rem, 3vw, 1.25rem);
  }
```

and add, inside the same block:

```css
  .rowMain {
    grid-column: 2;
  }
  .rowMeta {
    grid-column: 1 / -1;
  }
```

- [ ] **Step 4: Leave the row methods as prose**

`.rowMethods` joins its methods with `·`. It stays that way — three outlined chips per row would out-shout the titles, and the row's job is to be scannable. No change to make; this step is here so a later reader knows it was decided rather than missed.

- [ ] **Step 5: Build**

Run:

```bash
npm run build
```

Expected: PASS.

- [ ] **Step 6: Verify the numbering and the layout at both widths**

Load `http://localhost:3000/` and run in `javascript_tool`:

```js
const rows = [...document.querySelectorAll('a[href^="/work/"]')].filter(a => a.querySelector('[class*="rowNum"]'));
rows.map(a => ({ num: a.querySelector('[class*="rowNum"]').textContent.trim(),
                 title: a.querySelector('[class*="rowTitle"]').textContent.trim().slice(0,30),
                 cols: getComputedStyle(a).gridTemplateColumns }))
```

Expected: one row, `num: "02"`, the Kraków title, and a five-track `cols` value.

Then `resize_window` to `{ preset: "mobile" }`, reload, and re-run. Expected: `cols` reports two tracks, and a `computer` screenshot shows the number beside the title rather than stranded on its own line. Reset with `resize_window` `{ preset: "desktop" }`.

- [ ] **Step 7: Commit**

```bash
git add app/page.tsx app/page.module.css
git commit -m "style: number the research index rows"
```

---

### Task 6: The StatBand component

**Files:**
- Create: `components/StatBand.tsx`
- Create: `components/StatBand.module.css`
- Modify: `app/page.tsx` (insert after the approach section)

**Interfaces:**
- Consumes: `--rule`, `--font-display`, `--font-label` from Task 1.
- Produces: `export default function StatBand({ stats, label }: { stats: readonly { value: string; label: string }[]; label: string })`.

- [ ] **Step 1: Write the stylesheet**

Create `components/StatBand.module.css`:

```css
.band {
  border-bottom: var(--rule);
}

.grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
}

/* Source order inside a cell is dt then dd, because that is what a definition
   list requires. The figure has to read first, so the cell reverses them for
   the eye only and the list stays valid. */
.cell {
  display: flex;
  flex-direction: column-reverse;
  justify-content: flex-end;
  gap: 0.5rem;
  padding: clamp(1.75rem, 4vw, 3rem) clamp(1rem, 2vw, 1.75rem);
  /* Rules between cells, not around them: the section's own border closes the
     block, and doubling it at the edges would print a 4px line. */
  border-left: var(--rule);
}

.cell:first-child {
  border-left: none;
}

.value {
  font-family: var(--font-display);
  font-size: clamp(2rem, 1.2rem + 3vw, 3.6rem);
  font-weight: 700;
  line-height: 1;
  letter-spacing: var(--ls-display);
  /* dd carries a UA margin that would push the figure off its own rule. */
  margin: 0;
}

.label {
  font-family: var(--font-label);
  font-size: var(--text-xs);
  font-weight: 600;
  letter-spacing: var(--ls-caps);
  text-transform: uppercase;
  color: var(--muted);
  max-width: 16ch;
}

@media (max-width: 760px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
  }
  /* At two columns the left rule has to come off every odd cell and a
     horizontal rule has to appear between the two rows. */
  .cell:nth-child(odd) {
    border-left: none;
  }
  .cell:nth-child(n + 3) {
    border-top: var(--rule);
  }
}
```

- [ ] **Step 2: Write the component**

Create `components/StatBand.tsx`:

```tsx
import styles from "./StatBand.module.css";

/**
 * Four figures on one rule-divided row. A `<dl>` rather than a row of divs:
 * each cell is a term and its value, and that is what a definition list is for.
 * Each pair needs its own wrapper div so the grid can put a rule between cells
 * rather than between every dt and dd. Source order is dt then dd, which the
 * list requires; the stylesheet reverses them for the eye so the figure reads
 * first.
 */
export default function StatBand({
  stats,
  label,
}: {
  stats: readonly { value: string; label: string }[];
  label: string;
}) {
  return (
    <section className={styles.band} aria-label={label}>
      <div className="container">
        <dl className={styles.grid}>
          {stats.map((s) => (
            <div key={s.label} className={styles.cell}>
              <dt className={styles.label}>{s.label}</dt>
              <dd className={styles.value}>{s.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
```

Source order is `dt` before `dd`, which keeps the list valid. The `column-reverse` in Step 1 is what puts the figure on top visually.

- [ ] **Step 3: Derive the figures rather than hardcoding them**

In `app/page.tsx`, above the `return`, add:

```tsx
  // Derived, not typed in: the number of studies and the length of the methods
  // list are already facts the page holds, and a hardcoded "2" here would go
  // stale the first time a study is added or held back. The 446 and the 3 are
  // findings from the Kraków study rather than counts of anything in lib/, so
  // those two stay literal.
  const stats = [
    { value: String(studies.length), label: "End-to-end studies" },
    { value: "446", label: "Survey respondents" },
    { value: "3", label: "Kraków districts" },
    { value: String(methods.length), label: "Research methods" },
  ];
```

- [ ] **Step 4: Render it**

Import it in `app/page.tsx`:

```tsx
import StatBand from "@/components/StatBand";
```

and place it immediately after the closing tag of the approach `<section>`, before the contact section:

```tsx
      <StatBand stats={stats} label="The work in figures" />
```

- [ ] **Step 5: Build**

Run:

```bash
npm run build
```

Expected: PASS.

- [ ] **Step 6: Verify the cells, the rules and the reading order**

Load `http://localhost:3000/` and run in `javascript_tool`:

```js
const band = document.querySelector('[aria-label="The work in figures"]');
const cells = [...band.querySelectorAll('dl > div')];
({ count: cells.length,
   values: cells.map(c => c.querySelector('dd').textContent),
   figureOnTop: cells[0].querySelector('dd').getBoundingClientRect().top
                < cells[0].querySelector('dt').getBoundingClientRect().top,
   firstBorder: getComputedStyle(cells[0]).borderLeftWidth,
   secondBorder: getComputedStyle(cells[1]).borderLeftWidth,
   columns: getComputedStyle(band.querySelector('dl')).gridTemplateColumns.split(' ').length })
```

Expected: `count: 4`, `values: ["2","446","3","8"]`, `figureOnTop: true`, `firstBorder: "0px"`, `secondBorder: "2px"`, `columns: 4`.

Then `resize_window` to `{ preset: "mobile" }`, reload, re-run. Expected: `columns: 2`, and no doubled edge rules in the `computer` screenshot. Reset to `{ preset: "desktop" }`.

- [ ] **Step 7: Commit**

```bash
git add components/StatBand.tsx components/StatBand.module.css app/page.tsx
git commit -m "feat: add the four-figure stat band to the homepage"
```

---

### Task 7: The approach and contact bands

**Files:**
- Modify: `app/page.tsx` (approach and contact sections)
- Modify: `app/page.module.css` (the approach and contact groups)

**Interfaces:**
- Consumes: `Chip` from Task 2; the revised `.darkSection` from Task 1.
- Produces: nothing later consumes it.

- [ ] **Step 1: Rule the approach band and uppercase its statement**

In `app/page.tsx`:

```tsx
      <section className={`darkSection ruled ${styles.approach}`} aria-labelledby="approach-title">
```

In `app/page.module.css`, replace `.approachTitle`:

```css
.approachTitle {
  font-family: var(--font-display);
  font-size: var(--text-statement);
  font-weight: 700;
  line-height: var(--lh-tight);
  letter-spacing: var(--ls-display);
  text-transform: uppercase;
  max-width: 18ch;
}
```

`.approachEm` keeps `color: var(--accent)`, which `.darkSection` remapped to `--accent-on-dark` in Task 1. Step 5 verifies that rather than assuming it.

- [ ] **Step 2: Chip the contact kicker**

In `app/page.tsx`, replace the contact kicker paragraph:

```tsx
          <Chip variant="accent" as="p" className={styles.contactKicker}>{site.availability}</Chip>
```

- [ ] **Step 3: Restyle the contact band**

In `app/page.module.css`, replace `.contactKicker` and `.contactTitle`:

```css
.contactKicker {
  margin-bottom: 1.25rem;
}

.contactTitle {
  font-family: var(--font-display);
  font-size: var(--text-statement);
  font-weight: 700;
  letter-spacing: var(--ls-display);
  line-height: var(--lh-tight);
  text-transform: uppercase;
  max-width: 18ch;
  margin-bottom: clamp(1.75rem, 3vw, 2.5rem);
}
```

- [ ] **Step 4: Build**

Run:

```bash
npm run build
```

Expected: PASS.

- [ ] **Step 5: Verify the dark band's accent is the lightened one**

Load `http://localhost:3000/` and run in `javascript_tool`:

```js
const lum = c => { const [r,g,b] = c.match(/[\d.]+/g).slice(0,3).map(Number).map(v=>{v/=255;
  return v<=0.04045 ? v/12.92 : Math.pow((v+0.055)/1.055,2.4);}); return 0.2126*r+0.7152*g+0.0722*b; };
const ratio = (a,b) => { const [x,y]=[lum(a),lum(b)].sort((m,n)=>n-m); return +((x+0.05)/(y+0.05)).toFixed(2); };
const dark = document.querySelector('.darkSection');
const bg = getComputedStyle(dark).backgroundColor;
const em = dark.querySelector('[class*="approachEm"]');
const body = dark.querySelector('[class*="approachBody"]');
({ bg, emColor: getComputedStyle(em).color, emSize: getComputedStyle(em).fontSize,
   emRatio: ratio(getComputedStyle(em).color, bg),
   bodyRatio: ratio(getComputedStyle(body).color, bg) })
```

Expected: `bg` is `rgb(10, 10, 10)`; `emRatio` >= 3 (display-size type, so 3:1 is the floor, and the lightened accent should land near 6); `bodyRatio` >= 4.5. If `emRatio` comes back near 4.1, `.darkSection` is still handing out the paper accent and Task 1 Step 3 was not applied correctly.

- [ ] **Step 6: Screenshot the two bands**

Take `computer` screenshots of the approach band and the contact band. Expected: a black band with bone type and a magenta emphasis clause; then the contact band on paper with a magenta chip above an uppercase Druk statement.

- [ ] **Step 7: Commit**

```bash
git add app/page.tsx app/page.module.css
git commit -m "style: rule and uppercase the approach and contact bands"
```

---

### Task 8: Shared chrome — Nav, Footer, Button

**Files:**
- Modify: `components/Nav.module.css`
- Modify: `components/Footer.module.css`
- Modify: `components/Button.module.css`

**Interfaces:**
- Consumes: `--rule`, `--rule-w`, `--key`, `--bone`, `--accent` from Task 1.
- Produces: nothing later consumes it.

- [ ] **Step 1: Rule the nav**

In `components/Nav.module.css`, replace `.header` and `.name`:

```css
.header {
  position: sticky;
  top: 0;
  z-index: var(--z-nav);
  background: var(--bg);
  border-bottom: var(--rule);
}

.name {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 0.95rem;
  letter-spacing: var(--ls-display);
  text-transform: uppercase;
  white-space: nowrap;
}
```

Druk Wide is wide, so the wordmark drops from 17px to 15px to hold roughly the same width in the bar. Step 5 checks it does not collide with the nav links at 900px.

- [ ] **Step 2: Square the buttons**

In `components/Button.module.css`, replace `.btn` and `.line`:

```css
.btn {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.85rem 1.4rem;
  font-family: var(--font-label);
  font-size: var(--text-sm);
  font-weight: 600;
  letter-spacing: var(--ls-label);
  text-transform: uppercase;
  border: var(--rule-w) solid transparent;
  cursor: pointer;
  transition: background var(--dur) var(--ease-out), color var(--dur) var(--ease-out),
    border-color var(--dur) var(--ease-out);
}

.line {
  background: transparent;
  color: var(--ink);
  border-color: var(--control-line);
}

.line:hover,
.line:focus-visible {
  border-color: var(--ink);
  background: var(--ink);
  color: var(--bg);
}
```

`.accent` keeps its declarations; the token change in Task 1 already turned it magenta.

- [ ] **Step 3: Rule the footer**

In `components/Footer.module.css`, find the declaration that sets the footer's top border (currently `1px solid var(--line)`) and change it to:

```css
  border-top: var(--rule);
```

- [ ] **Step 4: Build**

Run:

```bash
npm run build
```

Expected: PASS.

- [ ] **Step 5: Verify the nav does not collide and the button borders pass 1.4.11**

Load `http://localhost:3000/`, `resize_window` to `{ width: 900, height: 800 }`, then run in `javascript_tool`:

```js
const lum = c => { const [r,g,b] = c.match(/[\d.]+/g).slice(0,3).map(Number).map(v=>{v/=255;
  return v<=0.04045 ? v/12.92 : Math.pow((v+0.055)/1.055,2.4);}); return 0.2126*r+0.7152*g+0.0722*b; };
const ratio = (a,b) => { const [x,y]=[lum(a),lum(b)].sort((m,n)=>n-m); return +((x+0.05)/(y+0.05)).toFixed(2); };
const mark = document.querySelector('header [class*="wordmark"]');
const links = document.querySelector('header [class*="desktop"]');
const pageBg = getComputedStyle(document.body).backgroundColor;
const outlined = [...document.querySelectorAll('a[class*="line"], button[class*="line"]')];
({ gap: links ? Math.round(links.getBoundingClientRect().left - mark.getBoundingClientRect().right) : null,
   headerBorder: getComputedStyle(document.querySelector('header')).borderBottomWidth,
   buttonBorders: outlined.map(b => ratio(getComputedStyle(b).borderTopColor, pageBg)) })
```

Expected: `gap` >= 16, `headerBorder: "2px"`, every entry in `buttonBorders` >= 3. Reset with `resize_window` `{ preset: "desktop" }`.

- [ ] **Step 6: Commit**

```bash
git add components/Nav.module.css components/Footer.module.css components/Button.module.css
git commit -m "style: rule the nav and footer, square the buttons"
```

---

### Task 9: The hero shader

**Files:**
- Modify: `components/ShaderField.tsx`

**Interfaces:**
- Consumes: `--ink`, `--accent` from Task 1.
- Produces: nothing later consumes it.

- [ ] **Step 1: Read how the uniforms are fed today**

Run:

```bash
grep -n "uInk\|uAccent\|getPropertyValue\|getComputedStyle\|new Color\|\[0-9.]\{1,\}, *[0-9.]" components/ShaderField.tsx
```

Note the exact mechanism before changing anything. If the component already reads `--ink` and `--accent` off computed style, Task 1 has done this job: Steps 2 and 3 are then a no-op to confirm, not a change to make.

- [ ] **Step 2: If the colours are hardcoded, replace them with token reads**

Only if Step 1 shows literal RGB values in the source, add:

```tsx
  // Read from the cascade rather than restated here: the palette lives in
  // globals.css, and a second copy inside a shader is a copy that goes stale.
  const readToken = (name: string): [number, number, number] => {
    const probe = document.createElement("div");
    probe.style.color = `var(${name})`;
    document.body.appendChild(probe);
    const rgb = getComputedStyle(probe).color.match(/[\d.]+/g) ?? ["0", "0", "0"];
    probe.remove();
    return [Number(rgb[0]) / 255, Number(rgb[1]) / 255, Number(rgb[2]) / 255];
  };
```

and feed `readToken("--ink")` and `readToken("--accent")` to the `uInk` and `uAccent` uniforms.

- [ ] **Step 3: Build**

Run:

```bash
npm run build
```

Expected: PASS.

- [ ] **Step 4: Verify the shader renders in the new palette and stays behind the type**

Load `http://localhost:3000/` and run in `javascript_tool`:

```js
const c = document.querySelector('canvas');
const title = document.querySelector('h1');
({ canvas: !!c, w: c?.width, h: c?.height,
   canvasZ: c && getComputedStyle(c.parentElement).zIndex,
   titleZ: getComputedStyle(title.closest('.container')).zIndex })
```

Expected: `canvas: true` with non-zero dimensions, and the title container's `zIndex` above the canvas wrapper's. Take a `computer` screenshot of the hero and confirm the field reads as magenta-on-paper, not cobalt-on-white. Run `read_console_messages` with `onlyErrors: true` — expected: no WebGL errors.

- [ ] **Step 5: Commit**

```bash
git add components/ShaderField.tsx
git commit -m "style: feed the editorial palette to the hero shader"
```

---

### Task 10: Sweep the remaining routes

**Files:**
- Modify: `app/about/about.module.css`, `app/contact/contact.module.css`, `app/cv/cv.module.css`, `app/not-found.module.css`, `app/work/[slug]/study.module.css`, `components/charts/charts.module.css` and the other study stylesheets — as the audit below turns up problems.

**Interfaces:**
- Consumes: everything from Tasks 1-9.
- Produces: nothing.

- [ ] **Step 1: Find every hardcoded colour outside the token block**

Run:

```bash
grep -rn "#[0-9a-fA-F]\{3,8\}\|rgb(\|rgba(\|oklch(" app components --include=*.css --include=*.tsx | grep -v "app/globals.css" | grep -v "components/ShaderField.tsx"
```

Every hit is a colour that will not follow the new palette. Replace each with the nearest token. The literal colours inside `@media print` in `globals.css` are the one legitimate exception — they are deliberately literal so a printer is not asked to render OKLCH.

- [ ] **Step 2: Find every hairline that should now be a rule**

Run:

```bash
grep -rn "1px solid var(--ink)\|1px solid var(--control-line)" app components --include=*.css
```

Every hit is a structural edge drawn at the old weight. Change each to `var(--rule)`. Leave `1px solid var(--line)` alone — those are the decorative hairlines the system still wants thin.

- [ ] **Step 3: Walk every route and check contrast**

For each of `/`, `/about`, `/contact`, `/cv`, `/work/portfolio-desk`, `/work/krakow-touristification`, and a deliberate 404 such as `/nope`: navigate there and run

```js
const lum = c => { const [r,g,b] = c.match(/[\d.]+/g).slice(0,3).map(Number).map(v=>{v/=255;
  return v<=0.04045 ? v/12.92 : Math.pow((v+0.055)/1.055,2.4);}); return 0.2126*r+0.7152*g+0.0722*b; };
const ratio = (a,b) => { const [x,y]=[lum(a),lum(b)].sort((m,n)=>n-m); return +((x+0.05)/(y+0.05)).toFixed(2); };
const bgOf = el => { let n = el; while (n) { const c = getComputedStyle(n).backgroundColor;
  if (c && c !== 'rgba(0, 0, 0, 0)') return c; n = n.parentElement; } return 'rgb(255,255,255)'; };
[...document.querySelectorAll('p,li,a,span,h1,h2,h3,h4,dd,dt,button,td,th')]
  .filter(e => e.children.length === 0 && e.textContent.trim())
  .map(e => { const cs = getComputedStyle(e); const px = parseFloat(cs.fontSize);
    const bold = Number(cs.fontWeight) >= 700;
    const floor = (px >= 24 || (bold && px >= 18.66)) ? 3 : 4.5;
    return { t: e.textContent.trim().slice(0,30), px, r: ratio(cs.color, bgOf(e)), floor }; })
  .filter(x => x.r < x.floor)
```

Expected: an empty array on every route. Any row that comes back is a real failure — fix the token or rule that produced it, then re-run that route.

- [ ] **Step 4: Check the study page's charts still read**

The charts in `components/charts/` were drawn against the cobalt accent. Navigate to `/work/krakow-touristification`, take `computer` screenshots of each figure, and confirm no series has become invisible or now relies on cyan or yellow to carry a data distinction at small size. Where one does, re-map it to ink plus the magenta accent plus a shape or weight difference — colour alone must not be the only encoding (WCAG 1.4.1).

- [ ] **Step 5: Run the placeholder check and build**

Run:

```bash
npm run check:placeholders && npm run build
```

Expected: both PASS.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "style: sweep the remaining routes onto the editorial palette"
```

---

### Task 11: Rewrite DESIGN.md

**Files:**
- Modify: `DESIGN.md`

**Interfaces:**
- Consumes: the shipped system from Tasks 1-10.
- Produces: the document a future session reads before touching a colour.

- [ ] **Step 1: Rewrite sections 1, 2 and 3 against what shipped**

`DESIGN.md` currently describes "The Disciplined Statement": near-monochrome, one cobalt accent. Read the file, then rewrite:

- **Section 1 (Overview):** name the new system and say in two sentences what it is — a Swiss/brutalist editorial sheet built out of 2px black rules, full-bleed colour bands, and one text accent.
- **Section 2 (Colors):** list the palette tokens with their hexes and their measured contrast on paper, and state the surface-only rule as a named rule.
- **Section 3 (Typography):** keep the existing no-monospace rule verbatim. Update the display scale numbers to the values shipped in Task 1 Step 2, and add a named rule explaining why Druk Wide's measure is ~16ch and not the body measure.

Record these two new named rules explicitly, since they are the ones a future change is most likely to break:

> **The Surface-Only Rule.** Cyan, yellow and red are fills. They carry near-black text and nothing else. None of the three passes 4.5:1 on paper, so none may ever set type, an icon, or a control border. The one accent that may set type is magenta.

> **The Rule-Is-Structure Rule.** A 2px black line says where a section stops. It is not decoration and is not exempt from WCAG 1.4.11. A 1px `--line` hairline is decoration and is exempt. They are separate tokens so raising one never quietly raises the other.

- [ ] **Step 2: Update sections 5 and 6**

Add `Chip`, `Marquee` and `StatBand` to the component list with one line each on what they are for. In the Don'ts, add: do not round a corner in this system; do not add a monospace face; do not set type in cyan or yellow.

- [ ] **Step 3: Record what was deliberately not ported**

Add a short closing subsection with the two decisions a future reader will otherwise re-litigate: the prototype's 172,291px scroll-jacked hero was an export artefact and was not ported, and the prototype's Anton / Space Mono type was replaced by the site's licensed Druk Wide and Noirden.

- [ ] **Step 4: Verify the document matches the code**

Run:

```bash
grep -n "cobalt\|Disciplined Statement\|0.188 264\|0.17 264" DESIGN.md
```

Expected: no output. Any hit is a sentence describing a system that no longer exists.

- [ ] **Step 5: Commit**

```bash
git add DESIGN.md
git commit -m "docs: rewrite DESIGN.md for the editorial system"
```

---

### Task 12: Final verification

**Files:** none modified unless a check fails.

- [ ] **Step 1: Clean production build**

The audit on 2026-09-13 hit stale vendor chunks after a large change, so clear the cache rather than trusting an incremental build:

```bash
rm -rf .next && npm run build && npm run check:placeholders
```

Expected: PASS, all routes statically generated, no warnings about missing modules.

- [ ] **Step 2: Serve the production build and walk it**

```bash
npm run start
```

In the Browser pane, visit `/`, `/about`, `/contact`, `/cv`, `/work/portfolio-desk`, `/work/krakow-touristification`. On each, run `read_console_messages` with `onlyErrors: true`. Expected: no errors on any route.

- [ ] **Step 3: Check the three viewports**

At `{ preset: "mobile" }`, `{ width: 768, height: 1024 }`, and `{ preset: "desktop" }`, load `/` and run:

```js
({ overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
   width: window.innerWidth })
```

Expected: `overflow` is 0 at every width. Take a `computer` screenshot at each. Reset to `{ preset: "desktop" }`.

- [ ] **Step 4: Check keyboard focus is visible on every surface**

`--focus` changed from the cobalt accent to `--key` in Task 1. Tab through the homepage and confirm the outline is visible on the cyan band and on the black approach band. Task 1 Steps 3 and 4 set `--focus` on both; this step proves it rather than trusting it. Take a `computer` screenshot with focus resting on a control inside each of the two bands.

- [ ] **Step 5: Send the screenshots to the site owner**

Use `SendUserFile` for the three viewport screenshots and the two focus screenshots.

- [ ] **Step 6: Report**

State plainly which checks passed, which screenshots were taken, and what was deferred — in particular the homepage featured chart from spec section 5, which was not built, and why (the prototype's 74s -> 26s figures are not the study's real measured 60.90s -> 21.30s).

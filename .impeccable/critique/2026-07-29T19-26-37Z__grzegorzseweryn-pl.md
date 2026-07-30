---
target: cała strona (grzegorzseweryn.pl)
total_score: 32
p0_count: 0
p1_count: 2
timestamp: 2026-07-29T19-26-37Z
slug: grzegorzseweryn-pl
---
## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 4 | `aria-current="page"` on nav, `role="status"` + `aria-live` on the copy action, sticky section heads. Solid. |
| 2 | Match System / Real World | 4 | Plain language throughout; statistical notation is quarantined inside collapsed method notes. |
| 3 | User Control and Freedom | 3 | Skip link, back link, back-to-top, collapsible notes. No way to move between 12 sections of a 21-screen page. |
| 4 | Consistency and Standards | 3 | The case-study H1 is the only page title not set in the display face. Two different accessibility mechanisms for visualisations. |
| 5 | Error Prevention | 3 | Almost no error surface (no forms). Clipboard failure is caught but silent. |
| 6 | Recognition Rather Than Recall | 2 | No table of contents and no progress indicator on a 21-screen argument. The reader holds the structure in memory. |
| 7 | Flexibility and Efficiency | 3 | The print stylesheet is a genuine accelerator for the save-to-PDF recruiter. No section jumping. |
| 8 | Aesthetic and Minimalist Design | 3 | Disciplined and uncluttered; undercut by uppercase kickers used as section grammar. |
| 9 | Error Recovery | 3 | Custom 404 with recovery navigation. Little else to recover from. |
| 10 | Help and Documentation | 4 | Method notes, conclusion-stating captions, hidden data tables, documented provenance. Exemplary for the genre. |
| **Total** | | **32/40** | **Good** |

## Anti-Patterns Verdict

**LLM assessment.** This does not read as AI-generated. The near-monochrome ink-on-paper system, the single cobalt accent, Druk Wide against Noirden, and six hand-built SVG charts with no charting library are all committed choices with a point of view. Nothing here is a bought theme.

One trope did survive: **uppercase tracked kickers used as section grammar**. Seven rendered on the home page, six on the case study, plus `SAMPLING LOGIC` set inside the hero diagram. `APPROACH` sits directly above a heading that already announces the section. That is the pattern the brand register names as AI scaffolding, and it contradicts the project's own Scale-Is-Hierarchy rule.

**Deterministic scan.** `detect.mjs --json app components` returned `[]`, exit 0. Clean. Worth noting what that means and does not mean: the static engine reads markup, and this project's styling lives in CSS modules, so the kicker census above came from computed styles in the live page, not from the scanner. The scan is a true negative on the markup-level patterns (side-stripe borders, gradient text, card grids), not a clearance of the kicker issue.

**Visual overlays.** None available, and the reason is the site's own doing. Mutation preflight passed (title writable, inline `<script>` executes under `'unsafe-inline'`), but loading the detector bundle from `http://localhost:8400/detect.js` failed at `onerror`: the production CSP ships `script-src 'self'`, which blocks a cross-origin script. No user-visible overlay exists. In place of it I measured contrast directly in the page, resolving OKLCH through a canvas rather than parsing the string.

Measured in the live page, not inferred:

| Pair | Ratio |
|---|---|
| `--ink` on `--bg` | 17.14:1 |
| `--muted` on `--bg` | 6.98:1 |
| `--accent` on `--bg` | 6.52:1 |
| `--on-dark-muted` on `--ink-deep` | 7.81:1 |

One sub-threshold hit across both pages: the decorative `/` separator at 1.42:1, carrying `aria-hidden="true"`. Zero tap targets under 24 px. Zero horizontal document overflow at 375 px or 1280 px.

## Overall Impression

The case study is the best thing here by a distance, and it is doing exactly what the strategy asks: it argues its own limitations, publishes the coding matrix rather than summarising it, and spends a whole note explaining why an R² of 0.80 is less impressive than it looks. That is a rare and genuinely persuasive move.

The problem is that the rest of the site does not hold itself to the same standard. The home page claims eight methods and the About page claims sixteen, against an evidence base of one thesis that used four. The site's single strongest asset is honesty about the boundary of what the evidence supports, and it is the About page that breaks it.

Biggest opportunity: make the supporting pages as disciplined as the case study.

## What's Working

**The limitations section is a competitive advantage, not a liability.** "Three things this study cannot tell you" and the argument the thesis makes against its own typology are the most convincing content on the site. Most junior portfolios inflate; this one deflates on purpose, and that reads as confidence.

**The charts carry their own accessibility.** `Figure.tsx` wraps every chart with a caption that states the conclusion rather than describing the axes, a source line, and a full data table in an `.sr-only` wrapper. The hero diagram carries all three district values in its `<desc>`. This is the level of care the brand register is actually about.

**The print stylesheet is real craft.** Inverted bands flatten to ink on paper, charts stop scrolling and fit the sheet, collapsed method notes open, figures avoid page breaks, and link URLs are appended. Someone thought about the hiring manager who saves the page to PDF and reads it later.

## Priority Issues

**[P1] Unevidenced capability claims contradict the site's own thesis**
- **Why it matters**: `lib/site.ts` advertises eight methods and `app/about/page.tsx` advertises sixteen across four groups, including Research ops, Repositories, Enablement, Tree testing, Benchmarking, Contextual inquiry, Journey maps and Service blueprinting. The entire evidence base is one MA thesis using surveys, interviews, reflexive thematic analysis, and regression/cluster analysis. PRODUCT.md sets the success test as "someone who knows methodology finds nothing stretched" and names the skeptical reader as the secondary audience. This is precisely where they will find it, and it is the one place the site stops practising what the case study preaches.
- **Fix**: Cut both lists to what the work demonstrates, or split them explicitly: "used in published work" against "trained in, not yet shipped". The second framing is more honest than either padding or silence, and it matches the voice of the case study.
- **Suggested command**: `/impeccable clarify`

**[P1] The About page still carries a TODO and reads as interchangeable**
- **Why it matters**: `app/about/page.tsx:52` still holds `{/* TODO(personalise): replace with real background, sector experience, and story. */}`. The three paragraphs below it contain no university, no city, no year, no sector and no story. Every sentence could appear on any other researcher's About page. For a candidate with no commercial history, About is where a hiring manager decides whether there is a specific person here worth a call.
- **Fix**: Replace with the real thing: Jagiellonian, what pulled you to touristification, what you are aiming at next. Specificity is the whole asset.
- **Suggested command**: `/impeccable clarify`

**[P2] The flagship headline is set in the body face**
- **Why it matters**: `app/work/[slug]/study.module.css:41` declares no `font-family`, so the case study H1 renders in Noirden 900 at 50 px. The home hero, Approach band, contact title, About, Contact and 404 all use `--font-display`. The single most important headline on the site is the only one not in the display face, and Noirden at weight 900 is a synthesised heaviness rather than a designed one.
- **Fix**: Add `font-family: var(--font-display)` and set weight to 700; Druk Wide Bold has one weight and 900 does nothing but risk faux-bolding.
- **Suggested command**: `/impeccable typeset`

**[P2] Uppercase tracked kickers are used as section grammar**
- **Why it matters**: Seven on the home page, six on the case study, one inside the hero SVG. `APPROACH` above a heading that already says what the section is adds nothing but a second, weaker label. The brand register names repeated tiny uppercase tracked eyebrows as AI scaffolding, and DESIGN.md's own Scale-Is-Hierarchy rule says hierarchy comes from size and weight, not from decoration.
- **Fix**: Keep at most one as a deliberate device. "Featured" earns it because it marks a state rather than naming a section. Delete `APPROACH`, `WHAT I DO`, `CHECK THE WORK` and `SAMPLING LOGIC`, and let scale do the work.
- **Suggested command**: `/impeccable typeset`

**[P2] A 21-screen case study with no way to navigate it**
- **Why it matters**: Twelve sections, 21.6 viewports on desktop and 23.6 on mobile, with no table of contents, no progress indicator and no section jumping. PRODUCT.md's "respect the skim" rule requires that headings, numbers and charts alone tell the whole story, but a skimming reader has no way to move between them, and no way to tell how much is left. On mobile there are also eight independently scrolling chart boxes.
- **Fix**: A sticky section index in the left margin on desktop, collapsing to a progress rail on mobile. The section headings already exist and are already sticky; they need to become navigable.
- **Suggested command**: `/impeccable layout`

## Persona Red Flags

**The Skeptical Recruiter (project-specific, from PRODUCT.md: ten-second skim, often on a phone)**: Lands on a hero that says "I turn messy human behaviour into decisions teams can act on", then a strip of eight methods, then one case study. The methods strip is the second thing on the page and it is the least substantiated content on the site. On the case study, the section headings read as labels ("The gap", "Design", "Two registers") rather than claims, so a pure heading skim yields structure but not findings. The three impact numbers (446, 10, 88%) are the only things that survive a ten-second pass, and two of them are sample sizes rather than results.

**The Methodologist (project-specific, PRODUCT.md's secondary audience)**: Will be impressed by the α values, the promoter-directed subgroup test, the honesty about the non-probability sample, and the argument against the site's own typology. Then reaches About and finds "Tree testing", "Benchmarking" and "Research ops" claimed with nothing behind them, and re-reads everything with new suspicion. One unearned claim costs more here than four earned ones gain.

**Casey (distracted mobile)**: 23.6 screens with no progress indicator and no way to resume. Eight chart boxes that each need a horizontal swipe, on a page already scrolling vertically. The captions state the conclusions and sit outside the scrollers, which rescues this, but a reader who assumes charts are decorative will swipe past the actual evidence. No state persistence: leaving and returning drops them at the top.

## Minor Observations

- `Magnetic` and `CustomCursor` exist as components and are imported by nothing. Dead code in a repository that is otherwise carefully documented.
- Two accessibility mechanisms for visualisations: six charts get a hidden data table through `Figure.tsx`, the hero diagram uses `<desc>`. Both are valid and both work; the inconsistency is only a maintenance cost.
- The four `h2` elements on the home page span 33.6 px Noirden to 54.4 px Druk Wide. If "Selected research" and "I start from the question" are different levels, they should probably not share a tag.
- The display ceiling is `3.4rem` (54 px) while DESIGN.md allows up to ~6 rem and the north star is "big, self-assured headlines". Druk Wide's width compensates in mass but not in cap height. There is headroom deliberately unused.
- `--text-h3: 1.25rem` is the one fixed step in an otherwise fluid type scale.
- The decorative `/` separator sits at 1.42:1. It is `aria-hidden`, so not a WCAG failure, but it is close to invisible; either commit to it as a hairline at `--line` weight or drop it.

## Questions to Consider

- If a recruiter reads only your twelve section headings, do they learn what you found? Right now the headings name topics ("The gap", "Design", "Two registers") rather than stating claims. A heading that says "Rent pressure is the one thing every district agrees on" survives a skim; "Two registers" does not.
- What would the About page say if you deleted every sentence that could appear on another researcher's site?
- The case study proves rigour. What on this site answers the question PRODUCT.md says the recruiter is actually holding, whether you can work in a product team, on a deadline, with stakeholders?
- The thesis argues against its own typology in public. Would the methods lists survive the same treatment?

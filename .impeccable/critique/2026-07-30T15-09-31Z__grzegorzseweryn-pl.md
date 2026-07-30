---
target: cała strona (build lokalny + 2 poprawki)
total_score: 35
p0_count: 0
p1_count: 0
timestamp: 2026-07-30T15-09-31Z
slug: grzegorzseweryn-pl
---
> Corrected entry. The first version of this run recorded a P0 claiming the hero
> headline split one word per line. That was an artefact of the preview pane, not
> the site. A screenshot from a real browser on the live domain shows the headline
> rendering correctly across three lines. The P0 is withdrawn and the score
> restored; the residual, genuine part of the finding is kept below at P3.

> Assessed against the local build, which carries two fixes not yet committed:
> the active-section indicator in the contents bar, and the methods band returned
> to its earlier type size. Production is at `9ad3e5d`.

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 4 | Progress hairline, `aria-current`, live region on copy. |
| 2 | Match System / Real World | 4 | Claim headings read plainly. |
| 3 | User Control and Freedom | 4 | Twelve section anchors, native disclosure, skip link, back, print. |
| 4 | Consistency and Standards | 3 | Nine claim headings and three topic headings in one outline; the methods band is the one list group without a label. |
| 5 | Error Prevention | 3 | Almost no error surface. |
| 6 | Recognition Rather Than Recall | 3 | The active-section indicator is written but could not be exercised here, so no credit claimed. |
| 7 | Flexibility and Efficiency | 3 | Deep-linkable sections, print path, PDF. |
| 8 | Aesthetic and Minimalist Design | 4 | Restored. The headline renders correctly in a real browser. |
| 9 | Error Recovery | 3 | Custom 404 with recovery navigation. |
| 10 | Help and Documentation | 4 | Notes, captions, hidden data tables, provenance. |
| **Total** | | **35/40** | **Good** |

## Anti-Patterns Verdict

**LLM assessment.** The eyebrow scaffold is gone and stays gone. The heading-grammar tic reported last run is unchanged, because it was left for a later pass: three of twelve headings still use the identical `X, not Y` construction.

**Deterministic scan.** `detect.mjs --json app components` returned `[]`, exit 0.

**Visual overlays.** None. CSP re-checked on the local server and unchanged: `script-src 'self'` blocks the detector bundle from the live-server port.

**Environment limits, established by control test rather than assumed.** A bare `IntersectionObserver` on a bare element never fires in this pane, and `requestAnimationFrame` does not run. This run also proved the pane can produce false positives about rendering, not just false negatives: it split the hero into twelve one-word lines that a real browser renders as three. Pane measurements of anything layout-dependent need a real-browser check before they become findings.

## What's Working

**The methods band is no longer the loudest thing above the fold.** Type back to 20.8 px, band height 146 px, top edge at 844 px absolute on an 800 px viewport, so none of it is visible on first paint.

**The contents bar degrades correctly.** Server-rendered output is `Contents` plus `12 sections`, the accessible name is the stable string `Contents, 12 sections`, and the visible changing text carries `aria-hidden`, so the control never stops describing what it does.

**The heading outline still delivers the findings on a pure skim.**

## Priority Issues

**[P2] The heading grammar tic**
- Three of twelve headings use `X, not Y`; seven of twelve are finite-verb declaratives. In an outline meant to be read in sequence, that reads as formula rather than as findings.
- **Fix**: vary the construction so no two adjacent headings share a shape.
- **Suggested command**: `/impeccable clarify`

**[P2] The contents bar is closed by default**
- The structure a skimming recruiter needs is one click behind a summary that says "Contents". They will not click.
- **Fix**: open above a breakpoint where 159 px of bar is affordable; keep it closed on mobile where the panel costs 462 px.
- **Suggested command**: `/impeccable craft`

**[P3] SplitReveal never re-splits on resize**
- This is what survives of the withdrawn P0. `SplitReveal` splits once inside `document.fonts.ready.then(...)` with effect dependencies `[trigger, delay]`, and there is no resize handling. Line boxes measured at load are permanent.
- Severity is low because `releaseMasks` sets `overflow: visible` when the reveal completes: after that, resizing lets each line div re-wrap its own text without clipping, so the cost is an uneven line rhythm rather than lost text. A resize during the 0.9 s reveal could clip briefly, which is a narrow window.
- **Fix**: a debounced `ResizeObserver` that reverts and re-splits on width change.
- **Suggested command**: `/impeccable harden`

**[P3] The label system is applied unevenly**
- The methods band is the only list group on the site without a label, while the contact detail groups, the About toolkit groups and the footer columns all keep theirs.
- **Suggested command**: `/impeccable layout`

## Persona Red Flags

**The Skeptical Recruiter**: the first screen is better than it was, since the unevidenced method list has dropped below the fold on the local build. On production it is still at 23 px and still above it.

**The Methodologist**: unchanged. The About toolkit still claims sixteen methods against a study that used four, and the same antithesis appears three times in twelve headings.

**Casey (mobile)**: the resize case is this persona's, via rotation, but the consequence is cosmetic rather than broken.

## Minor Observations

- The active-section indicator's picking logic was verified by hand in the page: at the `two-registers` scroll position the same rule returns `two-registers`. The scroll listener that drives it could not be exercised, because `requestAnimationFrame` does not run in the pane.
- The indicator was first written with an `IntersectionObserver`, then rewritten to the rAF-throttled scroll listener that `ReadingProgress` already uses in the same bar. Two mechanisms for one job in one component was the wrong call.
- `Four measures the evidence supports` still couples a heading to a list length.
- The About page's personal half is still outstanding.
- `.git.corrupt` still sits in the working directory, untracked and unexamined.

## Questions to Consider

- Three runs each found something the previous one missed, and the deterministic scanner caught none of them. What class of defect would it catch, and is that the class you are worried about?
- This run also produced a false alarm from the same tooling that produces the findings. What is the cheapest real-browser check that would have caught it before it reached you?

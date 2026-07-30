---
target: cała strona (build 9ad3e5d)
total_score: 35
p0_count: 0
p1_count: 1
timestamp: 2026-07-30T10-52-46Z
slug: grzegorzseweryn-pl
---
> Assessed against the local production build at `9ad3e5d`. Production is one
> commit behind at `2608af1`, so the meta-description and dead-code fixes are not
> live yet.

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 4 | Progress hairline is new and continuous. The bar never names the current section, but that is counted under Recognition. |
| 2 | Match System / Real World | 4 | Claim headings read plainer than the topic labels they replaced. |
| 3 | User Control and Freedom | 4 | Twelve section anchors always reachable, native disclosure, skip link, back, back-to-top, collapsible notes, print path. |
| 4 | Consistency and Standards | 3 | Nine claim headings and three topic headings share one outline. The methods band lost its label while comparable list groups elsewhere kept theirs. |
| 5 | Error Prevention | 3 | Almost no error surface. Clipboard failure is caught but silent. |
| 6 | Recognition Rather Than Recall | 3 | Structure is now discoverable on demand, but the section heading is on screen for only 30% of a section and the bar reads "Contents" throughout. |
| 7 | Flexibility and Efficiency | 3 | Deep-linkable sections are a real new accelerator, alongside print and the PDF. No search, no shortcuts. |
| 8 | Aesthetic and Minimalist Design | 4 | The eyebrow scaffold is gone. What replaced it is functional chrome, not decoration. |
| 9 | Error Recovery | 3 | Custom 404 with recovery navigation. Little else to recover from. |
| 10 | Help and Documentation | 4 | Method notes, conclusion-stating captions, hidden data tables, documented provenance. |
| **Total** | | **35/40** | **Good** |

## Anti-Patterns Verdict

**LLM assessment.** The eyebrow trope that carried the last run's verdict is gone: zero uppercase tracked labels announce a section that has its own heading, and the rule separating a label from an eyebrow is now written into `globals.css` rather than living in someone's head.

A new tic replaced it, and it is mine. The claim headings converged on one grammar. Three of twelve use the identical `X, not Y` antithesis ("money, not noise", "a balance sheet, not a demographic", "the model, not the visitors") and seven of twelve are finite-verb declaratives. Read as an outline, which is exactly how the skim rule intends them to be read, the rhythm starts to sound like a template rather than a set of findings. Trading a visual reflex for a rhetorical one is not a win.

**Deterministic scan.** `detect.mjs --json app components` returned `[]`, exit 0. Same caveat as last time: the static engine reads markup, and this project's styling is in CSS modules, so a clean result covers the markup-level families (side-stripe borders, gradient text, card grids) and says nothing about the heading-grammar finding, which came from parsing the study data directly.

**Visual overlays.** None. The CSP was re-checked rather than assumed and is unchanged: `script-src 'self'` blocks the detector bundle from the live-server port, on localhost exactly as on production. No user-visible overlay exists. In its place, measurements taken inside the page: OKLCH resolved through a canvas for contrast, sticky geometry sampled across eight scroll positions, and the heading grammar counted from the source.

| Measurement | Result |
|---|---|
| Contrast violations, all routes | Two, both the `aria-hidden` decorative `/` at 1.42:1 |
| Tap targets under 24 px | 0 |
| Document overflow at 375 and 1280 | None |
| Horizontal scrollers on the study page | 8, all chart containers by design |
| Meta descriptions in the 30-160 band | 5 of 5 |
| Console and server errors | 0 |

## Overall Impression

The skim now works. Reading only the twelve `h2` elements gives you the findings rather than a table of contents, which is what PRODUCT.md's "respect the skim" rule was asking for and what the site could not do a few hours ago. That is the single biggest gain.

What the navigation work did not solve is the thing it looked like it solved. The reader can now see the structure and jump, but once inside a section they are as lost as before, because the only element that names where they are disappears almost immediately.

Biggest opportunity: make the one line of chrome that is always on screen say which section it belongs to.

## What's Working

**The heading outline earns the page.** "Touristification runs in two registers at once" survives a ten-second skim; "Two registers" did not. Splitting `navLabel` from `heading` was what made it affordable, keeping the contents panel compact and the anchors short and edit-proof.

**The contents bar navigates with no JavaScript.** Native `<details>`, real anchors, twelve targets that all resolve. Verified: the closed disclosure exposes zero links to the tab order and the open one exposes twelve, keyboard focus lands with a `solid 2px` accent ring at `3px` offset, and `scroll-margin-top` clears both sticky layers on the native path.

**The meta descriptions are fixed at the root, not patched.** `site.intro` was doing two incompatible jobs and the case study was shipping a 377-character paragraph as its search snippet. All five routes are now in band, and the split is documented so it does not silently merge again.

## Priority Issues

**[P1] No current-section signal through most of each section**
- **Why it matters**: Measured on `#two-registers`: the sticky heading holds for roughly 300 px of a 1397 px section, then releases with its containing block and scrolls away. The heading is on screen for about 30% of the section. The remaining 70% is where the charts, the method notes and the quotes live, which is exactly where a reader most needs to know which argument they are inside. The contents bar is on screen throughout and says "Contents". So the page has a permanent line of chrome and does not use it to answer the question that chrome exists to answer.
- **Fix**: Have the bar's summary name the current section, swapping "Contents" for the active `navLabel`. An IntersectionObserver over the twelve sections, degrading to the static word when JavaScript is off. The bar, the labels and the ids all exist; this is wiring, not new structure.
- **Suggested command**: `/impeccable craft` for the observer, or `/impeccable polish` if it should stay minimal.

**[P2] The claim headings converged on one grammar**
- **Why it matters**: Three of twelve use the same `X, not Y` construction and seven of twelve are finite-verb declaratives. Individually each is a good heading. In sequence they read as a formula, and the outline is precisely what the skim rule sends a reader to read in sequence. A methodologist who notices the pattern will read the confidence as rhetorical rather than earned.
- **Fix**: Vary the shape. Keep one antithesis, turn one into a number ("88% agree on one thing: rent"), let one stay a plain noun phrase. The point is that no two adjacent headings share a construction.
- **Suggested command**: `/impeccable clarify`

**[P2] The methods band is louder than the evidence behind it**
- **Why it matters**: Eight method names now sit at 23 px in the first 800 px of the home page, in a 154 px band with no visible label. Removing the "WHAT I DO" eyebrow was right, but the band grew about 10% in type size and lost its framing at the same time, so the least substantiated content on the site became the second thing a recruiter sees and no longer says what it is. You have decided the list itself stays, which is your call; the prominence is a separate decision and it is currently accidental rather than chosen.
- **Fix**: Either give the band framing that is not an eyebrow (a leading sentence, or fold it into the hero paragraph), or return the type to its previous size so it reads as supporting metadata rather than a claim.
- **Suggested command**: `/impeccable layout`

**[P2] The contents bar is closed by default, so the skimmer may never see it**
- **Why it matters**: The skim rule assumes headings, numbers and charts alone tell the story. The structure that makes the argument navigable is one click behind a summary that says "Contents". A recruiter deciding in ten seconds does not click. The bar solves the problem for a reader who is already committed, which is not the reader PRODUCT.md is worried about.
- **Fix**: Open it by default above a breakpoint where 159 px of bar is affordable, and keep it closed on mobile where 462 px is not. `<details open>` conditioned on a media query needs a small client component, or the panel can start open and collapse on first scroll.
- **Suggested command**: `/impeccable craft`

**[P3] Two sticky layers cost 15% of the viewport permanently**
- **Why it matters**: Nav 73 px plus bar 45 px is 117 px of an 800 px viewport, and briefly 31% when a section heading pins beneath them at 128 px with a three-line claim. Section heads go `static` below 760 px so mobile is unaffected. It is a real budget, spent on orientation, and worth spending; it is listed so the next feature that wants to stick knows what is left.
- **Fix**: None needed now. If a third sticky layer is ever proposed, this is the reason to refuse it.
- **Suggested command**: none

## Persona Red Flags

**The Skeptical Recruiter (ten seconds, often a phone)**: Lands on a hero that now leads with evidence rather than restating the headline, which is a genuine improvement. Then hits eight unevidenced method names at 23 px before reaching any work. On the case study the outline finally rewards a heading skim, but the contents bar that would show them the shape of the argument is closed, and they will not open it.

**The Methodologist (PRODUCT.md's secondary reader)**: Gets a much better first pass, because the headings now state findings that can be checked against the charts underneath. Two things will still catch their eye: the About toolkit claiming sixteen methods against a study that used four, and the heading grammar converging on the same antithesis three times, which reads as persuasion technique on a page whose whole argument is that it does not need any.

**Casey (distracted, mobile)**: 24.1 screens, up from 23.6. The progress hairline now answers "how much is left", which is the biggest single gain for this persona. Eight chart boxes still each need a horizontal swipe. Opening the contents costs 462 px of a 812 px screen, which is a lot but it collapses again.

## Minor Observations

- The outline mixes registers: nine claims, then "What this doesn't support", "How I work" and "Check the work" as topics. Defensible, since those three are not findings, but the seam is visible.
- The label system is now applied unevenly. The methods band has no label while the contact detail groups, the About toolkit groups and the footer columns all keep theirs. Either the band is the exception for a reason worth writing down, or it wants framing.
- `Four measures the evidence supports` couples the heading to the number of list items. Accurate today; it lies the moment a fifth is added.
- The About page's personal half is still outstanding, and it is the one item from the last run that no command can close without you.
- `.git.corrupt` still sits in the working directory. Not tracked, so the repository is clean, but it is debris from the earlier failure and nobody has established whether it holds anything.
- The page grew from 23.6 to 24.1 screens on mobile. The bar and the longer headings paid for themselves, but the trend is worth watching.

## Questions to Consider

- The bar is on screen for the entire case study and spends that space saying "Contents". What is the most useful thing a permanently visible line could say?
- If three headings use "X, not Y", is the antithesis a finding or a habit? Which one of the three is genuinely the sharpest way to state that result?
- The methods band is the second thing on the page and the least defensible. What would go there instead if it had to earn its position on evidence?
- The thesis publishes the argument against its own typology. The headings now assert twelve conclusions in a confident register. Does the page still sound like it is arguing, or like it is announcing?

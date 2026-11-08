# Product: Grzegorz Seweryn Portfolio

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary audience: Design leads, UX research managers, product design directors, and hiring managers at digital product companies and agencies. They evaluate entry-level candidates under time pressure, looking for evidence of real research rigor, interface execution ability, and intellectual honesty.

## Product Purpose

A portfolio presenting Grzegorz Seweryn's work to secure his first commercial role as a Junior UX Researcher, Junior Product Designer, or UX Generalist. Success means moving hiring managers from quick triage to detailed review and interview invitations, demonstrating that his dual background (sociology/data analysis + graphic design/UX) solves real product problems.

## Positioning

Combines formal visual design training (BA in Graphic Design & UX, Tischner European University) with academic empirical research rigor (MA in Sociology, Data Analysis & Social Research specialization, Jagiellonian University).

Unlike common junior portfolios with hypothetical redesigns or vanity metrics, this portfolio emphasizes:
- Evidence before claims: actual datasets, empirical survey instruments, in-depth interviews, and cognitive task modeling (KLM-GOMS).
- Intellectual honesty: explicit limitations, transparent scope, and separation of raw participant findings from personal interpretation.
- Simple, not simplistic: clear, modest, and analytical presentation without corporate clichés or AI-sounding jargon.

## Operating Context

- Evaluated during high-volume hiring rounds. Reviewers spend 1 to 3 minutes on an initial scan (hero, capabilities, case study thumbnails) before deciding whether to read a deep-dive case study.
- Desktop and mobile viewports are both critical (reviewers may browse on desktop monitors or review links on mobile devices).
- Bilingual delivery: Polish (pl) and English (en) switchable throughout the experience.
- Interactive evaluation: Reviewers inspect interactive data visualizations (touristification charts), interactive UI canvases, and full-resolution device mockups.

## Capabilities and Constraints

- Three end-to-end case studies:
  1. Portfolio Desk: Self-initiated loan servicing audit and KLM-GOMS redesign reducing task completion time by 65%.
  2. Kraków Touristification: Sole-authored mixed-methods MA thesis research based on 446 survey respondents and 10 in-depth interviews (IDI).
  3. PetCare: Shared pet care coordination UX/UI concept built with extensive caregiver research, user flows, and Figma design tokens.
- Technical stack: React 18, Vite, TypeScript, Tailwind CSS, Framer Motion.
- Static hosting with client-side routing, accessible via standard web browsers.
- No backend dependency or user authentication; fully static and fast.

## Brand Commitments

- Candidate: Grzegorz Seweryn (Kraków, Poland).
- Communication style strictly governed by voice_principles.md:
  - Calm, direct, precise, analytical, modest, and natural.
  - No em dashes (Rule 25).
  - No exaggerated adjectives, marketing fluff, or manufactured business impact numbers.
  - Candid acknowledgement of limits and unvalidated assumptions.
- Visual authenticity: real portrait photography, original research artifacts, actual interview quotes, and real statistical models.

## Evidence on Hand

- src/data/thesis/: Complete thesis datasets, including survey models (models.json), code registers (registers.json), coding typology (typology.json), and primary source documentation (SOURCES.md).
- wywiady_IDI_opiekunowie_zwierzat.md: Full qualitative interview transcripts and analysis for PetCare.
- src/i18n/: Complete bilingual copy validated against voice principles (portfolioDesk.ts, touristification.ts, petcare.ts, home.ts, about.ts, work.ts).
- public/: High-resolution webp/png mockups, real photographic portraits (grzegorz-seweryn-portrait.webp, aboutzdjecie.webp).

## Product Principles

1. Evidence before claims: Ground every design decision in empirical data or task models; never fabricate metrics.
2. Simple, not simplistic: Keep language and layouts clear and accessible without stripping away necessary domain depth or methodological nuance.
3. Transparent limitations: State sample sizes, constraints, and untested assumptions alongside findings rather than burying them.
4. Dual-craft integration: Present research as the rationale for interface decisions and UI design as the realization of research insights; neither exists purely as decoration.

## Accessibility & Inclusion

- Compliance with WCAG 2.2 AA standards across contrast, keyboard navigability, semantic document structure, and focus management.
- Bilingual accessibility with proper lang attributes, descriptive image alternative text, and clear typographic hierarchy.

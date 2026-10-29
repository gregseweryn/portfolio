# Motion Tokens Studio: Design Specification

Status: Approved by owner (grill-me session, 29 Oct 2026). Refined for autonomous execution in an isolated Gemini session.

## 1. Problem & Context
In digital product teams, interface motion is frequently treated as an afterthought or implemented with arbitrary, hardcoded values (e.g. random durations between 80ms and 900ms, linear transitions, abrupt layout jumps, or lack of reduced-motion support). Designer-to-developer handoff for motion is traditionally vague: screen recordings, animated GIFs, or prose descriptions like "make it feel snappy".

The **Motion Tokens Studio** project demonstrates how motion can be systematised into typed, accessible, and multi-tier tokens, proven through a live, dark "devtools" interactive studio embedded directly in a bilingual portfolio case study.

## 2. Target Audience & First Impression
- **Primary user:** Recruiter, Design Lead, or Product Lead who has 2 minutes to evaluate the candidate's craft and systems thinking.
- **First impression ("The Wow Factor"):** A prominent **"Before / After" toggle** right above the preview card:
  - *Before (Chaotic):* The sample UI uses inconsistent durations, linear easings, no anticipation, and abrupt stops.
  - *After (Tokenised):* The exact same UI runs on a cohesive motion system: spring-backed dialogs, swift tooltips, smooth accordion disclosure, and fluid dropdown menus.
- **Secondary user:** Design Engineer or Frontend Developer looking for production-ready code snippets (CSS Custom Properties, Tailwind plugin configs, Framer Motion transitions, and W3C Design Tokens JSON).

## 3. Heuristic Framework: Jakob Nielsen's 10 Usability Heuristics
The case study includes an explicit expert heuristic evaluation table showing how each of Nielsen's 10 principles directly drove an architectural decision in the studio interface:

| # | Nielsen Heuristic | Studio Implementation Decision | Verification in Code |
|---|---|---|---|
| 1 | **Visibility of system status** | Real-time readout of active token values (ms, curve, spring parameters); animated live status indicator ("READY / 60 FPS"); copy buttons announce "Copied to clipboard" via `aria-live="polite"`. | Live region & readout tests |
| 2 | **Match between system and the real world** | Tokens use plain, human semantic roles ("Enter", "Exit", "Feedback", "Emphasis") rather than raw technical math in the primary view; spring damping mirrors physical resistance. | Semantic naming structure in `tokens.ts` |
| 3 | **User control and freedom** | Granular "Reset" button for each individual token; global "Reset All to Defaults"; Escape key immediately dismisses open modals and dropdowns without side-effects. | Keyboard handler & context tests |
| 4 | **Consistency and standards** | WAI-ARIA Authoring Practices keyboard patterns for all 4 components; standardized control rows across all token tiers; unified slider + numeric input pairing. | Testing Library user-event assertions |
| 5 | **Error prevention** | Mathematical bounds clamping on all inputs: spring stiffness (20-1000), damping (1-100), mass (0.1-10), duration (0-2000ms); out-of-range values clamp smoothly with an inline warning rather than breaking the animation runtime. | `validate.test.ts` clamp tests |
| 6 | **Recognition rather than recall** | Visual SVG curve preview updates interactively as bezier handles or spring numbers change; presets list displayed openly so users do not memorize physics constants. | `CurvePreview.tsx` render |
| 7 | **Flexibility and efficiency of use** | One-click presets for quick evaluation; fine-grained numeric inputs and keyboard arrow adjustments for power users. | Input change & preset selection tests |
| 8 | **Aesthetic and minimalist design** | High-contrast dark "devtools" interface with clear hierarchy: 3-column layout on desktop (Inspector | Playground | Exporter) and clean tabbed navigation on mobile viewports. | Responsive layout tests (320px-1280px) |
| 9 | **Help users recognize, diagnose, and recover from errors** | Typing non-numeric or out-of-bounds text into number fields retains the last valid numeric state and displays a concise range hint. | `parseNumberInput` error handling |
| 10 | **Help and documentation** | Contextual tooltip/hint for each token explaining when and why to use it (e.g. "Use duration-fast for micro-feedback such as tooltip appearance and button states"); bilingual documentation. | `hint[lang]` in UI and tests |

*Explicit note:* This is documented as an expert heuristic inspection and design rationale, not a claim of user testing with human participants.

## 4. Token Architecture & Tiers
The single source of truth is `src/motion-studio/tokens.ts`:
1. **Primitive Tokens:** Raw physical values (Durations: `120ms`, `200ms`, `320ms`; Easings: `ease-out`, `ease-in-out`; Springs: `spring-snappy`, `spring-soft`).
2. **Semantic Tokens:** Intent-based aliases pointing to primitives via `ref` (`motion-enter`, `motion-exit`, `motion-feedback`, `motion-emphasis`).
3. **Component Tokens:** Scoped component bindings (`modal-enter`, `tooltip-enter`, `accordion-expand`, `dropdown-open`).
4. **Accessible Variants (`reduced`):** Each token explicitly declares its fallback behavior when reduced motion is preferred (zero translation/scale, opacity fade only with reduced duration).

## 5. Visual Identity & Contrast Strategy
- **Case Study Surroundings:** Light portfolio aesthetic (`#FFFFFF` canvas, Geist Sans, `#111111` headings, zinc body text) matching `DESIGN.md`.
- **Studio Interface:** Dedicated dark devtools theme (`bg-zinc-950`, border `border-zinc-800`, text `text-zinc-100`, monospace data tags in `font-mono`, neon cyan/violet SVG curve strokes).
- **Responsive Guarantee:** On screens below 1024px (and specifically at 390px and 320px), the 3 columns collapse into a 3-tab segmented control: `[ Controls | Preview | Code ]`, eliminating horizontal overflow.

## 6. Connectors & External Integrations
1. **Figma MCP (`figma_figma`):**
   - Create a dedicated Figma file "Motion Tokens Studio" under team `Portfolio` (`team::1624891726134606124`) using `create_new_file`.
   - Export W3C Design Tokens JSON from the studio and map them into the Figma file.
   - Embed the direct Figma file link in the case study.
2. **Notion MCP (`notion_notion`):**
   - Publish or sync the design spec and Nielsen heuristic ledger to "Grzegorz Seweryn’s Space" for external record-keeping.

## 7. Explicit Evidence & Limits
- Follow `voice_principles.md`. No em dashes. No invented metrics.
- Plainly state limitations: no live human participant testing, no formal WCAG certification audit, Figma prototypes approximate spring physics with cubic-bezier curves.

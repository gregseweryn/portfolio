# Motion Tokens Studio: Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build and publish a high-craft motion token design system with an interactive dark-theme devtools studio, W3C token exports, and a bilingual case study at `/work/motion-tokens`.

**Architecture:** A typed TypeScript token definition is the single source of truth. The studio manages a working copy in React Context with localStorage persistence, previews real-time motion changes across four accessible components (with a Before/After comparison toggle), and generates export snippets for CSS, Tailwind, Framer Motion, and W3C Design Tokens JSON. The studio is embedded in `/work/motion-tokens`, matching existing routing, sitemap, and static metadata generation patterns.

**Tech Stack:** React 19, Vite 6, TypeScript 5.7, Tailwind CSS 3.4, Framer Motion 12. Dev dependencies: `vitest`, `jsdom`, `@testing-library/react@^16.1.0`, `@testing-library/user-event`, `@testing-library/jest-dom`.

**Spec Reference:** `docs/superpowers/specs/2026-10-29-motion-tokens-studio-design.md`.

## Global Constraints

- **Workspace:** Work on branch `feat/motion-tokens` in isolated worktree `.worktrees/motion-tokens`.
- **Commit discipline:** One clean commit per task. Run `npm test` and `npm run build` after each task; both must exit with code 0 before committing.
- **Voice Principles:** Strictly follow `voice_principles.md` and `PRODUCT.md`. Never use em dashes (use colons, parentheses, or separate sentences). No manufactured percentages or marketing hype. Plainly state scope boundaries.
- **Bilingual:** All user-facing strings must exist in Polish and English via `src/i18n/motionTokens.ts` registered in `src/i18n/index.ts`.
- **Visual Contrast:** Studio UI is dark (`bg-zinc-950`, `border-zinc-800`, monospace readouts); surrounding case study text uses portfolio light aesthetic (`#FFFFFF`, `#111111`, zinc-600).
- **Responsive Guarantee:** No horizontal scrollbar at any viewport from 1280px down to 320px. On viewports below 1024px, the studio switches to a 3-tab segmented layout (`Controls | Preview | Code`).
- **Accessibility:** All 4 components follow WAI-ARIA Authoring Practices keyboard patterns with visible focus rings. Every motion token provides a reduced-motion variant (opacity-only fade).
- **Do not mutate existing case studies:** Leave Portfolio Desk, Kraków Touristification, and PetCare code untouched.

## Review Focus (Key Failure Modes to Guard Against)

1. **Extreme Spring Values:** Setting stiffness 1 and damping 0 must not freeze the browser or produce NaN/Infinity; inputs clamp to safe bounds (`stiffness: 20-1000`, `damping: 1-100`, `mass: 0.1-10`) with an inline warning badge.
2. **Reduced Motion Simulation:** Toggling the Studio's manual "Simulate Reduced Motion" switch must immediately override OS defaults inside the studio preview, eliminating all transforms and translating motions while preserving opacity transitions.
3. **Number Field Input Recovery:** Pasting empty, negative, or invalid strings into numeric inputs must retain the last valid state and present an inline range hint without crashing.
4. **Keyboard Focus Trap in Modal:** Opening the modal traps Tab focus inside; hitting Escape immediately closes the dialog and restores DOM focus to the triggering button.
5. **Dropdown Keyboard Traversal:** ArrowDown and ArrowUp navigate dropdown options; Enter/Space selects; Escape dismisses and returns focus to the toggle.
6. **Zero-Edit and Empty Export Integrity:** Exporting tokens with zero edits or after resetting all tokens produces syntactically valid CSS and valid JSON.
7. **Mobile 320px Viewport:** Studio controls, preview card, and code blocks render without horizontal page overflow.

---

### Task 1: Test Tooling & Environment Setup

**Files:**
- Modify: `package.json` (add scripts: `"test": "vitest run"`, `"test:watch": "vitest"`), `vite.config.ts` (configure `test` block)
- Create: `src/test/setup.ts`, `src/test/smoke.test.ts`

**Interfaces:**
- Produces: Working `npm test` command executing in a JSDOM environment.

- [ ] **Step 1: Install testing devDependencies**
  Run: `npm install -D vitest jsdom @testing-library/react@^16.1.0 @testing-library/jest-dom @testing-library/user-event`
- [ ] **Step 2: Configure `vite.config.ts` and `src/test/setup.ts`**
  Add test config with `environment: 'jsdom'`, `globals: true`, and `setupFiles: ['./src/test/setup.ts']`. In `src/test/setup.ts`, import `@testing-library/jest-dom/vitest`.
- [ ] **Step 3: Write failing smoke test**
  In `src/test/smoke.test.ts`, write a test asserting DOM availability and basic math.
- [ ] **Step 4: Run test to verify execution**
  Run: `npm test`
  Expected: PASS
- [ ] **Step 5: Verify build integrity**
  Run: `npm run build`
  Expected: Exit code 0 (TypeScript compilation succeeds without vitest config errors).
- [ ] **Step 6: Commit**
  ```bash
  git add package.json package-lock.json vite.config.ts src/test/
  git commit -m "chore: configure vitest and testing-library environment"
  ```

---

### Task 2: Token Model, Clamping & Multi-target Exporters

**Files:**
- Create: `src/motion-studio/tokens.ts`, `src/motion-studio/validate.ts`, `src/motion-studio/exporters.ts`
- Test: `src/motion-studio/validate.test.ts`, `src/motion-studio/exporters.test.ts`

**Interfaces:**
- Produces in `tokens.ts`:
  - `type Easing = { type: 'bezier'; points: [number, number, number, number] }`
  - `type Spring = { type: 'spring'; stiffness: number; damping: number; mass: number }`
  - `type Duration = { type: 'duration'; ms: number }`
  - `type TokenTier = 'primitive' | 'semantic' | 'component'`
  - `type MotionToken = { id: string; tier: TokenTier; label: { en: string; pl: string }; hint: { en: string; pl: string }; value: Easing | Spring | Duration; reduced: { type: 'duration'; ms: number }; ref?: string }`
  - `defaultTokens: MotionToken[]` (primitives: `duration-fast: 120ms`, `duration-base: 200ms`, `duration-slow: 320ms`, `ease-out: [0.23, 1, 0.32, 1]`, `spring-snappy: { stiffness: 300, damping: 28, mass: 1 }`; semantics: `enter`, `exit`, `feedback`, `emphasis`; components: `modal`, `tooltip`, `accordion`, `dropdown`)
  - `chaoticTokens: MotionToken[]` (un-tokenized baseline for Before/After: mismatched durations 90ms-850ms, linear transitions, zero bounce).
- Produces in `validate.ts`:
  - `BOUNDS`: duration (0-2000ms), stiffness (20-1000), damping (1-100), mass (0.1-10), bezier coords.
  - `validateValue(val)`: clamps safely without throwing, returning `{ value, warnings: string[] }`.
  - `parseNumberInput(raw, fallback, min, max)`: validates user input strings.
- Produces in `exporters.ts`:
  - `toCss(tokens): string` (CSS variables with `:root` and `@media (prefers-reduced-motion)` block).
  - `toTailwind(tokens): string` (Tailwind transition timing and duration extension).
  - `toFramer(tokens): string` (TypeScript object with Framer Motion `Transition` objects).
  - `toW3cJson(tokens): string` (Standard W3C Design Tokens Community Group JSON format).

- [ ] **Step 1: Write failing unit tests**
  In `validate.test.ts`: test out-of-range spring damping clamping (`damping: 0 -> 1`), duration bounds clamping, and string parsing resilience.
  In `exporters.test.ts`: test `toCss(defaultTokens)` generates valid custom properties, `toCss([])` generates valid empty block, `toW3cJson(defaultTokens)` outputs valid JSON with `$value` and `$type: "duration"`.
- [ ] **Step 2: Run tests to verify failure**
  Run: `npx vitest run src/motion-studio`
  Expected: FAIL (modules not implemented).
- [ ] **Step 3: Implement `tokens.ts`, `validate.ts`, and `exporters.ts`**
  Implement types, constants, default token sets, bounds validation, and text serializers.
- [ ] **Step 4: Run tests to verify pass**
  Run: `npx vitest run src/motion-studio`
  Expected: PASS
- [ ] **Step 5: Verify build & commit**
  Run: `npm run build`
  ```bash
  git add src/motion-studio/
  git commit -m "feat: implement motion token definitions, bounds validation and exporters"
  ```

---

### Task 3: Studio State Management & Context

**Files:**
- Create: `src/motion-studio/MotionContext.tsx`
- Test: `src/motion-studio/MotionContext.test.tsx`

**Interfaces:**
- Produces:
  - `MotionProvider: React.FC<{ children: React.ReactNode }>`
  - `useMotionTokens(): { tokens: MotionToken[]; mode: 'before' | 'after'; reducedOverride: boolean | null; effectiveReduced: boolean; setMode: (m: 'before' | 'after') => void; setReducedOverride: (o: boolean | null) => void; updateToken: (id: string, val: MotionToken['value']) => { warnings: string[] }; resetToken: (id: string) => void; resetAll: () => void }`
  - Persistence: saves working tokens in `localStorage` under `motion-studio-v1`. Falls back gracefully if storage is restricted.

- [ ] **Step 1: Write failing context tests**
  Test updating a token reflects in `tokens`, resetting a token restores default, toggling `mode` swaps between `chaoticTokens` and user tokens, `effectiveReduced` respects `reducedOverride` over system media query, corrupted localStorage initializes with defaults without throwing.
- [ ] **Step 2: Run tests to verify failure**
  Run: `npx vitest run src/motion-studio/MotionContext.test.tsx`
  Expected: FAIL
- [ ] **Step 3: Implement `MotionContext.tsx`**
  Implement React Context, localStorage hydration, update handlers, and media-query listener.
- [ ] **Step 4: Run tests and verify pass**
  Run: `npm test`
  Expected: PASS
- [ ] **Step 5: Verify build & commit**
  Run: `npm run build`
  ```bash
  git add src/motion-studio/MotionContext.tsx src/motion-studio/MotionContext.test.tsx
  git commit -m "feat: add motion studio state context with persistence and reduced motion override"
  ```

---

### Task 4: Accessible Preview Components

**Files:**
- Create:
  - `src/motion-studio/components/motion-helper.ts` (helper mapping active tokens into Framer Motion `Transition`; strips transforms when `effectiveReduced` is true).
  - `src/motion-studio/components/Modal.tsx`
  - `src/motion-studio/components/Tooltip.tsx`
  - `src/motion-studio/components/Accordion.tsx`
  - `src/motion-studio/components/Dropdown.tsx`
- Test: `src/motion-studio/components/components.test.tsx`

**Interfaces:**
- Consumes: `useMotionTokens()` from `MotionContext.tsx`.
- Produces accessible, keyboard-operable components:
  - `Modal`: dialog role, focus trap, Escape key dismiss, backdrop fade, card scale/spring enter.
  - `Tooltip`: keyboard focus trigger, hover trigger, quick enter with slight slide-up, Escape dismiss.
  - `Accordion`: disclosure pattern, Enter/Space toggle, `aria-expanded`, smooth height measurement via `height: auto` and `overflow: hidden`, chevron rotation.
  - `Dropdown`: menu button pattern, ArrowDown/ArrowUp navigation, Enter selection, Escape dismiss.

- [ ] **Step 1: Write failing component accessibility and motion tests**
  Test Escape closes Modal and returns focus to trigger button; Tab stays inside open Modal; Tooltip reveals on focus; Accordion toggles on Enter/Space; Dropdown opens on ArrowDown and closes on Escape; when `effectiveReduced` is true, animating elements receive opacity transitions without translate/scale styles.
- [ ] **Step 2: Run tests to verify failure**
  Run: `npx vitest run src/motion-studio/components`
  Expected: FAIL
- [ ] **Step 3: Implement components and helper**
  Implement components with WAI-ARIA attributes, focus management, and tokenized Framer Motion transitions.
- [ ] **Step 4: Run tests to verify pass**
  Run: `npm test`
  Expected: PASS
- [ ] **Step 5: Verify build & commit**
  Run: `npm run build`
  ```bash
  git add src/motion-studio/components/
  git commit -m "feat: implement accessible modal, tooltip, accordion and dropdown components"
  ```

---

### Task 5: Dark Devtools Studio UI & Interactive Playground

**Files:**
- Create:
  - `src/motion-studio/Studio.tsx` (main shell)
  - `src/motion-studio/Controls.tsx` (token tier groups, sliders, number inputs, reset buttons)
  - `src/motion-studio/CurvePreview.tsx` (SVG visualization of cubic-bezier and spring bounce response)
  - `src/motion-studio/PlaygroundCard.tsx` (sample UI card combining the 4 components)
  - `src/motion-studio/ExportPanel.tsx` (syntax tabs, copy button with `aria-live` announcement)
  - `src/motion-studio/studio.css` (dark devtools styling variables and scrollbar refinements)
- Test: `src/motion-studio/Studio.test.tsx`

**Interfaces:**
- Produces: `Studio: React.FC`
  - Top Bar: Studio title, live status badge ("READY / 60 FPS"), Before/After switch, Simulate Reduced Motion switch, Global Reset.
  - Layout: Desktop 3-column (`lg:grid lg:grid-cols-12`: Controls 4 cols, Playground 5 cols, Code 3 cols); Mobile responsive tab selector (`[ Controls | Preview | Code ]`).
  - Interactive SVG curve graph for real-time visualization.

- [ ] **Step 1: Write failing Studio UI tests**
  Test Before/After switch changes mode and updates preview styles; Copy button displays "Copied" and announces via `aria-live="polite"`; mobile tab buttons toggle active visible pane; CurvePreview renders valid SVG path.
- [ ] **Step 2: Run tests to verify failure**
  Run: `npx vitest run src/motion-studio/Studio.test.tsx`
  Expected: FAIL
- [ ] **Step 3: Implement Studio UI components and styling**
  Implement dark theme styling, SVG curve math, tab navigation, and live copy notifications.
- [ ] **Step 4: Run tests to verify pass**
  Run: `npm test`
  Expected: PASS
- [ ] **Step 5: Verify responsive layout in browser**
  Run: `npm run dev`, verify at 1280px, 390px, and 320px in browser. Confirm zero horizontal page scroll and full keyboard operability.
- [ ] **Step 6: Verify build & commit**
  Run: `npm run build`
  ```bash
  git add src/motion-studio/
  git commit -m "feat: build dark devtools studio interface with live curve preview and code exporter"
  ```

---

### Task 6: Case Study Page, Pre-render Script & Routing Integration

**Files:**
- Create:
  - `src/pages/CaseStudyMotionTokens.tsx`
  - `src/i18n/motionTokens.ts`
  - `public/work/motion-tokens/cover.png`
  - `scripts/render-case-study-meta.mjs` (generic metadata pre-renderer covering both PetCare and Motion Tokens)
- Modify:
  - `src/i18n/index.ts`, `src/i18n/common.ts`, `src/i18n/work.ts`, `src/i18n/home.ts`
  - `src/App.tsx` (lazy load `CaseStudyMotionTokens`, register route `/work/motion-tokens`, update SEO meta map)
  - `src/pages/WorkPage.tsx` and `src/pages/HomePage.tsx` (add 4th project showcase card)
  - `package.json` (update build script to use `render-case-study-meta.mjs`)
  - `vercel.json` (add route rewrite for `/work/motion-tokens`)
  - `public/sitemap.xml` (add `/work/motion-tokens` entry)
- Test: `src/pages/CaseStudyMotionTokens.test.tsx`

**Interfaces:**
- Produces: Live route `/work/motion-tokens` with full bilingual case study.
  - Sections: Editorial hero, embedded Studio, 10-row Nielsen Heuristics audit table, token architecture diagram, component documentation, evidence limits and explicit constraints.

- [ ] **Step 1: Write failing case study test**
  Test page renders heading in EN and PL, renders 10 rows in the Nielsen table, includes the embedded Studio, and renders the explicit limitations notice.
- [ ] **Step 2: Run tests to verify failure**
  Run: `npx vitest run src/pages/CaseStudyMotionTokens.test.tsx`
  Expected: FAIL
- [ ] **Step 3: Implement content, page, routing, and pre-render script**
  Create bilingual copy, wire route in `App.tsx`, update `vercel.json` and sitemap, ensure `render-case-study-meta.mjs` outputs `dist/work/motion-tokens/index.html` with correct social tags.
- [ ] **Step 4: Run tests and build to verify pass**
  Run: `npm test && npm run build`
  Verify `dist/work/motion-tokens/index.html` is generated.
- [ ] **Step 5: Verify build & commit**
  ```bash
  git add src/ public/ scripts/ package.json vercel.json
  git commit -m "feat: integrate motion tokens case study, bilingual copy, routing and static metadata"
  ```

---

### Task 7: Figma & Notion MCP Integration

**Files:**
- Create: `public/work/motion-tokens/tokens.w3c.json`, `docs/motion-tokens/figma.md`, `docs/motion-tokens/notion.md`

- [ ] **Step 1: Export W3C tokens JSON**
  Generate `tokens.w3c.json` from `toW3cJson(defaultTokens)` and place in `public/work/motion-tokens/`.
- [ ] **Step 2: Create Figma file via Figma MCP**
  Call `create_new_file` tool on `figma_figma` with `fileName: "Motion Tokens Studio"`, `planKey: "team::1624891726134606124"`, `editorType: "design"`.
  Save returned URL and file key into `docs/motion-tokens/figma.md`.
- [ ] **Step 3: Link Figma file in Case Study**
  Update `CaseStudyMotionTokens.tsx` with a direct link to the new Figma file and note the spring approximation constraint.
- [ ] **Step 4: Sync Specification to Notion via Notion MCP**
  Call `notion-create-pages` in Notion workspace ("Grzegorz Seweryn’s Space") to create a structured document containing the spec and the 10 Nielsen heuristics table. Record page URL in `docs/motion-tokens/notion.md`.
- [ ] **Step 5: Verify build & commit**
  Run: `npm test && npm run build`
  ```bash
  git add public/work/motion-tokens/ docs/motion-tokens/ src/pages/CaseStudyMotionTokens.tsx
  git commit -m "docs: integrate figma file and notion spec via mcp tools"
  ```

---

### Task 8: End-to-End Verification & Pull Request Preparation

**Files:**
- Create: `docs/motion-tokens/verification.md`

- [ ] **Step 1: Run complete automated test suite**
  Run: `npm test`
  Confirm all tests pass across tokens, validation, exporters, context, components, studio, and case study.
- [ ] **Step 2: Run production build and verify static output**
  Run: `npm run build`
  Confirm exit code 0. Confirm `dist/work/motion-tokens/index.html` exists and contains correct metadata.
- [ ] **Step 3: Perform manual browser check at 1280px, 390px, and 320px**
  Verify in browser:
  - Before/After toggle swaps motion styles.
  - Reduced motion override stops translation and leaves opacity.
  - Keyboard navigation operates all 4 components smoothly.
  - Language switcher toggles EN/PL without clearing token edits.
  - No horizontal scroll at 320px width.
- [ ] **Step 4: Record findings in `docs/motion-tokens/verification.md`**
  State exact commands executed, test outputs, and verified browsers. State explicit limitations (no human participant retest, no full assistive-technology certification).
- [ ] **Step 5: Prepare branch and pull request**
  Ensure working directory is clean. Push branch `feat/motion-tokens` to remote repository. Open Pull Request with summary and verification evidence. Do not auto-merge.

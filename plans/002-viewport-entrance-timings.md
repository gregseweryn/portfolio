# Plan 002: Viewport Entrance Timings

- Status: COMPLETED
- Target files:
  - `src/pages/HomePage.tsx`
- Goal: Tighten entrance animations to Emil Kowalski's sub-300ms UI rule with custom strong easing.

## Context & Motivation

Current viewport animations in `HomePage.tsx` take 400ms to 450ms. Longer animations introduce perceived lag when scrolling through a portfolio. Snappier 240ms entrances with strong deceleration (`[0.23, 1, 0.32, 1]`) feel responsive and intentional.

## Implementation Steps

### 1. Hero Bio (`src/pages/HomePage.tsx:44`)
- Current: `transition={{ duration: 0.4, delay: 0.05 }}`
- Target: `transition={{ duration: 0.24, delay: 0.04, ease: [0.23, 1, 0.32, 1] }}`

### 2. Hero Image Container (`src/pages/HomePage.tsx:58`)
- Current: `transition={{ duration: 0.4, delay: 0.08 }}`
- Target: `transition={{ duration: 0.26, delay: 0.05, ease: [0.23, 1, 0.32, 1] }}`

### 3. Perspective Section (`src/pages/HomePage.tsx:96`)
- Current: `transition={{ duration: 0.45 }}`
- Target: `transition={{ duration: 0.26, ease: [0.23, 1, 0.32, 1] }}`

### 4. Core Capabilities Cards (`src/pages/HomePage.tsx:131`)
- Current: `transition={{ duration: 0.4, delay: index * 0.06 }}`
- Target: `transition={{ duration: 0.24, delay: index * 0.04, ease: [0.23, 1, 0.32, 1] }}`

## Verification
- Test scroll speed on desktop and mobile: ensure content lands crisply before the eye settles.
- Verify `useReducedMotion()` behavior remains respected.

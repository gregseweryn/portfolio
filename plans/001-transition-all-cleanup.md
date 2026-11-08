# Plan 001: Transition-All Cleanup

- Status: COMPLETED
- Target files:
  - `src/components/Header.tsx`
  - `src/components/Footer.tsx`
  - `src/components/LightboxModal.tsx`
- Goal: Replace unbounded `transition-all` with explicit property transitions (`transition-colors`, `transition-transform`, or specific multi-property lists).

## Context & Motivation

`transition: all` triggers browser style calculations on unintended properties (such as layout and margins) off the GPU thread. Explicit property declarations ensure hardware acceleration and predictable frame timing.

## Implementation Steps

### 1. `src/components/Header.tsx`
- **Line 84 & 99:** Language buttons
  - Current: `transition-all duration-150`
  - Target: `transition-[color,background-color,box-shadow,transform] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)]`
- **Line 171 & 227:** Mobile menu toggle buttons
  - Current: `transition-all duration-150`
  - Target: `transition-[color,background-color,border-color,transform] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)]`
- **Line 263:** Mobile drawer close button
  - Current: `transition-all duration-150`
  - Target: `transition-[color,background-color,transform] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)]`

### 2. `src/components/Footer.tsx`
- **Line 28:** Email link
  - Current: `transition-all duration-150`
  - Target: `transition-[color,transform] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)]`
- **Line 38:** CV request button
  - Current: `transition-all duration-150`
  - Target: `transition-[background-color,transform] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)]`

### 3. `src/components/LightboxModal.tsx`
- **Lines 84, 105, 121:** Modal navigation and close buttons
  - Current: `transition-all duration-150`
  - Target: `transition-[background-color,transform] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)]`

## Verification
- Inspect with DevTools Animation tab: confirm no layout thrash on hover or press.
- Ensure buttons respond with tactile `transform: scale(0.96-0.97)` on `:active`.

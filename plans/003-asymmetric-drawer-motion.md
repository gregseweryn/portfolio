# Plan 003: Asymmetric Mobile Drawer Motion

- Status: COMPLETED
- Target files:
  - `src/components/Header.tsx`
- Goal: Implement asymmetric timing between drawer opening (deliberate, 240ms) and drawer closing (snappy response, 160ms).

## Context & Motivation

In UI engineering, opening a navigation drawer is an exploratory action (benefiting from a smooth, decelerating curve), but closing/dismissing is a completed task where users expect instant system clearance. Symmetric 240ms creates sluggish dismissals.

## Implementation Steps

### 1. `src/components/Header.tsx` line 251
- Current:
  ```tsx
  className={`fixed top-0 left-0 right-0 z-50 bg-white border-b border-zinc-200 shadow-xl p-6 transition-transform duration-240 ease-[cubic-bezier(0.32,0.72,0,1)] sm:hidden ${
    mobileMenuOpen ? 'translate-y-0' : '-translate-y-full'
  }`}
  ```
- Target:
  ```tsx
  className={`fixed top-0 left-0 right-0 z-50 bg-white border-b border-zinc-200 shadow-xl p-6 transition-transform sm:hidden ${
    mobileMenuOpen
      ? 'translate-y-0 duration-240 ease-[cubic-bezier(0.32,0.72,0,1)]'
      : '-translate-y-full duration-160 ease-[cubic-bezier(0.23,1,0.32,1)]'
  }`}
  ```

### 2. Backdrop Overlay (`Header.tsx:240`)
- Current: `transition-opacity duration-200`
- Target:
  ```tsx
  className={`fixed inset-0 z-50 bg-black/40 backdrop-blur-xs transition-opacity sm:hidden ${
    mobileMenuOpen ? 'duration-200 ease-out' : 'duration-140 ease-in'
  }`}
  ```

## Verification
- Open mobile drawer: smooth natural slide down.
- Press Escape or click backdrop: snappy, instant exit with no residual lag.

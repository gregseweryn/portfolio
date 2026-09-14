# Design Tokens & Guidelines

## Color Palette
- Canvas Background: `#FFFFFF`
- Primary Typography: `#111111`
- Muted Typography: `#B2B2B2`
- Subtle Text: `#9CA3AF` (gray-400)
- Secondary Body: `#6B7280` (gray-500)
- Surface Light: `#F9FAFB` (gray-50)
- Surface Muted: `#F3F4F6` (gray-100)
- Borders: `#F3F4F6` (border-gray-100), `#E5E7EB` (border-gray-200)

## Typography Scales
- Font Family: Geist Sans (`font-sans`), system-ui fallback
- `--font-size-xs`: `clamp(14px, 1.1vw, 14px)`
- `--font-size-sm`: `clamp(17px, 1.4vw, 17px)`
- `--font-size-md`: `clamp(17px, 1.6vw, 20px)`
- `--font-size-lg`: `clamp(20px, 1.8vw, 24px)`
- `--font-size-xl`: `clamp(24px, 2.2vw, 28px)`
- `--font-size-2xl`: `clamp(36px, 5.5vw, 64px)`

## Tracking (Letter Spacing)
- Hero Headline: `-2.5px` (leading-none)
- Subheadings & Section Titles: `-0.64px`
- Footer Title: `-2px` to `-2.56px`

## Motion & Transitions
- Marquee: 45s linear infinite translation (`marquee-scroll` from 0% to -50%), paused on hover
- Image Hover Scale: `transform: scale(1.02)` over 500ms ease
- Header Slide: `transform: translateY(0)` on scroll down, `-100%` when at top
- Staggered Text: Letter and word entrance reveal from `opacity: 0, translateY(18px)` to `opacity: 1, translateY(0px)`

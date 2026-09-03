# Tokens

Generated from `../../../otodom-cost-mockup/tokens.css`. One mode — the product has no
dark theme, and inventing one here would be designing something that does not exist.

The two semantic 600s carry darkened values from a contrast pass: badge labels moved from
4.5:1 to 7.2:1. Do not restore the brighter originals.

## Colour

| Variable | Value |
|---|---|
| `color/neutral/0` | `#ffffff` |
| `color/neutral/50` | `#f7f8f9` |
| `color/neutral/100` | `#eef0f2` |
| `color/neutral/200` | `#dfe3e7` |
| `color/neutral/400` | `#9aa3ac` |
| `color/neutral/600` | `#5b6570` |
| `color/neutral/900` | `#1a1f24` |
| `color/primary/600` | `#0f766e` |
| `color/primary/700` | `#0b5d57` |
| `color/primary/50` | `#ecf9f8` |
| `color/known/600` | `#0e5d2d` |
| `color/known/50` | `#dcfce7` |
| `color/unknown/600` | `#833c06` |
| `color/unknown/50` | `#fef3c7` |

## Colour roles

The scale says which colours exist; these say what each one is for. In Figma they are a
second collection group whose values are aliases to the first, not copies of it — the same
relationship they have in the CSS.

| Variable | Alias of |
|---|---|
| `text/primary` | `color/neutral/900` |
| `text/secondary` | `color/neutral/600` |
| `text/on-accent` | `color/neutral/0` |
| `surface` | `color/neutral/0` |
| `surface/sunken` | `color/neutral/50` |
| `surface/inert` | `color/neutral/100` |
| `border` | `color/neutral/200` |
| `border/strong` | `color/neutral/400` |
| `border/rule` | `color/neutral/100` |
| `accent` | `color/primary/600` |
| `accent/hover` | `color/primary/700` |
| `accent/wash` | `color/primary/50` |
| `cost/known-ink` | `color/known/600` |
| `cost/known-wash` | `color/known/50` |
| `cost/gap-ink` | `color/unknown/600` |
| `cost/gap-wash` | `color/unknown/50` |
| `focus/ring` | `color/primary/600` |

## Spacing

| Variable | Value |
|---|---|
| `space/1` | 4px |
| `space/2` | 8px |
| `space/3` | 12px |
| `space/4` | 16px |
| `space/5` | 20px |
| `space/6` | 24px |
| `space/8` | 32px |
| `space/10` | 40px |
| `space/12` | 48px |

## Radius

| Variable | Value |
|---|---|
| `radius/sm` | 4px |
| `radius/md` | 8px |
| `radius/lg` | 12px |
| `radius/pill` | 999px |

## Motion and targets

Two durations, one curve, one minimum. Figma has no home for these, so they belong on the
cover as a note rather than in the variable collection — but a prototype built from this kit
has to use them, and every transition needs a reduced-motion alternative.

| Variable | Value |
|---|---|
| `dur-fast` | `160ms` |
| `dur-base` | `180ms` |
| `ease-out` | `cubic-bezier(0.22, 1, 0.36, 1)` |
| `target-min` | `44px` |

## Type

Face: **Inter**, self-hosted by the mockup since 2 September 2026, so the screens and the
running prototype are set in the same thing.

| Style | Size | Line | Weight | Tracking | Transform |
|---|---|---|---|---|---|
| `t-display` | 32px | 38px | 700 | -0.4px | — |
| `t-h24` | 24px | 30px | 600 | -0.2px | — |
| `t-h20` | 20px | 26px | 600 | -0.2px | — |
| `t-price28` | 28px | 32px | 700 | -0.4px | — |
| `t-price22` | 22px | 26px | 700 | -0.2px | — |
| `t-body` | 15px | 22px | 400 | — | — |
| `t-body-str` | 15px | 22px | 600 | — | — |
| `t-small` | 13px | 18px | 400 | — | — |
| `t-label` | 11px | 14px | 500 | 0.6px | uppercase |

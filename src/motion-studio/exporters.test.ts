import { describe, it, expect } from 'vitest'
import { defaultTokens } from './tokens'
import { toCss, toTailwind, toFramer, toW3cJson } from './exporters'

describe('toCss', () => {
  it('generates valid CSS root variables and reduced motion block', () => {
    const css = toCss(defaultTokens)
    expect(css).toContain(':root {')
    expect(css).toContain('--motion-duration-fast:')
    expect(css).toContain('@media (prefers-reduced-motion: reduce)')
  })

  it('handles empty tokens without throwing', () => {
    const css = toCss([])
    expect(css).toContain(':root {')
    expect(css).toContain('}')
  })
})

describe('toTailwind', () => {
  it('generates valid tailwind transition configuration', () => {
    const tw = toTailwind(defaultTokens)
    expect(tw).toContain('transitionDuration:')
    expect(tw).toContain('transitionTimingFunction:')
  })
})

describe('toFramer', () => {
  it('generates exportable framer motion transition objects', () => {
    const framer = toFramer(defaultTokens)
    expect(framer).toContain('export const motionTokens')
    expect(framer).toContain("type: 'spring'")
  })
})

describe('toW3cJson', () => {
  it('outputs valid JSON conforming to W3C design tokens', () => {
    const jsonStr = toW3cJson(defaultTokens)
    const parsed = JSON.parse(jsonStr)
    expect(parsed).toBeDefined()
    expect(parsed.motion).toBeDefined()
    // Primitive duration check
    const fast = parsed.motion.duration?.fast || parsed.motion['duration-fast']
    expect(fast).toBeDefined()
    expect(fast.$value).toBeDefined()
    expect(fast.$type).toBe('duration')
  })

  it('handles empty token list as valid JSON', () => {
    const jsonStr = toW3cJson([])
    const parsed = JSON.parse(jsonStr)
    expect(parsed).toEqual({ motion: {} })
  })
})

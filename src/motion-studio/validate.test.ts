import { describe, it, expect } from 'vitest'
import { BOUNDS, validateValue, parseNumberInput } from './validate'
import type { Spring, Duration, Easing } from './tokens'

describe('validateValue', () => {
  it('clamps spring damping if below minimum', () => {
    const raw: Spring = { type: 'spring', stiffness: 300, damping: 0, mass: 1 }
    const result = validateValue(raw)
    expect((result.value as Spring).damping).toBe(BOUNDS.damping.min)
    expect(result.warnings.length).toBeGreaterThan(0)
  })

  it('clamps spring damping if above maximum', () => {
    const raw: Spring = { type: 'spring', stiffness: 300, damping: 200, mass: 1 }
    const result = validateValue(raw)
    expect((result.value as Spring).damping).toBe(BOUNDS.damping.max)
    expect(result.warnings.length).toBeGreaterThan(0)
  })

  it('clamps duration if out of bounds', () => {
    const tooLow: Duration = { type: 'duration', ms: -50 }
    const resultLow = validateValue(tooLow)
    expect((resultLow.value as Duration).ms).toBe(BOUNDS.duration.min)

    const tooHigh: Duration = { type: 'duration', ms: 5000 }
    const resultHigh = validateValue(tooHigh)
    expect((resultHigh.value as Duration).ms).toBe(BOUNDS.duration.max)
  })

  it('clamps bezier x coordinates to 0-1', () => {
    const invalidBezier: Easing = { type: 'bezier', points: [-0.5, 0.2, 1.5, 0.8] }
    const result = validateValue(invalidBezier)
    const points = (result.value as Easing).points
    expect(points[0]).toBe(0)
    expect(points[2]).toBe(1)
    expect(result.warnings.length).toBeGreaterThan(0)
  })
})

describe('parseNumberInput', () => {
  it('returns valid number within bounds', () => {
    expect(parseNumberInput('250', 200, 0, 1000)).toBe(250)
  })

  it('falls back to fallback on invalid string', () => {
    expect(parseNumberInput('not-a-number', 200, 0, 1000)).toBe(200)
    expect(parseNumberInput('', 200, 0, 1000)).toBe(200)
  })

  it('clamps when value is out of bounds', () => {
    expect(parseNumberInput('-10', 200, 0, 1000)).toBe(0)
    expect(parseNumberInput('9999', 200, 0, 1000)).toBe(1000)
  })
})

import type { MotionToken, Spring, Duration, Easing } from './tokens'

export const BOUNDS = {
  duration: { min: 0, max: 2000 },
  stiffness: { min: 20, max: 1000 },
  damping: { min: 1, max: 100 },
  mass: { min: 0.1, max: 10 },
  bezierX: { min: 0, max: 1 },
  bezierY: { min: -2, max: 2 }
} as const

function clamp(val: number, min: number, max: number): { value: number; clamped: boolean } {
  if (isNaN(val)) return { value: min, clamped: true }
  if (val < min) return { value: min, clamped: true }
  if (val > max) return { value: max, clamped: true }
  return { value: val, clamped: false }
}

export function validateValue(val: MotionToken['value']): {
  value: MotionToken['value']
  warnings: string[]
} {
  const warnings: string[] = []

  if (val.type === 'duration') {
    const res = clamp(val.ms, BOUNDS.duration.min, BOUNDS.duration.max)
    if (res.clamped) {
      warnings.push(`Duration clamped to ${res.value}ms (range: ${BOUNDS.duration.min}-${BOUNDS.duration.max}ms)`)
    }
    return {
      value: { type: 'duration', ms: Math.round(res.value) } as Duration,
      warnings
    }
  }

  if (val.type === 'spring') {
    const s = clamp(val.stiffness, BOUNDS.stiffness.min, BOUNDS.stiffness.max)
    const d = clamp(val.damping, BOUNDS.damping.min, BOUNDS.damping.max)
    const m = clamp(val.mass, BOUNDS.mass.min, BOUNDS.mass.max)

    if (s.clamped) warnings.push(`Stiffness clamped to ${s.value} (range: ${BOUNDS.stiffness.min}-${BOUNDS.stiffness.max})`)
    if (d.clamped) warnings.push(`Damping clamped to ${d.value} (range: ${BOUNDS.damping.min}-${BOUNDS.damping.max})`)
    if (m.clamped) warnings.push(`Mass clamped to ${m.value} (range: ${BOUNDS.mass.min}-${BOUNDS.mass.max})`)

    return {
      value: {
        type: 'spring',
        stiffness: s.value,
        damping: d.value,
        mass: m.value
      } as Spring,
      warnings
    }
  }

  if (val.type === 'bezier') {
    const [x1, y1, x2, y2] = val.points
    const cx1 = clamp(x1, BOUNDS.bezierX.min, BOUNDS.bezierX.max)
    const cy1 = clamp(y1, BOUNDS.bezierY.min, BOUNDS.bezierY.max)
    const cx2 = clamp(x2, BOUNDS.bezierX.min, BOUNDS.bezierX.max)
    const cy2 = clamp(y2, BOUNDS.bezierY.min, BOUNDS.bezierY.max)

    if (cx1.clamped || cx2.clamped) warnings.push('Bezier X coordinates clamped between 0 and 1')
    if (cy1.clamped || cy2.clamped) warnings.push('Bezier Y coordinates clamped between -2 and 2')

    return {
      value: {
        type: 'bezier',
        points: [cx1.value, cy1.value, cx2.value, cy2.value]
      } as Easing,
      warnings
    }
  }

  return { value: val, warnings }
}

export function parseNumberInput(
  raw: string,
  fallback: number,
  min: number,
  max: number
): number {
  const trimmed = raw.trim()
  if (!trimmed) return fallback
  const parsed = Number(trimmed)
  if (isNaN(parsed)) return fallback
  if (parsed < min) return min
  if (parsed > max) return max
  return parsed
}

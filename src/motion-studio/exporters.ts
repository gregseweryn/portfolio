import type { MotionToken } from './tokens'

export function toCss(tokens: MotionToken[]): string {
  if (tokens.length === 0) {
    return `:root {\n}\n\n@media (prefers-reduced-motion: reduce) {\n  :root {\n  }\n}`
  }

  const rootRules: string[] = []
  const reducedRules: string[] = []

  for (const token of tokens) {
    const varName = `--motion-${token.id}`

    if (token.value.type === 'duration') {
      rootRules.push(`  ${varName}: ${token.value.ms}ms;`)
    } else if (token.value.type === 'bezier') {
      rootRules.push(`  ${varName}: cubic-bezier(${token.value.points.join(', ')});`)
    } else if (token.value.type === 'spring') {
      rootRules.push(
        `  ${varName}-stiffness: ${token.value.stiffness};\n  ${varName}-damping: ${token.value.damping};\n  ${varName}-mass: ${token.value.mass};`
      )
    }

    if (token.reduced) {
      reducedRules.push(`  ${varName}: ${token.reduced.ms}ms;`)
    }
  }

  return `:root {\n${rootRules.join('\n')}\n}\n\n@media (prefers-reduced-motion: reduce) {\n  :root {\n${reducedRules.join('\n')}\n  }\n}`
}

export function toTailwind(tokens: MotionToken[]): string {
  const durations: Record<string, string> = {}
  const timings: Record<string, string> = {}

  for (const token of tokens) {
    if (token.value.type === 'duration') {
      durations[token.id.replace('duration-', '')] = `${token.value.ms}ms`
    } else if (token.value.type === 'bezier') {
      timings[token.id] = `cubic-bezier(${token.value.points.join(', ')})`
    }
  }

  return `// tailwind.config.js motion tokens extension
module.exports = {
  theme: {
    extend: {
      transitionDuration: ${JSON.stringify(durations, null, 8).replace('}', '      }')},
      transitionTimingFunction: ${JSON.stringify(timings, null, 8).replace('}', '      }')}
    }
  }
};`
}

export function toFramer(tokens: MotionToken[]): string {
  const transitions: string[] = []

  for (const token of tokens) {
    const key = token.id.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase())
    if (token.value.type === 'duration') {
      transitions.push(`  ${key}: { duration: ${token.value.ms / 1000}, ease: [0.23, 1, 0.32, 1] }`)
    } else if (token.value.type === 'bezier') {
      transitions.push(`  ${key}: { ease: [${token.value.points.join(', ')}] }`)
    } else if (token.value.type === 'spring') {
      transitions.push(
        `  ${key}: { type: 'spring', stiffness: ${token.value.stiffness}, damping: ${token.value.damping}, mass: ${token.value.mass} }`
      )
    }
  }

  return `import type { Transition } from 'framer-motion';

export const motionTokens: Record<string, Transition> = {
${transitions.join(',\n')}
};`
}

export function toW3cJson(tokens: MotionToken[]): string {
  const motion: Record<string, unknown> = {}

  for (const token of tokens) {
    if (token.value.type === 'duration') {
      motion[token.id] = {
        $value: `${token.value.ms}ms`,
        $type: 'duration',
        $description: token.hint.en
      }
    } else if (token.value.type === 'bezier') {
      motion[token.id] = {
        $value: token.value.points,
        $type: 'cubic-bezier',
        $description: token.hint.en
      }
    } else if (token.value.type === 'spring') {
      motion[token.id] = {
        $value: {
          stiffness: token.value.stiffness,
          damping: token.value.damping,
          mass: token.value.mass
        },
        $type: 'spring',
        $description: token.hint.en
      }
    }
  }

  return JSON.stringify({ motion }, null, 2)
}

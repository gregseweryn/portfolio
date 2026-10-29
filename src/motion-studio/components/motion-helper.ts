import type { Transition, TargetAndTransition } from 'framer-motion'
import type { MotionToken } from '../tokens'

export type ComponentKey = 'modal' | 'tooltip' | 'accordion' | 'dropdown'

export function getMotionVariants(
  componentKey: ComponentKey,
  effectiveReduced: boolean
): {
  initial: TargetAndTransition
  animate: TargetAndTransition
  exit: TargetAndTransition
} {
  if (effectiveReduced) {
    if (componentKey === 'accordion') {
      return {
        initial: { opacity: 0, height: 0 },
        animate: { opacity: 1, height: 'auto' },
        exit: { opacity: 0, height: 0 }
      }
    }
    return {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 }
    }
  }

  switch (componentKey) {
    case 'modal':
      return {
        initial: { opacity: 0, scale: 0.94, y: 12 },
        animate: { opacity: 1, scale: 1, y: 0 },
        exit: { opacity: 0, scale: 0.94, y: 12 }
      }
    case 'tooltip':
      return {
        initial: { opacity: 0, scale: 0.96, y: 4 },
        animate: { opacity: 1, scale: 1, y: 0 },
        exit: { opacity: 0, scale: 0.96, y: 4 }
      }
    case 'accordion':
      return {
        initial: { opacity: 0, height: 0 },
        animate: { opacity: 1, height: 'auto' },
        exit: { opacity: 0, height: 0 }
      }
    case 'dropdown':
      return {
        initial: { opacity: 0, scale: 0.96, y: -6 },
        animate: { opacity: 1, scale: 1, y: 0 },
        exit: { opacity: 0, scale: 0.96, y: -6 }
      }
  }
}

export function getTokenTransition(
  token: MotionToken | undefined,
  effectiveReduced: boolean
): Transition {
  if (effectiveReduced) {
    const ms = token?.reduced?.ms ?? 100
    return { duration: ms / 1000, ease: 'easeOut' }
  }

  if (!token) {
    return { duration: 0.2, ease: [0.23, 1, 0.32, 1] }
  }

  if (token.value.type === 'spring') {
    return {
      type: 'spring',
      stiffness: token.value.stiffness,
      damping: token.value.damping,
      mass: token.value.mass
    }
  }

  if (token.value.type === 'duration') {
    return {
      duration: token.value.ms / 1000,
      ease: [0.23, 1, 0.32, 1]
    }
  }

  if (token.value.type === 'bezier') {
    return {
      duration: 0.25,
      ease: token.value.points
    }
  }

  return { duration: 0.2 }
}

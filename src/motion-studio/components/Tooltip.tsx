import React, { useState, useId } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useMotionTokens } from '../MotionContext'
import { getMotionVariants, getTokenTransition } from './motion-helper'

export interface TooltipProps {
  text: string
  children: React.ReactElement<React.HTMLAttributes<HTMLElement>>
}

export const Tooltip: React.FC<TooltipProps> = ({ text, children }) => {
  const [isVisible, setIsVisible] = useState(false)
  const tooltipId = useId()
  const { tokens, effectiveReduced } = useMotionTokens()
  const tooltipToken = tokens.find((t) => t.id === 'tooltip-enter')

  const handleKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key === 'Escape' && isVisible) {
      e.stopPropagation()
      setIsVisible(false)
    }
  }

  const trigger = React.cloneElement(children, {
    'aria-describedby': isVisible ? tooltipId : undefined,
    onMouseEnter: () => setIsVisible(true),
    onMouseLeave: () => setIsVisible(false),
    onFocus: () => setIsVisible(true),
    onBlur: () => setIsVisible(false),
    onKeyDown: handleKeyDown
  })

  const variants = getMotionVariants('tooltip', effectiveReduced)
  const transition = getTokenTransition(tooltipToken, effectiveReduced)

  return (
    <div className="relative inline-block">
      {trigger}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            id={tooltipId}
            role="tooltip"
            initial={variants.initial}
            animate={variants.animate}
            exit={variants.exit}
            transition={transition}
            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-40 px-2.5 py-1 text-[11px] font-mono rounded bg-zinc-900 border border-zinc-700 text-zinc-100 shadow-lg whitespace-nowrap pointer-events-none"
          >
            {text}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

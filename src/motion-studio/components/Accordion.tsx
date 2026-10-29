import React, { useState, useId } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useMotionTokens } from '../MotionContext'
import { getMotionVariants, getTokenTransition } from './motion-helper'

export interface AccordionProps {
  title: string
  children: React.ReactNode
  defaultOpen?: boolean
}

export const Accordion: React.FC<AccordionProps> = ({
  title,
  children,
  defaultOpen = false
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen)
  const headerId = useId()
  const contentId = useId()

  const { tokens, effectiveReduced } = useMotionTokens()
  const accordionToken = tokens.find((t) => t.id === 'accordion-expand')

  const toggle = () => setIsOpen((prev) => !prev)

  const variants = getMotionVariants('accordion', effectiveReduced)
  const transition = getTokenTransition(accordionToken, effectiveReduced)

  return (
    <div className="w-full rounded-md border border-zinc-800 bg-zinc-900/50 overflow-hidden text-zinc-100">
      <button
        id={headerId}
        type="button"
        aria-expanded={isOpen}
        aria-controls={contentId}
        onClick={toggle}
        className="w-full flex items-center justify-between px-3.5 py-2.5 text-xs font-mono font-medium text-left text-zinc-200 hover:text-zinc-50 hover:bg-zinc-800/60 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-inset transition-colors"
      >
        <span>{title}</span>
        <svg
          className={`w-3.5 h-3.5 transition-transform ${
            effectiveReduced ? '' : 'duration-200'
          } ${isOpen ? 'rotate-180' : 'rotate-0'}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={contentId}
            role="region"
            aria-labelledby={headerId}
            initial={variants.initial}
            animate={variants.animate}
            exit={variants.exit}
            transition={transition}
            className="overflow-hidden"
          >
            <div className="p-3 text-xs text-zinc-400 border-t border-zinc-800/80 leading-relaxed">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

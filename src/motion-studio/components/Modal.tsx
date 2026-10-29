import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useMotionTokens } from '../MotionContext'
import { getMotionVariants, getTokenTransition } from './motion-helper'

export interface ModalProps {
  triggerText?: string
  title?: string
  description?: string
}

export const Modal: React.FC<ModalProps> = ({
  triggerText = 'Open Modal',
  title = 'Tokenized Spring Dialog',
  description = 'This dialog animates using physical spring tokens with backdrop opacity fade and keyboard focus trap.'
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const triggerRef = useRef<HTMLButtonElement | null>(null)
  const dialogRef = useRef<HTMLDivElement | null>(null)
  const closeButtonRef = useRef<HTMLButtonElement | null>(null)
  const confirmButtonRef = useRef<HTMLButtonElement | null>(null)

  const { tokens, effectiveReduced } = useMotionTokens()
  const modalToken = tokens.find((t) => t.id === 'modal-enter')

  useEffect(() => {
    if (!isOpen) return

    // Focus close button on open
    const timeout = setTimeout(() => {
      closeButtonRef.current?.focus()
    }, 10)

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        setIsOpen(false)
        triggerRef.current?.focus()
        return
      }

      if (e.key === 'Tab' && dialogRef.current) {
        const focusables = dialogRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        )
        if (focusables.length === 0) return

        const first = focusables[0]
        const last = focusables[focusables.length - 1]

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      clearTimeout(timeout)
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen])

  const handleOpen = () => {
    setIsOpen(true)
  }

  const handleClose = () => {
    setIsOpen(false)
    triggerRef.current?.focus()
  }

  const variants = getMotionVariants('modal', effectiveReduced)
  const transition = getTokenTransition(modalToken, effectiveReduced)

  return (
    <div className="relative inline-block">
      <button
        ref={triggerRef}
        type="button"
        onClick={handleOpen}
        className="px-3.5 py-2 text-xs font-mono font-medium rounded border border-zinc-700 bg-zinc-900 text-zinc-100 hover:bg-zinc-800 hover:border-zinc-600 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-zinc-950 transition-colors"
      >
        {triggerText}
      </button>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: effectiveReduced ? 0.08 : 0.18 }}
              className="fixed inset-0 bg-black/75 backdrop-blur-sm"
              onClick={handleClose}
              aria-hidden="true"
            />

            {/* Dialog Card */}
            <motion.div
              ref={dialogRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-title"
              aria-describedby="modal-description"
              initial={variants.initial}
              animate={variants.animate}
              exit={variants.exit}
              transition={transition}
              className="relative z-10 w-full max-w-md rounded-lg border border-zinc-800 bg-zinc-950 p-6 shadow-2xl text-zinc-100"
            >
              <div className="flex items-start justify-between gap-4 mb-3">
                <h3 id="modal-title" className="text-sm font-semibold tracking-tight text-zinc-100">
                  {title}
                </h3>
                <button
                  ref={closeButtonRef}
                  type="button"
                  onClick={handleClose}
                  aria-label="Close modal"
                  className="rounded p-1 text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <p id="modal-description" className="text-xs text-zinc-400 mb-6 leading-relaxed">
                {description}
              </p>

              <div className="flex justify-end gap-2 pt-2 border-t border-zinc-900">
                <button
                  type="button"
                  onClick={handleClose}
                  className="px-3 py-1.5 text-xs font-mono rounded border border-zinc-800 text-zinc-300 hover:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                >
                  Cancel
                </button>
                <button
                  ref={confirmButtonRef}
                  type="button"
                  onClick={handleClose}
                  className="px-3 py-1.5 text-xs font-mono font-medium rounded bg-cyan-500 text-black hover:bg-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-300"
                >
                  Confirm
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}

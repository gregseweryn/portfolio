import React, { useState, useRef, useEffect, useId } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useMotionTokens } from '../MotionContext'
import { getMotionVariants, getTokenTransition } from './motion-helper'

export interface DropdownOption {
  id: string
  label: string
}

export interface DropdownProps {
  label: string
  options: DropdownOption[]
  onSelect: (option: DropdownOption) => void
  selectedId?: string
}

export const Dropdown: React.FC<DropdownProps> = ({
  label,
  options,
  onSelect,
  selectedId
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [highlightedIndex, setHighlightedIndex] = useState(0)
  const menuId = useId()
  const triggerRef = useRef<HTMLButtonElement | null>(null)
  const menuRef = useRef<HTMLUListElement | null>(null)

  const { tokens, effectiveReduced } = useMotionTokens()
  const dropdownToken = tokens.find((t) => t.id === 'dropdown-open')

  const selectedOption = options.find((o) => o.id === selectedId)

  useEffect(() => {
    if (isOpen) {
      setHighlightedIndex(0)
    }
  }, [isOpen])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (!isOpen) {
        setIsOpen(true)
      } else {
        setHighlightedIndex((prev) => (prev + 1) % options.length)
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (!isOpen) {
        setIsOpen(true)
      } else {
        setHighlightedIndex((prev) => (prev - 1 + options.length) % options.length)
      }
    } else if (e.key === 'Enter' || e.key === ' ') {
      if (isOpen) {
        e.preventDefault()
        if (options[highlightedIndex]) {
          onSelect(options[highlightedIndex])
        }
        setIsOpen(false)
        triggerRef.current?.focus()
      }
    } else if (e.key === 'Escape') {
      if (isOpen) {
        e.preventDefault()
        setIsOpen(false)
        triggerRef.current?.focus()
      }
    }
  }

  const handleSelect = (option: DropdownOption) => {
    onSelect(option)
    setIsOpen(false)
    triggerRef.current?.focus()
  }

  const variants = getMotionVariants('dropdown', effectiveReduced)
  const transition = getTokenTransition(dropdownToken, effectiveReduced)

  return (
    <div className="relative inline-block text-left" onKeyDown={handleKeyDown}>
      <button
        ref={triggerRef}
        type="button"
        aria-haspopup="menu"
        aria-expanded={isOpen}
        aria-controls={isOpen ? menuId : undefined}
        onClick={() => setIsOpen((prev) => !prev)}
        className="inline-flex items-center justify-between gap-2 px-3.5 py-2 text-xs font-mono font-medium rounded border border-zinc-700 bg-zinc-900 text-zinc-100 hover:bg-zinc-800 hover:border-zinc-600 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-zinc-950 transition-colors"
      >
        <span>{selectedOption ? selectedOption.label : label}</span>
        <svg
          className={`w-3.5 h-3.5 transition-transform ${isOpen ? 'rotate-180' : 'rotate-0'}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.ul
            ref={menuRef}
            id={menuId}
            role="menu"
            initial={variants.initial}
            animate={variants.animate}
            exit={variants.exit}
            transition={transition}
            className="absolute left-0 mt-1 z-50 min-w-[160px] rounded-md border border-zinc-800 bg-zinc-950 p-1 shadow-xl list-none focus:outline-none"
          >
            {options.map((option, index) => {
              const isHighlighted = index === highlightedIndex
              return (
                <li
                  key={option.id}
                  role="menuitem"
                  tabIndex={isHighlighted ? 0 : -1}
                  onClick={() => handleSelect(option)}
                  className={`px-3 py-1.5 text-xs font-mono rounded cursor-pointer transition-colors ${
                    isHighlighted
                      ? 'bg-cyan-500/10 text-cyan-300'
                      : 'text-zinc-300 hover:bg-zinc-900 hover:text-zinc-100'
                  }`}
                >
                  {option.label}
                </li>
              )
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  )
}

import React from 'react'
import { motion, Variants, useReducedMotion } from 'framer-motion'

interface AnimatedTitleProps {
  text?: string
  className?: string
  coloredSegments?: { text: string; color: string }[]
  srPrefix?: string
}

export const AnimatedTitle: React.FC<AnimatedTitleProps> = ({
  className = '',
  coloredSegments,
  srPrefix,
}) => {
  const shouldReduceMotion = useReducedMotion()

  const containerVariants: Variants = {
    hidden: { opacity: shouldReduceMotion ? 1 : 0 },
    visible: {
      opacity: 1,
      transition: shouldReduceMotion
        ? { duration: 0 }
        : {
            staggerChildren: 0.012,
            delayChildren: 0.02,
          },
    },
  }

  const letterVariants: Variants = {
    hidden: { opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.24,
        ease: [0.23, 1, 0.32, 1],
      },
    },
  }

  if (coloredSegments && coloredSegments.length > 0) {
    const fullText = coloredSegments.map((s) => s.text).join('')

    return (
      <h1 className={`${className} relative text-balance`}>
        {/* Screen reader plain text alternative for accessibility and crawlers */}
        <span className="sr-only">{srPrefix ? `${srPrefix} ` : ''}{fullText}</span>

        {/* Visual animated heading with word-level wrapping containers */}
        <motion.span
          className="inline"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          aria-hidden="true"
        >
          {coloredSegments.map((segment, segIdx) => {
            // Split segment into words while preserving spaces
            const words = segment.text.split(/(\s+)/)
            return (
              <span key={segIdx} style={{ color: segment.color }}>
                {words.map((word, wordIdx) => {
                  if (/^\s+$/.test(word)) {
                    return <span key={wordIdx}> </span>
                  }
                  return (
                    <span key={wordIdx} className="inline-block whitespace-nowrap">
                      {word.split('').map((char, charIdx) => (
                        <motion.span
                          key={`${segIdx}-${wordIdx}-${charIdx}`}
                          variants={letterVariants}
                          className="inline-block"
                        >
                          {char}
                        </motion.span>
                      ))}
                    </span>
                  )
                })}
              </span>
            )
          })}
        </motion.span>
      </h1>
    )
  }

  return null
}

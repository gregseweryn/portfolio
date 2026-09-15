import React from 'react'
import { motion, Variants } from 'framer-motion'

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
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.015,
        delayChildren: 0.04,
      },
    },
  }

  const letterVariants: Variants = {
    hidden: { opacity: 0, y: 14 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: 'easeOut',
      },
    },
  }

  if (coloredSegments && coloredSegments.length > 0) {
    const fullText = coloredSegments.map((s) => s.text).join('')

    return (
      <div className="relative">
        {/* Screen reader plain text alternative */}
        <span className="sr-only">{srPrefix ? `${srPrefix} ` : ''}{fullText}</span>

        {/* Visual animated heading with word-level wrapping containers */}
        <motion.h1
          className={`${className} text-balance`}
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
        </motion.h1>
      </div>
    )
  }

  return null
}

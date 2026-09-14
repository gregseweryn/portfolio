import React, { useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export interface LightboxImage {
  src: string
  alt: string
}

interface LightboxModalProps {
  images: LightboxImage[]
  currentIndex: number | null
  onClose: () => void
  onSelectIndex: (index: number) => void
}

export const LightboxModal: React.FC<LightboxModalProps> = ({
  images,
  currentIndex,
  onClose,
  onSelectIndex,
}) => {
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  const handlePrev = useCallback(() => {
    if (currentIndex !== null) {
      const prev = (currentIndex - 1 + images.length) % images.length
      onSelectIndex(prev)
    }
  }, [currentIndex, images.length, onSelectIndex])

  const handleNext = useCallback(() => {
    if (currentIndex !== null) {
      const next = (currentIndex + 1) % images.length
      onSelectIndex(next)
    }
  }, [currentIndex, images.length, onSelectIndex])

  useEffect(() => {
    if (currentIndex === null) return

    document.body.style.overflow = 'hidden'
    closeButtonRef.current?.focus()

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') handlePrev()
      if (e.key === 'ArrowRight') handleNext()
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.style.overflow = ''
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [currentIndex, onClose, handlePrev, handleNext])

  if (currentIndex === null) return null

  const currentImage = images[currentIndex]

  return (
    <AnimatePresence>
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label="Image viewer"
        className="fixed inset-0 z-[999] flex items-center justify-center p-4 md:p-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={onClose}
      >
        <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" />

        {/* Header bar: Counter & Close button */}
        <div className="absolute top-4 left-4 right-4 z-10 flex justify-between items-center text-white">
          <span className="text-xs font-medium tracking-wide bg-white/10 px-3 py-1.5 rounded-full">
            {currentIndex + 1}&nbsp;/ {images.length}
          </span>
          <motion.button
            ref={closeButtonRef}
            onClick={onClose}
            aria-label="Close image viewer"
            className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            initial={{ opacity: 0, scale: 0.75 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.75 }}
            transition={{ duration: 0.2, delay: 0.05 }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <line x1="1" y1="1" x2="15" y2="15" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
              <line x1="15" y1="1" x2="1" y2="15" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </motion.button>
        </div>

        {/* Previous Button */}
        {images.length > 1 && (
          <button
            onClick={(e) => {
              e.stopPropagation()
              handlePrev()
            }}
            aria-label="Previous image"
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/25 transition-colors text-white cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
        )}

        {/* Next Button */}
        {images.length > 1 && (
          <button
            onClick={(e) => {
              e.stopPropagation()
              handleNext()
            }}
            aria-label="Next image"
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/25 transition-colors text-white cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        )}

        {/* Active Image with Caption */}
        <motion.div
          key={currentImage.src}
          className="relative max-w-5xl max-h-[85vh] z-10 overflow-hidden rounded-xl shadow-2xl flex flex-col items-center justify-center"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.96 }}
          transition={{ duration: 0.2 }}
          onClick={(e) => e.stopPropagation()}
        >
          <img
            src={currentImage.src}
            alt={currentImage.alt}
            className="max-h-[80vh] w-auto object-contain rounded-lg"
          />
          <p className="mt-2 text-xs text-white/80 bg-black/50 px-3 py-1 rounded">
            {currentImage.alt}
          </p>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

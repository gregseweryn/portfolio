import React from 'react'
import { motion } from 'framer-motion'

interface PetCareShowcaseProps {
  navigate: (path: string) => void
  alt: string
  caption: string
  readStudy: string
}

export const PetCareShowcase: React.FC<PetCareShowcaseProps> = ({ navigate, alt, caption, readStudy }) => (
  <motion.a
    href="/work/petcare"
    onClick={(e) => {
      e.preventDefault()
      navigate('/work/petcare')
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }}
    initial={{ opacity: 0, y: 18 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
    aria-label={alt}
    className="group block overflow-hidden rounded-2xl border border-zinc-200/90 shadow-md bg-[#f6f0f8] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#573877] focus-visible:ring-offset-2"
  >
    <div className="relative w-full aspect-[16/10] sm:aspect-[21/9] md:aspect-[2.35/1] overflow-hidden bg-[#f6f0f8]">
      <video
        src="/work/petcare/petcare-loop.mp4"
        poster="/work/petcare/petcare-loop-poster.jpg"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        aria-label="PetCare mobile application interactive animated loop"
        className="w-full h-full object-cover object-center transition-transform duration-700 will-change-transform transform-gpu group-hover:scale-[1.02]"
      />
      <div className="absolute inset-0 pointer-events-none ring-1 ring-inset ring-black/5 rounded-2xl" />
    </div>
    <div className="px-5 py-3.5 bg-white/95 border-t border-zinc-200/80 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
      <p className="text-xs text-zinc-600 font-medium text-pretty">{caption}</p>
      <span className="text-xs font-semibold text-[#111111] group-hover:underline underline-offset-2 shrink-0">{readStudy}</span>
    </div>
  </motion.a>
)

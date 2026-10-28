import React from 'react'
import { motion } from 'framer-motion'

interface PetCareShowcaseProps {
  navigate: (path: string) => void
  alt: string
  caption: string
  readStudy: string
}

const phones = [
  { src: '/work/petcare/add-pet.png', className: 'w-[27%] translate-y-6 sm:translate-y-12', tilt: 'perspective(900px) rotateY(18deg) rotateZ(-3deg)', delay: 0.12 },
  { src: '/work/petcare/today-light.png', className: 'w-[32%] z-10', tilt: 'perspective(900px) rotateY(0deg)', delay: 0.04 },
  { src: '/work/petcare/shared-care-dark.png', className: 'w-[27%] translate-y-6 sm:translate-y-12', tilt: 'perspective(900px) rotateY(-18deg) rotateZ(3deg)', delay: 0.2 },
]

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
    className="group block overflow-hidden rounded-xl border border-zinc-200/90 shadow-md bg-[#f6f0f8] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#573877] focus-visible:ring-offset-2"
  >
    <div className="flex items-start justify-center gap-[3%] px-[6%] pt-10 md:pt-14 overflow-hidden h-[340px] sm:h-[460px] md:h-[560px]">
      {phones.map((p) => (
        <motion.div
          key={p.src}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: p.delay }}
          className={`${p.className} max-w-[300px] shrink-0 transition-transform duration-500 will-change-transform transform-gpu group-hover:-translate-y-2`}
        >
          <img
            src={p.src}
            alt=""
            width={393}
            height={852}
            loading="eager"
            decoding="async"
            style={{ transform: p.tilt }}
            className="block w-full h-auto rounded-t-[1.6rem] sm:rounded-t-[2.2rem] border-[5px] sm:border-[7px] border-b-0 border-[#1d1424] bg-[#1d1424] shadow-[0_24px_50px_-12px_rgba(50,35,63,0.35)]"
          />
        </motion.div>
      ))}
    </div>
    <div className="px-4 py-3 bg-white/95 border-t border-zinc-200/70 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
      <p className="text-xs text-zinc-600 font-medium text-pretty">{caption}</p>
      <span className="text-xs font-medium text-[#111111] group-hover:underline underline-offset-2 shrink-0">{readStudy}</span>
    </div>
  </motion.a>
)

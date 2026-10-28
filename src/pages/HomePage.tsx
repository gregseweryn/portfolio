import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { AnimatedTitle } from '../components/AnimatedTitle'
import { LightboxModal, LightboxImage } from '../components/LightboxModal'
import { GeometricFigure, FigureType } from '../components/GeometricFigures'
import { DistrictPhasesThumbnail } from '../components/TouristificationCharts'
import { useLanguage } from '../context/LanguageContext'
import { homeContent } from '../i18n'
import { petcareContent } from '../i18n/petcare'
import { PetCareShowcase } from '../components/PetCareShowcase'

interface HomePageProps {
  navigate: (path: string) => void
}

const explorationImages: LightboxImage[] = [
  { src: '/work/portfolio-desk/mockup2.png', alt: 'Portfolio Desk Laptop Mockup' },
  { src: '/work/portfolio-desk/work-list-light.png', alt: 'Redesigned Work List (Light Theme)' },
  { src: '/work/portfolio-desk/work-list-dark.png', alt: 'Redesigned Work List (Dark Theme)' },
  { src: '/work/portfolio-desk/loan-detail-light.png', alt: 'Loan Detail View with Arrears Breakdown' },
  { src: '/work/portfolio-desk/repayment-history-light.png', alt: 'In-Context Repayment History Drawer' },
  { src: '/work/portfolio-desk/overview-light.png', alt: 'Portfolio Overview Dashboard' },
  { src: '/work/portfolio-desk/edge-states-light.png', alt: 'Edge and Zero State Scenarios' },
]

export const HomePage: React.FC<HomePageProps> = ({ navigate }) => {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const { language } = useLanguage()
  const t = homeContent[language]

  const capabilityTypes: FigureType[] = ['research', 'design', 'systems', 'a11y']

  return (
    <main id="main-content">
      {/* Hero Section */}
      <section className="pt-6 pb-4 md:py-14">
        <div className="site-container grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">
          <div className="md:col-span-7 flex flex-col justify-center gap-5">
            <div className="flex flex-col gap-2">
              <span className="text-xs uppercase tracking-wider font-semibold text-zinc-500">
                {t.heroPrefix}
              </span>
              <AnimatedTitle
                coloredSegments={t.heroSegments}
                className="text-2xl leading-[1.14] tracking-[-0.03em] font-normal"
                srPrefix={language === 'pl' ? 'Grzegorz Seweryn. ' : 'Grzegorz Seweryn — '}
              />
            </div>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.05 }}
            >
              <p className="text-md leading-relaxed text-zinc-600 max-measure text-pretty">
                {t.heroBio}
              </p>
            </motion.div>
          </div>

          <motion.div
            className="md:col-span-5 flex justify-center md:justify-end w-full"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.08 }}
          >
            <div className="w-full max-w-[420px] md:max-w-none aspect-square relative overflow-hidden rounded-2xl bg-zinc-950 border border-zinc-200/80 shadow-md">
              <img
                src="/herozdjecie.webp"
                alt={t.heroImageAlt}
                width={1254}
                height={1254}
                className="w-full h-full object-cover"
                loading="eager"
                decoding="async"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Interface Showcase Banner: PetCare mobile screens */}
      <section className="py-8 md:py-12">
        <div className="site-container">
          <PetCareShowcase
            navigate={navigate}
            alt={t.showcase.imageAlt}
            caption={t.showcase.caption}
            readStudy={t.showcase.readStudy}
          />
        </div>
      </section>

      {/* Perspective / Info Section */}
      <section className="py-14 md:py-20 border-t border-zinc-100">
        <div className="site-container grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12">
          <h2 className="md:col-span-3 md:sticky md:self-start md:top-24 text-lg font-medium tracking-tight text-[#111111]">
            {t.perspective.title}
          </h2>
          <motion.div
            className="md:col-span-9"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
          >
            <div className="space-y-4 max-measure">
              <p className="text-md leading-relaxed text-zinc-700 text-pretty">
                {t.perspective.p1}
              </p>
              <p className="text-md leading-relaxed text-zinc-700 text-pretty">
                {t.perspective.p2}
              </p>
              <button
                onClick={() => {
                  navigate('/about')
                  window.scrollTo({ top: 0, behavior: 'smooth' })
                }}
                className="inline-block mt-2 text-sm font-medium underline underline-offset-4 text-zinc-700 hover:text-[#111111] transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#111111] rounded py-1"
              >
                {t.perspective.moreLink}
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Core Capabilities Section (The 4 user pillars) */}
      <section className="py-14 md:py-20 border-t border-zinc-100">
        <div className="site-container">
          <h2 className="text-lg font-medium tracking-tight text-[#111111] mb-6 md:mb-8 text-balance">
            {t.capabilities.title}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-stretch">
            {t.capabilities.items.map((service, index) => (
              <motion.div
                key={service.title}
                className="capability-card flex flex-col justify-between border border-zinc-200 rounded-2xl p-6 bg-white hover:border-zinc-300 transition-all duration-300 shadow-2xs group hover:shadow-xs h-full"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.06 }}
              >
                <div className="flex flex-col h-full">
                  <div className="w-full h-48 mb-5 relative flex items-center justify-center bg-transparent">
                    <GeometricFigure type={capabilityTypes[index]} />
                  </div>
                  <div className="min-h-[3.25rem] flex items-end mb-1">
                    <p className="text-lg font-medium text-[#111111] text-balance leading-snug">{service.title}</p>
                  </div>
                  <p className="text-sm font-medium text-zinc-700 min-h-[2.5rem] mb-2 text-balance leading-snug">{service.subtitle}</p>
                  <p className="text-xs text-zinc-600 leading-relaxed text-pretty mt-auto">{service.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Selected Studies Section */}
      <section className="py-14 md:py-20 border-t border-zinc-100">
        <div className="site-container">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-8">
            <h2 className="md:col-span-3 md:sticky md:self-start md:top-24 text-lg font-medium tracking-tight text-[#111111]">
              {t.selectedStudies.title}
            </h2>
            <div className="md:col-span-9 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <p className="text-sm text-zinc-600 max-measure text-pretty">
                {t.selectedStudies.desc}
              </p>
              <button
                onClick={() => {
                  navigate('/work')
                  window.scrollTo({ top: 0, behavior: 'smooth' })
                }}
                className="text-sm font-medium underline underline-offset-4 text-zinc-700 hover:text-[#111111] transition-colors cursor-pointer shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#111111] rounded"
              >
                {t.selectedStudies.viewAll}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
            {/* Portfolio Desk Card */}
            <button
              onClick={() => {
                navigate('/work/portfolio-desk')
                window.scrollTo({ top: 0, behavior: 'smooth' })
              }}
              className="flex flex-col justify-between h-full group text-left cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#111111] focus-visible:ring-offset-2 rounded-xl transition-all"
            >
              <div className="w-full">
                <div className="aspect-[16/10] bg-zinc-100 overflow-hidden rounded-lg relative mb-3 border border-zinc-200">
                  <img
                    src="/work/portfolio-desk/work-list-light.png"
                    alt={t.selectedStudies.portfolioDesk.title}
                    width={2500}
                    height={1667}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <p className="text-sm font-medium text-[#111111]">{t.selectedStudies.portfolioDesk.title}</p>
                <p className="text-xs text-zinc-600 mt-1 text-pretty">{t.selectedStudies.portfolioDesk.desc}</p>
              </div>
            </button>

            {/* Kraków Touristification Card */}
            <button
              onClick={() => {
                navigate('/work/krakow-touristification')
                window.scrollTo({ top: 0, behavior: 'smooth' })
              }}
              className="flex flex-col justify-between h-full group text-left cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#111111] focus-visible:ring-offset-2 rounded-xl transition-all"
            >
              <div className="w-full">
                <div className="aspect-[16/10] bg-[#f4f4f5] overflow-hidden rounded-lg relative mb-3 border border-zinc-200 flex items-center justify-center transition-transform duration-500 group-hover:scale-[1.01]">
                  <DistrictPhasesThumbnail />
                </div>
                <p className="text-sm font-medium text-[#111111]">{t.selectedStudies.touristification.title}</p>
                <p className="text-xs text-zinc-600 mt-1 text-pretty">{t.selectedStudies.touristification.desc}</p>
              </div>
            </button>

            <a href="/work/petcare" onClick={e => { e.preventDefault(); navigate('/work/petcare'); window.scrollTo(0, 0) }} className="block rounded-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-violet-900">
              <div className="aspect-[16/10] bg-[#f6f0f8] overflow-hidden rounded-lg mb-3">
                <img src="/work/petcare/cover.png" alt={petcareContent[language].heroAlt} width={1280} height={900} loading="lazy" decoding="async" className="w-full h-full object-contain" />
              </div>
              <p className="text-sm font-medium">PetCare</p>
              <p className="text-xs text-zinc-600 mt-1">{petcareContent[language].subtitle}</p>
            </a>
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      <LightboxModal
        images={explorationImages}
        currentIndex={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onSelectIndex={(index) => setLightboxIndex(index)}
      />
    </main>
  )
}

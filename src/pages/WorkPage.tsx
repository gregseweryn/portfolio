import React, { useState } from 'react'
import { AnimatedTitle } from '../components/AnimatedTitle'
import { LightboxModal, LightboxImage } from '../components/LightboxModal'
import { DistrictPhasesThumbnail } from '../components/TouristificationCharts'
import { useLanguage } from '../context/LanguageContext'
import { workContent } from '../i18n'

interface WorkPageProps {
  navigate: (path: string) => void
}

const allExplorations: LightboxImage[] = [
  { src: '/work/portfolio-desk/work-list-light.png', alt: 'Portfolio Desk Work List (Light Theme)' },
  { src: '/work/portfolio-desk/work-list-dark.png', alt: 'Portfolio Desk Work List (Dark Theme)' },
  { src: '/work/portfolio-desk/loan-detail-light.png', alt: 'Loan Detail View' },
  { src: '/work/portfolio-desk/loan-detail-dark.png', alt: 'Loan Detail View (Dark Theme)' },
  { src: '/work/portfolio-desk/repayment-history-light.png', alt: 'Repayment History Drawer' },
  { src: '/work/portfolio-desk/repayment-history-dark.png', alt: 'Repayment History Drawer (Dark Theme)' },
  { src: '/work/portfolio-desk/overview-light.png', alt: 'Portfolio Overview Dashboard' },
  { src: '/work/portfolio-desk/edge-states-light.png', alt: 'Empty and Edge States' },
]

export const WorkPage: React.FC<WorkPageProps> = ({ navigate }) => {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const { language } = useLanguage()
  const t = workContent[language]

  return (
    <main id="main-content">
      {/* Headline Header */}
      <section className="pt-8 md:pt-14 pb-10 md:pb-16">
        <div className="site-container">
          <AnimatedTitle
            coloredSegments={t.headlineSegments}
            className="text-2xl md:max-w-3xl leading-[1.14] tracking-[-0.03em] text-balance"
          />
        </div>
      </section>

      {/* Case Studies Section */}
      <section className="py-14 md:py-20 border-t border-zinc-100">
        <div className="site-container grid grid-cols-1 md:grid-cols-12 gap-8">
          <h2 className="md:col-span-3 md:sticky md:self-start md:top-24 text-lg font-medium tracking-tight text-[#111111]">
            {t.caseStudiesTitle}
          </h2>
          <div className="md:col-span-9 flex flex-col gap-12">
            {/* Portfolio Desk */}
            <button
              onClick={() => {
                navigate('/work/portfolio-desk')
                window.scrollTo({ top: 0, behavior: 'smooth' })
              }}
              className="block group text-left cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#111111] rounded-xl p-1"
            >
              <div className="aspect-[16/10] bg-[#f8f8f8] overflow-hidden rounded-xl relative mb-4 border border-zinc-200 shadow-sm transition-transform duration-500 group-hover:scale-[1.01]">
                <img
                  src="/work/portfolio-desk/mockup3.webp"
                  alt="Portfolio Desk: Dual workstation mockup showing dark and light mode team portfolios"
                  width={6000}
                  height={4171}
                  className="w-full h-full object-cover"
                  loading="eager"
                  decoding="async"
                />
              </div>
              <p className="text-xl font-medium text-[#111111] text-balance">{t.portfolioDesk.title}</p>
              <p className="text-sm text-zinc-700 mt-1 font-medium text-balance">{t.portfolioDesk.subtitle}</p>
              <p className="text-xs text-zinc-600 mt-1 text-pretty">
                {t.portfolioDesk.desc}
              </p>
            </button>

            {/* Kraków Touristification */}
            <button
              onClick={() => {
                navigate('/work/krakow-touristification')
                window.scrollTo({ top: 0, behavior: 'smooth' })
              }}
              className="block group text-left cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#111111] rounded-xl p-1"
            >
              <div className="aspect-[16/10] bg-[#f4f4f5] overflow-hidden rounded-xl relative mb-4 border border-zinc-200 shadow-sm flex items-center justify-center transition-transform duration-500 group-hover:scale-[1.01]">
                <DistrictPhasesThumbnail />
              </div>
              <p className="text-xl font-medium text-[#111111] text-balance">{t.touristification.title}</p>
              <p className="text-sm text-zinc-700 mt-1 font-medium text-balance">{t.touristification.subtitle}</p>
              <p className="text-xs text-zinc-600 mt-1 text-pretty">
                {t.touristification.desc}
              </p>
            </button>
          </div>
        </div>
      </section>

      {/* Interface Artefacts Section */}
      <section className="py-14 md:py-20 border-t border-zinc-100">
        <div className="site-container grid grid-cols-1 md:grid-cols-12 gap-8">
          <h2 className="md:col-span-3 md:sticky md:self-start md:top-24 text-lg font-medium tracking-tight text-[#111111]">
            {t.artefactsTitle}
          </h2>
          <div className="md:col-span-9 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {allExplorations.map((item, idx) => (
              <button
                key={item.src}
                onClick={() => setLightboxIndex(idx)}
                className="aspect-[16/10] relative overflow-hidden rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-[#111111] cursor-pointer group bg-zinc-50 border border-zinc-200"
              >
                <img
                  src={item.src}
                  alt={item.alt}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                  loading="lazy"
                />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      <LightboxModal
        images={allExplorations}
        currentIndex={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onSelectIndex={(index) => setLightboxIndex(index)}
      />
    </main>
  )
}

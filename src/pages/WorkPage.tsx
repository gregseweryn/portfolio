import React, { useState } from 'react'
import { AnimatedTitle } from '../components/AnimatedTitle'
import { LightboxModal, LightboxImage } from '../components/LightboxModal'
import { DistrictPhasesThumbnail } from '../components/TouristificationCharts'
import { useLanguage } from '../context/LanguageContext'
import { workContent } from '../i18n'
import { petcareContent } from '../i18n/petcare'
import { Laptop3D, Phone3D, PhoneTrio3D } from '../components/DeviceMockups'

interface WorkPageProps {
  navigate: (path: string) => void
}

interface ExplorationItem extends LightboxImage {
  type: 'laptop' | 'phone'
  tone?: 'neutral' | 'dark' | 'violet'
}

const allExplorations: ExplorationItem[] = [
  // 4 Portfolio Desk Laptops
  { src: '/work/portfolio-desk/work-list-light.png', alt: 'Portfolio Desk Work List (Light Theme)', type: 'laptop', tone: 'neutral' },
  { src: '/work/portfolio-desk/work-list-dark.png', alt: 'Portfolio Desk Work List (Dark Theme)', type: 'laptop', tone: 'dark' },
  { src: '/work/portfolio-desk/loan-detail-light.png', alt: 'Loan Detail View', type: 'laptop', tone: 'neutral' },
  { src: '/work/portfolio-desk/repayment-history-dark.png', alt: 'Repayment History Drawer (Dark Theme)', type: 'laptop', tone: 'dark' },

  // 4 PetCare Mobile Smartphones
  { src: '/work/petcare/today-light.png', alt: 'PetCare: Today View (Light Theme)', type: 'phone', tone: 'violet' },
  { src: '/work/petcare/shared-care-dark.png', alt: 'PetCare: Shared Care Log (Dark Theme)', type: 'phone', tone: 'dark' },
  { src: '/work/petcare/add-pet.png', alt: 'PetCare: Add Pet Flow', type: 'phone', tone: 'violet' },
  { src: '/work/petcare/invitation-pending.png', alt: 'PetCare: Caregiver Invitation Pending', type: 'phone', tone: 'violet' },
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
              className="block group text-left cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#111111] focus-visible:ring-offset-2 rounded-xl transition-all"
            >
              <Laptop3D src="/work/portfolio-desk/overview-light.png" alt="Portfolio Desk: overview dashboard on a laptop" eager className="mb-4" />
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
              className="block group text-left cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#111111] focus-visible:ring-offset-2 rounded-xl transition-all"
            >
              <Laptop3D className="mb-4"><DistrictPhasesThumbnail /></Laptop3D>
              <p className="text-xl font-medium text-[#111111] text-balance">{t.touristification.title}</p>
              <p className="text-sm text-zinc-700 mt-1 font-medium text-balance">{t.touristification.subtitle}</p>
              <p className="text-xs text-zinc-600 mt-1 text-pretty">
                {t.touristification.desc}
              </p>
            </button>

            {/* PetCare */}
            <a
              href="/work/petcare"
              onClick={e => { e.preventDefault(); navigate('/work/petcare'); window.scrollTo(0, 0) }}
              className="block group text-left rounded-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-violet-900"
            >
              <PhoneTrio3D
                left="/work/petcare/add-pet.png"
                center="/work/petcare/today-light.png"
                right="/work/petcare/shared-care-dark.png"
                className="mb-4"
              />
              <p className="text-xl font-medium">PetCare</p>
              <p className="text-sm text-zinc-700 mt-1 font-medium">{petcareContent[language].subtitle}</p>
              <p className="text-xs text-zinc-600 mt-1">{language === 'pl' ? 'Cztery wywiady, testy wcześniejszego prototypu z pięcioma osobami i projekt wspólnego zapisu opieki.' : 'Four discovery interviews, a five-person test of an earlier prototype and a shared-care record concept.'}</p>
            </a>
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
                aria-label={item.alt}
                className="block text-left cursor-pointer rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-[#111111] focus-visible:ring-offset-2"
              >
                {item.type === 'phone' ? (
                  <Phone3D src={item.src} alt={item.alt} tone={item.tone || 'violet'} />
                ) : (
                  <Laptop3D src={item.src} alt={item.alt} tone={item.tone || 'neutral'} soft />
                )}
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

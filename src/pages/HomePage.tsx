import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { AnimatedTitle } from '../components/AnimatedTitle'
import { LightboxModal, LightboxImage } from '../components/LightboxModal'
import { GeometricFigure, FigureType } from '../components/GeometricFigures'
import { DistrictPhasesThumbnail } from '../components/TouristificationCharts'

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

  const heroSegments = [
    { text: 'Junior UX Researcher and Product Designer ', color: '#111111' },
    { text: 'with formal training in visual design and social research.', color: '#52525b' },
  ]

  return (
    <main id="main-content">
      {/* Hero Section */}
      <section className="pt-6 pb-4 md:py-14">
        <div className="site-container grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">
          <div className="md:col-span-7 flex flex-col justify-center gap-5">
            <div className="flex flex-col gap-2">
              <span className="text-xs uppercase tracking-wider font-semibold text-zinc-500">
                Grzegorz Seweryn · UX Researcher & Product Designer
              </span>
              <AnimatedTitle
                coloredSegments={heroSegments}
                className="text-2xl leading-[1.14] tracking-[-0.03em] font-normal"
                srPrefix="Grzegorz Seweryn — "
              />
            </div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.2 }}
            >
              <p className="text-md leading-relaxed text-zinc-600 max-measure text-pretty">
                BA in Graphic Design and UX, MA in Sociology and Data Analysis from Jagiellonian University.
                I combine empirical research methods with interface design to help product teams make
                decisions based on evidence.
              </p>
            </motion.div>
          </div>

          <motion.div
            className="md:col-span-5 flex justify-center md:justify-end w-full"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.45, delay: 0.25 }}
          >
            <div className="w-full max-w-[420px] md:max-w-none aspect-square relative overflow-hidden rounded-2xl bg-zinc-950 border border-zinc-200/80 shadow-md">
              <img
                src="/herozdjecie.webp"
                alt="Grzegorz Seweryn, UX Researcher and Product Designer"
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

      {/* Featured Interface Showcase Banner */}
      {/* Hero Showcase Teaser */}
      <section className="py-8 md:py-12">
        <div className="site-container">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative overflow-hidden rounded-xl border border-zinc-200/90 shadow-md bg-zinc-50 group cursor-pointer"
            onClick={() => {
              navigate('/work/portfolio-desk')
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
          >
            <div className="aspect-[16/10] md:aspect-[3/2] w-full overflow-hidden bg-zinc-100">
              <img
                src="/work/portfolio-desk/mockup2.webp"
                alt="Portfolio Desk: Redesigned loan servicing interface shown on laptop mockup"
                width={2500}
                height={1667}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.01]"
                loading="eager"
                decoding="async"
              />
            </div>
            <div className="px-4 py-3 bg-white/95 border-t border-zinc-200/70 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
              <p className="text-xs text-zinc-600 font-medium text-pretty">
                Portfolio Desk: Self-initiated audit of 18 findings and redesign in IBM Carbon.
              </p>
              <span className="text-xs font-medium text-[#111111] group-hover:underline underline-offset-2 shrink-0">
                Read case study →
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Perspective / Info Section */}
      <section className="py-14 md:py-20 border-t border-zinc-100">
        <div className="site-container grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12">
          <h2 className="md:col-span-3 md:sticky md:self-start md:top-24 text-lg font-medium tracking-tight text-[#111111]">
            Perspective
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
                My education combined two areas that usually develop separately. A BA in Graphic Design gave me
                the tools to construct interfaces, understand typography, and build component systems. An MA in Sociology
                at Jagiellonian University taught me empirical research methods, questionnaire construction, in-depth
                interviews, and statistical data analysis.
              </p>
              <p className="text-md leading-relaxed text-zinc-700 text-pretty">
                I apply this dual training directly. In research, I avoid leading questions and state limitations
                transparently. In design, I measure whether a layout actually improves the task before calling it a success.
              </p>
              <button
                onClick={() => {
                  navigate('/about')
                  window.scrollTo({ top: 0, behavior: 'smooth' })
                }}
                className="inline-block mt-2 text-sm font-medium underline underline-offset-4 text-zinc-700 hover:text-[#111111] transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#111111] rounded py-1"
              >
                More about my background and approach →
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Core Capabilities Section (The 4 user pillars) */}
      <section className="py-14 md:py-20 border-t border-zinc-100">
        <div className="site-container">
          <h2 className="text-lg font-medium tracking-tight text-[#111111] mb-6 md:mb-8 text-balance">
            Core Capabilities
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {[
              {
                type: 'research' as FigureType,
                title: 'UX Research',
                subtitle: 'Frame questions, gather data',
                desc: 'Survey instrument design, in-depth interviews (IDI), participant screening, and qualitative synthesis.',
              },
              {
                type: 'design' as FigureType,
                title: 'UX & UI Design',
                subtitle: 'Structure and interaction',
                desc: 'Information architecture, wireframing, high-fidelity prototypes in Figma, and task flow optimization.',
              },
              {
                type: 'systems' as FigureType,
                title: 'Design Systems',
                subtitle: 'Scalable, consistent UI',
                desc: 'Building interfaces using established component libraries, token systems, and standards such as IBM Carbon.',
              },
              {
                type: 'a11y' as FigureType,
                title: 'Accessibility (a11y)',
                subtitle: 'Inclusive and readable',
                desc: 'WCAG 2.2 AA compliance, keyboard navigation, color contrast ratios, and semantic HTML structure.',
              },
            ].map((service, index) => (
              <motion.div
                key={service.title}
                className="capability-card flex flex-col justify-between border border-zinc-200 rounded-2xl p-6 md:p-7 bg-white hover:border-zinc-300 transition-all duration-300 shadow-2xs group hover:shadow-xs min-h-[450px]"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.06 }}
              >
                <div className="flex flex-col">
                  <div className="w-full h-52 mb-5 relative flex items-center justify-center bg-transparent">
                    <GeometricFigure type={service.type} />
                  </div>
                  <p className="text-lg font-medium text-[#111111] text-balance">{service.title}</p>
                  <p className="text-sm font-medium text-zinc-700 mt-1 mb-3 text-balance">{service.subtitle}</p>
                  <p className="text-xs text-zinc-600 leading-relaxed text-pretty">{service.desc}</p>
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
              Selected Studies
            </h2>
            <div className="md:col-span-9 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <p className="text-sm text-zinc-600 max-measure text-pretty">
                Two comprehensive case studies across financial interface design, cognitive
                modelling, and urban mixed-methods research.
              </p>
              <button
                onClick={() => {
                  navigate('/work')
                  window.scrollTo({ top: 0, behavior: 'smooth' })
                }}
                className="text-sm font-medium underline underline-offset-4 text-zinc-700 hover:text-[#111111] transition-colors cursor-pointer shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#111111] rounded"
              >
                View all research →
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Portfolio Desk Card */}
            <button
              onClick={() => {
                navigate('/work/portfolio-desk')
                window.scrollTo({ top: 0, behavior: 'smooth' })
              }}
              className="block group text-left cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#111111] rounded-xl p-1"
            >
              <div className="aspect-[16/10] bg-zinc-100 overflow-hidden rounded-lg relative mb-3 border border-zinc-200">
                <img
                  src="/work/portfolio-desk/mockup2.webp"
                  alt="Portfolio Desk Interface"
                  width={2500}
                  height={1667}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <p className="text-sm font-medium text-[#111111]">Portfolio Desk</p>
              <p className="text-xs text-zinc-600 mt-0.5 text-pretty">Self-initiated loan servicing audit and KLM redesign (65% task time cut)</p>
            </button>

            {/* Kraków Touristification Card */}
            <button
              onClick={() => {
                navigate('/work/krakow-touristification')
                window.scrollTo({ top: 0, behavior: 'smooth' })
              }}
              className="block group text-left cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#111111] rounded-xl p-1"
            >
              <div className="aspect-[16/10] bg-[#f4f4f5] overflow-hidden rounded-lg relative mb-3 border border-zinc-200 flex items-center justify-center transition-transform duration-500 group-hover:scale-[1.01]">
                <DistrictPhasesThumbnail />
              </div>
              <p className="text-sm font-medium text-[#111111]">Kraków Touristification</p>
              <p className="text-xs text-zinc-600 mt-0.5 text-pretty">Sole-authored mixed methods study (446 survey respondents, 10 IDIs)</p>
            </button>

            {/* Explorations 2x2 Grid */}
            <div className="p-1">
              <div className="aspect-[16/10] overflow-hidden rounded-lg mb-3 grid grid-cols-2 gap-1.5 bg-zinc-100 p-1.5 border border-zinc-200">
                {explorationImages.slice(0, 4).map((img, idx) => (
                  <button
                    key={img.src}
                    onClick={() => setLightboxIndex(idx)}
                    className="relative overflow-hidden rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-[#111111] cursor-pointer group bg-white border border-zinc-200/60"
                    aria-label={`Open preview of ${img.alt}`}
                  >
                    <img
                      src={img.src}
                      alt={img.alt}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                      loading="lazy"
                    />
                  </button>
                ))}
              </div>
              <p className="text-sm font-medium text-[#111111]">Interface States and Artefacts</p>
              <p className="text-xs text-zinc-600 mt-0.5 text-pretty">Carbon design system, drawers, and dark mode</p>
            </div>
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

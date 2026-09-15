import React, { useState } from 'react'
import { AnimatedTitle } from '../components/AnimatedTitle'
import { LightboxModal, LightboxImage } from '../components/LightboxModal'
import { useLanguage } from '../context/LanguageContext'
import { portfolioDeskContent } from '../i18n'

interface CaseStudyPortfolioDeskProps {
  navigate: (path: string) => void
}

const deskImages: LightboxImage[] = [
  { src: '/work/portfolio-desk/before-work-list.png', alt: 'Audited Frappe Lending: Loan list with missing days past due and amounts' },
  { src: '/work/portfolio-desk/work-list-light.png', alt: 'Portfolio Desk Redesign: Prioritized work list with days past due and amounts in arrears' },
  { src: '/work/portfolio-desk/before-loan-detail.png', alt: 'Audited Frappe Lending: Form document with 10 separate doctype buttons in Connections' },
  { src: '/work/portfolio-desk/loan-detail-light.png', alt: 'Portfolio Desk Redesign: Loan detail with immediate arrears breakdown and action sidebar' },
  { src: '/work/portfolio-desk/before-repayments.png', alt: 'Audited Frappe Lending: Repayment list requiring opening rows to see transaction details' },
  { src: '/work/portfolio-desk/repayment-history-light.png', alt: 'Portfolio Desk Redesign: Consolidated repayment ledger drawer with interest as a column' },
  { src: '/work/portfolio-desk/log-action-light.png', alt: 'Portfolio Desk Redesign: Log collections action drawer rebuilt with segmented controls' },
  { src: '/work/portfolio-desk/overview-light.png', alt: 'Portfolio Desk Redesign: Portfolio overview dashboard with dual-axis delinquency buckets' },
  { src: '/work/portfolio-desk/edge-states-light.png', alt: 'Portfolio Desk Redesign: Edge, loading skeleton, and error recovery states' },
  { src: '/work/portfolio-desk/sign-in-light.png', alt: 'Portfolio Desk: Enterprise authentication and sign-in gateway in IBM Carbon (Light Theme)' },
  { src: '/work/portfolio-desk/sign-in-dark.png', alt: 'Portfolio Desk: Enterprise authentication and sign-in gateway in IBM Carbon (Dark Theme)' },
  { src: '/work/portfolio-desk/mockup3.webp', alt: 'Portfolio Desk: Dual workstation mockup showing dark and light mode team portfolios' },
  { src: '/work/portfolio-desk/mockup1.webp', alt: 'Portfolio Desk: Workstation laptop mockup showing loan servicing work list' },
  { src: '/work/portfolio-desk/team-portfolio-light.png', alt: 'Portfolio Desk: Team portfolio management view in IBM Carbon (Light Theme)' },
  { src: '/work/portfolio-desk/team-portfolio-dark.png', alt: 'Portfolio Desk: Team portfolio management view in IBM Carbon (Dark Theme)' },
]

export const CaseStudyPortfolioDesk: React.FC<CaseStudyPortfolioDeskProps> = ({ navigate }) => {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const [signInTheme, setSignInTheme] = useState<'light' | 'dark'>('light')
  const [systemTab, setSystemTab] = useState<'foundations' | 'components' | 'identity'>('foundations')
  const [systemTheme, setSystemTheme] = useState<'light' | 'dark'>('light')
  const [systemSortCol, setSystemSortCol] = useState<'dpd' | 'arrears'>('dpd')
  const [systemSortAsc, setSystemSortAsc] = useState<boolean>(false)
  const [systemTabDemoIndex, setSystemTabDemoIndex] = useState<number>(0)
  const [isTabularDemo, setIsTabularDemo] = useState<boolean>(true)
  const isDark = systemTheme === 'dark'
  const { language } = useLanguage()
  const t = portfolioDeskContent[language]

  const scrollToSection = (e: React.MouseEvent, id: string) => {
    e.preventDefault()
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <main id="main-content">
      {/* Title & Metadata Section */}
      <section id="overview" className="pt-8 md:pt-14 pb-6 md:pb-8 scroll-mt-20">
        <div className="site-container">
          <AnimatedTitle
            coloredSegments={[{ text: t.title, color: '#111111' }]}
            className="text-2xl md:text-3xl leading-[1.12] tracking-tight mb-3 font-normal"
          />
          <p className="text-lg md:text-xl text-zinc-700 font-light mb-8 text-balance">
            {t.subtitle}
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 py-6 border-y border-zinc-200">
            <div>
              <p className="text-xs text-zinc-500 font-semibold uppercase tracking-wider mb-1">
                {t.meta.yearLabel}
              </p>
              <p className="text-sm font-medium text-[#111111]">{t.meta.yearVal}</p>
            </div>
            <div>
              <p className="text-xs text-zinc-500 font-semibold uppercase tracking-wider mb-1">
                {t.meta.roleLabel}
              </p>
              <p className="text-sm font-medium text-[#111111]">{t.meta.roleVal}</p>
            </div>
            <div>
              <p className="text-xs text-zinc-500 font-semibold uppercase tracking-wider mb-1">
                {t.meta.bookLabel}
              </p>
              <p className="text-sm font-medium text-[#111111]">{t.meta.bookVal}</p>
            </div>
            <div>
              <p className="text-xs text-zinc-500 font-semibold uppercase tracking-wider mb-1">
                {t.meta.prototypeLabel}
              </p>
              <a
                href="https://semi-secure-43576547.figma.site/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium underline underline-offset-4 text-zinc-700 hover:text-[#111111] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#111111] rounded"
              >
                {t.meta.prototypeLink}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Discrete Sticky Table of Contents */}
      <nav
        aria-label="Case study sections"
        className="sticky top-0 z-30 bg-white/95 backdrop-blur-sm border-b border-zinc-200/80 py-2.5 transition-all"
      >
        <div className="site-container flex items-center justify-between gap-4">
          <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500 shrink-0 hidden sm:inline">
            {language === 'pl' ? 'Spis treści' : 'Contents'}
          </span>
          <div className="flex items-center gap-2 sm:gap-4 overflow-x-auto no-scrollbar py-0.5 text-xs font-medium">
            {t.toc.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => scrollToSection(e, item.id)}
                className="whitespace-nowrap px-2.5 py-1 rounded-full text-zinc-600 hover:text-[#111111] hover:bg-zinc-100 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#111111]"
              >
                {item.label}
              </a>
            ))}
          </div>
          <span className="text-xs font-medium text-zinc-400 shrink-0 hidden md:inline">
            {t.speedupBadge}
          </span>
        </div>
      </nav>

      {/* Hero Banner */}
      <section className="py-8 md:py-12">
        <div className="site-container">
          <button
            onClick={() => setLightboxIndex(12)}
            className="w-full text-left rounded-xl overflow-hidden bg-zinc-50 border border-zinc-200 shadow-sm aspect-[16/10] md:aspect-[3/2] cursor-pointer group relative focus:outline-none focus-visible:ring-2 focus-visible:ring-[#111111]"
          >
            <img
              src="/work/portfolio-desk/mockup1.png"
              alt={t.heroMockupAlt}
              className="w-full h-full object-cover group-hover:scale-[1.005] transition-transform duration-300"
              loading="eager"
            />
            <span className="absolute bottom-3 right-3 text-xs bg-black/75 text-white px-3 py-1.5 rounded-md backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-opacity">
              Click to view full screen ↗
            </span>
          </button>
        </div>
      </section>

      {/* The Core Question & Summary */}
      <section id="problem" className="py-12 md:py-16 border-t border-zinc-100 scroll-mt-20">
        <div className="site-container grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12">
          <h2 className="md:col-span-3 text-lg text-[#111111] font-medium">{t.problem.title}</h2>
          <div className="md:col-span-9 flex flex-col gap-4 text-md text-zinc-700 leading-relaxed max-measure text-pretty">
            <p className="font-medium text-[#111111]">
              {t.problem.q}
            </p>
            <p>
              {t.problem.p1}
            </p>
            <p>
              {t.problem.p2}
            </p>
          </div>
        </div>
      </section>

      {/* Audited System vs. Redesign (Before & After Comparisons) */}
      <section id="comparison" className="py-12 md:py-16 border-t border-zinc-100 scroll-mt-20">
        <div className="site-container">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12 mb-10">
            <h2 className="md:col-span-3 text-lg text-[#111111] font-medium">
              {t.comparison.title}
            </h2>
            <div className="md:col-span-9 flex flex-col gap-4 text-md text-zinc-700 leading-relaxed max-measure text-pretty">
              <p>
                {t.comparison.p1}
              </p>
              <p>
                {t.comparison.p2}
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-12">
            {/* Pair 1: Work List */}
            <div className="border border-zinc-200 rounded-2xl p-5 md:p-8 bg-white shadow-2xs">
              <div className="mb-6">
                <p className="text-xs uppercase tracking-wider font-semibold text-zinc-500 mb-1">
                  {t.comparison.comp1.tag}
                </p>
                <h3 className="text-xl font-medium text-[#111111]">
                  {t.comparison.comp1.title}
                </h3>
                <p className="text-sm text-zinc-600 mt-2 max-measure text-pretty">
                  {t.comparison.comp1.desc}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Before */}
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between items-baseline text-xs pb-1.5 border-b border-zinc-200/80 mb-1">
                    <span className="font-semibold uppercase tracking-wider text-zinc-700">
                      {t.comparison.comp1.beforeLabel}
                    </span>
                    <span className="text-zinc-400 text-[11px]">Frappe Lending</span>
                  </div>
                  <button
                    onClick={() => setLightboxIndex(0)}
                    className="aspect-[16/10] overflow-hidden rounded-xl border border-zinc-200 bg-white group cursor-pointer relative shadow-2xs hover:border-zinc-300 transition-colors text-left"
                  >
                    <img
                      src="/work/portfolio-desk/before-work-list.png"
                      alt={t.comparison.comp1.beforeAlt}
                      className="w-full h-full object-cover group-hover:scale-[1.01] transition-transform duration-300"
                      loading="lazy"
                    />
                    <span className="absolute bottom-2 right-2 text-xs bg-black/70 text-white px-2 py-1 rounded backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-opacity">
                      {language === 'pl' ? 'Powiększ ↗' : 'Click to inspect ↗'}
                    </span>
                  </button>
                  <p className="text-xs text-zinc-600 leading-relaxed text-pretty">
                    {t.comparison.comp1.beforeNote}
                  </p>
                </div>

                {/* After */}
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between items-baseline text-xs pb-1.5 border-b border-zinc-200/80 mb-1">
                    <span className="font-semibold uppercase tracking-wider text-[#111111]">
                      {t.comparison.comp1.afterLabel}
                    </span>
                    <span className="text-zinc-400 text-[11px]">IBM Carbon Redesign</span>
                  </div>
                  <button
                    onClick={() => setLightboxIndex(1)}
                    className="aspect-[16/10] overflow-hidden rounded-xl border border-zinc-200 bg-white group cursor-pointer relative shadow-2xs hover:border-zinc-300 transition-colors text-left"
                  >
                    <img
                      src="/work/portfolio-desk/work-list-light.png"
                      alt={t.comparison.comp1.afterAlt}
                      className="w-full h-full object-cover group-hover:scale-[1.01] transition-transform duration-300"
                      loading="lazy"
                    />
                    <span className="absolute bottom-2 right-2 text-xs bg-black/70 text-white px-2 py-1 rounded backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-opacity">
                      {language === 'pl' ? 'Powiększ ↗' : 'Click to inspect ↗'}
                    </span>
                  </button>
                  <p className="text-xs text-zinc-600 leading-relaxed text-pretty">
                    {t.comparison.comp1.afterNote}
                  </p>
                </div>
              </div>
            </div>

            {/* Pair 2: Loan Detail View */}
            <div className="border border-zinc-200 rounded-2xl p-5 md:p-8 bg-white shadow-2xs">
              <div className="mb-6">
                <p className="text-xs uppercase tracking-wider font-semibold text-zinc-500 mb-1">
                  {t.comparison.comp2.tag}
                </p>
                <h3 className="text-xl font-medium text-[#111111]">
                  {t.comparison.comp2.title}
                </h3>
                <p className="text-sm text-zinc-600 mt-2 max-measure text-pretty">
                  {t.comparison.comp2.desc}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Before */}
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between items-baseline text-xs pb-1.5 border-b border-zinc-200/80 mb-1">
                    <span className="font-semibold uppercase tracking-wider text-zinc-700">
                      {t.comparison.comp2.beforeLabel}
                    </span>
                    <span className="text-zinc-400 text-[11px]">Frappe Lending</span>
                  </div>
                  <button
                    onClick={() => setLightboxIndex(2)}
                    className="aspect-[16/10] overflow-hidden rounded-xl border border-zinc-200 bg-white group cursor-pointer relative shadow-2xs hover:border-zinc-300 transition-colors text-left"
                  >
                    <img
                      src="/work/portfolio-desk/before-loan-detail.png"
                      alt={t.comparison.comp2.beforeAlt}
                      className="w-full h-full object-cover group-hover:scale-[1.01] transition-transform duration-300"
                      loading="lazy"
                    />
                    <span className="absolute bottom-2 right-2 text-xs bg-black/70 text-white px-2 py-1 rounded backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-opacity">
                      {language === 'pl' ? 'Powiększ ↗' : 'Click to inspect ↗'}
                    </span>
                  </button>
                  <p className="text-xs text-zinc-600 leading-relaxed text-pretty">
                    {t.comparison.comp2.beforeNote}
                  </p>
                </div>

                {/* After */}
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between items-baseline text-xs pb-1.5 border-b border-zinc-200/80 mb-1">
                    <span className="font-semibold uppercase tracking-wider text-[#111111]">
                      {t.comparison.comp2.afterLabel}
                    </span>
                    <span className="text-zinc-400 text-[11px]">IBM Carbon Redesign</span>
                  </div>
                  <button
                    onClick={() => setLightboxIndex(3)}
                    className="aspect-[16/10] overflow-hidden rounded-xl border border-zinc-200 bg-white group cursor-pointer relative shadow-2xs hover:border-zinc-300 transition-colors text-left"
                  >
                    <img
                      src="/work/portfolio-desk/loan-detail-light.png"
                      alt={t.comparison.comp2.afterAlt}
                      className="w-full h-full object-cover group-hover:scale-[1.01] transition-transform duration-300"
                      loading="lazy"
                    />
                    <span className="absolute bottom-2 right-2 text-xs bg-black/70 text-white px-2 py-1 rounded backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-opacity">
                      {language === 'pl' ? 'Powiększ ↗' : 'Click to inspect ↗'}
                    </span>
                  </button>
                  <p className="text-xs text-zinc-600 leading-relaxed text-pretty">
                    {t.comparison.comp2.afterNote}
                  </p>
                </div>
              </div>
            </div>

            {/* Pair 3: Repayment Ledger */}
            <div className="border border-zinc-200 rounded-2xl p-5 md:p-8 bg-white shadow-2xs">
              <div className="mb-6">
                <p className="text-xs uppercase tracking-wider font-semibold text-zinc-500 mb-1">
                  {t.comparison.comp3.tag}
                </p>
                <h3 className="text-xl font-medium text-[#111111]">
                  {t.comparison.comp3.title}
                </h3>
                <p className="text-sm text-zinc-600 mt-2 max-measure text-pretty">
                  {t.comparison.comp3.desc}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Before */}
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between items-baseline text-xs pb-1.5 border-b border-zinc-200/80 mb-1">
                    <span className="font-semibold uppercase tracking-wider text-zinc-700">
                      {t.comparison.comp3.beforeLabel}
                    </span>
                    <span className="text-zinc-400 text-[11px]">Frappe Lending</span>
                  </div>
                  <button
                    onClick={() => setLightboxIndex(4)}
                    className="aspect-[16/10] overflow-hidden rounded-xl border border-zinc-200 bg-white group cursor-pointer relative shadow-2xs hover:border-zinc-300 transition-colors text-left"
                  >
                    <img
                      src="/work/portfolio-desk/before-repayments.png"
                      alt={t.comparison.comp3.beforeAlt}
                      className="w-full h-full object-cover group-hover:scale-[1.01] transition-transform duration-300"
                      loading="lazy"
                    />
                    <span className="absolute bottom-2 right-2 text-xs bg-black/70 text-white px-2 py-1 rounded backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-opacity">
                      {language === 'pl' ? 'Powiększ ↗' : 'Click to inspect ↗'}
                    </span>
                  </button>
                  <p className="text-xs text-zinc-600 leading-relaxed text-pretty">
                    {t.comparison.comp3.beforeNote}
                  </p>
                </div>

                {/* After */}
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between items-baseline text-xs pb-1.5 border-b border-zinc-200/80 mb-1">
                    <span className="font-semibold uppercase tracking-wider text-[#111111]">
                      {t.comparison.comp3.afterLabel}
                    </span>
                    <span className="text-zinc-400 text-[11px]">IBM Carbon Redesign</span>
                  </div>
                  <button
                    onClick={() => setLightboxIndex(5)}
                    className="aspect-[16/10] overflow-hidden rounded-xl border border-zinc-200 bg-white group cursor-pointer relative shadow-2xs hover:border-zinc-300 transition-colors text-left"
                  >
                    <img
                      src="/work/portfolio-desk/repayment-history-light.png"
                      alt={t.comparison.comp3.afterAlt}
                      className="w-full h-full object-cover group-hover:scale-[1.01] transition-transform duration-300"
                      loading="lazy"
                    />
                    <span className="absolute bottom-2 right-2 text-xs bg-black/70 text-white px-2 py-1 rounded backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-opacity">
                      {language === 'pl' ? 'Powiększ ↗' : 'Click to inspect ↗'}
                    </span>
                  </button>
                  <p className="text-xs text-zinc-600 leading-relaxed text-pretty">
                    {t.comparison.comp3.afterNote}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Heuristic Audit Section (The 18 Findings) */}
      <section id="audit" className="py-12 md:py-16 border-t border-zinc-100 scroll-mt-20">
        <div className="site-container grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12">
          <h2 className="md:col-span-3 text-lg text-[#111111] font-medium">
            {t.audit.title}
          </h2>
          <div className="md:col-span-9 flex flex-col gap-6 max-measure">
            <p className="text-md text-zinc-700 leading-relaxed text-pretty">
              {t.audit.p1}
            </p>

            <div className="space-y-4">
              <div className="border border-zinc-200 rounded-xl p-5 bg-white shadow-2xs">
                <p className="text-xs font-semibold uppercase tracking-wider text-rose-700 mb-1">
                  {t.audit.f1Tag}
                </p>
                <p className="text-sm font-medium text-[#111111] mb-1">{t.audit.f1Title}</p>
                <p className="text-xs text-zinc-600 leading-relaxed text-pretty">
                  {t.audit.f1Desc}
                </p>
              </div>

              <div className="border border-zinc-200 rounded-xl p-5 bg-white shadow-2xs">
                <p className="text-xs font-semibold uppercase tracking-wider text-rose-700 mb-1">
                  {t.audit.f2Tag}
                </p>
                <p className="text-sm font-medium text-[#111111] mb-1">{t.audit.f2Title}</p>
                <p className="text-xs text-zinc-600 leading-relaxed text-pretty">
                  {t.audit.f2Desc}
                </p>
              </div>

              <div className="border border-zinc-200 rounded-xl p-5 bg-white shadow-2xs">
                <p className="text-xs font-semibold uppercase tracking-wider text-amber-700 mb-1">
                  {t.audit.f5Tag}
                </p>
                <p className="text-sm font-medium text-[#111111] mb-1">{t.audit.f5Title}</p>
                <p className="text-xs text-zinc-600 leading-relaxed text-pretty">
                  {t.audit.f5Desc}
                </p>
              </div>

              <div className="border border-zinc-200 rounded-xl p-5 bg-white shadow-2xs">
                <p className="text-xs font-semibold uppercase tracking-wider text-amber-700 mb-1">
                  {t.audit.f6Tag}
                </p>
                <p className="text-sm font-medium text-[#111111] mb-1">{t.audit.f6Title}</p>
                <p className="text-xs text-zinc-600 leading-relaxed text-pretty">
                  {t.audit.f6Desc}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* KLM-GOMS Model Results with Stat Cards & Comparative Table */}
      <section id="klm" className="py-12 md:py-16 border-t border-zinc-100 scroll-mt-20">
        <div className="site-container">
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-6">
            <h2 className="text-lg text-[#111111] font-medium">{t.klm.title}</h2>
            <span className="text-xs font-medium text-zinc-500 mt-1 sm:mt-0">
              {t.klm.metaInfo}
            </span>
          </div>

          {/* 3 Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <div className="border border-zinc-200 rounded-xl p-6 bg-white shadow-2xs">
              <p className="text-2xl font-medium text-[#111111] tabular-nums">{t.klm.card1Val}</p>
              <p className="text-sm font-medium text-zinc-800 mt-2 text-balance">{t.klm.card1Title}</p>
              <p className="text-xs text-zinc-600 mt-2 leading-relaxed text-pretty">
                {t.klm.card1Desc}
              </p>
            </div>
            <div className="border border-zinc-200 rounded-xl p-6 bg-white shadow-2xs">
              <p className="text-2xl font-medium text-[#111111] tabular-nums">{t.klm.card2Val}</p>
              <p className="text-sm font-medium text-zinc-800 mt-2 text-balance">{t.klm.card2Title}</p>
              <p className="text-xs text-zinc-600 mt-2 leading-relaxed text-pretty">
                {t.klm.card2Desc}
              </p>
            </div>
            <div className="border border-zinc-200 rounded-xl p-6 bg-white shadow-2xs">
              <p className="text-2xl font-medium text-[#111111] tabular-nums">{t.klm.card3Val}</p>
              <p className="text-sm font-medium text-zinc-800 mt-2 text-balance">{t.klm.card3Title}</p>
              <p className="text-xs text-zinc-600 mt-2 leading-relaxed text-pretty">
                {t.klm.card3Desc}
              </p>
            </div>
          </div>

          {/* Measurement Changed the Design Callout */}
          <div className="border border-zinc-200 bg-zinc-50/80 p-5 rounded-xl mb-8">
            <p className="text-xs uppercase tracking-wider text-emerald-800 font-semibold mb-1">
              {t.klm.calloutTag}
            </p>
            <p className="text-sm text-zinc-700 leading-relaxed text-pretty">
              {t.klm.calloutText}
            </p>
          </div>

          {/* Mobile Scroll Hint */}
          <div className="sm:hidden flex items-center justify-between text-xs text-zinc-500 mb-2 px-1">
            <span className="flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
              </svg>
              {language === 'pl' ? 'Przesuń tabelę w poziomie' : 'Scroll table horizontally'}
            </span>
            <span className="text-zinc-400">{language === 'pl' ? '3 zadania' : '3 tasks'}</span>
          </div>

          {/* Full KLM Comparative Table with Horizontal Scroll */}
          <div className="relative overflow-x-auto rounded-xl border border-zinc-200 bg-white shadow-2xs">
            <table className="w-full text-left text-sm border-collapse min-w-[620px]">
              <thead>
                <tr className="border-b border-zinc-200 bg-zinc-50 text-xs uppercase tracking-wider text-zinc-500 font-semibold">
                  <th scope="col" className="py-3.5 px-4 font-semibold">{t.klm.tableHeaders.task}</th>
                  <th scope="col" className="py-3.5 px-4 font-semibold text-right">{t.klm.tableHeaders.audited}</th>
                  <th scope="col" className="py-3.5 px-4 font-semibold text-right">{t.klm.tableHeaders.portfolioDesk}</th>
                  <th scope="col" className="py-3.5 px-4 font-semibold text-right">{t.klm.tableHeaders.saved}</th>
                  <th scope="col" className="py-3.5 px-4 font-semibold">{t.klm.tableHeaders.mechanism}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 text-zinc-700">
                {t.klm.rows.map((row) => (
                  <tr key={row.task} className="hover:bg-zinc-50/50 transition-colors">
                    <td className="py-3.5 px-4 font-medium text-[#111111]">{row.task}</td>
                    <td className="py-3.5 px-4 text-right tabular-nums text-zinc-600">{row.audited}</td>
                    <td className="py-3.5 px-4 text-right tabular-nums font-medium text-emerald-700">{row.after}</td>
                    <td className="py-3.5 px-4 text-right tabular-nums font-semibold text-emerald-700">{row.saved}</td>
                    <td className="py-3.5 px-4 text-xs text-zinc-600">{row.mechanism}</td>
                  </tr>
                ))}
                <tr className="bg-zinc-50/70 font-medium text-[#111111] border-t-2 border-zinc-200">
                  <td className="py-4 px-4 font-semibold">{t.klm.total.task}</td>
                  <td className="py-4 px-4 text-right tabular-nums">{t.klm.total.audited}</td>
                  <td className="py-4 px-4 text-right tabular-nums font-semibold text-emerald-700">{t.klm.total.after}</td>
                  <td className="py-4 px-4 text-right tabular-nums font-bold text-emerald-700">{t.klm.total.saved}</td>
                  <td className="py-4 px-4 text-xs font-normal text-zinc-600">{t.klm.total.mechanism}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Design System & Identity: Exact Mirror of Prototype /system */}
      <section id="design-system" className="py-14 md:py-20 border-t border-zinc-100 scroll-mt-20">
        <div className="site-container flex flex-col gap-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-wider font-semibold text-zinc-500 mb-1">
                {t.designSystem.tag}
              </p>
              <h2 className="text-2xl font-medium text-[#111111]">
                {t.designSystem.title}
              </h2>
              <p className="text-sm text-zinc-600 mt-2 max-measure text-pretty leading-relaxed">
                {t.designSystem.desc}
              </p>
            </div>
            <a
              href="https://semi-secure-43576547.figma.site/#/system"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-zinc-900 text-white hover:bg-zinc-800 transition-colors shrink-0 shadow-2xs focus:outline-none focus-visible:ring-2 focus-visible:ring-[#111111]"
            >
              {t.designSystem.openPrototype}
            </a>
          </div>

          {/* System Docs Workbench Frame */}
          <div
            className={`border rounded-2xl shadow-md overflow-hidden transition-colors duration-300 ${
              isDark ? 'bg-[#161616] border-zinc-800 text-[#f4f4f4]' : 'bg-white border-zinc-200 text-[#111111]'
            }`}
          >
            {/* System Docs Top Bar */}
            <header
              className={`h-12 flex items-center justify-between gap-4 px-4 sm:px-6 border-b transition-colors duration-300 ${
                isDark ? 'bg-[#262626] border-zinc-800 text-white' : 'bg-zinc-50/90 border-zinc-200 text-zinc-900'
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  style={{ width: 24, height: 24, fontSize: 10, letterSpacing: '-0.04em' }}
                  className="inline-flex items-center justify-center bg-[#0f62fe] text-white font-semibold rounded-none shrink-0 select-none leading-none"
                >
                  PD
                </div>
                <span className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-zinc-900'}`}>
                  Portfolio Desk
                </span>
                <span className={`w-px h-4 ${isDark ? 'bg-zinc-700' : 'bg-zinc-300'} hidden sm:inline`} />
                <span className={`text-xs ${isDark ? 'text-zinc-400' : 'text-zinc-500'} hidden sm:inline`}>
                  {language === 'pl' ? 'System projektowania i tożsamość' : 'Design system & identity'}
                </span>
              </div>

              <div className="flex items-center gap-3">
                {/* Theme Selector */}
                <div className={`flex items-center gap-1 p-1 rounded-lg ${isDark ? 'bg-zinc-900 border border-zinc-700' : 'bg-zinc-200/70'}`}>
                  <button
                    onClick={() => setSystemTheme('light')}
                    className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                      !isDark
                        ? 'bg-white text-zinc-900 shadow-2xs font-semibold'
                        : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    {language === 'pl' ? 'Jasny' : 'Light'}
                  </button>
                  <button
                    onClick={() => setSystemTheme('dark')}
                    className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                      isDark
                        ? 'bg-[#0f62fe] text-white shadow-2xs font-semibold'
                        : 'text-zinc-600 hover:text-zinc-900'
                    }`}
                  >
                    {language === 'pl' ? 'Ciemny' : 'Dark'}
                  </button>
                </div>

                <a
                  href="https://semi-secure-43576547.figma.site/#/system"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-xs font-medium underline underline-offset-2 hidden sm:inline ${
                    isDark ? 'text-zinc-400 hover:text-white' : 'text-zinc-600 hover:text-zinc-900'
                  }`}
                >
                  {language === 'pl' ? 'Prototyp ↗' : 'Prototype ↗'}
                </a>
              </div>
            </header>

            {/* System Docs Main Nav */}
            <div
              className={`border-b px-4 sm:px-6 py-2.5 flex items-center gap-2 overflow-x-auto no-scrollbar transition-colors duration-300 ${
                isDark ? 'bg-[#1f1f1f] border-zinc-800' : 'bg-zinc-100/60 border-zinc-200'
              }`}
            >
              <span className={`text-[11px] font-semibold uppercase tracking-wider mr-2 shrink-0 hidden sm:inline ${isDark ? 'text-zinc-500' : 'text-zinc-400'}`}>
                {language === 'pl' ? 'Widok' : 'View'}
              </span>
              <button
                onClick={() => setSystemTab('foundations')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer shrink-0 ${
                  systemTab === 'foundations'
                    ? (isDark ? 'bg-[#0f62fe] text-white shadow-2xs' : 'bg-zinc-900 text-white shadow-2xs')
                    : (isDark ? 'bg-transparent text-zinc-400 hover:text-white hover:bg-zinc-800' : 'bg-transparent text-zinc-600 hover:text-zinc-900 hover:bg-zinc-200/60')
                }`}
              >
                {t.designSystem.foundationsTab}
              </button>
              <button
                onClick={() => setSystemTab('components')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer shrink-0 ${
                  systemTab === 'components'
                    ? (isDark ? 'bg-[#0f62fe] text-white shadow-2xs' : 'bg-zinc-900 text-white shadow-2xs')
                    : (isDark ? 'bg-transparent text-zinc-400 hover:text-white hover:bg-zinc-800' : 'bg-transparent text-zinc-600 hover:text-zinc-900 hover:bg-zinc-200/60')
                }`}
              >
                {t.designSystem.componentsTab}
              </button>
              <button
                onClick={() => setSystemTab('identity')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer shrink-0 ${
                  systemTab === 'identity'
                    ? (isDark ? 'bg-[#0f62fe] text-white shadow-2xs' : 'bg-zinc-900 text-white shadow-2xs')
                    : (isDark ? 'bg-transparent text-zinc-400 hover:text-white hover:bg-zinc-800' : 'bg-transparent text-zinc-600 hover:text-zinc-900 hover:bg-zinc-200/60')
                }`}
              >
                {t.designSystem.identityTab}
              </button>
            </div>

            {/* TAB 1: FOUNDATIONS */}
            {systemTab === 'foundations' && (
              <div className="p-6 md:p-8 flex flex-col gap-10">
                {/* Intro subtitle */}
                <div>
                  <h3 className={`text-base font-semibold ${isDark ? 'text-white' : 'text-[#111111]'}`}>
                    {t.designSystem.foundationsTitle}
                  </h3>
                  <p className={`text-xs mt-1 max-measure text-pretty ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
                    {t.designSystem.foundationsDesc}{' '}
                    <strong className={isDark ? 'text-[#a8c7fa]' : 'text-zinc-900'}>
                      {isDark
                        ? (language === 'pl' ? 'Tryb ciemny (g100)' : 'Dark Mode (g100)')
                        : (language === 'pl' ? 'Tryb jasny (g10)' : 'Light Mode (g10)')}
                    </strong>.
                  </p>
                </div>

                {/* Section 1: Color in both modes */}
                <section>
                  <h4 className={`text-xs uppercase tracking-wider font-semibold mb-3 ${isDark ? 'text-zinc-400' : 'text-zinc-500'}`}>
                    Color: both modes (currently previewing: {isDark ? 'Dark' : 'Light'})
                  </h4>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Light Theme Box */}
                    <div
                      className={`p-5 rounded-xl border transition-all duration-300 ${
                        !isDark
                          ? 'bg-[#f4f4f4] border-[#0f62fe] ring-2 ring-[#0f62fe]/25 shadow-sm text-zinc-900'
                          : 'bg-zinc-900/40 border-zinc-800 text-zinc-400 opacity-60 hover:opacity-100'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-xs uppercase tracking-wider font-semibold">
                          Light Theme (g10 / White)
                        </span>
                        {!isDark && (
                          <span className="text-[10px] font-semibold uppercase tracking-wider bg-[#0f62fe] text-white px-2 py-0.5 rounded">
                            Active
                          </span>
                        )}
                      </div>
                      <div className="flex flex-col gap-5">
                        <div>
                          <span className="text-xs font-medium block mb-2 opacity-90">Core Surfaces &amp; Primary</span>
                          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
                            {[
                              { name: 'Board', val: '#f4f4f4', token: '--board' },
                              { name: 'Canvas', val: '#ffffff', token: '--surface-canvas' },
                              { name: 'Surface 1', val: '#f4f4f4', token: '--surface-1' },
                              { name: 'Surface 2', val: '#e8e8e8', token: '--surface-2' },
                              { name: 'Primary', val: '#0f62fe', token: '--color-primary' },
                            ].map((item) => (
                              <div key={item.token} className="flex flex-col gap-1.5">
                                <div
                                  className="h-12 rounded border border-zinc-300/80 shadow-2xs"
                                  style={{ backgroundColor: item.val }}
                                />
                                <span className="text-xs font-medium">{item.name}</span>
                                <code className="text-[10px] font-mono opacity-70">{item.token}</code>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div>
                          <span className="text-xs font-medium block mb-2 opacity-90">DPD Ramp (Aging Buckets)</span>
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                            {[
                              { name: '1-30', val: '#525252', token: '--bar-1' },
                              { name: '31-60', val: '#684e00', token: '--bar-2' },
                              { name: '61-90', val: '#b81922', token: '--bar-3' },
                              { name: '90+', val: '#da1e28', token: '--bar-4' },
                            ].map((item) => (
                              <div key={item.token} className="flex flex-col gap-1.5">
                                <div
                                  className="h-10 rounded border border-zinc-300/80 shadow-2xs"
                                  style={{ backgroundColor: item.val }}
                                />
                                <span className="text-xs font-medium">{item.name}</span>
                                <code className="text-[10px] font-mono opacity-70">{item.token}</code>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div>
                          <span className="text-xs font-medium block mb-2 opacity-90">Support Semantic Colors</span>
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                            {[
                              { name: 'Error', val: '#da1e28', token: '--support-error' },
                              { name: 'Success', val: '#24a148', token: '--support-success' },
                              { name: 'Warning', val: '#f1c21b', token: '--support-warning' },
                              { name: 'Info', val: '#4589ff', token: '--support-info' },
                            ].map((item) => (
                              <div key={item.token} className="flex flex-col gap-1.5">
                                <div
                                  className="h-10 rounded border border-zinc-300/80 shadow-2xs"
                                  style={{ backgroundColor: item.val }}
                                />
                                <span className="text-xs font-medium">{item.name}</span>
                                <code className="text-[10px] font-mono opacity-70">{item.token}</code>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Dark Theme Box */}
                    <div
                      className={`p-5 rounded-xl border transition-all duration-300 ${
                        isDark
                          ? 'bg-[#262626] border-[#0f62fe] ring-2 ring-[#0f62fe]/25 shadow-sm text-white'
                          : 'bg-zinc-900 border-zinc-800 text-zinc-400 opacity-60 hover:opacity-100'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-xs uppercase tracking-wider font-semibold">
                          Dark Theme (g100)
                        </span>
                        {isDark && (
                          <span className="text-[10px] font-semibold uppercase tracking-wider bg-[#0f62fe] text-white px-2 py-0.5 rounded">
                            Active
                          </span>
                        )}
                      </div>
                      <div className="flex flex-col gap-5">
                        <div>
                          <span className="text-xs font-medium block mb-2 opacity-90">Core Surfaces &amp; Primary</span>
                          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
                            {[
                              { name: 'Board', val: '#161616', token: '--board' },
                              { name: 'Canvas', val: '#262626', token: '--surface-canvas' },
                              { name: 'Surface 1', val: '#262626', token: '--surface-1' },
                              { name: 'Surface 2', val: '#393939', token: '--surface-2' },
                              { name: 'Primary', val: '#0f62fe', token: '--color-primary' },
                            ].map((item) => (
                              <div key={item.token} className="flex flex-col gap-1.5">
                                <div
                                  className="h-12 rounded border border-zinc-700 shadow-2xs"
                                  style={{ backgroundColor: item.val }}
                                />
                                <span className="text-xs font-medium">{item.name}</span>
                                <code className="text-[10px] font-mono opacity-70">{item.token}</code>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div>
                          <span className="text-xs font-medium block mb-2 opacity-90">DPD Ramp (Aging Buckets)</span>
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                            {[
                              { name: '1-30', val: '#8d8d8d', token: '--bar-1' },
                              { name: '31-60', val: '#f1c21b', token: '--bar-2' },
                              { name: '61-90', val: '#fa4d56', token: '--bar-3' },
                              { name: '90+', val: '#ff8389', token: '--bar-4' },
                            ].map((item) => (
                              <div key={item.token} className="flex flex-col gap-1.5">
                                <div
                                  className="h-10 rounded border border-zinc-700 shadow-2xs"
                                  style={{ backgroundColor: item.val }}
                                />
                                <span className="text-xs font-medium">{item.name}</span>
                                <code className="text-[10px] font-mono opacity-70">{item.token}</code>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div>
                          <span className="text-xs font-medium block mb-2 opacity-90">Support Semantic Colors</span>
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                            {[
                              { name: 'Error', val: '#ff8389', token: '--support-error' },
                              { name: 'Success', val: '#42be65', token: '--support-success' },
                              { name: 'Warning', val: '#f1c21b', token: '--support-warning' },
                              { name: 'Info', val: '#4589ff', token: '--support-info' },
                            ].map((item) => (
                              <div key={item.token} className="flex flex-col gap-1.5">
                                <div
                                  className="h-10 rounded border border-zinc-700 shadow-2xs"
                                  style={{ backgroundColor: item.val }}
                                />
                                <span className="text-xs font-medium">{item.name}</span>
                                <code className="text-[10px] font-mono opacity-70">{item.token}</code>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Section 2: Typography Ramp */}
                <section>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                    <h4 className={`text-xs uppercase tracking-wider font-semibold ${isDark ? 'text-zinc-400' : 'text-zinc-500'}`}>
                      Typography: Source Sans 3 &amp; Tabular Figures
                    </h4>
                    <span className={`text-xs font-mono ${isDark ? 'text-zinc-400' : 'text-zinc-500'}`}>
                      font-variant-numeric: tabular-nums (tnum)
                    </span>
                  </div>

                  <div
                    className={`border rounded-xl p-5 shadow-2xs flex flex-col divide-y transition-colors duration-300 ${
                      isDark
                        ? 'bg-[#262626] border-zinc-800 divide-zinc-700/60 text-white'
                        : 'bg-white border-zinc-200 divide-zinc-100 text-[#111111]'
                    }`}
                  >
                    {[
                      { token: '--text-2xl', spec: '42 / 300', role: 'KPI and hero numbers', sizeClass: 'text-3xl md:text-4xl font-light' },
                      { token: '--text-xl', spec: '32 / 300', role: 'Screen titles', sizeClass: 'text-2xl font-light' },
                      { token: '--text-lg', spec: '20 / 400', role: 'Section heads', sizeClass: 'text-lg font-normal' },
                      { token: '--text-md', spec: '16 / 400', role: 'Body and emphasis', sizeClass: 'text-base font-normal' },
                      { token: '--text-base', spec: '14 / 400', role: 'Table data', sizeClass: 'text-sm font-normal' },
                      { token: '--text-sm', spec: '13 / 400', role: 'Helper text', sizeClass: 'text-xs font-normal' },
                      { token: '--text-xs', spec: '12 / 400', role: 'Labels, eyebrows', sizeClass: 'text-[11px] font-normal' },
                    ].map((row) => (
                      <div key={row.token} className="py-3.5 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-6">
                        <span className={`flex-1 ${row.sizeClass} ${isDark ? 'text-white' : 'text-[#111111]'}`}>
                          Portfolio Desk
                        </span>
                        <code className={`text-xs font-mono sm:w-28 shrink-0 ${isDark ? 'text-zinc-400' : 'text-zinc-500'}`}>
                          {row.token}
                        </code>
                        <span className={`text-xs font-mono tabular-nums sm:w-20 shrink-0 ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
                          {row.spec}
                        </span>
                        <span className={`text-xs sm:w-44 shrink-0 ${isDark ? 'text-zinc-400' : 'text-zinc-500'}`}>
                          {row.role}
                        </span>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Section 3: Spacing 4px grid */}
                <section>
                  <h4 className={`text-xs uppercase tracking-wider font-semibold mb-3 ${isDark ? 'text-zinc-400' : 'text-zinc-500'}`}>
                    Spacing: 4px grid scale
                  </h4>
                  <div
                    className={`border rounded-xl p-6 shadow-2xs flex gap-6 items-flex-end flex-wrap transition-colors duration-300 ${
                      isDark ? 'bg-[#262626] border-zinc-800' : 'bg-white border-zinc-200'
                    }`}
                  >
                    {[
                      { name: '1', px: 4, token: '--space-1' },
                      { name: '2', px: 8, token: '--space-2' },
                      { name: '3', px: 12, token: '--space-3' },
                      { name: '4', px: 16, token: '--space-4' },
                      { name: '6', px: 24, token: '--space-6' },
                      { name: '8', px: 32, token: '--space-8' },
                      { name: '16', px: 64, token: '--space-16' },
                    ].map((s) => (
                      <div key={s.token} className="flex flex-col items-center gap-2">
                        <div
                          className="bg-[#0f62fe] rounded-none shadow-2xs"
                          style={{ width: s.px, height: s.px }}
                        />
                        <code className={`text-xs font-mono font-semibold ${isDark ? 'text-zinc-300' : 'text-zinc-700'}`}>
                          {s.name}
                        </code>
                        <span className={`text-[10px] font-mono ${isDark ? 'text-zinc-500' : 'text-zinc-400'}`}>
                          {s.px}px
                        </span>
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            )}

            {/* TAB 2: COMPONENTS */}
            {systemTab === 'components' && (
              <div className="p-6 md:p-8 flex flex-col gap-8">
                <div>
                  <h3 className={`text-base font-semibold ${isDark ? 'text-white' : 'text-[#111111]'}`}>
                    Components (in {isDark ? 'Dark Theme' : 'Light Theme'})
                  </h3>
                  <p className={`text-xs mt-1 max-measure text-pretty ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
                    Interactive enterprise components designed for high-density loan operations. Toggle Light/Dark at the top to inspect theme parity.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Button variants & states */}
                  <div
                    className={`border rounded-xl p-5 shadow-2xs flex flex-col gap-4 transition-colors duration-300 ${
                      isDark ? 'bg-[#262626] border-zinc-800 text-white' : 'bg-white border-zinc-200 text-zinc-900'
                    }`}
                  >
                    <h4 className={`text-xs uppercase tracking-wider font-semibold ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
                      Button: variants and states
                    </h4>
                    <div className="flex flex-col gap-3 text-xs">
                      <div className="flex items-center gap-4 flex-wrap">
                        <span className={`w-24 shrink-0 ${isDark ? 'text-zinc-400' : 'text-zinc-500'}`}>Primary</span>
                        <div className="flex items-center gap-2 flex-wrap">
                          <button className="px-3.5 py-1.5 bg-[#0f62fe] text-white text-xs font-medium rounded-none hover:bg-[#0353e9] transition-colors cursor-pointer">
                            Log action
                          </button>
                          <button className="px-2.5 py-1 bg-[#0f62fe] text-white text-[11px] font-medium rounded-none hover:bg-[#0353e9] transition-colors cursor-pointer">
                            Small
                          </button>
                          <button
                            disabled
                            className={`px-3.5 py-1.5 text-xs font-medium rounded-none cursor-not-allowed ${
                              isDark ? 'bg-zinc-800 text-zinc-600' : 'bg-zinc-200 text-zinc-400'
                            }`}
                          >
                            Disabled
                          </button>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 flex-wrap">
                        <span className={`w-24 shrink-0 ${isDark ? 'text-zinc-400' : 'text-zinc-500'}`}>Tertiary</span>
                        <div className="flex items-center gap-2 flex-wrap">
                          <button
                            className={`px-3 py-1.5 border text-xs font-medium rounded-none transition-colors cursor-pointer ${
                              isDark
                                ? 'border-zinc-700 text-zinc-200 hover:bg-zinc-800'
                                : 'border-zinc-300 text-zinc-800 hover:bg-zinc-50'
                            }`}
                          >
                            Export
                          </button>
                          <button
                            className={`px-2.5 py-1 border text-[11px] font-medium rounded-none transition-colors cursor-pointer ${
                              isDark
                                ? 'border-zinc-700 text-zinc-200 hover:bg-zinc-800'
                                : 'border-zinc-300 text-zinc-800 hover:bg-zinc-50'
                            }`}
                          >
                            Save view
                          </button>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 flex-wrap">
                        <span className={`w-24 shrink-0 ${isDark ? 'text-zinc-400' : 'text-zinc-500'}`}>Ghost / Danger</span>
                        <div className="flex items-center gap-2 flex-wrap">
                          <button
                            className={`px-3 py-1.5 text-xs font-medium rounded-none transition-colors cursor-pointer ${
                              isDark
                                ? 'text-[#a8c7fa] hover:bg-zinc-800'
                                : 'text-[#0f62fe] hover:bg-blue-50'
                            }`}
                          >
                            Open
                          </button>
                          <button className="px-3.5 py-1.5 bg-[#da1e28] text-white text-xs font-medium rounded-none hover:bg-[#b81922] transition-colors cursor-pointer">
                            Escalate
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Badge: status & DPD */}
                  <div
                    className={`border rounded-xl p-5 shadow-2xs flex flex-col gap-4 transition-colors duration-300 ${
                      isDark ? 'bg-[#262626] border-zinc-800 text-white' : 'bg-white border-zinc-200 text-zinc-900'
                    }`}
                  >
                    <h4 className={`text-xs uppercase tracking-wider font-semibold ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
                      Badge: status and DPD
                    </h4>
                    <div className="flex flex-col gap-3 text-xs">
                      <div className="flex items-center gap-4 flex-wrap">
                        <span className={`w-20 shrink-0 ${isDark ? 'text-zinc-400' : 'text-zinc-500'}`}>Status</span>
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span
                            className={`px-2 py-0.5 rounded text-[11px] font-semibold ${
                              isDark
                                ? 'bg-[#2c1013] text-[#ff8389] border border-[#ff8389]/30'
                                : 'bg-red-100 text-red-800 border border-red-200'
                            }`}
                          >
                            Overdue
                          </span>
                          <span
                            className={`px-2 py-0.5 rounded text-[11px] font-semibold ${
                              isDark
                                ? 'bg-[#302400] text-[#f1c21b] border border-[#f1c21b]/30'
                                : 'bg-amber-100 text-amber-900 border border-amber-200'
                            }`}
                          >
                            Watch
                          </span>
                          <span
                            className={`px-2 py-0.5 rounded text-[11px] font-semibold ${
                              isDark
                                ? 'bg-[#122917] text-[#42be65] border border-[#42be65]/30'
                                : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                            }`}
                          >
                            Paid
                          </span>
                          <span
                            className={`px-2 py-0.5 rounded text-[11px] font-semibold ${
                              isDark
                                ? 'bg-[#16243f] text-[#4589ff] border border-[#4589ff]/30'
                                : 'bg-blue-100 text-blue-800 border border-blue-200'
                            }`}
                          >
                            New
                          </span>
                          <span
                            className={`px-2 py-0.5 rounded text-[11px] font-semibold ${
                              isDark
                                ? 'bg-zinc-800 text-zinc-300 border border-zinc-700'
                                : 'bg-zinc-100 text-zinc-700 border border-zinc-200'
                            }`}
                          >
                            Quiet
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 flex-wrap">
                        <span className={`w-20 shrink-0 ${isDark ? 'text-zinc-400' : 'text-zinc-500'}`}>DPD Tiers</span>
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span
                            className={`px-2 py-0.5 rounded text-[11px] font-mono font-semibold ${
                              isDark ? 'bg-zinc-800 text-zinc-300 border border-zinc-700' : 'bg-zinc-200 text-zinc-800'
                            }`}
                          >
                            1-30
                          </span>
                          <span
                            className={`px-2 py-0.5 rounded text-[11px] font-mono font-semibold ${
                              isDark ? 'bg-[#302400] text-[#f1c21b] border border-[#f1c21b]/30' : 'bg-amber-200 text-amber-950'
                            }`}
                          >
                            31-60
                          </span>
                          <span
                            className={`px-2 py-0.5 rounded text-[11px] font-mono font-semibold ${
                              isDark ? 'bg-[#fa4d56]/20 text-[#fa4d56] border border-[#fa4d56]/40' : 'bg-rose-200 text-rose-900'
                            }`}
                          >
                            61-90
                          </span>
                          <span
                            className={`px-2 py-0.5 rounded text-[11px] font-mono font-semibold ${
                              isDark ? 'bg-[#ff8389]/25 text-[#ff8389] border border-[#ff8389]/40' : 'bg-red-200 text-red-950'
                            }`}
                          >
                            90+
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Tile: KPI */}
                  <div
                    className={`border rounded-xl p-5 shadow-2xs flex flex-col gap-3 transition-colors duration-300 ${
                      isDark ? 'bg-[#262626] border-zinc-800 text-white' : 'bg-white border-zinc-200 text-zinc-900'
                    }`}
                  >
                    <h4 className={`text-xs uppercase tracking-wider font-semibold ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
                      Tile: KPI Metrics
                    </h4>
                    <div className={`grid grid-cols-2 gap-px rounded-lg overflow-hidden border ${isDark ? 'bg-zinc-800 border-zinc-700' : 'bg-zinc-200 border-zinc-200'}`}>
                      <div className={`p-4 flex flex-col gap-1 ${isDark ? 'bg-[#1e1e1e]' : 'bg-white'}`}>
                        <span className={`text-xs ${isDark ? 'text-zinc-400' : 'text-zinc-500'}`}>Portfolio</span>
                        <div className="flex items-baseline gap-1.5">
                          <span className={`text-2xl font-light tabular-nums ${isDark ? 'text-white' : 'text-zinc-900'}`}>
                            568.7
                          </span>
                          <span className={`text-xs font-semibold ${isDark ? 'text-zinc-300' : 'text-zinc-600'}`}>
                            M PLN
                          </span>
                        </div>
                        <span className={`text-[11px] ${isDark ? 'text-zinc-500' : 'text-zinc-400'}`}>500 loans</span>
                      </div>
                      <div className={`p-4 flex flex-col gap-1 ${isDark ? 'bg-[#1e1e1e]' : 'bg-white'}`}>
                        <span className={`text-xs ${isDark ? 'text-zinc-400' : 'text-zinc-500'}`}>Actions due</span>
                        <div className="flex items-baseline gap-1.5">
                          <span className={`text-2xl font-light tabular-nums ${isDark ? 'text-white' : 'text-zinc-900'}`}>
                            12
                          </span>
                          <span className={`text-xs font-semibold ${isDark ? 'text-zinc-300' : 'text-zinc-600'}`}>
                            today
                          </span>
                        </div>
                        <span
                          className={`inline-block mt-0.5 text-[10px] font-semibold px-1.5 py-0.5 rounded border self-start ${
                            isDark
                              ? 'bg-[#2c1013] text-[#ff8389] border-[#ff8389]/30'
                              : 'bg-red-50 text-red-700 border-red-200'
                          }`}
                        >
                          4 overdue
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Bar: magnitude on track */}
                  <div
                    className={`border rounded-xl p-5 shadow-2xs flex flex-col gap-3 transition-colors duration-300 ${
                      isDark ? 'bg-[#262626] border-zinc-800 text-white' : 'bg-white border-zinc-200 text-zinc-900'
                    }`}
                  >
                    <h4 className={`text-xs uppercase tracking-wider font-semibold ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
                      Bar: magnitude on track
                    </h4>
                    <div className="flex flex-col gap-4 text-xs">
                      <div>
                        <div className={`flex justify-between mb-1 font-medium ${isDark ? 'text-zinc-300' : 'text-zinc-600'}`}>
                          <span>Volume Count</span>
                          <span className="font-mono tabular-nums">70%</span>
                        </div>
                        <div className={`w-full h-2 rounded-none overflow-hidden ${isDark ? 'bg-zinc-800' : 'bg-zinc-200'}`}>
                          <div className={`h-full w-[70%] ${isDark ? 'bg-[#8d8d8d]' : 'bg-[#525252]'}`} />
                        </div>
                      </div>
                      <div>
                        <div className={`flex justify-between mb-1 font-medium ${isDark ? 'text-zinc-300' : 'text-zinc-600'}`}>
                          <span>Arrears Exposure</span>
                          <span className={`font-mono tabular-nums ${isDark ? 'text-[#ff8389]' : 'text-red-700'}`}>90%</span>
                        </div>
                        <div className={`w-full h-2 rounded-none overflow-hidden ${isDark ? 'bg-zinc-800' : 'bg-zinc-200'}`}>
                          <div className={`h-full w-[90%] ${isDark ? 'bg-[#ff8389]' : 'bg-[#da1e28]'}`} />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Tabs Component */}
                  <div
                    className={`border rounded-xl p-5 shadow-2xs flex flex-col gap-3 transition-colors duration-300 ${
                      isDark ? 'bg-[#262626] border-zinc-800 text-white' : 'bg-white border-zinc-200 text-zinc-900'
                    }`}
                  >
                    <h4 className={`text-xs uppercase tracking-wider font-semibold ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
                      Tabs Navigation
                    </h4>
                    <div className={`border-b flex items-center gap-4 ${isDark ? 'border-zinc-800' : 'border-zinc-200'}`}>
                      {['Status', 'Repayment history', 'Documents'].map((tabName, idx) => (
                        <button
                          key={tabName}
                          onClick={() => setSystemTabDemoIndex(idx)}
                          className={`pb-2.5 text-xs font-medium transition-colors cursor-pointer border-b-2 ${
                            systemTabDemoIndex === idx
                              ? (isDark ? 'border-[#4589ff] text-[#4589ff] font-semibold' : 'border-[#0f62fe] text-[#0f62fe] font-semibold')
                              : (isDark ? 'border-transparent text-zinc-400 hover:text-white' : 'border-transparent text-zinc-500 hover:text-zinc-900')
                          }`}
                        >
                          {tabName}
                        </button>
                      ))}
                    </div>
                    <p className={`text-xs mt-1 ${isDark ? 'text-zinc-400' : 'text-zinc-500'}`}>
                      Active: {['Status summary and DPD status', 'Consolidated repayment ledger', 'Contract legal attachments'][systemTabDemoIndex]}
                    </p>
                  </div>

                  {/* Filter tags & Error state */}
                  <div
                    className={`border rounded-xl p-5 shadow-2xs flex flex-col gap-3 transition-colors duration-300 ${
                      isDark ? 'bg-[#262626] border-zinc-800 text-white' : 'bg-white border-zinc-200 text-zinc-900'
                    }`}
                  >
                    <h4 className={`text-xs uppercase tracking-wider font-semibold ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
                      Filter tags &amp; Error alert
                    </h4>
                    <div className="flex flex-wrap gap-2 mb-2">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-none border ${
                          isDark ? 'bg-zinc-800 text-zinc-200 border-zinc-700' : 'bg-zinc-100 text-zinc-800 border-zinc-200'
                        }`}
                      >
                        Over 30 days
                        <span className={`${isDark ? 'text-zinc-400 hover:text-white' : 'text-zinc-400 hover:text-zinc-700'} cursor-pointer`}>✕</span>
                      </span>
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-none border ${
                          isDark ? 'bg-zinc-800 text-zinc-200 border-zinc-700' : 'bg-zinc-100 text-zinc-800 border-zinc-200'
                        }`}
                      >
                        Product: Term loan
                        <span className={`${isDark ? 'text-zinc-400 hover:text-white' : 'text-zinc-400 hover:text-zinc-700'} cursor-pointer`}>✕</span>
                      </span>
                    </div>
                    <div
                      className={`p-3 rounded-md text-xs flex flex-col gap-0.5 border ${
                        isDark
                          ? 'bg-[#2c1013] border-[#ff8389]/40 text-[#ff8389]'
                          : 'bg-rose-50 border-rose-200 text-rose-900'
                      }`}
                    >
                      <span className="font-semibold">Could not load the loan list</span>
                      <span className={isDark ? 'text-rose-300' : 'text-rose-700'}>The request timed out. Nothing was changed.</span>
                    </div>
                  </div>
                </div>

                {/* Interactive Sortable Data Table */}
                <div
                  className={`border rounded-xl shadow-2xs overflow-hidden transition-colors duration-300 ${
                    isDark ? 'bg-[#1e1e1e] border-zinc-800' : 'bg-white border-zinc-200'
                  }`}
                >
                  <div
                    className={`p-4 border-b flex flex-col sm:flex-row sm:items-center justify-between gap-2 ${
                      isDark ? 'bg-[#262626] border-zinc-800 text-white' : 'bg-zinc-50 border-zinc-200 text-zinc-900'
                    }`}
                  >
                    <div>
                      <h4 className={`text-xs uppercase tracking-wider font-semibold ${isDark ? 'text-zinc-300' : 'text-zinc-600'}`}>
                        Table: sortable header, clickable row
                      </h4>
                      <p className={`text-xs mt-0.5 ${isDark ? 'text-zinc-400' : 'text-zinc-500'}`}>
                        Click column headers to sort loans dynamically.
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => setIsTabularDemo(!isTabularDemo)}
                        className={`px-2.5 py-1 text-[11px] font-mono rounded border transition-colors cursor-pointer shadow-2xs ${
                          isDark
                            ? (isTabularDemo ? 'bg-[#0f62fe] text-white border-[#0f62fe]' : 'bg-zinc-800 text-zinc-300 border-zinc-700 hover:bg-zinc-700')
                            : (isTabularDemo ? 'bg-zinc-900 text-white border-zinc-900' : 'bg-white text-zinc-700 border-zinc-300 hover:bg-zinc-50')
                        }`}
                      >
                        {isTabularDemo ? 'tnum: On' : 'tnum: Off'}
                      </button>
                      <span className={`text-xs font-mono ${isDark ? 'text-zinc-400' : 'text-zinc-500'}`}>
                        Sorted by: {systemSortCol.toUpperCase()} ({systemSortAsc ? 'Asc' : 'Desc'})
                      </span>
                    </div>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs border-collapse min-w-[580px]">
                      <thead>
                        <tr
                          className={`border-b uppercase tracking-wider font-semibold ${
                            isDark ? 'border-zinc-800 bg-[#262626] text-zinc-400' : 'border-zinc-200 bg-zinc-50/70 text-zinc-500'
                          }`}
                        >
                          <th className="py-3 px-4 font-semibold">Borrower</th>
                          <th
                            onClick={() => {
                              if (systemSortCol === 'dpd') setSystemSortAsc(!systemSortAsc)
                              else { setSystemSortCol('dpd'); setSystemSortAsc(false); }
                            }}
                            className={`py-3 px-4 text-right font-semibold cursor-pointer select-none ${
                              isDark ? 'hover:text-white' : 'hover:text-zinc-900'
                            }`}
                          >
                            DPD {systemSortCol === 'dpd' ? (systemSortAsc ? '↑' : '↓') : '↕'}
                          </th>
                          <th
                            onClick={() => {
                              if (systemSortCol === 'arrears') setSystemSortAsc(!systemSortAsc)
                              else { setSystemSortCol('arrears'); setSystemSortAsc(false); }
                            }}
                            className={`py-3 px-4 text-right font-semibold cursor-pointer select-none ${
                              isDark ? 'hover:text-white' : 'hover:text-zinc-900'
                            }`}
                          >
                            In arrears {systemSortCol === 'arrears' ? (systemSortAsc ? '↑' : '↓') : '↕'}
                          </th>
                          <th className="py-3 px-4 font-semibold">State</th>
                        </tr>
                      </thead>
                      <tbody className={`divide-y ${isDark ? 'divide-zinc-800 text-zinc-200' : 'divide-zinc-100 text-zinc-700'}`}>
                        {[
                          { borrower: 'Baltic Foods sp. z o.o.', dpd: 94, arrears: 640500, state: 'Delinquent', tone: 'dpd4' },
                          { borrower: 'Hurtownia Lewandowski', dpd: 34, arrears: 141200, state: 'Delinquent', tone: 'dpd2' },
                          { borrower: 'Transport Mazur sp. k.', dpd: 12, arrears: 48200, state: 'Watch', tone: 'dpd1' },
                          { borrower: 'KrakChem Hurtownia', dpd: 6, arrears: 18500, state: 'Watch', tone: 'dpd1' },
                          { borrower: 'Nova Retail Polska', dpd: 78, arrears: 312000, state: 'Delinquent', tone: 'dpd3' },
                        ]
                          .sort((a, b) => {
                            const valA = a[systemSortCol]
                            const valB = b[systemSortCol]
                            return systemSortAsc ? valA - valB : valB - valA
                          })
                          .map((row) => (
                            <tr
                              key={row.borrower}
                              className={`transition-colors cursor-pointer ${
                                isDark ? 'hover:bg-zinc-800/60' : 'hover:bg-zinc-50/70'
                              }`}
                            >
                              <td className={`py-3 px-4 font-semibold ${isDark ? 'text-white' : 'text-zinc-900'}`}>
                                {row.borrower}
                              </td>
                              <td className={`py-3 px-4 text-right font-mono ${isTabularDemo ? 'tabular-nums' : 'proportional-nums'} font-semibold ${isDark ? 'text-white' : 'text-zinc-900'}`}>
                                {row.dpd}
                              </td>
                              <td className={`py-3 px-4 text-right font-mono ${isTabularDemo ? 'tabular-nums' : 'proportional-nums'} ${isDark ? 'text-zinc-300' : 'text-zinc-700'}`}>
                                {row.arrears.toLocaleString('pl-PL')} PLN
                              </td>
                              <td className="py-3 px-4">
                                <span
                                  className={`inline-block px-2 py-0.5 rounded text-[11px] font-semibold ${
                                    row.tone === 'dpd4'
                                      ? (isDark ? 'bg-[#2c1013] text-[#ff8389] border border-[#ff8389]/30' : 'bg-red-100 text-red-900 border border-red-200')
                                      : row.tone === 'dpd3'
                                      ? (isDark ? 'bg-[#fa4d56]/20 text-[#fa4d56] border border-[#fa4d56]/40' : 'bg-orange-100 text-orange-900 border border-orange-200')
                                      : row.tone === 'dpd2'
                                      ? (isDark ? 'bg-[#302400] text-[#f1c21b] border border-[#f1c21b]/30' : 'bg-amber-100 text-amber-900 border border-amber-200')
                                      : (isDark ? 'bg-zinc-800 text-zinc-300 border border-zinc-700' : 'bg-blue-100 text-blue-900 border border-blue-200')
                                  }`}
                                >
                                  {row.state}
                                </span>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: IDENTITY (THE PD MARK) */}
            {systemTab === 'identity' && (
              <div className="p-6 md:p-8 flex flex-col gap-8">
                <div>
                  <h3 className={`text-base font-semibold ${isDark ? 'text-white' : 'text-[#111111]'}`}>
                    The PD mark
                  </h3>
                  <p className={`text-xs mt-1 max-measure text-pretty ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
                    A blue square, tight PD, Source Sans 3 semibold. Flat corners, one accent.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {/* Primary lockup */}
                  <div
                    className={`p-5 rounded-xl shadow-2xs flex flex-col justify-between gap-4 border transition-colors duration-300 ${
                      isDark ? 'bg-[#262626] border-zinc-800 text-white' : 'bg-white border-zinc-200 text-zinc-900'
                    }`}
                  >
                    <span className={`text-xs uppercase tracking-wider font-semibold ${isDark ? 'text-zinc-400' : 'text-zinc-500'}`}>
                      Primary lockup
                    </span>
                    <div className="flex items-center gap-3 py-4">
                      <div
                        style={{ width: 48, height: 48, fontSize: 20, letterSpacing: '-0.02em' }}
                        className="inline-flex items-center justify-center bg-[#0f62fe] text-white font-semibold rounded-none shrink-0 select-none leading-none shadow-2xs"
                      >
                        PD
                      </div>
                      <span className={`text-lg font-semibold tracking-tight ${isDark ? 'text-white' : 'text-zinc-900'}`}>
                        Portfolio Desk
                      </span>
                    </div>
                    <span className={`text-[11px] ${isDark ? 'text-zinc-500' : 'text-zinc-400'}`}>
                      Header lockup on enterprise desktops
                    </span>
                  </div>

                  {/* Scale sizes */}
                  <div
                    className={`p-5 rounded-xl shadow-2xs flex flex-col justify-between gap-4 border transition-colors duration-300 ${
                      isDark ? 'bg-[#262626] border-zinc-800 text-white' : 'bg-white border-zinc-200 text-zinc-900'
                    }`}
                  >
                    <span className={`text-xs uppercase tracking-wider font-semibold ${isDark ? 'text-zinc-400' : 'text-zinc-500'}`}>
                      {language === 'pl' ? 'Skalowanie znaku' : 'Scale Sizes'}
                    </span>
                    <div className="flex items-flex-end gap-3 py-2">
                      {[48, 32, 24, 16].map((sz) => (
                        <div key={sz} className="flex flex-col items-center gap-1.5">
                          <div
                            style={{
                              width: sz,
                              height: sz,
                              fontSize: sz * 0.42,
                              letterSpacing: sz < 24 ? '-0.04em' : '-0.02em',
                            }}
                            className="inline-flex items-center justify-center bg-[#0f62fe] text-white font-semibold rounded-none shrink-0 select-none leading-none"
                          >
                            PD
                          </div>
                          <span className={`text-[10px] font-mono tabular-nums ${isDark ? 'text-zinc-400' : 'text-zinc-500'}`}>
                            {sz}px
                          </span>
                        </div>
                      ))}
                    </div>
                    <span className={`text-[11px] ${isDark ? 'text-zinc-500' : 'text-zinc-400'}`}>
                      {language === 'pl' ? 'Zachowuje równowagę optyczną od 16 do 48 px' : 'Maintains optical balance from 16 to 48px'}
                    </span>
                  </div>

                  {/* On surfaces */}
                  <div
                    className={`p-5 rounded-xl shadow-2xs flex flex-col justify-between gap-4 border transition-colors duration-300 ${
                      isDark ? 'bg-[#262626] border-zinc-800 text-white' : 'bg-white border-zinc-200 text-zinc-900'
                    }`}
                  >
                    <span className={`text-xs uppercase tracking-wider font-semibold ${isDark ? 'text-zinc-400' : 'text-zinc-500'}`}>
                      {language === 'pl' ? 'Na różnych tłach' : 'On Surfaces'}
                    </span>
                    <div className="flex items-center gap-2 py-3">
                      <div className="p-2.5 bg-white border border-zinc-200 rounded">
                        <div
                          style={{ width: 28, height: 28, fontSize: 12, letterSpacing: '-0.02em' }}
                          className="inline-flex items-center justify-center bg-[#0f62fe] text-white font-semibold rounded-none"
                        >
                          PD
                        </div>
                      </div>
                      <div className="p-2.5 bg-[#f4f4f4] border border-zinc-300 rounded">
                        <div
                          style={{ width: 28, height: 28, fontSize: 12, letterSpacing: '-0.02em' }}
                          className="inline-flex items-center justify-center bg-[#0f62fe] text-white font-semibold rounded-none"
                        >
                          PD
                        </div>
                      </div>
                      <div className="p-2.5 bg-[#161616] border border-zinc-800 rounded">
                        <div
                          style={{ width: 28, height: 28, fontSize: 12, letterSpacing: '-0.02em' }}
                          className="inline-flex items-center justify-center bg-[#0f62fe] text-white font-semibold rounded-none"
                        >
                          PD
                        </div>
                      </div>
                    </div>
                    <span className={`text-[11px] ${isDark ? 'text-zinc-500' : 'text-zinc-400'}`}>
                      {language === 'pl' ? 'Przetestowany na jasnym tle, planszy i ciemnej powierzchni' : 'Tested on light canvas, board & dark surface'}
                    </span>
                  </div>

                  {/* Architectural Rationale */}
                  <div
                    className={`p-5 rounded-xl shadow-2xs flex flex-col justify-between gap-4 border transition-colors duration-300 ${
                      isDark ? 'bg-[#262626] border-zinc-800 text-white' : 'bg-white border-zinc-200 text-zinc-900'
                    }`}
                  >
                    <span className={`text-xs uppercase tracking-wider font-semibold ${isDark ? 'text-zinc-400' : 'text-zinc-500'}`}>
                      {language === 'pl' ? 'Zasady tożsamości' : 'Brand Principles'}
                    </span>
                    <p className={`text-xs leading-relaxed text-pretty ${isDark ? 'text-zinc-300' : 'text-zinc-600'}`}>
                      {language === 'pl'
                        ? 'Proste narożniki (promień 0 px) zachowują spójność architektoniczną z siatką tabeli 4 px. Pojedynczy akcent kolorystyczny (IBM Blue 60) sygnalizuje interakcję bez zakłócania barw oznaczających wagę opóźnień.'
                        : 'Flat corners (0px border-radius) preserve architectural alignment with the 4px table grid. The single accent color (IBM Blue 60) signals interaction without interfering with delinquency severity tones.'}
                    </p>
                    <span className="text-[11px] font-medium text-emerald-500">
                      {language === 'pl' ? 'Kontrast WCAG AA: 4.8:1' : 'WCAG AA Contrast: 4.8:1'}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Screen Showcases */}
      <section id="screens" className="py-12 md:py-16 border-t border-zinc-100 scroll-mt-20">
        <div className="site-container flex flex-col gap-10">
          <div>
            <h2 className="text-lg text-[#111111] font-medium mb-2">{t.screens.title}</h2>
            <p className="text-sm text-zinc-600 mb-6 max-measure text-pretty">
              {t.screens.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <button
                onClick={() => setLightboxIndex(7)}
                className="w-full text-left rounded-xl overflow-hidden border border-zinc-200 bg-zinc-50 shadow-sm aspect-[16/10] cursor-pointer group relative focus:outline-none focus-visible:ring-2 focus-visible:ring-[#111111]"
              >
                <img
                  src="/work/portfolio-desk/overview-light.png"
                  alt="Portfolio Overview Dashboard in IBM Carbon"
                  className="w-full h-full object-cover group-hover:scale-[1.01] transition-transform duration-300"
                  loading="lazy"
                />
                <span className="absolute bottom-2 right-2 text-xs bg-black/70 text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                  {t.screens.inspect}
                </span>
              </button>
              <p className="mt-2 text-xs text-zinc-700 font-medium">{t.screens.overviewTitle}</p>
              <p className="text-xs text-zinc-500">{t.screens.overviewDesc}</p>
            </div>

            <div>
              <button
                onClick={() => setLightboxIndex(6)}
                className="w-full text-left rounded-xl overflow-hidden border border-zinc-200 bg-zinc-50 shadow-sm aspect-[16/10] cursor-pointer group relative focus:outline-none focus-visible:ring-2 focus-visible:ring-[#111111]"
              >
                <img
                  src="/work/portfolio-desk/log-action-light.png"
                  alt="Log Action Drawer with segmented controls"
                  className="w-full h-full object-cover group-hover:scale-[1.01] transition-transform duration-300"
                  loading="lazy"
                />
                <span className="absolute bottom-2 right-2 text-xs bg-black/70 text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                  {t.screens.inspect}
                </span>
              </button>
              <p className="mt-2 text-xs text-zinc-700 font-medium">{t.screens.drawerTitle}</p>
              <p className="text-xs text-zinc-500">{t.screens.drawerDesc}</p>
            </div>
          </div>

          <div>
            <button
              onClick={() => setLightboxIndex(8)}
              className="w-full text-left rounded-xl overflow-hidden border border-zinc-200 bg-zinc-50 shadow-sm aspect-[16/10] cursor-pointer group relative focus:outline-none focus-visible:ring-2 focus-visible:ring-[#111111]"
            >
              <img
                src="/work/portfolio-desk/edge-states-light.png"
                alt="Edge and Error States in Portfolio Desk"
                className="w-full h-full object-cover group-hover:scale-[1.005] transition-transform duration-300"
                loading="lazy"
              />
              <span className="absolute bottom-2 right-2 text-xs bg-black/70 text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                {t.screens.inspect}
              </span>
            </button>
            <p className="mt-2 text-xs text-zinc-700 font-medium">{t.screens.edgeTitle}</p>
            <p className="text-xs text-zinc-500">{t.screens.edgeDesc}</p>
          </div>

          {/* Sign In Flow & Dual Theme Gateway */}
          <div className="border border-zinc-200 rounded-2xl p-6 md:p-8 bg-white shadow-2xs mt-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <p className="text-xs uppercase tracking-wider font-semibold text-zinc-500 mb-1">
                  {t.screens.s0Tag}
                </p>
                <h3 className="text-xl font-medium text-[#111111]">
                  {t.screens.s0Title}
                </h3>
                <p className="text-sm text-zinc-600 mt-1 max-measure text-pretty">
                  {t.screens.s0Desc}
                </p>
              </div>

              {/* Theme Toggle Switch */}
              <div className="flex items-center gap-1 bg-zinc-100 p-1 rounded-lg border border-zinc-200 shrink-0 self-start sm:self-center">
                <button
                  onClick={() => setSignInTheme('light')}
                  className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                    signInTheme === 'light'
                      ? 'bg-white text-[#111111] shadow-2xs'
                      : 'text-zinc-600 hover:text-[#111111]'
                  }`}
                >
                  {t.screens.lightBtn}
                </button>
                <button
                  onClick={() => setSignInTheme('dark')}
                  className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                    signInTheme === 'dark'
                      ? 'bg-zinc-900 text-white shadow-2xs'
                      : 'text-zinc-600 hover:text-[#111111]'
                  }`}
                >
                  {t.screens.darkBtn}
                </button>
              </div>
            </div>

            {/* Screen Container */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              <div className="md:col-span-8">
                <button
                  onClick={() => setLightboxIndex(signInTheme === 'light' ? 9 : 10)}
                  className={`w-full text-left rounded-xl overflow-hidden border shadow-sm aspect-[16/10] cursor-pointer group relative focus:outline-none focus-visible:ring-2 focus-visible:ring-[#111111] transition-all duration-300 ${
                    signInTheme === 'dark' ? 'border-zinc-800 bg-[#161616]' : 'border-zinc-200 bg-zinc-50'
                  }`}
                >
                  <img
                    src={
                      signInTheme === 'light'
                        ? '/work/portfolio-desk/sign-in-light.png'
                        : '/work/portfolio-desk/sign-in-dark.png'
                    }
                    alt={`Portfolio Desk Sign In Screen in ${signInTheme} mode`}
                    className="w-full h-full object-cover group-hover:scale-[1.01] transition-transform duration-300"
                    loading="lazy"
                  />
                  <span className="absolute bottom-2 right-2 text-xs bg-black/75 text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-xs">
                    {language === 'pl'
                      ? `Podgląd w wysokiej rozdzielczości (${signInTheme === 'light' ? 'jasny' : 'ciemny'}) ↗`
                      : `Inspect high-res (${signInTheme}) ↗`}
                  </span>
                </button>
              </div>

              <div className="md:col-span-4 flex flex-col gap-3.5 text-xs text-zinc-600 leading-relaxed">
                <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-200/80">
                  <span className="font-semibold text-zinc-900 block mb-1">{t.screens.note1Title}</span>
                  {t.screens.note1Desc}
                </div>
                <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-200/80">
                  <span className="font-semibold text-zinc-900 block mb-1">{t.screens.note2Title}</span>
                  {t.screens.note2Desc}
                </div>
              </div>
            </div>
          </div>

          {/* Dual Theme Team Portfolio Workstation Mockup */}
          <div className="border border-zinc-200 rounded-2xl p-6 md:p-8 bg-zinc-50 shadow-2xs mt-8">
            <div className="mb-6">
              <p className="text-xs uppercase tracking-wider font-semibold text-zinc-500 mb-1">
                {t.screens.workstationTag}
              </p>
              <h3 className="text-xl font-medium text-[#111111]">
                {t.screens.workstationTitle}
              </h3>
              <p className="text-sm text-zinc-600 mt-1 max-measure text-pretty">
                {t.screens.workstationDesc}
              </p>
            </div>

            <button
              onClick={() => setLightboxIndex(11)}
              className="w-full text-left rounded-xl overflow-hidden border border-zinc-200 bg-white shadow-sm aspect-[16/10] md:aspect-[1.44/1] cursor-pointer group relative focus:outline-none focus-visible:ring-2 focus-visible:ring-[#111111]"
            >
              <img
                src="/work/portfolio-desk/mockup3.webp"
                alt="Portfolio Desk: Dual laptop workstation mockup showing Dark and Light mode team portfolio dashboards"
                width={6000}
                height={4171}
                className="w-full h-full object-cover group-hover:scale-[1.005] transition-transform duration-500"
                loading="lazy"
                decoding="async"
              />
              <span className="absolute bottom-3 right-3 text-xs bg-black/75 text-white px-3 py-1.5 rounded-md opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-xs">
                {t.screens.inspect6k}
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* Methodological Limits */}
      <section id="limits" className="py-12 md:py-16 border-t border-zinc-100 bg-zinc-50/70 rounded-2xl site-container scroll-mt-20 px-6 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <h2 className="md:col-span-3 text-lg text-[#111111] font-medium">{t.limits.title}</h2>
          <div className="md:col-span-9 flex flex-col gap-3 text-sm text-zinc-700 leading-relaxed max-measure text-pretty">
            <p>{t.limits.p1}</p>
            <p>{t.limits.p2}</p>
          </div>
        </div>
      </section>

      {/* Next Project Footer */}
      <section className="py-14 border-t border-zinc-100 mt-12">
        <div className="site-container flex justify-between items-center">
          <span className="text-sm text-zinc-600">{t.nextStudy}</span>
          <button
            onClick={() => {
              navigate('/work/krakow-touristification')
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
            className="text-lg md:text-xl font-medium text-[#111111] hover:text-zinc-600 transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#111111] rounded"
          >
            {t.nextStudyTitle}
          </button>
        </div>
      </section>

      {/* Lightbox Modal for high-res screen inspection */}
      <LightboxModal
        images={deskImages}
        currentIndex={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onSelectIndex={(index) => setLightboxIndex(index)}
      />
    </main>
  )
}

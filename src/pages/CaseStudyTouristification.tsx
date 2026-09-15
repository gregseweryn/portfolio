import React from 'react'
import { AnimatedTitle } from '../components/AnimatedTitle'
import {
  DistrictPhasesHero,
  LikertBarsChart,
  TwoRegistersDotPlot,
  ForestPlotChart,
  TypologyScatterChart,
  ThemeMatrixChart,
  JointDisplayTable,
} from '../components/TouristificationCharts'
import { useLanguage } from '../context/LanguageContext'
import { touristificationContent } from '../i18n'

interface CaseStudyTouristificationProps {
  navigate: (path: string) => void
}

export const CaseStudyTouristification: React.FC<CaseStudyTouristificationProps> = ({ navigate }) => {
  const { language } = useLanguage()
  const t = touristificationContent[language]

  const scrollToSection = (e: React.MouseEvent, id: string) => {
    e.preventDefault()
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <main id="main-content" className="pb-16">
      {/* Title & Metadata Section */}
      <section id="overview" className="pt-8 md:pt-14 pb-6 md:pb-8 scroll-mt-20">
        <div className="site-container">
          <AnimatedTitle
            coloredSegments={[{ text: t.title, color: '#111111' }]}
            className="text-2xl md:text-3xl leading-[1.12] tracking-tight mb-3 font-normal"
          />
          <p className="text-sm md:text-base text-zinc-600 italic mb-8 max-measure text-pretty">
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
                {t.meta.methodsLabel}
              </p>
              <p className="text-sm font-medium text-[#111111]">{t.meta.methodsVal}</p>
            </div>
            <div>
              <p className="text-xs text-zinc-500 font-semibold uppercase tracking-wider mb-1">
                {t.meta.sampleLabel}
              </p>
              <p className="text-sm font-medium text-[#111111]">{t.meta.sampleVal}</p>
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
          <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto no-scrollbar py-0.5 text-xs font-medium">
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
            N = 446 Triangulation
          </span>
        </div>
      </nav>

      {/* Hero Banner: Title Diagram (Three districts, one process) */}
      <section className="py-8 md:py-12">
        <div className="site-container">
          <DistrictPhasesHero />
        </div>
      </section>

      {/* Section 1: The Research Gap */}
      <section id="gap" className="py-12 md:py-16 border-t border-zinc-100 scroll-mt-20">
        <div className="site-container grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12">
          <h2 className="md:col-span-3 text-lg text-[#111111] font-medium">{t.gap.title}</h2>
          <div className="md:col-span-9 flex flex-col gap-5 text-md text-zinc-700 leading-relaxed max-measure text-pretty">
            <p>{t.gap.p1}</p>
            <p>{t.gap.p2}</p>
            <p>
              {language === 'pl' ? (
                <>
                  Samodzielnie zaprojektowałem i zrealizowałem{' '}
                  <strong>badanie zbieżnymi metodami mieszanymi</strong>: od podstaw opracowałem
                  kwestionariusz ankiety ilościowej oraz dyspozycję do 10 wywiadów pogłębionych. Badanie
                  ankietowe i wywiady były prowadzone równolegle w trzech centralnych dzielnicach (Stare
                  Miasto, Kazimierz, Podgórze), analizowane niezależnie i połączone na etapie syntezy.
                </>
              ) : (
                <>
                  I solely designed and executed a <strong>convergent mixed-methods study</strong>:
                  writing both the quantitative questionnaire and the 10-interview qualitative guide from
                  scratch. The survey and interviews ran simultaneously across three central districts
                  (Old Town, Kazimierz, and Podgórze), were analysed independently, and converged only at
                  synthesis.
                </>
              )}
            </p>

            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="border border-zinc-200 rounded-xl overflow-hidden bg-white shadow-2xs">
                <img
                  src="/work/thesis/questionnaire-opening.png"
                  alt="Blank questionnaire first page showing residency screening and cover letter"
                  className="w-full h-auto object-contain"
                  loading="lazy"
                />
                <div className="p-3 bg-zinc-50 border-t border-zinc-100 text-xs text-zinc-600">
                  <span className="font-semibold text-zinc-900 block mb-0.5">
                    {t.gap.instrument01Title}
                  </span>
                  {t.gap.instrument01Desc}
                </div>
              </div>

              <div className="border border-zinc-200 rounded-xl p-5 bg-zinc-50/70 flex flex-col justify-between">
                <div>
                  <span className="text-xs uppercase tracking-wider font-semibold text-zinc-500">
                    {t.gap.corpusTitle}
                  </span>
                  <div className="mt-4 space-y-3">
                    <div>
                      <p className="text-2xl font-bold text-[#111111] tabular-nums">446</p>
                      <p className="text-xs text-zinc-600">{t.gap.n446Label}</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-[#111111] tabular-nums">10 IDIs</p>
                      <p className="text-xs text-zinc-600">{t.gap.n10Label}</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-[#111111] tabular-nums">20.1 yrs</p>
                      <p className="text-xs text-zinc-600">{t.gap.tenureLabel}</p>
                    </div>
                  </div>
                </div>
                <p className="text-xs text-zinc-500 italic mt-4">{t.gap.dates}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: What residents agree on is money, not noise */}
      <section id="costs" className="py-12 md:py-16 border-t border-zinc-100 scroll-mt-20">
        <div className="site-container">
          <div className="max-measure mb-8">
            <h2 className="text-xl md:text-2xl text-[#111111] font-medium tracking-tight mb-3">
              {t.costs.title}
            </h2>
            <p className="text-sm md:text-base text-zinc-700 leading-relaxed text-pretty">
              {t.costs.desc}
            </p>
          </div>

          <div className="mb-8">
            <LikertBarsChart />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mt-8">
            <div className="md:col-span-4 border border-zinc-200 rounded-xl overflow-hidden bg-white shadow-2xs">
              <img
                src="/work/thesis/questionnaire-cost-block.png"
                alt="Questionnaire Cost Block section measuring perceived resident impact"
                className="w-full h-auto object-contain"
                loading="lazy"
              />
              <div className="p-3 bg-zinc-50 border-t border-zinc-100 text-xs text-zinc-600">
                <span className="font-semibold text-zinc-900 block mb-0.5">
                  {t.costs.instrument02Title}
                </span>
                {t.costs.instrument02Desc}
              </div>
            </div>

            <div className="md:col-span-8 flex flex-col justify-center gap-4 text-sm text-zinc-700 leading-relaxed max-measure text-pretty">
              <p>{t.costs.p1}</p>
              <p>{t.costs.p2}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Touristification runs in two registers at once */}
      <section id="registers" className="py-12 md:py-16 border-t border-zinc-100 scroll-mt-20">
        <div className="site-container">
          <div className="max-measure mb-8">
            <h2 className="text-xl md:text-2xl text-[#111111] font-medium tracking-tight mb-3">
              {t.registers.title}
            </h2>
            <p className="text-sm md:text-base text-zinc-700 leading-relaxed text-pretty">
              {t.registers.p1}
            </p>
            <p className="text-sm md:text-base text-zinc-700 leading-relaxed text-pretty mt-3">
              {t.registers.p2}
            </p>
          </div>

          <div className="mb-4">
            <TwoRegistersDotPlot />
          </div>
        </div>
      </section>

      {/* Section 4: Regression Models */}
      <section id="models" className="py-12 md:py-16 border-t border-zinc-100 scroll-mt-20">
        <div className="site-container">
          <div className="max-measure mb-8">
            <h2 className="text-xl md:text-2xl text-[#111111] font-medium tracking-tight mb-3">
              {t.models.title}
            </h2>
            <p className="text-sm md:text-base text-zinc-700 leading-relaxed text-pretty">
              {t.models.p1}
            </p>
            <p className="text-sm md:text-base text-zinc-700 leading-relaxed text-pretty mt-3">
              {t.models.p2}
            </p>
          </div>

          <div className="mb-4">
            <ForestPlotChart />
          </div>
        </div>
      </section>

      {/* Section 5: Typology Axis */}
      <section id="typology" className="py-12 md:py-16 border-t border-zinc-100 scroll-mt-20">
        <div className="site-container">
          <div className="max-measure mb-8">
            <h2 className="text-xl md:text-2xl text-[#111111] font-medium tracking-tight mb-3">
              {t.typology.title}
            </h2>
            <p className="text-sm md:text-base text-zinc-700 leading-relaxed text-pretty">
              {t.typology.p1}
            </p>
            <p className="text-sm md:text-base text-zinc-700 leading-relaxed text-pretty mt-3">
              {t.typology.p2}
            </p>
          </div>

          <div className="mb-4">
            <TypologyScatterChart />
          </div>
        </div>
      </section>

      {/* Section 6: Qualitative Corpus (Theme Matrix & Voices) */}
      <section id="qualitative" className="py-12 md:py-16 border-t border-zinc-100 scroll-mt-20">
        <div className="site-container">
          <div className="max-measure mb-8">
            <h2 className="text-xl md:text-2xl text-[#111111] font-medium tracking-tight mb-3">
              {t.qualitative.title}
            </h2>
            <p className="text-sm md:text-base text-zinc-700 leading-relaxed text-pretty">
              {t.qualitative.p1}
            </p>
            <p className="text-sm md:text-base text-zinc-700 leading-relaxed text-pretty mt-3">
              {t.qualitative.p2}
            </p>
          </div>

          <div className="mb-10">
            <ThemeMatrixChart />
          </div>

          {/* Authentic Interview Voices */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border border-zinc-200 rounded-xl p-6 bg-white shadow-2xs">
              <p className="text-xs uppercase tracking-wider font-semibold text-zinc-500 mb-2">
                {t.qualitative.quote1Category}
              </p>
              <blockquote className="text-sm text-zinc-900 font-medium italic leading-relaxed">
                {t.qualitative.quote1Pl}
              </blockquote>
              {language === 'en' && (
                <p className="text-xs text-zinc-600 mt-2 leading-relaxed">
                  {t.qualitative.quote1Sub}
                </p>
              )}
              <p className="text-xs text-zinc-400 mt-3 font-semibold">
                {t.qualitative.quote1Author}
              </p>
            </div>

            <div className="border border-zinc-200 rounded-xl p-6 bg-white shadow-2xs">
              <p className="text-xs uppercase tracking-wider font-semibold text-zinc-500 mb-2">
                {t.qualitative.quote2Category}
              </p>
              <blockquote className="text-sm text-zinc-900 font-medium italic leading-relaxed">
                {t.qualitative.quote2Pl}
              </blockquote>
              {language === 'en' && (
                <p className="text-xs text-zinc-600 mt-2 leading-relaxed">
                  {t.qualitative.quote2Sub}
                </p>
              )}
              <p className="text-xs text-zinc-400 mt-3 font-semibold">
                {t.qualitative.quote2Author}
              </p>
            </div>

            <div className="border border-zinc-200 rounded-xl p-6 bg-white shadow-2xs">
              <p className="text-xs uppercase tracking-wider font-semibold text-zinc-500 mb-2">
                {t.qualitative.quote3Category}
              </p>
              <blockquote className="text-sm text-zinc-900 font-medium italic leading-relaxed">
                {t.qualitative.quote3Pl}
              </blockquote>
              {language === 'en' && (
                <p className="text-xs text-zinc-600 mt-2 leading-relaxed">
                  {t.qualitative.quote3Sub}
                </p>
              )}
              <p className="text-xs text-zinc-400 mt-3 font-semibold">
                {t.qualitative.quote3Author}
              </p>
            </div>

            <div className="border border-zinc-200 rounded-xl p-6 bg-white shadow-2xs">
              <p className="text-xs uppercase tracking-wider font-semibold text-zinc-500 mb-2">
                {t.qualitative.quote4Category}
              </p>
              <blockquote className="text-sm text-zinc-900 font-medium italic leading-relaxed">
                {t.qualitative.quote4Pl}
              </blockquote>
              {language === 'en' && (
                <p className="text-xs text-zinc-600 mt-2 leading-relaxed">
                  {t.qualitative.quote4Sub}
                </p>
              )}
              <p className="text-xs text-zinc-400 mt-3 font-semibold">
                {t.qualitative.quote4Author}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 7: Synthesis / Joint Display */}
      <section id="synthesis" className="py-12 md:py-16 border-t border-zinc-100 scroll-mt-20">
        <div className="site-container">
          <div className="max-measure mb-8">
            <h2 className="text-xl md:text-2xl text-[#111111] font-medium tracking-tight mb-3">
              {t.synthesis.title}
            </h2>
            <p className="text-sm md:text-base text-zinc-700 leading-relaxed text-pretty">
              {t.synthesis.p1}
            </p>
            <p className="text-sm md:text-base text-zinc-700 leading-relaxed text-pretty mt-3">
              {t.synthesis.p2}
            </p>
          </div>

          <div className="mb-4">
            <JointDisplayTable />
          </div>
        </div>
      </section>

      {/* Section 8: Methodological Limits */}
      <section
        id="limits"
        className="py-12 md:py-16 border-t border-zinc-100 bg-zinc-50/70 rounded-2xl site-container scroll-mt-20 px-6 md:px-10"
      >
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <h2 className="md:col-span-3 text-lg text-[#111111] font-medium">{t.limits.title}</h2>
          <div className="md:col-span-9 flex flex-col gap-3 text-sm text-zinc-700 leading-relaxed max-measure text-pretty">
            <p>
              <strong>{t.limits.item1Title}:</strong> {t.limits.item1Desc}
            </p>
            <p>
              <strong>{t.limits.item2Title}:</strong> {t.limits.item2Desc}
            </p>
            <p>
              <strong>{t.limits.item3Title}:</strong> {t.limits.item3Desc}
            </p>
          </div>
        </div>
      </section>

      {/* Next Project Footer */}
      <section className="py-14 border-t border-zinc-100 mt-12">
        <div className="site-container flex justify-between items-center">
          <span className="text-sm text-zinc-600">{t.nextStudy}</span>
          <button
            onClick={() => {
              navigate('/work/portfolio-desk')
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
            className="text-lg md:text-xl font-medium text-[#111111] hover:text-zinc-600 transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#111111] rounded"
          >
            Portfolio Desk →
          </button>
        </div>
      </section>
    </main>
  )
}

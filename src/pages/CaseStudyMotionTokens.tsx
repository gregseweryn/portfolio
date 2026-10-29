import React, { useEffect, useState } from 'react'
import { ArrowLeft, ArrowUpRight, CheckCircle2, ShieldAlert } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import { motionTokensContent } from '../i18n/motionTokens'
import { Studio } from '../motion-studio/Studio'

interface CaseStudyMotionTokensProps {
  navigate: (path: string) => void
}

const sectionIds = ['studio', 'architecture', 'heuristics', 'components', 'limits']

export const CaseStudyMotionTokens: React.FC<CaseStudyMotionTokensProps> = ({ navigate }) => {
  const { language } = useLanguage()
  const t = motionTokensContent[language]
  const [activeSection, setActiveSection] = useState(sectionIds[0])

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return

    const elements = sectionIds
      .map((id) => document.getElementById(`motion-${id}`))
      .filter((el): el is HTMLElement => !!el)

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0]
        if (visible) {
          setActiveSection(visible.target.id.replace('motion-', ''))
        }
      },
      { rootMargin: '-15% 0px -70% 0px' }
    )

    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <main id="main-content" className="min-h-screen bg-white text-[#111111]">
      {/* Intro Header */}
      <header className="site-container pt-8 md:pt-14 pb-10 border-b border-zinc-100">
        <a
          href="/work"
          onClick={(e) => {
            e.preventDefault()
            navigate('/work')
            window.scrollTo(0, 0)
          }}
          className="inline-flex items-center gap-1.5 text-xs font-medium text-zinc-600 hover:text-zinc-950 transition-colors mb-6 group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" />
          <span>{t.back}</span>
        </a>

        <div className="max-w-3xl">
          <h1 className="text-3xl sm:text-4xl font-medium tracking-tight text-[#111111] mb-3 leading-tight">
            {t.title}
          </h1>
          <p className="text-lg text-zinc-600 leading-relaxed font-normal mb-6">
            {t.subtitle}
          </p>
        </div>

        {/* Hero Cover Image */}
        <figure className="my-8 rounded-2xl overflow-hidden border border-zinc-200/80 shadow-sm bg-zinc-950">
          <img
            src="/work/motion-tokens/cover.png"
            width="1280"
            height="900"
            alt="Motion Tokens Studio preview hero"
            className="w-full h-auto object-cover max-h-[500px]"
            fetchPriority="high"
          />
        </figure>

        <p className="text-base text-zinc-700 leading-relaxed max-w-3xl mb-8">
          {t.lead}
        </p>

        {/* Metadata DL */}
        <dl className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-zinc-100 text-xs">
          <div>
            <dt className="text-zinc-400 font-mono uppercase tracking-wider mb-1">{t.scopeLabel}</dt>
            <dd className="text-zinc-800 font-medium leading-relaxed">{t.scope}</dd>
          </div>
          <div>
            <dt className="text-zinc-400 font-mono uppercase tracking-wider mb-1">{t.roleLabel}</dt>
            <dd className="text-zinc-800 font-medium leading-relaxed">{t.role}</dd>
          </div>
          <div>
            <dt className="text-zinc-400 font-mono uppercase tracking-wider mb-1">{t.toolsLabel}</dt>
            <dd className="text-zinc-800 font-medium leading-relaxed">{t.tools}</dd>
          </div>
        </dl>

        <div className="flex items-center gap-3 mt-8 flex-wrap">
          <a
            href="https://www.figma.com"
            id="figma-spec-link"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-xl bg-zinc-900 text-white hover:bg-zinc-800 transition-colors"
          >
            <span>{t.openFigmaAction}</span>
            <ArrowUpRight size={15} />
          </a>
        </div>
      </header>

      {/* Main Layout: TOC Rail + Content */}
      <div className="site-container py-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Sticky Table of Contents (Desktop) */}
        <aside
          className="hidden lg:block lg:col-span-3 sticky top-24 self-start"
          aria-label={language === 'pl' ? 'Spis treści' : 'Table of contents'}
        >
          <nav
            className="flex flex-col space-y-1 text-xs font-mono border-l border-zinc-200 pl-3"
            aria-label="Motion tokens case study sections"
          >
            <p className="text-[11px] text-zinc-400 uppercase tracking-wider mb-2 font-semibold">
              {language === 'pl' ? 'Sekcje' : 'Contents'}
            </p>
            {t.nav.map((label, idx) => {
              const id = sectionIds[idx]
              const isActive = activeSection === id
              return (
                <a
                  key={id}
                  href={`#motion-${id}`}
                  className={`py-1 transition-colors ${
                    isActive
                      ? 'text-cyan-600 font-semibold translate-x-0.5'
                      : 'text-zinc-500 hover:text-zinc-900'
                  }`}
                  aria-current={isActive ? 'location' : undefined}
                >
                  {label}
                </a>
              )
            })}
          </nav>
        </aside>

        {/* Content Column */}
        <div className="lg:col-span-9 space-y-16 max-w-full overflow-hidden">
          {/* Section 1: Interactive Studio */}
          <section id="motion-studio" className="scroll-mt-24 space-y-4">
            <div>
              <h2 className="text-xl font-medium tracking-tight text-[#111111]">
                {t.studioTitle}
              </h2>
              <p className="text-sm text-zinc-600 mt-1 max-w-2xl leading-relaxed">
                {t.studioIntro}
              </p>
            </div>

            {/* Embedded Live Studio */}
            <div className="pt-2">
              <Studio />
            </div>
          </section>

          {/* Section 2: Architecture & Hierarchy */}
          <section id="motion-architecture" className="scroll-mt-24 pt-8 border-t border-zinc-100 space-y-6">
            <div>
              <h2 className="text-xl font-medium tracking-tight text-[#111111]">
                {t.architectureTitle}
              </h2>
              <p className="text-sm text-zinc-600 mt-1 max-w-2xl leading-relaxed">
                {t.architectureBody}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl border border-zinc-200 bg-zinc-50/50">
                <span className="text-xs font-mono font-bold text-cyan-700">01</span>
                <h3 className="text-sm font-semibold text-zinc-900 mt-1 mb-1">
                  {t.tiers.primitives.title}
                </h3>
                <p className="text-xs text-zinc-600 leading-relaxed">
                  {t.tiers.primitives.desc}
                </p>
              </div>

              <div className="p-4 rounded-xl border border-zinc-200 bg-zinc-50/50">
                <span className="text-xs font-mono font-bold text-cyan-700">02</span>
                <h3 className="text-sm font-semibold text-zinc-900 mt-1 mb-1">
                  {t.tiers.semantics.title}
                </h3>
                <p className="text-xs text-zinc-600 leading-relaxed">
                  {t.tiers.semantics.desc}
                </p>
              </div>

              <div className="p-4 rounded-xl border border-zinc-200 bg-zinc-50/50">
                <span className="text-xs font-mono font-bold text-cyan-700">03</span>
                <h3 className="text-sm font-semibold text-zinc-900 mt-1 mb-1">
                  {t.tiers.components.title}
                </h3>
                <p className="text-xs text-zinc-600 leading-relaxed">
                  {t.tiers.components.desc}
                </p>
              </div>

              <div className="p-4 rounded-xl border border-zinc-200 bg-zinc-50/50">
                <span className="text-xs font-mono font-bold text-cyan-700">04</span>
                <h3 className="text-sm font-semibold text-zinc-900 mt-1 mb-1">
                  {t.tiers.reduced.title}
                </h3>
                <p className="text-xs text-zinc-600 leading-relaxed">
                  {t.tiers.reduced.desc}
                </p>
              </div>
            </div>
          </section>

          {/* Section 3: Jakob Nielsen Heuristics Table */}
          <section id="motion-heuristics" className="scroll-mt-24 pt-8 border-t border-zinc-100 space-y-6">
            <div>
              <h2 className="text-xl font-medium tracking-tight text-[#111111]">
                {t.nielsenTitle}
              </h2>
              <p className="text-sm text-zinc-600 mt-1 max-w-2xl leading-relaxed">
                {t.nielsenIntro}
              </p>
            </div>

            <div className="overflow-x-auto rounded-xl border border-zinc-200 shadow-2xs">
              <table className="nielsen-table w-full text-left text-xs border-collapse">
                <caption className="sr-only">{t.nielsenTitle}</caption>
                <thead>
                  <tr className="bg-zinc-100 border-b border-zinc-200 font-mono text-zinc-700">
                    <th scope="col" className="p-3 w-10 text-center font-semibold">
                      {t.nielsenHeaders[0]}
                    </th>
                    <th scope="col" className="p-3 w-48 font-semibold">
                      {t.nielsenHeaders[1]}
                    </th>
                    <th scope="col" className="p-3 font-semibold">
                      {t.nielsenHeaders[2]}
                    </th>
                    <th scope="col" className="p-3 w-56 font-semibold">
                      {t.nielsenHeaders[3]}
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200 bg-white">
                  {t.nielsenRows.map((row) => (
                    <tr key={row.number} className="hover:bg-zinc-50/70 transition-colors">
                      <td className="p-3 font-mono font-bold text-center text-zinc-500">
                        {row.number}
                      </td>
                      <td className="p-3 font-semibold text-zinc-900">
                        {row.heuristic}
                      </td>
                      <td className="p-3 text-zinc-700 leading-relaxed">
                        {row.decision}
                      </td>
                      <td className="p-3 font-mono text-[11px] text-zinc-600">
                        {row.verification}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Section 4: Accessible Components */}
          <section id="motion-components" className="scroll-mt-24 pt-8 border-t border-zinc-100 space-y-6">
            <div>
              <h2 className="text-xl font-medium tracking-tight text-[#111111]">
                {t.componentsTitle}
              </h2>
              <p className="text-sm text-zinc-600 mt-1 max-w-2xl leading-relaxed">
                {t.componentsIntro}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {t.componentList.map((comp) => (
                <div key={comp.name} className="p-4 rounded-xl border border-zinc-200 bg-zinc-50/40">
                  <div className="flex items-center gap-1.5 text-xs font-mono text-cyan-700 mb-1">
                    <CheckCircle2 size={14} />
                    <span>{comp.pattern}</span>
                  </div>
                  <h3 className="text-sm font-semibold text-zinc-900 mb-1.5">
                    {comp.name}
                  </h3>
                  <p className="text-xs text-zinc-600 leading-relaxed">
                    {comp.motionDesc}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Section 5: Limits & Constraints */}
          <section id="motion-limits" className="scroll-mt-24 pt-8 border-t border-zinc-100 space-y-4">
            <div className="flex items-start gap-3 p-5 rounded-2xl border border-amber-200 bg-amber-50/60 text-amber-950">
              <ShieldAlert className="shrink-0 text-amber-700 mt-0.5" size={20} />
              <div className="space-y-2 text-xs leading-relaxed">
                <h3 className="text-sm font-semibold text-amber-950">
                  {t.limitsTitle}
                </h3>
                <p className="text-amber-900/90">
                  {t.limitsBody}
                </p>
                <p className="font-medium text-amber-950 pt-1 border-t border-amber-200/80">
                  {t.limitsDisclaimer}
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  )
}

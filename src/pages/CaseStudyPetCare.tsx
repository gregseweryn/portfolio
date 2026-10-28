import { useEffect, useState, type ReactNode } from 'react'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import { petcareContent } from '../i18n/petcare'
import './petcare.css'

const reportingUrl = 'https://www.figma.com/proto/AIuCtCLcsTiQYPGS9C81sb/PetCare?page-id=158%3A313&node-id=158-494&starting-point-node-id=158%3A494'
const fileUrl = 'https://www.figma.com/design/AIuCtCLcsTiQYPGS9C81sb/PetCare'
const sharingUrl = 'https://www.figma.com/proto/AIuCtCLcsTiQYPGS9C81sb/PetCare?page-id=269%3A4528&node-id=269-4529&starting-point-node-id=269%3A4529'
const sections = ['problem', 'decisions', 'testing', 'sharing', 'visual', 'outcome']

function Section({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return <section id={`petcare-${id}`} className="pc-section">
    <h2>{title}</h2><div className="pc-section-content">{children}</div>
  </section>
}

export function CaseStudyPetCare({ navigate }: { navigate: (path: string) => void }) {
  const { language } = useLanguage()
  const t = petcareContent[language]
  const [theme, setTheme] = useState<'light' | 'dark'>('light')
  const [active, setActive] = useState(sections[0])
  useEffect(() => {
    const els = sections.map(id => document.getElementById('petcare-' + id)).filter((el): el is HTMLElement => !!el)
    const observer = new IntersectionObserver(entries => {
      const visible = entries.filter(e => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0]
      if (visible) setActive(visible.target.id.replace('petcare-', ''))
    }, { rootMargin: '-15% 0px -70% 0px' })
    els.forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])
  return <main id="main-content" className="pc-study">
    <header className="site-container pc-intro">
      <a href="/work" onClick={e => { e.preventDefault(); navigate('/work'); window.scrollTo(0, 0) }} className="pc-back"><ArrowLeft size={18} aria-hidden="true" />{t.back}</a>
      <h1>{t.title}</h1><p className="pc-subtitle">{t.subtitle}</p>
      <figure className="pc-cover"><img src="/work/petcare/cover.png" width="1280" height="900" alt={t.heroAlt} fetchPriority="high" /></figure>
      <p className="pc-lead">{t.intro}</p>
      <dl className="pc-meta">
        <div><dt>{t.scopeLabel}</dt><dd>{t.scope}</dd></div>
        <div><dt>{t.roleLabel}</dt><dd>{t.role}</dd></div>
        <div><dt>{t.toolsLabel}</dt><dd>{t.tools}</dd></div>
      </dl>
      <div className="pc-actions"><a href={reportingUrl} target="_blank" rel="noopener noreferrer">{t.prototype}<ArrowUpRight size={18} aria-hidden="true" /></a><a href={sharingUrl} target="_blank" rel="noopener noreferrer">{t.sharingPrototype}<ArrowUpRight size={18} aria-hidden="true" /></a><a href={fileUrl} target="_blank" rel="noopener noreferrer">{language === 'pl' ? 'Otwórz cały plik w Figmie' : 'Open the full Figma file'}<ArrowUpRight size={18} aria-hidden="true" /></a></div>
    </header>
    <div className="site-container pc-layout">
    <nav className="pc-toc" aria-label={language === 'pl' ? 'Sekcje case study PetCare' : 'PetCare case study sections'}>
      <p className="pc-toc-label">{language === 'pl' ? 'Spis treści' : 'Contents'}</p>
      {t.nav.map((label, i) => <a key={sections[i]} href={`#petcare-${sections[i]}`} className={active === sections[i] ? 'is-active' : undefined} aria-current={active === sections[i] ? 'location' : undefined}>{label}</a>)}
    </nav>
    <div className="pc-main">
    <Section id="problem" title={t.problemTitle}>
      <p>{t.origin}</p><p>{t.research}</p>
      <blockquote><p>“{t.quote}”</p><cite>{t.quoteSource}</cite></blockquote>
      <p>{t.researchLimit}</p>
      <blockquote className="pc-counter"><p>“{t.counterQuote}”</p><cite>{t.counterSource}</cite></blockquote>
    </Section>
    <Section id="decisions" title={t.decisionsTitle}>
      {t.decisions.map(d => <div className="pc-decision" key={d.title}><h3>{d.title}</h3><p>{d.body}</p></div>)}
    </Section>
    <figure className="pc-board"><a href="/work/petcare/flow-board.png" target="_blank" rel="noopener noreferrer"><img src="/work/petcare/flow-board.png" alt={t.flowAlt} loading="lazy" width="1756" height="955" /></a><figcaption>{t.flowCaption}</figcaption></figure>
    <Section id="testing" title={t.testsTitle}>
      <p>{t.testsIntro}</p>
      <div className="pc-table-wrap"><table><caption className="sr-only">{t.testsTitle}</caption><thead><tr>{t.tableHeaders.map(h => <th key={h} scope="col">{h}</th>)}</tr></thead><tbody>{t.tests.map((row, i) => <tr key={i}>{row.map((cell, j) => j === 0 ? <th key={j} scope="row">{cell}</th> : <td key={j}>{cell}</td>)}</tr>)}</tbody></table></div>
      <p className="pc-note">{t.testLimit}</p><h3>{t.repairTitle}</h3><p>{t.repair}</p>
    </Section>
    <figure className="pc-board pc-repair-board"><a href="/work/petcare/repair-board.png" target="_blank" rel="noopener noreferrer"><img src="/work/petcare/repair-board.png" alt={t.repairAlt} loading="lazy" width="890" height="955" /></a><figcaption>{t.repairCaption}</figcaption></figure>
    <Section id="sharing" title={t.sharingTitle}>
      <p>{t.sharingIntro}</p><ul>{t.sharingPoints.map(point => <li key={point}>{point}</li>)}</ul>
    </Section>
    <figure className="pc-shared-board"><div className="pc-phones">
      <img src="/work/petcare/add-pet.png" alt={t.addAlt} loading="lazy" width="393" height="852" />
      <img src="/work/petcare/invitation-pending.png" alt={t.inviteAlt} loading="lazy" width="393" height="852" />
      <img src="/work/petcare/shared-care-dark.png" alt={t.sharedAlt} loading="lazy" width="393" height="852" />
    </div><figcaption>{t.sharingCaption}</figcaption></figure>
    <Section id="visual" title={t.systemTitle}>
      <p>{t.systemBody}</p>
      <div className="pc-theme-controls" role="group" aria-label={t.themeLabel}>{(['light', 'dark'] as const).map(value => <button key={value} type="button" aria-pressed={theme === value} onClick={() => setTheme(value)}>{t[value]}</button>)}</div>
      <figure className={`pc-theme-preview pc-theme-${theme}`}><img src={`/work/petcare/today-${theme}.png`} alt={t.themeAlt + ' ' + t[theme]} loading="lazy" width="393" height="852" /><figcaption>{t.themeCaption}</figcaption></figure>
      <p>{t.access}</p><h3>{t.motionTitle}</h3><p>{t.motionBody}</p>
      <video controls playsInline preload="none" poster="/work/petcare/today-light.png" aria-label={t.videoLabel} width="480" height="1000"><source src="/work/petcare/petcare-walkthrough.mp4" type="video/mp4" /><a href="/work/petcare/petcare-walkthrough.mp4">{t.videoFallback}</a></video>
      <p className="pc-note">{t.videoDescription}</p>
    </Section>
    <Section id="outcome" title={t.outcomeTitle}>
      <p>{t.outcome}</p><p>{t.reflection}</p><p>{t.next}</p>
      <details className="pc-method"><summary>{t.methodologyTitle}</summary>{t.methodology.map(p => <p key={p}>{p}</p>)}</details>
      <div className="pc-actions"><a href={reportingUrl} target="_blank" rel="noopener noreferrer">{t.prototype}<ArrowUpRight size={18} aria-hidden="true" /></a><a href={sharingUrl} target="_blank" rel="noopener noreferrer">{t.sharingPrototype}<ArrowUpRight size={18} aria-hidden="true" /></a><a href={fileUrl} target="_blank" rel="noopener noreferrer">{language === 'pl' ? 'Otwórz cały plik w Figmie' : 'Open the full Figma file'}<ArrowUpRight size={18} aria-hidden="true" /></a></div>
    </Section>
    </div>
    </div>
  </main>
}

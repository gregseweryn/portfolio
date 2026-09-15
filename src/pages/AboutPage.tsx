import React from 'react'
import { useLanguage } from '../context/LanguageContext'
import { aboutContent } from '../i18n'

interface AboutPageProps {
  navigate: (path: string) => void
}

export const AboutPage: React.FC<AboutPageProps> = () => {
  const { language } = useLanguage()
  const t = aboutContent[language]

  return (
    <main id="main-content">
      {/* Editorial Headline */}
      <section className="pt-8 md:pt-14 pb-8">
        <div className="site-container">
          <p className="text-xs uppercase tracking-wider font-semibold text-zinc-500 mb-2">
            {t.subtitle}
          </p>
          <h1 className="text-2xl md:text-3xl font-light text-[#111111] leading-[1.16] tracking-tight max-w-3xl text-balance">
            {t.headline}
          </h1>
        </div>
      </section>

      {/* Bio and Portrait Section */}
      <section className="pb-16 md:pb-24 border-b border-zinc-100">
        <div className="site-container grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-start">
          <div className="md:col-span-7 flex flex-col gap-5 text-md text-zinc-700 leading-relaxed max-measure text-pretty">
            {t.bio.map((paragraph, idx) => (
              <p
                key={idx}
                className={idx === 0 ? 'text-lg text-[#111111] font-medium leading-relaxed text-pretty' : undefined}
              >
                {paragraph}
              </p>
            ))}
          </div>

          <div className="md:col-span-5 flex justify-center md:justify-end w-full">
            <div className="w-full max-w-[420px] md:max-w-none aspect-square relative overflow-hidden rounded-2xl bg-zinc-950 border border-zinc-200/80 shadow-md">
              <img
                src="/aboutzdjecie.webp"
                alt={t.imageAlt}
                width={1254}
                height={1254}
                className="w-full h-full object-cover"
                loading="eager"
                decoding="async"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Principles Section */}
      <section className="py-14 md:py-20 border-b border-zinc-100">
        <div className="site-container grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12">
          <h2 className="md:col-span-3 md:sticky md:self-start md:top-24 text-lg font-medium tracking-tight text-[#111111]">
            {t.principlesTitle}
          </h2>
          <div className="md:col-span-9 flex flex-col divide-y divide-zinc-200/80 max-measure">
            {t.principles.map((p) => (
              <div key={p.title} className="py-6 first:pt-0 last:pb-0">
                <p className="text-xl font-medium text-[#111111] mb-2 text-balance">{p.title}</p>
                <p className="text-sm leading-relaxed text-zinc-700 text-pretty">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Methods Toolkit Grid */}
      <section className="py-14 md:py-20">
        <div className="site-container grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12">
          <h2 className="md:col-span-3 md:sticky md:self-start md:top-24 text-lg font-medium tracking-tight text-[#111111]">
            {t.toolkitTitle}
          </h2>
          <div className="md:col-span-9 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {t.toolkit.map((group) => (
              <div key={group.group} className="border border-zinc-200 rounded-xl p-5 bg-white shadow-2xs">
                <p className="text-xs uppercase tracking-wider font-semibold text-zinc-500 mb-3">
                  {group.group}
                </p>
                <ul className="space-y-1.5">
                  {group.items.map((item) => (
                    <li key={item} className="text-sm font-medium text-zinc-800">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}

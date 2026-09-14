import React from 'react'

interface AboutPageProps {
  navigate: (path: string) => void
}

export const AboutPage: React.FC<AboutPageProps> = () => {
  const principles = [
    {
      title: 'Frame the question before choosing the method',
      body: 'Methods serve the research question, not the other way around. I spend time clarifying what the team actually needs to know before selecting tools.',
    },
    {
      title: 'Measure decisions, not just opinions',
      body: 'A design choice should be supported by evidence. When testing interfaces or modelling operator paths, I verify whether a change measurably improves execution.',
    },
    {
      title: 'State limitations clearly',
      body: 'Every study has boundaries. Being transparent about sample constraints, expert assumptions, or missing data makes the findings credible and actionable.',
    },
  ]

  const toolkit = [
    { group: 'UX Research', items: ['Survey design', 'In-depth interviews (IDI)', 'Participant screening', 'Thematic analysis', 'Mixed methods triangulation'] },
    { group: 'UX & UI Design', items: ['Information architecture', 'Wireframing', 'Interactive prototypes (Figma)', 'User flows', 'Task optimization'] },
    { group: 'Design Systems', items: ['IBM Carbon Design System', 'Token management', 'Reusable UI components', 'Responsive layouts'] },
    { group: 'Audit & Evaluation', items: ['Heuristic evaluation (Nielsen 10)', 'KLM-GOMS operator modelling', 'Usability testing', 'Accessibility checks (WCAG 2.2 AA)'] },
  ]

  return (
    <main id="main-content">
      {/* Editorial Headline */}
      <section className="pt-8 md:pt-14 pb-8">
        <div className="site-container">
          <h1 className="text-2xl md:text-3xl font-light text-[#111111] leading-[1.16] tracking-tight max-w-3xl text-balance">
            Combining visual design craft with empirical social research.
          </h1>
        </div>
      </section>

      {/* Bio and Portrait Section */}
      <section className="pb-16 md:pb-24 border-b border-zinc-100">
        <div className="site-container grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-start">
          <div className="md:col-span-7 flex flex-col gap-5 text-md text-zinc-700 leading-relaxed max-measure text-pretty">
            <p className="text-lg text-[#111111] font-medium leading-relaxed text-pretty">
              I am Grzegorz Seweryn, a Junior UX Researcher and Product Designer based in Kraków.
              I hold a BA in Graphic Design and an MA in Sociology from Jagiellonian University.
            </p>
            <p>
              My background brings two disciplines together. Graphic design gave me visual precision,
              an understanding of typography, and the technical skill to build complete interfaces in Figma
              and design systems. Sociology and data analysis taught me empirical research: how to write unbiased
              survey questions, conduct in-depth interviews, screen participants, and analyze quantitative
              and qualitative datasets.
            </p>
            <p>
              Without commercial experience yet, I focused on demonstrating initiative through two comprehensive
              projects. In Portfolio Desk, I audited an existing loan servicing system, redesigned three core screens,
              and used KLM-GOMS modelling to measure a 65% reduction in analyst task time. In my master’s thesis,
              I solely designed and executed a city-wide mixed-methods study on tourism impact in Kraków, collecting
              446 valid surveys and conducting 10 qualitative interviews.
            </p>
            <p>
              I am looking for my first commercial role as a Junior UX Researcher, Junior Product Designer,
              or UX Generalist where I can contribute methodological rigor, design skills, and genuine curiosity.
            </p>
          </div>

          <div className="md:col-span-5 flex justify-center md:justify-end w-full">
            <div className="w-full max-w-[420px] md:max-w-none aspect-square relative overflow-hidden rounded-2xl bg-zinc-950 border border-zinc-200/80 shadow-md">
              <img
                src="/aboutzdjecie.webp"
                alt="Grzegorz Seweryn, UX Researcher and Product Designer"
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
            How I Work
          </h2>
          <div className="md:col-span-9 flex flex-col divide-y divide-zinc-200/80 max-measure">
            {principles.map((p) => (
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
            Skills and Toolkit
          </h2>
          <div className="md:col-span-9 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {toolkit.map((group) => (
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

import React from 'react'

export const ClientMarquee: React.FC = () => {
  const methods = [
    'Generative Research',
    'KLM-GOMS Modelling',
    'Heuristic Audit',
    'Convergent Mixed Methods',
    'Survey Design (N=446)',
    'Usability Testing',
    'Thematic Analysis',
    'Information Architecture',
    'In-Depth Interviews',
    'Carbon Design System',
    'Task Time Benchmarking',
    'Cognitive Walkthrough',
    'Reflexive Analysis',
    'Jagiellonian University',
  ]

  const items = [...methods, ...methods]

  return (
    <section className="py-16 md:py-20 border-t border-gray-100 overflow-hidden bg-gray-50/50">
      <div className="marquee-mask overflow-hidden">
        <div className="animate-marquee flex w-max items-center gap-8 md:gap-12 hover:[animation-play-state:paused]">
          {items.map((method, idx) => (
            <div key={`${method}-${idx}`} className="flex items-center gap-8 md:gap-12 shrink-0">
              <span className="text-sm md:text-md uppercase tracking-wider font-medium text-zinc-600 hover:text-[#111111] transition-colors">
                {method}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-gray-300" aria-hidden="true" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

import React from 'react'

export const Footer: React.FC = () => {
  return (
    <footer id="contact" className="bg-zinc-50 pt-14 md:pt-20 pb-12 border-t border-zinc-200/80">
      <div className="site-container flex flex-col gap-12 md:gap-16">
        <div className="max-w-2xl">
          <p className="text-xs uppercase tracking-wider font-semibold text-zinc-500 mb-3">
            Open to Junior Roles. Kraków, Warsaw, or Remote
          </p>
          <h2 className="text-2xl md:text-3xl font-medium text-[#111111] text-balance leading-[1.18] tracking-tight">
            Looking for my first UX role.
          </h2>
          <p className="text-sm text-zinc-600 mt-2 max-w-xl text-pretty">
            I am looking for entry-level and junior UX Research or Product Design positions. If your team values empirical methods, clear interface design, and solid research foundations, let us talk.
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-4">
            <a
              href="mailto:grzegorz.seweryn99@gmail.com"
              className="inline-block text-lg md:text-xl font-medium text-zinc-800 hover:text-[#111111] underline underline-offset-4 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#111111] rounded"
            >
              grzegorz.seweryn99@gmail.com
            </a>
            <a
              href="mailto:grzegorz.seweryn99@gmail.com?subject=Request%20for%20CV%20-%20Grzegorz%20Seweryn"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#111111] text-white text-xs font-medium hover:bg-zinc-800 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#111111]"
            >
              Request CV / Resume
            </a>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 pt-6 border-t border-zinc-200/60">
          <div className="flex flex-wrap gap-6 items-center">
            <a
              href="https://www.linkedin.com/in/gseweryn/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Grzegorz Seweryn on LinkedIn (opens in new tab)"
              className="text-sm font-medium text-zinc-700 hover:text-[#111111] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#111111] rounded"
            >
              LinkedIn ↗
            </a>
            <a
              href="https://semi-secure-43576547.figma.site/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Portfolio Desk Figma Prototype (opens in new tab)"
              className="text-sm font-medium text-zinc-700 hover:text-[#111111] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#111111] rounded"
            >
              Figma Prototype ↗
            </a>
          </div>
          <p className="text-xs text-zinc-600">
            © 2026 Grzegorz Seweryn. All research verified against primary records.
          </p>
        </div>
      </div>
    </footer>
  )
}

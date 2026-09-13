import { site } from "../data/portfolio";
import EvidenceChart from "./EvidenceChart";
import { evidence } from "../data/portfolio";

export default function Hero() {
  return (
    <section id="top" className="border-b border-line pt-16 pb-14 sm:pt-24 sm:pb-20">
      <div className="container grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8">
        {/* Statement */}
        <div className="lg:col-span-8">
          <p className="mb-8 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[0.72rem] uppercase tracking-[0.16em] text-mute">
            <span className="text-ink">{site.role}</span>
            <span aria-hidden="true">—</span>
            <span className="inline-flex items-center gap-2">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
              {site.availability}
            </span>
          </p>
          <h1 className="reveal font-display text-[clamp(2.6rem,7.5vw,6rem)] font-extrabold leading-[0.98] tracking-[-0.03em]">
            I turn messy human behaviour into decisions teams can{" "}
            <span className="italic text-accent">act on</span>.
          </h1>
          <p className="mt-8 max-w-[54ch] text-[1.05rem] leading-relaxed text-mute">
            {site.intro}
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href="#work"
              className="bg-ink px-6 py-3 font-mono text-[0.75rem] uppercase tracking-[0.12em] text-paper transition-transform hover:-translate-y-0.5"
            >
              View research →
            </a>
            <a
              href="#contact"
              className="border border-ink px-6 py-3 font-mono text-[0.75rem] uppercase tracking-[0.12em] text-ink transition-colors hover:bg-ink hover:text-paper"
            >
              Get in touch
            </a>
          </div>
        </div>

        {/* Meta + one small proof */}
        <aside className="lg:col-span-4 lg:border-l lg:border-line lg:pl-8">
          <dl className="grid grid-cols-2 gap-y-6 lg:grid-cols-1">
            <div>
              <dt className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-mute">Based in</dt>
              <dd className="mt-1 font-display text-lg font-semibold">{site.location}</dd>
            </div>
            <div>
              <dt className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-mute">Focus</dt>
              <dd className="mt-1 font-display text-lg font-semibold">Generative &amp; evaluative</dd>
            </div>
          </dl>
          <figure className="mt-8 border-t border-line pt-6">
            <EvidenceChart data={evidence} compact />
            <figcaption className="mt-3 font-mono text-[0.68rem] leading-relaxed text-mute">
              Featured result — {evidence.caption}
            </figcaption>
          </figure>
        </aside>
      </div>
    </section>
  );
}

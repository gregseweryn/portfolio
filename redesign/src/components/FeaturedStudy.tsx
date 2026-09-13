import { studies, evidence } from "../data/portfolio";
import EvidenceChart from "./EvidenceChart";
import Reveal from "./Reveal";

export default function FeaturedStudy() {
  const study = studies.find((s) => s.slug === evidence.studySlug) ?? studies[0];

  return (
    <section id="featured" className="border-b border-line bg-ink py-16 text-paper sm:py-24">
      <div className="container">
        <p className="mb-10 font-mono text-[0.7rem] uppercase tracking-[0.14em] text-paper/60">
          Featured study — {study.index}
        </p>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <h3 className="font-display text-[clamp(1.9rem,4.5vw,3.4rem)] font-extrabold leading-[1.02] tracking-[-0.02em]">
              {study.title}
            </h3>
            <p className="mt-6 max-w-[52ch] text-lg leading-relaxed text-paper/75">
              {study.question}
            </p>
            <div className="mt-8 flex flex-wrap gap-2">
              {study.methods.map((m) => (
                <span
                  key={m}
                  className="border border-paper/25 px-2.5 py-1 font-mono text-[0.68rem] uppercase tracking-[0.08em] text-paper/70"
                >
                  {m}
                </span>
              ))}
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="border border-paper/15 p-6 sm:p-8">
              <div className="flex items-baseline gap-4">
                <span className="font-display text-[clamp(3rem,8vw,5.5rem)] font-extrabold leading-none text-accent">
                  {study.metric.value}
                </span>
                <span className="font-mono text-[0.72rem] uppercase leading-tight tracking-[0.1em] text-paper/60">
                  {study.metric.label}
                </span>
              </div>
              <div className="mt-8">
                <FeaturedChart />
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

// The chart on the dark band needs paper-toned rules; wrap keeps the shared
// component while recolouring its neutral line via the surrounding context.
function FeaturedChart() {
  return (
    <div className="text-paper [&_.bg-line]:bg-paper/15">
      <EvidenceChart data={evidence} />
    </div>
  );
}

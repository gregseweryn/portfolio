import Link from "next/link";
import { studies } from "@/lib/editorial";
import Reveal from "./Reveal";

export default function WorkIndex() {
  return (
    <section id="work" className="border-b border-line py-16 sm:py-24">
      <div className="container">
        <div className="mb-10 flex items-end justify-between border-b border-line pb-4">
          <h2 className="font-display text-2xl font-extrabold tracking-tight">Selected research</h2>
          <p className="font-mono text-[0.7rem] uppercase tracking-[0.12em] text-mute">
            Index — {String(studies.length).padStart(2, "0")}
          </p>
        </div>

        <ul>
          {studies.map((s, i) => (
            <Reveal as="li" key={s.slug} delay={i * 80}>
              <Link
                href={s.href}
                className="group grid grid-cols-1 items-start gap-4 border-b border-line py-8 transition-colors hover:bg-ink/[0.03] sm:grid-cols-[auto_1fr_auto] sm:gap-8"
              >
                <span className="font-mono text-sm text-mute">{s.index}</span>
                <span>
                  <span className="block font-display text-[clamp(1.5rem,3.5vw,2.4rem)] font-bold leading-tight tracking-tight transition-colors group-hover:text-accent">
                    {s.title}
                  </span>
                  <span className="mt-2 block max-w-[62ch] text-mute">{s.question}</span>
                  <span className="mt-4 flex flex-wrap gap-2">
                    {s.methods.map((m) => (
                      <span
                        key={m}
                        className="border border-line px-2.5 py-1 font-mono text-[0.68rem] uppercase tracking-[0.08em] text-mute"
                      >
                        {m}
                      </span>
                    ))}
                  </span>
                </span>
                <span className="text-right sm:min-w-[7rem]">
                  <span className="block font-display text-2xl font-extrabold text-ink">
                    {s.metric.value}
                  </span>
                  <span className="block font-mono text-[0.68rem] uppercase tracking-[0.1em] text-mute">
                    {s.metric.label}
                  </span>
                  <span className="mt-3 inline-block font-mono text-[0.7rem] text-mute transition-transform group-hover:translate-x-1">
                    Read →
                  </span>
                </span>
              </Link>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

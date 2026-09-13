import { process, about } from "../data/portfolio";
import Reveal from "./Reveal";

export default function ProcessStrip() {
  return (
    <section id="about" className="border-b border-line py-16 sm:py-24">
      <div className="container">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <h2 className="font-display text-[clamp(1.8rem,4vw,3rem)] font-extrabold leading-[1.05] tracking-[-0.02em]">
              {about.headline}
            </h2>
            <p className="mt-6 max-w-[46ch] text-mute leading-relaxed">{about.body}</p>
          </div>
          <ol className="lg:col-span-7 lg:pl-8 lg:border-l lg:border-line">
            {process.map((p, i) => (
              <Reveal as="li" key={p.step} delay={i * 80}>
                <div className="flex gap-6 border-b border-line py-6 last:border-b-0">
                  <span className="font-mono text-sm text-accent">{p.step}</span>
                  <div>
                    <h3 className="font-display text-xl font-bold tracking-tight">{p.title}</h3>
                    <p className="mt-2 max-w-[54ch] text-mute leading-relaxed">{p.body}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

import { useState } from "react";
import { site, methods, studies, evidence, proof, process, about } from "../data/portfolio";
import FractalField from "./rave/FractalField";
import EvidenceChart from "./EvidenceChart";
import Reveal from "./Reveal";

const CMYK = ["bg-cyan", "bg-magenta", "bg-yellow"] as const;
const HARD = ["hard-c", "hard-m", "hard-y"] as const;

export default function RaveHome() {
  return (
    <div className="min-h-screen bg-bone text-key">
      <a
        href="#work"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-key focus:px-4 focus:py-2 focus:font-code focus:text-sm focus:text-bone"
      >
        Skip to work
      </a>
      <BrutalNav />
      <main>
        <Hero />
        <Methods />
        <Work />
        <Featured />
        <Process />
        <Proof />
        <ContactBlock />
      </main>
      <BrutalFooter />
    </div>
  );
}

function BrutalNav() {
  return (
    <header className="sticky top-0 z-40 border-b-2 border-key bg-bone">
      <div className="container flex h-16 items-center justify-between">
        <a href="#top" className="font-brutal text-xl uppercase tracking-tight">
          {site.name}<span className="text-magenta">.</span>
        </a>
        <nav className="flex items-center gap-3 font-code text-[0.7rem] font-bold uppercase">
          <a href="#work" className="hidden px-2 py-1 hover:bg-cyan sm:inline">Work</a>
          <a href="#about" className="hidden px-2 py-1 hover:bg-yellow sm:inline">About</a>
          <a href="#contact" className="border-2 border-key bg-key px-3 py-1.5 text-bone hover:bg-magenta hover:text-key">
            Contact →
          </a>
        </nav>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="relative border-b-2 border-key">
      <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="border-b-2 border-key px-[clamp(1.25rem,5vw,4rem)] py-14 lg:border-b-0 lg:border-r-2">
          <p className="mb-6 flex flex-wrap items-center gap-2 font-code text-xs font-bold uppercase">
            <span className="bg-key px-2 py-1 text-bone">{site.role}</span>
            <span className="bg-magenta px-2 py-1">{site.availability}</span>
          </p>
          <h1 className="font-brutal text-[clamp(3rem,10vw,7.5rem)] uppercase leading-[0.86] tracking-[-0.01em]">
            <span className="glitch inline-block">Messy</span>{" "}
            <span className="glitch inline-block text-cyan">behaviour</span>{" "}
            <span className="glitch inline-block">into</span>{" "}
            <span className="glitch inline-block bg-yellow px-2">decisions</span>{" "}
            <span className="glitch inline-block">teams act on.</span>
          </h1>
          <p className="mt-8 max-w-[52ch] font-body text-[1.05rem] leading-relaxed text-key">
            {site.intro}
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <a href="#work" className={`border-2 border-key bg-key px-6 py-3 font-code text-sm font-bold uppercase text-bone transition-transform hover:-translate-x-1 hover:-translate-y-1 ${HARD[0]}`}>
              View research →
            </a>
            <a href="#contact" className={`border-2 border-key bg-bone px-6 py-3 font-code text-sm font-bold uppercase transition-transform hover:-translate-x-1 hover:-translate-y-1 ${HARD[1]}`}>
              Get in touch
            </a>
          </div>
        </div>
        <div className="relative min-h-[320px] lg:min-h-full">
          <FractalField />
          <div className="pointer-events-none absolute bottom-3 left-3 font-code text-[0.62rem] font-bold uppercase text-key/70">
            fig.00 — sierpiński carpet / live
          </div>
        </div>
      </div>
    </section>
  );
}

function Methods() {
  const row = [...methods, ...methods];
  return (
    <section aria-label="Methods" className="overflow-hidden border-b-2 border-key bg-key py-3 text-bone">
      <div className="flex">
        <ul className="marquee-track flex shrink-0 items-center gap-6 pr-6">
          {row.map((m, i) => (
            <li key={`${m}-${i}`} className="flex items-center gap-6 whitespace-nowrap">
              <span className="font-brutal text-lg uppercase">{m}</span>
              <span className={`inline-block h-3 w-3 ${CMYK[i % 3]}`} aria-hidden="true" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Work() {
  return (
    <section id="work" className="border-b-2 border-key">
      <div className="container flex items-end justify-between border-b-2 border-key py-4">
        <h2 className="font-brutal text-3xl uppercase">Selected research</h2>
        <span className="font-code text-xs font-bold uppercase">INDEX / {String(studies.length).padStart(2, "0")}</span>
      </div>
      <ul>
        {studies.map((s, i) => (
          <Reveal as="li" key={s.slug} delay={i * 80}>
            <a
              href="#featured"
              className="group grid grid-cols-1 gap-4 border-b-2 border-key px-[clamp(1.25rem,5vw,4rem)] py-8 transition-colors hover:bg-yellow sm:grid-cols-[auto_1fr_auto] sm:items-center sm:gap-8"
            >
              <span className="font-brutal text-[clamp(3rem,7vw,5rem)] leading-none text-key/25 transition-colors group-hover:text-key">
                {s.index}
              </span>
              <span>
                <span className="block font-brutal text-[clamp(1.5rem,3.5vw,2.6rem)] uppercase leading-[0.95]">
                  {s.title}
                </span>
                <span className="mt-2 block max-w-[60ch] font-body text-key/80">{s.question}</span>
                <span className="mt-3 flex flex-wrap gap-2">
                  {s.methods.map((m) => (
                    <span key={m} className="border-2 border-key bg-bone px-2 py-0.5 font-code text-[0.66rem] font-bold uppercase">{m}</span>
                  ))}
                </span>
              </span>
              <span className="text-left sm:text-right">
                <span className="block font-brutal text-3xl">{s.metric.value}</span>
                <span className="block font-code text-[0.66rem] font-bold uppercase text-key/70">{s.metric.label}</span>
              </span>
            </a>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}

function Featured() {
  const study = studies.find((s) => s.slug === evidence.studySlug) ?? studies[0];
  return (
    <section id="featured" className="border-b-2 border-key bg-cyan">
      <div className="container py-16">
        <p className="mb-8 inline-block bg-key px-2 py-1 font-code text-xs font-bold uppercase text-bone">
          Featured / {study.index}
        </p>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
          <Reveal>
            <h3 className="font-brutal text-[clamp(2rem,5vw,3.6rem)] uppercase leading-[0.92]">{study.title}</h3>
            <p className="mt-5 max-w-[50ch] font-body text-lg leading-relaxed text-key">{study.question}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {study.methods.map((m) => (
                <span key={m} className="border-2 border-key bg-bone px-2 py-0.5 font-code text-[0.66rem] font-bold uppercase">{m}</span>
              ))}
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div className="border-2 border-key bg-bone p-6 hard-k sm:p-8">
              <div className="flex items-baseline gap-4">
                <span className="font-brutal text-[clamp(3rem,8vw,5.5rem)] leading-none text-magenta">{study.metric.value}</span>
                <span className="font-code text-xs font-bold uppercase text-key/70">{study.metric.label}</span>
              </div>
              <div className="mt-8 [&_.bg-line]:bg-key/15 [&_.bg-accent]:bg-magenta [&_.bg-ink]:bg-key">
                <EvidenceChart data={evidence} />
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Process() {
  return (
    <section id="about" className="border-b-2 border-key">
      <div className="container grid grid-cols-1 gap-10 py-16 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <h2 className="font-brutal text-[clamp(2rem,4.5vw,3.4rem)] uppercase leading-[0.95]">{about.headline}</h2>
          <p className="mt-5 max-w-[46ch] font-body leading-relaxed text-key/80">{about.body}</p>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 lg:col-span-7">
          {process.map((p, i) => (
            <Reveal key={p.step} delay={i * 80}>
              <div className={`relative h-full border-2 border-key bg-bone p-5 ${HARD[i % 3]}`}>
                <span aria-hidden="true" className="absolute right-2 top-2 h-3 w-3 border-2 border-key" />
                <span className="font-brutal text-2xl">{p.step}</span>
                <h3 className="mt-2 font-brutal text-lg uppercase leading-tight">{p.title}</h3>
                <p className="mt-2 font-body text-sm leading-relaxed text-key/80">{p.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Proof() {
  return (
    <section aria-label="By the numbers" className="border-b-2 border-key">
      <div className="container grid grid-cols-2 gap-0 sm:grid-cols-4">
        {proof.map((p, i) => (
          <div key={p.label} className={`border-2 border-key p-6 ${["bg-cyan", "bg-magenta", "bg-yellow", "bg-bone"][i % 4]}`}>
            <div className="font-brutal text-[clamp(2.4rem,5vw,3.6rem)] leading-none">{p.value}</div>
            <div className="mt-2 font-code text-[0.66rem] font-bold uppercase">{p.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function ContactBlock() {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${site.email}`;
    }
  };
  return (
    <section id="contact" className="relative">
      <div className="checker absolute inset-0 opacity-[0.08]" aria-hidden="true" />
      <div className="container relative py-20">
        <p className="mb-6 inline-block bg-magenta px-2 py-1 font-code text-xs font-bold uppercase">{site.availability}</p>
        <h2 className="max-w-[16ch] font-brutal text-[clamp(2.6rem,8vw,6rem)] uppercase leading-[0.9]">
          A research problem worth getting right?
        </h2>
        <div className="mt-12 flex flex-wrap gap-4">
          <button
            type="button"
            onClick={copy}
            className="flex items-center gap-3 border-2 border-key bg-key px-6 py-4 font-code text-sm font-bold text-bone transition-transform hover:-translate-x-1 hover:-translate-y-1 hard-c"
          >
            {site.email}<span className="text-yellow">{copied ? "COPIED ✓" : "COPY"}</span>
          </button>
          {site.links.map((l, i) => (
            <a
              key={l.label}
              href={l.href}
              target={l.external ? "_blank" : undefined}
              rel={l.external ? "noreferrer noopener" : undefined}
              className={`border-2 border-key bg-bone px-6 py-4 font-code text-sm font-bold uppercase transition-transform hover:-translate-x-1 hover:-translate-y-1 ${HARD[(i + 1) % 3]}`}
            >
              {l.label} ↗
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function BrutalFooter() {
  return (
    <footer className="border-t-2 border-key bg-key py-8 text-bone">
      <div className="container flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="font-code text-[0.66rem] font-bold uppercase">
          {site.name} — {site.role}. Set in Anton &amp; Space Mono.
        </p>
        <div className="flex items-center gap-4 font-code text-[0.66rem] font-bold uppercase">
          <span className="inline-block h-3 w-3 bg-cyan" aria-hidden="true" />
          <span className="inline-block h-3 w-3 bg-magenta" aria-hidden="true" />
          <span className="inline-block h-3 w-3 bg-yellow" aria-hidden="true" />
          <a href="#top" className="hover:text-yellow">Back to top ↑</a>
          <span>© 2026</span>
        </div>
      </div>
    </footer>
  );
}

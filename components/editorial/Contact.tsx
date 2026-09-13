"use client";

import { useState } from "react";
import { site } from "@/lib/editorial";

export default function Contact() {
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
    <section id="contact" className="py-20 sm:py-28">
      <div className="container">
        <p className="mb-6 flex items-center gap-2 font-mono text-[0.72rem] uppercase tracking-[0.14em] text-mute">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
          {site.availability}
        </p>
        <h2 className="max-w-[18ch] font-display text-[clamp(2.4rem,6.5vw,5rem)] font-extrabold leading-[0.98] tracking-[-0.03em]">
          Have a research problem worth getting right?
        </h2>

        <div className="mt-12 flex flex-wrap items-center gap-4">
          <button
            type="button"
            onClick={copy}
            className="group flex items-center gap-3 bg-ink px-6 py-4 font-mono text-sm text-paper transition-transform hover:-translate-y-0.5"
          >
            {site.email}
            <span className="text-accent">{copied ? "copied ✓" : "copy"}</span>
          </button>
          {site.links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              target={l.external ? "_blank" : undefined}
              rel={l.external ? "noreferrer noopener" : undefined}
              className="border border-ink px-6 py-4 font-mono text-sm text-ink transition-colors hover:bg-ink hover:text-paper"
            >
              {l.label} ↗
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

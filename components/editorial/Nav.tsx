import { site } from "@/lib/editorial";

export default function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-paper/85 backdrop-blur-sm">
      <div className="container flex h-16 items-center justify-between">
        <a href="#top" className="font-display text-[0.95rem] font-extrabold tracking-tight">
          {site.name}
          <span className="text-accent">.</span>
        </a>
        <nav className="flex items-center gap-6 font-mono text-[0.72rem] uppercase tracking-[0.14em]">
          <a href="#work" className="text-mute transition-colors hover:text-ink">Work</a>
          <a href="#about" className="text-mute transition-colors hover:text-ink">About</a>
          <a
            href="#contact"
            className="border border-ink px-3 py-1.5 text-ink transition-colors hover:bg-ink hover:text-paper"
          >
            Contact
          </a>
        </nav>
      </div>
    </header>
  );
}

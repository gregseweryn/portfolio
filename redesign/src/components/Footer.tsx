import { site } from "../data/portfolio";

export default function Footer() {
  return (
    <footer className="border-t border-line py-10">
      <div className="container flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="font-mono text-[0.7rem] uppercase tracking-[0.1em] text-mute">
          {site.name} — {site.role}. Set in Archivo &amp; Inter.
        </p>
        <div className="flex items-center gap-6 font-mono text-[0.7rem] uppercase tracking-[0.1em]">
          <a href="#top" className="text-mute transition-colors hover:text-ink">Back to top ↑</a>
          <span className="text-mute">© 2026</span>
        </div>
      </div>
    </footer>
  );
}

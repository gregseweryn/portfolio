import { methods } from "@/lib/editorial";

export default function MethodsMarquee() {
  const row = [...methods, ...methods];
  return (
    <section aria-label="Methods" className="border-b border-line bg-ink py-4 text-paper">
      <div className="flex overflow-hidden">
        <ul className="marquee-track flex shrink-0 items-center gap-10 pr-10">
          {row.map((m, i) => (
            <li key={`${m}-${i}`} className="flex items-center gap-10 whitespace-nowrap">
              <span className="font-display text-lg font-semibold tracking-tight">{m}</span>
              <span className="text-accent" aria-hidden="true">✦</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

import { proof } from "@/lib/editorial";

export default function ProofBand() {
  return (
    <section aria-label="By the numbers" className="border-b border-line py-14">
      <div className="container grid grid-cols-2 gap-8 sm:grid-cols-4">
        {proof.map((p) => (
          <div key={p.label} className="border-l-2 border-line pl-4">
            <div className="font-display text-[clamp(2.2rem,5vw,3.2rem)] font-extrabold leading-none tracking-tight">
              {p.value}
            </div>
            <div className="mt-2 font-mono text-[0.7rem] uppercase tracking-[0.1em] text-mute">
              {p.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

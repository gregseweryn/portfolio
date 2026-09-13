type EvidenceData = {
  caption: string;
  unit: string;
  series: { label: string; value: number }[];
};

// Flat horizontal bars, accessible: the data is also stated in a visually
// hidden table so the chart never depends on colour or sight alone.
export default function EvidenceChart({
  data,
  compact = false,
}: {
  data: EvidenceData;
  compact?: boolean;
}) {
  const max = Math.max(...data.series.map((s) => s.value));

  return (
    <div>
      <ul className="space-y-3" aria-hidden="true">
        {data.series.map((s, i) => {
          const isLast = i === data.series.length - 1;
          return (
            <li key={s.label}>
              <div className="mb-1 flex items-baseline justify-between font-mono text-[0.7rem] uppercase tracking-[0.1em] text-mute">
                <span>{s.label}</span>
                <span className={isLast ? "text-accent" : "text-ink"}>{s.value}s</span>
              </div>
              <div className="h-2.5 w-full bg-line">
                <div
                  className={isLast ? "h-full bg-accent" : "h-full bg-ink"}
                  style={{ width: `${(s.value / max) * 100}%` }}
                />
              </div>
            </li>
          );
        })}
      </ul>
      {!compact && (
        <p className="mt-4 font-mono text-[0.7rem] uppercase tracking-[0.1em] text-mute">
          {data.unit}
        </p>
      )}
      <table className="sr-only">
        <caption>{data.caption}</caption>
        <thead>
          <tr>
            <th>Stage</th>
            <th>{data.unit}</th>
          </tr>
        </thead>
        <tbody>
          {data.series.map((s) => (
            <tr key={s.label}>
              <td>{s.label}</td>
              <td>{s.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

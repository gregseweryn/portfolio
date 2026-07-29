import Figure from "./Figure";
import data from "@/lib/data/thesis/registers.json";
import styles from "./charts.module.css";

/**
 * The study's central claim, drawn: touristification runs in two registers.
 * The economic and institutional items land on the same value in all three
 * districts; the everyday-experience items fan out by how far the district has
 * travelled. Grouping the rows by register makes the contrast the shape of the
 * chart rather than a sentence underneath it.
 */

/** Short plot labels; full questionnaire wording lives in the table below. */
const SHORT: Record<string, string> = {
  C4: "Tourism drives up rents",
  E2: "Short-term rental is a problem",
  F1: "The city manages tourism well",
  C8: "An attraction, not a home",
  C1: "Noise disrupts sleep",
};

const LABEL_X = 330;
const PLOT_X0 = 360;
const PLOT_X1 = 880;
const DOMAIN: [number, number] = [1, 5];
const ROW_H = 54;

const MARKS = [
  { district: "Old Town", shape: "circle" as const },
  { district: "Kazimierz", shape: "square" as const },
  { district: "Podgórze", shape: "triangle" as const },
];

function x(v: number) {
  const [lo, hi] = DOMAIN;
  return PLOT_X0 + ((v - lo) / (hi - lo)) * (PLOT_X1 - PLOT_X0);
}

function Mark({ shape, cx, cy, accent }: { shape: "circle" | "square" | "triangle"; cx: number; cy: number; accent?: boolean }) {
  const cls = accent ? `${styles.dot} ${styles.accentMark}` : styles.dot;
  if (shape === "circle") return <circle cx={cx} cy={cy} r={7} className={cls} />;
  if (shape === "square") return <rect x={cx - 6.5} y={cy - 6.5} width={13} height={13} className={cls} />;
  return <path d={`M ${cx} ${cy - 8} L ${cx + 7.5} ${cy + 5.5} L ${cx - 7.5} ${cy + 5.5} Z`} className={cls} />;
}

export default function DistrictGradient() {
  const cityWide = data.rows.filter((r) => r.register === "city-wide");
  const graded = data.rows.filter((r) => r.register === "graded");

  const bands = [
    {
      title: "ONE REGISTER REACHES THE WHOLE CITY",
      note: "Identical wherever you live",
      rows: cityWide,
    },
    {
      title: "ONE TRACKS THE DISTRICT'S PHASE",
      note: "Graded by how far touristification has gone",
      rows: graded,
    },
  ];

  let y = 130;
  const layout = bands.map((band) => {
    const head = y;
    y += 62;
    const rows = band.rows.map((row) => {
      const at = y;
      y += ROW_H;
      return { row, y: at };
    });
    y += 28;
    return { band, head, rows };
  });
  const height = y + 20;

  return (
    <Figure
      caption="Two registers, one process. Rent pressure, short-term rental and distrust of the city sit at the same level in all three districts. Noise and the sense of losing a home fan out sharply — Kazimierz at one end, Podgórze at the other."
      source={data.source}
      table={{
        caption: "District means by item, with effect size and significance",
        head: ["Item", "Register", ...data.districts, "Epsilon squared", "p"],
        rows: data.rows.map((r) => [
          `${r.code} — ${r.label}`,
          r.register === "city-wide" ? "City-wide" : "Graded",
          ...r.means,
          r.epsilonSq,
          r.p,
        ]),
      }}
    >
      <svg viewBox={`0 0 1000 ${height}`} className={styles.svg} aria-hidden="true">
        {/* Legend */}
        {MARKS.map((m, i) => {
          const lx = PLOT_X0 + i * 175;
          return (
            <g key={m.district}>
              <Mark shape={m.shape} cx={lx + 7} cy={32} />
              <text x={lx + 24} y={38} className={styles.legendLabel}>
                {m.district.toUpperCase()}
              </text>
            </g>
          );
        })}

        {/* Scale */}
        {[1, 2, 3, 4, 5].map((v) => (
          <g key={v}>
            <line x1={x(v)} y1={76} x2={x(v)} y2={height - 44} className={styles.gridline} />
            <text x={x(v)} y={68} className={styles.axisLabel} textAnchor="middle">
              {v}
            </text>
          </g>
        ))}
        <text x={PLOT_X1} y={height - 20} className={styles.axisLabel} textAnchor="end">
          MEAN AGREEMENT (1–5)
        </text>
        <text x={990} y={68} className={styles.axisLabel} textAnchor="end">
          ε²
        </text>

        {layout.map(({ band, head, rows }) => (
          <g key={band.title}>
            <text x={0} y={head} className={styles.bandLabel}>
              {band.title}
            </text>
            <text x={0} y={head + 22} className={styles.axisLabel}>
              {band.note}
            </text>

            {rows.map(({ row, y: ry }) => {
              const xs = row.means.map(x);
              return (
                <g key={row.code}>
                  <text x={LABEL_X} y={ry + 5} textAnchor="end" className={styles.rowLabel}>
                    {SHORT[row.code] ?? row.label}
                  </text>
                  <line
                    x1={Math.min(...xs)}
                    y1={ry}
                    x2={Math.max(...xs)}
                    y2={ry}
                    className={styles.connector}
                  />
                  {row.means.map((v, i) => (
                    <Mark key={i} shape={MARKS[i].shape} cx={x(v)} cy={ry} />
                  ))}
                  <text
                    x={990}
                    y={ry + 5}
                    textAnchor="end"
                    className={row.epsilonSq >= 0.1 ? `${styles.value} ${styles.accentText}` : styles.valueMuted}
                  >
                    {row.epsilonSq.toFixed(3)}
                  </text>
                </g>
              );
            })}
          </g>
        ))}
      </svg>
    </Figure>
  );
}

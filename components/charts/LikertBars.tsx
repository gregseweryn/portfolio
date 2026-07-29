import Figure from "./Figure";
import data from "@/lib/data/thesis/cost-items.json";
import styles from "./charts.module.css";

/**
 * Diverging Likert bars for the nine cost items. Rows are aligned on the
 * midpoint of the neutral category so the agree side of every item starts from
 * the same place and the rows are comparable at a glance.
 *
 * The one item the caption is about (C4, rents) carries the accent; every other
 * row stays monochrome.
 */

const HIGHLIGHT = "C4";

/**
 * Chart labels are shortened for the plot; the full questionnaire wording is
 * kept in the accessible table below, so nothing is lost by trimming here.
 */
const SHORT: Record<string, string> = {
  C4: "Drives up rents",
  C3: "Drives up service prices",
  C5: "Displaces everyday shops",
  C7: "District over-exploited",
  C6: "Harder to get around",
  C8: "An attraction, not a home",
  C2: "Public space less accessible",
  C1: "Noise disrupts sleep",
  C9: "A stranger in my own area",
};

const LABEL_X = 300;
const PLOT_X0 = 320;
const PLOT_X1 = 880;
const DOMAIN: [number, number] = [-62, 98];
const ROW_H = 46;
const TOP = 110;

const SEGMENT_CLASS = [styles.seg1, styles.seg2, styles.seg3, styles.seg4, styles.seg5];
const SEGMENT_NAME = [
  "Strongly disagree",
  "Disagree",
  "Neither",
  "Agree",
  "Strongly agree",
];

function x(pct: number) {
  const [lo, hi] = DOMAIN;
  return PLOT_X0 + ((pct - lo) / (hi - lo)) * (PLOT_X1 - PLOT_X0);
}

export default function LikertBars() {
  const items = data.items;
  const height = TOP + items.length * ROW_H + 40;
  const zero = x(0);

  return (
    <Figure
      caption="Costs are led by money, not by nuisance. Agreement that tourism drives up rents reaches 88%, the highest-scoring statement in the questionnaire and the one with the least spread."
      source={data.source}
      table={{
        caption: "Perceived costs of tourism, block C items, N = 446",
        head: ["Item", "Mean", "% agree", ...SEGMENT_NAME.map((s) => `${s} %`)],
        rows: items.map((it) => [
          `${it.code} – ${it.label}`,
          it.mean,
          it.agreePct,
          ...it.distribution,
        ]),
      }}
    >
      <svg viewBox={`0 0 1000 ${height}`} className={styles.svg} aria-hidden="true">
        {/* Legend, spread across the full width so the labels never collide */}
        <g>
          {SEGMENT_NAME.map((name, i) => {
            const lx = i * 196;
            return (
              <g key={name}>
                <rect x={lx} y={26} width={12} height={12} className={SEGMENT_CLASS[i]} />
                <text x={lx + 19} y={37} className={styles.legendLabel}>
                  {name.toUpperCase()}
                </text>
              </g>
            );
          })}
        </g>

        {/* Neutral midpoint */}
        <line x1={zero} y1={TOP - 20} x2={zero} y2={TOP + items.length * ROW_H - 12} className={styles.baseline} />
        <text x={zero} y={height - 12} className={styles.axisLabel} textAnchor="middle">
          NEUTRAL MIDPOINT
        </text>

        {items.map((item, row) => {
          const y = TOP + row * ROW_H;
          const d = item.distribution;
          // Start so that half the neutral band sits either side of the midpoint.
          let cursor = -(d[0] + d[1] + d[2] / 2);
          const highlight = item.code === HIGHLIGHT;

          return (
            <g key={item.code}>
              <text
                x={LABEL_X}
                y={y + 4}
                textAnchor="end"
                className={highlight ? `${styles.rowLabel} ${styles.accentText}` : styles.rowLabel}
              >
                {SHORT[item.code] ?? item.label}
              </text>

              {d.map((pct, i) => {
                const from = cursor;
                cursor += pct;
                if (pct <= 0) return null;
                // A hairline gap keeps the boundary readable even where two
                // neighbouring greys sit close together.
                const w = Math.max(x(cursor) - x(from) - 2, 0.5);
                return (
                  <rect
                    key={i}
                    x={x(from)}
                    y={y - 13}
                    width={w}
                    height={22}
                    className={SEGMENT_CLASS[i]}
                  />
                );
              })}

              <text
                x={960}
                y={y + 4}
                textAnchor="end"
                className={highlight ? `${styles.value} ${styles.accentText}` : styles.value}
              >
                {item.mean.toFixed(2)}
              </text>
              <text x={1000} y={y + 4} textAnchor="end" className={styles.rowCode}>
                {item.code}
              </text>
            </g>
          );
        })}

        <text x={960} y={TOP - 34} textAnchor="end" className={styles.axisLabel}>
          MEAN
        </text>
      </svg>
    </Figure>
  );
}

import Figure from "./Figure";
import data from "@/lib/data/rental/participants.json";
import summary from "@/lib/data/rental/summary.json";
import styles from "./charts.module.css";

/**
 * The study's headline metric: how far each participant's estimate of the first
 * month's cost sat from what the listing actually came to, in zloty.
 *
 * Every participant is drawn as their own mark rather than being folded into a
 * mean. At six and five observations the distribution is the result: one
 * participant in round one was exactly right, and saying so is the point, since
 * a bar chart of two averages would hide the only counterexample in the set.
 */

const PLOT_X0 = 330;
const PLOT_X1 = 940;
const LANE_Y = [148, 268];
const TOP_LABEL = 74;
const HEIGHT = 380;
const TICKS = [0, 1000, 2000, 3000];
const DOMAIN_MAX = 3800;
const R = 9;

function x(zl: number) {
  return PLOT_X0 + (zl / DOMAIN_MAX) * (PLOT_X1 - PLOT_X0);
}

/**
 * Marks closer than a diameter would overprint and read as one participant, so
 * a collided mark steps up instead. Deterministic, and it never moves a mark
 * along the axis it is measured on.
 */
function stack(values: number[]) {
  const placed: { zl: number; cx: number; level: number }[] = [];
  for (const zl of [...values].sort((a, b) => a - b)) {
    const cx = x(zl);
    const level = placed.filter((p) => Math.abs(p.cx - cx) < R * 2 + 2).length;
    placed.push({ zl, cx, level });
  }
  return placed;
}

const LANES = [
  {
    key: "round1",
    label: "ROUND 1",
    sub: `otodom.pl · n=${summary.round1.n}`,
    values: data.people.map((p) => p.error),
    median: summary.round1.medianError,
    accent: false,
  },
  {
    key: "retest",
    label: "RETEST",
    sub: `prototype · n=${summary.retest.n}`,
    values: data.retest.map((p) => p.error),
    median: summary.retest.medianError,
    accent: true,
  },
];

export default function ErrorShift() {
  return (
    <Figure
      caption={`Median error falls from ${summary.round1.medianError} zl to ${summary.retest.medianError} zl. The spread matters more than the midpoint: in round one, four of six participants were out by more than 2800 zl, while one was exactly right. The retest is not a like-for-like comparison, and the note below sets out why it flatters the prototype.`}
      source="Task Z3, estimate of the first month against the listing's actual total. Round 1 on otodom.pl; retest on the prototype, with three of five participants new."
      table={{
        caption: "Estimation error for the first month, by participant, in zloty",
        head: ["Round", "Participant", "Estimate", "Actual", "Error"],
        rows: [
          ...data.people.map((p) => ["Round 1", p.id, p.estimate, p.actual, p.error]),
          ...data.retest.map((p) => [
            p.returning ? "Retest (returning)" : "Retest (new)",
            p.id,
            p.estimate,
            p.actual,
            p.error,
          ]),
        ],
      }}
    >
      <svg viewBox={`0 0 1000 ${HEIGHT}`} className={styles.svg} aria-hidden="true">
        <text x={PLOT_X0} y={TOP_LABEL} className={styles.axisLabel}>
          ERROR IN THE FIRST MONTH ESTIMATE, ZLOTY
        </text>

        {TICKS.map((t) => (
          <g key={t}>
            <line x1={x(t)} y1={TOP_LABEL + 18} x2={x(t)} y2={HEIGHT - 56} className={styles.gridline} />
            <text x={x(t)} y={HEIGHT - 34} textAnchor="middle" className={styles.axisLabel}>
              {t === 0 ? "0" : `${t / 1000}k`}
            </text>
          </g>
        ))}

        {LANES.map((lane, i) => {
          const y = LANE_Y[i];
          const marks = stack(lane.values);

          return (
            <g key={lane.key}>
              <text x={PLOT_X0 - 30} y={y - 2} textAnchor="end" className={styles.rowLabel}>
                {lane.label}
              </text>
              <text x={PLOT_X0 - 30} y={y + 20} textAnchor="end" className={styles.rowCode}>
                {lane.sub}
              </text>

              <line x1={PLOT_X0} y1={y} x2={PLOT_X1} y2={y} className={styles.gridline} />

              {/* Median, drawn as a rule through the lane rather than a label,
                  so it reads as a summary of the marks and not a seventh one. */}
              {lane.median !== null && (
                <>
                  <line
                    x1={x(lane.median)}
                    y1={y - 42}
                    x2={x(lane.median)}
                    y2={y + 22}
                    className={lane.accent ? styles.accentMark : styles.baseline}
                  />
                  <text
                    x={x(lane.median)}
                    y={y - 52}
                    textAnchor="middle"
                    className={lane.accent ? `${styles.value} ${styles.accentText}` : styles.value}
                  >
                    {lane.median}
                  </text>
                </>
              )}

              {marks.map((m, j) => (
                <circle
                  key={j}
                  cx={m.cx}
                  cy={y - m.level * (R * 2 + 3)}
                  r={R}
                  className={lane.accent ? styles.accentMark : styles.dot}
                />
              ))}
            </g>
          );
        })}

        <text x={PLOT_X0 - 30} y={HEIGHT - 34} textAnchor="end" className={styles.rowCode}>
          MEDIAN
        </text>
      </svg>
    </Figure>
  );
}

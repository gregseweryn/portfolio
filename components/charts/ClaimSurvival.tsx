import Figure from "./Figure";
import data from "@/lib/data/synthetic/claims.json";
import styles from "./charts.module.css";

/**
 * The claim the whole project rests on, re-derived against the full audit.
 *
 * One axis, one quantity: how far past a 3000 zl price filter a listing's real
 * monthly cost actually lands. The narrated version quoted a range read off
 * eight listings from the top of the filter band. Laid over the 101 audited
 * listings in the same band, that range turns out to start at the median and
 * end at the maximum — it is the top half of the distribution, presented as the
 * whole of it.
 *
 * The other two claims are not on this chart. W2 is a share of pairs, not a
 * percentage overshoot, and putting it on this axis would be a second scale in
 * disguise; it is stated in the prose instead. W3 is a property of how the card
 * renders an absence and no count settles it.
 */

const PLOT_X0 = 300;
const PLOT_X1 = 940;
const HEIGHT = 320;
const TOP_LABEL = 58;
const LANE_Y = [150, 244];
const DOMAIN = [0, 40];
const TICKS = [0, 10, 20, 30, 40];
const BAR_H = 16;

const w1 = data.W1;
const narrated = w1.asNarrated;
const measured = w1.reDerived;

function x(percent: number) {
  return PLOT_X0 + ((percent - DOMAIN[0]) / (DOMAIN[1] - DOMAIN[0])) * (PLOT_X1 - PLOT_X0);
}

export default function ClaimSurvival() {
  return (
    <Figure
      caption={`The claim holds: ${measured.share}% of the ${measured.n} audited listings priced between 2500 and 3000 zl cost more than 3000 zl once the administrative rent is added. The narrated range is where it slipped. ${narrated.overshootLow}–${narrated.overshootHigh}% was read off ${narrated.n} listings, and against the full band it runs from the median to the maximum. The typical overshoot is ${measured.overshootMedian}%, not ${narrated.overshootLow}%.`}
      source={`Amount by which real monthly cost exceeds a 3000 zl price filter, for two-room listings advertised at 2500–3000 zl. Re-derived on the 423-listing Otodom audit of 4 August 2026.`}
      table={{
        caption: "Overshoot past a 3000 zl price filter, as narrated against as measured",
        head: ["Source", "Listings", "Share exceeding the filter", "Overshoot range", "Median overshoot"],
        rows: [
          [
            "As narrated",
            narrated.n,
            `${narrated.share}%`,
            `${narrated.overshootLow}–${narrated.overshootHigh}%`,
            "not stated",
          ],
          [
            "Re-derived on the audit",
            measured.n,
            `${measured.share}%`,
            `${measured.overshootMin}–${measured.overshootMax}%`,
            `${measured.overshootMedian}%`,
          ],
        ],
      }}
    >
      <svg viewBox={`0 0 1000 ${HEIGHT}`} className={styles.svg} aria-hidden="true">
        <text x={PLOT_X0} y={TOP_LABEL} className={styles.axisLabel}>
          REAL COST OVER THE 3000 ZL FILTER, PER CENT
        </text>

        {TICKS.map((t) => (
          <g key={t}>
            <line x1={x(t)} y1={TOP_LABEL + 16} x2={x(t)} y2={HEIGHT - 62} className={styles.gridline} />
            <text x={x(t)} y={HEIGHT - 40} textAnchor="middle" className={styles.axisLabel}>
              {t}
            </text>
          </g>
        ))}

        {/* As narrated: a flat band, quoted with no middle. */}
        <text x={PLOT_X0 - 26} y={LANE_Y[0] - 2} textAnchor="end" className={styles.rowLabel}>
          AS NARRATED
        </text>
        <text x={PLOT_X0 - 26} y={LANE_Y[0] + 20} textAnchor="end" className={styles.rowCode}>
          {narrated.n} listings, top of the band
        </text>
        <rect
          x={x(narrated.overshootLow)}
          y={LANE_Y[0] - BAR_H / 2}
          width={x(narrated.overshootHigh) - x(narrated.overshootLow)}
          height={BAR_H}
          className={styles.accentMark}
        />
        <text
          x={x(narrated.overshootLow) - 12}
          y={LANE_Y[0] + 6}
          textAnchor="end"
          className={`${styles.value} ${styles.accentText}`}
        >
          {narrated.overshootLow}
        </text>
        <text x={x(narrated.overshootHigh) + 12} y={LANE_Y[0] + 6} className={`${styles.value} ${styles.accentText}`}>
          {narrated.overshootHigh}
        </text>

        {/* As measured: the same quantity with a shape. */}
        <text x={PLOT_X0 - 26} y={LANE_Y[1] - 2} textAnchor="end" className={styles.rowLabel}>
          AS MEASURED
        </text>
        <text x={PLOT_X0 - 26} y={LANE_Y[1] + 20} textAnchor="end" className={styles.rowCode}>
          {measured.n} listings, {measured.band}
        </text>
        <line
          x1={x(measured.overshootMin)}
          y1={LANE_Y[1]}
          x2={x(measured.overshootMax)}
          y2={LANE_Y[1]}
          className={styles.baseline}
        />
        <rect
          x={x(measured.overshootP10)}
          y={LANE_Y[1] - BAR_H / 2}
          width={x(measured.overshootP90) - x(measured.overshootP10)}
          height={BAR_H}
          className={styles.dot}
        />
        <line
          x1={x(measured.overshootMedian)}
          y1={LANE_Y[1] - BAR_H - 6}
          x2={x(measured.overshootMedian)}
          y2={LANE_Y[1] + BAR_H + 6}
          className={styles.baseline}
        />
        <text x={x(measured.overshootMedian)} y={LANE_Y[1] - BAR_H - 14} textAnchor="middle" className={styles.value}>
          {measured.overshootMedian}
        </text>

        {/* Where the narrated floor lands on the measured distribution. */}
        <line
          x1={x(narrated.overshootLow)}
          y1={LANE_Y[0] + BAR_H}
          x2={x(narrated.overshootLow)}
          y2={LANE_Y[1] - BAR_H}
          className={styles.gridline}
          strokeDasharray="4 5"
        />

        <text x={PLOT_X0 - 26} y={HEIGHT - 40} textAnchor="end" className={styles.rowCode}>
          MEDIAN, P10–P90, RANGE
        </text>
      </svg>
    </Figure>
  );
}

import Figure from "./Figure";
import data from "@/lib/data/synthetic/distributions.json";
import styles from "./charts.module.css";

/**
 * The study's headline: the generated corpus lands on the market's median and
 * misses its shape entirely.
 *
 * Drawn as two ranges on one axis rather than as two bars, because a bar of
 * medians would show the two sources agreeing — which is exactly the reading
 * this chart exists to prevent. The scenario budget is marked because the
 * generated band is centred on it rather than on the market: the model produced
 * the neighbourhood of the task it was given, not a sample of Krakow.
 */

const PLOT_X0 = 320;
const PLOT_X1 = 950;
const HEIGHT = 340;
const TOP_LABEL = 60;
const LANE_Y = [150, 250];
const DOMAIN = [1500, 6300];
const TICKS = [2000, 3000, 4000, 5000, 6000];
const BAR_H = 16;

function x(zl: number) {
  return PLOT_X0 + ((zl - DOMAIN[0]) / (DOMAIN[1] - DOMAIN[0])) * (PLOT_X1 - PLOT_X0);
}

const measured = data.basePrice.measured;
const generated = data.basePrice.generated;
const budget = data.basePrice.scenarioBudget;

const LANES = [
  {
    key: "measured",
    label: "MEASURED",
    sub: `otodom.pl · n=${measured.n}`,
    stats: measured,
    accent: false,
  },
  {
    key: "generated",
    label: "GENERATED",
    sub: `model corpus · n=${generated.n}`,
    stats: generated,
    accent: true,
  },
];

export default function VarianceCollapse() {
  return (
    <Figure
      caption={`Both sources agree on the middle and disagree about everything else. The measured listings run from ${measured.min} to ${measured.max} zl with a standard deviation of ${measured.sd}; the generated corpus spans ${generated.min} to ${generated.max} with a standard deviation of ${generated.sd}. The generated band is not a sample of the market. It is the neighbourhood of the ${budget} zl budget the sessions were written around.`}
      source={`Advertised rent for two-room flats. Measured: the 423-listing Otodom audit of 4 August 2026. Generated: the synthetic corpus produced for sessions that were never run.`}
      table={{
        caption: "Advertised rent for two-room flats, generated corpus against the measured audit, in zloty",
        head: ["Source", "n", "Min", "p10", "Median", "p90", "Max", "SD"],
        rows: LANES.map((l) => [
          l.label === "MEASURED" ? "Measured audit" : "Generated corpus",
          l.stats.n,
          l.stats.min,
          l.stats.p10,
          l.stats.median,
          l.stats.p90,
          l.stats.max,
          l.stats.sd,
        ]),
      }}
    >
      <svg viewBox={`0 0 1000 ${HEIGHT}`} className={styles.svg} aria-hidden="true">
        <text x={PLOT_X0} y={TOP_LABEL} className={styles.axisLabel}>
          ADVERTISED RENT, ZLOTY PER MONTH
        </text>

        {TICKS.map((t) => (
          <g key={t}>
            <line x1={x(t)} y1={TOP_LABEL + 16} x2={x(t)} y2={HEIGHT - 62} className={styles.gridline} />
            <text x={x(t)} y={HEIGHT - 40} textAnchor="middle" className={styles.axisLabel}>
              {t / 1000}k
            </text>
          </g>
        ))}

        {/* The budget the sessions were written around. Dashed so it reads as a
            reference the market knows nothing about, not as a data value. */}
        <line
          x1={x(budget)}
          y1={TOP_LABEL + 16}
          x2={x(budget)}
          y2={HEIGHT - 62}
          className={styles.baseline}
          strokeDasharray="5 5"
        />
        <text x={x(budget)} y={TOP_LABEL - 18} textAnchor="middle" className={styles.rowCode}>
          SCENARIO BUDGET
        </text>

        {LANES.map((lane, i) => {
          const y = LANE_Y[i];
          const s = lane.stats;
          const mark = lane.accent ? styles.accentMark : styles.dot;
          const rule = lane.accent ? styles.accentMark : styles.baseline;

          return (
            <g key={lane.key}>
              <text x={PLOT_X0 - 28} y={y - 2} textAnchor="end" className={styles.rowLabel}>
                {lane.label}
              </text>
              <text x={PLOT_X0 - 28} y={y + 20} textAnchor="end" className={styles.rowCode}>
                {lane.sub}
              </text>

              {/* Full range as a hairline, the middle eighty per cent as a bar:
                  the outer whisker is where the market lives and the corpus does not. */}
              <line x1={x(s.min)} y1={y} x2={x(s.max)} y2={y} className={rule} />
              <rect
                x={x(s.p10)}
                y={y - BAR_H / 2}
                width={Math.max(2, x(s.p90) - x(s.p10))}
                height={BAR_H}
                className={mark}
              />
              <line
                x1={x(s.median)}
                y1={y - BAR_H - 6}
                x2={x(s.median)}
                y2={y + BAR_H + 6}
                className={styles.baseline}
              />
              <text x={x(s.median)} y={y - BAR_H - 14} textAnchor="middle" className={styles.value}>
                {s.median}
              </text>

              <text x={x(s.min)} y={y + BAR_H + 22} textAnchor="middle" className={styles.valueMuted}>
                {s.min}
              </text>
              <text x={x(s.max)} y={y + BAR_H + 22} textAnchor="middle" className={styles.valueMuted}>
                {s.max}
              </text>
            </g>
          );
        })}

        <text x={PLOT_X0 - 28} y={HEIGHT - 40} textAnchor="end" className={styles.rowCode}>
          MEDIAN, P10–P90, RANGE
        </text>
      </svg>
    </Figure>
  );
}

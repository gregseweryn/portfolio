import Figure from "./Figure";
import models from "@/lib/data/thesis/models.json";
import styles from "./charts.module.css";

/**
 * One component, both models. The attitude model plots standardised betas on a
 * linear scale centred on zero; the move-out model plots odds ratios on a log
 * scale centred on one. Non-significant terms are drawn faintly, because the
 * point of both charts is how much of the row is empty.
 */

type Variant = "attitude" | "move-out";

const LABEL_X = 300;
const PLOT_X0 = 330;
const PLOT_X1 = 900;
const ROW_H = 42;
const TOP = 92;

const CONFIG = {
  attitude: {
    model: models.ols,
    log: false,
    domain: [-0.72, 0.72] as [number, number],
    ticks: [-0.6, -0.3, 0, 0.3, 0.6],
    origin: 0,
    axis: "STANDARDISED β",
    format: (v: number) => v.toFixed(2),
    caption:
      "Attitude is a balance sheet, not a demographic. Perceived costs and benefits carry the whole model; age, gender, tenure, occupation and ownership sit flat on zero.",
    tableCaption: "OLS coefficients predicting general attitude to tourism",
    valueHead: "β",
  },
  "move-out": {
    model: models.logit,
    log: true,
    domain: [0.28, 9] as [number, number],
    ticks: [0.5, 1, 2, 4, 8],
    origin: 1,
    axis: "ODDS RATIO (LOG SCALE)",
    format: (v: number) => (v >= 1 ? v.toFixed(2) : v.toFixed(2)),
    caption:
      "Costs push far harder than benefits hold. A standard deviation more perceived cost multiplies the odds of seriously considering leaving by 5.5; owning your home roughly halves them.",
    tableCaption: "Logistic regression predicting serious consideration of moving out",
    valueHead: "Odds ratio",
  },
} as const;

export default function ForestPlot({ variant }: { variant: Variant }) {
  const cfg = CONFIG[variant];
  const { model } = cfg;
  const terms = model.terms;

  const [lo, hi] = cfg.domain;
  const x = (v: number) => {
    const t = cfg.log
      ? (Math.log(Math.min(Math.max(v, lo), hi)) - Math.log(lo)) / (Math.log(hi) - Math.log(lo))
      : (Math.min(Math.max(v, lo), hi) - lo) / (hi - lo);
    return PLOT_X0 + t * (PLOT_X1 - PLOT_X0);
  };

  const height = TOP + terms.length * ROW_H + 56;
  const originX = x(cfg.origin);

  const fit =
    "r2" in model
      ? `N = ${model.n} · R² = ${model.r2.toFixed(2)}`
      : `N = ${model.n} · ${model.events} events · pseudo-R² = ${model.pseudoR2.toFixed(2)}`;

  return (
    <Figure
      caption={cfg.caption}
      source={`${model.source} · ${fit}`}
      table={{
        caption: cfg.tableCaption,
        head: ["Predictor", cfg.valueHead, "95% CI lower", "95% CI upper", "p"],
        rows: terms.map((t) => [t.term, t.estimate, t.ciLow, t.ciHigh, t.p]),
      }}
    >
      <svg viewBox={`0 0 1000 ${height}`} className={styles.svg} aria-hidden="true">
        <text x={0} y={34} className={styles.bandLabel}>
          {model.outcome.toUpperCase()}
        </text>
        <text x={0} y={58} className={styles.axisLabel}>
          {fit}
        </text>

        {/* Scale */}
        {cfg.ticks.map((t) => (
          <g key={t}>
            <line x1={x(t)} y1={TOP - 26} x2={x(t)} y2={TOP + terms.length * ROW_H - 18} className={styles.gridline} />
            <text x={x(t)} y={TOP - 34} className={styles.axisLabel} textAnchor="middle">
              {t}
            </text>
          </g>
        ))}
        <line
          x1={originX}
          y1={TOP - 26}
          x2={originX}
          y2={TOP + terms.length * ROW_H - 18}
          className={styles.baseline}
        />
        <text x={PLOT_X1} y={height - 16} className={styles.axisLabel} textAnchor="end">
          {cfg.axis}
        </text>

        {terms.map((t, row) => {
          const y = TOP + row * ROW_H;
          const sig = t.significant;
          return (
            <g key={t.term}>
              <text
                x={LABEL_X}
                y={y + 5}
                textAnchor="end"
                className={sig ? styles.rowLabel : `${styles.rowLabel} ${styles.markMuted}`}
              >
                {t.term}
              </text>

              <line
                x1={x(t.ciLow)}
                y1={y}
                x2={x(t.ciHigh)}
                y2={y}
                className={sig ? styles.interval : styles.intervalMuted}
              />
              <circle
                cx={x(t.estimate)}
                cy={y}
                r={sig ? 6.5 : 4}
                className={sig ? styles.dot : styles.markMuted}
              />

              <text
                x={990}
                y={y + 5}
                textAnchor="end"
                className={sig ? styles.value : styles.valueMuted}
              >
                {cfg.format(t.estimate)}
              </text>
            </g>
          );
        })}

        <text x={990} y={TOP - 34} textAnchor="end" className={styles.axisLabel}>
          {cfg.valueHead.toUpperCase()}
        </text>
      </svg>
    </Figure>
  );
}

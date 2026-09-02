import Figure from "./Figure";
import data from "@/lib/data/synthetic/constants.json";
import styles from "./charts.module.css";

/**
 * How many different values each variable took. Where the count is one, the
 * model substituted a rule for a distribution.
 *
 * The rows are split by what they can be checked against, because that split is
 * the study's own thesis. Two variables have a measured arbiter in the audit.
 * Two do not, and never will from this data: no listing in the audit stated
 * utilities or a deposit, so their reference is a web-anchored construction and
 * the chart says so rather than letting the reader assume otherwise.
 */

const PLOT_X0 = 340;
const PLOT_X1 = 900;
const HEIGHT = 400;
const TOP = 116;
const ROW_H = 66;
const BAR_H = 15;
const DOMAIN_MAX = 90;

function x(n: number) {
  return PLOT_X0 + (n / DOMAIN_MAX) * (PLOT_X1 - PLOT_X0);
}

// Anchored rows first: they are the ones with a standard deviation of zero, and
// the ones whose reference the reader should trust least.
const ORDER = ["Utilities", "Deposit, multiple of rent", "Administrative rent", "Advertised rent"];
const rows = ORDER.map((v) => data.variables.find((r) => r.variable === v)!).filter(Boolean);
const dividerAfter = rows.filter((r) => r.groundTruth === "web-anchor").length;

export default function ConstantsNotDistributions() {
  return (
    <Figure
      caption={`Across twenty-four generated listings, utilities took one value and the deposit took one value: 300 zl and one month's rent, every time, with a standard deviation of exactly zero. The two variables the model did vary, it varied over a smaller vocabulary than the market uses. A constant is what a rule looks like when it is asked to stand in for a distribution.`}
      source={`Distinct values per variable. Administrative and advertised rent are compared against the measured 423-listing audit. Utilities and deposit have no measured arbiter — no audited card stated either — so they are compared against a web-anchored reference set of 250 listings.`}
      table={{
        caption: "Distinct values and standard deviation per variable, generated corpus against its reference",
        head: [
          "Variable",
          "Distinct values, generated",
          "SD, generated",
          "Distinct values, reference",
          "SD, reference",
          "Reference class",
        ],
        rows: rows.map((r) => [
          r.variable,
          `${r.uniqueGenerated} of ${r.nGenerated}`,
          r.sdGenerated ?? "—",
          `${r.uniqueReference} of ${r.nReference}`,
          r.sdReference ?? "—",
          r.groundTruth === "measured" ? "Measured audit" : "Web anchor",
        ]),
      }}
    >
      <svg viewBox={`0 0 1000 ${HEIGHT}`} className={styles.svg} aria-hidden="true">
        <text x={PLOT_X0} y={40} className={styles.axisLabel}>
          DISTINCT VALUES THE VARIABLE TOOK
        </text>
        <text x={PLOT_X0} y={68} className={styles.rowCode}>
          REFERENCE ABOVE · GENERATED BELOW
        </text>

        {[0, 30, 60, 90].map((t) => (
          <g key={t}>
            <line x1={x(t)} y1={TOP - 22} x2={x(t)} y2={HEIGHT - 52} className={styles.gridline} />
            <text x={x(t)} y={HEIGHT - 30} textAnchor="middle" className={styles.axisLabel}>
              {t}
            </text>
          </g>
        ))}

        {rows.map((r, i) => {
          const y = TOP + i * ROW_H;
          return (
            <g key={r.variable}>
              <text x={PLOT_X0 - 26} y={y + 2} textAnchor="end" className={styles.rowLabel}>
                {r.variable}
              </text>
              <text x={PLOT_X0 - 26} y={y + 22} textAnchor="end" className={styles.rowCode}>
                {r.groundTruth === "measured" ? "MEASURED" : "ANCHOR"}
              </text>

              {/* Reference behind, generated in front: the generated bar is the
                  subject, and on two rows it is a single value wide. */}
              <rect
                x={PLOT_X0}
                y={y - BAR_H - 3}
                width={Math.max(2, x(r.uniqueReference) - PLOT_X0)}
                height={BAR_H}
                className={styles.markMuted}
              />
              <text
                x={x(r.uniqueReference) + 10}
                y={y - BAR_H + 9}
                className={styles.valueMuted}
              >
                {r.uniqueReference}
              </text>

              <rect
                x={PLOT_X0}
                y={y + 4}
                width={Math.max(3, x(r.uniqueGenerated) - PLOT_X0)}
                height={BAR_H}
                className={r.uniqueGenerated === 1 ? styles.accentMark : styles.dot}
              />
              <text
                x={x(r.uniqueGenerated) + 10}
                y={y + BAR_H + 1}
                className={r.uniqueGenerated === 1 ? `${styles.value} ${styles.accentText}` : styles.value}
              >
                {r.uniqueGenerated}
              </text>
            </g>
          );
        })}

        {/* The line between what can be checked and what cannot. */}
        <line
          x1={PLOT_X0 - 300}
          y1={TOP + dividerAfter * ROW_H - 30}
          x2={PLOT_X1}
          y2={TOP + dividerAfter * ROW_H - 30}
          className={styles.gridline}
          strokeDasharray="4 6"
        />

      </svg>
    </Figure>
  );
}

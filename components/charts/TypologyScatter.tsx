import Figure from "./Figure";
import data from "@/lib/data/thesis/typology.json";
import styles from "./charts.module.css";

/**
 * The typology, drawn honestly. Two clusters are shown — but so is the diagonal
 * they lie along, because the indices correlate at −0.73 and the split is a way
 * of naming the poles of a continuum, not evidence of two separate populations.
 * Drawing the caveat is more convincing than writing it.
 */

const PLOT_X0 = 120;
const PLOT_X1 = 620;
const PLOT_Y0 = 70;
const PLOT_Y1 = 570;
const DOMAIN: [number, number] = [1, 5];

const x = (v: number) => PLOT_X0 + ((v - DOMAIN[0]) / (DOMAIN[1] - DOMAIN[0])) * (PLOT_X1 - PLOT_X0);
const y = (v: number) => PLOT_Y1 - ((v - DOMAIN[0]) / (DOMAIN[1] - DOMAIN[0])) * (PLOT_Y1 - PLOT_Y0);

export default function TypologyScatter() {
  const conflict = data.clusters.find((c) => c.name === "In conflict")!;
  const reconciled = data.clusters.find((c) => c.name === "Reconciled")!;

  return (
    <Figure
      caption={`Two types, one axis. 57% sit in conflict and 43% reconciled, but the indices correlate at ${data.correlation}, so the clusters lie along a single diagonal. The typology names the poles of a continuum; it does not prove two separate populations exist.`}
      source={data.source}
      table={{
        caption: "Resident typology, k-means on standardised cost and benefit indices",
        head: ["Type", "n", "% of sample", "Cost index", "Benefit index", "% considering moving out"],
        rows: data.clusters.map((c) => [
          c.name,
          c.n,
          c.sharePct,
          c.costs,
          c.benefits,
          c.consideringMovePct,
        ]),
      }}
    >
      <svg viewBox="0 0 1000 660" className={styles.svg} aria-hidden="true">
        {/* Scale */}
        {[1, 2, 3, 4, 5].map((v) => (
          <g key={v}>
            <line x1={x(v)} y1={PLOT_Y0} x2={x(v)} y2={PLOT_Y1} className={styles.gridline} />
            <line x1={PLOT_X0} y1={y(v)} x2={PLOT_X1} y2={y(v)} className={styles.gridline} />
            <text x={x(v)} y={PLOT_Y1 + 26} className={styles.axisLabel} textAnchor="middle">
              {v}
            </text>
            <text x={PLOT_X0 - 14} y={y(v) + 5} className={styles.axisLabel} textAnchor="end">
              {v}
            </text>
          </g>
        ))}

        <text x={PLOT_X1} y={PLOT_Y1 + 54} className={styles.axisLabel} textAnchor="end">
          PERCEIVED COSTS →
        </text>
        <text
          x={0}
          y={0}
          transform={`translate(${PLOT_X0 - 52} ${PLOT_Y0}) rotate(-90)`}
          className={styles.axisLabel}
          textAnchor="end"
        >
          ← PERCEIVED BENEFITS
        </text>

        {/* The diagonal the clusters lie along — the caveat, drawn */}
        <line
          x1={x(1.2)}
          y1={y(4.6)}
          x2={x(4.9)}
          y2={y(1.6)}
          className={styles.intervalMuted}
          strokeDasharray="6 6"
        />

        {/* Respondents */}
        <g>
          {data.points.map((p, i) => (
            <circle
              key={i}
              cx={x(p.x)}
              cy={y(p.y)}
              r={4}
              className={p.c === "In conflict" ? styles.dot : styles.dotOpen}
              opacity={p.c === "In conflict" ? 0.42 : 0.7}
            />
          ))}
        </g>

        {/* Centroids */}
        {data.clusters.map((c) => (
          <g key={c.name}>
            <path
              d={`M ${x(c.costs) - 11} ${y(c.benefits)} H ${x(c.costs) + 11} M ${x(c.costs)} ${y(c.benefits) - 11} V ${y(c.benefits) + 11}`}
              className={styles.accentMark}
              strokeWidth={3}
            />
          </g>
        ))}

        {/* Cluster read-out */}
        <g transform="translate(680 96)">
          <text x={0} y={0} className={styles.bandLabel}>
            IN CONFLICT
          </text>
          <text x={0} y={30} className={styles.value}>
            {conflict.sharePct}% of the sample
          </text>
          <text x={0} y={58} className={styles.valueMuted}>
            costs {conflict.costs} · benefits {conflict.benefits}
          </text>
          <text x={0} y={82} className={`${styles.valueMuted} ${styles.accentText}`}>
            {conflict.consideringMovePct}% considering leaving
          </text>

          <text x={0} y={162} className={styles.bandLabel}>
            RECONCILED
          </text>
          <text x={0} y={192} className={styles.value}>
            {reconciled.sharePct}% of the sample
          </text>
          <text x={0} y={220} className={styles.valueMuted}>
            costs {reconciled.costs} · benefits {reconciled.benefits}
          </text>
          <text x={0} y={244} className={`${styles.valueMuted} ${styles.accentText}`}>
            {reconciled.consideringMovePct}% considering leaving
          </text>

          <g transform="translate(0 300)">
            <circle cx={6} cy={-4} r={4} className={styles.dot} opacity={0.42} />
            <text x={20} y={0} className={styles.legendLabel}>
              IN CONFLICT
            </text>
            <circle cx={6} cy={24} r={4} className={styles.dotOpen} />
            <text x={20} y={28} className={styles.legendLabel}>
              RECONCILED
            </text>
            <path d="M 0 48 H 12 M 6 42 V 54" className={styles.accentMark} strokeWidth={3} />
            <text x={20} y={56} className={styles.legendLabel}>
              CLUSTER CENTRE
            </text>
          </g>
        </g>
      </svg>
    </Figure>
  );
}

import styles from "./DistrictPhases.module.css";

/**
 * The study's sampling logic in one image: three districts chosen as three
 * phases of the same process, positioned by the cost index they actually
 * reported. The spacing is the finding — the two advanced districts land on top
 * of each other, and Podgórze sits apart.
 *
 * Means from thesis table 4.7; see lib/data/thesis/SOURCES.md.
 */

const X0 = 110;
const X1 = 900;
const DOMAIN: [number, number] = [3.1, 3.95];
const AXIS_Y = 300;

function x(value: number) {
  const [lo, hi] = DOMAIN;
  return X0 + ((value - lo) / (hi - lo)) * (X1 - X0);
}

const DISTRICTS = [
  {
    name: "Podgórze",
    phase: "Being drawn in",
    costs: 3.21,
    n: 144,
    direction: "up" as const,
    stem: 200,
    accent: true,
  },
  {
    name: "Old Town",
    phase: "Mature touristification",
    costs: 3.84,
    n: 156,
    direction: "up" as const,
    stem: 150,
    accent: false,
  },
  {
    name: "Kazimierz",
    phase: "Rapid, rental- and nightlife-driven",
    costs: 3.86,
    n: 146,
    direction: "down" as const,
    stem: 380,
    accent: false,
  },
];

export default function DistrictPhases({ caption }: { caption: string }) {
  return (
    <figure className={styles.figure}>
      <svg
        viewBox="0 0 1000 470"
        className={styles.svg}
        role="img"
        aria-labelledby="district-phases-title district-phases-desc"
      >
        <title id="district-phases-title">
          Three Kraków districts positioned by perceived cost of tourism
        </title>
        <desc id="district-phases-desc">
          Podgórze sits at 3.21 on the cost index, well to the left. Old Town at
          3.84 and Kazimierz at 3.86 sit almost on top of each other at the right.
          A dashed arrow runs from Podgórze towards them, marking the trajectory
          its residents expect to follow.
        </desc>

        <text x={X0} y={58} className={styles.kicker}>
          SAMPLING LOGIC
        </text>
        <text x={X0} y={96} className={styles.headline}>
          Three districts, one process
        </text>

        {/* Anticipation: Podgórze residents describe the others as their future */}
        <g className={styles.anticipation}>
          <path
            d={`M ${x(3.26)} 258 L ${x(3.76)} 258`}
            strokeDasharray="4 7"
            markerEnd="url(#phase-arrow-accent)"
          />
          <text x={(x(3.26) + x(3.76)) / 2} y={242} className={styles.anticipationLabel}>
            ANTICIPATED TRAJECTORY
          </text>
        </g>

        {/* Axis */}
        <line
          x1={X0}
          y1={AXIS_Y}
          x2={X1}
          y2={AXIS_Y}
          className={styles.axis}
          markerEnd="url(#phase-arrow)"
        />
        <text x={X1} y={AXIS_Y + 34} className={styles.axisLabel} textAnchor="end">
          PERCEIVED COST OF TOURISM (INDEX 1–5)
        </text>

        {DISTRICTS.map((d) => {
          const cx = x(d.costs);
          const up = d.direction === "up";
          // The name is set at 26px, so the two lines need more than the 20px
          // gap their baselines would suggest or their boxes collide.
          const nameY = up ? d.stem - 40 : d.stem + 30;
          const phaseY = up ? d.stem - 14 : d.stem + 56;
          return (
            <g key={d.name} className={d.accent ? styles.markAccent : styles.mark}>
              <line x1={cx} y1={AXIS_Y} x2={cx} y2={d.stem} className={styles.stem} />
              <circle cx={cx} cy={AXIS_Y} r={7} className={styles.dot} />
              <text x={cx} y={nameY} className={styles.name} textAnchor="middle">
                {d.name}
              </text>
              <text x={cx} y={phaseY} className={styles.phase} textAnchor="middle">
                {d.phase} · n = {d.n} · {d.costs.toFixed(2)}
              </text>
            </g>
          );
        })}

        <defs>
          <marker
            id="phase-arrow"
            viewBox="0 0 10 10"
            refX="9"
            refY="5"
            markerWidth="7"
            markerHeight="7"
            orient="auto-start-reverse"
          >
            <path d="M 0 1 L 9 5 L 0 9" className={styles.arrowhead} />
          </marker>
          <marker
            id="phase-arrow-accent"
            viewBox="0 0 10 10"
            refX="9"
            refY="5"
            markerWidth="7"
            markerHeight="7"
            orient="auto-start-reverse"
          >
            <path d="M 0 1 L 9 5 L 0 9" className={styles.arrowheadAccent} />
          </marker>
        </defs>
      </svg>
      <figcaption className={styles.caption}>{caption}</figcaption>
    </figure>
  );
}

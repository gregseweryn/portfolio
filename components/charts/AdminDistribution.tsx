import Figure from "./Figure";
import data from "@/lib/data/synthetic/distributions.json";
import styles from "./charts.module.css";

/**
 * Where the generated corpus put its weight, against where the market puts its.
 *
 * The measured side is a histogram because 208 listings support one. The
 * generated side is twenty-three dots, one per listing, because twenty-three do
 * not: binning them into a curve would dress a handful of decisions up as a
 * distribution. The reader can count them, which is the honest presentation of
 * a corpus this small.
 *
 * The accent is spent on the region above 900 zl and nowhere else. That is the
 * finding: the model treated the market's expensive tail as its typical case.
 */

const PLOT_X0 = 150;
const PLOT_X1 = 960;
const HEIGHT = 430;
const BASE_Y = 250;
const TOP_Y = 108;
const DOT_Y = 322;
const DOMAIN = [0, 1500];
const Y_MAX = 25; // per cent of the corpus in one 100 zl bin
const R = 7;
const TAIL = 900;

const admin = data.adminRent;
const bins = admin.measuredBins;
const width = ((PLOT_X1 - PLOT_X0) / (DOMAIN[1] - DOMAIN[0])) * admin.binWidth;

function x(zl: number) {
  return PLOT_X0 + ((zl - DOMAIN[0]) / (DOMAIN[1] - DOMAIN[0])) * (PLOT_X1 - PLOT_X0);
}

function y(share: number) {
  return BASE_Y - (share / Y_MAX) * (BASE_Y - TOP_Y);
}

/** One dot per generated listing, placed at its bin's midpoint and stacked on collision. */
function dots() {
  const out: { cx: number; level: number; from: number }[] = [];
  for (const b of admin.generatedBins) {
    for (let k = 0; k < b.n; k++) {
      out.push({ cx: x(b.from + admin.binWidth / 2), level: k, from: b.from });
    }
  }
  return out;
}

const measuredShare = (n: number) => (100 * n) / admin.measured.n;

export default function AdminDistribution() {
  return (
    <Figure
      caption={`Administrative rent above 900 zl a month is uncommon: ${admin.shareAbove900.measured}% of the measured listings. In the generated corpus it is ${admin.shareAbove900.generated}%, more than twice as often. The medians are close, ${admin.generated.median} zl against ${admin.measured.median}, so the error is not in the middle of the distribution. It is in how often the model reached for the end of it.`}
      source={`Administrative rent on two-room listings. Measured: ${admin.measured.n} of the 423 audited listings state one. Generated: ${admin.generated.n} listings from the synthetic corpus, drawn individually because that many do not make a distribution.`}
      table={{
        caption: "Administrative rent per 100 zl band, measured audit against the generated corpus",
        head: ["Band, zl", "Measured, n", "Measured, % of corpus", "Generated, n"],
        rows: [
          ...bins.map((b, i) => [
            `${b.from}–${b.to}`,
            b.n,
            `${measuredShare(b.n).toFixed(1)}%`,
            admin.generatedBins[i].n,
          ]),
          ["Median", admin.measured.median, "—", admin.generated.median],
          [
            "Share above 900 zl",
            `${admin.shareAbove900.measured}%`,
            "—",
            `${admin.shareAbove900.generated}%`,
          ],
        ],
      }}
    >
      <svg viewBox={`0 0 1000 ${HEIGHT}`} className={styles.svg} aria-hidden="true">
        <text x={PLOT_X0} y={40} className={styles.axisLabel}>
          ADMINISTRATIVE RENT, ZLOTY PER MONTH
        </text>
        <text x={PLOT_X0} y={68} className={styles.rowCode}>
          MEASURED AUDIT, SHARE OF LISTINGS PER BAND
        </text>

        {/* The tail the caption is about, shaded once rather than colouring
            every mark inside it. */}
        <rect
          x={x(TAIL)}
          y={TOP_Y - 20}
          width={PLOT_X1 - x(TAIL)}
          height={DOT_Y + 60 - (TOP_Y - 20)}
          className={styles.accentMark}
          opacity={0.07}
        />
        <text x={x(TAIL) + 10} y={68} className={`${styles.rowCode} ${styles.accentText}`}>
          ABOVE 900 ZL
        </text>

        {[0, 10, 20].map((s) => (
          <g key={s}>
            <line x1={PLOT_X0} y1={y(s)} x2={PLOT_X1} y2={y(s)} className={styles.gridline} />
            <text x={PLOT_X0 - 14} y={y(s) + 5} textAnchor="end" className={styles.axisLabel}>
              {s}%
            </text>
          </g>
        ))}

        {bins.map((b) => {
          const h = BASE_Y - y(measuredShare(b.n));
          return (
            <rect
              key={b.from}
              // A 2px gap between neighbouring bars, so the histogram reads as
              // counted bands rather than one continuous mass.
              x={x(b.from) + 1}
              y={y(measuredShare(b.n))}
              width={Math.max(1, width - 2)}
              height={Math.max(0, h)}
              className={styles.dot}
            />
          );
        })}

        <line x1={PLOT_X0} y1={BASE_Y} x2={PLOT_X1} y2={BASE_Y} className={styles.baseline} />

        {[0, 300, 600, 900, 1200, 1500].map((t) => (
          <text key={t} x={x(t)} y={BASE_Y + 24} textAnchor="middle" className={styles.axisLabel}>
            {t}
          </text>
        ))}

        <text x={PLOT_X0} y={DOT_Y - 16} className={styles.rowCode}>
          GENERATED CORPUS, ONE MARK PER LISTING
        </text>
        {dots().map((d, i) => (
          <circle
            key={i}
            cx={d.cx}
            cy={DOT_Y + 14 + d.level * (R * 2 + 3)}
            r={R}
            className={d.from >= TAIL ? styles.accentMark : styles.dotOpen}
          />
        ))}
      </svg>
    </Figure>
  );
}

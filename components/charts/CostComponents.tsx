import Figure from "./Figure";
import data from "@/lib/data/rental/cost-components.json";
import styles from "./charts.module.css";

/**
 * How many participants named each component of the monthly cost, unprompted,
 * when asked what the flat would cost them in the first month.
 *
 * Counts out of six, so the bars are drawn as six discrete cells rather than a
 * continuous length. A smooth bar at this sample size invites the eye to read a
 * proportion that six observations cannot support.
 *
 * The accent sits on the administrative rent: it is the component the study is
 * about, and the two participants who left it out produced the two largest
 * estimation errors in the round.
 */

const HIGHLIGHT = "czynsz_administracyjny";

const PLOT_X0 = 340;
const CELL = 78;
const CELL_GAP = 10;
const ROW_H = 52;
const TOP = 92;

export default function CostComponents() {
  const items = data.items;
  const of = items[0]?.of ?? 6;
  const height = TOP + items.length * ROW_H + 30;

  return (
    <Figure
      caption="Only the headline rent is counted by everyone. Every other component of the monthly cost is named by some participants and missed by others, and the administrative rent, which is the largest of them, is missed by two of six."
      source={data.source}
      table={{
        caption: "Cost components named unprompted in task Z3, n = 6",
        head: ["Component", "Named by", "Of"],
        rows: items.map((it) => [it.label, it.count, it.of]),
      }}
    >
      <svg viewBox={`0 0 1000 ${height}`} className={styles.svg} aria-hidden="true">
        <text x={PLOT_X0} y={TOP - 40} className={styles.axisLabel}>
          PARTICIPANTS WHO NAMED IT
        </text>

        {items.map((item, row) => {
          const y = TOP + row * ROW_H;
          const highlight = item.key === HIGHLIGHT;

          return (
            <g key={item.key}>
              <text
                x={PLOT_X0 - 24}
                y={y + 5}
                textAnchor="end"
                className={highlight ? `${styles.rowLabel} ${styles.accentText}` : styles.rowLabel}
              >
                {item.label}
              </text>

              {/* One cell per participant: filled if they named it, hollow if
                  not. The empty cells carry the finding as much as the full
                  ones, so they stay visible rather than being left blank. */}
              {Array.from({ length: of }, (_, i) => {
                const filled = i < item.count;
                const x = PLOT_X0 + i * (CELL + CELL_GAP);
                return (
                  <rect
                    key={i}
                    x={x}
                    y={y - 13}
                    width={CELL}
                    height={24}
                    className={
                      filled
                        ? highlight
                          ? styles.accentMark
                          : styles.seg5
                        : styles.seg3
                    }
                  />
                );
              })}

              <text
                x={1000}
                y={y + 5}
                textAnchor="end"
                className={highlight ? `${styles.value} ${styles.accentText}` : styles.value}
              >
                {item.count}/{of}
              </text>
            </g>
          );
        })}
      </svg>
    </Figure>
  );
}

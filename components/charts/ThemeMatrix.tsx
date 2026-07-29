import Figure from "./Figure";
import data from "@/lib/data/thesis/themes.json";
import styles from "./charts.module.css";

/**
 * The coding matrix, published rather than summarised. Eleven themes against ten
 * interviewees, with the intensity of each. Claims like "9 of 10 raised STR
 * regulation unprompted" are checkable against this grid instead of taken on
 * trust — which is the whole reason to show it.
 */

const LABEL_X = 330;
const GRID_X0 = 356;
const CELL_W = 60;
const ROW_H = 44;
const TOP = 150;

export default function ThemeMatrix() {
  const { respondents, themes } = data;
  const height = TOP + themes.length * ROW_H + 70;

  return (
    <Figure
      caption="The coding trail, not just the conclusion. Every theme is shown against every interviewee, so the counts quoted in the text can be checked, including the one theme all ten raised and the demand for short-term rental regulation that nine of them brought up unprompted."
      source={data.source}
      table={{
        caption: "Theme by interviewee, coded 0 absent / 1 present / 2 central",
        head: ["Theme", ...respondents.map((r) => r.name)],
        rows: themes.map((t) => [`${t.code} – ${t.label}`, ...t.intensity]),
      }}
    >
      <svg viewBox={`0 0 1000 ${height}`} className={styles.svg} aria-hidden="true">
        {/* Interviewee names, angled so the columns stay narrow */}
        {respondents.map((r, i) => {
          const cx = GRID_X0 + i * CELL_W + CELL_W / 2;
          return (
            <text
              key={r.name}
              transform={`translate(${cx} ${TOP - 26}) rotate(-52)`}
              className={styles.rowCode}
            >
              {r.name.toUpperCase()}
            </text>
          );
        })}

        {themes.map((theme, row) => {
          const y = TOP + row * ROW_H;
          const inductive = theme.origin === "inductive";
          return (
            <g key={theme.code}>
              <text x={LABEL_X} y={y + 5} textAnchor="end" className={styles.rowLabel}>
                {theme.label}
              </text>
              <text x={LABEL_X} y={y + 23} textAnchor="end" className={styles.rowCode}>
                {theme.code} · {inductive ? "INDUCTIVE" : "DEDUCTIVE"}
              </text>

              {theme.intensity.map((level, i) => {
                const cx = GRID_X0 + i * CELL_W + CELL_W / 2;
                if (level === 0) {
                  return <circle key={i} cx={cx} cy={y} r={2} className={styles.markMuted} />;
                }
                if (level === 1) {
                  return <circle key={i} cx={cx} cy={y} r={8} className={styles.dotOpen} />;
                }
                return <circle key={i} cx={cx} cy={y} r={11} className={styles.dot} />;
              })}
            </g>
          );
        })}

        {/* Legend */}
        <g transform={`translate(${GRID_X0} ${height - 34})`}>
          <circle cx={6} cy={-4} r={2} className={styles.markMuted} />
          <text x={22} y={0} className={styles.legendLabel}>
            ABSENT
          </text>
          <circle cx={146} cy={-4} r={8} className={styles.dotOpen} />
          <text x={166} y={0} className={styles.legendLabel}>
            PRESENT
          </text>
          <circle cx={300} cy={-4} r={11} className={styles.dot} />
          <text x={322} y={0} className={styles.legendLabel}>
            CENTRAL
          </text>
        </g>
      </svg>
    </Figure>
  );
}

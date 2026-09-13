import Reveal from "@/components/Reveal";
import data from "@/lib/data/thesis/joint-display.json";
import styles from "./JointDisplay.module.css";

/**
 * The joint display is genuinely tabular, so it stays an HTML table rather than
 * becoming an SVG — it copies, reflows and reads aloud correctly that way.
 *
 * The convergence column is the point of the artifact: it records where the two
 * strands agree and, more usefully, the one dimension where they don't.
 */
export default function JointDisplay() {
  return (
    <Reveal as="figure" className={styles.figure}>
      {/* Below 780px this box scrolls, and a box that only a mouse can scroll
          hides the two right-hand columns from a keyboard user entirely
          (WCAG 2.2 SC 2.1.1). Same treatment as `Figure`: a labelled tab stop,
          so whoever lands there is told what they are about to scroll. */}
      <div className={styles.scroll} tabIndex={0} role="group" aria-label={data.note}>
        <table className={styles.table}>
          <caption className="sr-only">
            Joint display integrating survey results (N = 446) with interview themes (N = 10)
          </caption>
          <thead>
            <tr>
              <th scope="col">Dimension</th>
              <th scope="col">Survey, N = 446</th>
              <th scope="col">Interviews, N = 10</th>
              <th scope="col">Integration</th>
            </tr>
          </thead>
          <tbody>
            {data.rows.map((row) => (
              <tr
                key={row.dimension}
                className={row.convergence === "tension" ? styles.tension : undefined}
              >
                <th scope="row">{row.dimension}</th>
                <td>{row.quantitative}</td>
                <td>{row.qualitative}</td>
                <td>
                  <span className={styles.verdict}>
                    {row.convergence === "tension"
                      ? "Tension"
                      : row.convergence === "partial"
                        ? "Partial"
                        : "Convergent"}
                  </span>
                  {row.convergenceNote && (
                    <span className={styles.note}>{row.convergenceNote}</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <figcaption className={styles.caption}>
        <span className={styles.captionText}>{data.note}</span>
        <span className={styles.source}>{data.source}</span>
      </figcaption>
    </Reveal>
  );
}

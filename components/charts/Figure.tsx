import type { ReactNode } from "react";
import Reveal from "@/components/Reveal";
import styles from "./charts.module.css";

export type DataTable = {
  caption: string;
  head: string[];
  rows: (string | number)[][];
};

type Props = {
  /** States the finding, not the axes. */
  caption: string;
  /** Where the numbers come from, so a reader can check them. */
  source: string;
  children: ReactNode;
  /**
   * The chart's numbers as a real table, available to screen readers. A chart
   * without one is a chart that excludes part of its audience — not a defensible
   * position in a research portfolio.
   */
  table: DataTable;
};

export default function Figure({ caption, source, children, table }: Props) {
  return (
    <Reveal as="figure" className={styles.figure}>
      {/* On narrow screens this box scrolls, which makes the browser give it a
          tab stop. Labelling it means a keyboard user who lands there is told
          what they're about to scroll instead of hitting a silent group. */}
      <div className={styles.plot} tabIndex={0} role="group" aria-label={caption}>
        {children}
      </div>

      {/* The wrapper carries .sr-only, not the table: a table ignores width:1px
          and lays out to its content, which would push the page sideways. */}
      <div className="sr-only">
        <table>
          <caption>{table.caption}</caption>
          <thead>
            <tr>
              {table.head.map((h) => (
                <th key={h} scope="col">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {table.rows.map((row, i) => (
              <tr key={i}>
                {row.map((cell, j) =>
                  j === 0 ? (
                    <th key={j} scope="row">
                      {cell}
                    </th>
                  ) : (
                    <td key={j}>{cell}</td>
                  )
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <figcaption className={styles.caption}>
        <span className={styles.captionText}>{caption}</span>
        <span className={styles.source}>{source}</span>
      </figcaption>
    </Reveal>
  );
}

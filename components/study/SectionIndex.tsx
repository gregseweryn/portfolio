import ActiveSection from "./ActiveSection";
import ReadingProgress from "./ReadingProgress";
import styles from "./SectionIndex.module.css";

/**
 * Contents for a long case study, as a native <details> in a bar that sticks
 * under the site nav.
 *
 * Why a disclosure rather than a rail: the section grid already gives its left
 * column to the sticky section heading, and the page container leaves no room
 * for a second column of labels at any width below about 1500px. A rail would
 * have existed only on the widest screens. This is available at every width and
 * at any scroll depth, and it costs one line of height when closed.
 *
 * <details> and real anchors mean the whole thing works with no JavaScript:
 * open, close, jump. The only scripted part is the progress hairline.
 */
/**
 * Short labels, not the section headings. The headings are full claims, and
 * twelve of those stacked in a panel is a wall rather than a contents list.
 */
export type SectionLink = { id: string; label: string };

export default function SectionIndex({ sections }: { sections: SectionLink[] }) {
  return (
    <nav className={styles.wrap} aria-label="Sections in this study">
      <details className={styles.details}>
        <summary className={styles.summary}>
          <ActiveSection sections={sections} />
          <span className={styles.chevron} aria-hidden="true" />
        </summary>
        <ol className={styles.list}>
          {sections.map((s) => (
            <li key={s.id}>
              <a href={`#${s.id}`} className={styles.link}>
                {s.label}
              </a>
            </li>
          ))}
        </ol>
      </details>
      <ReadingProgress />
    </nav>
  );
}

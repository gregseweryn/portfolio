import MediaFrame from "@/components/MediaFrame";
import { CHARTS } from "@/components/charts/registry";
import type { Block } from "@/lib/studies";
import styles from "./StudyBlocks.module.css";

/**
 * Renders one content block of a case study. Every block kind gets its own
 * branch — the study data stays declarative, and adding a kind means adding a
 * branch here rather than a bespoke page.
 */
export default function StudyBlock({ block }: { block: Block }) {
  switch (block.kind) {
    case "prose":
      return (
        <div className={styles.prose}>
          {block.body.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      );

    case "media":
      return (
        <div className={styles.media}>
          <MediaFrame label={block.label} ratio={block.ratio} />
        </div>
      );

    case "figure": {
      const Chart = CHARTS[block.chart];
      return <Chart />;
    }

    case "stats":
      return (
        <dl className={styles.stats}>
          {block.items.map((item) => (
            <div key={item.label} className={styles.stat}>
              <dt className={styles.statValue}>{item.value}</dt>
              <dd className={styles.statLabel}>
                {item.label}
                {item.note && <span className={styles.statNote}>{item.note}</span>}
              </dd>
            </div>
          ))}
        </dl>
      );

    case "quote":
      return (
        <figure className={styles.quote}>
          <blockquote className={styles.quoteOriginal} lang="pl">
            {block.original}
          </blockquote>
          <p className={styles.quoteTranslation} lang="en">
            {block.translation}
          </p>
          <figcaption className={styles.quoteAttribution}>
            <span className={styles.quoteSpeaker}>{block.speaker}</span>
            {block.context && <span className={styles.quoteContext}>{block.context}</span>}
          </figcaption>
        </figure>
      );

    case "note":
      return (
        <details className={styles.note}>
          <summary className={styles.noteSummary}>
            <span className={styles.noteMarker} aria-hidden="true" />
            {block.title}
          </summary>
          <div className={styles.noteBody}>
            {block.body.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </details>
      );

    case "callout":
      return (
        <aside className={styles.callout}>
          <p className={styles.calloutLabel}>{block.label}</p>
          <div className={styles.calloutBody}>
            {block.body.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </aside>
      );

    case "list":
      // Unordered on purpose: these are parallel points, not a sequence, so
      // numbering them would imply an order the content doesn't have.
      return (
        <ul className={styles.list}>
          {block.items.map((item) => (
            <li key={item.title} className={styles.listItem}>
              <h3 className={styles.listTitle}>{item.title}</h3>
              <p className={styles.listBody}>{item.body}</p>
            </li>
          ))}
        </ul>
      );

    default:
      return null;
  }
}

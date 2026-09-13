import Image from "next/image";
import MediaFrame from "@/components/MediaFrame";
import ZoomLink from "./ZoomLink";
import { CHARTS } from "@/components/charts/registry";
import type { Block, StudyImage } from "@/lib/studies";
import styles from "./StudyBlocks.module.css";

/**
 * One image, sized honestly.
 *
 * `sizes` has to describe the CSS width the image will occupy, or the browser
 * picks a source for the wrong width and the picture is either upscaled or
 * over-fetched. When the block caps its display width, that cap is the answer;
 * otherwise the caller passes the column's measured width.
 */
function StudyPicture({ image, fallbackSizes }: { image: StudyImage; fallbackSizes: string }) {
  const capped = image.maxWidth !== undefined;
  return (
    // Every study picture is enlargeable. These are interface captures drawn at
    // 1440 and shown in a text column or, in a compare pair, in half of one;
    // read at that size the tables in them are texture rather than evidence,
    // and the argument depends on the reader being able to check them.
    <ZoomLink src={image.src} alt={image.alt} width={image.width} height={image.height}>
      <Image
        src={image.src}
        alt={image.alt}
        width={image.width}
        height={image.height}
        sizes={capped ? `${image.maxWidth}px` : fallbackSizes}
        className={capped ? `${styles.image} ${styles.imageCapped}` : styles.image}
        style={capped ? { maxWidth: image.maxWidth } : undefined}
      />
    </ZoomLink>
  );
}

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
      // The id is stamped on the wrapper so scripts/extract-chart-svgs.mjs can
      // name what it pulls out of the built HTML. Without it the export has to
      // infer a chart's identity from its caption, and an edited caption would
      // silently rename a file the Figma file links to.
      return (
        <div data-chart={block.chart} className={styles.chartWrap}>
          <Chart />
        </div>
      );
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

    case "image":
      return (
        <figure className={styles.imageBlock}>
          <StudyPicture image={block.image} fallbackSizes="(max-width: 900px) 100vw, 1130px" />
          {block.caption && <figcaption className={styles.imageCaption}>{block.caption}</figcaption>}
        </figure>
      );

    case "compare":
      // One figure, not two. The pair is the argument, so a screen reader that
      // meets the caption first is told what it is about to compare.
      return (
        <figure className={styles.compare}>
          <div className={styles.comparePair}>
            {([
              [block.before, block.beforeLabel ?? "Before"],
              [block.after, block.afterLabel ?? "After"],
            ] as const).map(([img, label]) => (
              <div key={label} className={styles.compareItem}>
                <p className={styles.compareLabel}>{label}</p>
                <StudyPicture image={img} fallbackSizes="(max-width: 40rem) 100vw, 560px" />
              </div>
            ))}
          </div>
          <figcaption className={styles.imageCaption}>{block.caption}</figcaption>
        </figure>
      );

    case "gallery": {
      const columns = block.columns ?? 3;
      // One figure with one caption, for the same reason `compare` is one: the
      // frames are a single argument — three budgets in one filter — and reading
      // them as three separate pictures loses it.
      return (
        <figure className={styles.compare}>
          <div
            className={styles.gallery}
            style={{ ["--gallery-cols" as string]: String(columns) }}
            data-cols={columns}
          >
            {block.images.map((img) => (
              <div key={img.src} className={styles.compareItem}>
                {img.label && <p className={styles.compareLabel}>{img.label}</p>}
                <StudyPicture
                  image={img}
                  fallbackSizes={`(max-width: 48rem) 100vw, ${Math.round(1128 / columns)}px`}
                />
              </div>
            ))}
          </div>
          <figcaption className={styles.imageCaption}>{block.caption}</figcaption>
        </figure>
      );
    }
  }

  // Every branch above returns, so this is unreachable — and the assignment is
  // what makes it a compile error to add a block kind and forget to render it.
  // A silently blank block is the failure this replaces.
  const unhandled: never = block;
  return unhandled;
}

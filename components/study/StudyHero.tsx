import Image from "next/image";
import type { ChartId, Study } from "@/lib/studies";
import { CHARTS } from "@/components/charts/registry";
import DistrictPhases from "./DistrictPhases";
import ZoomLink from "./ZoomLink";
import MediaFrame from "@/components/MediaFrame";
import styles from "./StudyHero.module.css";

/**
 * The one place that decides what a study looks like.
 *
 * It used to be two hand-written ternaries, one on the study page and one on the
 * home page, which is how a study ends up looking like two different things
 * depending on where you meet it. The home-page thumbnail would have made three.
 *
 * `variant` is about the frame, never the content: the same study shows the same
 * artifact wherever it appears.
 */

type Props = {
  study: Study;
  variant: "page" | "card" | "thumb";
};

/**
 * Charts are drawn in a 1000-unit space with 15px type in it. Shrink one into a
 * 220px thumbnail and that type lands at about three pixels — a smudge with the
 * silhouette of a chart. So a thumbnail shows a real region of the plot at a
 * readable size instead of the whole thing at an unreadable one.
 *
 * `viewBox` is the chart's own, `crop` is the region to show, both in its units.
 */
const THUMB_CROP: Partial<Record<ChartId, { viewBox: [number, number]; crop: [number, number, number, number] }>> = {
  // Empty while no published study leads with a chart. A study whose hero is a
  // chart adds its entry here; without one the thumbnail falls back to the whole
  // plot, which is the unreadable case this map exists to avoid.
};

export default function StudyHero({ study, variant }: Props) {
  const hero = study.hero;
  const isThumb = variant === "thumb";

  switch (hero.kind) {
    case "placeholder":
      return <MediaFrame label={hero.label} ratio={hero.ratio} size={isThumb ? "md" : "lg"} />;

    case "diagram":
      // The caption explains the diagram; at thumbnail size there is no room to
      // read it, and the study title beside it already says as much.
      return <DistrictPhases caption={isThumb ? undefined : hero.caption} />;

    case "image": {
      // Only the study page enlarges its hero. The card and the thumbnail are
      // links to the study, and a second, competing link inside them would be
      // both a nested anchor and an offer to inspect a picture the reader has
      // not decided to read yet.
      const image = (
        <Image
            src={hero.image.src}
            alt={hero.image.alt}
            width={hero.image.width}
            height={hero.image.height}
            sizes={isThumb ? "240px" : `${hero.image.maxWidth ?? 900}px`}
            className={isThumb ? styles.thumbImage : styles.image}
            // The cap goes through a custom property rather than max-width
            // directly: an inline max-width beats any stylesheet rule, so a
            // 420px cap would still be 420px inside a 375px phone and push the
            // page sideways. As a property the stylesheet can take the smaller
            // of the two.
            style={
              isThumb || !hero.image.maxWidth
                ? undefined
                : ({ ["--cap" as string]: `${hero.image.maxWidth}px` } as React.CSSProperties)
            }
            priority={variant === "page"}
          />
      );
      return (
        <figure className={isThumb ? styles.thumbFigure : styles.imageFigure}>
          {variant === "page" ? (
            <ZoomLink
              src={hero.image.src}
              alt={hero.image.alt}
              width={hero.image.width}
              height={hero.image.height}
            >
              {image}
            </ZoomLink>
          ) : (
            image
          )}
          {variant === "page" && <figcaption className={styles.caption}>{hero.caption}</figcaption>}
        </figure>
      );
    }

    case "chart": {
      const Chart = CHARTS[hero.chart];
      const crop = THUMB_CROP[hero.chart];

      if (!isThumb || !crop) {
        return (
          <div data-chart={hero.chart} className={styles.chartWrap}>
            <Chart />
          </div>
        );
      }

      // The chart renders at the inner element's width. Widening the inner
      // element past the frame and shifting it left and up brings the wanted
      // region into a frame that clips the rest — a crop, done in layout rather
      // than by re-rendering the chart at a second set of coordinates.
      const [vbW, vbH] = crop.viewBox;
      const [x, y, w, h] = crop.crop;

      return (
        <div className={styles.thumbChart} data-chart={hero.chart} aria-hidden="true">
          <div
            className={styles.thumbChartInner}
            style={{
              width: `${(vbW / w) * 100}%`,
              // The crop fills the frame's width exactly, so only the vertical
              // offset needs centring: put the crop's midpoint on the frame's,
              // rather than pinning its top edge and leaving a band of empty
              // surface underneath.
              transform: `translate(${(-x / vbW) * 100}%, ${(-(y + h / 2) / vbH) * 100}%)`,
            }}
          >
            <Chart />
          </div>
        </div>
      );
    }
  }
}

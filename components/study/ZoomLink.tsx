import type { ReactNode } from "react";
import styles from "./ZoomLink.module.css";

/**
 * Wraps a study screenshot in the affordance that enlarges it.
 *
 * It is an anchor to the source file, not a button, and that is the whole
 * no-JavaScript story: with the overlay script absent or broken the link still
 * opens the full-resolution capture. `ImageZoom` intercepts the click when it
 * is running and shows the same file in an overlay instead, so the script
 * improves a behaviour that already works rather than supplying one.
 *
 * The chip earns its place: a dense interface screenshot fitted to a text
 * column is unreadable, and nothing else on the page says the reader can do
 * something about that. `aria-label` carries the alt text so a screen reader
 * hears what the link opens rather than the word "Enlarge" eight times.
 */
export default function ZoomLink({
  src,
  alt,
  width,
  height,
  children,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  children: ReactNode;
}) {
  return (
    <a
      href={src}
      className={styles.zoom}
      data-zoom
      data-zoom-alt={alt}
      data-zoom-width={width}
      data-zoom-height={height}
      aria-label={`Enlarge: ${alt}`}
    >
      {children}
      <span className={styles.chip} aria-hidden="true">
        Enlarge
      </span>
    </a>
  );
}

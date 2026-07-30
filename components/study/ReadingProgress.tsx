"use client";

import { useEffect, useRef } from "react";
import styles from "./ReadingProgress.module.css";

/**
 * How far through the argument the reader is, as a hairline under the contents
 * bar. On a twelve-section, twenty-screen page "how much is left" is real
 * information, not decoration.
 *
 * Measured against the <article>, not the document, so it reads 100% where the
 * argument ends rather than at the bottom of the footer.
 *
 * aria-hidden on purpose: a value that changes on every scroll frame is noise
 * in a screen reader, and the contents list already exposes the structure.
 */
export default function ReadingProgress() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bar = ref.current;
    if (!bar) return;
    const article = bar.closest("article");
    if (!article) return;

    let frame = 0;

    const measure = () => {
      frame = 0;
      const { top, height } = article.getBoundingClientRect();
      // Distance already scrolled past the article's start, over the distance
      // there is to travel before its end reaches the bottom of the viewport.
      const travelled = -top;
      const total = height - window.innerHeight;
      const ratio = total > 0 ? travelled / total : 0;
      bar.style.setProperty("--progress", String(Math.min(1, Math.max(0, ratio))));
    };

    const onScroll = () => {
      // One write per frame: the scroll event fires far more often than that,
      // and Lenis drives window.scrollTo so it fires here too.
      if (!frame) frame = requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return <div ref={ref} className={styles.bar} aria-hidden="true" />;
}

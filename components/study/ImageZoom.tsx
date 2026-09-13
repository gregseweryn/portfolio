"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./ImageZoom.module.css";

type Shot = { src: string; alt: string; width: number; height: number };

/**
 * The overlay behind every study screenshot.
 *
 * Mounted once per study page. It listens for clicks on the anchors `ZoomLink`
 * renders and shows the same file full size instead of navigating, so with this
 * script absent the anchors still work — the enlargement is an improvement on a
 * working link, never the only way to reach the file.
 *
 * The element is a native `<dialog>` opened with `showModal`, which is what
 * buys the behaviour a hand-built overlay has to reimplement badly: focus moves
 * in and is trapped, the page behind goes inert, Escape closes, and focus
 * returns to the link that opened it.
 */
export default function ImageZoom() {
  const ref = useRef<HTMLDialogElement>(null);
  const [shot, setShot] = useState<Shot | null>(null);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      // Leave every deliberate "open this somewhere else" alone: a middle
      // click, a modified click and a right click all mean the reader wants the
      // file itself, and an overlay would be the wrong answer to all three.
      if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

      const link = (e.target as HTMLElement | null)?.closest<HTMLAnchorElement>("a[data-zoom]");
      if (!link) return;

      const width = Number(link.dataset.zoomWidth);
      const height = Number(link.dataset.zoomHeight);
      if (!width || !height) return;

      e.preventDefault();
      setShot({
        src: link.getAttribute("href") ?? "",
        alt: link.dataset.zoomAlt ?? "",
        width,
        height,
      });
    }

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  // showModal has to run after the dialog has content, or the first frame is an
  // empty modal.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (shot && !el.open) el.showModal();
    if (!shot && el.open) el.close();
  }, [shot]);

  function close() {
    setShot(null);
  }

  return (
    <dialog
      ref={ref}
      className={styles.dialog}
      aria-label={shot ? `Enlarged: ${shot.alt}` : undefined}
      onClose={close}
      // Clicking the backdrop closes. The dialog element itself is the backdrop
      // once its content is a child, so the check is whether the click landed on
      // the dialog rather than inside the figure.
      onClick={(e) => {
        if (e.target === ref.current) close();
      }}
    >
      {shot && (
        <figure className={styles.figure}>
          {/* Focusable on purpose: it is where the overlay puts focus, so the
              arrow keys pan the capture the moment it opens. */}
          <div className={styles.scroll} tabIndex={0}>
            {/* Deliberately not next/image: this is the enlargement, so it wants
                the original file at its own size rather than a resized one
                chosen for a column that is no longer the constraint. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={shot.src}
              alt={shot.alt}
              width={shot.width}
              height={shot.height}
              className={styles.image}
            />
          </div>
          <figcaption className={styles.caption}>
            <span className={styles.captionText}>{shot.alt}</span>
            <button type="button" className={styles.close} onClick={close}>
              Close
            </button>
          </figcaption>
        </figure>
      )}
    </dialog>
  );
}

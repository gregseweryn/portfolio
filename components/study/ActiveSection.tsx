"use client";

import { useEffect, useState } from "react";
import type { SectionLink } from "./SectionIndex";
import styles from "./SectionIndex.module.css";

/**
 * Names the section the reader is currently inside, in the one line of chrome
 * that is on screen for the whole case study.
 *
 * The sticky section heading only holds for as long as its own intro grid, which
 * measured at roughly 300px of a 1400px section: for the other 70%, the part
 * carrying the charts and the method notes, nothing on screen said which
 * argument it belonged to. This does.
 *
 * The accessible name stays "Contents, N sections" no matter what is on screen.
 * A control whose name changes to "Two registers" while a screen reader user
 * scrolls is a control that has stopped describing what it does.
 *
 * Without JavaScript the server-rendered fallback stands and the bar reads
 * "Contents" exactly as before.
 */

/** Where a section starts counting as the current one: just under the sticky bar. */
const LINE = 140;

export default function ActiveSection({ sections }: { sections: SectionLink[] }) {
  const [activeId, setActiveId] = useState<string | null>(null);

  // The section ids are what this actually depends on. The array itself is built
  // inline by the page on every render, so depending on the array would tear the
  // listener down and rebuild it each time.
  const ids = sections.map((s) => s.id).join(",");

  useEffect(() => {
    const els = ids
      .split(",")
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (!els.length) return;

    let frame = 0;

    // The last section whose top has passed the line is the one being read.
    const pick = () => {
      frame = 0;
      let current: string | null = null;
      for (const el of els) {
        if (el.getBoundingClientRect().top <= LINE) current = el.id;
        else break;
      }
      setActiveId(current);
    };

    // Same shape as ReadingProgress in this bar: a passive scroll listener
    // throttled to one read per frame. Deliberately not an IntersectionObserver,
    // which would be a second mechanism for the same job in the same component,
    // and would only update on boundary crossings.
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(pick);
    };

    pick();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [ids]);

  const index = activeId ? sections.findIndex((s) => s.id === activeId) : -1;
  const label = index >= 0 ? sections[index].label : "Contents";
  const count = index >= 0 ? `${index + 1} of ${sections.length}` : `${sections.length} sections`;

  return (
    <>
      <span className="sr-only">Contents, {sections.length} sections</span>
      <span className={styles.label} aria-hidden="true">
        {label}
      </span>
      <span className={styles.count} aria-hidden="true">
        {count}
      </span>
    </>
  );
}

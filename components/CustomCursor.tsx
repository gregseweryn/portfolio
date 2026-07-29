"use client";

import { useEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import styles from "./CustomCursor.module.css";

/**
 * A mix-blend-difference dot that follows the pointer and grows over
 * interactive elements. Pointer-fine + motion-allowed only; the element is
 * always rendered (hidden) so touch/keyboard users get the native cursor.
 */
export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    if (!dot) return;
    if (prefersReducedMotion() || !window.matchMedia("(pointer: fine)").matches) return;

    document.documentElement.classList.add("has-custom-cursor");
    const xTo = gsap.quickTo(dot, "x", { duration: 0.22, ease: "power3.out" });
    const yTo = gsap.quickTo(dot, "y", { duration: 0.22, ease: "power3.out" });
    let shown = false;

    const onMove = (e: PointerEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
      if (!shown) {
        shown = true;
        gsap.to(dot, { autoAlpha: 1, duration: 0.2 });
      }
      const interactive = (e.target as HTMLElement)?.closest?.("a, button, [data-cursor]");
      dot.classList.toggle(styles.active, !!interactive);
    };
    const onLeave = () => {
      shown = false;
      gsap.to(dot, { autoAlpha: 0, duration: 0.2 });
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);

    return () => {
      document.documentElement.classList.remove("has-custom-cursor");
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <div ref={dotRef} className={styles.cursor} aria-hidden="true">
      <span className={styles.dot} />
    </div>
  );
}

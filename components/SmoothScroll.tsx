"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";

/**
 * Lenis smooth scroll, synced to GSAP's ticker so ScrollTrigger stays in lock-step.
 * Disabled entirely under prefers-reduced-motion (native scroll takes over).
 */
export default function SmoothScroll() {
  useEffect(() => {
    if (prefersReducedMotion()) return;

    const lenis = new Lenis({ duration: 1.05, lerp: 0.1, smoothWheel: true });

    lenis.on("scroll", ScrollTrigger.update);

    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    // Smooth in-page anchor jumps (e.g. "Work" -> /#work on the home page).
    const onClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement)?.closest?.("a");
      if (!anchor) return;
      const href = anchor.getAttribute("href") || "";
      const hashIndex = href.indexOf("#");
      if (hashIndex < 0) return;
      const id = href.slice(hashIndex);
      if (id.length < 2) return;
      const samePage =
        href.startsWith("#") || (href.startsWith("/#") && location.pathname === "/");
      if (!samePage) return;
      const target = document.querySelector(id);
      if (target) {
        e.preventDefault();
        lenis.scrollTo(target as HTMLElement, { offset: -80 });
        history.pushState(null, "", id);
      }
    };
    document.addEventListener("click", onClick);

    // Honour a hash present on load (e.g. arriving at /#work from another page).
    if (location.hash) {
      const target = document.querySelector(location.hash);
      if (target) {
        requestAnimationFrame(() =>
          lenis.scrollTo(target as HTMLElement, { offset: -80, immediate: true })
        );
      }
    }

    return () => {
      document.removeEventListener("click", onClick);
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, []);

  return null;
}

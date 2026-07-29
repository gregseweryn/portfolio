"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";

const ANCHOR_OFFSET = -80;

/**
 * Lenis smooth scroll, synced to GSAP's ticker so ScrollTrigger stays in lock-step.
 * Disabled entirely under prefers-reduced-motion (native scroll takes over).
 */
export default function SmoothScroll() {
  const pathname = usePathname();
  const lenisRef = useRef<Lenis | null>(null);
  // The route effect also fires on mount, where the setup effect below has
  // already dealt with any hash and the browser may be restoring a position.
  const mounted = useRef(false);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const lenis = new Lenis({ duration: 1.05, lerp: 0.1, smoothWheel: true });
    lenisRef.current = lenis;

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
        lenis.scrollTo(target as HTMLElement, { offset: ANCHOR_OFFSET });
        history.pushState(null, "", id);
      }
    };
    document.addEventListener("click", onClick);

    // Honour a hash present on load (e.g. arriving at /#work from another page).
    if (location.hash) {
      const target = document.querySelector(location.hash);
      if (target) {
        requestAnimationFrame(() =>
          lenis.scrollTo(target as HTMLElement, { offset: ANCHOR_OFFSET, immediate: true })
        );
      }
    }

    return () => {
      document.removeEventListener("click", onClick);
      gsap.ticker.remove(raf);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // Next resets the window scroll on navigation, but Lenis keeps its own position
  // and drives window.scrollTo itself, so that reset never lands — without this
  // the visitor opens a new route already scrolled into its middle.
  useEffect(() => {
    const lenis = lenisRef.current;
    // No instance means reduced motion: native scroll, and Next's own reset works.
    if (!lenis) return;
    if (!mounted.current) {
      mounted.current = true;
      return;
    }

    // A frame's grace so the incoming route is laid out before Lenis measures it.
    const frame = requestAnimationFrame(() => {
      lenis.resize();
      // Cross-page anchors (/about -> /#work) must land on the section, not the top.
      const hash = window.location.hash;
      const target = hash.length > 1 ? document.querySelector(hash) : null;
      if (target) {
        lenis.scrollTo(target as HTMLElement, { offset: ANCHOR_OFFSET, immediate: true });
      } else {
        lenis.scrollTo(0, { immediate: true });
      }
      ScrollTrigger.refresh();
    });

    return () => cancelAnimationFrame(frame);
  }, [pathname]);

  return null;
}

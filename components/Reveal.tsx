"use client";

import { useEffect, useLayoutEffect, useRef, type ElementType, type ReactNode } from "react";

// useLayoutEffect on the client, useEffect on the server (avoids SSR warning).
const useIsoLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

type Props = {
  children: ReactNode;
  as?: ElementType;
  delay?: number;
  className?: string;
  /** Anchor target, so a revealed section can also be a link destination. */
  id?: string;
};

/**
 * Scroll-reveal that ENHANCES an already-visible default. The hidden initial
 * state is applied in a layout effect (client only), so no-JS, reduced-motion,
 * and headless renders always paint full, visible content.
 */
export default function Reveal({ children, as: Tag = "div", delay = 0, className, id }: Props) {
  const ref = useRef<HTMLElement>(null);

  useIsoLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const allowsMotion = window.matchMedia("(prefers-reduced-motion: no-preference)").matches;
    if (!allowsMotion || !("IntersectionObserver" in window)) return;

    el.dataset.reveal = "";
    if (delay) el.style.setProperty("--reveal-delay", `${delay}ms`);

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const target = entry.target as HTMLElement;
            target.classList.add("is-visible");
            io.unobserve(target);
            // will-change promotes the element to its own compositor layer.
            // That's worth it while the reveal runs and pure overhead after,
            // so drop the hint once the transition lands.
            target.addEventListener(
              "transitionend",
              () => target.style.willChange = "auto",
              { once: true }
            );
          }
        }
      },
      { threshold: 0.14, rootMargin: "0px 0px -6% 0px" }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [delay]);

  // Cast to a permissive type so the shared ref works across element tags.
  const Comp = Tag as ElementType;
  const compProps = { ref, className, id } as Record<string, unknown>;
  return <Comp {...compProps}>{children}</Comp>;
}

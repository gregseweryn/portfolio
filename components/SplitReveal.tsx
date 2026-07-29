"use client";

import { useEffect, useLayoutEffect, useRef, type ElementType, type ReactNode } from "react";
import { gsap, SplitText, prefersReducedMotion } from "@/lib/gsap";

const useIso = typeof window !== "undefined" ? useLayoutEffect : useEffect;

type Props = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  id?: string;
  /** Reveal on scroll-in instead of immediately on mount. */
  trigger?: boolean;
  delay?: number;
};

/**
 * Masked line-by-line headline reveal (GSAP SplitText). Hidden state is applied
 * only on the client when motion is allowed, so no-JS / reduced-motion / headless
 * renders always show the full heading. Splits after fonts load for correct lines.
 */
export default function SplitReveal({ children, as: Tag = "div", className, id, trigger = false, delay = 0 }: Props) {
  const ref = useRef<HTMLElement>(null);

  useIso(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;

    // Hide synchronously (pre-paint) to avoid a flash before the reveal.
    gsap.set(el, { autoAlpha: 0 });

    let split: SplitText | undefined;
    let tween: gsap.core.Tween | undefined;
    let cancelled = false;

    document.fonts.ready.then(() => {
      if (cancelled || !el.isConnected) return;
      split = new SplitText(el, { type: "lines", mask: "lines", linesClass: "split-line" });
      gsap.set(el, { autoAlpha: 1 });

      // The masks clip to the line box, which cuts the descenders off any glyph
      // that reaches below it — 8px of every "y" and "p" at hero size. They are
      // only needed while a line is travelling, so release them once it lands
      // rather than widening them, which would let the incoming line peek out.
      const releaseMasks = () => {
        el.querySelectorAll<HTMLElement>(".split-line-mask").forEach((mask) => {
          mask.style.overflow = "visible";
        });
      };

      tween = gsap.from(split.lines, {
        yPercent: 115,
        duration: 0.9,
        ease: "power4.out",
        stagger: 0.11,
        delay,
        onComplete: releaseMasks,
        ...(trigger ? { scrollTrigger: { trigger: el, start: "top 88%", once: true } } : {}),
      });
    });

    return () => {
      cancelled = true;
      tween?.scrollTrigger?.kill();
      tween?.kill();
      split?.revert();
      gsap.set(el, { clearProps: "all" });
    };
  }, [trigger, delay]);

  const Comp = Tag as ElementType;
  const props = { ref, className, id } as Record<string, unknown>;
  return <Comp {...props}>{children}</Comp>;
}

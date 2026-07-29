"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";

/**
 * Renders the methods as a list that scramble-decodes into place when scrolled
 * into view — a small, on-theme "data resolving" moment. Static under reduced motion.
 */
export default function MethodsList({
  items,
  listClassName,
  itemClassName,
}: {
  items: readonly string[];
  listClassName?: string;
  itemClassName?: string;
}) {
  const ref = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const el = ref.current;
    if (!el) return;
    const lis = Array.from(el.querySelectorAll("li"));

    const st = ScrollTrigger.create({
      trigger: el,
      start: "top 88%",
      once: true,
      onEnter: () => {
        lis.forEach((li, i) => {
          const text = li.dataset.text || li.textContent || "";
          gsap.to(li, {
            duration: 0.7,
            delay: i * 0.05,
            ease: "none",
            scrambleText: { text, chars: "upperCase", speed: 0.6, revealDelay: 0.05 },
          });
        });
      },
    });

    return () => st.kill();
  }, []);

  return (
    <ul ref={ref} className={listClassName}>
      {items.map((m) => (
        <li key={m} data-text={m} className={itemClassName}>
          {m}
        </li>
      ))}
    </ul>
  );
}

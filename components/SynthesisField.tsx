"use client";

import { useEffect, useRef } from "react";
import { prefersReducedMotion } from "@/lib/gsap";
import styles from "./SynthesisField.module.css";

// The last resort, for a browser whose canvas cannot parse the colour space the
// tokens are written in. The live values come from the tokens themselves — see
// `resolveToken` below — so swapping the accent in globals.css moves the field
// with it instead of leaving it on last year's blue.
const INK_FALLBACK = "#1c1a17";
const ACCENT_FALLBACK = "#1e40dd";

/**
 * Reads a custom property off the element and hands back something
 * `ctx.fillStyle` will actually accept, falling back when it will not: assigning
 * an unparseable value to fillStyle is a silent no-op, which would leave every
 * dot painted in whatever colour was set last.
 */
function resolveToken(el: Element, name: string, fallback: string) {
  const raw = getComputedStyle(el).getPropertyValue(name).trim();
  if (!raw) return fallback;
  const probe = document.createElement("canvas").getContext("2d");
  if (!probe) return fallback;
  probe.fillStyle = "#010101";
  probe.fillStyle = raw;
  return probe.fillStyle === "#010101" ? fallback : raw;
}

type Point = {
  gx: number; gy: number; // ordered grid target
  cx: number; cy: number; // scattered "cloud" base
  x: number; y: number; // current
  accent: boolean;
  phase: number;
  sp: number;
};

/**
 * The signature motif: a field of points that drift as a messy cloud and
 * coalesce into a crisp grid as you scroll through the hero or move the cursor
 * over them — raw data resolving into a system. Reduced-motion renders a single
 * static dot grid; the field pauses when off-screen or the tab is hidden.
 */
export default function SynthesisField({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reduce = prefersReducedMotion();
    const INK = resolveToken(canvas, "--ink", INK_FALLBACK);
    const ACCENT = resolveToken(canvas, "--accent", ACCENT_FALLBACK);
    let w = 0;
    let h = 0;
    // Scroll progress needs the canvas's position on the page. Measuring it
    // inside the rAF loop forces a synchronous layout on every tick, so it is
    // cached here and refreshed only when it can actually have moved.
    let boxTop = 0;
    let boxLeft = 0;
    let boxHeight = 1;
    let onScreen = false;
    let points: Point[] = [];
    let raf = 0;
    let running = false;
    const pointer = { x: -9999, y: -9999, active: false };

    function build() {
      const rect = canvas!.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      boxTop = rect.top + window.scrollY;
      boxLeft = rect.left;
      boxHeight = Math.max(rect.height, 1);
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas!.width = Math.max(1, Math.floor(w * dpr));
      canvas!.height = Math.max(1, Math.floor(h * dpr));
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);

      const gap = w < 640 ? 32 : 46;
      const cols = Math.ceil(w / gap) + 1;
      const rows = Math.ceil(h / gap) + 1;
      const offX = (w - (cols - 1) * gap) / 2;
      const offY = (h - (rows - 1) * gap) / 2;
      points = [];
      let i = 0;
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const gx = offX + c * gap;
          const gy = offY + r * gap;
          const ang = Math.random() * Math.PI * 2;
          const rad = (Math.random() * 0.9 + 0.25) * gap * 1.8;
          points.push({
            gx,
            gy,
            cx: gx + Math.cos(ang) * rad,
            cy: gy + Math.sin(ang) * rad,
            x: gx,
            y: gy,
            accent: i % 41 === 0,
            phase: Math.random() * Math.PI * 2,
            sp: 0.3 + Math.random() * 0.5,
          });
          i++;
        }
      }
    }

    function drawStatic() {
      ctx!.clearRect(0, 0, w, h);
      for (const p of points) {
        ctx!.beginPath();
        ctx!.fillStyle = p.accent ? ACCENT : INK;
        ctx!.globalAlpha = p.accent ? 0.85 : 0.4;
        ctx!.arc(p.gx, p.gy, p.accent ? 2.2 : 1.5, 0, Math.PI * 2);
        ctx!.fill();
      }
      ctx!.globalAlpha = 1;
    }

    function frame(t: number) {
      if (!running) return;
      raf = requestAnimationFrame(frame);
      const time = t * 0.001;
      ctx!.clearRect(0, 0, w, h);

      const scrollProg = Math.min(Math.max((window.scrollY - boxTop) / boxHeight, 0), 1);
      const globalOrder = 0.16 + scrollProg * 0.58;

      for (const p of points) {
        const driftAmp = (1 - globalOrder) * 7;
        const cloudX = p.cx + Math.cos(time * p.sp + p.phase) * driftAmp;
        const cloudY = p.cy + Math.sin(time * p.sp * 0.9 + p.phase) * driftAmp;

        let order = globalOrder;
        if (pointer.active) {
          const dx = p.gx - pointer.x;
          const dy = p.gy - pointer.y;
          const d2 = dx * dx + dy * dy;
          const R = 150;
          if (d2 < R * R) {
            order = Math.min(1, order + (1 - Math.sqrt(d2) / R) * 0.85);
          }
        }

        const tx = cloudX + (p.gx - cloudX) * order;
        const ty = cloudY + (p.gy - cloudY) * order;
        p.x += (tx - p.x) * 0.12;
        p.y += (ty - p.y) * 0.12;

        ctx!.beginPath();
        ctx!.fillStyle = p.accent ? ACCENT : INK;
        ctx!.globalAlpha = p.accent ? 0.9 : 0.26 + order * 0.34;
        ctx!.arc(p.x, p.y, p.accent ? 2.2 : 1.5, 0, Math.PI * 2);
        ctx!.fill();
      }
      ctx!.globalAlpha = 1;
    }

    function start() {
      if (running || reduce) return;
      running = true;
      raf = requestAnimationFrame(frame);
    }
    function stop() {
      running = false;
      cancelAnimationFrame(raf);
    }

    build();
    if (reduce) {
      drawStatic();
      return;
    }

    // Same reason the scroll geometry is cached: measuring inside pointermove
    // forces a layout on every mouse move, and the box only moves on scroll or
    // resize. boxTop is page-absolute, so the scroll position supplies the rest.
    const onMove = (e: PointerEvent) => {
      pointer.x = e.clientX - boxLeft;
      pointer.y = e.clientY + window.scrollY - boxTop;
      pointer.active = pointer.y > -80 && pointer.y < h + 80;
    };
    const onLeave = () => {
      pointer.active = false;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerout", onLeave, { passive: true });

    const io = new IntersectionObserver(
      ([entry]) => {
        onScreen = entry.isIntersecting;
        if (onScreen && !document.hidden) start();
        else stop();
      },
      { threshold: 0 }
    );
    io.observe(canvas);

    // Both gates have to agree before the loop restarts. Keyed off visibility
    // alone, returning to the tab resumed the field while the hero was scrolled
    // away, animating a canvas nobody can see.
    const onVisible = () => (document.hidden || !onScreen ? stop() : start());
    document.addEventListener("visibilitychange", onVisible);

    let resizeRaf = 0;
    const ro = new ResizeObserver(() => {
      cancelAnimationFrame(resizeRaf);
      resizeRaf = requestAnimationFrame(build);
    });
    ro.observe(canvas);

    return () => {
      stop();
      io.disconnect();
      ro.disconnect();
      document.removeEventListener("visibilitychange", onVisible);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerout", onLeave);
    };
  }, []);

  return (
    <div className={`${styles.field} ${className ?? ""}`} aria-hidden="true">
      <canvas ref={canvasRef} className={styles.canvas} />
    </div>
  );
}

import { useEffect, useRef } from "react";

// Animated square quad-tree / Sierpinski-carpet fractal on canvas.
// Recursively subdivides a square into 9 cells; the centre-of-each-ring cells
// are filled with CMYK, and fill selection + depth pulse over time. Combines
// "fractal" + "square ornament" + "rave" while staying a flat backdrop that
// content can sit on top of.
const CMYK = ["#00b4e6", "#e6007e", "#ffde00"];
const KEY = "#0a0a0a";

export default function FractalField({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    let running = true;
    let w = 0;
    let h = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = Math.max(1, Math.floor(w * dpr));
      canvas.height = Math.max(1, Math.floor(h * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    // draw one square, then subdivide into 3x3 and recurse into the 8 outer cells
    const carpet = (x: number, y: number, size: number, depth: number, t: number) => {
      if (depth <= 0 || size < 6) return;
      const c = size / 3;
      let idx = 0;
      for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
          if (row === 1 && col === 1) {
            // centre cell: filled square, colour cycles with time + position
            const phase = (Math.sin(t * 0.0012 + (x + y) * 0.01) + 1) / 2;
            const on = phase > 0.35;
            if (on) {
              const k = Math.floor(t * 0.001 + x * 0.02 + y * 0.02 + idx) % CMYK.length;
              ctx.fillStyle = CMYK[(k + CMYK.length) % CMYK.length];
              const inset = c * (0.08 + 0.06 * Math.sin(t * 0.002 + x * 0.03));
              ctx.fillRect(x + c + inset, y + c + inset, c - inset * 2, c - inset * 2);
            }
          } else {
            carpet(x + col * c, y + row * c, c, depth - 1, t);
          }
          idx++;
        }
      }
    };

    const render = (t: number) => {
      ctx.clearRect(0, 0, w, h);
      const size = Math.min(w, h) * 1.35;
      const ox = (w - size) / 2;
      const oy = (h - size) / 2;
      // faint outer frame grid
      ctx.strokeStyle = KEY;
      ctx.globalAlpha = 0.14;
      ctx.lineWidth = 1;
      ctx.strokeRect(ox, oy, size, size);
      ctx.globalAlpha = 0.85;
      const depth = 4;
      carpet(ox, oy, size, depth, t);
      ctx.globalAlpha = 1;
    };

    resize();

    if (reduce) {
      render(1200); // single static frame
    } else {
      const loop = (t: number) => {
        if (!running) return;
        render(t);
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);
    }

    // pause rAF loop when off-screen
    const io = new IntersectionObserver(([e]) => {
      if (reduce) return;
      if (e.isIntersecting && !running) {
        running = true;
        raf = requestAnimationFrame(loop2);
      } else if (!e.isIntersecting) {
        running = false;
        cancelAnimationFrame(raf);
      }
    });
    const loop2 = (t: number) => {
      if (!running) return;
      render(t);
      raf = requestAnimationFrame(loop2);
    };
    io.observe(canvas);

    const onResize = () => resize();
    window.addEventListener("resize", onResize);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`block h-full w-full bg-bone ${className}`}
    />
  );
}

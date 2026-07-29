"use client";

import { useEffect, useRef, useState } from "react";
import { Renderer, Triangle, Program, Mesh, Vec2 } from "ogl";
import { prefersReducedMotion } from "@/lib/gsap";
import SynthesisField from "./SynthesisField";
import styles from "./ShaderField.module.css";

const vertex = /* glsl */ `
  attribute vec2 uv;
  attribute vec2 position;
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 0.0, 1.0);
  }
`;

const fragment = /* glsl */ `
  precision highp float;
  uniform float uTime;
  uniform vec2 uRes;
  uniform vec2 uPointer;   // css px, y from top
  uniform float uScroll;   // 0..1 through hero
  uniform vec3 uInk;
  uniform vec3 uAccent;
  varying vec2 vUv;

  float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123); }
  float noise(vec2 p){
    vec2 i = floor(p), f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash(i + vec2(0.0,0.0)), hash(i + vec2(1.0,0.0)), u.x),
               mix(hash(i + vec2(0.0,1.0)), hash(i + vec2(1.0,1.0)), u.x), u.y);
  }
  float fbm(vec2 p){
    float v = 0.0, a = 0.5;
    for (int i = 0; i < 5; i++){ v += a * noise(p); p *= 2.0; a *= 0.5; }
    return v;
  }

  void main(){
    float aspect = uRes.x / max(uRes.y, 1.0);
    vec2 p = vec2(vUv.x * aspect, vUv.y);
    vec2 ptr = vec2((uPointer.x / max(uRes.x,1.0)) * aspect, 1.0 - uPointer.y / max(uRes.y,1.0));

    // ripple toward the cursor (soft, low amplitude)
    float d = distance(p, ptr);
    float ripple = sin(d * 26.0 - uTime * 1.3) * exp(-d * 7.0) * 0.04;
    vec2 warp = normalize(p - ptr + 1e-4) * ripple;

    float t = uTime * 0.032;
    vec2 q = p * 2.3 + warp;
    float w = fbm(q + vec2(t, -t * 0.7));
    float field = fbm(q + w * 1.7 + vec2(0.0, t * 0.5));

    // flowing contour threads — tighten/shift as you scroll (mess -> structure)
    float bands = field * (5.0 + uScroll * 3.0) + uScroll * 1.4;
    float lines = abs(fract(bands) - 0.5);
    float thread = smoothstep(0.07, 0.0, lines);

    // some threads carry the cobalt accent
    float accSel = smoothstep(0.52, 0.78, fbm(q * 0.6 + 5.0));
    float grain = (hash(vUv * uRes * 0.6 + uTime) - 0.5) * 0.025;

    float cloud = smoothstep(0.42, 0.92, field) * (0.13 + 0.08 * (1.0 - uScroll));
    float inkThread = thread * (1.0 - accSel);
    float accThread = thread * accSel;

    // Softened: the field is a faint presence, not a busy surface.
    vec3 col = mix(uInk, uAccent, clamp(accThread * 1.5, 0.0, 1.0));
    float alpha = cloud * 0.38 + inkThread * 0.4 + accThread * 0.6 + grain;
    alpha = clamp(alpha, 0.0, 0.5);

    gl_FragColor = vec4(col, alpha);
  }
`;

export default function ShaderField({ theme = "light" }: { theme?: "light" | "dark" }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<"pending" | "webgl" | "fallback">("pending");

  useEffect(() => {
    if (prefersReducedMotion()) {
      setMode("fallback");
      return;
    }
    const test = document.createElement("canvas");
    const supported = !!(test.getContext("webgl2") || test.getContext("webgl"));
    setMode(supported ? "webgl" : "fallback");
  }, []);

  useEffect(() => {
    if (mode !== "webgl") return;
    const wrap = wrapRef.current;
    if (!wrap) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const renderer = new Renderer({ alpha: true, antialias: false, dpr, premultipliedAlpha: false });
    const gl = renderer.gl;
    gl.clearColor(0, 0, 0, 0);
    gl.canvas.style.width = "100%";
    gl.canvas.style.height = "100%";
    gl.canvas.style.display = "block";
    wrap.appendChild(gl.canvas);

    const ink = theme === "dark" ? [0.93, 0.93, 0.94] : [0.11, 0.105, 0.09];
    const accent = theme === "dark" ? [0.42, 0.54, 0.99] : [0.118, 0.251, 0.867];

    const geometry = new Triangle(gl);
    const program = new Program(gl, {
      vertex,
      fragment,
      transparent: true,
      uniforms: {
        uTime: { value: 0 },
        uRes: { value: new Vec2(1, 1) },
        uPointer: { value: new Vec2(-9999, -9999) },
        uScroll: { value: 0 },
        uInk: { value: ink },
        uAccent: { value: accent },
      },
    });
    const mesh = new Mesh(gl, { geometry, program });

    const target = { x: -9999, y: -9999 };
    const smooth = { x: -9999, y: -9999 };

    // Geometry is cached rather than measured per frame: getBoundingClientRect
    // inside the rAF loop forces a synchronous layout on every tick, and inside
    // pointermove on every move. Both only change on resize or scroll.
    let boxTop = 0;
    let boxLeft = 0;
    let boxHeight = 1;

    function measure() {
      const r = wrap!.getBoundingClientRect();
      boxTop = r.top + window.scrollY;
      boxLeft = r.left + window.scrollX;
      boxHeight = Math.max(r.height, 1);
      return r;
    }

    function resize() {
      const r = measure();
      renderer.setSize(r.width, r.height);
      program.uniforms.uRes.value.set(r.width, r.height);
    }
    resize();

    const onScroll = () => measure();
    window.addEventListener("scroll", onScroll, { passive: true });

    const onMove = (e: PointerEvent) => {
      target.x = e.clientX + window.scrollX - boxLeft;
      target.y = e.clientY + window.scrollY - boxTop;
    };
    window.addEventListener("pointermove", onMove, { passive: true });

    let raf = 0;
    let running = false;
    const loop = (t: number) => {
      if (!running) return;
      raf = requestAnimationFrame(loop);
      smooth.x += (target.x - smooth.x) * 0.1;
      smooth.y += (target.y - smooth.y) * 0.1;
      program.uniforms.uPointer.value.set(smooth.x, smooth.y);
      program.uniforms.uTime.value = t * 0.001;
      // scrollY is free to read; the box geometry comes from the cache above.
      const progress = (window.scrollY - boxTop) / boxHeight;
      program.uniforms.uScroll.value = Math.min(Math.max(progress, 0), 1);
      renderer.render({ scene: mesh });
    };
    const start = () => {
      if (running) return;
      running = true;
      raf = requestAnimationFrame(loop);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? start() : stop()), { threshold: 0 });
    io.observe(gl.canvas);
    const onVis = () => (document.hidden ? stop() : start());
    document.addEventListener("visibilitychange", onVis);
    const ro = new ResizeObserver(resize);
    ro.observe(wrap);

    return () => {
      stop();
      io.disconnect();
      ro.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("scroll", onScroll);
      const ext = gl.getExtension("WEBGL_lose_context");
      ext?.loseContext();
      gl.canvas.remove();
    };
  }, [mode, theme]);

  if (mode === "fallback") return theme === "dark" ? null : <SynthesisField />;
  if (mode === "pending") return null;
  return <div ref={wrapRef} className={styles.field} aria-hidden="true" />;
}

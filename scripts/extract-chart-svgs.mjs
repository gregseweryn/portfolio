/**
 * Lifts every chart out of the built site into a standalone SVG.
 *
 * The charts are the only part of this portfolio a designer might genuinely
 * want to take away, and they exist as React components reading JSON — which is
 * the right place for them to live and the wrong place to open in a design tool.
 * This script closes that gap without a second source of truth: it reads the
 * prerendered HTML, resolves the CSS-module classes the browser would have
 * applied, and writes files that import into Figma as editable vector.
 *
 * Three decisions worth stating:
 *
 *   - Colours are converted from oklch to sRGB hex, because Figma cannot read
 *     oklch and would drop the fill entirely. The site keeps oklch; only the
 *     export is converted, and the conversion is checked for gamut clipping.
 *   - Text stays text. Outlining it would guarantee identical rendering and
 *     destroy the reason to export at all — a file whose type cannot be edited
 *     is a picture. Figma will substitute Druk Wide and Noirden if they are not
 *     installed, and the index says so.
 *   - Only rules outside media queries are applied. The mobile overrides exist
 *     to make a chart scroll inside a phone-width box, which is a property of
 *     the page, not of the chart.
 *
 * Run `npm run build` first; this reads its output.
 *
 * Usage: node scripts/extract-chart-svgs.mjs
 */

import fs from "node:fs/promises";
import path from "node:path";
import { execSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const BUILD = path.join(ROOT, ".next", "server", "app", "work");
const CSS_DIR = path.join(ROOT, ".next", "static", "css");
const OUT = path.join(ROOT, "design", "charts");

// Only the published studies: a page that is not in lib/studies is not built,
// so listing it here would read a file that does not exist. Put the rental
// study and the synthetic-data audit back on this line when they return.
const PAGES = ["krakow-touristification"];

/**
 * Properties worth carrying into a standalone file. Layout properties are
 * deliberately absent: `.svg { width: 100% }` is how the page sizes a chart,
 * and an exported file needs its intrinsic size instead.
 */
const KEEP = new Set([
  "fill",
  "fill-opacity",
  "stroke",
  "stroke-width",
  "stroke-dasharray",
  "stroke-linecap",
  "opacity",
  "font-family",
  "font-size",
  "font-weight",
  "font-style",
  "letter-spacing",
  "text-anchor",
  "dominant-baseline",
]);

/**
 * next/font declares `--font-noirden` and friends at runtime, so they are absent
 * from the stylesheet this script reads and resolve to nothing. These are the
 * families a person installs to open the exported file with the right type.
 */
const FONT_NAMES = [
  ["--font-druk", "Druk Wide"],
  ["--font-noirden", "Noirden"],
  ["--font-oswald", "Oswald"],
];

const warnings = [];

// ---------------------------------------------------------------- colour

/** oklch(L C H) -> sRGB. Returns { hex, clipped }. */
function oklchToHex(l, c, h) {
  const hr = (h * Math.PI) / 180;
  const a = c * Math.cos(hr);
  const b = c * Math.sin(hr);

  const l_ = l + 0.3963377774 * a + 0.2158037573 * b;
  const m_ = l - 0.1055613458 * a - 0.0638541728 * b;
  const s_ = l - 0.0894841775 * a - 1.291485548 * b;

  const L = l_ ** 3;
  const M = m_ ** 3;
  const S = s_ ** 3;

  const lin = [
    4.0767416621 * L - 3.3077115913 * M + 0.2309699292 * S,
    -1.2684380046 * L + 2.6097574011 * M - 0.3413193965 * S,
    -0.0041960863 * L - 0.7034186147 * M + 1.707614701 * S,
  ];

  let clipped = false;
  const hex = lin
    .map((v) => {
      if (v < -1e-4 || v > 1 + 1e-4) clipped = true;
      const x = Math.min(1, Math.max(0, v));
      const srgb = x <= 0.0031308 ? 12.92 * x : 1.055 * x ** (1 / 2.4) - 0.055;
      return Math.round(srgb * 255)
        .toString(16)
        .padStart(2, "0");
    })
    .join("");

  return { hex: `#${hex}`, clipped };
}

function convertColours(value, where) {
  return value.replace(/oklch\(\s*([\d.]+)\s+([\d.]+)\s+([\d.]+)\s*\)/g, (_, l, c, h) => {
    const { hex, clipped } = oklchToHex(parseFloat(l), parseFloat(c), parseFloat(h));
    if (clipped) warnings.push(`${where}: oklch(${l} ${c} ${h}) fell outside sRGB and was clamped to ${hex}`);
    return hex;
  });
}

// ---------------------------------------------------------------- css

/** Strips @media blocks, then collects `.class { … }` rules and :root variables. */
function parseCss(css) {
  const classes = new Map();
  const vars = new Map();

  // Drop at-rule blocks wholesale, innermost first, so their contents never
  // reach the class map.
  let flat = css;
  let previous;
  do {
    previous = flat;
    flat = flat.replace(/@[a-zA-Z-]+[^{]*\{(?:[^{}]|\{[^{}]*\})*\}/g, "");
  } while (flat !== previous);

  for (const [, selector, body] of flat.matchAll(/([^{}]+)\{([^{}]*)\}/g)) {
    const decls = Object.fromEntries(
      body
        .split(";")
        .map((d) => d.split(":"))
        .filter((p) => p.length >= 2)
        .map(([k, ...v]) => [k.trim(), v.join(":").trim()])
    );

    for (const sel of selector.split(",").map((s) => s.trim())) {
      if (sel === ":root" || sel === "html") {
        for (const [k, v] of Object.entries(decls)) if (k.startsWith("--")) vars.set(k, v);
      }
      // Simple single-class selectors only. A descendant or state selector
      // depends on context an exported file does not have.
      const m = /^\.([A-Za-z0-9_-]+)$/.exec(sel);
      if (m) classes.set(m[1], { ...(classes.get(m[1]) || {}), ...decls });
    }
  }
  return { classes, vars };
}

function resolveVars(value, vars, depth = 0) {
  if (depth > 8 || !value.includes("var(")) return value;
  const next = value.replace(/var\(\s*(--[A-Za-z0-9-]+)\s*(?:,([^)]*))?\)/g, (_, name, fallback) => {
    // The runtime font variables are checked first: --font-label resolves to
    // var(--font-noirden), which the stylesheet never defines.
    for (const [runtime, human] of FONT_NAMES) if (name === runtime) return human;
    if (vars.has(name)) return vars.get(name);
    return (fallback ?? "").trim();
  });
  return resolveVars(next, vars, depth + 1);
}

// ---------------------------------------------------------------- svg

/** Scans out a complete <svg>…</svg> by counting tags. The markup is machine-generated. */
function extractSvgs(html) {
  const out = [];
  let i = 0;
  while ((i = html.indexOf("<svg", i)) !== -1) {
    let depth = 0;
    let j = i;
    while (j < html.length) {
      const open = html.indexOf("<svg", j);
      const close = html.indexOf("</svg>", j);
      if (close === -1) break;
      if (open !== -1 && open < close) {
        depth += 1;
        j = open + 4;
      } else {
        depth -= 1;
        j = close + 6;
        if (depth === 0) break;
      }
    }
    out.push({ start: i, end: j, markup: html.slice(i, j) });
    i = j;
  }
  return out;
}

function styleSvg(markup, classes, vars, id) {
  return markup.replace(/<([a-zA-Z][\w:-]*)((?:\s+[^\s=>]+(?:="[^"]*")?)*)\s*(\/?)>/g, (tag, name, attrs, selfClose) => {
    const classMatch = /\sclass="([^"]*)"/.exec(attrs);
    if (!classMatch) return tag;

    const decls = {};
    for (const cls of classMatch[1].split(/\s+/).filter(Boolean)) {
      Object.assign(decls, classes.get(cls) || {});
    }

    const styled = Object.entries(decls)
      .filter(([prop]) => KEEP.has(prop))
      .map(([prop, value]) => {
        const resolved = convertColours(resolveVars(value, vars), `${id} ${prop}`);
        // A font stack is a browser instruction; a design tool wants one family.
        const single = prop === "font-family" ? resolved.split(",")[0].trim().replace(/^["']|["']$/g, "") : resolved;
        return ` ${prop}="${single}"`;
      })
      .join("");

    const withoutClass = attrs.replace(/\sclass="[^"]*"/, "");
    return `<${name}${withoutClass}${styled}${selfClose ? " /" : ""}>`;
  });
}

// ---------------------------------------------------------------- main

async function main() {
  let css = "";
  for (const file of await fs.readdir(CSS_DIR)) {
    if (file.endsWith(".css")) css += await fs.readFile(path.join(CSS_DIR, file), "utf8");
  }
  const { classes, vars } = parseCss(css);

  const sha = (() => {
    try {
      return execSync("git rev-parse --short HEAD", { cwd: ROOT }).toString().trim();
    } catch {
      return "unknown";
    }
  })();
  const date = new Date().toISOString().slice(0, 10);

  await fs.mkdir(OUT, { recursive: true });
  const written = [];

  for (const page of PAGES) {
    let html;
    try {
      html = await fs.readFile(path.join(BUILD, `${page}.html`), "utf8");
    } catch {
      console.error(`  FAIL  no build output for ${page}. Run npm run build first.`);
      process.exit(1);
    }

    for (const svg of extractSvgs(html)) {
      // The nearest preceding data-chart wrapper names this chart. The hero
      // diagram carries no wrapper, so it is named from the page it heads.
      const before = html.slice(0, svg.start);
      const marker = before.lastIndexOf('data-chart="');
      const closedSince = before.lastIndexOf("</figure>");
      const id =
        marker !== -1 && marker > closedSince
          ? before.slice(marker + 12, before.indexOf('"', marker + 12))
          : `${page}-hero`;

      // A chart can appear twice on one page — as the hero and again in a
      // section — and both carry the same id. Writing it twice would overwrite
      // the same file and report a count that does not match the directory.
      if (written.some((w) => w.id === id)) continue;

      const viewBox = /viewBox="([^"]+)"/.exec(svg.markup)?.[1];
      if (!viewBox) {
        warnings.push(`${id}: no viewBox, skipped`);
        continue;
      }
      const [, , w, h] = viewBox.split(/\s+/).map(Number);

      const caption =
        /<figcaption[^>]*>(?:<span[^>]*>)?([^<]{10,400})/.exec(html.slice(svg.end, svg.end + 4000))?.[1] ?? id;

      let body = styleSvg(svg.markup, classes, vars, id);
      body = body.replace(/^<svg([^>]*)>/, (_, attrs) => {
        const kept = attrs.replace(/\sclass="[^"]*"/, "").replace(/\saria-hidden="[^"]*"/, "");
        return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}"${kept}>`;
      });
      // On the page the surface behind a chart comes from `.plot`. A transparent
      // export inherits whatever it is dropped onto, and near-black ink on a dark
      // frame is an invisible chart, so the file carries its own ground.
      const surface = convertColours(resolveVars("var(--surface)", vars), `${id} surface`);
      body = body.replace(
        /^(<svg[^>]*>)/,
        `$1\n  <title>${caption.trim().replace(/&#x27;/g, "'")}</title>\n` +
          `  <rect width="${w}" height="${h}" fill="${surface}" />`
      );

      const file = path.join(OUT, `${id}.svg`);
      await fs.writeFile(
        file,
        `<!-- ${id} — exported from ${page}.html, build ${sha}, ${date}.\n` +
          `     Generated by scripts/extract-chart-svgs.mjs. Edit the React component,\n` +
          `     rebuild and re-export; do not hand-edit this file. -->\n${body}\n`,
        "utf8"
      );
      written.push({ id, page, w, h, caption: caption.trim() });
      console.log(`  ${`${id}.svg`.padEnd(34)} ${w}x${h}`);
    }
  }

  const index = [
    "# Charts, as standalone SVG",
    "",
    "Exported from the built site by `scripts/extract-chart-svgs.mjs`. Drop a file straight",
    "into Figma and it arrives as editable vector, with every colour already converted from",
    "oklch to sRGB.",
    "",
    "**Type is text, not outlines.** That is deliberate — an outlined chart cannot be edited,",
    "which is the whole reason to export one. Figma will substitute a face for **Druk Wide**",
    "and **Noirden** unless they are installed locally. Both are licensed commercially and",
    "are not redistributable, so they are not shipped with these files.",
    "",
    `Build: ${sha} · Exported: ${date}`,
    "",
    "| file | size | from | what it says |",
    "|---|---|---|---|",
    ...written.map((w) => `| \`${w.id}.svg\` | ${w.w}×${w.h} | ${w.page} | ${w.caption} |`),
    "",
  ].join("\n");

  await fs.writeFile(path.join(OUT, "index.md"), index, "utf8");

  for (const w of warnings) console.log(`  WARN  ${w}`);
  console.log(`\n  wrote ${written.length} files and index.md to design/charts/`);
}

main();

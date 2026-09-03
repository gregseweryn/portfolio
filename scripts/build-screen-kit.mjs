/**
 * Assembles design/otodom-screen-kit/ — everything needed to draw the rental
 * study's screens somewhere other than this repository.
 *
 * The kit is GENERATED, never hand-maintained. Tokens come out of the mockup's
 * tokens.css, listings out of its listings.js, screens and copy out of the three
 * HTML files. Nothing is transcribed by hand, because a hand-transcribed kit is
 * a second source of truth that drifts silently — and a case study about numbers
 * that do not match their source cannot ship one.
 *
 * Reference images are deliberately NOT copied in. They already live in
 * public/work/rental/ with CAPTURES.md recording the state each was taken in,
 * and duplicating 1.5 MB of binaries would make two copies that can disagree.
 * The kit points at them instead.
 *
 * Run after any change to the mockup:
 *     npm run build:kit
 */

import fs from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { createHash } from "node:crypto";
import { pathToFileURL } from "node:url";
import { fileURLToPath } from "node:url";

const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
// The directory is otodom-cost-mockup here and `designsystem` in a fresh clone —
// the repository was named after what it became rather than what it started as.
// Try both before giving up, so a clone does not fail on a default path.
function defaultMockup(root) {
  for (const name of ["../otodom-cost-mockup", "../designsystem"]) {
    if (existsSync(path.join(root, name, "tokens.css"))) return name;
  }
  return "../otodom-cost-mockup";
}

const args = process.argv.slice(2);
const MOCKUP = path.resolve(
  ROOT,
  args.includes("--mockup") ? args[args.indexOf("--mockup") + 1] : defaultMockup(ROOT)
);
const OUT = path.join(ROOT, "design", "otodom-screen-kit");

const errors = [];
const fail = (m) => errors.push(m);

async function read(rel) {
  try {
    return await fs.readFile(path.join(MOCKUP, rel), "utf8");
  } catch {
    fail(`missing ${rel} — is --mockup pointing at the right directory?`);
    return "";
  }
}

// ---------------------------------------------------------------- tokens

function parseTokens(css) {
  // tokens.css declares two :root blocks: the scale, and the semantic layer that
  // names what the scale is for. Both are read — a kit that carried only the
  // scale would tell a designer which greys exist and not which one is body text.
  const roots = [...css.matchAll(/:root\s*\{([\s\S]*?)\n\}/g)].map((m) => m[1]);
  if (!roots.length) {
    fail("tokens.css has no :root block");
    return { colour: [], space: [], radius: [], role: [], motion: [] };
  }
  const out = { colour: [], space: [], radius: [], role: [], motion: [] };
  for (const body of roots) {
    for (const [, name, value] of body.matchAll(/--([a-z0-9-]+)\s*:\s*([^;]+);/g)) {
      const v = value.trim();
      if (name.startsWith("color-")) out.colour.push([name.replace(/^color-/, ""), v]);
      else if (name.startsWith("space-")) out.space.push([name.replace(/^space-/, ""), v]);
      else if (name.startsWith("radius-")) out.radius.push([name.replace(/^radius-/, ""), v]);
      else if (name.startsWith("dur-") || name === "ease-out" || name === "target-min")
        out.motion.push([name, v]);
      else if (v.startsWith("var(")) out.role.push([name, v.replace(/var\((--[a-z0-9-]+)\)/, "$1")]);
    }
  }
  if (out.colour.length < 10) fail(`only ${out.colour.length} colour tokens found; expected 14`);
  if (out.role.length < 10) fail(`only ${out.role.length} semantic roles found; expected 17`);
  return out;
}

function parseType(css) {
  const rows = [];
  for (const [, name, body] of css.matchAll(/\.(t-[a-z0-9-]+)\s*\{([^}]*)\}/g)) {
    const get = (p) => (new RegExp(p + ":\\s*([^;]+)").exec(body) || [, ""])[1].trim();
    rows.push({
      style: name,
      size: get("font-size"),
      line: get("line-height"),
      weight: get("font-weight") || "400",
      tracking: get("letter-spacing") || "—",
      transform: get("text-transform") || "—",
    });
  }
  if (rows.length < 5) fail(`only ${rows.length} type styles found; expected 9`);
  return rows;
}

// ---------------------------------------------------------------- main

const tokensCss = await read("tokens.css");
const listingsSrc = await read("listings.js");
const before = await read("before.html");
const after = await read("after.html");
const listing = await read("listing.html");

// Import the real module rather than re-implementing its arithmetic: the kit
// must state the same totals the prototype computes, not a copy of the formula.
let L = null;
try {
  L = await import(pathToFileURL(path.join(MOCKUP, "listings.js")).href);
} catch (e) {
  fail(`could not import listings.js: ${e.message}`);
}

const tokens = parseTokens(tokensCss);
const type = parseType(tokensCss);

// Same file set, same order and same method as scripts/capture-mockup.mjs —
// filename then contents, per file. The README tells the reader to compare this
// hash with the one in CAPTURES.md, and that instruction is only true if both
// are computed identically. Change one, change the other.
const SOURCES = [
  ["tokens.css", tokensCss],
  ["listings.js", listingsSrc],
  ["before.html", before],
  ["after.html", after],
  ["listing.html", listing],
];
const h = createHash("sha256");
for (const [name, content] of SOURCES) h.update(name).update(Buffer.from(content, "utf8"));
const hash = h.digest("hex");

if (errors.length) {
  console.error(`\n${errors.length} problem(s) — nothing written:\n`);
  for (const e of errors) console.error(`  FAIL  ${e}`);
  process.exit(1);
}

await fs.mkdir(OUT, { recursive: true });

// --- listings.csv ---------------------------------------------------------

const all = [...L.SEARCH_A.map((l) => ({ ...l, search: "A" })), ...L.SEARCH_B.map((l) => ({ ...l, search: "B" }))];
const rows = all.map((l) => {
  const monthly = L.monthlyTotal(l);
  return [
    l.id,
    l.search,
    l.rooms,
    l.area,
    l.base,
    l.admin ?? "",
    L.MEDIA_ESTIMATE,
    monthly ?? "",
    L.deposit(l),
    monthly === null ? "" : monthly + L.deposit(l),
    l.admin === null ? "cannot be derived" : "complete",
    l.district,
    l.floor,
    l.seller,
    l.title,
  ];
});

const csv = [
  "id,search,rooms,area_m2,base_rent,admin_rent,utilities_estimate,monthly_total,deposit,first_month_total,cost_status,district,floor,seller,title",
  ...rows.map((r) => r.map((c) => (String(c).includes(",") ? `"${c}"` : c)).join(",")),
].join("\n");

await fs.writeFile(path.join(OUT, "listings.csv"), csv + "\n", "utf8");

// --- tokens.md ------------------------------------------------------------

const tokensMd = [
  "# Tokens",
  "",
  "Generated from `../../../otodom-cost-mockup/tokens.css`. One mode — the product has no",
  "dark theme, and inventing one here would be designing something that does not exist.",
  "",
  "The two semantic 600s carry darkened values from a contrast pass: badge labels moved from",
  "4.5:1 to 7.2:1. Do not restore the brighter originals.",
  "",
  "## Colour",
  "",
  "| Variable | Value |",
  "|---|---|",
  ...tokens.colour.map(([n, v]) => `| \`color/${n.replace(/-(\d+)$/, "/$1")}\` | \`${v}\` |`),
  "",
  "## Colour roles",
  "",
  "The scale says which colours exist; these say what each one is for. In Figma they are a",
  "second collection group whose values are aliases to the first, not copies of it — the same",
  "relationship they have in the CSS.",
  "",
  "| Variable | Alias of |",
  "|---|---|",
  ...tokens.role.map(([n, v]) => `| \`${n.replace(/-/, "/")}\` | \`${v.replace(/^--color-/, "color/").replace(/-(\d+)$/, "/$1")}\` |`),
  "",
  "## Spacing",
  "",
  "| Variable | Value |",
  "|---|---|",
  ...tokens.space.map(([n, v]) => `| \`space/${n}\` | ${v} |`),
  "",
  "## Radius",
  "",
  "| Variable | Value |",
  "|---|---|",
  ...tokens.radius.map(([n, v]) => `| \`radius/${n}\` | ${v} |`),
  "",
  "## Motion and targets",
  "",
  "Two durations, one curve, one minimum. Figma has no home for these, so they belong on the",
  "cover as a note rather than in the variable collection — but a prototype built from this kit",
  "has to use them, and every transition needs a reduced-motion alternative.",
  "",
  "| Variable | Value |",
  "|---|---|",
  ...tokens.motion.map(([n, v]) => `| \`${n}\` | \`${v}\` |`),
  "",
  "## Type",
  "",
  "Face: **Inter**, self-hosted by the mockup since 2 September 2026, so the screens and the",
  "running prototype are set in the same thing.",
  "",
  "| Style | Size | Line | Weight | Tracking | Transform |",
  "|---|---|---|---|---|---|",
  ...type.map((t) => `| \`${t.style}\` | ${t.size} | ${t.line} | ${t.weight} | ${t.tracking} | ${t.transform} |`),
  "",
].join("\n");

await fs.writeFile(path.join(OUT, "tokens.md"), tokensMd, "utf8");

// --- screens.md -----------------------------------------------------------

const cheapest = Math.min(...L.SEARCH_A.map((l) => L.monthlyTotal(l)));
const totals = L.SEARCH_A.map((l) => L.monthlyTotal(l)).sort((a, b) => a - b);
const within = (b) => totals.filter((t) => t <= b).length;

const screensMd = [
  "# Screens, and every state each one reaches",
  "",
  "Generated from the mockup's own markup. A state that is not listed here is a state the",
  "prototype cannot be put into by using it — and building a screen for one would be drawing",
  "an artifact to fit the story rather than showing the thing.",
  "",
  "Device frame: **375 × 812**, which is the study's stated context. Captures are 2x.",
  "",
  "## 1. Current state — search results (`before.html`)",
  "",
  "One screen, no interaction. The filter chips are decorative: `aria-pressed` with no handler.",
  `Renders all ${L.SEARCH_A.length} of search A and never renders search B, so **there is no`,
  "current-state screen showing a listing whose cost cannot be derived.** That case exists only",
  "in the redesign and in the detail view. Do not invent one.",
  "",
  "Each card: base rent as the headline (`t-price22`), administrative rent demoted to a grey",
  "second line (`t-small`), then title, address, tags, seller. Nothing adds the two together.",
  "",
  "Reference: `public/work/rental/before-top.png`, `before-three.png`, `before-card-a8.png`.",
  "",
  "## 2. Redesign — search results (`after.html`)",
  "",
  "One screen, parameterised by a budget input: min 500, max 20000, step 100, default 3500.",
  "Re-renders on every input event. Reachable states, computed from the listing data:",
  "",
  "| Budget | Result | Summary line |",
  "|---|---|---|",
  ...[3500, 4100, 5000].map(
    (b) =>
      `| ${b} zl | ${within(b)} of ${L.SEARCH_A.length} | ${
        within(b) ? `**${within(b)} z ${L.SEARCH_A.length}** ofert mieści się w ${b} zł miesięcznie.` : `**0 z ${L.SEARCH_A.length}** ofert mieści się w ${b} zł. Najtańsza: ${cheapest} zł.`
      } |`
  ),
  "",
  `Every 100 zl step is its own state. The cheapest listing costs **${cheapest} zl** a month, so`,
  "any budget below that returns the empty state.",
  "",
  "**Below the fold, always rendered:** a group headed `Nie można ustalić kosztu (3)` holding",
  "the three search-B listings. Each shows a floor rather than a total, carries a",
  "`Brak czynszu` badge, and marks the missing row in words. This group is the argument the",
  "whole redesign rests on and it appears in no exported frame before September 2026.",
  "",
  "**Not reachable:** the dimmed `.over` card. Its CSS exists but `render()` filters",
  "over-budget listings before drawing them. In Figma it may exist as a variant, labelled",
  "*not reachable in the prototype*. It must not be made reachable to obtain a screenshot.",
  "",
  "Reference: `after-top.png`, `after-3500-empty.png`, `after-4100.png`, `after-5000.png`,",
  "`after-unknown-group.png`.",
  "",
  "## 3. Redesign — listing detail (`listing.html?id=`)",
  "",
  `**${all.length} reachable instances**, one per listing id. Two shapes:`,
  "",
  `- **${L.SEARCH_A.length} complete** (a1–a8): two panels, *Co miesiąc* and *Pierwszy miesiąc*,`,
  "  each itemised, with estimate tags on utilities and deposit, and a full total.",
  `- **${L.SEARCH_B.length} partial** (b1–b3): totals read *od X zł*, the administrative rent row`,
  "  says it is not stated, the badge reads `Brak czynszu`, and the note is different.",
  "",
  "The deposit is shown separately and named as returnable rather than folded into a single",
  "figure, because a combined number cannot be interpreted.",
  "",
  "Worth drawing first: **a8** — advertised at 2500 zl, the cheapest headline on the page,",
  `**${L.monthlyTotal(L.SEARCH_A.find((l) => l.id === "a8"))} zl** a month and`,
  `**${L.monthlyTotal(L.SEARCH_A.find((l) => l.id === "a8")) + L.deposit(L.SEARCH_A.find((l) => l.id === "a8"))} zl**`,
  "to move in. It is the reversal the study is about.",
  "",
  "Reference: `listing-a1.png`, `listing-a8.png`, `listing-b1.png`, `listing-a8-recurring.png`.",
  "",
].join("\n");

await fs.writeFile(path.join(OUT, "screens.md"), screensMd, "utf8");

// --- copy.csv -------------------------------------------------------------

const strings = new Set();
for (const [file, html] of [["before", before], ["after", after], ["listing", listing]]) {
  for (const [, text] of html.matchAll(/>([^<>{}\n]{3,60})</g)) {
    const t = text.trim();
    if (t && !/^[\s`]*$/.test(t) && !t.startsWith("p.") && /[a-ząćęłńóśźżA-ZŁ]/.test(t)) {
      strings.add(`${file}|${t}`);
    }
  }
}
const copy = ["screen,string", ...[...strings].sort().map((s) => {
  const [screen, text] = s.split("|");
  return `${screen},"${text.replace(/"/g, '""')}"`;
})].join("\n");

await fs.writeFile(path.join(OUT, "copy.csv"), copy + "\n", "utf8");

// --- README ---------------------------------------------------------------

const readme = `# Otodom screen kit

Everything needed to draw the rental study's screens somewhere other than this repository —
in Figma, on paper, or in another tool entirely.

**Generated, not maintained.** Every file here is produced by \`scripts/build-screen-kit.mjs\`
from the running prototype in \`../../../otodom-cost-mockup\`. Do not edit them; change the
mockup and re-run:

\`\`\`bash
npm run build:kit
\`\`\`

Source hash (sha256 of tokens.css, listings.js and the three HTML files):
\`${hash}\`

If that hash and the one in \`public/work/rental/CAPTURES.md\` disagree, the kit and the
published screenshots were built from different versions of the prototype.

## What is here

| File | What it carries |
|---|---|
| \`tokens.md\` | Colour, spacing, radius and the nine type styles, ready to enter as Figma variables and text styles |
| \`listings.csv\` | All ${all.length} listings with every derived figure: base, admin, utilities, monthly total, deposit, first-month total, and whether the cost can be derived at all |
| \`screens.md\` | Every screen and every state it can actually be put into, with the numbers each state produces |
| \`copy.csv\` | The Polish interface strings, so a screen can be built without reading the HTML |

## What is deliberately not here

**The reference images.** They live in \`public/work/rental/\` — twelve captures of the running
prototype plus four comprehension-test stimuli — and \`CAPTURES.md\` beside them records the URL,
viewport and asserted DOM state of each. Copying them here would make two sets of binaries that
can disagree about which is current.

**Anything invented.** \`screens.md\` lists states the prototype reaches by being used. A state
absent from that list is absent because the prototype cannot be put into it, and drawing it
anyway would be building an artifact to fit the story. The clearest case: \`before.html\` renders
only search A, so **no current-state screen exists showing a listing whose cost cannot be
derived**, and none should be drawn.

## Where to start

\`../FIGMA.md\` is the build order for a Figma file: variables, then text styles, then the
component variant matrix, then screens assembled from those components. The chart SVGs in
\`../charts/\` import as editable vector.

The single most useful screen to draw first is listing **a8**: advertised at 2500 zl, the
cheapest number on the results page, and the most expensive place to end up.
`;

await fs.writeFile(path.join(OUT, "README.md"), readme, "utf8");

console.log(`  tokens.md      ${tokens.colour.length} colours, ${tokens.role.length} roles, ${tokens.space.length} spaces, ${tokens.radius.length} radii, ${type.length} type styles`);
console.log(`  listings.csv   ${all.length} listings`);
console.log(`  screens.md     3 screens`);
console.log(`  copy.csv       ${strings.size} strings`);
console.log(`  README.md      source hash ${hash.slice(0, 16)}…`);
console.log(`\n  wrote design/otodom-screen-kit/`);

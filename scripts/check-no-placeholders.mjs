/**
 * Fails the build output if a published page still shows a placeholder.
 *
 * `MediaFrame` prints the words "Artifact placeholder" inside a ticked box. It
 * exists so a study can admit that an artifact is not ready, which is honest —
 * and for two studies it sat on the page for months, which is not. PRODUCT.md
 * puts it plainly: no placeholders pretending to be artifacts.
 *
 * The type keeps `hero.kind === "placeholder"` legal so a future study can be
 * honest about the same thing. This is what stops that admission from quietly
 * becoming the permanent state of a page.
 *
 * Usage: node scripts/check-no-placeholders.mjs   (after npm run build)
 */

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const APP = path.join(ROOT, ".next", "server", "app");
const NEEDLE = "Artifact placeholder";

async function htmlFiles(dir) {
  const out = [];
  for (const entry of await fs.readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await htmlFiles(full)));
    else if (entry.name.endsWith(".html")) out.push(full);
  }
  return out;
}

const files = await htmlFiles(APP).catch(() => {
  console.error("  FAIL  no build output. Run npm run build first.");
  process.exit(1);
});

const offenders = [];
for (const file of files) {
  const html = await fs.readFile(file, "utf8");
  if (html.includes(NEEDLE)) offenders.push(path.relative(APP, file));
}

console.log(`checked ${files.length} built pages for placeholder frames`);

if (offenders.length) {
  console.error(`\n${offenders.length} page(s) still ship a placeholder:\n`);
  for (const o of offenders) console.error(`  FAIL  ${o}`);
  console.error(
    "\nGive the study a real hero, or take it out of lib/studies/index.ts until it has one.\n"
  );
  process.exit(1);
}

console.log("  no page ships a placeholder");

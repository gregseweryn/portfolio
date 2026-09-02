/**
 * Captures the Otodom cost mockup into public/work/rental/.
 *
 * The case study says its screens are captures of a running prototype rather
 * than pictures of a design. This script is what makes that sentence checkable:
 * it serves the real mockup, drives it into a named state, asserts the state
 * actually arrived, and writes a manifest recording what was true at capture
 * time. Nothing here is allowed to guess.
 *
 * Two rules the rest of the file exists to enforce:
 *
 *   1. A shot whose assertion fails aborts the run. A wrong picture under a
 *      right caption is the failure mode this pipeline is built to prevent, and
 *      it is worse than no picture at all.
 *   2. The mockup is never modified to make a shot possible. If a state cannot
 *      be reached by using the prototype, it does not get captured. (The dimmed
 *      over-budget card is the live example: its CSS exists but render() filters
 *      before drawing, so no screenshot of it exists here.)
 *
 * The mockup is not a git repository, so provenance is a hash of its sources
 * rather than a commit: change tokens.css or listings.js and the manifest says so.
 *
 * Usage:
 *   node scripts/capture-mockup.mjs                # capture and write
 *   node scripts/capture-mockup.mjs --check        # capture to a temp dir, diff, write nothing
 *   node scripts/capture-mockup.mjs --mockup ../elsewhere
 */

import { chromium } from "playwright";
import { spawn } from "node:child_process";
import { createHash } from "node:crypto";
import fs from "node:fs/promises";
import { existsSync } from "node:fs";
import net from "node:net";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

import {
  COPY_VERBATIM,
  DEVICE_SCALE_FACTOR,
  OUT_DIR,
  RETIRED,
  SHOTS,
  VIEWPORT,
} from "./mockup-shots.mjs";

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
const CHECK_ONLY = args.includes("--check");
const MOCKUP = path.resolve(
  ROOT,
  args.includes("--mockup") ? args[args.indexOf("--mockup") + 1] : defaultMockup(ROOT)
);
const PORT = 3300;

/** Files whose contents define what the mockup renders. */
const SOURCES = ["tokens.css", "listings.js", "before.html", "after.html", "listing.html"];

function die(msg) {
  console.error(`\n  FAIL  ${msg}\n`);
  process.exit(1);
}

async function portIsOpen(port) {
  return new Promise((resolve) => {
    const socket = net.connect({ port, host: "127.0.0.1" });
    socket.setTimeout(400);
    socket.on("connect", () => (socket.end(), resolve(true)));
    socket.on("timeout", () => (socket.destroy(), resolve(false)));
    socket.on("error", () => resolve(false));
  });
}

async function waitForPort(port, timeoutMs = 10000) {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    if (await portIsOpen(port)) return true;
    await new Promise((r) => setTimeout(r, 150));
  }
  return false;
}

async function sourceHash() {
  const h = createHash("sha256");
  for (const name of SOURCES) {
    const file = path.join(MOCKUP, name);
    try {
      h.update(name).update(await fs.readFile(file));
    } catch {
      die(`mockup is missing ${name} — is --mockup pointing at the right directory?`);
    }
  }
  return h.digest("hex");
}

async function main() {
  try {
    await fs.access(MOCKUP);
  } catch {
    die(`no mockup at ${MOCKUP}. Pass --mockup <path>.`);
  }

  const hash = await sourceHash();

  // Attach to a server somebody else started; never kill what we did not spawn.
  const alreadyServing = await portIsOpen(PORT);
  let server = null;
  if (!alreadyServing) {
    server = spawn("python", ["serve.py", String(PORT)], { cwd: MOCKUP, stdio: "ignore" });
    if (!(await waitForPort(PORT))) die(`serve.py did not come up on ${PORT}`);
  }

  const outDir = CHECK_ONLY
    ? await fs.mkdtemp(path.join(os.tmpdir(), "mockup-shots-"))
    : path.join(ROOT, OUT_DIR);
  await fs.mkdir(path.join(outDir, "stimuli"), { recursive: true });

  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: VIEWPORT,
    deviceScaleFactor: DEVICE_SCALE_FACTOR,
    reducedMotion: "reduce",
    colorScheme: "light",
    // listings.js formats every price with toLocaleString("pl-PL"); an en-US
    // runner would capture "2,500" where the product shows "2 500".
    locale: "pl-PL",
    timezoneId: "Europe/Warsaw",
  });

  const captured = [];
  const page = await context.newPage();

  for (const shot of SHOTS) {
    // A shot may ask for a taller frame than the phone default when the thing it
    // shows is a list: the alternative is a full-page strip so tall that no page
    // can display it at a readable width.
    await page.setViewportSize(shot.viewport ?? VIEWPORT);
    await page.goto(`http://127.0.0.1:${PORT}${shot.url}`, { waitUntil: "networkidle" });

    // Motion is decoration here and a source of nondeterminism in a capture.
    await page.addStyleTag({
      content: "*,*::before,*::after{transition:none!important;animation:none!important}",
    });

    if (shot.budget !== undefined) {
      await page.locator("#budget").fill(String(shot.budget));
      await page.locator("#budget").dispatchEvent("input");
    }

    // Wait for the asserted state rather than for a duration. A timeout here
    // means the mockup no longer does what the shot list claims it does.
    try {
      await page.waitForFunction(shot.assert, null, { timeout: 5000 });
    } catch {
      await browser.close();
      if (server) server.kill();
      die(
        `${shot.file}: the page never reached its asserted state.\n` +
          `        ${shot.what}\n` +
          `        Either the mockup changed or the shot list is stale. Nothing was written.`
      );
    }

    await page.evaluate(() => document.fonts.ready);

    const file = path.join(outDir, shot.file);
    if (shot.frame.kind === "element") {
      await page.locator(shot.frame.selector).screenshot({ path: file });
    } else {
      await page.screenshot({ path: file, fullPage: shot.frame.kind === "fullPage" });
    }

    const { width, height } = await (async () => {
      const buf = await fs.readFile(file);
      // PNG IHDR: width and height are big-endian uint32 at bytes 16 and 20.
      return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) };
    })();

    captured.push({ ...shot, width, height });
    console.log(`  ${shot.file.padEnd(28)} ${width}x${height}`);
  }

  await browser.close();
  if (server) server.kill();

  for (const c of COPY_VERBATIM) {
    await fs.copyFile(path.join(MOCKUP, c.from), path.join(outDir, c.to));
  }

  if (CHECK_ONLY) {
    let drift = 0;
    for (const shot of SHOTS) {
      const a = path.join(ROOT, OUT_DIR, shot.file);
      const b = path.join(outDir, shot.file);
      let same = false;
      try {
        same = (await fs.readFile(a)).equals(await fs.readFile(b));
      } catch {
        same = false;
      }
      if (!same) {
        drift += 1;
        console.error(`  DRIFT ${shot.file}`);
      }
    }
    await fs.rm(outDir, { recursive: true, force: true });
    if (drift) {
      console.error(`\n${drift} capture(s) no longer match the mockup. Re-run without --check.\n`);
      process.exit(1);
    }
    console.log("\n  every capture still matches the running mockup");
    return;
  }

  for (const name of RETIRED) {
    await fs.rm(path.join(ROOT, OUT_DIR, name), { force: true });
  }

  const chromiumVersion = browser.version ? browser.version() : "unknown";
  const manifest = [
    "# Provenance of the mockup captures",
    "",
    "Written by `scripts/capture-mockup.mjs`. Every image in `public/work/rental/` is a",
    "screenshot of the prototype in `../otodom-cost-mockup` running in a real browser, not",
    "a rendering of a design file. This file records what was true when each was taken, so",
    "the claim can be checked rather than trusted.",
    "",
    `Captured: ${new Date().toISOString().slice(0, 10)}`,
    `Mockup source hash (sha256 of ${SOURCES.join(", ")}): ${hash}`,
    `Chromium: ${chromiumVersion}`,
    `Viewport: ${VIEWPORT.width}x${VIEWPORT.height} at ${DEVICE_SCALE_FACTOR}x unless a row says otherwise, locale pl-PL, reduced motion`,
    "",
    "The mockup is not a git repository, so the hash above stands in for a commit: change",
    "any of those five files and it moves.",
    "",
    "| file | px | page | state asserted before capture | shows |",
    "|---|---|---|---|---|",
    ...captured.map(
      (c) =>
        `| \`${c.file}\` | ${c.width}x${c.height} | \`${c.url}\` | ` +
        `${c.budget !== undefined ? `budget ${c.budget}; ` : ""}` +
        `\`${String(c.assert).replace(/\s+/g, " ").slice(0, 90)}\` | ${c.what} |`
    ),
    "",
    "## Copied, not captured",
    "",
    "The four files under `stimuli/` are the images shown to participants in the",
    "comprehension test. They are copied byte-for-byte from the mockup repository rather",
    "than re-rendered: their provenance is *the stimulus that was used*, and a fresh render",
    "would quietly substitute something else for it.",
    "",
    "## Retired",
    "",
    "These four were exported from Figma and are set in Inter, while a browser capture on",
    "Windows was set in Segoe UI until the mockup began self-hosting the face. Mixing the",
    "two put two renderers inside one before/after pair, so they were replaced:",
    "",
    ...RETIRED.map((r) => `- \`${r}\``),
    "",
  ].join("\n");

  await fs.writeFile(path.join(ROOT, OUT_DIR, "CAPTURES.md"), manifest, "utf8");
  console.log(`\n  wrote ${captured.length} captures, ${COPY_VERBATIM.length} copies and CAPTURES.md`);
}

main().catch((err) => die(err.stack || String(err)));

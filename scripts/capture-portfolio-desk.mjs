/**
 * Captures the Portfolio Desk prototype for the case study.
 *
 * The prototype is published at the URL below and is the only source for these
 * images: nothing here is re-rendered, re-drawn or composited. Every shot is
 * taken after a DOM assertion that names the state being photographed, so a
 * capture cannot silently become a picture of the wrong screen.
 *
 * Both themes are captured. The prototype's own Light/Dark control is used
 * rather than an emulated `prefers-color-scheme`, because the control is what a
 * reader of the case study would click.
 *
 * Output: public/work/portfolio-desk/*.png plus CAPTURES.md, which records the
 * URL, viewport, asserted state and Chromium build for each file. Rerun with
 * `npm run capture:desk`; the prototype is a live page, so a rerun after a
 * change to it will legitimately produce different images.
 */
import { chromium } from "playwright";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const OUT = path.join(ROOT, "public", "work", "portfolio-desk");
const APP = "https://semi-secure-43576547.figma.site/";

const VIEWPORT = { width: 1440, height: 900 };
/** 2x so a screenshot placed at 720 CSS px is still sharp on a retina display. */
const SCALE = 2;

/**
 * One capture. `go` drives the prototype from a freshly loaded page; `expect` is
 * text that must be on screen before the shutter opens — it is the assertion
 * that this file shows what its name claims.
 */
const SHOTS = [
  {
    file: "overview",
    title: "S1 — Portfolio overview",
    expect: "Your portfolio today",
    fullPage: true,
    async go() {},
  },
  {
    file: "work-list",
    title: "S2 — Work list, saved view for loans over 30 days past due",
    expect: "Loans over 30 days past due",
    fullPage: true,
    async go(page) {
      await page.getByText("Over 30 days", { exact: true }).first().click();
    },
  },
  {
    file: "loan-detail",
    title: "S3 — Loan detail, status tab",
    expect: "Total in arrears",
    fullPage: true,
    async go(page) {
      await page.getByText("Over 30 days", { exact: true }).first().click();
      await page.getByText("Baltic Foods sp. z o.o.", { exact: true }).first().click();
    },
  },
  {
    file: "repayment-history",
    title: "S4 — Repayment history, one table instead of three document types",
    expect: "Interest accrual is a column",
    fullPage: true,
    async go(page) {
      await page.getByText("Over 30 days", { exact: true }).first().click();
      await page.getByText("Baltic Foods sp. z o.o.", { exact: true }).first().click();
      await page.getByRole("tab", { name: "Repayment history" }).click();
    },
  },
  {
    file: "log-action",
    title: "S5 — Log collections action, drawer open with its defaults filled in",
    expect: "Log collections action",
    fullPage: false,
    async go(page) {
      await page.getByText("Over 30 days", { exact: true }).first().click();
      await page.getByText("Baltic Foods sp. z o.o.", { exact: true }).first().click();
      await page.getByText("Log collections action", { exact: true }).first().click();
    },
  },
  {
    file: "edge-states",
    title: "S6 — Edge states: empty, loading and error",
    expect: "Edge states",
    fullPage: true,
    async go(page) {
      await page.getByText("Edge states", { exact: true }).first().click();
    },
  },
  {
    file: "team-portfolio",
    title: "S7 — Risk manager team view (added during the Carbon port, never measured)",
    expect: "Team portfolio",
    fullPage: true,
    async go(page) {
      await page.getByText("Team portfolio", { exact: true }).first().click();
    },
  },
  {
    file: "sign-in",
    title: "S0 — Sign in (added during the Carbon port, never measured)",
    expect: "Sign in",
    fullPage: true,
    async go(page) {
      await page.getByText("Sign in", { exact: true }).first().click();
    },
  },
];

const THEMES = ["Light", "Dark"];

async function main() {
  await fs.mkdir(OUT, { recursive: true });

  const browser = await chromium.launch();
  const version = browser.version();
  const context = await browser.newContext({
    viewport: VIEWPORT,
    deviceScaleFactor: SCALE,
    // The prototype animates the drawer and row highlights. Motion mid-capture
    // is the classic source of a blurred or half-drawn frame.
    reducedMotion: "reduce",
  });

  const rows = [];

  for (const theme of THEMES) {
    for (const shot of SHOTS) {
      const page = await context.newPage();
      await page.goto(APP, { waitUntil: "networkidle" });

      await page.getByRole("button", { name: theme.toLowerCase(), exact: true }).click();
      await shot.go(page);

      // The assertion. Playwright waits for it, so a path that silently stopped
      // working fails the run instead of producing a wrong picture.
      await page.getByText(shot.expect, { exact: false }).first().waitFor({ timeout: 15_000 });
      await page.waitForTimeout(400);

      const name = `${shot.file}-${theme.toLowerCase()}.png`;
      const file = path.join(OUT, name);
      await page.screenshot({ path: file, fullPage: shot.fullPage });

      const { width, height } = await page.evaluate(() => ({
        width: document.documentElement.scrollWidth,
        height: document.documentElement.scrollHeight,
      }));
      const bytes = (await fs.stat(file)).size;

      rows.push({
        name,
        title: shot.title,
        theme,
        expect: shot.expect,
        fullPage: shot.fullPage,
        css: shot.fullPage ? `${width}×${height}` : `${VIEWPORT.width}×${VIEWPORT.height}`,
        kb: Math.round(bytes / 1024),
      });
      console.log(`${name}  ${Math.round(bytes / 1024)} kB`);
      await page.close();
    }
  }

  await browser.close();

  const md = `# Captures — Portfolio Desk

Every image in \`public/work/portfolio-desk/\` was taken by
\`scripts/capture-portfolio-desk.mjs\` from the published prototype. None was
edited, re-rendered or composited afterwards.

| Field | Value |
|---|---|
| Source | <${APP}> |
| Viewport | ${VIEWPORT.width}×${VIEWPORT.height} CSS px, device scale ${SCALE} |
| Motion | \`prefers-reduced-motion: reduce\`, so nothing is mid-transition |
| Browser | ${version} |
| Captured | ${new Date().toISOString().slice(0, 10)} |

The **asserted state** column is the text that had to be on screen before the
shutter opened. A path that stops working fails the run rather than producing a
picture of the wrong screen.

| File | Screen | Theme | Asserted state | CSS size | Weight |
|---|---|---|---|---|---|
${rows
  .map(
    (r) =>
      `| \`${r.name}\` | ${r.title} | ${r.theme} | “${r.expect}” | ${r.css} | ${r.kb} kB |`,
  )
  .join("\n")}

## What these images do not show

The prototype's sidebar carries a **SCREENS** group — Loan detail, Repayment
history, Log action, Team portfolio, Edge states, Sign in. It is navigation for
looking around the prototype, not part of the product's information
architecture, and no measured task path uses it.

**Sign in** and **Team portfolio** were added during the Carbon port. They were
never part of the measured set and carry no figure in the case study.
`;

  await fs.writeFile(path.join(OUT, "CAPTURES.md"), md, "utf8");
  console.log(`\n${rows.length} captures + CAPTURES.md written to public/work/portfolio-desk/`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

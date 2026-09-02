/**
 * What to capture from the Otodom cost mockup, as data.
 *
 * Same split the rest of this repository uses: content is data, renderers are
 * code. Adding a screenshot to a case study should be a row in this file, not
 * an edit to the capture logic.
 *
 * Every shot names the state it expects to find. `assert` runs in the page
 * after the state has been set and must return true; a shot whose assertion
 * fails aborts the whole run rather than writing a picture that shows something
 * other than what the caption will claim. That is the entire point of capturing
 * from a running mockup instead of drawing the screens.
 *
 * Ids referenced here come from otodom-cost-mockup/listings.js:
 *   a8  base 2500, admin 1200  -> 4000 zl a month, 6500 zl to move in.
 *       Advertised as the cheapest on the page and mid-priced in reality; the
 *       reversal the whole project is about.
 *   a1  base 2800, admin 900   -> a listing that can state its total.
 *   b1  base 5000, admin null  -> a listing that cannot.
 */

/** Phone frame every capture is taken in, matching the study's stated device. */
export const VIEWPORT = { width: 375, height: 812 };

/** 2x only. next/image derives the smaller sources; a committed 1x can drift. */
export const DEVICE_SCALE_FACTOR = 2;

/** Where the PNGs land, relative to the repository root. */
export const OUT_DIR = "public/work/rental";

/**
 * Files copied verbatim rather than re-rendered. Their provenance is "the
 * stimulus shown to participants", not "a screenshot of a page", and
 * re-rendering them would quietly replace the thing that was actually used.
 */
export const COPY_VERBATIM = [
  { from: "stimuli/stim-a1-current.png", to: "stimuli/stim-a1-current.png" },
  { from: "stimuli/stim-a1-redesign.png", to: "stimuli/stim-a1-redesign.png" },
  { from: "stimuli/stim-a2-current.png", to: "stimuli/stim-a2-current.png" },
  { from: "stimuli/stim-a2-redesign.png", to: "stimuli/stim-a2-redesign.png" },
];

/**
 * Files this pipeline replaces. They were exported from Figma, so they are set
 * in Inter while a browser capture on Windows would have been set in Segoe UI.
 * Keeping both would put two renderers inside one `compare` block.
 */
export const RETIRED = [
  "results-before.png",
  "results-after.png",
  "results-nothing-fits.png",
  "listing-detail.png",
];

export const SHOTS = [
  {
    file: "before-top.png",
    url: "/before.html",
    what: "The current product, as the search returns it.",
    assert: () => document.querySelectorAll("#list .card").length === 8,
    frame: { kind: "viewport" },
  },
  {
    // A fullPage capture of all eight is 750x7950 — a 1:10.6 strip, which at any
    // width a page can give it is 4000 CSS pixels tall. The wall reads from three
    // cards; the count belongs in the caption, not in the pixels.
    file: "before-three.png",
    url: "/before.html",
    what: "Three of the eight results a 3000 zl filter returns, each priced on a number nobody pays.",
    viewport: { width: 375, height: 1500 },
    assert: () => document.querySelectorAll("#list .card").length === 8,
    frame: { kind: "viewport" },
  },
  {
    file: "before-card-a8.png",
    url: "/before.html",
    // Cards carry no id, so the position is asserted by its price rather than
    // trusted: nth-child(8) is only a8 for as long as listings.js keeps its order.
    what: "The a8 card as the current product presents it: 2500 zl in the headline.",
    assert: () =>
      document
        .querySelector("#list .card:nth-child(8) .price-main")
        .textContent.replace(/\s/g, "")
        .startsWith("2500"),
    frame: { kind: "element", selector: "#list .card:nth-child(8)" },
  },

  {
    file: "after-top.png",
    url: "/after.html",
    what: "The redesign at a budget that returns everything, leading with the total.",
    budget: 5000,
    assert: () => document.querySelector("#summary").textContent.includes("8 z 8"),
    frame: { kind: "viewport" },
  },
  {
    file: "after-3500-empty.png",
    url: "/after.html",
    what: "The scenario budget: nothing fits, and the page says how far off it is.",
    budget: 3500,
    assert: () => document.querySelector("#summary").textContent.includes("0 z 8"),
    frame: { kind: "viewport" },
  },
  {
    file: "after-4100.png",
    url: "/after.html",
    what: "Five of eight, at 4100 zl.",
    budget: 4100,
    assert: () => document.querySelector("#summary").textContent.includes("5 z 8"),
    frame: { kind: "viewport" },
  },
  {
    file: "after-5000.png",
    url: "/after.html",
    what: "Eight of eight, at 5000 zl.",
    budget: 5000,
    assert: () => document.querySelector("#summary").textContent.includes("8 z 8"),
    frame: { kind: "viewport" },
  },
  {
    file: "after-unknown-group.png",
    url: "/after.html",
    what: "The three listings whose cost cannot be derived, grouped and named as such.",
    budget: 5000,
    assert: () => {
      const g = document.querySelector("#unknown-group");
      return !g.hidden && document.querySelectorAll("#unknown-list .card").length === 3;
    },
    frame: { kind: "element", selector: "#unknown-group" },
  },

  {
    file: "listing-a1.png",
    url: "/listing.html?id=a1",
    what: "A listing that can state its total: every component present.",
    assert: () => !document.querySelector("#recurring-total").textContent.includes("od "),
    frame: { kind: "fullPage" },
  },
  {
    file: "listing-a8.png",
    url: "/listing.html?id=a8",
    what: "The reversal in full: 2500 zl advertised, 4000 zl a month, 6500 zl to move in.",
    assert: () => {
      const t = document.body.textContent.replace(/\s/g, "");
      return t.includes("4000zł") && t.includes("6500zł");
    },
    frame: { kind: "fullPage" },
  },
  {
    file: "listing-b1.png",
    url: "/listing.html?id=b1",
    what: "A listing that cannot state its total, and says so instead of guessing.",
    assert: () => document.querySelector("#recurring-total").textContent.includes("od "),
    frame: { kind: "fullPage" },
  },
  {
    file: "listing-a8-recurring.png",
    url: "/listing.html?id=a8",
    what: "The recurring-cost panel alone, itemised.",
    assert: () => document.querySelectorAll("#recurring-rows li").length >= 3,
    frame: { kind: "element", selector: 'section[aria-labelledby="recurring-title"]' },
  },
];

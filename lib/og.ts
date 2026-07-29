// Shared pieces for the Open Graph cards.
//
// The cards are generated at build time from the same tokens and typefaces as
// the site, rather than kept as a hand-exported PNG — a share card that drifts
// away from the design system is worse than no share card.
//
// Satori (behind next/og) reads TTF/OTF, not WOFF2, so these load the masters in
// myfonts/ instead of the WOFF2 builds the browser gets. It also has no OKLCH,
// hence the hex mirrors of the tokens in app/globals.css.

import { readFileSync } from "node:fs";
import { join } from "node:path";

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";

/** sRGB mirrors of the OKLCH tokens in globals.css. Keep the two in step. */
export const ogColors = {
  bg: "#fafafa",
  ink: "#191714",
  muted: "#595653",
  line: "#d4d4d4",
  accent: "#2352c5",
} as const;

const font = (...segments: string[]) =>
  readFileSync(join(process.cwd(), "myfonts", ...segments));

export function ogFonts() {
  return [
    { name: "Druk Wide", data: font("DrukWideBold.ttf"), weight: 700 as const, style: "normal" as const },
    { name: "Noirden", data: font("TTF", "Noirden-Regular.ttf"), weight: 400 as const, style: "normal" as const },
    { name: "Noirden", data: font("TTF", "Noirden-SemiBold.ttf"), weight: 600 as const, style: "normal" as const },
  ];
}

/** The tracked uppercase kicker used at the top of every card. */
export const ogKicker = {
  fontFamily: "Noirden",
  fontSize: 22,
  fontWeight: 600,
  letterSpacing: "0.14em",
  textTransform: "uppercase" as const,
  color: ogColors.muted,
};

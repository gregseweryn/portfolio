import { portfolioDesk } from "./portfolio-desk";
import { krakowOvertourism } from "./krakow-overtourism";
import type { Study } from "./types";

export type { Block, ChartId, Download, Hero, Impact, Media, Study, StudyImage, StudySection } from "./types";

// Order is the page order, and the first entry takes the featured slot on the
// home page. Portfolio Desk leads because it is the one that shows the work
// being done rather than written up; the thesis follows as the evidence that
// the research half is real.
export const studies: Study[] = [portfolioDesk, krakowOvertourism];

export function getStudy(slug: string): Study | undefined {
  return studies.find((s) => s.slug === slug);
}

/**
 * The anchor id for a section, derived from its heading so the URL stays
 * readable and stable: #two-registers rather than #section-4. Renumbering the
 * sections therefore never breaks a link someone already shared.
 *
 * Headings are English and already unique within a study; the diacritic strip
 * is there so a Polish heading would not silently produce an empty id.
 */
export function sectionId(heading: string): string {
  return heading
    .normalize("NFD")
    // Combining marks, written as escapes so no literal diacritic sits in the
    // source: "Podgórze" becomes podgorze rather than podg-rze.
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

import { krakowOvertourism } from "./krakow-overtourism";
import type { Study } from "./types";

export type { Block, ChartId, Download, Hero, Impact, Media, Study, StudyImage, StudySection } from "./types";

// Only the thesis is published. The rental study and the synthetic-data audit
// that belongs with it still live in this directory — krakow-rental-search.ts
// and synthetic-data-audit.ts — but they are held back until the rental study's
// evaluative sessions are run and its write-up is revised. Adding them back to
// this array (thesis first: it keeps the featured slot) is all it takes to
// publish them again; the home page and the study pages already adapt to the
// number of studies in it.
export const studies: Study[] = [krakowOvertourism];

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

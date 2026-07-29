import { krakowOvertourism } from "./krakow-overtourism";
import type { Study } from "./types";

export type { Block, ChartId, Download, Hero, Impact, Media, Study, StudySection } from "./types";

// Order is meaningful: the first study takes the featured slot on the home page.
export const studies: Study[] = [krakowOvertourism];

export function getStudy(slug: string): Study | undefined {
  return studies.find((s) => s.slug === slug);
}

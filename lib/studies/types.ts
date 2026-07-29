// Case study content model.
//
// A study is a header plus a sequence of sections, and each section is a
// sequence of blocks. Blocks are the vocabulary the renderer knows how to draw:
// adding a new kind of content means adding a variant here and a branch in
// app/work/[slug]/page.tsx, not a new page template.

/** Intentional placeholder for an artifact that doesn't exist yet. */
export type Media = {
  /** What the real artifact will be, e.g. "Affinity map". */
  label: string;
  /** CSS aspect-ratio, defaults to 16 / 10. */
  ratio?: string;
};

export type Impact = {
  value: string;
  label: string;
};

/** Charts are referenced by id so content stays data, not JSX. */
export type ChartId =
  | "cost-items"
  | "registers"
  | "attitude-model"
  | "move-out-model"
  | "typology"
  | "themes"
  | "joint-display";

export type Block =
  /** Running text. The default block. */
  | { kind: "prose"; body: string[] }
  /** Placeholder frame — used by studies whose artifacts aren't ready. */
  | { kind: "media"; label: string; ratio?: string }
  /**
   * A chart, rendered from lib/data. Its caption and source live with the chart
   * component, next to the data they describe, so they cannot drift apart.
   */
  | { kind: "figure"; chart: ChartId }
  /**
   * An interview quote. The original is the data; the translation is a
   * courtesy, so it is set quieter.
   */
  | {
      kind: "quote";
      original: string;
      translation: string;
      speaker: string;
      context?: string;
    }
  /** A row of figures — scope, scale, headline results. */
  | { kind: "stats"; items: { value: string; label: string; note?: string }[] }
  /**
   * Methodological depth, collapsed by default. A recruiter skims past it;
   * a researcher opens it. Both are served.
   */
  | { kind: "note"; title: string; body: string[] }
  /** The "so what" layer — what the work says about how I work. */
  | { kind: "callout"; label: string; body: string[] }
  /** Enumerated points that shouldn't be buried in a paragraph. */
  | { kind: "list"; items: { title: string; body: string }[] };

export type StudySection = {
  heading: string;
  blocks: Block[];
};

export type Hero =
  | { kind: "placeholder"; label: string; ratio?: string }
  | { kind: "diagram"; id: "district-phases"; caption: string };

export type Download = {
  label: string;
  href: string;
  /** Format, language and weight — set expectations before the click. */
  note: string;
};

export type Study = {
  slug: string;
  title: string;
  /**
   * The work's registered title, where that differs from the editorial heading
   * above. Shown with the download and carried in the page metadata, so a reader
   * who has the catalogue entry can match it to this page. Set `formalTitleLang`
   * whenever it is not English — Polish needs it to reach a font with diacritics.
   */
  formalTitle?: string;
  formalTitleLang?: string;
  /** The research question, shown in the index. */
  question: string;
  year: string;
  role: string;
  /** Can be "Confidential" — researchers often work under NDA. */
  client: string;
  methods: string[];
  summary: string;
  impacts: Impact[];
  hero: Hero;
  sections: StudySection[];
  downloads?: Download[];
};

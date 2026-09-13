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

/**
 * A real image in the running text. The thesis study is all SVG, so this is the
 * first block that needs the image optimiser; width and height are required
 * because a case study that reflows while it loads reads as unfinished.
 */
export type StudyImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
  /**
   * Display cap in CSS pixels. A phone screenshot blown up to the full content
   * column reads as a mistake however sharp the source is, so portrait captures
   * set this to roughly phone width and sit centred. Omit for artwork that
   * should fill the column.
   */
  maxWidth?: number;
};

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
  | { kind: "list"; items: { title: string; body: string }[] }
  /** A single screenshot or artefact photograph. */
  | { kind: "image"; image: StudyImage; caption?: string }
  /**
   * A before/after pair under one caption. Two separate images would let a
   * reader compare the wrong things; pairing them is the claim.
   */
  | {
      kind: "compare";
      before: StudyImage;
      after: StudyImage;
      beforeLabel?: string;
      afterLabel?: string;
      caption: string;
    }
  /**
   * Several frames of one argument — three budgets in the same filter, say.
   * Deliberately not a generalisation of `compare`: a before/after pair carries
   * a claim that an n-up plate does not, and collapsing the two would lose it.
   */
  | {
      kind: "gallery";
      images: (StudyImage & { label?: string })[];
      caption: string;
      columns?: 2 | 3;
    };

export type StudySection = {
  /**
   * The visible heading, written as a claim rather than a topic, so that a
   * reader who skims only the headings still collects the findings.
   */
  heading: string;
  /**
   * Short label for the contents bar, and the source of the section's anchor id.
   *
   * Two reasons it is separate from `heading`. A contents list of twelve
   * full claims is a wall of text, and deriving the anchor from a claim gives
   * URLs like #nobody-had-asked-the-residents-since-before-covid that break the
   * moment the wording is edited. Falls back to `heading` when omitted.
   */
  navLabel?: string;
  blocks: Block[];
};

export type Hero =
  /**
   * Still legal, because a study may honestly not have its artifacts yet — but
   * no published study may use it. scripts/check-no-placeholders.mjs enforces
   * that against the built HTML, so this stays an admission rather than a habit.
   */
  | { kind: "placeholder"; label: string; ratio?: string }
  | { kind: "diagram"; id: "district-phases"; caption: string }
  | { kind: "image"; image: StudyImage; caption: string }
  /**
   * A study whose artifacts are data files rather than screens leads with a
   * figure it already owns. Building it a picture instead would be the exact
   * failure such a study argues against.
   */
  | { kind: "chart"; chart: ChartId };

export type Download = {
  label: string;
  href: string;
  /** Format, language and weight — set expectations before the click. */
  note: string;
  /**
   * A link that leaves the site rather than a file that arrives on disk. The
   * `download` attribute is meaningless cross-origin and the browser silently
   * navigates instead, so an external entry has to be rendered as a link and
   * opened in a new tab: a reader who clicks through to a prototype is still
   * halfway down a case study.
   */
  external?: boolean;
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

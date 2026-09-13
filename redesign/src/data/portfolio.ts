// Real content, lifted from grzegorzseweryn.pl — only the layout is new.
// Rule from PRODUCT.md: real work only, every number must be verifiable.

export const site = {
  name: "Grzegorz Seweryn",
  role: "UX Researcher",
  availability: "Open to UX research roles",
  location: "Kraków, PL",
  tagline: "I turn messy human behaviour into decisions teams can act on.",
  intro:
    "Two end-to-end studies: a loan-servicing work-list redesign, and a survey of 446 residents on who really pays for a tourist city.",
  email: "hello@grzegorzseweryn.pl",
  links: [
    { label: "LinkedIn", href: "https://www.linkedin.com/", external: true },
    { label: "Résumé", href: "#", external: false },
  ],
};

export const methods = [
  "Generative research",
  "Heuristic audit",
  "Usability testing",
  "KLM-GOMS modelling",
  "Survey design",
  "Information architecture",
  "Interviews",
  "Design systems",
];

export type Study = {
  index: string;
  slug: string;
  title: string;
  question: string;
  methods: string[];
  year: string;
  metric: { value: string; label: string };
};

export const studies: Study[] = [
  {
    index: "01",
    slug: "loan-worklist",
    title: "Two numbers that were never on the same screen",
    question:
      "Why did loan analysts burn minutes reconciling figures the system already held?",
    methods: ["Heuristic audit", "KLM-GOMS", "Desk research"],
    year: "2025",
    metric: { value: "65%", label: "less task time" },
  },
  {
    index: "02",
    slug: "tourist-city",
    title: "Who pays for a tourist city",
    question:
      "How is the cost of Kraków's touristification distributed across its residents?",
    methods: ["Survey design", "Mixed methods", "Field study"],
    year: "2024",
    metric: { value: "n = 446", label: "residents surveyed" },
  },
];

// Featured evidence — the loan work-list study, before/after task time (seconds).
export const evidence = {
  studySlug: "loan-worklist",
  caption: "Median task time to reconcile two figures, before and after redesign.",
  unit: "seconds per task",
  series: [
    { label: "Before", value: 74 },
    { label: "After", value: 26 },
  ],
};

export const proof = [
  { value: "2", label: "end-to-end studies" },
  { value: "446", label: "survey respondents" },
  { value: "3", label: "Kraków districts" },
  { value: "8", label: "research methods" },
];

export const process = [
  {
    step: "01",
    title: "Frame the question",
    body: "I start from what the team actually needs to decide — not the method I already know.",
  },
  {
    step: "02",
    title: "Choose methods that fit",
    body: "Generative or evaluative, quantitative or qualitative — the question picks the tool.",
  },
  {
    step: "03",
    title: "Synthesise honestly",
    body: "Turn messy evidence into a clear call, and stay explicit about what it does not prove.",
  },
];

export const about = {
  headline: "I start from the question, not the method.",
  body: "Research earns trust by being rigorous and honest about its limits, and earns its keep by turning what people do into decisions a team can actually make. I work across the whole arc: framing the right question, choosing methods that fit, talking to real people, and shaping messy evidence into something clear enough to act on.",
};

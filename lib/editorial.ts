// Content for the editorial homepage.
//
// The Figma Make prototype shipped its own copy of this file with placeholder
// values in it — hello@grzegorzseweryn.pl, a bare linkedin.com link, invented
// slugs, and a 74s -> 26s chart. The layout came across 1:1; the content did
// not, because the rule in PRODUCT.md is real work only and every number
// verifiable, and scripts/check-no-placeholders.mjs enforces it.
//
// So everything below is derived from lib/site.ts and lib/studies, which are
// the site's single source of truth. Adding a study there puts it on this page
// with no edit here.

import { site as realSite } from "./site";
import { methods as realMethods } from "./site";
import { studies as realStudies } from "./studies";

export const site = {
  name: realSite.name,
  role: realSite.role,
  availability: realSite.availability,
  // The prototype's "Kraków, PL" against the real string's
  // "Kraków, Poland · CET". The aside it sits in is narrow, so the short form
  // is what the layout was drawn for; the timezone lives on the contact page.
  location: "Kraków, PL",
  tagline: realSite.tagline,
  intro: realSite.intro,
  email: realSite.email,
  links: realSite.links.filter((l) => l.external),
};

export const methods = [...realMethods];

export type Study = {
  index: string;
  slug: string;
  href: string;
  title: string;
  question: string;
  methods: string[];
  year: string;
  metric: { value: string; label: string };
};

// The index number is positional, so it is derived rather than stored: a study
// that moves up the list in lib/studies renumbers itself here.
export const studies: Study[] = realStudies.map((s, i) => ({
  index: String(i + 1).padStart(2, "0"),
  slug: s.slug,
  href: `/work/${s.slug}`,
  title: s.title,
  question: s.question,
  // Three is what the row was drawn to hold; the studies carry up to six.
  methods: s.methods.slice(0, 3),
  year: s.year,
  metric: { value: s.impacts[0].value, label: s.impacts[0].label },
}));

// Featured evidence — the loan work-list study, before and after task time.
//
// The prototype charted 74s -> 26s. The measured figures are 60.90 s -> 21.30 s
// across three analyst tasks, modelled operator by operator; they are stated in
// the study itself and are what belongs on the homepage.
export const evidence = {
  studySlug: "portfolio-desk",
  caption: "Modelled task time across three analyst tasks, before and after redesign.",
  unit: "seconds per task",
  series: [
    { label: "Before", value: 60.9 },
    { label: "After", value: 21.3 },
  ],
};

export const proof = [
  { value: String(realStudies.length), label: "end-to-end studies" },
  { value: "446", label: "survey respondents" },
  { value: "3", label: "Kraków districts" },
  { value: String(realMethods.length), label: "research methods" },
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

// Site-wide constants.
export const site = {
  name: "Grzegorz Seweryn",
  initials: "GS",
  role: "UX Researcher",
  email: "grzegorz.seweryn99@gmail.com",
  location: "Kraków, Poland · CET",
  availability: "Open to UX research roles",
  tagline:
    "I turn messy human behaviour into decisions teams can act on.",
  // Two different jobs, so two strings. `intro` is read directly after the
  // tagline, so it must add rather than restate; one string doing both is why
  // this used to say "decisions" twice in the same fold and open with the role
  // that the line above it already gives.
  intro:
    "One study so far, carried end to end: 446 residents surveyed, ten interviewed, and a published account of where its own conclusions stop.",
  // Stands alone in search results and link previews, where the tagline is not
  // there to lean on.
  // Kept under ~155 characters: past that Google truncates, and the clause that
  // does the differentiating is the one at the end.
  description:
    "UX researcher in Kraków, working across generative and evaluative studies. One mixed-methods study published in full, including where its evidence stops.",
  // Deliberately null: the CV carries a personal phone number, and a public PDF
  // is exactly what number-harvesting bots crawl for. It goes to recruiters who
  // get in touch, not to anyone who finds the site. Setting a path here brings
  // all three download buttons back.
  resumeHref: null as string | null,
  links: [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/gseweryn/", external: true },
    { label: "Email", href: "mailto:grzegorz.seweryn99@gmail.com", external: false },
  ],
} as const;

export const nav = [
  { label: "Work", href: "/#work" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

// Methods shown as the "range at a glance" strip on the home page.
export const methods = [
  "Generative research",
  "Usability testing",
  "Survey design",
  "Diary studies",
  "Interviews",
  "Service blueprinting",
  "Concept testing",
  "Research ops",
] as const;

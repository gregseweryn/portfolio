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
  intro:
    "UX researcher working across generative and evaluative studies. I help product teams understand the people they build for, and make confident, evidence-based decisions.",
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

// The Otodom rental-cost study — self-directed teardown and redesign.
//
// SCOPE OF THIS FILE, read before editing.
//
// Every figure quoted here comes from one source: a measured audit of
// otodom.pl carried out on 4 August 2026, recorded in
// otodom-cost-mockup/README.md and reproducible by repeating the search.
// Nothing here is a finding about users, because no user research has been
// run yet.
//
// The study is therefore written as what it is: an interface teardown and a
// redesign proposal, with the evaluative study designed but not conducted.
// The section "What this doesn't support" says so in the study's own voice.
//
// WHEN THE FIELDWORK IS DONE: add the findings sections and the retest, and
// upgrade the limits section. Do not soften the current limits section before
// there is evidence to replace it.

import type { Study } from "./types";

export const krakowRentalSearch: Study = {
  slug: "krakow-rental-search",
  title: "The price that isn't the price",
  question:
    "Can someone searching for a flat in Kraków tell what it will actually cost them each month?",
  year: "2026",
  role: "Sole designer: audit, redesign, prototype",
  // Named so nobody mistakes this for commissioned work or for a product the
  // company shipped.
  client: "Self-directed · unaffiliated concept",
  methods: [
    "Interface audit",
    "Heuristic evaluation",
    "Interaction design",
    "Design system",
    "Accessibility audit",
  ],
  summary:
    "My thesis found one thing 446 residents agreed on more than anything else: tourism drives up rents. So I followed the finding to where people actually meet that market. Otodom's price filter matches on the advertised rent, not on what the flat costs, and across 423 listings that gap is systematic: filter to 3000 zl and two thirds of what comes back breaks the budget. I measured it, redesigned the flow around the total, and built it as working code.",
  impacts: [
    { value: "423", label: "Listings measured" },
    { value: "65%", label: "Of a 3000 zl search breaks the budget" },
    { value: "22%", label: "Median hidden share of the price" },
  ],
  hero: {
    kind: "placeholder",
    label: "Search results, before and after",
    ratio: "16 / 9",
  },
  sections: [
    {
      heading: "It started with the one thing 446 people agreed on",
      navLabel: "Where this came from",
      blocks: [
        {
          kind: "prose",
          body: [
            "My MA thesis surveyed 446 residents of central Krakow about living with tourism. Across the whole questionnaire, the statement that drew the most agreement, with the smallest spread of any item, was that tourism drives up rents: 88.1%.",
            "That study stopped at the perception. This one starts where the perception becomes a transaction, at the point where somebody opens a rental listing site and tries to work out what they can afford.",
            "I picked one question narrow enough that evidence could settle it. Not whether the market is expensive. Whether the interface lets you find out what a flat costs.",
          ],
        },
      ],
    },
    {
      heading: "Two thirds of what a price filter returns breaks the budget",
      navLabel: "The audit",
      blocks: [
        {
          kind: "prose",
          body: [
            "I started with one search: two-room flats in Krakow, price filter set to 3000 zl. On the first page, every result cost more than 3000 zl once the administrative rent was added, and I nearly wrote that finding up as it stood.",
            "It would have been an overstatement. A single page of results is not a measurement, so I collected 423 listings across six pages and recomputed. The real number is smaller than the first page suggested and more useful, because it holds across the market rather than across eight cards.",
            "Filter to 3000 zl and 213 listings come back, of which 139 actually cost more than 3000 zl. That is 65.3%. Narrow it to two-room flats, the search I started from, and it rises to 85.2%. The gap is not an artefact of one page; it is what the filter does.",
          ],
        },
        {
          kind: "stats",
          items: [
            { value: "423", label: "Listings measured", note: "Six pages, 4 August 2026" },
            { value: "65.3%", label: "Over budget", note: "Of 213 returned by a 3000 zl filter" },
            { value: "22.4%", label: "Median hidden share", note: "Administrative rent against the price" },
            { value: "6.8%", label: "Pairs ranked wrongly", note: "Of 76,335 comparable pairs" },
          ],
        },
        {
          kind: "prose",
          body: [
            "The administrative rent runs at a median of 700 zl, with the middle half between 537 and 856 zl and a maximum of 3100 zl. As a share of the advertised price its median is 22.4%. That is the size of the number the filter does not count.",
          ],
        },
        {
          kind: "note",
          title: "How the audit was run, and what it is not",
          body: [
            "423 listings from otodom.pl, Krakow rentals, pages one to six, collected on 4 August 2026. Advertised price and administrative rent were read from the cards as displayed. Utilities are excluded throughout because no card stated them. The dataset and the script that recomputes every figure on this page are kept with the project, so nothing here has to be taken on trust.",
            "This measures an interface, not a market. It describes what this product returned on this query on this day, and does not estimate the distribution of administrative rents across Krakow.",
            "It is also not a finding about users. Nobody was observed. What follows is a hypothesis about how the interface behaves, not a claim about how anyone reads it.",
          ],
        },
        {
          kind: "callout",
          label: "The correction is the point",
          body: [
            "The first page gave me a cleaner headline than the truth: eight out of eight, a round 100%. Scaling the audit cost half a day and reduced my own strongest claim from 100% to 65.3%.",
            "That trade is the whole argument for measuring. A number that survives 423 listings is worth more in a conversation than a number that survives one screenshot, and I would rather publish the smaller figure I can defend.",
          ],
        },
      ],
    },
    {
      heading: "One slot on the card carries two different meanings",
      navLabel: "Three defects",
      blocks: [
        {
          kind: "prose",
          body: [
            "Reading the results page closely, the same problem shows up in three places, and they compound.",
          ],
        },
        {
          kind: "list",
          items: [
            {
              title: "The filter matches on a number nobody pays",
              body: "Set the price filter to your budget and it compares against the advertised rent alone. The administrative rent, a median 22.4% on top, is not in the comparison. At a 3000 zl budget that returns 213 listings of which 139 are unaffordable, so the filter answers a question the searcher did not ask.",
            },
            {
              title: "Sorting by price reverses the real order",
              body: "Across the 397 listings that state both figures there are 76,335 comparable pairs, and 5,219 of them, 6.8%, are ordered one way by advertised price and the other way by real cost. One in fifteen comparisons puts the more expensive flat first. Rare enough to keep trusting the order, common enough to be wrong regularly.",
            },
            {
              title: "Missing data looks exactly like data",
              body: "The second line of a card sometimes carries the administrative rent and sometimes a price per square metre, in the same slot with nothing to distinguish them. 26 of 423 listings, 6.1%, never state the administrative rent at all, and a further 10 state it as zero. It is the smallest of the three defects by frequency and the worst by consequence: the cost cannot be derived from the card, and the absence is not marked.",
            },
          ],
        },
      ],
    },
    {
      heading: "The redesign leads with the total and names what is missing",
      navLabel: "The redesign",
      blocks: [
        {
          kind: "prose",
          body: [
            "Three moves, each tied to one of the three defects.",
            "The card leads with the full monthly cost rather than the base rent, and shows underneath what that total is made of, so the headline number can be trusted without opening the listing. The filter operates on the total and says so in words, because a control that silently counts something different from what the user means is the original defect. And where a listing omits the administrative rent, the card refuses to state a total it cannot support: it shows the floor it can prove, marks the gap in words, and colours it.",
            "That last one is the argument the whole project rests on. An interface that does not know something should say so, and should not let the not-knowing look like a number.",
          ],
        },
        {
          kind: "compare",
          before: {
            src: "/work/rental/results-before.png",
            alt: "Current search results: each card leads with the base rent, with the administrative rent on a smaller second line.",
            width: 750,
            height: 1624,
            maxWidth: 380,
          },
          after: {
            src: "/work/rental/results-after.png",
            alt: "Redesigned search results: each card leads with the full monthly cost, with a breakdown underneath and a badge confirming the total is complete.",
            width: 750,
            height: 1624,
            maxWidth: 380,
          },
          beforeLabel: "Current",
          afterLabel: "Redesigned",
          caption:
            "Same listings, same visual language, same density. Only the structure of the cost information changes, so any difference in how well the page can be read is attributable to that and not to the redesign looking newer.",
        },
        {
          kind: "prose",
          body: [
            "Holding the visual language constant was a deliberate constraint rather than a shortcut. A redesign that also changes the palette and the type cannot tell you which change did the work.",
          ],
        },
      ],
    },
    {
      heading: "The most useful screen is the one with nothing on it",
      navLabel: "Nothing fits",
      blocks: [
        {
          kind: "prose",
          body: [
            "The prototype runs on the eight listings from the original search. Set its filter to 3500 zl a month, all in, and it returns nothing: not one of the flats the live filter offered as affordable is affordable, and the cheapest real cost among them is 3800 zl.",
            "The current product responds to this situation with eight cards and no comment. The redesign says it in one sentence and names the number that makes the search actionable, which is the cheapest thing actually available.",
          ],
        },
        {
          kind: "image",
          image: {
            src: "/work/rental/results-nothing-fits.png",
            alt: "The redesigned results page with a 3500 zl budget: an empty state reading that none of the eight listings fits, and that the cheapest costs 3800 zl.",
            width: 750,
            height: 1624,
            maxWidth: 380,
          },
          caption:
            "An empty state that reports a fact rather than apologising. The number it names is the one that lets the searcher decide what to do next.",
        },
        {
          kind: "prose",
          body: [
            "The detail screen makes the second split the current product never draws: what you pay every month, and what you pay to move in. The deposit is shown separately and named as returnable, because folding it into one figure produces a number nobody can interpret.",
          ],
        },
        {
          kind: "image",
          image: {
            src: "/work/rental/listing-detail.png",
            alt: "Redesigned listing detail: a monthly cost panel of 4000 zl broken into rent, administrative rent and estimated utilities, and a first-month panel of 6500 zl including the returnable deposit.",
            width: 750,
            height: 1624,
            maxWidth: 380,
          },
          caption:
            "The listing that presents as the cheapest on the results page: 4000 zl a month, and 6500 zl to move in. Estimated components are labelled as estimates rather than quietly folded into the total.",
        },
        {
          kind: "note",
          title: "Two estimates, and why they are visible",
          body: [
            "Utilities and the deposit are not on the cards, so the prototype applies one stated convention rather than inventing a figure per flat: utilities at 300 zl for a two-room flat, deposit at one month's base rent.",
            "Both are labelled in the interface as estimates. That is not caution, it is the argument: the defect being fixed is a product that stays silent about components of the cost, so the fix cannot commit the same error in its own voice.",
          ],
        },
      ],
    },
    {
      heading: "Built as working code, not as pictures of a product",
      navLabel: "How it was built",
      blocks: [
        {
          kind: "prose",
          body: [
            "The redesign exists as a working interface with a filter that really filters, on the eleven listings I measured. That was a decision about what comes next rather than a flourish: the study designed to test this asks someone to set a filter to their own budget and then say what a flat costs, and a click-through prototype cannot accept a typed number.",
            "The design system runs in both directions. Colour, spacing, radius and type live as variables in Figma and as CSS custom properties in the code, with the same names on both sides, so the screens and the build cannot drift apart.",
          ],
        },
        {
          kind: "callout",
          label: "Accessibility, measured rather than asserted",
          body: [
            "Every text and background pair in the interface was measured in the browser. Two semantic colours came in at 4.51:1 and 4.57:1 against their tinted badge backgrounds, which passes AA and leaves no margin, so both were darkened until the smallest text on the card cleared 7:1.",
            "Zero horizontal scrolling at 375 px, touch targets at 44 px, a reduced-motion alternative for every transition, and the estimate markers separated in the content rather than only by margin, so a screen reader does not read 'MediaSZACUNEK' as one word.",
          ],
        },
      ],
    },
    {
      heading: "What this doesn't support",
      navLabel: "Limits",
      blocks: [
        {
          kind: "prose",
          body: [
            "The limits are the most important section on this page, because this project is at an earlier stage than a portfolio case study usually admits to.",
          ],
        },
        {
          kind: "note",
          title: "Three things this work cannot tell you",
          body: [
            "No user research has been conducted. Everything here is an audit of an interface and a designer's response to it. I have not observed a single person using either version, so I do not know whether the defect I measured is a defect people experience. An experienced renter may add the administrative rent by habit and never feel the problem.",
            "The redesign is therefore a hypothesis, not a validated solution. It is internally consistent and it fixes what the audit found, and that is all that can honestly be claimed for it.",
            "The audit is one search on one day. It describes the behaviour of a filter, not the distribution of rents in Krakow, and a different query would return different listings.",
          ],
        },
        {
          kind: "prose",
          body: [
            "The study that would settle it is designed and ready to run: six moderated sessions on the live product, with the participant's own phone, and one measured quantity, which is the gap in zloty between what a person says a flat costs and what it costs. The same tasks then run again on the prototype.",
            "Until those sessions happen, this page says what it is. I would rather publish a redesign labelled as untested than a redesign with invented validation attached to it.",
            "There is a longer version of that sentence. While preparing those sessions I generated a full synthetic corpus for them: transcripts, session metrics, a survey. None of it was ever published as a finding, and none of it appears on this page. I then audited it against the same 423 listings measured here, to find out how far generated data drifts from a market you can actually count. It drifts in ways worth knowing about, and the audit is its own case study.",
          ],
        },
      ],
    },
    {
      heading: "How I work",
      blocks: [
        {
          kind: "callout",
          label: "What this shows",
          body: [
            "The thesis on this site demonstrates research rigour on a question about a city. This one is the other half: taking a finding, following it into a product, measuring what the product actually does, and turning that into an interface with a reason behind every decision.",
            "Three habits carry across both. Measuring rather than asserting, which is why the contrast figures and the cost table in this study are numbers I took rather than adjectives I chose. Holding a variable still so a comparison means something, which is why the redesign shares its palette and type with the original. And publishing the limits with the work, which here means saying plainly that nobody has tested this yet.",
          ],
        },
        {
          kind: "callout",
          label: "What I'd do differently",
          body: [
            "Run the evaluative sessions before building the high-fidelity screens. The audit was strong enough to design from, and that made it tempting to skip ahead; the right order would have put six conversations between the audit and the interface.",
            "Capture the deposit and utility figures during the audit instead of applying a convention afterwards. They were in some listing descriptions and I did not collect them, which is why two components of the cost are estimates rather than measurements.",
          ],
        },
      ],
    },
  ],
};

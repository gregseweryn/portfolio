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
  // The listing that presents as the cheapest on the page and is not. Everything
  // else in this study is an argument for why that matters; this is the thing
  // itself, so it goes first.
  hero: {
    kind: "image",
    image: {
      src: "/work/rental/listing-a8.png",
      alt: "The redesigned detail screen for the listing advertised at 2500 zl: 4000 zl a month once the administrative rent and utilities are added, and 6500 zl to move in.",
      width: 750,
      height: 2036,
      maxWidth: 420,
    },
    caption:
      "Advertised at 2500 zl, the cheapest number on the results page. 4000 zl a month once the rest of it is added, and 6500 zl on the day you move in.",
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
          kind: "image",
          image: {
            src: "/work/rental/before-three.png",
            alt: "Three results from a search filtered to 3000 zl. Each card leads with the base rent in large type, with the administrative rent below it in grey at half the size.",
            width: 750,
            height: 3000,
            maxWidth: 380,
          },
          caption:
            "Three of the eight the filter returned, rebuilt from the measurements rather than screenshotted: addresses are reduced to a district and agencies to a generic label, per the study's anonymisation rule, and neither redaction touches the cost structure. Every headline is a number the tenant will not pay, and every card carries the rest of the figure directly underneath it, in grey, at half the size.",
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
        {
          kind: "image",
          image: {
            src: "/work/rental/before-card-a8.png",
            alt: "A single current listing card: 2500 zl set large, and beneath it in small grey type, plus administrative rent 1200 zl a month.",
            width: 686,
            height: 900,
            maxWidth: 420,
          },
          caption:
            "One card, both defects at once. 2500 zl is the smallest headline on the page and 1200 zl is the largest administrative rent in the search, and the type sizes are the wrong way round.",
        },
        {
          kind: "prose",
          body: [
            "The card pair below is the stimulus from a comprehension test built on this audit. It is deliberately the same listing twice, so the only thing that varies is where the cost lives.",
          ],
        },
        {
          kind: "compare",
          before: {
            src: "/work/rental/stimuli/stim-a1-current.png",
            alt: "The listing as the current product presents it: 2500 zl in the headline, administrative rent 1200 zl on a secondary line.",
            width: 750,
            height: 700,
            maxWidth: 380,
          },
          after: {
            src: "/work/rental/stimuli/stim-a1-redesign.png",
            alt: "The same listing redesigned: 3700 zl a month in the headline, with the components listed beneath it.",
            width: 750,
            height: 680,
            maxWidth: 380,
          },
          beforeLabel: "Current",
          afterLabel: "Redesigned",
          caption:
            "One listing, two ways of stating what it costs. The redesign moves no information onto the card that was not already there; it changes which number is the headline.",
        },
        {
          kind: "compare",
          before: {
            src: "/work/rental/stimuli/stim-a2-current.png",
            alt: "Two current cards stacked: the upper advertised lower than the lower one.",
            width: 750,
            height: 1208,
            maxWidth: 380,
          },
          after: {
            src: "/work/rental/stimuli/stim-a2-redesign.png",
            alt: "The same two listings redesigned, each leading with its full monthly cost, which reverses which of the two is cheaper.",
            width: 750,
            height: 1416,
            maxWidth: 380,
          },
          beforeLabel: "Current",
          afterLabel: "Redesigned",
          caption:
            "The comparison task from the same test. Left, the cheaper-looking listing is the more expensive one; right, the order is the order.",
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
            src: "/work/rental/before-top.png",
            alt: "Current search results: each card leads with the base rent, with the administrative rent on a smaller second line.",
            width: 750,
            height: 1624,
            maxWidth: 380,
          },
          after: {
            src: "/work/rental/after-top.png",
            alt: "Redesigned search results: each card leads with the full monthly cost, with a breakdown underneath and a badge confirming the total is complete.",
            width: 750,
            height: 1624,
            maxWidth: 380,
          },
          beforeLabel: "Current, rebuilt",
          afterLabel: "Redesigned",
          caption:
            "Both sides are prototypes. The current state is a reconstruction, built from the same eleven listings I measured and sharing one stylesheet with the redesign — not a screenshot of the live product. That is the point: with the typography, spacing and photography held identical, the only thing that varies between these two frames is the structure of the cost information, so any difference in how the page reads is attributable to that and not to the redesign looking newer.",
        },
        {
          kind: "prose",
          body: [
            "Holding the visual language constant was a deliberate constraint rather than a shortcut. A redesign that also changes the palette and the type cannot tell you which change did the work.",
            "The third move is the one that is easiest to skip and hardest to argue with. Three of the listings state no administrative rent at all, and the current card renders that absence exactly as it renders a number.",
          ],
        },
        {
          kind: "image",
          image: {
            src: "/work/rental/after-unknown-group.png",
            alt: "A separate group headed \"cannot establish the cost (3)\", containing three listings whose totals are shown as a floor with a badge reading that the administrative rent is not stated.",
            width: 750,
            height: 3252,
            maxWidth: 380,
          },
          caption:
            "Listings whose cost cannot be derived are grouped and named rather than mixed in. Each shows the floor it can prove and marks the gap in words, so a missing figure never has to pass for a small one.",
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
          kind: "gallery",
          columns: 3,
          images: [
            {
              src: "/work/rental/after-3500-empty.png",
              alt: "The redesigned results at a 3500 zl budget: an empty state reading that none of the eight listings fits and that the cheapest costs 3800 zl.",
              width: 750,
              height: 1624,
              label: "3500 zl · 0 of 8",
            },
            {
              src: "/work/rental/after-4100.png",
              alt: "The same page at 4100 zl: five of the eight listings shown, each leading with its full monthly cost.",
              width: 750,
              height: 1624,
              label: "4100 zl · 5 of 8",
            },
            {
              src: "/work/rental/after-5000.png",
              alt: "The same page at 5000 zl: all eight listings shown.",
              width: 750,
              height: 1624,
              label: "5000 zl · 8 of 8",
            },
          ],
          caption:
            "One control, three answers. The empty state reports a fact rather than apologising, and names the number that makes the search actionable. These are screenshots of the filter being moved, not three drawings of it: the prototype is working code, and CAPTURES.md records the state each frame was asserted to be in.",
        },
        {
          kind: "prose",
          body: [
            "The detail screen makes the second split the current product never draws: what you pay every month, and what you pay to move in. The deposit is shown separately and named as returnable, because folding it into one figure produces a number nobody can interpret.",
          ],
        },
        {
          // The a8 screen is the hero of this page, so the detail view earns its
          // place here by showing the harder half: what the same screen does when
          // the listing does not give it enough to work with.
          kind: "compare",
          before: {
            src: "/work/rental/listing-a1.png",
            alt: "A listing detail with every component present: a monthly total broken into rent, administrative rent and estimated utilities, and a first-month total including the returnable deposit.",
            width: 750,
            height: 2096,
            maxWidth: 380,
          },
          after: {
            src: "/work/rental/listing-b1.png",
            alt: "A listing detail where the administrative rent is not stated: the totals read \"from\" a figure, the missing row is marked in words, and the badge says the cost cannot be established.",
            width: 750,
            height: 2132,
            maxWidth: 380,
          },
          beforeLabel: "Cost stated",
          afterLabel: "Cost not stated",
          caption:
            "The same screen under both conditions. On the right nothing is estimated into the gap: the total becomes a floor, the missing component is named, and the badge says what the page does not know. An interface that does not know something should say so, and should not let the not-knowing look like a number.",
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

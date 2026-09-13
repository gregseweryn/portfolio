// Portfolio Desk — an audit of a loan servicing system and a redesign of it.
//
// SCOPE OF THIS FILE, read before editing.
//
// The project lives in its own repository, github.com/gregseweryn/uxportfolio,
// and this file is its account on the site rather than a second source of
// truth. Every figure here traces to one of four places in that repo:
//
//   docs/audit/heuristic-audit.md   the eighteen findings and their severities
//   docs/audit/klm-baseline.md      the "before" model, measured in M2
//   docs/audit/klm-after.md         the "after" model, and the three framings
//                                   of task 3 where the redesign loses
//   docs/design/contrast-carbon.md  contrast for the screens shown here
//
// TWO THINGS THAT ARE EASY TO GET WRONG.
//
// 1. The screens on this page are the Carbon port of the design. The KLM model
//    was run on the earlier OKLCH screens the port was built from. That the
//    numbers still hold is a checked claim, not an assumption:
//    docs/audit/klm-carbon-check.md walks all three task paths on the published
//    prototype and finds the same operator counts. Re-check it if the prototype
//    changes.
//
// 2. Contrast figures here come from contrast-carbon.md, not contrast.md. The
//    two reports cover different screens and their numbers are not
//    interchangeable.
//
// No user research was conducted. That is a stated methodological choice
// (ADR-0002 in the project repo), and the limits section says so in the study's
// own voice. Do not soften it.

import type { Study } from "./types";

export const portfolioDesk: Study = {
  slug: "portfolio-desk",
  title: "Two numbers that were never on the same screen",
  question:
    "Can an analyst holding 500 commercial loans tell which ones need a phone call this morning?",
  year: "2026",
  role: "Sole designer: audit, research, IA, UI, measurement",
  client: "Self-directed · Frappe Lending audited as the baseline",
  methods: [
    "Heuristic audit",
    "KLM-GOMS modelling",
    "Desk research",
    "Competitive analysis",
    "Information architecture",
    "Design system",
  ],
  summary:
    "A loan servicing system tracked 500 commercial loans and 150 of them were past due. It could tell you how many days late a borrower was. It could tell you how much they owed. It could never tell you both at once. I loaded it with a realistic book, audited it against eighteen findings, redesigned the three screens an analyst actually lives in, and modelled the work operator by operator on both sides: 60.90 s of task time became 21.30 s.",
  impacts: [
    { value: "65%", label: "Less task time across three analyst tasks" },
    { value: "18", label: "Findings in the heuristic audit" },
    { value: "500", label: "Loans in the audited book" },
  ],
  // The prototype is the only thing offered here, and it leaves the site, so it
  // is a link rather than a file. A reader who wants to check the work should
  // drive the thing rather than take a screenshot's word for it.
  downloads: [
    {
      label: "Open the prototype",
      href: "https://semi-secure-43576547.figma.site/",
      note: "Clickable, both themes, the three measured paths walkable",
      external: true,
    },
  ],
  // The work list is the screen the whole argument is about, so it opens the
  // page: the two numbers the audited system could never show together are in
  // the first row of it.
  hero: {
    kind: "image",
    image: {
      src: "/work/portfolio-desk/work-list-light.png",
      alt: "The redesigned work list: 79 loans over 30 days past due, sorted by days past due, with days and amount in arrears side by side in every row.",
      width: 2880,
      height: 1800,
    },
    caption:
      "The redesigned work list. Days past due and amount in arrears in the same row, sortable on both, with the total for the set above the table.",
  },
  sections: [
    {
      heading: "The result first",
      navLabel: "The result",
      blocks: [
        {
          kind: "prose",
          body: [
            "Three analyst tasks, modelled operator by operator before and after the redesign, under identical rules and from identical starting points. The model is the Keystroke-Level Model: expert execution, no mistakes, 1440 by 900.",
          ],
        },
        {
          kind: "stats",
          items: [
            {
              value: "23.33 s → 2.66 s",
              label: "Find loans over 30 days past due",
              note: "88.6% less, once the filter set is saved as a view",
            },
            {
              value: "13.35 s → 6.68 s",
              label: "Check one loan's payment history",
              note: "50.0% less, from one table instead of three document types",
            },
            {
              value: "24.22 s → 11.96 s",
              label: "Record a collections contact",
              note: "50.6% less, and the task where the numbers disagree",
            },
          ],
        },
        {
          kind: "prose",
          body: [
            "Across the three, 60.90 s becomes 21.30 s, a drop of 65.0%, and the number of round trips to the server falls from 8 to 4.",
            "The third task is the interesting one and it is not a clean win. It is taken apart further down, in its own section, because which framing of it I quote decides whether the redesign looks good.",
          ],
        },
      ],
    },
    {
      heading: "A registry of loans, not a tool for working them",
      navLabel: "The system",
      blocks: [
        {
          kind: "prose",
          body: [
            "Frappe Lending models the whole life of a loan: application, disbursement, interest accrual, repayment, write-off. It models the paperwork completely. What it does not model is the person who has to do something about a loan that stopped paying.",
            "I loaded it with a realistic book before auditing anything, because an empty system reveals nothing about information density or priority. Five hundred commercial loans, with amounts, terms and rates resampled from the US Small Business Administration's 7(a) FOIA dataset and converted to PLN, 30% of them delinquent, days past due computed by the system itself against a frozen reference date of 1 September 2026.",
          ],
        },
        {
          kind: "compare",
          before: {
            src: "/work/portfolio-desk/before-work-list.png",
            alt: "The audited system's loan list, filtered to days past due over 30. Columns: ID, Status, Posting Date, Loan Product. Every row reads Disbursed. No days, no amounts.",
            width: 1440,
            height: 900,
          },
          after: {
            src: "/work/portfolio-desk/work-list-light.png",
            alt: "The redesigned work list for the same filter: borrower, loan, product, servicing state, days past due, amount in arrears, outstanding, last paid and last action, sorted by days past due.",
            width: 2880,
            height: 1800,
          },
          beforeLabel: "Audited system",
          afterLabel: "Redesign",
          caption:
            "The same filter on both sides: loans more than 30 days past due, 79 of them. On the left the result contains neither a day of arrears nor a zloty of debt, and the product column prints the internal code INV60 rather than a name. On the right the two numbers the task needs are in the row.",
        },
      ],
    },
    {
      heading: "Eighteen findings, three that matter",
      navLabel: "The audit",
      blocks: [
        {
          kind: "prose",
          body: [
            "I evaluated the interface against Nielsen's ten heuristics and Shneiderman's eight golden rules, from one point of view throughout: an analyst who works in this system every day. Each finding carries a severity, an evidence screenshot and the principle it violates. Two came out catastrophic, six serious, seven minor and three cosmetic.",
            "They collapse into a small number of problems, and the rest follow from them.",
          ],
        },
        {
          kind: "list",
          items: [
            {
              title: "F-01, severity 4: the two numbers never meet",
              body: "Days past due lives on the loan document. Amounts outstanding live in a report of nineteen columns, none of which is days past due. Ranking 79 loans by biggest debt and longest overdue means opening two screens and holding the join in your head.",
            },
            {
              title: "F-02, severity 4: filtering by a number that stays invisible",
              body: "Filter the list by days past due and the result does not contain a days-past-due column. Adding one costs a separate trip through a settings dialog, where the field has to be found by typing its name.",
            },
            {
              title: "F-06, severity 3: no object for collections work",
              body: "Across every document type in the lending module there is nothing that records a call, a letter, a promise or an escalation. The only place to write that someone spoke to the borrower is a free-text comment, which cannot be filtered, counted or reported on.",
            },
            {
              title: "F-05, severity 3: ninety-four days late looks like paid on time",
              body: "A loan 119 days overdue and flagged non-performing carries the status Disbursed, exactly like a loan being repaid on schedule. Lifecycle state and servicing state are the same field, so neither can be read off the list.",
            },
          ],
        },
      ],
    },
    {
      heading: "The gap is not a matter of taste",
      navLabel: "Research",
      blocks: [
        {
          kind: "prose",
          body: [
            "Before drawing anything I checked whether the market treats these capabilities as optional. I rated six products against the five things the audit found missing: LoanPro, Mambu, nCino, Moody's lending suite, Salesforce Financial Services Cloud, and Baremetrics as a non-domain reference for how dashboards are built.",
            "The useful result is not the ranking, it is the last column. Every capability the audited system lacks entirely is shipping in at least two of the others. Days and amount in one view, servicing state readable without opening the record, a collections action as an object, a portfolio slice owned by a person, and an entry screen that states urgency.",
          ],
        },
        {
          kind: "note",
          title: "How far that comparison can be pushed",
          body: [
            "No competitor was used hands on. The ratings come from published product documentation and marketing pages, and the analysis marks which claim came from which. A row reading no evidence means exactly that, and is not a claim the capability is absent.",
            "Baremetrics is in the set deliberately as an outsider. It does not do lending, and it is there as a reference for dashboard construction rather than as a competitor.",
          ],
        },
      ],
    },
    {
      heading: "Organised around the work, not the document types",
      navLabel: "The redesign",
      blocks: [
        {
          kind: "prose",
          body: [
            "The audited module opens on a list of document types: Loan, Loan Application, Loan Security Pledge. Portfolio Desk opens on the state of the book and what moved since yesterday. Three levels, in the order the work needs them: the whole portfolio, a set of loans to get through, one loan.",
          ],
        },
        {
          kind: "image",
          image: {
            src: "/work/portfolio-desk/overview-light.png",
            alt: "The portfolio overview: 568.7 million PLN across 500 loans, 150 delinquent, 18.4 million PLN in arrears, 12 actions due. Below, the four days-past-due buckets, each with a bar for count and a bar for amount.",
            width: 2880,
            height: 1800,
          },
          caption:
            "Each delinquency bucket carries two bars, count and amount, because priority comes from both. The 90+ bucket holds the fewest loans and nearly the most money, which a single-axis view cannot show.",
        },
        {
          kind: "list",
          items: [
            {
              title: "One row answers the prioritisation question",
              body: "Days and amount together, sortable on both axes, with the total for the set above the table rather than below it. The filters can be saved as a named view, and that is what turns the first task into a single click.",
            },
            {
              title: "Servicing state split from lifecycle status",
              body: "Borrowed from Mambu, where an account moves to In Arrears on its own after a configured tolerance period. Two facts about a loan that were one field are now two.",
            },
            {
              title: "A collections action with real fields",
              body: "Channel, date, outcome, promised amount and date, next step and its due date. Recording early action is a regulatory expectation under the EBA loan monitoring guidelines, not a convenience.",
            },
            {
              title: "The set survives opening a loan",
              body: "Previous and next walk the filtered set and the breadcrumb holds the position, so returning to the list does not mean rebuilding the filter.",
            },
          ],
        },
        // Deliberately three full-width figures rather than one plate of three.
        // These are dense expert screens: at a third of the column the table
        // type lands around four pixels and the reader gets the silhouette of an
        // interface instead of the interface. A plate would also assert that the
        // three belong to one claim, and they do not.
        {
          kind: "image",
          image: {
            src: "/work/portfolio-desk/loan-detail-light.png",
            alt: "One loan: arrears split into principal and interest on the left, the record's own terms below it, and a right-hand column carrying the next step, the action history and the button that logs a new action.",
            width: 2880,
            height: 1800,
          },
          caption:
            "One loan. Arrears first, the paperwork below it, and a right-hand column that carries what can be done and what was already done: channel, person, outcome, next step, all fields rather than prose.",
        },
        {
          kind: "image",
          image: {
            src: "/work/portfolio-desk/repayment-history-light.png",
            alt: "Repayment history as one table: due date, instalment number, amount due, principal, interest, amount paid, date paid, days late and state.",
            width: 2880,
            height: 1800,
          },
          caption:
            "Repayment history as one table rather than three document types, with interest as a column instead of a separate set of rows. Answering what was paid and what is missing stops being a join held in the head.",
        },
        {
          kind: "image",
          image: {
            src: "/work/portfolio-desk/edge-states-light.png",
            alt: "Edge states: an empty set that names the filters narrowing it, the desired empty state with nothing past due, a loading skeleton with the right number of columns, an error that says nothing was changed, and a form recovery notice.",
            width: 2880,
            height: 1800,
          },
          caption:
            "The empty state names the filters doing the narrowing rather than announcing that there is nothing to show, the loading state is a skeleton with the table's real column count rather than a spinner, and the error says what failed and that nothing was changed.",
        },
      ],
    },
    {
      heading: "Where the redesign is slower",
      navLabel: "Where it loses",
      blocks: [
        {
          kind: "prose",
          body: [
            "Recording a contact is the task where the numbers disagree with each other. Which one I quote decides whether the redesign looks good, so here are all three.",
          ],
        },
        {
          kind: "stats",
          items: [
            {
              value: "−50.6%",
              label: "A record that can be filtered and reported",
              note: "24.22 s → 11.96 s",
            },
            {
              value: "+61.2%",
              label: "Interaction cost only, no note typed",
              note: "7.42 s → 11.96 s",
            },
            {
              value: "+28.3%",
              label: "The same 60-character note on both sides",
              note: "24.22 s → 31.07 s",
            },
          ],
        },
        {
          kind: "prose",
          body: [
            "Picking three options costs three pointing operations that typing into one box does not. Structure has a price and the model shows it.",
            "The first row is the fair comparison of the task, but only for one reason: in the audited system the note is not optional. It is the entire record, and without it nothing is captured at all. In the redesign channel, outcome and next step are fields, so the note becomes an addition. The other two rows are what that structure costs.",
            "What the model does not price is whether the result can be found again. The comment written in 7.42 seconds cannot be filtered, counted or surfaced on a work list, and the last-action column and the no-contact-in-30-days view both exist because the data has a shape.",
          ],
        },
        {
          kind: "image",
          image: {
            src: "/work/portfolio-desk/log-action-light.png",
            alt: "The log action drawer: channel, outcome and next step each as a row of buttons with one selected, action date and next step due pre-filled, promised amount and date, and an optional note field.",
            width: 2880,
            height: 1800,
          },
          caption:
            "Rebuilt after measuring. Channel, outcome and next step are one click each, both dates arrive filled in, and the note is the only free text left.",
        },
        {
          kind: "callout",
          label: "The measurement changed the design",
          body: [
            "The first version of this panel used dropdowns. Every choice cost two pointing operations instead of one, and the task modelled at 23.86 s, which is worse than the comment box it was replacing. Rebuilding the panel so every option is visible at once took it to 11.96 s.",
            "That is the whole reason to model the paths before publishing rather than after. A panel that reads as tidier was measurably worse than the thing it replaced, and nothing but the model would have said so.",
          ],
        },
      ],
    },
    {
      heading: "What was measured, and what was only modelled",
      navLabel: "Limits",
      blocks: [
        {
          kind: "prose",
          body: [
            "Every number on this page can be recomputed. The portfolio is a database snapshot with a recorded hash, response times were measured on that instance, and the contrast figures come from a script that reads the design tokens rather than from a claim. What follows is where the work stops, because a case study that only lists strengths is marketing.",
          ],
        },
        {
          kind: "note",
          title: "Six limits, stated rather than discovered",
          body: [
            "No users were tested. KLM-GOMS was chosen over usability testing deliberately: no participants were available, and a model with stated assumptions is more honest than five sessions with colleagues. It describes an expert making no mistakes, so it prices neither error recovery nor the cost of learning a new layout.",
            "The redesign is a prototype. The screens are walkable by clicking, with no database behind them. Server response times were carried over from the audited system unchanged, which understates the improvement, because the redesign issues fewer requests rather than faster ones.",
            "The data is synthetic. Amounts, terms and rates are resampled from a public US dataset; repayment behaviour and the distribution of delinquency are my own model. No figure here measures a real institution's book.",
            "One product dominates the book. 489 of the 500 loans are investment loans, because SBA terms cluster at 120 months and product assignment follows term. Nothing in the task model depends on comparing products, so the limitation is recorded rather than designed around.",
            "Accessibility was checked, not audited. Of 42 foreground and background pairs in these screens, the 38 that carry a threshold all clear WCAG 2.2 AA in both themes, verified by script. That is contrast only. No screen reader testing and no keyboard walkthrough with assistive technology.",
            "Nobody reviewed this but me. A single-evaluator heuristic audit misses findings that a panel of three to five would catch. The severity ratings are one person's judgement, applied consistently, and that is all they are.",
          ],
        },
        {
          kind: "note",
          title: "The screens here are a later iteration than the model",
          body: [
            "The task model was run on an earlier visual layer of the same screens. The version on this page is a port onto Carbon, which changed the surface and kept the layout, copy and data.",
            "That the times still hold is a checked claim rather than an assumption: all three task paths were walked on the published prototype and produce the same operator counts, one click for the first task, two for the second, four for the third. The check is written up in the project repository.",
            "Two screens in the prototype, the sign-in screen and the risk manager's team view, were added during that port. They were never part of the measured set and carry no figure on this page.",
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
            "The thesis on this site demonstrates research rigour on a question about a city. This is the other half: auditing a working system, measuring what it costs to use, and turning that into an interface where every decision has a reason behind it.",
            "The habit that carries across both is measuring rather than asserting. The contrast figures, the task times and the eighteen severities here are numbers I took, not adjectives I chose, and where the measurement contradicted the design I changed the design rather than the framing.",
          ],
        },
        {
          kind: "callout",
          label: "What I'd do differently",
          body: [
            "Model the action panel before building it rather than after. The dropdown version cost a rebuild that a ten-minute model would have prevented, and it was only caught because the measurement was scheduled before publication.",
            "Widen the seeded book. 489 of 500 loans landing on one product is an artefact of how the source dataset distributes terms, and it was noticed after the portfolio was generated rather than while the sampling was being designed.",
          ],
        },
      ],
    },
  ],
};

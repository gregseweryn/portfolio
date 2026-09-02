// The synthetic-data audit — measuring my own generated research corpus.
//
// SCOPE OF THIS FILE, read before editing.
//
// Three corpora of three different evidence classes appear on this page, and
// which is which is the study's whole subject. lib/data/synthetic/SOURCES.md
// records them field by field. In short:
//
//   measured    423 listings read off otodom.pl on 4 August 2026. The arbiter.
//   generated   the synthetic listing corpus a model produced for moderated
//               sessions that were never run. Cited ONLY for its statistical
//               properties, never for anything it appears to say about people.
//   web-anchor  a 250-listing reference set built from sourced market anchors,
//               used only for utilities and deposit, which the audit does not
//               carry. Itself synthetic, and the page says so.
//
// Every number here is emitted by scripts/extract-synthetic-audit.py, which
// recomputes it from the rawest column available and writes nothing if a check
// fails. Do not type a figure into prose that the script does not derive.
//
// WHAT THIS STUDY DOES NOT CLAIM: that the reference set is truth; that any of
// the H1–H4 hypotheses from the research plan is settled; that the generated
// corpus's qualitative material was checked at all. Only the numbers were.
//
// DO NOT soften the labelling. The synthetic corpus is named in the first
// heading, in the summary, and in every figure's visible source line. That
// redundancy is deliberate: a reader who only skims headings, and a reader who
// only looks at charts, must both come away knowing what they are looking at.

import type { Study } from "./types";

export const syntheticDataAudit: Study = {
  slug: "synthetic-data-audit",
  title: "The data agreed with me too much",
  formalTitle:
    "Walidacja rynkowa — jak bardzo dane wygenerowane przez model odbiegają od rynku",
  formalTitleLang: "pl",
  question:
    "When a language model generates your research data, which parts of the market does it get right, and which does it quietly flatten?",
  year: "2026",
  role: "Sole author: generation, audit, analysis",
  client: "Self-directed · audit of my own generated data",
  methods: [
    "Data validation",
    "Distribution analysis",
    "Provenance design",
    "Reproducible pipelines",
    "Research ethics",
  ],
  summary:
    "While preparing usability sessions for the Otodom study, I generated a full synthetic corpus to build the analysis against: listings, session metrics, a survey. None of it was ever published as a finding. Then I audited it against 423 listings I had actually measured. The medians were close enough to pass a glance. The spread was under half the market's, two cost components had a standard deviation of exactly zero, and the one number carrying the project's argument sat too often in the market's expensive tail.",
  impacts: [
    { value: "2.3×", label: "Too narrow: generated price spread against measured" },
    { value: "0", label: "Standard deviation in two generated cost components" },
    { value: "423", label: "Measured listings used as the arbiter" },
  ],
  // This study's artifacts are JSON files. A screenshot of one would be a
  // screenshot of code, not evidence, and building it a picture would be exactly
  // the failure it documents — so it leads with a figure it already owns.
  hero: { kind: "chart", chart: "variance-collapse" },
  // The working document, published as it was written rather than tidied up.
  // Its first section is a superseded-notice: it was built on web anchors, and
  // the measured audit later moved one of its findings from +55% to +11%. That
  // is the reason to publish it, not a reason to withhold it.
  downloads: [
    {
      label: "Market validation report, as written",
      href: "/work/synthetic-data-audit/walidacja-rynkowa-raport.md",
      note: "Markdown · Polish · 12 kB · superseded notice at the top",
    },
  ],
  sections: [
    {
      heading: "I generated the research data, then checked it against the market",
      navLabel: "What happened",
      blocks: [
        {
          kind: "prose",
          body: [
            "The Otodom study on this site is an interface audit and a redesign, with the evaluative sessions designed but not run. While preparing those sessions I generated the data they would have produced: a listing corpus, session metrics, transcripts, a survey of forty-seven people. The intent was scaffolding — something to build and test the analysis pipeline against before real participants arrived.",
            "Scaffolding is a defensible reason to generate data. It stops being defensible the moment nobody writes down which numbers came from a market and which came from a model. So this page is the writing-down.",
            "The generated corpus is never cited here for anything it appears to say about people. It is cited only for its statistical properties: what values it took, how widely it varied, and how often it reached for the ends of the range. Those properties can be checked, because I had already measured 423 real listings for the study it was built to support.",
          ],
        },
        {
          kind: "note",
          title: "What counts as which corpus, and why one exclusion matters",
          body: [
            "Measured: 423 listings read off otodom.pl on 4 August 2026, Kraków rentals, pages one to six. Advertised price, administrative rent, room count. This is the arbiter, and its file is pinned by hash so a silent edit stops the pipeline.",
            "Generated: twenty-nine listings from the synthetic corpus, produced by a model for sessions that never happened.",
            "Web-anchored: a 250-listing reference set built from sixteen sourced market anchors, used only for utilities and deposit, which no audited card stated. It is synthetic too, and its two hand-chosen scaling coefficients are published with it.",
            "One exclusion changes the answer. The eight-listing table in my own problem statement is a measurement, not model output — it is the first page of the same audit. An earlier draft of this comparison counted it as generated, which pushed the reported deviation in administrative rent from eleven per cent to fifty-five. The finding I would have published was an artefact of my own bookkeeping.",
          ],
        },
      ],
    },
    {
      heading: "The medians landed. The tails vanished.",
      navLabel: "Variance collapse",
      blocks: [
        {
          kind: "prose",
          body: [
            "The first check was the one most likely to pass, and it did: the generated corpus put the middle of the market almost exactly where the market puts it. If the test had stopped at a comparison of medians, the corpus would have been declared realistic.",
            "The spread is where it falls apart, and the spread is what a corpus is for.",
          ],
        },
        { kind: "figure", chart: "variance-collapse" },
        {
          kind: "prose",
          body: [
            "The measured listings run from a small flat in Nowa Huta to a large one in the centre. The generated ones occupy a narrow band that happens to sit around the budget figure written into the session scenario. Every generated listing is a plausible flat. Together they are not a plausible market — they are the neighbourhood of the task.",
            "This matters beyond realism. A usability scenario tests whether someone can work out what a flat costs. Run it against a corpus with no cheap listings and no expensive ones, and the task never presents the case that makes the interface fail hardest.",
          ],
        },
      ],
    },
    {
      heading: "The model used the market's extreme as its typical case",
      navLabel: "The admin rent",
      blocks: [
        {
          kind: "prose",
          body: [
            "Administrative rent is the variable the entire Otodom project is about: the charge that sits outside the advertised price and outside the price filter. It is also the variable a generated corpus has the most reason to exaggerate, because exaggerating it makes the argument look stronger.",
          ],
        },
        { kind: "figure", chart: "admin-distribution" },
        {
          kind: "prose",
          body: [
            "The medians are close. The shape is not. High administrative rents are real and they are uncommon; in the generated corpus they are ordinary. The two listings used in the comparison task, at 1200 and 1250 zl, sit near the top of everything I measured — presented to a participant as an unremarkable pair.",
            "One assumption was worse than the corpus. I had guessed that around thirty per cent of cards omit the administrative rent entirely. In the audit it is five and a half per cent. I have left the wrong figure in the reference generator rather than quietly correcting it, because the generator is now evidence of what an unsourced assumption does, and rewriting it after seeing the answer would destroy that evidence.",
          ],
        },
      ],
    },
    {
      heading: "Two variables had a standard deviation of exactly zero",
      navLabel: "Constants",
      blocks: [
        { kind: "figure", chart: "constants-not-distributions" },
        {
          kind: "prose",
          body: [
            "Utilities are 300 zl in every generated listing. The deposit is one month's rent in every generated listing. Both are defensible conventions and both are stated as conventions in the mockup's documentation — but a convention applied without variance is a rule wearing the costume of an observation.",
            "The honest part is that neither can be checked. Not one of the 423 audited cards stated utilities or a deposit, which is itself a finding about the product: two components of what a tenant pays are absent from the interface entirely. Their reference here is a web-anchored construction, and the chart draws the line between what has an arbiter and what does not rather than hiding it in a footnote.",
            "A third variable, the agency commission, is missing from the chart on purpose. Its reference rests on an assumed share of agency listings with no source at all, and drawing it would give a guess the same visual weight as a measurement. It stays in the data file, flagged, and in this sentence.",
          ],
        },
      ],
    },
    {
      heading: "The project's claims survive; the range I quoted did not",
      navLabel: "Do the claims hold",
      blocks: [
        {
          kind: "prose",
          body: [
            "The point of an audit like this is not to catch a model. It is to find out whether the work built on top of the data still stands. So I re-derived the two countable claims from my own problem statement against the full 423 listings.",
          ],
        },
        { kind: "figure", chart: "claim-survival" },
        {
          kind: "prose",
          body: [
            "The claim survives and the storytelling does not. Filtering to 3000 zl and adding the administrative rent breaks the budget for the overwhelming majority of listings in the band — that was never in doubt. But the range I quoted was read off the eight listings at the top of the filter, and laid against the whole band it runs from the median to the maximum. I had published the upper half of a distribution as though it were the distribution.",
            "The second claim, that ordering by advertised price reverses the ordering by real cost, re-derives at 6.8% of comparable pairs — the same figure the Otodom study already publishes, recomputed here from the same file as a cross-check. If the two pages ever stop agreeing, the extraction script fails rather than leaving a reader to guess which one is wrong.",
            "The third claim, that a missing administrative rent looks identical to a zero one, is not on this page. It is a property of how a card renders an absence, and no amount of counting settles it.",
          ],
        },
      ],
    },
    {
      heading: "What I could not check",
      navLabel: "Limits",
      blocks: [
        {
          kind: "prose",
          body: [
            "This study is an audit of numbers by someone who produced the numbers. Its limits are load-bearing.",
          ],
        },
        {
          kind: "note",
          title: "Five things this audit does not establish",
          body: [
            "The reference set is not truth. For utilities and deposit it is itself synthetic, built from web anchors and two scaling coefficients I chose by hand. It is better documented than the corpus it judges, which is not the same as being right.",
            "My own first pass at this was miscalibrated. Using web anchors alone, I reported the administrative rent as fifty-five per cent too high. Against the measured audit it is eleven. The anchor I had flagged as the weakest link in my own report turned out to be exactly the one that failed.",
            "Two assumptions still have no source: the share of listings that come through an agency, and — before the audit settled it — the share of cards that omit the administrative rent. One evening of manual counting on otodom.pl would close both, and that is the next thing worth doing.",
            "The qualitative material is untouched. Six transcripts, a coding matrix, forty-seven open-text survey answers. Nothing in this method reaches them, and I have no measurement of how far they drift.",
            "Nothing here settles whether the Otodom redesign works. The evaluative sessions have still not been run. An audit of generated data is not a substitute for data.",
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
            "The other two studies on this site argue that a claim should carry its evidence. This one is what that costs when the evidence is inconvenient: a number I had already written down went from fifty-five per cent to eleven, and the range I had quoted turned out to describe the top half of a distribution.",
            "Publishing that is cheaper than the alternative. A portfolio that only contains findings which survived is a portfolio with a selection effect, and anyone who has run a study knows it.",
          ],
        },
        {
          kind: "callout",
          label: "What I'd do differently",
          body: [
            "Measure before generating. The audit that settled every question here already existed when the corpus was built; I anchored on secondary sources anyway, and three of the six deviations I first reported were wrong because of it.",
            "Attach the evidence class to the data at the point of creation, not at the point of publication. Every row in this study's output declares whether its reference is measured, anchored or assumed. Adding that field afterwards took longer than generating the corpus did.",
          ],
        },
      ],
    },
  ],
};

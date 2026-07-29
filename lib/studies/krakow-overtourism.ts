// The Kraków touristification study — MA thesis, Jagiellonian University.
//
// Every figure quoted here is verified against the defended thesis; see
// lib/data/thesis/SOURCES.md for the provenance of each one and for the single
// place where this site knowingly differs from the printed text.
//
// Interview quotes reproduce the excerpts as published in chapter V of the
// thesis: pseudonymised, with street names and other identifying detail already
// removed. Bracketed numbers are transcript paragraph references, kept so a
// reader can locate them in the thesis.

import type { Study } from "./types";

export const krakowOvertourism: Study = {
  slug: "krakow-touristification",
  title: "Who pays for a tourist city",
  question:
    "How do the people who actually live in central Kraków experience tourism — and what decides where they land?",
  year: "2026",
  role: "Sole researcher — design, fieldwork, analysis",
  client: "MA thesis · Jagiellonian University",
  methods: [
    "Convergent mixed methods",
    "Survey design",
    "In-depth interviews",
    "Reflexive thematic analysis",
    "Regression & cluster analysis",
  ],
  summary:
    "Everyone had an opinion about crowded Kraków — the press, city hall, activist groups. Almost nobody had asked the residents since before the pandemic. I ran a survey of 446 people and ten in-depth interviews in parallel, and found that touristification runs in two registers at once: one that hits the whole city equally, and one that tracks how far each district has travelled.",
  impacts: [
    { value: "446", label: "Survey responses" },
    { value: "10", label: "In-depth interviews" },
    { value: "88%", label: "Agree tourism drives up rents" },
  ],
  hero: {
    kind: "diagram",
    id: "district-phases",
    caption:
      "Three districts chosen as three phases of one process — and positioned here by the cost index their residents actually reported. Old Town and Kazimierz land on top of each other; Podgórze sits apart, and expects to follow.",
  },
  downloads: [
    {
      label: "Read the full thesis",
      href: "/krakow-touristification-thesis.pdf",
      note: "PDF · Polish · 172 pages",
    },
  ],
  sections: [
    {
      heading: "The gap",
      blocks: [
        {
          kind: "prose",
          body: [
            "Kraków drew 14.7 million visitors in 2024 — more than before the pandemic — and tourism now accounts for roughly 8% of the city's economy. In District I alone, short-let listings make up about 42% of the whole-flat rental market. The debate about what this does to the city was loud and confident on all sides.",
            "It was also running on old evidence. The last solid survey of how residents themselves saw it was collected before COVID, in a city whose tourist numbers had since collapsed by three quarters and then rebounded past their old peak. The people living inside the change were the ones nobody had asked recently.",
            "So the question was deliberately plain: how do permanent residents of central Kraków perceive and live with tourism — and what differentiates their attitudes? Not whether overtourism is real. What it does, to whom, and why some residents land somewhere very different from their neighbours.",
          ],
        },
        {
          kind: "stats",
          items: [
            { value: "446", label: "Survey responses", note: "Three central districts" },
            { value: "10", label: "In-depth interviews", note: "45–70 minutes each" },
            { value: "6 wks", label: "Fieldwork", note: "April–June 2026" },
            { value: "20 yrs", label: "Median tenure", note: "Mean, not median: 20.1" },
          ],
        },
      ],
    },
    {
      heading: "Design",
      blocks: [
        {
          kind: "prose",
          body: [
            "I used a convergent mixed-methods design: the survey and the interviews ran at the same time, were analysed separately, and were brought together only at the end. That order matters — it stops one strand quietly steering the other, and it means a disagreement between them is a finding rather than an embarrassment.",
            "The three districts weren't a convenience sample. They were picked as three phases of the same process: Old Town, where touristification is oldest and most complete; Kazimierz, where it arrived fast and came with nightlife and short-lets; and central Podgórze, only recently being drawn in. If the phase framing held, the districts should differ in a specific, predictable way rather than just being 'more' or 'less' affected.",
            "The questionnaire was built from the four dimensions of urban tourism hypertrophy — spatial, social, economic, institutional — so the instrument followed the theory rather than being assembled ad hoc. Interviews were recruited from survey respondents by contrast: district against tenure against housing status against stated attitude.",
          ],
        },
        {
          kind: "note",
          title: "Sampling, and what it does and doesn't license",
          body: [
            "Recruitment ran through local Facebook groups — the neighbourhood 'Ask a Neighbour' series and city groups. That is a non-probability, opportunity sample, and the channel plausibly over-recruits people already exercised about tourism.",
            "The consequence is stated rather than glossed: significance tests are read heuristically, and every conclusion is about the group studied, not about the population of central Kraków. A portfolio version of this study that quietly dropped that caveat would be a worse piece of research than the thesis.",
            "One promoter-directed check: the 29 respondents living in their district under two years were tested against everyone else across all attitude dimensions. No differences on general attitude (p = 0.35), costs (p = 0.62), benefits (p = 0.12), outlook (p = 0.37) or recommendation (p = 0.26) — only on age, which is a mechanical consequence of short tenure. They stayed in the sample.",
          ],
        },
        {
          kind: "note",
          title: "Scale construction and reliability",
          body: [
            "Three indices were built as item means on a 1–5 scale: general attitude from block B (α = 0.86), perceived costs from C1–C9 (α = 0.92), perceived benefits from D1–D6 (α = 0.87).",
            "Blocks E and F did not survive as whole scales, and that was informative rather than fatal. Block E contained a reversed item on owners' rights whose correlation with the rest was near zero; block F mixed evaluation of institutions with normative demands. Rather than report a reliability figure that averaged unlike things, I extracted the homogeneous subscales — E1–E4 (α = 0.72) and F1–F4 (α = 0.69) — and analysed the remaining items individually.",
            "For the qualitative strand: reflexive thematic analysis, hybrid framing — deductive themes from the hypertrophy dimensions, held open to inductive ones. No CAQDAS, deliberately: with a ten-interview corpus, immersion beats coding software, and the literature treats it as optional at this scale.",
          ],
        },
      ],
    },
    {
      heading: "A negative balance",
      blocks: [
        {
          kind: "prose",
          body: [
            "The cost index sits well above the midpoint of the scale; the benefit index sits below it, at 2.87. But the interesting part isn't the average — it's the hierarchy underneath it.",
            "What residents agree on most is not noise or crowds. It's money. Agreement that tourism drives up rents reaches 88.1%, with the smallest spread of any item in the questionnaire — the closest thing in the data to a consensus. Service prices follow at 76.8%, everyday shops being displaced at 65.7%.",
          ],
        },
        { kind: "figure", chart: "cost-items" },
        {
          kind: "prose",
          body: [
            "The benefit side is the mirror image. The only benefit to clear the midpoint is 'tourism creates jobs' (3.41) — a benefit that belongs to the city's economy rather than to the respondent's own street. The items closest to daily life score worst: better public space at 2.59, better infrastructure at 2.52.",
            "The institutional picture is starker still. Just 8.5% agree the city manages tourism effectively; 5.0% think it adequately protects residents' interests; 3.5% feel residents have any real influence over decisions. That is not dissatisfaction with a policy. It is an absence of felt agency.",
          ],
        },
      ],
    },
    {
      heading: "Two registers",
      blocks: [
        {
          kind: "prose",
          body: [
            "The district comparison is where the study earns its keep. Podgórze is systematically milder across every summary measure — higher attitude (3.04 against 2.62 and 2.57), lower costs, higher benefits. Old Town and Kazimierz never differ significantly from each other; the line always falls between them and Podgórze.",
            "But three items break that pattern completely, and they break it in the same direction. Rent pressure, short-term rental as a problem, and distrust of the city are statistically indistinguishable across all three districts. Meanwhile noise produces the largest effect in the entire study, and the sense of the district becoming an attraction rather than a home is close behind.",
            "That split is the finding. Touristification is not one process of varying intensity — it runs in two registers at once. The economic and institutional register is city-wide: it reaches Podgórze at full strength, whatever phase the district is in. The everyday-experience register is graded: noise, crowding and the loss of domesticity track how far the district has actually travelled.",
          ],
        },
        { kind: "figure", chart: "registers" },
      ],
    },
    {
      heading: "What explains an attitude",
      blocks: [
        {
          kind: "prose",
          body: [
            "With attitude as the outcome and the usual suspects as predictors, the model is unusually clean. Perceived costs and perceived benefits carry it; age, gender, years in the district, working in tourism and owning your home are all flat.",
            "This is the study's clearest theoretical result: attitude is a balance sheet, not a demographic position. Where you sit on tourism is explained by what you think it costs you and what you think it gives you — which is exactly what social exchange theory predicts, and exactly what the literature had found demographics fail to explain.",
          ],
        },
        { kind: "figure", chart: "attitude-model" },
        {
          kind: "prose",
          body: [
            "The district effect is worth pausing on, because the raw means point the other way. Podgórze looked like the district with the friendliest attitude — but once costs and benefits are controlled, its coefficient turns slightly negative. Podgórze's warmth was never a property of Podgórze. It was entirely the more favourable balance its residents happened to report.",
          ],
        },
        {
          kind: "note",
          title: "Why an R² of 0.80 is not as impressive as it looks",
          body: [
            "A model explaining 80% of the variance in attitude should invite suspicion, not applause, and the thesis says so explicitly.",
            "The indices are conceptually close to the outcome: a general attitude towards tourism is not far from an assessment of its costs and benefits. The model therefore demonstrates the internal consistency of the theoretical frame — it confirms that the exchange model hangs together — rather than uncovering a surprising predictive relationship.",
            "Reported honestly, that is still a result worth having. Reported as predictive power, it would be overclaiming.",
          ],
        },
      ],
    },
    {
      heading: "Who leaves, who is anchored",
      blocks: [
        {
          kind: "prose",
          body: [
            "Between 13.9% and 17.8% of respondents had seriously considered moving out for tourism-related reasons, with no significant difference between districts. The model explains why the district label tells you so little — and what does.",
            "Costs dominate: a standard deviation more perceived cost multiplies the odds of considering leaving by 5.5. Benefits protect, but far more weakly (0.54). The asymmetry is the point — costs push much harder than benefits hold.",
          ],
        },
        { kind: "figure", chart: "move-out-model" },
        {
          kind: "prose",
          body: [
            "Two results needed the interviews to make sense of. Owning your home roughly halves the odds of considering leaving — material anchoring, straightforwardly. And living in Podgórze more than doubles them, at identical perceived costs and benefits, which reads as a paradox: the mildest district produces the strongest intention to leave.",
            "The interviews resolved it. Podgórze residents don't describe their present; they describe Kazimierz and call it their future. The district's own residents named the trajectory unprompted — anticipatory unease, doing work that the cross-sectional model could register but never explain.",
          ],
        },
      ],
    },
    {
      heading: "Two types, one axis",
      blocks: [
        {
          kind: "prose",
          body: [
            "Clustering on the standardised cost and benefit indices split the sample cleanly in two: 57.3% 'in conflict' — high costs, low benefits, and more than a quarter considering leaving — against 42.7% 'reconciled', with almost none considering it.",
            "That result is real and useful for naming who is in the room. It is also considerably weaker evidence than it looks, and the thesis makes that argument against itself rather than waiting for a reviewer to make it.",
          ],
        },
        { kind: "figure", chart: "typology" },
        {
          kind: "prose",
          body: [
            "The two indices correlate at −0.73. The clusters therefore lie along a single diagonal in the cost–benefit space, and splitting the sample at the median of the balance reproduces the same two groups 92.5% of the time. The typology is not uncovering distinct, non-linear patterns of attitude; it is putting names on the poles of a continuum.",
            "Which is worth doing — a segmentation that helps a reader hold 446 people in mind earns its place. It just isn't an argument against models that treat attitude as continuous, and presenting it as one would have been the easiest overclaim in the whole study.",
          ],
        },
      ],
    },
    {
      heading: "What people said",
      blocks: [
        {
          kind: "prose",
          body: [
            "Ten interviews, analysed reflexively, produced eleven themes — six anticipated by the theoretical frame, five that emerged from the corpus and turned out to carry the most interpretive weight.",
            "The coding matrix is published rather than summarised, so the counts quoted in the text can be checked against it.",
          ],
        },
        { kind: "figure", chart: "themes" },
        {
          kind: "prose",
          body: [
            "The economic findings arrive in the interviews as concrete loss. Not 'service displacement' — a specific shop, on a specific street, that used to sell bread.",
          ],
        },
        {
          kind: "quote",
          original:
            "To dosłownie boli, jak idziesz po chleb i widzisz, że już nie ma sklepu z chlebem.",
          translation:
            "It genuinely hurts — you go out for bread and find the bread shop isn't there any more.",
          speaker: "Bartek",
          context: "Podgórze, 12 years [17]",
        },
        {
          kind: "prose",
          body: [
            "The theme the survey could measure but not explain is the loss of home. Respondents reached independently for the same family of metaphors — stage set, open-air museum, zoo, hotel annexe — describing a reversal in which the resident becomes the exhibit.",
          ],
        },
        {
          kind: "quote",
          original:
            "Kazimierz jest sceną, mieszkańcy są statystami, turyści są publicznością.",
          translation:
            "Kazimierz is a stage. The residents are the extras, the tourists are the audience.",
          speaker: "Adam",
          context: "Kazimierz, architect, 20 years [17]",
        },
        {
          kind: "prose",
          body: [
            "Criticism of the city cut across every other division — voiced just as sharply by interviewees who make their living from tourism as by those who don't.",
          ],
        },
        {
          kind: "quote",
          original: "Władze miasta sprzedały moją dzielnicę turystom.",
          translation: "The city authorities sold my district to the tourists.",
          speaker: "Stefania",
          context: "Old Town, lifelong resident [33]",
        },
        {
          kind: "prose",
          body: [
            "And running through almost every interview was a piece of interpretive work I hadn't anticipated, which became the theme that most changed how I read the whole corpus. Respondents consistently, sometimes almost ritually, separated criticism of the system from any hostility towards visitors as people.",
          ],
        },
        {
          kind: "quote",
          original: "To nie jest wina turystów (...) To jest wina tych, którzy zezwolili.",
          translation:
            "It isn't the tourists' fault … It's the fault of the people who allowed it.",
          speaker: "Stefania",
          context: "Old Town [45]",
        },
        {
          kind: "prose",
          body: [
            "That distinction matters well beyond this study. 'Tourismphobia' is the label the public debate reaches for, and this corpus does not support it. What residents articulated was a conflict about a model of urban development and about who gets to decide it — not antagonism towards the people arriving on the train.",
          ],
        },
      ],
    },
    {
      heading: "Putting the strands together",
      blocks: [
        {
          kind: "prose",
          body: [
            "Convergence between the two strands was high and systematic, dimension by dimension. Which makes the one place they pull apart the most interesting row in the table.",
          ],
        },
        { kind: "figure", chart: "joint-display" },
        {
          kind: "prose",
          body: [
            "In the model, longer tenure weakly raises the odds of considering leaving. In the interviews, the most deeply rooted residents were the ones most firmly staying. Both can be true, and reconciling them sharpened the finding: what protects is ownership, not time. The anchoring the interviews describe is a braid of property and biography, and the model separates the two strands the interviews had bundled together.",
            "A convergent design exists to surface exactly this. Reporting the tension — rather than picking whichever strand told the tidier story — is what the design was for.",
          ],
        },
      ],
    },
    {
      heading: "What follows",
      blocks: [
        {
          kind: "list",
          items: [
            {
              title: "Regulate short-term rental",
              body: "The one measure with support across every division in the data: 73.3% of survey respondents, and nine of ten interviewees raising it unprompted as the single thing they would change. It is the rare recommendation that the reconciled and the in-conflict agree on.",
            },
            {
              title: "Protect everyday retail",
              body: "The displacement of ordinary shops is felt as concrete loss and is one of the strongest cost items. It is also the register that reaches the whole city rather than only the advanced districts.",
            },
            {
              title: "Manage the night economy where it actually bites",
              body: "Noise produces the single largest between-district effect in the study, concentrated in Kazimierz. This is the one problem that genuinely should be targeted by district rather than city-wide.",
            },
            {
              title: "Rebuild residents' sense of agency",
              body: "3.5% of respondents feel they have real influence over decisions affecting their district. No tourism policy survives that number for long, however well designed.",
            },
          ],
        },
      ],
    },
    {
      heading: "What this doesn't support",
      blocks: [
        {
          kind: "prose",
          body: [
            "The limits are part of the result, not an appendix to it.",
          ],
        },
        {
          kind: "note",
          title: "Three things this study cannot tell you",
          body: [
            "Non-probability sampling with self-selection. The findings describe the group studied. They do not estimate the distribution of attitudes across central Kraków, and a critical over-representation is plausible given the recruitment channel.",
            "Cross-sectional data. The theoretical frame borrows temporal models — destination life cycle, Doxey's Irridex — but a single snapshot cannot test a temporal claim. The phase reading of the three districts is an interpretation supported by the data, not a demonstrated trajectory. A panel design is the obvious next step.",
            "Heterogeneous instrument blocks. Blocks E and F mixed distinct constructs and had to be handled at item and subscale level. That was the right recovery, but it was recovery from a design problem I would now avoid at the questionnaire stage.",
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
            "This is an academic study of a city, not a product. What transfers is the shape of the work: framing a question precisely enough that evidence can settle it, choosing methods to fit the question rather than habit, running qualitative and quantitative strands so each answers what the other can't, and being explicit about where the evidence stops.",
            "Three moves in particular are the same moves product discovery needs. Segmenting a population by what people perceive rather than by who they are — the demographics explained nothing here, and they usually don't. Using interviews to explain a quantitative result that would otherwise stay a curiosity, as with the Podgórze paradox. And publishing the caveat with the finding, including the argument against my own typology, because a stakeholder who discovers the weakness themselves stops trusting everything else in the deck.",
          ],
        },
        {
          kind: "callout",
          label: "What I'd do differently",
          body: [
            "Split blocks E and F at the design stage instead of repairing them in analysis — the reliability problem was foreseeable from the item wording.",
            "Build in a panel wave. Every interesting claim in this study is about change over time, and every one of them had to be inferred from a single cross-section.",
            "Push harder on recruitment beyond neighbourhood Facebook groups. The channel was fast and it worked, but it shaped the sample in a direction I could name and not correct.",
          ],
        },
      ],
    },
  ],
};

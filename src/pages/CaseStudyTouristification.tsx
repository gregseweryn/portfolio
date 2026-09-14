import React from 'react'
import { AnimatedTitle } from '../components/AnimatedTitle'
import {
  DistrictPhasesHero,
  LikertBarsChart,
  TwoRegistersDotPlot,
  ForestPlotChart,
  TypologyScatterChart,
  ThemeMatrixChart,
  JointDisplayTable,
} from '../components/TouristificationCharts'

interface CaseStudyTouristificationProps {
  navigate: (path: string) => void
}

export const CaseStudyTouristification: React.FC<CaseStudyTouristificationProps> = ({ navigate }) => {
  const scrollToSection = (e: React.MouseEvent, id: string) => {
    e.preventDefault()
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const tocItems = [
    { id: 'overview', label: 'Overview' },
    { id: 'gap', label: 'Research Gap' },
    { id: 'costs', label: 'Costs & Consensus' },
    { id: 'registers', label: 'Two Registers' },
    { id: 'models', label: 'Regression Models' },
    { id: 'typology', label: 'Typology Axis' },
    { id: 'qualitative', label: 'Qualitative Matrix' },
    { id: 'synthesis', label: 'Joint Display' },
    { id: 'limits', label: 'Limits' },
  ]

  return (
    <main id="main-content" className="pb-16">
      {/* Title & Metadata Section */}
      <section id="overview" className="pt-8 md:pt-14 pb-6 md:pb-8 scroll-mt-20">
        <div className="site-container">
          <AnimatedTitle
            coloredSegments={[{ text: 'Who pays for a tourist city', color: '#111111' }]}
            className="text-2xl md:text-3xl leading-[1.12] tracking-tight mb-3 font-normal"
          />
          <p className="text-sm md:text-base text-zinc-600 italic mb-8 max-measure text-pretty">
            “Touristification of Kraków: Residents’ Perception of Tourism Growth in Central Districts” (Master’s Thesis, Jagiellonian University)
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 py-6 border-y border-zinc-200">
            <div>
              <p className="text-xs text-zinc-500 font-semibold uppercase tracking-wider mb-1">Year</p>
              <p className="text-sm font-medium text-[#111111]">2026</p>
            </div>
            <div>
              <p className="text-xs text-zinc-500 font-semibold uppercase tracking-wider mb-1">Role</p>
              <p className="text-sm font-medium text-[#111111]">Sole researcher: design, fieldwork, analysis</p>
            </div>
            <div>
              <p className="text-xs text-zinc-500 font-semibold uppercase tracking-wider mb-1">Methods</p>
              <p className="text-sm font-medium text-[#111111]">Convergent Mixed Methods (Survey + 10 IDIs)</p>
            </div>
            <div>
              <p className="text-xs text-zinc-500 font-semibold uppercase tracking-wider mb-1">Sample</p>
              <p className="text-sm font-medium text-[#111111]">N = 446 survey respondents, 10 IDIs</p>
            </div>
          </div>
        </div>
      </section>

      {/* Discrete Sticky Table of Contents */}
      <nav
        aria-label="Case study sections"
        className="sticky top-0 z-30 bg-white/95 backdrop-blur-sm border-b border-zinc-200/80 py-2.5 transition-all"
      >
        <div className="site-container flex items-center justify-between gap-4">
          <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500 shrink-0 hidden sm:inline">
            Contents
          </span>
          <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto no-scrollbar py-0.5 text-xs font-medium">
            {tocItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => scrollToSection(e, item.id)}
                className="whitespace-nowrap px-2.5 py-1 rounded-full text-zinc-600 hover:text-[#111111] hover:bg-zinc-100 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#111111]"
              >
                {item.label}
              </a>
            ))}
          </div>
          <span className="text-xs font-medium text-zinc-400 shrink-0 hidden md:inline">
            N = 446 Triangulation
          </span>
        </div>
      </nav>

      {/* Hero Banner: Title Diagram (Three districts, one process) */}
      <section className="py-8 md:py-12">
        <div className="site-container">
          <DistrictPhasesHero />
        </div>
      </section>

      {/* Section 1: The Research Gap */}
      <section id="gap" className="py-12 md:py-16 border-t border-zinc-100 scroll-mt-20">
        <div className="site-container grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12">
          <h2 className="md:col-span-3 text-lg text-[#111111] font-medium">The Research Gap</h2>
          <div className="md:col-span-9 flex flex-col gap-5 text-md text-zinc-700 leading-relaxed max-measure text-pretty">
            <p>
              Kraków drew 14.7 million visitors in 2024, more than before the pandemic, and tourism now accounts for roughly 8% of the city economy. In District I alone, short-term tourist rentals represent about 42% of the whole-flat rental market. The public debate was loud and confident on all sides.
            </p>
            <p>
              It was also running on old evidence. The last solid survey of how residents themselves saw it was collected before COVID-19, in a city whose visitor counts had collapsed by three quarters and then rebounded past their prior peak. The permanent residents living inside the change were the ones nobody had asked recently.
            </p>
            <p>
              I solely designed and executed a <strong>convergent mixed-methods study</strong>: writing both the quantitative questionnaire and the 10-interview qualitative guide from scratch. The survey and interviews ran simultaneously across three central districts (Old Town, Kazimierz, and Podgórze), were analysed independently, and converged only at synthesis.
            </p>

            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="border border-zinc-200 rounded-xl overflow-hidden bg-white shadow-2xs">
                <img
                  src="/work/thesis/questionnaire-opening.png"
                  alt="Blank questionnaire first page showing residency screening and cover letter"
                  className="w-full h-auto object-contain"
                  loading="lazy"
                />
                <div className="p-3 bg-zinc-50 border-t border-zinc-100 text-xs text-zinc-600">
                  <span className="font-semibold text-zinc-900 block mb-0.5">Instrument 01: Screening battery</span>
                  Verifying permanent local residency, tenure duration, and district assignment.
                </div>
              </div>

              <div className="border border-zinc-200 rounded-xl p-5 bg-zinc-50/70 flex flex-col justify-between">
                <div>
                  <span className="text-xs uppercase tracking-wider font-semibold text-zinc-500">Fieldwork Corpus</span>
                  <div className="mt-4 space-y-3">
                    <div>
                      <p className="text-2xl font-bold text-[#111111] tabular-nums">446</p>
                      <p className="text-xs text-zinc-600">Survey responses verified across three central districts</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-[#111111] tabular-nums">10 IDIs</p>
                      <p className="text-xs text-zinc-600">In-depth qualitative interviews (45-70 min each)</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-[#111111] tabular-nums">20.1 yrs</p>
                      <p className="text-xs text-zinc-600">Mean resident tenure in the surveyed neighbourhoods</p>
                    </div>
                  </div>
                </div>
                <p className="text-xs text-zinc-500 italic mt-4">
                  Fieldwork conducted April-June 2026.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: What residents agree on is money, not noise */}
      <section id="costs" className="py-12 md:py-16 border-t border-zinc-100 scroll-mt-20">
        <div className="site-container">
          <div className="max-measure mb-8">
            <h2 className="text-xl md:text-2xl text-[#111111] font-medium tracking-tight mb-3">
              What residents agree on is money, not noise
            </h2>
            <p className="text-sm md:text-base text-zinc-700 leading-relaxed text-pretty">
              The cost index sits well above the midpoint of the scale (alpha = 0.92); the benefit index sits below it, at 2.87. But the primary insight is the hierarchy underneath it. What residents agree on most is not noise or crowds. It is money. Agreement that tourism drives up rents reaches 88.1%, with the smallest spread of any item in the questionnaire. Service prices follow at 76.8%, and displacement of everyday shops at 65.7%.
            </p>
          </div>

          <div className="mb-8">
            <LikertBarsChart />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mt-8">
            <div className="md:col-span-4 border border-zinc-200 rounded-xl overflow-hidden bg-white shadow-2xs">
              <img
                src="/work/thesis/questionnaire-cost-block.png"
                alt="Questionnaire Cost Block section measuring perceived resident impact"
                className="w-full h-auto object-contain"
                loading="lazy"
              />
              <div className="p-3 bg-zinc-50 border-t border-zinc-100 text-xs text-zinc-600">
                <span className="font-semibold text-zinc-900 block mb-0.5">Instrument 02: Cost Block C</span>
                5-point Likert batteries measuring spatial, economic, and social hypertrophy.
              </div>
            </div>

            <div className="md:col-span-8 flex flex-col justify-center gap-4 text-sm text-zinc-700 leading-relaxed max-measure text-pretty">
              <p>
                The benefit side is the mirror image. The only benefit to clear the midpoint is "tourism creates jobs" (mean 3.41, 48.7%), a benefit that belongs to the city's macro economy rather than to the respondent's own street. The items closest to daily domestic life score worst: better public space at 2.59, and better infrastructure at 2.52.
              </p>
              <p>
                The institutional picture is starker still: just <strong>8.5%</strong> agree the city manages tourism effectively; only <strong>5.0%</strong> think it adequately protects residents' interests; and barely <strong>3.5%</strong> feel residents have any real influence over decisions. That is not mere dissatisfaction with a policy: it is an acute absence of felt agency.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Touristification runs in two registers at once */}
      <section id="registers" className="py-12 md:py-16 border-t border-zinc-100 scroll-mt-20">
        <div className="site-container">
          <div className="max-measure mb-8">
            <h2 className="text-xl md:text-2xl text-[#111111] font-medium tracking-tight mb-3">
              Touristification runs in two registers at once
            </h2>
            <p className="text-sm md:text-base text-zinc-700 leading-relaxed text-pretty">
              The district comparison is where the study earns its keep. Podgórze is systematically milder across every summary measure: higher general attitude (3.04 against 2.62 and 2.57), lower costs, higher benefits. Old Town and Kazimierz never differ significantly from each other; the line always falls between them and Podgórze.
            </p>
            <p className="text-sm md:text-base text-zinc-700 leading-relaxed text-pretty mt-3">
              Yet three items break that pattern completely: rent pressure (C4), short-term rental as a serious problem (E2), and distrust of municipal management (F1) are statistically indistinguishable across all three districts. Meanwhile, noise (C1) produces the largest effect in the entire study (epsilon-squared = 0.177, p &lt; 0.001), and the feeling that the district is becoming an attraction rather than a home (C8) follows closely (epsilon-squared = 0.148).
            </p>
          </div>

          <div className="mb-4">
            <TwoRegistersDotPlot />
          </div>
        </div>
      </section>

      {/* Section 4: Regression Models */}
      <section id="models" className="py-12 md:py-16 border-t border-zinc-100 scroll-mt-20">
        <div className="site-container">
          <div className="max-measure mb-8">
            <h2 className="text-xl md:text-2xl text-[#111111] font-medium tracking-tight mb-3">
              Attitude is a balance sheet, not a demographic
            </h2>
            <p className="text-sm md:text-base text-zinc-700 leading-relaxed text-pretty">
              With attitude as the outcome and demographic controls as predictors, the OLS model is remarkably clear (R² = 0.80, N = 428). Perceived costs (beta = -0.52) and perceived benefits (beta = 0.46) carry the entire model; age, gender, years in district, working in tourism, and owning your home all sit flat on zero. Attitude is governed by perceived social exchange, exactly as theory posits.
            </p>
            <p className="text-sm md:text-base text-zinc-700 leading-relaxed text-pretty mt-3">
              In the logistic model predicting serious consideration of moving out, costs dominate: a standard deviation increase in perceived cost multiplies the odds of considering leaving by <strong>5.54</strong> (p &lt; 0.001). Benefits protect, but far more weakly (OR = 0.54). Home ownership acts as a material anchor, roughly halving the odds (OR = 0.44).
            </p>
          </div>

          <div className="mb-4">
            <ForestPlotChart />
          </div>
        </div>
      </section>

      {/* Section 5: Typology Axis */}
      <section id="typology" className="py-12 md:py-16 border-t border-zinc-100 scroll-mt-20">
        <div className="site-container">
          <div className="max-measure mb-8">
            <h2 className="text-xl md:text-2xl text-[#111111] font-medium tracking-tight mb-3">
              Two types that turn out to be one axis
            </h2>
            <p className="text-sm md:text-base text-zinc-700 leading-relaxed text-pretty">
              K-means clustering on standardised cost and benefit indices split the sample cleanly in two: 57.3% "in conflict" (high costs, low benefits, and 27.1% considering leaving) against 42.7% "reconciled" (only 1.6% considering leaving).
            </p>
            <p className="text-sm md:text-base text-zinc-700 leading-relaxed text-pretty mt-3">
              However, drawing the caveat is more honest than writing it: the two indices correlate at <strong>-0.73</strong>. The clusters lie along a single diagonal in cost-benefit space. Splitting the sample at the median of the balance reproduces the same two groups 92.5% of the time. The typology names the poles of a continuum; it does not prove two discrete populations exist.
            </p>
          </div>

          <div className="mb-4">
            <TypologyScatterChart />
          </div>
        </div>
      </section>

      {/* Section 6: Qualitative Corpus (Theme Matrix & Voices) */}
      <section id="qualitative" className="py-12 md:py-16 border-t border-zinc-100 scroll-mt-20">
        <div className="site-container">
          <div className="max-measure mb-8">
            <h2 className="text-xl md:text-2xl text-[#111111] font-medium tracking-tight mb-3">
              Residents blame the model, not the visitors
            </h2>
            <p className="text-sm md:text-base text-zinc-700 leading-relaxed text-pretty">
              Ten in-depth interviews, analysed using reflexive thematic analysis, yielded eleven themes: six deductive themes from the theoretical hypertrophy dimensions and five inductive themes that emerged directly from the corpus.
            </p>
            <p className="text-sm md:text-base text-zinc-700 leading-relaxed text-pretty mt-3">
              The coding matrix is published in full below, making every claim verifiable: including the demand for short-term rental regulation that nine of ten interviewees raised unprompted.
            </p>
          </div>

          <div className="mb-10">
            <ThemeMatrixChart />
          </div>

          {/* Authentic Interview Voices */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border border-zinc-200 rounded-xl p-6 bg-white shadow-2xs">
              <p className="text-xs uppercase tracking-wider font-semibold text-zinc-500 mb-2">
                Everyday Retail Displacement · Podgórze
              </p>
              <blockquote className="text-sm text-zinc-900 font-medium italic leading-relaxed">
                “To dosłownie boli, jak idziesz po chleb i widzisz, że już nie ma sklepu z chlebem.”
              </blockquote>
              <p className="text-xs text-zinc-600 mt-2 leading-relaxed">
                “It genuinely hurts when you go out for bread and find the bread shop is not there any more.”
              </p>
              <p className="text-xs text-zinc-400 mt-3 font-semibold">
                Bartek · Podgórze, 12 years resident [17]
              </p>
            </div>

            <div className="border border-zinc-200 rounded-xl p-6 bg-white shadow-2xs">
              <p className="text-xs uppercase tracking-wider font-semibold text-zinc-500 mb-2">
                Loss of Domesticity · Kazimierz
              </p>
              <blockquote className="text-sm text-zinc-900 font-medium italic leading-relaxed">
                “Kazimierz jest sceną, mieszkańcy są statystami, turyści są publicznością.”
              </blockquote>
              <p className="text-xs text-zinc-600 mt-2 leading-relaxed">
                “Kazimierz is a stage. The residents are the extras, the tourists are the audience.”
              </p>
              <p className="text-xs text-zinc-400 mt-3 font-semibold">
                Adam · Kazimierz, architect, 20 years resident [17]
              </p>
            </div>

            <div className="border border-zinc-200 rounded-xl p-6 bg-white shadow-2xs">
              <p className="text-xs uppercase tracking-wider font-semibold text-zinc-500 mb-2">
                Distrust of Municipality · Old Town
              </p>
              <blockquote className="text-sm text-zinc-900 font-medium italic leading-relaxed">
                “Władze miasta sprzedały moją dzielnicę turystom.”
              </blockquote>
              <p className="text-xs text-zinc-600 mt-2 leading-relaxed">
                “The city authorities sold my district to the tourists.”
              </p>
              <p className="text-xs text-zinc-400 mt-3 font-semibold">
                Stefania · Old Town, lifelong resident [33]
              </p>
            </div>

            <div className="border border-zinc-200 rounded-xl p-6 bg-white shadow-2xs">
              <p className="text-xs uppercase tracking-wider font-semibold text-zinc-500 mb-2">
                Anti-Overtourism vs Anti-Visitor Nuance
              </p>
              <blockquote className="text-sm text-zinc-900 font-medium italic leading-relaxed">
                “To nie jest wina turystów (...) To jest wina tych, którzy zezwolili.”
              </blockquote>
              <p className="text-xs text-zinc-600 mt-2 leading-relaxed">
                “It is not the tourists' fault... It is the fault of the people who allowed it.”
              </p>
              <p className="text-xs text-zinc-400 mt-3 font-semibold">
                Stefania · Old Town [45]
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 7: Synthesis / Joint Display */}
      <section id="synthesis" className="py-12 md:py-16 border-t border-zinc-100 scroll-mt-20">
        <div className="site-container">
          <div className="max-measure mb-8">
            <h2 className="text-xl md:text-2xl text-[#111111] font-medium tracking-tight mb-3">
              Where the two strands disagree
            </h2>
            <p className="text-sm md:text-base text-zinc-700 leading-relaxed text-pretty">
              Convergence between the two strands was systematic across dimensions. Which makes the one place they pull apart the most revealing row in the table.
            </p>
            <p className="text-sm md:text-base text-zinc-700 leading-relaxed text-pretty mt-3">
              In the logistic model, longer tenure weakly raises the odds of considering leaving. In the interviews, the most deeply rooted residents were the ones most firmly staying. Reconciling them sharpened the finding: what protects is <strong>property ownership</strong>, not elapsed time. The anchoring the interviews describe is a braid of property and biography, and the statistical model separates what the interviews bundled together.
            </p>
          </div>

          <div className="mb-4">
            <JointDisplayTable />
          </div>
        </div>
      </section>

      {/* Section 8: Methodological Limits */}
      <section id="limits" className="py-12 md:py-16 border-t border-zinc-100 bg-zinc-50/70 rounded-2xl site-container scroll-mt-20 px-6 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <h2 className="md:col-span-3 text-lg text-[#111111] font-medium">Methodological Limits</h2>
          <div className="md:col-span-9 flex flex-col gap-3 text-sm text-zinc-700 leading-relaxed max-measure text-pretty">
            <p>
              <strong>Opportunity Sampling:</strong> Recruitment ran through local neighbourhood Facebook groups. That is an opportunity sample, which plausibly over-recruits people already concerned about tourism. Significance tests are therefore read heuristically, and findings describe the surveyed cohort rather than constituting an unweighted census of central Kraków.
            </p>
            <p>
              <strong>Cross-Sectional Design:</strong> A single snapshot cannot definitively prove destination life cycle temporal progression. The phase reading across Old Town, Kazimierz, and Podgórze is an interpretation supported by empirical gradients, not a longitudinal demonstration.
            </p>
            <p>
              <strong>Instrument Subscales:</strong> Blocks E and F contained heterogeneous items and were analysed as verified subscales (E1-E4 alpha = 0.72, F1-F4 alpha = 0.69).
            </p>
          </div>
        </div>
      </section>

      {/* Next Project Footer */}
      <section className="py-14 border-t border-zinc-100 mt-12">
        <div className="site-container flex justify-between items-center">
          <span className="text-sm text-zinc-600">Next Case Study</span>
          <button
            onClick={() => {
              navigate('/work/portfolio-desk')
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
            className="text-lg md:text-xl font-medium text-[#111111] hover:text-zinc-600 transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#111111] rounded"
          >
            Portfolio Desk →
          </button>
        </div>
      </section>
    </main>
  )
}

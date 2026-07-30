import type { Metadata } from "next";
import Image from "next/image";
import { site } from "@/lib/site";
import Button from "@/components/Button";
import Reveal from "@/components/Reveal";
import SplitReveal from "@/components/SplitReveal";
import styles from "./about.module.css";

export const metadata: Metadata = {
  title: "About",
  // Not site.role.toLowerCase(): that turned the acronym into "ux researcher",
  // and this string is what a search result shows.
  description: `About ${site.name}, UX researcher in Kraków. The study behind the portfolio, and how it was run.`,
};

const principles = [
  {
    title: "Start from the question",
    body: "Methods serve the question, not the other way around. I spend real effort framing what we actually need to know before choosing how to find out.",
  },
  {
    title: "Evidence over opinion",
    body: "I make the strongest, most honest version of what the data says, including where it's thin. Confidence should match the evidence, not the deadline.",
  },
  {
    title: "Findings have to land",
    body: "Research only matters if it changes a decision. I design the synthesis and the telling as carefully as the study itself.",
  },
];

const toolkit = [
  { group: "Generative", items: ["Interviews", "Diary studies", "Contextual inquiry", "Concept testing"] },
  { group: "Evaluative", items: ["Usability testing", "Tree testing", "Surveys", "Benchmarking"] },
  { group: "Synthesis & comms", items: ["Thematic analysis", "Affinity mapping", "Journey maps", "Workshops"] },
  { group: "Research ops", items: ["Participant panels", "Repositories", "Consent & ethics", "Enablement"] },
];

export default function AboutPage() {
  return (
    <div className={styles.page}>
      <section className="container">
        <SplitReveal as="h1" className={styles.title}>
          A researcher who cares as much about the decision as the data.
        </SplitReveal>
      </section>

      <section className={`container ${styles.bioGrid}`}>
        <div className={styles.bio}>
          <p className={styles.lead}>
            I&rsquo;m {site.name}, a UX researcher in Kraków. I design studies, run the fieldwork
            myself, and turn what comes back into decisions a team can defend.
          </p>
          <p>
            My last one was an MA thesis at the Jagiellonian University, on how the people who
            actually live in central Kraków experience a city that draws 14.7 million visitors a
            year. I built the questionnaire, gathered 446 responses and ten in-depth interviews
            across six weeks of fieldwork, and analysed the two strands separately before letting
            them meet. It is on this site in full, including the part about what it cannot tell you.
          </p>
          <p>
            That last part is the habit I would bring to a team. What I enjoy most is the moment
            research changes someone&rsquo;s mind, when a confident assumption meets the evidence
            and the plan gets better for it, and that only happens if the evidence arrives honestly,
            with its limits attached. So the limits go in the deck, not in an appendix nobody opens.
          </p>
          {/* TODO(personalise): the professional half is now the real study. Still
              missing, and only Grzegorz can supply it: what pulled him to
              touristification specifically, and what kind of team he is aiming at. */}
          <Button href="/contact" variant="line">Get in touch</Button>
        </div>
        <div className={styles.portrait}>
          {/* Square rather than the 4/5 the placeholder used: the source is
              381x381, so a taller frame would have to upscale it. */}
          <Image
            src="/grzegorz-seweryn-portrait.webp"
            alt={`${site.name}, ${site.role}`}
            width={381}
            height={381}
            sizes="(max-width: 900px) 60vw, 360px"
            className={styles.portraitImage}
            priority
          />
        </div>
      </section>

      <section className={`container ${styles.block}`} aria-labelledby="approach-title">
        <h2 id="approach-title" className={styles.blockTitle}>How I work</h2>
        <ul className={styles.principles}>
          {principles.map((p) => (
            <Reveal as="li" key={p.title} className={styles.principle}>
              <h3 className={styles.principleTitle}>{p.title}</h3>
              <p className={styles.principleBody}>{p.body}</p>
            </Reveal>
          ))}
        </ul>
      </section>

      <section className={`container ${styles.block}`} aria-labelledby="toolkit-title">
        <h2 id="toolkit-title" className={styles.blockTitle}>Methods toolkit</h2>
        <div className={styles.toolkit}>
          {toolkit.map((t) => (
            <div key={t.group} className={styles.toolGroup}>
              <p className={styles.toolHead}>{t.group}</p>
              <ul className={styles.toolList}>
                {t.items.map((i) => (
                  <li key={i}>{i}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className={`container ${styles.cta}`}>
        <h2 className={styles.ctaTitle}>Open to UX research roles.</h2>
        <Button href={`mailto:${site.email}`} variant="accent">Email me</Button>
      </section>
    </div>
  );
}

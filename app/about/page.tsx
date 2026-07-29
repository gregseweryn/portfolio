import type { Metadata } from "next";
import Image from "next/image";
import { site } from "@/lib/site";
import Button from "@/components/Button";
import Reveal from "@/components/Reveal";
import SplitReveal from "@/components/SplitReveal";
import styles from "./about.module.css";

export const metadata: Metadata = {
  title: "About",
  description: `About ${site.name}, ${site.role.toLowerCase()}.`,
};

const principles = [
  {
    title: "Start from the question",
    body: "Methods serve the question, not the other way around. I spend real effort framing what we actually need to know before choosing how to find out.",
  },
  {
    title: "Evidence over opinion",
    body: "I make the strongest, most honest version of what the data says — including where it's thin. Confidence should match the evidence, not the deadline.",
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
        <p className={styles.kicker}>About</p>
        <SplitReveal as="h1" className={styles.title}>
          A researcher who cares as much about the decision as the data.
        </SplitReveal>
      </section>

      <section className={`container ${styles.bioGrid}`}>
        <div className={styles.bio}>
          <p className={styles.lead}>
            I&rsquo;m {site.name}, a UX researcher. I help product teams understand the people
            they build for, and turn that understanding into decisions they can defend.
          </p>
          {/* TODO(personalise): replace with real background, sector experience, and story. */}
          <p>
            I work across the research arc — framing questions, running generative and evaluative
            studies, and synthesising messy evidence into something a team can act on. I&rsquo;m
            equally at home with a discovery interview, a usability session, and a stakeholder
            workshop where the findings have to survive contact with real constraints.
          </p>
          <p>
            What I enjoy most is the moment research changes a team&rsquo;s mind — when a confident
            assumption meets the evidence and the plan gets better for it. I treat clarity,
            inclusion, and research ethics as part of the craft, not afterthoughts.
          </p>
          <Button href="/contact" variant="line">Get in touch</Button>
        </div>
        <div className={styles.portrait}>
          {/* Square rather than the 4/5 the placeholder used: the source is
              381x381, so a taller frame would have to upscale it. */}
          <Image
            src="/grzegorz-seweryn-portrait.webp"
            alt={`${site.name}, ${site.role.toLowerCase()}`}
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

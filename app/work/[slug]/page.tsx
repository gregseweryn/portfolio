import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getStudy, studies, sectionId } from "@/lib/studies";
import MediaFrame from "@/components/MediaFrame";
import Reveal from "@/components/Reveal";
import Button from "@/components/Button";
import SplitReveal from "@/components/SplitReveal";
import StudyBlock from "@/components/study/StudyBlocks";
import DistrictPhases from "@/components/study/DistrictPhases";
import SectionIndex from "@/components/study/SectionIndex";
import { site } from "@/lib/site";
import styles from "./study.module.css";

export function generateStaticParams() {
  return studies.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const study = getStudy(slug);
  if (!study) return {};
  return {
    title: study.title,
    description: study.summary,
    openGraph: { type: "article", title: study.title, description: study.summary },
    // The heading on the page is editorial. Someone searching for the work by the
    // title it was defended and archived under should still land here, so the
    // registered title goes in the citation metadata rather than in the <title>.
    ...(study.formalTitle
      ? { other: { citation_title: study.formalTitle, citation_author: site.name } }
      : {}),
  };
}

export default async function StudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const study = getStudy(slug);
  if (!study) notFound();

  // With a single study the modulo would point back at this page, so the
  // "next study" block only appears once there's somewhere else to go.
  const index = studies.findIndex((s) => s.slug === slug);
  const next = studies.length > 1 ? studies[(index + 1) % studies.length] : null;

  return (
    <article className={styles.article}>
      <div className="container">
        <Link href="/#work" className={styles.back}>
          <span aria-hidden="true">&larr;</span> All research
        </Link>

        <header className={styles.header}>
          <p className={styles.meta}>
            <span>{study.role}</span>
            <span aria-hidden="true">/</span>
            <span>{study.client}</span>
            <span aria-hidden="true">/</span>
            <span>{study.year}</span>
          </p>
          <SplitReveal as="h1" className={styles.title}>{study.title}</SplitReveal>
          <p className={styles.question}>{study.question}</p>
          <ul className={styles.tags}>
            {study.methods.map((m) => (
              <li key={m} className={styles.tag}>{m}</li>
            ))}
          </ul>
        </header>
      </div>

      <div className="container">
        <div className={styles.hero}>
          {study.hero.kind === "placeholder" ? (
            <MediaFrame label={study.hero.label} ratio={study.hero.ratio} size="lg" />
          ) : (
            <DistrictPhases caption={study.hero.caption} />
          )}
        </div>
      </div>

      <div className="container">
        <p className={styles.summary}>{study.summary}</p>

        <dl className={styles.impacts}>
          {study.impacts.map((im) => (
            <div key={im.label} className={styles.impact}>
              <dt className={styles.impactValue}>{im.value}</dt>
              <dd className={styles.impactLabel}>{im.label}</dd>
            </div>
          ))}
        </dl>
      </div>

      {/* Outside the container on purpose: the bar's rule and background run the
          full width, its contents stay on the grid. It scrolls with the page
          until it meets the nav, then sticks for the rest of the argument. */}
      <SectionIndex
        sections={study.sections.map((s) => ({
          id: sectionId(s.navLabel ?? s.heading),
          label: s.navLabel ?? s.heading,
        }))}
      />

      <div className="container">
        {study.sections.map((section) => {
          // Prose sits in the narrow column beside the sticky heading; anything
          // wider (figures, tables, stat rows) spans the full grid.
          const [lead, ...rest] = section.blocks;
          const hasLeadProse = lead?.kind === "prose";

          return (
            <Reveal
              as="section"
              key={section.heading}
              id={sectionId(section.navLabel ?? section.heading)}
              className={styles.section}
            >
              {/* Heading and opening prose share a grid of their own. That grid
                  is the sticky heading's containing block, so the heading
                  releases where the prose ends instead of riding down over the
                  full-width figures below. */}
              <div className={styles.sectionIntro}>
                <div className={styles.sectionHead}>
                  <h2 className={styles.sectionTitle}>{section.heading}</h2>
                </div>
                <div className={styles.sectionBody}>
                  {hasLeadProse && <StudyBlock block={lead} />}
                </div>
              </div>
              <div className={styles.sectionBlocks}>
                {(hasLeadProse ? rest : section.blocks).map((block, i) => (
                  <StudyBlock key={i} block={block} />
                ))}
              </div>
            </Reveal>
          );
        })}
      </div>

      <div className="container">
        {study.downloads && (
          <div className={styles.downloads}>
            <h2 className={styles.downloadsTitle}>Check the work</h2>
            {study.formalTitle && (
              <p className={styles.formalTitle}>
                <cite lang={study.formalTitleLang}>{study.formalTitle}</cite>
              </p>
            )}
            <ul className={styles.downloadsList}>
              {study.downloads.map((d) => (
                <li key={d.href}>
                  <a href={d.href} className={styles.download} download>
                    <span className={styles.downloadLabel}>{d.label}</span>
                    <span className={styles.downloadNote}>{d.note}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        {next && (
          <Link href={`/work/${next.slug}`} className={styles.next}>
            <span className={styles.nextLabel}>Next study</span>
            <span className={styles.nextTitle}>{next.title}</span>
            <span className={styles.nextArrow} aria-hidden="true">&rarr;</span>
          </Link>
        )}

        <div className={styles.cta}>
          <p className={styles.ctaText}>
            Want to talk through a research problem like this one?
          </p>
          <Button href={`mailto:${site.email}`} variant="accent">Email me</Button>
        </div>
      </div>
    </article>
  );
}

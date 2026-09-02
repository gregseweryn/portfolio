import Link from "next/link";
import { methods, site } from "@/lib/site";
import { studies } from "@/lib/studies";
import Button from "@/components/Button";
import Reveal from "@/components/Reveal";
import CopyEmail from "@/components/CopyEmail";
import ShaderField from "@/components/ShaderField";
import SplitReveal from "@/components/SplitReveal";
import MethodsList from "@/components/MethodsList";
import StudyHero from "@/components/study/StudyHero";
import styles from "./page.module.css";

export default function Home() {
  const [featured, ...rest] = studies;

  return (
    <>
      {/* Hero — the statement */}
      <section className={styles.hero} aria-labelledby="hero-title">
        <ShaderField />
        <div className="container">
          <p className={styles.heroMeta}>
            <span>{site.role}</span>
            <span className={styles.dotSep} aria-hidden="true">/</span>
            <span className={styles.heroAvail}>{site.availability}</span>
          </p>
          <SplitReveal as="h1" id="hero-title" className={styles.heroTitle}>
            {site.tagline.replace(/\.$/, "")}
            <span className={styles.dot}>.</span>
          </SplitReveal>
          <p className={styles.heroIntro}>{site.intro}</p>
          <div className={styles.heroActions}>
            <Button href="/#work" variant="accent">View research</Button>
            <Button href="/contact" variant="line">Get in touch</Button>
          </div>
        </div>
      </section>

      {/* Methods — range at a glance. No label: the band is a run of method
          names between two rules, and a "WHAT I DO" eyebrow only said again
          what the words underneath already say. */}
      <section className={styles.methods} aria-label="Methods">
        <div className="container">
          <MethodsList items={methods} listClassName={styles.methodsList} itemClassName={styles.methodItem} />
        </div>
      </section>

      {/* Selected research */}
      <section id="work" className={styles.work} aria-labelledby="work-title">
        <div className="container">
          <div className={styles.sectionHead}>
            <h2 id="work-title" className={styles.sectionTitle}>Selected research</h2>
            <p className={styles.sectionNote}>
              {/* "generative & evaluative" would overclaim: the second study is
                  an audit and redesign, and its evaluative half is designed but
                  not yet run. */}
              {studies.length === 1
                ? "Mixed methods · quantitative & qualitative"
                : `${studies.length} case studies · research & redesign`}
            </p>
          </div>

          {/* Featured study */}
          <Reveal>
            <Link href={`/work/${featured.slug}`} className={styles.featured}>
              <div className={styles.featuredMedia}>
                <StudyHero study={featured} variant="card" />
              </div>
              <div className={styles.featuredBody}>
                <p className={styles.featuredTag}>Featured</p>
                <h3 className={styles.featuredTitle}>{featured.title}</h3>
                <p className={styles.featuredQ}>{featured.question}</p>
                <ul className={styles.tags}>
                  {featured.methods.map((m) => (
                    <li key={m} className={styles.tag}>{m}</li>
                  ))}
                </ul>
                <p className={styles.featuredImpact}>
                  <span className={styles.impactValue}>{featured.impacts[0].value}</span>
                  <span className={styles.impactLabel}>{featured.impacts[0].label}</span>
                </p>
                <span className={styles.readMore}>
                  Read the study <span aria-hidden="true">&rarr;</span>
                </span>
              </div>
            </Link>
          </Reveal>

          {/* Index of the rest — absent while there's only the featured study */}
          <ul className={styles.index} hidden={rest.length === 0}>
            {rest.map((s, i) => (
              <Reveal as="li" key={s.slug} delay={i * 60}>
                <Link href={`/work/${s.slug}`} className={styles.row}>
                  {/* Until now a study that wasn't featured appeared here as
                      text and nothing else, which said the work had nothing to
                      look at. The plate is small and the row keeps its index
                      form: three equal cards would be the template look the
                      design law rules out. */}
                  <span className={styles.rowMedia} aria-hidden="true">
                    <StudyHero study={s} variant="thumb" />
                  </span>
                  <span className={styles.rowMain}>
                    <span className={styles.rowTitle}>{s.title}</span>
                    <span className={styles.rowQ}>{s.question}</span>
                  </span>
                  <span className={styles.rowMeta}>
                    <span className={styles.rowMethods}>{s.methods.join(" · ")}</span>
                    <span className={styles.rowImpact}>{s.impacts[0].value}</span>
                  </span>
                  <span className={styles.rowArrow} aria-hidden="true">&rarr;</span>
                </Link>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Approach — dark band with the abstract motif */}
      <section className={`darkSection ${styles.approach}`} aria-labelledby="approach-title">
        <div className={`container ${styles.approachInner}`}>
          <SplitReveal as="h2" id="approach-title" trigger className={styles.approachTitle}>
            I start from the question, <span className={styles.approachEm}>not the method.</span>
          </SplitReveal>
          <p className={styles.approachBody}>
            Research earns trust by being rigorous and honest about its limits, and earns its keep
            by turning what people do into decisions a team can actually make. I work across the
            whole arc: framing the right question, choosing methods that fit, talking to real
            people, and shaping messy evidence into something clear enough to act on.
          </p>
          <div className={styles.approachActions}>
            <Button href="/about" variant="line">More about me</Button>
          </div>
        </div>
      </section>

      {/* Contact band */}
      <section className={styles.contact} aria-labelledby="contact-title">
        <div className="container">
          <p className={styles.contactKicker}>{site.availability}</p>
          <h2 id="contact-title" className={styles.contactTitle}>
            Have a research problem worth getting right?
          </h2>
          <CopyEmail email={site.email} size="lg" />
          <div className={styles.contactActions}>
            {site.resumeHref && (
              <Button href={site.resumeHref} variant="line" download>Download résumé</Button>
            )}
            {site.links
              .filter((l) => l.external)
              .map((l) => (
                <a key={l.label} href={l.href} className={`link link-block ${styles.contactLink}`} target="_blank" rel="noreferrer noopener">
                  {l.label}
                </a>
              ))}
          </div>
        </div>
      </section>
    </>
  );
}

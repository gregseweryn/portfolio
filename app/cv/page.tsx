import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";
import { studies } from "@/lib/studies";
import Button from "@/components/Button";
import SplitReveal from "@/components/SplitReveal";
import CopyEmail from "@/components/CopyEmail";
import styles from "./cv.module.css";

/**
 * The address that goes in the CV.
 *
 * It exists for two reasons at once. A link arriving from a PDF carries no
 * referrer, so on the free analytics tier every one of those visits would land
 * in "Direct" alongside anyone typing the domain; a page of its own is counted
 * separately without needing UTM parameters, which are a paid feature.
 *
 * And it is a better arrival than the home page for this reader specifically.
 * They have already read the summary of who I am, in the CV. What they want
 * next is the work, so this page is a doorway rather than an introduction.
 */
export const metadata: Metadata = {
  title: "From the CV",
  description: `The research behind ${site.name}'s CV: one mixed-methods study, published in full.`,
  // Not a search destination. It would only compete with the home page for the
  // same query while saying less.
  robots: { index: false, follow: true },
};

export default function CvPage() {
  const featured = studies[0];

  return (
    <div className={styles.page}>
      <section className="container">
        <p className={styles.kicker}>{site.availability}</p>
        <SplitReveal as="h1" className={styles.title}>
          You have the CV. Here is the work.
        </SplitReveal>
        <p className={styles.lead}>
          The CV says I run mixed-methods research. This is the study it is
          talking about, published end to end, including the part about what it
          cannot tell you.
        </p>

        <Link href={`/work/${featured.slug}`} className={styles.study}>
          <span className={styles.studyTitle}>{featured.title}</span>
          <span className={styles.studyQ}>{featured.question}</span>
          <ul className={styles.impacts}>
            {featured.impacts.map((im) => (
              <li key={im.label} className={styles.impact}>
                <span className={styles.impactValue}>{im.value}</span>
                <span className={styles.impactLabel}>{im.label}</span>
              </li>
            ))}
          </ul>
          <span className={styles.readMore}>
            Read the study <span aria-hidden="true">&rarr;</span>
          </span>
        </Link>

        <div className={styles.contact}>
          <p className={styles.contactLead}>Or skip straight to the part where we talk.</p>
          <CopyEmail email={site.email} size="lg" />
          <div className={styles.actions}>
            <Button href="/about" variant="line">More about me</Button>
          </div>
        </div>
      </section>
    </div>
  );
}

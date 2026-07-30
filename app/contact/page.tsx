import type { Metadata } from "next";
import { site } from "@/lib/site";
import CopyEmail from "@/components/CopyEmail";
import Button from "@/components/Button";
import SplitReveal from "@/components/SplitReveal";
import styles from "./contact.module.css";

export const metadata: Metadata = {
  title: "Contact",
  description: `Email ${site.name}, UX researcher in Kraków. Open to research roles; replies within a couple of days.`,
};

export default function ContactPage() {
  return (
    <div className={styles.page}>
      <section className="container">
        <p className={styles.kicker}>{site.availability}</p>
        <SplitReveal as="h1" className={styles.title}>Let&rsquo;s talk.</SplitReveal>
        <p className={styles.lead}>
          The fastest way to reach me is email. Tell me a little about the team, the problem,
          and the timing. I&rsquo;ll reply within a couple of days.
        </p>

        <div className={styles.emailRow}>
          <CopyEmail email={site.email} size="lg" />
        </div>

        <dl className={styles.details}>
          {site.resumeHref && (
            <div className={styles.detail}>
              <dt className={styles.detailHead}>Résumé</dt>
              <dd className={styles.detailBody}>
                <a href={site.resumeHref} className="link link-block" download>Download CV (PDF)</a>
              </dd>
            </div>
          )}
          <div className={styles.detail}>
            <dt className={styles.detailHead}>Elsewhere</dt>
            <dd className={styles.detailBody}>
              <ul className={styles.links}>
                {site.links
                  .filter((l) => l.external)
                  .map((l) => (
                    <li key={l.label}>
                      <a href={l.href} className="link link-block" target="_blank" rel="noreferrer noopener">
                        {l.label}
                      </a>
                    </li>
                  ))}
              </ul>
            </dd>
          </div>
          <div className={styles.detail}>
            <dt className={styles.detailHead}>Based in</dt>
            <dd className={styles.detailBody}>{site.location}</dd>
          </div>
        </dl>

        <div className={styles.cta}>
          <Button href={`mailto:${site.email}`} variant="accent">Email me</Button>
        </div>
      </section>
    </div>
  );
}

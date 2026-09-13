import Link from "next/link";
import { nav, site } from "@/lib/site";
import Arrow from "./Arrow";
import CopyEmail from "./CopyEmail";
import styles from "./Footer.module.css";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={`darkSection ${styles.footer}`}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.lead}>
          <p className={styles.kicker}>{site.availability}</p>
          <h2 className={styles.cta}>
            Let&rsquo;s talk about your research.
          </h2>
          <CopyEmail email={site.email} size="sm" />
        </div>

        <nav className={styles.col} aria-label="Footer">
          <p className={styles.colHead}>Index</p>
          <ul className={styles.list}>
            <li>
              <Link href="/" className="link link-block">Home</Link>
            </li>
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="link link-block">{item.label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.col}>
          <p className={styles.colHead}>Elsewhere</p>
          <ul className={styles.list}>
            {site.links.map((l) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  className="link link-block"
                  {...(l.external ? { target: "_blank", rel: "noreferrer noopener" } : {})}
                >
                  {l.label}
                </a>
              </li>
            ))}
            {site.resumeHref && (
              <li>
                <a href={site.resumeHref} className="link link-block" download>Résumé (PDF)</a>
              </li>
            )}
          </ul>
        </div>
      </div>

      <div className={`container ${styles.base}`}>
        <p className={styles.colophon}>
          Designed &amp; built by {site.name}. Set in Druk Wide &amp; Noirden.
        </p>
        <p className={styles.copy}>
          <span>&copy; {year}</span>
          <a href="#top" className={styles.top}>
            Back to top <Arrow dir="up" />
          </a>
        </p>
      </div>
    </footer>
  );
}

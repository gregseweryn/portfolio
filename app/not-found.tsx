import Link from "next/link";
import SplitReveal from "@/components/SplitReveal";
import styles from "./not-found.module.css";

export default function NotFound() {
  return (
    <section className={`container ${styles.wrap}`}>
      <p className={styles.code}>404</p>
      <SplitReveal as="h1" className={styles.title}>This page went out of scope.</SplitReveal>
      <p className={styles.body}>
        The page you&rsquo;re after doesn&rsquo;t exist or has moved. Let&rsquo;s get you back to
        something real.
      </p>
      <nav className={styles.links} aria-label="Recovery">
        <Link href="/" className="link">Home</Link>
        <Link href="/#work" className="link">Selected research</Link>
        <Link href="/contact" className="link">Contact</Link>
      </nav>
    </section>
  );
}

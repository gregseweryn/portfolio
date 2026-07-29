"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./CopyEmail.module.css";

type Props = {
  email: string;
  /** "lg" for the contact band, "sm" for the footer. */
  size?: "sm" | "lg";
};

export default function CopyEmail({ email, size = "lg" }: Props) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);

  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard blocked — the mailto link is still available as a fallback.
    }
  }

  return (
    <div className={`${styles.wrap} ${styles[size]}`}>
      <a className={styles.email} href={`mailto:${email}`}>
        {email}
      </a>
      <button type="button" className={styles.copy} onClick={copy} aria-label={`Copy email address ${email}`}>
        <span aria-hidden="true">{copied ? "Copied" : "Copy"}</span>
      </button>
      <span className={styles.live} role="status" aria-live="polite">
        {copied ? "Email address copied to clipboard" : ""}
      </span>
    </div>
  );
}

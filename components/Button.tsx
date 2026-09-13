import Link from "next/link";
import type { ReactNode } from "react";
import Arrow from "./Arrow";
import styles from "./Button.module.css";

type Props = {
  href: string;
  children: ReactNode;
  variant?: "accent" | "line";
  external?: boolean;
  download?: boolean;
  className?: string;
};

export default function Button({
  href,
  children,
  variant = "line",
  external,
  download,
  className,
}: Props) {
  const cls = `${styles.btn} ${styles[variant]} ${className ?? ""}`;
  const isInternal = href.startsWith("/") && !external && !download;

  if (isInternal) {
    return (
      <Link href={href} className={cls}>
        <span className={styles.label}>{children}</span>
        <span className={styles.arrow}>
          <Arrow />
        </span>
      </Link>
    );
  }

  return (
    <a
      href={href}
      className={cls}
      {...(external ? { target: "_blank", rel: "noreferrer noopener" } : {})}
      {...(download ? { download: true } : {})}
    >
      <span className={styles.label}>{children}</span>
      <span className={styles.arrow}>
        <Arrow />
      </span>
    </a>
  );
}

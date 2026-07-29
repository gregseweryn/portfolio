import styles from "./MediaFrame.module.css";

type Props = {
  label: string;
  ratio?: string;
  className?: string;
  /** Larger artifacts use a bigger label. */
  size?: "sm" | "md" | "lg";
};

/**
 * Intentional placeholder for research artifacts (affinity maps, journey maps,
 * redacted screens, session photos). Reads as a designed empty state, never a
 * broken image. Swap for a real <Image> later with no layout change.
 */
export default function MediaFrame({ label, ratio = "16 / 10", className, size = "md" }: Props) {
  return (
    <figure
      className={`${styles.frame} ${styles[size]} ${className ?? ""}`}
      style={{ aspectRatio: ratio }}
      aria-label={`${label} (placeholder)`}
      role="img"
    >
      <span className={styles.ticks} aria-hidden="true" />
      <figcaption className={styles.caption}>
        <span className={styles.label}>{label}</span>
        <span className={styles.note}>Artifact placeholder</span>
      </figcaption>
    </figure>
  );
}

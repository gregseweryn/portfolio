/**
 * The site's one arrow.
 *
 * Every arrow on the page used to be a Unicode glyph — &rarr;, &uarr;, &#8599;.
 * A text arrow is whatever the fallback font decides it is: its weight, its
 * length and its head angle change with the face, none of them match the
 * 1.5px rules the rest of the system draws with, and the north-east one is
 * missing from Noirden entirely, so it came back from a substituted system
 * face at a different size. Drawing it once fixes all of that and makes the
 * arrow part of the design rather than part of the text.
 *
 * It sizes with `1em`, so every call site keeps controlling it with
 * `font-size` exactly as it did with the glyph, and inherits `currentColor`.
 */
export default function Arrow({
  dir = "right",
  className,
}: {
  dir?: "right" | "left" | "up" | "up-right";
  className?: string;
}) {
  const rotation = { right: 0, "up-right": -45, up: -90, left: 180 }[dir];

  return (
    <svg
      className={className}
      viewBox="0 0 16 16"
      width="1em"
      height="1em"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="square"
      aria-hidden="true"
      focusable="false"
      style={{ display: "inline-block", verticalAlign: "-0.125em", transform: `rotate(${rotation}deg)` }}
    >
      <path d="M2.5 8h11" />
      <path d="M9 3.5 13.5 8 9 12.5" />
    </svg>
  );
}

import { ImageResponse } from "next/og";
import { getStudy, studies } from "@/lib/studies";
import { site } from "@/lib/site";
import { OG_SIZE, OG_CONTENT_TYPE, ogColors, ogFonts, ogKicker } from "@/lib/og";

export const dynamic = "force-static";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = `Case study – ${site.name}`;

export function generateStaticParams() {
  return studies.map((s) => ({ slug: s.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const study = getStudy(slug);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: ogColors.bg,
          color: ogColors.ink,
          padding: "64px 72px",
        }}
      >
        <div style={{ display: "flex", ...ogKicker }}>{study?.client ?? "Research"}</div>

        <div
          style={{
            display: "flex",
            fontFamily: "Druk Wide",
            fontSize: 68,
            lineHeight: 1.06,
            letterSpacing: "0.005em",
            textTransform: "uppercase",
          }}
        >
          {study?.title ?? site.name}
        </div>

        {/* The card has to survive the same ten-second skim as the page: the
            scope of the work, in numbers, above the byline. */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", width: 96, height: 6, background: ogColors.accent }} />
          <div style={{ display: "flex", marginTop: 28 }}>
            {(study?.impacts ?? []).map((impact) => (
              <div
                key={impact.label}
                style={{ display: "flex", flexDirection: "column", marginRight: 64 }}
              >
                <div
                  style={{
                    display: "flex",
                    fontFamily: "Druk Wide",
                    fontSize: 40,
                    letterSpacing: "0.005em",
                  }}
                >
                  {impact.value}
                </div>
                <div
                  style={{
                    display: "flex",
                    marginTop: 8,
                    fontFamily: "Noirden",
                    fontSize: 22,
                    fontWeight: 400,
                    color: ogColors.muted,
                  }}
                >
                  {impact.label}
                </div>
              </div>
            ))}
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 36,
              paddingTop: 24,
              borderTop: `1px solid ${ogColors.line}`,
              fontFamily: "Noirden",
              fontSize: 24,
              fontWeight: 600,
              color: ogColors.muted,
            }}
          >
            {/* Middot, not a dash: it matches the kicker above and Noirden's
                en dash sets very wide at this weight. */}
            {site.name} · {site.role}
          </div>
        </div>
      </div>
    ),
    { ...size, fonts: ogFonts() }
  );
}

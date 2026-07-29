import { ImageResponse } from "next/og";
import { site } from "@/lib/site";
import { OG_SIZE, OG_CONTENT_TYPE, ogColors, ogFonts, ogKicker } from "@/lib/og";

export const dynamic = "force-static";
export const alt = `${site.name} – ${site.role}`;
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
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
        <div style={{ display: "flex", ...ogKicker }}>{site.role}</div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          {/* Druk Wide runs about 1.6x the width of a normal grotesque, so the
              name breaks across two lines rather than shrinking to fit. */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontFamily: "Druk Wide",
              fontSize: 96,
              lineHeight: 1.04,
              letterSpacing: "0.005em",
            }}
          >
            <div style={{ display: "flex" }}>GRZEGORZ</div>
            <div style={{ display: "flex" }}>SEWERYN</div>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          {/* The one accent mark on the card. */}
          <div style={{ display: "flex", width: 96, height: 6, background: ogColors.accent }} />
          <div
            style={{
              display: "flex",
              marginTop: 28,
              fontFamily: "Noirden",
              fontSize: 30,
              fontWeight: 400,
              color: ogColors.muted,
              maxWidth: 820,
            }}
          >
            {site.tagline}
          </div>
        </div>
      </div>
    ),
    { ...size, fonts: ogFonts() }
  );
}

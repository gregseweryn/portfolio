import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Archivo, Inter, JetBrains_Mono } from "next/font/google";
import { site } from "@/lib/site";
import SmoothScroll from "@/components/SmoothScroll";
import { Analytics } from "@vercel/analytics/next";
import Script from "next/script";
import "./globals.css";
import "./editorial.css";

// WOFF2 builds, produced from the licensed TTF/OTF masters in myfonts/ by
// scripts/build-webfonts.py. Serving the masters directly cost 227 KB on first
// load; these cost roughly 100 KB for the same faces.
const druk = localFont({
  src: "../myfonts/webfonts/DrukWideBold.woff2",
  weight: "700",
  variable: "--font-druk",
  display: "swap",
});

// Noirden ships without most Polish diacritics — it has ó and ł but not
// ą ć ę ń ś ź ż, so Polish text falls back to a system font glyph by glyph and
// breaks up mid-word. Oswald covers the full set and is used only for text
// marked lang="pl"; see the :lang(pl) rule in globals.css.
const oswald = localFont({
  src: "../myfonts/webfonts/Oswald-Variable.woff2",
  weight: "200 700",
  variable: "--font-oswald",
  display: "swap",
});

const noirden = localFont({
  src: [
    { path: "../myfonts/webfonts/Noirden-Light.woff2", weight: "300 350", style: "normal" },
    { path: "../myfonts/webfonts/Noirden-LightOblique.woff2", weight: "300 350", style: "italic" },
    { path: "../myfonts/webfonts/Noirden-Regular.woff2", weight: "400", style: "normal" },
    { path: "../myfonts/webfonts/Noirden-RegularOblique.woff2", weight: "400", style: "italic" },
    { path: "../myfonts/webfonts/Noirden-SemiBold.woff2", weight: "500 600", style: "normal" },
    { path: "../myfonts/webfonts/Noirden-SemiBoldOblique.woff2", weight: "500 600", style: "italic" },
    { path: "../myfonts/webfonts/Noirden-Bold.woff2", weight: "700 900", style: "normal" },
    { path: "../myfonts/webfonts/Noirden-BoldOblique.woff2", weight: "700 900", style: "italic" },
  ],
  variable: "--font-noirden",
  display: "swap",
});

// The editorial homepage is a 1:1 port of the Figma Make prototype, which is
// set in Archivo, Inter and JetBrains Mono. next/font/google self-hosts all
// three, so the CSP needs no Google host and there is no render-blocking
// stylesheet — the prototype's @import url(fonts.googleapis.com) lines do not
// come across.
const archivo = Archivo({
  subsets: ["latin", "latin-ext"],
  weight: ["500", "600", "700", "800", "900"],
  variable: "--font-archivo",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  // The domain the site is served from. Absolute URLs for the OG cards are built
  // off this, so a mismatch here means link previews resolve to nothing.
  metadataBase: new URL("https://grzegorzseweryn.pl"),
  title: {
    default: `${site.name} – ${site.role}`,
    template: `%s – ${site.name}`,
  },
  description: site.description,
  openGraph: {
    title: `${site.name} – ${site.role}`,
    description: site.description,
    type: "website",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  // The sRGB twin of --bg. It was #f7f7f6: both off the page colour and warmer
  // than it, which is the one tint the True-Neutral rule rules out.
  themeColor: "#fafafa",
  colorScheme: "light",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${druk.variable} ${noirden.variable} ${oswald.variable} ${archivo.variable} ${inter.variable} ${jetbrains.variable}`}
    >
      <head>
        {/* Microsoft Clarity — heatmaps and session recordings. beforeInteractive
            puts the loader in the served <head>, so it starts collecting on the
            first paint rather than after hydration; the tag it injects is async
            either way. Unlike Vercel Analytics above, Clarity is third-party and
            does set cookies (_clck, _clsk), so if the site ever needs a consent
            banner, this is the thing that triggers it. */}
        <Script id="ms-clarity" strategy="beforeInteractive">
          {`(function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "y4cx9uxyfz");`}
        </Script>
      </head>
      <body id="top">
        <SmoothScroll />
        {/* The nav, the skip link and the footer moved into the (site) route
            group: the homepage is the editorial layout and brings its own. */}
        {children}
        {/* Vercel Web Analytics. Chosen over Plausible or Fathom for one reason
            that matters here: in production it is served from this origin
            (/_vercel/insights/...), so the locked-down CSP needs no third-party
            host added to script-src or connect-src.

            No cookies and no persistent identifier either. Visitors are a hash
            of the incoming request that resets daily, which is why the site
            still needs no consent banner. */}
        <Analytics />
      </body>
    </html>
  );
}

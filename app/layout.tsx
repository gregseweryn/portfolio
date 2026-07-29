import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { site } from "@/lib/site";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";
import "./globals.css";

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

export const metadata: Metadata = {
  // The domain the site is served from. Absolute URLs for the OG cards are built
  // off this, so a mismatch here means link previews resolve to nothing.
  metadataBase: new URL("https://grzegorzseweryn.pl"),
  title: {
    default: `${site.name} – ${site.role}`,
    template: `%s – ${site.name}`,
  },
  description: site.intro,
  openGraph: {
    title: `${site.name} – ${site.role}`,
    description: site.intro,
    type: "website",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#f7f7f6",
  colorScheme: "light",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${druk.variable} ${noirden.variable} ${oswald.variable}`}>
      <body id="top">
        <a href="#main" className="skip-link">Skip to content</a>
        <SmoothScroll />
        <Nav />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

import Nav from "@/components/editorial/Nav";
import Hero from "@/components/editorial/Hero";
import MethodsMarquee from "@/components/editorial/MethodsMarquee";
import WorkIndex from "@/components/editorial/WorkIndex";
import FeaturedStudy from "@/components/editorial/FeaturedStudy";
import ProcessStrip from "@/components/editorial/ProcessStrip";
import ProofBand from "@/components/editorial/ProofBand";
import Contact from "@/components/editorial/Contact";
import Footer from "@/components/editorial/Footer";

/**
 * The editorial homepage, ported from the Figma Make prototype.
 *
 * It carries its own header and footer rather than the site-wide ones, which
 * is why every other route sits in the (site) route group — see
 * app/(site)/layout.tsx. The .editorial class is what scopes the prototype's
 * palette, container width and body face to this page.
 */
export default function Home() {
  return (
    <div className="editorial min-h-screen bg-paper text-ink">
      <a
        href="#work"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-ink focus:px-4 focus:py-2 focus:font-mono focus:text-sm focus:text-paper"
      >
        Skip to work
      </a>
      <Nav />
      <main id="main">
        <Hero />
        <MethodsMarquee />
        <WorkIndex />
        <FeaturedStudy />
        <ProcessStrip />
        <ProofBand />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

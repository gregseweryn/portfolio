import Nav from "./Nav";
import Hero from "./Hero";
import MethodsMarquee from "./MethodsMarquee";
import WorkIndex from "./WorkIndex";
import FeaturedStudy from "./FeaturedStudy";
import ProcessStrip from "./ProcessStrip";
import ProofBand from "./ProofBand";
import Contact from "./Contact";
import Footer from "./Footer";

export default function EditorialHome() {
  return (
    <div className="min-h-screen bg-paper text-ink">
      <a
        href="#work"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-ink focus:px-4 focus:py-2 focus:font-mono focus:text-sm focus:text-paper"
      >
        Skip to work
      </a>
      <Nav />
      <main>
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

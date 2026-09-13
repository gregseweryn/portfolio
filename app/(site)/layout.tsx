import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

/**
 * The chrome every route except the homepage wears.
 *
 * The homepage is the Figma Make editorial layout and ships its own header and
 * footer, so this moved out of the root layout and into a route group: the
 * group changes no URLs, it only decides who gets the shared nav.
 */
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <a href="#main" className="skip-link">Skip to content</a>
      <Nav />
      <main id="main">{children}</main>
      <Footer />
    </>
  );
}

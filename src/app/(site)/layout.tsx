import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { FaqSection } from "@/components/site/FaqSection";
import { LocationSection } from "@/components/site/LocationSection";
import { RouteGate } from "@/components/site/RouteGate";
import { ScrollToTop } from "@/components/site/ScrollToTop";
import { MobileActionBar } from "@/components/site/MobileActionBar";
import { MotionProvider } from "@/components/site/MotionProvider";

/**
 * The shell every page of the website proper wears: navigation, the shared
 * FAQ and location blocks, the footer and the mobile action bar.
 *
 * This used to live in the root layout, which made it unavoidable. The
 * campaign landing pages need the opposite of it. A person who arrives from an
 * advertisement has one decision to make, and a navigation bar is a list of
 * ways to not make it, so those pages sit in their own group with their own
 * shell and this one never loads for them.
 *
 * Moving it here changes no URL. A route group names a layout, not a path.
 */
export default function SiteLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-white focus:px-5 focus:py-3 focus:shadow-md"
      >
        Skip to content
      </a>
      <MotionProvider>
        <ScrollToTop />
        <Header />
        <main id="main">{children}</main>

        {/* Both sections live here so no page can ship without them. The two
            routes that already own this content opt out rather than repeat it. */}
        <RouteGate
          hideOn={["/patient-resources/faqs"]}
          hidePrefixes={["/services/", "/locations", "/patient-resources/blog/", "/veterans"]}
        >
          <FaqSection />
        </RouteGate>
        <RouteGate hideOn={["/contact-us"]}>
          <LocationSection />
        </RouteGate>

        <Footer />
        <MobileActionBar />
      </MotionProvider>
    </>
  );
}

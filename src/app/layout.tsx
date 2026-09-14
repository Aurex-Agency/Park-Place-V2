import type { Metadata } from "next";
import localFont from "next/font/local";
import { practice } from "@/lib/content";
import { siteUrl, canonical } from "@/lib/site";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { FaqSection } from "@/components/site/FaqSection";
import { LocationSection } from "@/components/site/LocationSection";
import { RouteGate } from "@/components/site/RouteGate";
import { ScrollToTop } from "@/components/site/ScrollToTop";
import { MobileActionBar } from "@/components/site/MobileActionBar";
import { MotionProvider } from "@/components/site/MotionProvider";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

/**
 * Zodiak carries the voice of the site: every headline, the eyebrow labels and
 * the pull quotes. One variable file covers the whole weight range, so the
 * display weight can be tuned later without another download.
 */
const zodiak = localFont({
  variable: "--font-zodiak",
  display: "swap",
  src: [
    {
      path: "../fonts/Zodiak-Variable.woff2",
      weight: "100 900",
      style: "normal",
    },
    {
      path: "../fonts/Zodiak-VariableItalic.woff2",
      weight: "100 900",
      style: "italic",
    },
  ],
});

/** Plus Jakarta Sans does the functional work: body, navigation, buttons, forms. */
const jakarta = localFont({
  variable: "--font-jakarta",
  display: "swap",
  src: [
    {
      path: "../fonts/PlusJakartaSans-Variable.woff2",
      weight: "200 800",
      style: "normal",
    },
  ],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Park Place Dental | Dentist in Booneville, Mississippi",
    template: "%s | Park Place Dental",
  },
  description:
    "Park Place Dental offers general, restorative, and cosmetic dentistry in Booneville, Mississippi. Same-day crowns from our in-house lab, and over 43 years of care from Dr. Ken Goodwin.",
  openGraph: {
    title: "Park Place Dental | Dentist in Booneville, Mississippi",
    description:
      "Comprehensive dental care with an in-house lab, advanced technology, and a family-oriented team in Booneville, Mississippi.",
    type: "website",
    locale: "en_US",
    siteName: "Park Place Dental",
    url: "/",
  },
  alternates: { canonical: canonical("/") },
  twitter: {
    card: "summary_large_image",
    title: "Park Place Dental | Dentist in Booneville, Mississippi",
    description:
      "Comprehensive dental care with an in-house lab, advanced technology, and a family-oriented team in Booneville, Mississippi.",
  },
  /*
    The share card and the icons are picked up from the files beside this one:
    opengraph-image.png, twitter-image.png, icon.png, apple-icon.png and
    favicon.ico. Next fingerprints them and writes the tags, so there is no
    hardcoded path here to fall out of date.
  */
};

/**
 * Local business markup so the practice reads correctly in search.
 *
 * Every page carries this, which is why it has a stable `@id`: without one,
 * thirty seven copies read as thirty seven businesses that happen to share an
 * address. With one, they are thirty seven references to the same entity.
 *
 * `url` and `image` are here because Google asks for both on a local business
 * and will not show the richer result without them. The telephone number is
 * written in E.164 alongside the human formatting used everywhere else on the
 * site, since that is the form a machine can dial unambiguously.
 *
 * Nothing is asserted here that the practice has not confirmed. There is no
 * priceRange and no aggregateRating, because inventing either would be a
 * fabricated business fact, and `sameAs` is left out until the Google Business
 * Profile and social URLs are to hand.
 */
const structuredData = {
  "@context": "https://schema.org",
  "@type": "Dentist",
  "@id": `${siteUrl}/#practice`,
  name: practice.name,
  url: siteUrl,
  image: [
    `${siteUrl}/images/team-group-porch.jpg`,
    `${siteUrl}/images/reception-front-desk.jpg`,
  ],
  telephone: "+1-662-728-8171",
  email: practice.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: practice.address.street,
    addressLocality: practice.address.city,
    addressRegion: practice.address.region,
    postalCode: practice.address.postalCode,
    addressCountry: "US",
  },
  hasMap: practice.mapsHref,
  areaServed: {
    "@type": "AdministrativeArea",
    name: `${practice.county}, ${practice.state}`,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:30",
      closes: "17:00",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    // The font variables go on <html>, not <body>. The theme tokens that
    // reference them (--font-display and friends) are defined on :root, and a
    // custom property is substituted where it is defined, not where it is
    // used. Declared on <body> the reference resolves against an undefined
    // value and every element silently falls back to system fonts.
    <html lang="en" className={`${zodiak.variable} ${jakarta.variable}`}>
      <body className="antialiased">
        {/*
          A safety net for the visit where the JavaScript never arrives.

          Everything revealed on scroll is server rendered at its starting
          value, which is opacity zero, and Motion is what brings it to one. On
          a dropped bundle or a hostile network that never happens and the page
          is legible only as a blank canvas: text present in the markup, none
          of it painted. Search engines run the script and are unaffected, so
          this is purely for the person on the bad connection, who is also the
          person least able to try again.

          Inline styles are what have to be beaten here, hence the attribute
          selector and the !important. It costs nothing on the ordinary path,
          because a browser running scripts never applies it.
        */}
        <noscript>
          <style
            dangerouslySetInnerHTML={{
              __html: `[style*="opacity:0"]{opacity:1!important;transform:none!important;}`,
            }}
          />
        </noscript>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
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
          <RouteGate hideOn={["/patient-resources/faqs"]}>
            <FaqSection />
          </RouteGate>
          <RouteGate hideOn={["/contact-us"]}>
            <LocationSection />
          </RouteGate>

          <Footer />
          <MobileActionBar />
        </MotionProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}

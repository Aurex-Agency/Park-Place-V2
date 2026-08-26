import type { Metadata } from "next";
import localFont from "next/font/local";
import { practice } from "@/lib/content";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { FaqSection } from "@/components/site/FaqSection";
import { LocationSection } from "@/components/site/LocationSection";
import { RouteGate } from "@/components/site/RouteGate";
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
  metadataBase: new URL("https://www.parkplace-dental.com"),
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
  },
};

/** Local business markup so the practice reads correctly in search. */
const structuredData = {
  "@context": "https://schema.org",
  "@type": "Dentist",
  name: practice.name,
  telephone: practice.phone,
  email: practice.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: practice.address.street,
    addressLocality: practice.address.city,
    addressRegion: practice.address.region,
    postalCode: practice.address.postalCode,
    addressCountry: "US",
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
      </body>
    </html>
  );
}

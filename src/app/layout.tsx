import type { Metadata } from "next";
import localFont from "next/font/local";
import Script from "next/script";
import { siteUrl, canonical } from "@/lib/site";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { FaqSection } from "@/components/site/FaqSection";
import { LocationSection } from "@/components/site/LocationSection";
import { RouteGate } from "@/components/site/RouteGate";
import { ScrollToTop } from "@/components/site/ScrollToTop";
import { MobileActionBar } from "@/components/site/MobileActionBar";
import { CallTracking } from "@/components/site/CallTracking";
import { MotionProvider } from "@/components/site/MotionProvider";
import { JsonLd } from "@/components/site/JsonLd";
import { siteGraph } from "@/lib/schema";
import { GA_MEASUREMENT_ID, analyticsEnabled } from "@/lib/analytics";
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
  /*
   * Deliberately not preloaded.
   *
   * Zodiak sets the headlines; Plus Jakarta Sans sets the paragraph beneath
   * them, and that paragraph is the Largest Contentful Paint element on the
   * homepage. Preloading both put 57KB of fonts at the front of the queue on a
   * throttled connection, ahead of the stylesheet that unblocks first paint.
   * Zodiak still loads, one priority level down, and swaps in when it arrives;
   * the headline is animated on entry anyway, so the swap lands under cover.
   */
  preload: false,
  src: [
    {
      path: "../fonts/Zodiak-Variable.woff2",
      weight: "100 900",
      style: "normal",
    },
  ],
});

/**
 * The italic, deliberately not preloaded.
 *
 * It appears twice on the whole site, in pull quotes well below the fold, and
 * it is 44KB. Preloaded alongside the two faces that are actually needed for
 * the first screen, it competed with them for bandwidth on exactly the slow
 * mobile connection where that bandwidth is scarcest. It loads on demand now,
 * which is when the reader has scrolled far enough to see it.
 *
 * It is a separate family rather than a second face of the first, because
 * next/font preloads per loader and there is no way to preload one face of a
 * family and not another. `--font-display-italic` is what the pull quotes ask
 * for.
 */
const zodiakItalic = localFont({
  variable: "--font-zodiak-italic",
  /*
   * `optional` rather than `swap`, because this face buys very little and was
   * costing a lot. It sets two pull quotes, both below the fold, and its 31KB
   * sat in the critical request chain competing with everything above them. On
   * a connection quick enough to have it in time it is used; on one that is
   * not, the quotes render in Georgia italic and nothing reflows later.
   */
  display: "optional",
  preload: false,
  src: [
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
  display: "optional",
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
    opengraph-image.jpg, twitter-image.jpg, icon.png, apple-icon.png and
    favicon.ico. Next fingerprints them and writes the tags, so there is no
    hardcoded path here to fall out of date.

    Exactly one of each. Next writes a tag for every opengraph-image.* file it
    finds, so a .png left beside the .jpg put two share images on the homepage,
    and iMessage and Slack drew the link card twice.
  */
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
    <html
      lang="en"
      className={`${zodiak.variable} ${zodiakItalic.variable} ${jakarta.variable}`}
    >
      <body className="antialiased">
        {/*
          Marks the document as scripted, before anything below it paints.

          Scroll entrances hide their content in CSS, and that rule is scoped
          to this attribute. Setting it here rather than from React means the
          hidden state is in place during parse, so nothing flashes in and then
          out again on the way to being revealed; not setting it at all, which
          is what happens when scripts are blocked or fail, leaves every
          revealed block at its visible resting state.
        */}
        <script
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.setAttribute("data-js","")`,
          }}
        />
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
        {/* The practice, the dentist and the site. Every page adds its own
            nodes that reference these by @id rather than restating them. */}
        <JsonLd graph={siteGraph()} />
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
        <CallTracking />
        <Analytics />
        <SpeedInsights />
        {/*
          The handshake with Google's origins, started early.

          gtag.js is fetched from one host and posts its measurements to
          another, and on a throttled mobile connection the DNS lookup, TCP
          connection and TLS negotiation for each cost real time that is
          otherwise spent doing nothing. Lighthouse measured 300ms of it.
        */}
        {analyticsEnabled && (
          <>
            <link rel="preconnect" href="https://www.googletagmanager.com" />
            <link
              rel="preconnect"
              href="https://www.google-analytics.com"
              crossOrigin=""
            />
          </>
        )}
        {/*
          Google Analytics, loaded after the page is interactive so it cannot
          delay first paint. GA4's enhanced measurement follows History API
          navigations on its own, which is what the App Router performs, so
          client-side route changes are counted without anything further here.
        */}
        {/*
          Loaded on idle rather than as soon as the page is interactive.

          `@next/third-parties` mounts gtag.js with the `afterInteractive`
          strategy, which on a throttled phone means it competes with hydration
          for the main thread. Measured on production it was 238ms of script
          evaluation inside the window that decides Largest Contentful Paint,
          for a measurement that nobody reads in real time.

          `lazyOnload` waits for the load event and the browser going quiet.
          GA4 still records the pageview, and enhanced measurement still
          follows History API navigations afterwards, so nothing is lost except
          the contention.
        */}
        {analyticsEnabled && (
          <Script
            id="ga-loader"
            strategy="lazyOnload"
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          />
        )}
        {analyticsEnabled && (
          <Script id="ga-init" strategy="lazyOnload">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_MEASUREMENT_ID}');`}
          </Script>
        )}
      </body>
    </html>
  );
}

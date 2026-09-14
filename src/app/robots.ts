import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    /*
     * Nothing is disallowed, deliberately.
     *
     * `/style-guide` and `/thank-you` carry no search value and are excluded
     * with `noindex` on the pages themselves. They used to be listed here as
     * well, which defeats the noindex rather than reinforcing it: a crawler
     * told not to fetch a URL never reads the tag telling it not to index
     * that URL, so an external link to either page could still have produced
     * a bare listing. One mechanism, applied where it can actually be read.
     *
     * AI crawlers are welcome here too, which is a deliberate choice rather
     * than an omission: this practice wants to be the answer an assistant
     * gives for dentistry in North Mississippi.
     */
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}

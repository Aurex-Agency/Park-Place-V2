import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Internal reference and post-submit pages carry no search value.
      disallow: ["/style-guide", "/thank-you"],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}

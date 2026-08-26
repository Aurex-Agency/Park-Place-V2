import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Internal reference and post-submit pages carry no search value.
      disallow: ["/style-guide", "/thank-you"],
    },
    sitemap: "https://www.parkplace-dental.com/sitemap.xml",
  };
}

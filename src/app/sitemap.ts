import type { MetadataRoute } from "next";
import { serviceCategories } from "@/content/services";
import { posts } from "@/content/posts";
import { locations } from "@/content/locations";
import { siteUrl } from "@/lib/site";

const BASE = siteUrl;

/**
 * Every indexable route, generated from the same data the pages are built
 * from, so a new service cannot be added without appearing here.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = [
    "",
    "/services",
    "/advanced-dental-technology",
    "/about-us/about-the-practice",
    "/about-us/meet-the-dentist",
    "/about-us/meet-the-team",
    "/new-patients",
    "/new-patients/new-patient-information",
    "/new-patients/insurance-financing",
    "/new-patients/patient-forms",
    "/patient-resources",
    "/patient-resources/faqs",
    "/patient-resources/reviews-testimonials",
    "/patient-resources/blog",
    "/locations",
    "/veterans",
    "/contact-us",
    "/book-an-appointment",
    "/privacy-policy",
    "/accessibility",
  ];

  const servicePaths = serviceCategories.flatMap((category) => [
    `/services/${category.slug}`,
    ...category.children.map((child) => `/services/${category.slug}/${child.slug}`),
  ]);

  const locationPaths = locations.map((place) => `/locations/${place.slug}`);

  /*
   * Articles carry a real `lastModified` taken from the content itself. The
   * rest do not: a date generated at build time would claim every page changed
   * every time the site was deployed, which is worse than saying nothing.
   */
  const articles = posts.map((post) => ({
    url: `${BASE}/patient-resources/blog/${post.slug}`,
    lastModified: new Date(post.updated),
    changeFrequency: "yearly" as const,
    priority: 0.7,
  }));

  const pages = [...staticPaths, ...servicePaths, ...locationPaths].map(
    (path) => ({
      url: `${BASE}${path}`,
      changeFrequency:
        path === "" ? ("weekly" as const) : ("monthly" as const),
      priority: path === "" ? 1 : path.split("/").length > 2 ? 0.6 : 0.8,
    }),
  );

  return [...pages, ...articles];
}

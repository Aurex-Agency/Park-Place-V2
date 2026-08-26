import type { MetadataRoute } from "next";
import { serviceCategories } from "@/content/services";
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
    "/contact-us",
    "/book-an-appointment",
    "/privacy-policy",
    "/accessibility",
  ];

  const servicePaths = serviceCategories.flatMap((category) => [
    `/services/${category.slug}`,
    ...category.children.map((child) => `/services/${category.slug}/${child.slug}`),
  ]);

  return [...staticPaths, ...servicePaths].map((path) => ({
    url: `${BASE}${path}`,
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : path.split("/").length > 2 ? 0.6 : 0.8,
  }));
}

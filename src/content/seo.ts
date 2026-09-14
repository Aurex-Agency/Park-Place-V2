/**
 * Titles and meta descriptions for every indexable route.
 *
 * These used to be derived from the page name, which produced titles like
 * "Fillings | Park Place Dental" at 28 characters against roughly 60 that
 * Google will render, and left exactly one title on the entire site carrying a
 * place name. For a practice trying to be found across seven counties, the
 * strongest on-page element was saying nothing about where it is.
 *
 * The rules here:
 *
 *   - Keep the whole rendered title, including the " | Park Place Dental" the
 *     layout template appends, under about 60 characters.
 *   - Name the place. Booneville for everything anchored to the office; North
 *     Mississippi where the treatment is something people genuinely travel for.
 *   - Say the thing a patient would type, not the thing the menu calls it.
 *     "Tooth-Colored Fillings" rather than "Fillings".
 *   - Descriptions run 140 to 158 characters, name the town, and give a reason
 *     to click rather than restating the title.
 */

import { canonical as canonicalFor } from "@/lib/site";

/**
 * The site-wide share card, stated rather than inherited.
 *
 * Next generates this from `app/opengraph-image.png` and serves it at this
 * path. It has to be named explicitly here because declaring a page-level
 * `openGraph` object without `images` replaces the file-convention image
 * rather than merging with it, which silently stripped the share card from
 * forty-four pages the first time this helper was written.
 */
const SHARE_IMAGE = "/opengraph-image.png";

export type SeoEntry = { title: string; description: string };

/** Keyed by route path, without a trailing slash. */
export const seo: Record<string, SeoEntry> = {
  /* ------------------------------------------------------------- top level */
  "/services": {
    title: "Dental Services in Booneville, MS",
    description:
      "General, restorative, cosmetic and periodontal dentistry with an in-house lab, serving Booneville and North Mississippi. Same-day crowns and denture repairs.",
  },
  "/advanced-dental-technology": {
    title: "Solea Laser & In-House Dental Lab",
    description:
      "RAYFace 3D scanning, the Solea dental laser and a full in-house dental lab in Booneville, MS. What each one changes about your visit, explained plainly.",
  },
  "/about-us/about-the-practice": {
    title: "About Our Booneville Dental Practice",
    description:
      "A family dental practice in Booneville, Mississippi, caring for patients across Prentiss County and North Mississippi for more than 43 years.",
  },
  "/about-us/meet-the-dentist": {
    title: "Dr. Ken Goodwin, DMD, Booneville MS",
    description:
      "Dr. Ken Goodwin has practised dentistry in his hometown of Booneville, Mississippi for over 43 years. His training, his approach, and how to reach him.",
  },
  "/about-us/meet-the-team": {
    title: "Meet the Team | Booneville, MS Dentist",
    description:
      "The hygienists, assistants and front desk team caring for patients at Park Place Dental in Booneville, Mississippi.",
  },
  "/new-patients": {
    title: "New Patients | Dentist in Booneville, MS",
    description:
      "What to expect, what to bring, insurance we file and forms to complete before your first visit to Park Place Dental in Booneville, Mississippi.",
  },
  "/new-patients/new-patient-information": {
    title: "Your First Visit, Booneville MS",
    description:
      "What actually happens at a first appointment at Park Place Dental in Booneville, from the examination to the treatment conversation. No surprises.",
  },
  "/new-patients/insurance-financing": {
    title: "Dental Insurance & Financing",
    description:
      "Insurance plans we file, CareCredit financing, and how we handle cost conversations at Park Place Dental in Booneville, Mississippi.",
  },
  "/new-patients/patient-forms": {
    title: "Patient Forms",
    description:
      "Complete your new patient forms before your visit to Park Place Dental in Booneville, Mississippi, and spend less time in the waiting room.",
  },
  "/patient-resources": {
    title: "Patient Resources, Booneville MS",
    description:
      "Dental FAQs, patient reviews and oral health articles from Park Place Dental in Booneville, Mississippi.",
  },
  "/patient-resources/faqs": {
    title: "Dental FAQs | Booneville, Mississippi",
    description:
      "Straight answers to the questions we hear most: costs, insurance, nervous patients, emergencies and what to expect as a new patient in Booneville, MS.",
  },
  "/patient-resources/reviews-testimonials": {
    title: "Patient Reviews | Booneville, MS Dentist",
    description:
      "What patients from Booneville, Corinth, Tupelo and across North Mississippi say about their care at Park Place Dental.",
  },
  "/patient-resources/blog": {
    title: "Dental Health Articles, North MS",
    description:
      "Plain-English answers on dental emergencies, implant costs, VA dental benefits and more, written by Dr. Ken Goodwin in Booneville, Mississippi.",
  },
  "/contact-us": {
    title: "Contact Us | Dentist in Booneville, MS",
    description:
      "Park Place Dental, 403 N 3rd St, Booneville, Mississippi 38829. Call (662) 728-8171, or send us a message and we will call you back.",
  },
  "/book-an-appointment": {
    title: "Book an Appointment in Booneville",
    description:
      "Request an appointment at Park Place Dental in Booneville, Mississippi. We will call you back to confirm a time that works.",
  },
  "/veterans": {
    title: "Dentist for Veterans | Booneville, MS",
    description:
      "Park Place Dental serves veterans across North Mississippi. What VA dental eligibility actually covers, and how to arrange care with us.",
  },
  "/locations": {
    title: "Serving North Mississippi",
    description:
      "Patients travel to Park Place Dental in Booneville from Baldwyn, Corinth, New Albany, Ripley, Fulton and across North Mississippi. Find your drive.",
  },
  "/privacy-policy": {
    title: "Privacy Policy",
    description:
      "How Park Place Dental handles the information you share with us through this website.",
  },
  "/accessibility": {
    title: "Accessibility",
    description:
      "Park Place Dental is committed to making this website usable for everyone, and how to tell us when it is not.",
  },

  /* ----------------------------------------------------- service categories */
  "/services/general-dentistry": {
    title: "General Dentistry in Booneville, MS",
    description:
      "Cleanings, exams, tooth-colored fillings, root canals and same-day emergency care for families in Booneville and across North Mississippi.",
  },
  "/services/restorative-dentistry": {
    title: "Restorative Dentistry, North MS",
    description:
      "Crowns, bridges, dentures and dental implants made in our own in-house lab in Booneville, MS, so there is no waiting on an outside laboratory.",
  },
  "/services/cosmetic-dentistry": {
    title: "Cosmetic Dentistry in Booneville, MS",
    description:
      "Veneers, teeth whitening and smile makeovers planned with RAYFace 3D scanning at Park Place Dental in Booneville, Mississippi.",
  },
  "/services/periodontal-care": {
    title: "Gum Disease Treatment in Booneville, MS",
    description:
      "Bleeding gums are common but not normal. Periodontal assessment and deep cleaning at Park Place Dental in Booneville, Mississippi.",
  },
  "/services/facial-aesthetics": {
    title: "Botox & Dermal Fillers | Booneville, MS",
    description:
      "Facial aesthetic treatment, including clinical use for jaw clenching, from the dental team at Park Place Dental in Booneville, Mississippi.",
  },

  /* ------------------------------------------------------ treatment (money) */
  "/services/general-dentistry/cleanings-exams": {
    title: "Cleanings & Exams in Booneville, MS",
    description:
      "Gentle cleanings and thorough exams in Booneville, Mississippi. How often you actually need one, what happens, and what it costs to skip them.",
  },
  "/services/general-dentistry/fillings": {
    title: "Tooth-Colored Fillings in Booneville, MS",
    description:
      "Composite fillings that match your natural teeth, and Solea laser fillings that often need no numbing shot. Booneville and North Mississippi.",
  },
  "/services/general-dentistry/root-canals": {
    title: "Root Canal Treatment in Booneville, MS",
    description:
      "A root canal relieves the pain of an infected tooth rather than causing it. What the treatment involves, and how to tell if you need one.",
  },
  "/services/general-dentistry/emergency-dentistry": {
    title: "Emergency Dentist, Booneville MS",
    description:
      "Knocked-out tooth, broken crown, severe toothache or swelling? Call (662) 728-8171. Same-day emergency dental care in Booneville, Mississippi.",
  },
  "/services/restorative-dentistry/crowns-bridges": {
    title: "Same-Day Crowns & Bridges, Booneville",
    description:
      "Crowns and bridges made in our own in-house dental lab in Booneville, MS. No outside laboratory, no posting work away, far less waiting.",
  },
  "/services/restorative-dentistry/dental-implants": {
    title: "Dental Implants | Booneville & North MS",
    description:
      "Dental implants in Booneville, Mississippi, with the crown made in our own lab. What the treatment involves, who is a candidate, and what drives the cost.",
  },
  "/services/restorative-dentistry/dentures": {
    title: "Dentures & Repairs in Booneville, MS",
    description:
      "Full and partial dentures, relines and same-day repairs from our in-house lab in Booneville, Mississippi. Bring the pieces, we will look at it today.",
  },
  "/services/cosmetic-dentistry/veneers": {
    title: "Porcelain Veneers in Booneville, MS",
    description:
      "Veneers for chips, gaps, shape and colour, matched in our own lab in Booneville, Mississippi. What they fix, what they cost you, and the honest trade-off.",
  },
  "/services/cosmetic-dentistry/teeth-whitening": {
    title: "Teeth Whitening in Booneville, MS",
    description:
      "Professional teeth whitening in Booneville, MS. How much lighter your teeth realistically get, how long it lasts, and why crowns will not change shade.",
  },
  "/services/cosmetic-dentistry/smile-makeovers": {
    title: "Smile Makeovers | Booneville & North MS",
    description:
      "A smile makeover is a plan, not one procedure. Treatment sequenced and previewed with RAYFace 3D facial scanning in Booneville, Mississippi.",
  },
  "/services/cosmetic-dentistry/smile-gallery-before-after": {
    title: "Smile Gallery: Before & After",
    description:
      "Real before and after photographs of work done at Park Place Dental in Booneville, Mississippi. Published with our patients' permission.",
  },
  "/services/periodontal-care/gum-disease-treatment": {
    title: "Gum Disease Treatment | Booneville, MS",
    description:
      "Scaling and root planing for gum disease in Booneville, Mississippi. What deep cleaning involves, whether it hurts, and what happens afterwards.",
  },
  "/services/facial-aesthetics/botox": {
    title: "Botox in Booneville, Mississippi",
    description:
      "Botox at Park Place Dental in Booneville, MS, for facial lines and for the muscle tension behind jaw clenching and grinding.",
  },
  "/services/facial-aesthetics/dermal-fillers": {
    title: "Dermal Fillers in Booneville, MS",
    description:
      "Hyaluronic acid dermal fillers at Park Place Dental in Booneville, MS. How long they last, what to expect afterwards, and our conservative approach.",
  },
};

/**
 * Metadata for a route, falling back to the page's own title and description
 * where no override exists. Nothing breaks if a route is missing here.
 */
export function seoFor(
  path: string,
  fallback: { title: string; description: string },
): SeoEntry {
  return seo[path] ?? fallback;
}

/**
 * The Next metadata object for a route, so no page hand-assembles one.
 *
 * Canonical, Open Graph and Twitter all derive from the same title and
 * description, which is what stops a page's share card drifting away from its
 * search result over time.
 */
export function pageMetadata(
  path: string,
  fallback: { title: string; description: string },
) {
  const meta = seoFor(path, fallback);
  return {
    title: meta.title,
    description: meta.description,
    alternates: { canonical: canonicalFor(path) },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: path,
      type: "website" as const,
      images: [SHARE_IMAGE],
    },
    twitter: {
      title: meta.title,
      description: meta.description,
      images: [SHARE_IMAGE],
    },
  };
}

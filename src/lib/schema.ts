/**
 * Structured data for the whole site, built in one place.
 *
 * Every page used to emit the same standalone `Dentist` node. Thirty seven
 * copies of one business with no relationship between them is not a graph: it
 * is the same sentence repeated, and a search engine has to guess whether it
 * describes one practice or several. Everything here is wired together by
 * stable `@id`s instead, so the practice, the dentist, the site and each page
 * are one connected description that happens to be served from many URLs.
 *
 * Two rules govern what may appear:
 *
 *   1. Nothing is asserted that the practice has not confirmed. No
 *      `priceRange`, no `aggregateRating`, no `sameAs` until the real profile
 *      URLs are to hand. Structured data is a machine-readable claim about a
 *      real business, and an invented one is worse than an absent one.
 *   2. Types earn their place. `Physician` is not used for Dr. Goodwin because
 *      in schema.org it denotes an office or organisation, not an individual;
 *      he is a `Person` who works for the `Dentist`. `MedicalProcedure` is not
 *      used on treatment pages: it produces no rich result and invites
 *      clinical claims the site should not be making.
 *
 * Note on `FAQPage`: Google retired site-wide FAQ rich results in May 2026, so
 * this markup no longer earns a SERP feature. It is kept because it is still
 * read by AI search systems, which is now its whole job.
 */
import { practice, doctor } from "@/lib/content";
import { siteUrl, canonical } from "@/lib/site";

/* Stable identifiers. These must not change once indexed: they are what ties
   every page's markup back to the same three entities. */
export const PRACTICE_ID = `${siteUrl}/#practice`;
export const WEBSITE_ID = `${siteUrl}/#website`;
export const DOCTOR_ID = `${siteUrl}/#dr-ken-goodwin`;

/** E.164, which is the form a machine can dial without guessing. */
const TELEPHONE = "+1-662-728-8171";

type Node = Record<string, unknown>;

/**
 * The practice itself. One node, one address, for the whole site.
 *
 * `areaServed` carries every county the practice genuinely draws from, and the
 * `GeoCircle` states the same thing in a form a machine can compute against.
 * Neither invents a second location: a practice that draws regionally from one
 * building is exactly what this says.
 */
export function practiceNode(): Node {
  return {
    "@type": "Dentist",
    "@id": PRACTICE_ID,
    name: practice.name,
    url: siteUrl,
    telephone: TELEPHONE,
    email: practice.email,
    image: [
      `${siteUrl}/images/team-group-porch.jpg`,
      `${siteUrl}/images/reception-front-desk.jpg`,
    ],
    logo: `${siteUrl}/images/logo-lockup.png`,
    address: {
      "@type": "PostalAddress",
      streetAddress: practice.address.street,
      addressLocality: practice.address.city,
      addressRegion: practice.address.region,
      postalCode: practice.address.postalCode,
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 34.6595,
      longitude: -88.5675,
    },
    hasMap: practice.mapsHref,
    areaServed: [
      "Prentiss County, Mississippi",
      "Alcorn County, Mississippi",
      "Tishomingo County, Mississippi",
      "Itawamba County, Mississippi",
      "Lee County, Mississippi",
      "Union County, Mississippi",
      "Tippah County, Mississippi",
    ].map((name) => ({ "@type": "AdministrativeArea", name })),
    serviceArea: {
      "@type": "GeoCircle",
      geoMidpoint: {
        "@type": "GeoCoordinates",
        latitude: 34.6595,
        longitude: -88.5675,
      },
      // Roughly the distance to Tupelo and Iuka, the far edges of the area
      // patients actually travel from.
      geoRadius: "64000",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday"],
        opens: "08:30",
        closes: "17:00",
      },
      {
        /* Friday is declared separately because the site says Friday hours may
           vary. Stating a flat 17:00 close for it, as the previous markup did,
           asserts something the practice does not. */
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Friday"],
        opens: "08:30",
        closes: "17:00",
        description: practice.hoursNote,
      },
    ],
    employee: { "@id": DOCTOR_ID },
    founder: { "@id": DOCTOR_ID },
  };
}

/** Dr. Goodwin, as a person rather than an institution. */
export function doctorNode(): Node {
  return {
    "@type": "Person",
    "@id": DOCTOR_ID,
    name: doctor.name,
    givenName: "Ken",
    familyName: "Goodwin",
    honorificSuffix: doctor.credential,
    jobTitle: "Dentist",
    url: `${siteUrl}/about-us/meet-the-dentist`,
    image: `${siteUrl}${doctor.portrait}`,
    worksFor: { "@id": PRACTICE_ID },
    alumniOf: [
      { "@type": "CollegeOrUniversity", name: "University of Mississippi" },
      {
        "@type": "CollegeOrUniversity",
        name: "University of Mississippi School of Dentistry",
      },
    ],
    knowsAbout: [
      "General dentistry",
      "Restorative dentistry",
      "Cosmetic dentistry",
      "Dental implants",
      "Dentures",
      "Same-day crowns",
    ],
  };
}

export function websiteNode(): Node {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: siteUrl,
    name: practice.name,
    publisher: { "@id": PRACTICE_ID },
    inLanguage: "en-US",
  };
}

export type Crumb = { label: string; href?: string };

/**
 * Breadcrumbs, from the same array the page already renders.
 *
 * The trail was being drawn on screen and described nowhere, which is the one
 * kind of markup that costs nothing to add: the data exists, it is accurate,
 * and breadcrumbs are still a supported rich result.
 */
export function breadcrumbNode(path: string, crumbs: Crumb[]): Node | null {
  if (crumbs.length < 2) return null;
  return {
    "@type": "BreadcrumbList",
    "@id": `${canonical(path)}#breadcrumb`,
    itemListElement: crumbs.map((crumb, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: crumb.label,
      ...(crumb.href ? { item: `${siteUrl}${crumb.href}` } : {}),
    })),
  };
}

type PageOptions = {
  path: string;
  name: string;
  description: string;
  crumbs?: Crumb[];
  /** Set for pages that are about a treatment or a health topic. */
  medical?: boolean;
  primaryImage?: string;
};

function webPageNode(options: PageOptions): Node {
  const url = canonical(options.path);
  const node: Node = {
    "@type": options.medical ? ["WebPage", "MedicalWebPage"] : "WebPage",
    "@id": `${url}#webpage`,
    url,
    name: options.name,
    description: options.description,
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": PRACTICE_ID },
    inLanguage: "en-US",
    ...(options.primaryImage
      ? { primaryImageOfPage: `${siteUrl}${options.primaryImage}` }
      : {}),
  };

  if (options.medical) {
    /* A page describing a treatment should say who stands behind it. On health
       content this is the difference between a page that reads as authored and
       one that reads as unattributed. */
    node.reviewedBy = { "@id": DOCTOR_ID };
    node.lastReviewed = REVIEW_DATE;
  }

  if (options.crumbs?.length) {
    const crumbs = breadcrumbNode(options.path, options.crumbs);
    if (crumbs) node.breadcrumb = { "@id": crumbs["@id"] };
  }

  return node;
}

/**
 * The date the clinical pages were last read through by the practice.
 *
 * One constant rather than a per-page value, because it describes a single
 * review pass. It must be updated by hand when another pass happens: a date
 * that moves on its own is a claim nobody made.
 */
export const REVIEW_DATE = "2026-09-13";

/**
 * The three entities that do not change from page to page.
 *
 * Emitted once by the root layout. Every page-level graph below references
 * these by `@id` rather than restating them, so the practice is described once
 * and pointed at thirty seven times instead of being described thirty seven
 * times. `@id` references resolve across separate script blocks on the same
 * page, which is what makes the split safe.
 */
export function siteGraph(): string {
  return json({
    "@context": "https://schema.org",
    "@graph": [practiceNode(), doctorNode(), websiteNode()],
  });
}

/** The graph for an ordinary page: this page, and its breadcrumb trail. */
export function pageGraph(options: PageOptions): string {
  const nodes: Node[] = [webPageNode(options)];

  if (options.crumbs?.length) {
    const crumbs = breadcrumbNode(options.path, options.crumbs);
    if (crumbs) nodes.push(crumbs);
  }

  return json({ "@context": "https://schema.org", "@graph": nodes });
}

/** A treatment page: the page graph, plus the service being described. */
export function serviceGraph(
  options: PageOptions & { serviceName: string; serviceType: string },
): string {
  const url = canonical(options.path);
  const nodes: Node[] = [
    webPageNode({ ...options, medical: true }),
    {
      "@type": "Service",
      "@id": `${url}#service`,
      name: options.serviceName,
      serviceType: options.serviceType,
      description: options.description,
      url,
      provider: { "@id": PRACTICE_ID },
      areaServed: { "@id": PRACTICE_ID },
    },
  ];

  const crumbs = options.crumbs?.length
    ? breadcrumbNode(options.path, options.crumbs)
    : null;
  if (crumbs) nodes.push(crumbs);

  return json({ "@context": "https://schema.org", "@graph": nodes });
}

/**
 * A location page.
 *
 * The temptation on a page like this is to emit a second `Dentist` node with
 * the town's name on it. That would be a lie: there is one practice, at one
 * address, and a second business node with a different locality is exactly the
 * pattern search engines treat as location spam. It would also put a second,
 * conflicting NAP into the index, which is the one thing local SEO cannot
 * survive.
 *
 * So what is emitted instead is true: the existing practice, referenced by
 * `@id`, offers a service whose `areaServed` is this town. One business, many
 * served places, described once.
 */
export function locationGraph(options: {
  path: string;
  name: string;
  description: string;
  crumbs: Crumb[];
  town: string;
  county: string;
  zip: string;
  /** The smaller communities this page also speaks for. */
  nearby: readonly string[];
  faqs: readonly { q: string; a: string }[];
}): string {
  const url = canonical(options.path);

  /* The town, and the communities around it, as places rather than as a string
     of keywords.

     `containedInPlace` is asserted only for the town the page is about, and
     only from that town's own `county` field. The surrounding communities get
     a locality and nothing more: several of them sit across a county line from
     the town they are near, and inheriting the page's county would put a false
     claim into the markup for the sake of one extra property. */
  const place = (name: string): Node => ({
    "@type": "Place",
    name: `${name}, Mississippi`,
    address: {
      "@type": "PostalAddress",
      addressLocality: name,
      addressRegion: "MS",
      addressCountry: "US",
    },
  });

  /* Baldwyn straddles a county line, and its `county` reads "Prentiss and Lee
     Counties". Emitted whole that is not the name of any administrative area,
     so it is split back into the two that exist. */
  const counties = options.county
    .replace(/\s+Count(y|ies)$/i, "")
    .split(/\s+and\s+/)
    .map((name) => ({
      "@type": "AdministrativeArea",
      name: `${name} County, Mississippi`,
    }));

  const townPlace: Node = {
    ...place(options.town),
    address: {
      "@type": "PostalAddress",
      addressLocality: options.town,
      addressRegion: "MS",
      postalCode: options.zip,
      addressCountry: "US",
    },
    containedInPlace: counties.length === 1 ? counties[0] : counties,
  };

  const nodes: Node[] = [
    webPageNode({
      path: options.path,
      name: options.name,
      description: options.description,
      crumbs: options.crumbs,
    }),
    {
      "@type": "Service",
      "@id": `${url}#service`,
      name: `Dental care for ${options.town}, Mississippi`,
      serviceType: "Dentistry",
      description: options.description,
      url,
      provider: { "@id": PRACTICE_ID },
      areaServed: [townPlace, ...options.nearby.map((n) => place(n))],
      availableChannel: {
        "@type": "ServiceChannel",
        servicePhone: { "@type": "ContactPoint", telephone: TELEPHONE },
        serviceUrl: `${siteUrl}/book-an-appointment`,
      },
    },
  ];

  const crumbs = breadcrumbNode(options.path, options.crumbs);
  if (crumbs) nodes.push(crumbs);
  if (options.faqs.length) nodes.push(faqNode(options.faqs, options.path));

  return json({ "@context": "https://schema.org", "@graph": nodes });
}

/** Questions and answers, for the AI systems that still read them. */
export function faqNode(items: readonly { q: string; a: string }[], path: string): Node {
  return {
    "@type": "FAQPage",
    "@id": `${canonical(path)}#faq`,
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}

/** A page whose questions are the page. */
export function faqPageGraph(
  options: PageOptions,
  items: readonly { q: string; a: string }[],
): string {
  const nodes: Node[] = [webPageNode(options), faqNode(items, options.path)];
  const crumbs = options.crumbs?.length
    ? breadcrumbNode(options.path, options.crumbs)
    : null;
  if (crumbs) nodes.push(crumbs);
  return json({ "@context": "https://schema.org", "@graph": nodes });
}

export type ArticleSchemaOptions = {
  path: string;
  headline: string;
  description: string;
  published: string;
  modified: string;
  image: string;
  crumbs: Crumb[];
  faqs?: readonly { q: string; a: string }[];
  /** Ordered steps, where the article genuinely gives instructions. */
  howTo?: { name: string; steps: { name: string; text: string }[] };
};

/**
 * A blog post.
 *
 * `author` and `reviewedBy` both point at Dr. Goodwin, which is accurate here:
 * these articles carry his name because the clinical substance is his. If a
 * post is ever written by someone else, the author changes and the reviewer
 * stays, which is exactly the distinction the two properties exist to draw.
 */
export function articleGraph(options: ArticleSchemaOptions): string {
  const url = canonical(options.path);
  const nodes: Node[] = [
    {
      "@type": ["BlogPosting", "MedicalWebPage"],
      "@id": `${url}#article`,
      headline: options.headline,
      description: options.description,
      url,
      mainEntityOfPage: url,
      image: `${siteUrl}${options.image}`,
      datePublished: options.published,
      dateModified: options.modified,
      author: { "@id": DOCTOR_ID },
      reviewedBy: { "@id": DOCTOR_ID },
      lastReviewed: options.modified,
      publisher: { "@id": PRACTICE_ID },
      isPartOf: { "@id": WEBSITE_ID },
      inLanguage: "en-US",
    },
  ];

  const crumbs = breadcrumbNode(options.path, options.crumbs);
  if (crumbs) nodes.push(crumbs);
  if (options.faqs?.length) nodes.push(faqNode(options.faqs, options.path));

  if (options.howTo) {
    nodes.push({
      "@type": "HowTo",
      "@id": `${url}#howto`,
      name: options.howTo.name,
      step: options.howTo.steps.map((step, i) => ({
        "@type": "HowToStep",
        position: i + 1,
        name: step.name,
        text: step.text,
      })),
    });
  }

  return json({ "@context": "https://schema.org", "@graph": nodes });
}

/**
 * `<` is escaped because JSON-LD is injected into an HTML document, and a
 * string containing `</script>` would otherwise close the tag early.
 */
function json(value: unknown): string {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}

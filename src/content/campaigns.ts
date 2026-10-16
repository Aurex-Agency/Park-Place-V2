import { practice } from "@/lib/content";

/**
 * The five advertising landing pages, and everything that differs between
 * them.
 *
 * These are not website pages. A visitor arrives from a paid advertisement
 * with one decision in front of them, so there is no navigation, no sidebar
 * and no way out except the call or the form. Keeping the copy here rather
 * than inside each page means the wording an advertisement has to match can be
 * checked in one place.
 *
 * House rule applies throughout: no em dashes anywhere in this copy.
 */

/**
 * Call tracking numbers.
 *
 * Each page is meant to carry its own number so a call can be attributed to
 * the campaign that produced it. Until those numbers are provisioned every
 * page falls back to the practice line, which is correct but tells you
 * nothing about which advertisement paid for the call.
 *
 * To switch a page over, replace its entry here. Nothing else needs touching.
 * Clicks are also recorded per page by CallTracking regardless, so attribution
 * is not lost in the meantime, only made coarser.
 */
export const campaignPhones: Record<string, { display: string; href: string }> = {
  implants: { display: practice.phone, href: practice.phoneHref },
  emergency: { display: practice.phone, href: practice.phoneHref },
  "same-day-crowns": { display: practice.phone, href: practice.phoneHref },
  "smile-makeover": { display: practice.phone, href: practice.phoneHref },
  "new-patient-offer": { display: practice.phone, href: practice.phoneHref },
};

export function phoneFor(slug: string) {
  return campaignPhones[slug] ?? { display: practice.phone, href: practice.phoneHref };
}

/** A question on a campaign form, with the only answers the server accepts. */
export type CampaignField = {
  name: string;
  label: string;
  options: readonly string[];
  required?: boolean;
};

export type CampaignForm = {
  headline: string;
  /**
   * Whether an email address may be left blank.
   *
   * On the emergency page it may. Someone in pain is asking to be telephoned,
   * and demanding an email address to arrange a phone call is friction for no
   * purpose. They simply do not get the confirmation email; they get a call.
   */
  emailOptional?: boolean;
  /** The words on the submit button. They should echo the advertisement. */
  submitLabel: string;
  /** The line under the submit button, above the phone number. */
  note?: string;
  fields: readonly CampaignField[];
};

export type Campaign = {
  slug: string;
  /** Used in the email subject and in reporting. */
  name: string;
  title: string;
  description: string;
  form?: CampaignForm;
};

/** Offered on every form, because it is the single best predictor of contact. */
const CONTACT_PREFERENCE: CampaignField = {
  name: "contactPreference",
  label: "Preferred contact method",
  options: ["Call me", "Text me"],
  required: true,
};

export const TRUST_ITEMS = [
  "43+ Years Caring for Booneville",
  "In-House Dental Lab",
  "Trusted VA Provider",
  "Two Doctors On Staff",
] as const;

export const campaigns: Record<string, Campaign> = {
  implants: {
    slug: "implants",
    name: "Implant consultation",
    title: "Free 3D Implant Consultation in Booneville, MS",
    description:
      "Missing a tooth? Get a free 3D implant consultation at Park Place Dental in Booneville, Mississippi. Implant crowns made in our own lab.",
    form: {
      headline: "Ready to Fill the Gap? Start With a Free Consultation.",
      submitLabel: "Book My Free Consultation",
      fields: [
        {
          name: "situation",
          label: "Which best describes you?",
          options: [
            "Missing one tooth",
            "Missing several teeth",
            "Interested in dentures",
            "Not sure yet",
          ],
          required: true,
        },
        CONTACT_PREFERENCE,
      ],
    },
  },

  emergency: {
    slug: "emergency",
    name: "Emergency",
    title: "Same-Day Emergency Dentist in Booneville, MS",
    description:
      "Severe toothache, broken tooth or swelling? Park Place Dental keeps time open for urgent visits every day. Call (662) 728-8171.",
    /*
     * A call back request, not an enquiry form.
     *
     * The telephone is still the point of this page and the form sits well
     * below the call button, never beside it. This exists for the visitor the
     * call button cannot help: the one reading at nine at night, or who rang
     * and got no answer. Three questions, no email required.
     */
    form: {
      headline: "Cannot get through right now? Ask us to call you.",
      submitLabel: "Request a call back",
      emailOptional: true,
      fields: [
        {
          name: "problem",
          label: "What is happening?",
          options: [
            "Severe toothache",
            "Broken or chipped tooth",
            "Knocked-out tooth",
            "Lost crown or filling",
            "Swelling or abscess",
            "Something else",
          ],
          required: true,
        },
        {
          name: "reachTime",
          label: "When can we reach you?",
          options: [
            "As soon as you can",
            "This morning",
            "This afternoon",
            "First thing tomorrow",
          ],
          required: true,
        },
      ],
    },
  },

  "same-day-crowns": {
    slug: "same-day-crowns",
    name: "Same-day crown",
    title: "Same-Day Crowns in Booneville, MS",
    description:
      "A crown in one visit, not three weeks. Our in-house lab designs, mills and places your crown in a single appointment in Booneville, Mississippi.",
    form: {
      headline: "Get Your Crown in a Single Visit",
      submitLabel: "Book My Appointment",
      fields: [
        {
          name: "inPain",
          label: "Are you in pain right now?",
          options: ["Yes", "No"],
          required: true,
        },
        CONTACT_PREFERENCE,
      ],
    },
  },

  "smile-makeover": {
    slug: "smile-makeover",
    name: "Smile makeover consultation",
    title: "Free Smile Makeover Consultation in Booneville, MS",
    description:
      "See your new smile in 3D before treatment begins. Veneers, whitening and full smile makeovers at Park Place Dental in Booneville, Mississippi.",
    form: {
      headline: "Claim Your Free Smile Consultation",
      submitLabel: "Book My Free Consultation",
      fields: [
        {
          name: "interest",
          label: "What are you most interested in?",
          options: ["Veneers", "Whitening", "Full makeover", "Not sure"],
          required: true,
        },
        CONTACT_PREFERENCE,
      ],
    },
  },

  "new-patient-offer": {
    slug: "new-patient-offer",
    name: "New patient visit",
    title: "New Patients Welcome in Booneville, MS",
    description:
      "Free new patient consultation with comprehensive exam at Park Place Dental in Booneville, Mississippi. Most insurance accepted and filed for you.",
    form: {
      headline: "Request Your First Appointment",
      submitLabel: "Book My First Visit",
      fields: [
        {
          name: "visitFor",
          label: "Who is this visit for?",
          options: ["Just me", "Me and family members", "Child only"],
          required: true,
        },
        {
          name: "bestTime",
          label: "What is the best time for you?",
          options: ["Morning", "Afternoon", "Either"],
          required: true,
        },
        CONTACT_PREFERENCE,
      ],
    },
  },
};

export const campaignSlugs = Object.keys(campaigns);

export function getCampaign(slug: string): Campaign | undefined {
  return campaigns[slug];
}

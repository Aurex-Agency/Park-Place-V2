/**
 * Reviews taken from the practice's own Google Business Profile.
 *
 * Read from the live profile on 16 October 2026, where the practice held 3.9
 * stars from 36 reviews. Every quote below is a five star review reproduced as
 * written, with only two kinds of change: straight quotation marks in place of
 * curly ones, and a comma where a reviewer typed a double hyphen. Both are
 * house style and neither alters a word. The practice's own testimonials page
 * already carries several of these with the same normalisation.
 *
 * Nothing here is invented, trimmed to change its meaning, or attributed to a
 * name that did not write it.
 *
 * The age of each review is deliberately not displayed. Several of the
 * strongest are years old, and a relative date would need maintaining forever
 * to stay true. Showing the reviewer and the source without a date claims
 * nothing about recency either way.
 *
 * A note for whoever reads this next: the profile also holds eight one star
 * reviews, two of them recent. That is a matter for the practice rather than
 * for these pages, but it is why no page links out to the profile and why no
 * page shows the star average.
 */

export type GoogleReview = {
  name: string;
  quote: string;
  /**
   * A short line drawn from something the review itself says.
   *
   * Omitted where a review gives no detail, which is the rule the practice's
   * own testimonials already followed. An absent line is better than an
   * invented one.
   */
  role?: string;
  /**
   * Which landing pages this review speaks to. An empty list still appears on
   * the website proper, it simply has no campaign it belongs on.
   */
  pages: readonly string[];
};

export const googleReviews: readonly GoogleReview[] = [
  {
    name: "Rachael Wilkes",
    role: "Emergency visit through the VA",
    quote:
      "They went so far above and beyond to make a next day emergency dental appt for me through the VA. They were quick, thorough, so friendly. It was one of the best dental experiences I have ever had. It was worth the 1.5hr drive.",
    pages: ["emergency", "implants"],
  },
  {
    name: "Liberty Burcham",
    role: "Patient since high school",
    quote:
      "Dr. Goodwin is amazing, him and his staff worked me in super fast, like day of/next day fast, to fix my chipped tooth! He gave me a beautiful smile back in high school and gave me that same beautiful smile again!!",
    pages: ["emergency", "smile-makeover"],
  },
  {
    name: "David Warren",
    role: "Seen on short notice",
    quote:
      "Even though our regular dentist was not in the office, the office staff worked us in with two other hygienists, and Dr. Ken Goodwin was kind enough to see us on short notice.",
    pages: ["emergency"],
  },
  {
    name: "Trista Beavers",
    role: "Military family, crown placed the same day",
    quote:
      "Who knew having a broken tooth/cavity fixed could be so fast and painless. Did I mention they placed my crown the same day. 10 states and 8 dentist later (military member/family) I have found my forever dentist. Amazing with children also, my 7 year old and I give park place dental two thumbs up.",
    pages: ["same-day-crowns", "new-patient-offer"],
  },
  {
    name: "Tom Wilson",
    role: "Switched from another clinic",
    quote:
      "After using various dental clinics over the years, I would have to say there is no way they would compare to Park Place Dental. Excellent dentists (pain free), more than proficient staff, affordable and I could go on and on.",
    pages: ["same-day-crowns", "implants"],
  },
  {
    name: "Joe Lawson",
    role: "Patient of nearly five years",
    quote:
      "I have been a Park Place customer for almost 5 years, and now I have to drive 90 miles to get here! But when you find a dental office that treats you well, professionally and with a smile, gets you in and out on time, you keep coming back!",
    pages: ["same-day-crowns", "new-patient-offer"],
  },
  {
    name: "Rick Wilkins",
    role: "Smile makeover patient",
    quote:
      "Love the whole entire staff at park place dental. Mrs. McDougald and Mrs. Ann are the best ever. I haven't stopped smiling since I got a new smile. Love all of you.",
    pages: ["smile-makeover"],
  },
  {
    name: "Tonya Moudy",
    role: "Denture patient",
    quote:
      "I had my top teeth pulled and got me some dentures and they where the best looking teeth you would ever see, they looked like movie star teeth, and the staff and dentist are really great, they make you very comfy. Thanks for the best smile ever.",
    pages: ["implants", "smile-makeover"],
  },
  {
    name: "Vicky Hood",
    quote:
      "They do wonderful work and know all the new techniques that come out. What I appreciated so much was how kind and concerned the staff and Dr. Ken were toward me. Here I am a person and not just a number.",
    pages: ["implants"],
  },
  {
    name: "Nelene Pannell",
    role: "Patient since 1987",
    quote:
      "I have been a client of Park Place Dental since 1987 and have never been disappointed with treatment from each of their staff. The staff is very prompt and efficient. Through these years, they become like family to me.",
    pages: ["new-patient-offer"],
  },
  {
    name: "Kenneth Forrest",
    role: "Cleanings and checkups",
    quote:
      "I was just in your office and had my regular cleaning and checkup. I cannot commend you enough for the great experience! Your office staff is so kind and helpful, along with the dental hygienist, Kelly, who made my cleaning a genuine pleasure.",
    pages: ["new-patient-offer"],
  },
  {
    name: "Candace Mitchell",
    quote:
      "We have been using this office for years and years. Never had a bad experience. Super friendly staff and always have us in and out in no time! We LOVE Park Place Dental!",
    role: "Patient of many years",
    pages: [],
  },
  {
    name: "Holly Seago",
    quote:
      "Helpful, kind, and professional. They always go above and beyond for their patients. A positive experience every single visit.",
    pages: [],
  },
  {
    name: "Becky Roland",
    quote: "Best dentist office I have ever been to. Timely, friendly, gentle. Highly recommend.",
    pages: [],
  },
  {
    name: "Robbin Ruth",
    quote: "Park Place Dental is awesome! Very friendly, informative and prompt! Great experience!",
    pages: [],
  },
] as const;

/** The reviews that speak to a given page, in the order they are listed. */
export function reviewsFor(page: string, limit = 3): GoogleReview[] {
  return googleReviews.filter((r) => r.pages.includes(page)).slice(0, limit);
}

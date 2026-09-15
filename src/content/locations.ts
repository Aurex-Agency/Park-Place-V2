/**
 * The towns Park Place Dental draws patients from, as data.
 *
 * Why these pages exist: before them, a full-text search of this codebase for
 * Corinth, Tupelo, New Albany, Ripley, Baldwyn, Iuka or Fulton returned no
 * matches at all. A practice that draws from seven counties was telling search
 * engines it served one town. Meanwhile a competitor's own Tupelo page names
 * Booneville among the places its patients drive from.
 *
 * Why they are shaped like this rather than swapped-keyword duplicates: a set
 * of near-identical pages with the town name changed is a doorway pattern, and
 * Google filters it. It is also indistinguishable from the templated
 * lead-generation pages already cluttering these search results, which is the
 * company no practice wants to keep. So each page has to carry something only
 * a practice that actually sees patients from that town could write: the road
 * they come in on, roughly how long it takes, and what they tend to come for.
 *
 * The rule applied throughout: if a town cannot support genuinely distinct
 * content, it does not get a page. Fourteen do. The smaller communities are
 * named on the hub and on the page of the town they sit nearest, which is both
 * honest about what they are and still a real mention on a real page.
 *
 * Booneville is a special case. The homepage already targets "dentist in
 * Booneville, Mississippi" and should keep it. The Booneville page here is
 * deliberately aimed somewhere else: at the person who has already chosen the
 * practice and now needs to find the door, park, and know what happens next.
 * That is a different search and a different job, so the two do not compete.
 *
 * TODO(kalob): drive times and distances are stated as approximate and should
 * be sanity checked by someone who drives these roads, along with the route
 * descriptions. Distances are straightforward; "about twenty-five minutes" is
 * the kind of claim a local reader will notice if it is wrong, and being wrong
 * about it undoes the point of the page. Same for the landmarks named in
 * `directions`: they are the navigational detail that makes these pages worth
 * reading, and a wrong one is worse than none.
 */

export type Location = {
  slug: string;
  /** The town itself. */
  town: string;
  county: string;
  /** The town's own ZIP. People do search "dentist near 38829". */
  zip: string;
  /** Rough road distance from the practice, in miles. */
  miles: number;
  /** Approximate drive, written the way someone local would say it. */
  drive: string;
  /** The road most people actually take. */
  route: string;
  /**
   * True only for Booneville. The practice is in this town rather than a drive
   * from it, which changes the headline, the framing and the job of the page.
   */
  home?: boolean;
  /** Overrides the generated headline where the default reads wrong. */
  headline?: string;
  title: string;
  metaDescription: string;
  /** Opening paragraphs. The first sentence answers "can I be seen there". */
  lead: string[];
  /**
   * Turn-by-turn, in the order a driver meets them.
   *
   * This is the section that most earns a location page its place. It cannot
   * be generated, it is different for every town, and it is the one thing on
   * the page a patient may genuinely re-open in the car.
   */
  directions: string[];
  /** What patients from this town most often come in for, and why. */
  comeFor: { term: string; text: string }[];
  /** A paragraph about the town's own relationship to the practice. */
  context: string[];
  /** Smaller communities this town's page speaks for. */
  nearby: string[];
  /** Services worth linking from this page. Slugs must exist. */
  services: { label: string; href: string }[];
  faqs: { q: string; a: string }[];
};

const BOOK = "/book-an-appointment";

/**
 * Ordered by distance rather than alphabetically, because that is the order a
 * reader scanning the hub actually cares about.
 */
export const locations: Location[] = [
  /* ------------------------------------------------------------- Booneville */
  {
    slug: "booneville-ms",
    town: "Booneville",
    county: "Prentiss County",
    zip: "38829",
    miles: 0,
    drive: "you are already here",
    route: "403 N 3rd St, just off the square",
    home: true,
    headline: "The practice, / and how to find it",
    title: "Visiting Our Booneville Dental Office",
    metaDescription:
      "Park Place Dental is at 403 N 3rd St in Booneville, MS. Directions from US-45 and MS-30, where to park, and what happens at a first visit.",
    lead: [
      "Park Place Dental is at 403 N 3rd St in Booneville, a few blocks north of the square. This page is for the practical part: how to get to the door, where to leave the car, and what the first twenty minutes look like once you are inside.",
      "Dr. Goodwin grew up in Booneville and has practised here for over forty-three years. The office has not moved, which is worth saying plainly because a good number of people still navigate to it from memory rather than from a map.",
    ],
    directions: [
      "From the US-45 bypass, take the Booneville exit for MS-30 and head east toward town. MS-30 becomes Church Street.",
      "Follow Church Street to 3rd Street and turn north. You are now two blocks from the office.",
      "403 N 3rd St is on your right. Watch for the Park Place Dental sign rather than the building number, which sits back from the road.",
      "Parking is on site and free. If the front spaces are full, there is more room at the side of the building, and the entrance is level from both.",
    ],
    comeFor: [
      {
        term: "Appointments that start when they say they will",
        text: "Being ten minutes from home is only an advantage if the appointment runs to time. We schedule so that it does, which is the part of a local practice people actually notice.",
      },
      {
        term: "The lab is in this building",
        text: "Crowns, dentures, partials, relines and repairs are made and mended here rather than posted to an outside laboratory. For someone in town, that often turns a three-visit job into one.",
      },
      {
        term: "Emergencies, without a drive",
        text: "We hold room in the schedule every day for urgent problems. Call the office rather than using the website form, because the phone reaches us straight away.",
      },
      {
        term: "Three generations, one set of records",
        text: "A practice that has stayed in one place for forty-three years is holding the history of a lot of Booneville families. That continuity is difficult to reproduce and is the reason a lot of people never left.",
      },
    ],
    context: [
      "Booneville is the Prentiss County seat and home to Northeast Mississippi Community College, which means the town's population shifts through the year. We keep evening space in the diary where we can for people working around class and shift patterns.",
      "If you are new to the area, the thing worth knowing is that this is one practice rather than a group with a rotating list of dentists. You will see Dr. Goodwin, and you will see him again next time.",
    ],
    nearby: ["Thrasher", "Jumpertown", "Marietta", "Wheeler", "New Site"],
    services: [
      { label: "Cleanings and exams", href: "/services/general-dentistry/cleanings-exams" },
      { label: "Emergency dentistry", href: "/services/general-dentistry/emergency-dentistry" },
      { label: "Crowns and bridges", href: "/services/restorative-dentistry/crowns-bridges" },
      { label: "Dentures and repairs", href: "/services/restorative-dentistry/dentures" },
    ],
    faqs: [
      {
        q: "Where exactly is Park Place Dental in Booneville?",
        a: "403 N 3rd St, Booneville, MS 38829, a few blocks north of the square. Coming in on MS-30 from the US-45 bypass, turn north onto 3rd Street and the office is on your right.",
      },
      {
        q: "Is there parking?",
        a: "Yes, on site and free, with more room at the side of the building if the front is full. The entrance is level from both, with no steps.",
      },
      {
        q: "Do I need an appointment, or can I walk in?",
        a: "Please call first on (662) 728-8171. We will almost always find you a time, and for genuine emergencies we keep room in the same day's schedule, but calling ahead means you are not sitting in the waiting room longer than you need to be.",
      },
      {
        q: "What happens at a first visit?",
        a: "A full examination, any x-rays that are needed, and then a conversation about what we found and what it would cost before anything is booked. Completing your forms beforehand takes about ten minutes off the visit.",
      },
    ],
  },

  /* ----------------------------------------------------------------- Rienzi */
  {
    slug: "rienzi-ms",
    town: "Rienzi",
    county: "Alcorn County",
    zip: "38865",
    miles: 10,
    drive: "about fifteen minutes",
    route: "straight up US-45",
    title: "Dentist Serving Rienzi, MS",
    metaDescription:
      "Park Place Dental is about fifteen minutes from Rienzi, straight down US-45. Family dentistry, an in-house lab, and same-day emergency appointments.",
    lead: [
      "Park Place Dental is in Booneville, roughly ten miles and a quarter of an hour south of Rienzi on US-45. For most of Alcorn County's southern end, we are closer than Corinth is.",
      "That is the whole case for this page. Rienzi sits between two towns with dentists in them, and the drive south is the shorter one.",
    ],
    directions: [
      "Join US-45 south at Rienzi and stay on it. There are no turns to remember.",
      "Take the Booneville exit for MS-30 and head east into town.",
      "MS-30 becomes Church Street. Turn north onto 3rd Street and the office is on your right, with parking on site.",
    ],
    comeFor: [
      {
        term: "A short drive for routine care",
        text: "Cleanings, exams and fillings are not worth a long trip, which is exactly why a fifteen minute one matters. Most Rienzi families book these around a school run without rearranging the day.",
      },
      {
        term: "Same-day emergency appointments",
        text: "A broken tooth on a Tuesday morning is a fifteen minute problem rather than an afternoon-long one. We keep room in the schedule daily for urgent cases.",
      },
      {
        term: "One practice for the whole family",
        text: "We see children alongside parents and grandparents, so a household makes one trip rather than three. Over a year that is a lot of US-45.",
      },
    ],
    context: [
      "Rienzi is small enough that a good number of people already know where the office is, usually because somebody in the family has been coming for years. Dr. Goodwin has practised in Booneville since 1982, which covers most of living memory in a town this size.",
    ],
    nearby: ["Glen", "Kossuth", "Jacinto", "Biggersville"],
    services: [
      { label: "Cleanings and exams", href: "/services/general-dentistry/cleanings-exams" },
      { label: "Tooth-colored fillings", href: "/services/general-dentistry/fillings" },
      { label: "Emergency dentistry", href: "/services/general-dentistry/emergency-dentistry" },
    ],
    faqs: [
      {
        q: "How far is Park Place Dental from Rienzi?",
        a: "About ten miles, or roughly fifteen minutes straight down US-45. For the southern end of Alcorn County it is a shorter drive than going north into Corinth.",
      },
      {
        q: "Can you see the whole family on one visit?",
        a: "Usually, yes. We are a family practice and will try to group appointments so you are making one trip rather than several, which is worth asking for when you book.",
      },
      {
        q: "Do you take emergencies from outside Prentiss County?",
        a: "Yes, from any of the towns we serve. Call the office on (662) 728-8171 rather than using the website form, because the phone reaches us straight away.",
      },
    ],
  },

  /* ---------------------------------------------------------------- Baldwyn */
  {
    slug: "baldwyn-ms",
    town: "Baldwyn",
    county: "Prentiss and Lee Counties",
    zip: "38824",
    miles: 12,
    drive: "about fifteen minutes",
    route: "straight down US-45",
    title: "Dentist Serving Baldwyn, MS",
    metaDescription:
      "Park Place Dental is about fifteen minutes from Baldwyn on US-45. Family dentistry, same-day crowns from our in-house lab, and emergency appointments.",
    lead: [
      "Park Place Dental is in Booneville, about twelve miles and fifteen minutes north of Baldwyn on US-45, and we see families from Baldwyn every week. It is close enough that a cleaning fits inside a lunch break and far enough that people are often surprised how short the drive actually is.",
      "Baldwyn sits across the Prentiss and Lee county line, which means residents are choosing between practices in two directions. We are the one to the north.",
    ],
    directions: [
      "Join US-45 north at Baldwyn and stay on it for about twelve miles.",
      "Take the Booneville exit for MS-30 and turn east toward town.",
      "MS-30 becomes Church Street. Turn north onto 3rd Street; the office is on your right with parking on site.",
    ],
    comeFor: [
      {
        term: "Family appointments in one trip",
        text: "Because we see children and adults in the same practice, families from Baldwyn book together rather than making two separate drives. That matters more the further you live from the office.",
      },
      {
        term: "Same-day crown and denture work",
        text: "Our dental lab is in the building. For anyone driving in, that is the difference between one trip and three, because a crown or a denture repair does not have to be posted to an outside laboratory and waited on.",
      },
      {
        term: "Emergencies, seen the same day",
        text: "We hold room in the schedule for urgent problems. Fifteen minutes up US-45 is a short drive when a tooth has broken and the alternative is waiting.",
      },
    ],
    context: [
      "Baldwyn is close enough to Booneville that many families have been coming here for two or three generations without ever thinking of it as travelling. Dr. Goodwin has practised in Booneville for over forty-three years, which is long enough that patients who first came as children now bring their own.",
    ],
    nearby: ["Wheeler", "Marietta", "Pratts", "Brewer"],
    services: [
      { label: "Cleanings and exams", href: "/services/general-dentistry/cleanings-exams" },
      { label: "Emergency dentistry", href: "/services/general-dentistry/emergency-dentistry" },
      { label: "Crowns and bridges", href: "/services/restorative-dentistry/crowns-bridges" },
    ],
    faqs: [
      {
        q: "How far is Park Place Dental from Baldwyn?",
        a: "About twelve miles, or roughly fifteen minutes north on US-45. It is one of the shortest drives of any town we regularly see patients from.",
      },
      {
        q: "Can my whole family be seen on the same visit?",
        a: "Usually, yes. We are a family practice and see children alongside parents and grandparents, and we will try to group appointments so you are making one trip rather than several.",
      },
      {
        q: "Do you take emergencies from outside Booneville?",
        a: "Yes. We keep room in the schedule for urgent problems regardless of which town you are driving from. Call the office rather than using the website form, because the phone reaches us straight away.",
      },
    ],
  },

  /* --------------------------------------------------------------- New Site */
  {
    slug: "new-site-ms",
    town: "New Site",
    county: "Prentiss County",
    zip: "38859",
    miles: 12,
    drive: "about twenty minutes",
    route: "west along MS-30",
    title: "Dentist Serving New Site, MS",
    metaDescription:
      "Park Place Dental is about twenty minutes from New Site, straight along MS-30. Family dentistry, an in-house dental lab, and same-day emergency care.",
    lead: [
      "Park Place Dental is in Booneville, about twelve miles and twenty minutes west of New Site along MS-30. It is the same county, the same school district conversation, and one road the whole way.",
      "For eastern Prentiss County we are the practice in the county seat, which for most of these households is the nearest full-service dental office of any kind.",
    ],
    directions: [
      "Take MS-30 west out of New Site and stay on it into Booneville.",
      "MS-30 becomes Church Street as you reach town.",
      "Turn north onto 3rd Street. The office is a short way up on your right, with on-site parking.",
    ],
    comeFor: [
      {
        term: "One road, no interstate",
        text: "MS-30 runs door to door. For anyone who would rather not join US-45 at all, that is the practical reason this is the easier trip.",
      },
      {
        term: "Denture repairs while you wait",
        text: "Because the laboratory is in the building, a crack or a broken tooth on a denture is often mended the same day rather than posted away for a fortnight.",
      },
      {
        term: "Children and adults in one practice",
        text: "There is no separate paediatric referral for routine care. Families from eastern Prentiss County book together and make a single trip in.",
      },
    ],
    context: [
      "New Site and the communities around it are the part of Prentiss County furthest from anywhere, and the practice has drawn from them for decades on that basis. Dr. Goodwin is from Booneville and has never practised anywhere else, which in a county this size counts for something.",
    ],
    nearby: ["Thrasher", "Jumpertown", "Marietta", "Paden"],
    services: [
      { label: "Cleanings and exams", href: "/services/general-dentistry/cleanings-exams" },
      { label: "Dentures and repairs", href: "/services/restorative-dentistry/dentures" },
      { label: "Emergency dentistry", href: "/services/general-dentistry/emergency-dentistry" },
    ],
    faqs: [
      {
        q: "How far is Park Place Dental from New Site?",
        a: "About twelve miles, or roughly twenty minutes west along MS-30. It is one road the whole way, with no need to join US-45.",
      },
      {
        q: "Can a broken denture be repaired the same day?",
        a: "Often, yes. Our dental laboratory is in the building rather than off site, so many repairs and relines are done while you wait. Call first so we can tell you what to expect before you set off.",
      },
      {
        q: "Do you see children?",
        a: "Yes. We are a family practice and see children alongside parents and grandparents, which for families driving in from eastern Prentiss County usually means one trip instead of two.",
      },
    ],
  },

  /* ---------------------------------------------------------------- Guntown */
  {
    slug: "guntown-ms",
    town: "Guntown",
    county: "Lee County",
    zip: "38849",
    miles: 20,
    drive: "about twenty-five minutes",
    route: "north on US-45",
    title: "Dentist Serving Guntown, MS",
    metaDescription:
      "Park Place Dental is about twenty-five minutes north of Guntown on US-45. In-house dental lab, same-day crowns, and appointments that run to time.",
    lead: [
      "Park Place Dental is in Booneville, roughly twenty miles and twenty-five minutes north of Guntown on US-45. For northern Lee County it is a straight run up the corridor, and it avoids Tupelo entirely.",
      "That last part is the point. Guntown households heading south for dental care are driving into Tupelo traffic; heading north, they are not.",
    ],
    directions: [
      "Join US-45 north at Guntown and stay on it past Baldwyn.",
      "Take the Booneville exit for MS-30 and turn east toward town.",
      "MS-30 becomes Church Street. Turn north onto 3rd Street; the office is on your right, parking on site.",
    ],
    comeFor: [
      {
        term: "Avoiding the Tupelo run",
        text: "Twenty-five minutes north on an open highway is a different journey from twenty minutes south into city traffic and a car park. Patients from Guntown mention this more than anything else.",
      },
      {
        term: "Appointments that are not rushed",
        text: "A smaller practice in a smaller town can give an appointment the time it needs. That is easier to deliver here than it is in a busy city office, and it is why some people keep making the drive.",
      },
      {
        term: "Crowns made in the building",
        text: "Our dental laboratory is on site. A crown, a bridge or a denture repair does not have to be posted to an outside laboratory, which usually removes a return trip.",
      },
    ],
    context: [
      "Guntown sits on the Lee County side of a line that a lot of families cross without thinking about it, and the practice has drawn patients from up and down this stretch of US-45 for four decades. Dr. Goodwin has been in Booneville since 1982.",
    ],
    nearby: ["Saltillo", "Baldwyn", "Mooreville", "Pratts"],
    services: [
      { label: "Crowns and bridges", href: "/services/restorative-dentistry/crowns-bridges" },
      { label: "Cleanings and exams", href: "/services/general-dentistry/cleanings-exams" },
      { label: "Emergency dentistry", href: "/services/general-dentistry/emergency-dentistry" },
    ],
    faqs: [
      {
        q: "How far is Park Place Dental from Guntown?",
        a: "About twenty miles, or roughly twenty-five minutes north on US-45. It is a straight run up the corridor with no need to go into Tupelo.",
      },
      {
        q: "Is it really worth driving north rather than into Tupelo?",
        a: "For routine cleanings, that is your call and we would not argue with either answer. Patients who do drive north usually want the same dentist every visit, or work made in our own laboratory rather than posted out.",
      },
      {
        q: "Do you offer same-day crowns?",
        a: "Yes, and more than that. A chairside milling unit makes crowns; we have a full dental laboratory in the building, which also makes and repairs dentures, partials and relines.",
      },
    ],
  },

  /* --------------------------------------------------------------- Saltillo */
  {
    slug: "saltillo-ms",
    town: "Saltillo",
    county: "Lee County",
    zip: "38866",
    miles: 25,
    drive: "about thirty minutes",
    route: "north on US-45",
    title: "Dentist Serving Saltillo, MS",
    metaDescription:
      "Park Place Dental is about thirty minutes north of Saltillo on US-45. An in-house dental lab, same-day crowns and dentures, and unhurried appointments.",
    lead: [
      "Park Place Dental is in Booneville, roughly twenty-five miles and half an hour north of Saltillo on US-45. It is the opposite direction from Tupelo, which for a lot of Saltillo families is the reason they tried us in the first place.",
      "Saltillo has grown quickly, and the practices closest to it have grown with it. We are a single-dentist office half an hour up the highway, which is a different proposition and suits some people considerably better.",
    ],
    directions: [
      "Join US-45 north at Saltillo and stay on it through Guntown and Baldwyn.",
      "Take the Booneville exit for MS-30 and turn east toward town.",
      "MS-30 becomes Church Street. Turn north onto 3rd Street; the office is on the right with free parking on site.",
    ],
    comeFor: [
      {
        term: "The same dentist every visit",
        text: "In a practice this size there is no rota. You see Dr. Goodwin, he remembers the mouth he is looking at, and the treatment plan does not restart because somebody new picked up the file.",
      },
      {
        term: "A full laboratory, not only a crown mill",
        text: "Chairside milling units make crowns. A full dental laboratory also makes and repairs dentures, partials and relines. Both get called same-day, and they are not the same capability.",
      },
      {
        term: "Appointments that start on time",
        text: "Half an hour of open highway is worth it if the appointment then runs to schedule. For a drive of this length that is the whole calculation, and it is one we take seriously.",
      },
    ],
    context: [
      "We are not going to pretend to be the most convenient dentist for someone living in Saltillo, because Tupelo is closer. What we can say is that people do make this drive, year after year, and the reasons they give are usually about continuity and about work that is not posted away to a laboratory somewhere else.",
    ],
    nearby: ["Guntown", "Mooreville", "Plantersville", "Belden"],
    services: [
      { label: "Dentures and repairs", href: "/services/restorative-dentistry/dentures" },
      { label: "Crowns and bridges", href: "/services/restorative-dentistry/crowns-bridges" },
      { label: "Cosmetic dentistry", href: "/services/cosmetic-dentistry" },
    ],
    faqs: [
      {
        q: "How far is Park Place Dental from Saltillo?",
        a: "About twenty-five miles, or roughly thirty minutes north on US-45. It is a straight run and it takes you away from Tupelo rather than into it.",
      },
      {
        q: "Why would I drive to Booneville when Tupelo is closer?",
        a: "For a routine cleaning, you may well not, and we will say so. The patients who do drive up want the same dentist at every visit, or laboratory work made on site rather than sent away and waited on.",
      },
      {
        q: "Will I see the same dentist each time?",
        a: "Yes. Dr. Goodwin has practised in Booneville since 1982 and this is a single-dentist practice, so there is no rota to be assigned to.",
      },
    ],
  },

  /* ---------------------------------------------------------------- Corinth */
  {
    slug: "corinth-ms",
    town: "Corinth",
    county: "Alcorn County",
    zip: "38834",
    miles: 25,
    drive: "about half an hour",
    route: "south on US-45",
    title: "Dentist Serving Corinth, MS",
    metaDescription:
      "Park Place Dental is about half an hour south of Corinth on US-45. In-house dental lab, same-day crowns and denture repairs, and care for veterans.",
    lead: [
      "Park Place Dental is in Booneville, roughly twenty-five miles and half an hour south of Corinth on US-45, and Alcorn County patients make up a steady part of the practice. Most tell us they came for something a practice closer to home could not do in one visit.",
      "Corinth has its own dentists, and good ones. People drive to us for particular reasons rather than for lack of options, which is worth being straight about.",
    ],
    directions: [
      "Join US-45 south at Corinth and stay on it for about twenty-five miles, past Rienzi.",
      "Take the Booneville exit for MS-30 and turn east toward town.",
      "MS-30 becomes Church Street. Turn north onto 3rd Street; the office is on your right, with on-site parking.",
    ],
    comeFor: [
      {
        term: "Work that does not get posted away",
        text: "Crowns, dentures, partials and repairs are made in our own laboratory in the building. For a half-hour drive that is usually the difference between one appointment and three.",
      },
      {
        term: "Care for veterans",
        text: "We see a good number of veterans from across North Mississippi and will help you work out what your VA dental eligibility actually covers, which is rarely what people assume.",
      },
      {
        term: "Continuity of care",
        text: "One dentist, who has been in the same building since 1982. For anyone rebuilding a mouth over several years rather than months, that continuity is the point.",
      },
    ],
    context: [
      "Alcorn County and Prentiss County have shared a highway and a good deal else for a long time, and this practice has drawn from both for four decades. If you are weighing a half-hour drive, the honest test is whether the thing you need is something an in-house laboratory changes. Often it is.",
    ],
    nearby: ["Rienzi", "Glen", "Kossuth", "Farmington", "Biggersville"],
    services: [
      { label: "Dental implants", href: "/services/restorative-dentistry/dental-implants" },
      { label: "Dentures and repairs", href: "/services/restorative-dentistry/dentures" },
      { label: "Care for veterans", href: "/veterans" },
    ],
    faqs: [
      {
        q: "How far is Park Place Dental from Corinth?",
        a: "About twenty-five miles, or roughly half an hour south on US-45. It is a straight run down the corridor.",
      },
      {
        q: "Corinth has dentists. Why drive to Booneville?",
        a: "For routine care, most people should not, and we will tell you as much. The reason patients make this drive is usually the laboratory in our building, which keeps crown and denture work to fewer visits.",
      },
      {
        q: "Do you see veterans?",
        a: "Yes, regularly, and we will help you understand what your VA dental eligibility covers before any treatment is planned. There is a page on this site that sets out the basics.",
      },
    ],
  },

  /* ------------------------------------------------------------- Burnsville */
  {
    slug: "burnsville-ms",
    town: "Burnsville",
    county: "Tishomingo County",
    zip: "38833",
    miles: 25,
    drive: "about thirty-five minutes",
    route: "west on US-72, then south on US-45",
    title: "Dentist Serving Burnsville, MS",
    metaDescription:
      "Park Place Dental is about thirty-five minutes from Burnsville via US-72 and US-45. In-house dental lab, denture repairs, and same-day emergency care.",
    lead: [
      "Park Place Dental is in Booneville, roughly twenty-five miles and thirty-five minutes from Burnsville, west along US-72 and then south on US-45. Tishomingo County has few dental practices of its own, which is why this drive is a familiar one here.",
      "For most of western Tishomingo County, Booneville and Corinth are the two realistic options. We are the one with a dental laboratory in the building.",
    ],
    directions: [
      "Take US-72 west out of Burnsville toward Corinth.",
      "Join US-45 south at Corinth and follow it for about twenty-five miles.",
      "Take the Booneville exit for MS-30, turn east, then north onto 3rd Street. The office is on your right with parking on site.",
    ],
    comeFor: [
      {
        term: "Fewer trips for bigger work",
        text: "When the nearest practice is half an hour or more away, the number of appointments matters more than the length of each one. Our laboratory being on site is what keeps that number down.",
      },
      {
        term: "Dentures made and mended here",
        text: "Full dentures, partials, relines and repairs are handled in the building rather than posted to an outside laboratory. For Tishomingo County patients that often turns a fortnight into an afternoon.",
      },
      {
        term: "Care for veterans",
        text: "Tishomingo County has a substantial veteran population, and we will help you work out what your VA dental eligibility actually covers before anything is planned.",
      },
    ],
    context: [
      "Burnsville sits between Pickwick and Corinth, in a part of the state where people are used to driving for anything specialised. A thirty-five minute trip for dental work is unremarkable here; what patients ask about is whether they will have to make it three times or once.",
    ],
    nearby: ["Iuka", "Tishomingo", "Belmont", "Glen"],
    services: [
      { label: "Dentures and repairs", href: "/services/restorative-dentistry/dentures" },
      { label: "Care for veterans", href: "/veterans" },
      { label: "Emergency dentistry", href: "/services/general-dentistry/emergency-dentistry" },
    ],
    faqs: [
      {
        q: "How far is Park Place Dental from Burnsville?",
        a: "About twenty-five miles, or roughly thirty-five minutes, west on US-72 to Corinth and then south on US-45 to Booneville.",
      },
      {
        q: "Can denture repairs be done in one visit?",
        a: "Often, yes. The dental laboratory is in our building rather than off site, so many repairs and relines are completed while you wait. Call ahead on (662) 728-8171 and we will tell you what to expect before you drive over.",
      },
      {
        q: "Do you treat veterans?",
        a: "Yes. We see veterans from across North Mississippi and will go through what VA dental eligibility covers with you, which is rarely as straightforward as people expect.",
      },
    ],
  },

  /* ----------------------------------------------------------------- Fulton */
  {
    slug: "fulton-ms",
    town: "Fulton",
    county: "Itawamba County",
    zip: "38843",
    miles: 25,
    drive: "about thirty-five minutes",
    route: "north on MS-25 and across on MS-30",
    title: "Dentist Serving Fulton, MS",
    metaDescription:
      "Park Place Dental is about thirty-five minutes from Fulton. An in-house dental lab, same-day crowns and denture repairs, and unhurried appointments.",
    lead: [
      "Park Place Dental is in Booneville, roughly twenty-five miles and thirty-five minutes from Fulton, and Itawamba County patients have been part of this practice for a long time. The drive crosses country rather than following the main corridor, which makes it feel shorter than the map suggests.",
      "Fulton is closer to Tupelo than it is to us. The people who drive here instead are generally after something specific.",
    ],
    directions: [
      "Take MS-25 north out of Fulton toward Belmont.",
      "Turn west onto MS-30 and follow it into Booneville.",
      "MS-30 becomes Church Street. Turn north onto 3rd Street; the office is on your right, with parking on site.",
    ],
    comeFor: [
      {
        term: "Denture and partial work",
        text: "Because the laboratory is in the building, dentures and partials are made, fitted, adjusted and repaired here. For a drive of this length that removes trips rather than adding them.",
      },
      {
        term: "A practice that is not a group",
        text: "One dentist, one building, the same team on the desk. Patients who have been passed between practitioners elsewhere tend to notice this quickly.",
      },
      {
        term: "Emergencies without a waiting list",
        text: "We keep room in the schedule every day for urgent problems rather than booking them out a week. Thirty-five minutes is a short drive when a tooth has broken.",
      },
    ],
    context: [
      "Itawamba County sits between several towns with dental practices, and Booneville is not the obvious one on a map. It has been a steady source of patients anyway, mostly through families who came once for laboratory work and then stayed.",
    ],
    nearby: ["Mantachie", "Tremont", "Golden", "Dorsey"],
    services: [
      { label: "Dentures and repairs", href: "/services/restorative-dentistry/dentures" },
      { label: "Crowns and bridges", href: "/services/restorative-dentistry/crowns-bridges" },
      { label: "Emergency dentistry", href: "/services/general-dentistry/emergency-dentistry" },
    ],
    faqs: [
      {
        q: "How far is Park Place Dental from Fulton?",
        a: "About twenty-five miles, or roughly thirty-five minutes, north on MS-25 and then west along MS-30 into Booneville.",
      },
      {
        q: "Is it worth the drive for routine cleanings?",
        a: "Honestly, probably not on its own. Most Itawamba County patients first come for denture or crown work and then keep their cleanings here because they would rather not split their care between two practices.",
      },
      {
        q: "Can you do denture repairs quickly?",
        a: "Usually the same day. Our laboratory is in the building, so repairs and relines do not have to be posted to an outside laboratory and waited on.",
      },
    ],
  },

  /* ----------------------------------------------------------------- Ripley */
  {
    slug: "ripley-ms",
    town: "Ripley",
    county: "Tippah County",
    zip: "38663",
    miles: 25,
    drive: "about forty minutes",
    route: "east along MS-4 and down US-45",
    title: "Dentist Serving Ripley, MS",
    metaDescription:
      "Park Place Dental is about forty minutes from Ripley. Family dentistry with an in-house dental lab, same-day crowns, and emergency appointments.",
    lead: [
      "Park Place Dental is in Booneville, roughly twenty-five miles and forty minutes east of Ripley. Tippah County is on the far side of the practice from most of the towns we serve, and patients from it have usually chosen us deliberately.",
      "The drive is the honest part of this page: it is not short. What it buys is a practice where the laboratory work happens in the building.",
    ],
    directions: [
      "Take MS-4 east out of Ripley toward Walnut and Kossuth.",
      "Join US-45 south at Corinth and follow it to Booneville.",
      "Take the MS-30 exit east into town, then turn north onto 3rd Street. The office is on your right, with on-site parking.",
    ],
    comeFor: [
      {
        term: "Bigger work in fewer visits",
        text: "Nobody drives forty minutes for a cleaning. They drive it for crowns, bridges and dentures, and our being able to make those on site is what keeps the number of trips down.",
      },
      {
        term: "One dentist, start to finish",
        text: "Treatment planned over months stays with the same person who planned it. Dr. Goodwin has practised in this building since 1982.",
      },
      {
        term: "A schedule that respects the drive",
        text: "Tell the front desk how far you are coming and we will group what can sensibly be grouped, so that one trip does the work of two.",
      },
    ],
    context: [
      "Tippah County patients are the clearest evidence that this practice draws on reputation rather than proximity, because there is nothing convenient about the drive. They come because somebody told them to.",
    ],
    nearby: ["Walnut", "Blue Mountain", "Falkner", "Dumas"],
    services: [
      { label: "Crowns and bridges", href: "/services/restorative-dentistry/crowns-bridges" },
      { label: "Dentures and repairs", href: "/services/restorative-dentistry/dentures" },
      { label: "Dental implants", href: "/services/restorative-dentistry/dental-implants" },
    ],
    faqs: [
      {
        q: "How far is Park Place Dental from Ripley?",
        a: "About twenty-five miles as the road runs, or roughly forty minutes east along MS-4 and then south on US-45 from Corinth.",
      },
      {
        q: "Can you fit several appointments into one trip?",
        a: "Where the treatment allows it, yes. Tell the front desk how far you are driving when you book and we will group what can sensibly be grouped.",
      },
      {
        q: "What makes the drive worth it?",
        a: "The dental laboratory in our building. Crowns, dentures, partials and repairs are made here rather than posted to an outside laboratory, which for a long drive usually means one visit instead of three.",
      },
    ],
  },

  /* -------------------------------------------------------------- Mantachie */
  {
    slug: "mantachie-ms",
    town: "Mantachie",
    county: "Itawamba County",
    zip: "38855",
    miles: 30,
    drive: "about forty minutes",
    route: "north on MS-371, then west along MS-30",
    title: "Dentist Serving Mantachie, MS",
    metaDescription:
      "Park Place Dental is about forty minutes from Mantachie. An in-house dental lab, same-day crowns and denture repairs, and one dentist start to finish.",
    lead: [
      "Park Place Dental is in Booneville, roughly thirty miles and forty minutes from Mantachie, north through Itawamba County and then west along MS-30. It is country driving rather than highway, and most people find it passes quickly.",
      "Mantachie is closer to Tupelo, and for routine care that is the sensible choice. Patients who come to us are generally here for restorative work.",
    ],
    directions: [
      "Take MS-371 north out of Mantachie toward Tremont.",
      "Pick up MS-25 north, then turn west onto MS-30 toward Booneville.",
      "MS-30 becomes Church Street in town. Turn north onto 3rd Street; the office is on the right with parking on site.",
    ],
    comeFor: [
      {
        term: "Crowns and bridges made on site",
        text: "Our laboratory is in the building, which for a forty minute drive is usually the difference between one appointment and three.",
      },
      {
        term: "Unhurried appointments",
        text: "The thing patients from Itawamba County mention most is that appointments here do not feel rushed. That is easier to deliver in a small town than in a busy city practice.",
      },
      {
        term: "Emergencies seen the same day",
        text: "We keep room in the daily schedule for urgent problems. Call the office directly rather than using the website form.",
      },
    ],
    context: [
      "Mantachie sits in the northern half of Itawamba County, which puts Booneville and Tupelo at roughly comparable distances by time if not by mileage. People who choose north usually do so once, for a specific piece of work, and then stay.",
    ],
    nearby: ["Fulton", "Tremont", "Dorsey", "Ratliff"],
    services: [
      { label: "Crowns and bridges", href: "/services/restorative-dentistry/crowns-bridges" },
      { label: "Dentures and repairs", href: "/services/restorative-dentistry/dentures" },
      { label: "Emergency dentistry", href: "/services/general-dentistry/emergency-dentistry" },
    ],
    faqs: [
      {
        q: "How far is Park Place Dental from Mantachie?",
        a: "About thirty miles, or roughly forty minutes, north on MS-371 and MS-25 and then west along MS-30 into Booneville.",
      },
      {
        q: "Tupelo is closer. Why come here?",
        a: "For a cleaning, we would not expect you to. The patients who make this drive are usually having crown, bridge or denture work, where our having a laboratory in the building removes visits.",
      },
      {
        q: "Will I see the same dentist every time?",
        a: "Yes. This is a single-dentist practice and Dr. Goodwin has been in the same building since 1982.",
      },
    ],
  },

  /* ------------------------------------------------------------- New Albany */
  {
    slug: "new-albany-ms",
    town: "New Albany",
    county: "Union County",
    zip: "38652",
    miles: 30,
    drive: "about forty minutes",
    route: "east on MS-178 and up US-45",
    title: "Dentist Serving New Albany, MS",
    metaDescription:
      "Park Place Dental is about forty minutes from New Albany. In-house dental lab, same-day crowns and dentures, and appointments that are not rushed.",
    lead: [
      "Park Place Dental is in Booneville, roughly thirty miles and forty minutes east of New Albany, and Union County families do make the drive. It is not the closest practice to New Albany and we would not claim otherwise.",
      "What people come for is generally restorative: work that a laboratory in the building lets us complete in fewer appointments.",
    ],
    directions: [
      "Take MS-178 east out of New Albany toward Baldwyn.",
      "Join US-45 north at Baldwyn and follow it to Booneville.",
      "Take the MS-30 exit east into town, then turn north onto 3rd Street. The office is on your right, parking on site.",
    ],
    comeFor: [
      {
        term: "Restorative work in fewer visits",
        text: "Crowns, bridges, dentures and partials are made in our own laboratory. Over a course of treatment that usually removes more trips than the extra distance adds.",
      },
      {
        term: "The same dentist each visit",
        text: "One dentist, since 1982, in the same building. For work planned over months rather than weeks, that continuity is the substance of the thing.",
      },
      {
        term: "Grouped appointments",
        text: "Tell the desk how far you are coming and we will put together what can sensibly be put together, so the drive does more work each time.",
      },
    ],
    context: [
      "Union County is at the outer edge of what this practice reaches, and the patients who come from it have almost always been sent by somebody else who did. That is the only way a practice thirty miles away ends up on the list.",
    ],
    nearby: ["Myrtle", "Blue Springs", "Ingomar", "Etta"],
    services: [
      { label: "Crowns and bridges", href: "/services/restorative-dentistry/crowns-bridges" },
      { label: "Dentures and repairs", href: "/services/restorative-dentistry/dentures" },
      { label: "Cosmetic dentistry", href: "/services/cosmetic-dentistry" },
    ],
    faqs: [
      {
        q: "How far is Park Place Dental from New Albany?",
        a: "About thirty miles, or roughly forty minutes, east on MS-178 to Baldwyn and then north on US-45.",
      },
      {
        q: "Is the drive worth it for routine care?",
        a: "Usually not on its own, and we will say so. Most Union County patients start with restorative work and then keep the rest of their care here rather than splitting it between two practices.",
      },
      {
        q: "Can appointments be grouped into one trip?",
        a: "Where the treatment allows it, yes. Mention the distance when you book and the front desk will do what it can.",
      },
    ],
  },

  /* ----------------------------------------------------------------- Tupelo */
  {
    slug: "tupelo-ms",
    town: "Tupelo",
    county: "Lee County",
    zip: "38801",
    miles: 30,
    drive: "about forty minutes",
    route: "north on US-45",
    title: "Dentist Serving Tupelo, MS",
    metaDescription:
      "Park Place Dental is about forty minutes north of Tupelo on US-45. A single-dentist practice with a full in-house dental lab and unhurried appointments.",
    lead: [
      "Park Place Dental is in Booneville, roughly thirty miles and forty minutes north of Tupelo on US-45. Tupelo is not short of dentists, so a page like this has to be straight with you about why anybody drives out of it.",
      "The short answer is that some people want a small practice rather than a large one, and are willing to spend forty minutes to have it.",
    ],
    directions: [
      "Join US-45 north out of Tupelo and stay on it through Saltillo, Guntown and Baldwyn.",
      "Take the Booneville exit for MS-30 and turn east toward town.",
      "MS-30 becomes Church Street. Turn north onto 3rd Street; the office is on your right with free parking on site.",
    ],
    comeFor: [
      {
        term: "One dentist rather than a rota",
        text: "You see Dr. Goodwin. He has been in this building since 1982, and a plan made in March is still his plan in September.",
      },
      {
        term: "A full lab, not only a crown mill",
        text: "Chairside milling units make crowns. A full dental laboratory also makes and repairs dentures, partials and relines. Both get described as 'same-day', and they are not the same capability.",
      },
      {
        term: "Unhurried appointments",
        text: "The most common thing Lee County patients mention is that appointments here run to time and do not feel rushed. That is easier to deliver in Booneville than it is in a busy city practice.",
      },
    ],
    context: [
      "We are not going to claim to be the most convenient option for someone living in Tupelo, because we are not. What we can say is that patients do make the drive, consistently and for years, and the reasons they give are usually about continuity and about work that does not have to be posted away.",
    ],
    nearby: ["Saltillo", "Verona", "Plantersville", "Belden", "Mooreville"],
    services: [
      { label: "Dental implants", href: "/services/restorative-dentistry/dental-implants" },
      { label: "Dentures and repairs", href: "/services/restorative-dentistry/dentures" },
      { label: "Cosmetic dentistry", href: "/services/cosmetic-dentistry" },
    ],
    faqs: [
      {
        q: "How far is Park Place Dental from Tupelo?",
        a: "About thirty miles, or roughly forty minutes north on US-45. It is a straight run up the main corridor.",
      },
      {
        q: "Why would I drive to Booneville when Tupelo has dentists?",
        a: "For most routine care, you probably would not, and we will happily say so. The patients who do drive up tend to want the same dentist every visit, or laboratory work made on site rather than sent to an outside laboratory.",
      },
      {
        q: "What is the difference between same-day crowns and an in-house lab?",
        a: "A chairside milling unit makes crowns in a single visit. A full dental laboratory does that and also makes and repairs dentures, partials and relines. We have the laboratory, which covers a wider range of work.",
      },
    ],
  },

  /* ------------------------------------------------------------------- Iuka */
  {
    slug: "iuka-ms",
    town: "Iuka",
    county: "Tishomingo County",
    zip: "38852",
    miles: 40,
    drive: "about fifty minutes",
    route: "west on US-72, then south on US-45",
    title: "Dentist Serving Iuka, MS",
    metaDescription:
      "Park Place Dental is about fifty minutes from Iuka via US-72 and US-45. An in-house dental lab, denture work in fewer visits, and care for veterans.",
    lead: [
      "Park Place Dental is in Booneville, roughly forty miles and fifty minutes from Iuka, west along US-72 to Corinth and then south on US-45. Tishomingo County is the far edge of the area this practice serves, and the drive is a real one.",
      "It is also a drive a lot of people in this county are already used to making for anything beyond the everyday. The question worth asking is how many times you will have to make it, and that is the part we can change.",
    ],
    directions: [
      "Take US-72 west out of Iuka toward Burnsville and Corinth.",
      "At Corinth, join US-45 south and follow it for about twenty-five miles.",
      "Take the Booneville exit for MS-30, turn east into town, then north onto 3rd Street. The office is on your right with on-site parking.",
    ],
    comeFor: [
      {
        term: "Dentures, partials and repairs",
        text: "These are made and mended in our own laboratory in the building. For a fifty minute drive that frequently turns three appointments into one, which is the whole reason this page exists.",
      },
      {
        term: "Care for veterans",
        text: "Tishomingo County has a large veteran population and VA dental eligibility is genuinely confusing. We will go through what yours covers before any treatment is planned rather than after.",
      },
      {
        term: "Grouped appointments",
        text: "Tell the front desk you are driving from Iuka and we will group what can sensibly be grouped. On a drive this length that is not a courtesy, it is the difference between workable and not.",
      },
    ],
    context: [
      "Tishomingo County has very few dental practices of its own, and Corinth, Booneville and Florence in Alabama are the realistic options depending on which way you are already heading. We are the one with a full dental laboratory on the premises, and for denture work in particular that is what decides it.",
    ],
    nearby: ["Burnsville", "Tishomingo", "Belmont", "Dennis"],
    services: [
      { label: "Dentures and repairs", href: "/services/restorative-dentistry/dentures" },
      { label: "Care for veterans", href: "/veterans" },
      { label: "Dental implants", href: "/services/restorative-dentistry/dental-implants" },
    ],
    faqs: [
      {
        q: "How far is Park Place Dental from Iuka?",
        a: "About forty miles, or roughly fifty minutes, west on US-72 to Corinth and then south on US-45 into Booneville.",
      },
      {
        q: "That is a long drive. How do I avoid making it repeatedly?",
        a: "Say so when you book. Our dental laboratory is in the building, which removes the posting-away delay from most crown and denture work, and the front desk will group appointments where the treatment allows.",
      },
      {
        q: "Do you treat veterans?",
        a: "Yes, regularly. We will help you work out what your VA dental eligibility actually covers, which is rarely what people assume, before anything is planned.",
      },
    ],
  },
];

/**
 * Communities named on the hub but too small to support a page of their own.
 *
 * Each of these is also named in the `nearby` list of the town page closest to
 * it, so it appears in running prose on a real page rather than only in a
 * comma-separated list. That is the difference between a mention and a keyword
 * dump, and it is the line this file does not cross.
 */
export const alsoServing = [
  "Marietta",
  "Jumpertown",
  "Wheeler",
  "Thrasher",
  "Blue Springs",
  "Walnut",
  "Belmont",
  "Tishomingo",
  "Golden",
  "Glen",
  "Kossuth",
  "Mooreville",
  "Plantersville",
];

export function findLocation(slug: string): Location | undefined {
  return locations.find((l) => l.slug === slug);
}

/**
 * The hub's own groups.
 *
 * Distance bands rather than an alphabetical list, because "how far is it"
 * is the only question a visitor arrives at this page with.
 */
export const distanceBands = [
  {
    label: "In town and close by",
    note: "Twenty minutes or less.",
    max: 15,
  },
  {
    label: "A short drive",
    note: "Twenty to thirty-five minutes, mostly along US-45.",
    max: 25,
  },
  {
    label: "Worth the trip",
    note: "Thirty-five minutes and beyond. Tell us when you book and we will group what we can.",
    max: Infinity,
  },
];

export const locationsHub = {
  eyebrow: "Where Our Patients Come From",
  headline: "One practice, / the whole region",
  lead: [
    "Park Place Dental is a single practice at 403 N 3rd St in Booneville, Mississippi, and patients drive to it from across seven counties. We have not opened satellite offices and we are not planning to: everything is made, fitted and repaired in this building, which is the reason most people make the trip in the first place.",
    "Below is roughly what the drive looks like from the towns we see patients from most often, and what those patients usually come in for.",
  ],
  bookHref: BOOK,
};

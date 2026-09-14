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
 * content, it does not get a page. Six do. The smaller communities are named
 * on the hub instead, which is honest about what they are.
 *
 * TODO(kalob): drive times are stated as approximate and should be sanity
 * checked by someone who drives these roads. Distances are straightforward;
 * "about 25 minutes" is the kind of claim a local reader will notice if it is
 * wrong, and being wrong about it undoes the point of the page.
 */

export type Location = {
  slug: string;
  /** The town itself. */
  town: string;
  county: string;
  /** Rough road distance from the practice, in miles. */
  miles: number;
  /** Approximate drive, written the way someone local would say it. */
  drive: string;
  /** The road most people actually take. */
  route: string;
  title: string;
  metaDescription: string;
  /** Opening paragraphs. The first sentence answers "can I be seen there". */
  lead: string[];
  /** What patients from this town most often come in for, and why. */
  comeFor: { term: string; text: string }[];
  /** A paragraph about the town's own relationship to the practice. */
  context: string[];
  /** Services worth linking from this page. Slugs must exist. */
  services: { label: string; href: string }[];
  faqs: { q: string; a: string }[];
};

const BOOK = "/book-an-appointment";

export const locations: Location[] = [
  {
    slug: "baldwyn-ms",
    town: "Baldwyn",
    county: "Prentiss and Lee Counties",
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

  {
    slug: "corinth-ms",
    town: "Corinth",
    county: "Alcorn County",
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
    comeFor: [
      {
        term: "Work that would otherwise be posted away",
        text: "Crowns, dentures, partials, relines and repairs are made and mended in our own lab rather than sent to an outside laboratory. For a patient driving from Corinth, that difference can be the whole reason for the trip.",
      },
      {
        term: "Denture repairs without a week's wait",
        text: "Bring the pieces and call ahead. A repair that has to be couriered to a laboratory commonly takes days; one done in the building frequently does not.",
      },
      {
        term: "Veterans' dental care",
        text: "We serve veterans from across North Mississippi. VA dental eligibility is narrower than most people expect, and we would rather explain it clearly than let someone drive over on a wrong assumption.",
      },
    ],
    context: [
      "The drive from Corinth is a straight run down US-45 and, for most of Alcorn County, it is a shorter trip than it sounds. One of our patients has been coming for years and now drives ninety miles to do it. Twenty-five is not much of an ask by comparison.",
    ],
    services: [
      { label: "Dentures and repairs", href: "/services/restorative-dentistry/dentures" },
      { label: "Crowns and bridges", href: "/services/restorative-dentistry/crowns-bridges" },
      { label: "Dental implants", href: "/services/restorative-dentistry/dental-implants" },
    ],
    faqs: [
      {
        q: "How far is Park Place Dental from Corinth?",
        a: "About twenty-five miles, or roughly half an hour south on US-45. It is a straight run with no turns to speak of.",
      },
      {
        q: "Can you repair a denture while I wait?",
        a: "Often, because our lab is in the building rather than at the other end of a courier route. Call before you set off so we know it is coming, and bring every piece with you.",
      },
      {
        q: "Is it worth driving from Corinth for a routine cleaning?",
        a: "Honestly, that is your call and it depends on what else you need. Most of our Alcorn County patients started with something their own dentist could not do in one visit and stayed because the appointments run on time.",
      },
    ],
  },

  {
    slug: "new-albany-ms",
    town: "New Albany",
    county: "Union County",
    miles: 30,
    drive: "about forty minutes",
    route: "east along Highway 30",
    title: "Dentist Serving New Albany, MS",
    metaDescription:
      "Park Place Dental is about forty minutes east of New Albany along Highway 30. Implants, dentures and same-day crowns made in our own in-house lab.",
    lead: [
      "Park Place Dental is in Booneville, roughly thirty miles east of New Albany along Highway 30, and Union County patients travel to us mainly for restorative work. It is a pleasant drive and a direct one.",
      "New Albany sits in the middle of several dental markets, with Tupelo to the south and Booneville to the east. We are worth the trip when what you need is made rather than simply fitted.",
    ],
    comeFor: [
      {
        term: "Implants planned properly",
        text: "An implant has three separately priced parts and a timeline measured in months, so getting the plan right matters more than getting started quickly. We use RAYFace 3D facial scanning to plan against your whole face rather than the gap alone.",
      },
      {
        term: "Crowns made in our own lab",
        text: "Most practices send crown work out and wait for it to come back. Ours is made here, which shortens the wait, makes adjustments quicker, and takes one set of outside laboratory fees out of the cost.",
      },
      {
        term: "Full-mouth and denture work",
        text: "Full and partial dentures, relines and repairs are all made in the building, which is why patients who have been let down by slow turnaround elsewhere tend to end up here.",
      },
    ],
    context: [
      "Union County patients almost always arrive having been somewhere else first. The common thread is that they wanted the person making the work and the person fitting it to be under one roof, which is a reasonable thing to want and harder to find than it should be.",
    ],
    services: [
      { label: "Dental implants", href: "/services/restorative-dentistry/dental-implants" },
      { label: "Crowns and bridges", href: "/services/restorative-dentistry/crowns-bridges" },
      { label: "Smile makeovers", href: "/services/cosmetic-dentistry/smile-makeovers" },
    ],
    faqs: [
      {
        q: "How far is Park Place Dental from New Albany?",
        a: "About thirty miles, or roughly forty minutes east along Highway 30. It is a direct route with no complicated turns.",
      },
      {
        q: "Is the implant consultation a separate trip?",
        a: "Usually, yes, because planning an implant properly means examining and imaging before anything is decided. We will try to group later stages so you are making as few drives as the treatment allows.",
      },
      {
        q: "Do you make crowns on site?",
        a: "Yes. Our dental lab is in the building, so crowns, bridges, dentures and partials are made and adjusted here rather than posted to an outside laboratory.",
      },
    ],
  },

  {
    slug: "ripley-ms",
    town: "Ripley",
    county: "Tippah County",
    miles: 25,
    drive: "about forty minutes",
    route: "east across the county line",
    title: "Dentist Serving Ripley, MS",
    metaDescription:
      "Park Place Dental is about forty minutes east of Ripley. Family dentistry, dentures and same-day repairs from our in-house lab in Booneville, MS.",
    lead: [
      "Park Place Dental is in Booneville, roughly twenty-five miles east of Ripley, and we see Tippah County families regularly. Rural Mississippi has fewer dentists per head than almost anywhere in the country, so for many people in this part of the state the nearest practice and the right practice are not the same place.",
      "If you are weighing up a drive, the useful question is what you actually need done and whether it can be finished in one visit.",
    ],
    comeFor: [
      {
        term: "One trip instead of three",
        text: "Because the lab is in the building, work that elsewhere means an impression visit, a wait, and a fitting visit can often be compressed. When you are driving forty minutes each way, that is the thing that matters most.",
      },
      {
        term: "Dentures, relines and repairs",
        text: "Jawbone changes shape over the years after teeth come out, so a denture that fitted once will loosen. Relines and repairs are done here rather than sent away.",
      },
      {
        term: "Family care across generations",
        text: "We see children, parents and grandparents in the same practice, which for a family driving in from Tippah County means one appointment block rather than several separate trips.",
      },
    ],
    context: [
      "Tippah County is one of many rural Mississippi counties where dental access is genuinely thin on the ground. We are not going to pretend a forty-minute drive is nothing. What we can say is that we try to make each visit count, and that appointments here tend to run to time.",
    ],
    services: [
      { label: "Dentures and repairs", href: "/services/restorative-dentistry/dentures" },
      { label: "Cleanings and exams", href: "/services/general-dentistry/cleanings-exams" },
      { label: "Emergency dentistry", href: "/services/general-dentistry/emergency-dentistry" },
    ],
    faqs: [
      {
        q: "How far is Park Place Dental from Ripley?",
        a: "About twenty-five miles, or roughly forty minutes east. Most Tippah County patients tell us the drive is easier than the distance suggests.",
      },
      {
        q: "Can you fit several appointments into one visit?",
        a: "We will try, and we would rather you asked than assumed. Tell the front desk how far you are driving when you book and they will group what can sensibly be grouped.",
      },
      {
        q: "Do you see Medicaid patients?",
        a: "Call the office and ask about your specific plan rather than relying on a general answer here. Mississippi's adult dental coverage is narrow, and we would rather give you an accurate answer for your situation before you drive over.",
      },
    ],
  },

  {
    slug: "fulton-ms",
    town: "Fulton",
    county: "Itawamba County",
    miles: 25,
    drive: "about thirty-five minutes",
    route: "north-west toward Booneville",
    title: "Dentist Serving Fulton, MS",
    metaDescription:
      "Park Place Dental is about thirty-five minutes from Fulton. Crowns, dentures and implants made in our own in-house lab in Booneville, Mississippi.",
    lead: [
      "Park Place Dental is in Booneville, roughly twenty-five miles north-west of Fulton, and Itawamba County patients come to us chiefly for restorative work. The drive is comparable to going into Tupelo, with the difference being what can be finished in one visit once you arrive.",
      "Fulton residents have Tupelo on their doorstep, so anyone driving here is making a choice. We would rather earn it than assume it.",
    ],
    comeFor: [
      {
        term: "Work finished in fewer visits",
        text: "A practice with its own laboratory can make, adjust and repair in the building. For patients weighing us against a closer option, the number of trips is usually the deciding factor rather than the distance of any one of them.",
      },
      {
        term: "Implants and full-arch planning",
        text: "Implant treatment runs over months, so how the plan is made matters. We plan with 3D facial scanning and explain what drives the cost before anything is scheduled.",
      },
      {
        term: "Emergency and same-day care",
        text: "Broken teeth, lost crowns and denture breakages do not wait for a convenient appointment. We keep room for them.",
      },
    ],
    context: [
      "Itawamba County patients are usually coming past larger practices to get here, which we take as something to live up to rather than something to advertise. Dr. Goodwin has been practising in Booneville since 1982.",
    ],
    services: [
      { label: "Dental implants", href: "/services/restorative-dentistry/dental-implants" },
      { label: "Crowns and bridges", href: "/services/restorative-dentistry/crowns-bridges" },
      { label: "Emergency dentistry", href: "/services/general-dentistry/emergency-dentistry" },
    ],
    faqs: [
      {
        q: "How far is Park Place Dental from Fulton?",
        a: "About twenty-five miles, or roughly thirty-five minutes north-west. For most of Itawamba County it is a comparable drive to going into Tupelo.",
      },
      {
        q: "Why drive past Tupelo to get here?",
        a: "The usual reason patients give is the in-house lab, because it changes how many visits a piece of work takes. If what you need is a straightforward cleaning, a closer practice may well suit you better, and we will say so.",
      },
      {
        q: "How long does implant treatment take?",
        a: "Months rather than weeks, because the implant post needs time to fuse with the bone before the final crown goes on. We will map the timeline out with you at the start.",
      },
    ],
  },

  {
    slug: "tupelo-ms",
    town: "Tupelo",
    county: "Lee County",
    miles: 30,
    drive: "about forty minutes",
    route: "north on US-45",
    title: "Dentist Near Tupelo, MS",
    metaDescription:
      "Park Place Dental is about forty minutes north of Tupelo on US-45. An independent family practice with its own dental lab, serving North Mississippi.",
    lead: [
      "Park Place Dental is in Booneville, roughly thirty miles and forty minutes north of Tupelo on US-45. Tupelo has more dentists than anywhere else in the region, so we will be straightforward about why anyone drives the other way.",
      "Patients who come to us from Lee County are generally looking for one of two things: an independent practice where the same dentist sees them each time, or laboratory work made in the building rather than sent out.",
    ],
    comeFor: [
      {
        term: "The same dentist, every visit",
        text: "Dr. Goodwin has practised in Booneville since 1982. In a market with several multi-dentist practices and two national chains, seeing the same person each time is a genuine difference rather than a slogan.",
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
];

/** Communities named on the hub but too small to support a page of their own. */
export const alsoServing = [
  "Guntown",
  "Saltillo",
  "Blue Springs",
  "Marietta",
  "Jumpertown",
  "Wheeler",
  "Booneville",
  "Iuka",
];

export function findLocation(slug: string): Location | undefined {
  return locations.find((l) => l.slug === slug);
}

export const locationsHub = {
  eyebrow: "Where Our Patients Come From",
  headline: "One practice, / the whole region",
  lead: [
    "Park Place Dental is a single practice at 403 N 3rd St in Booneville, Mississippi, and patients drive to it from across seven counties. We have not opened satellite offices and we are not planning to: everything is made, fitted and repaired in this building, which is the reason most people make the trip in the first place.",
    "Below is roughly what the drive looks like from the towns we see patients from most often, and what those patients usually come in for.",
  ],
  bookHref: BOOK,
};

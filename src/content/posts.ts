/**
 * The articles, as data.
 *
 * Before these, `/patient-resources/blog` was a placeholder that said the first
 * articles were being written. Meanwhile no competing practice in the region
 * published anything at all, which left the whole informational layer of North
 * Mississippi dental search to national content mills and lead-generation
 * directories.
 *
 * Every post here is built to the same shape, because that shape is what gets
 * quoted by a search engine or an assistant:
 *
 *   - `answer` is a single self-contained paragraph that answers the title
 *     completely. Someone who reads only that has what they came for, and
 *     anything quoting one paragraph quotes a true and useful one.
 *   - Headings are the questions people actually ask, not chapter titles.
 *   - Steps are ordered where the content is genuinely a sequence, and marked
 *     up as HowTo only then.
 *   - Every post ends with questions and answers specific to it.
 *
 * Three rules constrain the copy:
 *
 *   1. No prices. The practice's fee schedule is not in this repo and inventing
 *      one would be both wrong and, under Mississippi's advertising rules,
 *      actionable: a published fee is presumed to cover everything ordinarily
 *      required for that service. Cost posts explain what drives a number and
 *      send the reader to the practice for a written estimate.
 *   2. No guarantees, no "permanent", no "painless", no superlatives.
 *   3. Nothing asserted that the practice has not confirmed it offers. Where a
 *      claim needs confirmation it carries a TODO rather than a guess.
 */

export type PostBlock =
  | { kind: "prose"; heading?: string; body: string[] }
  | { kind: "list"; heading?: string; intro?: string; items: string[] }
  | { kind: "terms"; heading?: string; intro?: string; items: { term: string; text: string }[] }
  | { kind: "steps"; heading?: string; intro?: string; items: { term: string; text: string }[] }
  | { kind: "callout"; heading: string; body: string }
  | {
      kind: "table";
      heading?: string;
      intro?: string;
      columns: [string, string, string];
      rows: [string, string, string][];
    };

export type Post = {
  slug: string;
  title: string;
  /** What the browser tab and search result say. Kept under ~60 with the suffix. */
  seoTitle: string;
  metaDescription: string;
  /** Shown on the index and at the top of the post. */
  summary: string;
  /**
   * The direct answer. One paragraph, self-contained, first thing on the page.
   * This is the passage an AI assistant is most likely to lift.
   */
  answer: string;
  published: string;
  updated: string;
  image: string;
  imageAlt: string;
  readingMinutes: number;
  topic: string;
  blocks: PostBlock[];
  faqs: { q: string; a: string }[];
  /** Set where the article gives genuinely ordered instructions. */
  howTo?: { name: string; steps: { name: string; text: string }[] };
  related: { label: string; href: string }[];
};

const PUBLISHED = "2026-09-13";

export const posts: Post[] = [
  /* ====================================================================== 1 */
  {
    slug: "dental-emergency-first-hour",
    title: "Cracked a tooth or knocked one out? What to do in the first hour",
    seoTitle: "Dental Emergency? What to Do First",
    metaDescription:
      "Knocked-out tooth, cracked tooth, lost filling or swelling: what to do in the first hour, when to go to an ER instead, and how to reach an emergency dentist in North Mississippi.",
    summary:
      "A knocked-out tooth has its best chance in the first hour. Here is what to do for each kind of dental emergency, and how to tell what needs a dentist today from what needs a hospital now.",
    answer:
      "If you have knocked out a permanent tooth, pick it up by the crown rather than the root, keep it moist in milk or in your own saliva and never in water, and try to see a dentist within an hour. For a cracked or broken tooth, rinse gently with warm water, use a cold compress on the outside of the face for swelling, and avoid chewing on that side. For a lost filling or crown, keep the piece, keep the area clean, and call your dentist. Go to an emergency room instead if you have a suspected broken jaw, bleeding you cannot control, or facial swelling that is affecting your breathing or swallowing.",
    published: PUBLISHED,
    updated: PUBLISHED,
    image: "/images/procedure-closeup.jpg",
    imageAlt: "A dental treatment room prepared for an emergency appointment",
    readingMinutes: 7,
    topic: "Emergency care",
    blocks: [
      {
        kind: "steps",
        heading: "A knocked-out permanent tooth",
        intro:
          "This is the one true race against the clock in dentistry. A permanent tooth that is back in its socket quickly has a real chance of surviving; one that has been dry for hours usually does not.",
        items: [
          {
            term: "Pick it up by the crown",
            text: "Handle the white chewing part, not the root. The cells on the root surface are what allow the tooth to reattach, and wiping or scrubbing them off is the most common way a savable tooth is lost.",
          },
          {
            term: "Rinse it only if it is dirty, and only briefly",
            text: "Use milk, saline or the patient's own saliva. Do not scrub it, do not use soap, and do not leave it under a running tap.",
          },
          {
            term: "Put it back in the socket if you can",
            text: "For an adult who is fully conscious, gently pushing the tooth back into its socket and biting softly on a clean cloth to hold it is the best possible transport. If that is not possible, move to the next step.",
          },
          {
            term: "Otherwise keep it in milk",
            text: "Milk is the best widely available storage medium. Saliva works: the patient can hold the tooth inside the cheek if they are old enough not to swallow it. Water is the one thing to avoid, because it damages the root cells quickly.",
          },
          {
            term: "Get to a dentist inside an hour if you possibly can",
            text: "Telephone on the way so the practice can be ready for you rather than finding out when you walk in.",
          },
        ],
      },
      {
        kind: "callout",
        heading: "Baby teeth are the exception",
        body: "A knocked-out baby tooth should not be put back in. Replanting it risks damaging the permanent tooth developing above it. Keep the child comfortable, control any bleeding with gentle pressure, and call the practice for advice rather than driving over immediately.",
      },
      {
        kind: "terms",
        heading: "Other emergencies, and what each one needs",
        items: [
          {
            term: "A cracked or broken tooth",
            text: "Rinse gently with warm water, hold a cold compress against the outside of the face to limit swelling, and keep any pieces. Avoid chewing on that side. How urgent it is depends less on the size of the break than on whether the inner pulp is exposed, which is why pain on air or cold is worth mentioning when you call.",
          },
          {
            term: "A lost filling or crown",
            text: "Keep the piece and bring it with you. Avoid chewing on that side, and keep the area clean. A crown that has come off cleanly can often be recemented. Temporary dental cement from a pharmacy can protect the tooth for a day or two, but it is a stopgap and not a repair.",
          },
          {
            term: "Severe toothache",
            text: "Pain that keeps you awake, throbs, or lingers after heat or cold is usually a sign the nerve is inflamed or infected. Over-the-counter pain relief taken as directed can hold you until you are seen. Do not put aspirin directly against the gum, which burns the tissue rather than helping.",
          },
          {
            term: "Swelling in the gum or face",
            text: "Swelling suggests infection, and infection in the mouth can spread. This is the symptom on this page most worth acting on quickly, even when the pain itself is manageable.",
          },
          {
            term: "Something stuck between teeth",
            text: "Try dental floss gently. Do not use a pin, a knife or anything metal, which is a reliable way of turning a small problem into a bigger one.",
          },
        ],
      },
      {
        kind: "list",
        heading: "When it is a hospital rather than a dentist",
        intro:
          "Most dental problems are better handled by a dentist, because a hospital can usually manage the pain without treating the cause. These are the exceptions, and they are genuine emergencies:",
        items: [
          "A suspected broken or dislocated jaw",
          "Bleeding that will not stop with fifteen minutes of firm pressure",
          "Facial swelling that is affecting your breathing or your swallowing",
          "Swelling around the eye, or spreading down the neck",
          "A significant head injury alongside the dental injury",
        ],
      },
      {
        kind: "prose",
        heading: "What happens when you call us",
        body: [
          "We keep room in the schedule for urgent problems, so call the office on the number below rather than sending a message through the website. The telephone reaches us straight away; a form waits until somebody opens it.",
          "Tell whoever answers what happened, when it happened, and whether there is swelling. Those three things are what decide how quickly you need to be seen, and they let us have the right room and the right instruments ready before you arrive.",
          "If a crown, a bridge or a denture is involved, bring every piece with you. Our dental laboratory is in this building rather than at the other end of a courier route, which means repairs that would otherwise be posted away and waited on can often be dealt with far sooner.",
        ],
      },
      {
        kind: "prose",
        heading: "If you are driving in from out of town",
        body: [
          "We see emergency patients from across North Mississippi, including Baldwyn, Corinth, New Albany, Ripley, Fulton and Tupelo. Tell the front desk how far you are coming when you call, because it changes what we try to get done in a single visit.",
        ],
      },
    ],
    howTo: {
      name: "What to do with a knocked-out permanent tooth",
      steps: [
        {
          name: "Pick the tooth up by the crown",
          text: "Handle the white chewing surface, never the root. The cells on the root are what allow the tooth to reattach.",
        },
        {
          name: "Rinse briefly only if dirty",
          text: "Use milk, saline or saliva. Do not scrub the root, use soap, or hold it under running water.",
        },
        {
          name: "Reinsert the tooth if possible",
          text: "For a conscious adult, gently place the tooth back into its socket and bite softly on a clean cloth to hold it in position.",
        },
        {
          name: "Otherwise store it in milk",
          text: "Milk is the best widely available storage medium. Saliva also works. Avoid water, which damages the root cells.",
        },
        {
          name: "See a dentist within an hour",
          text: "Telephone the practice on the way so they can prepare for your arrival.",
        },
      ],
    },
    faqs: [
      {
        q: "How long do I have to save a knocked-out tooth?",
        a: "The best chance is within the first hour, and sooner is better throughout that hour. After a tooth has been out and dry for longer, replanting becomes progressively less likely to succeed, though it is still worth bringing the tooth with you.",
      },
      {
        q: "Can I put a knocked-out tooth in water?",
        a: "No. Water damages the delicate cells on the root surface that allow the tooth to reattach. Milk is the best widely available option, and the patient's own saliva works too.",
      },
      {
        q: "Should I go to the emergency room for a toothache?",
        a: "Usually not. A hospital can generally manage pain and prescribe antibiotics but cannot treat the tooth itself, so most people end up needing a dentist afterwards anyway. Go to an emergency room for a suspected broken jaw, uncontrolled bleeding, or swelling affecting your breathing.",
      },
      {
        q: "Do you see emergency patients who are not already registered here?",
        a: "Yes. You do not need to be an existing patient for us to see you in an emergency. Call the office and describe what has happened.",
      },
      {
        q: "What if my denture breaks?",
        a: "Bring every piece with you and call ahead. Because our dental lab is in the building, many denture repairs can be handled here rather than posted to an outside laboratory, which is often the difference between hours and a week.",
      },
    ],
    related: [
      { label: "Emergency dentistry", href: "/services/general-dentistry/emergency-dentistry" },
      { label: "Crowns and bridges", href: "/services/restorative-dentistry/crowns-bridges" },
      { label: "Root canal treatment", href: "/services/general-dentistry/root-canals" },
    ],
  },

  /* ====================================================================== 2 */
  {
    slug: "va-dental-benefits-mississippi",
    title: "VA dental benefits in Mississippi: what veterans need to know before booking",
    seoTitle: "VA Dental Benefits in Mississippi",
    metaDescription:
      "Most enrolled veterans do not qualify for comprehensive VA dental care. The eligibility classes explained in plain English, plus what to check before you book.",
    summary:
      "Being enrolled in VA health care and being eligible for VA dental care are two different things, and the gap between them catches a lot of people out. Here is how the eligibility classes actually work.",
    answer:
      "Being enrolled in VA health care does not by itself entitle you to dental treatment. VA dental care is granted through a set of eligibility classes, and only three of them provide any needed dental care on an ongoing basis: Class I, for a service-connected compensable dental disability; Class IIC, for former prisoners of war; and Class IV, for veterans rated 100% disabled or receiving benefits at that rate through individual unemployability. The other classes provide narrower or one-time care. Veterans who do not qualify may be able to buy discounted private dental insurance through the VA Dental Insurance Program instead.",
    published: PUBLISHED,
    updated: PUBLISHED,
    image: "/images/goodwin-and-assistant.jpg",
    imageAlt: "Dr. Ken Goodwin talking with a patient at Park Place Dental",
    readingMinutes: 8,
    topic: "Veterans",
    blocks: [
      {
        kind: "callout",
        heading: "Check your own eligibility with the VA, not with us",
        body: "This page explains how the system is structured so that you can work out which questions to ask. It is not a determination of your eligibility, which only the VA can make. The authoritative source is va.gov, and the classes below are drawn from it.",
      },
      {
        kind: "prose",
        heading: "Why so many veterans are surprised",
        body: [
          "VA health care enrolment and VA dental eligibility are separate systems with separate rules. A veteran can be fully enrolled for medical care, use the VA for everything else, and still have no dental entitlement at all. That is not an oversight or a backlog; it is how the benefit is written.",
          "Prentiss County alone is home to somewhere in the region of eleven hundred veterans, and across North Mississippi the number runs far higher. In our experience the confusion is close to universal, and it usually surfaces at the point somebody needs treatment rather than before.",
        ],
      },
      {
        kind: "terms",
        heading: "The eligibility classes, in plain English",
        intro:
          "The VA sorts dental eligibility into classes. Which one applies to you determines whether you get comprehensive care, a single course of treatment, or care limited to one specific problem.",
        items: [
          {
            term: "Class I: any needed dental care",
            text: "For veterans with a service-connected compensable dental disability or condition. This is the fullest entitlement and it continues.",
          },
          {
            term: "Class II: one-time care after discharge",
            text: "For veterans with a service-connected noncompensable dental condition who apply within a limited window after discharge. It is a single course of treatment, and the application window is short enough that it is easy to miss.",
          },
          {
            term: "Class IIA: care to restore a functioning dentition",
            text: "For veterans with a service-connected noncompensable dental condition resulting from combat wounds or service trauma. Treatment is aimed at restoring function rather than being open-ended.",
          },
          {
            term: "Class IIB: one course for veterans in specific programs",
            text: "Including veterans enrolled in certain homeless and other VA care programs. A single course of care rather than ongoing treatment.",
          },
          {
            term: "Class IIC: any needed dental care",
            text: "For former prisoners of war. Like Class I, this is comprehensive and ongoing.",
          },
          {
            term: "Class III: care for a dental problem affecting a medical condition",
            text: "Where a dental condition is complicating a service-connected medical condition being treated by the VA. Care is limited to resolving that interaction.",
          },
          {
            term: "Class IV: any needed dental care",
            text: "For veterans rated 100% disabled by schedular evaluation, or receiving benefits at the 100% rate through individual unemployability. Comprehensive and ongoing.",
          },
          {
            term: "Class V: care as part of vocational rehabilitation",
            text: "For veterans participating in the Veteran Readiness and Employment program, where dental treatment is needed for the rehabilitation plan.",
          },
          {
            term: "Class VI: care for a condition VA is actively treating",
            text: "Where dental care is necessary as part of treatment for a condition the VA is currently managing.",
          },
        ],
      },
      {
        kind: "prose",
        heading: "If none of those apply to you",
        body: [
          "Most enrolled veterans fall outside all of the comprehensive classes. That is the single most useful thing to understand before you start making calls, because it changes what you are asking for.",
          "The VA Dental Insurance Program, usually shortened to VADIP, exists for exactly this group. It is not VA-provided treatment: it is private dental insurance, offered at reduced group rates, that veterans enrolled in VA health care can buy. You pay the premiums, and it works like any other dental plan.",
          "CHAMPVA is a different program again, and it covers certain spouses, dependants and survivors rather than veterans themselves. If you have been told to look into CHAMPVA, check carefully whether the person needing treatment is the person it covers.",
        ],
      },
      {
        kind: "list",
        heading: "What to have to hand before you call anyone",
        intro:
          "Whether you are calling the VA or a dental practice, these are the things that shorten the conversation:",
        items: [
          "Your VA disability rating, if you have one, and whether it is schedular or through individual unemployability",
          "Whether your dental condition is recorded as service-connected, and whether it is compensable",
          "Your discharge date, which matters for the one-time Class II entitlement",
          "Any VA referral or authorisation paperwork you have already been given",
          "The name of the VA facility managing your care",
        ],
      },
      {
        kind: "prose",
        heading: "Where Park Place Dental fits",
        body: [
          "We are a general dental practice in Booneville and we treat veterans from across North Mississippi. What we can do depends on how your care is being paid for, which is why the paragraphs above come first: knowing which class you are in, or that you are in none of them, tells you what kind of arrangement you are looking for.",
          "If you are not sure where you stand, call the office and say so plainly. We would far rather spend a few minutes on the phone working out what applies to you than have you drive over on an assumption that turns out to be wrong.",
        ],
      },
    ],
    faqs: [
      {
        q: "Does the VA cover dental care for all enrolled veterans?",
        a: "No. Enrolment in VA health care does not include dental treatment by default. Dental care is granted through separate eligibility classes, and only Class I, Class IIC and Class IV provide any needed dental care on an ongoing basis.",
      },
      {
        q: "What is VADIP?",
        a: "The VA Dental Insurance Program is discounted private dental insurance that veterans enrolled in VA health care can purchase. It is not treatment provided by the VA: you pay the premiums and it works like any other dental plan.",
      },
      {
        q: "Does CHAMPVA cover dental?",
        a: "CHAMPVA covers certain spouses, dependants and survivors rather than veterans themselves, and its dental provisions are limited. Check carefully whether the person who needs treatment is actually covered before relying on it.",
      },
      {
        q: "I was told I had a one-time dental benefit after discharge. Can I still use it?",
        a: "The Class II one-time entitlement has a limited application window after discharge, and it is commonly missed. The VA is the only source that can tell you whether yours is still open.",
      },
      {
        q: "Do you treat veterans at Park Place Dental?",
        a: "Yes, we see veterans from across North Mississippi. Call the office and tell us how your care is being paid for, and we will tell you straightforwardly what we can arrange.",
      },
    ],
    related: [
      { label: "Insurance and financing", href: "/new-patients/insurance-financing" },
      { label: "Dentures and repairs", href: "/services/restorative-dentistry/dentures" },
      { label: "Dental implants", href: "/services/restorative-dentistry/dental-implants" },
    ],
  },

  /* ====================================================================== 3 */
  {
    slug: "in-house-dental-lab-same-day",
    title: "Same-day crowns and denture repairs: why an in-house lab is rare here",
    seoTitle: "Same-Day Crowns & Denture Repairs",
    metaDescription:
      "A chairside milling unit makes crowns. A full in-house dental lab also makes and repairs dentures, partials and relines. What the difference means for your waiting time.",
    summary:
      "Same-day crowns and same-day denture repairs get talked about as one capability. They are not. Here is the difference, and what having a full dental laboratory in the building actually changes.",
    answer:
      "A chairside milling unit and a full in-house dental laboratory are different things that both get described as same-day. A milling unit designs and cuts crowns in the surgery, usually in one visit. A dental laboratory does that and also makes and repairs dentures, partials, relines and bridges, which a milling unit cannot. Park Place Dental has a laboratory in the building, so most crown, denture and partial work is made or mended on site rather than posted to an outside laboratory and waited on. For patients driving in from across North Mississippi, that difference is usually measured in trips rather than days.",
    published: PUBLISHED,
    updated: PUBLISHED,
    image: "/images/operatory-technology.jpg",
    imageAlt: "Dental laboratory equipment at Park Place Dental",
    readingMinutes: 6,
    topic: "Technology",
    blocks: [
      {
        kind: "prose",
        heading: "How most dental work is actually made",
        body: [
          "When a practice takes an impression or a scan for a crown, a denture or a partial, that record usually leaves the building. It goes to a commercial dental laboratory, often in another town or another state, where a technician makes the piece. Then it comes back.",
          "That round trip is why the standard sequence for a crown is two appointments with a temporary in between, and why a broken denture commonly means going without for a week or more. None of it is anybody's fault: it is simply what happens when the person who fits the work and the person who makes it are in different places.",
        ],
      },
      {
        kind: "table",
        heading: "Milling unit or dental laboratory?",
        intro:
          "Both get advertised as same-day, which is where the confusion starts. This is what each can actually do.",
        columns: ["", "Chairside milling unit", "Full in-house laboratory"],
        rows: [
          ["Crowns in one visit", "Yes", "Yes"],
          ["Bridges", "Some cases", "Yes"],
          ["Full and partial dentures", "No", "Yes"],
          ["Denture repairs and relines", "No", "Yes"],
          ["Adjusting a piece while you wait", "Limited", "Yes"],
          ["Work leaves the building", "No", "No"],
        ],
      },
      {
        kind: "terms",
        heading: "What it changes in practice",
        items: [
          {
            term: "Fewer trips, which matters most if you are driving",
            text: "The number of appointments a piece of work takes matters far more to somebody coming from Corinth or Fulton than to somebody who lives two streets away. Patients who travel are the ones who notice this first.",
          },
          {
            term: "Adjustments happen the same day",
            text: "A denture that rubs, a crown that feels high, a partial that does not seat quite right: these are ordinary and expected. When the laboratory is down the corridor, the adjustment is a conversation rather than another appointment in a fortnight.",
          },
          {
            term: "Repairs without the wait",
            text: "A broken denture posted to an outside laboratory commonly takes days. Bring the pieces here, call ahead, and it frequently does not.",
          },
          {
            term: "One fewer set of fees in the total",
            text: "An outside laboratory charges the practice, and that charge is part of what a patient ultimately pays. Work made in the building does not carry it. We are not going to pretend this makes treatment cheap, but it is a real line item that is simply not there.",
          },
        ],
      },
      {
        kind: "prose",
        heading: "What it does not change",
        body: [
          "Same-day is not the right answer for everything, and it would be misleading to suggest otherwise. Some materials need laboratory processes that take time. Some cases need a healing period between stages regardless of who is making the work: implants in particular are measured in months, because the bone has to fuse to the post before anything final goes on top.",
          "Complex full-mouth work is planned in stages by design, not by logistics. Where waiting is clinically right, we will tell you it is right rather than rushing it because we can.",
        ],
      },
      {
        kind: "prose",
        heading: "How to use this when you call",
        body: [
          "If you have a broken denture or a crown that has come off, say so when you telephone and bring every piece with you. If you are weighing us up against a practice closer to home, the useful question to ask both of us is not whether you do same-day crowns, but what happens to a denture repair and how many visits a crown actually takes.",
        ],
      },
    ],
    faqs: [
      {
        q: "Can you really make a crown in one visit?",
        a: "Many crowns can be made and fitted here rather than sent to an outside laboratory, because the lab is in the building. Whether a specific crown can be completed in one visit depends on the tooth and the material, so ask when it is planned rather than assuming either way.",
      },
      {
        q: "What is the difference between CEREC and an in-house lab?",
        a: "CEREC is a chairside milling system that designs and cuts crowns in the surgery. A full dental laboratory does that and also makes and repairs dentures, partials, relines and bridges. The two are often both described as same-day, which is why people expect denture work from practices that cannot do it.",
      },
      {
        q: "Can you repair my denture today?",
        a: "Often, yes. Call before you set off so we know it is coming, and bring every piece including the small ones. A repair sent to an outside laboratory commonly takes days; one done here frequently does not.",
      },
      {
        q: "Does an in-house lab make treatment cheaper?",
        a: "It removes the outside laboratory fee from the total, which is a real component of what dental work costs. It does not make treatment inexpensive, and any practice claiming otherwise is overselling.",
      },
    ],
    related: [
      { label: "Crowns and bridges", href: "/services/restorative-dentistry/crowns-bridges" },
      { label: "Dentures and repairs", href: "/services/restorative-dentistry/dentures" },
      { label: "Our technology", href: "/advanced-dental-technology" },
    ],
  },

  /* ====================================================================== 4 */
  {
    slug: "dental-implant-cost-north-mississippi",
    title: "What does a dental implant actually cost in North Mississippi?",
    seoTitle: "Dental Implant Cost in North Mississippi",
    metaDescription:
      "An implant has three separately priced parts, and the total depends on your case. What actually drives the number, what changes it, and how to read a treatment estimate.",
    summary:
      "Most implant cost articles quote one national average that may have nothing to do with your case. This one explains what the number is actually made of, so you can read an estimate properly.",
    answer:
      "A single dental implant is priced as three separate parts rather than one item: the implant post placed in the jawbone, the abutment that connects to it, and the crown on top. What you pay depends on how many teeth are involved, whether bone grafting is needed first, which materials are used, what imaging the plan requires, and the kind of anaesthesia or sedation chosen. Because those variables differ so widely between patients, any single advertised figure is close to meaningless until someone has examined your mouth. Ask for a written treatment estimate that itemises each part, and check specifically whether imaging, grafting and the final crown are included.",
    published: PUBLISHED,
    updated: PUBLISHED,
    image: "/images/operatory-room.jpg",
    imageAlt: "A treatment room at Park Place Dental prepared for implant planning",
    readingMinutes: 8,
    topic: "Costs",
    blocks: [
      {
        kind: "callout",
        heading: "Why there are no prices on this page",
        body: "Publishing a figure without knowing your case would be guesswork, and under Mississippi's dental advertising rules an advertised fee is presumed to cover everything ordinarily required for that service. We would rather explain what drives the number and give you a written, itemised estimate after an examination. Call the office and ask for one.",
      },
      {
        kind: "terms",
        heading: "The three parts you are actually paying for",
        intro:
          "When people compare implant quotes and find wildly different numbers, it is nearly always because the quotes cover different parts of the job.",
        items: [
          {
            term: "The implant post",
            text: "A small screw-shaped fixture placed into the jawbone, which takes the role of the tooth root. It needs a period of healing during which the bone fuses to it, and that healing is why implant treatment is measured in months.",
          },
          {
            term: "The abutment",
            text: "The connector that sits on the post and supports whatever goes on top. It is a separate component and is usually priced separately, which is one of the commonest sources of confusion when comparing estimates.",
          },
          {
            term: "The crown",
            text: "The part you see and chew with. It is made to match your other teeth. At this practice the crown is made in our own laboratory rather than sent to an outside one, which removes an outside laboratory fee from the total.",
          },
        ],
      },
      {
        kind: "terms",
        heading: "What moves the number up or down",
        items: [
          {
            term: "How many teeth are being replaced",
            text: "Replacing several teeth does not simply multiply the single-tooth price. A bridge supported by two implants can replace three or four teeth, so the cost per tooth usually falls as the span grows.",
          },
          {
            term: "Whether you need bone grafting",
            text: "An implant needs enough healthy bone to hold it. Bone begins to shrink once a tooth has been missing for a while, so patients who have waited years are more likely to need grafting first. This is the single most common reason one person's estimate is much higher than another's.",
          },
          {
            term: "Imaging and planning",
            text: "Implants are planned from three-dimensional imaging rather than a flat x-ray. We also use RAYFace 3D facial scanning, which lets the plan be judged against your whole face rather than the gap alone.",
          },
          {
            term: "Materials",
            text: "Different post systems and crown materials carry different costs and different track records. This is worth asking about rather than assuming the cheapest and the dearest do the same job.",
          },
          {
            term: "Anaesthesia",
            text: "Local anaesthetic is included in ordinary treatment. Anything beyond that is a separate item and should appear as one on your estimate.",
          },
          {
            term: "Extractions and temporary teeth",
            text: "If a failing tooth has to come out first, or you need something to wear while the site heals, those are additional stages with their own costs.",
          },
        ],
      },
      {
        kind: "prose",
        heading: "How insurance usually treats implants",
        body: [
          "Dental plans vary enormously on implants. Some exclude them outright, some cover the crown but not the post, and many apply an annual maximum that a single implant will exhaust on its own. It is common for a plan to pay towards part of the treatment and nothing towards the rest.",
          "The practical step is to have the practice submit a pre-treatment estimate to your insurer before you commit. That gets you an answer in writing from the people who will actually be paying, rather than an expectation based on what a plan summary seems to say.",
          "Where a plan will not cover implants, financing through CareCredit is available and treatment can often be staged so the cost is spread over time rather than falling all at once.",
        ],
      },
      {
        kind: "list",
        heading: "Questions worth asking before you commit",
        intro:
          "Take these to any practice, including this one. A good answer to all six tells you more than a headline price does.",
        items: [
          "Does this estimate include the post, the abutment and the crown, or only some of them?",
          "Is imaging included, and is grafting likely in my case?",
          "How many appointments will this take, and over how many months?",
          "Where is the crown made, and how long does a remake take if it needs adjusting?",
          "What happens, and what does it cost, if the implant does not integrate?",
          "What are my alternatives, and what would you do in my position?",
        ],
      },
      {
        kind: "prose",
        heading: "Is an implant the right answer at all?",
        body: [
          "Not always, and a practice that never says so is not being straight with you. An implant stands on its own without altering the teeth either side, and it helps preserve the bone where the tooth was, which a denture does not. It also costs more than the alternatives and takes considerably longer.",
          "A bridge is quicker and usually less expensive, at the cost of reshaping the healthy teeth on either side of the gap. A partial denture is the least expensive route and the least permanent-feeling. For some people, particularly where several teeth are involved, an implant-supported denture is the sensible middle ground.",
          "Which is right genuinely depends on your mouth, your health and what you want day to day. That is a conversation, not a price list.",
        ],
      },
    ],
    faqs: [
      {
        q: "Why will nobody quote me a price for a dental implant over the phone?",
        a: "Because the honest answer depends on things nobody can know without looking: how much bone you have, whether grafting is needed, how many teeth are involved and what condition the surrounding teeth and gums are in. A figure quoted before an examination is a guess, and one that often turns out to be wrong in the patient's disfavour.",
      },
      {
        q: "Does dental insurance cover implants?",
        a: "It varies widely. Some plans exclude implants entirely, some cover the crown but not the post, and many have an annual maximum a single implant would use up on its own. Ask your practice to submit a pre-treatment estimate so you get the answer in writing from the insurer.",
      },
      {
        q: "Why is bone grafting sometimes needed?",
        a: "Jawbone shrinks once a tooth has been missing, because it is no longer being loaded by chewing. An implant needs enough healthy bone to hold it, so where too much has been lost, grafting rebuilds the site first. It is the most common reason two estimates for what sounds like the same treatment differ substantially.",
      },
      {
        q: "How long do dental implants last?",
        a: "Implants are designed to last for decades and many do, provided the surrounding gum and bone stay healthy. They are not immune to failure, particularly where gum disease or smoking is involved, and they need the same regular care and check-ups as natural teeth.",
      },
      {
        q: "Is an implant better than a bridge?",
        a: "Not automatically. An implant avoids reshaping the healthy teeth on either side and helps preserve bone, but it costs more and takes months rather than weeks. A bridge is faster and often less expensive. Which is better depends on your specific situation.",
      },
    ],
    related: [
      { label: "Dental implants", href: "/services/restorative-dentistry/dental-implants" },
      { label: "Dentures", href: "/services/restorative-dentistry/dentures" },
      { label: "Insurance and financing", href: "/new-patients/insurance-financing" },
    ],
  },

  /* ====================================================================== 5 */
  {
    slug: "solea-laser-dentistry-without-the-needle",
    title: "No-shot dentistry: how the Solea laser lets many fillings skip the needle",
    seoTitle: "Laser Dentistry Without the Needle",
    metaDescription:
      "The Solea dental laser lets many fillings be done with little or no anaesthetic. How the wavelength works, what it feels like, and what it does not replace.",
    summary:
      "For a lot of people the needle is the worst part of a filling. A dental laser makes it possible to skip it in many cases, and it is worth understanding why rather than taking it on faith.",
    answer:
      "Solea is a CO2 dental laser operating at a 9.3 micrometre wavelength, which is absorbed very efficiently by the mineral and water content of tooth structure. Because it removes decay without the heat, vibration and pressure of a drill, many routine fillings can be completed with little or no local anaesthetic, which means no numbing injection and no numb lip for hours afterwards. It is not used for every procedure and it does not replace a drill in every situation, so whether it suits a particular tooth depends on the size and position of the cavity.",
    published: PUBLISHED,
    updated: PUBLISHED,
    image: "/images/procedure-closeup.jpg",
    imageAlt: "Close-up of a dental procedure at Park Place Dental",
    readingMinutes: 6,
    topic: "Technology",
    blocks: [
      {
        kind: "prose",
        heading: "Why the drill needs anaesthetic and the laser often does not",
        body: [
          "The discomfort of a conventional filling comes largely from heat, vibration and pressure. A rotating bur generates all three, and the nerve inside the tooth responds to them. Anaesthetic is what makes that tolerable.",
          "A laser removes tooth structure differently. The Solea wavelength is absorbed strongly by hydroxyapatite and water, so energy is deposited precisely where it lands and very little of it travels onward as heat into the surrounding tissue. There is no rotation and no contact, so no vibration and no pressure. With the main sources of the sensation gone, a good many cavities can be prepared without numbing anything.",
        ],
      },
      {
        kind: "prose",
        heading: "What it actually feels like",
        body: [
          "Most patients describe a cool sensation with a fine spray of water, and a noise that is closer to a click or a patter than a whine. The absence of the drill sound matters more to nervous patients than we expected before we had one.",
          "We are not going to call it painless. Some people feel a twinge, particularly on deeper cavities, and where that happens we stop and offer anaesthetic in the ordinary way. Nobody is asked to push through discomfort to avoid an injection.",
        ],
      },
      {
        kind: "terms",
        heading: "Where it helps most",
        items: [
          {
            term: "Routine fillings",
            text: "The everyday case, and the one where skipping the injection makes the biggest difference to how the appointment feels.",
          },
          {
            term: "Children",
            text: "A child who does not need a needle, and who is not listening to a drill, has a very different first experience of dentistry. That first experience tends to set the tone for a long time.",
          },
          {
            term: "Adults who dread the needle",
            text: "Needle anxiety is extremely common and is often the specific reason people put off treatment for years. Removing it from the equation removes the obstacle.",
          },
          {
            term: "Some soft-tissue work",
            text: "The same laser is used for a range of minor soft-tissue procedures, where it tends to mean less bleeding and a more comfortable recovery.",
          },
          {
            term: "Treating more than one tooth in a visit",
            text: "Without anaesthetic there is no need to numb a whole quadrant, so teeth on different sides of the mouth can often be dealt with in one appointment rather than two.",
          },
        ],
      },
      {
        kind: "list",
        heading: "What it does not replace",
        intro:
          "Being straight about the limits is the only way the rest of this page is worth anything:",
        items: [
          "Root canal treatment, which still requires conventional instrumentation and anaesthetic",
          "Extractions",
          "Crown preparation, which removes far more tooth structure than a filling",
          "Existing metal fillings, which a laser cannot remove",
          "Deep cavities close to the nerve, where anaesthetic is usually the kinder option anyway",
        ],
      },
      {
        kind: "prose",
        heading: "How to find out whether it suits your case",
        body: [
          "Ask when you book. Tell whoever answers that you would rather avoid the injection if it is possible, and we will look at whether your cavity is a candidate when you are examined. If it is not, we will say so rather than attempting it and stopping halfway.",
          "It is also worth saying that avoiding the needle is not the only thing that helps an anxious patient, and it is not the right lever for everyone. If what you dread is the chair, the sounds or the loss of control rather than the injection specifically, that is a different conversation and we would rather have it properly.",
        ],
      },
    ],
    faqs: [
      {
        q: "Does a laser filling really not need a shot?",
        a: "In many cases, no. The laser removes the heat, vibration and pressure that make a conventional filling uncomfortable, so a good proportion of routine cavities can be prepared without local anaesthetic. Whether yours is one of them depends on the size and depth of the cavity.",
      },
      {
        q: "Does it hurt?",
        a: "Most people describe a cool sensation and a fine water spray rather than pain. We do not describe it as painless, because some patients feel a twinge, especially on deeper cavities. If that happens we stop and offer anaesthetic in the usual way.",
      },
      {
        q: "Can children have laser fillings?",
        a: "Often, yes, and it is one of the situations where the difference is most worthwhile. A first dental experience without a needle or a drill sound tends to shape how a child feels about treatment for years afterwards.",
      },
      {
        q: "Can the laser replace my old metal fillings?",
        a: "No. A laser cannot remove existing metal restorations, so replacing an old filling still needs conventional instruments and, usually, anaesthetic.",
      },
      {
        q: "Is laser dentistry more expensive?",
        a: "The laser is a tool used during treatment rather than a separate service. Ask the practice for a written estimate for the work you actually need, which is the only figure that means anything.",
      },
    ],
    related: [
      { label: "Tooth-colored fillings", href: "/services/general-dentistry/fillings" },
      { label: "Our technology", href: "/advanced-dental-technology" },
      { label: "Cleanings and exams", href: "/services/general-dentistry/cleanings-exams" },
    ],
  },

  /* ====================================================================== 6 */
  {
    slug: "dental-anxiety-what-helps",
    title: "Dental anxiety is real: what actually helps",
    seoTitle: "Dental Anxiety: What Actually Helps",
    metaDescription:
      "Dental anxiety is not one thing. Whether you dread the needle, the sounds, the gag reflex or the loss of control changes what helps. A straight answer for nervous patients.",
    summary:
      "If you have been putting off the dentist for years, you are in ordinary company and there is nothing to be embarrassed about. What helps depends on what specifically you dread.",
    answer:
      "Dental anxiety is not a single fear, and treating it as one is why generic advice rarely helps. Some people dread the injection, some the sound and vibration of the drill, some the gag reflex, and some the feeling of not being in control or not knowing what is happening. Each of those has a different answer: needle-free laser treatment for the first, different scheduling and technique for the second and third, and clear explanation with an agreed stop signal for the fourth. The most useful step is telling the practice which one applies to you before you are in the chair, because it changes how the appointment is arranged.",
    published: PUBLISHED,
    updated: PUBLISHED,
    image: "/images/hygienist-with-child.jpg",
    imageAlt: "A hygienist putting a young patient at ease at Park Place Dental",
    readingMinutes: 6,
    topic: "Nervous patients",
    blocks: [
      {
        kind: "prose",
        heading: "It is more common than you think, and the gap makes it worse",
        body: [
          "A large share of adults feel some anxiety about dental treatment, and a meaningful number avoid it altogether. The difficulty is that avoidance compounds: small problems become larger ones, the eventual visit involves more treatment than it would have done, and that visit confirms the fear. Then the gap gets longer.",
          "Mississippi has some of the poorest oral health outcomes in the country, and access, distance and fear all contribute. If it has been five or ten or twenty years, you are not the exception here and you will not be lectured about it.",
        ],
      },
      {
        kind: "terms",
        heading: "Work out which fear is actually yours",
        intro:
          "These get lumped together as being scared of the dentist, but they are different problems with different solutions.",
        items: [
          {
            term: "The needle",
            text: "By far the most common single fear, and the one with the most direct answer. We use the Solea dental laser, and for many routine fillings that means little or no anaesthetic is needed, so there is no injection at all. Whether it suits your case depends on the cavity, so ask when you book.",
          },
          {
            term: "The sound and the vibration",
            text: "For some people the whine of the drill is worse than anything it does. The laser is markedly quieter, and there is no vibration because nothing rotates or touches the tooth. Bringing headphones and your own music is not a gimmick either: it genuinely helps, and nobody here will find it odd.",
          },
          {
            term: "Gagging",
            text: "A strong gag reflex is a physical response, not something you are doing wrong. It can usually be worked around with how you are positioned, what is used for impressions and how long anything stays in your mouth. Tell us before we start rather than after.",
          },
          {
            term: "Not being in control",
            text: "This one is about information and agency rather than technique. It helps to know what is going to happen before it happens, to have an agreed hand signal that stops everything immediately, and to know that stopping is a normal thing that people do.",
          },
          {
            term: "Embarrassment about the state of your teeth",
            text: "Extremely common and rarely talked about. It is worth saying plainly that we have seen it all, that nobody here is going to make you feel judged, and that we would far rather see you now than in another five years.",
          },
        ],
      },
      {
        kind: "steps",
        heading: "What a first visit can look like if you ask for it",
        intro:
          "You do not have to arrive and submit to whatever happens. This is a reasonable thing to request and we are used to it.",
        items: [
          {
            term: "Say so when you book",
            text: "Tell the front desk you are a nervous patient. It goes on your record before you arrive, so you do not have to explain yourself in a waiting room.",
          },
          {
            term: "Come and talk first, with nothing else planned",
            text: "A first appointment can be a conversation and a look, with no treatment at all. Some people need to see the room and meet the person before anything else is possible.",
          },
          {
            term: "Agree a stop signal",
            text: "A raised hand means everything stops. Not slows down, stops. Knowing that in advance changes how the whole appointment feels.",
          },
          {
            term: "Ask for a running commentary, or ask for none",
            text: "Some people are calmer knowing exactly what is happening next; others would rather not hear it. Both are fine, and it is worth saying which you are.",
          },
          {
            term: "Start small and build",
            text: "There is no rule that says everything must be fixed at once. Doing one straightforward thing, successfully, is often what makes the rest possible.",
          },
        ],
      },
      {
        kind: "callout",
        heading: "About sedation",
        body: "Some practices offer nitrous oxide or oral sedation for anxious patients. If sedation is what you are looking for, telephone the office and ask what we can arrange for your particular case rather than relying on this page, so that you get an accurate answer before you drive over. TODO(kalob): confirm whether the practice offers nitrous oxide and/or oral conscious sedation, and expand this section with the specifics if so.",
      },
      {
        kind: "prose",
        heading: "Why a small practice can help with this",
        body: [
          "Dr. Goodwin has practised in Booneville since 1982 and has treated three generations of some families here. That continuity matters more for nervous patients than for anybody else: seeing the same person each time, in a practice where the front desk knows who you are, removes a layer of unfamiliarity that a larger or more transient practice cannot.",
          "It also means appointments are not run against a stopwatch. If you need a few extra minutes at the start, there are a few extra minutes.",
        ],
      },
    ],
    faqs: [
      {
        q: "I have not been to a dentist in over ten years. Will you judge me?",
        a: "No, and it is one of the most common reasons people call us. Coming back after a long gap is an ordinary thing that ordinary people do. We start by finding out where things stand, then talk through what needs doing first and what can wait.",
      },
      {
        q: "Can I have a filling without an injection?",
        a: "Often, yes. We use the Solea dental laser, and for many routine fillings little or no anaesthetic is needed, which means no injection. Whether it suits your particular cavity depends on its size and position, so ask when you book and we will tell you honestly.",
      },
      {
        q: "Can I just come and look around first?",
        a: "Yes. A first appointment can be a conversation and an examination with no treatment planned at all. For a lot of nervous patients that is what makes a second appointment possible.",
      },
      {
        q: "What if I need to stop partway through?",
        a: "Then we stop. Agreeing a hand signal before we start is normal practice here, and using it is not a failure or an inconvenience.",
      },
      {
        q: "Do you see anxious children?",
        a: "Yes. Needle-free laser treatment is particularly useful with children, and so is letting a child sit in the chair, see the instruments and ask questions before anything happens.",
      },
    ],
    related: [
      { label: "Cleanings and exams", href: "/services/general-dentistry/cleanings-exams" },
      { label: "Tooth-colored fillings", href: "/services/general-dentistry/fillings" },
      { label: "New patient information", href: "/new-patients/new-patient-information" },
    ],
  },

  /* ====================================================================== 7 */
  {
    slug: "dentures-vs-implant-supported-dentures",
    title: "Full dentures or implant-supported dentures: which one fits your life?",
    seoTitle: "Dentures vs Implant-Supported Dentures",
    metaDescription:
      "A neutral comparison of conventional and implant-supported dentures: how each is held in place, bone loss, cost, maintenance and the adjustment period.",
    summary:
      "Both replace a full arch of teeth, and they suit different people for reasons that have little to do with which is better. Here is the comparison, set out plainly.",
    answer:
      "A conventional full denture rests on the gum and is held largely by suction and the shape of the ridge beneath it. An implant-supported denture clips onto a small number of implants placed in the jaw, so it is held mechanically and does not move in the same way. The implant-supported option is more stable, allows a wider range of foods, and helps slow the bone loss that continues under a conventional denture, but it costs considerably more and takes months rather than weeks because the implants must fuse with the bone first. A conventional denture is quicker, far less expensive, and needs no surgery.",
    published: PUBLISHED,
    updated: PUBLISHED,
    image: "/images/smile-closeup.jpg",
    imageAlt: "A patient smiling after restorative treatment at Park Place Dental",
    readingMinutes: 8,
    topic: "Comparisons",
    blocks: [
      {
        kind: "table",
        heading: "The comparison, side by side",
        intro:
          "Neither column is the right answer on its own. Which trade-offs matter is the whole question.",
        columns: ["", "Conventional full denture", "Implant-supported denture"],
        rows: [
          ["How it is held", "Suction and ridge shape, sometimes adhesive", "Clips onto implants placed in the jaw"],
          ["Movement when eating", "Can move, particularly the lower one", "Held firmly, very little movement"],
          ["Effect on jawbone", "Bone continues to shrink underneath", "Implants load the bone and help slow loss"],
          ["Time to complete", "Weeks", "Months, because implants must fuse first"],
          ["Surgery required", "None", "Yes, to place the implants"],
          ["Relative cost", "Considerably lower", "Considerably higher"],
          ["Ongoing maintenance", "Relines as the ridge changes shape", "Cleaning around implants, occasional clip replacement"],
        ],
      },
      {
        kind: "prose",
        heading: "The part nobody mentions until later: bone",
        body: [
          "When teeth come out, the bone that held them begins to shrink, because it is no longer being loaded by chewing. This carries on for years. It is why a denture that fitted beautifully at first gradually loosens, and why an older denture often looks too big for the face around it.",
          "A conventional denture sits on top of that process without changing it. Implants, because they transmit chewing forces into the bone, help slow it. This is the strongest clinical argument for the implant-supported route, and it is also the argument that matters most for people who are deciding in their fifties or sixties rather than their eighties.",
          "It also means the question is partly about timing. The longer you wear a conventional denture, the less bone there may be later if you change your mind and want implants.",
        ],
      },
      {
        kind: "terms",
        heading: "Which tends to suit whom",
        intro:
          "Generalisations with obvious exceptions, but they are the patterns we see.",
        items: [
          {
            term: "A conventional denture often suits",
            text: "People who want the problem solved in weeks rather than months, who would rather not have surgery, for whom cost is the deciding factor, or whose general health makes implant surgery inadvisable. An upper denture in particular is usually far more stable than people expect, because the palate provides suction.",
          },
          {
            term: "An implant-supported denture often suits",
            text: "People whose lower denture will not stay put, which is the single most common complaint in all of denture wearing; people who have found they are avoiding foods they want to eat; and people making the decision early enough that bone preservation is genuinely in play.",
          },
          {
            term: "Neither may be right yet",
            text: "If you still have several sound natural teeth, keeping them is generally worth more than any replacement. A partial denture or a bridge may be the better answer, and we would rather say so than move you to a full arch prematurely.",
          },
        ],
      },
      {
        kind: "prose",
        heading: "What the adjustment period is actually like",
        body: [
          "Both options need an adjustment period, and both involve sore spots in the early days. That is normal and it is fixed with small adjustments rather than by waiting it out: a denture that rubs needs seeing, not enduring.",
          "Speaking and eating both take practice. Most people are through the worst of it within a few weeks. Starting with softer foods and cutting things smaller is standard advice and it works.",
          "Because our dental laboratory is in the building, those early adjustments are usually a short visit rather than another wait. For people driving in from Corinth, Ripley or Fulton, that tends to matter more than anything else on this page.",
        ],
      },
      {
        kind: "prose",
        heading: "What it costs, and how to find out",
        body: [
          "An implant-supported denture costs considerably more than a conventional one, because you are paying for the implants, the surgery to place them and the denture itself. How much more depends on how many implants are used, whether bone grafting is needed, and which system is chosen.",
          "Rather than quote a figure that may not apply to you, we would rather examine you and give you a written estimate that itemises each part. If cost is the deciding factor, say so early: it changes what is worth discussing, and there is no sense planning treatment you do not want to pay for.",
        ],
      },
      {
        kind: "list",
        heading: "Questions to ask before you decide",
        items: [
          "How much bone do I have, and does that rule anything in or out?",
          "If I choose a conventional denture now, does that limit my options later?",
          "How many implants would my case need, and why that number?",
          "How many appointments, and over how long?",
          "What does maintenance look like in five years for each option?",
          "Where is the denture made, and how quickly can it be adjusted or repaired?",
        ],
      },
    ],
    faqs: [
      {
        q: "Why does my lower denture move so much more than my upper one?",
        a: "An upper denture covers the palate, which gives it a large surface for suction. A lower denture has to sit on a narrow ridge with the tongue and cheek muscles moving against it constantly, and there is simply less to hold it. It is the most common complaint in denture wearing and the most common reason people consider implants.",
      },
      {
        q: "Do implant-supported dentures come out?",
        a: "Most designs clip onto the implants and are taken out for cleaning, which is generally recommended because it makes hygiene around the implants much easier. Fixed designs that stay in place also exist and are cleaned differently.",
      },
      {
        q: "Will a denture stop my jawbone shrinking?",
        a: "No. Bone loss after tooth loss continues under a conventional denture, which is why dentures loosen over the years and need relining. Implants help slow it, because they transmit chewing forces into the bone.",
      },
      {
        q: "How long do dentures last?",
        a: "A well-made denture commonly lasts several years, but the mouth beneath it keeps changing shape, so relines are usually needed along the way. Regular check-ups matter for denture wearers just as much as for people with natural teeth.",
      },
      {
        q: "Can I switch from a conventional denture to implants later?",
        a: "Often, though it depends on how much bone remains by then. That is the practical reason for having the conversation earlier rather than later, even if you choose the conventional route for now.",
      },
    ],
    related: [
      { label: "Dentures", href: "/services/restorative-dentistry/dentures" },
      { label: "Dental implants", href: "/services/restorative-dentistry/dental-implants" },
      { label: "Implant costs explained", href: "/patient-resources/blog/dental-implant-cost-north-mississippi" },
    ],
  },
];

export function findPost(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}

/** Newest first, which is how the index lists them. */
export const postsByDate = [...posts].sort((a, b) =>
  b.published.localeCompare(a.published),
);

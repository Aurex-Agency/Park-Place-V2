/** Patient education with stable URLs, explicit editorial dates and source links. */

import { treatmentGuides } from "./treatment-guides";
import { patientDecisionGuides } from "./patient-decision-guides";

export type PostBlock =
  | { kind: "prose"; heading?: string; body: string[] }
  | { kind: "list"; heading?: string; intro?: string; items: string[] }
  | { kind: "terms"; heading?: string; intro?: string; items: { term: string; text: string }[] }
  | { kind: "steps"; heading?: string; intro?: string; items: { term: string; text: string }[] }
  | { kind: "callout"; heading: string; body: string }
  /**
   * Named sources, or the pages a reader should go to next.
   *
   * Added because every article on this site made clinical and regulatory
   * claims and cited nothing: the VA piece named va.gov twice as "the
   * authoritative source" without ever linking it. On health content that is
   * the one checkable signal a small practice can offer in place of the
   * institutional weight it does not have.
   */
  | {
      kind: "links";
      heading?: string;
      intro?: string;
      items: { label: string; href: string; note?: string }[];
    }
  | {
      kind: "table";
      heading?: string;
      intro?: string;
      columns: string[];
      rows: string[][];
    };

export type Post = {
  /** Practice editorial articles must not claim a clinician reviewed them. */
  author?: "doctor" | "practice";
  /** Editorial changes are not evidence of a fresh clinical review. */
  reviewed?: boolean;
  relatedSlugs?: string[];
  cta?: { heading: string; body: string };
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
  related: { label: string; href: string }[];
};

export const posts: Post[] = [
  ...patientDecisionGuides,
  ...treatmentGuides,
  {
    "slug": "dental-emergency-first-hour",
    "title": "Cracked a tooth or knocked one out? What to do in the first hour",
    "seoTitle": "Dental Emergency? What to Do First",
    "metaDescription": "Knocked-out tooth, cracked tooth, lost filling or swelling: what to do in the first hour, when to go to an ER instead, and how to reach an emergency dentist in North Mississippi.",
    "summary": "A knocked-out tooth has its best chance in the first hour. Here is what to do for each kind of dental emergency, and how to tell what needs a dentist today from what needs a hospital now.",
    "answer": "If you have knocked out a permanent tooth, pick it up by the crown rather than the root, keep it moist in milk or in your own saliva and never in water, and try to see a dentist within an hour. For a cracked or broken tooth, rinse gently with warm water, use a cold compress on the outside of the face for swelling, and avoid chewing on that side. For a lost filling or crown, keep the piece, keep the area clean, and call your dentist. Go to an emergency room instead if you have a suspected broken jaw, bleeding you cannot control, or facial swelling that is affecting your breathing or swallowing.",
    "published": "2026-09-13",
    "updated": "2026-10-02",
    "image": "/images/goodwin-with-assistant.jpg",
    "imageAlt": "Dr. Ken Goodwin at the chair with a member of his team",
    "readingMinutes": 7,
    "topic": "Emergency care",
    "blocks": [
      {
        "kind": "steps",
        "heading": "A knocked-out permanent tooth",
        "intro": "This is the one true race against the clock in dentistry. A permanent tooth that is back in its socket quickly has a real chance of surviving; one that has been dry for hours usually does not.",
        "items": [
          {
            "term": "Pick it up by the crown",
            "text": "Handle the white chewing part, not the root. The cells on the root surface are what allow the tooth to reattach, and wiping or scrubbing them off is the most common way a savable tooth is lost."
          },
          {
            "term": "Rinse it only if it is dirty, and only briefly",
            "text": "Use milk, saline or the patient's own saliva. Do not scrub it, do not use soap, and do not leave it under a running tap."
          },
          {
            "term": "Put it back in the socket if you can",
            "text": "For an adult who is fully conscious, gently pushing the tooth back into its socket and biting softly on a clean cloth to hold it is the best possible transport. If that is not possible, move to the next step."
          },
          {
            "term": "Otherwise keep it in milk",
            "text": "Milk is the best widely available storage medium. Saliva works: the patient can hold the tooth inside the cheek if they are old enough not to swallow it. Water is the one thing to avoid, because it damages the root cells quickly."
          },
          {
            "term": "Get to a dentist inside an hour if you possibly can",
            "text": "Telephone on the way so the practice can be ready for you rather than finding out when you walk in."
          }
        ]
      },
      {
        "kind": "callout",
        "heading": "Baby teeth are the exception",
        "body": "A knocked-out baby tooth should not be put back in. Replanting it risks damaging the permanent tooth developing above it. Keep the child comfortable, control any bleeding with gentle pressure, and call the practice for advice rather than driving over immediately."
      },
      {
        "kind": "terms",
        "heading": "Other emergencies, and what each one needs",
        "items": [
          {
            "term": "A cracked or broken tooth",
            "text": "Rinse gently with warm water, hold a cold compress against the outside of the face to limit swelling, and keep any pieces. Avoid chewing on that side. How urgent it is depends less on the size of the break than on whether the inner pulp is exposed, which is why pain on air or cold is worth mentioning when you call."
          },
          {
            "term": "A lost filling or crown",
            "text": "Keep the piece and bring it with you. Avoid chewing on that side, and keep the area clean. A crown that has come off cleanly can often be recemented. Temporary dental cement from a pharmacy can protect the tooth for a day or two, but it is a stopgap and not a repair."
          },
          {
            "term": "Severe toothache",
            "text": "Pain that keeps you awake, throbs, or lingers after heat or cold is usually a sign the nerve is inflamed or infected. Over-the-counter pain relief taken as directed can hold you until you are seen. Do not put aspirin directly against the gum, which burns the tissue rather than helping."
          },
          {
            "term": "Swelling in the gum or face",
            "text": "Swelling suggests infection, and infection in the mouth can spread. This is the symptom on this page most worth acting on quickly, even when the pain itself is manageable."
          },
          {
            "term": "Something stuck between teeth",
            "text": "Try dental floss gently. Do not use a pin, a knife or anything metal, which is a reliable way of turning a small problem into a bigger one."
          }
        ]
      },
      {
        "kind": "list",
        "heading": "When it is a hospital rather than a dentist",
        "intro": "Most dental problems are better handled by a dentist, because a hospital can usually manage the pain without treating the cause. These are the exceptions, and they are genuine emergencies:",
        "items": [
          "A suspected broken or dislocated jaw",
          "Bleeding that will not stop with fifteen minutes of firm pressure",
          "Facial swelling that is affecting your breathing or your swallowing",
          "Swelling around the eye, or spreading down the neck",
          "A significant head injury alongside the dental injury"
        ]
      },
      {
        "kind": "prose",
        "heading": "Call before travelling",
        "body": [
          "Call (662) 728-8171, describe what happened and ask about appointment availability. Mention a knocked-out tooth, facial swelling or uncontrolled bleeding immediately. An online appointment request is not a confirmed urgent appointment.",
          "If the office is closed or cannot see you promptly, seek another urgent dental provider. For trouble breathing or swallowing, uncontrolled bleeding or a suspected broken jaw, seek emergency medical care."
        ]
      },
      {
        "kind": "prose",
        "heading": "Bring useful information",
        "body": [
          "Note when the injury happened and tell the treating professional about relevant medicines or health conditions. Keep any broken dental appliance or restoration to show the dentist. Ask where to go and what to bring before starting the journey."
        ]
      },
      {
        "kind": "links",
        "intro": "The drive from the towns we are asked about most:",
        "items": [
          {
            "label": "Baldwyn",
            "href": "/locations/baldwyn-ms",
            "note": "about fifteen minutes on US-45"
          },
          {
            "label": "Corinth",
            "href": "/locations/corinth-ms",
            "note": "about half an hour south on US-45"
          },
          {
            "label": "New Albany",
            "href": "/locations/new-albany-ms",
            "note": "about forty minutes"
          },
          {
            "label": "Ripley",
            "href": "/locations/ripley-ms",
            "note": "about forty minutes"
          },
          {
            "label": "Fulton",
            "href": "/locations/fulton-ms",
            "note": "about thirty-five minutes"
          },
          {
            "label": "Tupelo",
            "href": "/locations/tupelo-ms",
            "note": "about forty minutes north on US-45"
          }
        ]
      },
      {
        "kind": "links",
        "heading": "Sources and further reading",
        "items": [
          {
            "label": "ADA: first steps for dental emergencies",
            "href": "https://www.mouthhealthy.org/all-topics-a-z/dental-emergencies"
          }
        ]
      }
    ],
    "faqs": [
      {
        "q": "How long do I have to save a knocked-out tooth?",
        "a": "The best chance is within the first hour, and sooner is better throughout that hour. After a tooth has been out and dry for longer, replanting becomes progressively less likely to succeed, though it is still worth bringing the tooth with you."
      },
      {
        "q": "Can I put a knocked-out tooth in water?",
        "a": "No. Water damages the delicate cells on the root surface that allow the tooth to reattach. Milk is the best widely available option, and the patient's own saliva works too."
      },
      {
        "q": "Should I go to the emergency room for a toothache?",
        "a": "Usually not. A hospital can generally manage pain and prescribe antibiotics but cannot treat the tooth itself, so most people end up needing a dentist afterwards anyway. Go to an emergency room for a suspected broken jaw, uncontrolled bleeding, or swelling affecting your breathing."
      },
      {
        "q": "Do you see emergency patients who are not already registered here?",
        "a": "Yes. You do not need to be an existing patient for us to see you in an emergency. Call the office and describe what has happened."
      },
      {
        "q": "What if my denture breaks?",
        "a": "Call before travelling and bring the denture and any pieces to the assessment. Ask about repair options and turnaround after the damage and fit have been examined."
      }
    ],
    "related": [
      {
        "label": "Emergency dentistry",
        "href": "/services/general-dentistry/emergency-dentistry"
      },
      {
        "label": "Crowns and bridges",
        "href": "/services/restorative-dentistry/crowns-bridges"
      },
      {
        "label": "Root canal treatment",
        "href": "/services/general-dentistry/root-canals"
      }
    ],
    "reviewed": false
  },
  {
    "slug": "va-dental-benefits-mississippi",
    "title": "VA dental benefits in Mississippi: what veterans need to know before booking",
    "seoTitle": "VA Dental Benefits in Mississippi",
    "metaDescription": "Most enrolled veterans do not qualify for comprehensive VA dental care. The eligibility classes explained in plain English, plus what to check before you book.",
    "summary": "Being enrolled in VA health care and being eligible for VA dental care are two different things, and the gap between them catches a lot of people out. Here is how the eligibility classes actually work.",
    "answer": "VA dental coverage depends on your eligibility class; enrollment in VA health care alone does not establish comprehensive dental benefits. Check your circumstances with VA. If you plan to see a community dentist using VA benefits, confirm the required referral or authorization and covered care before booking treatment.",
    "published": "2026-09-13",
    "updated": "2026-10-02",
    "image": "/images/dr-goodwin-hallway.jpg",
    "imageAlt": "Dr. Ken Goodwin in the hallway at Park Place Dental",
    "readingMinutes": 8,
    "topic": "Veterans",
    "blocks": [
      {
        "kind": "prose",
        "heading": "Let VA confirm the benefit that applies to you",
        "body": [
          "VA assigns dental benefits through eligibility classes. Some provide broad care, while others cover limited treatment tied to particular circumstances. Do not assume a disability rating, discharge history or enrollment status means every dental service will be paid for.",
          "Check VA’s eligibility page and ask VA to explain your own classification. Keep the written decision so you can discuss it with the office arranging care."
        ]
      },
      {
        "kind": "links",
        "heading": "Sources and further reading",
        "items": [
          {
            "label": "VA: dental care eligibility and benefit classes",
            "href": "https://www.va.gov/health-care/about-va-health-benefits/dental-care/"
          }
        ]
      },
      {
        "kind": "list",
        "heading": "Separate eligibility, authorization and the appointment",
        "items": [
          "Ask VA which dental benefits apply to you.",
          "Confirm whether community care is authorized and which provider and services it covers.",
          "Check the authorization period and any limits before treatment.",
          "Call the dental office to confirm that it can accept the current referral and arrange the visit.",
          "Ask whom to contact if the recommended treatment differs from the authorized services."
        ]
      },
      {
        "kind": "prose",
        "heading": "Buying dental insurance is a different route",
        "body": [
          "VA also describes the VA Dental Insurance Program for eligible people who want to buy dental insurance. Insurance enrollment is different from being granted a VA dental benefit or a community-care authorization. Check current plan terms and the dentist’s participation before choosing an appointment."
        ]
      },
      {
        "kind": "links",
        "heading": "Sources and further reading",
        "items": [
          {
            "label": "VA Dental Insurance Program",
            "href": "https://www.va.gov/health-care/about-va-health-benefits/dental-care/dental-insurance/"
          }
        ]
      },
      {
        "kind": "prose",
        "heading": "Before calling Park Place Dental",
        "body": [
          "Have your referral or authorization information available, but do not put medical records or claim details into a general website message. Call (662) 728-8171 and ask how to provide the documents the office needs.",
          "Park Place Dental is at 403 N 3rd St in Booneville. Confirm both coverage arrangements and appointment availability before travelling. The practice cannot grant VA eligibility or promise payment on VA’s behalf."
        ]
      }
    ],
    "faqs": [
      {
        "q": "Does being enrolled in VA health care cover all dental work?",
        "a": "No. Dental benefits depend on your eligibility class. Ask VA which care you qualify for before arranging treatment."
      },
      {
        "q": "Can I choose any dentist and ask VA to pay later?",
        "a": "Do not assume reimbursement. Confirm referral or authorization requirements, provider acceptance and covered services before receiving community dental care."
      },
      {
        "q": "Can the office decide my VA eligibility?",
        "a": "VA determines eligibility. The office can discuss appointment arrangements and the referral information it needs."
      }
    ],
    "related": [
      {
        "label": "Care for veterans",
        "href": "/veterans"
      },
      {
        "label": "Insurance and financing",
        "href": "/new-patients/insurance-financing"
      },
      {
        "label": "Dentures and repairs",
        "href": "/services/restorative-dentistry/dentures"
      }
    ],
    "reviewed": false
  },
  {
    "slug": "in-house-dental-lab-same-day",
    "title": "How our in-house dental lab supports your treatment",
    "seoTitle": "Our In-House Dental Lab in Booneville",
    "metaDescription": "Learn how our Booneville dental lab supports crowns and dentures, what can affect turnaround, and what to ask before arranging treatment.",
    "summary": "An on-site lab can support restorative care. The useful questions are what your treatment needs, where each stage happens and when you can expect the work.",
    "answer": "Park Place Dental has an in-house dental laboratory in Booneville. It supports restorative work such as crowns and dentures, but having a lab on site does not guarantee that every case can be completed in one visit. Ask the team to confirm the proposed work, laboratory schedule and follow-up appointments after an assessment.",
    "published": "2026-09-13",
    "updated": "2026-10-02",
    "image": "/images/milling-unit.jpg",
    "imageAlt": "A CEREC milling unit in the Park Place Dental in-house lab",
    "readingMinutes": 6,
    "topic": "Technology",
    "blocks": [
      {
        "kind": "prose",
        "heading": "Start with the treatment, not the equipment",
        "body": [
          "A crown, denture repair and new denture solve different problems. Tell the office what changed and what you need help with. The dentist first needs to assess the tooth, denture or fit before discussing what the lab can do.",
          "For example, a loose denture may need attention to its fit rather than a repair to a broken part. An appointment request should describe the problem; you do not need to select the laboratory procedure yourself."
        ]
      },
      {
        "kind": "list",
        "heading": "Questions for your treatment plan",
        "items": [
          "Which stages will take place at the Booneville office?",
          "Will any part of the work need an outside laboratory or referral?",
          "How many assessment, preparation, fitting and follow-up visits should I expect?",
          "When can you confirm whether same-day care is suitable?",
          "What does the written estimate include?"
        ]
      },
      {
        "kind": "prose",
        "heading": "Turnaround depends on your case",
        "body": [
          "The condition of the tooth or denture, the planned materials and the schedule can all affect timing. Some cases need additional care before a restoration can be fitted. Call before travelling and confirm the plan with the office.",
          "If you need an existing denture repaired, ask how long you may be without it. If you are arranging a crown, ask whether you will need a temporary restoration and a separate fitting appointment."
        ]
      },
      {
        "kind": "prose",
        "heading": "An in-house lab does not establish a lower fee",
        "body": [
          "Compare the complete treatment estimate, including assessment, preparation, laboratory work and follow-up. Do not assume a particular saving simply because the lab is on site. Ask which items are included and what might change the estimate."
        ]
      },
      {
        "kind": "links",
        "heading": "Sources and further reading",
        "items": [
          {
            "label": "Compare same-day and traditional crowns",
            "href": "/patient-resources/blog/same-day-vs-traditional-crowns"
          },
          {
            "label": "Denture repair, reline or replacement",
            "href": "/patient-resources/blog/broken-denture-repair-reline-replacement"
          }
        ]
      }
    ],
    "faqs": [
      {
        "q": "Can I book a guaranteed same-day repair?",
        "a": "Call for an assessment first. The dentist needs to inspect the damage and fit before the team can confirm repair options and timing."
      },
      {
        "q": "Does an in-house lab make treatment cheaper?",
        "a": "The lab’s location does not establish the total fee. Ask for a written estimate covering the complete treatment."
      }
    ],
    "related": [
      {
        "label": "Crowns and bridges",
        "href": "/services/restorative-dentistry/crowns-bridges"
      },
      {
        "label": "Dentures and repairs",
        "href": "/services/restorative-dentistry/dentures"
      },
      {
        "label": "Our technology",
        "href": "/advanced-dental-technology"
      }
    ],
    "reviewed": false,
    "relatedSlugs": [
      "same-day-vs-traditional-crowns",
      "broken-denture-repair-reline-replacement"
    ]
  },
  {
    "slug": "dental-implant-cost-north-mississippi",
    "title": "Dental implant costs in North Mississippi: what affects your estimate?",
    "seoTitle": "Dental Implant Cost in North Mississippi",
    "metaDescription": "An implant has three separately priced parts, and the total depends on your case. What actually drives the number, what changes it, and how to read a treatment estimate.",
    "summary": "Most implant cost articles quote one national average that may have nothing to do with your case. This one explains what the number is actually made of, so you can read an estimate properly.",
    "answer": "A dental implant estimate may include the implant, connector and final restoration, together with assessment, imaging and any preparation needed. Practices may bundle fees or list them separately. Ask for a written estimate that identifies the complete plan, likely visits, exclusions and possible additional costs after an examination.",
    "published": "2026-09-13",
    "updated": "2026-10-02",
    "image": "/images/implant-planning-closeup.jpg",
    "imageAlt": "An implant's angle and depth planned on a 3D scan",
    "readingMinutes": 8,
    "topic": "Costs",
    "blocks": [
      {
        "kind": "callout",
        "heading": "Ask for an estimate for your case",
        "body": "This article does not quote a treatment price. Ask for a written plan based on your examination, with the included stages and potential additional costs explained."
      },
      {
        "kind": "prose",
        "heading": "Understand what is included",
        "body": [
          "Ask whether the estimate includes the implant, connector and final crown or other restoration. They are parts of the treatment, but they are not always billed as separate items. Compare like-for-like plans rather than a headline price.",
          "Ask separately about assessment, imaging, any extraction or grafting, temporary teeth, anesthesia and follow-up. If another provider will perform a stage, ask how that fee will be quoted."
        ]
      },
      {
        "kind": "prose",
        "heading": "Why two treatment plans may differ",
        "body": [
          "The number of teeth involved, the condition of the mouth, the proposed restoration and any preparatory care affect the plan. Ask the dentist which findings change your options and which parts of the estimate remain uncertain.",
          "RAYFace captures the surface of the face to help discuss appearance. A facial scan is not an X-ray or an assessment of jawbone; ask which dental imaging is needed for your case."
        ]
      },
      {
        "kind": "prose",
        "heading": "Check your dental plan directly",
        "body": [
          "Ask your insurer about covered procedures, exclusions, benefit limits and your expected share. A pre-treatment estimate can help you understand benefits, but ask whether it guarantees payment and what could change. Confirm office participation and payment arrangements before treatment."
        ]
      },
      {
        "kind": "list",
        "heading": "Questions worth asking before you commit",
        "intro": "Take these to any practice, including this one. A good answer to all six tells you more than a headline price does.",
        "items": [
          "Does this estimate include the post, the abutment and the crown, or only some of them?",
          "Is imaging included, and is grafting likely in my case?",
          "How many appointments will this take, and over how many months?",
          "Where is the crown made, and how long does a remake take if it needs adjusting?",
          "What happens, and what does it cost, if the implant does not integrate?",
          "What are my alternatives, and what would you do in my position?"
        ]
      },
      {
        "kind": "prose",
        "heading": "Compare suitable alternatives",
        "body": [
          "An implant is one possible tooth-replacement option. Ask whether a bridge or denture is appropriate and compare the full treatment, maintenance and follow-up plans. The least expensive first procedure may not describe the full course of care."
        ]
      },
      {
        "kind": "links",
        "heading": "Sources and further reading",
        "items": [
          {
            "label": "ADA: dental implants",
            "href": "https://www.mouthhealthy.org/all-topics-a-z/implants"
          },
          {
            "label": "Compare implants, bridges and partial dentures",
            "href": "/patient-resources/blog/implants-bridges-partial-dentures"
          }
        ]
      }
    ],
    "faqs": [
      {
        "q": "Are implant parts always charged separately?",
        "a": "No. Fees may be bundled or itemized. Ask what the complete estimate includes so you can compare plans fairly."
      },
      {
        "q": "Does a facial scan show whether I have enough bone?",
        "a": "No. A facial surface scan does not replace the dental imaging and assessment needed to evaluate the jawbone."
      },
      {
        "q": "Will insurance cover the whole plan?",
        "a": "Coverage varies. Check the procedures, limits and expected payment with your insurer and the office before proceeding."
      }
    ],
    "related": [
      {
        "label": "Dental implants",
        "href": "/services/restorative-dentistry/dental-implants"
      },
      {
        "label": "Dentures",
        "href": "/services/restorative-dentistry/dentures"
      },
      {
        "label": "Insurance and financing",
        "href": "/new-patients/insurance-financing"
      }
    ],
    "reviewed": false
  },
  {
    "slug": "solea-laser-dentistry-without-the-needle",
    "title": "Solea laser dentistry: when numbing may still be needed",
    "seoTitle": "Solea Laser Dentistry & Numbing",
    "metaDescription": "Ask how Solea laser dentistry may fit your care, when anesthetic may still be needed, and how to discuss comfort at our Booneville office.",
    "summary": "A laser is one tool in a treatment plan. Ask whether it suits your tooth and how discomfort will be managed before deciding what to expect.",
    "answer": "Park Place Dental uses a Solea dental laser. Some treatments may require less local anesthetic, but a laser is not a promise of an injection-free or painless visit. The dentist must assess the tooth and procedure and discuss a comfort plan with you.",
    "published": "2026-09-13",
    "updated": "2026-10-02",
    "image": "/images/mcdougald-procedure-loupes.jpg",
    "imageAlt": "Dr. Rebecca McDougald working under magnifying loupes at Park Place Dental",
    "readingMinutes": 6,
    "topic": "Technology",
    "blocks": [
      {
        "kind": "prose",
        "heading": "Ask whether the laser fits the work you need",
        "body": [
          "Tell the dentist what concerns you about treatment. If avoiding an injection matters to you, say so before the procedure and ask whether laser treatment is suitable. A tool that works for one cavity may not be appropriate for another.",
          "Do not postpone necessary assessment while waiting for a specific technique. The examination helps establish both the treatment and comfort options."
        ]
      },
      {
        "kind": "list",
        "heading": "Agree on a comfort plan",
        "items": [
          "Ask what sensations to expect during the proposed procedure.",
          "Discuss whether local anesthetic is recommended and why.",
          "Agree on a signal to pause if you need a break.",
          "Tell the team if you feel pain; avoiding an injection should not require enduring it.",
          "Ask what changes if the dentist needs to use another instrument."
        ]
      },
      {
        "kind": "prose",
        "heading": "Do not assume every procedure can use the same approach",
        "body": [
          "Fillings, root canal treatment, extractions and restorative preparation are different procedures. Ask which instruments and anesthetic your plan requires. The presence of a laser does not establish that it replaces all other instruments.",
          "If anxiety is about sounds, gagging or uncertainty rather than an injection, explain that too. A useful plan should address your actual concern."
        ]
      },
      {
        "kind": "links",
        "heading": "Sources and further reading",
        "items": [
          {
            "label": "ADA: discussing dental anxiety and comfort",
            "href": "https://www.mouthhealthy.org/all-topics-a-z/anxiety"
          },
          {
            "label": "Our dental technology",
            "href": "/advanced-dental-technology"
          },
          {
            "label": "Preparing for care when you feel anxious",
            "href": "/patient-resources/blog/dental-anxiety-what-helps"
          }
        ]
      }
    ],
    "faqs": [
      {
        "q": "Does a laser guarantee I will not need numbing?",
        "a": "No. Whether anesthetic is needed depends on the procedure and your comfort. Ask the dentist what is appropriate for your case."
      },
      {
        "q": "What if I am uncomfortable during treatment?",
        "a": "Tell the team and use the agreed pause signal. Discuss comfort measures before continuing."
      },
      {
        "q": "Is there a separate laser fee?",
        "a": "Ask for the written estimate for your proposed treatment and what it includes. Do not infer a fee from the equipment used."
      }
    ],
    "related": [
      {
        "label": "Tooth-colored fillings",
        "href": "/services/general-dentistry/fillings"
      },
      {
        "label": "Our technology",
        "href": "/advanced-dental-technology"
      },
      {
        "label": "Cleanings and exams",
        "href": "/services/general-dentistry/cleanings-exams"
      }
    ],
    "reviewed": false
  },
  {
    "slug": "dental-anxiety-what-helps",
    "title": "Dental anxiety is real: what actually helps",
    "seoTitle": "Dental Anxiety: What Actually Helps",
    "metaDescription": "Dental anxiety is not one thing. Whether you dread the needle, the sounds, the gag reflex or the loss of control changes what helps. A straight answer for nervous patients.",
    "summary": "If you have been putting off the dentist for years, you are in ordinary company and there is nothing to be embarrassed about. What helps depends on what specifically you dread.",
    "answer": "Tell the dental team what worries you before your appointment: an injection, noise, gagging, cost or not knowing what will happen. Ask for an explanation of the visit and agree on a way to request a pause. The right comfort plan depends on the person and the treatment.",
    "published": "2026-09-13",
    "updated": "2026-10-02",
    "image": "/images/hygienist-with-child.jpg",
    "imageAlt": "A hygienist putting a young patient at ease at Park Place Dental",
    "readingMinutes": 6,
    "topic": "Nervous patients",
    "blocks": [
      {
        "kind": "prose",
        "heading": "Make the first call easier",
        "body": [
          "You can say: “I have put off dental care because I feel anxious. I would like to understand what will happen at the first appointment and discuss ways to make it manageable.” You do not need to explain every previous experience to request that conversation.",
          "If a particular sound, position or procedure has been difficult, mention it. Ask what can be arranged before arriving rather than assuming a specific accommodation is available."
        ]
      },
      {
        "kind": "list",
        "heading": "Questions you can bring",
        "items": [
          "Can you explain the next step before starting it?",
          "What signal can I use to ask for a pause?",
          "Which parts of this appointment are an assessment and which are treatment?",
          "How will discomfort be managed?",
          "Can we discuss the estimate before scheduling treatment?"
        ]
      },
      {
        "kind": "links",
        "heading": "Sources and further reading",
        "items": [
          {
            "label": "ADA: ways to discuss and manage dental anxiety",
            "href": "https://www.mouthhealthy.org/all-topics-a-z/anxiety"
          }
        ]
      },
      {
        "kind": "prose",
        "heading": "Ask about comfort without assuming sedation",
        "body": [
          "Local anesthetic and sedation are different. If you want to discuss sedation, ask the practice which options it provides and whether another provider is needed. Do not take medication for an appointment without discussing it with the treating clinician.",
          "A laser may be an option for some care, but it is not a universal solution to anxiety or a guarantee that you can avoid numbing."
        ]
      },
      {
        "kind": "prose",
        "heading": "Returning after a long gap",
        "body": [
          "Begin by arranging an assessment. Ask the dentist to explain what needs attention, what choices you have and which stages can be scheduled separately. An online article cannot determine how much treatment you need.",
          "Call Park Place Dental at (662) 728-8171 to discuss an appointment in Booneville. If you are in pain, say so when calling so the team can discuss the appropriate next step."
        ]
      }
    ],
    "faqs": [
      {
        "q": "Can I ask for a break?",
        "a": "Discuss a pause signal before treatment starts and tell the team when you need a break."
      },
      {
        "q": "Does a first visit commit me to a treatment plan?",
        "a": "Ask what the appointment includes. You can discuss recommendations, alternatives and costs before agreeing to subsequent treatment."
      },
      {
        "q": "Will I be offered sedation?",
        "a": "Ask the office which comfort options are available and suitable for you. Do not assume a particular form of sedation is offered."
      }
    ],
    "related": [
      {
        "label": "Cleanings and exams",
        "href": "/services/general-dentistry/cleanings-exams"
      },
      {
        "label": "Tooth-colored fillings",
        "href": "/services/general-dentistry/fillings"
      },
      {
        "label": "New patient information",
        "href": "/new-patients/new-patient-information"
      }
    ],
    "reviewed": false
  },
  {
    "slug": "dentures-vs-implant-supported-dentures",
    "title": "Full dentures or implant-supported dentures: which one fits your life?",
    "seoTitle": "Dentures vs Implant-Supported Dentures",
    "metaDescription": "A neutral comparison of conventional and implant-supported dentures: how each is held in place, bone loss, cost, maintenance and the adjustment period.",
    "summary": "Both replace a full arch of teeth, and they suit different people for reasons that have little to do with which is better. Here is the comparison, set out plainly.",
    "answer": "A conventional full denture rests on the gum and is held largely by suction and the shape of the ridge beneath it. An implant-supported denture clips onto a small number of implants placed in the jaw, so it is held mechanically and does not move in the same way. The implant-supported option is more stable, allows a wider range of foods, and helps slow the bone loss that continues under a conventional denture, but it costs considerably more and takes months rather than weeks because the implants must fuse with the bone first. A conventional denture is quicker, far less expensive, and needs no surgery.",
    "published": "2026-09-13",
    "updated": "2026-10-02",
    "image": "/images/inlab-milling-unit.jpg",
    "imageAlt": "A milling unit in the Park Place Dental in-house lab",
    "readingMinutes": 8,
    "topic": "Comparisons",
    "blocks": [
      {
        "kind": "table",
        "heading": "The comparison, side by side",
        "intro": "Neither column is the right answer on its own. Which trade-offs matter is the whole question.",
        "columns": [
          "",
          "Conventional full denture",
          "Implant-supported denture"
        ],
        "rows": [
          [
            "How it is held",
            "Suction and ridge shape, sometimes adhesive",
            "Clips onto implants placed in the jaw"
          ],
          [
            "Movement when eating",
            "Can move, particularly the lower one",
            "Held firmly, very little movement"
          ],
          [
            "Effect on jawbone",
            "Bone continues to shrink underneath",
            "Implants load the bone and help slow loss"
          ],
          [
            "Time to complete",
            "Weeks",
            "Months, because implants must fuse first"
          ],
          [
            "Surgery required",
            "None",
            "Yes, to place the implants"
          ],
          [
            "Relative cost",
            "Considerably lower",
            "Considerably higher"
          ],
          [
            "Ongoing maintenance",
            "Relines as the ridge changes shape",
            "Cleaning around implants, occasional clip replacement"
          ]
        ]
      },
      {
        "kind": "prose",
        "heading": "Ask about the support for your denture",
        "body": [
          "A conventional denture and an implant-supported denture rely on different support. Ask the dentist to explain the condition of your mouth, whether implants are suitable and how each option would be maintained. Age alone should not substitute for an individual assessment."
        ]
      },
      {
        "kind": "list",
        "heading": "Compare the whole plan",
        "items": [
          "Is this a removable or fixed design, and how is it cleaned?",
          "Would surgery or other preparatory treatment be needed?",
          "Which components might need adjustment or replacement over time?",
          "How many treatment and follow-up appointments are expected?",
          "What alternatives are suitable for my remaining teeth and budget?"
        ]
      },
      {
        "kind": "prose",
        "heading": "Plan for follow-up after fitting",
        "body": [
          "New dentures can require an adjustment period and follow-up appointments to check fit. Contact the dentist about persistent soreness or irritation rather than trying to alter the denture yourself.",
          "Before leaving, ask how to clean your particular appliance and when to return. If you travel to Booneville for care, include those visits in your plan."
        ]
      },
      {
        "kind": "prose",
        "heading": "What it costs, and how to find out",
        "body": [
          "An implant-supported denture costs considerably more than a conventional one, because you are paying for the implants, the surgery to place them and the denture itself. How much more depends on how many implants are used, whether bone grafting is needed, and which system is chosen.",
          "Rather than quote a figure that may not apply to you, we would rather examine you and give you a written estimate that itemises each part. If cost is the deciding factor, say so early: it changes what is worth discussing, and there is no sense planning treatment you do not want to pay for."
        ]
      },
      {
        "kind": "list",
        "heading": "Questions to ask before you decide",
        "items": [
          "How much bone do I have, and does that rule anything in or out?",
          "If I choose a conventional denture now, does that limit my options later?",
          "How many implants would my case need, and why that number?",
          "How many appointments, and over how long?",
          "What does maintenance look like in five years for each option?",
          "Where is the denture made, and how quickly can it be adjusted or repaired?"
        ]
      },
      {
        "kind": "links",
        "heading": "Sources and further reading",
        "items": [
          {
            "label": "ADA: dentures and follow-up care",
            "href": "https://www.mouthhealthy.org/all-topics-a-z/dentures"
          },
          {
            "label": "Compare replacement options for one or several teeth",
            "href": "/patient-resources/blog/implants-bridges-partial-dentures"
          }
        ]
      }
    ],
    "faqs": [
      {
        "q": "Do all implant-supported dentures come out?",
        "a": "No. Removable and fixed designs exist. Ask which design is proposed and how you will clean it."
      },
      {
        "q": "Can my existing denture be used with implants?",
        "a": "The dentist must assess the denture and your mouth. Ask whether modification is appropriate or a new appliance would be needed."
      },
      {
        "q": "Do I still need dental visits with dentures?",
        "a": "Yes. Your dentist can check the tissues, appliance and fit and discuss adjustments or repair."
      }
    ],
    "related": [
      {
        "label": "Dentures",
        "href": "/services/restorative-dentistry/dentures"
      },
      {
        "label": "Dental implants",
        "href": "/services/restorative-dentistry/dental-implants"
      },
      {
        "label": "Implant costs explained",
        "href": "/patient-resources/blog/dental-implant-cost-north-mississippi"
      }
    ],
    "reviewed": false
  },
];

export function findPost(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}

/** Newest first, which is how the index lists them. */
export const postsByDate = [...posts].sort((a, b) =>
  b.published.localeCompare(a.published),
);

export function relatedPosts(post: Post, limit = 3): Post[] {
  const score = (candidate: Post) =>
    (post.relatedSlugs?.includes(candidate.slug) ? 100 : 0) +
    (candidate.topic === post.topic ? 10 : 0) +
    candidate.related.filter((link) => post.related.some((own) => own.href === link.href)).length;
  return posts.filter((candidate) => candidate.slug !== post.slug)
    .sort((a, b) => score(b) - score(a) || b.published.localeCompare(a.published) || a.slug.localeCompare(b.slug))
    .slice(0, limit);
}

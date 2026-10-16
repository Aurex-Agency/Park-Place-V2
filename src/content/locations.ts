/** One Booneville office; town pages describe planning a visit, not additional branches. */
export type Location = {
  slug: string;
  directionsHref: string;
  visitFocus: string;
  /** The town itself. */
  town: string;
  county: string;
  /** The town's own ZIP. People do search "dentist near 38829". */
  zip: string;
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


export const locations: Location[] = [
  {
    "slug": "booneville-ms",
    "town": "Booneville",
    "county": "Prentiss County",
    "zip": "38829",
    "home": true,
    "headline": "Visiting our / Booneville office",
    "title": "Visiting Our Booneville Dental Office",
    "metaDescription": "Find Park Place Dental at 403 N 3rd St in Booneville, MS. Check office hours, get map directions and prepare for your first appointment.",
    "lead": [
      "Park Place Dental welcomes Booneville patients at 403 N 3rd St, Booneville, MS 38829. This is our dental office.",
      "Use this page for the address, office hours and first-visit preparation. If you are calling between classes or work shifts, ask which appointments are available during the published office hours."
    ],
    "directions": [
      "Open the directions link and choose your starting address to check the current route and travel conditions.",
      "Confirm your appointment time before travelling. Call (662) 728-8171 if you need help finding the office or have access requirements."
    ],
    "comeFor": [
      {
        "term": "Find the office before your first visit",
        "text": "Bring your medication list, insurance details if applicable, and any records the team has requested. An online request is not a confirmed appointment."
      },
      {
        "term": "Discuss your options",
        "text": "An examination helps determine which care is appropriate. Ask for the recommended stages, likely visits and a written estimate before agreeing to treatment."
      }
    ],
    "context": [
      "Bring your medication list, insurance details if applicable, and any records the team has requested. An online request is not a confirmed appointment."
    ],
    "nearby": [
      "Thrasher",
      "Jumpertown",
      "Marietta",
      "Wheeler",
      "New Site"
    ],
    "services": [
      {
        "label": "Cleanings and exams",
        "href": "/services/general-dentistry/cleanings-exams"
      },
      {
        "label": "Emergency dentistry",
        "href": "/services/general-dentistry/emergency-dentistry"
      },
      {
        "label": "Crowns and bridges",
        "href": "/services/restorative-dentistry/crowns-bridges"
      },
      {
        "label": "Dentures and repairs",
        "href": "/services/restorative-dentistry/dentures"
      }
    ],
    "faqs": [
      {
        "q": "Is the office in Booneville?",
        "a": "Yes. Park Place Dental is at 403 N 3rd St, Booneville, MS 38829."
      },
      {
        "q": "Can treatment be completed in one visit?",
        "a": "That depends on the assessment, treatment and schedule. Call before travelling and ask which stages may require a return visit."
      },
      {
        "q": "How do I request an appointment?",
        "a": "Call (662) 728-8171 or use our appointment request form. The team must confirm the date and time. For an urgent dental problem, call rather than waiting for a form response."
      }
    ],
    "directionsHref": "https://www.google.com/maps/dir/?api=1&origin=Booneville%2C%20MS&destination=403%20N%203rd%20St%2C%20Booneville%2C%20MS%2038829",
    "visitFocus": "Find the office before your first visit"
  },
  {
    "slug": "rienzi-ms",
    "town": "Rienzi",
    "county": "Alcorn County",
    "zip": "38865",
    "title": "Dentist Serving Rienzi, MS",
    "metaDescription": "Planning dental care from Rienzi? Find our Booneville office, appointment information and treatment guides. Call Park Place Dental before travelling.",
    "lead": [
      "Park Place Dental welcomes Rienzi patients at 403 N 3rd St, Booneville, MS 38829. We do not have a separate office in Rienzi.",
      "For a cleaning or examination, tell the team when you were last seen and whether you have a specific concern. Ask whether records from another dentist would help before travelling from Rienzi."
    ],
    "directions": [
      "Open the directions link and choose your starting address to check the current route and travel conditions.",
      "Confirm your appointment time before travelling. Call (662) 728-8171 if you need help finding the office or have access requirements."
    ],
    "comeFor": [
      {
        "term": "Plan routine care around your visit",
        "text": "If several family members need care, ask about separate appointment times. The team needs to confirm availability for each person."
      },
      {
        "term": "Discuss your options",
        "text": "An examination helps determine which care is appropriate. Ask for the recommended stages, likely visits and a written estimate before agreeing to treatment."
      }
    ],
    "context": [
      "If several family members need care, ask about separate appointment times. The team needs to confirm availability for each person."
    ],
    "nearby": [
      "Glen",
      "Kossuth",
      "Jacinto",
      "Biggersville"
    ],
    "services": [
      {
        "label": "Cleanings and exams",
        "href": "/services/general-dentistry/cleanings-exams"
      },
      {
        "label": "Tooth-colored fillings",
        "href": "/services/general-dentistry/fillings"
      },
      {
        "label": "Emergency dentistry",
        "href": "/services/general-dentistry/emergency-dentistry"
      }
    ],
    "faqs": [
      {
        "q": "Is the office in Rienzi?",
        "a": "No. We welcome patients from Rienzi, but all appointments are at our Booneville office at 403 N 3rd St."
      },
      {
        "q": "Can treatment be completed in one visit?",
        "a": "That depends on the assessment, treatment and schedule. Call before travelling and ask which stages may require a return visit."
      },
      {
        "q": "How do I request an appointment?",
        "a": "Call (662) 728-8171 or use our appointment request form. The team must confirm the date and time. For an urgent dental problem, call rather than waiting for a form response."
      }
    ],
    "headline": "Dental care for Rienzi, / at our Booneville office",
    "directionsHref": "https://www.google.com/maps/dir/?api=1&origin=Rienzi%2C%20MS&destination=403%20N%203rd%20St%2C%20Booneville%2C%20MS%2038829",
    "visitFocus": "Plan routine care around your visit"
  },
  {
    "slug": "baldwyn-ms",
    "town": "Baldwyn",
    "county": "Prentiss and Lee Counties",
    "zip": "38824",
    "title": "Dentist Serving Baldwyn, MS",
    "metaDescription": "Planning dental care from Baldwyn? Find our Booneville office, appointment information and treatment guides. Call Park Place Dental before travelling.",
    "lead": [
      "Park Place Dental welcomes Baldwyn patients at 403 N 3rd St, Booneville, MS 38829. We do not have a separate office in Baldwyn.",
      "When arranging care from Baldwyn, give the team each patient’s age and reason for visiting. A first examination and treatment may need different appointments."
    ],
    "directions": [
      "Open the directions link and choose your starting address to check the current route and travel conditions.",
      "Confirm your appointment time before travelling. Call (662) 728-8171 if you need help finding the office or have access requirements."
    ],
    "comeFor": [
      {
        "term": "Bring the right information for a family visit",
        "text": "If a tooth has broken, call to explain the problem before requesting a routine cleaning. This helps the team discuss the appropriate visit."
      },
      {
        "term": "Discuss your options",
        "text": "An examination helps determine which care is appropriate. Ask for the recommended stages, likely visits and a written estimate before agreeing to treatment."
      }
    ],
    "context": [
      "If a tooth has broken, call to explain the problem before requesting a routine cleaning. This helps the team discuss the appropriate visit."
    ],
    "nearby": [
      "Wheeler",
      "Marietta",
      "Pratts",
      "Brewer"
    ],
    "services": [
      {
        "label": "Cleanings and exams",
        "href": "/services/general-dentistry/cleanings-exams"
      },
      {
        "label": "Emergency dentistry",
        "href": "/services/general-dentistry/emergency-dentistry"
      },
      {
        "label": "Crowns and bridges",
        "href": "/services/restorative-dentistry/crowns-bridges"
      }
    ],
    "faqs": [
      {
        "q": "Is the office in Baldwyn?",
        "a": "No. We welcome patients from Baldwyn, but all appointments are at our Booneville office at 403 N 3rd St."
      },
      {
        "q": "Can treatment be completed in one visit?",
        "a": "That depends on the assessment, treatment and schedule. Call before travelling and ask which stages may require a return visit."
      },
      {
        "q": "How do I request an appointment?",
        "a": "Call (662) 728-8171 or use our appointment request form. The team must confirm the date and time. For an urgent dental problem, call rather than waiting for a form response."
      }
    ],
    "headline": "Dental care for Baldwyn, / at our Booneville office",
    "directionsHref": "https://www.google.com/maps/dir/?api=1&origin=Baldwyn%2C%20MS&destination=403%20N%203rd%20St%2C%20Booneville%2C%20MS%2038829",
    "visitFocus": "Bring the right information for a family visit"
  },
  {
    "slug": "new-site-ms",
    "town": "New Site",
    "county": "Prentiss County",
    "zip": "38859",
    "title": "Dentist Serving New Site, MS",
    "metaDescription": "Planning dental care from New Site? Find our Booneville office, appointment information and treatment guides. Call Park Place Dental before travelling.",
    "lead": [
      "Park Place Dental welcomes New Site patients at 403 N 3rd St, Booneville, MS 38829. We do not have a separate office in New Site.",
      "Before leaving New Site for an appointment, confirm whether the visit is an examination, a specific treatment or a follow-up. Ask what you should bring and how much time to allow at the office."
    ],
    "directions": [
      "Open the directions link and choose your starting address to check the current route and travel conditions.",
      "Confirm your appointment time before travelling. Call (662) 728-8171 if you need help finding the office or have access requirements."
    ],
    "comeFor": [
      {
        "term": "Know what your first appointment covers",
        "text": "If you have not had dental care recently, start with an assessment. You can discuss the order, timing and cost of recommended treatment before scheduling it."
      },
      {
        "term": "Discuss your options",
        "text": "An examination helps determine which care is appropriate. Ask for the recommended stages, likely visits and a written estimate before agreeing to treatment."
      }
    ],
    "context": [
      "If you have not had dental care recently, start with an assessment. You can discuss the order, timing and cost of recommended treatment before scheduling it."
    ],
    "nearby": [
      "Thrasher",
      "Jumpertown",
      "Marietta",
      "Paden"
    ],
    "services": [
      {
        "label": "Cleanings and exams",
        "href": "/services/general-dentistry/cleanings-exams"
      },
      {
        "label": "Dentures and repairs",
        "href": "/services/restorative-dentistry/dentures"
      },
      {
        "label": "Emergency dentistry",
        "href": "/services/general-dentistry/emergency-dentistry"
      }
    ],
    "faqs": [
      {
        "q": "Is the office in New Site?",
        "a": "No. We welcome patients from New Site, but all appointments are at our Booneville office at 403 N 3rd St."
      },
      {
        "q": "Can treatment be completed in one visit?",
        "a": "That depends on the assessment, treatment and schedule. Call before travelling and ask which stages may require a return visit."
      },
      {
        "q": "How do I request an appointment?",
        "a": "Call (662) 728-8171 or use our appointment request form. The team must confirm the date and time. For an urgent dental problem, call rather than waiting for a form response."
      }
    ],
    "headline": "Dental care for New Site, / at our Booneville office",
    "directionsHref": "https://www.google.com/maps/dir/?api=1&origin=New%20Site%2C%20MS&destination=403%20N%203rd%20St%2C%20Booneville%2C%20MS%2038829",
    "visitFocus": "Know what your first appointment covers"
  },
  {
    "slug": "guntown-ms",
    "town": "Guntown",
    "county": "Lee County",
    "zip": "38849",
    "title": "Dentist Serving Guntown, MS",
    "metaDescription": "Planning dental care from Guntown? Find our Booneville office, appointment information and treatment guides. Call Park Place Dental before travelling.",
    "lead": [
      "Park Place Dental welcomes Guntown patients at 403 N 3rd St, Booneville, MS 38829. We do not have a separate office in Guntown.",
      "If you are considering implants or dentures from Guntown, ask what the initial consultation involves and which records are useful. A consultation does not commit you to treatment."
    ],
    "directions": [
      "Open the directions link and choose your starting address to check the current route and travel conditions.",
      "Confirm your appointment time before travelling. Call (662) 728-8171 if you need help finding the office or have access requirements."
    ],
    "comeFor": [
      {
        "term": "Discuss tooth replacement before planning several trips",
        "text": "Tooth replacement can involve assessment, treatment and follow-up visits. Ask which stages take place in Booneville and whether any referral is needed for your case."
      },
      {
        "term": "Discuss your options",
        "text": "An examination helps determine which care is appropriate. Ask for the recommended stages, likely visits and a written estimate before agreeing to treatment."
      }
    ],
    "context": [
      "Tooth replacement can involve assessment, treatment and follow-up visits. Ask which stages take place in Booneville and whether any referral is needed for your case."
    ],
    "nearby": [
      "Saltillo",
      "Baldwyn",
      "Mooreville",
      "Pratts"
    ],
    "services": [
      {
        "label": "Crowns and bridges",
        "href": "/services/restorative-dentistry/crowns-bridges"
      },
      {
        "label": "Cleanings and exams",
        "href": "/services/general-dentistry/cleanings-exams"
      },
      {
        "label": "Emergency dentistry",
        "href": "/services/general-dentistry/emergency-dentistry"
      }
    ],
    "faqs": [
      {
        "q": "Is the office in Guntown?",
        "a": "No. We welcome patients from Guntown, but all appointments are at our Booneville office at 403 N 3rd St."
      },
      {
        "q": "Can treatment be completed in one visit?",
        "a": "That depends on the assessment, treatment and schedule. Call before travelling and ask which stages may require a return visit."
      },
      {
        "q": "How do I request an appointment?",
        "a": "Call (662) 728-8171 or use our appointment request form. The team must confirm the date and time. For an urgent dental problem, call rather than waiting for a form response."
      }
    ],
    "headline": "Dental care for Guntown, / at our Booneville office",
    "directionsHref": "https://www.google.com/maps/dir/?api=1&origin=Guntown%2C%20MS&destination=403%20N%203rd%20St%2C%20Booneville%2C%20MS%2038829",
    "visitFocus": "Discuss tooth replacement before planning several trips"
  },
  {
    "slug": "saltillo-ms",
    "town": "Saltillo",
    "county": "Lee County",
    "zip": "38866",
    "title": "Dentist Serving Saltillo, MS",
    "metaDescription": "Planning dental care from Saltillo? Find our Booneville office, appointment information and treatment guides. Call Park Place Dental before travelling.",
    "lead": [
      "Park Place Dental welcomes Saltillo patients at 403 N 3rd St, Booneville, MS 38829. We do not have a separate office in Saltillo.",
      "Park Place Dental’s team includes Dr. Ken Goodwin and Dr. Rebecca McDougald. If you have a clinician preference when visiting from Saltillo, mention it when you call and confirm who will see you."
    ],
    "directions": [
      "Open the directions link and choose your starting address to check the current route and travel conditions.",
      "Confirm your appointment time before travelling. Call (662) 728-8171 if you need help finding the office or have access requirements."
    ],
    "comeFor": [
      {
        "term": "Choose an appointment with clear expectations",
        "text": "Our in-house laboratory supports restorative care, but the dentist must assess the tooth or denture before confirming the work and timing. Ask about follow-up visits before making travel plans."
      },
      {
        "term": "Discuss your options",
        "text": "An examination helps determine which care is appropriate. Ask for the recommended stages, likely visits and a written estimate before agreeing to treatment."
      }
    ],
    "context": [
      "Our in-house laboratory supports restorative care, but the dentist must assess the tooth or denture before confirming the work and timing. Ask about follow-up visits before making travel plans."
    ],
    "nearby": [
      "Guntown",
      "Mooreville",
      "Plantersville",
      "Belden"
    ],
    "services": [
      {
        "label": "Dentures and repairs",
        "href": "/services/restorative-dentistry/dentures"
      },
      {
        "label": "Crowns and bridges",
        "href": "/services/restorative-dentistry/crowns-bridges"
      },
      {
        "label": "Cosmetic dentistry",
        "href": "/services/cosmetic-dentistry"
      }
    ],
    "faqs": [
      {
        "q": "Is the office in Saltillo?",
        "a": "No. We welcome patients from Saltillo, but all appointments are at our Booneville office at 403 N 3rd St."
      },
      {
        "q": "Can treatment be completed in one visit?",
        "a": "That depends on the assessment, treatment and schedule. Call before travelling and ask which stages may require a return visit."
      },
      {
        "q": "How do I request an appointment?",
        "a": "Call (662) 728-8171 or use our appointment request form. The team must confirm the date and time. For an urgent dental problem, call rather than waiting for a form response."
      }
    ],
    "headline": "Dental care for Saltillo, / at our Booneville office",
    "directionsHref": "https://www.google.com/maps/dir/?api=1&origin=Saltillo%2C%20MS&destination=403%20N%203rd%20St%2C%20Booneville%2C%20MS%2038829",
    "visitFocus": "Choose an appointment with clear expectations"
  },
  {
    "slug": "corinth-ms",
    "town": "Corinth",
    "county": "Alcorn County",
    "zip": "38834",
    "title": "Dentist Serving Corinth, MS",
    "metaDescription": "Planning dental care from Corinth? Find our Booneville office, appointment information and treatment guides. Call Park Place Dental before travelling.",
    "lead": [
      "Park Place Dental welcomes Corinth patients at 403 N 3rd St, Booneville, MS 38829. We do not have a separate office in Corinth.",
      "For a denture problem, describe whether something broke or the fit changed before you leave Corinth. Bring the denture and any pieces to the assessment rather than trying to repair it yourself."
    ],
    "directions": [
      "Open the directions link and choose your starting address to check the current route and travel conditions.",
      "Confirm your appointment time before travelling. Call (662) 728-8171 if you need help finding the office or have access requirements."
    ],
    "comeFor": [
      {
        "term": "Check the plan for denture or crown work",
        "text": "Ask when you will receive an estimate and how long you may be without the denture. Having an on-site lab does not guarantee a repair on the day you call."
      },
      {
        "term": "Discuss your options",
        "text": "An examination helps determine which care is appropriate. Ask for the recommended stages, likely visits and a written estimate before agreeing to treatment."
      }
    ],
    "context": [
      "Ask when you will receive an estimate and how long you may be without the denture. Having an on-site lab does not guarantee a repair on the day you call."
    ],
    "nearby": [
      "Rienzi",
      "Glen",
      "Kossuth",
      "Farmington",
      "Biggersville"
    ],
    "services": [
      {
        "label": "Dental implants",
        "href": "/services/restorative-dentistry/dental-implants"
      },
      {
        "label": "Dentures and repairs",
        "href": "/services/restorative-dentistry/dentures"
      },
      {
        "label": "Care for veterans",
        "href": "/veterans"
      }
    ],
    "faqs": [
      {
        "q": "Is the office in Corinth?",
        "a": "No. We welcome patients from Corinth, but all appointments are at our Booneville office at 403 N 3rd St."
      },
      {
        "q": "Can treatment be completed in one visit?",
        "a": "That depends on the assessment, treatment and schedule. Call before travelling and ask which stages may require a return visit."
      },
      {
        "q": "How do I request an appointment?",
        "a": "Call (662) 728-8171 or use our appointment request form. The team must confirm the date and time. For an urgent dental problem, call rather than waiting for a form response."
      }
    ],
    "headline": "Dental care for Corinth, / at our Booneville office",
    "directionsHref": "https://www.google.com/maps/dir/?api=1&origin=Corinth%2C%20MS&destination=403%20N%203rd%20St%2C%20Booneville%2C%20MS%2038829",
    "visitFocus": "Check the plan for denture or crown work"
  },
  {
    "slug": "burnsville-ms",
    "town": "Burnsville",
    "county": "Tishomingo County",
    "zip": "38833",
    "title": "Dentist Serving Burnsville, MS",
    "metaDescription": "Planning dental care from Burnsville? Find our Booneville office, appointment information and treatment guides. Call Park Place Dental before travelling.",
    "lead": [
      "Park Place Dental welcomes Burnsville patients at 403 N 3rd St, Booneville, MS 38829. We do not have a separate office in Burnsville.",
      "When calling from Burnsville, explain whether you need an assessment, repair or continuation of treatment. Let the team know about any treatment already started elsewhere."
    ],
    "directions": [
      "Open the directions link and choose your starting address to check the current route and travel conditions.",
      "Confirm your appointment time before travelling. Call (662) 728-8171 if you need help finding the office or have access requirements."
    ],
    "comeFor": [
      {
        "term": "Confirm the next visit before making the journey",
        "text": "Ask whether existing images or records can be transferred and whether a fitting or follow-up visit is likely. Confirm your appointment before leaving home."
      },
      {
        "term": "Discuss your options",
        "text": "An examination helps determine which care is appropriate. Ask for the recommended stages, likely visits and a written estimate before agreeing to treatment."
      }
    ],
    "context": [
      "Ask whether existing images or records can be transferred and whether a fitting or follow-up visit is likely. Confirm your appointment before leaving home."
    ],
    "nearby": [
      "Iuka",
      "Tishomingo",
      "Belmont",
      "Glen"
    ],
    "services": [
      {
        "label": "Dentures and repairs",
        "href": "/services/restorative-dentistry/dentures"
      },
      {
        "label": "Care for veterans",
        "href": "/veterans"
      },
      {
        "label": "Emergency dentistry",
        "href": "/services/general-dentistry/emergency-dentistry"
      }
    ],
    "faqs": [
      {
        "q": "Is the office in Burnsville?",
        "a": "No. We welcome patients from Burnsville, but all appointments are at our Booneville office at 403 N 3rd St."
      },
      {
        "q": "Can treatment be completed in one visit?",
        "a": "That depends on the assessment, treatment and schedule. Call before travelling and ask which stages may require a return visit."
      },
      {
        "q": "How do I request an appointment?",
        "a": "Call (662) 728-8171 or use our appointment request form. The team must confirm the date and time. For an urgent dental problem, call rather than waiting for a form response."
      }
    ],
    "headline": "Dental care for Burnsville, / at our Booneville office",
    "directionsHref": "https://www.google.com/maps/dir/?api=1&origin=Burnsville%2C%20MS&destination=403%20N%203rd%20St%2C%20Booneville%2C%20MS%2038829",
    "visitFocus": "Confirm the next visit before making the journey"
  },
  {
    "slug": "fulton-ms",
    "town": "Fulton",
    "county": "Itawamba County",
    "zip": "38843",
    "title": "Dentist Serving Fulton, MS",
    "metaDescription": "Planning dental care from Fulton? Find our Booneville office, appointment information and treatment guides. Call Park Place Dental before travelling.",
    "lead": [
      "Park Place Dental welcomes Fulton patients at 403 N 3rd St, Booneville, MS 38829. We do not have a separate office in Fulton.",
      "If you are in Fulton with a broken tooth or dental pain, call the office and describe what happened. The team can discuss appointment availability and the next step."
    ],
    "directions": [
      "Open the directions link and choose your starting address to check the current route and travel conditions.",
      "Confirm your appointment time before travelling. Call (662) 728-8171 if you need help finding the office or have access requirements."
    ],
    "comeFor": [
      {
        "term": "Call about an urgent problem before travelling",
        "text": "For trouble breathing or swallowing, uncontrolled bleeding or another medical emergency, seek emergency medical care. Do not delay emergency care to drive to a dental appointment."
      },
      {
        "term": "Discuss your options",
        "text": "An examination helps determine which care is appropriate. Ask for the recommended stages, likely visits and a written estimate before agreeing to treatment."
      }
    ],
    "context": [
      "For trouble breathing or swallowing, uncontrolled bleeding or another medical emergency, seek emergency medical care. Do not delay emergency care to drive to a dental appointment."
    ],
    "nearby": [
      "Mantachie",
      "Tremont",
      "Golden",
      "Dorsey"
    ],
    "services": [
      {
        "label": "Dentures and repairs",
        "href": "/services/restorative-dentistry/dentures"
      },
      {
        "label": "Crowns and bridges",
        "href": "/services/restorative-dentistry/crowns-bridges"
      },
      {
        "label": "Emergency dentistry",
        "href": "/services/general-dentistry/emergency-dentistry"
      }
    ],
    "faqs": [
      {
        "q": "Is the office in Fulton?",
        "a": "No. We welcome patients from Fulton, but all appointments are at our Booneville office at 403 N 3rd St."
      },
      {
        "q": "Can treatment be completed in one visit?",
        "a": "That depends on the assessment, treatment and schedule. Call before travelling and ask which stages may require a return visit."
      },
      {
        "q": "How do I request an appointment?",
        "a": "Call (662) 728-8171 or use our appointment request form. The team must confirm the date and time. For an urgent dental problem, call rather than waiting for a form response."
      }
    ],
    "headline": "Dental care for Fulton, / at our Booneville office",
    "directionsHref": "https://www.google.com/maps/dir/?api=1&origin=Fulton%2C%20MS&destination=403%20N%203rd%20St%2C%20Booneville%2C%20MS%2038829",
    "visitFocus": "Call about an urgent problem before travelling"
  },
  {
    "slug": "ripley-ms",
    "town": "Ripley",
    "county": "Tippah County",
    "zip": "38663",
    "title": "Dentist Serving Ripley, MS",
    "metaDescription": "Planning dental care from Ripley? Find our Booneville office, appointment information and treatment guides. Call Park Place Dental before travelling.",
    "lead": [
      "Park Place Dental welcomes Ripley patients at 403 N 3rd St, Booneville, MS 38829. We do not have a separate office in Ripley.",
      "If you are comparing crowns, dentures or implants from Ripley, ask about the complete sequence: assessment, preparation, fitting and follow-up. Different treatments can require different numbers of visits."
    ],
    "directions": [
      "Open the directions link and choose your starting address to check the current route and travel conditions.",
      "Confirm your appointment time before travelling. Call (662) 728-8171 if you need help finding the office or have access requirements."
    ],
    "comeFor": [
      {
        "term": "Plan around the full treatment sequence",
        "text": "Use the map link for a route from your actual starting point. Confirm the appointment duration with the office instead of relying on a fixed travel-time estimate."
      },
      {
        "term": "Discuss your options",
        "text": "An examination helps determine which care is appropriate. Ask for the recommended stages, likely visits and a written estimate before agreeing to treatment."
      }
    ],
    "context": [
      "Use the map link for a route from your actual starting point. Confirm the appointment duration with the office instead of relying on a fixed travel-time estimate."
    ],
    "nearby": [
      "Walnut",
      "Blue Mountain",
      "Falkner",
      "Dumas"
    ],
    "services": [
      {
        "label": "Crowns and bridges",
        "href": "/services/restorative-dentistry/crowns-bridges"
      },
      {
        "label": "Dentures and repairs",
        "href": "/services/restorative-dentistry/dentures"
      },
      {
        "label": "Dental implants",
        "href": "/services/restorative-dentistry/dental-implants"
      }
    ],
    "faqs": [
      {
        "q": "Is the office in Ripley?",
        "a": "No. We welcome patients from Ripley, but all appointments are at our Booneville office at 403 N 3rd St."
      },
      {
        "q": "Can treatment be completed in one visit?",
        "a": "That depends on the assessment, treatment and schedule. Call before travelling and ask which stages may require a return visit."
      },
      {
        "q": "How do I request an appointment?",
        "a": "Call (662) 728-8171 or use our appointment request form. The team must confirm the date and time. For an urgent dental problem, call rather than waiting for a form response."
      }
    ],
    "headline": "Dental care for Ripley, / at our Booneville office",
    "directionsHref": "https://www.google.com/maps/dir/?api=1&origin=Ripley%2C%20MS&destination=403%20N%203rd%20St%2C%20Booneville%2C%20MS%2038829",
    "visitFocus": "Plan around the full treatment sequence"
  },
  {
    "slug": "mantachie-ms",
    "town": "Mantachie",
    "county": "Itawamba County",
    "zip": "38855",
    "title": "Dentist Serving Mantachie, MS",
    "metaDescription": "Planning dental care from Mantachie? Find our Booneville office, appointment information and treatment guides. Call Park Place Dental before travelling.",
    "lead": [
      "Park Place Dental welcomes Mantachie patients at 403 N 3rd St, Booneville, MS 38829. We do not have a separate office in Mantachie.",
      "Patients considering a crown from Mantachie can ask whether their tooth is suitable for a same-day restoration. The answer depends on the examination and proposed treatment."
    ],
    "directions": [
      "Open the directions link and choose your starting address to check the current route and travel conditions.",
      "Confirm your appointment time before travelling. Call (662) 728-8171 if you need help finding the office or have access requirements."
    ],
    "comeFor": [
      {
        "term": "Ask about crown appointments before you travel",
        "text": "Ask whether a temporary crown is needed, how many appointments are expected, and what the estimate includes. The lab’s location alone does not determine the treatment schedule."
      },
      {
        "term": "Discuss your options",
        "text": "An examination helps determine which care is appropriate. Ask for the recommended stages, likely visits and a written estimate before agreeing to treatment."
      }
    ],
    "context": [
      "Ask whether a temporary crown is needed, how many appointments are expected, and what the estimate includes. The lab’s location alone does not determine the treatment schedule."
    ],
    "nearby": [
      "Fulton",
      "Tremont",
      "Dorsey",
      "Ratliff"
    ],
    "services": [
      {
        "label": "Crowns and bridges",
        "href": "/services/restorative-dentistry/crowns-bridges"
      },
      {
        "label": "Dentures and repairs",
        "href": "/services/restorative-dentistry/dentures"
      },
      {
        "label": "Emergency dentistry",
        "href": "/services/general-dentistry/emergency-dentistry"
      }
    ],
    "faqs": [
      {
        "q": "Is the office in Mantachie?",
        "a": "No. We welcome patients from Mantachie, but all appointments are at our Booneville office at 403 N 3rd St."
      },
      {
        "q": "Can treatment be completed in one visit?",
        "a": "That depends on the assessment, treatment and schedule. Call before travelling and ask which stages may require a return visit."
      },
      {
        "q": "How do I request an appointment?",
        "a": "Call (662) 728-8171 or use our appointment request form. The team must confirm the date and time. For an urgent dental problem, call rather than waiting for a form response."
      }
    ],
    "headline": "Dental care for Mantachie, / at our Booneville office",
    "directionsHref": "https://www.google.com/maps/dir/?api=1&origin=Mantachie%2C%20MS&destination=403%20N%203rd%20St%2C%20Booneville%2C%20MS%2038829",
    "visitFocus": "Ask about crown appointments before you travel"
  },
  {
    "slug": "new-albany-ms",
    "town": "New Albany",
    "county": "Union County",
    "zip": "38652",
    "title": "Dentist Serving New Albany, MS",
    "metaDescription": "Planning dental care from New Albany? Find our Booneville office, appointment information and treatment guides. Call Park Place Dental before travelling.",
    "lead": [
      "Park Place Dental welcomes New Albany patients at 403 N 3rd St, Booneville, MS 38829. We do not have a separate office in New Albany.",
      "If you are arranging care from New Albany using insurance or VA benefits, check eligibility and any required authorization before treatment. The office can discuss scheduling, but the insurer or VA determines coverage."
    ],
    "directions": [
      "Open the directions link and choose your starting address to check the current route and travel conditions.",
      "Confirm your appointment time before travelling. Call (662) 728-8171 if you need help finding the office or have access requirements."
    ],
    "comeFor": [
      {
        "term": "Separate benefit questions from scheduling",
        "text": "Bring the relevant plan information and ask what you may need to pay. A referral or appointment request does not by itself confirm payment for the proposed care."
      },
      {
        "term": "Discuss your options",
        "text": "An examination helps determine which care is appropriate. Ask for the recommended stages, likely visits and a written estimate before agreeing to treatment."
      }
    ],
    "context": [
      "Bring the relevant plan information and ask what you may need to pay. A referral or appointment request does not by itself confirm payment for the proposed care."
    ],
    "nearby": [
      "Myrtle",
      "Blue Springs",
      "Ingomar",
      "Etta"
    ],
    "services": [
      {
        "label": "Crowns and bridges",
        "href": "/services/restorative-dentistry/crowns-bridges"
      },
      {
        "label": "Dentures and repairs",
        "href": "/services/restorative-dentistry/dentures"
      },
      {
        "label": "Cosmetic dentistry",
        "href": "/services/cosmetic-dentistry"
      }
    ],
    "faqs": [
      {
        "q": "Is the office in New Albany?",
        "a": "No. We welcome patients from New Albany, but all appointments are at our Booneville office at 403 N 3rd St."
      },
      {
        "q": "Can treatment be completed in one visit?",
        "a": "That depends on the assessment, treatment and schedule. Call before travelling and ask which stages may require a return visit."
      },
      {
        "q": "How do I request an appointment?",
        "a": "Call (662) 728-8171 or use our appointment request form. The team must confirm the date and time. For an urgent dental problem, call rather than waiting for a form response."
      }
    ],
    "headline": "Dental care for New Albany, / at our Booneville office",
    "directionsHref": "https://www.google.com/maps/dir/?api=1&origin=New%20Albany%2C%20MS&destination=403%20N%203rd%20St%2C%20Booneville%2C%20MS%2038829",
    "visitFocus": "Separate benefit questions from scheduling"
  },
  {
    "slug": "tupelo-ms",
    "town": "Tupelo",
    "county": "Lee County",
    "zip": "38801",
    "title": "Dentist Serving Tupelo, MS",
    "metaDescription": "Planning dental care from Tupelo? Find our Booneville office, appointment information and treatment guides. Call Park Place Dental before travelling.",
    "lead": [
      "Park Place Dental welcomes Tupelo patients at 403 N 3rd St, Booneville, MS 38829. We do not have a separate office in Tupelo.",
      "For a consultation from Tupelo, explain the problem you want to address and any treatment already recommended. Ask which parts of the plan can be assessed at the first visit."
    ],
    "directions": [
      "Open the directions link and choose your starting address to check the current route and travel conditions.",
      "Confirm your appointment time before travelling. Call (662) 728-8171 if you need help finding the office or have access requirements."
    ],
    "comeFor": [
      {
        "term": "Compare care plans and follow-up needs",
        "text": "Park Place Dental has one office in Booneville, with Dr. Ken Goodwin and Dr. Rebecca McDougald. Confirm the treating clinician, lab schedule and follow-up arrangements when booking."
      },
      {
        "term": "Discuss your options",
        "text": "An examination helps determine which care is appropriate. Ask for the recommended stages, likely visits and a written estimate before agreeing to treatment."
      }
    ],
    "context": [
      "Park Place Dental has one office in Booneville, with Dr. Ken Goodwin and Dr. Rebecca McDougald. Confirm the treating clinician, lab schedule and follow-up arrangements when booking."
    ],
    "nearby": [
      "Saltillo",
      "Verona",
      "Plantersville",
      "Belden",
      "Mooreville"
    ],
    "services": [
      {
        "label": "Dental implants",
        "href": "/services/restorative-dentistry/dental-implants"
      },
      {
        "label": "Dentures and repairs",
        "href": "/services/restorative-dentistry/dentures"
      },
      {
        "label": "Cosmetic dentistry",
        "href": "/services/cosmetic-dentistry"
      }
    ],
    "faqs": [
      {
        "q": "Is the office in Tupelo?",
        "a": "No. We welcome patients from Tupelo, but all appointments are at our Booneville office at 403 N 3rd St."
      },
      {
        "q": "Can treatment be completed in one visit?",
        "a": "That depends on the assessment, treatment and schedule. Call before travelling and ask which stages may require a return visit."
      },
      {
        "q": "How do I request an appointment?",
        "a": "Call (662) 728-8171 or use our appointment request form. The team must confirm the date and time. For an urgent dental problem, call rather than waiting for a form response."
      }
    ],
    "headline": "Dental care for Tupelo, / at our Booneville office",
    "directionsHref": "https://www.google.com/maps/dir/?api=1&origin=Tupelo%2C%20MS&destination=403%20N%203rd%20St%2C%20Booneville%2C%20MS%2038829",
    "visitFocus": "Compare care plans and follow-up needs"
  },
  {
    "slug": "iuka-ms",
    "town": "Iuka",
    "county": "Tishomingo County",
    "zip": "38852",
    "title": "Dentist Serving Iuka, MS",
    "metaDescription": "Planning dental care from Iuka? Find our Booneville office, appointment information and treatment guides. Call Park Place Dental before travelling.",
    "lead": [
      "Park Place Dental welcomes Iuka patients at 403 N 3rd St, Booneville, MS 38829. We do not have a separate office in Iuka.",
      "If a denture has become loose or damaged, tell the team how the problem developed before travelling from Iuka. A repair, reline and replacement address different problems."
    ],
    "directions": [
      "Open the directions link and choose your starting address to check the current route and travel conditions.",
      "Confirm your appointment time before travelling. Call (662) 728-8171 if you need help finding the office or have access requirements."
    ],
    "comeFor": [
      {
        "term": "Plan denture care and return visits together",
        "text": "Ask what can be determined at the assessment, when the lab work could be ready and whether a fitting visit is needed. If you use VA benefits, confirm authorization separately from appointment availability."
      },
      {
        "term": "Discuss your options",
        "text": "An examination helps determine which care is appropriate. Ask for the recommended stages, likely visits and a written estimate before agreeing to treatment."
      }
    ],
    "context": [
      "Ask what can be determined at the assessment, when the lab work could be ready and whether a fitting visit is needed. If you use VA benefits, confirm authorization separately from appointment availability."
    ],
    "nearby": [
      "Burnsville",
      "Tishomingo",
      "Belmont",
      "Dennis"
    ],
    "services": [
      {
        "label": "Dentures and repairs",
        "href": "/services/restorative-dentistry/dentures"
      },
      {
        "label": "Care for veterans",
        "href": "/veterans"
      },
      {
        "label": "Dental implants",
        "href": "/services/restorative-dentistry/dental-implants"
      }
    ],
    "faqs": [
      {
        "q": "Is the office in Iuka?",
        "a": "No. We welcome patients from Iuka, but all appointments are at our Booneville office at 403 N 3rd St."
      },
      {
        "q": "Can treatment be completed in one visit?",
        "a": "That depends on the assessment, treatment and schedule. Call before travelling and ask which stages may require a return visit."
      },
      {
        "q": "How do I request an appointment?",
        "a": "Call (662) 728-8171 or use our appointment request form. The team must confirm the date and time. For an urgent dental problem, call rather than waiting for a form response."
      }
    ],
    "headline": "Dental care for Iuka, / at our Booneville office",
    "directionsHref": "https://www.google.com/maps/dir/?api=1&origin=Iuka%2C%20MS&destination=403%20N%203rd%20St%2C%20Booneville%2C%20MS%2038829",
    "visitFocus": "Plan denture care and return visits together"
  }
];

export function findLocation(slug: string): Location | undefined { return locations.find((place) => place.slug === slug); }
export const locationsHub = {
  "eyebrow": "Our Booneville Office",
  "headline": "One office, / serving North Mississippi",
  "lead": [
    "Park Place Dental is at 403 N 3rd St in Booneville, Mississippi. Dr. Ken Goodwin and Dr. Rebecca McDougald provide care at this office.",
    "Choose your town for appointment planning and a map link. Routes and travel times depend on your starting point; confirm your visit with the team before travelling."
  ]
};

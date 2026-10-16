import type { Post } from "./posts";

const published = "2026-09-25";
const dentures = "/services/restorative-dentistry/dentures";
const crowns = "/services/restorative-dentistry/crowns-bridges";
const implants = "/services/restorative-dentistry/dental-implants";
const financing = "/new-patients/insurance-financing";

/** New editorial work, without a fabricated clinician review or fee schedule. */
export const treatmentGuides: Post[] = [
  {
    slug: "broken-denture-repair-reline-replacement",
    author: "practice",
    title: "Broken denture: repair, reline or replacement?",
    seoTitle: "Denture Repair in Booneville: Your Options",
    metaDescription: "Broken or loose denture? Compare repair, reline and replacement, what to bring to an appointment, and how to ask Park Place Dental in Booneville for help.",
    summary: "A break and a poor fit are different problems. Understand the options before arranging a denture assessment in Booneville.",
    answer: "A repair addresses a damaged part of a denture; a reline changes the fitting surface when the denture no longer sits well against the gums. Replacement may be needed when wear, damage or fit cannot be corrected adequately. A dentist needs to examine both the denture and your mouth to recommend the right route.",
    published, updated: "2026-10-02",
    image: "/images/restoration-design-screen.jpg",
    imageAlt: "A Park Place Dental team member designing a restoration on a computer",
    readingMinutes: 4,
    topic: "Dentures",
    blocks: [
      { kind: "callout", heading: "Before agreeing to the plan", body: "Ask whether the fitting visit is included in the estimate and what to do if the denture remains uncomfortable." },
      { kind: "prose", heading: "Start with what changed", body: [
        "Did the denture fall and break, or had it been moving when you spoke for several weeks? Tell the office which happened. A visible crack is easy to describe, but the history of the fit matters too. You do not need to decide which treatment to request before calling.",
        "If you are travelling to Booneville from Corinth, Baldwyn or Rienzi, call before setting out. Explain that the appointment is for an existing denture, whether it is a full or partial denture, and whether it is broken or uncomfortable. That helps the team discuss the appropriate appointment rather than treating the call as a routine checkup."
      ] },
      { kind: "table", heading: "Three options, three different jobs", columns: ["Option", "What it addresses", "What to ask"], rows: [
        ["Repair", "A damaged denture tooth, clasp or other broken component", "Can the damaged part be repaired, and why did it break?"],
        ["Reline", "The fit of the base against the tissues", "Is the rest of this denture still suitable?"],
        ["Replacement", "Problems that cannot be adequately corrected with the existing denture", "What would a new denture change about fit and function?"]
      ] },
      { kind: "links", items: [
        { label: "American College of Prosthodontists: relined dentures", href: "https://www.gotoapro.org/relined-dentures/", note: "Explains why some fit problems need a reline and others need a remake." },
        { label: "American College of Prosthodontists: denture questions and repairs", href: "https://www.gotoapro.org/dentures-faq/" }
      ] },
      { kind: "callout", heading: "Leave repairs to a dental professional", body: "Do not use household glue, bend clasps or attempt a home reline. The ADA warns that do-it-yourself repairs can damage the denture and that glues can contain harmful chemicals. Call your dentist if a tooth becomes loose or the denture cracks or breaks." },
      { kind: "links", items: [{ label: "ADA MouthHealthy: partial dentures and repairs", href: "https://www.mouthhealthy.org/all-topics-a-z/dentures-partial" }] },
      { kind: "prose", heading: "Can an in-house lab make it a same-day repair?", body: [
        "Park Place Dental has an in-house dental laboratory in Booneville. That makes the laboratory part of the conversation, but it does not mean every denture can be repaired on the day you call. Ask about an assessment first and the likely repair schedule once the damage has been examined.",
        "The useful question is: 'How long will I be without this denture, and when can you tell me for certain?' If you have work, travel or an important event coming up, mention it when you call. A realistic plan is more helpful than assuming an online description promises a particular turnaround."
      ] },
      { kind: "list", heading: "What to bring and discuss", items: [
        "Bring the denture and any broken pieces so the dentist can assess them.",
        "Explain when the problem started and whether the denture had felt loose before it broke.",
        "Tell the team about earlier repairs and any current sore areas.",
        "Ask what the estimate includes: assessment, laboratory work and any fitting visit.",
        "Before leaving, confirm the next step and whom to call if the fit still feels wrong."
      ] },
      { kind: "links", items: [{ label: "NHS: damaged dentures and when to see a dentist", href: "https://www.nhs.uk/tests-and-treatments/dentures/", note: "Advises bringing broken parts to the dentist for assessment." }] },
      { kind: "prose", heading: "Arrange a denture assessment in Booneville", body: [
        "Park Place Dental is at 403 N 3rd St, Booneville, MS 38829. Call (662) 728-8171 during office hours and explain what has happened. If you prefer an online request, the team will contact you to confirm an available time; the form does not book a repair slot.",
        "For general background before your visit, read our dentures service page. If the larger question is whether to keep using a removable denture or explore implant support, the separate comparison guide explains that decision."
      ] }
    ],
    faqs: [
      { q: "Is a loose denture always a broken denture?", a: "No. A denture can remain intact while its fit changes. An examination helps determine whether adjustment, a reline or replacement is appropriate." },
      { q: "Should I bring the broken pieces?", a: "Yes. Bring the denture and any pieces you have so the dentist can assess the damage. Avoid trying to glue them back together first." },
      { q: "Can Park Place Dental promise a same-day repair over the phone?", a: "The team can discuss appointment availability, but the repair plan and timing depend on examining the denture. Call before travelling to the Booneville office." }
    ],
    related: [{ label: "Dentures and repairs", href: dentures }, { label: "Our in-house lab", href: "/advanced-dental-technology" }, { label: "Insurance and financing", href: financing }],
    relatedSlugs: ["dentures-vs-implant-supported-dentures", "in-house-dental-lab-same-day", "implants-bridges-partial-dentures"],
    cta: { heading: "Need help with a broken or loose denture?", body: "Call (662) 728-8171 before travelling to our Booneville office. Tell the team what happened so we can discuss the next available assessment." }
  },
  {
    slug: "same-day-vs-traditional-crowns",
    author: "practice",
    title: "Same-day or traditional crown: what changes about your visit?",
    seoTitle: "Same-Day vs Traditional Crowns | Booneville",
    metaDescription: "Compare same-day and traditional dental crowns: appointments, temporary crowns and questions to ask about your tooth at Park Place Dental in Booneville, MS.",
    summary: "One longer visit or separate appointments? Here is how to discuss crown options, timing and the right fit for your tooth.",
    answer: "A same-day crown can be designed and made in the office during one visit when the tooth and treatment plan are suitable. A traditional workflow uses separate preparation and fitting appointments, usually with a temporary crown between them. The schedule matters, but the condition of the tooth and the chosen restoration determine which approach is appropriate.",
    published, updated: "2026-10-02",
    image: "/images/inlab-milling-unit.jpg",
    imageAlt: "The milling unit in Park Place Dental's in-house laboratory in Booneville",
    readingMinutes: 4,
    topic: "Crowns",
    blocks: [
      { kind: "callout", heading: "Before agreeing to the plan", body: "Confirm who will provide the crown, whether another provider is involved and whom to call if the bite feels wrong after fitting." },
      { kind: "prose", heading: "First ask what the crown is meant to do", body: [
        "A crown covers a tooth to restore its shape and function. It may be recommended for a weak or damaged tooth, or to support another restoration. Ask your dentist to show you the reason for the recommendation before comparing appointment schedules. The ADA explains that crowns can also cover implants and help support bridges.",
        "A useful starting question is: 'What are we trying to protect or restore, and are there alternatives for this tooth?' It keeps the decision about your mouth rather than the equipment in the office."
      ] },
      { kind: "links", items: [{ label: "ADA MouthHealthy: why a tooth may need a crown", href: "https://www.mouthhealthy.org/all-topics-a-z/crowns" }] },
      { kind: "table", heading: "Compare the appointment plans", columns: ["Question", "Same-day workflow", "Traditional workflow"], rows: [
        ["Where is the crown made?", "Designed and manufactured in the office", "Made by a dental laboratory"],
        ["How many fitting visits?", "May be completed in one visit for a suitable case", "Preparation and fitting are usually separate"],
        ["Will I need a temporary?", "Often avoided if the final crown is fitted that day", "Usually worn while the final crown is made"],
        ["Is it right for every tooth?", "No; suitability needs an examination", "The dentist selects a plan and material for the case"]
      ] },
      { kind: "links", items: [{ label: "Cleveland Clinic: crown procedures and same-day CAD/CAM crowns", href: "https://my.clevelandclinic.org/health/treatments/10923-dental-crowns" }] },
      { kind: "prose", heading: "What our Booneville lab adds to the conversation", body: [
        "Park Place Dental has an in-house laboratory and offers same-day crowns. The photographs on this site show the restoration-design workstation and milling unit used in the practice. You can ask the team to explain how the laboratory fits into your particular treatment plan.",
        "If you drive from Saltillo, Corinth or another nearby community, ask how many visits to plan for and how much time to allow for each. A single crown appointment may suit your schedule; another treatment plan may need several visits. Tell the team about your travel constraints before choosing a date."
      ] },
      { kind: "list", heading: "Five questions worth asking before you book", items: [
        "Is my tooth suitable for a same-day crown, and what might change that plan?",
        "Which material do you recommend for this tooth, and why?",
        "What treatment, if any, needs to happen before the crown is made?",
        "What is included in the written estimate, and what will insurance need to review?",
        "If the plan needs another visit, when will we know and how will it be arranged?"
      ] },
      { kind: "prose", heading: "Compare the whole estimate", body: [
        "An appointment count is not a price quote. Ask for an estimate for your actual treatment plan and an explanation of what it covers. The practice's insurance and financing page is the place to start if coverage or payment options will affect your decision.",
        "If you are comparing practices, use the same questions for both. Write down the proposed treatment, any additional work, and the expected visits. A clear comparison is more useful than assuming that every offer described as a 'crown' includes the same work."
      ] },
      { kind: "prose", heading: "A same-day crown is not a same-day implant", body: [
        "A crown is the visible restoration. An implant is a post placed in the jaw to support a replacement tooth. Implant treatment includes planning and healing considerations of its own; the availability of an in-house crown does not mean implant treatment is finished in one day.",
        "If you are missing the tooth rather than repairing a natural tooth, start with an implant or missing-tooth consultation and ask for the complete sequence of care."
      ] },
      { kind: "links", items: [{ label: "ADA MouthHealthy: the stages of implant treatment", href: "https://www.mouthhealthy.org/all-topics-a-z/implants" }] }
    ],
    faqs: [
      { q: "Does same-day mean I can walk in and get a crown today?", a: "No. It describes a treatment workflow for suitable cases, not a guarantee of an available appointment. Call the office to discuss your tooth and the schedule." },
      { q: "Is a same-day crown automatically the better choice?", a: "No. Ask which approach fits your tooth, the proposed material and the rest of your care. Convenience is one part of that conversation." },
      { q: "Where does Park Place Dental see crown patients?", a: "At the Booneville office at 403 N 3rd St. Patients travelling from surrounding communities should call to confirm the appointment plan before setting out." }
    ],
    related: [{ label: "Same-day crowns and bridges", href: crowns }, { label: "See our dental technology", href: "/advanced-dental-technology" }, { label: "Insurance and financing", href: financing }],
    relatedSlugs: ["in-house-dental-lab-same-day", "implants-bridges-partial-dentures", "dental-implant-cost-north-mississippi"],
    cta: { heading: "Ask about a crown for your tooth", body: "Call (662) 728-8171 or request a visit at Park Place Dental in Booneville. Our team will confirm an appointment and explain the next step." }
  },
  {
    slug: "implants-bridges-partial-dentures",
    author: "practice",
    title: "Implants, bridges or partial dentures: how to compare missing-tooth options",
    seoTitle: "Implants vs Bridges vs Partial Dentures",
    metaDescription: "Missing one or several teeth? Compare implants, bridges and partial dentures, and prepare for a treatment conversation at Park Place Dental in Booneville.",
    summary: "The right question is which replacement fits your mouth and your priorities. Start with the differences, then bring these questions to your consultation.",
    answer: "An implant supports a replacement tooth from the jawbone. A tooth-supported bridge fills a gap using neighboring teeth for support. A removable partial denture replaces missing teeth in an appliance you take out. The condition of the remaining teeth, your health, daily care needs and treatment preferences all help determine which options are suitable.",
    published, updated: "2026-10-02",
    image: "/images/implant-planning-screen.jpg",
    imageAlt: "Dental implant planning displayed on a screen at Park Place Dental",
    readingMinutes: 4,
    topic: "Missing teeth",
    blocks: [
      { kind: "callout", heading: "Before agreeing to the plan", body: "Ask who provides each stage and whether the estimate includes temporary teeth and follow-up visits." },
      { kind: "prose", heading: "Start with the teeth you still have", body: [
        "Two people with a similar-looking gap may need different treatment plans. Before deciding on a replacement, ask what the dentist finds about the teeth beside the gap and the wider condition of your mouth. The examination should explain the choices available to you, rather than simply produce a recommendation without context.",
        "Bring your priorities too. Do you want to discuss a removable option? Is the time away from work important? Are you mainly concerned about eating, appearance or the cost of a proposed plan? Naming those concerns helps make the consultation useful."
      ] },
      { kind: "terms", heading: "What supports each replacement?", items: [
        { term: "Dental implant", text: "An implant is placed in the jaw and can support a crown or other replacement. Healing is part of the treatment sequence, and health factors can affect suitability. Ask how the assessment applies to you before assuming the timeline." },
        { term: "Tooth-supported bridge", text: "A traditional bridge uses crowns on teeth beside the gap to support the replacement tooth. Preparing those supporting teeth is part of the decision. Other bridge designs exist, so ask which design is being proposed." },
        { term: "Removable partial denture", text: "A partial denture carries replacement teeth in a removable appliance. Its design depends on the remaining teeth and support available. Your dentist will explain how to insert, remove and care for it." }
      ] },
      { kind: "links", heading: "Patient-education sources for the options", items: [
        { label: "ADA MouthHealthy: implants", href: "https://www.mouthhealthy.org/all-topics-a-z/implants" },
        { label: "Cleveland Clinic: bridge designs and supporting teeth", href: "https://my.clevelandclinic.org/health/treatments/10921-dental-bridges" },
        { label: "Leeds Teaching Hospitals: removable partial dentures", href: "https://www.leedsth.nhs.uk/patients/resources/removable-partial-dentures/" }
      ] },
      { kind: "table", heading: "Compare the decisions, not just the names", columns: ["Your priority", "Question for the dentist", "Why to ask it"], rows: [
        ["Keeping neighboring teeth", "What changes would each option require to my remaining teeth?", "Understand the whole treatment, not just how the gap is filled."],
        ["Daily care", "Can you show me how I would clean and handle this replacement?", "Choose with your daily routine in mind."],
        ["Timing", "What are the stages and what would I use between them?", "Plan for appointments and any period between stages."],
        ["Budget", "What does each suitable option include in the estimate?", "Compare the proposed care on the same basis."]
      ] },
      { kind: "prose", heading: "Ask about ongoing care before choosing", body: [
        "A bridge still needs cleaning around the supporting teeth and under the replacement. Removable appliances need their own handling and cleaning routine. Ask the team to demonstrate the routine for the design being discussed; a name on an estimate does not tell you how it will fit into everyday life.",
        "Also ask what follow-up visits are expected and whom to contact if the replacement feels different later. Put those answers beside the initial estimate so the conversation includes ongoing care."
      ] },
      { kind: "links", items: [{ label: "ADA MouthHealthy: caring for a bridge", href: "https://www.mouthhealthy.org/all-topics-a-z/bridges" }] },
      { kind: "prose", heading: "What to expect from the conversation in Booneville", body: [
        "Park Place Dental provides restorative dentistry at 403 N 3rd St in Booneville, with an in-house dental laboratory. Start by telling the team which teeth are missing and that you would like to compare replacement options. You do not have to select an implant, bridge or denture before requesting a visit.",
        "If you are coming from Corinth, New Site or another community, mention the journey and ask about the likely visit sequence. Use the service pages below for background, then ask for a plan based on your examination. The implant-cost guide explains questions to ask about an estimate; it is not a quote for your case."
      ] },
      { kind: "list", heading: "Leave with answers to these questions", items: [
        "Which options are suitable for me, and why are any others being ruled out?",
        "Does anything need treatment before we replace the missing tooth?",
        "What will the visits involve, and which stages need separate appointments?",
        "What does the estimate include and what might change it?",
        "What daily care and follow-up will each option require?"
      ] }
    ],
    faqs: [
      { q: "Is an implant always better than a bridge?", a: "No single option is best for everyone. Ask how the condition of your remaining teeth, your health and your preferences affect the recommendation." },
      { q: "Does a partial denture replace all my teeth?", a: "No. A partial denture replaces some missing teeth while other natural teeth remain. Full dentures address a different situation, which we cover in a separate guide." },
      { q: "Can I request a consultation without knowing which treatment I want?", a: "Yes. Tell the Park Place Dental team that you want to discuss missing-tooth options. An examination and a conversation about your priorities come before choosing a treatment plan." }
    ],
    related: [{ label: "Dental implants", href: implants }, { label: "Crowns and bridges", href: crowns }, { label: "Dentures", href: dentures }, { label: "Implant cost factors", href: "/patient-resources/blog/dental-implant-cost-north-mississippi" }],
    relatedSlugs: ["dental-implant-cost-north-mississippi", "dentures-vs-implant-supported-dentures", "same-day-vs-traditional-crowns"],
    cta: { heading: "Talk through your missing-tooth options", body: "Request an appointment at our Booneville office or call (662) 728-8171. You can start with your questions; our team will confirm a time for your visit." }
  }
];

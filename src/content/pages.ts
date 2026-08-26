import type { Block } from "./services";

/**
 * The non-service interior pages, as data.
 *
 * Copy is taken from the live site with em dashes rewritten. Dr. Goodwin's
 * first name is Ken, corrected from the Kevin that appears on the old homepage.
 */

export type SimplePage = {
  eyebrow: string;
  headline: string;
  title: string;
  metaDescription: string;
  lead: string[];
  image?: string;
  imageAlt?: string;
  blocks: Block[];
  closing: { heading: string; body: string };
};

export const aboutPractice: SimplePage = {
  title: "About the Practice",
  metaDescription:
    "Park Place Dental provides comprehensive dental care with a personal touch in Booneville, Mississippi and Prentiss County.",
  eyebrow: "About the Practice",
  headline: "High-quality care / with a personal touch",
  lead: [
    "At Park Place Dental, we are dedicated to offering high-quality, comprehensive dental care with a personal touch. Our practice, located in the heart of Booneville, Mississippi, is committed to providing exceptional services to individuals and families in Prentiss County and surrounding rural areas.",
    "Whether you need routine care, restorative treatments, or cosmetic dentistry, we are here to ensure your smile is as healthy and beautiful as possible.",
  ],
  image: "/images/team-group-porch.jpg",
  imageAlt: "The Park Place Dental team outside the practice in Booneville",
  blocks: [
    {
      kind: "prose",
      heading: "Comprehensive care under one roof",
      body: [
        "We believe that dental care should go beyond just cleanings and check-ups. That is why we offer a wide range of services all under one roof. From preventive care to advanced procedures like dental implants, root canals, and veneers, Park Place Dental is equipped to handle all your dental needs.",
        "Our commitment to providing both oral health and facial aesthetic services ensures that you not only look your best but also feel your best.",
      ],
    },
    {
      kind: "terms",
      heading: "What makes us stand out?",
      items: [
        {
          term: "Modern and comfortable facilities",
          text: "We use the latest dental technology to ensure that all procedures are as efficient and comfortable as possible. From state-of-the-art equipment for implants to advanced tools for cosmetic work, we ensure our practice stays up to date.",
        },
        {
          term: "Comprehensive services",
          text: "Unlike many practices in rural areas, we offer a full spectrum of services, including general dentistry, implants, cosmetic enhancements like veneers, and even facial aesthetics like Botox and fillers.",
        },
        {
          term: "Convenient care for your family",
          text: "We understand the busy schedules of adults and families. That is why we have made it a priority to offer flexible scheduling and an array of payment options, including financing through CareCredit and most major insurance plans.",
        },
        {
          term: "Root canal expertise",
          text: "Our in-house endodontic specialist ensures that root canal procedures are done with the utmost precision and care, helping to preserve your natural teeth and maintain your smile for years to come.",
        },
      ],
    },
  ],
  closing: {
    heading: "Ready to schedule your appointment?",
    body: "Contact us today to learn more about our services and how we can help you achieve the smile you have always wanted. We are here to help you with everything from preventive care to advanced dental procedures.",
  },
};

export const meetTheDentist: SimplePage = {
  title: "Meet the Dentist",
  metaDescription:
    "Dr. Ken Goodwin has provided dental care in Booneville, Mississippi for over 43 years.",
  eyebrow: "Our Doctor",
  headline: "Meet Dr. Ken Goodwin",
  lead: [
    "Dr. Ken Goodwin is a dedicated and experienced dentist with over 43 years of providing exceptional patient care.",
  ],
  image: "/images/dr-ken-goodwin-portrait.jpg",
  imageAlt: "Dr. Ken Goodwin, dentist at Park Place Dental in Booneville",
  blocks: [
    {
      kind: "prose",
      body: [
        "A proud graduate of the University of Mississippi, where he earned his Bachelor of Arts in 1978, he went on to receive his Doctor of Dental Medicine degree from the University of Mississippi School of Dentistry in 1982.",
        "Originally from Booneville, Dr. Goodwin returned to his hometown with a passion for serving those around him. He is committed to creating beautiful, confident smiles while building lasting relationships with his patients. His practice offers a family-oriented work environment and strives to be a welcoming, comforting place for every patient.",
        "Dr. Goodwin is also dedicated to staying at the forefront of dentistry, utilizing cutting-edge technology and maintaining the highest quality equipment. Outside the office, he enjoys spending time with his family, duck hunting, and supporting the Ole Miss Rebels.",
      ],
    },
  ],
  closing: {
    heading: "Expert care, trusted results",
    body: "Dr. Goodwin and the entire team at Park Place Dental are dedicated to providing personalized, high-quality care to each patient. Book your appointment and take the first step toward a healthier, more beautiful smile.",
  },
};

export const meetTheTeam: SimplePage = {
  title: "Meet the Team",
  metaDescription:
    "The compassionate, highly skilled team caring for patients at Park Place Dental in Booneville, Mississippi.",
  eyebrow: "Our Team",
  headline: "The people who / make your visit",
  lead: [
    "At Park Place Dental, we pride ourselves on having a compassionate, highly skilled team that is dedicated to providing exceptional care for you and your family.",
    "Our team works together to ensure that each visit is comfortable, efficient, and personalized to meet your unique needs. Get to know the professionals who make your dental care experience outstanding.",
  ],
  image: "/images/team-group-indoor.jpg",
  imageAlt: "The Park Place Dental team inside the practice",
  blocks: [
    {
      kind: "prose",
      heading: "Our dental hygienists",
      body: [
        "Our dental hygienists are committed to providing gentle, compassionate care, taking the time to make every patient feel comfortable, valued, and well looked after.",
      ],
    },
    {
      kind: "list",
      intro: "You will be cared for by:",
      items: ["Shanna Renfrow", "Whitney Butler", "Kellie Conwill"],
    },
    {
      kind: "prose",
      heading: "Front desk and appointment greeters",
      body: [
        "Our front desk team members are committed to providing gentle, compassionate care, taking the time to make every patient feel comfortable, valued, and well looked after.",
      ],
    },
  ],
  closing: {
    heading: "Come and meet us",
    body: "Everyone here is glad to see you. Book your appointment and get to know the team that has looked after Booneville for over forty years.",
  },
};

export const advancedTechnology: SimplePage = {
  title: "Advanced Dental Technology",
  metaDescription:
    "RAYFace facial scanning, the Solea dental laser and an in-house lab at Park Place Dental in Booneville, Mississippi.",
  eyebrow: "Advanced Dental Technology",
  headline: "Modern dentistry, / built around comfort",
  lead: [
    "At Park Place Dental, we believe modern dentistry should be comfortable, precise, efficient, and personalized to you. That is why our office invests in advanced dental technology designed to improve the way we diagnose, plan, and deliver care.",
    "From facial scanning and laser dentistry to our in-house dental lab, our technology helps us create a smoother patient experience while supporting beautiful, natural-looking results.",
  ],
  image: "/images/operatory-technology.jpg",
  imageAlt: "Scanning equipment in a treatment room at Park Place Dental",
  blocks: [
    {
      kind: "prose",
      heading: "Personalized smile design with the RAYFace facial scanner",
      body: [
        "Your smile is not just about your teeth. It is about how your teeth, lips, facial features, and overall appearance work together. With the RAYFace Facial Scanner, Park Place Dental can take a more complete approach to treatment planning.",
        "RAYFace creates a detailed 3D scan of your face, allowing our team to better visualize your smile in relation to your natural facial structure. This helps us plan treatments with greater precision, especially for cosmetic and restorative cases such as veneers, crowns, dentures, and full smile makeovers.",
        "By using facial scanning technology, we can design smiles that are not only healthy and functional, but also balanced, natural-looking, and uniquely suited to each patient.",
      ],
    },
    {
      kind: "list",
      heading: "Benefits of RAYFace technology",
      items: [
        "More personalized smile design",
        "Better visualization during treatment planning",
        "Improved communication between the patient, dentist, and lab",
        "Support for cosmetic, restorative, and denture cases",
        "A more modern and detailed planning experience",
      ],
    },
    {
      kind: "prose",
      heading: "More comfortable dentistry with the Solea dental laser",
      body: [
        "For many patients, the sound of the drill or the thought of dental anesthesia can cause stress before an appointment even begins. The Solea Dental Laser helps change that experience.",
        "Solea is an advanced dental laser that can be used for many hard and soft tissue procedures. In many cases, it allows for a quieter, more comfortable experience with little to no need for anesthesia. That means some patients may be able to avoid numbness, reduce anxiety, and return to their day more comfortably after treatment.",
        "Because Solea is highly precise, it can also help preserve healthy tooth structure and support efficient, minimally invasive care.",
      ],
    },
    {
      kind: "list",
      heading: "Solea may help patients experience",
      items: [
        "Less anxiety during treatment",
        "Reduced need for needles or anesthesia in many cases",
        "A quieter alternative to traditional drilling",
        "Comfortable treatment for both teeth and gums",
        "Faster, more efficient appointments for certain procedures",
      ],
    },
    {
      kind: "prose",
      heading: "Same-day restorations with our in-house dental lab",
      body: [
        "Park Place Dental also features an in-house dental lab, giving our team greater control over the quality, customization, and timing of your restorations.",
        "Because our lab is located right here in our office, we can design and create many restorations faster than traditional dental workflows that require work to be sent to an outside lab. This allows us to provide convenient same-day options for crowns, veneers, dentures, and more.",
        "Our in-house lab also makes it easier for our dental team to customize your restoration based on your smile, facial features, bite, and goals. Whether you need to repair a damaged tooth, refresh your smile, or replace missing teeth, we can provide care that is efficient, precise, and tailored to you.",
      ],
    },
    {
      kind: "list",
      heading: "Our in-house lab allows us to offer",
      items: [
        "Same-day crowns",
        "Same-day veneers",
        "Dentures and denture adjustments",
        "Customized restorations",
        "Faster turnaround times",
        "More direct quality control",
        "A more convenient patient experience",
      ],
    },
    {
      kind: "prose",
      heading: "Advanced technology, better patient care",
      body: [
        "Every piece of technology at Park Place Dental has one purpose: to improve your experience and your results. Whether we are using the RAYFace Facial Scanner to plan your smile, the Solea Dental Laser to make treatment more comfortable, or our in-house lab to create same-day restorations, our goal is to make high-quality dental care easier and more convenient.",
      ],
    },
  ],
  closing: {
    heading: "Ready to schedule your visit?",
    body: "Experience the difference advanced dental technology can make. Contact Park Place Dental today to learn more about our same-day restorations, laser dentistry, and personalized smile design options.",
  },
};

export const newPatients: SimplePage = {
  title: "New Patients",
  metaDescription:
    "Everything you need to get started as a new patient at Park Place Dental in Booneville, Mississippi.",
  eyebrow: "New Patients",
  headline: "Welcome to / Park Place Dental",
  lead: [
    "Finding the right dental office is about more than just services. It is about trust, comfort, and knowing you are in good hands. At Park Place Dental, we are proud to welcome new patients from Booneville and surrounding communities with care that is personalized, modern, and focused on long-term results.",
    "From your first phone call to your appointment and beyond, you can expect clear communication, a friendly environment, and a team that truly listens.",
  ],
  image: "/images/reception-front-desk.jpg",
  imageAlt: "The front desk at Park Place Dental",
  blocks: [
    {
      kind: "prose",
      body: [
        "Whether you are coming in for a routine visit, addressing a specific concern, or exploring options like cosmetic or restorative treatment, our team is here to make the process simple and stress-free. We understand that many patients are balancing busy schedules, family responsibilities, and travel from nearby towns, so we focus on efficient, high-quality care all in one place.",
        "Our goal is to build lasting relationships with patients who value dependable care and a dental team they can trust for years to come.",
      ],
    },
    {
      kind: "terms",
      heading: "Everything you need to get started",
      items: [
        {
          term: "What to expect as a new patient",
          text: "We make your first visit comfortable and informative. You will receive a thorough evaluation, clear explanations, and a personalized plan designed around your needs and goals.",
        },
        {
          term: "Insurance and financing options",
          text: "We accept most major insurance plans and offer flexible financing through CareCredit. Our team is happy to help you understand your benefits and find solutions that fit your budget.",
        },
        {
          term: "Convenient patient forms",
          text: "To save time during your visit, you can complete your forms ahead of your appointment. This helps us streamline your experience and focus more on your care.",
        },
        {
          term: "Comprehensive care in one location",
          text: "From preventive care to advanced procedures like implants and root canals, we offer a full range of services under one roof, so you do not have to travel between multiple offices.",
        },
      ],
    },
  ],
  closing: {
    heading: "Ready to become a new patient?",
    body: "Contact our office today or request your appointment online. We look forward to meeting you.",
  },
};

export const newPatientInformation: SimplePage = {
  title: "New Patient Information",
  metaDescription:
    "What to expect at your first visit to Park Place Dental in Booneville, Mississippi.",
  eyebrow: "New Patients",
  headline: "Your first visit, / made straightforward",
  lead: [
    "Choosing a new dentist should not feel overwhelming. At Park Place Dental, we make it easy to get started with care that is comfortable, straightforward, and tailored to your needs.",
    "From the moment you arrive, our goal is to help you feel at ease. We take the time to listen, answer your questions, and understand your goals so you can feel confident about your care from day one.",
  ],
  image: "/images/staff-with-child.jpg",
  imageAlt: "A team member with a young patient at Park Place Dental",
  blocks: [
    {
      kind: "prose",
      body: [
        "Patients from Booneville and surrounding communities often tell us they appreciate our friendly approach and attention to detail. We believe great dentistry starts with trust, and that begins with making your first visit a positive one.",
      ],
    },
    {
      kind: "terms",
      heading: "What to expect during your first appointment",
      items: [
        {
          term: "Personalized, one-on-one attention",
          text: "Your visit begins with a conversation. We will review your dental and medical history, talk through any concerns, and learn what matters most to you, whether that is maintaining your smile, addressing discomfort, or improving your appearance.",
        },
        {
          term: "Comprehensive exam and digital imaging",
          text: "We perform a thorough exam and take digital images to evaluate your teeth, gums, and bite. This allows us to catch potential issues early and recommend the most effective treatment options, helping you avoid more complex problems down the road.",
        },
        {
          term: "Clear, honest treatment planning",
          text: "After your exam, we will walk you through everything in a clear, easy-to-understand way. You will know exactly what we are seeing, what it means, and what your options are. Our goal is to help you make informed decisions without pressure.",
        },
        {
          term: "Comfort and convenience you can count on",
          text: "We understand that life gets busy, and many of our patients travel from nearby towns for care. That is why we focus on efficient, high-quality treatment in one convenient location, so you can get the care you need without unnecessary hassle.",
        },
      ],
    },
  ],
  closing: {
    heading: "Ready to schedule your first visit?",
    body: "If you are looking for a dentist in Booneville who values comfort, quality, and long-term relationships, Park Place Dental is here for you. Contact us today or request an appointment online.",
  },
};

export const insuranceFinancing: SimplePage = {
  title: "Insurance & Financing",
  metaDescription:
    "Accepted insurance plans and CareCredit financing at Park Place Dental in Booneville, Mississippi.",
  eyebrow: "New Patients",
  headline: "Straightforward about / what care costs",
  lead: [
    "At Park Place Dental, we believe getting the care you need should not feel complicated or overwhelming. That is why we make insurance and payment options as straightforward as possible so you can focus on your health, not the paperwork.",
    "Our team works with patients across Booneville and surrounding communities every day to help them understand their coverage, maximize their benefits, and find solutions that fit their budget.",
  ],
  image: "/images/team-member-desk.jpg",
  imageAlt: "A Park Place Dental team member at the front desk",
  blocks: [
    {
      kind: "list",
      heading: "We accept most major insurance plans",
      intro:
        "Park Place Dental accepts a wide range of insurance providers, including:",
      items: [
        "Aetna, both Medicare and commercial plans",
        "Cigna",
        "Delta Dental",
        "Guardian",
        "MetLife",
        "Sunlife",
        "UMR",
        "Always Care and Unum",
        "Equitable",
        "Medicaid and MSCAN Magnolia",
      ],
    },
    {
      kind: "prose",
      body: [
        "If you are unsure about your coverage, our team is happy to help verify your benefits and explain what is included before your visit.",
      ],
    },
    {
      kind: "list",
      heading: "Flexible financing with CareCredit",
      intro:
        "For treatments not fully covered by insurance, such as cosmetic procedures, implants, or more comprehensive care, CareCredit allows you to:",
      items: [
        "Break treatment costs into manageable monthly payments",
        "Move forward with care without delay",
        "Choose plans that fit your financial situation",
      ],
    },
    {
      kind: "prose",
      heading: "Clear, upfront communication",
      body: [
        "We believe in being transparent about costs. Before starting any treatment, we will review your options, explain your estimated costs, and answer any questions you may have.",
        "Our goal is simple. No surprises, no pressure, just honest guidance so you can make the best decision for your care. If you have been putting off dental care because of cost concerns, you are not alone, and we are here to help.",
      ],
    },
  ],
  closing: {
    heading: "Ready to get started without the stress?",
    body: "Contact Park Place Dental today or request an appointment online. Our team will walk you through your options and help you take the next step with confidence.",
  },
};

export const patientResources: SimplePage = {
  title: "Patient Resources",
  metaDescription:
    "FAQs, patient reviews and oral health guidance from Park Place Dental in Booneville, Mississippi.",
  eyebrow: "Patient Resources",
  headline: "Helpful information / for every stage of your care",
  lead: [
    "We want your experience with us to be as simple and comfortable as possible, before your visit as well as during it.",
  ],
  blocks: [
    {
      kind: "terms",
      items: [
        {
          term: "Frequently asked questions",
          text: "Have questions about dental visits, treatments, or what to expect? Our FAQs cover common topics to help you feel prepared and informed before your appointment.",
        },
        {
          term: "Reviews and testimonials",
          text: "See what other patients from Booneville and nearby areas are saying about their experience at Park Place Dental. We are proud to build long-term relationships based on trust, comfort, and high-quality care.",
        },
        {
          term: "Dental blog and education",
          text: "Looking to learn more about your oral health or explore treatment options? Our blog provides helpful insights, tips, and guidance on everything from preventive care to advanced procedures.",
        },
      ],
    },
  ],
  closing: {
    heading: "Have questions? We are here to help",
    body: "If you do not see what you are looking for or would prefer to speak with someone directly, our team is always happy to help.",
  },
};

export const blogPage: SimplePage = {
  title: "Blog",
  metaDescription:
    "Oral health tips and treatment insights from the team at Park Place Dental in Booneville, Mississippi.",
  eyebrow: "Patient Resources",
  headline: "Tips and insights / from our team",
  lead: [
    "Stay informed with helpful tips, treatment insights, and oral health advice from the team at Park Place Dental.",
    "Our blog is designed to answer common questions, explain your options, and help you make confident decisions about your dental care.",
  ],
  blocks: [],
  closing: {
    heading: "Have a question we have not covered?",
    body: "Our team is always happy to talk it through. Call the office or request an appointment and we will make time for your questions.",
  },
};

export const faqs = [
  {
    q: "How often should I visit the dentist?",
    a: "Most patients should visit every six months for cleanings and exams. However, some patients may need more frequent visits depending on their oral health. Regular checkups help prevent problems and catch issues early.",
  },
  {
    q: "What if I have not been to the dentist in years?",
    a: "You are not alone, and there is no judgment here. Our team focuses on helping you move forward with a clear, comfortable plan. We will assess your current needs and guide you step by step.",
  },
  {
    q: "Do you accept dental insurance?",
    a: "Yes, we accept most major insurance plans and will help you understand your benefits. Our team works with you to maximize coverage and make the process as simple as possible.",
  },
  {
    q: "Do you offer payment plans?",
    a: "We offer flexible financing through CareCredit, which allows you to break treatment costs into manageable monthly payments. This is especially helpful for larger procedures like implants or cosmetic work.",
  },
  {
    q: "Are dental procedures painful?",
    a: "Modern dentistry is more comfortable than ever. We use gentle techniques and prioritize your comfort throughout your visit. Many patients are surprised at how easy and stress-free their experience is.",
  },
  {
    q: "What are my options for replacing missing teeth?",
    a: "We offer several solutions, including dental implants, bridges, and dentures. Implants are often the most long-term solution, providing a natural look and feel while restoring function.",
  },
  {
    q: "How do I know if I need a root canal?",
    a: "Common signs include persistent tooth pain, sensitivity to hot or cold, swelling, or discomfort when chewing. Our in-house expertise allows us to diagnose and treat these issues efficiently and comfortably.",
  },
  {
    q: "Can you help improve the appearance of my smile?",
    a: "Absolutely. We offer cosmetic treatments such as veneers, teeth whitening, and smile makeovers. We also provide Botox and dermal fillers to enhance your overall appearance.",
  },
  {
    q: "What should I do if I have a dental emergency?",
    a: "If you are experiencing pain, swelling, or a dental injury, contact our office as soon as possible. We do our best to accommodate emergency visits quickly and relieve discomfort.",
  },
  {
    q: "Do you treat both routine and complex cases?",
    a: "Yes. Park Place Dental provides everything from preventive care to advanced treatments like implants, root canals, and full smile restorations, all in one convenient location.",
  },
] as const;

export const patientForms = [
  { label: "New Patient Forms", description: "Start here if this is your first visit." },
  { label: "Medical History Form", description: "Your health history helps us treat you safely." },
  { label: "Insurance Information Form", description: "So we can verify your benefits ahead of time." },
] as const;

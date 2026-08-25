/**
 * Single source of truth for site copy.
 *
 * Every line here is taken from the live Park Place Dental site and kept as
 * close to the approved wording as possible. Two deliberate edits:
 *   1. The doctor is Dr. Ken Goodwin. The live homepage says "Kevin", which
 *      is wrong. His own bio page says Ken.
 *   2. Em dashes have been rewritten out of the copy. House rule, no exceptions.
 */

export const practice = {
  name: "Park Place Dental",
  town: "Booneville",
  state: "Mississippi",
  stateShort: "MS",
  county: "Prentiss County",
  address: {
    street: "403 N 3rd St",
    city: "Booneville",
    region: "MS",
    postalCode: "38829",
    full: "403 N 3rd St, Booneville, Mississippi 38829",
  },
  phone: "(662) 728-8171",
  phoneHref: "tel:+16627288171",
  email: "apptatppd@gmail.com",
  emailHref: "mailto:apptatppd@gmail.com",
  hours: "Monday to Friday, 8:30 AM to 5:00 PM",
  hoursNote: "Friday hours may vary",
  mapsHref:
    "https://www.google.com/maps/search/?api=1&query=403+N+3rd+St+Booneville+MS+38829",
} as const;

export const doctor = {
  name: "Dr. Ken Goodwin",
  shortName: "Dr. Goodwin",
  credential: "DMD",
  yearsPracticing: 43,
  portrait: "/images/dr-ken-goodwin-portrait.jpg",
  bio: [
    "Dr. Ken Goodwin is a dedicated and experienced dentist with over 43 years of providing exceptional patient care. A proud graduate of the University of Mississippi, where he earned his Bachelor of Arts in 1978, he went on to receive his Doctor of Dental Medicine degree from the University of Mississippi School of Dentistry in 1982.",
    "Originally from Booneville, Dr. Goodwin returned to his hometown with a passion for serving those around him. He is committed to creating beautiful, confident smiles while building lasting relationships with his patients. His practice offers a family-oriented work environment and strives to be a welcoming, comforting place for every patient.",
    "Dr. Goodwin is also dedicated to staying at the forefront of dentistry, utilizing cutting-edge technology and maintaining the highest quality equipment. Outside the office, he enjoys spending time with his family, duck hunting, and supporting the Ole Miss Rebels.",
  ],
} as const;

export const hero = {
  eyebrow: "Close to Home",
  headline: "Transform Your Smile with Expert Care",
  subhead:
    "From routine check-ups to advanced cosmetic and restorative treatments, we are here to keep your smile healthy, beautiful, and confident.",
  primaryCta: { label: "Book an appointment", href: "/book-an-appointment" },
  secondaryCta: { label: "Explore our services", href: "/services" },
  image: "/images/hero-entryway.png",
  imageAlt:
    "The entry hall at Park Place Dental looking through to a treatment room filled with afternoon light",
} as const;

export const welcome = {
  eyebrow: "Welcome to Park Place Dental",
  headline: "Your Trusted Dentist in Booneville",
  subhead: "Comprehensive Dental Services, Personalized for You",
  body: "Our in-house dental lab allows us to design and craft restorations on-site, so patients spend less time waiting and more time enjoying their results. We focus on your comfort and ensure a stress-free, family-friendly experience.",
  cta: { label: "More about us", href: "/about-us/about-the-practice" },
  image: "/images/team-group-porch.jpg",
  imageAlt: "The Park Place Dental team outside the practice in Booneville",
} as const;

/** Marks of trust. Every figure is drawn from the practice's own material. */
export const proofPoints = [
  { value: "43", suffix: "+", label: "Years caring for this community" },
  { value: "1982", suffix: "", label: "Dr. Goodwin earned his DMD" },
  { value: "1", suffix: "", label: "In-house lab for same-day work" },
  { value: "VA", suffix: "", label: "Trusted provider for veterans" },
] as const;

export const featuredServices = [
  {
    title: "Veneers",
    slug: "/services/cosmetic-dentistry/veneers",
    body: "Transform your smile with porcelain veneers. We correct imperfections like chips, stains, and misalignment for a flawless appearance.",
    image: "/images/smile-closeup.jpg",
    imageAlt: "Close view of a finished veneer case",
  },
  {
    title: "Root Canal Treatment",
    slug: "/services/general-dentistry/root-canals",
    body: "Get expert care with our in-house endodontic specialist. We offer comfortable, effective root canal treatment to save your natural teeth.",
    image: "/images/goodwin-and-assistant.jpg",
    imageAlt: "Dr. Goodwin and a team member prepared for treatment",
  },
  {
    title: "Same-Day Crowns",
    slug: "/services/restorative-dentistry/crowns-bridges",
    body: "Our in-house lab allows us to design and produce same-day crowns, reducing wait times and streamlining your care. For more complex needs, we offer full mouth reconstruction with custom crowns and bridges created right in our office for greater precision and efficiency.",
    image: "/images/operatory-technology.jpg",
    imageAlt: "Digital scanning equipment in a Park Place Dental treatment room",
  },
  {
    title: "Dental Implants",
    slug: "/services/restorative-dentistry/dental-implants",
    body: "Regain your smile with permanent, lifelike dental implants. Our implants are designed to look and function like your natural teeth, and they are produced in our in-house lab for a faster, more precise fit.",
    image: "/images/procedure-closeup.jpg",
    imageAlt: "A restorative procedure underway at Park Place Dental",
  },
] as const;

export const serviceCategories = [
  {
    title: "General Dentistry",
    slug: "/services/general-dentistry",
    blurb:
      "Gentle, effective care for patients of all ages, from routine check-ups and cleanings to same-day emergency visits.",
    items: ["Cleanings & Exams", "Fillings", "Root Canals", "Emergency Dentistry"],
  },
  {
    title: "Restorative Dentistry",
    slug: "/services/restorative-dentistry",
    blurb:
      "Lasting solutions that bring your smile back to full function and beauty, crafted in our own lab.",
    items: ["Dental Implants", "Crowns & Bridges", "Dentures"],
  },
  {
    title: "Cosmetic Dentistry",
    slug: "/services/cosmetic-dentistry",
    blurb:
      "Advanced techniques that enhance the beauty and function of your teeth, from whitening to a full smile makeover.",
    items: ["Veneers", "Teeth Whitening", "Smile Makeovers", "Smile Gallery"],
  },
  {
    title: "Periodontal Care",
    slug: "/services/periodontal-care",
    blurb:
      "Healthy gums are the foundation of a strong smile. We prevent, detect, and treat gum disease early.",
    items: ["Gum Disease Treatment"],
  },
  {
    title: "Facial Aesthetics",
    slug: "/services/facial-aesthetics",
    blurb:
      "Subtle, natural-looking treatments that enhance your features, offered in the office you already trust.",
    items: ["Botox", "Dermal Fillers"],
  },
  {
    title: "Advanced Technology",
    slug: "/advanced-dental-technology",
    blurb:
      "Facial scanning, laser dentistry, and an in-house lab that together make care more comfortable and precise.",
    items: ["RAYFace Scanner", "Solea Laser", "In-House Lab"],
  },
] as const;

export const technology = {
  eyebrow: "Advanced Dental Technology",
  headline: "Modern Dental Technology for a Better Experience",
  intro:
    "At Park Place Dental, we use advanced technology to make your care more comfortable, precise, and convenient.",
  cta: { label: "Read more", href: "/advanced-dental-technology" },
  items: [
    {
      name: "RAYFace Facial Scanner",
      body: "Our RAYFace Facial Scanner helps us create personalized treatment plans by capturing a detailed 3D view of your smile and facial features, allowing us to design results that look natural and balanced.",
      image: "/images/operatory-technology.jpg",
      imageAlt: "The RAYFace scanning setup in a Park Place Dental treatment room",
    },
    {
      name: "Solea Dental Laser",
      body: "We also use the Solea Dental Laser for many hard and soft tissue procedures, helping patients enjoy a quieter, more comfortable experience with less anxiety and, in many cases, little to no need for anesthesia.",
      image: "/images/operatory-room.jpg",
      imageAlt: "A Park Place Dental treatment room prepared for a procedure",
    },
    {
      name: "In-House Dental Lab",
      body: "With our in-house dental lab, we can create beautiful, custom restorations faster. That means same-day options for crowns, veneers, dentures, and more, all designed with quality, convenience, and your smile in mind.",
      image: "/images/procedure-closeup.jpg",
      imageAlt: "A custom restoration being fitted at Park Place Dental",
    },
  ],
} as const;

export const doctorSection = {
  eyebrow: "Our Doctor",
  headline: "Expert Care, Trusted Results",
  subhead: `Meet Your Dentist, ${doctor.name}`,
  body: "Dr. Goodwin and the entire team at Park Place Dental are dedicated to providing personalized, high-quality care to each patient. With a focus on comfort, modern techniques, and a commitment to excellence, we ensure that you leave every visit with a smile.",
  cta: { label: "Read more", href: "/about-us/meet-the-dentist" },
} as const;

export const commitment = {
  eyebrow: "Committed to your complete care",
  headline: "Where Quality Care Meets Comfortable Dentistry",
  body: "At Park Place Dental, we combine advanced technology with a patient-first approach to deliver comfortable, reliable care you can trust. From routine visits to complete smile transformations, our goal is simple. We help you look, feel, and smile your best every day.",
  cta: { label: "About the practice", href: "/about-us/about-the-practice" },
} as const;

export const veteransNote =
  "As a trusted VA provider, we are here to serve our veteran community with quality care and dedicated support.";

export const testimonials = [
  {
    quote:
      "I've been a Park Place customer for almost 5 years, and now I have to drive 90 miles to get here! But when you find a dental office that treats you well, professionally and with a smile, gets you in and out on time, you keep coming back!",
    name: "Joe Lawson",
  },
  {
    quote:
      "Dr. Goodwin is amazing. He and his staff worked me in super fast, like the day of/next day, to fix my chipped tooth! He gave me a beautiful smile back in high school and gave me that same beautiful smile again!! Absolutely love them the best dentist office in the north Mississippi area!!!",
    name: "Liberty Burcham",
  },
  {
    quote:
      "I have been a client of Park Place Dental since 1987 and have never been disappointed with the treatment from each of their staff. The staff is very prompt and efficient. Through these years, they have become like family to me. Thank you, Park Place Dental, for your service!",
    name: "Nelene Pannell",
  },
  {
    quote:
      "Love the entire staff at Park Place Dental. Mrs. McDougald and Mrs. Ann are the best ever. I haven't stopped smiling since I got a new smile. Love all of you.",
    name: "Rick Wilkins",
  },
  {
    quote:
      "We've been using this office for years & years. Never had a bad experience. Super-friendly staff, and always have us in and out in no time! We LOVE Park Place Dental!",
    name: "Candace Mitchell",
  },
] as const;

export const smileGallery = {
  eyebrow: "Smile Gallery",
  headline: "See the stunning results for yourself",
  body: "Our Smile Gallery features before-and-after photos of patients who have experienced life-changing cosmetic dental procedures. Browse our gallery for inspiration and see the results that can be achieved with cosmetic dentistry.",
  cta: { label: "View the gallery", href: "/services/cosmetic-dentistry/smile-gallery-before-after" },
  cases: [
    { image: "/images/smile-before-after-1.jpg", alt: "Before and after a cosmetic case at Park Place Dental" },
    { image: "/images/smile-before-after-2.jpg", alt: "Before and after a second cosmetic case at Park Place Dental" },
  ],
} as const;

export const insurance = {
  eyebrow: "Insurance & Financing",
  headline: "We accept most major insurance plans",
  body: "If you are unsure about your coverage, our team is happy to help verify your benefits and explain what is included before your visit. For treatments not fully covered by insurance, we offer flexible financing through CareCredit.",
  cta: { label: "Insurance and financing", href: "/new-patients/insurance-financing" },
  carriers: [
    "Aetna",
    "Cigna",
    "Delta Dental",
    "Guardian",
    "MetLife",
    "Sunlife",
    "UMR",
    "Always Care / Unum",
    "Equitable",
    "Medicaid and MSCAN Magnolia",
    "CareCredit",
  ],
} as const;

export const closingCta = {
  eyebrow: "Smiles That Shine, Comfort That Lasts",
  headline: "Ready to Smile with Confidence?",
  body: "Everyone deserves a smile they are proud of. Whether you are in need of a routine check-up, cosmetic enhancements like veneers, or a complex dental implant, we are committed to providing care that fits your unique needs.",
  primaryCta: { label: "Book an appointment today", href: "/book-an-appointment" },
  secondaryCta: { label: practice.phone, href: practice.phoneHref },
  image: "/images/reception-front-desk.jpg",
  imageAlt: "The front desk at Park Place Dental",
} as const;

export const nav = [
  {
    label: "About Us",
    href: "/about-us/about-the-practice",
    children: [
      { label: "About the Practice", href: "/about-us/about-the-practice" },
      { label: "Meet the Dentist", href: "/about-us/meet-the-dentist" },
      { label: "Meet the Team", href: "/about-us/meet-the-team" },
    ],
  },
  {
    label: "Services",
    href: "/services",
    children: [
      { label: "General Dentistry", href: "/services/general-dentistry" },
      { label: "Restorative Dentistry", href: "/services/restorative-dentistry" },
      { label: "Cosmetic Dentistry", href: "/services/cosmetic-dentistry" },
      { label: "Periodontal Care", href: "/services/periodontal-care" },
      { label: "Facial Aesthetics", href: "/services/facial-aesthetics" },
      { label: "Advanced Dental Technology", href: "/advanced-dental-technology" },
    ],
  },
  {
    label: "New Patients",
    href: "/new-patients",
    children: [
      { label: "New Patient Information", href: "/new-patients/new-patient-information" },
      { label: "Insurance & Financing", href: "/new-patients/insurance-financing" },
      { label: "Patient Forms", href: "/new-patients/patient-forms" },
    ],
  },
  {
    label: "Patient Resources",
    href: "/patient-resources",
    children: [
      { label: "FAQs", href: "/patient-resources/faqs" },
      { label: "Reviews & Testimonials", href: "/patient-resources/reviews-testimonials" },
      { label: "Blog", href: "/patient-resources/blog" },
    ],
  },
  { label: "Contact Us", href: "/contact-us", children: [] },
] as const;

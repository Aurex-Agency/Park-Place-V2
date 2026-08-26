/**
 * Every services page, as data.
 *
 * Copy is taken from the live site. Em dashes in the source have been
 * rewritten, and the one price the old site published is carried through
 * exactly as written there.
 */

export type Block =
  | { kind: "prose"; heading?: string; body: string[] }
  | { kind: "list"; heading?: string; intro?: string; items: string[] }
  | { kind: "terms"; heading?: string; intro?: string; items: { term: string; text: string }[] }
  | { kind: "steps"; heading?: string; intro?: string; items: { term: string; text: string }[] };

export type ServiceDetail = {
  slug: string;
  title: string;
  metaDescription: string;
  lead: string;
  image: string;
  imageAlt: string;
  note?: string;
  blocks: Block[];
  closing: { heading: string; body: string };
};

export type ServiceCategory = {
  slug: string;
  title: string;
  eyebrow: string;
  metaDescription: string;
  lead: string[];
  image: string;
  imageAlt: string;
  children: ServiceDetail[];
  closing: { heading: string; body: string };
};

export const serviceCategories: ServiceCategory[] = [
  {
    slug: "general-dentistry",
    title: "General Dentistry",
    eyebrow: "General Dentistry",
    metaDescription:
      "Cleanings, exams, fillings, root canals and same-day emergency care in Booneville, Mississippi.",
    lead: [
      "At Park Place Dental, we offer comprehensive general dentistry services designed to help you maintain a healthy, beautiful smile for life. Our team provides gentle, effective care for patients of all ages, from routine check-ups and cleanings to advanced restorative treatments.",
      "Whether you need a cleaning, a filling, or immediate emergency care, we are here to make sure you receive the best care in a comfortable and welcoming environment.",
    ],
    image: "/images/hygienist-with-child.jpg",
    imageAlt: "A hygienist with a young patient at Park Place Dental",
    closing: {
      heading: "Maintain a healthy smile with our general dentistry services",
      body: "Whether you need a routine cleaning or immediate dental care, our experienced team is here to provide the best general dentistry services in Booneville, MS. Contact us today to schedule your appointment and take the first step toward a healthier, happier smile.",
    },
    children: [
      {
        slug: "cleanings-exams",
        title: "Cleanings & Exams",
        metaDescription:
          "Gentle, thorough cleanings and comprehensive exams at Park Place Dental in Booneville, Mississippi.",
        lead: "At Park Place Dental, we believe in the power of preventive care. Regular cleanings and exams are the foundation of maintaining a healthy, beautiful smile. Our team is dedicated to helping you achieve optimal oral health with gentle and thorough cleanings, along with comprehensive exams to catch potential issues early.",
        image: "/images/hygienist-with-child.jpg",
        imageAlt: "A hygienist working with a patient at Park Place Dental",
        blocks: [
          {
            kind: "prose",
            heading: "The importance of regular cleanings and exams",
            body: [
              "Prevention is the key to long-lasting oral health. Regular cleanings and exams not only keep your smile looking great but also help catch any potential problems early. By staying proactive with your dental care, you can avoid more serious and costly procedures down the road.",
              "Our team takes the time to ensure that each cleaning is thorough and personalized to meet your individual needs, making sure your teeth and gums stay in the best shape possible.",
            ],
          },
          {
            kind: "terms",
            heading: "What to expect during your cleaning and exam",
            items: [
              {
                term: "Thorough cleaning",
                text: "Our skilled hygienists use state-of-the-art tools to remove plaque, tartar, and surface stains, helping to prevent cavities and gum disease.",
              },
              {
                term: "Comprehensive exam",
                text: "Our dentist will examine your teeth, gums, and overall oral health to look for signs of decay, gum disease, or other issues that might require attention.",
              },
              {
                term: "X-rays",
                text: "If needed, we may take X-rays to check for hidden problems that are not visible during a visual exam.",
              },
            ],
          },
          {
            kind: "list",
            heading: "Why regular cleanings and exams are important",
            items: [
              "Prevent cavities and gum disease.",
              "Detect issues like cavities, oral cancer, and other health concerns early.",
              "Keep your smile looking and feeling great.",
            ],
          },
        ],
        closing: {
          heading: "Schedule your cleaning and exam today",
          body: "Keeping your smile healthy is simple with regular cleanings and exams. Contact Park Place Dental today to book your next appointment and ensure that your teeth stay strong and bright.",
        },
      },
      {
        slug: "fillings",
        title: "Fillings",
        metaDescription:
          "Tooth-colored composite fillings that blend with your natural teeth, in Booneville, Mississippi.",
        lead: "Cavities are a common dental issue, but they do not have to affect the function or beauty of your smile. At Park Place Dental, we offer tooth-colored fillings that restore the natural look and feel of your teeth while providing durable, long-lasting protection.",
        image: "/images/operatory-room.jpg",
        imageAlt: "A treatment room prepared at Park Place Dental",
        blocks: [
          {
            kind: "prose",
            heading: "What are tooth-colored fillings?",
            body: [
              "Tooth-colored fillings, also known as composite resin fillings, are designed to match the color of your natural teeth. These fillings are ideal for cavities in visible areas, providing a seamless finish that is both functional and aesthetic.",
            ],
          },
          {
            kind: "terms",
            heading: "Benefits of tooth-colored fillings",
            items: [
              {
                term: "Natural appearance",
                text: "Fillings blend in with your natural tooth color, ensuring a smooth, flawless look.",
              },
              {
                term: "Durable and long-lasting",
                text: "These fillings are strong, providing effective protection against further decay.",
              },
              {
                term: "Less invasive",
                text: "The process requires minimal removal of the natural tooth structure, preserving the integrity of your teeth.",
              },
            ],
          },
          {
            kind: "steps",
            heading: "How we place fillings",
            items: [
              { term: "Diagnosis", text: "Our dentist will evaluate the extent of the cavity and recommend the best course of treatment." },
              { term: "Preparation", text: "We clean the affected area and prepare it for the filling." },
              { term: "Filling application", text: "The tooth-colored material is applied and shaped to match the natural contours of your tooth." },
              { term: "Finishing touches", text: "After the material hardens, we polish the filling to ensure it blends seamlessly with your smile." },
            ],
          },
        ],
        closing: {
          heading: "Restore your tooth today with tooth-colored fillings",
          body: "Do not let cavities compromise your smile. Contact Park Place Dental to learn more about tooth-colored fillings and how they can help restore your teeth to their natural beauty.",
        },
      },
      {
        slug: "root-canals",
        title: "Root Canals",
        metaDescription:
          "Comfortable root canal treatment with an in-house endodontic specialist in Booneville, Mississippi.",
        lead: "If you are experiencing severe tooth pain or sensitivity, you may need a root canal. This common procedure is designed to save a severely infected or damaged tooth, allowing you to keep your natural tooth and avoid extraction. Our in-house endodontic specialist ensures that your root canal treatment is as comfortable and effective as possible.",
        image: "/images/goodwin-and-assistant.jpg",
        imageAlt: "Dr. Goodwin and a team member prepared for treatment",
        blocks: [
          {
            kind: "prose",
            heading: "What is a root canal?",
            body: [
              "A root canal is a procedure used to remove infected or damaged tissue from inside your tooth. After the pulp, the soft tissue inside the tooth, is removed, the tooth is sealed and a crown is placed to restore its function and appearance.",
            ],
          },
          {
            kind: "list",
            heading: "Signs you may need a root canal",
            items: [
              "Severe tooth pain or sensitivity to hot and cold",
              "Swelling or tenderness around the tooth or gums",
              "Darkening of the tooth",
              "Prolonged discomfort or pain",
            ],
          },
          {
            kind: "terms",
            heading: "Why choose Park Place Dental for your root canal?",
            items: [
              { term: "Expert care", text: "Our in-house endodontic specialist has the experience and expertise to ensure that your root canal is performed with precision and care." },
              { term: "Comfort", text: "We use the latest technology and techniques to ensure that your procedure is as pain-free and comfortable as possible." },
              { term: "Long-term results", text: "After your root canal, we provide a crown to protect and restore your tooth, ensuring it lasts for years to come." },
            ],
          },
        ],
        closing: {
          heading: "Get relief from tooth pain with root canal treatment",
          body: "If you are experiencing tooth pain or think you may need a root canal, do not wait. Contact Park Place Dental today to schedule an appointment and preserve your natural tooth.",
        },
      },
      {
        slug: "emergency-dentistry",
        title: "Emergency Dentistry",
        metaDescription:
          "Same-day emergency dental care in Booneville, Mississippi. Call (662) 728-8171.",
        lead: "Dental emergencies can happen at any time, and when they do, it is important to get immediate care. At Park Place Dental, we offer emergency dentistry services to help you when it is needed most. Whether it is a toothache, a broken tooth, or an injury to the mouth, our team is ready to provide fast, effective treatment.",
        image: "/images/procedure-closeup.jpg",
        imageAlt: "A procedure underway at Park Place Dental",
        blocks: [
          {
            kind: "list",
            heading: "Common dental emergencies we treat",
            items: [
              "Severe toothache or pain",
              "Broken, cracked, or chipped teeth",
              "Knocked-out tooth",
              "Lost filling or crown",
              "Abscesses or oral infections",
              "Trauma or injury to the mouth or jaw",
            ],
          },
          {
            kind: "steps",
            heading: "What to do in a dental emergency",
            items: [
              { term: "Stay calm", text: "Contact our office immediately, and we will fit you in for a same-day appointment." },
              { term: "Preserve your tooth", text: "If a tooth is knocked out, try to place it back in the socket or keep it moist with milk or saline." },
              { term: "Avoid pain", text: "Use over-the-counter pain relievers to alleviate discomfort until our team can see you." },
            ],
          },
          {
            kind: "terms",
            heading: "Why choose Park Place Dental for emergency care?",
            items: [
              { term: "Advanced techniques and technology", text: "We utilize the latest dental technology to ensure fast and accurate diagnoses. Our tools help us provide effective, minimally invasive treatments that maximize comfort during emergency procedures." },
              { term: "Skilled team", text: "Our experienced team is equipped to handle a variety of dental emergencies with precision and care." },
              { term: "Comfort", text: "We understand the stress of a dental emergency, and our goal is to provide fast, effective treatment to minimize pain and anxiety." },
            ],
          },
        ],
        closing: {
          heading: "Get the emergency dentistry care you need",
          body: "If you are experiencing a dental emergency, do not hesitate to reach out to Park Place Dental. We are here to provide quick, efficient care to relieve pain and restore your smile.",
        },
      },
    ],
  },
  {
    slug: "restorative-dentistry",
    title: "Restorative Dentistry",
    eyebrow: "Restorative Dentistry",
    metaDescription:
      "Dental implants, crowns, bridges and dentures crafted in our in-house lab in Booneville, Mississippi.",
    lead: [
      "At Park Place Dental, we specialize in restorative dentistry services that are designed to bring your smile back to its full function and beauty. Whether you need a dental implant, a crown and bridge, or dentures, we are here to provide effective and lasting solutions.",
      "Our expert team uses advanced techniques and materials to restore your teeth, helping you regain the confidence to smile, eat, and speak without worry.",
    ],
    image: "/images/procedure-closeup.jpg",
    imageAlt: "A restorative procedure underway at Park Place Dental",
    closing: {
      heading: "Restore your smile today with restorative dentistry",
      body: "If you are struggling with damaged or missing teeth, do not wait to restore your smile. Contact Park Place Dental today to schedule your consultation and discover which restorative treatment is best for you.",
    },
    children: [
      {
        slug: "dental-implants",
        title: "Dental Implants",
        metaDescription:
          "Permanent, natural-looking dental implants with crowns from our in-house lab in Booneville, Mississippi.",
        lead: "Dental implants are a revolutionary solution for replacing missing or severely damaged teeth. At Park Place Dental, we offer state-of-the-art dental implants that look, feel, and function just like your natural teeth. Whether you are missing a single tooth or need a full arch replacement, dental implants are a durable and permanent option that restores both the function and beauty of your smile.",
        image: "/images/operatory-technology.jpg",
        imageAlt: "Digital scanning equipment at Park Place Dental",
        blocks: [
          {
            kind: "prose",
            heading: "What are dental implants?",
            body: [
              "A dental implant is a titanium post that is surgically placed into your jawbone, where it acts as a replacement for the root of a missing tooth. After the implant fuses with the bone in a process called osseointegration, a custom-made crown from our in-house lab is placed on top of the implant, restoring the appearance and function of the missing tooth.",
            ],
          },
          {
            kind: "terms",
            heading: "Benefits of dental implants",
            items: [
              { term: "Natural appearance", text: "Implants blend seamlessly with your natural teeth and are virtually indistinguishable from real teeth." },
              { term: "Durability", text: "Dental implants are designed to last for decades, offering a permanent solution for tooth loss." },
              { term: "Improved function", text: "Implants restore full chewing and speaking ability, so you can enjoy all the foods you love without worry." },
              { term: "Preserved jawbone", text: "Since implants stimulate the jawbone like natural tooth roots, they help prevent bone loss and preserve your facial structure." },
            ],
          },
          {
            kind: "steps",
            heading: "The dental implant process",
            items: [
              { term: "Consultation", text: "Your treatment begins with a thorough consultation, including a detailed exam and X-rays, to determine if dental implants are the right option for you." },
              { term: "Placement", text: "The titanium post is surgically placed into your jawbone, where it will gradually fuse with the bone." },
              { term: "Healing", text: "After the implant is securely integrated into the bone, we take impressions of your mouth to create a custom crown." },
              { term: "Restoration", text: "Once the crown is ready, crafted right here in our in-house lab for a precise, custom fit, it is placed on the implant to complete your restoration, giving you a fully functional and natural-looking tooth." },
            ],
          },
        ],
        closing: {
          heading: "Restore your smile today with dental implants",
          body: "Dental implants are a life-changing solution for missing teeth. With our in-house lab, we are able to deliver high-quality restorations with fewer appointments and less wait time. Contact Park Place Dental today to schedule your consultation.",
        },
      },
      {
        slug: "crowns-bridges",
        title: "Crowns & Bridges",
        metaDescription:
          "Same-day crowns and custom bridges made in our in-house lab in Booneville, Mississippi.",
        lead: "If you have damaged or missing teeth, crowns and bridges are an excellent way to restore both the function and appearance of your smile. At Park Place Dental, we focus not only on strength and durability, but also on creating natural-looking, cosmetic results that help you feel confident every time you smile.",
        image: "/images/operatory-technology.jpg",
        imageAlt: "Scanning and design equipment at Park Place Dental",
        blocks: [
          {
            kind: "prose",
            heading: "What are crowns and bridges?",
            body: [
              "A dental crown is a cap that covers a damaged or decayed tooth. Crowns restore the shape, strength, and function of the tooth, while also improving its appearance.",
              "A bridge is a fixed restoration used to replace one or more missing teeth. It spans the gap left by the missing tooth, anchored to adjacent teeth or dental implants for stability.",
            ],
          },
          {
            kind: "terms",
            heading: "Benefits of crowns and bridges",
            items: [
              { term: "Natural, cosmetic results", text: "Crowns and bridges are carefully designed to match the color, shape, and contour of your natural teeth, creating a seamless, confident smile." },
              { term: "Durability", text: "Both crowns and bridges are made from high-quality materials that are built to last." },
              { term: "Restore function", text: "These restorations restore the ability to chew, speak, and smile confidently." },
              { term: "Prevent shifting", text: "Bridges help maintain the alignment of your remaining teeth, preventing them from shifting into the gap left by missing teeth." },
            ],
          },
          {
            kind: "steps",
            heading: "The crown and bridge process",
            items: [
              { term: "Consultation and planning", text: "We begin by evaluating the condition of your teeth and discussing the best options for restoring them with crowns or bridges." },
              { term: "Preparation", text: "If you are getting a crown, the damaged tooth is prepared by removing decay or reshaping the tooth to accommodate the crown. For a bridge, the adjacent teeth are prepared to serve as anchors." },
              { term: "Impressions", text: "We take precise impressions of your teeth to ensure your custom-made crown or bridge fits perfectly." },
              { term: "Fitting", text: "Once your restoration is ready, we place the crown or bridge, making any necessary adjustments to ensure a perfect fit and comfortable bite." },
            ],
          },
          {
            kind: "prose",
            heading: "Same-day crowns and our in-house lab",
            body: [
              "Our in-house lab allows us to design and produce same-day crowns, reducing wait times and streamlining your care. For more complex needs, we offer full mouth reconstruction with custom crowns and bridges created right in our office for greater precision and efficiency.",
              "Modern dental bridgework is about more than replacing missing teeth. It is about restoring your smile's appearance. Our custom bridges are designed with aesthetics in mind, ensuring they blend beautifully with your surrounding teeth for a natural, balanced look.",
            ],
          },
        ],
        closing: {
          heading: "Get your smile back with crowns and bridges",
          body: "Do not let damaged or missing teeth affect your confidence or oral function. Whether you are looking to restore function or enhance your smile's appearance, our custom crowns and bridges are designed to deliver lasting, natural-looking results.",
        },
      },
      {
        slug: "dentures",
        title: "Dentures",
        metaDescription:
          "Full, partial and implant-supported dentures made in our in-house lab in Booneville, Mississippi.",
        lead: "Dentures are a reliable and affordable solution for individuals who have lost multiple teeth. Whether you are missing a few teeth or an entire set, dentures can restore both the appearance and function of your smile, allowing you to eat, speak, and smile with confidence once again.",
        image: "/images/goodwin-and-assistant.jpg",
        imageAlt: "Dr. Goodwin and a team member at Park Place Dental",
        note: "Our in-house lab allows us to design and produce same-day dentures, reducing wait times and streamlining your care.",
        blocks: [
          {
            kind: "prose",
            heading: "What are dentures?",
            body: [
              "Dentures are removable prosthetic devices that replace missing teeth. They are custom-designed to fit your mouth and restore both the function and aesthetics of your smile. Dentures can be full, replacing all teeth, or partial, replacing only some teeth, depending on your needs.",
            ],
          },
          {
            kind: "terms",
            heading: "Benefits of dentures",
            items: [
              { term: "Restored appearance", text: "Dentures fill the gaps left by missing teeth, enhancing your facial appearance and boosting your confidence." },
              { term: "Improved function", text: "Dentures restore your ability to chew food properly and speak clearly, making everyday activities easier and more comfortable." },
              { term: "Comfortable fit", text: "Our dentures are custom-made to fit your mouth perfectly, providing a snug, comfortable fit." },
              { term: "Affordable", text: "Dentures are a cost-effective option for replacing multiple teeth." },
            ],
          },
          {
            kind: "terms",
            heading: "Types of dentures",
            items: [
              { term: "Full dentures", text: "Designed for patients who are missing all their teeth, full dentures replace an entire upper or lower set of teeth." },
              { term: "Partial dentures", text: "Used when some natural teeth remain, partial dentures fill the gaps left by missing teeth and attach securely to your remaining teeth." },
              { term: "Implant-supported dentures", text: "These dentures are supported by dental implants, providing extra stability and preventing slippage." },
            ],
          },
          {
            kind: "steps",
            heading: "The denture process",
            items: [
              { term: "Consultation", text: "We evaluate your oral health and discuss the best denture option for you." },
              { term: "Impressions", text: "Our team takes precise impressions of your mouth to create custom dentures that fit comfortably." },
              { term: "Fitting and adjustments", text: "After your dentures are made, we ensure they fit properly and make any necessary adjustments to ensure comfort and function." },
              { term: "Final placement", text: "Once everything is in place, you will leave our office with a restored smile and improved functionality." },
            ],
          },
        ],
        closing: {
          heading: "Get your smile back with dentures",
          body: "If you are missing multiple teeth, dentures can help restore your smile and your quality of life. Contact Park Place Dental today to learn more about our custom dentures and how they can benefit you.",
        },
      },
    ],
  },
  {
    slug: "cosmetic-dentistry",
    title: "Cosmetic Dentistry",
    eyebrow: "Cosmetic Dentistry",
    metaDescription:
      "Porcelain veneers, professional whitening and full smile makeovers in Booneville, Mississippi.",
    lead: [
      "A beautiful smile can make a lasting impression. At Park Place Dental, we offer a range of cosmetic dentistry services to help you achieve the smile you have always dreamed of.",
      "From teeth whitening to smile makeovers, our expert team uses advanced techniques to enhance the beauty and function of your teeth, leaving you with a smile you will be proud to show off.",
    ],
    image: "/images/smile-closeup.jpg",
    imageAlt: "A finished cosmetic case at Park Place Dental",
    closing: {
      heading: "Achieve the smile of your dreams",
      body: "Cosmetic dentistry is about more than just aesthetics. It is about feeling confident and comfortable in your own smile. Contact us today to schedule a consultation and start your journey to a more beautiful smile.",
    },
    children: [
      {
        slug: "veneers",
        title: "Veneers",
        metaDescription:
          "Custom porcelain veneers, including a same-day option, at Park Place Dental in Booneville, Mississippi.",
        lead: "Veneers are one of the most effective ways to address a variety of cosmetic dental concerns, including chipped, stained, or uneven teeth. At Park Place Dental, we offer custom-designed porcelain veneers that blend seamlessly with your natural teeth, giving you a radiant, confident smile.",
        image: "/images/smile-closeup.jpg",
        imageAlt: "A finished veneer case at Park Place Dental",
        note: "Same day porcelain veneers, $5,000.00 for 8 teeth.",
        blocks: [
          {
            kind: "prose",
            heading: "What are veneers?",
            body: [
              "Veneers are thin shells made from porcelain or composite material that are bonded to the front of your teeth. They are custom-crafted to fit your smile, offering a solution for imperfections like discoloration, misalignment, gaps, and chips. Veneers are a versatile treatment that provide a long-lasting, natural-looking result.",
            ],
          },
          {
            kind: "terms",
            heading: "What are the benefits of veneers?",
            items: [
              { term: "Aesthetic improvement", text: "Veneers are designed to mimic the natural translucency of teeth, providing a beautiful, bright smile." },
              { term: "Durable and long-lasting", text: "Made from high-quality materials, veneers are strong, stain-resistant, and durable." },
              { term: "Minimal tooth alteration", text: "Veneers require little alteration to the natural tooth, preserving your tooth structure." },
              { term: "Instant transformation", text: "Veneers can make a dramatic difference to your smile in just a few visits." },
            ],
          },
          {
            kind: "steps",
            heading: "What is the veneer process?",
            items: [
              { term: "Consultation", text: "We begin with a consultation to determine whether veneers are the best option for you." },
              { term: "Preparation", text: "A small amount of enamel is removed from the tooth to make room for the veneer." },
              { term: "Impressions", text: "Custom impressions are taken to create your veneers, ensuring a perfect fit." },
              { term: "Placement", text: "Once your veneers are ready, they are carefully bonded to your teeth, providing an instant smile transformation." },
            ],
          },
        ],
        closing: {
          heading: "Get the smile you have always wanted",
          body: "If you are ready to enhance your smile, porcelain veneers may be the perfect solution for you. Contact Park Place Dental today to schedule your consultation and learn how veneers can transform your smile.",
        },
      },
      {
        slug: "teeth-whitening",
        title: "Teeth Whitening",
        metaDescription:
          "Professional teeth whitening with fast, noticeable results in Booneville, Mississippi.",
        lead: "If you are looking for a brighter, whiter smile, professional teeth whitening may be the solution you have been waiting for. At Park Place Dental, we offer advanced teeth whitening treatments that provide fast, noticeable results, giving you a stunning smile that shines with confidence.",
        image: "/images/smile-before-after-1.jpg",
        imageAlt: "Before and after a whitening case at Park Place Dental",
        blocks: [
          {
            kind: "prose",
            heading: "What is professional teeth whitening?",
            body: [
              "Professional teeth whitening is a safe, effective way to remove stains and discoloration from your teeth. Unlike over-the-counter whitening products, professional treatments use stronger, more effective whitening agents that can significantly brighten your smile in just one session.",
            ],
          },
          {
            kind: "terms",
            heading: "Benefits of teeth whitening",
            items: [
              { term: "Safe and effective", text: "Professional whitening treatments are carefully monitored to ensure that your teeth and gums remain healthy." },
              { term: "Fast results", text: "In just one visit, you can achieve noticeable results that last longer than store-bought whitening products." },
              { term: "Customized treatment", text: "Our team tailors the whitening treatment to your needs, ensuring the best results for your smile." },
              { term: "Boosted confidence", text: "A whiter smile can boost your self-esteem and help you feel more confident in your appearance." },
            ],
          },
          {
            kind: "steps",
            heading: "The teeth whitening process",
            items: [
              { term: "Consultation", text: "We begin by evaluating the shade of your teeth and discussing your whitening goals." },
              { term: "Whitening treatment", text: "The whitening gel is applied to your teeth, and a special light may be used to accelerate the process." },
              { term: "Post-treatment care", text: "We provide instructions for aftercare to help maintain your new bright smile for as long as possible." },
            ],
          },
        ],
        closing: {
          heading: "Achieve a brighter, whiter smile today",
          body: "Do not settle for dull or stained teeth. Contact Park Place Dental today to schedule your teeth whitening treatment and get the smile you deserve.",
        },
      },
      {
        slug: "smile-makeovers",
        title: "Smile Makeovers",
        metaDescription:
          "Personalized smile makeovers combining veneers, whitening, crowns and implants in Booneville, Mississippi.",
        lead: "A smile makeover combines advanced cosmetic and restorative treatments to improve the look, function, and balance of your smile. At Park Place Dental, every plan is customized to you.",
        image: "/images/smile-before-after-2.jpg",
        imageAlt: "Before and after a smile makeover at Park Place Dental",
        blocks: [
          {
            kind: "prose",
            body: [
              "Patients across Booneville choose smile makeovers to address multiple concerns at once, from discoloration and worn teeth to gaps or missing teeth. By combining treatments like veneers, whitening, crowns, and implants, we create natural, long-lasting results that enhance both your appearance and confidence.",
            ],
          },
          {
            kind: "prose",
            heading: "A customized approach to your ideal smile",
            body: [
              "No two smiles are the same, which is why every smile makeover begins with a detailed consultation focused on your goals, lifestyle, and long-term oral health.",
              "We evaluate your teeth, bite, and facial structure to design a treatment plan tailored specifically to you. Your makeover may include veneers for shape and color, professional whitening for brightness, crowns to restore damaged teeth, or implants to replace missing ones. We can also incorporate Botox or dermal fillers to enhance facial balance and complement your new smile. Every step is carefully planned to ensure results look natural and function properly.",
              "Because everything is completed under one roof, you benefit from a more convenient, streamlined experience. Our team focuses on delivering high-quality care using modern techniques and materials, so your results not only look great but are built to last.",
            ],
          },
          {
            kind: "prose",
            heading: "What a smile makeover can improve",
            body: [
              "A smile makeover is ideal for patients who want to improve multiple aspects of their smile while maintaining a natural, balanced appearance that fits their features.",
              "You may be a candidate if you have stained, chipped, worn, or uneven teeth, gaps between teeth, or missing teeth. Many patients also choose a makeover to restore confidence after years of dental issues, all with the convenience of comprehensive care in one trusted Booneville office.",
            ],
          },
        ],
        closing: {
          heading: "Ready to love your smile again?",
          body: "At Park Place Dental, smile makeovers are about more than appearance. They are about helping you feel confident and comfortable every day. Achieve a confident, natural-looking smile with a personalized makeover designed just for you.",
        },
      },
      {
        slug: "smile-gallery-before-after",
        title: "Smile Gallery",
        metaDescription:
          "Before and after results from real patients at Park Place Dental in Booneville, Mississippi.",
        lead: "A confident smile can make a lasting difference. At Park Place Dental, we create natural-looking results through personalized cosmetic and restorative treatments tailored to each patient.",
        image: "/images/smile-closeup.jpg",
        imageAlt: "A finished cosmetic case at Park Place Dental",
        blocks: [
          {
            kind: "prose",
            body: [
              "Our smile gallery highlights real transformations, from subtle improvements to full smile makeovers, showing what is possible with modern, high-quality dentistry.",
            ],
          },
          {
            kind: "list",
            heading: "Real results, personalized care",
            intro: "Every smile is different, which is why we customize each treatment using services like:",
            items: [
              "Veneers",
              "Teeth whitening",
              "Crowns",
              "Dental implants",
              "Complete smile makeovers",
            ],
          },
        ],
        closing: {
          heading: "Ready to see what is possible for your smile?",
          body: "If you are thinking about improving your smile, we are here to help. Schedule a consultation and discover what is possible with a personalized treatment plan at Park Place Dental.",
        },
      },
    ],
  },
  {
    slug: "periodontal-care",
    title: "Periodontal Care",
    eyebrow: "Periodontal Care",
    metaDescription:
      "Gum disease prevention and treatment in Booneville, Mississippi. Healthy gums support a strong smile.",
    lead: [
      "Periodontal care focuses on the health of your gums, which are essential to supporting your teeth. At Park Place Dental, we provide comprehensive treatment to prevent and manage gum disease.",
      "Healthy gums are the foundation of a strong smile, yet many adults in Booneville experience gum issues without realizing it. Periodontal care helps prevent, detect, and treat gum disease early, protecting your teeth, improving comfort, and supporting long-term oral health with personalized, modern treatment options.",
    ],
    image: "/images/goodwin-treating-patient.jpg",
    imageAlt: "Dr. Goodwin treating a patient at Park Place Dental",
    closing: {
      heading: "Ready to take control of your gum health?",
      body: "Protect your smile with expert periodontal care designed to prevent problems and keep your teeth healthy for the long term.",
    },
    children: [
      {
        slug: "gum-disease-treatment",
        title: "Gum Disease Treatment",
        metaDescription:
          "Scaling, root planing and ongoing gum disease care in Booneville, Mississippi.",
        lead: "Gum disease is a common condition that can lead to serious oral health problems if left untreated. At Park Place Dental, we provide effective treatment to restore gum health and protect your smile.",
        image: "/images/goodwin-and-assistant.jpg",
        imageAlt: "Dr. Goodwin and a team member prepared for treatment",
        blocks: [
          {
            kind: "prose",
            body: [
              "Many adults in Booneville experience early signs of gum disease without realizing it. Symptoms like bleeding gums, bad breath, or gum recession can worsen over time. With the right treatment, we can stop the progression, reduce inflammation, and help you maintain a healthy, stable foundation for your teeth.",
            ],
          },
          {
            kind: "prose",
            heading: "Personalized care to restore your gum health",
            body: [
              "Our approach to gum disease treatment focuses on early intervention, comfort, and long-term results. We tailor each treatment plan based on the severity of your condition and your overall oral health.",
              "Treatment typically begins with a deep cleaning procedure known as scaling and root planing, which removes plaque and bacteria below the gumline. This helps reduce inflammation and allows your gums to heal. In more advanced cases, additional therapies may be recommended to manage infection and protect your teeth. Our team closely monitors your progress and provides guidance to help prevent the disease from returning.",
              "Addressing gum disease early can help you avoid tooth loss and more complex procedures in the future. With consistent care and maintenance, many patients successfully restore their gum health and maintain a strong, healthy smile for years to come.",
            ],
          },
          {
            kind: "prose",
            heading: "Signs you may need gum disease treatment",
            body: [
              "Gum disease often develops quietly, which is why it is important to recognize early warning signs and seek care before the condition becomes more advanced.",
              "You may need treatment if you notice bleeding when brushing or flossing, swollen or tender gums, persistent bad breath, or gums pulling away from your teeth. If left untreated, gum disease can lead to tooth loss and impact your overall health, making early care essential.",
            ],
          },
        ],
        closing: {
          heading: "Concerned about your gum health?",
          body: "Do not ignore the signs. Early treatment can protect your teeth and prevent more serious dental problems down the road.",
        },
      },
    ],
  },
  {
    slug: "facial-aesthetics",
    title: "Facial Aesthetics",
    eyebrow: "Facial Aesthetics",
    metaDescription:
      "Botox and dermal fillers offered alongside your dental care in Booneville, Mississippi.",
    lead: [
      "Facial aesthetics at Park Place Dental combines advanced treatments with expert precision to help you look refreshed, balanced, and confident, all in a comfortable, familiar setting you trust.",
      "Patients in Booneville and surrounding communities are choosing facial aesthetic treatments as a convenient way to enhance their appearance without surgery. By offering Botox and dermal fillers in the same office as your dental care, we provide a seamless, personalized approach to improving both your smile and overall facial harmony.",
    ],
    image: "/images/team-member-desk.jpg",
    imageAlt: "A Park Place Dental team member in the office",
    closing: {
      heading: "Ready to look refreshed and feel confident?",
      body: "Discover facial aesthetic treatments designed to enhance your natural features with subtle, comfortable, and effective results close to home.",
    },
    children: [
      {
        slug: "botox",
        title: "Botox",
        metaDescription:
          "Botox for jaw tension, headaches and fine lines, offered in Booneville, Mississippi.",
        lead: "Botox at Park Place Dental offers more than cosmetic benefits. It helps relieve jaw tension, headaches, and facial discomfort while softening lines for a natural, refreshed appearance.",
        image: "/images/team-member-pink.jpg",
        imageAlt: "A Park Place Dental team member",
        blocks: [
          {
            kind: "prose",
            body: [
              "Many patients in Booneville and surrounding communities deal with jaw pain, teeth grinding, or stress-related tension. Botox works by relaxing overactive muscles, reducing discomfort while improving facial balance. Whether you are seeking relief or subtle cosmetic enhancement, this treatment offers a convenient, non-surgical solution close to home.",
            ],
          },
          {
            kind: "prose",
            heading: "Quick, comfortable treatment with lasting results",
            body: [
              "Our Botox treatments are designed for busy adults who want effective results without downtime. Most visits are completed in minutes, with precision care from a team you already trust.",
              "Your appointment begins with a personalized consultation to understand whether your concerns are cosmetic, functional, or both. Using advanced knowledge of facial anatomy, we carefully place small amounts of Botox into targeted muscles. The process is quick and minimally uncomfortable. Over the next few days, muscles begin to relax, reducing jaw clenching, easing tension headaches, and softening lines, while still allowing your natural expressions to shine through.",
              "Results typically appear within a few days and last around three to four months. Many patients return for maintenance treatments, especially those managing TMJ discomfort or chronic tension, because the relief can be just as valuable as the cosmetic improvement.",
            ],
          },
          {
            kind: "prose",
            heading: "Common reasons patients choose Botox",
            body: [
              "Botox is one of the most versatile treatments we offer, helping patients improve both comfort and appearance without surgery or lengthy recovery times.",
              "You may benefit from Botox if you experience jaw pain, teeth grinding, or frequent headaches. It is also ideal for reducing forehead lines, frown lines, and crow's feet. Many patients appreciate having both dental and facial aesthetic care available in one trusted Booneville office.",
            ],
          },
        ],
        closing: {
          heading: "Ready to relieve tension and refresh your look?",
          body: "Get expert Botox treatment from a team you trust, right here in Booneville, with results designed to feel natural and effective.",
        },
      },
      {
        slug: "dermal-fillers",
        title: "Dermal Fillers",
        metaDescription:
          "Dermal fillers to restore volume and smooth lines, offered in Booneville, Mississippi.",
        lead: "Dermal fillers offer a simple, non-surgical way to restore lost volume, smooth lines, and enhance facial features. At Park Place Dental, we deliver natural-looking results that complement your smile.",
        image: "/images/team-member-plants.jpg",
        imageAlt: "A Park Place Dental team member in the office",
        blocks: [
          {
            kind: "prose",
            body: [
              "As we age, facial volume naturally decreases, leading to wrinkles and sagging skin. Dermal fillers help restore fullness in areas like the cheeks, lips, and around the mouth. Patients in Booneville choose fillers for a refreshed, youthful appearance without surgery or extended downtime.",
            ],
          },
          {
            kind: "prose",
            heading: "What to expect from your treatment",
            body: [
              "Dermal filler treatments are quick, comfortable, and designed for immediate results. Our team focuses on precision and balance to enhance your natural features without creating an overdone appearance.",
              "Your visit begins with a personalized consultation to discuss your goals and areas of concern. We carefully place filler in targeted areas to restore volume, smooth lines, and improve facial symmetry. The procedure typically takes less than an hour, with minimal discomfort. Results are visible immediately, with continued improvement over the following days as the filler settles naturally into place.",
              "Most patients return to normal activities the same day, making dermal fillers a convenient option for busy schedules. Results can last several months to over a year, depending on the treatment area, helping you maintain a refreshed, confident look.",
            ],
          },
          {
            kind: "prose",
            heading: "Common reasons patients choose dermal fillers",
            body: [
              "Dermal fillers are ideal for patients looking to enhance their appearance while maintaining a natural look. They are a versatile solution for both early signs of aging and more noticeable volume loss.",
              "You may benefit from dermal fillers if you notice thinning lips, hollow cheeks, deep smile lines, or facial asymmetry. Many patients in Booneville appreciate having facial aesthetic treatments available in the same trusted office where they receive dental care.",
            ],
          },
        ],
        closing: {
          heading: "Ready to restore volume and refresh your look?",
          body: "Enhance your natural features with dermal fillers designed to deliver smooth, balanced results without surgery or extended downtime.",
        },
      },
    ],
  },
];

export const allCategories = serviceCategories;

export function findCategory(slug: string) {
  return serviceCategories.find((c) => c.slug === slug);
}

export function findService(categorySlug: string, serviceSlug: string) {
  const category = findCategory(categorySlug);
  const service = category?.children.find((s) => s.slug === serviceSlug);
  return service ? { category, service } : null;
}

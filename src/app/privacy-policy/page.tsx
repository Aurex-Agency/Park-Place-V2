import type { Metadata } from "next";
import { canonical } from "@/lib/site";
import { practice } from "@/lib/content";
import { PageHeader } from "@/components/page/PageHeader";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Park Place Dental handles the information you share with us.",
  alternates: { canonical: canonical("/privacy-policy") },
};

/*
  This is a plain-language starting point written to match what the site
  actually does today. It is not legal advice, and it should be reviewed by the
  practice's attorney or HIPAA compliance contact before launch. Anything the
  practice does that is not described here, such as analytics or a third party
  booking system, needs adding.
*/
const sections = [
  {
    heading: "The information we collect",
    body: [
      "If you request an appointment or contact us through this website, you choose what to send us: your name, phone number, email address, preferred appointment time, and anything you write in the message. That information reaches our front desk by email.",
      "This website does not ask for medical history, insurance numbers, or payment details. Please do not send those through the website. We will collect what we need securely at the practice.",
    ],
  },
  {
    heading: "How we use it",
    body: [
      "We use what you send only to respond to you, to arrange your appointment, and to provide your care. We do not sell it, and we do not share it with anyone for marketing.",
    ],
  },
  {
    heading: "Your health information",
    body: [
      "Health information you share with us as a patient is protected under HIPAA and is handled under the practice's Notice of Privacy Practices, which is available at the front desk. Ask us for a copy at any time.",
    ],
  },
  {
    heading: "Cookies and analytics",
    body: [
      "This website does not set advertising cookies and does not track you across other sites.",
    ],
  },
  {
    heading: "Getting in touch about your information",
    body: [
      `If you want to know what we hold, correct something, or ask us to delete it, call the practice on ${practice.phone} or email ${practice.email}.`,
    ],
  },
];

export default function Page() {
  return (
    <>
      <PageHeader
        eyebrow="Privacy Policy"
        headline="How we handle / your information"
        lead="Plain language, no small print. If anything here is unclear, call the office and we will explain it."
        crumbs={[{ label: "Home", href: "/" }, { label: "Privacy Policy" }]}
      />

      <div className="section">
        <div className="shell-narrow flex flex-col gap-12">
          {sections.map((section) => (
            <section key={section.heading}>
              <Reveal>
                <h2 className="t-h3">{section.heading}</h2>
              </Reveal>
              <div className="mt-4 flex flex-col gap-4">
                {section.body.map((text, i) => (
                  <Reveal key={i} delay={i * 0.04}>
                    <p className="text-taupe">{text}</p>
                  </Reveal>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </>
  );
}

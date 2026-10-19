import { JsonLd } from "@/components/site/JsonLd";
import { pageGraph } from "@/lib/schema";
import type { Metadata } from "next";
import { pageMetadata, seoFor } from "@/content/seo";
import { practice } from "@/lib/content";
import { PageHeader } from "@/components/page/PageHeader";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = pageMetadata("/privacy-policy", {
  title: "Privacy Policy",
  description: "How Park Place Dental handles the information you share with us.",
});

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
      "Ken Goodwin, DMD, PA, doing business as Park Place Dental, uses what you send to respond to you, arrange your appointment and provide your care. If you separately opt in to marketing texts, we may also send you dental service updates and special offers. We do not sell your personal information.",
    ],
  },
  {
    heading: "Text messaging and consent",
    body: [
      "Informational and marketing SMS choices are separate, optional and unchecked by default. Providing a phone number alone does not grant permission to text you. You can request an appointment or contact us without consenting to either type of SMS. Marketing consent is not a condition of purchase or care.",
      "We record your SMS choices, the phone number provided, the source form, the disclosure wording and version, and the time the server receives your submission. These records are included in the enquiry email delivered to our front desk.",
      "We do not share, sell or rent mobile phone numbers, SMS opt-in data or consent with third parties or affiliates for their marketing or promotional purposes. We share this information only with service providers that help us deliver and administer our messaging program, as necessary for that service.",
      "Message frequency varies. Message and data rates may apply. Reply STOP to opt out or HELP for help. You can also contact the practice using the details below. See our Terms of Service for the SMS program terms.",
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
      "This website uses Google Analytics to understand how people find and use it: which pages are read, which are not, and whether anything is broken. Google Analytics sets first-party cookies in your browser to tell one visit apart from the next.",
      "We use it to see patterns across everybody who visits, not to identify you. We do not sell the information, we do not use it for advertising, and we do not combine it with your patient records.",
      "Most browsers let you block or delete cookies in their settings, and Google publishes a browser add-on that opts you out of Google Analytics entirely. Nothing on this site stops working if you do either.",
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
      <JsonLd
        graph={pageGraph({
          path: "/privacy-policy",
          name: seoFor("/privacy-policy", { title: "privacy-policy", description: "" }).title,
          description: seoFor("/privacy-policy", { title: "", description: "" }).description,
          crumbs: [{ label: "Home", href: "/" }, { label: "Privacy Policy" }],
        })}
      />

      <PageHeader
        eyebrow="Privacy Policy"
        headline="How we handle / your information"
        lead="Plain language, no small print. If anything here is unclear, call the office and we will explain it."
        crumbs={[{ label: "Home", href: "/" }, { label: "Privacy Policy" }]}
      />

      <div className="section">
        <div className="shell-narrow flex flex-col gap-12">
          <p className="text-taupe">Updated October 19, 2026. <a href="/terms-of-service" className="text-rose-deep underline underline-offset-4">SMS Terms of Service</a></p>
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

import type { Metadata } from "next";
import { canonical } from "@/lib/site";
import { faqs } from "@/content/pages";
import { PageHeader } from "@/components/page/PageHeader";
import { CtaBand } from "@/components/page/CtaBand";
import { FaqList } from "@/components/page/FaqList";

export const metadata: Metadata = {
  title: "FAQs",
  description:
    "Answers to the questions we hear most often from patients in Booneville and the surrounding communities.",
  alternates: { canonical: canonical("/patient-resources/faqs") },
};

/** Marked up so the answers can appear directly in search results. */
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <PageHeader
        eyebrow="Patient Resources"
        headline="Questions we hear / most often"
        lead="We understand that many patients have questions before visiting the dentist, especially if it has been a while or you are considering treatment. Below are answers to some of the most common questions we hear from patients in Booneville and surrounding communities."
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Patient Resources", href: "/patient-resources" },
          { label: "FAQs" },
        ]}
      />

      <div className="section">
        <div className="shell max-w-4xl">
          <FaqList items={faqs} />
        </div>
      </div>

      <CtaBand
        heading="Still have questions?"
        body="If you do not see your question here, our team is happy to help. We believe clear communication is key to great care, and we are here to make sure you feel confident every step of the way."
      />
    </>
  );
}

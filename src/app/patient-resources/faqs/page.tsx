import type { Metadata } from "next";
import { pageMetadata, seoFor } from "@/content/seo";
import { faqPageGraph } from "@/lib/schema";
import { JsonLd } from "@/components/site/JsonLd";
import { faqs } from "@/content/pages";
import { PageHeader } from "@/components/page/PageHeader";
import { CtaBand } from "@/components/page/CtaBand";
import { FaqList } from "@/components/page/FaqList";

export const metadata: Metadata = pageMetadata("/patient-resources/faqs", {
  title: "FAQs",
  description:
    "Answers to the questions we hear most often from patients in Booneville and the surrounding communities.",
});

const PATH = "/patient-resources/faqs";

const crumbs = [
  { label: "Home", href: "/" },
  { label: "Patient Resources", href: "/patient-resources" },
  { label: "FAQs" },
];

export default function Page() {
  /*
   * FAQPage markup no longer earns a rich result: Google retired site-wide FAQ
   * snippets in May 2026. It stays because AI search systems still read it, and
   * a clean question-and-answer structure is the format they quote from.
   */
  const meta = seoFor(PATH, { title: "FAQs", description: "" });

  return (
    <>
      <JsonLd
        graph={faqPageGraph(
          {
            path: PATH,
            name: meta.title,
            description: meta.description,
            crumbs,
          },
          faqs,
        )}
      />

      <PageHeader
        eyebrow="Patient Resources"
        headline="Questions we hear / most often"
        lead="We understand that many patients have questions before visiting the dentist, especially if it has been a while or you are considering treatment. Below are answers to some of the most common questions we hear from patients in Booneville and surrounding communities."
        crumbs={crumbs}
      />

      <div className="section">
        <div className="shell max-w-4xl">
          <FaqList items={faqs} headingLevel="h2" />
        </div>
      </div>

      <CtaBand
        heading="Still have questions?"
        body="If you do not see your question here, our team is happy to help. We believe clear communication is key to great care, and we are here to make sure you feel confident every step of the way."
      />
    </>
  );
}

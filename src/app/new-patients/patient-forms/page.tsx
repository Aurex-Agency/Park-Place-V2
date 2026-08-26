import type { Metadata } from "next";
import { patientForms } from "@/content/pages";
import { practice } from "@/lib/content";
import { PageHeader } from "@/components/page/PageHeader";
import { CtaBand } from "@/components/page/CtaBand";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Patient Forms",
  description:
    "Complete your Park Place Dental forms before your visit to save time at your appointment.",
};

export default function Page() {
  return (
    <>
      <PageHeader
        eyebrow="New Patients"
        headline="Fill these in before / you come in"
        lead={[
          "To make your visit as smooth and efficient as possible, we offer easy access to our patient forms. Completing your forms ahead of time helps reduce wait times and allows our team to focus more on your care when you arrive.",
          "Patients from Booneville and surrounding communities appreciate the convenience of preparing for their appointment in advance, especially when balancing busy schedules, work, and family responsibilities.",
        ]}
        crumbs={[
          { label: "Home", href: "/" },
          { label: "New Patients", href: "/new-patients" },
          { label: "Patient Forms" },
        ]}
      />

      <div className="section">
        <div className="shell">
          <Reveal>
            <h2 className="t-h2 max-w-2xl">Your forms</h2>
          </Reveal>

          <RevealGroup
            as="ul"
            gap={0.08}
            className="mt-10 grid gap-6 md:grid-cols-3"
          >
            {patientForms.map((form) => (
              <RevealItem as="li" key={form.label} className="h-full">
                <div className="card flex h-full flex-col">
                  <h3 className="t-h3">{form.label}</h3>
                  <p className="mt-3 flex-1 text-[0.975rem] leading-relaxed text-taupe">
                    {form.description}
                  </p>
                  <p className="mt-6 text-[0.875rem] text-taupe">
                    Call the office and we will send this over, or pick one up
                    at the front desk.
                  </p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>

          {/*
            The old site linked to downloadable PDFs. Those files have not been
            handed over yet, so rather than ship dead links the cards point to
            the office. Drop the PDFs into public and link them here.
          */}
          <Reveal delay={0.1}>
            <div className="mt-12 max-w-2xl rounded-[1.25rem] bg-rose-wash p-8 ring-1 ring-sand/70">
              <h3 className="t-h3">Need help with your forms?</h3>
              <p className="mt-3 text-taupe">
                If you are unsure which forms to complete or need assistance, do
                not hesitate to reach out. We are happy to guide you so your
                first visit is simple and stress-free. Call us on{" "}
                <a
                  href={practice.phoneHref}
                  className="tap-inline font-medium text-rose-deep underline underline-offset-4"
                >
                  {practice.phone}
                </a>
                .
              </p>
            </div>
          </Reveal>
        </div>
      </div>

      <CtaBand
        heading="We are here to help you get started"
        body="Contact Park Place Dental today and our team will make sure you have everything you need before your first visit."
      />
    </>
  );
}

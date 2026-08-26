import type { Metadata } from "next";
import { practice } from "@/lib/content";
import { PageHeader } from "@/components/page/PageHeader";
import { AppointmentForm } from "@/components/page/AppointmentForm";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Book an Appointment",
  description: `Request an appointment at Park Place Dental in Booneville, Mississippi, or call ${practice.phone}.`,
};

export default function Page() {
  return (
    <>
      <PageHeader
        eyebrow="Book an Appointment"
        headline="Let us find you / a time"
        lead="Patients from Booneville and surrounding communities trust Park Place Dental for high-quality care, clear communication, and a comfortable experience from start to finish. Complete the form below and our team will contact you shortly."
        crumbs={[{ label: "Home", href: "/" }, { label: "Book an Appointment" }]}
        cta={false}
      />

      <div className="section">
        <div className="shell grid gap-14 lg:grid-cols-[1.3fr_0.7fr] lg:gap-20">
          <Reveal>
            <AppointmentForm />
          </Reveal>

          <Reveal delay={0.08}>
            <aside className="rounded-[1.25rem] bg-linen-deep p-8 ring-1 ring-sand/60">
              <h2 className="t-h3">Prefer to call?</h2>
              <p className="mt-3 text-[0.975rem] leading-relaxed text-taupe">
                We are glad to talk it through. Our front desk can usually find
                you a time on the same call, and for emergencies we do our best
                to see you the same day.
              </p>

              <a
                href={practice.phoneHref}
                className="mt-6 block font-[family-name:var(--font-display)] text-2xl text-espresso transition-colors hover:text-rose-deep"
              >
                {practice.phone}
              </a>

              <div className="mt-8 border-t border-sand pt-6">
                <p className="t-eyebrow">Hours</p>
                <p className="mt-2 text-[0.975rem] text-taupe">
                  {practice.hours}
                </p>
                <p className="mt-1 text-[0.9rem] text-taupe">
                  {practice.hoursNote}
                </p>
              </div>

              <div className="mt-8 border-t border-sand pt-6">
                <p className="t-eyebrow">Address</p>
                <a
                  href={practice.mapsHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 block text-[0.975rem] text-taupe transition-colors hover:text-rose-deep"
                >
                  {practice.address.street}
                  <br />
                  {practice.address.city}, {practice.address.region}{" "}
                  {practice.address.postalCode}
                </a>
              </div>
            </aside>
          </Reveal>
        </div>
      </div>
    </>
  );
}

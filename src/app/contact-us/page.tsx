import type { Metadata } from "next";
import { practice } from "@/lib/content";
import { PageHeader } from "@/components/page/PageHeader";
import { CtaBand } from "@/components/page/CtaBand";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Contact Us",
  description: `Park Place Dental, ${practice.address.full}. Call ${practice.phone} to book an appointment.`,
};

export default function Page() {
  return (
    <>
      <PageHeader
        eyebrow="Contact Us"
        headline="Come and see us / in Booneville"
        lead="The best way to get started is by scheduling an appointment. Whether you need routine care or are exploring treatment options, we are here to provide high-quality, comfortable dentistry you can trust."
        crumbs={[{ label: "Home", href: "/" }, { label: "Contact Us" }]}
      />

      <div className="section">
        <div className="shell grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <Reveal>
              <h2 className="t-h2">Where to find us</h2>
            </Reveal>

            <Reveal delay={0.06}>
              <dl className="mt-8 flex flex-col gap-7">
                <div>
                  <dt className="t-eyebrow">Address</dt>
                  <dd className="mt-2">
                    <a
                      href={practice.mapsHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[1.05rem] text-espresso transition-colors hover:text-rose-deep"
                    >
                      {practice.address.street}
                      <br />
                      {practice.address.city}, {practice.address.region}{" "}
                      {practice.address.postalCode}
                    </a>
                  </dd>
                </div>

                <div>
                  <dt className="t-eyebrow">Phone</dt>
                  <dd className="mt-2">
                    <a
                      href={practice.phoneHref}
                      className="font-[family-name:var(--font-display)] text-2xl text-espresso transition-colors hover:text-rose-deep"
                    >
                      {practice.phone}
                    </a>
                  </dd>
                </div>

                <div>
                  <dt className="t-eyebrow">Email</dt>
                  <dd className="mt-2">
                    <a
                      href={practice.emailHref}
                      className="text-[1.05rem] text-espresso transition-colors hover:text-rose-deep"
                    >
                      {practice.email}
                    </a>
                  </dd>
                </div>

                <div>
                  <dt className="t-eyebrow">Hours</dt>
                  <dd className="mt-2 text-[1.05rem] text-espresso">
                    {practice.hours}
                    <span className="mt-1 block text-[0.95rem] text-taupe">
                      {practice.hoursNote}
                    </span>
                  </dd>
                </div>
              </dl>
            </Reveal>

            <Reveal delay={0.12}>
              <div className="mt-10 flex flex-wrap gap-3">
                <Button href="/book-an-appointment" variant="primary">
                  Book an appointment
                </Button>
                <Button href={practice.mapsHref} variant="outline">
                  Get directions
                </Button>
              </div>
            </Reveal>
          </div>

          <Reveal preset="fade">
            <div className="overflow-hidden rounded-[1.25rem] shadow-[var(--shadow-md)] ring-1 ring-sand/60">
              <iframe
                title="Map showing Park Place Dental at 403 N 3rd St, Booneville, Mississippi"
                src="https://www.google.com/maps?q=403+N+3rd+St+Booneville+MS+38829&output=embed"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-[26rem] w-full border-0 lg:h-full lg:min-h-[30rem]"
              />
            </div>
          </Reveal>
        </div>
      </div>

      <CtaBand
        heading="Schedule your visit"
        body="Contact our office or request an appointment online. We look forward to hearing from you."
      />
    </>
  );
}

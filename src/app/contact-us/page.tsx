import { JsonLd } from "@/components/site/JsonLd";
import { pageGraph } from "@/lib/schema";
import type { Metadata } from "next";
import { pageMetadata, seoFor } from "@/content/seo";
import { practice } from "@/lib/content";
import { PageHeader } from "@/components/page/PageHeader";
import { CtaBand } from "@/components/page/CtaBand";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import Image from "next/image";
import { ContactForm } from "@/components/page/ContactForm";
import { photos } from "@/content/photography";

export const metadata: Metadata = pageMetadata("/contact-us", {
  title: "Contact Us",
  description: `Park Place Dental, ${practice.address.full}. Call ${practice.phone} to book an appointment.`,
});

export default function Page() {
  return (
    <>
      <JsonLd
        graph={pageGraph({
          path: "/contact-us",
          name: seoFor("/contact-us", { title: "contact-us", description: "" }).title,
          description: seoFor("/contact-us", { title: "", description: "" }).description,
          crumbs: [{ label: "Home", href: "/" }, { label: "Contact Us" }],
        })}
      />

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
                      className="tap-inline text-[1.05rem] text-espresso transition-colors hover:text-rose-deep"
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
                      className="tap-inline text-[1.05rem] text-espresso transition-colors hover:text-rose-deep"
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

          {/*
            The building photograph lives here rather than in the page header.
            In the header it became the largest thing on a phone screen and
            took Largest Contentful Paint from 1.1s to 2.4s on a throttled
            connection. Down here it is below the fold and loads lazily.
          */}
          <Reveal preset="fade">
            <div className="overflow-hidden rounded-[1.25rem] bg-white shadow-[var(--shadow-md)] ring-1 ring-sand/60">
              <figure className="relative aspect-[16/9] w-full overflow-hidden bg-linen">
                <Image
                  src={photos.exteriorBuilding.src}
                  alt={photos.exteriorBuilding.alt}
                  fill
                  sizes="(max-width: 1024px) 92vw, 45vw"
                  fetchPriority="low"
                  className="object-cover object-[40%_62%]"
                />
                <figcaption className="absolute bottom-3 left-3 rounded-full bg-white/95 px-4 py-2 text-[0.85rem] font-medium text-espresso shadow-[var(--shadow-sm)]">
                  Look for the brick porch and white columns
                </figcaption>
              </figure>
              <iframe
                title="Map showing Park Place Dental at 403 N 3rd St, Booneville, Mississippi"
                src="https://www.google.com/maps?q=403+N+3rd+St+Booneville+MS+38829&output=embed"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="block h-[20rem] w-full border-0 lg:h-[24rem]"
              />
            </div>
          </Reveal>
        </div>
      </div>

      <section className="section bg-linen-deep">
        <div className="shell grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div>
            <Reveal>
              <h2 className="t-h2">Send us a message</h2>
            </Reveal>
            <Reveal delay={0.06}>
              <p className="t-lead mt-5">
                Tell us what you need and our front desk will get back to you.
                For anything urgent, calling is faster and we will do our best
                to see you the same day.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 text-[0.975rem] leading-relaxed text-taupe">
                Our hours are {practice.hours}, and we answer messages in the
                order they arrive.
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.08}>
            <ContactForm />
          </Reveal>
        </div>
      </section>

      <CtaBand
        heading="Schedule your visit"
        body="Contact our office or request an appointment online. We look forward to hearing from you."
      />
    </>
  );
}

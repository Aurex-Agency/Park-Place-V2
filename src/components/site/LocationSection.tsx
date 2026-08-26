import { practice } from "@/lib/content";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { MaskedHeading } from "@/components/ui/MaskedHeading";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Where to find the practice, shown above the footer on every page.
 *
 * The map is an iframe with a real title, so it is announced rather than
 * skipped, and it is lazy loaded because it sits below the fold everywhere it
 * appears.
 */
export function LocationSection() {
  return (
    <section className="section bg-linen-deep">
      <div className="shell grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <Reveal>
            <Eyebrow>Visit Us</Eyebrow>
          </Reveal>

          <MaskedHeading
            as="h2"
            className="t-h2 mt-6"
            text="Find us in the heart / of Booneville"
          />

          <Reveal delay={0.1}>
            <dl className="mt-9 flex flex-col gap-7">
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

          <Reveal delay={0.14}>
            <div className="mt-9 flex flex-wrap gap-3">
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
              title={`Map showing Park Place Dental at ${practice.address.full}`}
              src="https://www.google.com/maps?q=403+N+3rd+St+Booneville+MS+38829&output=embed"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-[24rem] w-full border-0 lg:h-[34rem]"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

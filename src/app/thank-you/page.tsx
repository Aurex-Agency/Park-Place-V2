import type { Metadata } from "next";
import { practice } from "@/lib/content";
import { PageHeader } from "@/components/page/PageHeader";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Thank You",
  description: "Thank you for contacting Park Place Dental.",
  robots: { index: false, follow: true },
};

export default function Page() {
  return (
    <>
      <PageHeader
        eyebrow="Thank You"
        headline="We have got it / from here"
        lead="Thank you for getting in touch. Someone from our team will be back to you shortly to confirm a time."
        crumbs={[{ label: "Home", href: "/" }, { label: "Thank You" }]}
      />

      <div className="section">
        <div className="shell-narrow text-center">
          <Reveal>
            <p className="text-taupe">
              If your visit is urgent, please call the office directly and we
              will do our best to see you the same day.
            </p>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="mt-10 flex flex-wrap justify-center gap-3">
              <Button href={practice.phoneHref} variant="primary">
                Call {practice.phone}
              </Button>
              <Button href="/" variant="outline">
                Back to the homepage
              </Button>
            </div>
          </Reveal>
        </div>
      </div>
    </>
  );
}

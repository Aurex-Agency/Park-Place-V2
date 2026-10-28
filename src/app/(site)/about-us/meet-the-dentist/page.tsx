import { Button, TextLink } from "@/components/ui/Button";
import { PatientGuides } from "@/components/page/PatientGuides";
import { practice } from "@/lib/content";
import type { Metadata } from "next";
import { pageMetadata } from "@/content/seo";
import { meetTheDentist } from "@/content/pages";
import { SimplePageView } from "@/components/page/SimplePageView";
import { PhotoStory } from "@/components/page/PhotoStory";
import { photos } from "@/content/photography";
import { AssociateDoctor } from "@/components/page/AssociateDoctor";

export const metadata: Metadata = pageMetadata("/about-us/meet-the-dentist", {
  title: meetTheDentist.title,
  description: meetTheDentist.metaDescription,
});

export default function Page() {
  return (
    <SimplePageView
      path={"/about-us/meet-the-dentist"}
      page={meetTheDentist}
      crumbs={[
        { label: "Home", href: "/" },
        { label: "About Us", href: "/about-us/about-the-practice" },
        { label: meetTheDentist.title },
      ]}
    >
      <section className="section bg-linen-deep" aria-labelledby="plan-visit">
        <div className="shell">
          <p className="t-eyebrow text-rose-deep">Your next step</p>
          <h2 id="plan-visit" className="t-h2 mt-4">Plan a visit with the dental team</h2>
          <p className="mt-5 max-w-2xl text-taupe">Tell the office what you would like to discuss and whether you are a new or returning patient. Ask about records to bring, appointment availability and any preparation instructions. The team will confirm your appointment; an online request does not reserve a time.</p>
          <p className="mt-4 text-taupe">{practice.hours}. {practice.hoursNote}.</p>
          <div className="mt-6 flex flex-wrap gap-4">
            <Button href="/book-an-appointment">Request an appointment</Button>
            <Button href={practice.phoneHref} variant="outline">Call {practice.phone}</Button>
          </div>
          <ul className="mt-7 flex flex-wrap gap-6">
            <li><TextLink href="/services/restorative-dentistry">Restorative care</TextLink></li>
            <li><TextLink href="/new-patients/insurance-financing">Insurance and payment questions</TextLink></li>
          </ul>
        </div>
      </section>
      <PhotoStory
        tone="linen"
        eyebrow="At the Chair"
        heading="Four decades in, / still hands on"
        lead="Dr. Goodwin still treats patients himself, alongside a team many of them have known for years."
        photos={[photos.goodwinWithAssistant, photos.goodwinImplantStation]}
      />

      <AssociateDoctor
        eyebrow="Also Caring for You"
        cta={{ label: "Meet the whole team", href: "/about-us/meet-the-team" }}
      />
      <PatientGuides />
    </SimplePageView>
  );
}

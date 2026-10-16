import type { Metadata } from "next";
import { pageMetadata } from "@/content/seo";
import { meetTheTeam } from "@/content/pages";
import { SimplePageView } from "@/components/page/SimplePageView";
import { PhotoStory } from "@/components/page/PhotoStory";
import { photos } from "@/content/photography";
import { TeamPortraits } from "@/components/page/TeamPortraits";
import { AssociateDoctor } from "@/components/page/AssociateDoctor";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { MaskedHeading } from "@/components/ui/MaskedHeading";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = pageMetadata("/about-us/meet-the-team", {
  title: meetTheTeam.title,
  description: meetTheTeam.metaDescription,
});

export default function Page() {
  return (
    <SimplePageView
      path={"/about-us/meet-the-team"}
      page={meetTheTeam}
      crumbs={[
        { label: "Home", href: "/" },
        { label: "About Us" },
        { label: meetTheTeam.title },
      ]}
    >
      <AssociateDoctor eyebrow="Our Doctors" tone="linen" anchor />

      <section className="section overflow-hidden">
        <div className="shell">
          <div className="max-w-2xl">
            <Reveal>
              <Eyebrow>Familiar Faces</Eyebrow>
            </Reveal>
            <MaskedHeading className="t-h2 mt-6" text="Who you will see / when you come in" />
            <Reveal delay={0.1}>
              <p className="t-lead mt-5">
                Hygienists, assistants and the front desk. These are the people
                who answer when you call and look after you from the moment you
                walk in.
              </p>
            </Reveal>
          </div>
          <TeamPortraits className="mt-14 lg:mt-16" />
        </div>
      </section>

      <PhotoStory
        tone="linen"
        eyebrow="A Day at Park Place"
        heading="The work behind / an easy visit"
        photos={[
          photos.hygienistCleaning,
          photos.teamGroupTrio,
          photos.frontDeskPhone,
          photos.restorationDesign,
          photos.mcdougaldWithAssistant,
          photos.teamGroupFour,
        ]}
      />
    </SimplePageView>
  );
}

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
        { label: "About Us" },
        { label: meetTheDentist.title },
      ]}
    >
      <PhotoStory
        tone="linen"
        eyebrow="At the Chair"
        heading="Four decades in, / still hands on"
        lead="Dr. Goodwin still treats patients himself, alongside a team many of them have known for years."
        photos={[photos.goodwinWithAssistant, photos.goodwinImplantStation]}
      />

      <AssociateDoctor eyebrow="Also Caring for You" />
    </SimplePageView>
  );
}

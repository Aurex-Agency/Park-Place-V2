import type { Metadata } from "next";
import { pageMetadata } from "@/content/seo";
import { aboutPractice } from "@/content/pages";
import { SimplePageView } from "@/components/page/SimplePageView";
import { PhotoStory } from "@/components/page/PhotoStory";
import { photos } from "@/content/photography";

export const metadata: Metadata = pageMetadata("/about-us/about-the-practice", {
  title: aboutPractice.title,
  description: aboutPractice.metaDescription,
});

export default function Page() {
  return (
    <SimplePageView
      path={"/about-us/about-the-practice"}
      page={aboutPractice}
      crumbs={[
        { label: "Home", href: "/" },
        { label: "About Us" },
        { label: aboutPractice.title },
      ]}
    >
      <PhotoStory
        tone="linen"
        eyebrow="The Practice"
        heading="A look around / the office"
        lead="Some of the people, and a few of the corners, you will find inside."
        photos={[photos.refreshmentBar, photos.teamGroupFour, photos.teamGroupTrio]}
      />
    </SimplePageView>
  );
}

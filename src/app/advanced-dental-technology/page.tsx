import type { Metadata } from "next";
import { pageMetadata } from "@/content/seo";
import { advancedTechnology } from "@/content/pages";
import { SimplePageView } from "@/components/page/SimplePageView";
import { PhotoStory } from "@/components/page/PhotoStory";
import { photos } from "@/content/photography";

export const metadata: Metadata = pageMetadata("/advanced-dental-technology", {
  title: advancedTechnology.title,
  description: advancedTechnology.metaDescription,
});

export default function Page() {
  return (
    <SimplePageView
      path={"/advanced-dental-technology"}
      page={advancedTechnology}
      crumbs={[
        { label: "Home", href: "/" },
        { label: advancedTechnology.title },
      ]}
    >
      <PhotoStory
        tone="linen"
        eyebrow="In Our Office"
        heading="See the technology / for yourself"
        lead="Every photograph here was taken in our Booneville office: the milling units in our in-house lab, the screens where restorations and implants are planned, and the rooms where the work is done."
        photos={[
          photos.millingChamber,
          photos.cbctImaging,
          photos.millingUnit,
          photos.implantPlanning,
          photos.restorationDesign,
          photos.guidedSurgeryRoom,
          photos.inlabMill,
          photos.implantPlanningCloseup,
          photos.xrayFindings,
        ]}
      />
    </SimplePageView>
  );
}

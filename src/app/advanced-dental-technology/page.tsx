import type { Metadata } from "next";
import { pageMetadata } from "@/content/seo";
import { advancedTechnology } from "@/content/pages";
import { SimplePageView } from "@/components/page/SimplePageView";

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
    />
  );
}

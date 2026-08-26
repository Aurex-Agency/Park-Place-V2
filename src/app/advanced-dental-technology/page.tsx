import type { Metadata } from "next";
import { advancedTechnology } from "@/content/pages";
import { SimplePageView } from "@/components/page/SimplePageView";

export const metadata: Metadata = {
  title: advancedTechnology.title,
  description: advancedTechnology.metaDescription,
};

export default function Page() {
  return (
    <SimplePageView
      page={advancedTechnology}
      crumbs={[
        { label: "Home", href: "/" },
        { label: advancedTechnology.title },
      ]}
    />
  );
}

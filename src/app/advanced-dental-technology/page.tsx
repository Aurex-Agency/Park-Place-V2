import type { Metadata } from "next";
import { canonical } from "@/lib/site";
import { advancedTechnology } from "@/content/pages";
import { SimplePageView } from "@/components/page/SimplePageView";

export const metadata: Metadata = {
  title: advancedTechnology.title,
  description: advancedTechnology.metaDescription,
  alternates: { canonical: canonical("/advanced-dental-technology") },
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

import type { Metadata } from "next";
import { patientResources } from "@/content/pages";
import { SimplePageView } from "@/components/page/SimplePageView";

export const metadata: Metadata = {
  title: patientResources.title,
  description: patientResources.metaDescription,
};

export default function Page() {
  return (
    <SimplePageView
      page={patientResources}
      crumbs={[{ label: "Home", href: "/" }, { label: patientResources.title }]}
    />
  );
}

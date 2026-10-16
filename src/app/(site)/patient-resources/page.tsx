import type { Metadata } from "next";
import { pageMetadata } from "@/content/seo";
import { patientResources } from "@/content/pages";
import { SimplePageView } from "@/components/page/SimplePageView";

export const metadata: Metadata = pageMetadata("/patient-resources", {
  title: patientResources.title,
  description: patientResources.metaDescription,
});

export default function Page() {
  return (
    <SimplePageView
      path={"/patient-resources"}
      page={patientResources}
      crumbs={[{ label: "Home", href: "/" }, { label: patientResources.title }]}
    />
  );
}

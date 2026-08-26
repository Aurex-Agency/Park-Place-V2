import type { Metadata } from "next";
import { canonical } from "@/lib/site";
import { patientResources } from "@/content/pages";
import { SimplePageView } from "@/components/page/SimplePageView";

export const metadata: Metadata = {
  title: patientResources.title,
  description: patientResources.metaDescription,
  alternates: { canonical: canonical("/patient-resources") },
};

export default function Page() {
  return (
    <SimplePageView
      page={patientResources}
      crumbs={[{ label: "Home", href: "/" }, { label: patientResources.title }]}
    />
  );
}

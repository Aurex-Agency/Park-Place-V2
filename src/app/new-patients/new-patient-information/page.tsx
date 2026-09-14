import type { Metadata } from "next";
import { pageMetadata } from "@/content/seo";
import { newPatientInformation } from "@/content/pages";
import { SimplePageView } from "@/components/page/SimplePageView";

export const metadata: Metadata = pageMetadata("/new-patients/new-patient-information", {
  title: newPatientInformation.title,
  description: newPatientInformation.metaDescription,
});

export default function Page() {
  return (
    <SimplePageView
      path={"/new-patients/new-patient-information"}
      page={newPatientInformation}
      crumbs={[
        { label: "Home", href: "/" },
        { label: "New Patients", href: "/new-patients" },
        { label: newPatientInformation.title },
      ]}
    />
  );
}

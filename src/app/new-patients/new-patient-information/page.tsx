import type { Metadata } from "next";
import { canonical } from "@/lib/site";
import { newPatientInformation } from "@/content/pages";
import { SimplePageView } from "@/components/page/SimplePageView";

export const metadata: Metadata = {
  title: newPatientInformation.title,
  description: newPatientInformation.metaDescription,
  alternates: { canonical: canonical("/new-patients/new-patient-information") },
};

export default function Page() {
  return (
    <SimplePageView
      page={newPatientInformation}
      crumbs={[
        { label: "Home", href: "/" },
        { label: "New Patients", href: "/new-patients" },
        { label: newPatientInformation.title },
      ]}
    />
  );
}

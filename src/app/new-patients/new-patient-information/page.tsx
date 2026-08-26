import type { Metadata } from "next";
import { newPatientInformation } from "@/content/pages";
import { SimplePageView } from "@/components/page/SimplePageView";

export const metadata: Metadata = {
  title: newPatientInformation.title,
  description: newPatientInformation.metaDescription,
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

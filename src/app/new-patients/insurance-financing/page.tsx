import type { Metadata } from "next";
import { canonical } from "@/lib/site";
import { insuranceFinancing } from "@/content/pages";
import { SimplePageView } from "@/components/page/SimplePageView";

export const metadata: Metadata = {
  title: insuranceFinancing.title,
  description: insuranceFinancing.metaDescription,
  alternates: { canonical: canonical("/new-patients/insurance-financing") },
};

export default function Page() {
  return (
    <SimplePageView
      page={insuranceFinancing}
      crumbs={[
        { label: "Home", href: "/" },
        { label: "New Patients", href: "/new-patients" },
        { label: insuranceFinancing.title },
      ]}
    />
  );
}

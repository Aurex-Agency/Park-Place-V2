import type { Metadata } from "next";
import { insuranceFinancing } from "@/content/pages";
import { SimplePageView } from "@/components/page/SimplePageView";

export const metadata: Metadata = {
  title: insuranceFinancing.title,
  description: insuranceFinancing.metaDescription,
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

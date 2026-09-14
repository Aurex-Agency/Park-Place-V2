import type { Metadata } from "next";
import { pageMetadata } from "@/content/seo";
import { insuranceFinancing } from "@/content/pages";
import { SimplePageView } from "@/components/page/SimplePageView";

export const metadata: Metadata = pageMetadata("/new-patients/insurance-financing", {
  title: insuranceFinancing.title,
  description: insuranceFinancing.metaDescription,
});

export default function Page() {
  return (
    <SimplePageView
      path={"/new-patients/insurance-financing"}
      page={insuranceFinancing}
      crumbs={[
        { label: "Home", href: "/" },
        { label: "New Patients", href: "/new-patients" },
        { label: insuranceFinancing.title },
      ]}
    />
  );
}

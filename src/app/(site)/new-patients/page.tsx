import type { Metadata } from "next";
import { pageMetadata } from "@/content/seo";
import { newPatients } from "@/content/pages";
import { SimplePageView } from "@/components/page/SimplePageView";

export const metadata: Metadata = pageMetadata("/new-patients", {
  title: newPatients.title,
  description: newPatients.metaDescription,
});

export default function Page() {
  return (
    <SimplePageView
      path={"/new-patients"}
      page={newPatients}
      crumbs={[{ label: "Home", href: "/" }, { label: newPatients.title }]}
    />
  );
}

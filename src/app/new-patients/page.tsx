import type { Metadata } from "next";
import { newPatients } from "@/content/pages";
import { SimplePageView } from "@/components/page/SimplePageView";

export const metadata: Metadata = {
  title: newPatients.title,
  description: newPatients.metaDescription,
};

export default function Page() {
  return (
    <SimplePageView
      page={newPatients}
      crumbs={[{ label: "Home", href: "/" }, { label: newPatients.title }]}
    />
  );
}

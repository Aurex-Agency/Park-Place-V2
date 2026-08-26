import type { Metadata } from "next";
import { meetTheDentist } from "@/content/pages";
import { SimplePageView } from "@/components/page/SimplePageView";

export const metadata: Metadata = {
  title: meetTheDentist.title,
  description: meetTheDentist.metaDescription,
};

export default function Page() {
  return (
    <SimplePageView
      page={meetTheDentist}
      crumbs={[
        { label: "Home", href: "/" },
        { label: "About Us" },
        { label: meetTheDentist.title },
      ]}
    />
  );
}

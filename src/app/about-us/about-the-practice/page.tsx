import type { Metadata } from "next";
import { canonical } from "@/lib/site";
import { aboutPractice } from "@/content/pages";
import { SimplePageView } from "@/components/page/SimplePageView";

export const metadata: Metadata = {
  title: aboutPractice.title,
  description: aboutPractice.metaDescription,
  alternates: { canonical: canonical("/about-us/about-the-practice") },
};

export default function Page() {
  return (
    <SimplePageView
      page={aboutPractice}
      crumbs={[
        { label: "Home", href: "/" },
        { label: "About Us" },
        { label: aboutPractice.title },
      ]}
    />
  );
}

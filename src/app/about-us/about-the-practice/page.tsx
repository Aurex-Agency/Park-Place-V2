import type { Metadata } from "next";
import { pageMetadata } from "@/content/seo";
import { aboutPractice } from "@/content/pages";
import { SimplePageView } from "@/components/page/SimplePageView";

export const metadata: Metadata = pageMetadata("/about-us/about-the-practice", {
  title: aboutPractice.title,
  description: aboutPractice.metaDescription,
});

export default function Page() {
  return (
    <SimplePageView
      path={"/about-us/about-the-practice"}
      page={aboutPractice}
      crumbs={[
        { label: "Home", href: "/" },
        { label: "About Us" },
        { label: aboutPractice.title },
      ]}
    />
  );
}

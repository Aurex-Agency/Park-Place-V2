import type { Metadata } from "next";
import { pageMetadata } from "@/content/seo";
import { meetTheDentist } from "@/content/pages";
import { SimplePageView } from "@/components/page/SimplePageView";

export const metadata: Metadata = pageMetadata("/about-us/meet-the-dentist", {
  title: meetTheDentist.title,
  description: meetTheDentist.metaDescription,
});

export default function Page() {
  return (
    <SimplePageView
      path={"/about-us/meet-the-dentist"}
      page={meetTheDentist}
      crumbs={[
        { label: "Home", href: "/" },
        { label: "About Us" },
        { label: meetTheDentist.title },
      ]}
    />
  );
}

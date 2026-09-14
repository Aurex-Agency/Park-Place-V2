import type { Metadata } from "next";
import { pageMetadata } from "@/content/seo";
import { meetTheTeam } from "@/content/pages";
import { SimplePageView } from "@/components/page/SimplePageView";

export const metadata: Metadata = pageMetadata("/about-us/meet-the-team", {
  title: meetTheTeam.title,
  description: meetTheTeam.metaDescription,
});

export default function Page() {
  return (
    <SimplePageView
      path={"/about-us/meet-the-team"}
      page={meetTheTeam}
      crumbs={[
        { label: "Home", href: "/" },
        { label: "About Us" },
        { label: meetTheTeam.title },
      ]}
    />
  );
}

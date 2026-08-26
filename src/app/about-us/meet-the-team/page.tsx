import type { Metadata } from "next";
import { canonical } from "@/lib/site";
import { meetTheTeam } from "@/content/pages";
import { SimplePageView } from "@/components/page/SimplePageView";

export const metadata: Metadata = {
  title: meetTheTeam.title,
  description: meetTheTeam.metaDescription,
  alternates: { canonical: canonical("/about-us/meet-the-team") },
};

export default function Page() {
  return (
    <SimplePageView
      page={meetTheTeam}
      crumbs={[
        { label: "Home", href: "/" },
        { label: "About Us" },
        { label: meetTheTeam.title },
      ]}
    />
  );
}

import type { Metadata } from "next";
import { meetTheTeam } from "@/content/pages";
import { SimplePageView } from "@/components/page/SimplePageView";

export const metadata: Metadata = {
  title: meetTheTeam.title,
  description: meetTheTeam.metaDescription,
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

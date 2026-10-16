import type { Metadata } from "next";
import { pageMetadata } from "@/content/seo";
import { veteransPage } from "@/content/pages";
import { SimplePageView } from "@/components/page/SimplePageView";

export const metadata: Metadata = pageMetadata("/veterans", {
  title: veteransPage.title,
  description: veteransPage.metaDescription,
});

export default function Page() {
  return (
    <SimplePageView
      path="/veterans"
      page={veteransPage}
      crumbs={[{ label: "Home", href: "/" }, { label: "For Veterans" }]}
    />
  );
}

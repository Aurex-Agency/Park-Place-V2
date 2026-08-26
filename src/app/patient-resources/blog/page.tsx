import type { Metadata } from "next";
import { blogPage } from "@/content/pages";
import { SimplePageView } from "@/components/page/SimplePageView";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: blogPage.title,
  description: blogPage.metaDescription,
};

export default function Page() {
  return (
    <SimplePageView
      page={blogPage}
      crumbs={[
        { label: "Home", href: "/" },
        { label: "Patient Resources", href: "/patient-resources" },
        { label: blogPage.title },
      ]}
    >
      <div className="section">
        <div className="shell-narrow text-center">
          <Reveal>
            <p className="rounded-[1.25rem] bg-white p-10 text-taupe shadow-[var(--shadow-sm)] ring-1 ring-sand/60">
              The first articles are being written now. In the meantime, our
              FAQs answer the questions we hear most often, and the team is
              always glad to talk anything through on the phone.
            </p>
          </Reveal>
        </div>
      </div>
    </SimplePageView>
  );
}

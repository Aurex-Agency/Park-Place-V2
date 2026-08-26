import type { Metadata } from "next";
import { canonical } from "@/lib/site";
import { practice } from "@/lib/content";
import { PageHeader } from "@/components/page/PageHeader";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Accessibility",
  description:
    "Park Place Dental is committed to making this website usable for everyone.",
  alternates: { canonical: canonical("/accessibility") },
};

const sections = [
  {
    heading: "What we aim for",
    body: [
      "This website is built to meet WCAG 2.2 level AA. In practice that means text meets contrast requirements against whatever sits behind it, every control can be reached and operated with a keyboard, images carry text alternatives, and headings describe the structure of each page.",
    ],
  },
  {
    heading: "Motion",
    body: [
      "If your device is set to reduce motion, this site honours that. Animations stop, the scrolling panels hold still, and nothing moves that you did not ask to move.",
    ],
  },
  {
    heading: "How it is checked",
    body: [
      "Every page is tested with automated accessibility tooling, and colour contrast is measured against the actual rendered background rather than assumed. Automated testing cannot catch everything, which is why the next section matters.",
    ],
  },
  {
    heading: "If something does not work for you",
    body: [
      `We want to hear about it, and we will fix it. Call the practice on ${practice.phone} or email ${practice.email} and tell us what you were trying to do. If a page is standing between you and booking an appointment, call us and we will book it for you over the phone.`,
    ],
  },
];

export default function Page() {
  return (
    <>
      <PageHeader
        eyebrow="Accessibility"
        headline="This site should work / for everybody"
        lead="If it does not work for you, that is a problem we want to fix. Here is what we aim for and how to tell us when we fall short."
        crumbs={[{ label: "Home", href: "/" }, { label: "Accessibility" }]}
      />

      <div className="section">
        <div className="shell-narrow flex flex-col gap-12">
          {sections.map((section) => (
            <section key={section.heading}>
              <Reveal>
                <h2 className="t-h3">{section.heading}</h2>
              </Reveal>
              <div className="mt-4 flex flex-col gap-4">
                {section.body.map((text, i) => (
                  <Reveal key={i} delay={i * 0.04}>
                    <p className="text-taupe">{text}</p>
                  </Reveal>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </>
  );
}

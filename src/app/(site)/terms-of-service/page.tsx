import Link from "next/link";
import { PageHeader } from "@/components/page/PageHeader";
import { pageMetadata } from "@/content/seo";
import { practice } from "@/lib/content";

export const metadata = pageMetadata("/terms-of-service", {
  title: "Terms of Service",
  description: "Website and SMS messaging terms for Park Place Dental in Booneville, Mississippi.",
});

const sections = [
  ["Our practice and this website", "Ken Goodwin, DMD, PA operates as Park Place Dental at 403 N 3rd St, Booneville, MS 38829. Website information is general education and does not replace an examination or personal dental advice. An appointment request does not reserve a time; our team must confirm it with you."],
  ["SMS program and your choices", "You may opt in to informational text messages, including appointment confirmations, reminders, scheduling updates and replies to enquiries. A separate choice allows marketing and promotional texts, including dental service updates and special offers. Each checkbox is optional and unchecked by default. Entering a phone number alone does not grant SMS permission. Neither choice is required to submit a form, make a purchase or receive care."],
  ["Message frequency and charges", "Message frequency varies based on your requests, appointments and the messaging choices you make. Message and data rates may apply under your mobile carrier plan. Contact your carrier about charges."],
  ["Stopping messages and getting help", `Reply STOP to a message to opt out of the SMS program. You may receive a final confirmation of your opt-out. Reply HELP for assistance, or contact Park Place Dental at ${practice.phone} or ${practice.email}. To receive texts again after opting out, follow the messaging service's re-enrollment instructions or contact us for help.`],
  ["Your phone number and message delivery", "Only enroll a phone number you are authorized to use, and notify us if that number changes. Delivery depends on your carrier and service availability. Carriers are not liable for delayed or undelivered messages. Do not rely on text messages for emergencies or send medical history, insurance numbers or payment details by SMS."],
  ["SMS privacy", "We do not share, sell or rent mobile phone numbers, SMS opt-in data or consent with third parties or affiliates for their marketing or promotional purposes. Information may be shared with service providers only as necessary to deliver and administer our messaging program. Our Privacy Policy explains how we handle website submissions and SMS consent records."],
];

export default function Page() {
  return <>
    <PageHeader eyebrow="Terms of Service" headline="Website and / text messaging terms" lead="Your choices, how messaging works, and how to reach us for help." crumbs={[{ label: "Home", href: "/" }, { label: "Terms of Service" }]} />
    <div className="section"><div className="shell-narrow flex flex-col gap-10">
      <p className="text-taupe">Effective October 19, 2026.</p>
      {sections.map(([heading, body]) => <section key={heading}><h2 className="t-h3">{heading}</h2><p className="mt-4 text-taupe">{body}</p></section>)}
      <p><Link href="/privacy-policy" className="text-rose-deep underline underline-offset-4">Read our Privacy Policy</Link></p>
    </div></div>
  </>;
}

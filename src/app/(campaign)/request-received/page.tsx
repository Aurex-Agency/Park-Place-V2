import type { Metadata } from "next";
import { Suspense } from "react";
import { canonical } from "@/lib/site";
import { practice } from "@/lib/content";
import { Confirmation } from "@/components/campaign/Confirmation";

export const metadata: Metadata = {
  title: "Request Received",
  description: "Thank you. We have your request and will call you shortly.",
  // A confirmation page carries no value in search and would compete with the
  // landing page itself. It is also the Google Ads conversion destination,
  // which must not be reachable any other way.
  robots: { index: false, follow: false },
  alternates: { canonical: canonical("/request-received") },
};

export default function Page() {
  return (
    <Suspense
      fallback={
        <div className="section">
          <div className="shell-narrow text-center">
            <h1 className="t-h1">Thank you, we have your request</h1>
            <p className="mt-5 text-taupe">
              Someone from our team will call you shortly. If you would rather
              not wait, please call {practice.phone}.
            </p>
          </div>
        </div>
      }
    >
      <Confirmation />
    </Suspense>
  );
}

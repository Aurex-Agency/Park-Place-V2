import Link from "next/link";
import { SMS_BUSINESS, SMS_INFORMATIONAL, SMS_MARKETING } from "@/lib/smsConsent";

export function SmsConsent() {
  return (
    <fieldset className="rounded-2xl border border-sand bg-linen/60 p-5">
      <legend className="px-2 font-medium text-espresso">Text messages (optional)</legend>
      <p className="mb-4 text-sm leading-relaxed text-taupe">{SMS_BUSINESS}.</p>
      <div className="flex flex-col gap-4">
        {[
          { name: "smsInformational", text: SMS_INFORMATIONAL },
          { name: "smsMarketing", text: SMS_MARKETING },
        ].map(({ name, text }) => (
          <label key={name} className="flex cursor-pointer items-start gap-3 text-sm leading-relaxed text-espresso">
            <input type="checkbox" name={name} className="mt-1 h-5 w-5 shrink-0 accent-rose-deep focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-rose-deep" />
            <span>{text}</span>
          </label>
        ))}
      </div>
      <p className="mt-4 text-sm leading-relaxed text-taupe">
        You can submit this form with either or both boxes unchecked. Providing a phone number alone does not give permission to text you.
      </p>
      <p className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm">
        <Link href="/privacy-policy" className="text-rose-deep underline underline-offset-4">Privacy Policy</Link>
        <Link href="/terms-of-service" className="text-rose-deep underline underline-offset-4">Terms of Service</Link>
      </p>
    </fieldset>
  );
}

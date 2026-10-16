"use client";

import { useRouter } from "next/navigation";
import { fieldClass, labelClass } from "@/components/page/formStyles";
import { useSubmit } from "@/components/page/useSubmit";
import { Honeypot } from "@/components/page/Honeypot";
import { HONEYPOT_FIELD } from "@/lib/forms";
import { phoneFor, type Campaign } from "@/content/campaigns";
import { track } from "@vercel/analytics";
import { reportLead } from "@/lib/conversions";

/**
 * The lead form on an advertising landing page.
 *
 * Five fields at most, because every additional one costs completions and
 * these pages exist to produce enquiries. The questions come from the campaign
 * definition, and the server accepts only the answers that definition lists.
 *
 * On success the visitor goes to a confirmation page rather than seeing an
 * inline message. That is what the campaign brief asks for and it is also the
 * more reliable place to record a conversion, since the page load is a thing
 * Google Ads can see.
 */
export function CampaignForm({ campaign }: { campaign: Campaign }) {
  const router = useRouter();
  const { status, error, submit } = useSubmit();
  const form = campaign.form;
  const phone = phoneFor(campaign.slug);

  if (!form) return null;

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const element = event.currentTarget;
    const data = new FormData(element);
    const get = (key: string) => String(data.get(key) ?? "").trim();

    const answers: Record<string, string> = {};
    for (const field of form!.fields) answers[field.name] = get(field.name);

    const sent = await submit({
      kind: "campaign",
      campaign: campaign.slug,
      name: get("name"),
      email: get("email"),
      phone: get("phone"),
      answers,
      [HONEYPOT_FIELD]: get(HONEYPOT_FIELD),
    });

    if (!sent) return;

    try {
      track("lead", { campaign: campaign.slug });
    } catch {
      // Never block the confirmation on measurement.
    }
    reportLead(campaign.slug);
    router.push(`/request-received?from=${encodeURIComponent(campaign.slug)}`);
  }

  return (
    <form onSubmit={handleSubmit} className="relative flex flex-col gap-5">
      <Honeypot />

      <div>
        <label htmlFor="lp-name" className={labelClass}>
          Name
        </label>
        <input id="lp-name" name="name" required autoComplete="name" className={`${fieldClass} mt-2`} />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="lp-phone" className={labelClass}>
            Phone
          </label>
          <input
            id="lp-phone"
            name="phone"
            type="tel"
            required
            autoComplete="tel"
            className={`${fieldClass} mt-2`}
          />
        </div>
        <div>
          <label htmlFor="lp-email" className={labelClass}>
            Email
          </label>
          <input
            id="lp-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className={`${fieldClass} mt-2`}
          />
        </div>
      </div>

      {form.fields.map((field) => (
        <div key={field.name}>
          <label htmlFor={`lp-${field.name}`} className={labelClass}>
            {field.label}
          </label>
          <select
            id={`lp-${field.name}`}
            name={field.name}
            defaultValue=""
            required={field.required}
            className={`${fieldClass} mt-2`}
          >
            <option value="">Select one</option>
            {field.options.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </div>
      ))}

      <button
        type="submit"
        className="btn btn-primary mt-1 w-full justify-center !py-4 text-[1.05rem]"
        disabled={status === "sending"}
      >
        {status === "sending" ? "Sending" : form.submitLabel}
      </button>

      <p aria-live="polite" className="text-center text-[0.9rem] text-taupe">
        {status === "error" && error ? (
          error
        ) : (
          <>
            Prefer to talk now? Call{" "}
            <a
              href={phone.href}
              data-call-placement="under-form"
              className="tap-inline font-medium text-rose-deep underline underline-offset-4"
            >
              {phone.display}
            </a>
          </>
        )}
      </p>
    </form>
  );
}

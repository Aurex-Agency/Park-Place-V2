"use client";

import { practice } from "@/lib/content";
import { fieldClass, labelClass } from "@/components/page/formStyles";
import { useSubmit } from "@/components/page/useSubmit";
import { Honeypot } from "@/components/page/Honeypot";
import { FormSuccess } from "@/components/page/FormSuccess";

/**
 * General contact form.
 *
 * Posts to the site's own endpoint, which emails the front desk and sends the
 * visitor a confirmation. Validation runs again on the server, so the required
 * attributes below are a courtesy to the visitor rather than the real gate.
 */
export function ContactForm() {
  const { status, error, submit } = useSubmit();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const get = (key: string) => String(data.get(key) ?? "").trim();

    const sent = await submit({
      kind: "contact",
      name: get("name"),
      email: get("email"),
      phone: get("phone"),
      subject: get("subject"),
      message: get("message"),
      company: get("company"),
    });

    if (sent) form.reset();
  }

  if (status === "sent") {
    return (
      <FormSuccess
        heading="Thank you, your message is on its way"
        body="Someone from our front desk will be back to you shortly. If anything is urgent, please call us rather than waiting on a reply."
      />
    );
  }

  return (
    <form onSubmit={handleSubmit} className="relative flex flex-col gap-6">
      <Honeypot />

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className={labelClass}>
            Your name
          </label>
          <input
            id="contact-name"
            name="name"
            required
            autoComplete="name"
            className={`${fieldClass} mt-2`}
          />
        </div>
        <div>
          <label htmlFor="contact-phone" className={labelClass}>
            Phone number
          </label>
          <input
            id="contact-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            className={`${fieldClass} mt-2`}
          />
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-email" className={labelClass}>
            Email address
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className={`${fieldClass} mt-2`}
          />
        </div>
        <div>
          <label htmlFor="contact-subject" className={labelClass}>
            What is this about?
          </label>
          <select
            id="contact-subject"
            name="subject"
            defaultValue=""
            className={`${fieldClass} mt-2`}
          >
            <option value="">Select one</option>
            <option>Booking a visit</option>
            <option>A question about treatment</option>
            <option>Insurance or billing</option>
            <option>Patient forms</option>
            <option>Something else</option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="contact-message" className={labelClass}>
          Your message
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={6}
          required
          className={`${fieldClass} mt-2 resize-y`}
        />
      </div>

      <div className="flex flex-wrap items-center gap-5">
        <button type="submit" className="btn btn-primary" disabled={status === "sending"}>
          {status === "sending" ? "Sending" : "Send message"}
        </button>
        <p className="text-[0.9rem] text-taupe">
          Or call{" "}
          <a
            href={practice.phoneHref}
            className="tap-inline font-medium text-rose-deep underline underline-offset-4"
          >
            {practice.phone}
          </a>
        </p>
      </div>

      <p aria-live="polite" className="text-[0.9rem] text-taupe">
        {status === "error" && error
          ? error
          : "Please do not send medical history, insurance numbers or payment details through this form."}
      </p>
    </form>
  );
}

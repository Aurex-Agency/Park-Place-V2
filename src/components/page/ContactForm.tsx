"use client";

import { useState } from "react";
import { practice } from "@/lib/content";
import { fieldClass, labelClass } from "@/components/page/formStyles";

type Status = "idle" | "sending" | "sent" | "error";

/**
 * General contact form.
 *
 * There is no backend yet. To wire one up, set NEXT_PUBLIC_CONTACT_ENDPOINT to
 * a URL that accepts a JSON POST. That is the only change needed: the fields,
 * validation, states and messages below all stay as they are.
 *
 * Until that variable is set, submitting composes an email to the front desk
 * with the answers filled in. That is deliberate. A form that shows a success
 * message while dropping the message on the floor is worse than no form, and
 * this one is going live before the endpoint exists.
 */
const ENDPOINT = process.env.NEXT_PUBLIC_CONTACT_ENDPOINT;

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const get = (k: string) => String(data.get(k) ?? "").trim();

    const payload = {
      name: get("name"),
      email: get("email"),
      phone: get("phone"),
      subject: get("subject"),
      message: get("message"),
    };

    if (ENDPOINT) {
      setStatus("sending");
      try {
        const res = await fetch(ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error(String(res.status));
        setStatus("sent");
        form.reset();
      } catch {
        setStatus("error");
      }
      return;
    }

    // No endpoint configured: hand the message to the visitor's email app so
    // it actually reaches the practice.
    const body = [
      `Name: ${payload.name}`,
      `Phone: ${payload.phone}`,
      `Email: ${payload.email}`,
      "",
      payload.message,
    ].join("\n");

    const subject = payload.subject
      ? `Website enquiry: ${payload.subject}`
      : "Website enquiry";

    window.open(
      `${practice.emailHref}?subject=${encodeURIComponent(
        subject,
      )}&body=${encodeURIComponent(body)}`,
      "_self",
    );
    setStatus("sent");
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6" noValidate={false}>
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
        {status === "sent" && ENDPOINT
          ? "Thank you. Your message is with our front desk and we will be back to you shortly."
          : status === "sent"
            ? "Your email app should have opened with your message ready to send. If it did not, please call the office."
            : status === "error"
              ? "Something went wrong sending that. Please call the office and we will help straight away."
              : "Please do not send medical history, insurance numbers or payment details through this form."}
      </p>
    </form>
  );
}

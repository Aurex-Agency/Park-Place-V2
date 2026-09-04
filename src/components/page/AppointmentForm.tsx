"use client";

import { practice } from "@/lib/content";
import { fieldClass, labelClass } from "@/components/page/formStyles";
import { useSubmit } from "@/components/page/useSubmit";
import { Honeypot } from "@/components/page/Honeypot";
import { FormSuccess } from "@/components/page/FormSuccess";

/**
 * Appointment request form.
 *
 * Posts to the site's own endpoint, which emails the front desk and sends the
 * patient a confirmation. Nothing here books anything: the request goes to a
 * person, and the copy says so, because a patient who believes they have a
 * confirmed slot and turns up to an empty diary is the worst outcome this form
 * can produce.
 */
export function AppointmentForm() {
  const { status, error, submit } = useSubmit();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const get = (key: string) => String(data.get(key) ?? "").trim();

    const sent = await submit({
      kind: "appointment",
      name: get("name"),
      email: get("email"),
      phone: get("phone"),
      date: get("date"),
      time: get("time"),
      newPatient: get("newPatient"),
      reason: get("reason"),
      notes: get("notes"),
      company: get("company"),
    });

    if (sent) form.reset();
  }

  if (status === "sent") {
    return (
      <FormSuccess
        heading="Thank you, we have your request"
        body="Someone from our front desk will call you shortly to confirm a time. Nothing is booked until we have spoken with you."
      />
    );
  }

  return (
    <form onSubmit={handleSubmit} className="relative flex flex-col gap-6">
      <Honeypot />

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={labelClass}>
            Full name
          </label>
          <input id="name" name="name" required autoComplete="name" className={`${fieldClass} mt-2`} />
        </div>
        <div>
          <label htmlFor="phone" className={labelClass}>
            Phone number
          </label>
          <input id="phone" name="phone" type="tel" required autoComplete="tel" className={`${fieldClass} mt-2`} />
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="email" className={labelClass}>
            Email address
          </label>
          <input id="email" name="email" type="email" required autoComplete="email" className={`${fieldClass} mt-2`} />
        </div>
        <div>
          <label htmlFor="date" className={labelClass}>
            Preferred date
          </label>
          <input id="date" name="date" type="date" className={`${fieldClass} mt-2`} />
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-3">
        <div>
          <label htmlFor="time" className={labelClass}>
            Preferred time
          </label>
          <select id="time" name="time" defaultValue="" className={`${fieldClass} mt-2`}>
            <option value="">No preference</option>
            <option>Morning</option>
            <option>Afternoon</option>
          </select>
        </div>
        <div>
          <label htmlFor="newPatient" className={labelClass}>
            Are you a new patient?
          </label>
          <select id="newPatient" name="newPatient" defaultValue="" className={`${fieldClass} mt-2`}>
            <option value="">Select one</option>
            <option>Yes</option>
            <option>No</option>
          </select>
        </div>
        <div>
          <label htmlFor="reason" className={labelClass}>
            Reason for visit
          </label>
          <select id="reason" name="reason" defaultValue="" className={`${fieldClass} mt-2`}>
            <option value="">Select one</option>
            <option>Routine checkup</option>
            <option>Tooth pain or concern</option>
            <option>Cosmetic consultation</option>
            <option>Other</option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="notes" className={labelClass}>
          Anything else we should know?
        </label>
        <textarea id="notes" name="notes" rows={4} className={`${fieldClass} mt-2 resize-y`} />
      </div>

      <div className="mt-2 flex flex-wrap items-center gap-5">
        <button type="submit" className="btn btn-primary" disabled={status === "sending"}>
          {status === "sending" ? "Sending" : "Request appointment"}
        </button>
        <p className="text-[0.9rem] text-taupe">
          Or call us on{" "}
          <a href={practice.phoneHref} className="tap-inline font-medium text-rose-deep underline underline-offset-4">
            {practice.phone}
          </a>
        </p>
      </div>

      <p aria-live="polite" className="text-[0.9rem] text-taupe">
        {status === "error" && error
          ? error
          : "We will call you to confirm a time. Please do not send medical history, insurance numbers or payment details through this form."}
      </p>
    </form>
  );
}

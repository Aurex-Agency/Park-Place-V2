"use client";

import { useState } from "react";
import { practice } from "@/lib/content";

/**
 * Appointment request form.
 *
 * There is no backend yet, so submitting composes an email to the practice
 * with the answers filled in rather than pretending to send something. That
 * keeps the form honest: nothing is silently dropped. When a form endpoint
 * exists, replace handleSubmit and delete this note.
 */
const field =
  "w-full rounded-[var(--radius-field)] border border-sand bg-white px-4 py-3.5 text-[1rem] text-espresso outline-none transition-[border-color,box-shadow] duration-300 placeholder:text-taupe-light focus:border-rose focus:shadow-[0_0_0_3px_rgba(184,122,104,0.16)]";
const label = "block text-[0.9rem] font-medium text-espresso";

export function AppointmentForm() {
  const [sent, setSent] = useState(false);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const get = (k: string) => String(data.get(k) ?? "").trim();

    const body = [
      `Name: ${get("name")}`,
      `Phone: ${get("phone")}`,
      `Email: ${get("email")}`,
      `Preferred date: ${get("date")}`,
      `Preferred time: ${get("time")}`,
      `New patient: ${get("newPatient")}`,
      `Reason for visit: ${get("reason")}`,
      "",
      get("notes"),
    ].join("\n");

    const mailto = `${practice.emailHref}?subject=${encodeURIComponent(
      "Appointment request",
    )}&body=${encodeURIComponent(body)}`;

    // mailto is an external protocol handler rather than a route, so this is
    // opened rather than navigated to. The visitor keeps the page they are on.
    window.open(mailto, "_self");
    setSent(true);
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={label}>
            Full name
          </label>
          <input id="name" name="name" required autoComplete="name" className={`${field} mt-2`} />
        </div>
        <div>
          <label htmlFor="phone" className={label}>
            Phone number
          </label>
          <input id="phone" name="phone" type="tel" required autoComplete="tel" className={`${field} mt-2`} />
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="email" className={label}>
            Email address
          </label>
          <input id="email" name="email" type="email" required autoComplete="email" className={`${field} mt-2`} />
        </div>
        <div>
          <label htmlFor="date" className={label}>
            Preferred date
          </label>
          <input id="date" name="date" type="date" className={`${field} mt-2`} />
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-3">
        <div>
          <label htmlFor="time" className={label}>
            Preferred time
          </label>
          <select id="time" name="time" defaultValue="" className={`${field} mt-2`}>
            <option value="">No preference</option>
            <option>Morning</option>
            <option>Afternoon</option>
          </select>
        </div>
        <div>
          <label htmlFor="newPatient" className={label}>
            Are you a new patient?
          </label>
          <select id="newPatient" name="newPatient" defaultValue="" className={`${field} mt-2`}>
            <option value="">Select one</option>
            <option>Yes</option>
            <option>No</option>
          </select>
        </div>
        <div>
          <label htmlFor="reason" className={label}>
            Reason for visit
          </label>
          <select id="reason" name="reason" defaultValue="" className={`${field} mt-2`}>
            <option value="">Select one</option>
            <option>Routine checkup</option>
            <option>Tooth pain or concern</option>
            <option>Cosmetic consultation</option>
            <option>Other</option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="notes" className={label}>
          Anything else we should know?
        </label>
        <textarea id="notes" name="notes" rows={4} className={`${field} mt-2 resize-y`} />
      </div>

      <div className="mt-2 flex flex-wrap items-center gap-5">
        <button type="submit" className="btn btn-primary">
          Request appointment
        </button>
        <p className="text-[0.9rem] text-taupe">
          Or call us on{" "}
          <a href={practice.phoneHref} className="tap-inline font-medium text-rose-deep underline underline-offset-4">
            {practice.phone}
          </a>
        </p>
      </div>

      <p aria-live="polite" className="text-[0.9rem] text-taupe">
        {sent
          ? "Your email app should have opened with the details filled in. If it did not, please call the office and we will book you straight in."
          : "This form opens your email app with the details filled in, addressed to our front desk."}
      </p>
    </form>
  );
}

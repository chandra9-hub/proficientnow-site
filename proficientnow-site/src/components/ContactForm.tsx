"use client";

import { useState } from "react";
import { site } from "@content/site";

// PHASE 1 form: on submit it opens the visitor's email app with the message
// pre-filled to your inbox. In Phase 3 we'll replace this with a proper
// database-backed form (submissions saved + stored securely, no email app needed).
export default function ContactForm() {
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = `${data.get("firstName")} ${data.get("lastName")}`;
    const subject = `Website enquiry from ${name}`;
    const body = [
      `Name: ${name}`,
      `Email: ${data.get("email")}`,
      `Phone: ${data.get("phone")}`,
      `Interested in: ${data.get("interest")}`,
      "",
      `Message:`,
      `${data.get("message")}`,
    ].join("\n");
    window.location.href = `mailto:${site.contact.email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
    setSent(true);
  }

  const field =
    "w-full rounded-lg border border-line bg-white px-4 py-3 text-sm text-ink outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20";

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-navy">First name *</label>
          <input name="firstName" required className={field} />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-navy">Last name *</label>
          <input name="lastName" required className={field} />
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-navy">Email *</label>
          <input name="email" type="email" required className={field} />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-navy">Phone</label>
          <input name="phone" className={field} />
        </div>
      </div>
      <div>
        <label className="mb-1.5 block text-sm font-medium text-navy">I'm interested in *</label>
        <select name="interest" required className={field} defaultValue="">
          <option value="" disabled>Select one</option>
          <option>We need to hire</option>
          <option>I'm looking for a new role</option>
          <option>General enquiry</option>
        </select>
      </div>
      <div>
        <label className="mb-1.5 block text-sm font-medium text-navy">Message</label>
        <textarea name="message" rows={5} className={field} />
      </div>

      <button
        type="submit"
        className="inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-accent-dark hover:-translate-y-0.5"
      >
        Send message <span aria-hidden>→</span>
      </button>

      {sent && (
        <p className="text-sm text-slate">
          Your email app should have opened with the message ready to send. If it
          didn&apos;t, email us directly at{" "}
          <a href={`mailto:${site.contact.email}`} className="font-semibold text-accent">
            {site.contact.email}
          </a>
          .
        </p>
      )}
    </form>
  );
}

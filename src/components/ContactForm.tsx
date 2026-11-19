"use client";

import { useState } from "react";
import { site } from "@content/site";

// Opens the visitor's email app pre-filled; a later phase will store submissions instead.
export default function ContactForm() {
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = `${data.get("firstName")} ${data.get("lastName")}`;
    const subject = `Website enquiry from ${name}`;
    const body = [
      `Name: ${name}`, `Email: ${data.get("email")}`, `Phone: ${data.get("phone")}`,
      `Interested in: ${data.get("interest")}`, "", "Message:", `${data.get("message")}`,
    ].join("\n");
    window.location.href = `mailto:${site.contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div className="grid-2" style={{ gap: 16 }}>
        <div><label className="label" htmlFor="cf-first">First name *</label><input id="cf-first" name="firstName" autoComplete="given-name" required className="field" /></div>
        <div><label className="label" htmlFor="cf-last">Last name *</label><input id="cf-last" name="lastName" autoComplete="family-name" required className="field" /></div>
      </div>
      <div className="grid-2" style={{ gap: 16 }}>
        <div><label className="label" htmlFor="cf-email">Email *</label><input id="cf-email" type="email" name="email" autoComplete="email" required className="field" /></div>
        <div><label className="label" htmlFor="cf-phone">Phone</label><input id="cf-phone" type="tel" name="phone" autoComplete="tel" className="field" /></div>
      </div>
      <div>
        <label className="label" htmlFor="cf-interest">I&apos;m interested in *</label>
        <select id="cf-interest" name="interest" required className="field" defaultValue="">
          <option value="" disabled>Select one</option>
          <option>We need to hire</option>
          <option>I&apos;m looking for a new role</option>
          <option>General enquiry</option>
        </select>
      </div>
      <div><label className="label" htmlFor="cf-message">Message</label><textarea id="cf-message" name="message" rows={5} className="field" /></div>
      <button type="submit" className="btn-primary" style={{ alignSelf: "flex-start", border: 0, cursor: "pointer" }}>
        Send message <span aria-hidden>→</span>
      </button>
      {sent && (
        <p className="muted" style={{ fontSize: 14 }}>
          Your email app should have opened with the message ready to send. If not, email us at{" "}
          <a href={`mailto:${site.contact.email}`} className="accent">{site.contact.email}</a>.
        </p>
      )}
    </form>
  );
}

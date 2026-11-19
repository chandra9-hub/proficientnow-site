"use client";

import { useState } from "react";
import { site } from "@content/site";

// Phase 1 form: opens the visitor's email app pre-filled. Phase 3 will store
// submissions in the database instead.
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
        <div><label className="label">First name *</label><input name="firstName" required className="field" /></div>
        <div><label className="label">Last name *</label><input name="lastName" required className="field" /></div>
      </div>
      <div className="grid-2" style={{ gap: 16 }}>
        <div><label className="label">Email *</label><input type="email" name="email" required className="field" /></div>
        <div><label className="label">Phone</label><input name="phone" className="field" /></div>
      </div>
      <div>
        <label className="label">I&apos;m interested in *</label>
        <select name="interest" required className="field" defaultValue="">
          <option value="" disabled>Select one</option>
          <option>We need to hire</option>
          <option>I&apos;m looking for a new role</option>
          <option>General enquiry</option>
        </select>
      </div>
      <div><label className="label">Message</label><textarea name="message" rows={5} className="field" /></div>
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

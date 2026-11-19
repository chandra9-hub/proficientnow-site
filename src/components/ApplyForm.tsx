"use client";

import { useEffect, useState } from "react";
import { careers } from "@content/careers";

export default function ApplyForm({ jobId, jobTitle }: { jobId: string; jobTitle: string }) {
  const [status, setStatus] = useState<"idle" | "submitting" | "done" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  // Set after mount: the server rejects forms submitted within seconds of loading (bots).
  const [startedAt, setStartedAt] = useState("");
  useEffect(() => setStartedAt(String(Date.now())), []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMsg("");
    const data = new FormData(e.currentTarget);
    const file = data.get("cv") as File | null;

    try {
      if (!file || file.size === 0) throw new Error("Please attach your CV.");
      if (file.size > careers.upload.maxSizeMB * 1024 * 1024)
        throw new Error(`Your CV is larger than ${careers.upload.maxSizeMB} MB. Please upload a smaller file.`);

      const res = await fetch("/api/apply", { method: "POST", body: data });
      if (!res.ok) {
        const body = await res.json().catch(() => null);
        throw new Error(body?.error || "Something went wrong. Please try again or email us your CV.");
      }
      setStatus("done");
    } catch (err: any) {
      setStatus("error");
      setErrorMsg(err?.message || "Something went wrong. Please try again or email us your CV.");
    }
  }

  if (status === "done") {
    return (
      <div className="panel" style={{ textAlign: "center" }}>
        <h3 style={{ fontSize: 22 }}>{careers.success.heading}</h3>
        <p className="muted" style={{ marginTop: 12 }}>{careers.success.body}</p>
      </div>
    );
  }

  const half = { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 } as const;

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <input type="hidden" name="jobId" value={jobId} />
      <input type="hidden" name="startedAt" value={startedAt} />
      {/* Honeypot: hidden from people, often filled in by bots. */}
      <div aria-hidden="true" style={{ position: "absolute", left: -10000, width: 1, height: 1, overflow: "hidden" }}>
        <label>Website<input name="website" tabIndex={-1} autoComplete="off" /></label>
      </div>
      <p className="muted" style={{ fontSize: 14 }}>Applying for: <span style={{ color: "var(--heading)", fontWeight: 600 }}>{jobTitle}</span>. Fields marked * are required.</p>

      <div style={half} className="careers-filters">
        <div><label className="label">First name *</label><input name="firstName" required className="field" /></div>
        <div><label className="label">Last name *</label><input name="lastName" required className="field" /></div>
      </div>
      <div style={half} className="careers-filters">
        <div><label className="label">Email *</label><input type="email" name="email" required className="field" /></div>
        <div><label className="label">Phone *</label><input name="phone" required className="field" /></div>
      </div>
      <div style={half} className="careers-filters">
        <div><label className="label">Expected salary *</label><input name="expectedSalary" required className="field" placeholder="e.g. £45,000" /></div>
        <div><label className="label">Notice period *</label><input name="noticePeriod" required className="field" placeholder="e.g. 1 month" /></div>
      </div>
      <div style={half} className="careers-filters">
        <div><label className="label">Current location</label><input name="currentLocation" className="field" /></div>
        <div><label className="label">Current salary</label><input name="currentSalary" className="field" /></div>
      </div>
      <div style={half} className="careers-filters">
        <div><label className="label">Years of experience</label><input name="yearsExperience" className="field" /></div>
        <div><label className="label">LinkedIn</label><input name="linkedin" type="url" className="field" placeholder="https://" /></div>
      </div>
      <div><label className="label">Portfolio (optional)</label><input name="portfolio" type="url" className="field" placeholder="https://" /></div>
      <div><label className="label">Cover letter (optional)</label><textarea name="coverLetter" rows={4} className="field" /></div>
      <div>
        <label className="label">Upload CV * ({careers.upload.accept.replace(/\./g, "").replace(/,/g, ", ")} · max {careers.upload.maxSizeMB} MB)</label>
        <input type="file" name="cv" required accept={careers.upload.accept} className="field" style={{ padding: 10 }} />
      </div>

      <label style={{ display: "flex", gap: 10, alignItems: "flex-start", fontSize: 14 }} className="muted">
        <input type="checkbox" name="consent" value="yes" required style={{ marginTop: 3 }} />
        <span>I consent to ProficientNow storing my details and CV to consider me for this and future relevant roles. *</span>
      </label>

      <button type="submit" disabled={status === "submitting"} className="btn-primary" style={{ alignSelf: "flex-start", border: 0, cursor: "pointer", opacity: status === "submitting" ? 0.7 : 1 }}>
        {status === "submitting" ? "Submitting…" : "Submit application"} <span aria-hidden>→</span>
      </button>

      {status === "error" && <p style={{ color: "#ff6b6b", fontSize: 14 }}>{errorMsg}</p>}
    </form>
  );
}

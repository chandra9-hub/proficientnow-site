"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { careers } from "@content/careers";

export default function ApplyForm({ jobId, jobTitle }: { jobId: string; jobTitle: string }) {
  const [status, setStatus] = useState<"idle" | "submitting" | "done" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!supabase) { setStatus("error"); setErrorMsg("The application system isn't connected yet. Please email us your CV."); return; }
    setStatus("submitting");
    setErrorMsg("");
    const form = e.currentTarget;
    const data = new FormData(form);
    const file = data.get("cv") as File | null;

    try {
      // size check
      if (!file || file.size === 0) throw new Error("Please attach your CV.");
      if (file.size > careers.upload.maxSizeMB * 1024 * 1024)
        throw new Error(`Your CV is larger than ${careers.upload.maxSizeMB} MB. Please upload a smaller file.`);

      // 1) upload CV to the private "cvs" bucket
      const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
      const path = `${Date.now()}-${safeName}`;
      const up = await supabase.storage.from("cvs").upload(path, file, { upsert: false });
      if (up.error) throw up.error;

      // 2) save the application row
      const ins = await supabase.from("applications").insert({
        job_id: jobId,
        first_name: data.get("firstName"),
        last_name: data.get("lastName"),
        email: data.get("email"),
        phone: data.get("phone"),
        current_location: data.get("currentLocation") || null,
        notice_period: data.get("noticePeriod"),
        current_salary: data.get("currentSalary") || null,
        expected_salary: data.get("expectedSalary"),
        years_experience: data.get("yearsExperience") || null,
        linkedin_url: data.get("linkedin") || null,
        portfolio_url: data.get("portfolio") || null,
        cover_letter: data.get("coverLetter") || null,
        cv_path: path,
      });
      if (ins.error) throw ins.error;

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
        <div><label className="label">LinkedIn</label><input name="linkedin" className="field" /></div>
      </div>
      <div><label className="label">Portfolio (optional)</label><input name="portfolio" className="field" /></div>
      <div><label className="label">Cover letter (optional)</label><textarea name="coverLetter" rows={4} className="field" /></div>
      <div>
        <label className="label">Upload CV * ({careers.upload.accept.replace(/\./g, "").replace(/,/g, ", ")} · max {careers.upload.maxSizeMB} MB)</label>
        <input type="file" name="cv" required accept={careers.upload.accept} className="field" style={{ padding: 10 }} />
      </div>

      <label style={{ display: "flex", gap: 10, alignItems: "flex-start", fontSize: 14 }} className="muted">
        <input type="checkbox" required style={{ marginTop: 3 }} />
        <span>I consent to ProficientNow storing my details and CV to consider me for this and future relevant roles. *</span>
      </label>

      <button type="submit" disabled={status === "submitting"} className="btn-primary" style={{ alignSelf: "flex-start", border: 0, cursor: "pointer", opacity: status === "submitting" ? 0.7 : 1 }}>
        {status === "submitting" ? "Submitting…" : "Submit application"} <span aria-hidden>→</span>
      </button>

      {status === "error" && <p style={{ color: "#ff6b6b", fontSize: 14 }}>{errorMsg}</p>}
    </form>
  );
}

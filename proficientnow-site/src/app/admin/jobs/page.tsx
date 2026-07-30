"use client";

import { useEffect, useState } from "react";
import AdminShell from "@/components/AdminShell";
import RichEditor from "@/components/RichEditor";
import { supabase, type Job } from "@/lib/supabase";

const EMPLOYMENT = ["Full-time", "Part-time", "Contract", "Temporary", "Permanent"];
const STATUSES = ["draft", "published", "closed"];

function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}

type Form = {
  id?: string;
  title: string; sector: string; location: string; country: string;
  employment_type: string; salary_range: string; experience_required: string; department: string;
  closing_date: string; working_hours: string; featured: boolean; status: string; slug: string;
  description: string; responsibilities: string; requirements: string; benefits: string;
};

const blank: Form = {
  title: "", sector: "", location: "", country: "United Kingdom",
  employment_type: "Full-time", salary_range: "", experience_required: "", department: "",
  closing_date: "", working_hours: "", featured: false, status: "draft", slug: "",
  description: "", responsibilities: "", requirements: "", benefits: "",
};

export default function JobsManager() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [mode, setMode] = useState<"list" | "form">("list");
  const [form, setForm] = useState<Form>(blank);
  const [slugTouched, setSlugTouched] = useState(false);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");

  async function load() {
    if (!supabase) return;
    setLoading(true);
    const { data } = await supabase.from("jobs").select("*").order("created_at", { ascending: false });
    setJobs((data as Job[]) || []);
    setLoading(false);
  }
  useEffect(() => { load(); }, []);

  function newJob() { setForm(blank); setSlugTouched(false); setMode("form"); setMsg(""); }
  function editJob(j: Job) {
    setForm({
      id: j.id, title: j.title || "", sector: j.sector || "", location: j.location || "", country: j.country || "",
      employment_type: j.employment_type || "Full-time", salary_range: j.salary_range || "", experience_required: j.experience_required || "",
      department: j.department || "", closing_date: j.closing_date || "", working_hours: j.working_hours || "",
      featured: !!j.featured, status: j.status || "draft", slug: j.slug || "",
      description: j.description || "", responsibilities: j.responsibilities || "", requirements: j.requirements || "", benefits: j.benefits || "",
    });
    setSlugTouched(true); setMode("form"); setMsg("");
  }

  function set<K extends keyof Form>(k: K, v: Form[K]) {
    setForm((f) => {
      const next = { ...f, [k]: v };
      if (k === "title" && !slugTouched) next.slug = slugify(String(v));
      return next;
    });
  }

  async function save(e: React.FormEvent) {
    e.preventDefault();
    if (!supabase) return;
    if (!form.title.trim()) { setMsg("Please enter a job title."); return; }
    if (!form.slug.trim()) { setMsg("Please enter a slug (web address)."); return; }
    setSaving(true); setMsg("");
    const payload: any = { ...form, closing_date: form.closing_date || null };
    delete payload.id;
    const res = form.id
      ? await supabase.from("jobs").update(payload).eq("id", form.id)
      : await supabase.from("jobs").insert(payload);
    setSaving(false);
    if (res.error) { setMsg(res.error.message.includes("duplicate") ? "That slug is already used — choose a different one." : res.error.message); return; }
    await load();
    setMode("list");
  }

  async function quickStatus(j: Job, status: string) {
    if (!supabase) return;
    await supabase.from("jobs").update({ status }).eq("id", j.id);
    load();
  }
  async function del(j: Job) {
    if (!supabase) return;
    if (!confirm(`Delete "${j.title}"? This cannot be undone.`)) return;
    await supabase.from("jobs").delete().eq("id", j.id);
    load();
  }

  const field = { display: "flex", flexDirection: "column" as const, gap: 6 };

  return (
    <AdminShell>
      {mode === "list" ? (
        <>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
            <div><p className="eyebrow">Jobs</p><h1 style={{ fontSize: 32, marginTop: 8 }}>Jobs manager</h1></div>
            <button onClick={newJob} className="btn-primary" style={{ border: 0, cursor: "pointer" }}>+ New job</button>
          </div>

          {loading ? <p className="muted" style={{ marginTop: 30 }}>Loading…</p> : jobs.length === 0 ? (
            <p className="muted" style={{ marginTop: 30 }}>No jobs yet. Click “New job” to create your first listing.</p>
          ) : (
            <div style={{ marginTop: 30, display: "flex", flexDirection: "column", gap: 12 }}>
              {jobs.map((j) => (
                <div key={j.id} className="panel" style={{ padding: 20, display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
                      <h3 style={{ fontSize: 17 }}>{j.title}</h3>
                      <span style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".05em", padding: "3px 8px", borderRadius: 999,
                        background: j.status === "published" ? "rgba(46,200,120,.15)" : j.status === "closed" ? "rgba(255,107,107,.15)" : "rgba(255,255,255,.08)",
                        color: j.status === "published" ? "#3ecf8e" : j.status === "closed" ? "#ff6b6b" : "var(--muted)" }}>{j.status}</span>
                    </div>
                    <p className="muted" style={{ fontSize: 13, marginTop: 4 }}>{[j.sector, j.location, j.employment_type].filter(Boolean).join(" · ")}</p>
                  </div>
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                    <button onClick={() => editJob(j)} style={ghost}>Edit</button>
                    {j.status !== "published"
                      ? <button onClick={() => quickStatus(j, "published")} style={ghost}>Publish</button>
                      : <button onClick={() => quickStatus(j, "draft")} style={ghost}>Unpublish</button>}
                    {j.status !== "closed" && <button onClick={() => quickStatus(j, "closed")} style={ghost}>Close</button>}
                    <button onClick={() => del(j)} style={{ ...ghost, color: "#ff6b6b" }}>Delete</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      ) : (
        <form onSubmit={save}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
            <h1 style={{ fontSize: 28 }}>{form.id ? "Edit job" : "New job"}</h1>
            <button type="button" onClick={() => setMode("list")} style={ghost}>← Back to list</button>
          </div>

          <div style={{ marginTop: 28, display: "flex", flexDirection: "column", gap: 18 }}>
            <div style={field}><label className="label">Job title *</label><input className="field" value={form.title} onChange={(e) => set("title", e.target.value)} /></div>

            <div className="grid-2" style={{ gap: 18 }}>
              <div style={field}><label className="label">Sector</label><input className="field" value={form.sector} onChange={(e) => set("sector", e.target.value)} placeholder="e.g. Engineering" /></div>
              <div style={field}><label className="label">Department</label><input className="field" value={form.department} onChange={(e) => set("department", e.target.value)} /></div>
            </div>
            <div className="grid-2" style={{ gap: 18 }}>
              <div style={field}><label className="label">Location</label><input className="field" value={form.location} onChange={(e) => set("location", e.target.value)} placeholder="e.g. London" /></div>
              <div style={field}><label className="label">Country</label><input className="field" value={form.country} onChange={(e) => set("country", e.target.value)} /></div>
            </div>
            <div className="grid-2" style={{ gap: 18 }}>
              <div style={field}><label className="label">Employment type</label>
                <select className="field" value={form.employment_type} onChange={(e) => set("employment_type", e.target.value)}>
                  {EMPLOYMENT.map((t) => <option key={t}>{t}</option>)}
                </select>
              </div>
              <div style={field}><label className="label">Salary range</label><input className="field" value={form.salary_range} onChange={(e) => set("salary_range", e.target.value)} placeholder="e.g. £45,000 – £55,000" /></div>
            </div>
            <div className="grid-2" style={{ gap: 18 }}>
              <div style={field}><label className="label">Experience required</label><input className="field" value={form.experience_required} onChange={(e) => set("experience_required", e.target.value)} placeholder="e.g. 3+ years" /></div>
              <div style={field}><label className="label">Working hours</label><input className="field" value={form.working_hours} onChange={(e) => set("working_hours", e.target.value)} placeholder="e.g. Mon–Fri, 9–5" /></div>
            </div>
            <div className="grid-2" style={{ gap: 18 }}>
              <div style={field}><label className="label">Closing date</label><input type="date" className="field" value={form.closing_date} onChange={(e) => set("closing_date", e.target.value)} /></div>
              <div style={field}><label className="label">Web address (slug) *</label><input className="field" value={form.slug} onChange={(e) => { setSlugTouched(true); set("slug", slugify(e.target.value)); }} /></div>
            </div>

            <div style={field}><label className="label">About the role</label><RichEditor value={form.description} onChange={(v) => set("description", v)} /></div>
            <div style={field}><label className="label">Responsibilities</label><RichEditor value={form.responsibilities} onChange={(v) => set("responsibilities", v)} /></div>
            <div style={field}><label className="label">Requirements</label><RichEditor value={form.requirements} onChange={(v) => set("requirements", v)} /></div>
            <div style={field}><label className="label">Benefits</label><RichEditor value={form.benefits} onChange={(v) => set("benefits", v)} /></div>

            <div className="grid-2" style={{ gap: 18, alignItems: "end" }}>
              <div style={field}><label className="label">Status</label>
                <select className="field" value={form.status} onChange={(e) => set("status", e.target.value)}>
                  {STATUSES.map((s) => <option key={s} value={s}>{s === "published" ? "Published (live)" : s === "draft" ? "Draft (hidden)" : "Closed"}</option>)}
                </select>
              </div>
              <label style={{ display: "flex", gap: 10, alignItems: "center", paddingBottom: 12 }} className="muted">
                <input type="checkbox" checked={form.featured} onChange={(e) => set("featured", e.target.checked)} /> Feature this role (show first)
              </label>
            </div>

            <div style={{ display: "flex", gap: 12, alignItems: "center", marginTop: 8 }}>
              <button type="submit" disabled={saving} className="btn-primary" style={{ border: 0, cursor: "pointer", opacity: saving ? 0.7 : 1 }}>
                {saving ? "Saving…" : form.id ? "Save changes" : "Create job"}
              </button>
              <button type="button" onClick={() => setMode("list")} style={ghost}>Cancel</button>
              {msg && <span style={{ color: "#ff6b6b", fontSize: 14 }}>{msg}</span>}
            </div>
          </div>
        </form>
      )}
    </AdminShell>
  );
}

const ghost: React.CSSProperties = { background: "var(--card)", border: "1px solid var(--cardbd)", color: "var(--heading)", borderRadius: 999, padding: "8px 16px", cursor: "pointer", fontSize: 13, fontWeight: 500 };

"use client";

import { useEffect, useMemo, useState } from "react";
import AdminShell from "@/components/AdminShell";
import { supabase } from "@/lib/supabase";

const STATUSES = ["Applied", "Shortlisted", "Interview", "Offer", "Hired", "Rejected"];

type App = {
  id: string; job_id: string | null;
  first_name: string; last_name: string; email: string; phone: string | null;
  current_location: string | null; notice_period: string | null;
  current_salary: string | null; expected_salary: string | null; years_experience: string | null;
  linkedin_url: string | null; portfolio_url: string | null; cover_letter: string | null;
  cv_path: string | null; status: string | null; created_at: string;
  job?: { title: string } | null;
};

function statusColor(s: string | null) {
  switch (s) {
    case "Hired": return "#3ecf8e";
    case "Rejected": return "#ff6b6b";
    case "Interview": case "Offer": return "#5B8CFF";
    case "Shortlisted": return "#e0b64a";
    default: return "var(--muted)";
  }
}

export default function ApplicationsInbox() {
  const [apps, setApps] = useState<App[]>([]);
  const [loading, setLoading] = useState(true);
  const [jobFilter, setJobFilter] = useState("");
  const [open, setOpen] = useState<string | null>(null);

  async function load() {
    if (!supabase) return;
    setLoading(true);
    const { data } = await supabase
      .from("applications")
      .select("*, job:jobs(title)")
      .order("created_at", { ascending: false });
    setApps((data as App[]) || []);
    setLoading(false);
  }
  useEffect(() => { load(); }, []);

  const jobs = useMemo(() => {
    const map = new Map<string, string>();
    apps.forEach((a) => { if (a.job_id && a.job?.title) map.set(a.job_id, a.job.title); });
    return Array.from(map, ([id, title]) => ({ id, title }));
  }, [apps]);

  const filtered = jobFilter ? apps.filter((a) => a.job_id === jobFilter) : apps;

  async function setStatus(a: App, status: string) {
    if (!supabase) return;
    setApps((list) => list.map((x) => (x.id === a.id ? { ...x, status } : x)));
    await supabase.from("applications").update({ status }).eq("id", a.id);
  }

  async function downloadCV(path: string | null) {
    if (!supabase || !path) { alert("No CV attached to this application."); return; }
    const filename = path.replace(/^\d+-/, "");
    const { data, error } = await supabase.storage.from("cvs").createSignedUrl(path, 60, { download: filename });
    if (error || !data) { alert("Could not fetch the CV. Please try again."); return; }
    const a = document.createElement("a");
    a.href = data.signedUrl;
    document.body.appendChild(a);
    a.click();
    a.remove();
  }

  return (
    <AdminShell>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 16 }}>
        <div><p className="eyebrow">Applications</p><h1 style={{ fontSize: 32, marginTop: 8 }}>Applications inbox</h1></div>
        <select className="field" style={{ width: "auto", minWidth: 200 }} value={jobFilter} onChange={(e) => setJobFilter(e.target.value)}>
          <option value="">All roles</option>
          {jobs.map((j) => <option key={j.id} value={j.id}>{j.title}</option>)}
        </select>
      </div>

      {loading ? <p className="muted" style={{ marginTop: 30 }}>Loading…</p> : filtered.length === 0 ? (
        <p className="muted" style={{ marginTop: 30 }}>No applications yet. They&apos;ll appear here as candidates apply.</p>
      ) : (
        <>
          <p className="muted" style={{ marginTop: 24, marginBottom: 14, fontSize: 14 }}>{filtered.length} application{filtered.length === 1 ? "" : "s"}</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {filtered.map((a) => {
              const expanded = open === a.id;
              return (
                <div key={a.id} className="panel" style={{ padding: 20 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
                    <div style={{ cursor: "pointer" }} onClick={() => setOpen(expanded ? null : a.id)}>
                      <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
                        <h3 style={{ fontSize: 17 }}>{a.first_name} {a.last_name}</h3>
                        <span style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".05em", color: statusColor(a.status) }}>● {a.status}</span>
                      </div>
                      <p className="muted" style={{ fontSize: 13, marginTop: 4 }}>
                        {a.job?.title || "General application"} · {new Date(a.created_at).toLocaleDateString("en-GB")} · {a.email}
                      </p>
                    </div>
                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
                      <select className="field" style={{ width: "auto", padding: "8px 12px" }} value={a.status || "Applied"} onChange={(e) => setStatus(a, e.target.value)}>
                        {STATUSES.map((s) => <option key={s}>{s}</option>)}
                      </select>
                      <button onClick={() => downloadCV(a.cv_path)} style={btn}>↓ CV</button>
                      <button onClick={() => setOpen(expanded ? null : a.id)} style={ghost}>{expanded ? "Hide" : "Details"}</button>
                    </div>
                  </div>

                  {expanded && (
                    <div style={{ marginTop: 18, paddingTop: 18, borderTop: "1px solid var(--cardbd)", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }} className="careers-detail">
                      <Detail label="Email" value={a.email} />
                      <Detail label="Phone" value={a.phone} />
                      <Detail label="Location" value={a.current_location} />
                      <Detail label="Notice period" value={a.notice_period} />
                      <Detail label="Current salary" value={a.current_salary} />
                      <Detail label="Expected salary" value={a.expected_salary} />
                      <Detail label="Experience" value={a.years_experience} />
                      <Detail label="LinkedIn" value={a.linkedin_url} link />
                      <Detail label="Portfolio" value={a.portfolio_url} link />
                      {a.cover_letter && (
                        <div style={{ gridColumn: "1 / -1" }}>
                          <div className="muted" style={{ fontSize: 12, textTransform: "uppercase", letterSpacing: ".08em" }}>Cover letter</div>
                          <p style={{ marginTop: 6, whiteSpace: "pre-line" }}>{a.cover_letter}</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </>
      )}
    </AdminShell>
  );
}

function Detail({ label, value, link }: { label: string; value: string | null; link?: boolean }) {
  if (!value) return null;
  return (
    <div>
      <div className="muted" style={{ fontSize: 12, textTransform: "uppercase", letterSpacing: ".08em" }}>{label}</div>
      {link ? <a href={value} target="_blank" rel="noreferrer" className="accent" style={{ fontSize: 15, wordBreak: "break-all" }}>{value}</a>
            : <div style={{ fontSize: 15, marginTop: 2, color: "var(--heading)" }}>{value}</div>}
    </div>
  );
}

const btn: React.CSSProperties = { background: "var(--accent)", border: 0, color: "#fff", borderRadius: 999, padding: "9px 16px", cursor: "pointer", fontSize: 13, fontWeight: 600 };
const ghost: React.CSSProperties = { background: "var(--card)", border: "1px solid var(--cardbd)", color: "var(--heading)", borderRadius: 999, padding: "9px 16px", cursor: "pointer", fontSize: 13, fontWeight: 500 };

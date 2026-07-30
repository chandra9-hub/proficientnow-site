"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { supabase, type Job } from "@/lib/supabase";
import { careers } from "@content/careers";

export default function CareersBrowser() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [q, setQ] = useState("");
  const [sector, setSector] = useState("");
  const [location, setLocation] = useState("");
  const [type, setType] = useState("");

  useEffect(() => {
    let active = true;
    (async () => {
      if (!supabase) { setError(true); setLoading(false); return; }
      const { data, error } = await supabase
        .from("jobs")
        .select("*")
        .eq("status", "published")
        .order("featured", { ascending: false })
        .order("created_at", { ascending: false });
      if (!active) return;
      if (error) { setError(true); } else { setJobs((data as Job[]) || []); }
      setLoading(false);
    })();
    return () => { active = false; };
  }, []);

  const sectors = useMemo(() => Array.from(new Set(jobs.map((j) => j.sector).filter(Boolean))) as string[], [jobs]);
  const locations = useMemo(() => Array.from(new Set(jobs.map((j) => j.location).filter(Boolean))) as string[], [jobs]);
  const types = useMemo(() => Array.from(new Set(jobs.map((j) => j.employment_type).filter(Boolean))) as string[], [jobs]);

  const filtered = jobs.filter((j) => {
    const text = `${j.title} ${j.description || ""} ${j.department || ""}`.toLowerCase();
    return (
      (!q || text.includes(q.toLowerCase())) &&
      (!sector || j.sector === sector) &&
      (!location || j.location === location) &&
      (!type || j.employment_type === type)
    );
  });

  if (loading) return <p className="muted" style={{ textAlign: "center", padding: "60px 0" }}>Loading roles…</p>;

  // No jobs at all → friendly empty state
  if (!error && jobs.length === 0) {
    return (
      <div className="panel" style={{ textAlign: "center", maxWidth: 640, margin: "0 auto" }}>
        <h2 style={{ fontSize: 26 }}>{careers.emptyState.heading}</h2>
        <p className="muted" style={{ marginTop: 14, fontSize: 17 }}>{careers.emptyState.body}</p>
        <Link href="/contact" className="btn-primary" style={{ marginTop: 24 }}>{careers.emptyState.ctaLabel} <span aria-hidden>→</span></Link>
      </div>
    );
  }

  if (error) {
    return (
      <div className="panel" style={{ textAlign: "center", maxWidth: 640, margin: "0 auto" }}>
        <h2 style={{ fontSize: 22 }}>Careers board is being set up.</h2>
        <p className="muted" style={{ marginTop: 12 }}>Please check back shortly, or <Link href="/contact" className="accent">send us your CV</Link> in the meantime.</p>
      </div>
    );
  }

  return (
    <div>
      {/* Search + filters */}
      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 12, marginBottom: 36 }} className="careers-filters">
        <input className="field" placeholder="Search roles…" value={q} onChange={(e) => setQ(e.target.value)} />
        <select className="field" value={sector} onChange={(e) => setSector(e.target.value)}>
          <option value="">All sectors</option>
          {sectors.map((s) => <option key={s}>{s}</option>)}
        </select>
        <select className="field" value={location} onChange={(e) => setLocation(e.target.value)}>
          <option value="">All locations</option>
          {locations.map((l) => <option key={l}>{l}</option>)}
        </select>
        <select className="field" value={type} onChange={(e) => setType(e.target.value)}>
          <option value="">All types</option>
          {types.map((t) => <option key={t}>{t}</option>)}
        </select>
      </div>

      <p className="muted" style={{ marginBottom: 20, fontSize: 14 }}>{filtered.length} role{filtered.length === 1 ? "" : "s"}</p>

      {filtered.length === 0 ? (
        <p className="muted" style={{ textAlign: "center", padding: "40px 0" }}>No roles match those filters. Try widening your search.</p>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {filtered.map((j) => (
            <Link key={j.id} href={`/careers/${j.slug}`} className="card tilt" style={{ display: "block", padding: 28 }}>
              <div style={{ display: "flex", justifyContent: "space-between", gap: 20, flexWrap: "wrap" }}>
                <div>
                  {j.featured && <span className="eyebrow" style={{ display: "block", marginBottom: 6 }}>★ Featured</span>}
                  <h3 style={{ fontSize: 20 }}>{j.title}</h3>
                  <div className="muted" style={{ display: "flex", gap: 16, flexWrap: "wrap", marginTop: 10, fontSize: 14 }}>
                    {j.sector && <span>◈ {j.sector}</span>}
                    {j.location && <span>◉ {j.location}{j.country ? `, ${j.country}` : ""}</span>}
                    {j.employment_type && <span>◷ {j.employment_type}</span>}
                    {j.salary_range && <span>£ {j.salary_range}</span>}
                  </div>
                </div>
                <span className="accent" style={{ fontWeight: 600, whiteSpace: "nowrap", alignSelf: "center" }}>View &amp; apply →</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

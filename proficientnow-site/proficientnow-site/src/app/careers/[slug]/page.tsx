"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { supabase, type Job } from "@/lib/supabase";
import ApplyForm from "@/components/ApplyForm";

function Block({ title, text }: { title: string; text: string | null }) {
  if (!text) return null;
  return (
    <div style={{ marginTop: 28 }}>
      <h3 style={{ fontSize: 18 }}>{title}</h3>
      <p className="muted" style={{ marginTop: 8, whiteSpace: "pre-line", lineHeight: 1.7 }}>{text}</p>
    </div>
  );
}

export default function JobDetailPage() {
  const params = useParams();
  const slug = String(params.slug || "");
  const [job, setJob] = useState<Job | null>(null);
  const [state, setState] = useState<"loading" | "found" | "missing">("loading");

  useEffect(() => {
    let active = true;
    (async () => {
      if (!supabase) { setState("missing"); return; }
      const { data } = await supabase.from("jobs").select("*").eq("slug", slug).eq("status", "published").maybeSingle();
      if (!active) return;
      if (data) { setJob(data as Job); setState("found"); } else { setState("missing"); }
    })();
    return () => { active = false; };
  }, [slug]);

  if (state === "loading") return <div style={{ padding: "180px 0", textAlign: "center" }} className="muted">Loading…</div>;

  if (state === "missing" || !job)
    return (
      <div style={{ padding: "180px 0", textAlign: "center" }} className="container-x">
        <h1 style={{ fontSize: 34 }}>Role not found</h1>
        <p className="muted" style={{ marginTop: 12 }}>This role may have closed. <Link href="/careers" className="accent">See all open roles →</Link></p>
      </div>
    );

  return (
    <>
      <section className="page-header" style={{ paddingBottom: 40 }}>
        <div className="container-x">
          <Link href="/careers" className="accent" style={{ fontSize: 14, fontWeight: 600 }}>← All roles</Link>
          <h1 style={{ marginTop: 16 }}>{job.title}</h1>
          <div className="muted" style={{ display: "flex", gap: 18, flexWrap: "wrap", marginTop: 18, fontSize: 15 }}>
            {job.sector && <span>◈ {job.sector}</span>}
            {job.location && <span>◉ {job.location}{job.country ? `, ${job.country}` : ""}</span>}
            {job.employment_type && <span>◷ {job.employment_type}</span>}
            {job.salary_range && <span>£ {job.salary_range}</span>}
            {job.experience_required && <span>⚑ {job.experience_required}</span>}
            {job.closing_date && <span>Closes {new Date(job.closing_date).toLocaleDateString("en-GB")}</span>}
          </div>
        </div>
      </section>

      <section className="pad" style={{ paddingTop: 20 }}>
        <div className="container-x careers-detail" style={{ display: "grid", gridTemplateColumns: "1.3fr 1fr", gap: 48, alignItems: "start" }}>
          <div className="panel">
            <Block title="About the role" text={job.description} />
            <Block title="Responsibilities" text={job.responsibilities} />
            <Block title="Requirements" text={job.requirements} />
            <Block title="Benefits" text={job.benefits} />
            {job.working_hours && <Block title="Working hours" text={job.working_hours} />}
          </div>
          <div className="panel" style={{ position: "sticky", top: 100 }}>
            <h2 style={{ fontSize: 22, marginBottom: 18 }}>Apply for this role</h2>
            <ApplyForm jobId={job.id} jobTitle={job.title} />
          </div>
        </div>
      </section>
    </>
  );
}

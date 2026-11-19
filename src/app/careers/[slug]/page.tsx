import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import ApplyForm from "@/components/ApplyForm";
import JsonLd from "@/components/JsonLd";
import { getJob, getJobs } from "@/lib/data";
import { clip, jobPostingLd, pageMeta } from "@/lib/seo";

export const revalidate = 300;

export async function generateStaticParams() {
  return ((await getJobs()) ?? []).map((j) => ({ slug: j.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const job = await getJob(params.slug);
  if (!job) return {};
  const where = job.location ? ` in ${job.location}` : "";
  return pageMeta(`/careers/${job.slug}`, `${job.title}${where}`, clip(job.description) || `Apply for ${job.title}${where} with ProficientNow, a specialist UK recruitment agency.`);
}

// `html` is already sanitized by lib/markdown.
function Block({ title, html }: { title: string; html: string | null }) {
  if (!html) return null;
  return (
    <div style={{ marginTop: 26 }}>
      <h3 style={{ fontSize: 18 }}>{title}</h3>
      <div className="muted rich" style={{ marginTop: 8, lineHeight: 1.75 }} dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
}

export default async function JobDetailPage({ params }: { params: { slug: string } }) {
  const job = await getJob(params.slug);
  if (!job) notFound();

  const hasDetails = !!(job.description || job.responsibilities || job.requirements || job.benefits || job.working_hours);

  return (
    <>
      <JsonLd data={jobPostingLd(job)} />
      <section className="page-header" style={{ paddingBottom: 30 }}>
        <div className="container-x" style={{ maxWidth: 820, marginLeft: "auto", marginRight: "auto" }}>
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

      <section className="pad" style={{ paddingTop: 10 }}>
        <div className="container-x" style={{ maxWidth: 820, marginLeft: "auto", marginRight: "auto" }}>
          {hasDetails && (
            <div className="panel" style={{ marginBottom: 28 }}>
              <Block title="About the role" html={job.description} />
              <Block title="Responsibilities" html={job.responsibilities} />
              <Block title="Requirements" html={job.requirements} />
              <Block title="Benefits" html={job.benefits} />
              {job.working_hours && (
                <div style={{ marginTop: 26 }}>
                  <h3 style={{ fontSize: 18 }}>Working hours</h3>
                  <p className="muted" style={{ marginTop: 8, lineHeight: 1.75 }}>{job.working_hours}</p>
                </div>
              )}
            </div>
          )}

          <div className="panel">
            <h2 style={{ fontSize: 24 }}>Apply for this role</h2>
            <ApplyForm jobId={job.id} jobTitle={job.title} />
          </div>
        </div>
      </section>
    </>
  );
}

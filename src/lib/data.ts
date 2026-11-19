import { cache } from "react";
import { fetchRecords, quote, type AirtableRecord, type Attachment } from "./airtable";
import { renderMarkdown } from "./markdown";

// Long-text fields (description, body, …) hold sanitized HTML rendered from Airtable markdown.
export type Job = {
  id: string;
  title: string;
  slug: string;
  sector: string | null;
  location: string | null;
  country: string | null;
  employment_type: string | null;
  salary_range: string | null;
  experience_required: string | null;
  department: string | null;
  description: string | null;
  responsibilities: string | null;
  requirements: string | null;
  benefits: string | null;
  working_hours: string | null;
  closing_date: string | null;
  posted_date: string | null;
  featured: boolean;
};

export type Post = {
  id: string;
  type: "news" | "blog";
  title: string;
  slug: string;
  excerpt: string | null;
  meta_description: string | null;
  body: string | null;
  cover_image: string | null;
  cover_alt: string | null;
  category: string | null;
  author: string | null;
  source_name: string | null;
  source_url: string | null;
  featured: boolean;
  published_at: string | null;
};

// The one place Airtable field names meet the site's types.
const text = (r: AirtableRecord, field: string) => {
  const v = r.fields[field];
  return typeof v === "string" && v.trim() ? v.trim() : null;
};
const md = (r: AirtableRecord, field: string) => renderMarkdown(r.fields[field]);
const SLUG = /^[\w-]+$/;

function toJob(r: AirtableRecord): Job | null {
  const title = text(r, "Title"), slug = text(r, "Slug");
  if (!title || !slug || !SLUG.test(slug)) return null;
  return {
    id: r.id,
    title,
    slug,
    sector: text(r, "Sector"),
    location: text(r, "Location"),
    country: text(r, "Country"),
    employment_type: text(r, "Employment Type"),
    salary_range: text(r, "Salary Range"),
    experience_required: text(r, "Experience Required"),
    department: text(r, "Department"),
    description: md(r, "Description"),
    responsibilities: md(r, "Responsibilities"),
    requirements: md(r, "Requirements"),
    benefits: md(r, "Benefits"),
    working_hours: text(r, "Working Hours"),
    closing_date: text(r, "Closing Date"),
    posted_date: text(r, "Posted Date") ?? r.createdTime ?? null,
    featured: r.fields["Featured"] === true,
  };
}

// Cover images go through the stable /api/attachment proxy; Airtable's signed URLs expire within hours.
function coverUrl(r: AirtableRecord): string | null {
  const list = r.fields["Cover Image"];
  const att = Array.isArray(list) ? (list as Attachment[]).find((a) => a?.id && (!a.type || a.type.startsWith("image/"))) : undefined;
  return att && /^att\w{14}$/.test(att.id) ? `/api/attachment/Posts/${r.id}/${att.id}` : null;
}

function toPost(r: AirtableRecord): Post | null {
  const title = text(r, "Title"), slug = text(r, "Slug");
  const type = text(r, "Type")?.toLowerCase();
  if (!title || !slug || !SLUG.test(slug) || (type !== "news" && type !== "blog")) return null;
  return {
    id: r.id,
    type,
    title,
    slug,
    excerpt: text(r, "Excerpt"),
    meta_description: text(r, "Meta Description"),
    body: md(r, "Body"),
    cover_image: coverUrl(r),
    cover_alt: text(r, "Cover Alt"),
    category: text(r, "Category"),
    author: text(r, "Author"),
    source_name: text(r, "Source Name"),
    source_url: text(r, "Source URL"),
    featured: r.fields["Featured"] === true,
    published_at: text(r, "Published Date") ?? r.createdTime ?? null,
  };
}

const typeLabel = (type: "news" | "blog") => (type === "news" ? "News" : "Blog");
const mapAll = <T,>(rows: AirtableRecord[] | null, fn: (r: AirtableRecord) => T | null) =>
  rows ? rows.map(fn).filter((x): x is T => x !== null) : null;

// Public reads only ever see Published records. null = Airtable unreachable/unconfigured.
export const getPosts = cache(async (type: "news" | "blog") =>
  mapAll(await fetchRecords("Posts", {
    filterByFormula: `AND({Published}, {Type} = ${quote(typeLabel(type))})`,
    sort: [{ field: "Published Date", direction: "desc" }],
  }), toPost));

export const getPost = cache(async (type: "news" | "blog", slug: string) => {
  if (!SLUG.test(slug)) return null;
  const rows = await fetchRecords("Posts", {
    filterByFormula: `AND({Published}, {Type} = ${quote(typeLabel(type))}, {Slug} = ${quote(slug)})`,
    maxRecords: 1,
  });
  return mapAll(rows, toPost)?.[0] ?? null;
});

export const getJobs = cache(async () =>
  mapAll(await fetchRecords("Jobs", {
    filterByFormula: "{Published}",
    sort: [{ field: "Featured", direction: "desc" }, { field: "Posted Date", direction: "desc" }],
  }), toJob));

export const getJob = cache(async (slug: string) => {
  if (!SLUG.test(slug)) return null;
  const rows = await fetchRecords("Jobs", { filterByFormula: `AND({Published}, {Slug} = ${quote(slug)})`, maxRecords: 1 });
  return mapAll(rows, toJob)?.[0] ?? null;
});

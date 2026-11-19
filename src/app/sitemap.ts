import type { MetadataRoute } from "next";
import { site } from "@content/site";
import { sectors } from "@content/sectors";
import { legalMeta } from "@content/legal";
import { salaryMeta } from "@content/salaries";
import { getJobs, getPosts } from "@/lib/data";

export const revalidate = 3600;

// BUILD_TIME is inlined by next.config.mjs, so static pages carry the deploy date, not the request date.
const built = new Date(process.env.BUILD_TIME || Date.now());
const dated = (s: string) => (isNaN(Date.parse(`${s} UTC`)) ? built : new Date(`${s} UTC`));
const iso = (s: string | null) => (s && !isNaN(Date.parse(s)) ? new Date(s) : built);

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entry = (path: string, lastModified: Date, priority = 0.7): MetadataRoute.Sitemap[number] =>
    ({ url: `${site.url}${path}`, lastModified, priority });

  const [news, blog, jobs] = await Promise.all([getPosts("news"), getPosts("blog"), getJobs()]);

  return [
    entry("/", built, 1),
    ...["/about", "/services", "/sectors", "/careers", "/contact", "/news", "/blog"].map((p) => entry(p, built, 0.8)),
    entry("/salary-calculator", dated(`1 ${salaryMeta.updated}`), 0.8),
    ...sectors.map((s) => entry(`/sectors/${s.slug}`, built, 0.8)),
    ...["/privacy", "/terms", "/cookies", "/gdpr"].map((p) => entry(p, dated(legalMeta.effectiveDate), 0.3)),
    ...[...(news ?? []), ...(blog ?? [])].map((p) => entry(`/${p.type}/${p.slug}`, iso(p.published_at), 0.6)),
    ...(jobs ?? []).map((j) => entry(`/careers/${j.slug}`, iso(j.posted_date), 0.6)),
  ];
}

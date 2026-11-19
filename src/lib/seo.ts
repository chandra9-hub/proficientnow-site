import type { Metadata } from "next";
import { site } from "@content/site";
import type { Job, Post } from "./data";

const MAX_DESC = 155;
// Page-level openGraph replaces the parent's, so the default card from app/opengraph-image is re-attached here.
const OG_IMAGE = { url: "/opengraph-image", width: 1200, height: 630, alt: "ProficientNow: specialist recruitment agency in the UK" };

// Self canonical (no query string) + en-GB/x-default hreflang, with matching OG/Twitter text.
export function pageMeta(path: string, title: string, description: string, absoluteTitle = false): Metadata {
  const fullTitle = absoluteTitle ? title : `${title} | ${site.name}`;
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path, languages: { "en-GB": path, "x-default": path } },
    openGraph: { title: fullTitle, description, url: path, siteName: site.name, locale: "en_GB", type: "website", images: [OG_IMAGE] },
    twitter: { card: "summary_large_image", title: fullTitle, description, images: [OG_IMAGE.url] },
  };
}

// Joins whole sentences while they fit, so descriptions never end mid-word.
export function fitDescription(...sentences: string[]): string {
  return sentences.reduce((acc, s) => (acc && (acc + " " + s).length > MAX_DESC ? acc : (acc ? acc + " " + s : s)), "");
}

const ENTITIES: Record<string, string> = { amp: "&", lt: "<", gt: ">", quot: '"', "#39": "'", nbsp: " " };

// Sanitized HTML to plain text (tags dropped, common entities decoded).
export function plainText(html: string | null | undefined): string {
  return (html || "").replace(/<[^>]+>/g, " ").replace(/&(amp|lt|gt|quot|#39|nbsp);/g, (_, e) => ENTITIES[e]).replace(/\s+/g, " ").trim();
}

// Plain-text excerpt cut at a word boundary.
export function clip(text: string | null | undefined, max = MAX_DESC): string {
  const t = plainText(text);
  if (t.length <= max) return t;
  const cut = t.slice(0, max - 1);
  return cut.slice(0, cut.lastIndexOf(" ")).replace(/[\s,;:.–—-]+$/, "") + "…";
}

const abs = (path: string) => `${site.url}${path === "/" ? "/" : path}`;
const ORG_ID = `${site.url}/#organization`;

export const organizationLd = {
  "@context": "https://schema.org",
  "@type": ["EmploymentAgency", "Organization"],
  "@id": ORG_ID,
  name: site.legalName,
  alternateName: site.name,
  url: abs("/"),
  logo: { "@type": "ImageObject", url: abs("/brand/logo-light.png") },
  image: abs("/brand/logo-light.png"),
  description: site.description,
  telephone: site.contact.phone,
  email: site.contact.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: site.contact.address.line1,
    addressLocality: site.contact.address.city,
    postalCode: site.contact.address.postcode,
    addressCountry: "GB",
  },
  areaServed: { "@type": "Country", name: "United Kingdom" },
  identifier: { "@type": "PropertyValue", propertyID: "Companies House number", value: site.companyNumber },
  foundingDate: "2025-08-15",
  sameAs: [`https://find-and-update.company-information.service.gov.uk/company/${site.companyNumber}`],
};

export const websiteLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${site.url}/#website`,
  url: abs("/"),
  name: site.name,
  inLanguage: "en-GB",
  publisher: { "@id": ORG_ID },
};

export function breadcrumbLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.name, item: abs(it.path) })),
  };
}

export function serviceLd(name: string, path: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${abs(path)}#service`,
    serviceType: name,
    name,
    url: abs(path),
    provider: { "@id": ORG_ID },
    areaServed: { "@type": "Country", name: "United Kingdom" },
  };
}

const EMPLOYMENT: [RegExp, string][] = [
  [/part/i, "PART_TIME"], [/full|permanent/i, "FULL_TIME"], [/contract|freelance|interim/i, "CONTRACTOR"],
  [/temp/i, "TEMPORARY"], [/intern/i, "INTERN"], [/volunt/i, "VOLUNTEER"], [/per.?diem/i, "PER_DIEM"],
];
const CURRENCY: Record<string, string> = { "£": "GBP", "$": "USD", "€": "EUR" };
const UNIT: [RegExp, string][] = [[/hour|\bph\b|\/hr\b/i, "HOUR"], [/day|daily/i, "DAY"], [/week/i, "WEEK"], [/month/i, "MONTH"], [/year|annum|\bpa\b|p\.a\./i, "YEAR"]];

// "£45,000 - £55k per annum" → MonetaryAmount; null unless a currency and at least one amount are clear.
export function parseSalary(range: string | null | undefined) {
  if (!range) return null;
  const currency = CURRENCY[range.match(/[£$€]/)?.[0] ?? ""] ?? (/\bGBP\b/i.test(range) ? "GBP" : null);
  const amounts = Array.from(range.matchAll(/(\d[\d,]*(?:\.\d+)?)\s*(k)?/gi), (m) => parseFloat(m[1].replace(/,/g, "")) * (m[2] ? 1000 : 1)).filter((n) => n > 0);
  if (!currency || !amounts.length || amounts.length > 2) return null;
  const unitText = UNIT.find(([re]) => re.test(range))?.[1] ?? (amounts[0] >= 1000 ? "YEAR" : null);
  if (!unitText) return null;
  const [min, max] = amounts;
  const value = max ? { "@type": "QuantitativeValue", minValue: Math.min(min, max), maxValue: Math.max(min, max), unitText } : { "@type": "QuantitativeValue", value: min, unitText };
  return { "@type": "MonetaryAmount", currency, value };
}

const COUNTRY_CODES: Record<string, string> = { "united kingdom": "GB", uk: "GB", "great britain": "GB", england: "GB", scotland: "GB", wales: "GB", "northern ireland": "GB" };

export function jobPostingLd(job: Job) {
  const employmentType = EMPLOYMENT.find(([re]) => re.test(job.employment_type || ""))?.[1];
  const country = job.country ? COUNTRY_CODES[job.country.trim().toLowerCase()] ?? job.country : "GB";
  const description = [job.description, job.responsibilities, job.requirements, job.benefits].filter(Boolean).join(" ");
  const baseSalary = parseSalary(job.salary_range);
  return {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: job.title,
    description: plainText(description) || job.title,
    identifier: { "@type": "PropertyValue", name: site.name, value: job.id },
    url: abs(`/careers/${job.slug}`),
    ...(job.posted_date && { datePosted: job.posted_date.slice(0, 10) }),
    ...(job.closing_date && { validThrough: job.closing_date }),
    ...(employmentType && { employmentType }),
    hiringOrganization: { "@type": "Organization", name: site.legalName, sameAs: abs("/"), logo: abs("/brand/logo-light.png") },
    jobLocation: {
      "@type": "Place",
      address: { "@type": "PostalAddress", ...(job.location && { addressLocality: job.location }), addressCountry: country },
    },
    ...(baseSalary && { baseSalary }),
  };
}

export function articleLd(post: Post) {
  const url = abs(`/${post.type}/${post.slug}`);
  return {
    "@context": "https://schema.org",
    "@type": post.type === "news" ? "NewsArticle" : "BlogPosting",
    headline: post.title,
    description: clip(post.meta_description || post.excerpt || post.body),
    url,
    mainEntityOfPage: url,
    ...(post.published_at && { datePublished: post.published_at }),
    ...(post.cover_image && { image: [abs(post.cover_image)] }),
    author: post.author ? { "@type": "Person", name: post.author } : { "@type": "Organization", name: site.name, url: abs("/") },
    publisher: { "@id": ORG_ID },
    inLanguage: "en-GB",
  };
}

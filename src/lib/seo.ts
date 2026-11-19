import type { Metadata } from "next";
import { site } from "@content/site";

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

// Plain-text excerpt cut at a word boundary.
export function clip(text: string | null | undefined, max = MAX_DESC): string {
  const t = (text || "").replace(/<[^>]+>/g, " ").replace(/&nbsp;/g, " ").replace(/\s+/g, " ").trim();
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

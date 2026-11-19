import "server-only";
import { marked } from "marked";
import sanitizeHtml from "sanitize-html";
import { site } from "@content/site";

const OWN_HOST = new URL(site.url).host;

const OPTIONS: sanitizeHtml.IOptions = {
  allowedTags: ["p", "br", "hr", "h2", "h3", "h4", "strong", "b", "em", "i", "u", "s", "del", "blockquote", "code", "pre",
    "ul", "ol", "li", "a", "img", "table", "thead", "tbody", "tr", "th", "td"],
  allowedAttributes: { a: ["href", "title", "target", "rel"], img: ["src", "alt", "title"], ol: ["start"] },
  allowedSchemes: ["http", "https", "mailto"],
  allowedSchemesByTag: { img: ["http", "https"] },
  allowProtocolRelative: false,
  // Off-site links open in a new tab without leaking the opener or referrer.
  transformTags: {
    a: (tagName, attribs) => {
      const href = attribs.href || "";
      let external = false;
      try { external = /^https?:$/.test(new URL(href).protocol) && new URL(href).host !== OWN_HOST; } catch {}
      const { target: _t, rel: _r, ...rest } = attribs;
      return { tagName, attribs: external ? { ...rest, target: "_blank", rel: "noopener noreferrer" } : rest };
    },
    // h1 is the page title, so content headings start at h2.
    h1: "h2",
  },
};

// Markdown (or legacy HTML) from Airtable to sanitized HTML; null for empty input.
export function renderMarkdown(md: unknown): string | null {
  if (typeof md !== "string" || !md.trim()) return null;
  return sanitizeHtml(marked.parse(md, { async: false }), OPTIONS) || null;
}

import type { MetadataRoute } from "next";
import { site } from "@content/site";

// Keeps the private areas out of search engines; they also send noindex (next.config.mjs, login layout).
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/admin", "/login"] },
    sitemap: `${site.url}/sitemap.xml`,
  };
}

import type { MetadataRoute } from "next";
import { site } from "@content/site";

// Auto-generates /robots.txt. Blocks the admin area from search engines.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: "/admin" },
    sitemap: `${site.url}/sitemap.xml`,
  };
}

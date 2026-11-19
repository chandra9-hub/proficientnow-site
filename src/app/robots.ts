import type { MetadataRoute } from "next";
import { site } from "@content/site";

// Auto-generates /robots.txt. Keeps the private areas out of search engines.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/admin", "/login"] },
    sitemap: `${site.url}/sitemap.xml`,
  };
}

import type { MetadataRoute } from "next";
import { site } from "@content/site";

// Auto-generates /sitemap.xml for search engines.
export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/about", "/services", "/sectors", "/careers", "/contact"];
  return routes.map((path) => ({
    url: `${site.url}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: path === "" ? 1 : 0.7,
  }));
}

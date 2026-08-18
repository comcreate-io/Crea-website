import type { MetadataRoute } from "next";
import { absoluteUrl, indexableRoutes } from "@/lib/routes";

export default function sitemap(): MetadataRoute.Sitemap {
  const buildTime = new Date();
  return indexableRoutes().map((r) => ({
    url: absoluteUrl(r.path),
    lastModified: r.lastModified ? new Date(r.lastModified) : buildTime,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));
}

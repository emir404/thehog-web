import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

// Static build date keeps this route statically optimized (no request-time API).
const lastModified = new Date("2026-06-13");

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${site.url}/`, lastModified, changeFrequency: "weekly", priority: 1 },
    { url: `${site.url}/about`, lastModified, changeFrequency: "monthly", priority: 0.7 },
    { url: `${site.url}/pricing`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${site.url}/privacy`, lastModified, changeFrequency: "yearly", priority: 0.3 },
    { url: `${site.url}/terms`, lastModified, changeFrequency: "yearly", priority: 0.3 },
  ];
}

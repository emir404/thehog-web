import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog";
import { site } from "@/lib/site";

// Static build date keeps this route statically optimized (no request-time API).
// getAllPosts() reads the content dir at build time, so the route stays static.
const lastModified = new Date("2026-06-13");

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts(); // drafts excluded in production builds

  return [
    { url: `${site.url}/`, lastModified, changeFrequency: "weekly", priority: 1 },
    { url: `${site.url}/about`, lastModified, changeFrequency: "monthly", priority: 0.7 },
    { url: `${site.url}/pricing`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${site.url}/enterprise`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${site.url}/privacy`, lastModified, changeFrequency: "yearly", priority: 0.3 },
    { url: `${site.url}/terms`, lastModified, changeFrequency: "yearly", priority: 0.3 },
    { url: `${site.url}/blog`, lastModified, changeFrequency: "weekly", priority: 0.7 },
    ...posts.map((post) => ({
      url: `${site.url}/blog/${post.slug}`,
      lastModified: post.date ? new Date(post.date) : lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}

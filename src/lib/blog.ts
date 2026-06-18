import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

// Server/build-only helpers (Node `fs`). Single source of truth for the blog
// listing, slugs, and per-post metadata. The rendered post *body* comes from the
// MDX loader via a dynamic import in the route — this module only reads frontmatter.

const BLOG_DIR = path.join(process.cwd(), "src", "content", "blog");
const WORDS_PER_MINUTE = 225;

export type PostMeta = {
  slug: string;
  title: string;
  description: string;
  date: string; // ISO "YYYY-MM-DD"
  author: string;
  tags?: string[];
  cover?: string; // local public path, e.g. "/blog/cover.webp"
  draft?: boolean;
  readingTime: number; // whole minutes
};

function isProd(): boolean {
  return process.env.NODE_ENV === "production";
}

function readingMinutes(markdown: string): number {
  const words = markdown.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / WORDS_PER_MINUTE));
}

function parseFile(slug: string): { meta: PostMeta; content: string } {
  const raw = fs.readFileSync(path.join(BLOG_DIR, `${slug}.mdx`), "utf8");
  const { data, content } = matter(raw);
  const meta: PostMeta = {
    slug,
    title: String(data.title ?? slug),
    description: String(data.description ?? ""),
    date: String(data.date ?? ""),
    author: String(data.author ?? "The Hog"),
    tags: Array.isArray(data.tags) ? data.tags.map(String) : undefined,
    cover: data.cover ? String(data.cover) : undefined,
    draft: Boolean(data.draft),
    readingTime: readingMinutes(content),
  };
  return { meta, content };
}

/** All published posts, newest first. Drafts are excluded in production only. */
export function getAllPosts(): PostMeta[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => parseFile(file.replace(/\.mdx$/, "")).meta)
    .filter((meta) => !isProd() || !meta.draft)
    .sort((a, b) => b.date.localeCompare(a.date));
}

/** Slugs for generateStaticParams. Derived from getAllPosts so drafts 404 in prod. */
export function getAllSlugs(): string[] {
  return getAllPosts().map((post) => post.slug);
}

export function getPostBySlug(slug: string): PostMeta | null {
  try {
    const { meta } = parseFile(slug);
    if (isProd() && meta.draft) return null;
    return meta;
  } catch {
    return null;
  }
}

/** "Jun 12, 2026" — UTC so an ISO date never shifts a day across timezones. */
export function formatDate(iso: string): string {
  if (!iso) return "";
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  }).format(date);
}

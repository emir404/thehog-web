import type { ComponentType } from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeftIcon,
  CalendarBlankIcon,
  ClockIcon,
} from "@phosphor-icons/react/dist/ssr";
import { AnnouncementBanner } from "@/components/layout/announcement-banner";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { FadeIn } from "@/components/motion/fade-in";
import { PostCover } from "@/components/sections/blog/post-cover";
import { formatDate, getAllSlugs, getPostBySlug } from "@/lib/blog";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return getAllSlugs().map((slug) => ({ slug }));
}

// Any slug not produced by generateStaticParams 404s (drafts in prod included).
export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      url: `/blog/${slug}`,
      publishedTime: post.date,
      authors: [post.author],
      images: post.cover ? [{ url: post.cover }] : undefined,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  // Documented @next/mdx pattern: literal "@/content/blog/" prefix + ".mdx"
  // suffix so the bundler can scope the dynamic glob. Body styling comes from
  // src/mdx-components.tsx; frontmatter is stripped by remark-frontmatter.
  const { default: Post } = (await import(
    `@/content/blog/${slug}.mdx`
  )) as { default: ComponentType };

  return (
    <div className="flex min-h-full flex-col">
      <AnnouncementBanner />
      <SiteHeader />
      <main className="flex-1">
        <article className="mx-auto w-full max-w-[768px] px-6 py-24 sm:py-32">
          <FadeIn>
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 text-[14px] font-medium text-brand transition-colors hover:text-brand-dark"
            >
              <ArrowLeftIcon className="size-4" />
              Back to blog
            </Link>
          </FadeIn>

          <FadeIn className="mt-8 flex flex-col gap-5" y={20}>
            {post.tags?.length ? (
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center justify-center rounded-full border border-[#171c1f]/[0.08] bg-white px-3.5 py-3 text-[12px] leading-none text-ink-deep/80 shadow-[0_6px_8px_rgba(4,27,32,0.03)]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            ) : null}
            <h1 className="font-heading text-[40px] font-medium leading-[1.15] tracking-[-1.2px] text-ink-deep">
              {post.title}
            </h1>
            {post.description && (
              <p className="text-[18px] leading-[1.5] text-ink-deep/80">
                {post.description}
              </p>
            )}
            <div className="flex flex-wrap items-center gap-4 text-[13px] text-taupe">
              <span>{post.author}</span>
              <span className="inline-flex items-center gap-1.5">
                <CalendarBlankIcon className="size-4" />
                {formatDate(post.date)}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <ClockIcon className="size-4" />
                {post.readingTime} min read
              </span>
            </div>
          </FadeIn>

          <FadeIn delay={0.1} className="mt-10">
            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-[4px] border border-sand">
              {post.cover ? (
                <Image
                  src={post.cover}
                  alt={post.title}
                  fill
                  sizes="768px"
                  className="object-cover"
                  priority
                />
              ) : (
                <PostCover seed={post.slug} className="h-full w-full" />
              )}
            </div>
          </FadeIn>

          {/* Rendered MDX body — element styling comes from src/mdx-components.tsx */}
          <div className="mt-12 [&>:first-child]:mt-0">
            <Post />
          </div>
        </article>
      </main>
      <SiteFooter />
    </div>
  );
}

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CalendarBlankIcon, ClockIcon } from "@phosphor-icons/react/dist/ssr";
import { AnnouncementBanner } from "@/components/layout/announcement-banner";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { FadeIn } from "@/components/motion/fade-in";
import { PostCover } from "@/components/sections/blog/post-cover";
import { CTA } from "@/components/sections/cta";
import { formatDate, getAllPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Product updates, engineering deep-dives, and web-intelligence guides from The Hog.",
  alternates: { canonical: "/blog" },
};

export default function BlogIndexPage() {
  const posts = getAllPosts();

  return (
    <div className="flex min-h-full flex-col">
      <AnnouncementBanner />
      <SiteHeader />
      <main className="flex-1">
        <section className="mx-auto w-full max-w-[1440px] px-6 py-24 sm:py-32 lg:px-[120px]">
          <FadeIn className="flex flex-col items-center gap-6 text-center">
            <span className="inline-flex items-center justify-center rounded-full border border-[#171c1f]/[0.08] bg-white px-3.5 py-3 text-[12px] leading-none text-ink-deep/80 shadow-[0_6px_8px_rgba(4,27,32,0.03)]">
              BLOG
            </span>
            <h1 className="font-heading text-[40px] font-medium leading-[1.15] tracking-[-1.2px] text-ink-deep">
              From the team behind The Hog
            </h1>
            <p className="max-w-[690px] text-[16px] leading-[1.5] text-ink-deep/80">
              Product updates, engineering deep-dives, and guides on giving AI
              agents live, structured web context.
            </p>
          </FadeIn>

          {posts.length === 0 ? (
            <FadeIn className="mx-auto mt-16 max-w-[560px] rounded-[4px] bg-white p-12 text-center shadow-[0px_0px_16px_0px_rgba(4,27,32,0.04)]">
              <p className="text-[16px] text-ink-deep/80">
                No posts yet — check back soon.
              </p>
            </FadeIn>
          ) : (
            <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post, i) => (
                <FadeIn key={post.slug} delay={Math.min(i * 0.06, 0.3)}>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="group flex h-full flex-col overflow-hidden rounded-[4px] bg-white shadow-[0px_0px_16px_0px_rgba(4,27,32,0.04)] transition-shadow hover:shadow-[0px_0px_24px_0px_rgba(4,27,32,0.08)]"
                  >
                    <div className="relative aspect-[16/9] w-full overflow-hidden border-b border-sand">
                      {post.cover ? (
                        <Image
                          src={post.cover}
                          alt={post.title}
                          fill
                          sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                        />
                      ) : (
                        <PostCover
                          seed={post.slug}
                          className="h-full w-full transition-transform duration-500 group-hover:scale-[1.03]"
                        />
                      )}
                    </div>
                    <div className="flex flex-1 flex-col gap-3 p-6">
                      {post.tags?.length ? (
                        <div className="flex flex-wrap gap-2">
                          {post.tags.slice(0, 2).map((tag) => (
                            <span
                              key={tag}
                              className="rounded-full bg-brand/5 px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.06em] text-brand"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      ) : null}
                      <h2 className="font-heading text-[20px] font-medium leading-[1.2] tracking-[-0.2px] text-ink-deep">
                        {post.title}
                      </h2>
                      <p className="line-clamp-3 text-[14px] leading-[1.5] text-ink-deep/80">
                        {post.description}
                      </p>
                      <div className="mt-auto flex items-center gap-4 pt-2 text-[12px] text-taupe">
                        <span className="inline-flex items-center gap-1.5">
                          <CalendarBlankIcon className="size-3.5" />
                          {formatDate(post.date)}
                        </span>
                        <span className="inline-flex items-center gap-1.5">
                          <ClockIcon className="size-3.5" />
                          {post.readingTime} min read
                        </span>
                      </div>
                    </div>
                  </Link>
                </FadeIn>
              ))}
            </div>
          )}
        </section>
        <CTA />
      </main>
      <SiteFooter />
    </div>
  );
}

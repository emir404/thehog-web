import Link from "next/link";
import { ArrowRightIcon } from "@phosphor-icons/react/dist/ssr";
import { FadeIn } from "@/components/motion/fade-in";
import { site } from "@/lib/site";

/**
 * "What you can build" — a use-case showcase. A centered header over a grid of
 * six agent example cards, each with a title, a one-line description, and the
 * API endpoints it composes (rendered as inline code chips). Mirrors the
 * enterprise Capabilities scaffold; the section link points at the API docs.
 */
type AgentUseCase = { title: string; description: string; endpoints: string[] };

const AGENTS: AgentUseCase[] = [
  {
    title: "Multi-Channel ABM Agent",
    description:
      "Builds the list, maps the buying committee, and fires outreach the moment a real signal hits.",
    endpoints: ["/companies", "/people", "/enrichments", "/monitors"],
  },
  {
    title: "SEO/AEO Content Agent",
    description:
      "Finds the keyword gaps your competitors rank for and briefs content that wins Google and AI answers.",
    endpoints: ["/seo", "/ppc", "/search", "/scrape"],
  },
  {
    title: "Brand & Reputation Agent",
    description:
      "Watches every mention across social, news, and reviews. Flags the moment sentiment starts moving.",
    endpoints: ["/social", "/news", "/sentiment", "/monitors"],
  },
  {
    title: "Competitor Intel Agent",
    description:
      "Tracks launches, pricing changes, ad spend, and key hires. You hear it first, not from a customer.",
    endpoints: ["/news", "/seo", "/ppc", "/monitors"],
  },
  {
    title: "Content Engagement Agent",
    description:
      "Surfaces the live conversations your buyers are in and drafts replies with full context on who’s talking.",
    endpoints: ["/social", "/people", "/sentiment"],
  },
  {
    title: "Deep Research Agent",
    description:
      "Chat apps write reports you read. This returns structured data your agent acts on, at any scale.",
    endpoints: ["/research", "/companies", "/people", "/enrichments"],
  },
];

export function WhatYouCanBuild() {
  return (
    <section id="what-you-can-build">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col items-center gap-16 px-6 py-24 sm:py-32 lg:px-[120px]">
        <FadeIn>
          <div className="flex flex-col items-center gap-6">
            <span className="inline-flex items-center justify-center rounded-full border border-[#171c1f]/[0.08] bg-white px-3.5 py-3 text-[12px] leading-none text-ink-deep/80 shadow-[0_6px_8px_rgba(4,27,32,0.03)]">
              WHAT YOU CAN BUILD
            </span>
            <div className="flex flex-col items-center gap-4">
              <h2 className="max-w-[896px] text-balance text-center font-heading text-[40px] font-medium leading-[1.15] tracking-[-1.2px] text-ink-deep">
                Agents that actually know what&rsquo;s happening.
              </h2>
              <p className="max-w-[690px] text-pretty text-center text-[16px] leading-[1.5] text-ink-deep/80">
                A few of the agents you could build on one API key.
              </p>
            </div>
          </div>
        </FadeIn>

        <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {AGENTS.map(({ title, description, endpoints }, i) => (
            <FadeIn key={title} delay={(i % 3) * 0.08} className="h-full">
              <article className="flex h-full flex-col gap-4 rounded-[4px] bg-white p-8 shadow-[0px_0px_16px_0px_rgba(4,27,32,0.04)]">
                <h3 className="font-heading text-[18px] font-medium leading-[1.2] tracking-[-0.18px] text-ink-deep">
                  {title}
                </h3>
                <p className="text-[14px] leading-[1.45] text-ink-deep/80">{description}</p>
                <div className="mt-auto flex flex-wrap gap-2 pt-2">
                  {endpoints.map((endpoint) => (
                    <code
                      key={endpoint}
                      className="rounded-[3px] bg-sand/60 px-1.5 py-0.5 font-mono text-[0.85em] text-ink-deep"
                    >
                      {endpoint}
                    </code>
                  ))}
                </div>
              </article>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.1}>
          <Link
            href={site.links.docs}
            className="group inline-flex items-center gap-2 text-[14px] font-medium text-brand transition-colors hover:text-brand-dark"
          >
            Explore the full API
            <ArrowRightIcon
              className="size-4 transition-transform group-hover:translate-x-0.5"
              weight="bold"
            />
          </Link>
        </FadeIn>
      </div>
    </section>
  );
}

import Image from "next/image";
import { FadeIn } from "@/components/motion/fade-in";
import { PixelCluster } from "@/components/sections/about/pixel-cluster";

/**
 * "Our Story" section (Figma node 135:1010). Warm-tinted full-bleed band: the
 * tint sits on the <section> (document width) while content stays in the 1200px
 * container. Two stacked text blocks on the left; a large photo on the right
 * that bleeds off the right viewport edge on desktop (clipped by the section's
 * overflow-hidden). A cyan pixel motif straddles the image's top-left edge.
 */

// Cyan motif (Figma group 135:1011), normalised to the cluster's top-left (frame x758 / y188).
const STORY_CYAN: readonly (readonly [number, number])[] = [
  [96, 160], [64, 128], [32, 96], [32, 64], [64, 32], [96, 0], [32, 32], [0, 32],
  [0, 0], [0, 128], [96, 192], [64, 224], [32, 224], [32, 256], [0, 288], [32, 320],
  [64, 352], [96, 320], [0, 352], [0, 320], [0, 224],
];

const BLOCKS = [
  {
    title: "How The Hog started",
    body: "We started The Hog after running into the same issue over and over: AI agents were getting smarter, but they still couldn’t really “see” the live web. Before there was an API, we built and shared a lot of tools, writing what felt like a million lines of code. Along the way we realized the most valuable thing we were building wasn’t a single app – it was the web intelligence layer underneath.",
  },
  {
    title: "Why we pivoted to an API?",
    body: "As more teams experimented with agents, everyone was rebuilding the same fragile scraping and enrichment stack just to get basic context from the internet. We realized our job wasn’t to ship yet another agent, but to give every agent clean, structured, real-time data from the web. That’s why we pivoted everything into The Hog API.",
  },
];

export function OurStory() {
  return (
    // #f2f9fb is a one-off cool tint for this band — NOT a design token.
    <section className="relative overflow-hidden bg-[#f2f9fb]">
      <div className="mx-auto w-full max-w-[1440px] px-6 py-24 sm:py-32 lg:px-[120px]">
        <FadeIn>
          <h2 className="font-heading text-[40px] font-medium leading-[1.15] tracking-[-1.2px] text-ink-deep">
            Our Story
          </h2>
        </FadeIn>

        <div className="mt-12 flex flex-col gap-12 lg:mt-16 lg:flex-row lg:items-end lg:gap-16">
          {/* Text column — bottom-aligned with the image on desktop */}
          <FadeIn className="order-2 flex flex-col gap-10 lg:order-1 lg:w-[46%] lg:max-w-[530px] lg:shrink-0" y={20}>
            {BLOCKS.map((block) => (
              <div key={block.title} className="flex flex-col gap-3">
                <h3 className="font-heading text-[18px] font-medium leading-[1.2] tracking-[-0.18px] text-ink-deep">
                  {block.title}
                </h3>
                <p className="text-[14px] leading-[1.45] text-ink-deep/80">{block.body}</p>
              </div>
            ))}
          </FadeIn>

          {/* Image column — bleeds off the right viewport edge on desktop */}
          <FadeIn delay={0.1} className="relative order-1 lg:order-2 lg:-mr-[120px] lg:flex-1">
            <div className="relative aspect-[756/743] w-full overflow-hidden rounded-[4px] lg:aspect-auto lg:h-[743px]">
              <Image
                src="/about/story.png"
                alt="The Hog team at a community event"
                fill
                sizes="(min-width: 1024px) 60vw, 100vw"
                className="object-cover"
              />
            </div>
            <PixelCluster
              pixels={STORY_CYAN}
              colorClass="bg-cyan"
              className="hidden h-[384px] w-[128px] lg:block lg:left-[-48px] lg:top-[-8px]"
            />
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

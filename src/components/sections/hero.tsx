/* eslint-disable @next/next/no-img-element */
import { FadeIn } from "@/components/motion/fade-in";
import { HeroBackground } from "@/components/sections/hero-background";
import { HeroSearch } from "@/components/sections/hero-search";
import { ActionButton } from "@/components/ui/action-button";
import { site } from "@/lib/site";

/**
 * Landing hero (Figma node 119:7, 1440×1024 frame). Offsets are the frame
 * values minus the 72px header that sits in flow above this section. The
 * section spans the rest of the viewport but never collapses below the
 * design height, so the composition holds 1:1 at 1440×1024.
 */
export function Hero() {
  return (
    <section className="relative h-[calc(100svh-72px)] min-h-[952px] overflow-hidden bg-background">
      <HeroBackground />

      {/* Badge + headline + CTA (Figma 119:133, frame top 272px) */}
      <div className="absolute left-1/2 top-[200px] flex -translate-x-1/2 flex-col items-center gap-12">
        <div className="flex flex-col items-center gap-6">
          <FadeIn>
            <p className="flex items-center gap-1.5 text-[14px] font-medium leading-none tracking-[-0.14px] text-[#080c0d] drop-shadow-[0px_1px_12px_rgba(4,21,10,0.1)]">
              Backed by
              <img src="/hero/yc-logo.svg" alt="Y" className="size-4" />
              Combinator
            </p>
          </FadeIn>
          <FadeIn delay={0.05}>
            <h1 className="w-[min(764px,calc(100vw-48px))] text-center font-heading text-[44px] font-medium leading-none tracking-[-1.76px] text-ink-deep sm:text-[64px] sm:tracking-[-2.56px]">
              One API to search, enrich,
              <br className="hidden sm:inline" /> and{" "}
              <mark className="-mx-1 bg-[#f78146]/20 px-1 text-inherit">monitor the web</mark>
            </h1>
          </FadeIn>
        </div>
        <FadeIn delay={0.1}>
          <ActionButton
            href={site.links.signup}
            variant="primary"
            size="lg"
            className="w-[273px] bg-brand/95"
          >
            Get your API Key
          </ActionButton>
        </FadeIn>
      </div>

      {/* Query bar (Figma 119:151, frame top 612px) */}
      <div className="absolute left-1/2 top-[540px] w-[min(1000px,calc(100vw-48px))] -translate-x-1/2">
        <FadeIn delay={0.15}>
          <HeroSearch />
        </FadeIn>
      </div>
    </section>
  );
}

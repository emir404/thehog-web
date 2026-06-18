/* eslint-disable @next/next/no-img-element */
import { FadeIn } from "@/components/motion/fade-in";
import { HeroBackground } from "@/components/sections/hero-background";
import { HeroDemo } from "@/components/sections/hero-demo";
import { ActionButton } from "@/components/ui/action-button";
import { site } from "@/lib/site";

/**
 * Landing hero (Figma scenes 151:5 / 158:683 / 158:854) — an animated product
 * demo. The badge, headline, and CTA stay server-rendered and are handed to the
 * client `HeroDemo` island, which morphs the query card into the agent +
 * structured-output results.
 *
 * At ≥1440 the section is the fixed 1440×1024 Figma canvas (minus the 72px
 * header in flow above) and `HeroDemo` places the content absolutely, 1:1.
 * Below 1440 everything falls back to centered normal flow and the section
 * grows with the (stacked) results.
 */
export function Hero() {
  return (
    <section className="relative flex flex-col items-center overflow-hidden bg-background px-6 pb-24 pt-16 sm:pt-20 min-[1440px]:block min-[1440px]:h-[calc(100svh-72px)] min-[1440px]:min-h-[1040px] min-[1440px]:p-0">
      <HeroBackground />

      <HeroDemo>
        <div className="flex flex-col items-center gap-12">
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
                <mark className="-mx-1 bg-[#0e97b8]/20 px-1 text-inherit">monitor the web</mark>
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
      </HeroDemo>
    </section>
  );
}

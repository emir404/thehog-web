import { BookOpenIcon } from "@phosphor-icons/react/dist/ssr";
import { FadeIn } from "@/components/motion/fade-in";
import { PixelCluster } from "@/components/sections/about/pixel-cluster";
import { ActionButton } from "@/components/ui/action-button";
import { site } from "@/lib/site";

/**
 * Enterprise hero. A left-aligned statement headline (same shell as the about
 * hero) under an eyebrow badge, with a two-button CTA row — "Talk to sales" is
 * the primary action for this page. A brand pixel motif floats top-right at the
 * design width, reusing the about-hero coordinates (Figma groups 135:934/960).
 */
const HERO_PIXELS: readonly (readonly [number, number])[] = [
  // upper blob
  [0, 190], [0, 158], [32, 126], [32, 94], [64, 94], [64, 62], [96, 62], [96, 32],
  [96, 0], [32, 31], [0, 31], [32, 222], [32, 254], [0, 286], [32, 317], [64, 349],
  [32, 380], [0, 380], [96, 349], [64, 286], [96, 254], [32, 190], [64, 158], [96, 190],
  [96, 158],
  // lower-right blob
  [152, 284], [152, 316], [184, 348], [184, 380], [216, 380], [216, 412], [248, 412],
  [248, 442], [248, 474], [184, 443], [152, 443], [184, 252], [184, 220], [152, 188],
  [184, 157], [216, 125], [184, 94], [152, 94], [248, 125], [216, 188], [248, 220],
  [184, 284], [216, 316], [248, 284], [248, 316],
];

export function EnterpriseHero() {
  return (
    <section className="bg-background">
      <div className="relative mx-auto w-full max-w-[1440px] px-6 pb-24 pt-16 sm:pb-32 sm:pt-24 lg:px-[120px]">
        <FadeIn className="flex flex-col items-start gap-6">
          <span className="inline-flex items-center justify-center rounded-full border border-[#171c1f]/[0.08] bg-white px-3.5 py-3 text-[12px] leading-none text-ink-deep/80 shadow-[0_6px_8px_rgba(4,27,32,0.03)]">
            ENTERPRISE
          </span>
          <h1 className="max-w-[916px] font-heading text-[44px] font-medium leading-none tracking-[-1.76px] text-ink-deep sm:text-[64px] sm:tracking-[-2.56px]">
            Web intelligence built for{" "}
            <br className="hidden sm:block" />
            agents in <mark className="-mx-1 bg-brand/20 px-1 text-inherit">production</mark>
          </h1>
          <p className="max-w-[577px] text-[16px] leading-[1.5] text-ink/80">
            One API for live web context — with the security, scale, and support your production
            agents need. We design pricing, infrastructure, and onboarding around how your team
            runs.
          </p>
          <div className="mt-2 flex flex-col gap-2 sm:flex-row">
            <ActionButton href={site.links.sales}>Talk to sales</ActionButton>
            <ActionButton href={site.links.docs} variant="neutral" icon={BookOpenIcon}>
              Read docs
            </ActionButton>
          </div>
        </FadeIn>

        {/* Decorative brand pixel motif, top-right (≥1440px design width only). */}
        <PixelCluster
          pixels={HERO_PIXELS}
          colorClass="bg-brand"
          className="hidden h-[506px] w-[280px] min-[1440px]:block min-[1440px]:right-[100px] min-[1440px]:top-[8px]"
        />
      </div>
    </section>
  );
}

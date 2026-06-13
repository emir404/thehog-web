import { BookOpenIcon } from "@phosphor-icons/react/dist/ssr";
import { FadeIn } from "@/components/motion/fade-in";
import { PricingRates } from "@/components/sections/pricing-rates";
import { ActionButton } from "@/components/ui/action-button";
import { site } from "@/lib/site";

/**
 * Pricing section (Figma node 119:605). A two-column band: a left rail with
 * the heading, CTAs, and a footnote, and a right rail with the metered
 * "Endpoint rates" table (see PricingRates) followed by the Enterprise block.
 */
export function Pricing() {
  return (
    <section id="pricing" className="bg-[#fcf9f7]">
      <div className="mx-auto w-full max-w-[1440px] px-6 py-24 sm:py-32 lg:px-[120px]">
        <div className="flex flex-col gap-12 lg:flex-row lg:gap-24">
          {/* Left rail — heading, CTAs, footnote */}
          <FadeIn className="lg:w-[446px] lg:shrink-0">
            <div className="flex flex-col gap-12">
              <div className="flex flex-col gap-6">
                <span className="inline-flex items-center justify-center self-start rounded-full border border-[#1b1918]/[0.08] bg-white px-3.5 py-3 text-[12px] leading-none text-ink-deep/80 shadow-[0_6px_8px_rgba(34,12,1,0.03)]">
                  PRICING
                </span>
                <div className="flex flex-col gap-4">
                  <h2 className="text-balance font-heading text-[40px] font-medium leading-[1.15] tracking-[-1.2px] text-ink-deep">
                    Pay for the calls your agents make.
                  </h2>
                  <p className="text-[16px] leading-[1.5] text-pretty text-ink-deep/80">
                    No tiers, no seats, no feature gates. Every endpoint is metered at a flat
                    rate - your first 500 calls each month are free.
                  </p>
                </div>
              </div>

              <div className="flex gap-2">
                <ActionButton href={site.links.signup} variant="tint" size="sm">
                  Get Started
                </ActionButton>
                <ActionButton
                  href={site.links.docs}
                  variant="neutral"
                  size="sm"
                  icon={BookOpenIcon}
                >
                  Read Docs
                </ActionButton>
              </div>

              <p className="w-[413px] max-w-full text-[14px] leading-[1.5] text-pretty text-ink-deep/80">
                <span className="text-ink-deep">Volume discounts apply automatically</span> past
                100k calls per month. Set a spend cap anytime — we stop, you never overpay.
              </p>
            </div>
          </FadeIn>

          {/* Right rail — rate table + Enterprise */}
          <FadeIn delay={0.1} className="flex-1 lg:pt-8">
            <div className="flex flex-col gap-16">
              <PricingRates />

              <div className="flex flex-col gap-8">
                <div className="flex flex-col gap-8">
                  <h3 className="font-heading text-[24px] font-medium tracking-[-0.48px] text-ink-deep">
                    Enterprise
                  </h3>
                  <p className="w-[297px] max-w-full text-[16px] leading-[1.5] text-pretty text-ink-deep/80">
                    For companies with custom data, security, and volume needs.
                  </p>
                </div>
                <ActionButton
                  href={site.links.sales}
                  variant="tint"
                  size="lg"
                  className="w-full"
                >
                  Talk to sales
                </ActionButton>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

import { CheckIcon } from "@phosphor-icons/react/dist/ssr";
import { FadeIn } from "@/components/motion/fade-in";
import { ActionButton } from "@/components/ui/action-button";
import { site } from "@/lib/site";

/**
 * Enterprise section for the /pricing page. Mirrors the closing CTA's shell — a
 * near-full-bleed card (16px gutters, capped at the 1440 frame) with the same
 * rounded-[4px] radius and p-6 / sm:p-12 / lg:p-24 padding — but recolored to
 * the dark ink surface so it sets up, rather than competes with, the teal CTA
 * directly below. Pitch + "Talk to sales" on the left, capability list on the right.
 */
const CAPABILITIES = [
  "Custom data sources and dedicated capacity",
  "SSO / SAML and role-based access controls",
  "Security review, DPA, and compliance support",
  "Committed-use pricing with volume discounts",
  "Dedicated support and onboarding",
  "Uptime SLAs and priority routing",
];

export function Enterprise() {
  return (
    <section id="enterprise" className="mx-auto w-full max-w-[1440px] px-4 pb-16">
      <div className="relative overflow-hidden rounded-[4px] bg-ink-deep p-6 text-white sm:p-12 lg:p-24">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Left — pitch + CTA */}
          <FadeIn className="flex flex-col gap-6">
            <h2 className="text-balance font-heading text-[40px] font-medium leading-[1.15] tracking-[-1.2px] text-white">
              Enterprise
            </h2>
            <p className="max-w-[440px] text-[16px] leading-[1.5] text-pretty text-white/80">
              For teams with custom data, security, and volume needs. We&rsquo;ll design the right
              setup — pricing, infrastructure, and support — around how your agents run in
              production.
            </p>
            <ActionButton
              href={site.links.sales}
              variant="inverse"
              size="lg"
              className="self-start"
            >
              Talk to sales
            </ActionButton>
          </FadeIn>

          {/* Right — capability checklist */}
          <FadeIn delay={0.1}>
            <ul className="flex flex-col gap-4 lg:pt-2">
              {CAPABILITIES.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-white/10 text-white">
                    <CheckIcon className="size-3.5" weight="bold" />
                  </span>
                  <span className="text-[16px] leading-[1.5] text-white/80">{item}</span>
                </li>
              ))}
            </ul>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

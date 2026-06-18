import type { Icon } from "@phosphor-icons/react";
import {
  DatabaseIcon,
  GaugeIcon,
  HeadsetIcon,
  LockKeyIcon,
  ShieldCheckIcon,
  TagIcon,
} from "@phosphor-icons/react/dist/ssr";
import { FadeIn } from "@/components/motion/fade-in";

/**
 * Enterprise capabilities. A centered header over a grid of six icon cards —
 * one per pillar of the Enterprise offering (expanded from the published
 * capability list on /pricing). Standard white card surface from the design
 * system; teal icon chips.
 */
type Capability = { title: string; body: string; Icon: Icon };

const CAPABILITIES: Capability[] = [
  {
    title: "Custom data & dedicated capacity",
    body: "Bring custom and private sources, and run on dedicated capacity provisioned for your workloads.",
    Icon: DatabaseIcon,
  },
  {
    title: "SSO / SAML & access controls",
    body: "SAML single sign-on and role-based access controls keep the right people in the right scopes.",
    Icon: LockKeyIcon,
  },
  {
    title: "Security, DPA & compliance",
    body: "A security review, a signed DPA, and compliance support for your procurement process.",
    Icon: ShieldCheckIcon,
  },
  {
    title: "Committed-use pricing",
    body: "Move from metered rates to committed-use pricing with volume discounts that scale with you.",
    Icon: TagIcon,
  },
  {
    title: "Dedicated support & onboarding",
    body: "A dedicated team for onboarding, integration support, and ongoing success.",
    Icon: HeadsetIcon,
  },
  {
    title: "Uptime SLAs & priority routing",
    body: "Uptime SLAs and priority routing keep production agents fast and reliable at scale.",
    Icon: GaugeIcon,
  },
];

export function Capabilities() {
  return (
    <section id="capabilities">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col items-center gap-16 px-6 py-24 sm:py-32 lg:px-[120px]">
        <FadeIn>
          <div className="flex flex-col items-center gap-6">
            <span className="inline-flex items-center justify-center rounded-full border border-[#171c1f]/[0.08] bg-white px-3.5 py-3 text-[12px] leading-none text-ink-deep/80 shadow-[0_6px_8px_rgba(4,27,32,0.03)]">
              CAPABILITIES
            </span>
            <div className="flex flex-col items-center gap-4">
              <h2 className="max-w-[896px] text-balance text-center font-heading text-[40px] font-medium leading-[1.15] tracking-[-1.2px] text-ink-deep">
                Everything you need to run agents at scale.
              </h2>
              <p className="max-w-[690px] text-pretty text-center text-[16px] leading-[1.5] text-ink-deep/80">
                From custom data and dedicated capacity to security reviews and SLAs — The Hog is
                built for production workloads.
              </p>
            </div>
          </div>
        </FadeIn>

        <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {CAPABILITIES.map(({ title, body, Icon }, i) => (
            <FadeIn key={title} delay={(i % 3) * 0.08} className="h-full">
              <article className="flex h-full flex-col gap-4 rounded-[4px] bg-white p-8 shadow-[0px_0px_16px_0px_rgba(4,27,32,0.04)]">
                <span className="flex size-11 items-center justify-center rounded-[4px] bg-brand/10 text-brand">
                  <Icon className="size-6" />
                </span>
                <h3 className="font-heading text-[18px] font-medium leading-[1.2] tracking-[-0.18px] text-ink-deep">
                  {title}
                </h3>
                <p className="text-[14px] leading-[1.45] text-ink-deep/80">{body}</p>
              </article>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

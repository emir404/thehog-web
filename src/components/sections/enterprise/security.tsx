import type { Icon } from "@phosphor-icons/react";
import { FileTextIcon, LockKeyIcon, ShieldCheckIcon } from "@phosphor-icons/react/dist/ssr";
import { FadeIn } from "@/components/motion/fade-in";
import { ActionButton } from "@/components/ui/action-button";
import { site } from "@/lib/site";

/**
 * Security & compliance band. A dark ink section (a deliberate break from the
 * off-white page, like how-it-works) pairing a left-hand pitch + "Talk to sales"
 * with three governance cards on the right. Copy stays aligned with the
 * already-published Enterprise claims — no specific certifications asserted.
 */
type Pillar = { title: string; body: string; Icon: Icon };

const PILLARS: Pillar[] = [
  {
    title: "Access control",
    body: "SAML single sign-on and role-based access controls, so the right people get the right scopes.",
    Icon: LockKeyIcon,
  },
  {
    title: "Data protection",
    body: "A signed DPA and custom data handling and retention to match your internal policies.",
    Icon: ShieldCheckIcon,
  },
  {
    title: "Procurement-ready",
    body: "Security review and compliance support to move smoothly through your vendor process.",
    Icon: FileTextIcon,
  },
];

export function Security() {
  return (
    <section id="security" className="bg-ink-deep text-white">
      <div className="mx-auto grid w-full max-w-[1440px] grid-cols-1 gap-12 px-6 py-24 sm:py-32 lg:grid-cols-2 lg:gap-16 lg:px-[120px]">
        {/* Left — pitch + CTA */}
        <FadeIn className="flex flex-col items-start gap-6">
          <span className="inline-flex items-center justify-center rounded-full border border-white/15 bg-[#1b2123] px-3.5 py-3 text-[12px] leading-none text-white/80 shadow-[0_6px_8px_rgba(4,27,32,0.03)]">
            SECURITY &amp; COMPLIANCE
          </span>
          <h2 className="max-w-[440px] text-balance font-heading text-[40px] font-medium leading-[1.15] tracking-[-1.2px] text-white">
            Security and governance built in.
          </h2>
          <p className="max-w-[480px] text-pretty text-[16px] leading-[1.5] text-white/80">
            We work with your security and procurement teams to fit The Hog into your environment —
            from access control and data handling to the reviews your process requires.
          </p>
          <ActionButton href={site.links.sales} variant="inverse" className="mt-2">
            Talk to sales
          </ActionButton>

          {/* Compliance badges (SOC 2 / CCPA / GDPR) — seal artwork */}
          {/* eslint-disable-next-line @next/next/no-img-element -- static multi-badge SVG, same pattern as the footer logo */}
          <img
            src="/enterprise/compliance-badges.svg"
            alt="SOC 2, GDPR, and CCPA compliance"
            className="h-auto w-full max-w-[280px]"
          />
        </FadeIn>

        {/* Right — governance cards */}
        <FadeIn delay={0.1} className="flex flex-col gap-4">
          {PILLARS.map(({ title, body, Icon }) => (
            <article key={title} className="flex items-start gap-4 rounded-[4px] bg-white/[0.04] p-6">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-[4px] bg-white/10 text-white">
                <Icon className="size-5" />
              </span>
              <div className="flex flex-col gap-1.5">
                <h3 className="font-heading text-[18px] font-medium tracking-[-0.18px] text-white">
                  {title}
                </h3>
                <p className="text-[14px] leading-[1.45] text-white/80">{body}</p>
              </div>
            </article>
          ))}
        </FadeIn>
      </div>
    </section>
  );
}

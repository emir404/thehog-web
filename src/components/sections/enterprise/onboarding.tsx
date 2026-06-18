import { FadeIn } from "@/components/motion/fade-in";

/**
 * Enterprise onboarding. Three numbered steps from first contact to production,
 * reusing the landing "How it works" step-card vocabulary (mono step number +
 * title + description) on a light surface to alternate rhythm after the dark
 * Security band.
 */
type Step = { n: string; title: string; body: string };

const STEPS: Step[] = [
  {
    n: "// 01",
    title: "Talk to sales",
    body: "Tell us how your agents use the web and what scale, security, and support you need.",
  },
  {
    n: "// 02",
    title: "Design your setup",
    body: "We shape pricing, data sources, infrastructure, and security to fit your environment.",
  },
  {
    n: "// 03",
    title: "Go live with support",
    body: "Onboard with a dedicated team, an uptime SLA, and priority routing for production.",
  },
];

export function Onboarding() {
  return (
    <section id="onboarding" className="bg-[#f2f9fb]">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col items-center gap-16 px-6 py-24 sm:py-32 lg:px-[120px]">
        <FadeIn>
          <div className="flex flex-col items-center gap-6">
            <span className="inline-flex items-center justify-center rounded-full border border-[#171c1f]/[0.08] bg-white px-3.5 py-3 text-[12px] leading-none text-ink-deep/80 shadow-[0_6px_8px_rgba(4,27,32,0.03)]">
              GETTING STARTED
            </span>
            <h2 className="max-w-[802px] text-balance text-center font-heading text-[40px] font-medium leading-[1.15] tracking-[-1.2px] text-ink-deep">
              From first call to production.
            </h2>
          </div>
        </FadeIn>

        <div className="grid w-full grid-cols-1 gap-6 lg:grid-cols-3">
          {STEPS.map((step, i) => (
            <FadeIn key={step.title} delay={i * 0.08} className="h-full">
              <article className="flex h-full flex-col gap-3 rounded-[4px] bg-white p-8 shadow-[0px_0px_16px_0px_rgba(4,27,32,0.04)]">
                <span className="font-mono text-[16px] tracking-[-0.16px] text-ink-deep/40">
                  {step.n}
                </span>
                <h3 className="font-heading text-[18px] font-medium tracking-[-0.18px] text-ink-deep">
                  {step.title}
                </h3>
                <p className="text-[14px] leading-[1.45] text-ink-deep/80">{step.body}</p>
              </article>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

import type { ComponentType } from "react";
import { FadeIn } from "@/components/motion/fade-in";
import {
  AskForContextArt,
  PowerNextActionArt,
  StructuredIntelligenceArt,
} from "@/components/sections/how-it-works-art";

/**
 * How it works section (Figma node 135:516). A deliberately dark block — a
 * break from the warm off-white page — with an eyebrow + two-tone headline over
 * three step cards. Each card frames a glassy product mockup (see
 * how-it-works-art) that overflows its right edge and is clipped, fading into
 * the description below. Cards rise in on scroll; the mockups animate subtly.
 */

type Step = {
  n: string;
  title: string;
  description: string;
  /** Fog the lower illustration with the blurred bottom mask (Figma 135:545 / 135:564). */
  mask: boolean;
  Art: ComponentType;
};

const STEPS: Step[] = [
  {
    n: "// 01",
    title: "Ask for context",
    description: "Send The Hog a company, person, domain, keyword, market, or research task.",
    mask: true,
    Art: AskForContextArt,
  },
  {
    n: "// 02",
    title: "Get structured intelligence",
    description:
      "The Hog gathers live signals from across the web and turns them into clean, ranked, agent-ready context.",
    mask: true,
    Art: StructuredIntelligenceArt,
  },
  {
    n: "// 03",
    title: "Power the next action",
    description:
      "Use the output to enrich leads, monitor accounts, track competitors, generate research, or trigger workflows.",
    mask: false,
    Art: PowerNextActionArt,
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-[#181615]">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col items-center gap-16 px-6 py-24 sm:gap-20 sm:py-32 lg:px-[120px] lg:py-[200px]">
        <FadeIn>
          <div className="flex flex-col items-center gap-6">
            <span className="inline-flex items-center justify-center rounded-full border border-white/15 bg-[#211e1d] px-3.5 py-3 text-[12px] leading-none text-white/80 shadow-[0_6px_8px_rgba(34,12,1,0.03)]">
              HOW IT WORKS
            </span>
            <h2 className="max-w-[802px] text-balance text-center font-heading text-[32px] font-medium leading-[1.15] tracking-[-1.2px] text-white sm:text-[40px]">
              The Hog does the crawling, cleaning, and structuring.{" "}
              <mark className="-mx-1 bg-brand/20 px-1 text-inherit">
                Your agents do the thinking.
              </mark>
            </h2>
          </div>
        </FadeIn>

        <div className="grid w-full grid-cols-1 gap-6 lg:grid-cols-3">
          {STEPS.map((step, i) => (
            <FadeIn
              key={step.title}
              delay={i * 0.08}
              className="mx-auto w-full max-w-[384px] lg:max-w-none"
            >
              <StepCard step={step} />
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

function StepCard({ step }: { step: Step }) {
  const { n, title, description, mask, Art } = step;
  return (
    <article className="relative h-[508px] overflow-hidden rounded-[4px] bg-[#242221] shadow-[0px_0px_16px_0px_rgba(34,12,1,0.04)]">
      <Art />

      {/* Bottom mask — a blurred, card-colored rectangle (Figma 135:545 / 135:564)
          that fogs the overflowing mockup so the copy stays legible on top. The
          rect is wider than the card and clipped; only its soft top edge shows. */}
      {mask && (
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-[374px] z-[5] h-[184px] w-[559px] -translate-x-1/2 bg-[#242221] blur-[26.85px]"
        />
      )}

      {/* Title + step number */}
      <div className="absolute inset-x-8 top-8 z-10 flex items-center justify-between">
        <h3 className="font-heading text-[18px] font-medium tracking-[-0.18px] text-white">
          {title}
        </h3>
        <span className="font-mono text-[16px] tracking-[-0.16px] text-white/50">{n}</span>
      </div>

      {/* Description */}
      <p className="absolute inset-x-8 bottom-8 z-10 text-[14px] leading-[1.45] text-white/80">
        {description}
      </p>
    </article>
  );
}

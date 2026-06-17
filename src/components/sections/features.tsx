import type { ReactNode } from "react";
import { FadeIn } from "@/components/motion/fade-in";
import {
  CleanOutputArt,
  FreshDataArt,
  PrototypeArt,
  SignalsArt,
} from "@/components/sections/features-art";
import { cn } from "@/lib/utils";

/**
 * Features section (Figma node 135:279). A centered eyebrow + headline over a
 * two-row asymmetric bento grid. Each card carries a top-left title, a
 * bottom-left description, a soft white blur that fades the art into the text,
 * and a detailed mockup (see features-art.tsx) that is intentionally larger
 * than its card — the card clips the overflow, exactly like the Figma frames.
 */

type FeatureCardProps = {
  title: string;
  description: string;
  children: ReactNode;
  className?: string;
};

function FeatureCard({ title, description, children, className }: FeatureCardProps) {
  return (
    <div
      className={cn(
        "relative h-[384px] overflow-hidden rounded-[4px] bg-white shadow-[0px_0px_16px_0px_rgba(4,27,32,0.04)]",
        className,
      )}
    >
      {/* Illustration layer (decorative, clipped by the card) */}
      <div aria-hidden className="pointer-events-none absolute inset-0 select-none">
        {children}
      </div>

      {/* White blur vignette — fades the art into the description (Figma "Rectangle 63") */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-[-96px] top-[285px] h-[273px] bg-white blur-[26px]"
      />

      <h3 className="absolute left-8 top-8 font-heading text-[18px] font-medium leading-[1.2] tracking-[-0.18px] text-ink-deep">
        {title}
      </h3>
      <p className="absolute bottom-8 left-8 right-8 text-[14px] leading-[1.2] text-ink-deep/80">
        {description}
      </p>
    </div>
  );
}

export function Features() {
  return (
    <section id="features">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col items-center gap-16 px-6 py-24 sm:gap-20 sm:py-32 lg:px-[120px]">
        <FadeIn>
          <div className="flex flex-col items-center gap-6">
            <span className="inline-flex items-center justify-center rounded-full border border-[#171c1f]/[0.08] bg-white px-3.5 py-3 text-[12px] leading-none text-ink-deep/80 shadow-[0_6px_8px_rgba(4,27,32,0.03)]">
              FEATURES
            </span>
            <h2 className="max-w-[896px] text-balance text-center font-heading text-[40px] font-medium leading-[1.15] tracking-[-1.2px] text-ink-deep">
              One API for the context your agents actually need.
            </h2>
          </div>
        </FadeIn>

        <FadeIn delay={0.1} className="w-full">
          <div className="flex flex-col gap-6">
            {/* Row 1 — wide "signals" card + "fresh data" card */}
            <div className="grid gap-6 lg:grid-cols-[667fr_509fr]">
              <FeatureCard
                title="All the signals in one place"
                description="Replace five data vendors with one intelligence layer."
              >
                <SignalsArt />
              </FeatureCard>
              <FeatureCard
                title="Fresh data when it matters"
                description="Built for moving targets, not static databases."
              >
                <FreshDataArt />
              </FeatureCard>
            </div>

            {/* Row 2 — "clean output" card + wide "prototype to production" card */}
            <div className="grid gap-6 lg:grid-cols-[460fr_716fr]">
              <FeatureCard
                title="Clean outputs your agents can reason with"
                description="Less parsing. More reasoning."
              >
                <CleanOutputArt />
              </FeatureCard>
              <FeatureCard
                title="From prototype to production"
                description="The same API for demos, workflows, and production agents."
              >
                <PrototypeArt />
              </FeatureCard>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

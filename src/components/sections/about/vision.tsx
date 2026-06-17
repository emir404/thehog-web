import { FadeIn } from "@/components/motion/fade-in";
import { cn } from "@/lib/utils";

/**
 * "Our Vision" section (Figma node 135:1045). Three equal cards, each capped by
 * the signature pixel "progress bar" pinned to the card's bottom edge: a
 * full-width thin base plus a taller, horizontally offset step that reads as a
 * two-step staircase once the card clips the overflow.
 */

type Step = {
  /** Which edge the taller step anchors to. */
  side: "left" | "right";
  /** Offset from that edge in px (negative bleeds off-card; clipped). */
  offset: number;
  /** Width of the taller step in px. */
  width: number;
};

type VisionCard = {
  title: string;
  body: string;
  /** Bar colour. `bg-[#50c701]` is a one-off green — NOT a design token. */
  barClass: string;
  step: Step;
};

const VISION_CARDS: VisionCard[] = [
  {
    title: "Grow",
    body: "We want to give all companies the best chance to grow by democratizing data analysis and bandwidth problems.",
    barClass: "bg-brand",
    step: { side: "right", offset: 0, width: 115 },
  },
  {
    title: "Faster",
    body: "The Hog helps companies move faster, together. Shared context creates faster decisions, cleaner execution, and fewer handoffs.",
    barClass: "bg-cyan",
    step: { side: "left", offset: -35, width: 115 },
  },
  {
    title: "Now",
    body: "This is how teams stay ahead and keep adaptive go-to-market playbooks alive, updating in real time as the market moves.",
    barClass: "bg-[#50c701]", // one-off green, not a token
    step: { side: "right", offset: 0, width: 176 },
  },
];

function StepBar({ barClass, step }: { barClass: string; step: Step }) {
  const stepStyle =
    step.side === "left"
      ? { width: step.width, left: step.offset }
      : { width: step.width, right: step.offset };
  return (
    <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0">
      {/* full-width base */}
      <div className={cn("h-2 w-full", barClass)} />
      {/* taller offset step */}
      <div className={cn("absolute bottom-0 h-6", barClass)} style={stepStyle} />
    </div>
  );
}

export function OurVision() {
  return (
    <section className="bg-background">
      <div className="mx-auto w-full max-w-[1440px] px-6 py-24 sm:py-32 lg:px-[120px]">
        <FadeIn>
          <h2 className="font-heading text-[40px] font-medium leading-[1.15] tracking-[-1.2px] text-ink-deep">
            Our Vision
          </h2>
        </FadeIn>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3 lg:mt-16">
          {VISION_CARDS.map((card, i) => (
            <FadeIn key={card.title} delay={i * 0.08}>
              <article className="relative min-h-[170px] overflow-hidden rounded-[4px] bg-ink-deep/[0.03] p-8 shadow-[0px_0px_16px_0px_rgba(4,27,32,0.04)]">
                <h3 className="font-heading text-[18px] font-medium tracking-[-0.18px] text-ink-deep">
                  {card.title}
                </h3>
                <p className="mt-2 text-[14px] leading-[1.45] text-ink-deep/80">{card.body}</p>
                <StepBar barClass={card.barClass} step={card.step} />
              </article>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

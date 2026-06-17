"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import { FadeIn } from "@/components/motion/fade-in";
import { LayersArt, ScatterArt } from "@/components/sections/problems-art";
import { cn } from "@/lib/utils";

/**
 * The interactive "Problems" island (Figma frames 135:231 / 135:1396 — two
 * states of one section). A click-to-switch selector: the two problem cards on
 * the left toggle which illustration fills the dark panel on the right.
 *
 * Desktop (≥1440, the Figma width): the panel bleeds off the right edge of the
 * centered 1440 frame; the left column pins the headline to the top and the
 * cards to the bottom. Below 1440 everything stacks (headline → cards →
 * contained panel) so the panel never has to bleed off-screen.
 */

type Problem = { title: string; body: string };
const PROBLEMS: Problem[] = [
  {
    title: "Context is scattered",
    body: "People data, company data, social signals, news, sentiment, and web results all live in different places. Every agent has to stitch the same stack together from scratch.",
  },
  {
    title: "Freshness breaks fast",
    body: "Markets move in real time, but most enrichment and research tools are built on cached data. By the time your agent acts, the signal may already be outdated.",
  },
];

function ProblemCard({
  problem,
  active,
  onSelect,
}: {
  problem: Problem;
  active: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={active}
      className={cn(
        "flex w-full cursor-pointer flex-col gap-3 rounded-[4px] p-8 text-left transition-[background-color,box-shadow] duration-300 min-[1440px]:w-[530px]",
        active
          ? "bg-[#fafdfe] shadow-[0px_6px_16px_0px_rgba(4,27,32,0.03)]"
          : "bg-transparent shadow-none hover:bg-[#fafdfe]/40",
      )}
    >
      <span className="font-heading text-[18px] font-medium leading-[1.2] tracking-[-0.18px] text-ink-deep">
        {problem.title}
      </span>
      <span className="max-w-[418px] text-[14px] leading-[1.45] text-ink-deep/80">{problem.body}</span>
    </button>
  );
}

/** The crossfading panel contents. `compact` scales the layer stack to fit the
 *  smaller mobile panel and lets the scatter canvas pass vertical scroll. */
function PanelArt({
  active,
  reduce,
  compact = false,
}: {
  active: number;
  reduce: boolean | null;
  compact?: boolean;
}) {
  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={active}
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={reduce ? { duration: 0 } : { duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      >
        {active === 0 ? (
          <ScatterArt panY={compact} />
        ) : (
          <div className="grid h-full w-full place-items-center">
            <div className={cn("origin-center", compact && "scale-[0.46] sm:scale-[0.58]")}>
              <LayersArt />
            </div>
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}

export function ProblemsInteractive() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);

  return (
    <>
      {/* Desktop bleed panel — flush to the right edge of the 1440 frame */}
      <div className="absolute right-0 top-1/2 hidden h-[900px] w-[707px] -translate-y-1/2 overflow-clip rounded-l-[12px] bg-[#141819] min-[1440px]:block">
        <PanelArt active={active} reduce={reduce} />
      </div>

      <div className="px-6 pb-24 pt-24 sm:pb-32 sm:pt-32 lg:px-[120px] min-[1440px]:pb-0">
        {/* Headline + cards. Stacked & centered below 1440; left column with the
            headline pinned top / cards pinned bottom at ≥1440. */}
        <div className="mx-auto flex max-w-[560px] flex-col gap-12 min-[1440px]:mx-0 min-[1440px]:min-h-[820px] min-[1440px]:max-w-[600px] min-[1440px]:justify-between min-[1440px]:gap-0">
          <FadeIn>
            <h2 className="font-heading text-[28px] font-medium leading-[1.15] tracking-[-1.2px] text-ink-deep sm:text-[32px] min-[1440px]:text-[40px]">
              <span className="min-[1440px]:whitespace-nowrap">AI agents are moving fast.</span>{" "}
              <span className="min-[1440px]:whitespace-nowrap">Their data layer is not.</span>
            </h2>
          </FadeIn>

          <FadeIn delay={0.05}>
            <div className="flex flex-col gap-4 min-[1440px]:-ml-8 min-[1440px]:gap-0">
              {PROBLEMS.map((problem, i) => (
                <ProblemCard
                  key={problem.title}
                  problem={problem}
                  active={active === i}
                  onSelect={() => setActive(i)}
                />
              ))}
            </div>
          </FadeIn>
        </div>

        {/* Contained panel — stacked layout only (below 1440) */}
        <FadeIn delay={0.1} className="min-[1440px]:hidden">
          <div className="relative mx-auto mt-12 h-[420px] w-full max-w-[560px] overflow-clip rounded-[12px] bg-[#141819] sm:h-[520px]">
            <PanelArt active={active} reduce={reduce} compact />
          </div>
        </FadeIn>
      </div>
    </>
  );
}

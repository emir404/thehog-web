"use client";

import { CircleNotchIcon } from "@phosphor-icons/react";
import { AnimatePresence, motion, type Variants } from "motion/react";
import { useEffect, useState } from "react";
import {
  AGENT_LINE_STAGGER,
  AGENT_STEP_MS,
  AGENT_STEPS,
  type AgentStepData,
  EASE,
  QUERY,
} from "@/lib/hero-demo";
import { cn } from "@/lib/utils";

/**
 * Scene-3 left panel (Figma 158:1054): the agent reasoning log. The query title
 * is pinned at the top and stays put; the steps below it are worked one at a
 * time. A step expands open with its in-progress label + spinner, then its
 * reasoning lines type in one-by-one; when its beat is up it resolves to the
 * done label + glyph and the next step expands in. The panel is sized to fit the
 * whole log, so nothing is clipped. `instant` (reduced motion) renders the
 * settled frame with no animation.
 */

const lineGroup: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: AGENT_LINE_STAGGER, delayChildren: 0.15 } },
};
const lineItem: Variants = {
  hidden: { opacity: 0, y: 4 },
  show: { opacity: 1, y: 0, transition: { duration: 0.3, ease: EASE } },
};
const connector: Variants = {
  hidden: { scaleY: 0 },
  show: { scaleY: 1, transition: { duration: 0.55, delay: 0.15, ease: EASE } },
};

type StepStatus = "active" | "done";

function AgentStep({
  step,
  status,
  instant,
}: {
  step: AgentStepData;
  status: StepStatus;
  instant: boolean;
}) {
  const StepIcon = step.icon;
  const done = status === "done";

  return (
    <div className="flex flex-col">
      {/* Status icon + label (in-progress → done) */}
      <div className="flex items-center gap-2">
        <span className="relative flex size-[18px] items-center justify-center">
          <AnimatePresence mode="wait" initial={false}>
            {done || instant ? (
              <motion.span
                key="glyph"
                initial={instant ? false : { opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.25, ease: EASE }}
                className="flex"
              >
                <StepIcon className="size-[18px] text-[rgba(5,27,32,0.7)]" />
              </motion.span>
            ) : (
              <motion.span
                key="spin"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.2 }}
                className="flex motion-safe:animate-spin"
              >
                <CircleNotchIcon className="size-[18px] text-brand" weight="bold" />
              </motion.span>
            )}
          </AnimatePresence>
        </span>
        <span className="text-[14px] leading-none text-[rgba(5,27,32,0.7)]">
          {done ? step.labelDone : step.label}
        </span>
      </div>

      {/* Connector line + reasoning lines typing in one-by-one */}
      <motion.div
        variants={lineGroup}
        initial={instant ? false : "hidden"}
        animate="show"
        className="relative mt-2.5 pl-[26px]"
      >
        <motion.span
          aria-hidden
          variants={connector}
          className="absolute bottom-0 left-[9px] top-0 w-px origin-top rounded-full bg-[rgba(5,27,32,0.2)]"
        />
        <p className="text-[12px] leading-[1.5] text-[rgba(5,27,32,0.5)]">
          {step.lines.map((line, i) => (
            <motion.span key={i} variants={lineItem} className="block">
              {line}
            </motion.span>
          ))}
        </p>
      </motion.div>
    </div>
  );
}

export function HeroAgentPanel({
  play,
  instant,
  className,
}: {
  play: boolean;
  instant: boolean;
  className?: string;
}) {
  const total = AGENT_STEPS.length;

  // Steps 0..activeStep are visible; the one at `activeStep` is in progress,
  // earlier ones are done. instant jumps straight to the settled end.
  const [activeStep, setActiveStep] = useState(instant ? total : 0);

  useEffect(() => {
    if (instant || !play) return;
    const timers = Array.from({ length: total }, (_, i) =>
      setTimeout(() => setActiveStep(i + 1), (i + 1) * AGENT_STEP_MS),
    );
    return () => timers.forEach(clearTimeout);
  }, [instant, play, total]);

  return (
    <div
      className={cn(
        "relative flex flex-col overflow-hidden rounded-[4px] bg-white p-6 shadow-[0px_0px_12px_0px_rgba(0,0,0,0.05)] min-[1440px]:h-full",
        className,
      )}
    >
      {/* Pinned query title — stays put while the reasoning works below it */}
      <p className="shrink-0 text-[16px] font-medium leading-none text-ink-deep">{QUERY}</p>

      {/* Reasoning steps — each expands open in turn */}
      <div className="mt-[18px] flex flex-col gap-4">
        {AGENT_STEPS.map((step, i) =>
          i <= activeStep ? (
            <motion.div
              key={step.id}
              initial={instant ? false : { height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              transition={{ duration: 0.4, ease: EASE }}
              className="overflow-hidden"
            >
              <AgentStep step={step} instant={instant} status={i < activeStep ? "done" : "active"} />
            </motion.div>
          ) : null,
        )}
      </div>
    </div>
  );
}

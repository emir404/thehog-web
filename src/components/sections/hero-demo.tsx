"use client";

import { ArrowClockwiseIcon } from "@phosphor-icons/react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import { type ReactNode, useEffect, useReducer, useRef } from "react";
import { HeroQueryCard } from "@/components/sections/hero-query-card";
import { HeroResults } from "@/components/sections/hero-results";
import {
  EASE,
  HERO_DEMO_DEFAULTS,
  type HeroPhase,
  type ModeTab,
  NEXT_PHASE,
  phaseDuration,
} from "@/lib/hero-demo";
import { cn } from "@/lib/utils";

/**
 * The animated hero island (Figma scenes 151:5 / 158:683 / 158:854). Drives one
 * scripted sequence — idle → submitting → thinking → revealing → done — morphing
 * the query card into the two-panel results. Auto-plays once shortly after the
 * hero scrolls into view, then rests on the results; a Replay control re-runs
 * it. Under reduced motion it starts settled on the results with no animation.
 *
 * Layout is CSS-driven so it is SSR-safe with no breakpoint flash: at ≥1440 the
 * column + demo are absolutely placed on the fixed Figma canvas (header offset
 * already removed) and the card height is CSS-transitioned; below 1440 the same
 * pieces sit in normal flow and the results stack. The badge/headline/CTA are
 * server-rendered and passed in as `children`.
 */

const EASE_CLASS = "ease-[cubic-bezier(0.22,1,0.36,1)]";

type State = { phase: HeroPhase; runId: number; mode: ModeTab };
type Action =
  | { type: "ADVANCE" }
  | { type: "TRIGGER" }
  | { type: "FORCE_DONE" }
  | { type: "SET_MODE"; mode: ModeTab };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "ADVANCE": {
      const next = NEXT_PHASE[state.phase];
      // `done` only schedules an advance when looping → loop back to idle.
      if (!next) return { ...state, phase: "idle", runId: state.runId + 1 };
      // Bump the run id when a fresh run begins so the results remount + replay.
      const runId = state.phase === "idle" ? state.runId + 1 : state.runId;
      return { ...state, phase: next, runId };
    }
    case "TRIGGER":
      return { ...state, phase: "submitting", runId: state.runId + 1 };
    case "FORCE_DONE":
      return { ...state, phase: "done" };
    case "SET_MODE":
      return { ...state, mode: action.mode };
    default:
      return state;
  }
}

export function HeroDemo({
  children,
  autoPlay = HERO_DEMO_DEFAULTS.autoPlay,
  loop = HERO_DEMO_DEFAULTS.loop,
}: {
  children: ReactNode;
  autoPlay?: boolean;
  loop?: boolean;
}) {
  const reduce = useReducedMotion();
  const config = { ...HERO_DEMO_DEFAULTS, autoPlay, loop };

  const [state, dispatch] = useReducer(reducer, { phase: "idle", runId: 0, mode: "Search" });
  const { phase, runId, mode } = state;

  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  // Reduced motion: settle straight onto the results, no auto-play.
  useEffect(() => {
    if (reduce) dispatch({ type: "FORCE_DONE" });
  }, [reduce]);

  // Phase clock: each phase schedules the next after its beat. Idle waits for
  // auto-play + in-view; `done` only advances when looping.
  useEffect(() => {
    if (reduce) return;
    const dur = phaseDuration(phase, config);
    if (dur == null) return;
    if (phase === "idle" && (!config.autoPlay || !inView)) return;
    const t = setTimeout(() => dispatch({ type: "ADVANCE" }), dur);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, runId, reduce, inView, config.autoPlay, config.loop]);

  const collapsed = phase === "submitting" || phase === "thinking";
  const showResults = phase === "revealing" || phase === "done";
  const instant = !!reduce;

  const trigger = () => {
    if (reduce) return; // results already shown; nothing to replay under RM
    dispatch({ type: "TRIGGER" });
  };

  const heightClass = showResults
    ? "min-[1440px]:h-[490px]"
    : collapsed
      ? "min-[1440px]:h-[64px]"
      : "min-[1440px]:h-[140px]";

  const crossfade = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: reduce ? { duration: 0 } : { duration: 0.35, ease: EASE },
  };

  return (
    <>
      {/* Badge + headline + CTA — rises slightly once the sequence starts */}
      <div className="min-[1440px]:absolute min-[1440px]:left-1/2 min-[1440px]:top-[200px] min-[1440px]:-translate-x-1/2">
        <div
          className={cn(
            "transition-transform duration-500",
            EASE_CLASS,
            phase !== "idle" && "min-[1440px]:-translate-y-5",
          )}
        >
          {children}
        </div>
      </div>

      {/* Morphing demo: query card ⇄ two-panel results */}
      <motion.div
        ref={ref}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={reduce ? { duration: 0 } : { duration: 0.5, delay: 0.15, ease: EASE }}
        className="mt-10 w-[min(1000px,calc(100vw-48px))] min-[1440px]:absolute min-[1440px]:left-1/2 min-[1440px]:top-[540px] min-[1440px]:mt-0 min-[1440px]:w-[1000px] min-[1440px]:-translate-x-1/2"
      >
        <div className={cn("relative transition-[height] duration-500", EASE_CLASS, heightClass)}>
          <AnimatePresence initial={false} mode="popLayout">
            {showResults ? (
              <motion.div
                key={`results-${runId}`}
                {...crossfade}
                className="min-[1440px]:absolute min-[1440px]:inset-0"
              >
                <HeroResults instant={instant} />
              </motion.div>
            ) : (
              <motion.div
                key="card"
                {...crossfade}
                className={cn(
                  "transition-[height] duration-500 min-[1440px]:absolute min-[1440px]:inset-x-0 min-[1440px]:top-0",
                  EASE_CLASS,
                  collapsed ? "h-[64px]" : "h-[140px]",
                )}
              >
                <HeroQueryCard
                  collapsed={collapsed}
                  loading={collapsed}
                  activeMode={mode}
                  onModeChange={(m) => dispatch({ type: "SET_MODE", mode: m })}
                  onSubmit={trigger}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Replay — appears once the sequence has settled */}
          {phase === "done" && !reduce ? (
            <motion.button
              type="button"
              onClick={trigger}
              aria-label="Replay demo"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.2, ease: EASE }}
              className="absolute right-3 top-3 z-10 flex items-center gap-1.5 rounded-[4px] bg-white/80 px-2.5 py-1.5 text-[12px] leading-none text-ink/70 shadow-[0px_0px_12px_rgba(0,0,0,0.05)] backdrop-blur-sm outline-none transition-colors hover:text-ink focus-visible:ring-2 focus-visible:ring-brand/50 focus-visible:ring-offset-2"
            >
              <ArrowClockwiseIcon className="size-3.5" weight="bold" />
              Replay
            </motion.button>
          ) : null}
        </div>
      </motion.div>
    </>
  );
}

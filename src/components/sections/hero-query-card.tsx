"use client";

import { ArrowUpIcon, CircleNotchIcon } from "@phosphor-icons/react";
import { AnimatePresence, motion } from "motion/react";
import { MODE_TABS, type ModeTab, QUERY } from "@/lib/hero-demo";
import { cn } from "@/lib/utils";

/**
 * The hero query card for Scenes 1 & 2 (Figma 151:148 / 158:1025). One card,
 * two rest states driven by `collapsed`:
 *   • full (140px)      — query + mode tabs + submit (Scene 1)
 *   • collapsed (64px)  — query + submit only, tabs faded out (Scene 2)
 * It fills its slot (`h-full`); the parent morphs the slot height, so the card
 * just reflows: the query stays pinned top-left, the tabs fade as the card
 * crops, and the submit nudges up to the new vertical center. The query is a
 * scripted, display-only line — submit replays the canned sequence.
 */
export function HeroQueryCard({
  collapsed,
  loading,
  activeMode,
  onModeChange,
  onSubmit,
  className,
}: {
  collapsed: boolean;
  loading: boolean;
  activeMode: ModeTab;
  onModeChange: (mode: ModeTab) => void;
  onSubmit: () => void;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative h-full rounded-[4px] bg-white shadow-[0px_0px_12px_0px_rgba(0,0,0,0.05)]",
        className,
      )}
    >
      {/* Scripted query (display-only) */}
      <p className="absolute inset-x-6 top-6 truncate pr-10 text-[16px] font-medium leading-none text-ink-deep">
        {QUERY}
      </p>

      {/* Mode tabs — present only in the full state; fade/slide out on collapse */}
      <div
        role="tablist"
        aria-label="Query mode"
        aria-hidden={collapsed}
        className={cn(
          "absolute bottom-6 left-6 flex items-center gap-2 rounded-[4px] bg-[#3f4a4d]/10 p-0.5 shadow-[0px_0px_48px_0px_rgba(0,0,0,0.1),inset_0px_0px_4px_0px_#ffffff] transition-[opacity,transform] duration-300",
          collapsed
            ? "pointer-events-none translate-y-2 opacity-0"
            : "translate-y-0 opacity-100",
        )}
      >
        {MODE_TABS.map((tab) => (
          <button
            key={tab}
            type="button"
            role="tab"
            aria-selected={tab === activeMode}
            tabIndex={collapsed ? -1 : 0}
            onClick={() => onModeChange(tab)}
            className={cn(
              "rounded-[2px] px-3.5 py-2.5 text-[12px] leading-none transition-colors",
              tab === activeMode
                ? "bg-white/95 text-[#1e2526] shadow-[0px_1px_12px_0px_rgba(0,117,145,0.25)]"
                : "text-ink-deep/75 hover:text-ink-deep",
            )}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Submit / replay — nudges to the vertical center as the card collapses */}
      <button
        type="button"
        aria-label="Run query"
        onClick={onSubmit}
        className={cn(
          "absolute right-6 flex size-9 items-center justify-center overflow-hidden rounded-[4px] bg-brand/75 p-0.5 shadow-[0px_0px_48px_0px_rgba(0,0,0,0.1),inset_0px_0px_4px_0px_rgba(255,255,255,0.55)] outline-none transition-[background-color,bottom,scale] duration-300 before:absolute before:-inset-1 before:content-[''] hover:bg-brand/90 focus-visible:ring-2 focus-visible:ring-brand/50 focus-visible:ring-offset-2 active:scale-[0.96]",
          collapsed ? "bottom-[14px]" : "bottom-6",
        )}
      >
        <AnimatePresence mode="wait" initial={false}>
          {loading ? (
            <motion.span
              key="spin"
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              transition={{ duration: 0.2 }}
              className="flex motion-safe:animate-spin"
            >
              <CircleNotchIcon className="size-5 text-white" weight="bold" />
            </motion.span>
          ) : (
            <motion.span
              key="arrow"
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              transition={{ duration: 0.2 }}
              className="flex"
            >
              <ArrowUpIcon className="size-5 text-white" weight="bold" />
            </motion.span>
          )}
        </AnimatePresence>
      </button>
    </div>
  );
}

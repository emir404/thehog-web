"use client";

import { AnimatePresence, motion, type Variants } from "motion/react";
import { useState } from "react";
import {
  EASE,
  JSON_TONE_CLASS,
  OUTPUT_JSON,
  OUTPUT_TABS,
  type OutputTab,
} from "@/lib/hero-demo";
import { cn } from "@/lib/utils";

/**
 * Scene-3 right panel (Figma 158:1042): the structured OUTPUT. It stays on
 * screen the whole time, but `reveal` gates the result — while the agent is
 * still reasoning the body shows a code-shaped loading skeleton, and only once
 * reasoning is done does the JSON stream in line-by-line. `instant` (reduced
 * motion) shows the final frame immediately.
 */

/** One-liners for the non-Structured tabs so they read as real views. */
const TAB_SUMMARY: Record<Exclude<OutputTab, "Structured">, string> = {
  Results: "47 companies scanned · 12 hiring · 9 verified leads",
  Answer:
    "12 of 47 Series B AI companies are actively hiring growth leaders. Brightwave AI is the strongest match — VP Growth, posted 6 days ago.",
  Sources: "techcrunch.com · linkedin.com · crunchbase.com · + 9 more",
};

/** Blinking text cursor. CSS-driven so it stills itself under reduced motion. */
function Caret() {
  return (
    <span
      aria-hidden
      className="ml-0.5 inline-block h-[14px] w-px translate-y-[2px] animate-caret-blink bg-[rgba(5,27,32,0.6)] align-middle motion-reduce:animate-none"
    />
  );
}

/** Code-shaped placeholder shown while the agent is still reasoning — mirrors
 *  the shape of the JSON that will replace it. */
function OutputSkeleton() {
  const rows = [
    { w: "34%", indent: false },
    { w: "82%", indent: true },
    { w: "68%", indent: true },
    { w: "88%", indent: true },
    { w: "72%", indent: true },
    { w: "84%", indent: true },
    { w: "60%", indent: true },
    { w: "78%", indent: true },
    { w: "18%", indent: false },
  ];
  return (
    <div aria-hidden className="flex flex-col gap-3.5 motion-safe:animate-pulse">
      {rows.map((row, i) => (
        <div
          key={i}
          className={cn("h-3 rounded-[2px] bg-[rgba(5,27,32,0.06)]", row.indent && "ml-4")}
          style={{ width: row.w }}
        />
      ))}
    </div>
  );
}

const jsonContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};
const jsonLine: Variants = {
  hidden: { opacity: 0, y: 4 },
  show: { opacity: 1, y: 0, transition: { duration: 0.25, ease: EASE } },
};

function StructuredOutput({ instant }: { instant: boolean }) {
  return (
    <motion.div
      variants={jsonContainer}
      initial={instant ? false : "hidden"}
      animate="show"
      className="whitespace-pre-wrap break-words font-mono text-[14px] leading-[1.5]"
    >
      {OUTPUT_JSON.map((line, i) => (
        <motion.span key={i} variants={jsonLine} className="block">
          {line.map((token, j) => (
            <span key={j} className={JSON_TONE_CLASS[token.tone ?? "plain"]}>
              {token.text}
            </span>
          ))}
          {i === OUTPUT_JSON.length - 1 ? <Caret /> : null}
        </motion.span>
      ))}
    </motion.div>
  );
}

export function HeroOutputPanel({
  reveal,
  instant,
  className,
}: {
  reveal: boolean;
  instant: boolean;
  className?: string;
}) {
  const [active, setActive] = useState<OutputTab>("Structured");

  const showJson = active === "Structured" && (reveal || instant);
  const bodyKey = active === "Structured" ? (showJson ? "json" : "loading") : active;

  return (
    <div
      className={cn(
        "flex h-full flex-col overflow-hidden rounded-[4px] bg-[#f5f5f4] p-6 shadow-[0px_0px_12px_0px_rgba(0,0,0,0.05)]",
        className,
      )}
    >
      <span className="font-mono text-[12px] leading-none text-[rgba(5,27,32,0.8)]">OUTPUT</span>

      {/* Output tabs */}
      <div
        role="tablist"
        aria-label="Output view"
        className="mt-3 inline-flex items-center gap-1 self-start rounded-[4px] bg-[#3f4a4d]/10 p-0.5 shadow-[0px_0px_48px_0px_rgba(0,0,0,0.1),inset_0px_0px_4px_0px_#ffffff]"
      >
        {OUTPUT_TABS.map((tab) => (
          <button
            key={tab}
            type="button"
            role="tab"
            aria-selected={tab === active}
            onClick={() => setActive(tab)}
            className={cn(
              "rounded-[2px] px-3.5 py-2.5 text-[12px] leading-none transition-colors",
              tab === active
                ? "bg-white/95 text-[#242221] shadow-[0px_1px_12px_0px_rgba(0,0,0,0.1)]"
                : "text-[rgba(5,27,32,0.75)] hover:text-ink-deep",
            )}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Body */}
      <div className="relative mt-5 flex-1 overflow-hidden">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={bodyKey}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={instant ? { duration: 0 } : { duration: 0.25, ease: EASE }}
            className="absolute inset-0"
          >
            {active === "Structured" ? (
              showJson ? (
                <StructuredOutput instant={instant} />
              ) : (
                <OutputSkeleton />
              )
            ) : (
              <p className="max-w-[460px] text-[14px] leading-[1.5] text-[rgba(5,27,32,0.7)]">
                {TAB_SUMMARY[active]}
              </p>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

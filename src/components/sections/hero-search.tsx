"use client";

import { ArrowUpIcon } from "@phosphor-icons/react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const TABS = ["Search", "Enrich", "Monitor", "Extract"] as const;
type Tab = (typeof TABS)[number];

/**
 * Hero query bar (Figma node 119:151): a white card with a free-text query,
 * a mode switcher, and a submit control. Purely demonstrative for now — the
 * submit isn't wired to anything yet.
 */
export function HeroSearch({ className }: { className?: string }) {
  const [active, setActive] = useState<Tab>("Search");

  return (
    <div
      className={cn(
        "relative h-[140px] rounded-[4px] bg-white shadow-[0px_0px_12px_0px_rgba(0,0,0,0.05)]",
        className,
      )}
    >
      <input
        type="text"
        aria-label="Describe what to find on the web"
        placeholder="Series B AI companies hiring growth leaders"
        className="absolute inset-x-6 top-6 appearance-none bg-transparent text-[16px] font-medium leading-none text-ink-deep outline-none placeholder:text-ink-deep"
      />

      <div
        role="tablist"
        aria-label="Query mode"
        className="absolute bottom-6 left-6 flex items-center gap-2 rounded-[4px] bg-[#4d443f]/10 p-0.5 shadow-[0px_0px_48px_0px_rgba(0,0,0,0.1),inset_0px_0px_4px_0px_#ffffff]"
      >
        {TABS.map((tab) => (
          <button
            key={tab}
            type="button"
            role="tab"
            aria-selected={tab === active}
            onClick={() => setActive(tab)}
            className={cn(
              "rounded-[2px] px-3.5 py-2.5 text-[12px] leading-none text-ink-deep/75 transition-colors",
              tab === active
                ? "rounded-[2px] bg-white/95 text-[#242221] shadow-[0px_1px_12px_0px_rgba(238,96,25,0.25)]"
                : "hover:text-ink-deep",
            )}
          >
            {tab}
          </button>
        ))}
      </div>

      <button
        type="button"
        aria-label="Run query"
        className="absolute bottom-6 right-6 flex size-9 items-center justify-center rounded-[4px] bg-brand/75 p-0.5 shadow-[0px_0px_48px_0px_rgba(0,0,0,0.1),inset_0px_0px_4px_0px_rgba(255,255,255,0.55)] transition-[background-color,scale] before:absolute before:-inset-1 before:content-[''] hover:bg-brand/90 active:scale-[0.96]"
      >
        <ArrowUpIcon className="size-6 text-white" />
      </button>
    </div>
  );
}

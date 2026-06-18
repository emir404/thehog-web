"use client";

import { useEffect, useState } from "react";
import { HeroAgentPanel } from "@/components/sections/hero-agent-panel";
import { HeroOutputPanel } from "@/components/sections/hero-output-panel";
import { AGENT_STEP_MS, AGENT_STEPS } from "@/lib/hero-demo";
import { cn } from "@/lib/utils";

/**
 * Scene-3 results (Figma 158:1041): the agent reasoning panel and the OUTPUT
 * panel, side by side at ≥1440 (agent 425, output fills) and stacked below. Both
 * are visible the whole time — but the OUTPUT only streams its JSON once every
 * reasoning step has finished (a loading skeleton holds the space until then).
 * `instant` settles both immediately (reduced motion). Mount keyed by run id so
 * each replay re-runs from scratch.
 */
export function HeroResults({
  instant,
  className,
}: {
  instant: boolean;
  className?: string;
}) {
  const [reasoningDone, setReasoningDone] = useState(false);
  const revealOutput = instant || reasoningDone;

  useEffect(() => {
    if (instant) return;
    const t = setTimeout(() => setReasoningDone(true), AGENT_STEPS.length * AGENT_STEP_MS + 150);
    return () => clearTimeout(t);
  }, [instant]);

  return (
    <div
      className={cn(
        "flex h-full flex-col gap-3 min-[1440px]:flex-row min-[1440px]:gap-0",
        className,
      )}
    >
      <HeroAgentPanel
        play={!instant}
        instant={instant}
        className="min-[1440px]:w-[425px] min-[1440px]:shrink-0 min-[1440px]:rounded-r-none"
      />
      <HeroOutputPanel
        reveal={revealOutput}
        instant={instant}
        className="min-[1440px]:flex-1 min-[1440px]:rounded-l-none"
      />
    </div>
  );
}

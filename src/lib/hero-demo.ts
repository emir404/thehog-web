import type { Icon } from "@phosphor-icons/react";
import {
  ClipboardTextIcon,
  FileDocIcon,
  GlobeHemisphereWestIcon,
} from "@phosphor-icons/react";

/**
 * Content + tuning for the animated hero demo (Figma scenes 151:5 / 158:683 /
 * 158:854). The three frames are keyframes of ONE scripted sequence; everything
 * here is the canned demo data and the timing/easing knobs that drive it. Keep
 * Figma px and copy in this single module so the components stay presentational.
 */

/* ─────────────────────────────── Phases ──────────────────────────────────── */

export type HeroPhase = "idle" | "submitting" | "thinking" | "revealing" | "done";

/** Linear advance order of the auto-play sequence. `done` is terminal. */
export const NEXT_PHASE: Record<HeroPhase, HeroPhase | null> = {
  idle: "submitting",
  submitting: "thinking",
  thinking: "revealing",
  revealing: "done",
  done: null,
};

export type HeroDemoConfig = {
  /** Auto-run the sequence shortly after mount (once). */
  autoPlay: boolean;
  /** Loop back to idle after resting on the results. */
  loop: boolean;
  /** Beat (ms) the idle scene holds before auto-play kicks in. */
  startDelay: number;
  /** Duration (ms) of each transient phase. */
  submittingMs: number;
  thinkingMs: number;
  revealingMs: number;
  /** Hold (ms) on the results before looping (only when `loop`). */
  loopHoldMs: number;
};

export const HERO_DEMO_DEFAULTS: HeroDemoConfig = {
  autoPlay: true,
  loop: false,
  startDelay: 1200,
  submittingMs: 480,
  thinkingMs: 900,
  revealingMs: 5200,
  loopHoldMs: 4000,
};

/** Reasoning-log cadence: each step is worked in turn — its in-progress label +
 *  spinner appear, the reasoning lines type in, then it resolves to its done
 *  label + glyph and the next step begins. The structured OUTPUT only starts
 *  once every step has finished (reasoning, then results). */
export const AGENT_STEP_MS = 1300;
/** Stagger (s) between reasoning lines typing in within a step. */
export const AGENT_LINE_STAGGER = 0.12;

/** How long phase N waits before advancing to NEXT_PHASE[N]. */
export function phaseDuration(phase: HeroPhase, c: HeroDemoConfig): number | null {
  switch (phase) {
    case "idle":
      return c.startDelay;
    case "submitting":
      return c.submittingMs;
    case "thinking":
      return c.thinkingMs;
    case "revealing":
      return c.revealingMs;
    case "done":
      return c.loop ? c.loopHoldMs : null;
  }
}

/* ─────────────────────────────── Motion ──────────────────────────────────── */

/** The house easing used across the page (matches FadeIn). */
export const EASE = [0.22, 1, 0.36, 1] as const;
/** Confident, lightly springy morph for the card collapse/expand + headline. */
export const CARD_SPRING = { type: "spring", stiffness: 260, damping: 30 } as const;

/** Card heights per scene (px), lifted from Figma. */
export const CARD_HEIGHT = { full: 140, collapsed: 64, results: 420 } as const;

/* ─────────────────────────────── Copy ────────────────────────────────────── */

export const QUERY = "Series B AI companies hiring growth leaders";
export const MODE_TABS = ["Search", "Enrich", "Monitor", "Extract"] as const;
export type ModeTab = (typeof MODE_TABS)[number];
export const OUTPUT_TABS = ["Results", "Answer", "Sources", "Structured"] as const;
export type OutputTab = (typeof OUTPUT_TABS)[number];

/** Scene-3 reasoning steps (Figma 158:1054). `label` is the in-progress form,
 *  `labelDone` the resolved form; `lines` keep their break points. */
export type AgentStepData = {
  id: string;
  icon: Icon;
  label: string;
  labelDone: string;
  lines: string[];
};

export const AGENT_STEPS: AgentStepData[] = [
  {
    id: "sources",
    icon: GlobeHemisphereWestIcon,
    label: "Visiting 12 sources",
    labelDone: "Visited 12 sources",
    lines: [
      "Pulled 47 AI companies with Series B funding in last 18mo.",
      "Cross-referenced open roles: VP Growth, Head of Growth, GTM lead.",
      "Filtered to 12 with active growth listings.",
      "Enriched each: funding, headcount, role, recency.",
      "Ranked by hiring signal strength and freshness.",
    ],
  },
  {
    id: "validating",
    icon: ClipboardTextIcon,
    label: "Validating information",
    labelDone: "Validated information",
    lines: [
      "Confirmed all 9 roles are active and unfilled.",
      "Cross-checked funding stage against two sources each.",
      "Flagged 1 stale listing, re-verified before including.",
      "Confidence: 0.94 across 9 leads.",
    ],
  },
  {
    id: "report",
    icon: FileDocIcon,
    label: "Creating the report",
    labelDone: "Created the report",
    lines: [
      "Merged 9 verified leads into a single object.",
      "Normalized fields across all sources.",
      "Attached source and timestamp to every value.",
      "Ranked by hiring signal strength.",
    ],
  },
];

/* ─────────────────────────── Structured output ───────────────────────────── */

/** A coloured JSON token. `tone` maps to a syntax colour in the panel. */
export type JsonToken = { text: string; tone?: "key" | "str" };

/** The OUTPUT panel's JSON, line by line (Figma 158:1053). */
export const OUTPUT_JSON: JsonToken[][] = [
  [{ text: '"content"', tone: "key" }, { text: ": {" }],
  [
    { text: "  " },
    { text: '"companies_found"', tone: "key" },
    { text: ": " },
    { text: '"47 Series B AI companies funded in the last 18 months"', tone: "str" },
    { text: "," },
  ],
  [
    { text: "  " },
    { text: '"actively_hiring"', tone: "key" },
    { text: ": " },
    { text: '"12 with open VP/Head of Growth roles"', tone: "str" },
    { text: "," },
  ],
  [
    { text: "  " },
    { text: '"top_match"', tone: "key" },
    { text: ": " },
    { text: '"Brightwave AI — VP Growth, posted 6 days ago"', tone: "str" },
    { text: "," },
  ],
  [
    { text: "  " },
    { text: '"hiring_signal"', tone: "key" },
    { text: ": " },
    { text: '"Growth-role postings up 38% across the cohort this quarter"', tone: "str" },
    { text: "," },
  ],
  [
    { text: "  " },
    { text: '"verified_contacts"', tone: "key" },
    { text: ": " },
    { text: '"9 named decision-makers resolved and confirmed"', tone: "str" },
    { text: "," },
  ],
  [
    { text: "  " },
    { text: '"confidence"', tone: "key" },
    { text: ": " },
    { text: '"0.94 across 9 ranked leads"', tone: "str" },
  ],
  [{ text: "}" }],
];

/** Syntax colours (Figma): keys orange, string values green, default ink. */
export const JSON_TONE_CLASS: Record<NonNullable<JsonToken["tone"]> | "plain", string> = {
  key: "text-[#b94e1b]",
  str: "text-[#3f7f13]",
  plain: "text-[rgba(5,27,32,0.8)]",
};

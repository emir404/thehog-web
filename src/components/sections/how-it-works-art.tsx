"use client";

import {
  CaretDownIcon,
  FileIcon,
  GlobeIcon,
  ImageIcon,
  PlusIcon,
  XIcon,
} from "@phosphor-icons/react";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

/**
 * The three "How it works" card illustrations (Figma nodes 135:525 / 135:550 /
 * 135:569). Each is a glassy UI mockup reproduced 1:1: panels are 453px wide and
 * left-anchored inside the ~320px card content area, so they overflow to the
 * right and are clipped by the card — the signature "peek". Motion is kept
 * subtle and ambient (caret blink, slow JSON drift, active-tab glow) and folds
 * back to the static frame under `prefers-reduced-motion`.
 */

// Glassy floating panel: faint white fill + soft outer shadow + inner white glow.
const GLASS =
  "rounded-[4px] bg-white/10 shadow-[0px_0px_48px_0px_rgba(0,0,0,0.1),inset_0px_0px_4px_0px_#ffffff]";
// Same recipe, softer inner glow — used by the segmented tab control.
const GLASS_TAB =
  "rounded-[4px] bg-white/10 shadow-[0px_0px_48px_0px_rgba(0,0,0,0.1),inset_0px_0px_4px_0px_rgba(255,255,255,0.55)]";

/** Blinking text cursor. CSS-driven so it stills itself under reduced motion. */
function Caret() {
  return (
    <span
      aria-hidden
      className="ml-px inline-block h-[15px] w-px translate-y-[2px] animate-caret-blink bg-white/90 align-middle motion-reduce:animate-none"
    />
  );
}

/* ───────────────────────────── 01 · Ask for context ─────────────────────── */

export function AskForContextArt() {
  const reduce = useReducedMotion();

  return (
    <div className="absolute left-8 top-[94px] flex w-[453px] flex-col gap-3">
      {/* Segmented control */}
      <div className={cn("relative flex items-center gap-2 self-center p-0.5", GLASS_TAB)}>
        <div className="relative rounded-[2px] bg-white/95 px-3.5 py-2.5 shadow-[0px_1px_12px_0px_rgba(0,0,0,0.1)]">
          <motion.span
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-[2px] shadow-[0px_0px_12px_2px_rgba(255,255,255,0.45)]"
            animate={reduce ? { opacity: 0.5 } : { opacity: [0.35, 0.7, 0.35] }}
            transition={reduce ? { duration: 0 } : { duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
          />
          <span className="relative text-[12px] leading-none text-[#1e2526]">Research</span>
        </div>
        <span className="px-3.5 py-2.5 text-[12px] leading-none text-white/75">Monitor</span>
        <span className="px-3.5 py-2.5 text-[12px] leading-none text-white/75">Extract</span>
      </div>

      {/* Query field */}
      <div className={cn("relative h-[88px] w-full", GLASS)}>
        <span className="absolute left-1 top-1 px-5 py-2.5 text-[14px] leading-none text-white/75">
          Query
        </span>
        <div className={cn("absolute inset-x-1 top-[38px] flex h-[46px] items-center overflow-hidden p-4", GLASS)}>
          <span className="whitespace-nowrap text-[14px] leading-none text-white">
            Series B AI companies{" "}
            <span className="box-decoration-clone bg-brand/10 px-0.5 py-1 text-white">
              hiring growth leaders
            </span>
            <Caret />
          </span>
        </div>
      </div>

      {/* Find / output */}
      <div className={cn("w-full p-1", GLASS)}>
        <span className="block px-5 py-2.5 text-[14px] leading-none text-white/75">Find</span>
        <div className={cn("overflow-hidden p-4", GLASS)}>
          <code className="block whitespace-pre font-mono text-[14px] leading-[1.4] text-white">
            <span className="text-white/70">{`{`}</span>
            {`\n  “companies”`}
            <span className="text-white/70">,</span>
            {`\n  “decision_makers”`}
            <span className="text-white/70">,</span>
            {`\n`}
            <span className="text-white/70">{`}`}</span>
          </code>
        </div>
      </div>
    </div>
  );
}

/* ──────────────────────── 02 · Get structured intelligence ───────────────── */

export function StructuredIntelligenceArt() {
  const reduce = useReducedMotion();

  return (
    <div className="absolute left-8 top-[94px] h-[302px] w-[453px]">
      {/* Sources status */}
      <div className="absolute left-0 top-0 flex items-center gap-2">
        <GlobeIcon size={18} className="text-white/75" />
        <span className="text-[14px] leading-none text-white/75">Visited 23 sources</span>
      </div>

      {/* Summary panel */}
      <div className={cn("absolute left-0 top-[41px] flex h-[122px] w-full items-center px-6", GLASS)}>
        <p className="w-[504px] text-[14px] leading-[1.5] text-white/90">
          Resolved one company across 23 live sources and returned a single structured object:
          funding, headcount, hiring, news, and sentiment, each ranked by relevance, tagged with
          where it came from and how fresh it is. One call, ready to drop into an agent.
        </p>
      </div>

      {/* Result panel — long JSON, slowly drifting */}
      <div className={cn("absolute left-0 top-[175px] h-[474px] w-full overflow-hidden", GLASS)}>
        <div className="absolute left-5 top-[19px] z-10 flex items-center gap-3">
          <span className="text-[14px] leading-none text-white">Result</span>
          <span className="rounded-[1px] bg-white/10 p-1.5 text-[12px] leading-none text-white">
            JSON
          </span>
        </div>
        <div className="absolute inset-x-5 bottom-0 top-12 overflow-hidden">
          <motion.pre
            className="m-0 whitespace-pre font-mono text-[14px] leading-[1.5] text-white/90"
            animate={reduce ? { y: 0 } : { y: [0, -140] }}
            transition={
              reduce
                ? { duration: 0 }
                : { duration: 18, repeat: Infinity, repeatType: "reverse", ease: "linear" }
            }
          >
            <span className="text-white/50">{`{`}</span>
            {`\n   `}
            <span className="text-white/80">{`"entity"`}</span>
            {`: `}
            <span className="text-[#f8b08c]">{`"Brightwave AI"`}</span>
            {`,\n   "domain": `}
            <span className="text-[#f8b08c]">{`"brightwave.ai"`}</span>
            {`,\n   "resolved": `}
            <span className="text-[#bc8cf8]">true</span>
            {`,\n   "confidence": `}
            <span className="text-[rgba(170,233,246,0.9)]">0.97</span>
            {`,
   "as_of":"2026-06-04T11:02Z",
   "sources":23,
   "signals":[
      {
         "type":"funding",
         "value":"Series B, $80M",
         "rank":1,
         "source":"techcrunch.com",
         "age":"3d"
      },
      {
         "type":"headcount",
         "value":412,
         "change":"+14% QoQ",
         "rank":2,
         "source":"linkedin.com",
         "age":"live"
      },
      {
         "type":"hiring",
         "value":"7 open AI eng roles",
         "rank":3,
         "source":"brightwave.ai/careers",
         "age":"1d"
      },
      {
         "type":"news",
         "value":"Launched EU data region",
         "rank":4,
         "source":"brightwave.ai/blog",
         "age":"6h"
      },
      {
         "type":"sentiment",
         "value":"positive",
         "score":0.82,
         "rank":5,
         "source":"social",
         "age":"24h"
      }
   ],
   "people":[
      {
         "name":"Dana Holt",
         "role":"VP Engineering",
         "linked":true
      }
   ]
}`}
          </motion.pre>
        </div>
      </div>
    </div>
  );
}

/* ───────────────────────────── 03 · Power the next action ────────────────── */

export function PowerNextActionArt() {
  return (
    <div className={cn("absolute left-8 top-[175px] h-[131px] w-[453px]", GLASS)}>
      {/* Attachment chip */}
      <div className="absolute left-5 top-4 flex items-center gap-2.5 rounded-[1px] bg-brand/10 p-1.5">
        <span className="inline-flex items-center gap-1">
          <FileIcon size={12} className="text-[#f19b70]" />
          <span className="text-[12px] leading-none text-[#f19b70]">result.json</span>
        </span>
        <XIcon size={10} className="text-white/50" />
      </div>

      {/* Prompt */}
      <div className="absolute left-5 top-[57px] flex items-center whitespace-nowrap text-[14px] leading-none text-white">
        Based on the attachment create me a .XLSX file showing our
        <Caret />
      </div>

      {/* Toolbar */}
      <div className="absolute bottom-4 left-5 flex items-center gap-1">
        <span className="flex items-center justify-center rounded-[1px] bg-white/10 p-1.5">
          <PlusIcon size={16} className="text-white/75" />
        </span>
        <span className="flex items-center justify-center rounded-[1px] bg-white/10 p-1.5">
          <GlobeIcon size={16} className="text-white/75" />
        </span>
        <span className="flex items-center justify-center gap-2 rounded-[1px] bg-white/10 p-1.5">
          <ImageIcon size={16} className="text-white/75" />
          <CaretDownIcon size={10} className="text-white/75" />
        </span>
      </div>
    </div>
  );
}

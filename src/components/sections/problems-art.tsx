"use client";

/* eslint-disable @next/next/no-img-element */
import { motion, useReducedMotion } from "motion/react";
import { useRef, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * The two "Problems" illustrations (Figma nodes 135:234 / 135:1408).
 *
 * - `ScatterArt` — a draggable canvas: website-screenshot thumbnails + six white
 *   category cards scattered over an area larger than the panel, so the user can
 *   pan it and feel how context is spread everywhere.
 * - `LayersArt` — an isometric stack of decaying data layers: a fresh "SIGNAL"
 *   tile on top, fading into darker stale layers, annotated with a time bracket
 *   and freshness callouts. Layers bob in a staggered wave; the green "live"
 *   badge pulses.
 *
 * Both fold back to a static frame under `prefers-reduced-motion`.
 */

/* ─────────────────────────── 01 · Context is scattered ──────────────────────
   Positions are the Figma node-135:234 coordinates shifted by (PAD_X, PAD_Y)
   into a positive canvas larger than the 707×900 panel. At rest the panel frames
   the original Figma composition; dragging reveals the rest. */

const PAD_X = 150;
const PAD_Y = 110;
const CANVAS_W = 1160;
const CANVAS_H = 1200;

type Thumb = { src: string; x: number; y: number; w: number; h: number; o: number };
const THUMBS: Thumb[] = [
  { src: "/problems/thumb-01.png", x: 302.67, y: 134, w: 181.7, h: 121, o: 0.68 },
  { src: "/problems/thumb-02.png", x: 225.17, y: 870.72, w: 172.69, h: 115, o: 0.63 },
  { src: "/problems/thumb-03.png", x: 788.67, y: 382.49, w: 163.68, h: 109, o: 0.57 },
  { src: "/problems/thumb-04.png", x: 55, y: 372.52, w: 154.67, h: 103, o: 0.53 },
  { src: "/problems/thumb-05.png", x: 583.73, y: 869.58, w: 145.66, h: 97, o: 0.48 },
  { src: "/problems/thumb-06.png", x: 534.84, y: 185.23, w: 136.65, h: 91, o: 0.43 },
  { src: "/problems/thumb-07.png", x: 145.56, y: 697.26, w: 127.64, h: 85, o: 0.38 },
  { src: "/problems/thumb-08.png", x: 719.9, y: 596.8, w: 118.63, h: 79, o: 0.33 },
  { src: "/problems/thumb-09.png", x: 306.59, y: 346.67, w: 109.62, h: 73, o: 0.28 },
  { src: "/problems/thumb-10.png", x: 427.32, y: 678.47, w: 100.61, h: 67, o: 0.23 },
  // Extras at the canvas edges so dragging keeps revealing scattered context.
  { src: "/problems/thumb-06.png", x: 980, y: 170, w: 130, h: 87, o: 0.22 },
  { src: "/problems/thumb-09.png", x: 985, y: 740, w: 120, h: 80, o: 0.2 },
  { src: "/problems/thumb-07.png", x: 80, y: 1000, w: 150, h: 100, o: 0.26 },
  { src: "/problems/thumb-03.png", x: 500, y: 1030, w: 140, h: 93, o: 0.18 },
];

type Cat = { label: string; icon: string; x: number; y: number; size: number; o: number };
// The six category cards reuse the brand glyphs already in /public/features.
const CATS: Cat[] = [
  { label: "WEB", icon: "/features/signal-web.svg", x: 758.96, y: 720.72, size: 114.3, o: 0.73 },
  { label: "SENTIMENT", icon: "/features/signal-sentiment.svg", x: 81.48, y: 576.74, size: 119.7, o: 0.78 },
  { label: "NEWS", icon: "/features/signal-news.svg", x: 634.19, y: 248.93, size: 125.1, o: 0.83 },
  { label: "SOCIAL", icon: "/features/signal-social.svg", x: 455.66, y: 798.05, size: 130.5, o: 0.88 },
  { label: "COMPANY", icon: "/features/signal-company.svg", x: 255.62, y: 348.47, size: 135.9, o: 0.93 },
  { label: "PEOPLE", icon: "/features/signal-people.svg", x: 564.06, y: 503.29, size: 141.3, o: 0.98 },
];

/**
 * Drag-to-pan scatter canvas. `panY` lets vertical touch-scroll pass through
 * (used in the contained mobile panel) instead of trapping it.
 */
export function ScatterArt({ panY = false }: { panY?: boolean }) {
  const reduce = useReducedMotion();
  const viewportRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={viewportRef}
      className={cn(
        "relative h-full w-full cursor-grab overflow-hidden active:cursor-grabbing",
        panY ? "touch-pan-y" : "touch-none",
      )}
    >
      <motion.div
        className="absolute left-0 top-0"
        style={{ width: CANVAS_W, height: CANVAS_H }}
        drag
        dragConstraints={viewportRef}
        dragElastic={0.12}
        dragTransition={reduce ? { power: 0 } : { power: 0.25, timeConstant: 220 }}
        initial={{ x: -PAD_X, y: -PAD_Y }}
      >
        {THUMBS.map((t, i) => (
          <img
            key={`t${i}`}
            src={t.src}
            alt=""
            draggable={false}
            className="pointer-events-none absolute select-none rounded-[6px]"
            style={{ left: t.x, top: t.y, width: t.w, height: t.h, opacity: t.o }}
          />
        ))}
        {CATS.map((c) => (
          <div
            key={c.label}
            className="absolute flex select-none flex-col items-center justify-center gap-2.5 rounded-[5.76px] bg-white shadow-[0px_0px_17.28px_0px_rgba(0,0,0,0.05)]"
            style={{ left: c.x, top: c.y, width: c.size, height: c.size, opacity: c.o }}
          >
            <img src={c.icon} alt="" draggable={false} className="size-[60px]" />
            <span className="font-mono text-[17px] font-medium leading-none tracking-[-0.35px] text-ink-deep">
              {c.label}
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

/* ─────────────────────────── 02 · Freshness breaks fast ─────────────────────
   Rendered at the Figma 707×900 size; the parent scales it to fit smaller
   panels. Isometric transform + 88px layer spacing are taken verbatim from the
   design so the stack matches exactly. */

const ISO = "rotate(-30deg) skewX(30deg) scaleY(0.87)";

type Layer = { fill: string; offset: number; z: number; signal?: boolean };
// Top → bottom: a fresh white SIGNAL tile decaying into darker stale layers.
const LAYERS: Layer[] = [
  { fill: "#ffffff", offset: -220, z: 25, signal: true },
  { fill: "#4e6064", offset: -132, z: 24 },
  { fill: "#435256", offset: -44, z: 23 },
  { fill: "#384447", offset: 44, z: 22 },
  { fill: "#2d3739", offset: 132, z: 21 },
  { fill: "#22292b", offset: 220, z: 20 },
];

const BADGE =
  "absolute z-[40] inline-flex h-[30px] items-center rounded-[2px] px-2 py-1.5 font-mono text-[14px] font-medium leading-none tracking-[-0.28px]";

export function LayersArt() {
  const reduce = useReducedMotion();
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div className="relative isolate h-[900px] w-[707px]">
      {/* Time bracket + freshness connectors */}
      <svg
        viewBox="0 0 707 900"
        fill="none"
        className="pointer-events-none absolute inset-0 h-full w-full"
        aria-hidden
      >
        {/* Time bracket [ — Figma vector 135:1439 */}
        <path
          d="M189 183 H142 V717 H189"
          stroke="#ffffff"
          strokeOpacity="0.5"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeDasharray="8 8"
        />
        {/* Tile → "SIGNAL GETS LIVE" (135:1427) */}
        <path d="M523 230 H569 V152" stroke="#22C55E" strokeOpacity="0.3" strokeWidth="1.5" strokeLinecap="round" />
        {/* Layer → "30%" (135:1428) */}
        <path d="M523 493.5 H569" stroke="#F97316" strokeOpacity="0.3" strokeWidth="1.5" strokeLinecap="round" />
        {/* Bottom layer → "10%" / "YOUR AGENT ACTS HERE" (135:1429) */}
        <path d="M569 692.5 H523 V734.5" stroke="#EF4444" strokeOpacity="0.25" strokeWidth="2" strokeLinecap="round" />
      </svg>

      {/* Elapsed-time label, running up the bracket (135:1434) */}
      <span className="absolute left-[113px] top-1/2 z-[40] -translate-x-1/2 -translate-y-1/2 -rotate-90 whitespace-nowrap font-mono text-[14px] font-medium tracking-[-0.28px] text-white/70">
        21 HOURS 35 MINUTES
      </span>

      {/* Isometric stack — hover a diamond to lift + highlight it (135:1410–1425) */}
      {LAYERS.map((l, i) => {
        const isHovered = hovered === i;
        const dimmed = hovered !== null && !isHovered;
        return (
          <div
            key={i}
            className="absolute left-1/2 top-1/2"
            style={{ zIndex: isHovered ? 30 : l.z }}
          >
            {/* Visual — lifts on hover, bobs otherwise. pointer-events are off so
                the static hit area below owns hover detection (no flicker). */}
            <motion.div
              className="pointer-events-none absolute size-[180px]"
              style={{ left: -90, top: -90 + l.offset }}
              animate={
                isHovered
                  ? reduce
                    ? { y: 0, scale: 1 }
                    : { y: -16, scale: 1.05 }
                  : reduce
                    ? { y: 0, scale: 1 }
                    : { y: [0, -6, 0], scale: 1 }
              }
              transition={
                isHovered
                  ? { type: "spring", stiffness: 300, damping: 24 }
                  : reduce
                    ? { duration: 0 }
                    : { duration: 4, repeat: Infinity, ease: "easeInOut", delay: i * 0.18 }
              }
            >
              <motion.div
                className="relative size-full overflow-hidden rounded-[7.3px]"
                style={{ transform: ISO, backgroundColor: l.fill }}
                animate={{
                  opacity: dimmed ? 0.4 : 0.98,
                  boxShadow: isHovered
                    ? "0px 18px 44px 0px rgba(0,0,0,0.4)"
                    : "0px 0px 22px 0px rgba(0,0,0,0.05)",
                }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                {l.signal && (
                  <>
                    <img
                      src="/problems/hog-mark.svg"
                      alt=""
                      className="absolute left-1/2 top-[calc(50%-16px)] size-[103px] -translate-x-1/2 -translate-y-1/2"
                    />
                    <span className="absolute bottom-[18px] left-1/2 -translate-x-1/2 font-mono text-[22px] font-medium leading-none tracking-[-0.44px] text-ink-deep">
                      SIGNAL
                    </span>
                  </>
                )}
              </motion.div>
            </motion.div>

            {/* Static diamond-shaped hit area (never moves) — owns hover so the
                lifting visual can't slip out from under the pointer. */}
            <div
              className="absolute size-[180px] cursor-pointer"
              style={{ left: -90, top: -90 + l.offset, transform: ISO }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            />
          </div>
        );
      })}

      {/* Freshness callouts */}
      <motion.span
        className={cn(BADGE, "left-[496px] top-[104px] bg-[rgba(34,197,94,0.1)] text-[#86efac]")}
        animate={reduce ? { opacity: 1 } : { opacity: [0.6, 1, 0.6] }}
        transition={reduce ? { duration: 0 } : { duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
      >
        SIGNAL GETS LIVE
      </motion.span>
      <span className={cn(BADGE, "left-[585px] top-[479px] bg-[rgba(249,115,22,0.1)] text-[#fdba74]")}>30%</span>
      <span className={cn(BADGE, "left-[585px] top-[655px] bg-[rgba(239,68,68,0.1)] text-[#fca5a5]")}>10%</span>
      <span
        className={cn(
          BADGE,
          "left-[469px] top-[725px] bg-[rgba(239,68,68,0.1)] text-[16px] tracking-[-0.32px] text-[#fca5a5]",
        )}
      >
        YOUR AGENT ACTS HERE
      </span>
    </div>
  );
}

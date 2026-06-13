"use client";

/* eslint-disable @next/next/no-img-element */
import { motion, useInView, useReducedMotion } from "motion/react";
import { useRef, useState } from "react";
import { cn } from "@/lib/utils";

type BrandKey = "hog" | "lion" | "asterisk";

const BRANDS: Record<BrandKey, { logo: string; barClass: string; logoClass: string }> = {
  hog: { logo: "/benchmarks/hog.svg", barClass: "bg-brand", logoClass: "w-9" },
  lion: { logo: "/benchmarks/lion.png", barClass: "bg-[#f3e8e2]", logoClass: "w-[31px]" },
  asterisk: { logo: "/benchmarks/asterisk.svg", barClass: "bg-[#f3e8e2]", logoClass: "w-12" },
};

type Bar = { brand: BrandKey; value: string; h: number };
type Group = { name: string; bars: Bar[] };
type Metric = { axisLabel: string; ticks: { label: string; p: number }[]; groups: Group[] };

const b = (brand: BrandKey, value: string, h: number): Bar => ({ brand, value, h });
const PCT_TICKS = [
  { label: "20%", p: 0.2 },
  { label: "40%", p: 0.4 },
  { label: "60%", p: 0.6 },
  { label: "80%", p: 0.8 },
  { label: "100%", p: 1 },
];

// Benchmark data (Figma node 135:407). "Accuracy" is reproduced 1:1 from the
// design (its bar heights and irregular axis ticks are taken verbatim). The
// other four metrics are drafted, on-brand placeholder data — The Hog leads
// each — consistent with the already-placeholder datasets and competitors.
const METRICS: Record<string, Metric> = {
  Accuracy: {
    axisLabel: "Accuracy (%)",
    ticks: [
      { label: "5%", p: 0.14 },
      { label: "10%", p: 0.266 },
      { label: "15%", p: 0.389 },
      { label: "20%", p: 0.514 },
      { label: "30%", p: 0.64 },
      { label: "40%", p: 0.764 },
      { label: "50%", p: 0.89 },
      { label: "60%", p: 0.999 },
    ],
    groups: [
      { name: "Frames", bars: [b("hog", "53.4%", 0.917), b("lion", "42.1%", 0.795), b("asterisk", "11.6%", 0.292)] },
      { name: "Tip-of-tongue", bars: [b("hog", "52.1%", 0.907), b("lion", "24.1%", 0.553), b("asterisk", "15.8%", 0.383)] },
      { name: "Seal0", bars: [b("hog", "33.5%", 0.664), b("lion", "27.2%", 0.596), b("asterisk", "8.0%", 0.201)] },
    ],
  },
  Latency: {
    axisLabel: "Latency (score)",
    ticks: PCT_TICKS,
    groups: [
      { name: "Frames", bars: [b("hog", "95", 0.95), b("lion", "58", 0.58), b("asterisk", "22", 0.22)] },
      { name: "Tip-of-tongue", bars: [b("hog", "92", 0.92), b("lion", "61", 0.61), b("asterisk", "35", 0.35)] },
      { name: "Seal0", bars: [b("hog", "88", 0.88), b("lion", "64", 0.64), b("asterisk", "41", 0.41)] },
    ],
  },
  Coverage: {
    axisLabel: "Coverage (%)",
    ticks: PCT_TICKS,
    groups: [
      { name: "Frames", bars: [b("hog", "92.4%", 0.924), b("lion", "74.0%", 0.74), b("asterisk", "38.2%", 0.382)] },
      { name: "Tip-of-tongue", bars: [b("hog", "88.1%", 0.881), b("lion", "51.3%", 0.513), b("asterisk", "44.6%", 0.446)] },
      { name: "Seal0", bars: [b("hog", "79.5%", 0.795), b("lion", "66.2%", 0.662), b("asterisk", "29.0%", 0.29)] },
    ],
  },
  Freshness: {
    axisLabel: "Freshness (%)",
    ticks: PCT_TICKS,
    groups: [
      { name: "Frames", bars: [b("hog", "96.1%", 0.961), b("lion", "60.4%", 0.604), b("asterisk", "41.7%", 0.417)] },
      { name: "Tip-of-tongue", bars: [b("hog", "90.3%", 0.903), b("lion", "48.8%", 0.488), b("asterisk", "52.0%", 0.52)] },
      { name: "Seal0", bars: [b("hog", "84.6%", 0.846), b("lion", "70.1%", 0.701), b("asterisk", "33.5%", 0.335)] },
    ],
  },
  Structure: {
    axisLabel: "Structure (%)",
    ticks: PCT_TICKS,
    groups: [
      { name: "Frames", bars: [b("hog", "94.8%", 0.948), b("lion", "71.2%", 0.712), b("asterisk", "45.0%", 0.45)] },
      { name: "Tip-of-tongue", bars: [b("hog", "89.0%", 0.89), b("lion", "63.7%", 0.637), b("asterisk", "50.8%", 0.508)] },
      { name: "Seal0", bars: [b("hog", "82.3%", 0.823), b("lion", "69.9%", 0.699), b("asterisk", "38.4%", 0.384)] },
    ],
  },
};

const TABS = Object.keys(METRICS);
const PLOT_H = "h-[480px] sm:h-[600px] lg:h-[712px]";

export function BenchmarkChart() {
  const reduce = useReducedMotion();
  const [metric, setMetric] = useState("Accuracy");
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const shown = reduce || inView;

  const data = METRICS[metric];

  return (
    <div className="flex flex-col items-center gap-12">
      {/* Metric tabs */}
      <div className="flex max-w-full overflow-x-auto">
        <div
          role="tablist"
          aria-label="Benchmark metric"
          className="flex shrink-0 rounded-[2px] bg-ink-deep/[0.04] p-1 shadow-[0px_0px_16px_0px_rgba(0,0,0,0.02)]"
        >
          {TABS.map((tab) => (
            <button
              key={tab}
              type="button"
              role="tab"
              aria-selected={tab === metric}
              onClick={() => setMetric(tab)}
              className={cn(
                "shrink-0 rounded-[2px] px-5 py-3.5 text-[16px] font-medium tracking-[-0.16px] text-ink-deep transition-colors",
                tab === metric
                  ? "bg-white shadow-[0px_1px_4px_0px_rgba(34,2,2,0.1)]"
                  : "hover:text-ink-deep/70",
              )}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Chart */}
      <div className="w-full overflow-x-auto pt-9">
        <div ref={ref} className="flex min-w-[680px] gap-2">
          {/* Y-axis: rotated label + tick labels */}
          <div className={cn("relative flex shrink-0 gap-1", PLOT_H)}>
            <span className="flex items-center text-[14px] text-ink-deep/80 [writing-mode:vertical-rl] rotate-180">
              {data.axisLabel}
            </span>
            <div className="relative w-9">
              {data.ticks.map((t) => (
                <span
                  key={t.label}
                  className="absolute right-0 -translate-y-1/2 font-mono text-[14px] text-ink-deep/80"
                  style={{ bottom: `${t.p * 100}%` }}
                >
                  {t.label}
                </span>
              ))}
            </div>
          </div>

          {/* Plot */}
          <div className={cn("relative flex-1 border-l border-ink-deep", PLOT_H)}>
            {/* Gridlines */}
            <div className="absolute inset-0 flex flex-col justify-between">
              {Array.from({ length: 9 }).map((_, i) => (
                <div key={i} className="h-px w-full bg-[#faf0eb]" />
              ))}
            </div>

            {/* Groups of bars */}
            <div className="absolute inset-0 flex items-end gap-12 px-8 lg:gap-20 lg:px-20">
              {data.groups.map((group) => (
                <div key={group.name} className="relative flex h-full flex-1 items-end gap-3">
                  {group.bars.map((bar, i) => {
                    const brand = BRANDS[bar.brand];
                    return (
                      <motion.div
                        key={`${group.name}-${i}`}
                        className={cn("relative min-w-px flex-1 rounded-t-[4px]", brand.barClass)}
                        initial={false}
                        animate={{ height: shown ? `${bar.h * 100}%` : "0%" }}
                        transition={reduce ? { duration: 0 } : { duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                      >
                        <span className="absolute -top-9 left-1/2 -translate-x-1/2 font-mono text-[16px] font-medium text-ink-deep/80 whitespace-nowrap">
                          {bar.value}
                        </span>
                        {bar.h > 0.18 && (
                          <img
                            src={brand.logo}
                            alt=""
                            className={cn(
                              "absolute left-1/2 top-4 -translate-x-1/2",
                              brand.logoClass,
                            )}
                          />
                        )}
                      </motion.div>
                    );
                  })}

                  {/* Floating dataset pill */}
                  <div className="absolute bottom-6 left-1/2 flex h-11 w-40 -translate-x-1/2 items-center justify-center rounded-[2px] border-b-2 border-brand bg-[#f6e8e0]/70 text-[16px] text-ink shadow-[0px_0px_20px_0px_rgba(34,12,1,0.2)] backdrop-blur-[16px]">
                    {group.name}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

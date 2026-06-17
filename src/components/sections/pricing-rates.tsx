"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

type Row = {
  label: string;
  /** Optional second line under the label. */
  sublabel?: string;
  /** Price in whole dollars per 1,000 calls/checks. */
  per1k: number;
};

type Category = {
  name: string;
  /** Metered unit — drives the "1k calls" vs "1k checks" wording. */
  unit: "calls" | "checks";
  rows: Row[];
};

// Endpoint rates (Figma node 119:605). Prices are per 1,000 metered units;
// the "Per call" toggle divides by 1,000 at render time.
const CATEGORIES: Category[] = [
  {
    name: "Search",
    unit: "calls",
    rows: [
      { label: "Company search", per1k: 5 },
      { label: "People search", per1k: 5 },
      { label: "Web intelligence query", per1k: 8 },
      { label: "Deep research", sublabel: "Multi-hop search with reasoning", per1k: 25 },
    ],
  },
  {
    name: "Enrichment",
    unit: "calls",
    rows: [
      { label: "Company enrichment", per1k: 10 },
      { label: "Contact enrichment", sublabel: "Verified email and phone", per1k: 20 },
      { label: "Bulk enrichment", per1k: 8 },
    ],
  },
  {
    name: "Signals",
    unit: "calls",
    rows: [
      { label: "News & sentiment", per1k: 4 },
      { label: "Social signals", per1k: 6 },
    ],
  },
  {
    name: "Monitoring",
    unit: "checks",
    rows: [
      { label: "Account monitoring", per1k: 12 },
      { label: "Competitor monitoring", per1k: 12 },
    ],
  },
];

function formatUnit(unit: Category["unit"], perCall: boolean) {
  if (perCall) return `1 ${unit === "calls" ? "call" : "check"} /`;
  return `1k ${unit} /`;
}

function formatPrice(per1k: number, perCall: boolean) {
  return perCall ? `$${(per1k / 1000).toFixed(3)}` : `$${per1k}`;
}

export function PricingRates() {
  // false → "Per 1k calls" (the design default); true → "Per call".
  const [perCall, setPerCall] = useState(false);

  return (
    <div className="flex flex-col gap-7">
      {/* Header row: section label + per-call / per-1k toggle */}
      <div className="flex items-center justify-between gap-4 border-b border-ink-deep/15 pb-7">
        <span className="font-heading text-[24px] font-medium tracking-[-0.24px] text-ink-deep">
          Endpoint rates
        </span>
        <div
          role="tablist"
          aria-label="Rate unit"
          className="flex rounded-[2px] bg-ink-deep/[0.04] p-1 shadow-[0px_0px_16px_0px_rgba(0,0,0,0.02)]"
        >
          {[
            { label: "Per call", value: true },
            { label: "Per 1k calls", value: false },
          ].map(({ label, value }) => (
            <button
              key={label}
              type="button"
              role="tab"
              aria-selected={perCall === value}
              onClick={() => setPerCall(value)}
              className={cn(
                "rounded-[2px] px-5 py-3.5 text-[16px] font-medium tracking-[-0.16px] text-ink-deep transition-colors",
                perCall === value
                  ? "bg-white shadow-[0px_1px_4px_0px_rgba(4,27,32,0.1)]"
                  : "hover:text-ink-deep/70",
              )}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Category groups */}
      {CATEGORIES.map((category) => (
        <div
          key={category.name}
          className="flex flex-col gap-5 border-b border-ink-deep/15 pb-7"
        >
          <span className="text-[18px] font-medium text-ink-deep">{category.name}</span>
          <div className="flex flex-col gap-3">
            {category.rows.map((row) => (
              <div key={row.label} className="flex items-center justify-between gap-4">
                {row.sublabel ? (
                  <div className="flex flex-col">
                    <span className="text-[16px] leading-[1.5] text-ink-deep">{row.label}</span>
                    <span className="text-[14px] leading-[1.5] text-ink-deep/80">
                      {row.sublabel}
                    </span>
                  </div>
                ) : (
                  <span className="text-[16px] text-ink-deep">{row.label}</span>
                )}
                <div
                  className={cn(
                    "flex items-center justify-between gap-2 font-mono text-[16px]",
                    // Per-1k widths match Figma exactly; per-call needs room for the
                    // longer decimal price (e.g. "$0.005") so the unit never wraps.
                    category.unit === "checks"
                      ? perCall
                        ? "w-[170px]"
                        : "w-[150px]"
                      : perCall
                        ? "w-[160px]"
                        : "w-[140px]",
                  )}
                >
                  <span className="whitespace-nowrap text-ink-deep/80">
                    {formatUnit(category.unit, perCall)}
                  </span>
                  <span className="whitespace-nowrap text-right font-medium text-brand tabular-nums">
                    {formatPrice(row.per1k, perCall)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

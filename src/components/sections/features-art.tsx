/* eslint-disable @next/next/no-img-element */

/**
 * Decorative mockups for the Features bento (Figma node 135:279). Each art piece
 * is a fixed-size, absolutely-positioned composition anchored to the top-left of
 * its card and intentionally larger than the card — the card clips the overflow
 * (`overflow-hidden`), exactly like the Figma frames. All layers are decorative
 * and inherit `aria-hidden`/`pointer-events-none` from the card wrapper.
 */

// ---------------------------------------------------------------------------
// Card 1 — "All the signals in one place" (node 135:287)
// ---------------------------------------------------------------------------

const SIGNAL_TILES = [
  { icon: "/features/signal-people.svg", label: "PEOPLE", left: 83 },
  { icon: "/features/signal-company.svg", label: "COMPANY", left: 151 },
  { icon: "/features/signal-social.svg", label: "SOCIAL", left: 219 },
  { icon: "/features/signal-news.svg", label: "NEWS", left: 355 },
  { icon: "/features/signal-sentiment.svg", label: "SENTIMENT", left: 423 },
  { icon: "/features/signal-web.svg", label: "WEB", left: 491 },
];

/** A fanned card slot: -20° rotate + -20° x-skew + 0.94 y-scale, centered in its box. */
function FannedSlot({ left, top, children }: { left: number; top: number; children: React.ReactNode }) {
  return (
    <div
      className="absolute flex h-[134.202px] w-[93.969px] items-center justify-center"
      style={{ left, top }}
    >
      <div className="flex-none [transform:rotate(-20deg)_skewX(-20deg)_scaleY(0.94)]">
        {children}
      </div>
    </div>
  );
}

export function SignalsArt() {
  return (
    <div className="absolute inset-0">
      {SIGNAL_TILES.map((t) => (
        <FannedSlot key={t.label} left={t.left} top={125}>
          <div className="relative size-[100px] overflow-clip rounded-[4px] bg-white shadow-[0px_0px_12px_0px_rgba(0,0,0,0.05)]">
            <img src={t.icon} alt="" className="absolute left-[26px] top-[18px] block size-[48px]" />
            <p className="absolute bottom-[10px] left-1/2 -translate-x-1/2 font-mono text-[12px] font-medium tracking-[-0.24px] text-ink-deep">
              {t.label}
            </p>
          </div>
        </FannedSlot>
      ))}

      {/* The highlighted orange "hog" card sits 40px higher, oversized (inset -48% → 196px). */}
      <FannedSlot left={287} top={85}>
        <div className="relative size-[100px]">
          <div className="absolute inset-[-48%]">
            <img src="/features/hog-card.svg" alt="" className="block size-full max-w-none" />
          </div>
        </div>
      </FannedSlot>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Card 2 — "Fresh data when it matters" (node 135:317)
// ---------------------------------------------------------------------------

const REPORT_STEPS = [
  {
    icon: "/features/step-search.svg",
    label: "Visited 26 sources",
    labelTop: 58,
    lineTop: 92,
    lineHeight: 108,
    lines: [
      "Detected Acme Corp Series F announcement.",
      "Confirmed $150M raise at $10B across 12 sources.",
      "Pulled lead investors, prior rounds, and total raised.",
      "Checked headcount, hiring, and recent product news.",
      "Compiled into a structured funding report.",
    ],
  },
  {
    icon: "/features/step-validate.svg",
    label: "Validating information",
    labelTop: 216,
    lineTop: 250,
    lineHeight: 72,
    lines: [
      "Confirmed all 9 roles are active and unfilled.",
      "Cross-checked funding stage against two sources each.",
      "Flagged 1 stale listing, re-verified before including.",
      "Confidence: 0.94 across 9 leads.",
    ],
  },
  {
    icon: "/features/step-report.svg",
    label: "Creating the report",
    labelTop: 338,
    lineTop: 372,
    lineHeight: 72,
    lines: [
      "Merged 9 verified leads into a single object.",
      "Normalized fields across all sources.",
      "Attached source and timestamp to every value.",
      "Ranked by hiring signal strength.",
    ],
  },
];

export function FreshDataArt() {
  return (
    <div className="absolute inset-0">
      {/* iOS-style notification (574px → bleeds past the card) */}
      <div className="absolute left-[32px] top-[79px] flex h-[64px] w-[574px] items-center gap-[10px] rounded-[4px] bg-white px-[14px] py-[12px] drop-shadow-[0px_0px_6px_rgba(0,0,0,0.05)]">
        <div className="size-[38.333px] shrink-0 overflow-clip rounded-[4px]">
          <img src="/features/notification-icon.webp" alt="" className="size-full object-cover" />
        </div>
        <div className="flex min-w-0 flex-1 items-start gap-[10px]">
          <div className="flex min-w-0 flex-1 flex-col justify-center text-[15px] tracking-[-0.23px] text-black">
            <p className="font-semibold leading-[17px] whitespace-nowrap">
              Acme Corp announces Series F round
            </p>
            <p className="leading-[18px] whitespace-nowrap">
              Acme Corp raises $150M at $10B valuation
            </p>
          </div>
          <span className="shrink-0 text-[13px] leading-[17px] text-black/50">9:41 AM</span>
        </div>
      </div>

      {/* Search / report mockup card (502×420 → bleeds below the card) */}
      <div className="absolute left-[32px] top-[152px] h-[420px] w-[502px] overflow-clip rounded-[4px] bg-white shadow-[0px_0px_12px_0px_rgba(0,0,0,0.05)]">
        <p className="absolute left-[24px] top-[24px] font-heading text-[16px] font-medium text-ink-deep whitespace-nowrap">
          Search Acme’s new round and create a report
        </p>

        {REPORT_STEPS.map((step) => (
          <div key={step.label}>
            {/* step row: icon + label */}
            <div className="absolute left-[24px] flex items-center gap-[8px]" style={{ top: step.labelTop }}>
              <img src={step.icon} alt="" className="size-[18px] shrink-0" />
              <p className="text-[14px] text-ink-deep/70 whitespace-nowrap">{step.label}</p>
            </div>
            {/* connector line */}
            <div
              className="absolute left-[33px] w-px rounded-[64px] bg-ink-deep/20"
              style={{ top: step.lineTop, height: step.lineHeight }}
            />
            {/* dim reasoning text */}
            <div
              className="absolute left-[50px] w-[328.9px] text-[12px] leading-[1.5] text-ink-deep/50"
              style={{ top: step.lineTop }}
            >
              {step.lines.map((line, i) => (
                <p key={i}>{line}</p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Card 3 — "Clean outputs your agents can reason with" (node 135:355)
// ---------------------------------------------------------------------------

const OUTPUT_TABS = ["JSON", "Natural language", "CSV", "XLSX", "XLSX"];

const MARKDOWN_LINES = [
  "# Brightwave AI",
  "",
  "**Domain:** brightwave.ai",
  "**Resolved:** yes (confidence 0.97)",
  "**As of:** 2026-06-04 11:02 UTC · 23 sources",
  "",
  "## Signals",
  "1. **Funding** — Series B, $80M _(techcrunch.com, 3d)_",
  "2. **Headcount** — 412, +14% QoQ _(linkedin.com, live)_",
  "3. **Hiring** — 7 open AI eng roles _(brightwave.ai/careers, 1d)_",
  "4. **News** — Launched EU data region _(brightwave.ai/blog, 6h)_",
  "5. **Sentiment** — Positive, 0.82 _(social, 24h)_",
  "",
  "## People",
  "- **Dana Holt** — VP Engineering _(linked)_",
];

export function CleanOutputArt() {
  return (
    <div className="absolute inset-0">
      {/* Format tab row (bleeds right) */}
      <div className="absolute left-[32px] top-[84px] flex items-center gap-[8px] overflow-clip rounded-[4px] p-[2px] shadow-[0px_0px_48px_0px_rgba(0,0,0,0.1)]">
        <div aria-hidden className="absolute inset-0 rounded-[4px] bg-[rgba(216,236,241,0.1)]" />
        <div className="relative shrink-0 rounded-[2px] bg-white/95 px-[14px] py-[10px] shadow-[0px_1px_12px_0px_rgba(0,0,0,0.1)]">
          <p className="text-[12px] text-[#1e2526] whitespace-nowrap">Markdown</p>
        </div>
        {OUTPUT_TABS.map((tab, i) => (
          <div key={i} className="relative shrink-0 px-[14px] py-[10px]">
            <p className="text-[12px] text-[#1e2526]/80 whitespace-nowrap">{tab}</p>
          </div>
        ))}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[inherit] shadow-[inset_0px_0px_4px_0px_white]"
        />
      </div>

      {/* Markdown output card (453×266; text box 504 → clips right) */}
      <div className="absolute left-[32px] top-[129px] h-[266px] w-[453px] overflow-clip rounded-[4px] shadow-[0px_0px_48px_0px_rgba(0,0,0,0.1)]">
        <div aria-hidden className="absolute inset-0 rounded-[4px] bg-[rgba(216,236,241,0.1)]" />
        <div className="absolute left-[24px] top-[24px] w-[504px] text-[14px] leading-[1.5] text-[#1e2526]">
          {MARKDOWN_LINES.map((line, i) => (
            <p key={i} className="leading-[1.5]">
              {line || " "}
            </p>
          ))}
        </div>
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[inherit] shadow-[inset_0px_0px_4px_0px_white]"
        />
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Card 4 — "From prototype to production" (node 135:375)
// ---------------------------------------------------------------------------

const API_KEY_DEV = "API_KEY=hog_sk_dev_3f9Kc2mQ8vErJ7nWtZ4xLpD6sH1aN5gXbY0uV7tR2wL";
const API_KEY_LIVE = "API_KEY=hog_sk_live_Yb1Hn5gT0aRwUf8sQ2eMvK9jD4pC6xZ3nB7kF1aL8sW";

/** A diff block: red "-" dev row over a green "+" live row. `strong` bumps the highlight bar opacity. */
function ApiDiff({ strong }: { strong?: boolean }) {
  return (
    <div className="flex w-[804px] flex-col overflow-clip rounded-[4px]">
      <div className="relative h-[52px] w-full overflow-clip bg-[rgba(239,68,68,0.15)]">
        <div
          className="absolute left-[238px] top-1/2 h-[36px] w-[534px] -translate-y-1/2 rounded-[1px]"
          style={{ backgroundColor: strong ? "rgba(220,38,38,0.2)" : "rgba(220,38,38,0.15)" }}
        />
        <img src="/features/diff-minus.svg" alt="" className="absolute left-[16px] top-[16px] size-[20px]" />
        <p className="absolute left-[60px] top-[16px] font-mono text-[20px] font-medium leading-none text-[#dc2626] whitespace-nowrap">
          {API_KEY_DEV}
        </p>
      </div>
      <div className="relative h-[52px] w-full overflow-clip bg-[rgba(34,197,94,0.15)]">
        <div
          className="absolute left-[238px] top-1/2 h-[36px] w-[534px] -translate-y-1/2 rounded-[1px]"
          style={{ backgroundColor: strong ? "rgba(22,163,74,0.2)" : "rgba(22,163,74,0.15)" }}
        />
        <img src="/features/diff-plus.svg" alt="" className="absolute left-[16px] top-[16px] size-[20px]" />
        <p className="absolute left-[60px] top-[16px] font-mono text-[20px] font-medium leading-none text-[#16a34a] whitespace-nowrap">
          {API_KEY_LIVE}
        </p>
      </div>
    </div>
  );
}

export function PrototypeArt() {
  return (
    <div className="absolute inset-0">
      {/* Block 1 — base endpoint */}
      <div className="absolute left-[32px] top-[100px] flex w-[734px] flex-col gap-[20px]">
        <div className="flex h-[52px] w-full items-center overflow-clip rounded-[4px] bg-white px-[14px] py-[12px] shadow-[0px_0px_12px_0px_rgba(0,0,0,0.05)]">
          <p className="font-mono text-[20px] font-medium text-ink-deep/80 whitespace-nowrap">
            api.thehog.ai/v1
          </p>
        </div>
        <ApiDiff />
      </div>

      {/* Block 2 — /search endpoint (extends past the card, clipped at the bottom) */}
      <div className="absolute left-[32px] top-[300px] flex w-[734px] flex-col gap-[20px]">
        <div className="flex w-full items-center overflow-clip rounded-[4px] bg-[#f3fafb] px-[20px] py-[16px]">
          <p className="font-mono text-[20px] font-medium text-ink-deep/80 whitespace-nowrap">
            api.thehog.ai/v1/search
          </p>
        </div>
        <ApiDiff strong />
      </div>
    </div>
  );
}

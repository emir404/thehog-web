<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Design system

Rules for building landing-page sections. Source of truth: Figma file `DN9OiLpga3XcLcfDgsByYv` (full page node `119:4`). Tokens live in `src/app/globals.css`; compose classes with `cn()` from `src/lib/utils.ts`.

## Layout

- **Page gutter:** `px-6 lg:px-[120px]` (24px mobile, 120px desktop — the Figma frame is 1440 wide with 120px margins).
- **Content width:** wrap section content in `mx-auto w-full max-w-[1200px]`. This is the canonical container — match `SiteHeader`/`SiteFooter`. (Note: `features.tsx`, `cta.tsx`, `faq.tsx` still use `max-w-6xl` and should migrate to this when next touched.)
- **Section vertical rhythm:** Figma uses ~120px top padding per section. Use `py-24 sm:py-32` (96/128px) as the standard responsive equivalent; sections stack with no gaps between them.
- **Header:** `h-[72px]`, sticky, `bg-background/90 backdrop-blur-md`, no bottom border.
- Center text blocks with `max-w-2xl`/`max-w-3xl` inside the 1200px container; never exceed 1200px content.

## Typography

- Headings use `font-heading` (Suisse Intl Trial → Geist fallback), weight **medium (500)**, with tight negative tracking. Body uses the default `font-sans`.
- Type scale (px, from Figma + code):

  | Role | Size | Weight | Tracking |
  |------|------|--------|----------|
  | Hero headline | `text-[44px]` → `sm:text-[64px]` | medium | `-1.76px` → `sm:-2.56px` |
  | Section title | `text-[40px]` | medium | `-1.2px` (`leading-[1.15]`) |
  | Sub-section / card title | `text-[18px]`–`text-[20px]` | medium | — |
  | Body | `text-[16px]` | regular | `leading-[1.5]` |
  | Small / eyebrow | `text-[14px]` | medium | `-0.14px` |
  | Caption / tab | `text-[12px]` | regular | — |

- Headline accent: wrap highlighted words in `<mark className="-mx-1 bg-[#0e97b8]/20 px-1 text-inherit">`.

## Colors

Tokens are defined in `globals.css` — use the Tailwind class, not raw hex.

> **Rebranded orange → teal (2026-06-15).** `brand` is now `#007591`; the warm
> neutrals (ink, off-whites, dark sections) were re-tinted toward this cool hue.
> `cyan` was deliberately kept as the secondary accent. The Figma source file may
> still show the original orange palette — the code is the source of truth here.

| Token | Hex | Use |
|-------|-----|-----|
| `bg-background` | `#fafdfe` | page background (cool off-white) |
| `brand` | `#007591` | primary teal — CTAs, accents |
| `brand-dark` | `#005c70` | hover/active, button cap |
| `ink` | `#092a32` | body text on light (cool near-black) |
| `ink-deep` | `#041b20` | high-contrast headings / strong text |
| `sand` | `#e2e7e9` | neutral borders/fills |
| `taupe` | `#728e95` | muted neutral |
| `cyan` | `#01a2c7` | secondary accent (pixel motifs) |

- Opacity ramps seen in the design: `brand/3`, `brand/5`, `brand/95`, `ink-deep/75`, `ink-deep/[0.03]`. Prefer `text-ink/80` and similar over introducing new hex values.

## Radii & shape

- Base scale: `--radius: 0.625rem` with `radius-sm`…`radius-4xl` derived from it.
- The brand shape is **sharp**: cards / inputs / panels use `rounded-[4px]`; the signature button uses `rounded-[2px]`. Reserve `rounded-3xl` for large feature/CTA cards. Avoid pill/full radius except the eyebrow badge.
- Standard card surface: `rounded-[4px] bg-white shadow-[0px_0px_12px_0px_rgba(0,0,0,0.05)]`.

## Buttons

Use `ActionButton` (`src/components/ui/action-button.tsx`) — don't hand-roll buttons.

- Signature shape: `rounded-[2px]` + `border-b-2` accent + a contrasting square icon **cap** flush to the trailing edge.
- Variants: `primary` (teal), `tint` (teal-wash on light), `neutral` (sand), `inverse` (on dark/brand bg). Sizes: `sm` (h-38), `lg` (h-44).
- Default icon is `ArrowRightIcon` (Phosphor); pass `icon` to override.

## Conventions

- Icons: `@phosphor-icons/react` (use `/dist/ssr` in server components).
- Reveal-on-scroll: wrap blocks in `<FadeIn>` (`src/components/motion/fade-in.tsx`), stagger with `delay`.
- Decorative-only layers get `aria-hidden` plus `pointer-events-none select-none`.
- The Suisse Trial font lacks digits and most punctuation — Geist fills those glyphs. Don't rely on Suisse for numerals in tight designs.

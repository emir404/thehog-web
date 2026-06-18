import { cn } from "@/lib/utils";

/**
 * Generative blog cover: a brand gradient plus the signature pixel-art motif
 * (same sharp squares as `sections/about/pixel-cluster.tsx`), scattered toward
 * the right. Everything is derived deterministically from `seed` (the slug), so
 * each post gets a stable, distinct visual with no image files to manage — and
 * SSR matches hydration. Used as the fallback when a post has no `cover:` in
 * frontmatter; drop a real image in /public + set `cover:` to override.
 *
 * Purely decorative, so always aria-hidden.
 */

// FNV-1a — small, stable string hash.
function hashString(value: string): number {
  let hash = 2166136261;
  for (let i = 0; i < value.length; i++) {
    hash ^= value.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

// mulberry32 — tiny seeded PRNG so the scatter is deterministic per seed.
function mulberry32(seed: number): () => number {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const PALETTES = [
  {
    bg: "bg-gradient-to-br from-ink-deep via-[#06303a] to-brand-dark",
    squares: ["bg-cyan", "bg-brand", "bg-white/85", "bg-cyan/60"],
  },
  {
    bg: "bg-gradient-to-br from-brand to-brand-dark",
    squares: ["bg-cyan", "bg-white", "bg-white/70", "bg-cyan/70"],
  },
  {
    bg: "bg-gradient-to-tr from-[#041b20] via-brand-dark to-cyan/80",
    squares: ["bg-cyan", "bg-brand", "bg-white/80", "bg-white/50"],
  },
] as const;

const SIZES = [8, 10, 14, 18, 24] as const;
const SQUARE_COUNT = 18;

export function PostCover({
  seed,
  className,
}: {
  seed: string;
  className?: string;
}) {
  const hash = hashString(seed);
  const palette = PALETTES[hash % PALETTES.length];
  const rng = mulberry32(hash);

  const squares = Array.from({ length: SQUARE_COUNT }, (_, i) => {
    const left = 44 + rng() * 52; // cluster on the right
    const top = 6 + rng() * 82;
    const size = SIZES[Math.floor(rng() * SIZES.length)];
    const color = palette.squares[Math.floor(rng() * palette.squares.length)];
    return { i, left, top, size, color };
  });

  return (
    <div
      aria-hidden
      className={cn("relative overflow-hidden", palette.bg, className)}
    >
      {squares.map((square) => (
        <div
          key={square.i}
          className={cn("absolute", square.color)}
          style={{
            left: `${square.left}%`,
            top: `${square.top}%`,
            width: square.size,
            height: square.size,
          }}
        />
      ))}
    </div>
  );
}

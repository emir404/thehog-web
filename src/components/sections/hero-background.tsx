/* eslint-disable @next/next/no-img-element */

/**
 * Decorative hero backdrop (Figma scene 151:5). The teal wash (158:35), cyan
 * glow (151:166), and faint pixel squares (158:366) are composited 1:1 from the
 * Figma layers into a single bottom-anchored image (public/hero/hero-bg.webp,
 * 1392×924 = the design's content frame). It is anchored to the section bottom
 * and centered, so the wash rises from the bottom on both the desktop fixed
 * canvas and the taller mobile flow layout.
 */
export function HeroBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 select-none overflow-hidden bg-background"
    >
      <img
        src="/hero/hero-bg.webp"
        alt=""
        className="absolute bottom-0 left-1/2 w-full min-w-[1440px] max-w-none -translate-x-1/2 select-none"
      />
    </div>
  );
}

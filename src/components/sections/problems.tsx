import { ProblemsInteractive } from "@/components/sections/problems-interactive";

/**
 * Problems section (Figma frames 135:231 / 135:1396). The "why this matters"
 * framing before How-it-works: a headline over two problem cards, paired with a
 * dark illustration panel that bleeds off the right edge. It's interactive —
 * clicking a card swaps the panel between a draggable "scattered context" canvas
 * and an animated "stale layers" stack (see problems-interactive / problems-art).
 *
 * The shell supplies the tinted, full-bleed background and is itself the
 * positioning context (relative) for the dark panel, so the panel bleeds off
 * the right edge of the viewport. The centered 1440 frame just holds the left
 * column.
 */
export function Problems() {
  return (
    <section id="problems" className="relative overflow-hidden bg-[#f2f9fb]">
      <div className="mx-auto w-full max-w-[1440px]">
        <ProblemsInteractive />
      </div>
    </section>
  );
}

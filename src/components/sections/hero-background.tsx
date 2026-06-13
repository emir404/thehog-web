/**
 * Decorative hero backdrop (Figma node 119:7). All coordinates are lifted
 * 1:1 from the 1440×1024 desktop frame, shifted up 72px (the header sits in
 * flow above this section) and anchored to the horizontal center so the
 * composition stays glued to the centered hero content on wide screens.
 */

/** Faint 186px brand squares (Figma 119:8), positions local to a 2394.75px-wide group. */
const FAINT_SQUARES: [left: number, top: number][] = [
  [1104.37, 0],
  [1290.38, 0],
  [1476.38, 186],
  [1662.38, 186],
  [1662.38, 372],
  [1848.37, 372],
  [1848.37, 558],
  [2022.75, 558],
  [2208.75, 558],
  [2028.56, 186],
  [2028.56, 0],
  [918.38, 186],
  [732.38, 186],
  [546.37, 0],
  [366.19, 186],
  [180.19, 372],
  [0, 186],
  [0, 0],
  [180.19, 558],
  [546.37, 372],
  [732.38, 558],
  [1104.37, 186],
  [1290.38, 372],
  [1104.37, 558],
  [1290.38, 558],
];

/** 24px pixel-art clusters flanking the search bar (Figma 119:89 / 119:98). */
const ORANGE_PIXELS: [left: number, top: number][] = [
  [72, 0],
  [72, 71],
  [48, 24],
  [24, 24],
  [0, 0],
  [0, 47],
  [24, 71],
  [48, 47],
];

const CYAN_PIXELS: [left: number, top: number][] = [
  [72, 71],
  [48, 48],
  [48, 24],
  [72, 0],
  [72, 24],
  [24, 48],
  [0, 24],
  [0, 0],
  [0, 47],
  [24, 71],
  [24, 0],
];

function PixelCluster({
  pixels,
  colorClass,
  className,
}: {
  pixels: [number, number][];
  colorClass: string;
  className: string;
}) {
  return (
    <div className={className}>
      {pixels.map(([left, top]) => (
        <div
          key={`${left}-${top}`}
          className={`absolute size-6 ${colorClass}`}
          style={{ left, top }}
        />
      ))}
    </div>
  );
}

export function HeroBackground() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 select-none">
      {/* Faint brand squares washing over the lower half */}
      <div className="absolute left-1/2 top-[602px] h-[744px] w-[2394.75px] -translate-x-1/2">
        {FAINT_SQUARES.map(([left, top]) => (
          <div
            key={`${left}-${top}`}
            className="absolute size-[186px] bg-brand/3"
            style={{ left, top }}
          />
        ))}
      </div>

      {/* Pixel-art clusters peeking out behind the search bar */}
      <PixelCluster
        pixels={ORANGE_PIXELS}
        colorClass="bg-brand"
        className="absolute left-[calc(50%-560px)] top-[563px] h-[95px] w-[96px]"
      />
      <PixelCluster
        pixels={CYAN_PIXELS}
        colorClass="bg-cyan"
        className="absolute left-[calc(50%+464px)] top-[563px] h-[95px] w-[96px]"
      />

      {/* Soft fade dissolving the brand squares toward the section bottom */}
      <div className="absolute left-1/2 top-[1099px] h-[204px] w-[1618px] -translate-x-1/2 bg-background blur-[25.35px]" />
    </div>
  );
}

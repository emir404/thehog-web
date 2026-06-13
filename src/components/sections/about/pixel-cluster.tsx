import { cn } from "@/lib/utils";

/**
 * Decorative pixel-art cluster. Maps an array of `[left, top]` pixel offsets —
 * local to the cluster's own bounding box, lifted 1:1 from the Figma about
 * frames — to absolutely positioned brand-colored squares. Same motif as the
 * landing hero (see `sections/hero-background.tsx`) but parameterised for the
 * about page's 32px squares.
 *
 * Purely decorative: always `aria-hidden` and non-interactive. Callers supply
 * the absolute anchor (left/top/size) and visibility (`hidden lg:block`) via
 * `className`.
 */
export function PixelCluster({
  pixels,
  colorClass,
  className,
  sizeClass = "size-8",
}: {
  pixels: readonly (readonly [left: number, top: number])[];
  colorClass: string;
  className: string;
  sizeClass?: string;
}) {
  return (
    <div aria-hidden className={cn("pointer-events-none absolute select-none", className)}>
      {pixels.map(([left, top]) => (
        <div
          key={`${left}-${top}`}
          className={cn("absolute", sizeClass, colorClass)}
          style={{ left, top }}
        />
      ))}
    </div>
  );
}

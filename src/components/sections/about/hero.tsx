import { FadeIn } from "@/components/motion/fade-in";
import { PixelCluster } from "@/components/sections/about/pixel-cluster";
import { VideoPlayer } from "@/components/ui/video-player";

/**
 * About hero (Figma node 135:933). A simple, left-aligned statement headline
 * over a wide 16:9 media frame — not the landing hero's full-viewport shell.
 * A brand-orange pixel motif floats top-right (desktop only). Coordinates are
 * lifted 1:1 from Figma groups 135:934 + 135:960 and normalised to the
 * cluster's top-left (frame x1060 / y216).
 */
const HERO_ORANGE: readonly (readonly [number, number])[] = [
  // upper blob (Figma group 135:934)
  [0, 190], [0, 158], [32, 126], [32, 94], [64, 94], [64, 62], [96, 62], [96, 32],
  [96, 0], [32, 31], [0, 31], [32, 222], [32, 254], [0, 286], [32, 317], [64, 349],
  [32, 380], [0, 380], [96, 349], [64, 286], [96, 254], [32, 190], [64, 158], [96, 190],
  [96, 158],
  // lower-right blob (Figma group 135:960)
  [152, 284], [152, 316], [184, 348], [184, 380], [216, 380], [216, 412], [248, 412],
  [248, 442], [248, 474], [184, 443], [152, 443], [184, 252], [184, 220], [152, 188],
  [184, 157], [216, 125], [184, 94], [152, 94], [248, 125], [216, 188], [248, 220],
  [184, 284], [216, 316], [248, 284], [248, 316],
];

export function AboutHero() {
  return (
    <section className="bg-background">
      <div className="relative mx-auto w-full max-w-[1440px] px-6 pb-24 pt-16 sm:pb-32 sm:pt-24 lg:px-[120px]">
        <FadeIn>
          <h1 className="max-w-[916px] font-heading text-[44px] font-medium leading-none tracking-[-1.76px] text-ink-deep sm:text-[64px] sm:tracking-[-2.56px]">
            The world&rsquo;s most complete web intelligence API for AI agents
          </h1>
        </FadeIn>

        <FadeIn delay={0.1}>
          <VideoPlayer
            videoId="VAXbqcowvT4"
            poster="/about/hero-media.webp"
            title="The Hog founder introducing the web intelligence API"
            className="mt-16 aspect-[16/9] rounded-[4px] bg-ink-deep/[0.03] sm:mt-20"
          />
        </FadeIn>

        {/* Decorative brand-orange pixel motif, top-right. Gated to the ≥1440px
            design width, where the 1200px content box matches Figma's pixel
            coordinates exactly and the motif sits clear of the headline.
            Rendered last so it reads on top of the media's corner, as in Figma. */}
        <PixelCluster
          pixels={HERO_ORANGE}
          colorClass="bg-brand"
          className="hidden h-[506px] w-[280px] min-[1440px]:block min-[1440px]:right-[100px] min-[1440px]:top-[8px]"
        />
      </div>
    </section>
  );
}

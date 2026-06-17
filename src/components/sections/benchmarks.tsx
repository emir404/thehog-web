import { BenchmarkChart } from "@/components/sections/benchmark-chart";
import { FadeIn } from "@/components/motion/fade-in";

/**
 * Benchmarks section (Figma node 135:407). A header over a grouped bar chart
 * (see BenchmarkChart) comparing The Hog against two competitors across three
 * datasets, with a metric tab switcher.
 */
export function Benchmarks() {
  return (
    <section id="benchmarks" className="bg-[#f2f9fb]">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col items-center gap-16 px-6 pt-24 sm:pt-32 lg:px-[120px]">
        <FadeIn>
          <div className="flex flex-col items-center gap-6">
            <span className="inline-flex items-center justify-center rounded-full border border-[#171c1f]/[0.08] bg-white px-3.5 py-3 text-[12px] leading-none text-ink-deep/80 shadow-[0_6px_8px_rgba(4,27,32,0.03)]">
              BENCHMARKS
            </span>
            <div className="flex flex-col items-center gap-4">
              <h2 className="text-balance text-center font-heading text-[40px] font-medium leading-[1.15] tracking-[-1.2px] text-ink-deep">
                Built to outperform stitched-together data stacks.
              </h2>
              <p className="max-w-[690px] text-pretty text-center text-[16px] leading-[1.5] text-ink-deep/80">
                The Hog replaces fragmented search, scraping, enrichment, and monitoring workflows
                with one API built for speed, coverage, and agent-ready output quality.
              </p>
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.1} className="w-full">
          <BenchmarkChart />
        </FadeIn>
      </div>
    </section>
  );
}

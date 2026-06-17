import { FadeIn } from "@/components/motion/fade-in";
import { TestimonialsCarousel } from "@/components/sections/testimonials-carousel";

/**
 * Testimonials section (Figma nodes 135:594 / 40:610). An eyebrow + heading
 * over an auto-advancing vertical card stack (see TestimonialsCarousel): each
 * quote rises from below, becomes the crisp front card, then blurs up and out.
 */
export function Testimonials() {
  return (
    <section id="testimonials">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col items-center gap-24 px-6 py-24 sm:py-32 lg:px-[120px]">
        <FadeIn>
          <div className="flex flex-col items-center gap-6">
            <span className="inline-flex items-center justify-center rounded-full border border-[#171c1f]/[0.08] bg-white px-3.5 py-3 text-[12px] leading-none text-ink-deep/80 shadow-[0_6px_8px_rgba(4,27,32,0.03)]">
              TESTIMONIALS
            </span>
            <h2 className="text-balance text-center font-heading text-[40px] font-medium leading-[1.15] tracking-[-1.2px] text-ink-deep">
              Trusted by teams building context-aware agents.
            </h2>
          </div>
        </FadeIn>

        <FadeIn delay={0.1} className="w-full">
          <TestimonialsCarousel />
        </FadeIn>
      </div>
    </section>
  );
}

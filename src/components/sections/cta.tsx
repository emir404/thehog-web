import { VideoCameraIcon } from "@phosphor-icons/react/dist/ssr";
import { FadeIn } from "@/components/motion/fade-in";
import { ActionButton } from "@/components/ui/action-button";
import { CopyCommand } from "@/components/ui/copy-command";
import { site } from "@/lib/site";

/**
 * Closing CTA (Figma node 135:820). A near-full-bleed orange card — 16px side
 * gutters, capped at the 1440 frame — with left-aligned headline, supporting
 * copy, a curl copy-command bar and a pair of inverse buttons. `relative` is
 * kept so the decorative card scatter (Figma right side) can drop in later as
 * an aria-hidden absolute layer without restructuring.
 */
export function CTA() {
  return (
    <section className="mx-auto w-full max-w-[1440px] px-4 pb-16">
      <div className="relative overflow-hidden rounded-[4px] bg-brand p-6 text-white sm:p-12 lg:p-24">
        <div className="flex max-w-[841px] flex-col">
          <FadeIn className="flex flex-col gap-6">
            <h2 className="font-heading text-[44px] font-medium leading-none tracking-[-1.76px] sm:text-[64px] sm:tracking-[-2.56px]">
              Give your agents the context layer they are missing.
            </h2>
            <p className="max-w-[577px] text-[16px] leading-[1.5] text-white/80">
              Connect to The Hog API and start turning live web signals into structured
              intelligence for research, enrichment, monitoring, and GTM workflows.
            </p>
          </FadeIn>

          <FadeIn
            delay={0.1}
            className="mt-12 flex w-full max-w-[489px] flex-col gap-2.5 lg:mt-[120px]"
          >
            <CopyCommand
              command={`curl -X POST "https://api.thehog.ai/search"`}
              className="w-full justify-between"
            />
            <div className="flex w-full flex-col gap-2 sm:flex-row">
              <ActionButton
                href={site.links.signup}
                variant="inverse"
                size="lg"
                className="w-full sm:flex-1"
              >
                Get your API Key
              </ActionButton>
              <ActionButton
                href="#"
                variant="inverse"
                size="lg"
                icon={VideoCameraIcon}
                className="w-full sm:flex-1"
              >
                Get demo
              </ActionButton>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

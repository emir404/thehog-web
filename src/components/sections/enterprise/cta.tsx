import { BookOpenIcon } from "@phosphor-icons/react/dist/ssr";
import { FadeIn } from "@/components/motion/fade-in";
import { ActionButton } from "@/components/ui/action-button";
import { site } from "@/lib/site";

/**
 * Closing CTA for the /enterprise page. Reuses the landing CTA's near-full-bleed
 * brand card, but converts to "Talk to sales" rather than self-serve signup.
 */
export function EnterpriseCTA() {
  return (
    <section className="mx-auto w-full max-w-[1440px] px-4 pb-16">
      <div className="relative overflow-hidden rounded-[4px] bg-brand p-6 text-white sm:p-12 lg:p-24">
        <div className="flex max-w-[841px] flex-col">
          <FadeIn className="flex flex-col gap-6">
            <h2 className="font-heading text-[44px] font-medium leading-none tracking-[-1.76px] sm:text-[64px] sm:tracking-[-2.56px]">
              Let&rsquo;s design your enterprise setup.
            </h2>
            <p className="max-w-[577px] text-[16px] leading-[1.5] text-white/80">
              Tell us how your agents run in production and we&rsquo;ll shape the right pricing,
              infrastructure, security, and support around your team.
            </p>
          </FadeIn>

          <FadeIn
            delay={0.1}
            className="mt-12 flex w-full max-w-[489px] flex-col gap-2 sm:flex-row lg:mt-[120px]"
          >
            <ActionButton
              href={site.links.sales}
              variant="inverse"
              size="lg"
              className="w-full sm:flex-1"
            >
              Talk to sales
            </ActionButton>
            <ActionButton
              href={site.links.docs}
              variant="inverse"
              size="lg"
              icon={BookOpenIcon}
              className="w-full sm:flex-1"
            >
              Read docs
            </ActionButton>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

import { GaugeIcon, GiftIcon, TrendDownIcon } from "@phosphor-icons/react/dist/ssr";
import { FadeIn } from "@/components/motion/fade-in";

/**
 * "How billing works" section for the /pricing page. Three cards that explain
 * the metered model — the free allowance, automatic volume discounts, and spend
 * caps — reusing the card surface from the About "Our Vision" section.
 */
type BillingCard = {
  Icon: typeof GiftIcon;
  title: string;
  body: string;
};

const CARDS: BillingCard[] = [
  {
    Icon: GiftIcon,
    title: "500 free calls every month",
    body: "Every account gets 500 calls each month across all endpoints, refreshed each cycle — no credit card required to start building.",
  },
  {
    Icon: TrendDownIcon,
    title: "Volume discounts, automatic",
    body: "Past 100k calls a month, lower rates kick in on their own. No tiers to negotiate, no plan to upgrade, no renegotiation.",
  },
  {
    Icon: GaugeIcon,
    title: "Spend caps you control",
    body: "Set a hard monthly limit anytime. When you reach it we stop the meter, so a runaway agent can never overspend.",
  },
];

export function HowBilling() {
  return (
    <section className="bg-background">
      <div className="mx-auto w-full max-w-[1440px] px-6 py-24 sm:py-32 lg:px-[120px]">
        <FadeIn>
          <div className="flex flex-col items-start gap-6">
            <span className="inline-flex items-center justify-center rounded-full border border-[#171c1f]/[0.08] bg-white px-3.5 py-3 text-[12px] leading-none text-ink-deep/80 shadow-[0_6px_8px_rgba(4,27,32,0.03)]">
              HOW BILLING WORKS
            </span>
            <h2 className="text-balance font-heading text-[40px] font-medium leading-[1.15] tracking-[-1.2px] text-ink-deep">
              Usage-based, with no surprises
            </h2>
          </div>
        </FadeIn>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3 lg:mt-16">
          {CARDS.map(({ Icon, title, body }, i) => (
            <FadeIn key={title} delay={i * 0.08}>
              <article className="flex h-full flex-col gap-4 rounded-[4px] bg-ink-deep/[0.03] p-8 shadow-[0px_0px_16px_0px_rgba(4,27,32,0.04)]">
                <Icon className="size-7 text-brand" weight="duotone" />
                <h3 className="font-heading text-[18px] font-medium tracking-[-0.18px] text-ink-deep">
                  {title}
                </h3>
                <p className="text-[14px] leading-[1.45] text-ink-deep/80">{body}</p>
              </article>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

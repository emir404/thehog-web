import type { QA } from "@/components/sections/faq";

/**
 * Billing-focused FAQ content for the /pricing page. Passed into the shared
 * <FAQ /> section via its `items` prop. Drafted from the pricing model
 * (metered calls, 500 free/month, volume discounts, spend caps) and safe to
 * edit without touching layout.
 */
export const PRICING_FAQS: QA[] = [
  {
    question: "What counts as a call?",
    answer:
      "Each request to a metered endpoint is one call — a company search, an enrichment, a monitoring check, and so on. Rates vary by endpoint, and you only pay for calls that return successfully.",
  },
  {
    question: "How do the 500 free calls each month work?",
    answer:
      "Every account gets 500 free calls per month across all endpoints, refreshed at the start of each billing cycle. They're applied automatically before any paid usage, and no credit card is required to start.",
  },
  {
    question: "Do free or unused calls roll over?",
    answer:
      "No. The 500 free calls reset each month and don't accumulate. You're only billed for paid calls beyond the free allowance, metered at each endpoint's rate.",
  },
  {
    question: "How are volume discounts applied?",
    answer:
      "Automatically. Once you pass 100,000 calls in a month, lower per-call rates kick in without any plan change or renegotiation, and the discount is reflected in that month's usage.",
  },
  {
    question: "Can I set a spend cap?",
    answer:
      "Yes. Set a hard monthly limit at any time and we stop serving paid calls once you reach it, so a runaway agent can never overspend. You can raise, lower, or remove the cap whenever you need.",
  },
  {
    question: "What's the difference between per-call and per-1k pricing?",
    answer:
      "They're the same rate shown two ways. Endpoint rates are listed per 1,000 calls for readability; switch to the per-call view to see the exact unit price. Billing is always metered per individual call.",
  },
  {
    question: "How is Enterprise pricing different?",
    answer:
      "Enterprise moves from usage-based rates to committed-use pricing with volume discounts, plus custom data, security review, SSO, dedicated support, and SLAs. Reach out and we'll design the right setup for your team.",
  },
];

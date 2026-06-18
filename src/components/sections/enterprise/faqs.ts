import type { QA } from "@/components/sections/faq";

/**
 * Enterprise FAQ content for the /enterprise page. Passed into the shared
 * <FAQ /> section via its `items` prop. Answers stay aligned with the
 * already-published Enterprise capabilities on /pricing — soft phrasing, no
 * specific certifications asserted.
 */
export const ENTERPRISE_FAQS: QA[] = [
  {
    question: "How is Enterprise different from usage-based pricing?",
    answer:
      "Enterprise moves from metered, pay-per-call rates to committed-use pricing with volume discounts, and adds custom data, security review, SSO, dedicated support, and SLAs. We design the setup around how your agents run in production.",
  },
  {
    question: "Do you support SSO and access controls?",
    answer:
      "Yes. Enterprise includes SAML single sign-on and role-based access controls, so the right people on your team get the right scopes across the API and dashboard.",
  },
  {
    question: "Can you sign a DPA and support our security review?",
    answer:
      "Yes. We provide a signed DPA and support your security review and procurement process, and we'll work with your team on the data handling and retention your policies require.",
  },
  {
    question: "Do you offer an SLA?",
    answer:
      "Enterprise plans come with uptime SLAs and priority routing, so production agents stay fast and reliable even at high volume.",
  },
  {
    question: "Can we use custom or private data sources?",
    answer:
      "Yes. We can bring in custom data sources and provision dedicated capacity for your workloads, so The Hog fits the way your agents already work.",
  },
  {
    question: "How do we get started?",
    answer:
      "Talk to sales and tell us how your agents use the web and what scale, security, and support you need. We'll design the right pricing, infrastructure, and onboarding, then get you live with a dedicated team.",
  },
];

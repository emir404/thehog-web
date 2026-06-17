import { Accordion as AccordionPrimitive } from "@base-ui/react/accordion";
import { MinusIcon, PlusIcon } from "lucide-react";
import { FadeIn } from "@/components/motion/fade-in";

export type QA = {
  question: string;
  answer: string;
};

// FAQ content (Figma node 119:804). The design only ships copy for the first
// answer; the rest are drafted from the product positioning and are safe to
// edit/replace without touching the layout.
const faqs: QA[] = [
  {
    question: "What is The Hog?",
    answer:
      "The Hog is a unified web intelligence API that gives AI agents real-time context across people, companies, news, social signals, sentiment, and the open web. Instead of stitching together tools like Exa, Clay, Apollo, search APIs, and custom scraping pipelines, teams can use one API to power research, enrichment, outbound, monitoring, and agent workflows.",
  },
  {
    question: "Who is The Hog built for?",
    answer:
      "The Hog is built for developers, AI teams, and GTM operators who need fresh, reliable web context inside their products and workflows — from a founder prototyping an agent to an enterprise running research, enrichment, and monitoring at scale.",
  },
  {
    question:
      "How is The Hog different from Exa, Parallel, Clay, Apollo, or Brave Search API?",
    answer:
      "Those tools each solve one slice — search, enrichment, or contact data. The Hog unifies them behind a single API, so instead of integrating multiple vendors and maintaining scraping pipelines you get people, company, news, social, and open-web signals from one consistent, real-time source.",
  },
  {
    question: "Is The Hog only for GTM and sales workflows?",
    answer:
      "No. GTM and outbound are popular use cases, but The Hog powers any workflow that needs live web context — market and competitive research, news and reputation monitoring, due diligence, and autonomous agents of every kind.",
  },
  {
    question: "What kind of data can I access through The Hog?",
    answer:
      "People, companies, news, social signals, sentiment, and the broader open web — all queryable through one API and returned in a structured, agent-ready format.",
  },
  {
    question: "How fresh is the data?",
    answer:
      "The Hog fetches and resolves context in real time, so your agents and workflows act on what the web says now rather than a stale snapshot from a periodic crawl.",
  },
  {
    question: "Can I use The Hog inside production AI agents?",
    answer:
      "Yes. The Hog is designed to sit inside production agents and applications, with a stable API, predictable latency, and structured responses that drop straight into your tool-calling and retrieval pipelines.",
  },
  {
    question: "What can my agents do with The Hog?",
    answer:
      "Your agents can research people and companies, enrich records, monitor news and social signals, gauge sentiment, and pull live context from across the open web — all from a single tool call.",
  },
  {
    question: "Do I need to build my own scraping or enrichment pipeline?",
    answer:
      "No. The Hog replaces the scraping, parsing, and enrichment plumbing teams usually maintain themselves, so you can ship on day one instead of building and babysitting infrastructure.",
  },
  {
    question: "How does The Hog handle accuracy?",
    answer:
      "The Hog draws from multiple sources and resolves them into a single consistent view, prioritizing fresh, corroborated signals so the context your agents act on is as reliable as possible.",
  },
  {
    question: "Is the API built for developers?",
    answer:
      "Yes. The Hog is API-first with clean, predictable endpoints, structured responses, and clear docs — designed to feel familiar from your very first request.",
  },
  {
    question: "How do credits work?",
    answer:
      "Usage is metered in credits, so you only pay for the calls you make. Start small, scale as your workloads grow, and track consumption across your team in one place.",
  },
  {
    question: "Can I test The Hog before committing?",
    answer:
      "Yes. You can grab an API key and start making calls right away to evaluate The Hog against your own use cases before committing to a larger plan.",
  },
  {
    question: "Does The Hog support enterprise use cases?",
    answer:
      "Yes. The Hog supports high-volume, production workloads with the reliability, scale, and support enterprises need. Reach out and we'll help design the right setup for your team.",
  },
  {
    question: "What happens if I already use tools like Clay, Apollo, or Exa?",
    answer:
      "You can adopt The Hog incrementally. Many teams start by consolidating one or two of those tools behind The Hog, then expand as they see the value of a single, unified source of web intelligence.",
  },
];

export function FAQ({
  eyebrow = "FAQ",
  heading = "Questions before you start",
  items = faqs,
}: {
  eyebrow?: string;
  heading?: string;
  items?: QA[];
} = {}) {
  return (
    <section
      id="faq"
      className="mx-auto w-full max-w-[1440px] px-6 py-24 sm:py-32 lg:px-[120px]"
    >
      <div className="flex flex-col gap-12 lg:flex-row lg:gap-24">
        {/* Left column — eyebrow badge + heading */}
        <FadeIn className="lg:w-[321px] lg:shrink-0">
          <div className="flex flex-col items-start gap-6">
            <span className="inline-flex items-center justify-center rounded-full border border-[#171c1f]/[0.08] bg-white px-3.5 py-3 text-[12px] leading-none text-[#041b20]/80 shadow-[0_6px_8px_rgba(4,27,32,0.03)]">
              {eyebrow}
            </span>
            <h2 className="text-balance font-heading text-[40px] font-medium leading-[1.15] tracking-[-1.2px] text-[#041b20]">
              {heading}
            </h2>
          </div>
        </FadeIn>

        {/* Right column — accordion */}
        <FadeIn delay={0.1} className="flex-1">
          <AccordionPrimitive.Root defaultValue={[0]} className="flex w-full flex-col gap-4">
            {items.map((faq, i) => (
              <AccordionPrimitive.Item key={faq.question} value={i} className="flex flex-col gap-2">
                <AccordionPrimitive.Header>
                  <AccordionPrimitive.Trigger className="group flex min-h-16 w-full cursor-pointer items-center justify-between gap-4 rounded-[4px] bg-[#041b20]/[0.03] px-6 py-3 text-left shadow-[0_0_16px_rgba(0,0,0,0.02)] transition-colors outline-none aria-expanded:bg-[#041b20]/[0.04] focus-visible:ring-2 focus-visible:ring-[#041b20]/20">
                    <span className="text-[18px] leading-[1.5] text-[#041b20]">{faq.question}</span>
                    <span className="relative size-6 shrink-0 text-[#041b20]">
                      <PlusIcon
                        strokeWidth={1.5}
                        className="absolute inset-0 size-6 transition-[opacity,scale,filter] duration-200 ease-[cubic-bezier(0.2,0,0,1)] group-aria-expanded:scale-[0.25] group-aria-expanded:opacity-0 group-aria-expanded:blur-[4px]"
                      />
                      <MinusIcon
                        strokeWidth={1.5}
                        className="absolute inset-0 size-6 scale-[0.25] opacity-0 blur-[4px] transition-[opacity,scale,filter] duration-200 ease-[cubic-bezier(0.2,0,0,1)] group-aria-expanded:scale-100 group-aria-expanded:opacity-100 group-aria-expanded:blur-[0px]"
                      />
                    </span>
                  </AccordionPrimitive.Trigger>
                </AccordionPrimitive.Header>
                <AccordionPrimitive.Panel className="h-(--accordion-panel-height) overflow-hidden transition-[height] duration-200 ease-out data-[ending-style]:h-0 data-[starting-style]:h-0">
                  <div className="rounded-[4px] bg-[#041b20]/[0.04] px-6 py-5 shadow-[0_0_16px_rgba(0,0,0,0.02)]">
                    <p className="text-[16px] leading-[1.5] text-pretty text-[#041b20]/80">{faq.answer}</p>
                  </div>
                </AccordionPrimitive.Panel>
              </AccordionPrimitive.Item>
            ))}
          </AccordionPrimitive.Root>
        </FadeIn>
      </div>
    </section>
  );
}

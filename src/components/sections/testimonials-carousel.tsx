"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import type { ReactNode } from "react";

type Testimonial = {
  quote: string;
  /** Exact substring of `quote` to wrap in the orange highlight. */
  highlight: string;
  name: string;
  role: string;
  avatar: string;
};

// Testimonials (Figma nodes 135:594 / 40:610) — the two quotes the design ships.
const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "“The Hog replaced the messiest part of our agent stack. Instead of stitching together search, enrichment, and scraping tools, we now call one API and get clean context back.”",
    highlight: "call one API and get clean context back.",
    name: "Maya Chen",
    role: "Founder, Acme Corp",
    avatar: "/testimonials/maya.png",
  },
  {
    quote:
      "“The freshness is what makes it valuable. Our agents can react to what is happening across companies, markets, and the web instead of relying on stale databases.”",
    highlight: "The freshness is what makes it valuable.",
    name: "Daniel Reeves",
    role: "Head of Product, GTM platform",
    avatar: "/testimonials/daniel.png",
  },
];

const N = TESTIMONIALS.length;
const ROTATE_MS = 5000;
/** Decelerating ease for the card rising into place. */
const RISE_EASE = [0.22, 1, 0.36, 1] as const;
/** Accelerating ease for the old card lifting off. */
const EXIT_EASE = [0.45, 0, 0.55, 0.2] as const;

// Two depth layers behind the active card — the same card at the exact offsets
// and scales of Figma 135:602 / 135:611. Fully opaque and crisp (no blur/fade):
// only their white bottom strips peek out below the front card. Back renders first.
const GHOSTS = [
  { y: 84.74, scale: 0.8434, z: 10 },
  { y: 48.81, scale: 0.9046, z: 20 },
];

/** Render the quote with its highlighted phrase wrapped in an orange <mark>. */
function withHighlight(quote: string, highlight: string): ReactNode {
  const i = quote.indexOf(highlight);
  if (i === -1) return quote;
  return (
    <>
      {quote.slice(0, i)}
      <mark className="box-decoration-clone bg-brand/10 text-inherit">{highlight}</mark>
      {quote.slice(i + highlight.length)}
    </>
  );
}

function Card({ t }: { t: Testimonial }) {
  return (
    <figure className="flex flex-col items-center gap-9 overflow-hidden rounded-[4px] bg-white p-8 shadow-[0px_0px_16px_0px_rgba(4,27,32,0.04)]">
      <blockquote className="text-pretty text-center text-[20px] leading-[1.5] tracking-[-0.24px] text-ink-deep sm:text-[24px]">
        {withHighlight(t.quote, t.highlight)}
      </blockquote>
      <figcaption className="flex items-center gap-5">
        <div className="relative size-[52px] shrink-0 overflow-hidden rounded-[2px] border border-black/10 bg-white shadow-[0px_0px_12px_0px_rgba(4,27,32,0.05)]">
          <Image src={t.avatar} alt={t.name} fill sizes="52px" className="object-cover" />
        </div>
        <div className="flex flex-col text-left leading-[1.5]">
          <span className="text-[16px] text-ink-deep">{t.name}</span>
          <span className="text-[14px] text-ink-deep/85">{t.role}</span>
        </div>
      </figcaption>
    </figure>
  );
}

export function TestimonialsCarousel() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (reduce || paused) return;
    const id = setInterval(() => setActive((a) => (a + 1) % N), ROTATE_MS);
    return () => clearInterval(id);
  }, [reduce, paused]);

  const current = TESTIMONIALS[active];

  return (
    <div
      className="relative mx-auto h-[400px] w-full max-w-[792px] sm:h-[360px] lg:h-[320px]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Static depth layers (the stack), behind the active card */}
      {GHOSTS.map((g) => (
        <div
          key={g.z}
          aria-hidden
          className="absolute left-1/2 top-0 w-full max-w-[792px] -translate-x-1/2"
          style={{ zIndex: g.z }}
        >
          <div
            style={{
              transformOrigin: "top center",
              transform: `translateY(${g.y}px) scale(${g.scale})`,
            }}
          >
            <Card t={current} />
          </div>
        </div>
      ))}

      {/* Active card. On change, the new card starts exactly where the middle
          stack layer sits and slides up into place (crisp, opaque — a physical
          step of the stack), while the old card lifts off above it and
          dissolves with blur. */}
      <AnimatePresence initial={false}>
        <motion.div
          key={current.name}
          className="absolute left-1/2 top-0 w-full max-w-[792px]"
          style={{ zIndex: 30, transformOrigin: "top center" }}
          initial={{
            x: "-50%",
            y: GHOSTS[1].y,
            scale: GHOSTS[1].scale,
            opacity: 1,
            filter: "blur(0px)",
          }}
          animate={{ x: "-50%", y: 0, scale: 1, opacity: 1, filter: "blur(0px)" }}
          exit={{
            x: "-50%",
            y: -72,
            scale: 0.97,
            opacity: 0,
            filter: "blur(10px)",
            zIndex: 40,
            transition: reduce ? { duration: 0 } : { duration: 0.65, ease: EXIT_EASE },
          }}
          transition={reduce ? { duration: 0 } : { duration: 0.9, ease: RISE_EASE }}
        >
          <Card t={current} />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

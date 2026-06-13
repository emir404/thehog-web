"use client";

import { motion, type HTMLMotionProps } from "motion/react";
import type { ReactNode } from "react";

type FadeInProps = HTMLMotionProps<"div"> & {
  children: ReactNode;
  /** Delay in seconds before the animation starts. */
  delay?: number;
  /** Pixels to translate up from on entry. */
  y?: number;
};

/**
 * Reveals its children with a subtle fade + rise once scrolled into view.
 * Animation runs a single time per element.
 */
export function FadeIn({ children, delay = 0, y = 16, ...props }: FadeInProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

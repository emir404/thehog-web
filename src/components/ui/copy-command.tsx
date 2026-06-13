"use client";

import { CheckIcon, CopyIcon } from "@phosphor-icons/react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

type CopyCommandProps = {
  command: string;
  className?: string;
};

/**
 * Mono "copy command" pill from the Figma CTA — translucent on a brand
 * background, copies the command to the clipboard on click.
 */
export function CopyCommand({ command, className }: CopyCommandProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(command);
    setCopied(true);
    toast.success("Copied to clipboard");
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label="Copy command"
      className={cn(
        "inline-flex items-center gap-4 rounded-[2px] bg-white/15 px-[18px] py-[14px] font-mono text-[16px] text-white transition-[background-color,scale] hover:bg-white/25 active:scale-[0.96] focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:outline-none",
        className,
      )}
    >
      <span>{command}</span>
      <span className="relative flex size-6 shrink-0 items-center justify-center">
        <AnimatePresence initial={false} mode="popLayout">
          <motion.span
            key={copied ? "check" : "copy"}
            initial={{ scale: 0.25, opacity: 0, filter: "blur(4px)" }}
            animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
            exit={{ scale: 0.25, opacity: 0, filter: "blur(4px)" }}
            transition={{ type: "spring", duration: 0.3, bounce: 0 }}
            className="absolute"
          >
            {copied ? (
              <CheckIcon className="size-6" weight="bold" />
            ) : (
              <CopyIcon className="size-6" weight="regular" />
            )}
          </motion.span>
        </AnimatePresence>
      </span>
    </button>
  );
}

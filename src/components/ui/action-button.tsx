import type { Icon } from "@phosphor-icons/react";
import { ArrowRightIcon } from "@phosphor-icons/react/dist/ssr";
import { cva, type VariantProps } from "class-variance-authority";
import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * The Hog's signature button: a sharp 2px shape with a bottom-border accent
 * and a contrasting square "icon cap" flush to the trailing edge.
 * Mirrors the Figma button component set.
 */
const actionButton = cva(
  "group/btn relative inline-flex items-center justify-between overflow-hidden rounded-[2px] border-b-2 font-medium whitespace-nowrap outline-none transition-[background-color,scale] active:scale-[0.96] focus-visible:ring-2 focus-visible:ring-brand/50 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "border-brand-dark bg-brand text-white hover:bg-brand-dark",
        tint: "border-brand bg-brand/5 text-ink hover:bg-brand/10",
        neutral: "border-sand bg-taupe/5 text-ink hover:bg-taupe/10",
        inverse: "border-white bg-white/25 text-white hover:bg-white/35",
      },
      size: {
        sm: "h-[38px] text-[14px]",
        lg: "h-[44px] text-[16px]",
      },
    },
    defaultVariants: { variant: "primary", size: "lg" },
  },
);

const labelPadding = { sm: "pl-4 pr-4", lg: "pl-[18px] pr-[18px]" } as const;

const cap = cva("flex h-full shrink-0 items-center justify-center", {
  variants: {
    variant: {
      primary: "bg-brand-dark text-white",
      tint: "bg-brand text-white",
      neutral: "bg-sand text-ink",
      inverse: "bg-white text-brand",
    },
    size: { sm: "w-[38px]", lg: "w-[44px]" },
  },
  defaultVariants: { variant: "primary", size: "lg" },
});

type Variant = NonNullable<VariantProps<typeof actionButton>["variant"]>;
type Size = NonNullable<VariantProps<typeof actionButton>["size"]>;

type ActionButtonProps = {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  /** Cap icon. Defaults to a right arrow. */
  icon?: Icon;
  className?: string;
} & (
  | ({ href: string } & Omit<ComponentProps<typeof Link>, "href" | "className">)
  | ({ href?: undefined } & Omit<ComponentProps<"button">, "className">)
);

export function ActionButton({
  children,
  variant = "primary",
  size = "lg",
  icon: IconComp = ArrowRightIcon,
  className,
  href,
  ...props
}: ActionButtonProps) {
  const content = (
    <>
      <span className={cn("flex items-center", labelPadding[size])}>{children}</span>
      <span className={cap({ variant, size })}>
        <IconComp className="size-5" weight="bold" />
      </span>
    </>
  );

  const classes = cn(actionButton({ variant, size }), className);

  if (href !== undefined) {
    return (
      <Link
        href={href}
        className={classes}
        {...(props as Omit<ComponentProps<typeof Link>, "href">)}
      >
        {content}
      </Link>
    );
  }

  return (
    <button className={classes} {...(props as ComponentProps<"button">)}>
      {content}
    </button>
  );
}

"use client";

import { BookOpenIcon, ListIcon } from "@phosphor-icons/react";
import Link from "next/link";
import { useState } from "react";
import { ActionButton } from "@/components/ui/action-button";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { nav, site } from "@/lib/site";

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-background/90 backdrop-blur-md">
      <div className="flex h-[72px] items-center justify-between px-6 lg:px-[120px]">
        {/* Left: logo + primary nav */}
        <div className="flex items-center gap-9">
          <Link href="/" aria-label={site.name} className="text-[32px] leading-none">
            🐗
          </Link>
          <nav className="hidden items-center gap-8 md:flex">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="-my-2.5 py-2.5 text-[14px] text-ink/80 transition-colors hover:text-ink"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Right: actions */}
        <div className="hidden items-center gap-2 md:flex">
          <ActionButton href={site.links.docs} variant="neutral" size="sm" icon={BookOpenIcon}>
            Read Docs
          </ActionButton>
          <ActionButton href={site.links.signup} variant="tint" size="sm">
            Get Started
          </ActionButton>
        </div>

        {/* Mobile menu */}
        <div className="md:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              render={
                <Button variant="ghost" size="icon" aria-label="Open menu" className="size-10">
                  <ListIcon className="size-5" weight="bold" />
                </Button>
              }
            />
            <SheetContent side="right" className="w-72">
              <SheetHeader>
                <SheetTitle>{site.name}</SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-1 px-4">
                {nav.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="rounded-md px-2 py-2.5 text-[14px] text-ink/80 transition-colors hover:bg-muted hover:text-ink"
                  >
                    {item.label}
                  </Link>
                ))}
                <div className="mt-4 flex flex-col gap-2">
                  <ActionButton
                    href={site.links.docs}
                    variant="neutral"
                    size="sm"
                    icon={BookOpenIcon}
                    className="w-full"
                    onClick={() => setOpen(false)}
                  >
                    Read Docs
                  </ActionButton>
                  <ActionButton
                    href={site.links.signup}
                    variant="tint"
                    size="sm"
                    className="w-full"
                    onClick={() => setOpen(false)}
                  >
                    Get Started
                  </ActionButton>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

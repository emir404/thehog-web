import Link from "next/link";
import { announcement } from "@/lib/site";

/**
 * Full-width announcement bar pinned above the header (Figma node 119:5).
 * Brand-orange background with a centered message and an underlined CTA.
 */
export function AnnouncementBanner() {
  return (
    <div className="flex min-h-12 w-full items-center justify-center bg-brand px-4 py-2 text-center">
      <p className="text-[16px] text-white">
        <span className="font-normal">{announcement.text} </span>
        <Link href={announcement.href} className="font-medium underline underline-offset-2">
          {announcement.cta} →
        </Link>
      </p>
    </div>
  );
}

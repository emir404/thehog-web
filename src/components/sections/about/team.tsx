import Image from "next/image";
import { FadeIn } from "@/components/motion/fade-in";
import { PixelCluster } from "@/components/sections/about/pixel-cluster";
import { cn } from "@/lib/utils";

/**
 * "Who We Are" section (Figma node 135:1065). An asymmetric founder collage.
 *
 * The desktop layout is a hand-placed absolute composition lifted 1:1 from
 * Figma; it only renders at ≥1440px, where the 1200px content box matches the
 * design grid exactly (container is max-w-[1440px] with 120px gutters). Below
 * that it falls back to a clean stacked flow. This mirrors how the landing
 * hero / how-it-works-art compose fixed canvases rather than reflowing.
 */

type Person = { src: string; name: string; role: string };

const HUDSON: Person = { src: "/about/hudson.webp", name: "Hudson Liao", role: "CEO, Co-founder" };
const PAULO: Person = { src: "/about/paulo.webp", name: "Paulo Nascimento", role: "CTO, Co-founder" };

// Orange motif at Hudson's lower edge (Figma group 135:1088), origin frame x553 / y538.
const TEAM_ORANGE: readonly (readonly [number, number])[] = [
  [190, 0], [222, 0], [254, 32], [286, 32], [286, 64], [318, 64], [318, 96], [348, 96],
  [380, 96], [349, 32], [349, 0], [158, 32], [126, 32], [94, 0], [63, 32], [31, 64],
  [0, 32], [0, 0], [31, 96], [94, 64], [126, 96], [190, 32], [222, 64], [190, 96], [222, 96],
];

// Cyan motif at Paulo's lower edge (Figma group 135:1066), origin frame x949 / y769. 34px squares.
const TEAM_CYAN: readonly (readonly [number, number])[] = [
  [206, 103], [240, 69], [275, 34], [309, 34], [343, 69], [378, 103], [343, 34], [343, 0],
  [378, 0], [240, 0], [172, 103], [137, 69], [137, 34], [103, 34], [69, 0], [34, 34],
  [0, 69], [34, 103], [0, 0], [34, 0], [137, 0],
];

function Portrait({
  person,
  className,
  boxClassName,
}: {
  person: Person;
  className?: string;
  boxClassName: string;
}) {
  return (
    <div className={className}>
      <div className={cn("relative overflow-hidden rounded-[4px] bg-ink-deep/[0.03]", boxClassName)}>
        <Image
          src={person.src}
          alt={person.name}
          fill
          sizes="(max-width: 360px) 100vw, 329px"
          className="object-cover"
        />
      </div>
      <div className="mt-4 text-center leading-none">
        <p className="font-heading text-[20px] font-medium tracking-[-0.2px] text-ink-deep">
          {person.name}
        </p>
        <p className="mt-2 text-[14px] tracking-[-0.14px] text-ink-deep/70">{person.role}</p>
      </div>
    </div>
  );
}

function Bio({ className }: { className?: string }) {
  return (
    <div className={cn("flex flex-col gap-4 text-[14px] leading-[1.45] text-ink-deep/80", className)}>
      <p>
        Our co-founders are a match made in GTM heaven. Our CEO, Hudson, has almost 15 years a
        growth experience. He ran a growth agency and has been a 5x first growth hire for startups
        ranging from bio-tech to enterprise SaaS. Paulo, our CTO, has been an AI-engineer since he
        was 16 and working at places like Auth0 and Okta.
      </p>
      <p>
        Together, they have used AI to create the dream marketing and sales tool that can
        supercharge any companies&rsquo; growth.
      </p>
    </div>
  );
}

export function WhoWeAre() {
  return (
    <section className="bg-background">
      <div className="mx-auto w-full max-w-[1440px] px-6 py-24 sm:py-32 lg:px-[120px]">
        <FadeIn>
          <h2 className="font-heading text-[40px] font-medium leading-[1.15] tracking-[-1.2px] text-ink-deep">
            Who We Are
          </h2>
        </FadeIn>

        {/* Desktop collage — exact Figma coordinates, only where the content box is 1200px */}
        <FadeIn className="relative mt-16 hidden h-[773px] min-[1440px]:block" delay={0.1}>
          <Portrait
            person={HUDSON}
            className="absolute left-[475px] top-0 w-[329px]"
            boxClassName="h-[460px] w-[329px]"
          />
          <Portrait
            person={PAULO}
            className="absolute left-[871px] top-[240px] w-[327px]"
            boxClassName="h-[459px] w-[327px]"
          />
          <Bio className="absolute left-0 top-[579px] w-[530px]" />
          <PixelCluster
            pixels={TEAM_ORANGE}
            colorClass="bg-brand"
            className="left-[433px] top-[343px] h-[128px] w-[412px]"
          />
          <PixelCluster
            pixels={TEAM_CYAN}
            colorClass="bg-cyan"
            sizeClass="size-[35px]"
            className="left-[829px] top-[574px] h-[137px] w-[412px]"
          />
        </FadeIn>

        {/* Stacked fallback — below the design width */}
        <div className="mt-12 flex flex-col gap-12 min-[1440px]:hidden">
          <Portrait
            person={HUDSON}
            className="mx-auto w-full max-w-[329px]"
            boxClassName="aspect-[329/460] w-full"
          />
          <Portrait
            person={PAULO}
            className="mx-auto w-full max-w-[327px]"
            boxClassName="aspect-[327/459] w-full"
          />
          <Bio className="mx-auto w-full max-w-[530px]" />
        </div>
      </div>
    </section>
  );
}

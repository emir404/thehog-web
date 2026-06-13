import {
  AirweaveLogo,
  MicrosoftLogo,
  OnyxLogo,
  OpenAILogo,
} from "@/components/logos";
import { FadeIn } from "@/components/motion/fade-in";

const logos = [
  { name: "OpenAI", Logo: OpenAILogo },
  { name: "Microsoft", Logo: MicrosoftLogo },
  { name: "Onyx", Logo: OnyxLogo },
  { name: "Airweave", Logo: AirweaveLogo },
];

export function TrustedBy() {
  return (
    <section className="px-6 py-20 text-[#220c01]">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-8">
        <FadeIn>
          <p className="text-center text-lg leading-[1.5] text-[#220c01]/80">
            Trusted by industry leaders
          </p>
        </FadeIn>

        <div className="flex w-full flex-wrap items-center justify-center gap-x-9 gap-y-6">
          {logos.map(({ name, Logo }, i) => (
            <FadeIn key={name} delay={0.05 + i * 0.05}>
              <Logo />
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

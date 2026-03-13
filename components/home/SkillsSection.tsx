import RevealHero from "@/components/animations/RevealHero";
import Reveal from "@/components/animations/Reveal";
import { getPayloadInstance } from "@/payload";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface Skill {
  name: string;
  iconUrl: string;
  url?: string | null;
  id?: string | null;
}

import Image from "next/image";

export default async function SkillsSection() {
  const payload = await getPayloadInstance();
  const skills = await payload.findGlobal({
    slug: "skills",
  });

  return (
    <section
      id="skills"
      className="mx-auto flex w-full max-w-5xl flex-col gap-5 px-4 py-12"
    >
      <div className="space-y-3">
        <Reveal delay={0.05}>
          <span className="soft-outline inline-flex px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            Capabilities
          </span>
        </Reveal>
        <RevealHero
          className="text-3xl font-bold sm:text-4xl md:text-5xl"
          delay={0.08}
        >
          Skills & Technologies
        </RevealHero>
        <Reveal delay={0.12}>
          <p className="max-w-3xl text-balance text-muted-foreground sm:text-base">
            My day-to-day toolkit for designing, developing, and shipping
            reliable digital products.
          </p>
        </Reveal>
      </div>

      <div className="mt-2 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {!skills.items?.length && (
          <span className="col-span-full mx-auto text-2xl font-extralight text-muted-foreground">
            No Skills Yet
          </span>
        )}

        {skills.items &&
          skills.items.map((skill: Skill, index: number) => (
            <Reveal key={skill.id} delay={index * 0.04}>
              <SkillItem skill={skill} />
            </Reveal>
          ))}
      </div>
    </section>
  );
}

function SkillItem({ skill }: { skill: Skill }) {
  const content = (
    <div
      className={cn(
        "group relative flex h-full flex-col items-center gap-3 rounded-2xl border border-border/75 bg-card/85 p-4 text-center transition-all duration-200",
        "hover:-translate-y-1 hover:border-primary/45 hover:shadow-[0_20px_55px_-40px_rgba(27,95,197,0.5)]",
      )}
    >
      <div className="flex size-16 items-center justify-center rounded-2xl border border-border/70 bg-background/80 p-2.5">
        <Image
          src={skill.iconUrl}
          alt={skill.name}
          width={40}
          height={40}
          className="size-full rounded-lg object-contain"
        />
      </div>
      <p className="text-sm font-semibold text-foreground">{skill.name}</p>
    </div>
  );

  if (!skill.url) {
    return content;
  }

  return (
    <Link
      href={skill.url}
      target="_blank"
      rel="noopener noreferrer"
      className="h-full"
    >
      {content}
    </Link>
  );
}

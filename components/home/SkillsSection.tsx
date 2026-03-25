import RevealHero from "@/components/animations/RevealHero";
import Reveal from "@/components/animations/Reveal";
import { getPayloadInstance } from "@/payload";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Badge } from "../ui/badge";

interface Skill {
  name: string;
  iconUrl: string;
  url?: string | null;
  id?: string | null;
}

export default async function SkillsSection() {
  const payload = await getPayloadInstance();
  const skills = await payload.findGlobal({
    slug: "skills",
  });

  return (
    <section
      id="skills"
      className="flex flex-col gap-8 py-16 px-4 rail-bounded"
    >
      <div className="flex flex-col gap-2">
         <RevealHero className="text-3xl md:text-5xl font-black uppercase tracking-tight">
           Tech Stack
         </RevealHero>
         <p className="text-muted-foreground font-mono text-sm uppercase tracking-widest max-w-xl">
           Arsenal of tools and technologies
         </p>
      </div>

      <div className="relative border border-border bg-background p-8 lg:p-12">
        <div className="absolute inset-0 diagonal-pattern opacity-10 pointer-events-none"></div>
        <div className="relative z-10 flex flex-row flex-wrap gap-4 md:gap-6 justify-center">
          {!skills.items?.length && (
            <span className="text-sm font-mono uppercase tracking-widest text-muted-foreground mx-auto">
              No Skills Logged
            </span>
          )}

          {skills.items &&
            skills.items.map((skill: Skill, index: number) => (
              <Reveal key={skill.id} delay={index * 0.05}>
                <SkillItem skill={skill} />
              </Reveal>
            ))}
        </div>
      </div>
    </section>
  );
}

function SkillItem({ skill }: { skill: Skill }) {
  return (
    <Link
      href={skill.url || "#"}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "flex flex-col items-center justify-center relative w-20 h-20 md:w-24 md:h-24",
        "border border-border bg-background hover:bg-muted group transition-all duration-300",
        "hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]"
      )}
    >
      <img
        src={skill.iconUrl}
        alt={skill.name}
        className="w-8 h-8 md:w-10 md:h-10 transition-all duration-300 drop-shadow-[0_0_2px_rgba(0,0,0,0.5)] dark:drop-shadow-[0_0_2px_rgba(255,255,255,0.5)]"
      />
      <div
        className={cn(
          "absolute top-[calc(100%+0.5rem)] left-1/2 transform -translate-x-1/2 z-50",
          "opacity-0 group-hover:opacity-100",
          "transition-all duration-150 pointer-events-none",
        )}
      >
         <Badge className="rounded-none font-mono text-[10px] uppercase tracking-widest shadow-none border-border whitespace-nowrap">
           {skill.name}
         </Badge>
      </div>
    </Link>
  );
}

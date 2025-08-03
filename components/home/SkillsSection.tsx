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
    <section className="flex flex-col py-16 px-4 max-w-4xl mx-auto w-full">
      <RevealHero className="text-3xl md:text-5xl font-bold">
        Skills & Technologies
      </RevealHero>
      <p className="text-muted-foreground">
        Here are the technologies and tools I work with to bring ideas to life
      </p>

      <div className="flex flex-row items-center flex-wrap gap-8 md:gap-12 justify-center mt-4">
        {!skills.items?.length && (
          <span className="text-2xl font-extralight text-muted-foreground mx-auto">
            No Skills Yet
          </span>
        )}

        {skills.items &&
          skills.items.map((skill: Skill, index: number) => (
            <Reveal key={skill.id} delay={index * 0.1}>
              <SkillItem skill={skill} />
            </Reveal>
          ))}
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
        "flex flex-col items-center relative",
        "bg-secondary p-2 rounded-xl group"
      )}
    >
      <img
        src={skill.iconUrl}
        alt={skill.name}
        className="size-16 rounded-md"
      />
      <Badge
        className={cn(
          "absolute top-full left-1/2 transform -translate-x-1/2",
          "-translate-y-2 group-hover:translate-y-0",
          "opacity-0 group-hover:opacity-100",
          "scale-0 group-hover:scale-100",
          "transition-all duration-150"
        )}
      >
        {skill.name}
      </Badge>
    </Link>
  );
}

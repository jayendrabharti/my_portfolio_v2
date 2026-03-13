import RevealHero from "@/components/animations/RevealHero";
import Reveal from "@/components/animations/Reveal";
import { StaggerContainer, StaggerItem } from "@/components/animations/Stagger";
import ProjectCard from "@/components/projects/ProjectCard";
import { getPayloadInstance } from "@/payload";
import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";

export default async function ProjectsSection() {
  const payload = await getPayloadInstance();
  const projects = await payload.find({
    collection: "projects",
    where: {
      and: [
        {
          featured: {
            equals: true,
          },
        },
        {
          _status: {
            equals: "published",
          },
        },
      ],
    },
  });

  return (
    <section
      id="projects"
      className="mx-auto flex w-full max-w-5xl flex-col gap-5 px-4 py-12"
    >
      <div className="space-y-3">
        <Reveal delay={0.05}>
          <span className="soft-outline inline-flex px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            Selected Work
          </span>
        </Reveal>
        <RevealHero
          className="text-3xl font-bold sm:text-4xl md:text-5xl"
          delay={0.08}
        >
          Projects That Solve Real Problems
        </RevealHero>
        <Reveal delay={0.12}>
          <p className="max-w-3xl text-balance text-muted-foreground sm:text-base">
            A curated selection of products I designed and built to improve user
            experience, performance, and business outcomes.
          </p>
        </Reveal>
      </div>

      {!projects.docs.length ? (
        <span className="text-2xl font-extralight text-muted-foreground mx-auto">
          No Featured Projects
        </span>
      ) : (
        <StaggerContainer className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {projects.docs.map((project) => (
            <StaggerItem key={project.id} type="scaleOut">
              <ProjectCard project={project} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      )}

      <Reveal delay={0.2}>
        <Link
          href="/projects"
          className="mx-auto inline-flex items-center gap-2 rounded-full border border-border bg-background/70 px-5 py-2.5 text-sm font-semibold text-foreground transition-all duration-200 hover:-translate-y-0.5 hover:border-primary hover:text-primary"
        >
          Explore All Projects
          <ArrowRightIcon className="h-4 w-4" />
        </Link>
      </Reveal>
    </section>
  );
}

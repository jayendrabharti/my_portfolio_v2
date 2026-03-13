import { StaggerContainer, StaggerItem } from "@/components/animations/Stagger";
import RevealHero from "@/components/animations/RevealHero";
import Reveal from "@/components/animations/Reveal";
import ProjectCard from "@/components/projects/ProjectCard";
import { getPayloadInstance } from "@/payload";

export default async function ProjectsPage() {
  const payload = await getPayloadInstance();
  const projects = await payload.find({
    collection: "projects",
    where: {
      _status: {
        equals: "published",
      },
    },
  });

  return (
    <section className="mx-auto flex w-full max-w-5xl flex-col gap-5 px-4 py-12">
      <div className="space-y-3">
        <Reveal>
          <span className="soft-outline inline-flex px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            Portfolio
          </span>
        </Reveal>
        <RevealHero
          className="text-3xl font-bold sm:text-4xl md:text-5xl"
          delay={0.05}
        >
          All Projects
        </RevealHero>
        <Reveal delay={0.1}>
          <p className="max-w-3xl text-balance text-muted-foreground sm:text-base">
            A complete collection of my shipped work, experiments, and product
            case studies.
          </p>
        </Reveal>
      </div>

      {!projects.docs.length && (
        <span className="text-2xl font-extralight text-muted-foreground mx-auto">
          No Projects Yet
        </span>
      )}

      <StaggerContainer className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {projects.docs.map((project) => (
          <StaggerItem key={project.id} type="scaleOut">
            <ProjectCard project={project} />
          </StaggerItem>
        ))}
      </StaggerContainer>
    </section>
  );
}

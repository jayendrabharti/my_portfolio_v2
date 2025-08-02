import RevealHero from "@/components/animations/RevealHero";
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
    <section className="flex flex-col gap-4 py-8 px-4 max-w-4xl mx-auto w-full">
      <RevealHero className="mx-auto text-3xl md:text-5xl font-bold">
        Projects
      </RevealHero>

      {!projects.docs.length && (
        <span className="text-2xl font-extralight text-muted-foreground mx-auto">
          No Projects Yet
        </span>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {projects.docs.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
}

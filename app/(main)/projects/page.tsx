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
    <section className="flex flex-col gap-0 py-8 px-4 rail-bounded min-h-[calc(100vh-200px)]">
      <div className="border-[3px] border-border bg-background p-8 md:p-12 mb-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] relative overflow-hidden">
        <div className="absolute inset-0 diagonal-pattern opacity-10 pointer-events-none" />
        <RevealHero className="relative z-10 text-4xl md:text-6xl font-black tracking-tighter uppercase">
          SYSTEM_PROJECTS
        </RevealHero>
        <p className="relative z-10 font-mono text-sm mt-4 tracking-widest text-muted-foreground uppercase max-w-lg">
          ARCHIVE OF DEPLOYED SYSTEMS AND STRUCTURAL INITIATIVES.
        </p>
      </div>

      {!projects.docs.length && (
        <div className="border-2 border-border border-dashed p-12 text-center text-muted-foreground font-mono text-sm tracking-widest uppercase">
          NO PROJECTS REGISTERED IN DATABASE OVERRIDE.
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projects.docs.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
}

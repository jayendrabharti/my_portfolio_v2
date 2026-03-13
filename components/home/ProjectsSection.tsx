import RevealHero from "@/components/animations/RevealHero";
import ProjectCard from "@/components/projects/ProjectCard";
import { getPayloadInstance } from "@/payload";
import { ChevronDownIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";

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
      className="flex flex-col gap-8 py-16 px-4 rail-bounded"
    >
      <div className="flex flex-col gap-2">
        <RevealHero className="text-3xl md:text-5xl font-black uppercase tracking-tight">
          Featured
        </RevealHero>
        <p className="text-muted-foreground font-mono text-sm uppercase tracking-widest max-w-xl">
          Selected public projects
        </p>
      </div>

      {!projects.docs.length ? (
        <div className="h-32 border border-dashed border-border flex items-center justify-center diagonal-pattern-subtle">
           <span className="text-sm font-mono uppercase tracking-widest text-muted-foreground">
             No Projects Yet
           </span>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-border border border-border">
          {projects.docs.map((project) => (
             <div key={project.id} className="bg-background h-full flex flex-col">
               <ProjectCard project={project} />
             </div>
          ))}
        </div>
      )}
      
      <div className="flex justify-center mt-4">
        <Link href={"/projects"}>
          <Button variant="outline" className="rounded-none font-mono uppercase tracking-widest px-8">
            All Projects <ChevronDownIcon className="w-4 h-4 ml-2" />
          </Button>
        </Link>
      </div>
    </section>
  );
}

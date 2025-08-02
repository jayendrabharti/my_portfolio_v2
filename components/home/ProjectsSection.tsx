import RevealHero from "@/components/animations/RevealHero";
import ProjectCard from "@/components/projects/ProjectCard";
import { getPayloadInstance } from "@/payload";
import { ChevronDownIcon } from "lucide-react";
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
      className="flex flex-col gap-4 py-8 px-4 max-w-4xl mx-auto w-full"
    >
      <RevealHero className="text-3xl md:text-5xl font-bold">
        Projects
      </RevealHero>
      <p className="text-muted-foreground text-balance">
        A few recent projects that highlight my skills and creativity.
      </p>

      {!projects.docs.length ? (
        <span className="text-2xl font-extralight text-muted-foreground mx-auto">
          No Featured Projects
        </span>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {projects.docs.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}
      <Link
        href={"/projects"}
        className="mx-auto flex flex-row items-center text-zinc-600 dark:text-zinc-400 hover:text-black hover:dark:text-white font-bold gap-1"
      >
        <ChevronDownIcon />
        View All Projects
      </Link>
    </section>
  );
}

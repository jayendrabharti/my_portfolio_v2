import { Project } from "@/payload/payload-types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ExternalLink,
  Calendar,
  Image as ImageIcon,
  GithubIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function ProjectCard({ project }: { project: Project }) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="flex flex-col border border-border bg-transparent group relative hover:border-foreground transition-colors duration-300">
      <div className="absolute inset-0 bg-black/[0.02] dark:bg-white/[0.02] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
      <div className="relative h-48 border-b border-border bg-muted overflow-hidden">
        {project.coverImage &&
        typeof project.coverImage === "object" &&
        project.coverImage.url ? (
          <Image
            src={project.coverImage.url}
            alt={`${project.title} cover`}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500 grayscale group-hover:grayscale-0"
          />
        ) : (
          <div className="w-full h-full bg-muted flex items-center justify-center diagonal-pattern-subtle">
            <ImageIcon className="w-8 h-8 text-foreground/20" />
          </div>
        )}
      </div>

      <div className="flex flex-col flex-1 p-5 gap-4 relative z-10">
        <div className="space-y-2">
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-xl font-bold uppercase tracking-wide text-foreground line-clamp-2">
              {project.title}
            </h3>
          </div>

          {/* Published Date */}
          {project.publishedAt && (
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-muted-foreground">
              <Calendar className="w-3 h-3" />
              {formatDate(project.publishedAt)}
            </div>
          )}
        </div>

        {/* Description */}
        <p className="text-foreground/80 mb-2 line-clamp-3 leading-relaxed text-sm">
          {project.description}
        </p>

        {/* Tags */}
        {project.tags && project.tags.length > 0 && (
          <div className="mt-auto mb-4 border-t border-dashed border-border pt-4">
            <div className="flex flex-wrap gap-2">
              {project.tags.slice(0, 6).map((tagItem, index) => (
                <Badge key={tagItem.id || index} variant="outline" className="font-mono text-[10px] uppercase rounded-none border-border">
                  {tagItem.tag}
                </Badge>
              ))}
              {project.tags.length > 6 && (
                <Badge variant="outline" className="font-mono text-[10px] uppercase rounded-none border-border">
                  +{project.tags.length - 6}
                </Badge>
              )}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-2 flex-row justify-end mt-auto">
          {project.githubUrl && (
            <Link
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1"
            >
              <Button variant="outline" size="sm" className="w-full rounded-none font-mono uppercase tracking-widest text-xs h-9">
                <GithubIcon className="w-3 h-3 mr-2" />
                Code
              </Button>
            </Link>
          )}

          {project.liveUrl && (
            <Link
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1"
            >
              <Button size="sm" className="w-full rounded-none font-mono uppercase tracking-widest text-xs h-9">
                <ExternalLink className="w-3 h-3 mr-2" />
                Visit
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

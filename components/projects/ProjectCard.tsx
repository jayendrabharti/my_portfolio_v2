import { Project } from "@/payload/payload-types";
import { Card, CardContent } from "@/components/ui/card";
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

export default function ProjectCard({ project }: { project: Project }) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    });
  };

  return (
    <Card className="group relative flex h-full flex-col overflow-hidden border-border/50 bg-card/85 pt-0 backdrop-blur-md transition-all duration-500 hover:-translate-y-2 hover:border-primary/40 hover:shadow-[0_40px_80px_-30px_rgba(27,95,197,0.15)] hover:bg-card">
      <div className="relative h-56 overflow-hidden bg-muted/30">
        {project.coverImage &&
        typeof project.coverImage === "object" &&
        project.coverImage.url ? (
          <Image
            src={project.coverImage.url}
            alt={`${project.title} cover`}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-linear-to-br from-muted to-muted/50">
            <ImageIcon className="w-12 h-12 text-muted-foreground" />
          </div>
        )}

        <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-background/75 via-transparent to-transparent opacity-80" />
      </div>

      <CardContent className="flex h-full flex-col gap-4">
        <div className="space-y-2">
          <div className="flex items-start justify-between gap-2">
            <h3 className="line-clamp-2 text-xl font-semibold transition-colors group-hover:text-primary">
              {project.title}
            </h3>
          </div>

          {/* Published Date */}
          {project.publishedAt && (
            <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <Calendar className="w-3 h-3" />
              {formatDate(project.publishedAt)}
            </div>
          )}
        </div>

        {/* Description */}
        <p className="line-clamp-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
          {project.description}
        </p>

        {/* Tags */}
        {project.tags && project.tags.length > 0 && (
          <div>
            <div className="flex flex-wrap gap-1.5">
              {project.tags.slice(0, 6).map((tagItem, index) => (
                <Badge
                  key={tagItem.id || index}
                  variant="outline"
                  className="rounded-full border-border/80 bg-background/60 px-2.5 py-1 text-[11px] font-medium"
                >
                  {tagItem.tag}
                </Badge>
              ))}
              {project.tags.length > 6 && (
                <Badge
                  variant="outline"
                  className="rounded-full px-2.5 py-1 text-[11px]"
                >
                  +{project.tags.length - 6} more
                </Badge>
              )}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="mt-auto flex flex-wrap items-center justify-end gap-2">
          {project.githubUrl && (
            <Link
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="outline" size="sm" className="rounded-full">
                <GithubIcon className="w-4 h-4" />
                Code
              </Button>
            </Link>
          )}

          {project.liveUrl && (
            <Link
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                size="sm"
                className="rounded-full shadow-md shadow-primary/25"
              >
                <ExternalLink className="w-4 h-4" />
                Live Demo
              </Button>
            </Link>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

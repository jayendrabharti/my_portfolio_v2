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
    <Card className="pt-0 group hover:shadow-lg transition-all duration-300 overflow-hidden border-border/50 hover:border-border">
      <div className="relative h-48 overflow-hidden bg-muted">
        {project.coverImage &&
        typeof project.coverImage === "object" &&
        project.coverImage.url ? (
          <Image
            src={project.coverImage.url}
            alt={`${project.title} cover`}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center">
            <ImageIcon className="w-12 h-12 text-muted-foreground" />
          </div>
        )}
      </div>

      <CardContent className="flex flex-col gap-3">
        <div className="space-y-2">
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-xl font-semibold line-clamp-2 group-hover:text-primary transition-colors">
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
        <p className="text-muted-foreground mb-4 line-clamp-3 leading-relaxed">
          {project.description}
        </p>

        {/* Tags */}
        {project.tags && project.tags.length > 0 && (
          <div className="mb-6">
            <div className="flex flex-wrap gap-1.5">
              {project.tags.slice(0, 6).map((tagItem, index) => (
                <Badge key={tagItem.id || index}>{tagItem.tag}</Badge>
              ))}
              {project.tags.length > 6 && (
                <Badge>+{project.tags.length - 6} more</Badge>
              )}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-2 flex-row justify-end">
          {project.githubUrl && (
            <Link
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="outline" size="sm" className="flex-1">
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
              <Button size="sm" className="flex-1">
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

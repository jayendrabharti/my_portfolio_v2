import { Blog } from "@/payload/payload-types";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ExternalLink,
  Calendar,
  Image as ImageIcon,
  EyeIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import BlogViews from "./BlogViews";
import { RichText } from "@payloadcms/richtext-lexical/react";

export default function BlogCard({ blog }: { blog: Blog }) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <Card className="group relative flex h-full flex-col overflow-hidden border-border/50 bg-card/85 pt-0 backdrop-blur-md transition-all duration-500 hover:-translate-y-2 hover:border-primary/40 hover:shadow-[0_40px_80px_-30px_rgba(27,95,197,0.15)] hover:bg-card">
      <div className="relative h-56 overflow-hidden bg-muted/30">
        {blog.coverImage &&
        typeof blog.coverImage === "object" &&
        blog.coverImage.url ? (
          <Image
            src={blog.coverImage.url}
            alt={`${blog.title} cover`}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-linear-to-br from-muted to-muted/50">
            <ImageIcon className="w-12 h-12 text-muted-foreground" />
          </div>
        )}

        <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-background/75 via-transparent to-transparent opacity-85" />
      </div>

      <CardContent className="flex h-full flex-col gap-4">
        <div className="space-y-2">
          <div className="flex items-start justify-between gap-2">
            <h3 className="line-clamp-2 text-xl font-semibold transition-colors group-hover:text-primary">
              {blog.title}
            </h3>
          </div>

          {/* Published Date */}
          {blog.publishedAt && (
            <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <Calendar className="w-3 h-3" />
              {formatDate(blog.publishedAt)}
            </div>
          )}
        </div>

        {blog.content?.root?.children && (
          <div className="line-clamp-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
            <RichText data={blog.content} />
          </div>
        )}

        {/* Tags */}
        {blog.tags && blog.tags.length > 0 && (
          <div>
            <div className="flex flex-wrap gap-1.5">
              {blog.tags.slice(0, 6).map((tagItem, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="rounded-full border-border/80 bg-background/60 px-2.5 py-1 text-[11px] font-medium"
                >
                  {tagItem.tag}
                </Badge>
              ))}
              {blog.tags.length > 6 && (
                <Badge
                  variant="outline"
                  className="rounded-full px-2.5 py-1 text-[11px]"
                >
                  +{blog.tags.length - 6} more
                </Badge>
              )}
            </div>
          </div>
        )}

        {/* Action Button */}
        <div className="mt-auto flex items-center justify-between gap-2">
          {/* Views */}
          <div className="flex items-center gap-1 rounded-full border border-border/70 bg-background/65 px-2.5 py-1 text-xs text-muted-foreground">
            <EyeIcon
              className="w-4 h-4 text-muted-foreground"
              aria-hidden="true"
            />
            <span>
              <BlogViews slug={blog.slug as string} />
              &nbsp;views
            </span>
          </div>
          {blog.slug && (
            <Link href={`/blogs/${blog.slug}`}>
              <Button
                size="sm"
                className="rounded-full shadow-md shadow-primary/25"
              >
                <ExternalLink className="w-4 h-4" />
                Read More
              </Button>
            </Link>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

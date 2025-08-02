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
    <Card className="pt-0 group hover:shadow-lg transition-all duration-300 overflow-hidden border-border/50 hover:border-border">
      <div className="relative h-48 overflow-hidden bg-muted">
        {blog.coverImage &&
        typeof blog.coverImage === "object" &&
        blog.coverImage.url ? (
          <Image
            src={blog.coverImage.url}
            alt={`${blog.title} cover`}
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
          <div className="text-muted-foreground mb-4 line-clamp-3 truncate leading-relaxed">
            <RichText data={blog.content} />
          </div>
        )}

        {/* Tags */}
        {blog.tags && blog.tags.length > 0 && (
          <div className="mb-6">
            <div className="flex flex-wrap gap-1.5">
              {blog.tags.slice(0, 6).map((tagItem, index) => (
                <Badge key={index}>{tagItem.tag}</Badge>
              ))}
              {blog.tags.length > 6 && (
                <Badge>+{blog.tags.length - 6} more</Badge>
              )}
            </div>
          </div>
        )}

        {/* Action Button */}
        <div className="flex gap-2 flex-row justify-between items-center">
          {/* Views */}
          <div className="flex items-center gap-1">
            <EyeIcon
              className="w-4 h-4 text-muted-foreground"
              aria-hidden="true"
            />
            <span className="text-sm text-muted-foreground">
              <BlogViews slug={blog.slug as string} />
              &nbsp;views
            </span>
          </div>
          {blog.slug && (
            <Link href={`/blogs/${blog.slug}`}>
              <Button size="sm" className="flex-1">
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

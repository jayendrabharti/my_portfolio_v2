import { Blog } from "@/payload/payload-types";
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
    <div className="flex flex-col border border-border bg-transparent group relative hover:border-foreground transition-colors duration-300">
      <div className="absolute inset-0 bg-black/[0.02] dark:bg-white/[0.02] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
      <div className="relative aspect-video w-full border-b border-border bg-muted overflow-hidden">
        {blog.coverImage &&
        typeof blog.coverImage === "object" &&
        blog.coverImage.url ? (
          <Image
            src={blog.coverImage.url}
            alt={`${blog.title} cover`}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
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
              {blog.title}
            </h3>
          </div>

          {/* Published Date */}
          {blog.publishedAt && (
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-muted-foreground">
              <Calendar className="w-3 h-3" />
              {formatDate(blog.publishedAt)}
            </div>
          )}
        </div>

        {blog.content?.root?.children && (
          <div className="text-foreground/80 mb-2 line-clamp-3 text-sm leading-relaxed truncate-rich-text">
            <RichText data={blog.content} />
          </div>
        )}

        {/* Tags */}
        {blog.tags && blog.tags.length > 0 && (
          <div className="mt-auto mb-4 border-t border-dashed border-border pt-4">
            <div className="flex flex-wrap gap-2">
              {blog.tags.slice(0, 6).map((tagItem, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="font-mono text-[10px] uppercase rounded-none border-border"
                >
                  {tagItem.tag}
                </Badge>
              ))}
              {blog.tags.length > 6 && (
                <Badge
                  variant="outline"
                  className="font-mono text-[10px] uppercase rounded-none border-border"
                >
                  +{blog.tags.length - 6}
                </Badge>
              )}
            </div>
          </div>
        )}

        {/* Action Button */}
        <div className="flex gap-4 flex-row justify-between items-center border-t border-border pt-4 mt-auto">
          {/* Views */}
          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-muted-foreground">
            <EyeIcon className="w-3 h-3" aria-hidden="true" />
            <span>
              <BlogViews slug={blog.slug as string} />
              &nbsp;views
            </span>
          </div>
          {blog.slug && (
            <Link href={`/blogs/${blog.slug}`}>
              <Button
                size="sm"
                variant="ghost"
                className="rounded-none font-mono uppercase tracking-widest text-xs h-8 hover:bg-transparent hover:text-foreground"
              >
                Read full <ExternalLink className="w-3 h-3 ml-2" />
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

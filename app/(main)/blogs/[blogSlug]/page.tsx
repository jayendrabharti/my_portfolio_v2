import { cn } from "@/lib/utils";
import { getPayloadInstance } from "@/payload";
import { formatTimestamp } from "@/utils/utils";
import { RichText } from "@payloadcms/richtext-lexical/react";
import { ArrowLeftIcon, EyeIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import BlogViews from "@/components/blogs/BlogViews";
import { Badge } from "@/components/ui/badge";

export async function generateStaticParams() {
  const payload = await getPayloadInstance();
  const blogs = await payload.find({
    collection: "blogs",
    where: {
      _status: {
        equals: "published",
      },
    },
  });
  return blogs.docs
    .filter((blog) => blog.slug)
    .map((blog) => ({
      blogSlug: blog.slug!,
    }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ blogSlug: string }>;
}): Promise<Metadata> {
  try {
    const { blogSlug } = await params;
    const payload = await getPayloadInstance();
    const {
      docs: [blog],
    } = await payload.find({
      collection: "blogs",
      where: {
        and: [
          {
            slug: {
              equals: blogSlug,
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

    if (!blog) {
      return {
        title: "Blog Not Found",
        description: "The requested blog post could not be found.",
      };
    }

    const coverImageUrl =
      typeof blog.coverImage === "object" &&
      blog.coverImage !== null &&
      "url" in blog.coverImage &&
      blog.coverImage.url
        ? (blog.coverImage.url as string)
        : typeof blog.coverImage === "string"
          ? blog.coverImage
          : "/placeholder.png";

    return {
      title: blog.title,
      description: `Read ${blog.title} by Jayendra Bharti`,
      openGraph: {
        title: blog.title,
        description: `Read ${blog.title} by Jayendra Bharti`,
        type: "article",
        publishedTime: blog.publishedAt || blog.createdAt,
        authors: ["Jayendra Bharti"],
        images: [
          {
            url: coverImageUrl,
            width: 1200,
            height: 630,
            alt: blog.title,
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: blog.title,
        description: `Read ${blog.title} by Jayendra Bharti`,
        images: [coverImageUrl],
      },
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: "Blog Not Found",
      description: "The requested blog post could not be found.",
    };
  }
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ blogSlug: string }>;
}) {
  const { blogSlug } = await params;
  const payload = await getPayloadInstance();

  const {
    docs: [blog],
  } = await payload.find({
    collection: "blogs",
    where: {
      and: [
        {
          slug: {
            equals: blogSlug,
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

  if (!blog) {
    notFound();
  }

  const profile = await payload.findGlobal({
    slug: "profile",
  });

  const avatarSrc =
    typeof profile.avatar === "object" &&
    profile.avatar !== null &&
    "url" in profile.avatar
      ? (profile.avatar.url as string)
      : "/default-avatar.png";
  const coverImageSrc =
    typeof blog.coverImage === "object" &&
    blog.coverImage !== null &&
    "url" in blog.coverImage
      ? (blog.coverImage.url as string)
      : "/default-cover.png";

  return (
    <article
      className={cn(
        "mx-auto flex max-w-5xl flex-col gap-6 px-4 py-10 sm:px-6 md:px-8",
        "min-h-screen",
      )}
    >
      {/* Back to Blogs Button */}
      <div className="flex justify-end">
        <Link
          href="/blogs"
          className="inline-flex items-center gap-2 rounded-full border border-border bg-background/70 px-4 py-2 text-sm font-medium text-muted-foreground transition-colors duration-200 hover:border-primary hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          aria-label="Go back to blogs page"
        >
          <ArrowLeftIcon className="w-4 h-4" />
          <span>Back to Blogs</span>
        </Link>
      </div>

      {/* Blog Header */}
      <header className="ambient-panel space-y-5 p-5 sm:p-7">
        <h1 className="display-title text-3xl font-extrabold leading-tight sm:text-4xl md:text-5xl">
          {blog.title}
        </h1>

        {/* Author and Metadata */}
        <div className="flex flex-col gap-3 text-muted-foreground sm:flex-row sm:items-center">
          <div className="flex items-center gap-3">
            <Link
              href={profile.githubUrl ?? "#"}
              target="_blank"
              className="focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-full"
            >
              <Image
                src={avatarSrc}
                alt="profile picture"
                width={40}
                height={40}
                className="aspect-square h-10 w-10 cursor-pointer rounded-full border-2 border-border object-cover transition-colors hover:border-primary"
              />
            </Link>
            <div className="flex flex-col gap-1 sm:flex-row sm:items-center">
              <span className="font-semibold text-foreground">
                {profile.name}
              </span>
              <span className="hidden sm:inline text-muted-foreground">/</span>
              <time
                dateTime={blog.publishedAt ?? ""}
                className="text-sm text-muted-foreground"
              >
                {formatTimestamp(blog.publishedAt ?? "", 2)}
              </time>
            </div>
          </div>

          {/* Views */}
          <div className="flex items-center gap-1 rounded-full border border-border/75 bg-background/70 px-2.5 py-1 text-xs sm:ml-auto">
            <EyeIcon
              className="h-4 w-4 text-muted-foreground"
              aria-hidden="true"
            />
            <span>
              <BlogViews slug={blog.slug as string} increment={true} />
              &nbsp;views
            </span>
          </div>
        </div>

        {/* Tags */}
        {blog.tags && blog.tags.length > 0 && (
          <div
            className="flex flex-wrap gap-2"
            role="list"
            aria-label="Blog tags"
          >
            {blog.tags.map((tag, index) => (
              <Badge
                variant="outline"
                key={index}
                className="rounded-full bg-background/70"
              >
                {tag.tag}
              </Badge>
            ))}
          </div>
        )}
      </header>

      {/* Cover Image */}
      {blog.coverImage && (
        <div className="overflow-hidden rounded-3xl border border-border/75">
          <Image
            src={coverImageSrc}
            alt={`Cover image for ${blog.title}`}
            width={1200}
            height={700}
            className="h-auto w-full object-cover"
          />
        </div>
      )}

      {/* Blog Content */}
      <div className="ambient-panel prose prose-zinc max-w-none wrap-break-word p-5 text-foreground sm:p-8 dark:prose-invert">
        <RichText data={blog.content} className="text-foreground" />
      </div>
    </article>
  );
}

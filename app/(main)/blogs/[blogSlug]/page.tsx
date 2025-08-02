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
      typeof blog.coverImage === "string"
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
        "flex flex-col gap-6 p-4 sm:p-6 md:p-8 lg:p-10 mx-auto max-w-4xl relative",
        "min-h-screen"
      )}
    >
      {/* Back to Blogs Button */}
      <div className="flex justify-end">
        <Link
          href="/blogs"
          className="flex items-center gap-2 px-4 py-2 bg-muted text-muted-foreground rounded-full hover:bg-muted/80 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          aria-label="Go back to blogs page"
        >
          <ArrowLeftIcon className="w-4 h-4" />
          <span className="text-sm font-medium">Back to Blogs</span>
        </Link>
      </div>

      {/* Blog Header */}
      <header className="space-y-4">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-foreground leading-tight">
          {blog.title}
        </h1>

        {/* Author and Metadata */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 text-muted-foreground">
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
                className="cursor-pointer aspect-square w-10 h-10 rounded-full object-cover border-2 border-border hover:border-primary transition-colors"
              />
            </Link>
            <div className="flex flex-col sm:flex-row sm:items-center gap-1">
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
          <div className="flex items-center gap-1 sm:ml-auto">
            <EyeIcon
              className="w-4 h-4 text-muted-foreground"
              aria-hidden="true"
            />
            <span className="text-sm text-muted-foreground">
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
              <Badge variant={"outline"} key={index}>
                {tag.tag}
              </Badge>
            ))}
          </div>
        )}
      </header>

      {/* Cover Image */}
      {blog.coverImage && (
        <Image
          src={coverImageSrc}
          alt={`Cover image for ${blog.title}`}
          width={500}
          height={500}
          className="object-cover w-full rounded-2xl"
        />
      )}

      {/* Blog Content */}
      <div className="text-wrap break-words w-full prose max-w-full text-primary-foreground">
        <RichText data={blog.content} className="text-primary-foreground" />
      </div>
    </article>
  );
}

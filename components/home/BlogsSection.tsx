import RevealHero from "@/components/animations/RevealHero";
import { getPayloadInstance } from "@/payload";
import { ChevronDownIcon } from "lucide-react";
import Link from "next/link";
import BlogCard from "../blogs/BlogCard";

export default async function BlogsSection() {
  const payload = await getPayloadInstance();
  const blogs = await payload.find({
    collection: "blogs",
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
    <section className="flex flex-col gap-4 py-8 px-4 max-w-4xl mx-auto w-full">
      <RevealHero className="text-3xl md:text-5xl font-bold">Blogs</RevealHero>
      <p className="text-muted-foreground text-balance">
        Check out my latest blogs on web development and design.
      </p>

      {!(blogs.docs.length > 0) ? (
        <span className="text-2xl font-extralight text-muted-foreground mx-auto">
          No Featured Blogs
        </span>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {blogs.docs.map((blog) => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </div>
      )}
      <Link
        href={"/blogs"}
        className="mx-auto flex flex-row items-center text-zinc-600 dark:text-zinc-400 hover:text-black hover:dark:text-white font-bold gap-1"
      >
        <ChevronDownIcon />
        View All Blogs
      </Link>
    </section>
  );
}

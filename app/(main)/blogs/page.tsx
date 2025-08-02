import RevealHero from "@/components/animations/RevealHero";
import BlogCard from "@/components/blogs/BlogCard";
import { getPayloadInstance } from "@/payload";

export default async function BlogsPage() {
  const payload = await getPayloadInstance();
  const blogs = await payload.find({
    collection: "blogs",
    where: {
      _status: {
        equals: "published",
      },
    },
  });

  return (
    <section className="flex flex-col gap-4 py-8 px-4 max-w-4xl mx-auto w-full">
      <RevealHero className="mx-auto text-3xl md:text-5xl font-bold">
        Blogs
      </RevealHero>
      {!blogs.docs.length && (
        <span className="text-2xl font-extralight text-muted-foreground mx-auto">
          No Blogs Yet
        </span>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {blogs.docs.map((blog) => (
          <BlogCard key={blog.id} blog={blog} />
        ))}
      </div>
    </section>
  );
}

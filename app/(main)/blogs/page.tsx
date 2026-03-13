import { StaggerContainer, StaggerItem } from "@/components/animations/Stagger";
import RevealHero from "@/components/animations/RevealHero";
import Reveal from "@/components/animations/Reveal";
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
    <section className="mx-auto flex w-full max-w-5xl flex-col gap-5 px-4 py-12">
      <div className="space-y-3">
        <Reveal>
          <span className="soft-outline inline-flex px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            Insights
          </span>
        </Reveal>
        <RevealHero
          className="text-3xl font-bold sm:text-4xl md:text-5xl"
          delay={0.05}
        >
          All Blog Posts
        </RevealHero>
        <Reveal delay={0.1}>
          <p className="max-w-3xl text-balance text-muted-foreground sm:text-base">
            Deep dives on frontend engineering, product thinking, and lessons
            from real-world builds.
          </p>
        </Reveal>
      </div>

      {!blogs.docs.length && (
        <span className="text-2xl font-extralight text-muted-foreground mx-auto">
          No Blogs Yet
        </span>
      )}

      <StaggerContainer className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {blogs.docs.map((blog) => (
          <StaggerItem key={blog.id} type="scaleOut">
            <BlogCard blog={blog} />
          </StaggerItem>
        ))}
      </StaggerContainer>
    </section>
  );
}

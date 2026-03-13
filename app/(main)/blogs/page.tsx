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
    <section className="flex flex-col gap-0 py-8 px-4 rail-bounded min-h-[calc(100vh-200px)]">
      <div className="border-[3px] border-border bg-background p-8 md:p-12 mb-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] relative overflow-hidden">
        <div className="absolute inset-0 diagonal-pattern opacity-10 pointer-events-none" />
        <RevealHero className="relative z-10 text-4xl md:text-6xl font-black tracking-tighter uppercase">
          SYSTEM_LOGS
        </RevealHero>
        <p className="relative z-10 font-mono text-sm mt-4 tracking-widest text-muted-foreground uppercase max-w-lg">
          CHRONICLES, ARCHITECTURE REVIEWS, AND ENGINEERING THOUGHTS.
        </p>
      </div>

      {!blogs.docs.length && (
        <div className="border-2 border-border border-dashed p-12 text-center text-muted-foreground font-mono text-sm tracking-widest uppercase">
          NO LOGS FOUND IN CURRENT INDEX.
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {blogs.docs.map((blog) => (
          <BlogCard key={blog.id} blog={blog} />
        ))}
      </div>
    </section>
  );
}

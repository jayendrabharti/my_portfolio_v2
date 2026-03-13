import RevealHero from "@/components/animations/RevealHero";
import { getPayloadInstance } from "@/payload";
import { ChevronDownIcon } from "lucide-react";
import Link from "next/link";
import BlogCard from "../blogs/BlogCard";
import { Button } from "../ui/button";

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
    <section
      id="blogs"
      className="flex flex-col gap-8 py-16 px-4 rail-bounded"
    >
      <div className="flex flex-col gap-2">
         <RevealHero className="text-3xl md:text-5xl font-black uppercase tracking-tight">
           Writing
         </RevealHero>
         <p className="text-muted-foreground font-mono text-sm uppercase tracking-widest max-w-xl">
           Thoughts on web development and design
         </p>
      </div>

      {!(blogs.docs.length > 0) ? (
         <div className="h-32 border border-dashed border-border flex items-center justify-center diagonal-pattern-subtle">
           <span className="text-sm font-mono uppercase tracking-widest text-muted-foreground">
             No Blogs Yet
           </span>
         </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-border border border-border">
          {blogs.docs.map((blog) => (
             <div key={blog.id} className="bg-background h-full flex flex-col">
               <BlogCard blog={blog} />
             </div>
          ))}
        </div>
      )}
      
      <div className="flex justify-center mt-4">
        <Link href={"/blogs"}>
          <Button variant="outline" className="rounded-none font-mono uppercase tracking-widest px-8">
            All Articles <ChevronDownIcon className="w-4 h-4 ml-2" />
          </Button>
        </Link>
      </div>
    </section>
  );
}

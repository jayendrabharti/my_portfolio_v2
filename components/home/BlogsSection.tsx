import RevealHero from "@/components/animations/RevealHero";
import Reveal from "@/components/animations/Reveal";
import { StaggerContainer, StaggerItem } from "@/components/animations/Stagger";
import { getPayloadInstance } from "@/payload";
import { ArrowRightIcon } from "lucide-react";
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
    <section
      id="blogs"
      className="mx-auto flex w-full max-w-5xl flex-col gap-5 px-4 py-12"
    >
      <div className="space-y-3">
        <Reveal delay={0.05}>
          <span className="soft-outline inline-flex px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            Writing
          </span>
        </Reveal>
        <RevealHero
          className="text-3xl font-bold sm:text-4xl md:text-5xl"
          delay={0.08}
        >
          Notes On Building Better Products
        </RevealHero>
        <Reveal delay={0.12}>
          <p className="max-w-3xl text-balance text-muted-foreground sm:text-base">
            Practical learnings from shipping projects, solving engineering
            problems, and crafting UI experiences that users remember.
          </p>
        </Reveal>
      </div>

      {!(blogs.docs.length > 0) ? (
        <span className="text-2xl font-extralight text-muted-foreground mx-auto">
          No Featured Blogs
        </span>
      ) : (
        <StaggerContainer className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {blogs.docs.map((blog) => (
            <StaggerItem key={blog.id} type="scaleOut">
              <BlogCard blog={blog} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      )}

      <Reveal delay={0.2}>
        <Link
          href="/blogs"
          className="mx-auto inline-flex items-center gap-2 rounded-full border border-border bg-background/70 px-5 py-2.5 text-sm font-semibold text-foreground transition-all duration-200 hover:-translate-y-0.5 hover:border-primary hover:text-primary"
        >
          Read More Articles
          <ArrowRightIcon className="h-4 w-4" />
        </Link>
      </Reveal>
    </section>
  );
}

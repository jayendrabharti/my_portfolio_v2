import RevealHero from "@/components/animations/RevealHero";
import Reveal from "@/components/animations/Reveal";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { ExternalLinkIcon } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tech Stack",
  description: "The technologies and tools used to build this portfolio.",
};

interface TechItem {
  name: string;
  description: string;
  url: string;
  category: string;
}

const techStack: TechItem[] = [
  // Framework & Runtime
  {
    name: "Next.js 15",
    description:
      "React framework with App Router, Server Components, and built-in optimizations for performance and SEO.",
    url: "https://nextjs.org",
    category: "Framework",
  },
  {
    name: "React 19",
    description:
      "Component-based UI library with Server Components, hooks, and concurrent features.",
    url: "https://react.dev",
    category: "Framework",
  },
  {
    name: "TypeScript",
    description:
      "Strongly typed JavaScript for better developer experience and fewer runtime errors.",
    url: "https://www.typescriptlang.org",
    category: "Framework",
  },

  // CMS & Data
  {
    name: "Payload CMS",
    description:
      "Headless CMS that lives inside Next.js. Powers all content — profile, projects, blogs, and settings — with an auto-generated admin panel.",
    url: "https://payloadcms.com",
    category: "CMS & Data",
  },
  {
    name: "MongoDB",
    description:
      "NoSQL database for flexible document storage, used via the Payload Mongoose adapter.",
    url: "https://www.mongodb.com",
    category: "CMS & Data",
  },

  // Styling & UI
  {
    name: "Tailwind CSS 4",
    description:
      "Utility-first CSS framework for rapid, responsive styling with a consistent design system.",
    url: "https://tailwindcss.com",
    category: "Styling & UI",
  },
  {
    name: "Radix UI",
    description:
      "Unstyled, accessible UI primitives for dialogs, avatars, hover cards, and more.",
    url: "https://www.radix-ui.com",
    category: "Styling & UI",
  },
  {
    name: "Framer Motion",
    description:
      "Production-ready animation library for React, powering all scroll-based reveal animations throughout the site.",
    url: "https://www.framer.com/motion",
    category: "Styling & UI",
  },
  {
    name: "Lucide & React Icons",
    description:
      "Icon libraries providing clean, consistent SVG icons across the entire interface.",
    url: "https://lucide.dev",
    category: "Styling & UI",
  },

  // Deployment & Storage
  {
    name: "Vercel",
    description:
      "Deployment platform with edge functions, automatic previews, and tight Next.js integration.",
    url: "https://vercel.com",
    category: "Deployment & Storage",
  },
  {
    name: "Vercel Blob",
    description:
      "Object storage for media files uploaded through the CMS admin panel.",
    url: "https://vercel.com/docs/storage/vercel-blob",
    category: "Deployment & Storage",
  },

  // Integrations
  {
    name: "GitHub API",
    description:
      "Fetches live contribution data, repository stats, and coding activity displayed on the homepage.",
    url: "https://docs.github.com/en/rest",
    category: "Integrations",
  },
  {
    name: "Nodemailer",
    description: "Handles transactional emails from the contact form via SMTP.",
    url: "https://nodemailer.com",
    category: "Integrations",
  },
];

const categories = [
  "Framework",
  "CMS & Data",
  "Styling & UI",
  "Deployment & Storage",
  "Integrations",
];

export default function TechStackPage() {
  return (
    <section className="flex flex-col gap-8 py-8 px-4 max-w-4xl mx-auto w-full">
      <div className="text-center">
        <RevealHero className="text-3xl md:text-5xl font-bold">
          Tech Stack
        </RevealHero>
        <p className="text-muted-foreground mt-2">
          The technologies and tools powering this portfolio
        </p>
      </div>

      {categories.map((category, catIdx) => {
        const items = techStack.filter((t) => t.category === category);
        if (items.length === 0) return null;
        return (
          <Reveal key={category} delay={catIdx * 0.1}>
            <div className="space-y-3">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <Badge variant="secondary" className="text-xs">
                  {items.length}
                </Badge>
                {category}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {items.map((tech) => (
                  <Link
                    key={tech.name}
                    href={tech.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex flex-col gap-1.5 rounded-xl border border-border bg-card p-4 transition-all duration-300 hover:border-primary hover:shadow-sm"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium group-hover:text-primary transition-colors">
                        {tech.name}
                      </span>
                      <ExternalLinkIcon className="w-3.5 h-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {tech.description}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </Reveal>
        );
      })}
    </section>
  );
}

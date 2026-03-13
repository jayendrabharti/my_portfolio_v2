import { cn } from "@/lib/utils";
import RevealHero from "../animations/RevealHero";
import Reveal from "../animations/Reveal";
import AppearingText from "../animations/AppearingText";
import Link from "next/link";
import Image from "next/image";
import { Button } from "../ui/button";
import { RichText } from "@payloadcms/richtext-lexical/react";
import type { SerializedEditorState } from "@payloadcms/richtext-lexical/lexical";
import {
  FaGithub,
  FaLinkedin,
  FaDownload,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { HandshakeIcon, MailIcon } from "lucide-react";
import { getPayloadInstance } from "@/payload";

export default async function HeroSection({
  className = "",
}: {
  className?: string;
}) {
  const payload = await getPayloadInstance();
  const [profile, projectsCount, blogsCount, workCount] = await Promise.all([
    payload.findGlobal({
      slug: "profile",
    }),
    payload.find({
      collection: "projects",
      limit: 0,
      where: {
        _status: {
          equals: "published",
        },
      },
    }),
    payload.find({
      collection: "blogs",
      limit: 0,
      where: {
        _status: {
          equals: "published",
        },
      },
    }),
    payload.find({
      collection: "work-experience",
      limit: 0,
      where: {
        _status: {
          equals: "published",
        },
      },
    }),
  ]);

  const avatarSrc =
    typeof profile.avatar === "object" &&
    profile.avatar !== null &&
    "url" in profile.avatar
      ? (profile.avatar.url as string)
      : "/default-avatar.png";

  const resumeUrl =
    typeof profile.resume === "object" &&
    profile.resume !== null &&
    "url" in profile.resume
      ? (profile.resume.url as string)
      : null;

  const stats = [
    {
      label: "Projects Delivered",
      value: `${projectsCount.totalDocs}+`,
    },
    {
      label: "Published Articles",
      value: `${blogsCount.totalDocs}+`,
    },
    {
      label: "Professional Roles",
      value: `${workCount.totalDocs}`,
    },
  ];

  return (
    <section
      id="hero-section"
      className={cn(
        "relative mt-6 min-h-[calc(100vh-8.5rem)] w-full max-w-5xl px-4 pb-10 sm:px-5",
        className,
      )}
    >
      <div className="pointer-events-none absolute -top-16 left-1/4 size-44 rounded-full bg-primary/20 blur-3xl float-slow" />
      <div className="pointer-events-none absolute right-4 top-1/3 size-52 rounded-full bg-accent/30 blur-3xl float-slower" />

      <div className="ambient-panel relative grid gap-8 overflow-hidden p-5 sm:p-7 md:grid-cols-[1.15fr_0.85fr] md:gap-10 md:p-10">
        <div className="space-y-6">
          <Reveal type="topDown" duration={0.45}>
            <span className="soft-outline inline-flex items-center gap-2 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-foreground/80">
              <span className="size-2 rounded-full bg-emerald-500" />
              Available For New Opportunities
            </span>
          </Reveal>

          <RevealHero className="w-full" delay={0.05}>
            <h1 className="display-title text-3xl font-extrabold leading-[1.05] sm:text-4xl md:text-5xl lg:text-6xl">
              Hi, I&apos;m {profile.name}
            </h1>
          </RevealHero>

          <Reveal
            className="max-w-2xl text-base leading-relaxed text-foreground/90 sm:text-lg"
            delay={0.1}
          >
            <AppearingText text="I build high-performance web experiences that feel premium, load fast, and help businesses convert visitors into customers." />
          </Reveal>

          <Reveal
            className="max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base"
            delay={0.15}
          >
            <RichText
              className="text-balance wrap-break-word"
              data={profile.bio as SerializedEditorState}
            />
          </Reveal>

          {profile.location && (
            <Reveal delay={0.18}>
              {profile.locationUrl ? (
                <Link
                  href={profile.locationUrl}
                  target="_blank"
                  className="inline-flex"
                >
                  <Button variant="outline" className="rounded-full">
                    <FaMapMarkerAlt className="h-4 w-4" />
                    {profile.location}
                  </Button>
                </Link>
              ) : (
                <span className="soft-outline inline-flex items-center gap-2 px-4 py-2 text-sm text-muted-foreground">
                  <FaMapMarkerAlt className="h-4 w-4" />
                  {profile.location}
                </span>
              )}
            </Reveal>
          )}

          <Reveal
            delay={0.24}
            type="scaleOut"
            className="flex flex-col items-stretch gap-3 pt-1 sm:flex-row sm:items-center"
          >
            <Link href="/contact-me" className="w-full sm:w-auto">
              <Button className="group h-11 w-full rounded-full px-6 font-semibold shadow-lg shadow-primary/25 sm:w-auto">
                <HandshakeIcon className="h-4 w-4" />
                Let&apos;s Build Together
              </Button>
            </Link>

            <Link href="/projects" className="w-full sm:w-auto">
              <Button
                variant="outline"
                className="group h-11 w-full rounded-full border-2 px-6 font-semibold sm:w-auto"
              >
                View My Work
                <span className="transition-transform duration-200 group-hover:translate-x-1">
                  &rarr;
                </span>
              </Button>
            </Link>

            {resumeUrl && (
              <Link
                href={resumeUrl}
                target="_blank"
                download
                className="w-full sm:w-auto"
              >
                <Button
                  variant="secondary"
                  className="h-11 w-full rounded-full px-6 sm:w-auto"
                >
                  <FaDownload className="h-4 w-4" />
                  Resume
                </Button>
              </Link>
            )}
          </Reveal>

          <Reveal
            delay={0.3}
            className="grid grid-cols-1 gap-2.5 pt-1 sm:grid-cols-3 sm:gap-3"
          >
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-border/70 bg-background/65 p-3.5 backdrop-blur-sm"
              >
                <span className="block text-xl font-extrabold text-foreground sm:text-2xl">
                  {stat.value}
                </span>
                <span className="text-xs font-medium uppercase tracking-[0.15em] text-muted-foreground">
                  {stat.label}
                </span>
              </div>
            ))}
          </Reveal>
        </div>

        <div className="flex flex-col items-center justify-center gap-5">
          <Reveal delay={0.12} type="rightLeft" className="w-full">
            <div className="relative mx-auto w-fit">
              <div className="absolute -inset-4 rounded-full bg-primary/20 blur-2xl" />
              <div className="relative overflow-hidden rounded-[2.2rem] border border-border/70 bg-background/70 p-2 backdrop-blur-sm">
                <Image
                  src={avatarSrc}
                  alt={profile.name}
                  width={360}
                  height={360}
                  className="h-52 w-52 rounded-[1.7rem] object-cover sm:h-64 sm:w-64"
                  priority
                />
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.26} className="w-full max-w-sm">
            <div className="rounded-2xl border border-border/70 bg-background/65 p-3 backdrop-blur-sm">
              <p className="mb-3 text-center text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                Connect With Me
              </p>
              <div className="flex items-center justify-center gap-2.5">
                {profile.githubUrl && (
                  <Link
                    href={profile.githubUrl}
                    target="_blank"
                    className="inline-flex rounded-full border border-border bg-background/80 p-2.5 text-muted-foreground transition-all duration-200 hover:-translate-y-0.5 hover:border-primary hover:text-primary"
                  >
                    <FaGithub className="h-5 w-5" />
                  </Link>
                )}
                {profile.linkedinUrl && (
                  <Link
                    href={profile.linkedinUrl}
                    target="_blank"
                    className="inline-flex rounded-full border border-border bg-background/80 p-2.5 text-muted-foreground transition-all duration-200 hover:-translate-y-0.5 hover:border-primary hover:text-primary"
                  >
                    <FaLinkedin className="h-5 w-5" />
                  </Link>
                )}
                {profile.email && (
                  <Link
                    href={`mailto:${profile.email}`}
                    className="inline-flex rounded-full border border-border bg-background/80 p-2.5 text-muted-foreground transition-all duration-200 hover:-translate-y-0.5 hover:border-primary hover:text-primary"
                  >
                    <MailIcon className="h-5 w-5" />
                  </Link>
                )}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

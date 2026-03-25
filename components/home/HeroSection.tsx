import { cn } from "@/lib/utils";
import RevealHero from "../animations/RevealHero";
import Reveal from "../animations/Reveal";
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
import { HandshakeIcon } from "lucide-react";
import { getPayloadInstance } from "@/payload";

export default async function HeroSection({
  className = "",
}: {
  className?: string;
}) {
  const payload = await getPayloadInstance();
  const profile = await payload.findGlobal({
    slug: "profile",
  });

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

  return (
    <section
      id="hero-section"
      className={cn(
        "relative min-h-[calc(100vh-4rem)] grid grid-cols-1 md:grid-cols-2 rail-bounded overflow-hidden border-x border-border",
        className,
      )}
    >
      {/* Content Section */}
      <div className="flex flex-col justify-center gap-8 p-8 md:p-12 lg:p-16 border-b border-border md:border-b-0 md:border-r border-dashed diagonal-pattern-subtle">
        <div className="bg-background/80 backdrop-blur-[2px] p-6 border border-border">
          <RevealHero>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-sans font-black uppercase tracking-tight leading-none break-words">
              {profile.name}
            </h1>
          </RevealHero>
          <div className="h-4"></div>

          {profile.location && profile.locationUrl && (
            <Link
              href={profile.locationUrl}
              target="_blank"
              className="inline-block mt-2"
            >
              <Button
                variant="outline"
                size="sm"
                className="font-mono text-xs uppercase tracking-widest rounded-none"
              >
                <FaMapMarkerAlt className="w-3 h-3 mr-2" />
                {profile.location}
              </Button>
            </Link>
          )}

          <Reveal className="mt-8 text-base md:text-lg text-foreground/80 leading-relaxed font-medium">
            <RichText
              className="text-balance break-words"
              data={profile.bio as SerializedEditorState}
            />
          </Reveal>

          {/* Action Buttons */}
          <Reveal
            delay={0.3}
            type="bottomUp"
            className="flex flex-col sm:flex-row items-center gap-4 mt-10 flex-wrap"
          >
            <Link href="/contact-me" className="w-full sm:w-auto">
              <Button className="w-full sm:w-auto font-mono uppercase tracking-widest rounded-none hover:bg-foreground hover:text-background transition-colors h-12 px-8">
                <HandshakeIcon className="w-4 h-4 mr-2" />
                Connect
              </Button>
            </Link>

            <Link href="/projects" className="w-full sm:w-auto">
              <Button
                variant="outline"
                className="w-full sm:w-auto font-mono uppercase tracking-widest rounded-none hover:bg-black/[0.02] dark:hover:bg-white/[0.02] h-12 px-8 transition-colors"
              >
                Work <span className="ml-2">→</span>
              </Button>
            </Link>

            {resumeUrl && (
              <Link
                href={resumeUrl}
                target="_blank"
                className="w-full sm:w-auto"
              >
                <Button
                  variant="secondary"
                  className="w-full sm:w-auto font-mono uppercase tracking-widest rounded-none h-12 px-8"
                >
                  <FaDownload className="w-3 h-3 mr-2" />
                  Resume
                </Button>
              </Link>
            )}
          </Reveal>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center p-8 md:p-12 lg:p-16 relative">
        <div className="absolute inset-0 diagonal-pattern opacity-50 pointer-events-none"></div>
        {/* Avatar */}
        <div className="relative group w-full max-w-[280px] aspect-square bg-background border-2 border-foreground p-2 z-10 hover:-translate-y-2 hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] transition-all duration-300">
          <div className="relative w-full h-full overflow-hidden bg-muted">
            <Image
              src={avatarSrc}
              alt={profile.name!}
              fill
              className="object-cover transition-all duration-500"
              priority
            />
          </div>
        </div>

        {/* Social Links Box */}
        <Reveal className="w-full max-w-[280px] mt-6 z-10">
          <div className="flex flex-wrap items-center justify-between border-2 border-foreground bg-background p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]">
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-foreground mr-4">
              Socials
            </span>
            <div className="flex items-center gap-2">
              {profile.githubUrl && (
                <Link href={profile.githubUrl} target="_blank">
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-none border-foreground hover:bg-foreground hover:text-background h-8 w-8"
                  >
                    <FaGithub className="w-4 h-4" />
                  </Button>
                </Link>
              )}
              {profile.linkedinUrl && (
                <Link href={profile.linkedinUrl} target="_blank">
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-none border-foreground hover:bg-foreground hover:text-background h-8 w-8"
                  >
                    <FaLinkedin className="w-4 h-4" />
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

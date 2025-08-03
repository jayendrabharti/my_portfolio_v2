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
import { HandshakeIcon, MailIcon } from "lucide-react";
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
        "relative min-h-[calc(100vh-4rem)] items-center justify-center py-8 px-4 flex md:flex-row flex-col-reverse gap-4 max-w-4xl mx-auto w-full overflow-hidden",
        className
      )}
    >
      {/* Content Section */}
      <div className="flex flex-col gap-4 items-center md:items-start text-center md:text-left flex-1 min-w-0 w-full md:w-auto">
        <RevealHero>
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-extrabold leading-tight break-words">
            Hi, I'm{" "}
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-primary to-primary/30 bg-clip-text text-transparent">
                {profile.name}
              </span>
              <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-primary to-transparent rounded-full"></div>
            </span>
          </h1>
        </RevealHero>

        {profile.location && profile.locationUrl && (
          <Link href={profile.locationUrl} target="_blank">
            <Button variant={"link"} className="text-foreground" size={"sm"}>
              <FaMapMarkerAlt className="w-4 h-4" />
              {profile.location}
            </Button>
          </Link>
        )}

        <Reveal className="text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed max-w-full">
          <RichText
            className="text-balance break-words"
            data={profile.bio as SerializedEditorState}
          />
        </Reveal>

        {/* Action Buttons */}
        <Reveal
          delay={0.3}
          type="scaleOut"
          className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto justify-center md:justify-start max-w-full mt-4"
        >
          <Link href="/contact-me" className="w-full sm:w-auto max-w-full">
            <Button className="font-semibold w-full sm:w-auto group relative overflow-hidden min-w-0">
              <span className="relative z-10 flex items-center gap-2 truncate">
                <HandshakeIcon className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                <span className="truncate">Let's Connect</span>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Button>
          </Link>

          {/* <Link href="/projects" className="w-full sm:w-auto"> */}
          <Link href="/projects" className="w-full sm:w-auto max-w-full">
            <Button
              variant="outline"
              className="group w-full sm:w-auto font-medium border-2 hover:border-primary min-w-0"
            >
              <span className="truncate">View My Work</span>
              <div className="ml-2 group-hover:translate-x-1 transition-transform duration-200 flex-shrink-0">
                →
              </div>
            </Button>
          </Link>
          {/* </Link> */}

          {resumeUrl && (
            <Link
              href={resumeUrl}
              target="_blank"
              download
              className="w-full sm:w-auto max-w-full"
            >
              <Button
                variant="secondary"
                className="group w-full sm:w-auto font-medium min-w-0"
              >
                <FaDownload className="w-3 h-3 sm:w-4 sm:h-4 mr-2 group-hover:animate-bounce flex-shrink-0" />
                <span className="truncate">Resume</span>
              </Button>
            </Link>
          )}
        </Reveal>
      </div>

      <div className="flex flex-col gap-4 items-center flex-shrink-0">
        {/* Avatar */}
        <div className="relative group flex-shrink-0 max-w-full">
          <div className="absolute -inset-4 rounded-full transition-all duration-700"></div>
          <div className="relative">
            <div className="w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 xl:w-72 xl:h-72 rounded-full overflow-hidden transition-all duration-500 group-hover:scale-105">
              <Image
                src={avatarSrc}
                alt={profile.name}
                width={288}
                height={288}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                priority
              />
            </div>
          </div>
        </div>

        {/* Social Links */}
        <Reveal>
          <div className="flex items-center justify-center lg:justify-start gap-3 flex-wrap max-w-full">
            {profile.githubUrl && (
              <Link
                href={profile.githubUrl}
                target="_blank"
                className="p-2 rounded-full bg-background/50 backdrop-blur-sm border border-border hover:border-primary transition-all duration-300 hover:scale-110 group flex-shrink-0"
              >
                <FaGithub className="w-5 h-5 sm:w-6 sm:h-6 group-hover:text-primary transition-colors" />
              </Link>
            )}
            {profile.linkedinUrl && (
              <Link
                href={profile.linkedinUrl}
                target="_blank"
                className="p-2 rounded-full bg-background/50 backdrop-blur-sm border border-border hover:border-primary transition-all duration-300 hover:scale-110 group flex-shrink-0"
              >
                <FaLinkedin className="w-5 h-5 sm:w-6 sm:h-6 group-hover:text-primary transition-colors" />
              </Link>
            )}
            {profile.email && (
              <Link
                href={`mailto:${profile.email}`}
                className="p-2 rounded-full bg-background/50 backdrop-blur-sm border border-border hover:border-primary transition-all duration-300 hover:scale-110 group flex-shrink-0"
              >
                <MailIcon className="w-5 h-5 sm:w-6 sm:h-6 group-hover:text-primary transition-colors" />
              </Link>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

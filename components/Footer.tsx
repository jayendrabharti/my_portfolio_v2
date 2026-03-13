import { anurati } from "@/utils/fonts";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Profile } from "@/payload/payload-types";
import SocialLink from "./SocialLink";

export default async function Footer({ profile }: { profile: Profile }) {
  return (
    <footer className="w-full border-t-2 border-border diagonal-pattern-subtle mt-20 relative overflow-hidden">
      {/* Decorative top rails */}
      <div className="absolute top-0 left-0 w-full h-[6px] bg-foreground/5" />
      <div className="absolute top-2 left-0 w-full h-[2px] bg-foreground/10" />

      <div className="mx-auto max-w-[var(--rail-width)] w-full border-x-2 border-border p-8 md:p-12 relative z-10 bg-background/90 backdrop-blur-sm">
        <div className="flex flex-col md:flex-row justify-between gap-12 items-start md:items-end w-full">
          <div className="flex flex-col items-start gap-4 flex-1">
            <Link
              href="/"
              className={cn(`text-4xl font-black tracking-[0.2em] relative group`, anurati.className)}
            >
              <span className="relative z-10">{profile?.logoText.toUpperCase()}</span>
              <span className="absolute -bottom-2 left-0 w-full h-1/2 bg-primary/20 -z-10 group-hover:h-full transition-all duration-300 transform -skew-x-12" />
            </Link>
            <p className="font-mono text-sm tracking-widest text-muted-foreground uppercase max-w-sm mt-4">
              Building structural systems for the modern web.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:flex gap-4 sm:gap-6 flex-wrap w-full md:w-auto">
            {profile.socials &&
              profile.socials.map((social, index) => (
                <div key={index} className="border-2 border-border p-1 bg-background shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]">
                  <div className="border border-border/50 border-dashed p-3">
                    <SocialLink social={social} />
                  </div>
                </div>
              ))}
          </div>
        </div>

        <div className="mt-16 pt-8 border-t-2 border-border border-dashed flex flex-col items-center justify-between md:flex-row gap-4">
          <div className="font-mono text-xs tracking-widest text-muted-foreground uppercase font-bold">
            {`© ${new Date().getFullYear()} ${profile?.name}`}
          </div>
          <div className="flex items-center gap-4 text-xs font-mono tracking-widest font-bold">
            <span className="px-2 py-1 bg-primary text-primary-foreground">SYSTEM: ONLINE</span>
            <span className="px-2 py-1 border border-border">V2.0.0</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

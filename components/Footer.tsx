import { anurati } from "@/utils/fonts";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Profile } from "@/payload/payload-types";
import SocialLink from "./SocialLink";

import { Button } from "./ui/button";
export default async function Footer({ profile }: { profile: Profile }) {
  return (
    <footer className="mx-auto mt-20 w-full max-w-5xl px-4 pb-8">
      <div className="ambient-panel p-6 sm:p-8">
        <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <div className="space-y-4">
            <span className="soft-outline inline-flex px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Let&apos;s Collaborate
            </span>
            <h3 className="display-title text-2xl font-extrabold leading-tight sm:text-3xl">
              Ready to build something that stands out?
            </h3>
            <p className="max-w-xl text-sm text-muted-foreground sm:text-base">
              I help teams ship polished, performant web products with clear
              business impact.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <Link href="/contact-me">
                <Button className="rounded-full px-5 font-semibold shadow-md shadow-primary/25">
                  Start A Conversation
                </Button>
              </Link>
              <Link href="/projects">
                <Button
                  variant="outline"
                  className="rounded-full px-5 font-semibold"
                >
                  View Projects
                </Button>
              </Link>
            </div>
          </div>

          <div className="space-y-4 md:text-right">
            <Link
              href="/"
              className={cn(
                "inline-block text-3xl font-bold text-foreground",
                anurati.className,
              )}
            >
              {profile?.logoText.toUpperCase()}
            </Link>

            <div className="flex flex-wrap justify-start gap-2 md:justify-end">
              {profile.socials?.map((social, index) => (
                <SocialLink key={index} social={social} />
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-border/75 pt-4 text-sm text-muted-foreground">
          {`© ${new Date().getFullYear()} ${profile?.name}. Crafted with intent.`}
        </div>
      </div>
    </footer>
  );
}

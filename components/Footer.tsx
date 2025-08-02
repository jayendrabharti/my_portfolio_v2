import { anurati } from "@/utils/fonts";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Profile } from "@/payload/payload-types";
import SocialLink from "./SocialLink";

export default async function Footer({ profile }: { profile: Profile }) {
  return (
    <footer className="mx-auto mt-20 max-w-4xl w-full p-4">
      <div className="border-border border-t w-full pt-10">
        <div className="flex flex-col sm:flex-row justify-center  gap-8 items-center">
          <Link
            href="/"
            className={cn(`mb-4 block text-4xl font-bold`, anurati.className)}
          >
            {profile?.logoText.toUpperCase()}
          </Link>
          <div className="flex gap-4 flex-wrap justify-center flex-row">
            {/* {SocialsLinkList.map((link, index) => (
              <Link
                key={index}
                href={link.href}
                target="_blank"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <link.icon size={20} />
              </Link>
            ))} */}

            {profile.socials &&
              profile.socials.map((social, index) => (
                <SocialLink key={index} social={social} />
              ))}
          </div>
        </div>

        <div className="border-border mt-8 flex flex-col items-center justify-between border-t pt-6 md:flex-row">
          <div className="text-muted-foreground mb-4 text-sm md:mb-0">
            {`© ${new Date().getFullYear()} ${profile?.name}. All rights reserved.`}
          </div>
        </div>
      </div>
    </footer>
  );
}

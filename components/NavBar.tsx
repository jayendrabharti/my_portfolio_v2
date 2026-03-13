"use client";

import { cn } from "@/lib/utils";
import {
  CommandIcon,
  Menu,
  PencilRulerIcon,
  ScrollTextIcon,
  SearchIcon,
  X,
} from "lucide-react";
import { FaHome } from "react-icons/fa";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeSwitch from "./ThemeSwitch";
import { useEffect, useMemo, useState } from "react";
import { Button } from "./ui/button";
import Reveal from "./animations/Reveal";
import { anurati } from "@/utils/fonts";
import { Profile, Setting } from "@/payload/payload-types";

export default function NavBar({
  profile,
  settings,
  className = "",
}: {
  profile: Profile;
  settings: Setting;
  className?: string;
}) {
  const pathname = usePathname();
  const [expanded, setExpanded] = useState(false);

  const navBarLinks = useMemo(
    () => [
      { name: "Home", href: "/", icon: FaHome },
      ...(settings?.projects
        ? [{ name: "Projects", href: "/projects", icon: PencilRulerIcon }]
        : []),
      ...(settings?.blogs
        ? [{ name: "Blogs", href: "/blogs", icon: ScrollTextIcon }]
        : []),
    ],
    [settings?.blogs, settings?.projects],
  );

  useEffect(() => {
    setExpanded(false);
  }, [pathname]);

  const isActive = (href: string) => {
    if (!pathname) return false;
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(href);
  };

  const triggerCommandPalette = () => {
    document.dispatchEvent(
      new KeyboardEvent("keydown", { key: "k", ctrlKey: true, metaKey: true }),
    );
  };

  return (
    <nav
      className={cn(
        "sticky top-0 left-0 z-50 w-full px-3 pt-3 sm:px-4",
        className,
      )}
    >
      <Reveal
        className="mx-auto w-full max-w-5xl"
        type="topDown"
        duration={0.5}
      >
        <div className="ambient-panel flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-3">
          <Link href="/" prefetch className="group flex min-w-0 flex-col">
            <span className="text-[10px] font-semibold tracking-[0.24em] text-muted-foreground/80">
              PORTFOLIO
            </span>
            <span
              className={cn(
                anurati.className,
                "truncate text-xl font-bold leading-none text-foreground sm:text-2xl",
              )}
            >
              {profile?.logoText.toUpperCase()}
            </span>
          </Link>

          <div className="mx-1 hidden items-center gap-1 md:flex">
            {navBarLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  prefetch
                  href={link.href}
                  className={cn(
                    "group inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-semibold transition-all duration-200",
                    active
                      ? "bg-primary text-primary-foreground shadow-md shadow-primary/30"
                      : "text-muted-foreground hover:bg-accent/70 hover:text-foreground",
                  )}
                >
                  <link.icon className="size-3.5" />
                  {link.name}
                </Link>
              );
            })}
          </div>

          <span className="soft-outline ml-auto hidden items-center px-3 py-1 text-xs font-semibold tracking-wide text-foreground/85 xl:inline-flex">
            Open To Work
          </span>

          <Button
            variant="outline"
            size="sm"
            onClick={triggerCommandPalette}
            className="hidden h-9 items-center gap-1.5 rounded-full px-3 text-xs text-muted-foreground lg:inline-flex"
          >
            <SearchIcon className="size-3.5" />
            Search
            <kbd className="inline-flex items-center gap-0.5 rounded border border-border/70 bg-background px-1.5 py-0.5 font-mono text-[10px]">
              <CommandIcon className="size-2.5" />K
            </kbd>
          </Button>

          <ThemeSwitch className="rounded-full" />

          <Button
            variant="ghost"
            size="icon"
            onClick={(event) => {
              setExpanded((prev) => !prev);
              event.stopPropagation();
            }}
            className="relative flex rounded-full md:hidden"
            aria-label={expanded ? "Close navigation" : "Open navigation"}
          >
            <X
              className={cn(
                "absolute transition-all duration-250",
                expanded ? "scale-100 rotate-0" : "scale-0 -rotate-90",
              )}
            />
            <Menu
              className={cn(
                "absolute transition-all duration-250",
                expanded ? "scale-0 rotate-90" : "scale-100 rotate-0",
              )}
            />
          </Button>
        </div>
      </Reveal>

      <div
        className={cn(
          "mx-auto mt-2 w-full max-w-5xl overflow-hidden transition-all duration-300 md:hidden",
          expanded
            ? "max-h-96 opacity-100"
            : "pointer-events-none max-h-0 opacity-0",
        )}
      >
        <div className="ambient-panel px-3 py-3">
          <div className="flex flex-col gap-1.5">
            {navBarLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  prefetch
                  href={link.href}
                  className={cn(
                    "inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold transition-colors",
                    active
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-accent/60 hover:text-foreground",
                  )}
                >
                  <link.icon className="size-4" />
                  {link.name}
                </Link>
              );
            })}

            <Button
              variant="outline"
              onClick={triggerCommandPalette}
              className="mt-1 justify-start rounded-xl text-sm"
            >
              <SearchIcon className="size-4" />
              Open Command Palette
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}

"use client";

import { cn } from "@/lib/utils";
import {
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
import { useState } from "react";
import { Button } from "./ui/button";
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

  const NavBarLinks = [
    { name: "HOME", href: "/", icon: FaHome },
    ...(settings?.projects
      ? [{ name: "PROJECTS", href: "/projects", icon: PencilRulerIcon }]
      : []),
    ...(settings?.blogs
      ? [{ name: "BLOGS", href: "/blogs", icon: ScrollTextIcon }]
      : []),
  ];

  const isActive = (href: string) => {
    if (!pathname) return false;
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(href);
  };

  return (
    <nav
      className={cn(
        className,
        `w-full border-border border-b-2 bg-background sticky top-0 left-0 z-50 transition-all duration-200`,
      )}
    >
      <div
        className={cn(
          "flex items-center justify-between",
          "mx-auto px-4 md:px-8",
          "w-full max-w-[var(--rail-width)] h-16 md:border-x-2 md:border-border",
        )}
      >
        <Link
          href="/"
          prefetch={true}
          className={cn(anurati.className, "cursor-pointer text-xl font-black tracking-[0.2em]")}
        >
          {profile?.logoText.toUpperCase()}
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex flex-row items-center gap-6 h-full font-mono text-xs tracking-widest font-bold">
          {NavBarLinks.map((link, index) => {
            const active = isActive(link.href);
            return (
              <Link
                key={index}
                prefetch={true}
                href={link.href}
                className={cn(
                  "flex items-center gap-2 h-full px-2 border-b-2 transition-all duration-200",
                  active ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-primary hover:border-primary/50",
                )}
              >
                <link.icon className="size-4" />
                {link.name}
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-4">
          <Button
            variant={"outline"}
            size={"sm"}
            onClick={() => {
              document.dispatchEvent(
                new KeyboardEvent("keydown", { key: "k", ctrlKey: true }),
              );
            }}
            className="hidden md:flex items-center gap-2 text-xs text-muted-foreground h-8 px-3 border-2 border-border rounded-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)]"
          >
            <SearchIcon className="w-3 h-3" />
            <kbd className="font-mono text-[10px] font-bold tracking-widest">
              CMD+K
            </kbd>
          </Button>
          
          <ThemeSwitch className="hidden md:flex" />

          {/* Mobile Menu Toggle */}
          <Button
            variant={"outline"}
            size={"icon"}
            onClick={(e) => {
              setExpanded((prev) => !prev);
              e.stopPropagation();
            }}
            className={cn("flex md:hidden border-2 border-border rounded-none h-10 w-10 relative overflow-hidden")}
          >
            <X
              className={cn(
                "absolute transition-all duration-200",
                expanded ? "scale-100 rotate-0" : "scale-0 rotate-90",
              )}
            />
            <Menu
              className={cn(
                "absolute transition-all duration-200",
                expanded ? "scale-0 -rotate-90" : "scale-100 rotate-0",
              )}
            />
          </Button>
        </div>
      </div>

      {/* Mobile Menu Content */}
      <div 
        className={cn(
          "md:hidden flex flex-col w-full border-t-2 border-border bg-background diagonal-pattern-subtle",
          "transition-all duration-300 overflow-hidden absolute left-0 top-[64px]",
          expanded ? "max-h-96 border-b-2" : "max-h-0 border-b-0"
        )}
      >
        {NavBarLinks.map((link, index) => {
          const active = isActive(link.href);
          return (
            <Link
              key={index}
              prefetch={true}
              href={link.href}
              onClick={() => setExpanded(false)}
              className={cn(
                "flex flex-row items-center gap-3 w-full px-6 py-4 font-mono text-sm tracking-widest font-bold border-b border-border/50",
                active ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-accent hover:text-foreground",
              )}
            >
              <link.icon className="size-4" />
              {link.name}
            </Link>
          );
        })}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border/50">
          <span className="font-mono text-xs font-bold tracking-widest text-muted-foreground">THEME</span>
          <ThemeSwitch />
        </div>
      </div>
    </nav>
  );
}

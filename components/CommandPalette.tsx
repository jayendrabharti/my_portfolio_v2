"use client";

import { useEffect, useState, useMemo, useCallback } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Profile } from "@/payload/payload-types";
import { anurati } from "@/utils/fonts";
import { cn } from "@/lib/utils";
import {
  FaHome,
  FaGlobe,
} from "react-icons/fa";
import {
  BsGithub,
  BsInstagram,
  BsLinkedin,
  BsTwitterX,
} from "react-icons/bs";
import {
  PencilRulerIcon,
  MailIcon,
  SearchIcon,
  CodeIcon,
  BrainCircuitIcon,
  BriefcaseIcon,
  X,
  GraduationCapIcon,
  DownloadIcon,
  ArrowUpIcon,
  CommandIcon,
} from "lucide-react";

interface CommandItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  action: () => void;
  keywords?: string[];
  section: string;
}

export default function CommandPalette({
  profile,
}: {
  profile: Profile;
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const router = useRouter();
  const pathname = usePathname();

  const scrollToSection = useCallback(
    (id: string) => {
      const tryScroll = () => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
          return true;
        }
        return false;
      };

      if (pathname === "/") {
        tryScroll();
      } else {
        router.push("/");
        // Wait for navigation and render, then scroll
        const interval = setInterval(() => {
          if (tryScroll()) clearInterval(interval);
        }, 100);
        setTimeout(() => clearInterval(interval), 3000);
      }
    },
    [pathname, router],
  );

  const commands: CommandItem[] = useMemo(() => {
    const items: CommandItem[] = [
      {
        id: "home",
        label: "Return to Home",
        icon: <FaHome className="w-4 h-4" />,
        action: () => router.push("/"),
        keywords: ["home", "main", "landing", "start"],
        section: "Navigation",
      },
      // Sections
      {
        id: "skills",
        label: "Systems & Technologies",
        icon: <BrainCircuitIcon className="w-4 h-4" />,
        action: () => scrollToSection("skills"),
        keywords: ["skills", "technologies", "tools", "stack", "tech"],
        section: "Internal Sections",
      },
      {
        id: "experience",
        label: "Operational History",
        icon: <BriefcaseIcon className="w-4 h-4" />,
        action: () => scrollToSection("work-experience"),
        keywords: ["work", "experience", "career", "jobs", "history"],
        section: "Internal Sections",
      },
      {
        id: "education",
        label: "Academic Training",
        icon: <GraduationCapIcon className="w-4 h-4" />,
        action: () => scrollToSection("education"),
        keywords: ["education", "studies", "degree", "college", "university"],
        section: "Internal Sections",
      },
      {
        id: "projects",
        label: "Featured Deployments",
        icon: <PencilRulerIcon className="w-4 h-4" />,
        action: () => scrollToSection("projects"),
        keywords: ["projects", "work", "portfolio", "builds", "code"],
        section: "Internal Sections",
      },
      {
        id: "contact",
        label: "Secure Transmission / Contact",
        icon: <MailIcon className="w-4 h-4" />,
        action: () => scrollToSection("contact"),
        keywords: ["contact", "email", "message", "reach", "hire"],
        section: "Internal Sections",
      },
      // Socials
      {
        id: "github",
        label: "GitHub Network",
        icon: <BsGithub className="w-4 h-4" />,
        action: () => window.open(profile.githubUrl ?? "", "_blank"),
        keywords: ["github", "code", "repos", "open source"],
        section: "External Networks",
      },
      {
        id: "linkedin",
        label: "LinkedIn Professional",
        icon: <BsLinkedin className="w-4 h-4" />,
        action: () => window.open(profile.linkedinUrl ?? "", "_blank"),
        keywords: ["linkedin", "professional", "network"],
        section: "External Networks",
      },
    ];

    // Add extra socials from array
    profile.socials?.forEach((social, idx) => {
      const lowercaseUrl = social.url.toLowerCase();
      let icon = <FaGlobe className="w-4 h-4" />;
      let label = social.name;

      if (lowercaseUrl.includes("instagram.com")) {
        icon = <BsInstagram className="w-4 h-4" />;
        label = "Instagram";
      } else if (lowercaseUrl.includes("twitter.com") || lowercaseUrl.includes("x.com")) {
        icon = <BsTwitterX className="w-4 h-4" />;
        label = "X / Twitter";
      } else {
        // Only include specified platforms for now to keep it clean, 
        // or uncomment below to include all
        // items.push({ ... });
        return;
      }

      items.push({
        id: `social-${idx}`,
        label: `${label} Connection`,
        icon,
        action: () => window.open(social.url, "_blank"),
        keywords: [label.toLowerCase(), "social", "network"],
        section: "External Networks",
      });
    });

    // Actions
    if (profile.resume && typeof profile.resume === "object") {
      items.push({
        id: "resume",
        label: "Download Dossier / Resume",
        icon: <DownloadIcon className="w-4 h-4" />,
        action: () => window.open((profile.resume as any).url, "_blank"),
        keywords: ["resume", "cv", "download", "pdf"],
        section: "Quick Actions",
      });
    }

    items.push({
      id: "scroll-top",
      label: "Zero Offset (Return to Top)",
      icon: <ArrowUpIcon className="w-4 h-4" />,
      action: () => window.scrollTo({ top: 0, behavior: "smooth" }),
      keywords: ["top", "scroll", "up", "reset"],
      section: "Quick Actions",
    });

    return items;
  }, [router, profile, scrollToSection]);

  const filtered = useMemo(() => {
    if (!query) return commands;
    const q = query.toLowerCase();
    return commands.filter(
      (cmd) =>
        cmd.label.toLowerCase().includes(q) ||
        cmd.keywords?.some((k) => k.includes(q)),
    );
  }, [commands, query]);

  const sections = useMemo(() => {
    const map = new Map<string, CommandItem[]>();
    for (const item of filtered) {
      const list = map.get(item.section) || [];
      list.push(item);
      map.set(item.section, list);
    }
    return map;
  }, [filtered]);

  const runCommand = useCallback((cmd: CommandItem) => {
    setOpen(false);
    setQuery("");
    cmd.action();
  }, []);

  // Keyboard shortcut to open
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((prev) => !prev);
        setQuery("");
        setSelectedIndex(0);
      }
      if (e.key === "Escape") {
        setOpen(false);
        setQuery("");
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Arrow key navigation
  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((i) => (i + 1) % filtered.length);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((i) => (i - 1 + filtered.length) % filtered.length);
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (filtered[selectedIndex]) {
          runCommand(filtered[selectedIndex]);
        }
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, filtered, selectedIndex, runCommand]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  if (!open) return null;

  let flatIndex = -1;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh] p-4"
      onClick={() => {
        setOpen(false);
        setQuery("");
      }}
    >
      <div className="absolute inset-0 bg-background/90 backdrop-blur-md" />

      <div
        className="relative w-full max-w-2xl border-2 border-border bg-background shadow-[12px_12px_0px_0px_rgba(var(--primary-rgb),0.1)] overflow-hidden animate-in fade-in slide-in-from-top-4 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="absolute inset-0 diagonal-pattern opacity-5 pointer-events-none" />
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border bg-muted/30 px-6 py-4">
          <div className="flex items-center gap-3">
            <CommandIcon className="size-4 text-primary" />
            <span className={cn("text-lg tracking-widest uppercase font-black", anurati.className)}>
              Command_Center
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-[10px] uppercase font-bold text-muted-foreground bg-muted px-2 py-1 border border-border">
              AUTH_LEVEL: HIGH
            </span>
            <button
              onClick={() => {
                setOpen(false);
                setQuery("");
              }}
              className="hover:bg-muted p-1 border border-transparent hover:border-border transition-all"
            >
              <X className="size-4" />
            </button>
          </div>
        </div>

        {/* Search Input */}
        <div className="flex items-center gap-4 px-6 py-4 bg-background/50 relative z-10 border-b border-border">
          <SearchIcon className="size-5 text-muted-foreground" />
          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="INPUT COMMAND OR KEYWORD..."
            className="flex-1 bg-transparent text-sm font-mono font-bold outline-none placeholder:text-muted-foreground/40 uppercase tracking-widest"
          />
        </div>

        {/* Results */}
        <div className="max-h-[450px] overflow-y-auto custom-scrollbar relative z-10">
          {filtered.length === 0 && (
            <div className="py-12 flex flex-col items-center justify-center gap-4 text-muted-foreground">
              <span className="font-mono text-xs uppercase tracking-[0.3em] font-black">
                [ ERROR: NO_MATCHES_FOUND ]
              </span>
            </div>
          )}

          <div className="p-2 flex flex-col gap-1">
            {Array.from(sections.entries()).map(([section, items]) => (
              <div key={section} className="flex flex-col gap-1 mb-4">
                <div className="px-4 py-2 flex items-center gap-3">
                  <div className="h-[1px] flex-1 bg-border/50" />
                  <span className="font-mono text-[10px] font-black uppercase tracking-[0.2em] text-primary/60">
                    {section}
                  </span>
                  <div className="h-[1px] flex-1 bg-border/50" />
                </div>
                {items.map((cmd) => {
                  flatIndex++;
                  const idx = flatIndex;
                  const isActive = selectedIndex === idx;
                  return (
                    <button
                      key={cmd.id}
                      onClick={() => runCommand(cmd)}
                      onMouseEnter={() => setSelectedIndex(idx)}
                      className={cn(
                        "group flex w-full items-center justify-between px-4 py-3 transition-all relative overflow-hidden",
                        isActive 
                          ? "bg-primary text-primary-foreground" 
                          : "text-foreground hover:bg-muted/50"
                      )}
                    >
                      <div className="flex items-center gap-4 relative z-10">
                        <span className={cn(
                          "transition-transform duration-300",
                          isActive ? "scale-110" : "text-muted-foreground"
                        )}>
                          {cmd.icon}
                        </span>
                        <span className="font-mono text-xs font-bold uppercase tracking-widest text-left">
                          {cmd.label}
                        </span>
                      </div>
                      
                      {isActive && (
                        <span className="font-mono text-[10px] font-black opacity-50 relative z-10">
                          EXECUTE_
                        </span>
                      )}
                      
                      <div className={cn(
                        "absolute inset-0 bg-primary/10 transition-transform duration-300 -translate-x-full group-hover:translate-x-0",
                        isActive && "hidden"
                      )} />
                    </button>
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        {/* Footer hints */}
        <div className="flex items-center justify-between border-t border-border bg-muted/20 px-6 py-3 relative z-10 font-mono text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <kbd className="border border-border bg-muted px-1.5 py-0.5">↑↓</kbd>
              <span>NAVIGATE</span>
            </div>
            <div className="flex items-center gap-2">
              <kbd className="border border-border bg-muted px-1.5 py-0.5">↵</kbd>
              <span>SELECT</span>
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-2">
            <kbd className="border border-border bg-muted px-1.5 py-0.5">ESC</kbd>
            <span>TERMINATE</span>
          </div>
        </div>
      </div>
    </div>
  );
}

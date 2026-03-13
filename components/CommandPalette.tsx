"use client";

import { useEffect, useState, useMemo, useCallback } from "react";
import { useRouter, usePathname } from "next/navigation";
import { FaHome, FaGithub, FaLinkedin } from "react-icons/fa";
import {
  PencilRulerIcon,
  ScrollTextIcon,
  MailIcon,
  SearchIcon,
  CommandIcon,
  CodeIcon,
  BrainCircuitIcon,
  BriefcaseIcon,
  X,
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
  githubUrl,
  linkedinUrl,
}: {
  githubUrl?: string | null;
  linkedinUrl?: string | null;
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
        label: "Home",
        icon: <FaHome className="w-4 h-4" />,
        action: () => router.push("/"),
        keywords: ["home", "main", "landing"],
        section: "Navigation",
      },
      {
        id: "projects",
        label: "Projects",
        icon: <PencilRulerIcon className="w-4 h-4" />,
        action: () => router.push("/projects"),
        keywords: ["projects", "work", "portfolio"],
        section: "Navigation",
      },
      {
        id: "blogs",
        label: "Blogs",
        icon: <ScrollTextIcon className="w-4 h-4" />,
        action: () => router.push("/blogs"),
        keywords: ["blogs", "articles", "writing", "posts"],
        section: "Navigation",
      },
      {
        id: "contact",
        label: "Contact Me",
        icon: <MailIcon className="w-4 h-4" />,
        action: () => router.push("/contact-me"),
        keywords: ["contact", "email", "message", "reach"],
        section: "Navigation",
      },
      {
        id: "tech-stack",
        label: "Tech Stack",
        icon: <CodeIcon className="w-4 h-4" />,
        action: () => router.push("/tech-stack"),
        keywords: ["tech", "stack", "technology", "built with"],
        section: "Navigation",
      },
      {
        id: "skills",
        label: "Skills",
        icon: <BrainCircuitIcon className="w-4 h-4" />,
        action: () => scrollToSection("skills"),
        keywords: ["skills", "technologies", "tools"],
        section: "Sections",
      },
      {
        id: "experience",
        label: "Work Experience",
        icon: <BriefcaseIcon className="w-4 h-4" />,
        action: () => scrollToSection("work-experience"),
        keywords: ["work", "experience", "career", "jobs"],
        section: "Sections",
      },
    ];

    if (githubUrl) {
      items.push({
        id: "github",
        label: "GitHub Profile",
        icon: <FaGithub className="w-4 h-4" />,
        action: () => window.open(githubUrl, "_blank"),
        keywords: ["github", "code", "repos", "open source"],
        section: "External Links",
      });
    }

    if (linkedinUrl) {
      items.push({
        id: "linkedin",
        label: "LinkedIn Profile",
        icon: <FaLinkedin className="w-4 h-4" />,
        action: () => window.open(linkedinUrl, "_blank"),
        keywords: ["linkedin", "professional", "network"],
        section: "External Links",
      });
    }

    return items;
  }, [router, githubUrl, linkedinUrl, scrollToSection]);

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

  // Reset selection when query changes
  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  if (!open) return null;

  let flatIndex = -1;

  return (
    <div
      className="fixed inset-0 z-100 flex items-start justify-center pt-[20vh]"
      onClick={() => {
        setOpen(false);
        setQuery("");
      }}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-background/72 backdrop-blur-md" />

      {/* Palette */}
      <div
        className="ambient-panel relative mx-4 w-full max-w-lg overflow-hidden rounded-2xl animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input */}
        <div className="flex items-center gap-3 border-b border-border/70 px-4">
          <SearchIcon className="w-4 h-4 shrink-0 text-muted-foreground" />
          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a command or search..."
            className="flex-1 bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground"
          />
          <button
            onClick={() => {
              setOpen(false);
              setQuery("");
            }}
            className="text-muted-foreground hover:text-foreground p-1"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results */}
        <div className="max-h-75 overflow-y-auto p-2">
          {filtered.length === 0 && (
            <p className="py-6 text-center text-sm text-muted-foreground">
              No results found.
            </p>
          )}

          {Array.from(sections.entries()).map(([section, items]) => (
            <div key={section}>
              <p className="px-2 py-1.5 text-xs font-medium text-muted-foreground">
                {section}
              </p>
              {items.map((cmd) => {
                flatIndex++;
                const idx = flatIndex;
                return (
                  <button
                    key={cmd.id}
                    onClick={() => runCommand(cmd)}
                    onMouseEnter={() => setSelectedIndex(idx)}
                    className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors ${
                      selectedIndex === idx
                        ? "bg-primary/15 text-foreground"
                        : "text-foreground hover:bg-accent/40"
                    }`}
                  >
                    <span className="text-muted-foreground">{cmd.icon}</span>
                    <span>{cmd.label}</span>
                  </button>
                );
              })}
            </div>
          ))}
        </div>

        {/* Footer hint */}
        <div className="flex items-center justify-between border-t border-border/70 px-4 py-2 text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <kbd className="rounded border border-border/80 bg-background/70 px-1.5 py-0.5 font-mono text-[10px]">
              ↑↓
            </kbd>
            <span>Navigate</span>
            <kbd className="rounded border border-border/80 bg-background/70 px-1.5 py-0.5 font-mono text-[10px]">
              ↵
            </kbd>
            <span>Select</span>
            <kbd className="rounded border border-border/80 bg-background/70 px-1.5 py-0.5 font-mono text-[10px]">
              Esc
            </kbd>
            <span>Close</span>
          </div>
        </div>
      </div>
    </div>
  );
}

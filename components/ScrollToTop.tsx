"use client";

import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface ScrollToTopProps {
  mainRef: React.RefObject<HTMLElement | null>;
}

export default function ScrollToTop({ mainRef }: ScrollToTopProps) {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = (e: Event) => {
    const target = e.target as HTMLElement;
    if (target.scrollTop > 100) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    const currentRef = mainRef.current;
    if (currentRef) {
      currentRef.addEventListener("scroll", toggleVisibility);
    }
    return () => {
      if (currentRef) {
        currentRef.removeEventListener("scroll", toggleVisibility);
      }
    };
  }, [mainRef]);

  const scrollToTop = () => {
    mainRef.current?.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      onClick={() => {
        if (isVisible) scrollToTop();
      }}
      className={cn(
        "fixed bottom-6 right-6 z-1000000 inline-flex h-11 w-11 items-center justify-center rounded-full border border-border/80 bg-background/75 text-foreground shadow-xl backdrop-blur-sm transition-all duration-200",
        isVisible
          ? "translate-y-0 opacity-100 hover:-translate-y-1 hover:border-primary hover:text-primary"
          : "pointer-events-none translate-y-2 opacity-0",
      )}
      aria-label="Scroll to top"
    >
      <ArrowUp className="size-5" />
    </button>
  );
}

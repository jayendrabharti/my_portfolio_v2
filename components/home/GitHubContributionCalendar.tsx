"use client";

import { useState, useEffect } from "react";
import { GitHubCalendar } from "react-github-calendar";
import { useTheme } from "next-themes";

export default function GitHubContributionCalendar({
  username,
}: {
  username: string;
}) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-full overflow-x-auto">
        <div className="h-40 animate-pulse rounded-md bg-muted" />
      </div>
    );
  }

  const theme = {
    dark: ["#1f2937", "#123f52", "#0e7490", "#0284c7", "#38bdf8"],
    light: ["#e8eef8", "#cfe0f4", "#9dc5ee", "#5aa6e8", "#1f7dcf"],
  };

  return (
    <div className="w-full overflow-x-auto">
      <GitHubCalendar
        username={username}
        colorScheme={resolvedTheme === "dark" ? "dark" : "light"}
        theme={theme}
        fontSize={12}
        blockSize={11}
        blockMargin={3}
      />
    </div>
  );
}

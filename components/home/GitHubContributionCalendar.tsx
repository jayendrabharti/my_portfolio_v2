"use client";

import { useState, useEffect } from "react";
import { Activity, GitHubCalendar } from "react-github-calendar";
import { useTheme } from "next-themes";
import "react-github-calendar/tooltips.css";

const tooltips = {
  activity: {
    text: (activity: any) => {
      const date = new Date(activity.date);
      const formattedDate = new Intl.DateTimeFormat("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }).format(date);

      if (!activity.count) {
        return `No contributions on ${formattedDate}`;
      }
      return `${activity.count} contribution${
        activity.count > 1 ? "s" : ""
      } on ${formattedDate}`;
    },
  },
  colorLegend: {
    text: (level: any) => {
      const levels = [
        "No contributions",
        "Low activity",
        "Medium activity",
        "High activity",
        "Very high activity",
      ];
      return levels[level as number] || "Unknown";
    },
  },
};

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
        <div className="h-[160px] animate-pulse rounded-md bg-muted" />
      </div>
    );
  }

  return (
    <div className="w-full flex justify-center py-4">
      <div className="scale-[0.65] sm:scale-90 md:scale-100 origin-center lg:origin-left transition-transform duration-300">
        <GitHubCalendar
          username={username}
          colorScheme={resolvedTheme === "dark" ? "dark" : "light"}
          fontSize={12}
          blockSize={11}
          blockMargin={3}
          tooltips={tooltips}
        />
      </div>
    </div>
  );
}

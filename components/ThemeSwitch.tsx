"use client";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

import React from "react";
import { Button } from "./ui/button";

interface ThemeSwitchProps {
  className?: string;
}

const ThemeSwitch: React.FC<ThemeSwitchProps> = ({ className }) => {
  const { theme, setTheme } = useTheme();

  const switchTheme = (e: React.MouseEvent<HTMLButtonElement>) => {
    setTheme(theme === "dark" ? "light" : "dark");
    e.stopPropagation();
  };

  return (
    <Button
      variant={"outline"}
      size={"icon"}
      onClick={switchTheme}
      className={cn(
        "relative rounded-none border-2 border-border shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)]", 
        className
      )}
    >
      <Moon
        className={`absolute scale-0 dark:scale-100 transition-all duration-400 rotate-180 dark:rotate-0  w-4 h-4`}
      />
      <Sun
        className={`absolute scale-100 dark:scale-0 transition-all duration-400 dark:-rotate-180 rotate-0 w-4 h-4`}
      />
    </Button>
  );
};

export default ThemeSwitch;

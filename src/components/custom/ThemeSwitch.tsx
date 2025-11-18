"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
type Props = { className?: string };

export function ThemeSwitch({ className = "" }: Props) {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      role="switch"
      aria-checked={isDark}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={className}
    >
      <span
        className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors duration-200 ${
          isDark ? "bg-black/50 border border-white/30" : "bg-white/70 border border-black/20"
        }`}
      >
        <span
          className={`absolute left-1 top-1 grid h-5 w-5 place-items-center rounded-full shadow-sm transition-transform duration-200 ${
            isDark ? "translate-x-5 bg-gray-900 text-white" : "translate-x-0 bg-white text-black"
          }`}
        >
          {isDark ? <Moon className="size-4" /> : <Sun className="size-4" />}
        </span>
      </span>
    </button>
  );
}
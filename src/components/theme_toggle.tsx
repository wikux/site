"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

type Theme = "light" | "dim";

function read_theme(): Theme {
  const attr = document.documentElement.getAttribute("data-theme");
  return attr === "dim" ? "dim" : "light";
}

export function ThemeToggle() {
  const [theme, set_theme] = useState<Theme>("light");
  const [ready, set_ready] = useState(false);

  useEffect(() => {
    set_theme(read_theme());
    set_ready(true);
  }, []);

  function toggle() {
    const next: Theme = theme === "light" ? "dim" : "light";
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("wikux-theme", next);
    } catch {
      /* ignore */
    }
    set_theme(next);
  }

  const label = ready
    ? theme === "light"
      ? "Switch to dim mode"
      : "Switch to light mode"
    : "Toggle color theme";

  return (
    <button
      type="button"
      onClick={toggle}
      className="inline-flex cursor-pointer items-center justify-center border border-border bg-surface p-2 text-foreground transition-colors hover:border-wikux-accent hover:bg-wikux-yellow/15 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-wikux-accent"
      aria-label={label}
      title={label}
    >
      {ready && theme === "dim" ? (
        <Sun className="size-4" aria-hidden="true" strokeWidth={1.75} />
      ) : (
        <Moon className="size-4" aria-hidden="true" strokeWidth={1.75} />
      )}
    </button>
  );
}

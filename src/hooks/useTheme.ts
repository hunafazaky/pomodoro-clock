import { useEffect, useState } from "react";

export type Theme = "dark" | "light";

const STORAGE_KEY = "pomodoro-theme";
const THEME_COLOR = { dark: "#1a1b26", light: "#e1e2e7" } as const;

function getPreferredTheme(): Theme {
  if (typeof window === "undefined") return "dark";

  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (stored === "dark" || stored === "light") return stored;

  const prefersLight =
    typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-color-scheme: light)").matches;
  return prefersLight ? "light" : "dark";
}

/**
 * Owns the dark/light theme choice: reads the system preference or a saved
 * override on first load, then keeps the DOM, localStorage, and the
 * mobile browser-chrome color in sync whenever it changes.
 */
export function useTheme() {
  const [theme, setTheme] = useState<Theme>(getPreferredTheme);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem(STORAGE_KEY, theme);
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute("content", THEME_COLOR[theme]);
  }, [theme]);

  function toggleTheme() {
    setTheme((current) => (current === "dark" ? "light" : "dark"));
  }

  return { theme, toggleTheme };
}

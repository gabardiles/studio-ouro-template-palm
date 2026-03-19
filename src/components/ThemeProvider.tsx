"use client";

import { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark";

interface ThemeContextValue {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: "light",
  toggleTheme: () => {},
});

export function useTheme() {
  return useContext(ThemeContext);
}

interface ThemeProviderProps {
  children: React.ReactNode;
  defaultMode: Theme;
}

function applyTheme(theme: Theme) {
  const html = document.documentElement;
  if (theme === "dark") {
    html.classList.add("dark");
    html.setAttribute("data-mode", "dark");
  } else {
    html.classList.remove("dark");
    html.setAttribute("data-mode", "light");
  }
}

export function ThemeProvider({ children, defaultMode }: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(defaultMode);

  useEffect(() => {
    const stored = localStorage.getItem("site-theme") as Theme | null;
    const resolved = stored ?? defaultMode;
    setTheme(resolved);
    applyTheme(resolved);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    localStorage.setItem("site-theme", next);
    applyTheme(next);
    setTheme(next);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

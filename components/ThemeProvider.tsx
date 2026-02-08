"use client";

import { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light");
  const [mounted, setMounted] = useState(false);

  const updateTheme = (newTheme: Theme) => {
    if (typeof document !== "undefined") {
      const root = document.documentElement;
      if (newTheme === "dark") {
        root.classList.add("dark");
      } else {
        root.classList.remove("dark");
      }
    }
  };

  // useEffect(() => {
  //   setMounted(true);
  //   // Check for saved theme preference or default to light
  //   if (typeof window !== "undefined") {
  //     const savedTheme = localStorage.getItem("theme") as Theme;
  //     const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

  //     const initialTheme = savedTheme || (prefersDark ? "dark" : "light");
  //     setTheme(initialTheme);
  //     updateTheme(initialTheme);
  //   }
  // }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    updateTheme(newTheme);
    if (typeof window !== "undefined") {
      localStorage.setItem("theme", newTheme);
    }
  };

  const setThemeValue = (newTheme: Theme) => {
    setTheme(newTheme);
    updateTheme(newTheme);
    if (typeof window !== "undefined") {
      localStorage.setItem("theme", newTheme);
    }
  };

  // Provide default context even before mount to prevent errors
  const contextValue: ThemeContextType = {
    theme,
    toggleTheme,
    setTheme: setThemeValue,
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}


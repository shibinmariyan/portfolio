"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import Logo from "./Logo";
import { m, AnimatePresence } from "framer-motion";

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Update active section based on scroll position
      const sections = ["landing", "experience", "projects", "skills", "contact"];
      const current = sections.find((section) => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      setActiveSection(current || "");
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Home", href: "#landing" },
    { name: "Experience", href: "#experience" },
    { name: "Projects", href: "#projects" },
    { name: "Skills", href: "#skills" },
    { name: "Contact", href: "#contact" },
  ];

  const handleNavClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
          ? "bg-white/90 dark:bg-slate-900/95 backdrop-blur-md border-b border-neutral-200/50 dark:border-white/5 shadow-sm py-2"
          : "bg-transparent py-4"
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <a href="#landing" className="flex items-center">
                <Logo size="sm" showText={false} />
              </a>
              <span className="hidden sm:inline-block px-3 py-1 text-xs font-bold tracking-wider text-primary-700 dark:text-primary-300 bg-primary-100 dark:bg-primary-900/50 rounded-full border border-primary-200 dark:border-primary-700">
                AVAILABLE FOR HIRE
              </span>
            </div>
            <div className="hidden md:flex items-center space-x-6">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className={`px-4 py-2 rounded-full transition-all ${activeSection === item.href.slice(1)
                    ? "glass text-primary-700 dark:text-primary-300 font-semibold"
                    : "text-neutral-700 dark:text-neutral-300 hover:text-primary-600 dark:hover:text-primary-400"
                    }`}
                >
                  {item.name}
                </a>
              ))}
              {/* <ThemeToggle /> */}
            </div>
            <div className="flex items-center space-x-2 md:hidden">
              {/* <ThemeToggle /> */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="glass p-2 rounded-lg hover:scale-110 transition-transform duration-300"
                aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              >
                {mobileMenuOpen ? (
                  <X className="w-6 h-6 text-neutral-700 dark:text-neutral-300" />
                ) : (
                  <Menu className="w-6 h-6 text-neutral-700 dark:text-neutral-300" />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <m.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed top-20 left-0 right-0 z-40 md:hidden"
          >
            <div className="glass-strong mx-4 rounded-2xl p-6 border border-neutral-200 dark:border-neutral-700">
              <div className="flex flex-col space-y-4">
                {navItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={handleNavClick}
                    className={`px-4 py-3 rounded-lg transition-all text-center ${activeSection === item.href.slice(1)
                      ? "bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 font-semibold"
                      : "text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                      }`}
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </>
  );
}

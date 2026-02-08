"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import Logo from "./Logo";

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");

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

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
        ? "glass-strong py-2"
        : "py-4 glass"
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <a href="#landing" className="flex items-center">
              <Logo size="sm" showText={false} />
            </a>
            <span className="hidden sm:inline-block px-3 py-1 text-xs font-bold tracking-wider text-primary-700 bg-primary-100 rounded-full border border-primary-200">
              AVAILABLE FOR HIRE
            </span>
          </div>
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={`px-4 py-2 rounded-full transition-all ${activeSection === item.href.slice(1)
                  ? "glass text-primary-700 font-semibold"
                  : "text-neutral-700 hover:text-primary-600"
                  }`}
              >
                {item.name}
              </a>
            ))}
            <ThemeToggle />
          </div>
          <div className="flex items-center space-x-2 md:hidden">
            <ThemeToggle />
            <button className="glass p-2 rounded-lg hover:scale-110 transition-transform duration-300">
              <Menu className="w-6 h-6 text-neutral-700" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

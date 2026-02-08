"use client";

import { m } from "framer-motion";
import { portfolioData } from "@/app/data/portfolio";

export default function Logo({ className = "", showText = true, size = "md" }: { className?: string; showText?: boolean; size?: "sm" | "md" | "lg" | "xl" }) {
  const sizeClasses = {
    sm: "text-2xl",
    md: "text-4xl",
    lg: "text-5xl",
    xl: "text-6xl",
  };

  const textSizeClasses = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base",
    xl: "text-lg",
  };

  // Extract initials properly now that we have split names
  const initials = [
    portfolioData.personalInfo.firstName[0],
    portfolioData.personalInfo.middleName ? portfolioData.personalInfo.middleName[0] : "",
    portfolioData.personalInfo.lastName[0]
  ].filter(Boolean);

  return (
    <m.div
      className={`flex flex-col items-center gap-2 ${className}`}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Text-based Logo (S M S) */}
      <m.div
        className={`${sizeClasses[size]} font-black tracking-tighter flex items-center justify-center gap-1 select-none`}
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <span className="text-primary-700 dark:text-white">
          {initials[0]}
        </span>
        <span className="text-primary-700 dark:text-white">
          {initials[1]}
        </span>
        <span className="text-primary-700 dark:text-white ">
          {initials[2]}
        </span>
      </m.div>

      {/* Text below logo */}
      {showText && (
        <m.p
          className={`${textSizeClasses[size]} text-neutral-400 dark:text-neutral-500 font-medium tracking-wider uppercase`}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          {portfolioData.personalInfo.name}
        </m.p>
      )}
    </m.div>
  );
}


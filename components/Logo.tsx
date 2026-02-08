"use client";

import { m } from "framer-motion";
import Image from "next/image";
import logoImage from "@/app/assets/sms_logo.png";

export default function Logo({ className = "", showText = true, size = "md" }: { className?: string; showText?: boolean; size?: "sm" | "md" | "lg" | "xl" }) {
  const sizeClasses = {
    sm: "w-16 h-16",
    md: "w-32 h-32",
    lg: "w-48 h-48",
    xl: "w-64 h-64",
  };

  const textSizeClasses = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base",
    xl: "text-lg",
  };

  return (
    <m.div
      className={`flex flex-col items-center gap-2 ${className}`}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* SMS Logo Image */}
      <m.div
        className={`${sizeClasses[size]} relative`}
        whileHover={{ scale: 1.1 }}
        transition={{ type: "spring", stiffness: 300 }}
        style={{
          filter: "drop-shadow(0 4px 12px rgba(0, 0, 0, 0.3))",
        }}
      >
        <Image
          src={logoImage}
          alt="SMS Logo - Shibin Mariyan Stanly"
          fill
          className="object-contain"
          priority
          sizes="(max-width: 768px) 64px, (max-width: 1024px) 128px, 192px"
        />
      </m.div>

      {/* Text below logo */}
      {showText && (
        <m.p
          className={`${textSizeClasses[size]} text-neutral-400 dark:text-neutral-500 font-medium tracking-wider uppercase`}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          SHIBIN MARIYAN STANLY
        </m.p>
      )}
    </m.div>
  );
}


"use client";

import { ReactNode } from "react";
import { m } from "framer-motion";

interface Icon3DProps {
  children: ReactNode;
  className?: string;
  depth?: number;
  delay?: number;
}

export default function Icon3D({ children, className = "", depth = 0.3, delay = 0 }: Icon3DProps) {
  return (
    <m.div
      className={className}
      initial={{ y: 0 }}
      animate={{ y: [0, -8, 0] }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
        delay: delay
      }}
      whileHover={{ scale: 1.1, z: depth, y: -5 }}
      style={{
        transformStyle: "preserve-3d",
        perspective: "1000px",
      }}
    >
      <m.div
        style={{
          transform: "translateZ(20px)",
          filter: "drop-shadow(0 10px 20px rgba(0,0,0,0.3))",
        }}
      >
        {children}
      </m.div>
    </m.div>
  );
}


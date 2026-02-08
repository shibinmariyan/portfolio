"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect } from "react";

export default function MouseFollower() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth spring animation for the follower
  const springConfig = { damping: 20, stiffness: 300, mass: 0.5 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Center the cursor
      mouseX.set(e.clientX - 16);
      mouseY.set(e.clientY - 16);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <>
      {/* Main Cursor Dot */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full border-2 border-primary-500 pointer-events-none z-[9999] mix-blend-difference hidden md:block"
        style={{ x, y }}
      />

      {/* Secondary Trailing Dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-accent-500 pointer-events-none z-[9999] hidden md:block"
        style={{
          x: useSpring(mouseX, { ...springConfig, damping: 25, mass: 0.8 }), // Slightly laggier
          y: useSpring(mouseY, { ...springConfig, damping: 25, mass: 0.8 }),
          marginLeft: 12, // Offset to center relative to big circle
          marginTop: 12
        }}
      />
    </>
  );
}

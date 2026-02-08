"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Code2, Sparkles } from "lucide-react";

const loadingMessages = [
  "Initializing portfolio",
  "Loading experience",
  "Preparing projects",
  "Setting up interface",
  "Almost ready",
];

export default function LoadingAnimation({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [currentMessage, setCurrentMessage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => onComplete(), 1000);
          return 100;
        }
        return prev + 2;
      });
    }, 50);

    const messageInterval = setInterval(() => {
      setCurrentMessage((prev) => (prev + 1) % loadingMessages.length);
    }, 800);

    return () => {
      clearInterval(interval);
      clearInterval(messageInterval);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {progress < 100 && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-50 dark:bg-slate-900"
        >
          <div className="text-center max-w-md px-8">
            {/* Animated Logo */}
            <motion.div
              className="relative mb-12"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {/* Outer rotating ring */}
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              >
                <div className="w-32 h-32 rounded-full border-4 border-transparent border-t-primary-500 border-r-secondary-500"></div>
              </motion.div>

              {/* Inner pulsing circle */}
              <motion.div
                className="relative flex items-center justify-center w-32 h-32 mx-auto"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary-500/20 to-secondary-500/20 rounded-full blur-xl"></div>
                <div className="relative w-20 h-20 bg-gradient-to-br from-primary-600 to-secondary-600 rounded-2xl flex items-center justify-center shadow-xl">
                  <Code2 className="w-10 h-10 text-white" />
                </div>
              </motion.div>
            </motion.div>

            {/* Loading Message */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentMessage}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="mb-8"
              >
                <p className="text-neutral-900 dark:text-neutral-100 text-xl font-semibold flex items-center justify-center gap-2">
                  <Sparkles className="w-5 h-5 text-primary-500" />
                  {loadingMessages[currentMessage]}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* Progress Bar */}
            <div className="mb-4">
              <div className="w-full h-2 bg-neutral-200 dark:bg-slate-800 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-500"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                />
              </div>
            </div>

            {/* Progress Percentage */}
            <motion.p
              className="text-neutral-600 dark:text-neutral-400 text-sm font-mono"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              {progress}%
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

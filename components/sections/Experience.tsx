"use client";

import { useRef } from "react";
import { portfolioData } from "@/app/data/portfolio";
import { motion, useScroll, useTransform, Variants, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

interface ExperienceItem {
  company: string;
  position: string;
  positions?: string[];
  startDate: string;
  endDate?: string;
  location: string;
  description: string[];
}

function parseDate(dateStr: string): Date {
  const [year, monthAbbr] = dateStr.toLowerCase().split("-");
  const monthMap: { [key: string]: number } = {
    jan: 0, feb: 1, mar: 2, apr: 3, may: 4, jun: 5,
    jul: 6, aug: 7, sep: 8, oct: 9, nov: 10, dec: 11
  };
  const month = monthMap[monthAbbr] ?? 0;
  return new Date(parseInt(year), month, 1);
}

function formatDate(date: Date): string {
  return `${date.toLocaleString("default", { month: "short" })} ${date.getFullYear()}`;
}



export default function Experience() {
  const shouldReduceMotion = useReducedMotion();

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: shouldReduceMotion ? 0 : 0.1, delayChildren: 0.1 },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: shouldReduceMotion ? 0 : 20, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { duration: 0.5 } },
  };

  return (
    <section id="experience" className="py-24 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-950">
      <div className="max-w-7xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12"
        >
          {/* Header Column */}
          <div className="lg:col-span-4">
            <motion.h2 variants={itemVariants} className="text-5xl md:text-7xl font-bold tracking-tight text-neutral-900 dark:text-white mb-6">
              Experience
            </motion.h2>
            <motion.p variants={itemVariants} className="text-xl text-neutral-500 dark:text-neutral-400 max-w-sm">
              A timeline of my professional journey and technical leadership.
            </motion.p>
          </div>

          {/* List Column */}
          <div className="lg:col-span-8 space-y-12">
            {portfolioData.experience.map((exp, index) => {
              const startDate = parseDate(exp.startDate);
              const endDate = exp.endDate !== "Present" ? parseDate(exp.endDate) : null;
              const dateString = `${formatDate(startDate)} — ${endDate ? formatDate(endDate) : "Present"}`;

              return (
                <motion.div key={index} variants={itemVariants} className="group relative pl-8 border-l border-neutral-200 dark:border-neutral-700 hover:border-primary-500 transition-colors duration-300">
                  <motion.div
                    className="absolute -left-1.5 top-0 w-3 h-3 rounded-full bg-neutral-200 dark:bg-neutral-700 group-hover:bg-primary-500 transition-colors duration-300"
                    initial={{ scale: 1, boxShadow: "0 0 0 0px rgba(59, 130, 246, 0)" }}
                    whileInView={{
                      scale: [1, 1.3, 1],
                      boxShadow: [
                        "0 0 0 0px rgba(59, 130, 246, 0)",
                        "0 0 0 4px rgba(59, 130, 246, 0.2)",
                        "0 0 0 0px rgba(59, 130, 246, 0)",
                      ],
                    }}
                    viewport={{ once: false, margin: "-50px" }}
                    transition={{
                      duration: 2.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: index * 0.2,
                    }}
                  />

                  <div className="flex flex-col md:flex-row md:items-baseline md:justify-between mb-2">
                    <h3 className="text-2xl font-bold text-neutral-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                      {exp.company}
                    </h3>
                    <span className="text-sm font-mono text-neutral-500 dark:text-neutral-400 mt-1 md:mt-0">
                      {dateString}
                    </span>
                  </div>

                  <div className="mb-4">
                    <p className="text-lg font-medium text-neutral-800 dark:text-neutral-200">
                      {exp.position}
                    </p>
                    {exp.positions && (
                      <p className="text-xs text-neutral-400 dark:text-neutral-500 mt-1">
                        Previously: {exp.positions.filter(p => p !== exp.position).join(", ")}
                      </p>
                    )}
                    <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-4">{exp.location}</p>
                  </div>

                  <ul className="space-y-2">
                    {exp.description.map((desc, i) => (
                      <li key={i} className="text-neutral-600 dark:text-neutral-300 leading-relaxed flex items-start gap-2 text-sm sm:text-base">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-neutral-300 dark:bg-neutral-600 flex-shrink-0" />
                        {desc}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

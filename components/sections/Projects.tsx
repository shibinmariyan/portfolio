"use client";

import { m, Variants, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Code2, Database, Layers, ExternalLink, Globe, Smartphone } from "lucide-react";

interface Project {
  name: string;
  type: "Web Application" | "Mobile App" | "Full Stack" | "Frontend";
  period: string;
  description: string;
  highlights: string[];
  technologies: string[];
  link?: string;
}

import { portfolioData } from "@/app/data/portfolio";
import { useRef } from "react";

export default function Projects() {
  const shouldReduceMotion = useReducedMotion();

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: shouldReduceMotion ? 0 : 0.1 },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: shouldReduceMotion ? 0 : 20, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { duration: 0.5 } },
  };

  const iconMap = {
    "Full Stack": Code2,
    Frontend: Layers,
    Backend: Database,
  };

  return (
    <section id="projects" className="py-24 px-4 sm:px-6 lg:px-8 bg-neutral-100 dark:bg-slate-900 border-t border-neutral-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto">
        <m.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12"
        >
          {/* Header */}
          <div className="lg:col-span-12 mb-8">
            <m.h2 variants={itemVariants} className="text-5xl md:text-7xl font-bold tracking-tight text-neutral-900 dark:text-white mb-6">
              Selected Work
            </m.h2>
            <m.p variants={itemVariants} className="text-xl text-neutral-500 dark:text-neutral-400 max-w-2xl">
              Architectural highlights and engineering challenges solved across different domains.
            </m.p>
          </div>

          {/* Projects Grid */}
          <div className="lg:col-span-12 grid grid-cols-1 md:grid-cols-2 gap-8">
            {portfolioData.projects.map((project, index) => {
              const Icon = iconMap[project.type as keyof typeof iconMap] || Code2;
              return (
                <m.div
                  key={index}
                  variants={itemVariants}
                  className="group relative bg-white dark:bg-slate-800 rounded-3xl p-8 border border-neutral-200 dark:border-slate-700 hover:shadow-xl hover:border-neutral-300 dark:hover:border-slate-600 transition-all duration-300 flex flex-col"
                >
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center gap-4">
                      <m.div
                        className="p-3 rounded-2xl bg-neutral-100 dark:bg-slate-700 text-neutral-900 dark:text-white"
                        initial={{ y: 0, scale: 1 }}
                        whileInView={{
                          y: [0, -8, 0],
                          scale: [1, 1.05, 1],
                        }}
                        viewport={{ once: false, margin: "-50px" }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: index * 0.2,
                        }}
                      >
                        <Icon className="w-6 h-6" />
                      </m.div>
                      <div>
                        <h3 className="text-2xl font-bold text-neutral-900 dark:text-white leading-tight">
                          {project.name}
                        </h3>
                        <span className="text-xs font-mono text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                          {project.type} — {project.period}
                        </span>
                      </div>
                    </div>
                  </div>

                  <p className="text-neutral-600 dark:text-neutral-300 mb-6 leading-relaxed flex-grow">
                    {project.description}
                  </p>

                  <div className="space-y-4 mb-8">
                    {project.highlights.slice(0, 2).map((highlight, i) => ( // Limit highlights to keep card clean
                      <div key={i} className="flex items-start gap-2 text-sm text-neutral-500 dark:text-neutral-400">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-primary-500 flex-shrink-0" />
                        {highlight}
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-2 mt-auto pt-6 border-t border-neutral-100 dark:border-slate-700">
                    {project.technologies.map((tech, i) => (
                      <span key={i} className="px-3 py-1 text-xs font-medium rounded-full bg-neutral-100 dark:bg-slate-700 text-neutral-600 dark:text-neutral-300">
                        {tech}
                      </span>
                    ))}
                  </div>
                </m.div>
              );
            })}
          </div>
        </m.div>
      </div>
    </section>
  );
}

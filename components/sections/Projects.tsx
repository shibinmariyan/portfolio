"use client";

import { motion, Variants } from "framer-motion";
import { Code2, Database, Layers, ExternalLink } from "lucide-react";
import Icon3D from "@/components/Icon3D";

interface Project {
  name: string;
  type: "Full Stack" | "Frontend" | "Backend";
  period: string;
  description: string;
  highlights: string[];
  technologies: string[];
  link?: string;
}

import { portfolioData } from "@/app/data/portfolio";

export default function Projects() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { duration: 0.5 } },
  };

  const iconMap = {
    "Full Stack": Code2,
    Frontend: Layers,
    Backend: Database,
  };

  return (
    <section id="projects" className="py-24 px-4 sm:px-6 lg:px-8 bg-neutral-100 border-t border-neutral-200">
      <div className="max-w-7xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12"
        >
          {/* Header */}
          <div className="lg:col-span-12 mb-8">
            <motion.h2 variants={itemVariants} className="text-5xl md:text-7xl font-bold tracking-tight text-neutral-900 mb-6">
              Selected Work
            </motion.h2>
            <motion.p variants={itemVariants} className="text-xl text-neutral-500 max-w-2xl">
              Architectural highlights and engineering challenges solved across different domains.
            </motion.p>
          </div>

          {/* Projects Grid */}
          <div className="lg:col-span-12 grid grid-cols-1 md:grid-cols-2 gap-8">
            {portfolioData.projects.map((project, index) => {
              const Icon = iconMap[project.type as keyof typeof iconMap] || Code2;
              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="group relative bg-white rounded-3xl p-8 border border-neutral-200 hover:shadow-xl hover:border-neutral-300 transition-all duration-300 flex flex-col"
                >
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center gap-4">
                      <div className="p-3 rounded-2xl bg-neutral-100 text-neutral-900">
                        <Icon className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-neutral-900 leading-tight">
                          {project.name}
                        </h3>
                        <span className="text-xs font-mono text-neutral-500 uppercase tracking-wider">
                          {project.type} — {project.period}
                        </span>
                      </div>
                    </div>
                  </div>

                  <p className="text-neutral-600 mb-6 leading-relaxed flex-grow">
                    {project.description}
                  </p>

                  <div className="space-y-4 mb-8">
                    {project.highlights.slice(0, 2).map((highlight, i) => ( // Limit highlights to keep card clean
                      <div key={i} className="flex items-start gap-2 text-sm text-neutral-500">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-primary-500 flex-shrink-0" />
                        {highlight}
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-2 mt-auto pt-6 border-t border-neutral-100">
                    {project.technologies.map((tech, i) => (
                      <span key={i} className="px-3 py-1 text-xs font-medium rounded-full bg-neutral-100 text-neutral-600">
                        {tech}
                      </span>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

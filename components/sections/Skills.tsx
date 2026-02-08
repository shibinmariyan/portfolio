"use client";

import { motion, Variants } from "framer-motion";
import {
  Sparkles,
  Award,
} from "lucide-react";
import { portfolioData } from "@/app/data/portfolio";

export default function Skills() {
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

  return (
    <section id="skills" className="py-24 px-4 sm:px-6 lg:px-8 bg-neutral-50 dark:bg-slate-900 border-t border-neutral-200 dark:border-slate-700">
      <div className="max-w-7xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="mb-16 text-left">
            <motion.h2 variants={itemVariants} className="text-5xl md:text-7xl font-bold tracking-tight text-neutral-900 mb-6">
              Expertise
            </motion.h2>
            <motion.p variants={itemVariants} className="text-xl text-neutral-500 max-w-2xl">
              A comprehensive toolkit for building scalable, high-performance distributed systems.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {portfolioData.skillCategories.map((category, index) => {
              const Icon = category.icon;
              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="p-8 rounded-3xl bg-neutral-100 border border-neutral-200 hover:border-neutral-300 transition-colors"
                >
                  <div className="mb-6 flex items-center gap-4">
                    <div className="p-3 bg-white dark:bg-slate-800 rounded-2xl shadow-sm">
                      <Icon className="w-6 h-6 text-neutral-900" />
                    </div>
                    <h3 className="text-xl font-bold text-neutral-900">
                      {category.category}
                    </h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1.5 text-sm font-medium rounded-lg bg-white dark:bg-slate-800 border border-neutral-200 dark:border-slate-700 text-neutral-600 dark:text-neutral-300"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>

          <motion.div variants={itemVariants} className="border-t border-neutral-200 pt-16">
            <div className="grid md:grid-cols-12 gap-8 items-start">
              <div className="md:col-span-4">
                <h3 className="text-3xl font-bold text-neutral-900 mb-4">
                  Certifications
                </h3>
                <p className="text-neutral-500">
                  Verified technical competencies and continuous learning milestones.
                </p>
              </div>
              <div className="md:col-span-8 grid sm:grid-cols-2 gap-4">
                {portfolioData.certifications.map((cert, index) => (
                  <div key={index} className="flex items-center gap-3 p-4 rounded-xl bg-neutral-100 border border-neutral-100">
                    <Award className="w-5 h-5 text-primary-600 flex-shrink-0" />
                    <span className="font-medium text-neutral-700">{cert}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid md:grid-cols-12 gap-8 items-start mt-12 pt-12 border-t border-neutral-100">
              <div className="md:col-span-4">
                <h3 className="text-3xl font-bold text-neutral-900 mb-4">
                  Education
                </h3>
                <p className="text-neutral-500">
                  Academic background and qualifications.
                </p>
              </div>
              <div className="md:col-span-8 grid grid-cols-1 gap-4">
                {portfolioData.education.map((edu, index) => (
                  <div key={index} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-xl bg-neutral-100 border border-neutral-100 hover:border-primary-200 transition-colors">
                    <div>
                      <h4 className="text-lg font-bold text-neutral-900">{edu.degree}</h4>
                      <p className="text-neutral-600">{edu.college}</p>
                    </div>
                    <span className="px-3 py-1 bg-white dark:bg-slate-800 rounded-full text-sm font-mono text-neutral-500 dark:text-neutral-400 whitespace-nowrap border border-neutral-200 dark:border-slate-700">
                      {edu.period}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

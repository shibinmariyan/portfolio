"use client";

import { portfolioData } from "@/app/data/portfolio";
import { m, Variants, useReducedMotion, useScroll, useTransform } from "framer-motion";
import {
  Sparkles,
  Award,
} from "lucide-react";

import { useRef } from 'react';

export default function Skills() {
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

  return (
    <section id="skills" className="py-24 px-4 sm:px-6 lg:px-8 bg-neutral-50 dark:bg-slate-900 border-t border-neutral-200 dark:border-slate-700">
      <div className="max-w-7xl mx-auto">
        <m.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="mb-16 text-left">
            <m.h2 variants={itemVariants} className="text-5xl md:text-7xl font-bold tracking-tight text-neutral-900 dark:text-white mb-6">
              Expertise
            </m.h2>
            <m.p variants={itemVariants} className="text-xl text-neutral-500 dark:text-neutral-400 max-w-2xl">
              A comprehensive toolkit for building scalable, high-performance distributed systems.
            </m.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {portfolioData.skillCategories.map((category, index) => {
              const Icon = category.icon;
              return (
                <m.div
                  key={index}
                  variants={itemVariants}
                  className="group p-8 bg-white dark:bg-slate-800 rounded-3xl border border-neutral-200 dark:border-slate-700 hover:border-primary-500 dark:hover:border-primary-600 transition-all duration-300 hover:shadow-lg"
                >
                  <div className="mb-6 flex items-center gap-4">
                    <m.div
                      className="inline-flex p-4 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-700 text-white"
                      initial={{ y: 0, scale: 1, rotate: 0 }}
                      whileInView={{
                        y: shouldReduceMotion ? 0 : [0, -8, 0],
                        scale: shouldReduceMotion ? 1 : [1, 1.05, 1],
                        rotate: shouldReduceMotion ? 0 : [0, 2, 0, -2, 0],
                      }}
                      viewport={{ once: false, margin: "-50px" }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: index * 0.3,
                      }}
                    >
                      <Icon className="w-8 h-8" />
                    </m.div>
                    <h3 className="text-xl font-bold text-neutral-900 dark:text-white">
                      {category.category}
                    </h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1.5 text-sm font-medium rounded-lg bg-white dark:bg-slate-700 border border-neutral-200 dark:border-slate-600 text-neutral-600 dark:text-neutral-300"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </m.div>
              );
            })}
          </div>

          <m.div variants={itemVariants} className="border-t border-neutral-200 dark:border-slate-800 pt-16">
            <div className="grid md:grid-cols-12 gap-8 items-start">
              <div className="md:col-span-4">
                <h3 className="text-3xl font-bold text-neutral-900 dark:text-white mb-4">
                  Certifications
                </h3>
                <p className="text-neutral-500 dark:text-neutral-400">
                  Verified technical competencies and continuous learning milestones.
                </p>
              </div>
              <div className="md:col-span-8 grid sm:grid-cols-2 gap-4">
                {portfolioData.certifications.map((cert, index) => (
                  <div key={index} className="flex items-center gap-3 p-4 rounded-xl bg-neutral-100 dark:bg-slate-800/50 border border-neutral-100 dark:border-slate-700">
                    <Award className="w-5 h-5 text-primary-600 dark:text-primary-400 flex-shrink-0" />
                    <span className="font-medium text-neutral-700 dark:text-neutral-200">{cert}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid md:grid-cols-12 gap-8 items-start mt-12 pt-12 border-t border-neutral-100 dark:border-slate-800">
              <div className="md:col-span-4">
                <h3 className="text-3xl font-bold text-neutral-900 dark:text-white mb-4">
                  Education
                </h3>
                <p className="text-neutral-500 dark:text-neutral-400">
                  Academic background and qualifications.
                </p>
              </div>
              <div className="md:col-span-8 grid grid-cols-1 gap-4">
                {portfolioData.education.map((edu, index) => (
                  <div key={index} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-xl bg-neutral-100 dark:bg-slate-800/50 border border-neutral-100 dark:border-slate-700 hover:border-primary-200 dark:hover:border-primary-800 transition-colors">
                    <div>
                      <h4 className="text-lg font-bold text-neutral-900 dark:text-white">{edu.degree}</h4>
                      <p className="text-neutral-600 dark:text-neutral-400">{edu.college}</p>
                    </div>
                    <span className="px-3 py-1 bg-white dark:bg-slate-700 rounded-full text-sm font-mono text-neutral-500 dark:text-neutral-300 whitespace-nowrap border border-neutral-200 dark:border-slate-600">
                      {edu.period}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </m.div>
        </m.div>
      </div>
    </section>
  );
}

"use client";

import { m } from "framer-motion";
import { GraduationCap, Award } from "lucide-react";
import { portfolioData } from "@/app/data/portfolio";

export default function Education() {
    return (
        <section id="education" className="py-20 px-4 sm:px-6 lg:px-8 bg-neutral-50 dark:bg-slate-900 border-t border-neutral-200 dark:border-slate-800">
            <div className="max-w-7xl mx-auto">
                <m.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-12"
                >
                    {/* Education Column */}
                    <div>
                        <h2 className="text-3xl font-bold text-neutral-900 dark:text-white mb-8 flex items-center gap-3">
                            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg text-blue-600 dark:text-blue-400">
                                <GraduationCap className="w-6 h-6" />
                            </div>
                            Education
                        </h2>
                        <div className="space-y-8">
                            {portfolioData.education.map((edu, index) => (
                                <div key={index} className="relative pl-6 border-l-2 border-neutral-200 dark:border-slate-700">
                                    <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-blue-500 ring-4 ring-white dark:ring-slate-900" />
                                    <h3 className="text-xl font-bold text-neutral-900 dark:text-white">{edu.degree}</h3>
                                    <p className="text-neutral-600 dark:text-neutral-400 mt-1">{edu.college}</p>
                                    <span className="inline-block mt-2 px-3 py-1 bg-neutral-100 dark:bg-slate-800 text-sm font-medium rounded-full text-neutral-600 dark:text-neutral-400">
                                        {edu.period}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Certifications Column */}
                    <div>
                        <h2 className="text-3xl font-bold text-neutral-900 dark:text-white mb-8 flex items-center gap-3">
                            <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg text-purple-600 dark:text-purple-400">
                                <Award className="w-6 h-6" />
                            </div>
                            Certifications
                        </h2>
                        <div className="grid gap-4">
                            {portfolioData.certifications.map((cert, index) => (
                                <div
                                    key={index}
                                    className="p-4 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-neutral-100 dark:border-slate-700 flex items-start gap-4 hover:border-purple-200 dark:hover:border-purple-900 transition-colors"
                                >
                                    <Award className="w-5 h-5 text-purple-500 mt-1 flex-shrink-0" />
                                    <span className="font-medium text-neutral-800 dark:text-neutral-200">{cert}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </m.div>
            </div>
        </section>
    );
}

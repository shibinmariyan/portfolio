"use client";

import { m } from "framer-motion";
import { portfolioData } from "@/app/data/portfolio";
import { Calendar, MapPin, Briefcase, Clock } from "lucide-react";

export default function RecruiterSummary() {
    return (
        <m.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-full max-w-4xl mx-auto mb-12 p-6 bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-neutral-200 dark:border-slate-700 flex flex-col md:flex-row justify-between items-start md:items-center gap-6"
        >
            <div className="flex flex-col gap-2">
                <h3 className="text-sm font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                    Quick Summary
                </h3>
                <div className="flex flex-wrap gap-4 text-neutral-900 dark:text-white font-medium">
                    <div className="flex items-center gap-2">
                        <Briefcase className="w-5 h-5 text-primary-600" />
                        <span>{portfolioData.personalInfo.title}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Clock className="w-5 h-5 text-green-600" />
                        <span>{portfolioData.personalInfo.availability}</span>
                    </div>
                </div>
            </div>

            <div className="flex flex-col gap-2">
                <div className="flex flex-wrap gap-4 text-sm text-neutral-600 dark:text-neutral-300">
                    <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-red-500" />
                        <span>Preferred: {portfolioData.personalInfo.preferredLocations.join(", ")}</span>
                    </div>
                </div>
                <div className="flex gap-2">
                    {portfolioData.personalInfo.keywords.slice(0, 3).map((keyword, i) => (
                        <span key={i} className="px-2 py-1 text-xs bg-neutral-100 dark:bg-slate-700 rounded-md">
                            {keyword}
                        </span>
                    ))}
                </div>
            </div>
        </m.div>
    );
}

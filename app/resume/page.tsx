"use client";

import { m } from "framer-motion";
import { ArrowLeft, FileText, Download } from "lucide-react";
import Link from "next/link";
import ResumeGenerator from "@/components/ResumeGenerator";
import { portfolioData } from "@/app/data/portfolio";

export default function ResumePage() {
    return (
        <main className="min-h-screen bg-neutral-50 dark:bg-slate-900 pt-24 pb-16 px-4 sm:px-6 lg:px-8 flex flex-col items-center">

            {/* Back to Home */}
            <div className="w-full max-w-3xl mb-8">
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-neutral-600 dark:text-neutral-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" /> Back to Portfolio
                </Link>
            </div>

            <m.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-3xl bg-white dark:bg-slate-800 rounded-3xl shadow-xl overflow-hidden border border-neutral-200 dark:border-slate-700 p-8 md:p-12 text-center"
            >
                <div className="flex justify-center mb-6">
                    <div className="p-4 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400">
                        <FileText className="w-12 h-12" />
                    </div>
                </div>

                <h1 className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-white mb-4">
                    Resume / CV
                </h1>

                <p className="text-lg text-neutral-600 dark:text-neutral-300 mb-8 max-w-md mx-auto">
                    Download the resume of <span className="font-semibold text-primary-600 dark:text-primary-400">{portfolioData.personalInfo.name}</span> in your preferred format.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    {/* PDF Generator Button */}
                    <ResumeGenerator />

                    {/* DOCX Download Button - Assuming file exists in public/ */}
                    <a
                        href="/resume.docx"
                        download={`${portfolioData.personalInfo.firstName}_${portfolioData.personalInfo.lastName}_Resume.docx`}
                        className="flex items-center gap-2 px-6 py-3 rounded-full bg-neutral-100 dark:bg-slate-700 text-neutral-900 dark:text-white font-semibold hover:bg-neutral-200 dark:hover:bg-slate-600 transition-colors border border-neutral-200 dark:border-slate-600"
                    >
                        <Download className="w-5 h-5" />
                        Download Word (.docx)
                    </a>
                </div>

                <div className="mt-12 pt-8 border-t border-neutral-100 dark:border-slate-700 text-sm text-neutral-500 dark:text-neutral-400">
                    <p>Looking for specific skills or experience?</p>
                    <p className="mt-2">
                        Keywords: {portfolioData.personalInfo.keywords.slice(0, 5).join(", ")}...
                    </p>
                </div>
            </m.div>
        </main>
    );
}

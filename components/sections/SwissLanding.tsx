"use client";

import { m, Variants, useReducedMotion } from "framer-motion";
import {
    ArrowRight,
    Terminal,
    Globe,
} from "lucide-react";
import dynamic from "next/dynamic";
import { portfolioData } from "@/app/data/portfolio";

const ResumeGenerator = dynamic(() => import("@/components/ResumeGenerator"), {
    loading: () => <button className="px-6 py-3 rounded-full bg-neutral-200 dark:bg-neutral-800 animate-pulse">Loading...</button>,
    ssr: false
});

export default function SwissLanding() {
    // Calculate total experience based on company durations
    const totalMonths = portfolioData.experience.reduce((acc, exp) => {
        const parseDate = (d: string) => {
            if (d.toLowerCase() === "present") return new Date();
            const parts = d.split("-");
            if (parts.length < 2) return new Date();
            const [year, monthAbbr] = parts;
            const monthMap: { [key: string]: number } = {
                jan: 0, feb: 1, mar: 2, apr: 3, may: 4, jun: 5,
                jul: 6, aug: 7, sep: 8, oct: 9, nov: 10, dec: 11
            };
            return new Date(parseInt(year), monthMap[monthAbbr.toLowerCase()] || 0);
        };

        const startDate = parseDate(exp.startDate);
        const endDate = parseDate(exp.endDate || "Present");

        // Calculate difference in months
        const months = (endDate.getFullYear() - startDate.getFullYear()) * 12 + (endDate.getMonth() - startDate.getMonth());
        return acc + months;
    }, 0);

    const expYears = Math.floor(totalMonths / 12);
    // Get the very first start year/month for "Since Month Year" display
    const firstJobDate = portfolioData.experience[portfolioData.experience.length - 1].startDate;
    const [startYear, startMonthRaw] = firstJobDate.split("-");
    const startMonth = startMonthRaw ? startMonthRaw.charAt(0).toUpperCase() + startMonthRaw.slice(1) : "";

    const shouldReduceMotion = useReducedMotion();

    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: shouldReduceMotion ? 0 : 0.1,
                delayChildren: shouldReduceMotion ? 0 : 0.3,
            },
        },
    };

    const itemVariants: Variants = {
        hidden: { y: shouldReduceMotion ? 0 : 20, opacity: 0 },
        show: { y: 0, opacity: 1, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
    };


    return (
        <section id="landing" className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8 bg-neutral-50 dark:bg-slate-900 overflow-hidden relative">

            {/* Background typographic definition */}
            <div className="absolute top-1/2 -translate-y-1/2 right-10 opacity-[0.09] pointer-events-none select-none hidden lg:block">
                <h1 className="text-[10rem] xl:text-[14rem] font-bold rotate-90 leading-none tracking-widest text-neutral-900 dark:text-white">
                    ENGINEER
                </h1>
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                <m.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="show"
                    className="flex flex-col gap-12"
                >
                    {/* Top Section: Intro + Experience Card */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                        {/* Main Introduction Column */}
                        <div className="lg:col-span-7 flex flex-col justify-center">
                            <m.div variants={itemVariants} className="mb-4">
                                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-neutral-900 dark:text-white leading-tight">
                                    {portfolioData.personalInfo.firstName} <br />
                                    <span className="text-primary-600 dark:text-primary-400">{portfolioData.personalInfo.middleName} {portfolioData.personalInfo.lastName}</span>
                                </h1>
                            </m.div>

                            <m.p variants={itemVariants} className="text-xl md:text-2xl text-neutral-600 dark:text-neutral-300 font-medium mb-8 max-w-2xl leading-relaxed">
                                {portfolioData.personalInfo.title}. <br />
                                {portfolioData.personalInfo.tagline}
                            </m.p>

                            <m.div variants={itemVariants} className="flex flex-wrap gap-4">
                                <a
                                    href="#contact"
                                    className="group flex items-center gap-2 px-8 py-4 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 rounded-full font-semibold text-lg transition-all hover:scale-105"
                                >
                                    Contact Me <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </a>
                                <ResumeGenerator />
                            </m.div>
                        </div>

                        {/* Right Column - Experience Card (Moved here for alignment) */}
                        <div className="lg:col-span-5">
                            <m.div
                                variants={itemVariants}
                                className="rounded-3xl p-8 bg-gradient-to-br from-primary-600 to-primary-800 text-white relative overflow-hidden group shadow-xl border border-white/20 backdrop-blur-md h-full min-h-[300px] flex flex-col justify-center"
                            >
                                <div className="relative z-10">
                                    <div className="text-7xl font-bold mb-2 tracking-tighter">{expYears}+</div>
                                    <div className="text-xl font-medium opacity-90">Years Experience</div>
                                    <div className="mt-6 flex items-center gap-2 text-primary-100 text-sm">
                                        <Globe className="w-4 h-4" /> Since {startMonth} {startYear}
                                    </div>
                                </div>
                                {/* Decorative background elements */}
                                <div className="absolute top-1/2 -right-10 w-40 h-40 bg-white/20 rounded-full blur-3xl" />
                                <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-primary-900/40 rounded-full blur-3xl" />
                            </m.div>
                        </div>
                    </div>

                    {/* Bottom Section: About + Recruiter Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                        {/* About Section */}
                        <div className="lg:col-span-7">
                            <m.div variants={itemVariants} className="h-full">
                                <div className="flex items-center gap-2 mb-6">
                                    <Terminal className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                                    <h2 className="text-2xl font-bold text-neutral-800 dark:text-neutral-100">About</h2>
                                </div>

                                <div className="p-6 rounded-2xl bg-white dark:bg-slate-800/50 border border-neutral-200 dark:border-slate-700 shadow-sm leading-relaxed text-lg text-neutral-700 dark:text-neutral-300 space-y-4">
                                    {portfolioData.profileDescription.map((paragraph, index) => (
                                        <p key={index}>
                                            {paragraph}
                                        </p>
                                    ))}
                                </div>
                            </m.div>
                        </div>

                        {/* Right Column - Bento Grid Visuals */}
                        <div className="lg:col-span-5 flex flex-col gap-4">
                            {/* Award / Highlight Strip */}
                            <m.div variants={itemVariants} className="glass-card rounded-full py-3 px-5 flex items-center justify-between mb-2">
                                <span className="text-xs font-semibold text-neutral-600 dark:text-neutral-300">Award Winner</span>
                                <span className="h-1.5 w-1.5 rounded-full bg-accent-500"></span>
                                <span className="text-xs font-semibold text-neutral-600 dark:text-neutral-300">TMD Lead</span>
                                <span className="h-1.5 w-1.5 rounded-full bg-primary-500"></span>
                                <span className="text-xs font-semibold text-neutral-600 dark:text-neutral-300">Mentor</span>
                            </m.div>

                            {/* Unified Highlights Grid */}
                            <m.div
                                variants={containerVariants}
                                className="grid grid-cols-2 gap-3"
                            >
                                {/* Availability */}
                                <m.div variants={itemVariants} className="p-3 rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-100 dark:border-green-900/30 flex flex-col justify-center">
                                    <div className="text-lg font-bold text-green-600 dark:text-green-400 flex items-center gap-2">
                                        <span className="relative flex h-3 w-3">
                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                                        </span>
                                        Status
                                    </div>
                                    <div className="text-xs text-neutral-600 dark:text-neutral-400 font-medium mt-1">{portfolioData.personalInfo.availability}</div>
                                </m.div>

                                {/* Locations - Spanning 2 cols on mobile if needed, but here taking 1 slot */}
                                <m.div variants={itemVariants} className="p-3 rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/30 flex flex-col justify-center">
                                    <div className="text-lg font-bold text-blue-600 dark:text-blue-400">Relocation</div>
                                    <div className="text-xs text-neutral-600 dark:text-neutral-400 font-medium mt-1">Open to Relocate</div>
                                </m.div>

                                {/* Preferred Locations - Spanning 2 cols */}
                                <m.div variants={itemVariants} className="col-span-2 p-3 rounded-lg bg-neutral-50 dark:bg-slate-800 border border-neutral-200 dark:border-slate-700">
                                    <div className="text-sm font-bold text-neutral-700 dark:text-neutral-300 mb-2">Preferred Locations</div>
                                    <div className="flex flex-wrap gap-2">
                                        {portfolioData.personalInfo.preferredLocations.map(loc => (
                                            <span key={loc} className="px-2 py-1 text-[10px] uppercase tracking-wider font-semibold bg-white dark:bg-slate-900 border border-neutral-200 dark:border-slate-600 rounded-md text-neutral-600 dark:text-neutral-400">
                                                {loc}
                                            </span>
                                        ))}
                                    </div>
                                </m.div>

                                {/* Stack Overflow */}
                                <m.a
                                    href="https://stackoverflow.com/users/9638885/shibin-mariyan"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    variants={itemVariants}
                                    className="block h-full"
                                >
                                    <div className="p-3 rounded-lg bg-orange-50 dark:bg-orange-950/20 border border-orange-100 dark:border-orange-900/30 hover:bg-orange-100 dark:hover:bg-orange-900/30 transition-colors cursor-pointer h-full">
                                        <div className="text-2xl font-bold text-orange-800 dark:text-[#F48024]">
                                            {portfolioData.personalInfo.socialStats?.stackoverflow.reputation || "3.2k+"}
                                        </div>
                                        <div className="text-xs text-orange-900/70 dark:text-neutral-400 flex items-center gap-1 font-medium">
                                            Stack Overflow
                                        </div>
                                    </div>
                                </m.a>

                                {/* GitLab */}
                                <m.a
                                    href="#"
                                    target="_blank"
                                    rel="noopener noreferrer" // Update with actual GitLab link if available
                                    variants={itemVariants}
                                    className="block h-full"
                                >
                                    <div className="p-3 rounded-lg bg-orange-50 dark:bg-orange-950/20 border border-orange-100 dark:border-orange-900/30 hover:bg-orange-100 dark:hover:bg-orange-900/30 transition-colors cursor-pointer h-full">
                                        <div className="text-2xl font-bold text-orange-900 dark:text-[#FC6D26]">
                                            {portfolioData.personalInfo.socialStats?.gitlab?.activeRepos || "82"}
                                        </div>
                                        <div className="text-xs text-orange-900/70 dark:text-neutral-400 font-medium">
                                            Contributions
                                        </div>
                                    </div>
                                </m.a>

                                <m.div variants={itemVariants} className="p-3 rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-100 dark:border-green-900/30">
                                    <div className="text-xl font-bold text-green-600 dark:text-green-400">Multi-Cloud</div>
                                    <div className="text-xs text-neutral-600 dark:text-neutral-400">AWS + Azure</div>
                                </m.div>

                                {/* Projects Delivered */}
                                <m.div variants={itemVariants} className="p-3 rounded-lg bg-secondary-50 dark:bg-secondary-950/20 border border-secondary-100 dark:border-secondary-900/30">
                                    <div className="text-2xl font-bold text-secondary-600 dark:text-secondary-400">50+</div>
                                    <div className="text-xs text-neutral-600 dark:text-neutral-400">Projects Delivered</div>
                                </m.div>
                            </m.div>

                        </div>
                    </div>
                </m.div>
            </div>

        </section>
    );
}

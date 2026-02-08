"use client";

import { motion, Variants } from "framer-motion";
import {
    ArrowRight,
    Terminal,
    Layers,
    Cpu,
    Globe,
    Layout,
    Github
} from "lucide-react";
import Icon3D from "@/components/Icon3D";
import ResumeGenerator from "@/components/ResumeGenerator";
import { portfolioData } from "@/app/data/portfolio";

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
    // Get the very first start year for "Since XXXX" display
    const firstJobDate = portfolioData.experience[portfolioData.experience.length - 1].startDate;
    const startYear = firstJobDate.split("-")[0];

    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.3,
            },
        },
    };

    const itemVariants: Variants = {
        hidden: { y: 20, opacity: 0 },
        show: { y: 0, opacity: 1, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
    };


    return (
        <section id="landing" className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8 bg-neutral-50 dark:bg-slate-900 overflow-hidden relative">
            {/* Background typographic definition */}
            <div className="absolute top-60 right-0 -mr-20 opacity-[0.03] pointer-events-none select-none">
                <h1 className="text-[12rem] md:text-[20rem] font-bold rotate-90 leading-none">
                    ENGINEER
                </h1>
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="show"
                    className="grid grid-cols-1 lg:grid-cols-12 gap-8"
                >
                    {/* Main Introduction Column */}
                    <div className="lg:col-span-7 flex flex-col justify-center">
                        <motion.div variants={itemVariants} className="mb-4">

                            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-neutral-900 dark:text-white leading-tight">
                                Shibin <br />
                                <span className="text-primary-600 dark:text-primary-400">Mariyan</span>
                            </h1>
                        </motion.div>

                        <motion.p variants={itemVariants} className="text-xl md:text-2xl text-neutral-600 dark:text-neutral-300 font-medium mb-8 max-w-2xl leading-relaxed">
                            {portfolioData.personalInfo.title}. <br />
                            Building AI-powered healthcare platforms, interactive EdTech solutions, and precision CAD engines that transform industries.
                        </motion.p>

                        <motion.div variants={itemVariants} className="flex flex-wrap gap-4 mb-10">
                            <a
                                href="#contact"
                                className="group flex items-center gap-2 px-8 py-4 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 rounded-full font-semibold text-lg transition-all hover:scale-105"
                            >
                                Contact Me <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </a>
                            <ResumeGenerator />
                        </motion.div>

                        {/* About Section */}
                        <motion.div variants={itemVariants}>
                            <h3 className="text-xl font-bold text-neutral-800 dark:text-neutral-100 mb-4 flex items-center gap-2">
                                <Terminal className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                                About
                            </h3>

                            {/* Main About */}
                            <div className="p-5 rounded-xl bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-slate-900/50 dark:to-slate-800/50 border border-neutral-200 dark:border-slate-700 space-y-3">
                                <p className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
                                    A <strong className="text-neutral-900 dark:text-white">Systems Analyst & Senior Full Stack Developer</strong> with 7+ years architecting enterprise solutions across healthcare, education, and geospatial domains. Specialized in <strong className="text-neutral-900 dark:text-white">AI platforms</strong>, <strong className="text-neutral-900 dark:text-white">CAD engines</strong>, and <strong className="text-neutral-900 dark:text-white">microservices</strong> serving 100K+ users.
                                </p>
                                <p className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
                                    Proven track record: <strong className="text-neutral-900 dark:text-white">PIPEDA-compliant healthcare systems</strong>, <strong className="text-neutral-900 dark:text-white">DPR rendering algorithms</strong>, and <strong className="text-neutral-900 dark:text-white">cloud migrations</strong> for legacy systems.
                                </p>
                                <p className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
                                    Expert in building <strong className="text-neutral-900 dark:text-white">real-time collaborative systems</strong>, implementing <strong className="text-neutral-900 dark:text-white">LLM-powered automation</strong>, and designing <strong className="text-neutral-900 dark:text-white">scalable cloud architectures</strong> on AWS and Azure. Passionate about creating intuitive user experiences backed by robust engineering.
                                </p>
                                <p className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
                                    As a <strong className="text-neutral-900 dark:text-white">Technical Lead</strong>, I set high engineering standards, architect complex systems, and mentor developers to build robust, scalable solutions. I focus on <strong className="text-neutral-900 dark:text-white">clean code architecture</strong>, performance optimization, and driving technical excellence across the stack.
                                </p>
                            </div>
                        </motion.div>
                    </div>

                    {/* Right Column - Bento Grid Visuals */}
                    <div className="lg:col-span-5 flex flex-col gap-4">

                        {/* Experience Highlight Card */}
                        <motion.div
                            variants={itemVariants}
                            className="rounded-3xl p-8 bg-gradient-to-br from-primary-600 to-primary-800 text-white relative overflow-hidden group shadow-xl border border-white/20 backdrop-blur-md"
                        >
                            <div className="relative z-10">
                                <div className="text-7xl font-bold mb-2 tracking-tighter">{expYears}+</div>
                                <div className="text-xl font-medium opacity-90">Years Experience</div>
                                <div className="mt-6 flex items-center gap-2 text-primary-100 text-sm">
                                    <Globe className="w-4 h-4" /> Since May {startYear}
                                </div>
                            </div>
                            {/* Abstract decorative circles */}
                            <div className="absolute -bottom-10 -right-10 w-40 h-40 rounded-full bg-white/10 blur-2xl group-hover:scale-150 transition-transform duration-700" />
                        </motion.div>

                        {/* Tech Stack Grid */}
                        <div className="grid grid-cols-2 gap-6">
                            <motion.div variants={itemVariants} className="glass-card rounded-3xl p-6 hover:bg-neutral-50 dark:hover:bg-slate-800 transition-colors">
                                <Icon3D delay={0.1}>
                                    <Layout className="w-8 h-8 text-secondary-600 mb-3" />
                                </Icon3D>
                                <h4 className="font-bold text-neutral-900 dark:text-neutral-100 mb-1">Frontend</h4>
                                <p className="text-xs text-neutral-500 dark:text-neutral-400">React, Next.js, Angular, Canvas</p>
                            </motion.div>

                            <motion.div variants={itemVariants} className="glass-card rounded-3xl p-6 hover:bg-neutral-50 dark:hover:bg-slate-800 transition-colors">
                                <Icon3D delay={0.2}>
                                    <Cpu className="w-8 h-8 text-accent-600 mb-3" />
                                </Icon3D>
                                <h4 className="font-bold text-neutral-900 dark:text-neutral-100 mb-1">Backend</h4>
                                <p className="text-xs text-neutral-500 dark:text-neutral-400">Node, NestJS, Microservices</p>
                            </motion.div>

                            <motion.div variants={itemVariants} className="glass-card rounded-3xl p-6 hover:bg-neutral-50 dark:hover:bg-slate-800 transition-colors">
                                <Icon3D delay={0.3}>
                                    <Layers className="w-8 h-8 text-primary-600 mb-3" />
                                </Icon3D>
                                <h4 className="font-bold text-neutral-900 dark:text-neutral-100 mb-1">DevOps</h4>
                                <p className="text-xs text-neutral-500 dark:text-neutral-400">AWS, Azure, Docker, CI/CD</p>
                            </motion.div>

                            <motion.div variants={itemVariants} className="glass-card rounded-3xl p-6 hover:bg-neutral-50 dark:hover:bg-slate-800 transition-colors">
                                <a href="https://github.com/shibinmariyan" target="_blank" className="flex flex-col items-center justify-center gap-2">
                                    <Github className="w-8 h-8 text-neutral-900 dark:text-neutral-100 hover:scale-110 transition-transform" />
                                    <span className="text-xs font-bold text-neutral-900 dark:text-neutral-100">GitHub</span>
                                </a>
                            </motion.div>
                        </div>

                        {/* Award / Highlight Strip */}
                        <motion.div variants={itemVariants} className="glass-card rounded-full py-3 px-5 flex items-center justify-between">
                            <span className="text-xs font-semibold text-neutral-600 dark:text-neutral-300">Award Winner</span>
                            <span className="h-1.5 w-1.5 rounded-full bg-accent-500"></span>
                            <span className="text-xs font-semibold text-neutral-600 dark:text-neutral-300">TMD Lead</span>
                            <span className="h-1.5 w-1.5 rounded-full bg-primary-500"></span>
                            <span className="text-xs font-semibold text-neutral-600 dark:text-neutral-300">Mentor</span>
                        </motion.div>

                        {/* Highlights Grid */}
                        <div className="grid grid-cols-2 gap-3">
                            <motion.div variants={itemVariants} className="p-3 rounded-lg bg-primary-50 dark:bg-primary-950/20 border border-primary-100 dark:border-primary-900/30">
                                <div className="text-xl font-bold text-primary-600 dark:text-primary-400">Architecture</div>
                                <div className="text-xs text-neutral-600 dark:text-neutral-400">Mono & Micro</div>
                            </motion.div>
                            <motion.div variants={itemVariants} className="p-3 rounded-lg bg-secondary-50 dark:bg-secondary-950/20 border border-secondary-100 dark:border-secondary-900/30">
                                <div className="text-2xl font-bold text-secondary-600 dark:text-secondary-400">15+</div>
                                <div className="text-xs text-neutral-600 dark:text-neutral-400">Apps</div>
                            </motion.div>
                            <motion.div variants={itemVariants} className="p-3 rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-100 dark:border-green-900/30">
                                <div className="text-2xl font-bold text-green-600 dark:text-green-400">Multi-Cloud</div>
                                <div className="text-xs text-neutral-600 dark:text-neutral-400">AWS + Azure</div>
                            </motion.div>
                            <motion.div variants={itemVariants} className="p-3 rounded-lg bg-purple-50 dark:bg-purple-950/20 border border-purple-100 dark:border-purple-900/30">
                                <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">AI/LLM</div>
                                <div className="text-xs text-neutral-600 dark:text-neutral-400">Reports</div>
                            </motion.div>
                        </div>

                        {/* Tech Stack Summary */}
                        <motion.div variants={itemVariants} className="p-3 rounded-lg bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-950/20 dark:to-amber-950/20 border border-orange-100 dark:border-orange-900/30">
                            <p className="text-xs text-neutral-700 dark:text-neutral-300 leading-relaxed">
                                <strong className="text-neutral-900 dark:text-white">Stack:</strong> React • Next.js • Angular • Node.js • NestJS • PostgreSQL • MongoDB • Google Maps • Canvas • AWS • Azure • Docker • Nx • LLM
                            </p>
                        </motion.div>

                    </div>
                </motion.div>
            </div>
        </section>
    );
}

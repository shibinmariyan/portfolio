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
        <section id="landing" className="min-h-screen pt-28 pb-20 px-4 sm:px-6 lg:px-8 bg-neutral-50 overflow-hidden relative">
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
                    className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12"
                >
                    {/* Main Introduction Column */}
                    <div className="lg:col-span-7 flex flex-col justify-center">
                        <motion.div variants={itemVariants} className="mb-6">

                            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-neutral-900 leading-tight">
                                Shibin <br />
                                <span className="text-primary-600">Mariyan</span>
                            </h1>
                        </motion.div>

                        <motion.p variants={itemVariants} className="text-xl md:text-2xl text-neutral-600 font-medium mb-10 max-w-2xl leading-relaxed">
                            {portfolioData.personalInfo.title}. <br />
                            Architecting scalable microservices, creating precision CAD tools, and leading engineering teams.
                        </motion.p>

                        <motion.div variants={itemVariants} className="flex flex-wrap gap-4 mb-16">
                            <a
                                href="#contact"
                                className="group flex items-center gap-2 px-8 py-4 bg-neutral-900 text-white rounded-full font-semibold text-lg transition-all hover:scale-105"
                            >
                                Contact Me <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </a>
                            <ResumeGenerator />
                        </motion.div>

                        {/* Detailed Narrative Section */}
                        <motion.div variants={itemVariants} className="prose max-w-none">
                            <h3 className="text-2xl font-bold text-neutral-800 mb-4 flex items-center gap-2">
                                <Terminal className="w-6 h-6 text-primary-600" />
                                The Narrative
                            </h3>
                            <div className="grid md:grid-cols-2 gap-8 text-neutral-600 leading-relaxed border-l-4 border-primary-200 pl-6">
                                <p>
                                    With <strong className="text-neutral-900">{expYears}+ years</strong> of experience, I excel at translating complex business requirements into robust technical architectures. My work spans healthcare, fintech, and AI services using the <strong>MEAN/MERN stack</strong> and cloud platforms like <strong>AWS & Azure</strong>.
                                </p>
                                <p>
                                    A defining moment in my career was architecting a <strong>professional 2D CAD-like web tool</strong>, demonstrating deep expertise in complex algorithms and performance optimization. Currently, I drive engineering excellence within the <strong>Technical Management Office (TMO)</strong>.
                                </p>
                            </div>
                        </motion.div>
                    </div>

                    {/* Right Column - Bento Grid Visuals */}
                    <div className="lg:col-span-5 flex flex-col gap-6">

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
                            <motion.div variants={itemVariants} className="glass-card rounded-3xl p-6 hover:bg-neutral-50 transition-colors">
                                <Icon3D delay={0.1}>
                                    <Layout className="w-8 h-8 text-secondary-600 mb-3" />
                                </Icon3D>
                                <h4 className="font-bold text-neutral-900 mb-1">Frontend</h4>
                                <p className="text-xs text-neutral-500">React, Next.js, Angular, Canvas</p>
                            </motion.div>

                            <motion.div variants={itemVariants} className="glass-card rounded-3xl p-6 hover:bg-neutral-50 transition-colors">
                                <Icon3D delay={0.2}>
                                    <Cpu className="w-8 h-8 text-accent-600 mb-3" />
                                </Icon3D>
                                <h4 className="font-bold text-neutral-900 mb-1">Backend</h4>
                                <p className="text-xs text-neutral-500">Node, NestJS, Microservices</p>
                            </motion.div>

                            <motion.div variants={itemVariants} className="glass-card rounded-3xl p-6 hover:bg-neutral-50 transition-colors">
                                <Icon3D delay={0.3}>
                                    <Layers className="w-8 h-8 text-primary-600 mb-3" />
                                </Icon3D>
                                <h4 className="font-bold text-neutral-900 mb-1">DevOps</h4>
                                <p className="text-xs text-neutral-500">AWS, Azure, Docker, CI/CD</p>
                            </motion.div>

                            <motion.div variants={itemVariants} className="rounded-3xl p-6 flex items-center justify-center bg-neutral-900 text-white overflow-hidden relative group shadow-lg hover:shadow-xl transition-shadow">
                                <a href="https://github.com/shibinmariyan" target="_blank" className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                                    <Github className="w-8 h-8 group-hover:scale-110 transition-transform" />
                                    <span className="text-xs font-bold">GitHub</span>
                                </a>
                            </motion.div>
                        </div>

                        {/* Award / Highlight Strip */}
                        <motion.div variants={itemVariants} className="glass-card rounded-full py-4 px-6 flex items-center justify-between">
                            <span className="text-sm font-semibold text-neutral-600">Award Winner</span>
                            <span className="h-1.5 w-1.5 rounded-full bg-accent-500"></span>
                            <span className="text-sm font-semibold text-neutral-600">TMO Lead</span>
                            <span className="h-1.5 w-1.5 rounded-full bg-accent-500"></span>
                            <span className="text-sm font-semibold text-neutral-600">Mentor</span>
                        </motion.div>

                    </div>
                </motion.div>
            </div>
        </section>
    );
}

"use client";

import { m, Variants } from "framer-motion";
import { ArrowRight, Copy, Check } from "lucide-react";
import { portfolioData } from "@/app/data/portfolio";
import { useState } from "react";

export default function Contact() {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 },
  };

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  // Brand-specific colors and styling
  const brandStyles: Record<string, { bg: string; iconBg: string; hoverBg: string; copyBg: string }> = {
    Email: {
      bg: "from-red-50 to-pink-50 dark:from-red-950/20 dark:to-pink-950/20",
      iconBg: "bg-[#EA4335]", // Gmail red
      hoverBg: "group-hover:from-red-100 group-hover:to-pink-100 dark:group-hover:from-red-900/30 dark:group-hover:to-pink-900/30",
      copyBg: "bg-red-500 hover:bg-red-600",
    },
    WhatsApp: {
      bg: "from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20",
      iconBg: "bg-[#25D366]", // WhatsApp green
      hoverBg: "group-hover:from-green-100 group-hover:to-emerald-100 dark:group-hover:from-green-900/30 dark:group-hover:to-emerald-900/30",
      copyBg: "bg-green-500 hover:bg-green-600",
    },
    Phone: {
      bg: "from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20",
      iconBg: "bg-gradient-to-br from-blue-500 to-cyan-500",
      hoverBg: "group-hover:from-blue-100 group-hover:to-cyan-100 dark:group-hover:from-blue-900/30 dark:group-hover:to-cyan-900/30",
      copyBg: "bg-blue-500 hover:bg-blue-600",
    },
    LinkedIn: {
      bg: "from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20",
      iconBg: "bg-[#0A66C2]", // LinkedIn blue
      hoverBg: "group-hover:from-blue-100 group-hover:to-indigo-100 dark:group-hover:from-blue-900/30 dark:group-hover:to-indigo-900/30",
      copyBg: "bg-[#0A66C2] hover:bg-[#004182]",
    },
  };

  return (
    <section id="contact" className="py-24 px-4 sm:px-6 lg:px-8 bg-neutral-50 dark:bg-slate-900 border-t border-neutral-200 dark:border-slate-700">
      <div className="max-w-7xl mx-auto">
        <m.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid lg:grid-cols-2 gap-12 items-start"
        >
          {/* Left: Heading */}
          <div>
            <m.h2 variants={itemVariants} className="text-4xl md:text-5xl font-bold text-neutral-900 dark:text-neutral-100 mb-6">
              Let's Connect
            </m.h2>
            <m.p variants={itemVariants} className="text-xl text-neutral-600 dark:text-neutral-400 mb-8 leading-relaxed">
              Have a project in mind or want to discuss opportunities? I'd love to hear from you.
            </m.p>
            <m.a
              variants={itemVariants}
              href="https://www.linkedin.com/in/shibinmariyanstanly/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 font-semibold text-lg hover:scale-105 transition-transform"
            >
              Say Hello <ArrowRight className="w-5 h-5" />
            </m.a>
          </div>

          {/* Right: Contact Cards Grid */}
          <div className="grid sm:grid-cols-2 gap-4">
            {portfolioData.personalInfo.socials
              .filter((link) => link.name !== "Portfolio")
              .map((link, index) => {
                const Icon = link.icon;
                const style = brandStyles[link.name] || brandStyles.Phone;
                const isCopied = copiedIndex === index;

                return (
                  <m.div
                    key={index}
                    variants={itemVariants}
                    className={`group relative p-6 rounded-2xl bg-gradient-to-br ${style.bg} ${style.hoverBg} border border-neutral-200 dark:border-neutral-700 hover:shadow-xl transition-all duration-300`}
                  >
                    {/* Icon with Floating Animation */}
                    <m.div
                      className={`${style.iconBg} p-3 mx-auto rounded-xl w-fit mb-4 shadow-lg`}
                      initial={{ y: 0, scale: 1, rotate: 0 }}
                      whileInView={{
                        y: [0, -10, 0],
                        scale: [1, 1.08, 1],
                      }}
                      viewport={{ once: false, margin: "-50px" }}
                      transition={{
                        duration: 3.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: index * 0.25,
                      }}
                      whileHover={{
                        scale: 1.15,
                        transition: { duration: 0.2 }
                      }}
                    >
                      <Icon className="w-6 h-6 text-white" />
                    </m.div>

                    {/* Content */}
                    <div className="mb-4">
                      <h3 className="text-lg font-bold text-neutral-900 dark:text-neutral-100 mb-1">
                        {link.name}
                      </h3>
                      <p className="text-sm text-neutral-600 dark:text-neutral-400 break-all">
                        {link.value}
                      </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      {/* Copy Button */}
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          handleCopy(link.value, index);
                        }}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-neutral-200 dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100 text-sm font-medium hover:bg-neutral-300 dark:hover:bg-neutral-600 transition-all duration-200"
                      >
                        {isCopied ? (
                          <>
                            <Check className="w-4 h-4" />
                            Copied!
                          </>
                        ) : (
                          <>
                            <Copy className="w-4 h-4" />
                            Copy
                          </>
                        )}
                      </button>

                      {/* Contact Button */}
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-neutral-800 dark:bg-neutral-600 text-white dark:text-neutral-100 text-sm font-medium hover:bg-neutral-900 dark:hover:bg-neutral-500 transition-all duration-200"
                      >
                        <ArrowRight className="w-4 h-4" />
                        {link.name === "Email" ? "Email" : "Open"}
                      </a>
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

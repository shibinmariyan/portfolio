"use client";

import { motion, Variants } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { portfolioData } from "@/app/data/portfolio";

export default function Contact() {
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
    <section id="contact" className="py-24 px-4 sm:px-6 lg:px-8 bg-neutral-50 border-t border-neutral-200">
      <div className="max-w-7xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Left: Heading */}
            <div>
              <motion.h2 variants={itemVariants} className="text-5xl md:text-7xl font-bold tracking-tight text-neutral-900 mb-8">
                Let's work <br /> <span className="text-neutral-400">together.</span>
              </motion.h2>
              <motion.p variants={itemVariants} className="text-xl text-neutral-500 max-w-lg mb-12">
                Currently available for freelance projects and open to full-time opportunities.
              </motion.p>

              <motion.a
                variants={itemVariants}
                href={`mailto:${portfolioData.personalInfo.email}`}
                className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-neutral-900 text-white font-semibold text-lg hover:scale-105 transition-transform"
              >
                Say Hello <ArrowRight className="w-5 h-5" />
              </motion.a>
            </div>

            {/* Right: Grid */}
            <div className="grid sm:grid-cols-2 gap-6">
              {portfolioData.personalInfo.socials.filter(link => link.name !== "Portfolio").map((link, index) => {
                const Icon = link.icon;
                return (
                  <motion.a
                    key={index}
                    variants={itemVariants}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group p-8 rounded-3xl bg-white border border-neutral-200 hover:border-neutral-300 hover:shadow-xl transition-all flex flex-col justify-between aspect-square"
                  >
                    <div className="p-4 rounded-2xl bg-neutral-50 w-fit group-hover:scale-110 transition-transform">
                      <Icon className={`w-8 h-8 ${link.color}`} />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-neutral-900 mb-1">
                        {link.name}
                      </h3>
                      <p className="text-sm text-neutral-500 font-mono truncate">
                        {link.value}
                      </p>
                    </div>
                  </motion.a>
                );
              })}
            </div>
          </div>

          <motion.div variants={itemVariants} className="mt-24 pt-8 border-t border-neutral-200 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-neutral-500">
            <p>© {new Date().getFullYear()} {portfolioData.personalInfo.name}. All rights reserved.</p>
            <p>Designed with Swiss International Style.</p>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}

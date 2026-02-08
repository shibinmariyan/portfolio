"use client";

import { useState } from "react";
import jsPDF from "jspdf";
import { Download } from "lucide-react";
import { portfolioData } from "@/app/data/portfolio";
import { motion } from "framer-motion";

type PageSize = "a4" | "letter" | "legal";

export default function ResumeGenerator() {
  const [pageSize, setPageSize] = useState<PageSize>("a4");

  const generateResume = () => {
    // Configure page size
    const pageFormats: Record<PageSize, [number, number]> = {
      a4: [210, 297],      // A4: 210mm × 297mm
      letter: [215.9, 279.4], // Letter: 8.5" × 11"
      legal: [215.9, 355.6],  // Legal: 8.5" × 14"
    };

    const doc = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: pageFormats[pageSize],
    });

    let yPos = 20;
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 20;
    const contentWidth = pageWidth - 2 * margin;
    const lineHeight = 7;
    const sectionSpacing = 6; // Reduced from 10 for more compact spacing

    // Helper: Add text with word wrap
    const addText = (text: string, fontSize: number, isBold: boolean = false, color: [number, number, number] = [0, 0, 0]) => {
      doc.setFontSize(fontSize);
      doc.setTextColor(color[0], color[1], color[2]);
      if (isBold) {
        doc.setFont("helvetica", "bold");
      } else {
        doc.setFont("helvetica", "normal");
      }

      const lines = doc.splitTextToSize(text, contentWidth);
      if (yPos + lines.length * lineHeight > doc.internal.pageSize.getHeight() - 20) {
        doc.addPage();
        yPos = 20;
      }
      doc.text(lines, margin, yPos);
      yPos += lines.length * lineHeight;
    };

    // Helper: Format Dates (e.g., "2021-jul" -> "July 2021")
    const formatResumeDate = (dateStr: string) => {
      if (dateStr.toLowerCase() === "present") return "Present";
      const parts = dateStr.toLowerCase().split("-");
      if (parts.length === 2) {
        const [year, monthAbbr] = parts;
        const monthMap: { [key: string]: string } = {
          jan: "January", feb: "February", mar: "March", apr: "April", may: "May", jun: "June",
          jul: "July", aug: "August", sep: "September", oct: "October", nov: "November", dec: "December"
        };
        return `${monthMap[monthAbbr] || monthAbbr} ${year}`;
      }
      return dateStr; // Fallback
    };

    // Header
    addText(portfolioData.personalInfo.name, 20, true, [0, 0, 0]);
    yPos += 3;
    addText(portfolioData.personalInfo.title, 12, false, [50, 50, 50]);
    yPos += 3;
    addText(`${portfolioData.personalInfo.email} | ${portfolioData.personalInfo.phone} | ${portfolioData.personalInfo.location}`, 9, false, [80, 80, 80]);
    addText(`LinkedIn: ${portfolioData.personalInfo.linkedin} | Portfolio: ${portfolioData.personalInfo.portfolio}`, 9, false, [80, 80, 80]);
    yPos += sectionSpacing;

    // Professional Summary
    addText("PROFESSIONAL SUMMARY", 14, true, [0, 0, 0]);
    yPos += 3;
    addText(portfolioData.summary, 10, false, [0, 0, 0]);
    yPos += sectionSpacing;

    // Professional Experience
    addText("PROFESSIONAL EXPERIENCE", 14, true, [0, 0, 0]);
    yPos += 3;

    portfolioData.experience.forEach((exp) => {
      addText(`${exp.position} | ${exp.company}`, 12, true, [0, 0, 0]);
      yPos += 2;
      const dateRange = `${formatResumeDate(exp.startDate)} - ${formatResumeDate(exp.endDate || "Present")}`;
      addText(`${exp.location} | ${dateRange} (${exp.duration})`, 10, false, [80, 80, 80]);
      yPos += 2;
      // Use description as achievements
      exp.description.forEach((achievement) => {
        addText(`• ${achievement}`, 10, false, [0, 0, 0]);
        yPos += 1;
      });
      yPos += sectionSpacing;
    });

    // Technical Skills
    addText("TECHNICAL SKILLS", 14, true, [0, 0, 0]);
    yPos += 3;

    portfolioData.skillCategories.forEach((cat) => {
      addText(`${cat.category}:`, 11, true, [0, 0, 0]);
      yPos += 2;
      addText(cat.skills.join(", "), 10, false, [0, 0, 0]);
      yPos += sectionSpacing - 3;
    });
    // Add extra spacing after loop
    yPos += 5;


    // Key Projects
    addText("KEY PROJECTS", 14, true, [0, 0, 0]);
    yPos += 3;

    portfolioData.projects.forEach((project) => {
      addText(`${project.name} (${project.type}) - ${project.period}`, 11, true, [0, 0, 0]);
      yPos += 2;
      addText(project.description, 10, false, [0, 0, 0]);
      yPos += 2;
      addText(`Technologies: ${project.technologies.join(", ")}`, 9, false, [80, 80, 80]);
      yPos += sectionSpacing;
    });

    // Education
    addText("EDUCATION", 14, true, [0, 0, 0]);
    yPos += 3;
    portfolioData.education.forEach((edu) => {
      addText(`${edu.degree}`, 12, true, [0, 0, 0]);
      yPos += 2;
      addText(`${edu.college}`, 11, false, [50, 50, 50]);
      yPos += 2;
      addText(`${edu.period}`, 10, false, [80, 80, 80]);
      yPos += sectionSpacing;
    });

    // Certifications
    addText("CERTIFICATIONS", 14, true, [0, 0, 0]);
    yPos += 3;
    portfolioData.certifications.forEach((cert) => {
      addText(`• ${cert}`, 10, false, [0, 0, 0]);
      yPos += 2;
    });

    yPos += sectionSpacing;

    // Achievements
    addText("KEY ACHIEVEMENTS", 14, true, [0, 0, 0]);
    yPos += 3;
    portfolioData.achievements.forEach((achievement) => {
      addText(`• ${achievement}`, 10, false, [0, 0, 0]);
      yPos += 2;
    });

    // Save the PDF
    const formattedDate = new Date().toISOString().split('T')[0];
    doc.save(`Shibin_Mariyan_Stanly_Resume_${formattedDate}.pdf`);
  };

  return (
    <motion.button
      onClick={generateResume}
      className="glass-hover px-6 py-3 rounded-full text-secondary-700 dark:text-secondary-300 font-semibold transition-all flex items-center gap-2 group relative overflow-hidden"
      initial={{ y: 0, scale: 1 }}
      whileInView={{
        y: [0, -5, 0],
        scale: [1, 1.02, 1],
      }}
      viewport={{ once: false, margin: "-50px" }}
      transition={{
        duration: 2.5,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      whileHover={{
        scale: 1.08,
        boxShadow: "0 10px 30px rgba(0, 0, 0, 0.15)",
        transition: { duration: 0.2 }
      }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Background Gradient on Hover */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-primary-400/20 to-secondary-400/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
      />

      <motion.div
        whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.2 }}
        transition={{ duration: 0.5 }}
      >
        <Download className="w-5 h-5 relative z-10" />
      </motion.div>
      <span className="relative z-10">Download Resume</span>
    </motion.button>
  );
}

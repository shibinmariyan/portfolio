"use client";

import { useState } from "react";
import jsPDF from "jspdf";
import { Download } from "lucide-react";
import { portfolioData } from "@/app/data/portfolio";
import { m } from "framer-motion";

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

    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 15;
    const contentWidth = pageWidth - 2 * margin;
    const lineHeight = 5;
    const blue: [number, number, number] = [74, 144, 226]; // #4A90E2
    const gray: [number, number, number] = [100, 100, 100];
    const bottomMargin = 20;

    let currentY = margin;

    // Helper: Add text with word wrap and justification
    const addText = (
      text: string,
      x: number,
      y: number,
      maxWidth: number,
      fontSize: number,
      isBold: boolean = false,
      color: [number, number, number] = [0, 0, 0],
      align: "left" | "center" | "right" | "justify" = "justify" // Default to justify
    ): number => {
      doc.setFontSize(fontSize);
      doc.setTextColor(color[0], color[1], color[2]);
      doc.setFont("helvetica", isBold ? "bold" : "normal");

      // Calculate height first to check for page break
      // @ts-ignore
      const textDimensions = doc.getTextDimensions(text, { maxWidth: maxWidth });
      const textHeight = textDimensions.h;

      if (y + textHeight > pageHeight - bottomMargin) {
        doc.addPage();
        y = margin;
      }

      // @ts-ignore
      doc.text(text, x, y, { maxWidth: maxWidth, align: align });

      return y + textHeight + (lineHeight * 0.5); // Add a small buffer
    };

    // Helper: Format date to "Mon YYYY"
    const formatDate = (dateStr: string): string => {
      if (!dateStr || dateStr.toLowerCase() === 'present') return "Present";
      const parts = dateStr.split('-');
      if (parts.length < 2) return dateStr;
      const [year, month] = parts;
      const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      const monthIndex = isNaN(parseInt(month))
        ? monthNames.findIndex(m => m.toLowerCase() === month.toLowerCase().substring(0, 3))
        : parseInt(month) - 1;

      return `${monthNames[monthIndex] || month} ${year}`;
    };

    // Helper: Add section header
    const addSectionHeader = (text: string, y: number): number => {
      if (y + 10 > pageHeight - bottomMargin) {
        doc.addPage();
        y = margin;
      }
      doc.setFontSize(11);
      doc.setTextColor(blue[0], blue[1], blue[2]);
      doc.setFont("helvetica", "bold");
      doc.text(text.toUpperCase(), margin, y);

      doc.setDrawColor(blue[0], blue[1], blue[2]);
      doc.setLineWidth(0.5);
      doc.line(margin, y + 1, margin + contentWidth, y + 1);

      return y + 6;
    };

    // ==================== HEADER SECTION ====================
    doc.setFontSize(22);
    doc.setTextColor(blue[0], blue[1], blue[2]);
    doc.setFont("helvetica", "bold");
    doc.text(portfolioData.personalInfo.name.toUpperCase(), margin, currentY);
    currentY += 7;

    doc.setFontSize(11);
    doc.setTextColor(gray[0], gray[1], gray[2]);
    doc.setFont("helvetica", "bold");
    doc.text(portfolioData.personalInfo.title.toUpperCase(), margin, currentY);
    currentY += 6;

    doc.setFontSize(9);
    doc.setTextColor(0, 0, 0);
    doc.setFont("helvetica", "normal");

    const contactLine1 = `${portfolioData.personalInfo.email}  •  ${portfolioData.personalInfo.phone}  •  ${portfolioData.personalInfo.location}`;
    doc.text(contactLine1, margin, currentY);
    currentY += 4;

    // Dynamic GitHub Link
    const githubLink = portfolioData.personalInfo.socials.find(s => s.name === "Github")?.href.replace("https://", "") || "github.com/shibinmariyan";
    const contactLine2 = `${portfolioData.personalInfo.linkedin}  •  ${githubLink}  •  ${portfolioData.personalInfo.portfolio}`;
    doc.text(contactLine2, margin, currentY);
    currentY += 6;

    // ==================== PROFESSIONAL SUMMARY ====================
    currentY = addSectionHeader("PROFESSIONAL SUMMARY", currentY);
    currentY = addText(portfolioData.summary, margin, currentY, contentWidth, 9, false, [0, 0, 0]);
    currentY += 4;

    // ==================== CORE COMPETENCIES ====================
    currentY = addSectionHeader("CORE COMPETENCIES", currentY);
    const coreSkills = portfolioData.personalInfo.keywords.slice(0, 15).join("  •  ");
    currentY = addText(coreSkills, margin, currentY, contentWidth, 9, false, [0, 0, 0]);
    currentY += 2; // Extra spacing

    // ==================== TECHNICAL SKILLS (Moved up) ====================
    currentY = addSectionHeader("TECHNICAL SKILLS", currentY);
    portfolioData.skillCategories.forEach((cat) => {
      if (currentY + 10 > pageHeight - bottomMargin) {
        doc.addPage();
        currentY = margin;
      }
      // Bold Category: Skills
      doc.setFontSize(9);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(0, 0, 0);
      doc.text(cat.category + ":", margin, currentY);

      const catWidth = doc.getTextWidth(cat.category + ":");
      doc.setFont("helvetica", "normal");

      // Wrap skills text if needed
      const skillsText = " " + cat.skills.join(", ");
      const lines = doc.splitTextToSize(skillsText, contentWidth - catWidth);

      lines.forEach((line: string, index: number) => {
        if (currentY + 5 > pageHeight - bottomMargin) {
          doc.addPage();
          currentY = margin;
        }
        doc.text(line, margin + catWidth + (index === 0 ? 0 : 0), currentY + (index * 4));
      });
      currentY += (lines.length * 4) + 1;
    });
    currentY += 2;


    // ==================== PROFESSIONAL EXPERIENCE ====================
    currentY = addSectionHeader("PROFESSIONAL EXPERIENCE", currentY);

    portfolioData.experience.forEach((exp) => {
      if (currentY + 30 > pageHeight - bottomMargin) {
        doc.addPage();
        currentY = margin;
      }

      // Title (Bold)
      currentY = addText(exp.position.toUpperCase(), margin, currentY, contentWidth, 10, true, [0, 0, 0]);

      // Company | Date | Location
      doc.setFont("helvetica", "bold");
      doc.setFontSize(9);
      doc.setTextColor(0, 0, 0);
      doc.text(exp.company, margin, currentY);

      const dateStr = `${formatDate(exp.startDate)} - ${formatDate(exp.endDate || "Present")}`;
      const widthCompany = doc.getTextWidth(exp.company);

      doc.setFont("helvetica", "italic");
      doc.setTextColor(gray[0], gray[1], gray[2]);
      doc.text(`  |  ${dateStr}  |  ${exp.location}`, margin + widthCompany, currentY);
      currentY += 4;

      // Tech Stack
      if (exp.techStack && exp.techStack.length > 0) {
        if (currentY + 5 > pageHeight - bottomMargin) { doc.addPage(); currentY = margin; }
        doc.setFont("helvetica", "bold");
        doc.setFontSize(8);
        doc.setTextColor(blue[0], blue[1], blue[2]);
        doc.text(`Stack: ${exp.techStack.join(" • ")}`, margin, currentY);
        currentY += 4;
      }

      // Description
      doc.setFont("helvetica", "normal");
      doc.setFontSize(9);
      doc.setTextColor(0, 0, 0);
      exp.description.forEach((achievement) => {
        if (currentY + 5 > pageHeight - bottomMargin) {
          doc.addPage();
          currentY = margin;
        }
        const cleanText = achievement.replace(/^[•\-\*]\s*/, "");
        currentY = addText(`• ${cleanText}`, margin, currentY, contentWidth - 2, 9, false, [0, 0, 0]);
      });

      currentY += 4;
    });

    // ==================== KEY PROJECTS ====================
    if (currentY + 30 > pageHeight - bottomMargin) { doc.addPage(); currentY = margin; }
    currentY = addSectionHeader("KEY PROJECTS", currentY);

    portfolioData.projects.slice(0, 4).forEach((project) => {
      if (currentY + 25 > pageHeight - bottomMargin) {
        doc.addPage();
        currentY = margin;
      }

      // Name | Type | Period
      doc.setFont("helvetica", "bold");
      doc.setFontSize(10);
      doc.setTextColor(0, 0, 0);
      doc.text(project.name.toUpperCase(), margin, currentY);

      const nameWidth = doc.getTextWidth(project.name.toUpperCase());
      doc.setFont("helvetica", "italic");
      doc.setFontSize(9);
      doc.setTextColor(gray[0], gray[1], gray[2]);
      doc.text(`  |  ${project.type}  |  ${project.period}`, margin + nameWidth, currentY);
      currentY += 4;

      // Tech Stack
      doc.setFont("helvetica", "italic");
      doc.setFontSize(8);
      doc.setTextColor(blue[0], blue[1], blue[2]);
      doc.text(project.technologies.join(", "), margin, currentY);
      currentY += 4;

      // Highlights
      doc.setFont("helvetica", "normal");
      doc.setFontSize(9);
      doc.setTextColor(0, 0, 0);

      if (project.highlights && project.highlights.length > 0) {
        project.highlights.slice(0, 2).forEach((desc: string) => {
          if (currentY + 5 > pageHeight - bottomMargin) { doc.addPage(); currentY = margin; }
          currentY = addText(`• ${desc}`, margin, currentY, contentWidth - 2, 9, false, [0, 0, 0]);
        });
      } else if (project.description) {
        currentY = addText(project.description, margin, currentY, contentWidth, 9, false, [0, 0, 0]);
      }
      currentY += 3;
    });

    // ==================== EDUCATION ====================
    if (currentY + 20 > pageHeight - bottomMargin) { doc.addPage(); currentY = margin; }
    currentY = addSectionHeader("EDUCATION", currentY);

    portfolioData.education.forEach((edu) => {
      if (currentY + 15 > pageHeight - bottomMargin) { doc.addPage(); currentY = margin; }

      // Line 1: Degree
      doc.setFont("helvetica", "bold");
      doc.setFontSize(10);
      doc.setTextColor(0, 0, 0);
      doc.text(edu.degree, margin, currentY);
      currentY += 5;

      // Line 2: College | Year
      doc.setFont("helvetica", "normal");
      doc.setFontSize(9);
      doc.setTextColor(gray[0], gray[1], gray[2]);
      doc.text(edu.college, margin, currentY);

      const collegeWidth = doc.getTextWidth(edu.college);
      doc.setFont("helvetica", "italic");
      doc.text(`  |  ${edu.period}`, margin + collegeWidth, currentY);

      currentY += 6;
    });
    currentY += 2;

    // ==================== CERTIFICATIONS & LANGUAGES (Side by Side if space, or linear) ====================
    // Linear is safer for ATS
    if (currentY + 20 > pageHeight - bottomMargin) { doc.addPage(); currentY = margin; }
    currentY = addSectionHeader("CERTIFICATIONS", currentY);
    portfolioData.certifications.forEach((cert) => {
      if (currentY + 5 > pageHeight - bottomMargin) { doc.addPage(); currentY = margin; }
      currentY = addText(`• ${cert}`, margin, currentY, contentWidth, 9, false, [0, 0, 0]);
      currentY -= 1; // tighter
    });
    currentY += 3;

    // Languages
    if (currentY + 20 > pageHeight - bottomMargin) { doc.addPage(); currentY = margin; }
    if (portfolioData.languages) {
      currentY = addSectionHeader("LANGUAGES", currentY);
      const langs = portfolioData.languages.map(l => `${l.name} (${l.proficiency})`).join("  •  ");
      currentY = addText(langs, margin, currentY, contentWidth, 9, false, [0, 0, 0]);
    }

    // Interests
    if (portfolioData.interests) {
      currentY += 4;
      currentY = addSectionHeader("INTERESTS", currentY);
      currentY = addText(portfolioData.interests.join(", "), margin, currentY, contentWidth, 9, false, [0, 0, 0]);
    }

    // Save
    const formattedDateFile = new Date().toISOString().split('T')[0];
    const roleSlug = portfolioData.personalInfo.title.split(' & ')[0].replace(/\s+/g, '_');
    const filename = `${portfolioData.personalInfo.firstName}_${portfolioData.personalInfo.lastName}_${roleSlug}_Resume.pdf`;
    doc.save(filename);
  };

  return (

    <m.button
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
      <m.div
        className="absolute inset-0 bg-gradient-to-r from-primary-400/20 to-secondary-400/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
      />

      <m.div
        whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.2 }}
        transition={{ duration: 0.5 }}
      >
        <Download className="w-5 h-5 relative z-10" />
      </m.div>
      <span className="relative z-10">Download Resume</span>
    </m.button>
  );
}

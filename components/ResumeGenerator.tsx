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
    const leftColumnWidth = (pageWidth - 2 * margin) * 0.58; // 58% for left column
    const rightColumnWidth = (pageWidth - 2 * margin) * 0.38; // 38% for right column
    const columnGap = (pageWidth - 2 * margin) * 0.04; // 4% gap
    const rightColumnX = margin + leftColumnWidth + columnGap;
    const lineHeight = 5;
    const blue: [number, number, number] = [74, 144, 226]; // #4A90E2
    const gray: [number, number, number] = [100, 100, 100];
    const lightGray: [number, number, number] = [150, 150, 150];
    const bottomMargin = 20;

    let leftY = margin;
    let rightY = margin;

    // Helper: Add text with word wrap
    const addText = (
      text: string,
      x: number,
      y: number,
      maxWidth: number,
      fontSize: number,
      isBold: boolean = false,
      color: [number, number, number] = [0, 0, 0]
    ): number => {
      doc.setFontSize(fontSize);
      doc.setTextColor(color[0], color[1], color[2]);
      doc.setFont("helvetica", isBold ? "bold" : "normal");

      const lines = doc.splitTextToSize(text, maxWidth);

      lines.forEach((line: string) => {
        doc.text(line, x, y);
        y += lineHeight;
      });

      return y;
    };

    // Helper: Add section header with blue underline
    const addSectionHeader = (text: string, x: number, y: number, width: number): number => {
      doc.setFontSize(12);
      doc.setTextColor(blue[0], blue[1], blue[2]);
      doc.setFont("helvetica", "bold");
      doc.text(text, x, y);

      // Blue underline
      doc.setDrawColor(blue[0], blue[1], blue[2]);
      doc.setLineWidth(0.5);
      doc.line(x, y + 1, x + width, y + 1);

      return y + 6;
    };

    // ==================== HEADER SECTION (FULL WIDTH) ====================
    // Name in blue
    doc.setFontSize(22);
    doc.setTextColor(blue[0], blue[1], blue[2]);
    doc.setFont("helvetica", "bold");
    doc.text(portfolioData.personalInfo.name, margin, leftY);
    leftY += 7;

    // Title
    doc.setFontSize(11);
    doc.setTextColor(gray[0], gray[1], gray[2]);
    doc.setFont("helvetica", "normal");
    doc.text(portfolioData.personalInfo.title, margin, leftY);
    leftY += 6;

    // Contact Info
    doc.setFontSize(9);
    doc.setTextColor(0, 0, 0);
    const contactLine = `${portfolioData.personalInfo.email} | ${portfolioData.personalInfo.phone} | ${portfolioData.personalInfo.location}`;
    doc.text(contactLine, margin, leftY);
    leftY += 4;
    const linksLine = `${portfolioData.personalInfo.linkedin} | github.com/shibinmariyan`;
    doc.text(linksLine, margin, leftY);
    leftY += 6;

    // Professional Summary (full width)
    leftY = addSectionHeader("PROFESSIONAL SUMMARY", margin, leftY, pageWidth - 2 * margin);
    leftY = addText(portfolioData.summary, margin, leftY, pageWidth - 2 * margin, 9, false, [0, 0, 0]);
    leftY += 4;

    // Set starting point for both columns
    rightY = leftY;

    // ==================== LEFT COLUMN - EXPERIENCE ====================
    leftY = addSectionHeader("PROFESSIONAL EXPERIENCE", margin, leftY, leftColumnWidth);

    portfolioData.experience.forEach((exp) => {
      // Check if we need a new page
      if (leftY + 35 > pageHeight - bottomMargin) {
        doc.addPage();
        leftY = margin;
        rightY = margin;
      }

      // Job title and company
      leftY = addText(`${exp.position}`, margin, leftY, leftColumnWidth, 11, true, [0, 0, 0]);
      leftY = addText(exp.company, margin, leftY, leftColumnWidth, 10, false, [0, 0, 0]);

      // Date and location
      doc.setFont("helvetica", "italic");
      doc.setFontSize(9);
      doc.setTextColor(lightGray[0], lightGray[1], lightGray[2]);
      const dateRange = `${exp.startDate} - ${exp.endDate || "Present"} | ${exp.location}`;
      doc.text(dateRange, margin, leftY);
      leftY += 5;

      // Achievements
      doc.setFont("helvetica", "normal");
      doc.setFontSize(9);
      doc.setTextColor(0, 0, 0);

      exp.description.forEach((achievement) => {
        if (leftY + 10 > pageHeight - bottomMargin) {
          doc.addPage();
          leftY = margin;
          rightY = margin;
        }
        leftY = addText(`• ${achievement}`, margin, leftY, leftColumnWidth - 3, 9, false, [0, 0, 0]);
      });

      leftY += 3;
    });

    // ==================== LEFT COLUMN - EDUCATION ====================
    if (leftY + 20 > pageHeight - bottomMargin) {
      doc.addPage();
      leftY = margin;
      rightY = margin;
    }
    leftY = addSectionHeader("EDUCATION", margin, leftY, leftColumnWidth);

    portfolioData.education.forEach((edu) => {
      if (leftY + 15 > pageHeight - bottomMargin) {
        doc.addPage();
        leftY = margin;
        rightY = margin;
      }
      leftY = addText(edu.degree, margin, leftY, leftColumnWidth, 10, true, [0, 0, 0]);
      leftY = addText(edu.college, margin, leftY, leftColumnWidth, 9, false, gray);

      doc.setFont("helvetica", "italic");
      doc.setFontSize(8);
      doc.setTextColor(lightGray[0], lightGray[1], lightGray[2]);
      doc.text(edu.period, margin, leftY);
      leftY += 6;
    });

    // ==================== LEFT COLUMN - CERTIFICATIONS ====================
    if (leftY + 15 > pageHeight - bottomMargin) {
      doc.addPage();
      leftY = margin;
      rightY = margin;
    }
    leftY = addSectionHeader("CERTIFICATIONS", margin, leftY, leftColumnWidth);

    portfolioData.certifications.forEach((cert) => {
      if (leftY + 6 > pageHeight - bottomMargin) {
        doc.addPage();
        leftY = margin;
        rightY = margin;
      }
      leftY = addText(`• ${cert}`, margin, leftY, leftColumnWidth, 9, false, [0, 0, 0]);
    });

    // ==================== RIGHT COLUMN - Start on page 1 ====================
    // Go back to page 1 to start right column
    let currentRightPage = 1;
    doc.setPage(currentRightPage);

    // Calculate where right column starts (after header)
    let headerHeight = margin + 7 + 6 + 4 + 4; // Name + title + contact lines
    // Add summary section height
    const summaryLines = doc.splitTextToSize(portfolioData.summary, pageWidth - 2 * margin);
    headerHeight += 6 + (summaryLines.length * lineHeight) + 4; // Section header + text + spacing

    rightY = headerHeight;

    // ==================== RIGHT COLUMN - ACHIEVEMENTS ====================
    rightY = addSectionHeader("KEY ACHIEVEMENTS", rightColumnX, rightY, rightColumnWidth);

    portfolioData.achievements.forEach((achievement) => {
      if (rightY + 8 > pageHeight - bottomMargin) {
        if (currentRightPage < doc.internal.pages.length - 1) {
          currentRightPage++;
          doc.setPage(currentRightPage);
        } else {
          doc.addPage();
          currentRightPage++;
        }
        rightY = margin;
      }
      rightY = addText(`• ${achievement}`, rightColumnX, rightY, rightColumnWidth, 9, false, [0, 0, 0]);
    });
    rightY += 3;

    // ==================== RIGHT COLUMN - SKILLS ====================
    if (rightY + 15 > pageHeight - bottomMargin) {
      if (currentRightPage < doc.internal.pages.length - 1) {
        currentRightPage++;
        doc.setPage(currentRightPage);
      } else {
        doc.addPage();
        currentRightPage++;
      }
      rightY = margin;
    }
    rightY = addSectionHeader("TECHNICAL SKILLS", rightColumnX, rightY, rightColumnWidth);

    portfolioData.skillCategories.forEach((cat) => {
      if (rightY + 12 > pageHeight - bottomMargin) {
        if (currentRightPage < doc.internal.pages.length - 1) {
          currentRightPage++;
          doc.setPage(currentRightPage);
        } else {
          doc.addPage();
          currentRightPage++;
        }
        rightY = margin;
      }
      rightY = addText(`${cat.category}:`, rightColumnX, rightY, rightColumnWidth, 9, true, [0, 0, 0]);
      rightY = addText(cat.skills.join(", "), rightColumnX, rightY, rightColumnWidth, 8, false, [0, 0, 0]);
      rightY += 2;
    });

    // ==================== RIGHT COLUMN - PROJECTS ====================
    if (rightY + 15 > pageHeight - bottomMargin) {
      if (currentRightPage < doc.internal.pages.length - 1) {
        currentRightPage++;
        doc.setPage(currentRightPage);
      } else {
        doc.addPage();
        currentRightPage++;
      }
      rightY = margin;
    }
    rightY = addSectionHeader("KEY PROJECTS", rightColumnX, rightY, rightColumnWidth);

    portfolioData.projects.forEach((project) => {
      if (rightY + 15 > pageHeight - bottomMargin) {
        if (currentRightPage < doc.internal.pages.length - 1) {
          currentRightPage++;
          doc.setPage(currentRightPage);
        } else {
          doc.addPage();
          currentRightPage++;
        }
        rightY = margin;
      }
      rightY = addText(`${project.name}`, rightColumnX, rightY, rightColumnWidth, 9, true, [0, 0, 0]);
      rightY = addText(project.technologies.join(", "), rightColumnX, rightY, rightColumnWidth, 8, false, lightGray);
      rightY += 2;
    });

    // ==================== RIGHT COLUMN - LANGUAGES ====================
    if (portfolioData.languages && portfolioData.languages.length > 0) {
      if (rightY + 15 > pageHeight - bottomMargin) {
        if (currentRightPage < doc.internal.pages.length - 1) {
          currentRightPage++;
          doc.setPage(currentRightPage);
        } else {
          doc.addPage();
          currentRightPage++;
        }
        rightY = margin;
      }
      rightY = addSectionHeader("LANGUAGES", rightColumnX, rightY, rightColumnWidth);

      portfolioData.languages.forEach((lang) => {
        if (rightY + 8 > pageHeight - bottomMargin) {
          if (currentRightPage < doc.internal.pages.length - 1) {
            currentRightPage++;
            doc.setPage(currentRightPage);
          } else {
            doc.addPage();
            currentRightPage++;
          }
          rightY = margin;
        }
        rightY = addText(lang.name, rightColumnX, rightY, rightColumnWidth, 9, false, [0, 0, 0]);

        doc.setFont("helvetica", "italic");
        doc.setFontSize(8);
        doc.setTextColor(blue[0], blue[1], blue[2]);
        doc.text(lang.proficiency, rightColumnX, rightY);
        rightY += 5;
      });
      rightY += 2;
    }

    // ==================== RIGHT COLUMN - INTERESTS ====================
    if (portfolioData.interests && portfolioData.interests.length > 0) {
      if (rightY + 10 > pageHeight - bottomMargin) {
        if (currentRightPage < doc.internal.pages.length - 1) {
          currentRightPage++;
          doc.setPage(currentRightPage);
        } else {
          doc.addPage();
          currentRightPage++;
        }
        rightY = margin;
      }
      rightY = addSectionHeader("INTERESTS", rightColumnX, rightY, rightColumnWidth);
      rightY = addText(portfolioData.interests.join(" • "), rightColumnX, rightY, rightColumnWidth, 9, false, [0, 0, 0]);
    }

    // Save the PDF
    const formattedDate = new Date().toISOString().split('T')[0];
    doc.save(`Shibin_Mariyan_Stanly_Resume_${formattedDate}.pdf`);
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

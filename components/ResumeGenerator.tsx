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

    // Helper: Format date to "Mon YYYY"
    const formatDate = (dateStr: string): string => {
      if (!dateStr || dateStr.toLowerCase() === 'present') return "Present";
      const parts = dateStr.split('-');
      if (parts.length < 2) return dateStr;
      const [year, month] = parts;
      const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      // Check if month is number or string
      const monthIndex = isNaN(parseInt(month))
        ? monthNames.findIndex(m => m.toLowerCase() === month.toLowerCase().substring(0, 3))
        : parseInt(month) - 1;

      return `${monthNames[monthIndex] || month} ${year}`;
    };

    // Helper: Add section header with blue underline
    const addSectionHeader = (text: string, x: number, y: number, width: number): number => {
      doc.setFontSize(11);
      doc.setTextColor(blue[0], blue[1], blue[2]);
      doc.setFont("helvetica", "bold");
      doc.text(text.toUpperCase(), x, y); // Ensure uppercase

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
    doc.text(portfolioData.personalInfo.name.toUpperCase(), margin, leftY);
    leftY += 7;

    // Title
    doc.setFontSize(11);
    doc.setTextColor(gray[0], gray[1], gray[2]);
    doc.setFont("helvetica", "bold"); // Bolder title
    doc.text(portfolioData.personalInfo.title.toUpperCase(), margin, leftY);
    leftY += 6;

    // Contact Info - Single line if possible or compact 2 lines
    doc.setFontSize(9);
    doc.setTextColor(0, 0, 0);
    doc.setFont("helvetica", "normal");

    // Line 1: Email | Phone | Location
    const contactLine1 = `${portfolioData.personalInfo.email}  •  ${portfolioData.personalInfo.phone}  •  ${portfolioData.personalInfo.location}`;
    doc.text(contactLine1, margin, leftY);
    leftY += 4;

    // Line 2: LinkedIn | GitHub | Portfolio
    const contactLine2 = `${portfolioData.personalInfo.linkedin}  •  github.com/shibinmariyan  •  ${portfolioData.personalInfo.portfolio}`;
    doc.text(contactLine2, margin, leftY);
    leftY += 6;

    // ==================== CORE COMPETENCIES (NEW) ====================
    leftY = addSectionHeader("CORE COMPETENCIES", margin, leftY, pageWidth - 2 * margin);

    // Use keywords as core competencies, limited to top 12-15 to avoid stuffing
    const coreSkills = portfolioData.personalInfo.keywords.slice(0, 15).join("  •  ");
    leftY = addText(coreSkills, margin, leftY, pageWidth - 2 * margin, 9, false, [0, 0, 0]);
    leftY += 4;

    // Professional Summary (full width)
    leftY = addSectionHeader("PROFESSIONAL SUMMARY", margin, leftY, pageWidth - 2 * margin);
    leftY = addText(portfolioData.summary, margin, leftY, pageWidth - 2 * margin, 9, false, [0, 0, 0]);
    leftY += 6;

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
      // Format: TITLE (Bold) 
      // Company | Date | Location (Italic/Gray)

      leftY = addText(exp.position.toUpperCase(), margin, leftY, leftColumnWidth, 10, true, [0, 0, 0]);

      doc.setFont("helvetica", "bold");
      doc.setFontSize(9);
      doc.setTextColor(0, 0, 0);
      doc.text(exp.company, margin, leftY);

      const dateStr = `${formatDate(exp.startDate)} - ${formatDate(exp.endDate || "Present")}`;
      const widthCompany = doc.getTextWidth(exp.company);

      doc.setFont("helvetica", "italic");
      doc.setTextColor(gray[0], gray[1], gray[2]);
      doc.text(`  |  ${dateStr}`, margin + widthCompany, leftY);
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
        // Clean up bullet points to use standard simple bullets
        const cleanText = achievement.replace(/^[•\-\*]\s*/, "");
        leftY = addText(`• ${cleanText}`, margin, leftY, leftColumnWidth - 3, 9, false, [0, 0, 0]);
      });

      leftY += 4;
    });

    // ==================== LEFT COLUMN - PROJECTS (MOVED TO MAIN COLUMN FOR DETAIL) ====================
    if (leftY + 20 > pageHeight - bottomMargin) {
      doc.addPage();
      leftY = margin;
      rightY = margin;
    }
    leftY = addSectionHeader("KEY PROJECTS", margin, leftY, leftColumnWidth);

    portfolioData.projects.slice(0, 3).forEach((project) => { // Limit to top 3 detailed projects
      if (leftY + 25 > pageHeight - bottomMargin) {
        doc.addPage();
        leftY = margin;
        rightY = margin;
      }

      // Project Name
      leftY = addText(project.name.toUpperCase(), margin, leftY, leftColumnWidth, 10, true, [0, 0, 0]);

      // Tech Stack
      doc.setFont("helvetica", "italic");
      doc.setFontSize(8);
      doc.setTextColor(blue[0], blue[1], blue[2]);
      doc.text(project.technologies.join(", "), margin, leftY);
      leftY += 4;

      // Description (Mocking strict description if array, otherwise using key feature)
      doc.setFont("helvetica", "normal");
      doc.setFontSize(9);
      doc.setTextColor(0, 0, 0);

      if (project.highlights && project.highlights.length > 0) {
        project.highlights.slice(0, 2).forEach((desc: string) => {
          leftY = addText(`• ${desc}`, margin, leftY, leftColumnWidth - 2, 9, false, [0, 0, 0]);
        });
      } else if (project.description) {
        leftY = addText(project.description, margin, leftY, leftColumnWidth, 9, false, [0, 0, 0]);
      }
      leftY += 3;
    });


    // ==================== RIGHT COLUMN - Start on page 1 ====================
    // Go back to page 1 to start right column
    let currentRightPage = 1;
    doc.setPage(currentRightPage);

    // Calculate where right column starts (after header + summary + core competencies)
    // Re-calculate exactly to match leftY start
    // We can just grab the start Y from when we branched off, but simpler to re-calculate:
    // Name(7) + Title(6) + Contact(4) + Contact(6) + Header(6) + Skills(Height) + Header(6) + Summary(Height)
    // Actually, we set rightY = leftY BEFORE the Left Column started. 
    // BUT we need to track that Y. 
    // Let's rely on the fact that we modify `leftY` sequentially in the header section.
    // The previous code had `rightY = leftY` at line 119. 
    // We need to restore that logic. 
    // Since we are replacing the whole function body, we need to ensure we captured that Y.
    // Wait, I can't easily capture the *dynamic* Y from the header section in this replacement block 
    // unless I include the header section in the replacement or have a fixed offset.
    // My replacement block *includes* the header section (lines 83-117 in original).
    // So `rightY` IS set correctly at the end of the header section in my replacement.

    // We need to verify where the Right Column starts. In the replacement, I set `rightY = leftY` after summary.
    // So rightY is at the correct Y to start the right column.

    // ==================== RIGHT COLUMN - SKILLS ====================
    rightY = addSectionHeader("TECHNICAL SKILLS", rightColumnX, rightY, rightColumnWidth);

    portfolioData.skillCategories.forEach((cat) => {
      if (rightY + 15 > pageHeight - bottomMargin) {
        // Page handling logic...
        if (currentRightPage < doc.internal.pages.length - 1) {
          currentRightPage++;
          doc.setPage(currentRightPage);
        } else {
          doc.addPage();
          currentRightPage++;
        }
        rightY = margin;
      }
      // Clean category title
      rightY = addText(cat.category.toUpperCase(), rightColumnX, rightY, rightColumnWidth, 9, true, [0, 0, 0]);
      // Skills
      rightY = addText(cat.skills.join(", "), rightColumnX, rightY, rightColumnWidth, 8, false, [0, 0, 0]);
      rightY += 3;
    });

    // ==================== RIGHT COLUMN - EDUCATION ====================
    // Moved Education to Right Column for better balance if Experience is long
    if (rightY + 20 > pageHeight - bottomMargin) {
      if (currentRightPage < doc.internal.pages.length - 1) {
        currentRightPage++;
        doc.setPage(currentRightPage);
      } else {
        doc.addPage();
        currentRightPage++;
      }
      rightY = margin;
    }
    rightY = addSectionHeader("EDUCATION", rightColumnX, rightY, rightColumnWidth);

    portfolioData.education.forEach((edu) => {
      rightY = addText(edu.degree, rightColumnX, rightY, rightColumnWidth, 9, true, [0, 0, 0]);
      rightY = addText(edu.college, rightColumnX, rightY, rightColumnWidth, 9, false, gray);
      doc.setFont("helvetica", "italic");
      doc.setFontSize(8);
      doc.text(edu.period, rightColumnX, rightY);
      rightY += 5;
    });

    rightY += 2;

    // ==================== RIGHT COLUMN - CERTIFICATIONS ====================
    rightY = addSectionHeader("CERTIFICATIONS", rightColumnX, rightY, rightColumnWidth);
    portfolioData.certifications.forEach((cert) => {
      rightY = addText(cert, rightColumnX, rightY, rightColumnWidth, 8, false, [0, 0, 0]);
      rightY -= 2; // Tighter spacing for lists
    });
    rightY += 4;


    // ==================== RIGHT COLUMN - LANGUAGES ====================
    if (portfolioData.languages && portfolioData.languages.length > 0) {
      rightY = addSectionHeader("LANGUAGES", rightColumnX, rightY, rightColumnWidth);
      portfolioData.languages.forEach((lang) => {
        // Linear format: Language (Proficiency)
        const langText = `${lang.name} (${lang.proficiency})`;
        rightY = addText(langText, rightColumnX, rightY, rightColumnWidth, 9, false, [0, 0, 0]);
        rightY -= 1;
      });
      rightY += 2;
    }

    // ==================== RIGHT COLUMN - INTERESTS ====================
    // Simple comma separated list
    if (portfolioData.interests && portfolioData.interests.length > 0) {
      rightY = addSectionHeader("INTERESTS", rightColumnX, rightY, rightColumnWidth);
      rightY = addText(portfolioData.interests.join(", "), rightColumnX, rightY, rightColumnWidth, 9, false, [0, 0, 0]);
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

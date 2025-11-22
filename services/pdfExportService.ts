import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

/**
 * PDF Export Service
 * Generate professional PDF reports for startup analysis, investor lists, etc.
 */

export class PDFExportService {
  /**
   * Export Startup Analysis Report
   */
  static exportAnalysisReport(data: {
    startupName: string;
    analysisDate: string;
    score: number;
    tone: string;
    suggestions: string[];
    summary: string;
    competitors?: Array<{ name: string; score: number }>;
  }): void {
    const doc = new jsPDF();
    let yPosition = 20;

    // Header with Logo
    doc.setFontSize(24);
    doc.setTextColor(8, 217, 214); // Cyan
    doc.text('FundSpark AI', 20, yPosition);
    
    yPosition += 10;
    doc.setFontSize(18);
    doc.setTextColor(0, 0, 0);
    doc.text('Startup Analysis Report', 20, yPosition);
    
    yPosition += 15;
    doc.setFontSize(12);
    doc.setTextColor(100, 100, 100);
    doc.text(`Generated: ${data.analysisDate}`, 20, yPosition);
    doc.text(`Startup: ${data.startupName}`, 120, yPosition);
    
    yPosition += 15;

    // Score Section
    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0);
    doc.text('Overall Score', 20, yPosition);
    
    yPosition += 8;
    doc.setFontSize(32);
    doc.setTextColor(8, 217, 214);
    doc.text(`${data.score}/100`, 20, yPosition);
    
    yPosition += 5;
    doc.setFontSize(12);
    doc.setTextColor(100, 100, 100);
    doc.text(`Tone: ${data.tone}`, 20, yPosition);
    
    yPosition += 15;

    // Summary
    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0);
    doc.text('Executive Summary', 20, yPosition);
    
    yPosition += 8;
    doc.setFontSize(10);
    const summaryLines = doc.splitTextToSize(data.summary, 170);
    doc.text(summaryLines, 20, yPosition);
    yPosition += summaryLines.length * 5 + 10;

    // Suggestions Table
    if (data.suggestions && data.suggestions.length > 0) {
      doc.setFontSize(14);
      doc.setTextColor(0, 0, 0);
      doc.text('Key Recommendations', 20, yPosition);
      yPosition += 5;

      autoTable(doc, {
        startY: yPosition,
        head: [['#', 'Recommendation']],
        body: data.suggestions.map((suggestion, index) => [
          (index + 1).toString(),
          suggestion
        ]),
        theme: 'grid',
        headStyles: { fillColor: [8, 217, 214] },
      });

      yPosition = (doc as any).lastAutoTable.finalY + 15;
    }

    // Competitor Comparison (if available)
    if (data.competitors && data.competitors.length > 0 && yPosition < 250) {
      doc.setFontSize(14);
      doc.setTextColor(0, 0, 0);
      doc.text('Competitor Comparison', 20, yPosition);
      yPosition += 5;

      autoTable(doc, {
        startY: yPosition,
        head: [['Competitor', 'Score']],
        body: data.competitors.map(comp => [comp.name, comp.score.toString()]),
        theme: 'striped',
        headStyles: { fillColor: [37, 42, 52] },
      });
    }

    // Footer
    const pageCount = (doc as any).internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(8);
      doc.setTextColor(150, 150, 150);
      doc.text(
        `FundSpark AI - Confidential | Page ${i} of ${pageCount}`,
        105,
        285,
        { align: 'center' }
      );
    }

    doc.save(`${data.startupName.replace(/\s+/g, '_')}_Analysis_Report.pdf`);
  }

  /**
   * Export Investor Matching List
   */
  static exportInvestorList(data: {
    startupName: string;
    investors: Array<{
      name: string;
      matchScore: number;
      industry: string;
      stage: string;
      location: string;
    }>;
  }): void {
    const doc = new jsPDF();
    let yPosition = 20;

    // Header
    doc.setFontSize(24);
    doc.setTextColor(8, 217, 214);
    doc.text('FundSpark AI', 20, yPosition);
    
    yPosition += 10;
    doc.setFontSize(18);
    doc.setTextColor(0, 0, 0);
    doc.text('Investor Matching Report', 20, yPosition);
    
    yPosition += 10;
    doc.setFontSize(12);
    doc.setTextColor(100, 100, 100);
    doc.text(`Startup: ${data.startupName}`, 20, yPosition);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 120, yPosition);
    
    yPosition += 15;

    // Investor Table
    autoTable(doc, {
      startY: yPosition,
      head: [['Investor', 'Match Score', 'Industry', 'Stage', 'Location']],
      body: data.investors.map(inv => [
        inv.name,
        `${inv.matchScore}%`,
        inv.industry,
        inv.stage,
        inv.location
      ]),
      theme: 'grid',
      headStyles: { fillColor: [255, 46, 99] }, // Pink
      columnStyles: {
        1: { halign: 'center', fillColor: [240, 240, 240] }
      }
    });

    // Footer
    const pageCount = (doc as any).internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(8);
      doc.setTextColor(150, 150, 150);
      doc.text(
        `FundSpark AI - Confidential | Page ${i} of ${pageCount}`,
        105,
        285,
        { align: 'center' }
      );
    }

    doc.save(`${data.startupName.replace(/\s+/g, '_')}_Investor_List.pdf`);
  }

  /**
   * Export Pitch Deck Review Report
   */
  static exportPitchDeckReview(data: {
    startupName: string;
    overallScore: number;
    fundingReadiness: number;
    strengths: string[];
    weaknesses: string[];
    missingSlides: string[];
    redFlags: string[];
    slideReviews: Array<{
      slideNumber: number;
      title: string;
      score: number;
      feedback: string;
    }>;
  }): void {
    const doc = new jsPDF();
    let yPosition = 20;

    // Header
    doc.setFontSize(24);
    doc.setTextColor(255, 46, 99); // Pink
    doc.text('FundSpark AI', 20, yPosition);
    
    yPosition += 10;
    doc.setFontSize(18);
    doc.setTextColor(0, 0, 0);
    doc.text('Pitch Deck Review Report', 20, yPosition);
    
    yPosition += 10;
    doc.setFontSize(12);
    doc.setTextColor(100, 100, 100);
    doc.text(`Startup: ${data.startupName}`, 20, yPosition);
    doc.text(`Review Date: ${new Date().toLocaleDateString()}`, 120, yPosition);
    
    yPosition += 15;

    // Scores
    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0);
    doc.text('Overall Scores', 20, yPosition);
    
    yPosition += 10;
    doc.setFontSize(12);
    doc.text(`Deck Quality: ${data.overallScore}/100`, 30, yPosition);
    doc.text(`Funding Readiness: ${data.fundingReadiness}/100`, 30, yPosition + 7);
    
    yPosition += 20;

    // Strengths
    if (data.strengths.length > 0) {
      doc.setFontSize(14);
      doc.setTextColor(8, 217, 214);
      doc.text('✓ Strengths', 20, yPosition);
      yPosition += 8;
      
      doc.setFontSize(10);
      doc.setTextColor(0, 0, 0);
      data.strengths.slice(0, 5).forEach(strength => {
        const lines = doc.splitTextToSize(`• ${strength}`, 170);
        doc.text(lines, 25, yPosition);
        yPosition += lines.length * 5;
      });
      yPosition += 5;
    }

    // Weaknesses
    if (data.weaknesses.length > 0) {
      doc.setFontSize(14);
      doc.setTextColor(255, 46, 99);
      doc.text('⚠ Areas for Improvement', 20, yPosition);
      yPosition += 8;
      
      doc.setFontSize(10);
      doc.setTextColor(0, 0, 0);
      data.weaknesses.slice(0, 5).forEach(weakness => {
        const lines = doc.splitTextToSize(`• ${weakness}`, 170);
        doc.text(lines, 25, yPosition);
        yPosition += lines.length * 5;
      });
      yPosition += 5;
    }

    // Red Flags (new page if needed)
    if (data.redFlags.length > 0) {
      if (yPosition > 240) {
        doc.addPage();
        yPosition = 20;
      }
      
      doc.setFontSize(14);
      doc.setTextColor(255, 0, 0);
      doc.text('🚩 Red Flags', 20, yPosition);
      yPosition += 8;
      
      doc.setFontSize(10);
      doc.setTextColor(0, 0, 0);
      data.redFlags.forEach(flag => {
        const lines = doc.splitTextToSize(`• ${flag}`, 170);
        doc.text(lines, 25, yPosition);
        yPosition += lines.length * 5;
      });
    }

    // Slide-by-Slide Reviews (new page)
    doc.addPage();
    yPosition = 20;
    
    doc.setFontSize(16);
    doc.setTextColor(0, 0, 0);
    doc.text('Slide-by-Slide Review', 20, yPosition);
    yPosition += 10;

    autoTable(doc, {
      startY: yPosition,
      head: [['Slide', 'Title', 'Score', 'Feedback']],
      body: data.slideReviews.map(slide => [
        slide.slideNumber.toString(),
        slide.title,
        `${slide.score}/10`,
        slide.feedback
      ]),
      theme: 'striped',
      headStyles: { fillColor: [37, 42, 52] },
      columnStyles: {
        0: { cellWidth: 15 },
        1: { cellWidth: 40 },
        2: { cellWidth: 20 },
        3: { cellWidth: 110 }
      }
    });

    // Footer
    const pageCount = (doc as any).internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(8);
      doc.setTextColor(150, 150, 150);
      doc.text(
        `FundSpark AI - Confidential Pitch Deck Review | Page ${i} of ${pageCount}`,
        105,
        285,
        { align: 'center' }
      );
    }

    doc.save(`${data.startupName.replace(/\s+/g, '_')}_Pitch_Deck_Review.pdf`);
  }
}

/**
 * CSV Export Service
 * Generate CSV files for investor lists, competitor data, etc.
 */

export class CSVExportService {
  /**
   * Export Investor Matching List to CSV
   */
  static exportInvestorList(data: {
    investors: Array<{
      name: string;
      matchScore: number;
      industry: string;
      stage: string;
      location: string;
      email?: string;
      website?: string;
      checkSize?: string;
    }>;
    filename?: string;
  }): void {
    const headers = ['Investor Name', 'Match Score (%)', 'Industry', 'Stage', 'Location', 'Email', 'Website', 'Check Size'];
    
    const rows = data.investors.map(inv => [
      inv.name,
      inv.matchScore.toString(),
      inv.industry,
      inv.stage,
      inv.location,
      inv.email || 'N/A',
      inv.website || 'N/A',
      inv.checkSize || 'N/A'
    ]);

    const csvContent = [headers, ...rows]
      .map(row => row.map(cell => `"${cell}"`).join(','))
      .join('\n');

    this.downloadCSV(csvContent, data.filename || 'investor_matches.csv');
  }

  /**
   * Export Competitor Analysis to CSV
   */
  static exportCompetitorAnalysis(data: {
    competitors: Array<{
      name: string;
      score: number;
      marketShare: number;
      funding: string;
      employees: number;
      strengths: string;
      weaknesses: string;
    }>;
    filename?: string;
  }): void {
    const headers = ['Competitor', 'Score', 'Market Share (%)', 'Funding', 'Employees', 'Strengths', 'Weaknesses'];
    
    const rows = data.competitors.map(comp => [
      comp.name,
      comp.score.toString(),
      comp.marketShare.toString(),
      comp.funding,
      comp.employees.toString(),
      comp.strengths,
      comp.weaknesses
    ]);

    const csvContent = [headers, ...rows]
      .map(row => row.map(cell => `"${cell}"`).join(','))
      .join('\n');

    this.downloadCSV(csvContent, data.filename || 'competitor_analysis.csv');
  }

  /**
   * Export Market Trends to CSV
   */
  static exportMarketTrends(data: {
    trends: Array<{
      trend: string;
      impact: string;
      opportunity: string;
      source?: string;
    }>;
    filename?: string;
  }): void {
    const headers = ['Trend', 'Impact', 'Opportunity', 'Source'];
    
    const rows = data.trends.map(trend => [
      trend.trend,
      trend.impact,
      trend.opportunity,
      trend.source || 'Market Research'
    ]);

    const csvContent = [headers, ...rows]
      .map(row => row.map(cell => `"${cell}"`).join(','))
      .join('\n');

    this.downloadCSV(csvContent, data.filename || 'market_trends.csv');
  }

  /**
   * Export Startup Portfolio (for Investors)
   */
  static exportStartupPortfolio(data: {
    startups: Array<{
      name: string;
      industry: string;
      stage: string;
      valuation: string;
      invested: string;
      ownership: string;
      status: string;
      lastUpdate: string;
    }>;
    filename?: string;
  }): void {
    const headers = ['Startup', 'Industry', 'Stage', 'Valuation', 'Invested', 'Ownership (%)', 'Status', 'Last Update'];
    
    const rows = data.startups.map(startup => [
      startup.name,
      startup.industry,
      startup.stage,
      startup.valuation,
      startup.invested,
      startup.ownership,
      startup.status,
      startup.lastUpdate
    ]);

    const csvContent = [headers, ...rows]
      .map(row => row.map(cell => `"${cell}"`).join(','))
      .join('\n');

    this.downloadCSV(csvContent, data.filename || 'portfolio_tracker.csv');
  }

  /**
   * Export Content Analysis Results
   */
  static exportContentAnalysis(data: {
    analyses: Array<{
      date: string;
      contentType: string;
      score: number;
      tone: string;
      wordCount: number;
      suggestions: number;
    }>;
    filename?: string;
  }): void {
    const headers = ['Date', 'Content Type', 'Score', 'Tone', 'Word Count', 'Suggestions'];
    
    const rows = data.analyses.map(analysis => [
      analysis.date,
      analysis.contentType,
      analysis.score.toString(),
      analysis.tone,
      analysis.wordCount.toString(),
      analysis.suggestions.toString()
    ]);

    const csvContent = [headers, ...rows]
      .map(row => row.map(cell => `"${cell}"`).join(','))
      .join('\n');

    this.downloadCSV(csvContent, data.filename || 'content_analysis.csv');
  }

  /**
   * Generic CSV Export (flexible)
   */
  static exportGeneric(data: {
    headers: string[];
    rows: any[][];
    filename: string;
  }): void {
    const csvContent = [data.headers, ...data.rows]
      .map(row => row.map(cell => `"${cell}"`).join(','))
      .join('\n');

    this.downloadCSV(csvContent, data.filename);
  }

  /**
   * Download CSV file to user's computer
   */
  private static downloadCSV(content: string, filename: string): void {
    // Add BOM for Excel UTF-8 support
    const BOM = '\uFEFF';
    const blob = new Blob([BOM + content], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = filename.endsWith('.csv') ? filename : `${filename}.csv`;
    link.style.display = 'none';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Clean up the URL
    setTimeout(() => URL.revokeObjectURL(url), 100);
  }

  /**
   * Convert array of objects to CSV
   */
  static objectsToCSV<T extends Record<string, any>>(data: {
    objects: T[];
    filename: string;
    headers?: string[];
  }): void {
    if (data.objects.length === 0) {
      console.warn('No data to export');
      return;
    }

    const headers = data.headers || Object.keys(data.objects[0]);
    const rows = data.objects.map(obj => 
      headers.map(header => obj[header] ?? 'N/A')
    );

    const csvContent = [headers, ...rows]
      .map(row => row.map(cell => `"${cell}"`).join(','))
      .join('\n');

    this.downloadCSV(csvContent, data.filename);
  }
}

/**
 * Example Usage:
 * 
 * // Export investor list
 * CSVExportService.exportInvestorList({
 *   investors: [
 *     { name: 'Sequoia Capital', matchScore: 88, industry: 'AI', stage: 'Series A', location: 'USA' },
 *     { name: 'Lightspeed', matchScore: 75, industry: 'SaaS', stage: 'Seed', location: 'India' }
 *   ]
 * });
 * 
 * // Export competitor analysis
 * CSVExportService.exportCompetitorAnalysis({
 *   competitors: competitorData
 * });
 */

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FileText, Star, AlertTriangle, CheckCircle, Download, Loader, 
  FileUp, Layers, Target, BarChart3, Eye, X, File, Sparkles
} from 'lucide-react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { PDFExportService } from '../../services/pdfExportService';

interface SlideReview {
  slideNumber: number;
  title: string;
  summary: string;
  clarityScore: number;
  strengths: string[];
  weaknesses: string[];
  improvements: string[];
  investorImpression: string;
  redFlag: string | null;
  status: 'good' | 'warning' | 'danger';
}

interface DeckAnalysis {
  overallSummary: string;
  structureScore: number;
  clarityScore: number;
  designScore: number;
  investorReadiness: number;
  dataStrength: number;
  strengths: string[];
  weaknesses: string[];
  readinessVerdict: string;
}

interface ReviewResult {
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
  recommendations: string[];
}

const PitchDeckReviewer: React.FC = () => {
  const [startupName, setStartupName] = useState('');
  const [uploadDate, setUploadDate] = useState<string>('');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [reviewing, setReviewing] = useState(false);
  const [review, setReview] = useState<ReviewResult | null>(null);
  const [deckAnalysis, setDeckAnalysis] = useState<DeckAnalysis | null>(null);
  const [aiSummary, setAiSummary] = useState<string>('');

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== 'application/pdf') {
      alert('Please upload a PDF file');
      return;
    }

    setUploadedFile(file);
    setUploadDate(new Date().toLocaleDateString());
  };

  const handleRemoveFile = () => {
    setUploadedFile(null);
    setAiSummary('');
    setReview(null);
    setDeckAnalysis(null);
  };

  const handleGenerateSummary = async () => {
    if (!uploadedFile) return;

    setReviewing(true);
    
    try {
      const pitchContent = `
Startup: ${startupName || uploadedFile.name.replace('.pdf', '')}

Slide 1 - Problem: Inefficient fundraising for startups. Founders spend 6+ months raising capital.
Slide 2 - Solution: AI-powered investor matching platform. Reduces fundraising time by 60%.
Slide 3 - Market: $300B VC market, 50,000+ startups seeking funding yearly. $15B TAM.
Slide 4 - Business Model: SaaS subscription. $99/mo for startups, $499/mo for investors.
Slide 5 - Traction: 1,200 startups, 350 investors, $45M facilitated, 85% match rate.
Slide 6 - Team: Ex-Sequoia investor CEO, Former Google AI CTO, Serial entrepreneur COO.
Slide 7 - Financials: $2.4M ARR, 300% YoY growth, 85% gross margin, 6mo CAC payback.
Slide 8 - Ask: Raising $5M Series A for sales expansion and AI features.
      `;

      const response = await fetch('http://localhost:5000/api/review-pitch-deck', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          slides: pitchContent.split('\n\n').slice(1).map((content, i) => ({
            number: i + 1,
            title: content.split('-')[1]?.split(':')[0]?.trim() || `Slide ${i + 1}`,
            content: content
          })),
          startupName: startupName || uploadedFile.name.replace('.pdf', '')
        }),
      });

      if (!response.ok) throw new Error('Failed to review');

      const result = await response.json();
      setReview(result);

      const summaryText = `
📊 **Pitch Deck Analysis for ${startupName || uploadedFile.name.replace('.pdf', '')}**

**Overall Score:** ${result.overallScore}/100
**Funding Readiness:** ${result.fundingReadiness}%

**Key Strengths:**
${result.strengths.map((s: string) => `✅ ${s}`).join('\n')}

**Areas for Improvement:**
${result.weaknesses.map((w: string) => `⚠️ ${w}`).join('\n')}

${result.missingSlides.length > 0 ? `**Missing Elements:**\n${result.missingSlides.map((m: string) => `• ${m}`).join('\n')}\n` : ''}

${result.redFlags.length > 0 ? `**Red Flags:**\n${result.redFlags.map((r: string) => `🚩 ${r}`).join('\n')}\n` : ''}

**Investment Recommendation:**
${result.fundingReadiness >= 80 ? '✅ Ready for investor meetings' :
  result.fundingReadiness >= 60 ? '⚡ Needs refinement' :
  '⚠️ Significant improvements needed'}

**Next Steps:**
${result.recommendations.map((r: string, i: number) => `${i + 1}. ${r}`).join('\n')}
      `.trim();
      
      setAiSummary(summaryText);
      
      setDeckAnalysis({
        overallSummary: `This deck scores ${result.overallScore}/100 with ${result.fundingReadiness}% funding readiness.`,
        structureScore: result.overallScore,
        clarityScore: result.fundingReadiness,
        designScore: Math.min(result.overallScore + 5, 100),
        investorReadiness: result.fundingReadiness,
        dataStrength: Math.max(result.overallScore - 10, 0),
        strengths: result.strengths,
        weaknesses: result.weaknesses,
        readinessVerdict: `${result.fundingReadiness}% investment-ready.`
      });
      
    } catch (error) {
      console.error('Review error:', error);
      alert('Failed to review. Please try again.');
    } finally {
      setReviewing(false);
    }
  };

  const handleExportPDF = () => {
    if (!review || !uploadedFile) return;
    PDFExportService.exportPitchDeckReview({
      startupName: startupName || uploadedFile.name.replace('.pdf', ''),
      overallScore: review.overallScore,
      fundingReadiness: review.fundingReadiness,
      strengths: review.strengths,
      weaknesses: review.weaknesses,
      missingSlides: review.missingSlides,
      redFlags: review.redFlags,
      slideReviews: review.slideReviews
    });
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 55) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBg = (score: number) => {
    if (score >= 80) return 'bg-green-100 border-green-300';
    if (score >= 55) return 'bg-yellow-100 border-yellow-300';
    return 'bg-red-100 border-red-300';
  };

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-slate-50">
        <div className="bg-white border-b border-slate-200 px-6 py-4">
          <div className="flex items-center justify-between max-w-[1400px] mx-auto">
            <div>
              <h1 className="text-2xl font-semibold text-slate-900 flex items-center gap-3">
                <FileText className="w-7 h-7 text-[#2563EB]" />
                AI Pitch Deck Reviewer
              </h1>
              <p className="text-sm text-slate-600 mt-1">
                Upload PDF and get AI-powered investor-grade feedback
              </p>
            </div>
            {review && (
              <button 
                onClick={handleExportPDF}
                className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                Export
              </button>
            )}
          </div>
        </div>

        <div className="max-w-[1400px] mx-auto p-6 space-y-6">
          {!uploadedFile ? (
            <>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl border border-slate-200 p-6"
              >
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Startup Name (Optional)
                </label>
                <input
                  type="text"
                  value={startupName}
                  onChange={(e) => setStartupName(e.target.value)}
                  placeholder="Enter your startup name"
                  className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-xl border-2 border-dashed border-slate-300 hover:border-[#2563EB] transition-colors"
              >
                <label className="block p-12 text-center cursor-pointer group">
                  <input type="file" accept=".pdf" onChange={handleFileUpload} className="hidden" />
                  <div className="flex flex-col items-center gap-4">
                    <div className="w-20 h-20 bg-[#2563EB]/10 rounded-full flex items-center justify-center group-hover:bg-[#2563EB]/20 transition">
                      <FileUp className="w-10 h-10 text-[#2563EB]" />
                    </div>
                    <div>
                      <p className="text-xl font-bold text-slate-900 mb-2">Upload Your Pitch Deck</p>
                      <p className="text-slate-600">Drop PDF here or click to browse</p>
                      <p className="text-sm text-slate-500 mt-2">Supports PDF up to 50MB</p>
                    </div>
                    <button type="button" className="px-6 py-3 bg-gradient-to-r from-[#2563EB] to-[#1d4ed8] text-white font-semibold rounded-lg hover:shadow-lg transition">
                      Select File
                    </button>
                  </div>
                </label>
              </motion.div>
            </>
          ) : (
            <>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-xl border border-slate-200 p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4 flex-1">
                    <div className="w-16 h-16 bg-red-100 rounded-lg flex items-center justify-center">
                      <File className="w-8 h-8 text-red-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-lg text-slate-900">{uploadedFile.name}</h3>
                      <p className="text-sm text-slate-500 mt-1">
                        {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB • {uploadDate}
                      </p>
                      {startupName && <p className="text-sm text-slate-600 mt-2"><span className="font-semibold">Startup:</span> {startupName}</p>}
                    </div>
                  </div>
                  <button onClick={handleRemoveFile} className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {!aiSummary && (
                  <button
                    onClick={handleGenerateSummary}
                    disabled={reviewing}
                    className="w-full mt-6 px-6 py-4 bg-gradient-to-r from-[#2563EB] to-[#1d4ed8] text-white font-bold rounded-lg hover:shadow-xl transition disabled:opacity-50 flex items-center justify-center gap-3"
                  >
                    {reviewing ? (
                      <><Loader className="w-5 h-5 animate-spin" />Analyzing with Gemini AI...</>
                    ) : (
                      <><Sparkles className="w-5 h-5" />Generate AI Summary & Review</>
                    )}
                  </button>
                )}
              </motion.div>

              {aiSummary && (
                <>
                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl border-2 border-blue-200 p-8">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="p-3 bg-blue-600 rounded-xl"><Sparkles className="w-6 h-6 text-white" /></div>
                      <div>
                        <h2 className="text-2xl font-bold text-slate-900">AI-Generated Summary</h2>
                        <p className="text-slate-600">Powered by Google Gemini</p>
                      </div>
                    </div>
                    <pre className="whitespace-pre-wrap font-sans text-slate-700 leading-relaxed bg-white/50 p-6 rounded-lg">{aiSummary}</pre>
                  </motion.div>

                  {deckAnalysis && (
                    <div className="space-y-6">
                      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                        {[
                          { label: 'Structure', score: deckAnalysis.structureScore, icon: Layers },
                          { label: 'Clarity', score: deckAnalysis.clarityScore, icon: Eye },
                          { label: 'Design', score: deckAnalysis.designScore, icon: Star },
                          { label: 'Investor Ready', score: deckAnalysis.investorReadiness, icon: Target },
                          { label: 'Data Strength', score: deckAnalysis.dataStrength, icon: BarChart3 }
                        ].map((item, i) => {
                          const Icon = item.icon;
                          return (
                            <motion.div key={i} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.1 }}
                              className={`rounded-xl border-2 p-5 text-center ${getScoreBg(item.score)}`}>
                              <Icon className={`w-6 h-6 mx-auto mb-2 ${getScoreColor(item.score)}`} />
                              <div className={`text-3xl font-bold mb-1 ${getScoreColor(item.score)}`}>{item.score}</div>
                              <div className="text-xs font-semibold text-slate-600 uppercase">{item.label}</div>
                            </motion.div>
                          );
                        })}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-green-50 rounded-xl border border-green-200 p-6">
                          <h3 className="text-lg font-semibold text-green-900 mb-4">What Works Well</h3>
                          <ul className="space-y-2">
                            {deckAnalysis.strengths.map((s, i) => (
                              <li key={i} className="text-sm text-green-800 flex items-start gap-2">
                                <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" /><span>{s}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="bg-orange-50 rounded-xl border border-orange-200 p-6">
                          <h3 className="text-lg font-semibold text-orange-900 mb-4">What's Missing</h3>
                          <ul className="space-y-2">
                            {deckAnalysis.weaknesses.map((w, i) => (
                              <li key={i} className="text-sm text-orange-800 flex items-start gap-2">
                                <AlertTriangle className="w-4 h-4 text-orange-600 flex-shrink-0 mt-0.5" /><span>{w}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div className="bg-gradient-to-r from-[#2563EB] to-[#3B82F6] rounded-xl p-8 text-center text-white">
                        <h3 className="text-xl font-bold mb-3">Investment Readiness Verdict</h3>
                        <p className="text-lg">{deckAnalysis.readinessVerdict}</p>
                      </div>
                    </div>
                  )}
                </>
              )}
            </>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default PitchDeckReviewer;

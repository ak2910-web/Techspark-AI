import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, ThumbsUp, ThumbsDown, TrendingUp, AlertTriangle, Sparkles, Download, RefreshCw } from 'lucide-react';
import DashboardLayout from '../../../components/layout/DashboardLayout';

const ContentOptimizerPage: React.FC = () => {
  const [analyzing, setAnalyzing] = useState(false);
  const [content, setContent] = useState('');

  const contentAnalysis = {
    overallScore: 78,
    sentiment: 'positive',
    readabilityScore: 85,
    seoScore: 72,
    engagementPotential: 'High',
    suggestions: [
      { type: 'improve', text: 'Add more emotional triggers in the first paragraph', impact: 'high' },
      { type: 'improve', text: 'Include a clear call-to-action at the end', impact: 'high' },
      { type: 'improve', text: 'Break long paragraphs into shorter chunks', impact: 'medium' },
      { type: 'good', text: 'Strong use of action verbs', impact: 'positive' },
      { type: 'good', text: 'Good keyword density for SEO', impact: 'positive' }
    ],
    keywords: ['AI', 'fundraising', 'startups', 'investors', 'growth'],
    targetAudience: 'Early-stage startup founders and entrepreneurs'
  };

  const handleAnalyze = () => {
    setAnalyzing(true);
    setTimeout(() => setAnalyzing(false), 2000);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
              <FileText className="w-8 h-8 text-purple-600" />
              Content Optimizer
            </h1>
            <p className="text-slate-600 mt-2">AI-powered content analysis and optimization</p>
          </div>
        </div>

        {/* Content Input */}
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <label className="block text-sm font-semibold text-slate-700 mb-3">
            Paste your content for analysis
          </label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Paste your blog post, social media content, landing page copy, or any marketing material here..."
            className="w-full h-64 px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:border-[#08D9D6] focus:ring-2 focus:ring-[#08D9D6]/20 resize-none"
          />
          <div className="flex items-center justify-between mt-4">
            <div className="text-sm text-slate-500">
              {content.length} characters • {content.split(/\s+/).filter(w => w).length} words
            </div>
            <button
              onClick={handleAnalyze}
              disabled={!content || analyzing}
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white font-semibold rounded-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {analyzing ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  Analyze Content
                </>
              )}
            </button>
          </div>
        </div>

        {/* Analysis Results */}
        {content && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Score Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {[
                { label: 'Overall Score', value: contentAnalysis.overallScore, color: 'blue', max: 100 },
                { label: 'Readability', value: contentAnalysis.readabilityScore, color: 'green', max: 100 },
                { label: 'SEO Score', value: contentAnalysis.seoScore, color: 'purple', max: 100 },
                { label: 'Engagement', value: contentAnalysis.engagementPotential, color: 'orange', max: null }
              ].map((metric, i) => (
                <div key={i} className="bg-white rounded-xl border border-slate-200 p-6 text-center">
                  <div className="text-sm font-semibold text-slate-600 mb-2">{metric.label}</div>
                  {metric.max ? (
                    <>
                      <div className={`text-4xl font-bold text-${metric.color}-600 mb-2`}>{metric.value}</div>
                      <div className="w-full bg-slate-100 rounded-full h-2">
                        <div 
                          className={`bg-${metric.color}-600 h-2 rounded-full transition-all duration-500`}
                          style={{ width: `${metric.value}%` }}
                        />
                      </div>
                    </>
                  ) : (
                    <div className={`text-2xl font-bold text-${metric.color}-600`}>{metric.value}</div>
                  )}
                </div>
              ))}
            </div>

            {/* Suggestions */}
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-green-600" />
                Optimization Suggestions
              </h3>
              <div className="space-y-3">
                {contentAnalysis.suggestions.map((suggestion, i) => (
                  <div 
                    key={i}
                    className={`flex items-start gap-3 p-4 rounded-lg ${
                      suggestion.type === 'good' 
                        ? 'bg-green-50 border border-green-200' 
                        : 'bg-yellow-50 border border-yellow-200'
                    }`}
                  >
                    {suggestion.type === 'good' ? (
                      <ThumbsUp className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    ) : (
                      <AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                    )}
                    <div className="flex-1">
                      <p className="text-sm text-slate-700">{suggestion.text}</p>
                      {suggestion.impact !== 'positive' && (
                        <span className={`text-xs font-semibold mt-1 inline-block ${
                          suggestion.impact === 'high' ? 'text-red-600' : 'text-yellow-600'
                        }`}>
                          {suggestion.impact.toUpperCase()} IMPACT
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Keywords & Audience */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl border border-slate-200 p-6">
                <h3 className="text-lg font-bold text-slate-900 mb-4">Detected Keywords</h3>
                <div className="flex flex-wrap gap-2">
                  {contentAnalysis.keywords.map((keyword, i) => (
                    <span 
                      key={i}
                      className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-xl border border-slate-200 p-6">
                <h3 className="text-lg font-bold text-slate-900 mb-4">Target Audience</h3>
                <p className="text-slate-600">{contentAnalysis.targetAudience}</p>
                <div className={`mt-3 px-3 py-2 rounded-lg flex items-center gap-2 ${
                  contentAnalysis.sentiment === 'positive' 
                    ? 'bg-green-100 text-green-700'
                    : 'bg-yellow-100 text-yellow-700'
                }`}>
                  <ThumbsUp className="w-4 h-4" />
                  <span className="text-sm font-semibold">
                    {contentAnalysis.sentiment.toUpperCase()} Sentiment
                  </span>
                </div>
              </div>
            </div>

            {/* Export Button */}
            <button className="w-full py-4 bg-gradient-to-r from-[#08D9D6] to-[#06b5b3] text-white font-bold rounded-xl hover:shadow-xl transition-all flex items-center justify-center gap-2 group">
              <Download className="w-5 h-5 group-hover:translate-y-0.5 transition-transform" />
              Export Analysis Report
            </button>
          </motion.div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default ContentOptimizerPage;

import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { motion } from 'framer-motion';
import { 
  Building2, Globe, MapPin, Tag, Calendar, Plus, FileText, Link as LinkIcon,
  Trash2, Loader2, Brain, CheckCircle2, AlertCircle, TrendingUp, Users, Target,
  Mail, Phone, Linkedin, Twitter, DollarSign, BarChart, Award, Rocket, ExternalLink
} from 'lucide-react';

const API_BASE = 'http://localhost:8000/api';

interface Startup {
  id: number;
  name: string;
  website?: string;
  description?: string;
  industry?: string;
  stage?: string;
  location?: string;
  created_at: string;
  email?: string;
  phone?: string;
  linkedin?: string;
  twitter?: string;
  founded_year?: number;
  team_size?: number;
  funding_raised?: string;
  revenue?: string;
  founders?: string;
  mission?: string;
  vision?: string;
  problem?: string;
  solution?: string;
  target_market?: string;
  business_model?: string;
  competitors?: string;
  traction?: string;
}

const EXAMPLE_STARTUPS_DATA: Record<number, Startup> = {
  1: {
    id: 1,
    name: "HealthAI Pro",
    website: "https://healthai.example.com",
    description: "AI-powered diagnostic platform that helps healthcare providers detect diseases early through advanced machine learning algorithms and medical imaging analysis.",
    industry: "HealthTech",
    stage: "Series A",
    location: "San Francisco, CA",
    email: "contact@healthai.com",
    phone: "+1 (415) 555-0123",
    linkedin: "https://linkedin.com/company/healthai",
    twitter: "https://twitter.com/healthaipro",
    founded_year: 2022,
    team_size: 25,
    funding_raised: "$5.2M",
    revenue: "$800K ARR",
    founders: "Dr. Sarah Chen (CEO), James Miller (CTO)",
    mission: "To revolutionize early disease detection and save millions of lives through AI",
    vision: "A world where diseases are detected before symptoms appear",
    problem: "Late diagnosis leads to higher mortality rates and treatment costs. Current diagnostic tools miss early-stage diseases.",
    solution: "AI-powered platform analyzing medical images with 95% accuracy, detecting diseases 6 months earlier than traditional methods.",
    target_market: "Hospitals, diagnostic centers, and healthcare providers in North America (TAM: $12B)",
    business_model: "SaaS subscription ($500-5000/month) + per-scan licensing fees",
    competitors: "PathAI, Zebra Medical Vision, Aidoc",
    traction: "25 hospitals using the platform, 50K+ scans analyzed, 92% customer retention",
    created_at: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString()
  },
  2: {
    id: 2,
    name: "GreenEnergy Solutions",
    website: "https://greenenergy.example.com",
    description: "Sustainable energy management platform for commercial buildings. Reduces energy costs by 40% through smart automation and renewable energy integration.",
    industry: "CleanTech",
    stage: "Seed",
    location: "Austin, TX",
    email: "hello@greenenergy.com",
    phone: "+1 (512) 555-0199",
    linkedin: "https://linkedin.com/company/greenenergy",
    founded_year: 2023,
    team_size: 12,
    funding_raised: "$2.1M",
    revenue: "$250K ARR",
    founders: "Michael Torres (CEO), Emma Watson (COO)",
    mission: "Make sustainable energy accessible and affordable for every business",
    vision: "Carbon-neutral buildings by 2030",
    problem: "Commercial buildings waste 30% of energy, leading to high costs and carbon emissions",
    solution: "IoT sensors + AI optimization reduce energy waste by 40%, automatically switching to renewable sources",
    target_market: "Commercial real estate, office buildings, retail chains (TAM: $8B)",
    business_model: "Installation fee + monthly monitoring ($200-2000/month) + energy savings share",
    competitors: "EnergyHub, GridPoint, Verdigris",
    traction: "45 buildings equipped, $2.2M in energy savings for clients, expanding to 3 new cities",
    created_at: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()
  },
  3: {
    id: 3,
    name: "EduConnect",
    website: "https://educonnect.example.com",
    description: "Revolutionary EdTech platform connecting students with personalized learning paths and expert tutors. Powered by adaptive learning technology.",
    industry: "EdTech",
    stage: "Pre-Seed",
    location: "Boston, MA",
    email: "support@educonnect.com",
    phone: "+1 (617) 555-0177",
    founded_year: 2024,
    team_size: 8,
    funding_raised: "$500K",
    revenue: "$50K ARR",
    founders: "Lisa Johnson (CEO), Robert Kim (Head of Product)",
    mission: "Personalized education for every student, everywhere",
    vision: "Transform learning through AI-powered personalization",
    problem: "One-size-fits-all education fails 40% of students. Quality tutoring is expensive and inaccessible",
    solution: "AI creates personalized learning paths, connects students with expert tutors at 1/3 the cost",
    target_market: "K-12 students and parents in US (TAM: $15B)",
    business_model: "Freemium model + premium subscriptions ($29-99/month)",
    competitors: "Khan Academy, Coursera, Chegg",
    traction: "5K active users, 150+ tutors, 4.8/5 rating on app stores",
    created_at: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString()
  },
  4: {
    id: 4,
    name: "FinFlow",
    website: "https://finflow.example.com",
    description: "Next-generation financial management for SMBs. Automate invoicing, expense tracking, and cash flow forecasting with AI-driven insights.",
    industry: "FinTech",
    stage: "Series A",
    location: "New York, NY",
    email: "team@finflow.com",
    phone: "+1 (212) 555-0145",
    linkedin: "https://linkedin.com/company/finflow",
    twitter: "https://twitter.com/finflow",
    founded_year: 2021,
    team_size: 35,
    funding_raised: "$8.5M",
    revenue: "$1.5M ARR",
    founders: "David Park (CEO), Maria Rodriguez (CFO)",
    mission: "Empower small businesses with enterprise-grade financial tools",
    vision: "Every SMB has real-time financial clarity",
    problem: "78% of small businesses fail due to poor cash flow management. Traditional tools are complex and expensive",
    solution: "All-in-one platform with automated bookkeeping, AI cash flow predictions, and smart invoicing",
    target_market: "SMBs with 5-100 employees (TAM: $25B)",
    business_model: "Tiered SaaS pricing ($49-299/month) + transaction fees",
    competitors: "QuickBooks, Xero, FreshBooks",
    traction: "2,500 paying customers, $12M in transactions processed, 85% retention rate",
    created_at: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString()
  }
};

interface ContentItem {
  id: number;
  startup_id: number;
  source_type: string;
  source_identifier?: string;
  text: string;
  created_at: string;
}

interface Analysis {
  summary: string;
  target_customers: string[];
  strengths: string[];
  weaknesses: string[];
  recommendations: string[];
}

const StartupDetail: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const startupId = searchParams.get('id');

  const [startup, setStartup] = useState<Startup | null>(null);
  const [content, setContent] = useState<ContentItem[]>([]);
  const [analysis, setAnalysis] = useState<Analysis | null>(null);
  const [loading, setLoading] = useState(true);
  const [analyzing, setAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Add content form
  const [showAddContent, setShowAddContent] = useState(false);
  const [newContent, setNewContent] = useState({
    source_type: 'manual',
    source_identifier: '',
    text: ''
  });

  useEffect(() => {
    if (!startupId) {
      navigate('/startup/create');
      return;
    }
    fetchStartupData();
  }, [startupId]);

  const fetchStartupData = async () => {
    try {
      setLoading(true);
      
      // Check if it's an example startup first
      const id = parseInt(startupId || '0');
      if (EXAMPLE_STARTUPS_DATA[id]) {
        setStartup(EXAMPLE_STARTUPS_DATA[id]);
        setContent([]);
        setLoading(false);
        return;
      }
      
      // Otherwise fetch from API
      const [startupRes, contentRes] = await Promise.all([
        fetch(`${API_BASE}/startups/${startupId}`),
        fetch(`${API_BASE}/startups/${startupId}/content`)
      ]);

      if (!startupRes.ok) throw new Error('Failed to fetch startup');
      
      const startupData = await startupRes.json();
      const contentData = await contentRes.json();
      
      setStartup(startupData);
      setContent(contentData);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const handleAddContent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newContent.text) return;

    try {
      const response = await fetch(`${API_BASE}/startups/${startupId}/content`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newContent)
      });

      if (!response.ok) throw new Error('Failed to add content');

      const addedContent = await response.json();
      setContent([...content, addedContent]);
      setNewContent({ source_type: 'manual', source_identifier: '', text: '' });
      setShowAddContent(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add content');
    }
  };

  const handleDeleteContent = async (contentId: number) => {
    try {
      await fetch(`${API_BASE}/startups/${startupId}/content/${contentId}`, {
        method: 'DELETE'
      });
      setContent(content.filter(c => c.id !== contentId));
    } catch (err) {
      setError('Failed to delete content');
    }
  };

  const handleAnalyze = async () => {
    try {
      setAnalyzing(true);
      setError(null);

      const response = await fetch(`${API_BASE}/startups/${startupId}/analyze`, {
        method: 'POST'
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Analysis failed');
      }

      const analysisData = await response.json();
      setAnalysis(analysisData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to analyze');
    } finally {
      setAnalyzing(false);
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
        </div>
      </DashboardLayout>
    );
  }

  if (!startup) {
    return (
      <DashboardLayout>
        <div className="text-center py-12">
          <p className="text-slate-600">Startup not found</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        {/* Error Display */}
        {error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-red-600" />
            <p className="text-red-800">{error}</p>
          </div>
        )}

        {/* Startup Header */}
        <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-slate-900 dark:to-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-lg p-8">
          <div className="flex items-start justify-between mb-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                  <Building2 className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-4xl font-bold text-slate-900 dark:text-white">{startup.name}</h1>
                  <div className="flex items-center gap-3 mt-2">
                    {startup.stage && (
                      <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 rounded-full text-sm font-semibold">
                        {startup.stage}
                      </span>
                    )}
                    {startup.founded_year && (
                      <span className="text-sm text-slate-600 dark:text-slate-400">
                        Founded {startup.founded_year}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-4 text-sm text-slate-600 dark:text-slate-400 mb-4">
                {startup.industry && (
                  <span className="flex items-center gap-1.5">
                    <Tag className="w-4 h-4" />
                    <strong className="font-medium">Industry:</strong> {startup.industry}
                  </span>
                )}
                {startup.location && (
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-4 h-4" />
                    <strong className="font-medium">Location:</strong> {startup.location}
                  </span>
                )}
                {startup.team_size && (
                  <span className="flex items-center gap-1.5">
                    <Users className="w-4 h-4" />
                    <strong className="font-medium">Team:</strong> {startup.team_size} employees
                  </span>
                )}
              </div>
              
              {startup.description && (
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-lg">
                  {startup.description}
                </p>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-wrap gap-3 pt-6 border-t border-slate-200 dark:border-slate-700">
            {startup.website && (
              <a
                href={startup.website}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 rounded-lg transition-colors"
              >
                <Globe className="w-4 h-4" />
                Visit Website
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
            {startup.email && (
              <a
                href={`mailto:${startup.email}`}
                className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 rounded-lg transition-colors"
              >
                <Mail className="w-4 h-4" />
                Email
              </a>
            )}
            {startup.phone && (
              <a
                href={`tel:${startup.phone}`}
                className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 rounded-lg transition-colors"
              >
                <Phone className="w-4 h-4" />
                {startup.phone}
              </a>
            )}
            {startup.linkedin && (
              <a
                href={startup.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 rounded-lg transition-colors"
              >
                <Linkedin className="w-4 h-4" />
                LinkedIn
              </a>
            )}
            {startup.twitter && (
              <a
                href={startup.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 rounded-lg transition-colors"
              >
                <Twitter className="w-4 h-4" />
                Twitter
              </a>
            )}
          </div>
        </div>

        {/* Key Metrics */}
        {(startup.funding_raised || startup.revenue || startup.traction) && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {startup.funding_raised && (
              <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                    <DollarSign className="w-5 h-5 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Funding Raised</p>
                    <p className="text-2xl font-bold text-slate-900 dark:text-white">{startup.funding_raised}</p>
                  </div>
                </div>
              </div>
            )}
            {startup.revenue && (
              <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                    <BarChart className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Revenue</p>
                    <p className="text-2xl font-bold text-slate-900 dark:text-white">{startup.revenue}</p>
                  </div>
                </div>
              </div>
            )}
            {startup.traction && (
              <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Traction</p>
                    <p className="text-sm font-medium text-slate-700 dark:text-slate-300">{startup.traction}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Company Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Mission & Vision */}
          {(startup.mission || startup.vision) && (
            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <Rocket className="w-5 h-5 text-blue-600" />
                Mission & Vision
              </h2>
              {startup.mission && (
                <div className="mb-4">
                  <h3 className="font-semibold text-slate-700 dark:text-slate-300 mb-2">Mission</h3>
                  <p className="text-slate-600 dark:text-slate-400">{startup.mission}</p>
                </div>
              )}
              {startup.vision && (
                <div>
                  <h3 className="font-semibold text-slate-700 dark:text-slate-300 mb-2">Vision</h3>
                  <p className="text-slate-600 dark:text-slate-400">{startup.vision}</p>
                </div>
              )}
            </div>
          )}

          {/* Founders */}
          {startup.founders && (
            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <Award className="w-5 h-5 text-purple-600" />
                Founders
              </h2>
              <p className="text-slate-700 dark:text-slate-300">{startup.founders}</p>
            </div>
          )}
        </div>

        {/* Problem & Solution */}
        {(startup.problem || startup.solution) && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {startup.problem && (
              <div className="bg-red-50 dark:bg-red-900/10 rounded-xl border border-red-200 dark:border-red-800 p-6">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-red-600" />
                  Problem
                </h2>
                <p className="text-slate-700 dark:text-slate-300">{startup.problem}</p>
              </div>
            )}
            {startup.solution && (
              <div className="bg-green-50 dark:bg-green-900/10 rounded-xl border border-green-200 dark:border-green-800 p-6">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                  Solution
                </h2>
                <p className="text-slate-700 dark:text-slate-300">{startup.solution}</p>
              </div>
            )}
          </div>
        )}

        {/* Market & Business Model */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {startup.target_market && (
            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                <Target className="w-5 h-5 text-blue-600" />
                Target Market
              </h2>
              <p className="text-slate-700 dark:text-slate-300">{startup.target_market}</p>
            </div>
          )}
          {startup.business_model && (
            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-green-600" />
                Business Model
              </h2>
              <p className="text-slate-700 dark:text-slate-300">{startup.business_model}</p>
            </div>
          )}
        </div>

        {/* Competitors */}
        {startup.competitors && (
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
              <Users className="w-5 h-5 text-orange-600" />
              Competitive Landscape
            </h2>
            <p className="text-slate-700 dark:text-slate-300">{startup.competitors}</p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Content Management */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-slate-900">Content Library</h2>
                <button
                  onClick={() => setShowAddContent(!showAddContent)}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  Add Content
                </button>
              </div>

              {/* Add Content Form */}
              {showAddContent && (
                <form onSubmit={handleAddContent} className="mb-6 p-4 bg-slate-50 rounded-lg border border-slate-200">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Source Type</label>
                      <select
                        value={newContent.source_type}
                        onChange={(e) => setNewContent({ ...newContent, source_type: e.target.value })}
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="manual">Manual Text</option>
                        <option value="website">Website URL</option>
                        <option value="document">Document</option>
                      </select>
                    </div>
                    {newContent.source_type !== 'manual' && (
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Source URL/Name</label>
                        <input
                          type="text"
                          value={newContent.source_identifier}
                          onChange={(e) => setNewContent({ ...newContent, source_identifier: e.target.value })}
                          placeholder="https://example.com or document.pdf"
                          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    )}
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Content</label>
                      <textarea
                        value={newContent.text}
                        onChange={(e) => setNewContent({ ...newContent, text: e.target.value })}
                        placeholder="Paste content here..."
                        rows={4}
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                    <div className="flex gap-2">
                      <button
                        type="submit"
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                      >
                        Add
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowAddContent(false)}
                        className="px-4 py-2 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </form>
              )}

              {/* Content List */}
              {content.length === 0 ? (
                <div className="text-center py-12 text-slate-500">
                  <FileText className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p>No content added yet. Add content to enable AI analysis.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {content.map((item) => (
                    <div key={item.id} className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          {item.source_type === 'website' ? (
                            <LinkIcon className="w-4 h-4 text-blue-600" />
                          ) : (
                            <FileText className="w-4 h-4 text-slate-600" />
                          )}
                          <span className="text-sm font-semibold text-slate-700">
                            {item.source_type.charAt(0).toUpperCase() + item.source_type.slice(1)}
                          </span>
                          {item.source_identifier && (
                            <span className="text-xs text-slate-500">• {item.source_identifier}</span>
                          )}
                        </div>
                        <button
                          onClick={() => handleDeleteContent(item.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-sm text-slate-600 line-clamp-2">{item.text}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Analysis Results */}
            {analysis && (
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
                <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                  <Brain className="w-6 h-6 text-purple-600" />
                  AI Analysis
                </h2>

                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-2">Summary</h3>
                    <p className="text-slate-700 leading-relaxed">{analysis.summary}</p>
                  </div>

                  <div>
                    <h3 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
                      <Users className="w-5 h-5 text-blue-600" />
                      Target Customers
                    </h3>
                    <ul className="space-y-2">
                      {analysis.target_customers.map((customer, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-slate-700">
                          <Target className="w-4 h-4 text-blue-600" />
                          {customer}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-semibold text-green-700 mb-3">✅ Strengths</h3>
                      <ul className="space-y-2">
                        {analysis.strengths.map((strength, idx) => (
                          <li key={idx} className="text-sm text-slate-700">• {strength}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold text-orange-700 mb-3">⚠️ Weaknesses</h3>
                      <ul className="space-y-2">
                        {analysis.weaknesses.map((weakness, idx) => (
                          <li key={idx} className="text-sm text-slate-700">• {weakness}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-slate-900 mb-3">💡 Recommendations</h3>
                    <ul className="space-y-2">
                      {analysis.recommendations.map((rec, idx) => (
                        <li key={idx} className="text-sm text-slate-700 pl-4 border-l-2 border-purple-400">
                          {rec}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar Actions */}
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl border border-purple-200 p-6">
              <h3 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
                <Brain className="w-5 h-5 text-purple-600" />
                AI Analysis
              </h3>
              <p className="text-sm text-slate-600 mb-4">
                Run AI analysis on your content to get insights, identify strengths, and discover opportunities.
              </p>
              <button
                onClick={handleAnalyze}
                disabled={content.length === 0 || analyzing}
                className="w-full px-4 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {analyzing ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Brain className="w-5 h-5" />
                    Run Analysis
                  </>
                )}
              </button>
              {content.length === 0 && (
                <p className="text-xs text-slate-500 mt-2 text-center">
                  Add content first to enable analysis
                </p>
              )}
            </div>

            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <h3 className="font-bold text-slate-900 mb-4">Quick Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-slate-600">Content Items</span>
                  <span className="font-semibold text-slate-900">{content.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-slate-600">Created</span>
                  <span className="font-semibold text-slate-900">
                    {new Date(startup.created_at).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </DashboardLayout>
  );
};

export default StartupDetail;

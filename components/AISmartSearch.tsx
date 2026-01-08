import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Sparkles, TrendingUp, Users, FileText, Target, X, Loader } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

interface SearchResult {
  id: string;
  title: string;
  description: string;
  category: 'investor' | 'startup' | 'content' | 'resource';
  relevanceScore: number;
  icon: any;
  metadata?: {
    location?: string;
    industry?: string;
    stage?: string;
    fundingRange?: string;
  };
}

export default function AISmartSearch() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const searchInputRef = useRef<HTMLInputElement>(null);
  const { isDarkMode } = useTheme();

  useEffect(() => {
    if (isExpanded && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isExpanded]);

  // Simulated Azure AI Search - In production, this would call Azure AI Search API
  const performAISearch = async (query: string): Promise<SearchResult[]> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));

    const lowerQuery = query.toLowerCase();
    const mockResults: SearchResult[] = [];

    // Smart semantic search results based on query
    if (lowerQuery.includes('seed') || lowerQuery.includes('early') || lowerQuery.includes('investor')) {
      mockResults.push({
        id: '1',
        title: 'Sequoia Capital',
        description: 'Leading venture capital firm investing in seed to growth-stage technology companies. Portfolio includes Apple, Google, Airbnb.',
        category: 'investor',
        relevanceScore: 98,
        icon: Users,
        metadata: {
          location: 'Silicon Valley, CA',
          industry: 'Multi-sector',
          stage: 'Seed to Series C',
          fundingRange: '$100K - $100M'
        }
      });
      mockResults.push({
        id: '2',
        title: 'Andreessen Horowitz (a16z)',
        description: 'Venture capital firm backing bold entrepreneurs building the future through technology.',
        category: 'investor',
        relevanceScore: 95,
        icon: Users,
        metadata: {
          location: 'Menlo Park, CA',
          industry: 'Tech, Crypto, Bio',
          stage: 'Seed to Growth',
          fundingRange: '$50K - $50M'
        }
      });
    }

    if (lowerQuery.includes('pitch') || lowerQuery.includes('deck') || lowerQuery.includes('presentation')) {
      mockResults.push({
        id: '3',
        title: 'Ultimate Pitch Deck Guide',
        description: 'Comprehensive guide to creating investor-ready pitch decks. Includes templates, examples, and best practices from successful fundraises.',
        category: 'resource',
        relevanceScore: 92,
        icon: FileText,
        metadata: {}
      });
      mockResults.push({
        id: '4',
        title: 'AI Pitch Deck Analyzer',
        description: 'Get instant AI-powered feedback on your pitch deck. Upload your slides and receive detailed analysis in under 60 seconds.',
        category: 'resource',
        relevanceScore: 90,
        icon: Sparkles,
        metadata: {}
      });
    }

    if (lowerQuery.includes('startup') || lowerQuery.includes('company') || lowerQuery.includes('saas')) {
      mockResults.push({
        id: '5',
        title: 'TechFlow AI',
        description: 'SaaS platform for workflow automation. Series A funded, $2M raised, 50K+ users, 300% YoY growth.',
        category: 'startup',
        relevanceScore: 88,
        icon: Target,
        metadata: {
          location: 'San Francisco, CA',
          industry: 'SaaS, AI',
          stage: 'Series A',
          fundingRange: '$2M'
        }
      });
    }

    if (lowerQuery.includes('content') || lowerQuery.includes('marketing') || lowerQuery.includes('social')) {
      mockResults.push({
        id: '6',
        title: 'Content Intelligence Dashboard',
        description: 'Analyze social media sentiment and optimize your content strategy with AI-powered insights.',
        category: 'content',
        relevanceScore: 85,
        icon: TrendingUp,
        metadata: {}
      });
    }

    if (lowerQuery.includes('funding') || lowerQuery.includes('raise') || lowerQuery.includes('capital')) {
      mockResults.push({
        id: '7',
        title: 'Fundraising Strategies 2026',
        description: 'Latest trends and strategies for successful fundraising in 2026. Learn what investors are looking for.',
        category: 'resource',
        relevanceScore: 87,
        icon: FileText,
        metadata: {}
      });
    }

    // If no specific matches, return general results
    if (mockResults.length === 0 && query.length > 2) {
      mockResults.push(
        {
          id: '8',
          title: 'Getting Started with FundSpark',
          description: 'Complete guide to using FundSpark AI for investor matching, pitch deck analysis, and growth analytics.',
          category: 'resource',
          relevanceScore: 75,
          icon: FileText,
          metadata: {}
        },
        {
          id: '9',
          title: 'Top 100 Seed Investors',
          description: 'Curated list of the most active seed-stage investors in tech, with investment criteria and contact information.',
          category: 'investor',
          relevanceScore: 70,
          icon: Users,
          metadata: {}
        }
      );
    }

    return mockResults.sort((a, b) => b.relevanceScore - a.relevanceScore);
  };

  const handleSearch = async () => {
    if (searchQuery.length < 2) return;

    setIsSearching(true);
    try {
      const searchResults = await performAISearch(searchQuery);
      setResults(searchResults);
    } catch (error) {
      console.error('Search error:', error);
      setResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  useEffect(() => {
    if (searchQuery.length >= 2) {
      const debounceTimer = setTimeout(() => {
        handleSearch();
      }, 500);
      return () => clearTimeout(debounceTimer);
    } else {
      setResults([]);
    }
  }, [searchQuery]);

  const categories = [
    { id: 'all', label: 'All', icon: Sparkles },
    { id: 'investor', label: 'Investors', icon: Users },
    { id: 'startup', label: 'Startups', icon: Target },
    { id: 'content', label: 'Content', icon: TrendingUp },
    { id: 'resource', label: 'Resources', icon: FileText }
  ];

  const filteredResults = selectedCategory === 'all' 
    ? results 
    : results.filter(r => r.category === selectedCategory);

  const getCategoryColor = (category: string) => {
    const colors = {
      investor: 'blue',
      startup: 'purple',
      content: 'pink',
      resource: 'green'
    };
    return colors[category as keyof typeof colors] || 'slate';
  };

  return (
    <div className="relative">
      {/* Search Button/Bar */}
      <motion.div
        className={`${
          isExpanded ? 'w-full' : 'w-auto'
        } transition-all duration-300`}
      >
        <div
          className={`relative flex items-center ${
            isDarkMode ? 'bg-slate-800' : 'bg-white'
          } rounded-full ${
            isExpanded ? 'shadow-2xl border-2 border-blue-500' : 'shadow-lg'
          } transition-all duration-300`}
        >
          {/* Search Icon */}
          <div className={`flex items-center justify-center w-12 h-12 ${
            isExpanded ? '' : 'cursor-pointer'
          }`} onClick={() => !isExpanded && setIsExpanded(true)}>
            {isSearching ? (
              <Loader className="w-5 h-5 text-blue-600 animate-spin" />
            ) : (
              <Search className={`w-5 h-5 ${
                isExpanded ? 'text-blue-600' : isDarkMode ? 'text-slate-400' : 'text-slate-600'
              }`} />
            )}
          </div>

          {/* Search Input */}
          <AnimatePresence>
            {isExpanded && (
              <motion.input
                ref={searchInputRef}
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: '100%', opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search investors, startups, resources..."
                className={`flex-1 px-4 py-3 ${
                  isDarkMode ? 'bg-slate-800 text-white placeholder-slate-400' : 'bg-white text-slate-900 placeholder-slate-500'
                } focus:outline-none rounded-full`}
              />
            )}
          </AnimatePresence>

          {/* AI Badge */}
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs font-medium rounded-full mr-2"
            >
              <Sparkles className="w-3 h-3" />
              <span>MS Azure AI</span>
            </motion.div>
          )}

          {/* Close Button */}
          {isExpanded && (
            <motion.button
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              onClick={() => {
                setIsExpanded(false);
                setSearchQuery('');
                setResults([]);
              }}
              className={`w-10 h-10 flex items-center justify-center rounded-full ${
                isDarkMode ? 'hover:bg-slate-700' : 'hover:bg-slate-100'
              } transition-colors mr-1`}
            >
              <X className="w-5 h-5" />
            </motion.button>
          )}
        </div>
      </motion.div>

      {/* Search Results Dropdown */}
      <AnimatePresence>
        {isExpanded && (searchQuery.length >= 2 || results.length > 0) && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={`absolute top-full mt-2 w-full ${
              isDarkMode ? 'bg-slate-800' : 'bg-white'
            } rounded-2xl shadow-2xl overflow-hidden z-50 max-h-[600px] flex flex-col`}
          >
            {/* Category Filters */}
            <div className={`p-4 border-b ${
              isDarkMode ? 'border-slate-700' : 'border-slate-200'
            }`}>
              <div className="flex gap-2 overflow-x-auto">
                {categories.map((cat) => {
                  const Icon = cat.icon;
                  return (
                    <motion.button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                        selectedCategory === cat.id
                          ? 'bg-blue-600 text-white'
                          : isDarkMode
                            ? 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                            : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{cat.label}</span>
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* Results */}
            <div className="flex-1 overflow-y-auto">
              {isSearching ? (
                <div className="p-8 flex flex-col items-center justify-center gap-4">
                  <Loader className="w-8 h-8 text-blue-600 animate-spin" />
                  <p className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                    Searching with AI...
                  </p>
                </div>
              ) : filteredResults.length > 0 ? (
                <div className="p-2">
                  {filteredResults.map((result, index) => {
                    const Icon = result.icon;
                    const color = getCategoryColor(result.category);
                    return (
                      <motion.div
                        key={result.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className={`p-4 rounded-xl ${
                          isDarkMode ? 'hover:bg-slate-700' : 'hover:bg-slate-50'
                        } cursor-pointer transition-colors mb-2`}
                      >
                        <div className="flex gap-3">
                          <div className={`flex-shrink-0 w-10 h-10 bg-gradient-to-r from-${color}-500 to-${color}-600 rounded-full flex items-center justify-center`}>
                            <Icon className="w-5 h-5 text-white" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2">
                              <h4 className={`font-semibold ${
                                isDarkMode ? 'text-white' : 'text-slate-900'
                              }`}>
                                {result.title}
                              </h4>
                              <span className={`text-xs px-2 py-1 rounded-full bg-${color}-100 text-${color}-700 whitespace-nowrap`}>
                                {result.relevanceScore}% match
                              </span>
                            </div>
                            <p className={`text-sm mt-1 ${
                              isDarkMode ? 'text-slate-400' : 'text-slate-600'
                            }`}>
                              {result.description}
                            </p>
                            {result.metadata && Object.keys(result.metadata).length > 0 && (
                              <div className="flex flex-wrap gap-2 mt-2">
                                {Object.entries(result.metadata).map(([key, value]) => (
                                  value && (
                                    <span
                                      key={key}
                                      className={`text-xs px-2 py-1 rounded ${
                                        isDarkMode ? 'bg-slate-600 text-slate-300' : 'bg-slate-100 text-slate-600'
                                      }`}
                                    >
                                      {value}
                                    </span>
                                  )
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              ) : searchQuery.length >= 2 ? (
                <div className="p-8 text-center">
                  <Search className={`w-12 h-12 mx-auto mb-4 ${
                    isDarkMode ? 'text-slate-600' : 'text-slate-400'
                  }`} />
                  <p className={`font-medium ${
                    isDarkMode ? 'text-slate-300' : 'text-slate-700'
                  }`}>
                    No results found
                  </p>
                  <p className={`text-sm mt-1 ${
                    isDarkMode ? 'text-slate-500' : 'text-slate-600'
                  }`}>
                    Try different keywords or browse categories
                  </p>
                </div>
              ) : (
                <div className="p-8 text-center">
                  <Sparkles className={`w-12 h-12 mx-auto mb-4 ${
                    isDarkMode ? 'text-slate-600' : 'text-slate-400'
                  }`} />
                  <p className={`font-medium ${
                    isDarkMode ? 'text-slate-300' : 'text-slate-700'
                  }`}>
                    Microsoft Azure AI Search
                  </p>
                  <p className={`text-sm mt-1 ${
                    isDarkMode ? 'text-slate-500' : 'text-slate-600'
                  }`}>
                    Semantic search for investors, startups, content, and resources
                  </p>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className={`p-3 border-t ${
              isDarkMode ? 'border-slate-700 bg-slate-900' : 'border-slate-200 bg-slate-50'
            } flex items-center justify-center gap-2 text-xs ${
              isDarkMode ? 'text-slate-500' : 'text-slate-600'
            }`}>
              <Sparkles className="w-3 h-3" />
              <span>Powered by Microsoft Azure AI Search</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

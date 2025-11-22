import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Rocket,
  LayoutDashboard,
  Users,
  TrendingUp,
  Target,
  Lightbulb,
  FileText,
  Briefcase,
  Search,
  Building2,
  PieChart,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Home,
  PlusCircle
} from 'lucide-react';

interface NavItem {
  name: string;
  path: string;
  icon: React.ReactNode;
  badge?: string;
}

interface NavSection {
  title: string;
  items: NavItem[];
}

const Sidebar: React.FC = () => {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [activeSection, setActiveSection] = useState<'startup' | 'investor'>('startup');

  const startupNavigation: NavSection[] = [
    {
      title: 'Main',
      items: [
        { name: 'Home', path: '/', icon: <Home className="w-5 h-5" /> },
      ]
    },
    {
      title: 'Startup',
      items: [
        { name: 'Create Startup', path: '/startup/create', icon: <PlusCircle className="w-5 h-5" /> },
        { name: 'Startup Detail', path: '/startup/detail', icon: <Building2 className="w-5 h-5" /> },
        { name: 'Dashboard', path: '/startup/dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
        { name: 'Analysis', path: '/startup/analysis', icon: <TrendingUp className="w-5 h-5" /> },
        { name: 'Competitors', path: '/startup/competitors', icon: <Target className="w-5 h-5" /> },
        { name: 'Investor Matching', path: '/startup/investors', icon: <Users className="w-5 h-5" />, badge: '12' },
        { name: 'Recommendations', path: '/startup/recommendations', icon: <Lightbulb className="w-5 h-5" /> },
        { name: 'Content Manager', path: '/startup/content', icon: <FileText className="w-5 h-5" /> },
      ]
    }
  ];

  const investorNavigation: NavSection[] = [
    {
      title: 'Main',
      items: [
        { name: 'Home', path: '/', icon: <Home className="w-5 h-5" /> },
      ]
    },
    {
      title: 'Investor',
      items: [
        { name: 'Dashboard', path: '/investor/dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
        { name: 'Startup Explorer', path: '/investor/explorer', icon: <Search className="w-5 h-5" /> },
        { name: 'Startup Profile', path: '/investor/profile', icon: <Building2 className="w-5 h-5" /> },
        { name: 'Portfolio Tracker', path: '/investor/portfolio', icon: <PieChart className="w-5 h-5" /> },
        { name: 'Thesis Builder', path: '/investor/thesis', icon: <BookOpen className="w-5 h-5" /> },
      ]
    }
  ];

  const currentNavigation = activeSection === 'startup' ? startupNavigation : investorNavigation;

  const isActive = (path: string) => location.pathname === path;

  return (
    <motion.aside
      initial={{ x: -300 }}
      animate={{ x: 0, width: collapsed ? 80 : 280 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="fixed left-0 top-0 h-screen bg-white border-r border-slate-200 shadow-sm z-40 flex flex-col"
    >
      {/* Logo Section */}
      <Link to="/" className="h-20 flex items-center justify-between px-6 border-b border-slate-200 hover:bg-slate-50 transition-colors">
        <AnimatePresence mode="wait">
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="flex items-center gap-3"
            >
              <div className="bg-black p-2 rounded-lg">
                <svg className="w-5 h-5 text-white" viewBox="0 0 200 200" fill="currentColor">
                  <path d="M60 40 L130 40 L185 70 L185 80 L140 80 L140 100 L100 100 L100 80 L65 80 L65 70 Z M80 120 Q80 100 100 100 L120 100 Q140 100 140 120 L140 160 L100 160 L100 140 L80 140 Z M100 140 L120 140 L120 160 L100 160 Z" />
                </svg>
              </div>
              <span className="text-xl font-bold text-slate-900">TechSpark AI</span>
            </motion.div>
          )}
        </AnimatePresence>

        {collapsed && (
          <div className="bg-black p-2 rounded-lg mx-auto">
            <svg className="w-5 h-5 text-white" viewBox="0 0 200 200" fill="currentColor">
              <path d="M60 40 L130 40 L185 70 L185 80 L140 80 L140 100 L100 100 L100 80 L65 80 L65 70 Z M80 120 Q80 100 100 100 L120 100 Q140 100 140 120 L140 160 L100 160 L100 140 L80 140 Z M100 140 L120 140 L120 160 L100 160 Z" />
            </svg>
          </div>
        )}
      </Link>

      {/* Toggle Button */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-24 bg-white border border-slate-200 rounded-full p-1 shadow-md hover:bg-slate-50 transition-colors z-50"
      >
        {collapsed ? (
          <ChevronRight className="w-4 h-4 text-slate-600" />
        ) : (
          <ChevronLeft className="w-4 h-4 text-slate-600" />
        )}
      </button>

      {/* Section Switcher */}
      {!collapsed && (
        <div className="px-4 py-4">
          <div className="bg-slate-100 rounded-lg p-1 flex gap-1">
            <button
              onClick={() => setActiveSection('startup')}
              className={`flex-1 px-4 py-2 rounded-md font-semibold text-sm transition-all ${
                activeSection === 'startup'
                  ? 'bg-white text-[#08D9D6] shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Startup
            </button>
            <button
              onClick={() => setActiveSection('investor')}
              className={`flex-1 px-4 py-2 rounded-md font-semibold text-sm transition-all ${
                activeSection === 'investor'
                  ? 'bg-white text-[#FF2E63] shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Investor
            </button>
          </div>
        </div>
      )}

      {/* Navigation Links */}
      <nav className="flex-1 overflow-y-auto px-3 py-4">
        {currentNavigation.map((section, sectionIndex) => (
          <div key={sectionIndex} className="mb-6">
            {!collapsed && (
              <h3 className="px-3 mb-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                {section.title}
              </h3>
            )}
            <div className="space-y-1">
              {section.items.map((item, itemIndex) => (
                <Link
                  key={itemIndex}
                  to={item.path}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all group relative ${
                    isActive(item.path)
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md'
                      : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {isActive(item.path) && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-gradient-to-r from-[#08D9D6] to-[#FF2E63] rounded-lg"
                      transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  
                  <span className="relative z-10">{item.icon}</span>
                  
                  <AnimatePresence mode="wait">
                    {!collapsed && (
                      <motion.span
                        initial={{ opacity: 0, width: 0 }}
                        animate={{ opacity: 1, width: 'auto' }}
                        exit={{ opacity: 0, width: 0 }}
                        transition={{ duration: 0.2 }}
                        className="font-medium text-sm relative z-10 flex-1"
                      >
                        {item.name}
                      </motion.span>
                    )}
                  </AnimatePresence>

                  {item.badge && !collapsed && (
                    <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full relative z-10">
                      {item.badge}
                    </span>
                  )}

                  {item.badge && collapsed && (
                    <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                  )}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </nav>

      {/* Bottom Section - Home Link */}
      <div className="border-t border-slate-200 p-3">
        <Link
          to="/"
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-700 hover:bg-slate-100 transition-all"
        >
          <Home className="w-5 h-5" />
          {!collapsed && <span className="font-medium text-sm">Back to Home</span>}
        </Link>
      </div>
    </motion.aside>
  );
};

export default Sidebar;

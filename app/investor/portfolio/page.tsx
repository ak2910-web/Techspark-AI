import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Briefcase, TrendingUp, TrendingDown, DollarSign, Calendar, Filter, Download } from 'lucide-react';
import DashboardLayout from '../../../components/layout/DashboardLayout';

const PortfolioPage: React.FC = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');

  const portfolio = [
    {
      id: 1,
      name: 'NeuralFlow AI',
      sector: 'AI/ML',
      invested: '$2.5M',
      currentValue: '$8.2M',
      return: '+228%',
      stage: 'Series B',
      investedDate: 'Jan 2023',
      status: 'active',
      performance: 'excellent'
    },
    {
      id: 2,
      name: 'CloudSync Pro',
      sector: 'SaaS',
      invested: '$1.8M',
      currentValue: '$5.4M',
      return: '+200%',
      stage: 'Series A',
      investedDate: 'Mar 2023',
      status: 'active',
      performance: 'excellent'
    },
    {
      id: 3,
      name: 'HealthTech Solutions',
      sector: 'HealthTech',
      invested: '$3.2M',
      currentValue: '$4.1M',
      return: '+28%',
      stage: 'Series B',
      investedDate: 'Jun 2023',
      status: 'active',
      performance: 'good'
    },
    {
      id: 4,
      name: 'GreenEnergy Co',
      sector: 'CleanTech',
      invested: '$2.0M',
      currentValue: '$1.6M',
      return: '-20%',
      stage: 'Series A',
      investedDate: 'Sep 2023',
      status: 'active',
      performance: 'concerning'
    },
    {
      id: 5,
      name: 'FinanceBot',
      sector: 'FinTech',
      invested: '$1.5M',
      currentValue: '$12M',
      return: '+700%',
      stage: 'Exited',
      investedDate: 'Jan 2022',
      status: 'exited',
      performance: 'excellent'
    }
  ];

  const getPerformanceColor = (perf: string) => {
    switch(perf) {
      case 'excellent': return 'bg-green-100 text-green-700 border-green-200';
      case 'good': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'concerning': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  const totalInvested = portfolio.reduce((sum, p) => sum + parseFloat(p.invested.replace(/[$M]/g, '')), 0);
  const totalValue = portfolio.reduce((sum, p) => sum + parseFloat(p.currentValue.replace(/[$M]/g, '')), 0);
  const avgReturn = ((totalValue - totalInvested) / totalInvested * 100).toFixed(1);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
              <Briefcase className="w-8 h-8 text-[#08D9D6]" />
              Portfolio Management
            </h1>
            <p className="text-slate-600 mt-2">Track and manage your investments</p>
          </div>
          <div className="flex gap-2">
            <button className="px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 transition flex items-center gap-2">
              <Filter className="w-4 h-4" />
              Filters
            </button>
            <button className="px-4 py-2 bg-[#08D9D6] text-white rounded-lg hover:bg-[#06b5b3] transition flex items-center gap-2">
              <Download className="w-4 h-4" />
              Export
            </button>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { label: 'Total Invested', value: `$${totalInvested.toFixed(1)}M`, icon: <DollarSign className="w-6 h-6" />, color: 'blue' },
            { label: 'Current Value', value: `$${totalValue.toFixed(1)}M`, icon: <TrendingUp className="w-6 h-6" />, color: 'green' },
            { label: 'Avg Return', value: `+${avgReturn}%`, icon: <TrendingUp className="w-6 h-6" />, color: 'purple' },
            { label: 'Companies', value: portfolio.length, icon: <Briefcase className="w-6 h-6" />, color: 'orange' }
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-xl border border-slate-200 p-6"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-semibold text-slate-600">{stat.label}</span>
                <div className={`p-2 rounded-lg bg-${stat.color}-100 text-${stat.color}-600`}>
                  {stat.icon}
                </div>
              </div>
              <div className="text-3xl font-bold text-slate-900">{stat.value}</div>
            </motion.div>
          ))}
        </div>

        {/* View Toggle */}
        <div className="flex justify-end">
          <div className="inline-flex rounded-lg border border-slate-200 p-1 bg-white">
            <button
              onClick={() => setViewMode('grid')}
              className={`px-4 py-2 rounded-md font-semibold text-sm transition ${
                viewMode === 'grid' ? 'bg-[#08D9D6] text-white' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Grid View
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`px-4 py-2 rounded-md font-semibold text-sm transition ${
                viewMode === 'table' ? 'bg-[#08D9D6] text-white' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Table View
            </button>
          </div>
        </div>

        {/* Portfolio Grid/Table */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {portfolio.map((company, i) => (
              <motion.div
                key={company.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-xl border border-slate-200 p-6 hover:shadow-lg transition"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-bold text-lg text-slate-900 mb-1">{company.name}</h3>
                    <span className="text-sm text-slate-500">{company.sector}</span>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getPerformanceColor(company.performance)}`}>
                    {company.performance.toUpperCase()}
                  </span>
                </div>

                <div className="space-y-3 mb-4">
                  <div className="flex justify-between">
                    <span className="text-sm text-slate-600">Invested</span>
                    <span className="font-bold text-slate-900">{company.invested}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-slate-600">Current Value</span>
                    <span className="font-bold text-slate-900">{company.currentValue}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-slate-600">Return</span>
                    <span className={`font-bold ${company.return.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                      {company.return}
                    </span>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-200 flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2 text-slate-500">
                    <Calendar className="w-4 h-4" />
                    {company.investedDate}
                  </div>
                  <span className={`px-2 py-1 rounded ${
                    company.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                  } text-xs font-semibold`}>
                    {company.stage}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="text-left p-4 font-semibold text-slate-700">Company</th>
                  <th className="text-left p-4 font-semibold text-slate-700">Sector</th>
                  <th className="text-left p-4 font-semibold text-slate-700">Invested</th>
                  <th className="text-left p-4 font-semibold text-slate-700">Current Value</th>
                  <th className="text-left p-4 font-semibold text-slate-700">Return</th>
                  <th className="text-left p-4 font-semibold text-slate-700">Stage</th>
                  <th className="text-left p-4 font-semibold text-slate-700">Performance</th>
                </tr>
              </thead>
              <tbody>
                {portfolio.map((company, i) => (
                  <tr key={company.id} className="border-b border-slate-100 hover:bg-slate-50 transition">
                    <td className="p-4">
                      <div className="font-bold text-slate-900">{company.name}</div>
                      <div className="text-sm text-slate-500">{company.investedDate}</div>
                    </td>
                    <td className="p-4 text-slate-600">{company.sector}</td>
                    <td className="p-4 font-bold text-slate-900">{company.invested}</td>
                    <td className="p-4 font-bold text-slate-900">{company.currentValue}</td>
                    <td className="p-4">
                      <span className={`font-bold ${company.return.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                        {company.return}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded text-xs font-semibold ${
                        company.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                      }`}>
                        {company.stage}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getPerformanceColor(company.performance)}`}>
                        {company.performance.toUpperCase()}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default PortfolioPage;

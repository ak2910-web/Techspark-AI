import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, DollarSign, Building2, Target, PieChart, BarChart3 } from 'lucide-react';
import DashboardLayout from '../../../components/layout/DashboardLayout';

const InvestorDashboardPage: React.FC = () => {
  const portfolioStats = {
    totalInvested: '$12.5M',
    activeDeals: 23,
    avgReturn: '3.2x',
    topPerformer: 'TechFlow AI'
  };

  const recentDeals = [
    { company: 'DataViz Pro', stage: 'Series A', amount: '$2.5M', date: '2 days ago', status: 'Active' },
    { company: 'CloudSync', stage: 'Seed', amount: '$500K', date: '1 week ago', status: 'Due Diligence' },
    { company: 'HealthTech Labs', stage: 'Series B', amount: '$5M', date: '2 weeks ago', status: 'Closed' }
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Investor Dashboard</h1>
          <p className="text-slate-600 mt-2">Overview of your portfolio and opportunities</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { label: 'Total Invested', value: portfolioStats.totalInvested, icon: <DollarSign className="w-6 h-6" />, color: 'green' },
            { label: 'Active Deals', value: portfolioStats.activeDeals, icon: <Building2 className="w-6 h-6" />, color: 'blue' },
            { label: 'Avg Return', value: portfolioStats.avgReturn, icon: <TrendingUp className="w-6 h-6" />, color: 'purple' },
            { label: 'Top Performer', value: portfolioStats.topPerformer, icon: <Target className="w-6 h-6" />, color: 'orange' }
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

        {/* Charts Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
              <PieChart className="w-5 h-5 text-[#08D9D6]" />
              Portfolio Distribution
            </h3>
            <div className="h-64 flex items-center justify-center text-slate-400">
              Chart: Portfolio by sector
            </div>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-[#FF2E63]" />
              Investment Performance
            </h3>
            <div className="h-64 flex items-center justify-center text-slate-400">
              Chart: Returns over time
            </div>
          </div>
        </div>

        {/* Recent Deals */}
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h3 className="text-lg font-bold text-slate-900 mb-4">Recent Deals</h3>
          <div className="space-y-3">
            {recentDeals.map((deal, i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#08D9D6] to-[#FF2E63] rounded-lg" />
                  <div>
                    <div className="font-bold text-slate-900">{deal.company}</div>
                    <div className="text-sm text-slate-500">{deal.stage} • {deal.date}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-slate-900">{deal.amount}</div>
                  <div className={`text-sm ${
                    deal.status === 'Active' ? 'text-green-600' :
                    deal.status === 'Closed' ? 'text-blue-600' :
                    'text-yellow-600'
                  }`}>{deal.status}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default InvestorDashboardPage;

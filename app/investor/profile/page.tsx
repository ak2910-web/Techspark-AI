import React from 'react';
import { motion } from 'framer-motion';
import { User, Briefcase, Target, TrendingUp, Award, Mail, Phone, Linkedin, Twitter } from 'lucide-react';
import DashboardLayout from '../../../components/layout/DashboardLayout';

const InvestorProfilePage: React.FC = () => {
  const profile = {
    name: 'Alex Johnson',
    title: 'Managing Partner',
    firm: 'NextGen Ventures',
    location: 'San Francisco, CA',
    email: 'alex@nextgenvc.com',
    phone: '+1 (555) 123-4567',
    avatar: '',
    bio: 'Passionate about early-stage tech startups with a focus on AI, FinTech, and CleanTech. 15+ years of experience in venture capital with over 50 successful investments.',
    investmentFocus: ['AI/ML', 'FinTech', 'CleanTech', 'SaaS'],
    checkSize: '$500K - $5M',
    stage: 'Seed to Series A',
    portfolioSize: 47,
    totalInvested: '$85M',
    avgReturn: '3.8x'
  };

  const recentInvestments = [
    { company: 'NeuralAI', sector: 'AI/ML', year: '2024', exit: null },
    { company: 'CloudPay', sector: 'FinTech', year: '2023', exit: '2.5x' },
    { company: 'GreenTech Labs', sector: 'CleanTech', year: '2024', exit: null }
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Profile Header */}
        <div className="bg-gradient-to-r from-[#08D9D6] to-[#FF2E63] rounded-xl p-8 text-white">
          <div className="flex items-start gap-6">
            <div className="w-32 h-32 bg-white rounded-2xl flex items-center justify-center">
              <User className="w-16 h-16 text-slate-400" />
            </div>
            <div className="flex-1">
              <h1 className="text-3xl font-bold mb-2">{profile.name}</h1>
              <p className="text-white/90 text-lg mb-1">{profile.title} at {profile.firm}</p>
              <p className="text-white/80 mb-4">{profile.location}</p>
              <div className="flex items-center gap-4">
                <a href={`mailto:${profile.email}`} className="flex items-center gap-2 text-white/90 hover:text-white transition">
                  <Mail className="w-4 h-4" />
                  {profile.email}
                </a>
                <a href={`tel:${profile.phone}`} className="flex items-center gap-2 text-white/90 hover:text-white transition">
                  <Phone className="w-4 h-4" />
                  {profile.phone}
                </a>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="p-3 bg-white/20 hover:bg-white/30 rounded-lg transition">
                <Linkedin className="w-5 h-5" />
              </button>
              <button className="p-3 bg-white/20 hover:bg-white/30 rounded-lg transition">
                <Twitter className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { label: 'Portfolio Companies', value: profile.portfolioSize, icon: <Briefcase className="w-6 h-6" />, color: 'blue' },
            { label: 'Total Invested', value: profile.totalInvested, icon: <TrendingUp className="w-6 h-6" />, color: 'green' },
            { label: 'Avg Return', value: profile.avgReturn, icon: <Award className="w-6 h-6" />, color: 'purple' },
            { label: 'Check Size', value: profile.checkSize, icon: <Target className="w-6 h-6" />, color: 'orange' }
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
              <div className="text-2xl font-bold text-slate-900">{stat.value}</div>
            </motion.div>
          ))}
        </div>

        {/* Bio & Investment Focus */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <h3 className="text-lg font-bold text-slate-900 mb-4">About</h3>
            <p className="text-slate-600 leading-relaxed">{profile.bio}</p>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <h3 className="text-lg font-bold text-slate-900 mb-4">Investment Focus</h3>
            <div className="space-y-3">
              <div>
                <span className="text-sm font-semibold text-slate-600">Sectors:</span>
                <div className="flex flex-wrap gap-2 mt-2">
                  {profile.investmentFocus.map((sector, i) => (
                    <span key={i} className="px-3 py-1 bg-[#08D9D6]/10 text-[#08D9D6] rounded-full text-sm font-semibold">
                      {sector}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <span className="text-sm font-semibold text-slate-600">Stage:</span>
                <p className="text-slate-900 font-bold mt-1">{profile.stage}</p>
              </div>
              <div>
                <span className="text-sm font-semibold text-slate-600">Check Size:</span>
                <p className="text-slate-900 font-bold mt-1">{profile.checkSize}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Investments */}
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h3 className="text-lg font-bold text-slate-900 mb-4">Recent Investments</h3>
          <div className="space-y-3">
            {recentInvestments.map((inv, i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#08D9D6] to-[#FF2E63] rounded-lg" />
                  <div>
                    <div className="font-bold text-slate-900">{inv.company}</div>
                    <div className="text-sm text-slate-500">{inv.sector}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-slate-500">{inv.year}</div>
                  {inv.exit && (
                    <div className="text-sm font-bold text-green-600">{inv.exit} return</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default InvestorProfilePage;

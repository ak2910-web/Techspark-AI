import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Target, Edit, Save, Plus, X, TrendingUp, DollarSign, MapPin, Users } from 'lucide-react';
import DashboardLayout from '../../../components/layout/DashboardLayout';

const InvestmentThesisPage: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [thesis, setThesis] = useState({
    overview: 'We invest in early-stage technology companies that are solving critical problems in AI/ML, FinTech, and CleanTech sectors. Our ideal portfolio company has strong product-market fit, scalable business model, and exceptional founding team.',
    sectors: ['AI/ML', 'FinTech', 'CleanTech', 'SaaS', 'HealthTech'],
    stages: ['Seed', 'Series A'],
    checkSize: { min: 500000, max: 5000000 },
    geography: ['North America', 'Europe', 'Asia'],
    criteria: [
      { label: 'Strong Technical Team', required: true },
      { label: 'Clear Market Opportunity ($1B+)', required: true },
      { label: 'Proven Traction (Revenue/Users)', required: true },
      { label: 'Defensible Technology/IP', required: false },
      { label: 'Strong Unit Economics', required: true }
    ]
  });

  const idealProfile = {
    revenue: '$500K - $5M ARR',
    growth: '+200% YoY',
    teamSize: '5-20 employees',
    fundingGoal: '$2M - $10M',
    burnRate: '12-18 months runway'
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
              <Target className="w-8 h-8 text-[#FF2E63]" />
              Investment Thesis
            </h1>
            <p className="text-slate-600 mt-2">Define your investment criteria and focus areas</p>
          </div>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className={`px-6 py-3 rounded-lg font-semibold flex items-center gap-2 transition ${
              isEditing
                ? 'bg-green-600 text-white hover:bg-green-700'
                : 'bg-[#08D9D6] text-white hover:bg-[#06b5b3]'
            }`}
          >
            {isEditing ? (
              <>
                <Save className="w-4 h-4" />
                Save Changes
              </>
            ) : (
              <>
                <Edit className="w-4 h-4" />
                Edit Thesis
              </>
            )}
          </button>
        </div>

        {/* Overview */}
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h3 className="text-lg font-bold text-slate-900 mb-4">Investment Overview</h3>
          {isEditing ? (
            <textarea
              value={thesis.overview}
              onChange={(e) => setThesis({ ...thesis, overview: e.target.value })}
              className="w-full h-32 px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:border-[#08D9D6] focus:ring-2 focus:ring-[#08D9D6]/20 resize-none"
            />
          ) : (
            <p className="text-slate-600 leading-relaxed">{thesis.overview}</p>
          )}
        </div>

        {/* Focus Areas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Sectors */}
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-slate-900">Target Sectors</h3>
              {isEditing && (
                <button className="p-1 text-[#08D9D6] hover:bg-[#08D9D6]/10 rounded transition">
                  <Plus className="w-4 h-4" />
                </button>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              {thesis.sectors.map((sector, i) => (
                <span
                  key={i}
                  className="px-4 py-2 bg-[#08D9D6]/10 text-[#08D9D6] rounded-lg font-semibold flex items-center gap-2"
                >
                  {sector}
                  {isEditing && (
                    <button className="text-red-500 hover:text-red-700">
                      <X className="w-3 h-3" />
                    </button>
                  )}
                </span>
              ))}
            </div>
          </div>

          {/* Stages */}
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-slate-900">Investment Stages</h3>
              {isEditing && (
                <button className="p-1 text-[#08D9D6] hover:bg-[#08D9D6]/10 rounded transition">
                  <Plus className="w-4 h-4" />
                </button>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              {thesis.stages.map((stage, i) => (
                <span
                  key={i}
                  className="px-4 py-2 bg-purple-100 text-purple-700 rounded-lg font-semibold flex items-center gap-2"
                >
                  {stage}
                  {isEditing && (
                    <button className="text-red-500 hover:text-red-700">
                      <X className="w-3 h-3" />
                    </button>
                  )}
                </span>
              ))}
            </div>
          </div>

          {/* Check Size */}
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-green-600" />
              Check Size Range
            </h3>
            {isEditing ? (
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-semibold text-slate-600 mb-1 block">Minimum</label>
                  <input
                    type="text"
                    value={`$${(thesis.checkSize.min / 1000).toFixed(0)}K`}
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-[#08D9D6]"
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold text-slate-600 mb-1 block">Maximum</label>
                  <input
                    type="text"
                    value={`$${(thesis.checkSize.max / 1000000).toFixed(1)}M`}
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-[#08D9D6]"
                  />
                </div>
              </div>
            ) : (
              <div className="text-2xl font-bold text-slate-900">
                ${(thesis.checkSize.min / 1000).toFixed(0)}K - ${(thesis.checkSize.max / 1000000).toFixed(1)}M
              </div>
            )}
          </div>

          {/* Geography */}
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-blue-600" />
              Geographic Focus
            </h3>
            <div className="flex flex-wrap gap-2">
              {thesis.geography.map((region, i) => (
                <span
                  key={i}
                  className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg font-semibold flex items-center gap-2"
                >
                  {region}
                  {isEditing && (
                    <button className="text-red-500 hover:text-red-700">
                      <X className="w-3 h-3" />
                    </button>
                  )}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Investment Criteria */}
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h3 className="text-lg font-bold text-slate-900 mb-4">Investment Criteria</h3>
          <div className="space-y-3">
            {thesis.criteria.map((criterion, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-4 bg-slate-50 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                    criterion.required ? 'bg-green-600 text-white' : 'bg-slate-300 text-slate-600'
                  }`}>
                    {criterion.required ? '✓' : '○'}
                  </div>
                  <span className="font-semibold text-slate-900">{criterion.label}</span>
                </div>
                {isEditing && (
                  <button className="text-sm text-[#08D9D6] hover:text-[#06b5b3] font-semibold">
                    {criterion.required ? 'Make Optional' : 'Make Required'}
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Ideal Company Profile */}
        <div className="bg-gradient-to-r from-[#08D9D6]/10 to-[#FF2E63]/10 rounded-xl border border-[#08D9D6]/30 p-6">
          <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-[#08D9D6]" />
            Ideal Company Profile
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {Object.entries(idealProfile).map(([key, value], i) => (
              <div key={i} className="bg-white rounded-lg p-4 text-center">
                <div className="text-xs font-semibold text-slate-500 uppercase mb-2">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </div>
                <div className="text-sm font-bold text-slate-900">{value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default InvestmentThesisPage;

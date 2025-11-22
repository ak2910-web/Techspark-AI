import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, TrendingUp, Users, Target, Zap, ArrowRight, CheckCircle, Star } from 'lucide-react';
import DashboardLayout from '../../../components/layout/DashboardLayout';

const RecommendationsPage: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'growth' | 'fundraising' | 'product'>('all');

  const recommendations = [
    {
      id: 1,
      category: 'growth',
      priority: 'high',
      title: 'Optimize your landing page conversion rate',
      description: 'Your landing page has a 2.3% conversion rate. Industry average for SaaS is 4-5%. Consider A/B testing your CTA placement.',
      impact: '+35% potential revenue increase',
      effort: 'Medium',
      icon: <TrendingUp className="w-5 h-5" />,
      actions: ['Run A/B test', 'Update CTA copy', 'Add social proof']
    },
    {
      id: 2,
      category: 'fundraising',
      priority: 'high',
      title: 'Connect with Series A investors',
      description: '12 investors in your sector are actively looking for companies at your stage. Your metrics align with their investment thesis.',
      impact: '$2-5M funding potential',
      effort: 'Low',
      icon: <Target className="w-5 h-5" />,
      actions: ['Review investor list', 'Schedule intros', 'Prepare pitch deck']
    },
    {
      id: 3,
      category: 'product',
      priority: 'medium',
      title: 'Improve user onboarding flow',
      description: '45% of users drop off during onboarding. Simplifying the first 3 steps could improve activation by 30%.',
      impact: '+30% activation rate',
      effort: 'High',
      icon: <Users className="w-5 h-5" />,
      actions: ['Map user journey', 'Reduce friction points', 'Add progress indicator']
    },
    {
      id: 4,
      category: 'growth',
      priority: 'medium',
      title: 'Launch referral program',
      description: 'Your NPS is 8.5/10. High satisfaction customers are prime candidates for referrals. Expected viral coefficient: 1.3x',
      impact: '+50% organic growth',
      effort: 'Medium',
      icon: <Zap className="w-5 h-5" />,
      actions: ['Design incentive structure', 'Build referral tracking', 'Create email campaign']
    },
    {
      id: 5,
      category: 'fundraising',
      priority: 'low',
      title: 'Update your financial projections',
      description: 'Your 3-year projections are 8 months old. Refreshing them will strengthen your fundraising narrative.',
      impact: 'Improved investor confidence',
      effort: 'Low',
      icon: <Star className="w-5 h-5" />,
      actions: ['Review actuals vs forecast', 'Update unit economics', 'Refresh market sizing']
    }
  ];

  const filteredRecommendations = filter === 'all' 
    ? recommendations 
    : recommendations.filter(r => r.category === filter);

  const getPriorityColor = (priority: string) => {
    switch(priority) {
      case 'high': return 'bg-red-100 text-red-700 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'low': return 'bg-blue-100 text-blue-700 border-blue-200';
      default: return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
              <Lightbulb className="w-8 h-8 text-yellow-500" />
              AI Recommendations
            </h1>
            <p className="text-slate-600 mt-2">Personalized insights to accelerate your growth</p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-slate-900">{filteredRecommendations.length}</div>
            <div className="text-sm text-slate-500">Active recommendations</div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 border-b border-slate-200">
          {[
            { label: 'All', value: 'all' },
            { label: 'Growth', value: 'growth' },
            { label: 'Fundraising', value: 'fundraising' },
            { label: 'Product', value: 'product' }
          ].map((tab) => (
            <button
              key={tab.value}
              onClick={() => setFilter(tab.value as any)}
              className={`px-4 py-3 font-semibold text-sm transition-all ${
                filter === tab.value
                  ? 'text-[#08D9D6] border-b-2 border-[#08D9D6]'
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Recommendations Grid */}
        <div className="space-y-4">
          {filteredRecommendations.map((rec, index) => (
            <motion.div
              key={rec.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl border border-slate-200 p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-slate-100 rounded-lg text-slate-700">
                    {rec.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-bold text-slate-900">{rec.title}</h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getPriorityColor(rec.priority)}`}>
                        {rec.priority.toUpperCase()}
                      </span>
                    </div>
                    <p className="text-slate-600 leading-relaxed">{rec.description}</p>
                  </div>
                </div>
              </div>

              {/* Impact & Effort */}
              <div className="grid grid-cols-2 gap-4 mb-4 p-4 bg-slate-50 rounded-lg">
                <div>
                  <div className="text-xs font-semibold text-slate-500 uppercase mb-1">Expected Impact</div>
                  <div className="text-sm font-bold text-green-600">{rec.impact}</div>
                </div>
                <div>
                  <div className="text-xs font-semibold text-slate-500 uppercase mb-1">Effort Level</div>
                  <div className="text-sm font-bold text-slate-700">{rec.effort}</div>
                </div>
              </div>

              {/* Action Items */}
              <div className="mb-4">
                <div className="text-sm font-semibold text-slate-700 mb-2">Suggested Actions:</div>
                <div className="space-y-2">
                  {rec.actions.map((action, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-slate-600">
                      <CheckCircle className="w-4 h-4 text-slate-400" />
                      {action}
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <button className="w-full py-3 bg-gradient-to-r from-[#08D9D6] to-[#06b5b3] text-white font-semibold rounded-lg hover:shadow-lg transition-all flex items-center justify-center gap-2 group">
                Take Action
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default RecommendationsPage;

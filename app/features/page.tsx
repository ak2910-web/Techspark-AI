import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Rocket,
  Shield,
  Zap,
  Users,
  BarChart3,
  Brain,
  Target,
  LineChart,
  Sparkles,
  ArrowRight,
  Check
} from 'lucide-react';

const features = [
  {
    title: 'Investor Intelligence',
    description: 'AI-matched investor lists, warm intros, and tailored outreach that fit your stage and sector.',
    icon: Users,
    badge: 'Fundraising',
    tone: 'from-blue-500/20 via-blue-500/10 to-blue-500/5'
  },
  {
    title: 'Narrative Engine',
    description: 'Live scoring for pitch decks, one-click rewrites, and clarity prompts for every slide.',
    icon: Brain,
    badge: 'Story',
    tone: 'from-purple-500/20 via-purple-500/10 to-purple-500/5'
  },
  {
    title: 'Market Radar',
    description: 'Competitive signals, trending keywords, and share-of-voice tracking in real time.',
    icon: Target,
    badge: 'Intelligence',
    tone: 'from-emerald-500/20 via-emerald-500/10 to-emerald-500/5'
  },
  {
    title: 'Growth Control Room',
    description: 'North-star metrics, pipeline health, and retention alerts with automated next steps.',
    icon: LineChart,
    badge: 'Analytics',
    tone: 'from-amber-500/20 via-amber-500/10 to-amber-500/5'
  }
];

const proofPoints = [
  'SOC 2–ready security, SSO, and role-based controls out of the box.',
  'Benchmarks across 6M+ funding data points to calibrate your round.',
  'Human-in-the-loop feedback for investor outreach and deck polish.',
  'Exports to PDF/CSV and Slack/Notion hand-offs built-in.'
];

const FeaturePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-white dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 text-slate-900 dark:text-white">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute w-96 h-96 rounded-full bg-blue-500/10 blur-3xl"
          animate={{ y: [0, -30, 0], x: [0, 20, 0], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 14, repeat: Infinity }}
        />
        <motion.div
          className="absolute right-0 bottom-0 w-[28rem] h-[28rem] rounded-full bg-purple-500/10 blur-3xl"
          animate={{ y: [0, 25, 0], x: [0, -25, 0], opacity: [0.2, 0.45, 0.2] }}
          transition={{ duration: 18, repeat: Infinity }}
        />
      </div>

      <header className="relative z-10 border-b border-slate-200/70 dark:border-slate-800/70 backdrop-blur-md bg-white/70 dark:bg-slate-900/70">
        <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="bg-black p-2 rounded-lg shadow-md shadow-black/20 group-hover:shadow-lg group-hover:shadow-black/30 transition">
              <svg className="w-5 h-5 text-white" viewBox="0 0 200 200" fill="currentColor">
                <path d="M60 40 L130 40 L185 70 L185 80 L140 80 L140 100 L100 100 L100 80 L65 80 L65 70 Z M80 120 Q80 100 100 100 L120 100 Q140 100 140 120 L140 160 L100 160 L100 140 L80 140 Z M100 140 L120 140 L120 160 L100 160 Z" />
              </svg>
            </div>
            <span className="text-lg font-bold">FundSpark AI</span>
          </Link>
          <div className="flex items-center gap-3 text-sm">
            <Link to="/login" className="px-3 py-2 rounded-lg font-semibold text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 transition">
              Sign in
            </Link>
            <Link
              to="/startup/dashboard"
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 transition"
            >
              Start free trial
            </Link>
          </div>
        </div>
      </header>

      <main className="relative z-10 max-w-6xl mx-auto px-6 py-16 space-y-16">
        <section className="grid lg:grid-cols-[1.2fr_1fr] gap-10 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-200 text-sm font-semibold w-fit">
              <Sparkles className="w-4 h-4" />
              Fundraising OS
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold leading-tight">
              Everything you need to raise, tell the story, and prove momentum.
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl">
              FundSpark AI pairs narrative coaching, investor intel, and execution playbooks so founders can move from deck to signed term sheet faster—without juggling disconnected tools.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/login"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-900 text-white dark:bg-white dark:text-slate-900 font-semibold shadow-lg shadow-slate-900/10 hover:translate-y-[-2px] transition"
              >
                Launch workspace
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/pitch-review"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-slate-200 text-slate-800 hover:border-slate-300 dark:border-slate-700 dark:text-white dark:hover:border-slate-500 font-semibold"
              >
                Try pitch reviewer
              </Link>
            </div>
            <div className="flex flex-wrap gap-4 text-sm text-slate-600 dark:text-slate-300">
              {["Deck QA", "Investor CRM", "Metrics Co-pilot", "Security"].map((tag) => (
                <span key={tag} className="px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="p-6 rounded-3xl bg-white/80 dark:bg-slate-900/80 border border-slate-200/70 dark:border-slate-800/70 shadow-xl shadow-slate-200/40 dark:shadow-none backdrop-blur"
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm text-slate-500 dark:text-slate-400">Live metrics</p>
                <p className="text-2xl font-bold">Pipeline health</p>
              </div>
              <div className="px-3 py-1 rounded-full bg-green-100 text-green-800 dark:bg-green-500/10 dark:text-green-200 text-sm font-semibold">
                +38% this week
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-6">
              {[{ label: 'Investor replies', value: '62' }, { label: 'Deck score', value: '92/100' }, { label: 'Runway months', value: '14' }, { label: 'Warm intros', value: '18' }].map((item) => (
                <div key={item.label} className="rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-800/80 p-4">
                  <p className="text-xs text-slate-500 dark:text-slate-400">{item.label}</p>
                  <p className="text-lg font-semibold">{item.value}</p>
                </div>
              ))}
            </div>
            <div className="space-y-3">
              {["Warm intro graph generated", "Deck clarity score improved", "New competitor signal detected"].map((event) => (
                <div key={event} className="flex items-start gap-3">
                  <span className="mt-1 w-2 h-2 rounded-full bg-blue-500" />
                  <div>
                    <p className="font-semibold text-sm">{event}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Just now · Synced to workspace</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </section>

        <section className="space-y-8">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div>
              <p className="text-sm font-semibold text-blue-600 dark:text-blue-300">Capabilities</p>
              <h2 className="text-3xl font-bold">What founders use every day</h2>
              <p className="text-slate-600 dark:text-slate-300 max-w-2xl mt-2">
                A unified surface across research, storytelling, and investor ops so you can run an entire raise without juggling five tools.
              </p>
            </div>
            <Link
              to="/startup/dashboard"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 transition"
            >
              Jump into dashboard
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            {features.map(({ title, description, icon: Icon, badge, tone }) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="relative p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white/70 dark:bg-slate-900/70 overflow-hidden"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${tone} pointer-events-none`} />
                <div className="relative flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-slate-900 text-white flex items-center justify-center dark:bg-white dark:text-slate-900 shadow-md">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="space-y-2">
                    <div className="inline-flex items-center gap-2 text-xs font-semibold px-2 py-1 rounded-full bg-slate-900 text-white dark:bg-white dark:text-slate-900">
                      {badge}
                    </div>
                    <h3 className="text-xl font-bold">{title}</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-300">{description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="grid lg:grid-cols-[1.1fr_1fr] gap-10 items-center">
          <div className="space-y-5">
            <p className="text-sm font-semibold text-purple-600 dark:text-purple-300">Proof, not promises</p>
            <h2 className="text-3xl font-bold">Security, data, and humans in the loop.</h2>
            <div className="space-y-3">
              {proofPoints.map((point) => (
                <div key={point} className="flex items-start gap-3 text-slate-700 dark:text-slate-200">
                  <Check className="w-4 h-4 mt-1 text-green-500" />
                  <p>{point}</p>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-3 text-sm text-slate-500 dark:text-slate-300">
              <span className="inline-flex items-center gap-2 px-3 py-2 rounded-full bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
                <Shield className="w-4 h-4" /> Data encrypted at rest & transit
              </span>
              <span className="inline-flex items-center gap-2 px-3 py-2 rounded-full bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
                <Zap className="w-4 h-4" /> Realtime insights
              </span>
              <span className="inline-flex items-center gap-2 px-3 py-2 rounded-full bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
                <BarChart3 className="w-4 h-4" /> PDF & CSV exports
              </span>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="p-6 rounded-3xl bg-gradient-to-br from-slate-900 to-slate-800 text-white border border-slate-800 shadow-2xl"
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="w-11 h-11 rounded-2xl bg-white/10 flex items-center justify-center">
                <Rocket className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm text-slate-300">Playbook</p>
                <p className="text-xl font-semibold">Raise-ready in 10 days</p>
              </div>
            </div>
            <div className="space-y-4">
              {["Upload deck, get scored", "Generate investor list", "Send sequenced outreach", "Ship weekly momentum brief"].map((step, idx) => (
                <div key={step} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center font-semibold">{idx + 1}</div>
                  <p className="flex-1 text-sm">{step}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                to="/login"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white text-slate-900 font-semibold hover:bg-slate-100 transition"
              >
                Create workspace
              </Link>
              <Link
                to="/startup/dashboard"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-white/40 text-white hover:border-white/70 transition"
              >
                View dashboard
              </Link>
            </div>
          </motion.div>
        </section>
      </main>
    </div>
  );
};

export default FeaturePage;

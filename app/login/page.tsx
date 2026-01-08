import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Lock, Mail, Eye, EyeOff, Sparkles, ArrowRight, Twitter, Linkedin, Github, Check, AlertCircle } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    
    if (!isLogin) {
      if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
      if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      navigate('/startup/dashboard');
    }, 1500);
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradient Orbs */}
        <motion.div
          className="absolute w-[500px] h-[500px] rounded-full bg-gradient-to-r from-blue-400/20 to-purple-400/20 blur-3xl"
          style={{ top: '-10%', left: '-10%' }}
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 20, repeat: Infinity }}
        />
        <motion.div
          className="absolute w-[400px] h-[400px] rounded-full bg-gradient-to-r from-pink-400/20 to-orange-400/20 blur-3xl"
          style={{ bottom: '-10%', right: '-10%' }}
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, -90, 0],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 25, repeat: Infinity }}
        />
        
        {/* Floating Particles */}
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-blue-500/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -50, 0],
              x: [0, Math.random() * 50 - 25, 0],
              opacity: [0.2, 0.5, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 5 + Math.random() * 5,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      {/* Top Navigation Bar */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 backdrop-blur-md bg-white/50 dark:bg-slate-900/50 border-b border-slate-200/50 dark:border-slate-800/50"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
          <Link to="/" className="flex items-center gap-3 group">
            <motion.div 
              className="bg-black p-2 rounded-lg shadow-black/20 shadow-md"
              whileHover={{ 
                rotate: 360,
                boxShadow: "0 8px 25px rgba(0, 0, 0, 0.4)"
              }}
              transition={{ duration: 0.6 }}
            >
              <svg className="w-5 h-5 text-white" viewBox="0 0 200 200" fill="currentColor">
                <path d="M60 40 L130 40 L185 70 L185 80 L140 80 L140 100 L100 100 L100 80 L65 80 L65 70 Z M80 120 Q80 100 100 100 L120 100 Q140 100 140 120 L140 160 L100 160 L100 140 L80 140 Z M100 140 L120 140 L120 160 L100 160 Z" />
              </svg>
            </motion.div>
            <span className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
              FundSpark AI
            </span>
          </Link>

          <div className="flex items-center gap-6">
            <Link 
              to="/" 
              className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition text-sm font-medium"
            >
              Back to Home
            </Link>
            <div className="flex items-center gap-3">
              <motion.a 
                href="https://twitter.com" 
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 flex items-center justify-center rounded-lg bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-blue-500 dark:hover:text-blue-400 hover:shadow-lg transition-all"
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
              >
                <Twitter className="w-4 h-4" />
              </motion.a>
              <motion.a 
                href="https://linkedin.com" 
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 flex items-center justify-center rounded-lg bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-blue-500 dark:hover:text-blue-400 hover:shadow-lg transition-all"
                whileHover={{ scale: 1.1, rotate: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                <Linkedin className="w-4 h-4" />
              </motion.a>
              <motion.a 
                href="https://github.com" 
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 flex items-center justify-center rounded-lg bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-blue-500 dark:hover:text-blue-400 hover:shadow-lg transition-all"
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
              >
                <Github className="w-4 h-4" />
              </motion.a>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center min-h-[calc(100vh-80px)] px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full max-w-6xl"
        >
            <div  className="grid gap-10 lg:grid-cols-[1.05fr_1fr] items-start">
            <motion.section
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="p-8 rounded-3xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/60 dark:border-slate-800/60 shadow-2xl"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-200 text-sm font-semibold">
                <Sparkles className="w-4 h-4" />
                Fundraising OS
              </div>
              <h2 className="mt-4 text-3xl font-bold text-slate-900 dark:text-white leading-tight">
                Ship a strong raise narrative and keep every investor touchpoint in one place.
              </h2>
              <p className="mt-3 text-slate-600 dark:text-slate-300">
                Workspace includes deck scoring, investor CRM, weekly momentum briefs, and security you can share with diligence teams.
              </p>

              <div className="mt-6 grid sm:grid-cols-2 gap-4">
                {[
                  { title: 'Deck reviewer', body: 'Instant clarity scores plus rewrite suggestions for each slide.' },
                  { title: 'Investor graph', body: 'Warm intros mapped by thesis, stage, and prior checks.' },
                  { title: 'Momentum briefs', body: 'Auto-generated updates you can forward to leads weekly.' },
                  { title: 'Security ready', body: 'RBAC, encryption, and export controls built in.' }
                ].map((item) => (
                  <div
                    key={item.title}
                    className="p-4 rounded-2xl border border-slate-200/70 dark:border-slate-800/70 bg-slate-50/70 dark:bg-slate-800/50"
                  >
                    <div className="flex items-center gap-2 text-sm font-semibold text-slate-900 dark:text-white">
                      <Check className="w-4 h-4 text-green-500" />
                      {item.title}
                    </div>
                    <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{item.body}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  to="/features"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-900 text-white dark:bg-white dark:text-slate-900 font-semibold shadow-lg shadow-slate-900/20 hover:translate-y-[-2px] transition"
                >
                  Explore all features
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/pitch-review"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-white hover:border-slate-300 dark:hover:border-slate-500 font-semibold"
                >
                  Try pitch reviewer
                </Link>
              </div>
            </motion.section>

            <div className="space-y-8">
              {/* Logo Section */}
              <motion.div
                className="text-center"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", duration: 0.8, delay: 0.3 }}
              >
                <div className="inline-flex items-center justify-center w-20 h-20 mb-6 relative">
                  {/* Pulsing Rings */}
                  <motion.div
                    className="absolute inset-0 rounded-full border-2 border-blue-500"
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.5, 0, 0.5],
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <motion.div
                    className="absolute inset-0 rounded-full border-2 border-purple-500"
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.5, 0, 0.5],
                    }}
                    transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                  />
                  
                  {/* Logo */}
                  <motion.div 
                    className="w-full h-full bg-black rounded-2xl flex items-center justify-center shadow-2xl shadow-slate-900/50 relative z-10 p-4"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.8 }}
                  >
                    <svg className="w-10 h-10 text-white" viewBox="0 0 200 200" fill="currentColor">
                      <path d="M60 40 L130 40 L185 70 L185 80 L140 80 L140 100 L100 100 L100 80 L65 80 L65 70 Z M80 120 Q80 100 100 100 L120 100 Q140 100 140 120 L140 160 L100 160 L100 140 L80 140 Z M100 140 L120 140 L120 160 L100 160 Z" />
                    </svg>
                  </motion.div>
                </div>
                <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-2">
                  Welcome Back
                </h1>
                <p className="text-slate-600 dark:text-slate-400">
                  {isLogin ? 'Sign in to continue your journey' : 'Create your account and get started'}
                </p>
              </motion.div>

              {/* Form Card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="backdrop-blur-xl bg-white/80 dark:bg-slate-900/80 rounded-3xl p-8 shadow-2xl border border-slate-200/50 dark:border-slate-800/50"
              >
                <form onSubmit={handleSubmit} className="space-y-6">
              {/* Toggle Login/Signup */}
              <div className="flex gap-2 p-1 bg-slate-100 dark:bg-slate-800 rounded-2xl">
                <motion.button
                  type="button"
                  onClick={() => {
                    setIsLogin(true);
                    setErrors({});
                  }}
                  className={`flex-1 py-3 rounded-xl font-semibold transition-all duration-300 ${
                    isLogin
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Sign In
                </motion.button>
                <motion.button
                  type="button"
                  onClick={() => {
                    setIsLogin(false);
                    setErrors({});
                  }}
                  className={`flex-1 py-3 rounded-xl font-semibold transition-all duration-300 ${
                    !isLogin
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Sign Up
                </motion.button>
              </div>

              {/* Name Fields (Sign Up Only) */}
              <AnimatePresence>
                {!isLogin && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-4"
                  >
                    <div>
                      <div className="relative group">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                          <User className={`w-5 h-5 transition ${
                            errors.firstName ? 'text-red-500' : 'text-slate-400 group-focus-within:text-blue-500'
                          }`} />
                        </div>
                        <input
                          type="text"
                          placeholder="First Name"
                          value={formData.firstName}
                          onChange={(e) => {
                            setFormData({ ...formData, firstName: e.target.value });
                            if (errors.firstName) setErrors({ ...errors, firstName: '' });
                          }}
                          className={`w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-slate-800 border ${
                            errors.firstName ? 'border-red-500' : 'border-slate-200 dark:border-slate-700'
                          } rounded-xl text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
                        />
                      </div>
                      {errors.firstName && (
                        <motion.p
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-red-500 text-sm mt-1 flex items-center gap-1"
                        >
                          <AlertCircle className="w-3 h-3" />
                          {errors.firstName}
                        </motion.p>
                      )}
                    </div>

                    <div>
                      <div className="relative group">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                          <User className={`w-5 h-5 transition ${
                            errors.lastName ? 'text-red-500' : 'text-slate-400 group-focus-within:text-blue-500'
                          }`} />
                        </div>
                        <input
                          type="text"
                          placeholder="Last Name"
                          value={formData.lastName}
                          onChange={(e) => {
                            setFormData({ ...formData, lastName: e.target.value });
                            if (errors.lastName) setErrors({ ...errors, lastName: '' });
                          }}
                          className={`w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-slate-800 border ${
                            errors.lastName ? 'border-red-500' : 'border-slate-200 dark:border-slate-700'
                          } rounded-xl text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
                        />
                      </div>
                      {errors.lastName && (
                        <motion.p
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-red-500 text-sm mt-1 flex items-center gap-1"
                        >
                          <AlertCircle className="w-3 h-3" />
                          {errors.lastName}
                        </motion.p>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Email Field */}
              <div>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                    <Mail className={`w-5 h-5 transition ${
                      errors.email ? 'text-red-500' : 'text-slate-400 group-focus-within:text-blue-500'
                    }`} />
                  </div>
                  <input
                    type="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={(e) => {
                      setFormData({ ...formData, email: e.target.value });
                      if (errors.email) setErrors({ ...errors, email: '' });
                    }}
                    className={`w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-slate-800 border ${
                      errors.email ? 'border-red-500' : 'border-slate-200 dark:border-slate-700'
                    } rounded-xl text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
                  />
                </div>
                {errors.email && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-500 text-sm mt-1 flex items-center gap-1"
                  >
                    <AlertCircle className="w-3 h-3" />
                    {errors.email}
                  </motion.p>
                )}
              </div>

              {/* Password Field */}
              <div>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                    <Lock className={`w-5 h-5 transition ${
                      errors.password ? 'text-red-500' : 'text-slate-400 group-focus-within:text-blue-500'
                    }`} />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Password"
                    value={formData.password}
                    onChange={(e) => {
                      setFormData({ ...formData, password: e.target.value });
                      if (errors.password) setErrors({ ...errors, password: '' });
                    }}
                    className={`w-full pl-12 pr-12 py-4 bg-slate-50 dark:bg-slate-800 border ${
                      errors.password ? 'border-red-500' : 'border-slate-200 dark:border-slate-700'
                    } rounded-xl text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
                  />
                  <motion.button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 flex items-center pr-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </motion.button>
                </div>
                {errors.password && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-500 text-sm mt-1 flex items-center gap-1"
                  >
                    <AlertCircle className="w-3 h-3" />
                    {errors.password}
                  </motion.p>
                )}
              </div>

              {/* Confirm Password (Sign Up Only) */}
              <AnimatePresence>
                {!isLogin && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                        <Lock className={`w-5 h-5 transition ${
                          errors.confirmPassword ? 'text-red-500' : 'text-slate-400 group-focus-within:text-blue-500'
                        }`} />
                      </div>
                      <input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Confirm Password"
                        value={formData.confirmPassword}
                        onChange={(e) => {
                          setFormData({ ...formData, confirmPassword: e.target.value });
                          if (errors.confirmPassword) setErrors({ ...errors, confirmPassword: '' });
                        }}
                        className={`w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-slate-800 border ${
                          errors.confirmPassword ? 'border-red-500' : 'border-slate-200 dark:border-slate-700'
                        } rounded-xl text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
                      />
                    </div>
                    {errors.confirmPassword && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-red-500 text-sm mt-1 flex items-center gap-1"
                      >
                        <AlertCircle className="w-3 h-3" />
                        {errors.confirmPassword}
                      </motion.p>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Remember Me / Forgot Password */}
              {isLogin && (
                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center text-slate-600 dark:text-slate-400 cursor-pointer group">
                    <input 
                      type="checkbox" 
                      className="mr-2 w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500" 
                    />
                    <span className="group-hover:text-slate-900 dark:group-hover:text-white transition">Remember me</span>
                  </label>
                  <Link 
                    to="/forgot-password" 
                    className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium transition"
                  >
                    Forgot password?
                  </Link>
                </div>
              )}

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ scale: loading ? 1 : 1.02 }}
                whileTap={{ scale: loading ? 1 : 0.98 }}
                className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-xl shadow-lg shadow-blue-500/50 hover:shadow-xl hover:shadow-blue-500/60 transition-all duration-300 flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <motion.div
                      className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    />
                    Processing...
                  </>
                ) : (
                  <>
                    {isLogin ? 'Sign In' : 'Create Account'}
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </motion.button>

              {/* Divider */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-200 dark:border-slate-700"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white dark:bg-slate-900 text-slate-500">Or continue with</span>
                </div>
              </div>

              {/* Social Login */}
              <div className="grid grid-cols-3 gap-3">
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700 hover:shadow-lg transition flex items-center justify-center"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                </motion.button>
                
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700 hover:shadow-lg transition flex items-center justify-center"
                >
                  <Github className="w-5 h-5 text-slate-700 dark:text-slate-300" />
                </motion.button>
                
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700 hover:shadow-lg transition flex items-center justify-center"
                >
                  <Linkedin className="w-5 h-5 text-blue-600" />
                </motion.button>
              </div>
            </form>

            {/* Terms */}
            {!isLogin && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-6 text-xs text-center text-slate-500 dark:text-slate-400"
              >
                By signing up, you agree to our{' '}
                <a href="#terms" className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">
                  Terms of Service
                </a>{' '}
                and{' '}
                <a href="#privacy" className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">
                  Privacy Policy
                </a>
              </motion.p>
            )}
          </motion.div>

          {/* Footer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-8 text-center space-y-4"
          >
            <p className="text-sm text-slate-600 dark:text-slate-400">
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-semibold"
              >
                {isLogin ? 'Sign up for free' : 'Sign in'}
              </button>
            </p>
            
            <div className="flex items-center justify-center gap-6 text-xs text-slate-500 dark:text-slate-400">
              <a href="#about" className="hover:text-slate-700 dark:hover:text-slate-300 transition">About</a>
              <span>•</span>
              <a href="#blog" className="hover:text-slate-700 dark:hover:text-slate-300 transition">Blog</a>
              <span>•</span>
              <a href="#help" className="hover:text-slate-700 dark:hover:text-slate-300 transition">Help</a>
            </div>
          </motion.div>
        </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LoginPage;

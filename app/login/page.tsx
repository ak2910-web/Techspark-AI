import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Lock, Mail, Eye, EyeOff, Sparkles, ArrowRight, Twitter, Facebook, Instagram } from 'lucide-react';
import { Link } from 'react-router-dom';

const LoginPage: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background with Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1a1f35] via-[#2d1b3d] to-[#1e2640]">
        {/* Animated Particles/Dots */}
        <div className="absolute inset-0">
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full opacity-20"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.2, 0.5, 0.2],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        {/* Gradient Orbs */}
        <motion.div
          className="absolute w-96 h-96 rounded-full bg-[#08D9D6] opacity-10 blur-3xl"
          style={{ top: '10%', left: '20%' }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.15, 0.1],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute w-96 h-96 rounded-full bg-[#FF2E63] opacity-10 blur-3xl"
          style={{ bottom: '10%', right: '20%' }}
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.1, 0.15, 0.1],
          }}
          transition={{ duration: 10, repeat: Infinity, delay: 1 }}
        />
      </div>

      {/* Top Navigation Bar */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 flex items-center justify-between px-8 py-6"
      >
        <Link to="/" className="flex items-center gap-3">
          <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center">
            <svg className="w-5 h-5 text-white" viewBox="0 0 200 200" fill="currentColor">
              <path d="M60 40 L130 40 L185 70 L185 80 L140 80 L140 100 L100 100 L100 80 L65 80 L65 70 Z M80 120 Q80 100 100 100 L120 100 Q140 100 140 120 L140 160 L100 160 L100 140 L80 140 Z M100 140 L120 140 L120 160 L100 160 Z" />
            </svg>
          </div>
          <span className="text-2xl font-bold text-white">FundSpark AI</span>
        </Link>

        <div className="flex items-center gap-6">
          <Link to="/" className="text-white/80 hover:text-white transition text-sm font-medium">
            BACK TO HOME
          </Link>
          <a href="#help" className="text-white/80 hover:text-white transition text-sm font-medium">
            HAVE AN ISSUE?
          </a>
          <div className="flex items-center gap-3 ml-4">
            <a href="https://twitter.com" className="text-white/60 hover:text-white transition">
              <Twitter className="w-5 h-5" />
            </a>
            <a href="https://facebook.com" className="text-white/60 hover:text-white transition">
              <Facebook className="w-5 h-5" />
            </a>
            <a href="https://instagram.com" className="text-white/60 hover:text-white transition">
              <Instagram className="w-5 h-5" />
            </a>
          </div>
        </div>
      </motion.nav>

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center min-h-[calc(100vh-120px)] px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full max-w-md"
        >
          {/* Logo Section */}
          <motion.div
            className="text-center mb-10"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="inline-flex items-center justify-center w-24 h-24 mb-6 relative">
              {/* Pulsing Rings */}
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-[#08D9D6]"
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.5, 0, 0.5],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-[#08D9D6]"
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.5, 0, 0.5],
                }}
                transition={{ duration: 2, repeat: Infinity, delay: 1 }}
              />
              
              {/* Logo */}
              <div className="w-20 h-20 bg-black rounded-2xl flex items-center justify-center shadow-2xl shadow-[#08D9D6]/50 relative z-10">
                <svg className="w-12 h-12 text-white" viewBox="0 0 200 200" fill="currentColor">
                  <path d="M60 40 L130 40 L185 70 L185 80 L140 80 L140 100 L100 100 L100 80 L65 80 L65 70 Z M80 120 Q80 100 100 100 L120 100 Q140 100 140 120 L140 160 L100 160 L100 140 L80 140 Z M100 140 L120 140 L120 160 L100 160 Z" />
                </svg>
              </div>
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Welcome to FundSpark AI</h1>
            <p className="text-white/60 text-sm">Your AI-powered fundraising companion</p>
          </motion.div>

          {/* Form Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="backdrop-blur-xl bg-white/10 rounded-3xl p-8 shadow-2xl border border-white/20"
          >
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Toggle Login/Signup */}
              <div className="flex gap-2 mb-8">
                <button
                  type="button"
                  onClick={() => setIsLogin(true)}
                  className={`flex-1 py-3 rounded-xl font-semibold transition-all duration-300 ${
                    isLogin
                      ? 'bg-gradient-to-r from-[#08D9D6] to-[#06b5b3] text-white shadow-lg shadow-[#08D9D6]/50'
                      : 'bg-white/5 text-white/60 hover:bg-white/10'
                  }`}
                >
                  Sign In
                </button>
                <button
                  type="button"
                  onClick={() => setIsLogin(false)}
                  className={`flex-1 py-3 rounded-xl font-semibold transition-all duration-300 ${
                    !isLogin
                      ? 'bg-gradient-to-r from-[#FF2E63] to-[#e02857] text-white shadow-lg shadow-[#FF2E63]/50'
                      : 'bg-white/5 text-white/60 hover:bg-white/10'
                  }`}
                >
                  Sign Up
                </button>
              </div>

              {/* Name Fields (Sign Up Only) */}
              {!isLogin && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-5"
                >
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                      <User className="w-5 h-5 text-white/40 group-focus-within:text-[#08D9D6] transition" />
                    </div>
                    <input
                      type="text"
                      placeholder="First Name..."
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-[#08D9D6] focus:bg-white/10 transition-all duration-300"
                    />
                  </div>

                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                      <User className="w-5 h-5 text-white/40 group-focus-within:text-[#08D9D6] transition" />
                    </div>
                    <input
                      type="text"
                      placeholder="Last Name..."
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-[#08D9D6] focus:bg-white/10 transition-all duration-300"
                    />
                  </div>
                </motion.div>
              )}

              {/* Email Field */}
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                  <Mail className="w-5 h-5 text-white/40 group-focus-within:text-[#08D9D6] transition" />
                </div>
                <input
                  type="email"
                  placeholder="Email Address..."
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-[#08D9D6] focus:bg-white/10 transition-all duration-300"
                  required
                />
              </div>

              {/* Password Field */}
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                  <Lock className="w-5 h-5 text-white/40 group-focus-within:text-[#08D9D6] transition" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Password..."
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full pl-12 pr-12 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-[#08D9D6] focus:bg-white/10 transition-all duration-300"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-4 text-white/40 hover:text-white transition"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>

              {/* Forgot Password (Login Only) */}
              {isLogin && (
                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center text-white/60 cursor-pointer">
                    <input type="checkbox" className="mr-2 rounded" />
                    Remember me
                  </label>
                  <a href="#forgot" className="text-[#08D9D6] hover:text-[#06b5b3] transition">
                    Forgot password?
                  </a>
                </div>
              )}

              {/* Submit Button */}
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-4 bg-gradient-to-r from-[#FF2E63] to-[#FF6B8A] text-white font-bold rounded-xl shadow-2xl shadow-[#FF2E63]/50 hover:shadow-[#FF2E63]/70 transition-all duration-300 flex items-center justify-center gap-2 group"
              >
                {isLogin ? 'Sign In' : 'Get Started'}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>

              {/* Divider */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/10"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-transparent text-white/40">or continue with</span>
                </div>
              </div>

              {/* Social Login */}
              <div className="grid grid-cols-3 gap-3">
                <button
                  type="button"
                  className="py-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition flex items-center justify-center"
                >
                  <svg className="w-5 h-5" fill="#1DA1F2" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </button>
                <button
                  type="button"
                  className="py-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition flex items-center justify-center"
                >
                  <svg className="w-5 h-5" fill="#4267B2" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </button>
                <button
                  type="button"
                  className="py-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition flex items-center justify-center"
                >
                  <svg className="w-5 h-5" fill="url(#instagram-gradient)" viewBox="0 0 24 24">
                    <defs>
                      <linearGradient id="instagram-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#f09433" />
                        <stop offset="25%" stopColor="#e6683c" />
                        <stop offset="50%" stopColor="#dc2743" />
                        <stop offset="75%" stopColor="#cc2366" />
                        <stop offset="100%" stopColor="#bc1888" />
                      </linearGradient>
                    </defs>
                    <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"/>
                  </svg>
                </button>
              </div>
            </form>

            {/* Help Links */}
            <div className="mt-8 flex items-center justify-between text-sm">
              <a href="#create" className="text-white/60 hover:text-[#08D9D6] transition font-medium">
                CREATE ACCOUNT
              </a>
              <a href="#help" className="text-white/60 hover:text-[#08D9D6] transition font-medium">
                NEED HELP?
              </a>
            </div>
          </motion.div>

          {/* Footer Links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-8 text-center"
          >
            <div className="flex items-center justify-center gap-6 text-sm text-white/60">
              <a href="#creative" className="hover:text-white transition">CREATIVE TIM</a>
              <span>•</span>
              <a href="#about" className="hover:text-white transition">ABOUT US</a>
              <span>•</span>
              <a href="#blog" className="hover:text-white transition">BLOG</a>
            </div>
            <p className="mt-4 text-sm text-white/40">
              Made with <span className="text-[#FF2E63]">❤</span> by{' '}
              <a href="#" className="text-[#08D9D6] hover:text-[#06b5b3] transition">FundSpark AI</a>
              {' '}team
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default LoginPage;

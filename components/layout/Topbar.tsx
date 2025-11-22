import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Bell,
  Sun,
  Moon,
  User,
  Settings,
  LogOut,
  ChevronDown,
  Mail,
  HelpCircle,
  Home
} from 'lucide-react';

interface TopbarProps {
  sidebarCollapsed: boolean;
}

const Topbar: React.FC<TopbarProps> = ({ sidebarCollapsed }) => {
  const [searchFocused, setSearchFocused] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const notifications = [
    { id: 1, title: 'New Investor Match', message: 'You have 3 new investor matches', time: '5 min ago', unread: true },
    { id: 2, title: 'Content Score Updated', message: 'Your content score improved to 92', time: '1 hour ago', unread: true },
    { id: 3, title: 'Competitor Analysis', message: 'New competitor data available', time: '2 hours ago', unread: false },
  ];

  const unreadCount = notifications.filter(n => n.unread).length;

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ 
        y: 0,
        marginLeft: sidebarCollapsed ? 80 : 280 
      }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="fixed top-0 right-0 h-20 bg-white border-b border-slate-200 shadow-sm z-30 flex items-center px-6 gap-6"
      style={{ width: sidebarCollapsed ? 'calc(100% - 80px)' : 'calc(100% - 280px)' }}
    >
      {/* Search Bar */}
      <div className="flex-1 max-w-2xl">
        <motion.div
          animate={{
            boxShadow: searchFocused 
              ? '0 0 0 3px rgba(59, 130, 246, 0.1)' 
              : '0 0 0 0px rgba(59, 130, 246, 0)'
          }}
          className="relative"
        >
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
            placeholder="Search for investors, startups, insights..."
            className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-500 focus:outline-none focus:border-[#08D9D6] transition-all"
          />
        </motion.div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-3">
        {/* Home Button */}
        <Link to="/">
          <motion.button
            className="p-2.5 rounded-lg bg-slate-100 hover:bg-[#08D9D6] hover:text-white transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            title="Go to Home"
          >
            <Home className="w-5 h-5" />
          </motion.button>
        </Link>

        {/* Theme Switcher */}
        <motion.button
          onClick={toggleTheme}
          className="p-2.5 rounded-lg bg-slate-100 hover:bg-slate-200 transition-colors relative overflow-hidden"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <AnimatePresence mode="wait">
            {theme === 'light' ? (
              <motion.div
                key="sun"
                initial={{ rotate: -180, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 180, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Sun className="w-5 h-5 text-amber-500" />
              </motion.div>
            ) : (
              <motion.div
                key="moon"
                initial={{ rotate: 180, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -180, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Moon className="w-5 h-5 text-slate-700" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>

        {/* Notifications */}
        <div className="relative">
          <motion.button
            onClick={() => setNotificationsOpen(!notificationsOpen)}
            className="p-2.5 rounded-lg bg-slate-100 hover:bg-slate-200 transition-colors relative"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Bell className="w-5 h-5 text-slate-700" />
            {unreadCount > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center"
              >
                {unreadCount}
              </motion.span>
            )}
          </motion.button>

          <AnimatePresence>
            {notificationsOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="absolute right-0 top-14 w-80 bg-white border border-slate-200 rounded-xl shadow-xl overflow-hidden"
              >
                <div className="p-4 border-b border-slate-200 flex items-center justify-between">
                  <h3 className="font-bold text-slate-900">Notifications</h3>
                  <button className="text-xs text-blue-600 font-semibold hover:text-blue-700">
                    Mark all read
                  </button>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-4 border-b border-slate-100 hover:bg-slate-50 transition-colors cursor-pointer ${
                        notification.unread ? 'bg-blue-50/50' : ''
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        {notification.unread && (
                          <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                        )}
                        <div className="flex-1">
                          <h4 className="font-semibold text-sm text-slate-900">{notification.title}</h4>
                          <p className="text-sm text-slate-600 mt-1">{notification.message}</p>
                          <span className="text-xs text-slate-500 mt-2 block">{notification.time}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-3 bg-slate-50 text-center">
                  <button className="text-sm text-blue-600 font-semibold hover:text-blue-700">
                    View all notifications
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Profile Dropdown */}
        <div className="relative">
          <motion.button
            onClick={() => setProfileOpen(!profileOpen)}
            className="flex items-center gap-3 p-2 pr-3 rounded-lg bg-slate-100 hover:bg-slate-200 transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold">
              A
            </div>
            <div className="hidden md:block text-left">
              <p className="text-sm font-semibold text-slate-900">Amit Kumar</p>
              <p className="text-xs text-slate-500">Founder</p>
            </div>
            <ChevronDown className="w-4 h-4 text-slate-500" />
          </motion.button>

          <AnimatePresence>
            {profileOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="absolute right-0 top-14 w-64 bg-white border border-slate-200 rounded-xl shadow-xl overflow-hidden"
              >
                <div className="p-4 border-b border-slate-200">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-lg">
                      A
                    </div>
                    <div>
                      <p className="font-bold text-slate-900">Amit Kumar</p>
                      <p className="text-sm text-slate-500">amit@startup.com</p>
                    </div>
                  </div>
                  <button className="w-full py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg text-sm font-semibold hover:shadow-lg transition-all">
                    View Profile
                  </button>
                </div>
                
                <div className="py-2">
                  {[
                    { icon: <User className="w-4 h-4" />, label: 'My Account' },
                    { icon: <Settings className="w-4 h-4" />, label: 'Settings' },
                    { icon: <Mail className="w-4 h-4" />, label: 'Messages' },
                    { icon: <HelpCircle className="w-4 h-4" />, label: 'Help & Support' },
                  ].map((item, index) => (
                    <button
                      key={index}
                      className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-slate-50 transition-colors text-slate-700"
                    >
                      {item.icon}
                      <span className="text-sm font-medium">{item.label}</span>
                    </button>
                  ))}
                </div>

                <div className="border-t border-slate-200 p-2">
                  <button className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-red-50 rounded-lg transition-colors text-red-600">
                    <LogOut className="w-4 h-4" />
                    <span className="text-sm font-medium">Sign Out</span>
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.header>
  );
};

export default Topbar;

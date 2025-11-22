import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { motion } from 'framer-motion';

const ThemeToggle: React.FC = () => {
  const { isDarkMode, toggleDarkMode } = useTheme();

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={toggleDarkMode}
      className={`
        relative p-2 rounded-lg transition-all duration-300
        ${isDarkMode 
          ? 'bg-slate-800 text-yellow-400 hover:bg-slate-700' 
          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
        }
      `}
      aria-label="Toggle dark mode"
    >
      <div className="relative w-6 h-6">
        <motion.div
          initial={false}
          animate={{
            scale: isDarkMode ? 0 : 1,
            rotate: isDarkMode ? 180 : 0,
            opacity: isDarkMode ? 0 : 1
          }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0"
        >
          <Sun className="w-6 h-6" />
        </motion.div>
        <motion.div
          initial={false}
          animate={{
            scale: isDarkMode ? 1 : 0,
            rotate: isDarkMode ? 0 : -180,
            opacity: isDarkMode ? 1 : 0
          }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0"
        >
          <Moon className="w-6 h-6" />
        </motion.div>
      </div>
    </motion.button>
  );
};

export default ThemeToggle;

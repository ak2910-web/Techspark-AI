import React from 'react';
import { AlertCircle, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const ApiKeyBanner: React.FC = () => {
  const [dismissed, setDismissed] = React.useState(() => {
    return localStorage.getItem('apiKeyBannerDismissed') === 'true';
  });

  const hasApiKey = !!(import.meta.env.VITE_GOOGLE_API_KEY || import.meta.env.VITE_API_KEY);

  const handleDismiss = () => {
    setDismissed(true);
    localStorage.setItem('apiKeyBannerDismissed', 'true');
  };

  if (hasApiKey || dismissed) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        className="fixed top-0 left-0 right-0 z-50 bg-amber-500 text-white px-4 py-3 shadow-lg"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <p className="text-sm font-medium">
              <strong>AI features are disabled.</strong> Add <code className="bg-amber-600 px-2 py-0.5 rounded">VITE_GOOGLE_API_KEY</code> to your environment variables to enable AI-powered content analysis, market intelligence, and fundraising tools.
            </p>
          </div>
          <button
            onClick={handleDismiss}
            className="flex-shrink-0 p-1 hover:bg-amber-600 rounded transition"
            aria-label="Dismiss banner"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

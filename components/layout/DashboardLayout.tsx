import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Sidebar */}
      <Sidebar />

      {/* Topbar */}
      <Topbar sidebarCollapsed={sidebarCollapsed} />

      {/* Main Content Area */}
      <motion.main
        animate={{ 
          marginLeft: sidebarCollapsed ? 80 : 280,
          marginTop: 80 
        }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="min-h-screen p-6"
      >
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </motion.main>
    </div>
  );
};

export default DashboardLayout;

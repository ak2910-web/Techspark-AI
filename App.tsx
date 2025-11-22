import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './app/page';
import DashboardPage from './app/dashboard/page';
import FundraisingPage from './app/dashboard/investors/page';
import AnalysisPage from './app/dashboard/analysis/page';
import CompetitorsPage from './app/dashboard/competitors/page';
import CreateStartup from './app/startup/create';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Route */}
        <Route path="/" element={<HomePage />} />
        
        {/* Startup Routes */}
        <Route path="/startup/create" element={<CreateStartup />} />
        <Route path="/startup/detail" element={<DashboardPage />} />
        <Route path="/startup/dashboard" element={<DashboardPage />} />
        <Route path="/startup/analysis" element={<AnalysisPage />} />
        <Route path="/startup/competitors" element={<CompetitorsPage />} />
        <Route path="/startup/investors" element={<FundraisingPage />} />
        <Route path="/startup/recommendations" element={<DashboardPage />} />
        <Route path="/startup/content" element={<DashboardPage />} />
        
        {/* Investor Routes */}
        <Route path="/investor/dashboard" element={<DashboardPage />} />
        <Route path="/investor/explorer" element={<DashboardPage />} />
        <Route path="/investor/profile" element={<DashboardPage />} />
        <Route path="/investor/portfolio" element={<DashboardPage />} />
        <Route path="/investor/thesis" element={<DashboardPage />} />
        
        {/* Legacy Dashboard Routes (redirect to startup) */}
        <Route path="/dashboard" element={<Navigate to="/startup/dashboard" replace />} />
        <Route path="/dashboard/investors" element={<Navigate to="/startup/investors" replace />} />
        <Route path="/dashboard/analysis" element={<Navigate to="/startup/analysis" replace />} />
        <Route path="/dashboard/competitors" element={<Navigate to="/startup/competitors" replace />} />
        
        {/* Catch all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import HomePage from './app/page';
import LoginPage from './app/login/page';
import DashboardPage from './app/dashboard/page';
import FundraisingPage from './app/dashboard/investors/page';
import AnalysisPage from './app/dashboard/analysis/page';
import CompetitorsPage from './app/dashboard/competitors/page';
import CreateStartup from './app/startup/create';
import StartupDetail from './app/startup/detail';
import RecommendationsPage from './app/startup/recommendations/page';
import ContentOptimizerPage from './app/startup/content/page';
import SecuritySettings from './app/security/page';
import PitchDeckReviewer from './app/pitch-review/page';
import InvestorDashboardPage from './app/investor/dashboard/page';
import StartupExplorerPage from './app/investor/explorer/page';
import InvestorProfilePage from './app/investor/profile/page';
import PortfolioPage from './app/investor/portfolio/page';
import InvestmentThesisPage from './app/investor/thesis/page';

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <HashRouter>
        <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        
        {/* Premium Features */}
        <Route path="/security" element={<SecuritySettings />} />
        <Route path="/pitch-review" element={<PitchDeckReviewer />} />
        
        {/* Startup Routes */}
        <Route path="/startup/create" element={<CreateStartup />} />
        <Route path="/startup/detail" element={<StartupDetail />} />
        <Route path="/startup/dashboard" element={<DashboardPage />} />
        <Route path="/startup/analysis" element={<AnalysisPage />} />
        <Route path="/startup/competitors" element={<CompetitorsPage />} />
        <Route path="/startup/investors" element={<FundraisingPage />} />
        <Route path="/startup/recommendations" element={<RecommendationsPage />} />
        <Route path="/startup/content" element={<ContentOptimizerPage />} />
        
        {/* Investor Routes */}
        <Route path="/investor/dashboard" element={<InvestorDashboardPage />} />
        <Route path="/investor/explorer" element={<StartupExplorerPage />} />
        <Route path="/investor/profile" element={<InvestorProfilePage />} />
        <Route path="/investor/portfolio" element={<PortfolioPage />} />
        <Route path="/investor/thesis" element={<InvestmentThesisPage />} />
        
        {/* Legacy Dashboard Routes (redirect to startup) */}
        <Route path="/dashboard" element={<Navigate to="/startup/dashboard" replace />} />
        <Route path="/dashboard/investors" element={<Navigate to="/startup/investors" replace />} />
        <Route path="/dashboard/analysis" element={<Navigate to="/startup/analysis" replace />} />
        <Route path="/dashboard/competitors" element={<Navigate to="/startup/competitors" replace />} />
        
        {/* Catch all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </HashRouter>
  </ThemeProvider>
  );
};

export default App;
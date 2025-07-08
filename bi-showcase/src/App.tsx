import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import MobileOptimizations from './components/Layout/MobileOptimizations';
import PerformanceMonitor from './components/Common/PerformanceMonitor';
import ResponsiveTest from './components/Testing/ResponsiveTest';
import HomePage from './pages/HomePage';
import ExecutiveDashboard from './components/Dashboards/ExecutiveDashboard';
import ProductOwnerDashboard from './components/Dashboards/ProductOwnerDashboard';
import UAMonetizationDashboard from './components/Dashboards/UAMonetizationDashboard';
import TechnicalHealthDashboard from './components/Dashboards/TechnicalHealthDashboard';
import FinanceDashboard from './components/Dashboards/FinanceDashboard';
import ChartGallery from './components/Charts/ChartGallery';
import MetricsLibrary from './components/Metrics/MetricsLibrary';
import DevelopmentGuide from './components/Development/DevelopmentGuide';
import AdvancedAnalytics from './components/Analytics/AdvancedAnalytics';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <Router>
      <div className="min-h-screen">
        <Header isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/dashboard/executive" element={<ExecutiveDashboard />} />
          <Route path="/dashboard/product" element={<ProductOwnerDashboard />} />
          <Route path="/dashboard/ua-monetization" element={<UAMonetizationDashboard />} />
          <Route path="/dashboard/technical" element={<TechnicalHealthDashboard />} />
          <Route path="/dashboard/finance" element={<FinanceDashboard />} />
          <Route path="/charts" element={<ChartGallery />} />
          <Route path="/metrics" element={<MetricsLibrary />} />
          <Route path="/analytics" element={<AdvancedAnalytics />} />
          <Route path="/development" element={<DevelopmentGuide />} />
          {/* More routes will be added here */}
        </Routes>
        <Footer />
        <MobileOptimizations />
        <PerformanceMonitor />
        <ResponsiveTest />
      </div>
    </Router>
  );
}

export default App;

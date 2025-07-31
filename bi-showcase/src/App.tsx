import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Layout/Header';
import Sidebar from './components/Layout/Sidebar';
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
import GrowthEngagementDashboard from './components/Dashboards/GrowthEngagementDashboard';
import ChartGallery from './components/Charts/ChartGallery';
import MetricsLibrary from './components/Metrics/MetricsLibrary';
import DevelopmentGuide from './components/Development/DevelopmentGuide';
import AdvancedAnalytics from './components/Analytics/AdvancedAnalytics';
import MonetizationPage from './pages/MonetizationPage';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Default open on desktop

  const handleMenuToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleSidebarClose = () => {
    // Only close on mobile, keep open on desktop
    if (window.innerWidth < 1024) {
      setIsSidebarOpen(false);
    }
  };

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        // Desktop: keep sidebar open by default
        setIsSidebarOpen(true);
      } else {
        // Mobile: close sidebar by default
        setIsSidebarOpen(false);
      }
    };

    // Set initial state
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <Router>
      <div className="min-h-screen bg-gray-900">
        {/* Sidebar */}
        <Sidebar isOpen={isSidebarOpen} onClose={handleSidebarClose} />

        {/* Main Content */}
        <div className={`transition-all duration-300 ${isSidebarOpen ? 'lg:pl-80' : 'lg:pl-0'}`}>
          <Header onMenuToggle={handleMenuToggle} isSidebarOpen={isSidebarOpen} />
          <main className="relative">
            <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/dashboard/executive" element={<ExecutiveDashboard />} />
          <Route path="/dashboard/product" element={<ProductOwnerDashboard />} />
          <Route path="/dashboard/ua-monetization" element={<UAMonetizationDashboard />} />
          <Route path="/dashboard/technical" element={<TechnicalHealthDashboard />} />
          <Route path="/dashboard/finance" element={<FinanceDashboard />} />
          <Route path="/dashboard/growth-engagement" element={<GrowthEngagementDashboard />} />
          <Route path="/charts" element={<ChartGallery />} />
          <Route path="/metrics" element={<MetricsLibrary />} />
          <Route path="/analytics" element={<AdvancedAnalytics />} />
          <Route path="/monetization" element={<MonetizationPage />} />
              <Route path="/development" element={<DevelopmentGuide />} />
              {/* More routes will be added here */}
            </Routes>
          </main>
          <Footer />
        </div>

        <MobileOptimizations />
        <PerformanceMonitor />
        <ResponsiveTest />
      </div>
    </Router>
  );
}

export default App;

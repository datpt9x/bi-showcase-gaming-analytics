import React from 'react';
import HeroSection from '../components/Home/HeroSection';
import OverviewSection from '../components/Home/OverviewSection';
import QuickDemoSection from '../components/Home/QuickDemoSection';
import DashboardShowcaseSection from '../components/Home/DashboardShowcaseSection';

const HomePage: React.FC = () => {
  return (
    <main>
      <HeroSection />
      <OverviewSection />
      <QuickDemoSection />
      <DashboardShowcaseSection />
    </main>
  );
};

export default HomePage;

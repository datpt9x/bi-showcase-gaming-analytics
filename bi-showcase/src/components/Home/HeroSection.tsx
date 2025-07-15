import React from 'react';
import { TrendingUp, Users, DollarSign, Smartphone } from 'lucide-react';

const HeroSection: React.FC = () => {
  console.log('HeroSection rendering...');
  const stats = [
    {
      icon: <Users className="h-8 w-8" />,
      value: "2.5M+",
      label: "Daily Active Users",
      color: "text-blue-400"
    },
    {
      icon: <DollarSign className="h-8 w-8" />,
      value: "$12.8M",
      label: "Monthly Revenue",
      color: "text-green-400"
    },
    {
      icon: <TrendingUp className="h-8 w-8" />,
      value: "85%",
      label: "D1 Retention",
      color: "text-purple-400"
    },
    {
      icon: <Smartphone className="h-8 w-8" />,
      value: "150+",
      label: "Countries",
      color: "text-orange-400"
    }
  ];

  return (
    <section id="home" className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-20 bg-red-500/20">
      <div className="max-w-7xl mx-auto text-center">
        {/* Main Hero Content */}
        <div className="mb-16">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Business Intelligence
            <span className="block bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              for Gaming & Mobile
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-white/80 mb-8 max-w-4xl mx-auto leading-relaxed">
            Comprehensive BI platform showcasing real-time analytics, interactive dashboards, 
            and development insights for gaming and mobile app companies worldwide.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-gray-900 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105">
              Explore Dashboards
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-gray-900 transition-all duration-300">
              View Development Guide
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat, index) => (
            <div 
              key={index}
              className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:scale-105"
            >
              <div className={`${stat.color} mb-3 flex justify-center`}>
                {stat.icon}
              </div>
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                {stat.value}
              </div>
              <div className="text-white/70 text-sm md:text-base">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-blue-400/20 rounded-full blur-xl float-animation"></div>
        <div className="absolute top-40 right-20 w-32 h-32 bg-purple-400/20 rounded-full blur-xl float-animation" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-20 left-20 w-24 h-24 bg-green-400/20 rounded-full blur-xl float-animation" style={{animationDelay: '2s'}}></div>
      </div>
    </section>
  );
};

export default HeroSection;

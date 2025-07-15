import React from 'react';
import { 
  BarChart3, 
  PieChart, 
  TrendingUp, 
  Users, 
  DollarSign, 
  Smartphone,
  Target,
  Zap,
  Shield,
  Globe
} from 'lucide-react';

const OverviewSection: React.FC = () => {
  const features = [
    {
      icon: <BarChart3 className="h-8 w-8" />,
      title: "Real-time Dashboards",
      description: "Live analytics for DAU, revenue, retention, and performance metrics",
      color: "bg-blue-500"
    },
    {
      icon: <PieChart className="h-8 w-8" />,
      title: "Interactive Charts",
      description: "Comprehensive visualization library with 20+ chart types",
      color: "bg-purple-500"
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "User Analytics",
      description: "Player journey, cohort analysis, and behavioral insights",
      color: "bg-green-500"
    },
    {
      icon: <DollarSign className="h-8 w-8" />,
      title: "Monetization Tracking",
      description: "Revenue optimization, ARPU analysis, and conversion funnels",
      color: "bg-yellow-500"
    },
    {
      icon: <Target className="h-8 w-8" />,
      title: "Campaign Analytics",
      description: "UA performance, ROAS tracking, and creative optimization",
      color: "bg-red-500"
    },
    {
      icon: <Smartphone className="h-8 w-8" />,
      title: "Mobile-First Design",
      description: "Responsive dashboards optimized for mobile decision-making",
      color: "bg-indigo-500"
    }
  ];

  const benefits = [
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Lightning Fast",
      description: "Real-time data processing with sub-second response times"
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Enterprise Security",
      description: "Role-based access control and data encryption"
    },
    {
      icon: <Globe className="h-6 w-6" />,
      title: "Global Scale",
      description: "Multi-region deployment supporting millions of users"
    }
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white/5 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Complete BI Solution for
            <span className="block bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Gaming & Mobile Apps
            </span>
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            From real-time analytics to development guidance, our comprehensive platform 
            provides everything you need to build and scale a world-class BI system.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:scale-105"
            >
              <div className={`${feature.color} w-16 h-16 rounded-lg flex items-center justify-center text-white mb-4`}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-white/70">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Benefits Section */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
          <h3 className="text-2xl font-bold text-white mb-8 text-center">
            Why Choose Our BI Platform?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center">
                <div className="bg-white/20 w-12 h-12 rounded-lg flex items-center justify-center text-white mx-auto mb-4">
                  {benefit.icon}
                </div>
                <h4 className="text-lg font-semibold text-white mb-2">
                  {benefit.title}
                </h4>
                <p className="text-white/70">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <h3 className="text-2xl font-bold text-white mb-4">
            Ready to Transform Your Data into Insights?
          </h3>
          <p className="text-white/80 mb-8 max-w-2xl mx-auto">
            Explore our interactive demos, browse the comprehensive chart library, 
            and discover how to build your own BI system.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-8 py-4 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105">
              Start Exploring
            </button>
            <button className="border-2 border-white/50 text-white px-8 py-4 rounded-lg font-semibold hover:bg-white/10 transition-all duration-300">
              View Documentation
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OverviewSection;

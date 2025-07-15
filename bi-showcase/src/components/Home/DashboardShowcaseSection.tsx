import React from 'react';
import { Link } from 'react-router-dom';
import {
  Crown,
  Gamepad2,
  Target,
  Bug,
  Calculator,
  ArrowRight,
  Eye,
  TrendingUp,
  Settings
} from 'lucide-react';

const DashboardShowcaseSection: React.FC = () => {
  const dashboards = [
    {
      id: 'executive',
      title: 'Executive Dashboard',
      subtitle: 'For Leadership & Decision Makers',
      icon: <Crown className="h-8 w-8" />,
      color: 'from-purple-500 to-pink-500',
      features: [
        'Real-time Revenue Tracking',
        'Portfolio Performance Overview',
        'Market Intelligence Insights',
        'Predictive Analytics'
      ],
      metrics: ['Revenue', 'DAU/MAU', 'ARPU', 'Market Share'],
      image: '👑'
    },
    {
      id: 'product',
      title: 'Product Analytics',
      subtitle: 'For Product Owners & Game Designers',
      icon: <Gamepad2 className="h-8 w-8" />,
      color: 'from-blue-500 to-cyan-500',
      features: [
        'Player Journey Mapping',
        'Level Analytics & Difficulty',
        'A/B Testing Results',
        'Feature Adoption Tracking'
      ],
      metrics: ['Retention', 'Session Length', 'Progression', 'Engagement'],
      image: '🎮'
    },
    {
      id: 'marketing',
      title: 'UA & Monetization',
      subtitle: 'For Marketing & Growth Teams',
      icon: <Target className="h-8 w-8" />,
      color: 'from-green-500 to-emerald-500',
      features: [
        'Campaign Performance Tracking',
        'Creative Analytics & Fatigue',
        'ROAS Optimization',
        'Fraud Detection'
      ],
      metrics: ['CPI', 'ROAS', 'LTV', 'Conversion Rate'],
      image: '🎯'
    },
    {
      id: 'technical',
      title: 'Technical Health',
      subtitle: 'For QA & Development Teams',
      icon: <Bug className="h-8 w-8" />,
      color: 'from-red-500 to-orange-500',
      features: [
        'Crash Rate Monitoring',
        'Performance Optimization',
        'Quality Metrics Tracking',
        'Error Analytics'
      ],
      metrics: ['Crash Rate', 'Load Time', 'Memory Usage', 'API Response'],
      image: '🔧'
    },
    {
      id: 'finance',
      title: 'Financial Analytics',
      subtitle: 'For Finance & Operations',
      icon: <Calculator className="h-8 w-8" />,
      color: 'from-yellow-500 to-amber-500',
      features: [
        'Budget vs Actual Analysis',
        'Investment ROI Tracking',
        'Multi-currency Support',
        'Cost Center Management'
      ],
      metrics: ['Budget Variance', 'ROI', 'Cash Flow', 'Unit Economics'],
      image: '💰'
    },
    {
      id: 'growth-engagement',
      title: 'Growth & Engagement',
      subtitle: 'For Growth & Product Teams',
      icon: <TrendingUp className="h-8 w-8" />,
      color: 'from-cyan-500 to-teal-500',
      features: [
        'User Growth Tracking',
        'Viral Coefficient Analysis',
        'Engagement Metrics',
        'Feature Adoption Rates'
      ],
      metrics: ['Growth Rate', 'Viral Coefficient', 'Engagement Score', 'Time to Purchase'],
      image: '📈'
    }
  ];

  return (
    <section id="dashboards" className="py-20 px-4 sm:px-6 lg:px-8 bg-white/5 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Role-Based
            <span className="block bg-gradient-to-r from-yellow-400 to-red-400 bg-clip-text text-transparent">
              Dashboard Collection
            </span>
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            Specialized dashboards designed for different roles and responsibilities,
            from C-level executives to technical teams.
          </p>
        </div>

        {/* Dashboards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 mb-16">
          {dashboards.map((dashboard, index) => (
            <div
              key={dashboard.id}
              className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 overflow-hidden hover:bg-white/20 transition-all duration-300 transform hover:scale-105 group"
            >
              {/* Header */}
              <div className={`bg-gradient-to-r ${dashboard.color} p-6`}>
                <div className="flex items-center justify-between mb-4">
                  <div className="bg-white/20 p-3 rounded-lg">
                    {dashboard.icon}
                  </div>
                  <div className="text-4xl">{dashboard.image}</div>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  {dashboard.title}
                </h3>
                <p className="text-white/90 text-sm">
                  {dashboard.subtitle}
                </p>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Features */}
                <div className="mb-6">
                  <h4 className="text-white font-semibold mb-3">Key Features:</h4>
                  <ul className="space-y-2">
                    {dashboard.features.map((feature, idx) => (
                      <li key={idx} className="text-white/70 text-sm flex items-center">
                        <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-2"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Metrics */}
                <div className="mb-6">
                  <h4 className="text-white font-semibold mb-3">Core Metrics:</h4>
                  <div className="flex flex-wrap gap-2">
                    {dashboard.metrics.map((metric, idx) => (
                      <span
                        key={idx}
                        className="bg-white/10 text-white/80 px-3 py-1 rounded-full text-xs border border-white/20"
                      >
                        {metric}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex space-x-3">
                  {dashboard.id === 'executive' ? (
                    <Link
                      to="/dashboard/executive"
                      className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors flex items-center justify-center space-x-2"
                    >
                      <Eye className="h-4 w-4" />
                      <span>View Demo</span>
                    </Link>
                  ) : dashboard.id === 'product' ? (
                    <Link
                      to="/dashboard/product"
                      className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors flex items-center justify-center space-x-2"
                    >
                      <Eye className="h-4 w-4" />
                      <span>View Demo</span>
                    </Link>
                  ) : dashboard.id === 'marketing' ? (
                    <Link
                      to="/dashboard/ua-monetization"
                      className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors flex items-center justify-center space-x-2"
                    >
                      <Eye className="h-4 w-4" />
                      <span>View Demo</span>
                    </Link>
                  ) : dashboard.id === 'technical' ? (
                    <Link
                      to="/dashboard/technical"
                      className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors flex items-center justify-center space-x-2"
                    >
                      <Eye className="h-4 w-4" />
                      <span>View Demo</span>
                    </Link>
                  ) : dashboard.id === 'finance' ? (
                    <Link
                      to="/dashboard/finance"
                      className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors flex items-center justify-center space-x-2"
                    >
                      <Eye className="h-4 w-4" />
                      <span>View Demo</span>
                    </Link>
                  ) : (
                    <button className="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors flex items-center justify-center space-x-2">
                      <Eye className="h-4 w-4" />
                      <span>Coming Soon</span>
                    </button>
                  )}
                  <button className="bg-white/10 hover:bg-white/20 text-white p-2 rounded-lg transition-colors">
                    <Settings className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-md rounded-2xl p-8 border border-white/20 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">
            Need a Custom Dashboard?
          </h3>
          <p className="text-white/80 mb-6 max-w-2xl mx-auto">
            Our flexible BI platform allows you to create custom dashboards tailored
            to your specific business needs and KPIs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300 flex items-center justify-center space-x-2">
              <span>Explore All Dashboards</span>
              <ArrowRight className="h-4 w-4" />
            </button>
            <button className="border-2 border-white/50 text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition-all duration-300">
              Request Custom Demo
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DashboardShowcaseSection;

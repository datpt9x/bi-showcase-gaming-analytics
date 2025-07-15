import React, { useState } from 'react';
import { 
  Target, 
  Users, 
  DollarSign, 
  Smartphone,
  TrendingUp,
  TrendingDown,
  AlertCircle,
  CheckCircle,
  Info,
  Search,
  Filter,
  BookOpen
} from 'lucide-react';

const MetricsLibrary: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMetric, setSelectedMetric] = useState<string | null>(null);

  const categories = [
    { id: 'all', name: 'All Metrics', icon: <BookOpen className="h-4 w-4" /> },
    { id: 'acquisition', name: 'User Acquisition', icon: <Target className="h-4 w-4" /> },
    { id: 'product', name: 'Product Metrics', icon: <Users className="h-4 w-4" /> },
    { id: 'monetization', name: 'Monetization', icon: <DollarSign className="h-4 w-4" /> },
    { id: 'technical', name: 'Technical', icon: <Smartphone className="h-4 w-4" /> },
  ];

  const metrics = [
    // User Acquisition Metrics
    {
      id: 'cpi',
      name: 'CPI (Cost Per Install)',
      category: 'acquisition',
      description: 'The cost to acquire one app install through paid advertising',
      formula: 'Total Ad Spend ÷ Total Installs',
      benchmarks: {
        'Hyper-casual': { excellent: '$0.10-$0.30', good: '$0.30-$0.50', average: '$0.50+' },
        'Casual': { excellent: '$0.50-$1.00', good: '$1.00-$2.00', average: '$2.00+' },
        'Mid-core': { excellent: '$2.00-$3.00', good: '$3.00-$5.00', average: '$5.00+' }
      },
      importance: 'high',
      frequency: 'Daily',
      tips: [
        'Monitor CPI trends by traffic source and creative',
        'Optimize targeting to reduce CPI while maintaining quality',
        'Consider seasonal variations in CPI costs'
      ]
    },
    {
      id: 'roas',
      name: 'ROAS (Return on Ad Spend)',
      category: 'acquisition',
      description: 'Revenue generated for every dollar spent on advertising',
      formula: 'Revenue from Ads ÷ Ad Spend',
      benchmarks: {
        'All Games': { excellent: '500%+', good: '300-500%', average: '100-300%' }
      },
      importance: 'high',
      frequency: 'Daily',
      tips: [
        'Track ROAS over different time windows (D1, D7, D30)',
        'Segment ROAS by user acquisition channel',
        'Consider LTV when evaluating ROAS performance'
      ]
    },
    {
      id: 'creative-ctr',
      name: 'Creative CTR',
      category: 'acquisition',
      description: 'Click-through rate of advertising creatives',
      formula: 'Clicks ÷ Impressions × 100',
      benchmarks: {
        'Android': { excellent: '12%+', good: '9-12%', average: '6-9%' },
        'iOS': { excellent: '10%+', good: '8-10%', average: '5-8%' }
      },
      importance: 'medium',
      frequency: 'Daily',
      tips: [
        'Test multiple creative variations regularly',
        'Monitor creative fatigue and refresh frequently',
        'Analyze CTR by demographic and geographic segments'
      ]
    },

    // Product Metrics
    {
      id: 'd1-retention',
      name: 'D1 Retention',
      category: 'product',
      description: 'Percentage of users who return to the app 1 day after install',
      formula: 'Users Active on Day 1 ÷ Total Installs × 100',
      benchmarks: {
        'Hyper-casual': { excellent: '25%+', good: '20-25%', average: '15-20%' },
        'Casual': { excellent: '40%+', good: '30-40%', average: '20-30%' },
        'Mid-core': { excellent: '50%+', good: '40-50%', average: '30-40%' }
      },
      importance: 'high',
      frequency: 'Daily',
      tips: [
        'Focus on first-time user experience (FTUE)',
        'Implement effective onboarding flows',
        'Monitor retention by user acquisition source'
      ]
    },
    {
      id: 'd7-retention',
      name: 'D7 Retention',
      category: 'product',
      description: 'Percentage of users who return to the app 7 days after install',
      formula: 'Users Active on Day 7 ÷ Total Installs × 100',
      benchmarks: {
        'Hyper-casual': { excellent: '8%+', good: '5-8%', average: '3-5%' },
        'Casual': { excellent: '15%+', good: '10-15%', average: '5-10%' },
        'Mid-core': { excellent: '25%+', good: '20-25%', average: '15-20%' }
      },
      importance: 'high',
      frequency: 'Weekly',
      tips: [
        'Implement engaging content for the first week',
        'Use push notifications strategically',
        'Create habit-forming game mechanics'
      ]
    },
    {
      id: 'session-length',
      name: 'Average Session Length',
      category: 'product',
      description: 'Average time users spend in the app per session',
      formula: 'Total Session Time ÷ Total Sessions',
      benchmarks: {
        'Hyper-casual': { excellent: '3+ min', good: '2-3 min', average: '1-2 min' },
        'Casual': { excellent: '8+ min', good: '5-8 min', average: '3-5 min' },
        'Mid-core': { excellent: '15+ min', good: '10-15 min', average: '5-10 min' }
      },
      importance: 'medium',
      frequency: 'Daily',
      tips: [
        'Balance session length with session frequency',
        'Optimize game pacing and difficulty curves',
        'Implement natural stopping points'
      ]
    },

    // Monetization Metrics
    {
      id: 'arpu',
      name: 'ARPU (Average Revenue Per User)',
      category: 'monetization',
      description: 'Average revenue generated per user over a specific time period',
      formula: 'Total Revenue ÷ Total Users',
      benchmarks: {
        'Hyper-casual': { excellent: '$0.06+', good: '$0.04-$0.06', average: '$0.02-$0.04' },
        'Casual': { excellent: '$1.20+', good: '$0.80-$1.20', average: '$0.50-$0.80' },
        'Mid-core': { excellent: '$3.00+', good: '$2.00-$3.00', average: '$1.20-$2.00' }
      },
      importance: 'high',
      frequency: 'Daily',
      tips: [
        'Track ARPU trends over different time periods',
        'Segment ARPU by user cohorts and acquisition channels',
        'Balance monetization with user experience'
      ]
    },
    {
      id: 'iap-conversion',
      name: 'IAP Conversion Rate',
      category: 'monetization',
      description: 'Percentage of users who make in-app purchases',
      formula: 'Paying Users ÷ Total Users × 100',
      benchmarks: {
        'All Games': { excellent: '5%+', good: '2-5%', average: '1-2%' }
      },
      importance: 'high',
      frequency: 'Daily',
      tips: [
        'Optimize purchase flow and reduce friction',
        'Implement targeted offers and promotions',
        'Test different price points and packages'
      ]
    },
    {
      id: 'ltv',
      name: 'LTV (Lifetime Value)',
      category: 'monetization',
      description: 'Total revenue expected from a user over their lifetime',
      formula: 'ARPU ÷ Churn Rate',
      benchmarks: {
        'Hyper-casual': { excellent: '$0.50+', good: '$0.30-$0.50', average: '$0.10-$0.30' },
        'Casual': { excellent: '$10+', good: '$5-$10', average: '$2-$5' },
        'Mid-core': { excellent: '$50+', good: '$25-$50', average: '$10-$25' }
      },
      importance: 'high',
      frequency: 'Weekly',
      tips: [
        'Calculate LTV for different time horizons',
        'Use predictive models for early LTV estimation',
        'Optimize for LTV:CAC ratio of 3:1 or higher'
      ]
    },

    // Technical Metrics
    {
      id: 'crash-rate',
      name: 'Crash Rate',
      category: 'technical',
      description: 'Percentage of app sessions that end in a crash',
      formula: 'Crashed Sessions ÷ Total Sessions × 100',
      benchmarks: {
        'All Apps': { excellent: '<0.1%', good: '0.1-0.5%', average: '0.5-1%' }
      },
      importance: 'high',
      frequency: 'Real-time',
      tips: [
        'Monitor crash rates by device type and OS version',
        'Implement comprehensive crash reporting',
        'Prioritize fixes for high-impact crashes'
      ]
    },
    {
      id: 'load-time',
      name: 'App Load Time',
      category: 'technical',
      description: 'Time taken for the app to become interactive after launch',
      formula: 'Time from Launch to Interactive State',
      benchmarks: {
        'All Apps': { excellent: '<2s', good: '2-3s', average: '3-5s' }
      },
      importance: 'high',
      frequency: 'Daily',
      tips: [
        'Optimize asset loading and compression',
        'Implement progressive loading strategies',
        'Monitor load times across different devices'
      ]
    }
  ];

  const filteredMetrics = metrics.filter(metric => {
    const matchesCategory = selectedCategory === 'all' || metric.category === selectedCategory;
    const matchesSearch = metric.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         metric.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getImportanceColor = (importance: string) => {
    switch (importance) {
      case 'high': return 'text-red-400 bg-red-400/20';
      case 'medium': return 'text-yellow-400 bg-yellow-400/20';
      case 'low': return 'text-green-400 bg-green-400/20';
      default: return 'text-gray-400 bg-gray-400/20';
    }
  };

  const getBenchmarkColor = (level: string) => {
    switch (level) {
      case 'excellent': return 'text-green-400 bg-green-400/20';
      case 'good': return 'text-blue-400 bg-blue-400/20';
      case 'average': return 'text-yellow-400 bg-yellow-400/20';
      default: return 'text-gray-400 bg-gray-400/20';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            KPI & Metrics
            <span className="block bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
              Library
            </span>
          </h1>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            Comprehensive collection of key performance indicators and metrics 
            with industry benchmarks for gaming and mobile apps.
          </p>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search metrics..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                  selectedCategory === category.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                {category.icon}
                <span>{category.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredMetrics.map((metric) => (
            <div 
              key={metric.id}
              className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-gray-600 transition-all duration-300 cursor-pointer"
              onClick={() => setSelectedMetric(selectedMetric === metric.id ? null : metric.id)}
            >
              {/* Metric Header */}
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">{metric.name}</h3>
                  <p className="text-gray-400 text-sm">{metric.description}</p>
                </div>
                <div className="flex flex-col items-end space-y-2">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${getImportanceColor(metric.importance)}`}>
                    {metric.importance.toUpperCase()}
                  </span>
                  <span className="text-xs text-gray-500">{metric.frequency}</span>
                </div>
              </div>

              {/* Formula */}
              <div className="mb-4 p-3 bg-gray-900 rounded-lg">
                <h4 className="text-white font-medium mb-1">Formula:</h4>
                <code className="text-blue-400 text-sm">{metric.formula}</code>
              </div>

              {/* Benchmarks */}
              <div className="mb-4">
                <h4 className="text-white font-medium mb-2">Benchmarks:</h4>
                <div className="space-y-2">
                  {Object.entries(metric.benchmarks).map(([gameType, benchmarks]) => (
                    <div key={gameType} className="text-sm">
                      <div className="text-gray-300 font-medium mb-1">{gameType}:</div>
                      <div className="flex flex-wrap gap-1">
                        {Object.entries(benchmarks).map(([level, value]) => (
                          <span 
                            key={level}
                            className={`px-2 py-1 rounded text-xs ${getBenchmarkColor(level)}`}
                          >
                            {level}: {value}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Expanded Content */}
              {selectedMetric === metric.id && (
                <div className="border-t border-gray-700 pt-4">
                  <h4 className="text-white font-medium mb-2">Optimization Tips:</h4>
                  <ul className="space-y-1">
                    {metric.tips.map((tip, idx) => (
                      <li key={idx} className="text-gray-400 text-sm flex items-start">
                        <CheckCircle className="h-3 w-3 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Bottom Info */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-md rounded-2xl p-8 border border-white/20">
            <div className="flex items-center justify-center mb-4">
              <Info className="h-6 w-6 text-blue-400 mr-2" />
              <h3 className="text-2xl font-bold text-white">
                Industry Benchmarks Disclaimer
              </h3>
            </div>
            <p className="text-white/80 mb-6 max-w-3xl mx-auto">
              Benchmarks are based on industry averages and may vary significantly based on 
              game genre, target audience, geographic market, and other factors. Use these as 
              guidelines and establish your own baselines through testing and measurement.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300">
                Download Metrics Guide
              </button>
              <button className="border-2 border-white/50 text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition-all duration-300">
                Request Custom Benchmarks
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MetricsLibrary;

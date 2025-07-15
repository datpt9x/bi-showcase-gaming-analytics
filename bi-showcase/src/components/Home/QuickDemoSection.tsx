import React, { useState } from 'react';
import { Play, Pause, BarChart3, PieChart, TrendingUp, Users } from 'lucide-react';

const QuickDemoSection: React.FC = () => {
  const [activeDemo, setActiveDemo] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const demos = [
    {
      id: 'executive',
      title: 'Executive Dashboard',
      description: 'High-level KPIs and business metrics for leadership',
      icon: <BarChart3 className="h-6 w-6" />,
      metrics: [
        { label: 'Daily Revenue', value: '$45,230', change: '+12.5%', positive: true },
        { label: 'DAU', value: '2.1M', change: '+8.2%', positive: true },
        { label: 'ARPU', value: '$2.15', change: '-2.1%', positive: false },
        { label: 'Retention D1', value: '42%', change: '+5.3%', positive: true }
      ]
    },
    {
      id: 'product',
      title: 'Product Analytics',
      description: 'Player behavior and game performance insights',
      icon: <Users className="h-6 w-6" />,
      metrics: [
        { label: 'Session Length', value: '8.5 min', change: '+15.2%', positive: true },
        { label: 'Level Completion', value: '78%', change: '+3.1%', positive: true },
        { label: 'Feature Adoption', value: '65%', change: '+22.4%', positive: true },
        { label: 'Sessions/User', value: '3.2', change: '+8.7%', positive: true }
      ]
    },
    {
      id: 'monetization',
      title: 'Monetization Dashboard',
      description: 'Revenue optimization and conversion tracking',
      icon: <TrendingUp className="h-6 w-6" />,
      metrics: [
        { label: 'Conversion Rate', value: '3.2%', change: '+18.5%', positive: true },
        { label: 'LTV', value: '$12.45', change: '+25.1%', positive: true },
        { label: 'ROAS', value: '4.2x', change: '+12.8%', positive: true },
        { label: 'Revenue/User', value: '$0.89', change: '+7.3%', positive: true }
      ]
    },
    {
      id: 'technical',
      title: 'Technical Health',
      description: 'Performance monitoring and quality metrics',
      icon: <PieChart className="h-6 w-6" />,
      metrics: [
        { label: 'Crash Rate', value: '0.12%', change: '-45.2%', positive: true },
        { label: 'Load Time', value: '1.8s', change: '-12.5%', positive: true },
        { label: 'FPS', value: '60', change: '+3.2%', positive: true },
        { label: 'Uptime', value: '99.9%', change: '+0.1%', positive: true }
      ]
    }
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Interactive Dashboard
            <span className="block bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
              Previews
            </span>
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            Experience our BI platform in action with live dashboard demos 
            tailored for different roles and use cases.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Demo Selector */}
          <div className="lg:col-span-1">
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
              <h3 className="text-xl font-semibold text-white mb-6">Choose Dashboard</h3>
              <div className="space-y-3">
                {demos.map((demo, index) => (
                  <button
                    key={demo.id}
                    onClick={() => setActiveDemo(index)}
                    className={`w-full text-left p-4 rounded-lg transition-all duration-300 ${
                      activeDemo === index
                        ? 'bg-white/20 border border-white/30'
                        : 'bg-white/5 hover:bg-white/10 border border-transparent'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg ${
                        activeDemo === index ? 'bg-blue-500' : 'bg-white/20'
                      }`}>
                        {demo.icon}
                      </div>
                      <div>
                        <h4 className="font-semibold text-white">{demo.title}</h4>
                        <p className="text-sm text-white/70">{demo.description}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              {/* Play Controls */}
              <div className="mt-6 pt-6 border-t border-white/20">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="flex items-center space-x-2 bg-gradient-to-r from-green-500 to-blue-500 text-white px-4 py-2 rounded-lg font-semibold hover:from-green-600 hover:to-blue-600 transition-all duration-300"
                >
                  {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                  <span>{isPlaying ? 'Pause Demo' : 'Play Demo'}</span>
                </button>
                <p className="text-xs text-white/60 mt-2">
                  {isPlaying ? 'Live data simulation active' : 'Click to start live simulation'}
                </p>
              </div>
            </div>
          </div>

          {/* Demo Display */}
          <div className="lg:col-span-2">
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-semibold text-white">
                  {demos[activeDemo].title}
                </h3>
                <div className={`px-3 py-1 rounded-full text-sm ${
                  isPlaying 
                    ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                    : 'bg-gray-500/20 text-gray-400 border border-gray-500/30'
                }`}>
                  {isPlaying ? '● LIVE' : '○ STATIC'}
                </div>
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                {demos[activeDemo].metrics.map((metric, index) => (
                  <div 
                    key={index}
                    className="bg-white/5 rounded-lg p-4 border border-white/10"
                  >
                    <div className="text-sm text-white/70 mb-1">{metric.label}</div>
                    <div className="text-2xl font-bold text-white mb-1">{metric.value}</div>
                    <div className={`text-sm flex items-center ${
                      metric.positive ? 'text-green-400' : 'text-red-400'
                    }`}>
                      <span className="mr-1">
                        {metric.positive ? '↗' : '↘'}
                      </span>
                      {metric.change}
                    </div>
                  </div>
                ))}
              </div>

              {/* Chart Placeholder */}
              <div className="bg-white/5 rounded-lg p-6 border border-white/10 h-48 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-4xl mb-2">📊</div>
                  <p className="text-white/70">Interactive Chart Visualization</p>
                  <p className="text-sm text-white/50">
                    {isPlaying ? 'Data updating in real-time...' : 'Click Play to see live updates'}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-4 mt-6">
                <button className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition-colors">
                  View Full Dashboard
                </button>
                <button className="flex-1 border border-white/30 hover:bg-white/10 text-white py-2 px-4 rounded-lg transition-colors">
                  Customize View
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuickDemoSection;

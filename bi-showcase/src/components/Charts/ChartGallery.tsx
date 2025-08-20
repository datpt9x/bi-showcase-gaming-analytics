import React, { useState } from 'react';
import { LineChart, BarChart, DoughnutChart, PieChart, RadarChart, SankeyChart } from './EChartsComponents';
import {
  TrendingUp,
  BarChart3,
  PieChart as PieChartIcon,
  Activity,
  Target,
  Globe,
  Filter,
  Download,
  Share,
  Code,
  GitBranch
} from 'lucide-react';

const ChartGallery: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedChart, setSelectedChart] = useState<string | null>(null);

  const categories = [
    { id: 'all', name: 'All Charts', icon: <BarChart3 className="h-4 w-4" /> },
    { id: 'retention', name: 'Retention', icon: <TrendingUp className="h-4 w-4" /> },
    { id: 'revenue', name: 'Revenue', icon: <Target className="h-4 w-4" /> },
    { id: 'funnel', name: 'Funnel', icon: <Activity className="h-4 w-4" /> },
    { id: 'performance', name: 'Performance', icon: <BarChart3 className="h-4 w-4" /> },
    { id: 'geographic', name: 'Geographic', icon: <Globe className="h-4 w-4" /> },
    { id: 'user-behavior', name: 'User Behavior', icon: <GitBranch className="h-4 w-4" /> },
  ];

  // Sample data for different chart types
  const retentionCohortData = {
    labels: ['Day 0', 'Day 1', 'Day 7', 'Day 14', 'Day 30'],
    datasets: [
      {
        label: 'Cohort 1',
        data: [100, 45, 25, 18, 12],
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.4,
        fill: true,
      },
      {
        label: 'Cohort 2',
        data: [100, 42, 28, 20, 15],
        borderColor: 'rgb(16, 185, 129)',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const revenueWaterfallData = {
    labels: ['Starting Revenue', 'New Users', 'Returning Users', 'Churn', 'Final Revenue'],
    datasets: [
      {
        label: 'Revenue Impact',
        data: [100000, 25000, 15000, -8000, 132000],
        backgroundColor: [
          'rgba(107, 114, 128, 0.8)',
          'rgba(16, 185, 129, 0.8)',
          'rgba(59, 130, 246, 0.8)',
          'rgba(239, 68, 68, 0.8)',
          'rgba(107, 114, 128, 0.8)',
        ],
      },
    ],
  };

  const funnelData = {
    labels: ['App Install', 'Registration', 'First Session', 'First Purchase', 'Retention D7'],
    datasets: [
      {
        label: 'Conversion Funnel',
        data: [100000, 75000, 65000, 8500, 25000],
        backgroundColor: [
          'rgba(59, 130, 246, 0.9)',
          'rgba(16, 185, 129, 0.8)',
          'rgba(245, 158, 11, 0.8)',
          'rgba(239, 68, 68, 0.8)',
          'rgba(139, 92, 246, 0.8)',
        ],
      },
    ],
  };

  const performanceRadarData = {
    labels: ['Load Time', 'Crash Rate', 'Memory Usage', 'Battery Usage', 'Network Efficiency', 'User Rating'],
    datasets: [
      {
        label: 'Current Performance',
        data: [85, 92, 78, 88, 90, 87],
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.2)',
        pointBackgroundColor: 'rgb(59, 130, 246)',
      },
      {
        label: 'Target Performance',
        data: [90, 95, 85, 92, 95, 90],
        borderColor: 'rgb(16, 185, 129)',
        backgroundColor: 'rgba(16, 185, 129, 0.2)',
        pointBackgroundColor: 'rgb(16, 185, 129)',
      },
    ],
  };

  const geoRevenueData = {
    labels: ['North America', 'Europe', 'Asia Pacific', 'Latin America', 'Middle East', 'Africa'],
    datasets: [
      {
        label: 'Revenue by Region',
        data: [45, 25, 20, 6, 3, 1],
        backgroundColor: [
          'rgba(59, 130, 246, 0.8)',
          'rgba(16, 185, 129, 0.8)',
          'rgba(245, 158, 11, 0.8)',
          'rgba(239, 68, 68, 0.8)',
          'rgba(139, 92, 246, 0.8)',
          'rgba(107, 114, 128, 0.8)',
        ],
      },
    ],
  };

  const userJourneyFlowData = {
    nodes: [
      { name: 'App Store' },
      { name: 'Google Play' },
      { name: 'Social Media' },
      { name: 'App Install' },
      { name: 'Tutorial' },
      { name: 'First Level' },
      { name: 'Level 5' },
      { name: 'First Purchase' },
      { name: 'Active Player' },
      { name: 'Churned' },
    ],
    links: [
      { source: 'App Store', target: 'App Install', value: 5000 },
      { source: 'Google Play', target: 'App Install', value: 3500 },
      { source: 'Social Media', target: 'App Install', value: 1500 },
      { source: 'App Install', target: 'Tutorial', value: 8500 },
      { source: 'App Install', target: 'Churned', value: 1500 },
      { source: 'Tutorial', target: 'First Level', value: 6800 },
      { source: 'Tutorial', target: 'Churned', value: 1700 },
      { source: 'First Level', target: 'Level 5', value: 5200 },
      { source: 'First Level', target: 'Churned', value: 1600 },
      { source: 'Level 5', target: 'First Purchase', value: 800 },
      { source: 'Level 5', target: 'Active Player', value: 3500 },
      { source: 'Level 5', target: 'Churned', value: 900 },
      { source: 'First Purchase', target: 'Active Player', value: 800 },
    ],
  };

  const charts = [
    {
      id: 'retention-cohort',
      title: 'Retention Cohort Analysis',
      description: 'Track user retention across different cohorts over time',
      category: 'retention',
      type: 'Line',
      component: <LineChart data={retentionCohortData} options={{ responsive: true, maintainAspectRatio: false }} />,
      useCase: 'Monitor player retention patterns and identify successful cohorts',
      metrics: ['D1 Retention', 'D7 Retention', 'D30 Retention']
    },
    {
      id: 'revenue-waterfall',
      title: 'Revenue Waterfall Chart',
      description: 'Visualize revenue changes and contributing factors',
      category: 'revenue',
      type: 'Bar',
      component: <BarChart data={revenueWaterfallData} options={{ responsive: true, maintainAspectRatio: false }} />,
      useCase: 'Understand revenue drivers and identify optimization opportunities',
      metrics: ['Revenue Growth', 'User Acquisition Impact', 'Churn Impact']
    },
    {
      id: 'conversion-funnel',
      title: 'Conversion Funnel',
      description: 'Track user progression through key conversion steps',
      category: 'funnel',
      type: 'Bar',
      component: <BarChart data={funnelData} options={{ responsive: true, maintainAspectRatio: false, indexAxis: 'y' as const }} />,
      useCase: 'Identify conversion bottlenecks and optimize user flow',
      metrics: ['Conversion Rate', 'Drop-off Rate', 'Funnel Efficiency']
    },
    {
      id: 'performance-radar',
      title: 'Performance Radar Chart',
      description: 'Multi-dimensional performance analysis',
      category: 'performance',
      type: 'Radar',
      component: <RadarChart data={performanceRadarData} options={{ responsive: true, maintainAspectRatio: false }} />,
      useCase: 'Compare current vs target performance across multiple metrics',
      metrics: ['Technical KPIs', 'User Experience', 'Quality Metrics']
    },
    {
      id: 'geo-revenue',
      title: 'Geographic Revenue Distribution',
      description: 'Revenue breakdown by geographic regions',
      category: 'geographic',
      type: 'Doughnut',
      component: <DoughnutChart data={geoRevenueData} options={{ responsive: true, maintainAspectRatio: false }} />,
      useCase: 'Understand market performance and plan regional strategies',
      metrics: ['Regional Revenue', 'Market Share', 'Growth Potential']
    },
    {
      id: 'user-journey-flow',
      title: 'User Journey Flow Analysis',
      description: 'Visualize user flow from acquisition to conversion',
      category: 'user-behavior',
      type: 'Sankey',
      component: <SankeyChart data={userJourneyFlowData} options={{ responsive: true, maintainAspectRatio: false }} />,
      useCase: 'Track user progression and identify conversion bottlenecks',
      metrics: ['User Flow', 'Conversion Funnel', 'Drop-off Points']
    },
  ];

  const filteredCharts = selectedCategory === 'all'
    ? charts
    : charts.filter(chart => chart.category === selectedCategory);

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: 'white',
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: 'white',
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
      },
      y: {
        ticks: {
          color: 'white',
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
      },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Chart & Visualization
            <span className="block bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Gallery
            </span>
          </h1>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            Comprehensive collection of interactive charts and visualizations
            for gaming and mobile app analytics.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
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

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredCharts.map((chart) => (
            <div
              key={chart.id}
              className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-gray-600 transition-all duration-300"
            >
              {/* Chart Header */}
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">{chart.title}</h3>
                  <p className="text-gray-400 text-sm">{chart.description}</p>
                  <span className="inline-block bg-blue-600/20 text-blue-400 px-2 py-1 rounded text-xs mt-2">
                    {chart.type} Chart
                  </span>
                </div>
                <div className="flex space-x-2">
                  <button className="p-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors">
                    <Code className="h-4 w-4 text-gray-300" />
                  </button>
                  <button className="p-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors">
                    <Download className="h-4 w-4 text-gray-300" />
                  </button>
                </div>
              </div>

              {/* Chart */}
              <div className="h-64 mb-4">
                {chart.component}
              </div>

              {/* Chart Info */}
              <div className="border-t border-gray-700 pt-4">
                <div className="mb-3">
                  <h4 className="text-white font-medium mb-2">Use Case:</h4>
                  <p className="text-gray-400 text-sm">{chart.useCase}</p>
                </div>
                <div>
                  <h4 className="text-white font-medium mb-2">Key Metrics:</h4>
                  <div className="flex flex-wrap gap-2">
                    {chart.metrics.map((metric, idx) => (
                      <span
                        key={idx}
                        className="bg-gray-700 text-gray-300 px-2 py-1 rounded text-xs"
                      >
                        {metric}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-md rounded-2xl p-8 border border-white/20">
            <h3 className="text-2xl font-bold text-white mb-4">
              Need Custom Visualizations?
            </h3>
            <p className="text-white/80 mb-6 max-w-2xl mx-auto">
              Our BI platform supports custom chart development and advanced visualization techniques
              tailored to your specific analytics needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300">
                Request Custom Charts
              </button>
              <button className="border-2 border-white/50 text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition-all duration-300">
                View Documentation
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChartGallery;

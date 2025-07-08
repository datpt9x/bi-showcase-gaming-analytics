import React, { useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Line, Bar, Scatter } from 'react-chartjs-2';
import { useMobileOptimizations } from '../Layout/MobileOptimizations';
import {
  Brain,
  TrendingUp,
  Users,
  Target,
  Zap,
  Eye,
  BarChart3,
  PieChart,
  Activity,
  Layers,
  Filter,
  Calendar,
  Download,
  Share,
  Settings,
  AlertCircle,
  CheckCircle,
  Clock
} from 'lucide-react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const AdvancedAnalytics: React.FC = () => {
  const [selectedFeature, setSelectedFeature] = useState('predictive');
  const [timeRange, setTimeRange] = useState('30d');
  const { isMobile, getGridClass, getButtonClass, getChartOptions } = useMobileOptimizations();

  const analyticsFeatures = [
    {
      id: 'predictive',
      name: 'Predictive Analytics',
      icon: <Brain className="h-5 w-5" />,
      description: 'ML-powered predictions for user behavior and revenue forecasting'
    },
    {
      id: 'cohort',
      name: 'Cohort Analysis',
      icon: <Users className="h-5 w-5" />,
      description: 'Deep dive into user behavior patterns across different cohorts'
    },
    {
      id: 'segmentation',
      name: 'User Segmentation',
      icon: <Target className="h-5 w-5" />,
      description: 'AI-driven user clustering and behavioral segmentation'
    },
    {
      id: 'anomaly',
      name: 'Anomaly Detection',
      icon: <AlertCircle className="h-5 w-5" />,
      description: 'Automated detection of unusual patterns and outliers'
    },
    {
      id: 'attribution',
      name: 'Attribution Modeling',
      icon: <Layers className="h-5 w-5" />,
      description: 'Multi-touch attribution and conversion path analysis'
    },
    {
      id: 'realtime',
      name: 'Real-time Analytics',
      icon: <Activity className="h-5 w-5" />,
      description: 'Live streaming analytics with sub-second latency'
    }
  ];

  // Predictive Analytics Data
  const predictiveData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6', 'Week 7', 'Week 8'],
    datasets: [
      {
        label: 'Actual Revenue',
        data: [45000, 48000, 52000, 49000, 55000, 58000, 62000, null],
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.4,
        fill: true,
      },
      {
        label: 'Predicted Revenue',
        data: [null, null, null, null, null, null, 62000, 65000],
        borderColor: 'rgb(16, 185, 129)',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        borderDash: [5, 5],
        tension: 0.4,
        fill: false,
      },
      {
        label: 'Confidence Interval',
        data: [null, null, null, null, null, null, 58000, 70000],
        borderColor: 'rgba(16, 185, 129, 0.3)',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        fill: '+1',
        tension: 0.4,
      },
    ],
  };

  // Cohort Retention Heatmap Data (simplified for demo)
  const cohortData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6'],
    datasets: [
      {
        label: 'Cohort Jan',
        data: [100, 45, 32, 25, 20, 18],
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.4,
        fill: true,
      },
      {
        label: 'Cohort Feb',
        data: [100, 48, 35, 28, 23, 20],
        borderColor: 'rgb(16, 185, 129)',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        tension: 0.4,
        fill: true,
      },
      {
        label: 'Cohort Mar',
        data: [100, 42, 30, 24, 19, 16],
        borderColor: 'rgb(245, 158, 11)',
        backgroundColor: 'rgba(245, 158, 11, 0.1)',
        tension: 0.4,
        fill: true,
      },
    ],
  };

  // User Segmentation Data
  const segmentationData = {
    labels: ['High Value', 'Engaged', 'At Risk', 'New Users', 'Churned'],
    datasets: [
      {
        label: 'User Segments',
        data: [15, 35, 20, 25, 5],
        backgroundColor: [
          'rgba(16, 185, 129, 0.8)',
          'rgba(59, 130, 246, 0.8)',
          'rgba(245, 158, 11, 0.8)',
          'rgba(139, 92, 246, 0.8)',
          'rgba(239, 68, 68, 0.8)',
        ],
        borderWidth: 0,
      },
    ],
  };

  // Anomaly Detection Data
  const anomalyData = {
    labels: Array.from({length: 30}, (_, i) => `Day ${i + 1}`),
    datasets: [
      {
        label: 'Normal Pattern',
        data: Array.from({length: 30}, () => 1000 + Math.random() * 200),
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.4,
        fill: true,
      },
      {
        label: 'Anomalies',
        data: [null, null, null, null, null, 1800, null, null, null, null, null, null, null, null, null, 1950, null, null, null, null, null, null, null, 1750, null, null, null, null, null, null],
        borderColor: 'rgb(239, 68, 68)',
        backgroundColor: 'rgba(239, 68, 68, 0.8)',
        pointRadius: 8,
        pointHoverRadius: 10,
        showLine: false,
      },
    ],
  };

  const baseChartOptions = {
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

  const chartOptions = getChartOptions(baseChartOptions);

  const renderFeatureContent = () => {
    switch (selectedFeature) {
      case 'predictive':
        return (
          <div className="space-y-6">
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <h3 className="text-xl font-semibold text-white mb-4">Revenue Forecasting</h3>
              <div className="h-80">
                <Line data={predictiveData} options={chartOptions} />
              </div>
              <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="bg-blue-900/20 border border-blue-700/30 rounded p-3">
                  <div className="text-blue-400 font-medium">Predicted Revenue</div>
                  <div className="text-white text-lg">$65,000</div>
                  <div className="text-blue-300 text-xs">95% confidence</div>
                </div>
                <div className="bg-green-900/20 border border-green-700/30 rounded p-3">
                  <div className="text-green-400 font-medium">Growth Rate</div>
                  <div className="text-white text-lg">+4.8%</div>
                  <div className="text-green-300 text-xs">Week over week</div>
                </div>
                <div className="bg-purple-900/20 border border-purple-700/30 rounded p-3">
                  <div className="text-purple-400 font-medium">Model Accuracy</div>
                  <div className="text-white text-lg">94.2%</div>
                  <div className="text-purple-300 text-xs">Last 30 predictions</div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'cohort':
        return (
          <div className="space-y-6">
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <h3 className="text-xl font-semibold text-white mb-4">Cohort Retention Analysis</h3>
              <div className="h-80">
                <Line data={cohortData} options={chartOptions} />
              </div>
              <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="bg-blue-900/20 border border-blue-700/30 rounded p-3">
                  <div className="text-blue-400 font-medium">Best Cohort</div>
                  <div className="text-white text-lg">February</div>
                  <div className="text-blue-300 text-xs">20% Week 6 retention</div>
                </div>
                <div className="bg-yellow-900/20 border border-yellow-700/30 rounded p-3">
                  <div className="text-yellow-400 font-medium">Average D7</div>
                  <div className="text-white text-lg">25%</div>
                  <div className="text-yellow-300 text-xs">Across all cohorts</div>
                </div>
                <div className="bg-green-900/20 border border-green-700/30 rounded p-3">
                  <div className="text-green-400 font-medium">Improvement</div>
                  <div className="text-white text-lg">+15%</div>
                  <div className="text-green-300 text-xs">Feb vs Jan cohort</div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'segmentation':
        return (
          <div className="space-y-6">
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <h3 className="text-xl font-semibold text-white mb-4">AI-Powered User Segmentation</h3>
              <div className="h-80">
                <Bar data={segmentationData} options={chartOptions} />
              </div>
              <div className="mt-4 grid grid-cols-1 md:grid-cols-5 gap-2 text-xs">
                <div className="bg-green-900/20 border border-green-700/30 rounded p-2 text-center">
                  <div className="text-green-400 font-medium">High Value</div>
                  <div className="text-white">15%</div>
                  <div className="text-green-300">$50+ LTV</div>
                </div>
                <div className="bg-blue-900/20 border border-blue-700/30 rounded p-2 text-center">
                  <div className="text-blue-400 font-medium">Engaged</div>
                  <div className="text-white">35%</div>
                  <div className="text-blue-300">Daily users</div>
                </div>
                <div className="bg-yellow-900/20 border border-yellow-700/30 rounded p-2 text-center">
                  <div className="text-yellow-400 font-medium">At Risk</div>
                  <div className="text-white">20%</div>
                  <div className="text-yellow-300">Declining activity</div>
                </div>
                <div className="bg-purple-900/20 border border-purple-700/30 rounded p-2 text-center">
                  <div className="text-purple-400 font-medium">New Users</div>
                  <div className="text-white">25%</div>
                  <div className="text-purple-300">7 days</div>
                </div>
                <div className="bg-red-900/20 border border-red-700/30 rounded p-2 text-center">
                  <div className="text-red-400 font-medium">Churned</div>
                  <div className="text-white">5%</div>
                  <div className="text-red-300">Inactive 30d+</div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'anomaly':
        return (
          <div className="space-y-6">
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <h3 className="text-xl font-semibold text-white mb-4">Anomaly Detection</h3>
              <div className="h-80">
                <Line data={anomalyData} options={chartOptions} />
              </div>
              <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="bg-red-900/20 border border-red-700/30 rounded p-3">
                  <div className="text-red-400 font-medium">Anomalies Detected</div>
                  <div className="text-white text-lg">3</div>
                  <div className="text-red-300 text-xs">Last 30 days</div>
                </div>
                <div className="bg-blue-900/20 border border-blue-700/30 rounded p-3">
                  <div className="text-blue-400 font-medium">Detection Rate</div>
                  <div className="text-white text-lg">98.5%</div>
                  <div className="text-blue-300 text-xs">Model accuracy</div>
                </div>
                <div className="bg-green-900/20 border border-green-700/30 rounded p-3">
                  <div className="text-green-400 font-medium">Response Time</div>
                  <div className="text-white text-lg">5 min</div>
                  <div className="text-green-300 text-xs">Average alert time</div>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <div className="text-center py-12">
              <Brain className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Advanced Analytics Feature</h3>
              <p className="text-gray-400">Select a feature from the sidebar to explore advanced analytics capabilities.</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Advanced Analytics
            <span className="block bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              & Machine Learning
            </span>
          </h1>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            Cutting-edge analytics features powered by machine learning and AI
            to unlock deeper insights from your gaming data.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Feature Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 sticky top-6">
              <h3 className="text-lg font-semibold text-white mb-4">Analytics Features</h3>
              <div className="space-y-2">
                {analyticsFeatures.map((feature) => (
                  <button
                    key={feature.id}
                    onClick={() => setSelectedFeature(feature.id)}
                    className={`w-full text-left p-3 rounded-lg transition-all duration-300 ${
                      selectedFeature === feature.id
                        ? 'bg-purple-600 text-white'
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }`}
                  >
                    <div className="flex items-center space-x-3 mb-2">
                      {feature.icon}
                      <span className="font-medium">{feature.name}</span>
                    </div>
                    <p className="text-xs opacity-80">{feature.description}</p>
                  </button>
                ))}
              </div>

              {/* Controls */}
              <div className="mt-6 pt-6 border-t border-gray-700">
                <div className="flex items-center space-x-2 mb-4">
                  <Calendar className="h-4 w-4 text-gray-400" />
                  <select
                    value={timeRange}
                    onChange={(e) => setTimeRange(e.target.value)}
                    className="bg-gray-700 text-white px-3 py-1 rounded border border-gray-600 text-sm"
                  >
                    <option value="7d">Last 7 days</option>
                    <option value="30d">Last 30 days</option>
                    <option value="90d">Last 90 days</option>
                  </select>
                </div>

                <div className="flex space-x-2">
                  <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-3 rounded text-sm transition-colors">
                    <Download className="h-3 w-3 inline mr-1" />
                    Export
                  </button>
                  <button className="bg-gray-600 hover:bg-gray-700 text-white p-2 rounded transition-colors">
                    <Share className="h-3 w-3" />
                  </button>
                  <button className="bg-gray-600 hover:bg-gray-700 text-white p-2 rounded transition-colors">
                    <Settings className="h-3 w-3" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {renderFeatureContent()}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 backdrop-blur-md rounded-2xl p-8 border border-white/20">
            <Brain className="h-12 w-12 text-purple-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-white mb-4">
              Ready for AI-Powered Analytics?
            </h3>
            <p className="text-white/80 mb-6 max-w-2xl mx-auto">
              Transform your data into actionable insights with our advanced machine learning
              and AI-powered analytics platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300">
                Start Free Trial
              </button>
              <button className="border-2 border-white/50 text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition-all duration-300">
                Schedule Demo
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvancedAnalytics;

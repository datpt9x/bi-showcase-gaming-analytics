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
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import { useMobileOptimizations } from '../Layout/MobileOptimizations';
import { useGameData } from '../../hooks/useGameData';
import {
  Activity,
  Zap,
  Clock,
  Smartphone,
  Wifi,
  AlertTriangle,
  CheckCircle,
  XCircle,
  TrendingUp,
  TrendingDown,
  Play,
  Pause,
  RefreshCw,
  Filter,
  Calendar,
  Server,
  Database,
  Monitor,
  Bug,
  Wrench,
  Star,
  MessageSquare
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

const TechnicalHealthDashboard: React.FC = () => {
  const [timeRange, setTimeRange] = useState('7d');
  const [selectedPlatform, setSelectedPlatform] = useState('all');
  const { isMobile, getGridClass, getButtonClass, getChartOptions } = useMobileOptimizations();
  const { 
    aggregatedMetrics, 
    isLoading, 
    isSimulating, 
    startSimulation, 
    stopSimulation, 
    refreshData 
  } = useGameData();

  // Technical Health KPIs
  const technicalKPIs = aggregatedMetrics ? [
    {
      title: 'Crash Rate',
      value: `${aggregatedMetrics.technical.crashRate.toFixed(2)}%`,
      change: '-45.2%',
      positive: true,
      icon: <AlertTriangle className="h-6 w-6" />,
      color: 'text-red-400',
      description: 'Sessions ending in crashes',
      status: aggregatedMetrics.technical.crashRate < 0.1 ? 'excellent' : aggregatedMetrics.technical.crashRate < 0.5 ? 'good' : 'poor'
    },
    {
      title: 'Load Time',
      value: `${aggregatedMetrics.technical.loadTime.toFixed(1)}s`,
      change: '-12.5%',
      positive: true,
      icon: <Clock className="h-6 w-6" />,
      color: 'text-blue-400',
      description: 'Average app startup time',
      status: aggregatedMetrics.technical.loadTime < 2 ? 'excellent' : aggregatedMetrics.technical.loadTime < 3 ? 'good' : 'poor'
    },
    {
      title: 'FPS',
      value: `${Math.round(aggregatedMetrics.technical.fps)}`,
      change: '+3.2%',
      positive: true,
      icon: <Activity className="h-6 w-6" />,
      color: 'text-green-400',
      description: 'Frames per second',
      status: aggregatedMetrics.technical.fps > 55 ? 'excellent' : aggregatedMetrics.technical.fps > 45 ? 'good' : 'poor'
    },
    {
      title: 'API Response',
      value: '120ms',
      change: '-8.1%',
      positive: true,
      icon: <Wifi className="h-6 w-6" />,
      color: 'text-purple-400',
      description: 'Average API response time',
      status: 'excellent'
    },
    {
      title: 'Error Frequency',
      value: '0.8%',
      change: '-15.3%',
      positive: true,
      icon: <Bug className="h-6 w-6" />,
      color: 'text-orange-400',
      description: 'Non-crash errors per session',
      status: 'good'
    },
    {
      title: 'Bug Resolution Time',
      value: '2.3 days',
      change: '-22.1%',
      positive: true,
      icon: <Wrench className="h-6 w-6" />,
      color: 'text-orange-400',
      description: 'Average time to fix bugs',
      status: 'good'
    },
    {
      title: 'App Store Rating',
      value: '4.6/5',
      change: '+0.1',
      positive: true,
      icon: <Star className="h-6 w-6" />,
      color: 'text-orange-400',
      description: 'Average store rating',
      status: 'excellent'
    },
    {
      title: 'Server Uptime',
      value: '99.8%',
      change: '+0.2%',
      positive: true,
      icon: <Server className="h-6 w-6" />,
      color: 'text-red-400',
      description: 'Server availability',
      status: 'excellent'
    },
    {
      title: 'User Reports',
      value: '12',
      change: '-8',
      positive: true,
      icon: <MessageSquare className="h-6 w-6" />,
      color: 'text-yellow-400',
      description: 'Daily user issue reports',
      status: 'good'
    },
    {
      title: 'Load Time (Mobile)',
      value: '1.8s',
      change: '-0.3s',
      positive: true,
      icon: <Smartphone className="h-6 w-6" />,
      color: 'text-yellow-400',
      description: 'Mobile app load time',
      status: 'excellent'
    }
  ] : [];

  // Performance Trend Data
  const performanceTrendData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Crash Rate (%)',
        data: [0.18, 0.15, 0.12, 0.10, 0.08, 0.09, 0.07],
        borderColor: 'rgb(239, 68, 68)',
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        tension: 0.4,
        fill: true,
        yAxisID: 'y',
      },
      {
        label: 'Load Time (s)',
        data: [2.1, 2.0, 1.9, 1.8, 1.7, 1.8, 1.6],
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.4,
        fill: true,
        yAxisID: 'y1',
      },
    ],
  };

  // Device Performance Data
  const devicePerformanceData = {
    labels: ['iPhone 14', 'iPhone 13', 'Samsung S23', 'Pixel 7', 'OnePlus 11', 'Others'],
    datasets: [
      {
        label: 'Average FPS',
        data: [60, 58, 55, 52, 50, 45],
        backgroundColor: [
          'rgba(16, 185, 129, 0.8)',
          'rgba(59, 130, 246, 0.8)',
          'rgba(245, 158, 11, 0.8)',
          'rgba(239, 68, 68, 0.8)',
          'rgba(139, 92, 246, 0.8)',
          'rgba(107, 114, 128, 0.8)',
        ],
        borderWidth: 0,
      },
    ],
  };

  // Error Distribution Data
  const errorDistributionData = {
    labels: ['Memory Leaks', 'Network Errors', 'UI Crashes', 'Logic Errors', 'ANR/Hangs'],
    datasets: [
      {
        label: 'Error Count',
        data: [35, 25, 20, 15, 5],
        backgroundColor: [
          'rgba(239, 68, 68, 0.8)',
          'rgba(245, 158, 11, 0.8)',
          'rgba(139, 92, 246, 0.8)',
          'rgba(59, 130, 246, 0.8)',
          'rgba(107, 114, 128, 0.8)',
        ],
        borderWidth: 0,
      },
    ],
  };

  // System Health Data
  const systemHealthData = {
    labels: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '24:00'],
    datasets: [
      {
        label: 'CPU Usage (%)',
        data: [45, 38, 52, 68, 75, 62, 48],
        borderColor: 'rgb(239, 68, 68)',
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        tension: 0.4,
        fill: true,
      },
      {
        label: 'Memory Usage (%)',
        data: [62, 58, 65, 72, 78, 70, 64],
        borderColor: 'rgb(245, 158, 11)',
        backgroundColor: 'rgba(245, 158, 11, 0.1)',
        tension: 0.4,
        fill: true,
      },
      {
        label: 'Network Usage (%)',
        data: [25, 20, 35, 45, 52, 38, 28],
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.4,
        fill: true,
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

  const performanceChartOptions = {
    ...baseChartOptions,
    scales: {
      ...baseChartOptions.scales,
      y1: {
        type: 'linear' as const,
        display: true,
        position: 'right' as const,
        ticks: {
          color: 'white',
        },
        grid: {
          drawOnChartArea: false,
        },
      },
    },
  };

  const chartOptions = getChartOptions(baseChartOptions);
  const performanceOptions = getChartOptions(performanceChartOptions);

  // System Status
  const systemStatus = [
    { name: 'API Gateway', status: 'healthy', uptime: '99.9%', responseTime: '45ms' },
    { name: 'Database', status: 'healthy', uptime: '99.8%', responseTime: '12ms' },
    { name: 'CDN', status: 'warning', uptime: '98.5%', responseTime: '180ms' },
    { name: 'Analytics Service', status: 'healthy', uptime: '99.7%', responseTime: '85ms' },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'healthy': return <CheckCircle className="h-5 w-5 text-green-400" />;
      case 'warning': return <AlertTriangle className="h-5 w-5 text-yellow-400" />;
      case 'error': return <XCircle className="h-5 w-5 text-red-400" />;
      default: return <CheckCircle className="h-5 w-5 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'text-green-400';
      case 'good': return 'text-blue-400';
      case 'poor': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className="min-h-screen text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Technical Health Dashboard</h1>
            <p className="text-gray-400">Performance monitoring, error tracking, and system health insights</p>
          </div>
          
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-gray-400" />
              <select 
                value={selectedPlatform}
                onChange={(e) => setSelectedPlatform(e.target.value)}
                className="bg-gray-700 text-white px-3 py-1 rounded border border-gray-600"
              >
                <option value="all">All Platforms</option>
                <option value="ios">iOS</option>
                <option value="android">Android</option>
                <option value="web">Web</option>
              </select>
            </div>

            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4 text-gray-400" />
              <select 
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="bg-gray-700 text-white px-3 py-1 rounded border border-gray-600"
              >
                <option value="1h">Last Hour</option>
                <option value="24h">Last 24h</option>
                <option value="7d">Last 7 days</option>
                <option value="30d">Last 30 days</option>
              </select>
            </div>
            
            <div className="flex items-center space-x-2">
              <button
                onClick={isSimulating ? stopSimulation : startSimulation}
                className={`${getButtonClass()} rounded font-medium transition-colors flex items-center space-x-2 ${
                  isSimulating
                    ? 'bg-green-600 hover:bg-green-700 text-white'
                    : 'bg-gray-600 hover:bg-gray-700 text-white'
                }`}
              >
                {isSimulating ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                <span>{isSimulating ? 'LIVE' : 'START'}</span>
              </button>
              
              <button
                onClick={refreshData}
                className={`${getButtonClass()} rounded font-medium transition-colors bg-blue-600 hover:bg-blue-700 text-white flex items-center space-x-2`}
                disabled={isLoading}
              >
                <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
                <span>Refresh</span>
              </button>
            </div>
          </div>
        </div>

        {/* System Status */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-white mb-4">System Status</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {systemStatus.map((system, index) => (
              <div key={index} className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-white font-medium">{system.name}</h4>
                  {getStatusIcon(system.status)}
                </div>
                <div className="text-sm text-gray-400">
                  <div>Uptime: <span className="text-green-400">{system.uptime}</span></div>
                  <div>Response: <span className="text-blue-400">{system.responseTime}</span></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* KPI Cards */}
        <div className={`grid ${getGridClass(1, 2, 3)} gap-6 mb-8`}>
          {technicalKPIs.map((kpi, index) => (
            <div key={index} className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <div className={kpi.color}>
                  {kpi.icon}
                </div>
                <div className="flex items-center space-x-2">
                  <div className={`text-sm flex items-center ${
                    kpi.positive ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {kpi.positive ? <TrendingUp className="h-4 w-4 mr-1" /> : <TrendingDown className="h-4 w-4 mr-1" />}
                    {kpi.change}
                  </div>
                  <div className={`text-xs px-2 py-1 rounded ${getStatusColor(kpi.status)} bg-opacity-20`}>
                    {kpi.status}
                  </div>
                </div>
              </div>
              <div className="text-2xl font-bold text-white mb-1">{kpi.value}</div>
              <div className="text-gray-400 text-sm">{kpi.title}</div>
              <div className="text-gray-500 text-xs mt-1">{kpi.description}</div>
            </div>
          ))}
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Performance Trends */}
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-white">Performance Trends</h3>
              <Activity className="h-5 w-5 text-green-400" />
            </div>
            <div className="h-64">
              <Line data={performanceTrendData} options={performanceOptions} />
            </div>
            <div className="mt-4 text-sm text-gray-400">
              Crash rate improved by <span className="text-green-400 font-semibold">45%</span> this week
            </div>
          </div>

          {/* Device Performance */}
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-white">Device Performance</h3>
              <Smartphone className="h-5 w-5 text-blue-400" />
            </div>
            <div className="h-64">
              <Bar data={devicePerformanceData} options={chartOptions} />
            </div>
            <div className="mt-4 text-sm text-gray-400">
              iPhone 14 leads with <span className="text-green-400 font-semibold">60 FPS</span> average
            </div>
          </div>
        </div>

        {/* Error Analysis */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Error Distribution */}
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-white">Error Distribution</h3>
              <AlertTriangle className="h-5 w-5 text-red-400" />
            </div>
            <div className="h-64">
              <Doughnut data={errorDistributionData} options={chartOptions} />
            </div>
            <div className="mt-4 text-sm text-gray-400">
              Memory leaks account for <span className="text-red-400 font-semibold">35%</span> of errors
            </div>
          </div>

          {/* System Resource Usage */}
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-white">System Resources</h3>
              <Server className="h-5 w-5 text-purple-400" />
            </div>
            <div className="h-64">
              <Line data={systemHealthData} options={chartOptions} />
            </div>
            <div className="mt-4 text-sm text-gray-400">
              Peak usage during <span className="text-yellow-400 font-semibold">16:00-20:00</span> hours
            </div>
          </div>
        </div>

        {/* Performance Recommendations */}
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold text-white">Performance Recommendations</h3>
            <Monitor className="h-5 w-5 text-green-400" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-green-900/20 border border-green-700/30 rounded-lg p-4">
              <CheckCircle className="h-6 w-6 text-green-400 mb-2" />
              <h4 className="text-green-400 font-medium mb-2">Excellent Performance</h4>
              <p className="text-green-300 text-sm">Crash rate and load times are within excellent thresholds</p>
            </div>
            <div className="bg-yellow-900/20 border border-yellow-700/30 rounded-lg p-4">
              <AlertTriangle className="h-6 w-6 text-yellow-400 mb-2" />
              <h4 className="text-yellow-400 font-medium mb-2">Memory Optimization</h4>
              <p className="text-yellow-300 text-sm">Consider optimizing memory usage for older devices</p>
            </div>
            <div className="bg-blue-900/20 border border-blue-700/30 rounded-lg p-4">
              <Database className="h-6 w-6 text-blue-400 mb-2" />
              <h4 className="text-blue-400 font-medium mb-2">CDN Optimization</h4>
              <p className="text-blue-300 text-sm">CDN response times can be improved in certain regions</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TechnicalHealthDashboard;

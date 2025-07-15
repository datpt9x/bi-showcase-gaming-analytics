import React, { useState, useEffect } from 'react';
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
  TrendingUp,
  TrendingDown,
  Users,
  DollarSign,
  Smartphone,
  Globe,
  Calendar,
  Filter,
  Play,
  Pause,
  RefreshCw,
  Calculator,
  Wallet,
  Flame,
  Crown
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

const ExecutiveDashboard: React.FC = () => {
  const [timeRange, setTimeRange] = useState('7d');
  const { isMobile, getGridClass, getButtonClass, getChartOptions } = useMobileOptimizations();
  const {
    aggregatedMetrics,
    isLoading,
    isSimulating,
    startSimulation,
    stopSimulation,
    refreshData,
    getChartData
  } = useGameData();

  const kpiCards = aggregatedMetrics ? [
    {
      title: 'Daily Revenue',
      value: `$${aggregatedMetrics.revenue.toLocaleString()}`,
      change: '+12.5%',
      positive: true,
      icon: <DollarSign className="h-6 w-6" />,
      color: 'text-green-400'
    },
    {
      title: 'Daily Active Users',
      value: `${(aggregatedMetrics.dau / 1000000).toFixed(1)}M`,
      change: '+8.2%',
      positive: true,
      icon: <Users className="h-6 w-6" />,
      color: 'text-blue-400'
    },
    {
      title: 'ARPU',
      value: `$${aggregatedMetrics.arpu.toFixed(2)}`,
      change: '-2.1%',
      positive: false,
      icon: <Smartphone className="h-6 w-6" />,
      color: 'text-purple-400'
    },
    {
      title: 'D1 Retention',
      value: `${aggregatedMetrics.retention.d1.toFixed(1)}%`,
      change: '+5.3%',
      positive: true,
      icon: <TrendingUp className="h-6 w-6" />,
      color: 'text-orange-400'
    },
    {
      title: 'Total Revenue',
      value: `$${(aggregatedMetrics.revenue * 30).toLocaleString()}`,
      change: '+18.5%',
      positive: true,
      icon: <DollarSign className="h-6 w-6" />,
      color: 'text-red-400'
    },
    {
      title: 'COGS (Cost of Goods Sold)',
      value: `$${(aggregatedMetrics.revenue * 30 * 0.27).toLocaleString()}`,
      change: '+12.3%',
      positive: false,
      icon: <Calculator className="h-6 w-6" />,
      color: 'text-red-400'
    },
    {
      title: 'Net Profit',
      value: `$${(aggregatedMetrics.revenue * 30 * 0.248).toLocaleString()}`,
      change: '+22.1%',
      positive: true,
      icon: <Wallet className="h-6 w-6" />,
      color: 'text-red-400'
    },
    {
      title: 'Cash Flow',
      value: `$${(aggregatedMetrics.revenue * 30 * 0.31).toLocaleString()}`,
      change: '+15.7%',
      positive: true,
      icon: <TrendingUp className="h-6 w-6" />,
      color: 'text-red-400'
    },
    {
      title: 'Burn Rate',
      value: `$${(aggregatedMetrics.revenue * 30 * 0.15).toLocaleString()}/mo`,
      change: '+8.2%',
      positive: false,
      icon: <Flame className="h-6 w-6" />,
      color: 'text-orange-400'
    },
    {
      title: 'CLTV (Customer Lifetime Value)',
      value: `$${(aggregatedMetrics.arpu * 45.2).toFixed(2)}`,
      change: '+11.8%',
      positive: true,
      icon: <Crown className="h-6 w-6" />,
      color: 'text-orange-400'
    }
  ] : [];

  // Chart Data from real simulation
  const revenueData = getChartData('revenue') || {
    labels: ['Loading...'],
    datasets: [{ label: 'Revenue', data: [0], borderColor: 'rgb(59, 130, 246)' }]
  };

  const portfolioData = getChartData('campaigns') || {
    labels: ['Loading...'],
    datasets: [{ label: 'Campaign Spend', data: [0], backgroundColor: 'rgba(59, 130, 246, 0.8)' }]
  };

  const geoData = getChartData('geographic') || {
    labels: ['Loading...'],
    datasets: [{ label: 'Revenue by Region', data: [0], backgroundColor: 'rgba(59, 130, 246, 0.8)' }]
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

  return (
    <div className="min-h-screen text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Executive Dashboard</h1>
            <p className="text-gray-400">Real-time business intelligence for leadership</p>
          </div>

          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4 text-gray-400" />
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="bg-gray-700 text-white px-3 py-1 rounded border border-gray-600"
              >
                <option value="1d">Last 24h</option>
                <option value="7d">Last 7 days</option>
                <option value="30d">Last 30 days</option>
                <option value="90d">Last 90 days</option>
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

        {/* KPI Cards */}
        <div className={`grid ${getGridClass(1, 2, 3)} gap-6 mb-8`}>
          {kpiCards.map((kpi, index) => (
            <div key={index} className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <div className={kpi.color}>
                  {kpi.icon}
                </div>
                <div className={`text-sm flex items-center ${
                  kpi.positive ? 'text-green-400' : 'text-red-400'
                }`}>
                  {kpi.positive ? <TrendingUp className="h-4 w-4 mr-1" /> : <TrendingDown className="h-4 w-4 mr-1" />}
                  {kpi.change}
                </div>
              </div>
              <div className="text-2xl font-bold text-white mb-1">{kpi.value}</div>
              <div className="text-gray-400 text-sm">{kpi.title}</div>
            </div>
          ))}
        </div>

        {/* Charts Grid */}
        <div className={`grid ${getGridClass(1, 1, 2)} gap-6`}>
          {/* Revenue Trend */}
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h3 className="text-xl font-semibold text-white mb-4">Revenue Trend</h3>
            <div className="h-64">
              <Line data={revenueData} options={chartOptions} />
            </div>
          </div>

          {/* Portfolio Performance */}
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h3 className="text-xl font-semibold text-white mb-4">Portfolio Performance</h3>
            <div className="h-64">
              <Doughnut data={portfolioData} options={chartOptions} />
            </div>
          </div>

          {/* Geographic Performance */}
          <div className={`bg-gray-800 rounded-lg p-6 border border-gray-700 ${!isMobile ? 'lg:col-span-2' : ''}`}>
            <h3 className="text-xl font-semibold text-white mb-4">Revenue by Region</h3>
            <div className="h-64">
              <Bar data={geoData} options={chartOptions} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExecutiveDashboard;

import React, { useState } from 'react';
import { LineChart, BarChart, DoughnutChart, PieChart, RadarChart, ScatterChart } from '../Charts/EChartsComponents';
import { useMobileOptimizations } from '../Layout/MobileOptimizations';
import { useGameData } from '../../hooks/useGameData';
import {
  Target,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Users,
  Zap,
  Eye,
  MousePointer,
  Play,
  Pause,
  RefreshCw,
  Filter,
  Calendar,
  AlertTriangle,
  CheckCircle,
  Percent,
  UserCheck
} from 'lucide-react';

const UAMonetizationDashboard: React.FC = () => {
  const [timeRange, setTimeRange] = useState('7d');
  const [selectedChannel, setSelectedChannel] = useState('all');
  const { isMobile, getGridClass, getButtonClass, getChartOptions } = useMobileOptimizations();
  const { 
    aggregatedMetrics, 
    isLoading, 
    isSimulating, 
    startSimulation, 
    stopSimulation, 
    refreshData 
  } = useGameData();

  // UA & Monetization KPIs
  const uaKPIs = aggregatedMetrics ? [
    {
      title: 'CPI (Cost Per Install)',
      value: '$2.45',
      change: '-8.2%',
      positive: true,
      icon: <Target className="h-6 w-6" />,
      color: 'text-blue-400',
      description: 'Average across all channels'
    },
    {
      title: 'ROAS (Return on Ad Spend)',
      value: '385%',
      change: '+15.7%',
      positive: true,
      icon: <DollarSign className="h-6 w-6" />,
      color: 'text-green-400',
      description: '30-day ROAS performance'
    },
    {
      title: 'CAC (Customer Acquisition Cost)',
      value: '$3.20',
      change: '+5.8%',
      positive: false,
      icon: <Users className="h-6 w-6" />,
      color: 'text-red-400',
      description: 'Total cost to acquire paying customer'
    },
    {
      title: 'LTV/CAC Ratio',
      value: '4.2x',
      change: '+12.3%',
      positive: true,
      icon: <TrendingUp className="h-6 w-6" />,
      color: 'text-purple-400',
      description: 'Lifetime value to acquisition cost'
    },
    {
      title: 'Creative CTR',
      value: '8.9%',
      change: '+22.1%',
      positive: true,
      icon: <Eye className="h-6 w-6" />,
      color: 'text-orange-400',
      description: 'Click-through rate on creatives'
    },
    {
      title: 'Conversion Rate',
      value: '3.8%',
      change: '+0.5%',
      positive: true,
      icon: <Percent className="h-6 w-6" />,
      color: 'text-orange-400',
      description: 'Install to paying user conversion'
    },
    {
      title: 'Retention by Source',
      value: '68%',
      change: '-2.1%',
      positive: false,
      icon: <UserCheck className="h-6 w-6" />,
      color: 'text-cyan-400',
      description: 'D1 retention across channels'
    }
  ] : [];

  // Campaign Performance Data
  const campaignData = {
    labels: ['Facebook', 'Google', 'Unity', 'ironSource', 'TikTok', 'Snapchat'],
    datasets: [
      {
        label: 'Spend ($)',
        data: [45000, 38000, 22000, 18000, 15000, 12000],
        backgroundColor: 'rgba(59, 130, 246, 0.8)',
        yAxisID: 'y',
      },
      {
        label: 'ROAS (%)',
        data: [420, 380, 350, 290, 450, 320],
        backgroundColor: 'rgba(16, 185, 129, 0.8)',
        yAxisID: 'y1',
      },
    ],
  };

  // Revenue Breakdown Data
  const revenueBreakdownData = {
    labels: ['IAP Revenue', 'Ad Revenue', 'Subscription', 'Other'],
    datasets: [
      {
        label: 'Revenue Sources',
        data: [65, 25, 8, 2],
        backgroundColor: [
          'rgba(59, 130, 246, 0.8)',
          'rgba(16, 185, 129, 0.8)',
          'rgba(245, 158, 11, 0.8)',
          'rgba(107, 114, 128, 0.8)',
        ],
        borderWidth: 0,
      },
    ],
  };

  // Creative Performance Data
  const creativePerformanceData = {
    labels: ['Creative A', 'Creative B', 'Creative C', 'Creative D', 'Creative E'],
    datasets: [
      {
        label: 'CTR (%)',
        data: [12.5, 9.8, 8.2, 6.5, 4.1],
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.4,
        fill: true,
      },
      {
        label: 'CVR (%)',
        data: [3.2, 2.8, 2.1, 1.9, 1.2],
        borderColor: 'rgb(16, 185, 129)',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        tension: 0.4,
        fill: true,
        yAxisID: 'y1',
      },
    ],
  };

  // LTV Cohort Data
  const ltvCohortData = {
    labels: ['Day 1', 'Day 7', 'Day 14', 'Day 30', 'Day 60', 'Day 90'],
    datasets: [
      {
        label: 'Organic Users',
        data: [0.15, 0.85, 1.45, 2.80, 4.20, 5.60],
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.4,
        fill: true,
      },
      {
        label: 'Paid Users',
        data: [0.12, 0.75, 1.25, 2.45, 3.80, 5.10],
        borderColor: 'rgb(239, 68, 68)',
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
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

  const campaignChartOptions = {
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

  const creativeChartOptions = {
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
  const campaignOptions = getChartOptions(campaignChartOptions);
  const creativeOptions = getChartOptions(creativeChartOptions);

  // Campaign alerts
  const campaignAlerts = [
    {
      type: 'warning',
      message: 'Facebook CPI increased 15% this week',
      action: 'Review targeting settings'
    },
    {
      type: 'success',
      message: 'TikTok ROAS improved 25% with new creatives',
      action: 'Scale successful campaigns'
    },
    {
      type: 'danger',
      message: 'ironSource performance declining',
      action: 'Pause underperforming campaigns'
    }
  ];

  return (
    <div className="min-h-screen text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">UA & Monetization Dashboard</h1>
            <p className="text-gray-400">Campaign performance, revenue optimization, and user acquisition insights</p>
          </div>
          
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-gray-400" />
              <select 
                value={selectedChannel}
                onChange={(e) => setSelectedChannel(e.target.value)}
                className="bg-gray-700 text-white px-3 py-1 rounded border border-gray-600"
              >
                <option value="all">All Channels</option>
                <option value="facebook">Facebook</option>
                <option value="google">Google</option>
                <option value="unity">Unity</option>
                <option value="ironsource">ironSource</option>
                <option value="tiktok">TikTok</option>
              </select>
            </div>

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

        {/* Campaign Alerts */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-white mb-4">Campaign Alerts</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {campaignAlerts.map((alert, index) => (
              <div 
                key={index}
                className={`p-4 rounded-lg border ${
                  alert.type === 'warning' 
                    ? 'bg-yellow-900/20 border-yellow-700/30 text-yellow-400'
                    : alert.type === 'success'
                    ? 'bg-green-900/20 border-green-700/30 text-green-400'
                    : 'bg-red-900/20 border-red-700/30 text-red-400'
                }`}
              >
                <div className="flex items-start space-x-3">
                  {alert.type === 'warning' ? (
                    <AlertTriangle className="h-5 w-5 mt-0.5" />
                  ) : alert.type === 'success' ? (
                    <CheckCircle className="h-5 w-5 mt-0.5" />
                  ) : (
                    <AlertTriangle className="h-5 w-5 mt-0.5" />
                  )}
                  <div>
                    <p className="text-sm font-medium">{alert.message}</p>
                    <p className="text-xs opacity-80 mt-1">{alert.action}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* KPI Cards */}
        <div className={`grid ${getGridClass(1, 2, 3)} gap-6 mb-8`}>
          {uaKPIs.map((kpi, index) => (
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
              <div className="text-gray-500 text-xs mt-1">{kpi.description}</div>
            </div>
          ))}
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Campaign Performance */}
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-white">Campaign Performance</h3>
              <Target className="h-5 w-5 text-blue-400" />
            </div>
            <div className="chart-md">
              <BarChart data={campaignData} options={campaignOptions} theme="dark" />
            </div>
            <div className="mt-4 text-sm text-gray-400">
              Facebook leads in spend but TikTok has highest ROAS at <span className="text-green-400 font-semibold">450%</span>
            </div>
          </div>

          {/* Revenue Breakdown */}
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-white">Revenue Breakdown</h3>
              <DollarSign className="h-5 w-5 text-green-400" />
            </div>
            <div className="chart-md">
              <DoughnutChart data={revenueBreakdownData} options={chartOptions} theme="dark" />
            </div>
            <div className="mt-4 text-sm text-gray-400">
              IAP dominates at <span className="text-blue-400 font-semibold">65%</span> of total revenue
            </div>
          </div>
        </div>

        {/* Creative Performance */}
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold text-white">Creative Performance Analysis</h3>
            <Eye className="h-5 w-5 text-orange-400" />
          </div>
          <div className="chart-lg">
            <LineChart data={creativePerformanceData} options={creativeOptions} theme="dark" />
          </div>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="text-gray-400">
              <span className="text-blue-400 font-semibold">CTR:</span> Click-through rate performance
            </div>
            <div className="text-gray-400">
              <span className="text-green-400 font-semibold">CVR:</span> Conversion rate after click
            </div>
            <div className="text-gray-400">
              <span className="text-yellow-400 font-semibold">Action:</span> Refresh Creative C-E for better performance
            </div>
          </div>
        </div>

        {/* LTV Cohort Analysis */}
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold text-white">LTV Cohort Analysis</h3>
            <Users className="h-5 w-5 text-purple-400" />
          </div>
          <div className="chart-lg">
            <LineChart data={ltvCohortData} options={chartOptions} theme="dark" />
          </div>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="text-gray-400">
              <span className="text-blue-400 font-semibold">Organic LTV:</span> $5.60 at Day 90
            </div>
            <div className="text-gray-400">
              <span className="text-red-400 font-semibold">Paid LTV:</span> $5.10 at Day 90
            </div>
            <div className="text-gray-400">
              <span className="text-green-400 font-semibold">Payback:</span> Achieved by Day 14 for both cohorts
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UAMonetizationDashboard;

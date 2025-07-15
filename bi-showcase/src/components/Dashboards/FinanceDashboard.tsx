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
  DollarSign,
  TrendingUp,
  TrendingDown,
  PieChart,
  BarChart3,
  Calculator,
  CreditCard,
  Wallet,
  Play,
  Pause,
  RefreshCw,
  Filter,
  Calendar,
  AlertTriangle,
  CheckCircle,
  Globe,
  Target,
  Users,
  ShoppingCart,
  Monitor,
  Repeat,
  MousePointer
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

const FinanceDashboard: React.FC = () => {
  const [timeRange, setTimeRange] = useState('30d');
  const [selectedCurrency, setSelectedCurrency] = useState('USD');
  const { isMobile, getGridClass, getButtonClass, getChartOptions } = useMobileOptimizations();
  const { 
    aggregatedMetrics, 
    isLoading, 
    isSimulating, 
    startSimulation, 
    stopSimulation, 
    refreshData 
  } = useGameData();

  // Finance KPIs
  const financeKPIs = aggregatedMetrics ? [
    {
      title: 'Monthly Revenue',
      value: `$${(aggregatedMetrics.revenue * 30).toLocaleString()}`,
      change: '+18.5%',
      positive: true,
      icon: <DollarSign className="h-6 w-6" />,
      color: 'text-green-400',
      description: 'Total monthly revenue'
    },
    {
      title: 'Gross Margin',
      value: '73.2%',
      change: '+2.1%',
      positive: true,
      icon: <Calculator className="h-6 w-6" />,
      color: 'text-blue-400',
      description: 'Revenue minus direct costs'
    },
    {
      title: 'Operating Expenses',
      value: '$485K',
      change: '+5.8%',
      positive: false,
      icon: <CreditCard className="h-6 w-6" />,
      color: 'text-orange-400',
      description: 'Monthly operating costs'
    },
    {
      title: 'Net Profit Margin',
      value: '24.8%',
      change: '+3.2%',
      positive: true,
      icon: <Wallet className="h-6 w-6" />,
      color: 'text-purple-400',
      description: 'Net profit as % of revenue'
    },
    {
      title: 'ARPPU (Avg Revenue Per Paying User)',
      value: `$${(aggregatedMetrics.arpu * 26.3).toFixed(2)}`,
      change: '+8.4%',
      positive: true,
      icon: <Users className="h-6 w-6" />,
      color: 'text-red-400',
      description: 'Revenue from paying users only'
    },
    {
      title: 'IAP Revenue',
      value: `$${(aggregatedMetrics.revenue * 0.65).toLocaleString()}`,
      change: '+12.7%',
      positive: true,
      icon: <ShoppingCart className="h-6 w-6" />,
      color: 'text-orange-400',
      description: 'In-app purchase revenue'
    },
    {
      title: 'Ad Revenue',
      value: `$${(aggregatedMetrics.revenue * 0.35).toLocaleString()}`,
      change: '+5.2%',
      positive: true,
      icon: <Monitor className="h-6 w-6" />,
      color: 'text-orange-400',
      description: 'Advertising revenue'
    },
    {
      title: 'eCPM (Effective Cost Per Mille)',
      value: '$4.85',
      change: '+7.1%',
      positive: true,
      icon: <Target className="h-6 w-6" />,
      color: 'text-orange-400',
      description: 'Revenue per 1000 ad impressions'
    },
    {
      title: 'ARPDAU',
      value: `$${(aggregatedMetrics.arpu * 0.85).toFixed(3)}`,
      change: '+3.8%',
      positive: true,
      icon: <Calendar className="h-6 w-6" />,
      color: 'text-orange-400',
      description: 'Average revenue per daily active user'
    },
    {
      title: 'Repeat Purchase Rate',
      value: '18.5%',
      change: '+2.3%',
      positive: true,
      icon: <Repeat className="h-6 w-6" />,
      color: 'text-yellow-400',
      description: 'Users making multiple purchases'
    },
    {
      title: 'Ad Interaction Rate',
      value: '12.8%',
      change: '+1.5%',
      positive: true,
      icon: <MousePointer className="h-6 w-6" />,
      color: 'text-yellow-400',
      description: 'Users interacting with ads'
    }
  ] : [];

  // Revenue Breakdown Data
  const revenueBreakdownData = {
    labels: ['Game A', 'Game B', 'Game C', 'Game D', 'Game E'],
    datasets: [
      {
        label: 'Revenue ($K)',
        data: [450, 320, 280, 180, 120],
        backgroundColor: [
          'rgba(59, 130, 246, 0.8)',
          'rgba(16, 185, 129, 0.8)',
          'rgba(245, 158, 11, 0.8)',
          'rgba(239, 68, 68, 0.8)',
          'rgba(139, 92, 246, 0.8)',
        ],
        borderWidth: 0,
      },
    ],
  };

  // P&L Trend Data
  const plTrendData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Revenue',
        data: [1200, 1350, 1180, 1420, 1580, 1650],
        borderColor: 'rgb(16, 185, 129)',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        tension: 0.4,
        fill: true,
      },
      {
        label: 'Expenses',
        data: [850, 920, 880, 950, 1020, 1080],
        borderColor: 'rgb(239, 68, 68)',
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        tension: 0.4,
        fill: true,
      },
      {
        label: 'Net Profit',
        data: [350, 430, 300, 470, 560, 570],
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.4,
        fill: true,
      },
    ],
  };

  // Cost Structure Data
  const costStructureData = {
    labels: ['User Acquisition', 'Development', 'Operations', 'Marketing', 'Admin', 'Other'],
    datasets: [
      {
        label: 'Cost Distribution',
        data: [35, 25, 15, 12, 8, 5],
        backgroundColor: [
          'rgba(239, 68, 68, 0.8)',
          'rgba(59, 130, 246, 0.8)',
          'rgba(245, 158, 11, 0.8)',
          'rgba(16, 185, 129, 0.8)',
          'rgba(139, 92, 246, 0.8)',
          'rgba(107, 114, 128, 0.8)',
        ],
        borderWidth: 0,
      },
    ],
  };

  // Regional Revenue Data
  const regionalRevenueData = {
    labels: ['Q1', 'Q2', 'Q3', 'Q4'],
    datasets: [
      {
        label: 'North America',
        data: [450, 520, 480, 580],
        backgroundColor: 'rgba(59, 130, 246, 0.8)',
      },
      {
        label: 'Europe',
        data: [320, 380, 350, 420],
        backgroundColor: 'rgba(16, 185, 129, 0.8)',
      },
      {
        label: 'Asia Pacific',
        data: [280, 340, 380, 450],
        backgroundColor: 'rgba(245, 158, 11, 0.8)',
      },
      {
        label: 'Other',
        data: [150, 180, 190, 220],
        backgroundColor: 'rgba(139, 92, 246, 0.8)',
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

  // Financial Health Indicators
  const healthIndicators = [
    {
      metric: 'Cash Flow',
      status: 'healthy',
      value: '+$125K',
      description: 'Positive monthly cash flow'
    },
    {
      metric: 'Burn Rate',
      status: 'warning',
      value: '$85K/month',
      description: 'Monthly cash consumption'
    },
    {
      metric: 'Runway',
      status: 'healthy',
      value: '18 months',
      description: 'Based on current burn rate'
    },
    {
      metric: 'ROI',
      status: 'excellent',
      value: '285%',
      description: 'Return on investment'
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'excellent': return <CheckCircle className="h-5 w-5 text-green-400" />;
      case 'healthy': return <CheckCircle className="h-5 w-5 text-green-400" />;
      case 'warning': return <AlertTriangle className="h-5 w-5 text-yellow-400" />;
      case 'critical': return <AlertTriangle className="h-5 w-5 text-red-400" />;
      default: return <CheckCircle className="h-5 w-5 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'border-green-700/30 bg-green-900/20';
      case 'healthy': return 'border-green-700/30 bg-green-900/20';
      case 'warning': return 'border-yellow-700/30 bg-yellow-900/20';
      case 'critical': return 'border-red-700/30 bg-red-900/20';
      default: return 'border-gray-700/30 bg-gray-900/20';
    }
  };

  return (
    <div className="min-h-screen text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Finance Dashboard</h1>
            <p className="text-gray-400">Financial performance, budget management, and investment analysis</p>
          </div>
          
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <div className="flex items-center space-x-2">
              <Globe className="h-4 w-4 text-gray-400" />
              <select 
                value={selectedCurrency}
                onChange={(e) => setSelectedCurrency(e.target.value)}
                className="bg-gray-700 text-white px-3 py-1 rounded border border-gray-600"
              >
                <option value="USD">USD ($)</option>
                <option value="EUR">EUR (€)</option>
                <option value="GBP">GBP (£)</option>
                <option value="JPY">JPY (¥)</option>
              </select>
            </div>

            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4 text-gray-400" />
              <select 
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="bg-gray-700 text-white px-3 py-1 rounded border border-gray-600"
              >
                <option value="7d">Last 7 days</option>
                <option value="30d">Last 30 days</option>
                <option value="90d">Last 90 days</option>
                <option value="1y">Last year</option>
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

        {/* Financial Health Indicators */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-white mb-4">Financial Health</h3>
          <div className={`grid ${getGridClass(1, 2, 4)} gap-4`}>
            {healthIndicators.map((indicator, index) => (
              <div key={index} className={`p-4 rounded-lg border ${getStatusColor(indicator.status)}`}>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-white font-medium">{indicator.metric}</h4>
                  {getStatusIcon(indicator.status)}
                </div>
                <div className="text-2xl font-bold text-white mb-1">{indicator.value}</div>
                <div className="text-gray-400 text-sm">{indicator.description}</div>
              </div>
            ))}
          </div>
        </div>

        {/* KPI Cards */}
        <div className={`grid ${getGridClass(1, 2, 3)} gap-6 mb-8`}>
          {financeKPIs.map((kpi, index) => (
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
          {/* P&L Trend */}
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-white">P&L Trend</h3>
              <BarChart3 className="h-5 w-5 text-green-400" />
            </div>
            <div className="h-64">
              <Line data={plTrendData} options={chartOptions} />
            </div>
            <div className="mt-4 text-sm text-gray-400">
              Net profit margin improved to <span className="text-green-400 font-semibold">34.5%</span> in June
            </div>
          </div>

          {/* Revenue Breakdown */}
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-white">Revenue by Game</h3>
              <PieChart className="h-5 w-5 text-blue-400" />
            </div>
            <div className="h-64">
              <Doughnut data={revenueBreakdownData} options={chartOptions} />
            </div>
            <div className="mt-4 text-sm text-gray-400">
              Game A contributes <span className="text-blue-400 font-semibold">33%</span> of total revenue
            </div>
          </div>
        </div>

        {/* Cost Analysis */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Cost Structure */}
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-white">Cost Structure</h3>
              <Calculator className="h-5 w-5 text-orange-400" />
            </div>
            <div className="h-64">
              <Doughnut data={costStructureData} options={chartOptions} />
            </div>
            <div className="mt-4 text-sm text-gray-400">
              User acquisition represents <span className="text-red-400 font-semibold">35%</span> of total costs
            </div>
          </div>

          {/* Regional Revenue */}
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-white">Regional Revenue</h3>
              <Globe className="h-5 w-5 text-purple-400" />
            </div>
            <div className="h-64">
              <Bar data={regionalRevenueData} options={chartOptions} />
            </div>
            <div className="mt-4 text-sm text-gray-400">
              Asia Pacific shows strongest growth at <span className="text-green-400 font-semibold">+18%</span> QoQ
            </div>
          </div>
        </div>

        {/* Financial Insights */}
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold text-white">Financial Insights & Recommendations</h3>
            <Target className="h-5 w-5 text-green-400" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-green-900/20 border border-green-700/30 rounded-lg p-4">
              <CheckCircle className="h-6 w-6 text-green-400 mb-2" />
              <h4 className="text-green-400 font-medium mb-2">Strong Performance</h4>
              <p className="text-green-300 text-sm">Revenue growth exceeds industry average by 12%</p>
            </div>
            <div className="bg-yellow-900/20 border border-yellow-700/30 rounded-lg p-4">
              <AlertTriangle className="h-6 w-6 text-yellow-400 mb-2" />
              <h4 className="text-yellow-400 font-medium mb-2">Cost Optimization</h4>
              <p className="text-yellow-300 text-sm">Consider optimizing UA spend efficiency in Q4</p>
            </div>
            <div className="bg-blue-900/20 border border-blue-700/30 rounded-lg p-4">
              <TrendingUp className="h-6 w-6 text-blue-400 mb-2" />
              <h4 className="text-blue-400 font-medium mb-2">Growth Opportunity</h4>
              <p className="text-blue-300 text-sm">Asia Pacific market shows 25% expansion potential</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinanceDashboard;

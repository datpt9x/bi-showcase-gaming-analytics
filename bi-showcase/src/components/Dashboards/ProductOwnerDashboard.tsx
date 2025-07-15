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
  Users,
  TrendingUp,
  TrendingDown,
  Target,
  Gamepad2,
  Clock,
  Trophy,
  Zap,
  BarChart3,
  Play,
  Pause,
  RefreshCw,
  Filter,
  Calendar,
  TestTube,
  UserCheck,
  SkipForward
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

const ProductOwnerDashboard: React.FC = () => {
  const [timeRange, setTimeRange] = useState('7d');
  const [selectedGame, setSelectedGame] = useState('all');
  const { isMobile, getGridClass, getButtonClass, getChartOptions } = useMobileOptimizations();
  const { 
    games,
    aggregatedMetrics, 
    isLoading, 
    isSimulating, 
    startSimulation, 
    stopSimulation, 
    refreshData 
  } = useGameData();

  // Product-specific KPIs
  const productKPIs = aggregatedMetrics ? [
    {
      title: 'Session Length',
      value: `${aggregatedMetrics.sessionMetrics.averageLength.toFixed(1)} min`,
      change: '+15.2%',
      positive: true,
      icon: <Clock className="h-6 w-6" />,
      color: 'text-blue-400',
      description: 'Average time per session'
    },
    {
      title: 'Sessions/User',
      value: `${aggregatedMetrics.sessionMetrics.frequency.toFixed(1)}`,
      change: '+8.7%',
      positive: true,
      icon: <Users className="h-6 w-6" />,
      color: 'text-green-400',
      description: 'Daily sessions per user'
    },
    {
      title: 'Level Completion',
      value: '78%',
      change: '+3.1%',
      positive: true,
      icon: <Trophy className="h-6 w-6" />,
      color: 'text-yellow-400',
      description: 'Players completing levels'
    },
    {
      title: 'Feature Adoption',
      value: '65%',
      change: '+22.4%',
      positive: true,
      icon: <Zap className="h-6 w-6" />,
      color: 'text-purple-400',
      description: 'New feature usage rate'
    },
    {
      title: 'WAU (Weekly Active Users)',
      value: `${(aggregatedMetrics.dau * 4.2 / 1000000).toFixed(1)}M`,
      change: '+6.8%',
      positive: true,
      icon: <Calendar className="h-6 w-6" />,
      color: 'text-red-400',
      description: 'Weekly active user base'
    },
    {
      title: 'MAU (Monthly Active Users)',
      value: `${(aggregatedMetrics.dau * 18.5 / 1000000).toFixed(1)}M`,
      change: '+4.2%',
      positive: true,
      icon: <Users className="h-6 w-6" />,
      color: 'text-red-400',
      description: 'Monthly active user base'
    },
    {
      title: 'D7 Retention',
      value: `${(aggregatedMetrics.retention.d1 * 0.65).toFixed(1)}%`,
      change: '+2.3%',
      positive: true,
      icon: <UserCheck className="h-6 w-6" />,
      color: 'text-red-400',
      description: '7-day user retention rate'
    },
    {
      title: 'D30 Retention',
      value: `${(aggregatedMetrics.retention.d1 * 0.35).toFixed(1)}%`,
      change: '+1.8%',
      positive: true,
      icon: <UserCheck className="h-6 w-6" />,
      color: 'text-red-400',
      description: '30-day user retention rate'
    },
    {
      title: 'Churn Rate',
      value: '12.5%',
      change: '-1.2%',
      positive: true,
      icon: <TrendingDown className="h-6 w-6" />,
      color: 'text-orange-400',
      description: 'Monthly user churn rate'
    },
    {
      title: 'Skip Rate',
      value: '8.3%',
      change: '+0.5%',
      positive: false,
      icon: <SkipForward className="h-6 w-6" />,
      color: 'text-orange-400',
      description: 'Tutorial/level skip rate'
    }
  ] : [];

  // Player Journey Funnel Data
  const playerJourneyData = {
    labels: ['App Install', 'Tutorial Start', 'Tutorial Complete', 'Level 1 Complete', 'Level 5 Complete', 'First Purchase'],
    datasets: [
      {
        label: 'Player Count',
        data: [100000, 85000, 72000, 68000, 45000, 8500],
        backgroundColor: [
          'rgba(59, 130, 246, 0.8)',
          'rgba(16, 185, 129, 0.8)',
          'rgba(245, 158, 11, 0.8)',
          'rgba(239, 68, 68, 0.8)',
          'rgba(139, 92, 246, 0.8)',
          'rgba(236, 72, 153, 0.8)',
        ],
        borderWidth: 0,
      },
    ],
  };

  // Level Analytics Data
  const levelAnalyticsData = {
    labels: ['Level 1', 'Level 2', 'Level 3', 'Level 4', 'Level 5', 'Level 6', 'Level 7', 'Level 8'],
    datasets: [
      {
        label: 'Completion Rate (%)',
        data: [95, 88, 82, 75, 68, 58, 45, 32],
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.4,
        fill: true,
      },
      {
        label: 'Average Attempts',
        data: [1.2, 1.8, 2.3, 2.9, 3.5, 4.2, 5.1, 6.8],
        borderColor: 'rgb(239, 68, 68)',
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        tension: 0.4,
        fill: true,
        yAxisID: 'y1',
      },
    ],
  };

  // A/B Testing Results
  const abTestData = {
    labels: ['Control Group', 'Variant A', 'Variant B'],
    datasets: [
      {
        label: 'Conversion Rate (%)',
        data: [3.2, 4.1, 3.8],
        backgroundColor: [
          'rgba(107, 114, 128, 0.8)',
          'rgba(16, 185, 129, 0.8)',
          'rgba(245, 158, 11, 0.8)',
        ],
        borderWidth: 0,
      },
    ],
  };

  // Retention Cohort Data
  const retentionData = {
    labels: ['Day 0', 'Day 1', 'Day 3', 'Day 7', 'Day 14', 'Day 30'],
    datasets: [
      {
        label: 'Cohort Week 1',
        data: [100, 45, 32, 25, 18, 12],
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.4,
        fill: true,
      },
      {
        label: 'Cohort Week 2',
        data: [100, 48, 35, 28, 21, 15],
        borderColor: 'rgb(16, 185, 129)',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        tension: 0.4,
        fill: true,
      },
      {
        label: 'Cohort Week 3',
        data: [100, 42, 30, 23, 17, 11],
        borderColor: 'rgb(245, 158, 11)',
        backgroundColor: 'rgba(245, 158, 11, 0.1)',
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

  const levelChartOptions = {
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
  const levelOptions = getChartOptions(levelChartOptions);

  return (
    <div className="min-h-screen text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Product Owner Dashboard</h1>
            <p className="text-gray-400">Player behavior, level analytics, and feature performance insights</p>
          </div>
          
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-gray-400" />
              <select 
                value={selectedGame}
                onChange={(e) => setSelectedGame(e.target.value)}
                className="bg-gray-700 text-white px-3 py-1 rounded border border-gray-600"
              >
                <option value="all">All Games</option>
                {games.map(game => (
                  <option key={game.id} value={game.id}>{game.name}</option>
                ))}
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

        {/* KPI Cards */}
        <div className={`grid ${getGridClass(1, 2, 3)} gap-6 mb-8`}>
          {productKPIs.map((kpi, index) => (
            <div key={index} className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <div className={kpi.color}>
                  {kpi.icon}
                </div>
                <div className={`text-sm flex items-center ${
                  kpi.positive ? 'text-green-400' : 'text-red-400'
                }`}>
                  {kpi.positive ? <TrendingUp className="h-4 w-4 mr-1" /> : <Target className="h-4 w-4 mr-1" />}
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
          {/* Player Journey Funnel */}
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-white">Player Journey Funnel</h3>
              <Gamepad2 className="h-5 w-5 text-blue-400" />
            </div>
            <div className="h-64">
              <Bar data={playerJourneyData} options={chartOptions} />
            </div>
            <div className="mt-4 text-sm text-gray-400">
              Conversion rate from install to first purchase: <span className="text-green-400 font-semibold">8.5%</span>
            </div>
          </div>

          {/* A/B Testing Results */}
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-white">A/B Test: New Tutorial</h3>
              <TestTube className="h-5 w-5 text-purple-400" />
            </div>
            <div className="h-64">
              <Doughnut data={abTestData} options={chartOptions} />
            </div>
            <div className="mt-4 text-sm text-gray-400">
              Variant A shows <span className="text-green-400 font-semibold">+28% improvement</span> in conversion
            </div>
          </div>
        </div>

        {/* Level Analytics */}
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold text-white">Level Analytics & Difficulty Curve</h3>
            <BarChart3 className="h-5 w-5 text-yellow-400" />
          </div>
          <div className="h-80">
            <Line data={levelAnalyticsData} options={levelOptions} />
          </div>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="text-gray-400">
              <span className="text-blue-400 font-semibold">Completion Rate:</span> Shows player progression difficulty
            </div>
            <div className="text-gray-400">
              <span className="text-red-400 font-semibold">Average Attempts:</span> Indicates level difficulty balance
            </div>
            <div className="text-gray-400">
              <span className="text-green-400 font-semibold">Recommendation:</span> Adjust Level 6-8 difficulty
            </div>
          </div>
        </div>

        {/* Retention Cohort Analysis */}
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold text-white">Retention Cohort Analysis</h3>
            <Users className="h-5 w-5 text-green-400" />
          </div>
          <div className="h-80">
            <Line data={retentionData} options={chartOptions} />
          </div>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="text-gray-400">
              <span className="text-blue-400 font-semibold">Week 1:</span> Baseline cohort performance
            </div>
            <div className="text-gray-400">
              <span className="text-green-400 font-semibold">Week 2:</span> +15% improvement after tutorial update
            </div>
            <div className="text-gray-400">
              <span className="text-yellow-400 font-semibold">Week 3:</span> Slight decline, needs investigation
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductOwnerDashboard;

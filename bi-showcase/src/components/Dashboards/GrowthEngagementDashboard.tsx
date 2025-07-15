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
  TrendingUp,
  TrendingDown,
  Users,
  Share2,
  Heart,
  Star,
  Clock,
  ShoppingCart,
  Play,
  Pause,
  RefreshCw,
  Filter,
  Calendar,
  Target,
  Zap,
  UserPlus,
  MessageCircle
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

const GrowthEngagementDashboard: React.FC = () => {
  const [isSimulating, setIsSimulating] = useState(false);
  const [selectedTimeframe, setSelectedTimeframe] = useState('7d');
  const { 
    getGridClass, 
    isMobile, 
    isTablet 
  } = useMobileOptimizations();
  
  const { 
    aggregatedMetrics, 
    getChartData, 
    isLoading, 
    startSimulation, 
    stopSimulation, 
    refreshData 
  } = useGameData();

  // Growth & Engagement KPIs
  const growthKPIs = aggregatedMetrics ? [
    {
      title: 'User Growth Rate',
      value: '12.8%',
      change: '+2.3%',
      positive: true,
      icon: <TrendingUp className="h-6 w-6" />,
      color: 'text-orange-400',
      description: 'Monthly user growth'
    },
    {
      title: 'Viral Coefficient',
      value: '1.35',
      change: '+0.15',
      positive: true,
      icon: <Share2 className="h-6 w-6" />,
      color: 'text-yellow-400',
      description: 'Users invited per user'
    },
    {
      title: 'Social Share Rate',
      value: '8.5%',
      change: '+1.2%',
      positive: true,
      icon: <MessageCircle className="h-6 w-6" />,
      color: 'text-yellow-400',
      description: 'Users sharing content'
    },
    {
      title: 'Engagement Score',
      value: '78.2',
      change: '+5.1',
      positive: true,
      icon: <Heart className="h-6 w-6" />,
      color: 'text-orange-400',
      description: 'Overall engagement metric'
    },
    {
      title: 'Feature Adoption Rate',
      value: '65%',
      change: '+8.3%',
      positive: true,
      icon: <Zap className="h-6 w-6" />,
      color: 'text-orange-400',
      description: 'New feature usage'
    },
    {
      title: 'Time to First Purchase',
      value: '3.2 days',
      change: '-0.5 days',
      positive: true,
      icon: <ShoppingCart className="h-6 w-6" />,
      color: 'text-orange-400',
      description: 'Average time to monetize'
    }
  ] : [];

  const handleSimulationToggle = () => {
    if (isSimulating) {
      stopSimulation();
    } else {
      startSimulation();
    }
    setIsSimulating(!isSimulating);
  };

  // Growth Trend Data
  const growthTrendData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [
      {
        label: 'User Growth (%)',
        data: [8.5, 10.2, 11.8, 12.8],
        borderColor: 'rgb(251, 146, 60)',
        backgroundColor: 'rgba(251, 146, 60, 0.1)',
        tension: 0.4,
      },
      {
        label: 'Engagement Score',
        data: [72, 74, 76, 78],
        borderColor: 'rgb(34, 197, 94)',
        backgroundColor: 'rgba(34, 197, 94, 0.1)',
        tension: 0.4,
      }
    ]
  };

  // Viral Metrics Data
  const viralMetricsData = {
    labels: ['Organic', 'Referral', 'Social Share', 'Invite'],
    datasets: [
      {
        data: [45, 25, 20, 10],
        backgroundColor: [
          'rgba(59, 130, 246, 0.8)',
          'rgba(16, 185, 129, 0.8)',
          'rgba(245, 158, 11, 0.8)',
          'rgba(239, 68, 68, 0.8)',
        ],
        borderWidth: 0,
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: '#9CA3AF',
          font: {
            size: isMobile ? 10 : 12
          }
        }
      }
    },
    scales: {
      x: {
        ticks: {
          color: '#9CA3AF',
          font: {
            size: isMobile ? 10 : 12
          }
        },
        grid: {
          color: 'rgba(75, 85, 99, 0.3)'
        }
      },
      y: {
        ticks: {
          color: '#9CA3AF',
          font: {
            size: isMobile ? 10 : 12
          }
        },
        grid: {
          color: 'rgba(75, 85, 99, 0.3)'
        }
      }
    }
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          color: '#9CA3AF',
          font: {
            size: isMobile ? 10 : 12
          },
          padding: isMobile ? 10 : 20
        }
      }
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white text-xl">Loading Growth & Engagement Dashboard...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Growth & Engagement Dashboard</h1>
            <p className="text-gray-400">Track user growth, viral metrics, and engagement patterns</p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 mt-4 lg:mt-0">
            <select 
              value={selectedTimeframe}
              onChange={(e) => setSelectedTimeframe(e.target.value)}
              className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white"
            >
              <option value="24h">Last 24 Hours</option>
              <option value="7d">Last 7 Days</option>
              <option value="30d">Last 30 Days</option>
              <option value="90d">Last 90 Days</option>
            </select>
            
            <div className="flex gap-2">
              <button
                onClick={handleSimulationToggle}
                className={`flex items-center px-4 py-2 rounded-lg font-medium transition-colors ${
                  isSimulating 
                    ? 'bg-red-600 hover:bg-red-700' 
                    : 'bg-green-600 hover:bg-green-700'
                }`}
              >
                {isSimulating ? <Pause className="h-4 w-4 mr-2" /> : <Play className="h-4 w-4 mr-2" />}
                {isSimulating ? 'Stop' : 'Start'} Simulation
              </button>
              
              <button
                onClick={refreshData}
                className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition-colors"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </button>
            </div>
          </div>
        </div>

        {/* KPI Cards */}
        <div className={`grid ${getGridClass(1, 2, 3)} gap-6 mb-8`}>
          {growthKPIs.map((kpi, index) => (
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

        {/* Charts */}
        <div className={`grid ${getGridClass(1, 1, 2)} gap-6 mb-8`}>
          {/* Growth Trend Chart */}
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h3 className="text-xl font-semibold text-white mb-4">Growth & Engagement Trends</h3>
            <div className="h-80">
              <Line data={growthTrendData} options={chartOptions} />
            </div>
          </div>

          {/* Viral Acquisition Sources */}
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h3 className="text-xl font-semibold text-white mb-4">User Acquisition Sources</h3>
            <div className="h-80">
              <Doughnut data={viralMetricsData} options={doughnutOptions} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GrowthEngagementDashboard;

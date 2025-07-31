import React from 'react';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { MousePointer, Eye, Percent } from 'lucide-react';

ChartJS.register(ArcElement, Tooltip, Legend);

interface FormatData {
  name: string;
  revenue: number;
  ctr: number;
  impressions: number;
  share: number;
}

interface FormatAnalysisProps {
  data: FormatData[];
}

const FormatAnalysis: React.FC<FormatAnalysisProps> = ({ data }) => {
  const formatCurrency = (value: number) => {
    if (value >= 1000000) {
      return `$${(value / 1000000).toFixed(1)}M`;
    } else if (value >= 1000) {
      return `$${(value / 1000).toFixed(1)}K`;
    }
    return `$${value.toFixed(0)}`;
  };

  const formatNumber = (value: number) => {
    if (value >= 1000000) {
      return `${(value / 1000000).toFixed(1)}M`;
    } else if (value >= 1000) {
      return `${(value / 1000).toFixed(1)}K`;
    }
    return value.toLocaleString();
  };

  const getCTRColor = (ctr: number) => {
    if (ctr >= 5) return 'text-green-600';
    if (ctr >= 2) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getFormatIcon = (formatName: string) => {
    const lowerFormat = formatName.toLowerCase();
    if (lowerFormat.includes('interstitial')) return '📱';
    if (lowerFormat.includes('banner')) return '📰';
    if (lowerFormat.includes('native')) return '📄';
    if (lowerFormat.includes('video')) return '🎥';
    if (lowerFormat.includes('rewarded')) return '🎁';
    return '📊';
  };

  if (data.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 text-gray-500">
        <div className="text-center">
          <div className="text-4xl mb-2">📊</div>
          <p>No format data available</p>
        </div>
      </div>
    );
  }

  // Chart colors
  const colors = [
    'rgb(59, 130, 246)',   // Blue
    'rgb(34, 197, 94)',    // Green
    'rgb(239, 68, 68)',    // Red
    'rgb(168, 85, 247)',   // Purple
    'rgb(245, 158, 11)',   // Amber
    'rgb(236, 72, 153)',   // Pink
    'rgb(20, 184, 166)',   // Teal
    'rgb(251, 146, 60)',   // Orange
  ];

  const chartData = {
    labels: data.map(d => d.name),
    datasets: [
      {
        data: data.map(d => d.share),
        backgroundColor: colors.slice(0, data.length),
        borderColor: colors.slice(0, data.length).map(color => color.replace('rgb', 'rgba').replace(')', ', 0.8)')),
        borderWidth: 2,
        hoverOffset: 4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: 'white',
        bodyColor: 'white',
        borderColor: 'rgba(59, 130, 246, 0.5)',
        borderWidth: 1,
        cornerRadius: 8,
        callbacks: {
          label: (context: any) => {
            const format = data[context.dataIndex];
            return [
              `${format.name}: ${format.share.toFixed(1)}%`,
              `Revenue: ${formatCurrency(format.revenue)}`,
              `CTR: ${format.ctr.toFixed(2)}%`,
            ];
          },
        },
      },
    },
    cutout: '60%',
  };

  return (
    <div className="space-y-4">
      {/* Donut Chart */}
      <div className="h-48 relative">
        <Doughnut data={chartData} options={chartOptions} />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">
              {data.length}
            </div>
            <div className="text-sm text-gray-600">Formats</div>
          </div>
        </div>
      </div>

      {/* Format List */}
      <div className="space-y-3">
        {data.map((format, index) => (
          <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
            <div className="flex items-center flex-1">
              <div
                className="w-4 h-4 rounded-full mr-3 flex-shrink-0"
                style={{ backgroundColor: colors[index % colors.length] }}
              ></div>
              <div className="flex items-center flex-1">
                <span className="text-lg mr-2">{getFormatIcon(format.name)}</span>
                <div className="flex-1">
                  <div className="font-medium text-gray-900 truncate" title={format.name}>
                    {format.name}
                  </div>
                  <div className="text-sm text-gray-600">
                    {format.share.toFixed(1)}% of revenue
                  </div>
                </div>
              </div>
            </div>
            <div className="text-right ml-4">
              <div className="font-semibold text-gray-900">
                {formatCurrency(format.revenue)}
              </div>
              <div className={`text-sm font-medium ${getCTRColor(format.ctr)}`}>
                {format.ctr.toFixed(2)}% CTR
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Detailed Metrics */}
      <div className="mt-6 space-y-3">
        <h5 className="font-medium text-gray-900">Performance Metrics</h5>
        {data.map((format, index) => (
          <div key={index} className="border border-gray-200 rounded-lg p-3">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <span className="text-lg mr-2">{getFormatIcon(format.name)}</span>
                <span className="font-medium text-gray-900">{format.name}</span>
              </div>
              <span className="text-sm text-gray-600">
                {format.share.toFixed(1)}% share
              </span>
            </div>
            
            <div className="grid grid-cols-3 gap-3 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-gray-600 flex items-center">
                  <Eye className="w-3 h-3 mr-1" />
                  Impressions
                </span>
                <span className="font-semibold text-gray-900">
                  {formatNumber(format.impressions)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600 flex items-center">
                  <MousePointer className="w-3 h-3 mr-1" />
                  CTR
                </span>
                <span className={`font-semibold ${getCTRColor(format.ctr)}`}>
                  {format.ctr.toFixed(2)}%
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600 flex items-center">
                  <Percent className="w-3 h-3 mr-1" />
                  Revenue
                </span>
                <span className="font-semibold text-gray-900">
                  {formatCurrency(format.revenue)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <h5 className="font-medium text-gray-900 mb-2">Format Summary</h5>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-gray-600">Total Formats:</span>
            <span className="ml-2 font-semibold">{data.length}</span>
          </div>
          <div>
            <span className="text-gray-600">Total Revenue:</span>
            <span className="ml-2 font-semibold">
              {formatCurrency(data.reduce((sum, d) => sum + d.revenue, 0))}
            </span>
          </div>
          <div>
            <span className="text-gray-600">Avg CTR:</span>
            <span className="ml-2 font-semibold">
              {(data.reduce((sum, d) => sum + d.ctr, 0) / data.length).toFixed(2)}%
            </span>
          </div>
          <div>
            <span className="text-gray-600">Total Impressions:</span>
            <span className="ml-2 font-semibold">
              {formatNumber(data.reduce((sum, d) => sum + d.impressions, 0))}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormatAnalysis;

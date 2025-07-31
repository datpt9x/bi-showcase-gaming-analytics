import React from 'react';
import { TrendingUp, TrendingDown, Eye } from 'lucide-react';

interface AdSourceData {
  name: string;
  revenue: number;
  ecpm: number;
  impressions: number;
  fillRate: number;
}

interface AdSourceBreakdownProps {
  data: AdSourceData[];
}

const AdSourceBreakdown: React.FC<AdSourceBreakdownProps> = ({ data }) => {
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

  const getPerformanceColor = (fillRate: number) => {
    if (fillRate >= 80) return 'text-green-600 bg-green-50';
    if (fillRate >= 60) return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
  };

  const getECPMColor = (ecpm: number) => {
    if (ecpm >= 5) return 'text-green-600';
    if (ecpm >= 2) return 'text-yellow-600';
    return 'text-red-600';
  };

  if (data.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 text-gray-500">
        <div className="text-center">
          <div className="text-4xl mb-2">📊</div>
          <p>No ad source data available</p>
        </div>
      </div>
    );
  }

  const maxRevenue = Math.max(...data.map(d => d.revenue));

  return (
    <div className="space-y-4">
      {data.map((source, index) => {
        const revenuePercentage = maxRevenue > 0 ? (source.revenue / maxRevenue) * 100 : 0;
        
        return (
          <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            {/* Header */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex-1">
                <h4 className="font-medium text-gray-900 truncate" title={source.name}>
                  {source.name}
                </h4>
                <div className="flex items-center mt-1">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getPerformanceColor(source.fillRate)}`}>
                    {source.fillRate.toFixed(1)}% Fill Rate
                  </span>
                </div>
              </div>
            </div>

            {/* Revenue Bar */}
            <div className="mb-3">
              <div className="flex items-center justify-between text-sm mb-1">
                <span className="text-gray-600">Revenue</span>
                <span className="font-semibold text-gray-900">{formatCurrency(source.revenue)}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${revenuePercentage}%` }}
                ></div>
              </div>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">eCPM</span>
                <span className={`font-semibold ${getECPMColor(source.ecpm)}`}>
                  ${source.ecpm.toFixed(2)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Impressions</span>
                <span className="font-semibold text-gray-900 flex items-center">
                  <Eye className="w-3 h-3 mr-1" />
                  {formatNumber(source.impressions)}
                </span>
              </div>
            </div>

            {/* Performance Indicator */}
            <div className="mt-3 pt-3 border-t border-gray-100">
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-500">Performance</span>
                <div className="flex items-center">
                  {source.fillRate >= 70 ? (
                    <TrendingUp className="w-3 h-3 text-green-500 mr-1" />
                  ) : (
                    <TrendingDown className="w-3 h-3 text-red-500 mr-1" />
                  )}
                  <span className={source.fillRate >= 70 ? 'text-green-600' : 'text-red-600'}>
                    {source.fillRate >= 70 ? 'Good' : 'Needs Attention'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        );
      })}

      {/* Summary */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <h5 className="font-medium text-gray-900 mb-2">Summary</h5>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-gray-600">Total Sources:</span>
            <span className="ml-2 font-semibold">{data.length}</span>
          </div>
          <div>
            <span className="text-gray-600">Total Revenue:</span>
            <span className="ml-2 font-semibold">
              {formatCurrency(data.reduce((sum, d) => sum + d.revenue, 0))}
            </span>
          </div>
          <div>
            <span className="text-gray-600">Avg eCPM:</span>
            <span className="ml-2 font-semibold">
              ${(data.reduce((sum, d) => sum + d.ecpm, 0) / data.length).toFixed(2)}
            </span>
          </div>
          <div>
            <span className="text-gray-600">Avg Fill Rate:</span>
            <span className="ml-2 font-semibold">
              {(data.reduce((sum, d) => sum + d.fillRate, 0) / data.length).toFixed(1)}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdSourceBreakdown;

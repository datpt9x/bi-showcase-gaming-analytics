import React from 'react';
import { MapPin, Users, DollarSign } from 'lucide-react';

interface CountryData {
  name: string;
  revenue: number;
  ecpm: number;
  activeUsers: number;
  arpu: number;
}

interface CountryPerformanceProps {
  data: CountryData[];
}

const CountryPerformance: React.FC<CountryPerformanceProps> = ({ data }) => {
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

  const getARPUColor = (arpu: number) => {
    if (arpu >= 0.01) return 'text-green-600';
    if (arpu >= 0.005) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getECPMColor = (ecpm: number) => {
    if (ecpm >= 5) return 'text-green-600';
    if (ecpm >= 2) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getCountryFlag = (countryName: string) => {
    const flagMap: { [key: string]: string } = {
      'United States': '🇺🇸',
      'Indonesia': '🇮🇩',
      'Brazil': '🇧🇷',
      'Philippines': '🇵🇭',
      'India': '🇮🇳',
      'Japan': '🇯🇵',
      'Mexico': '🇲🇽',
      'Nigeria': '🇳🇬',
      'Thailand': '🇹🇭',
      'Vietnam': '🇻🇳',
      'Germany': '🇩🇪',
      'United Kingdom': '🇬🇧',
      'France': '🇫🇷',
      'Canada': '🇨🇦',
      'Australia': '🇦🇺',
      'South Korea': '🇰🇷',
      'Turkey': '🇹🇷',
      'Egypt': '🇪🇬',
      'Malaysia': '🇲🇾',
      'Singapore': '🇸🇬',
    };
    return flagMap[countryName] || '🌍';
  };

  if (data.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 text-gray-500">
        <div className="text-center">
          <div className="text-4xl mb-2">🌍</div>
          <p>No country data available</p>
        </div>
      </div>
    );
  }

  const maxRevenue = Math.max(...data.map(d => d.revenue));

  return (
    <div className="space-y-3">
      {data.map((country, index) => {
        const revenuePercentage = maxRevenue > 0 ? (country.revenue / maxRevenue) * 100 : 0;

        return (
          <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            {/* Header */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center flex-1">
                <span className="text-2xl mr-2">{getCountryFlag(country.name)}</span>
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900 truncate" title={country.name}>
                    {country.name}
                  </h4>
                  <div className="flex items-center mt-1">
                    <Users className="w-3 h-3 text-gray-400 mr-1" />
                    <span className="text-xs text-gray-600">
                      {formatNumber(country.activeUsers)} users
                    </span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-semibold text-gray-900">
                  {formatCurrency(country.revenue)}
                </div>
                <div className={`text-xs font-medium ${getARPUColor(country.arpu)}`}>
                  ${country.arpu.toFixed(4)} ARPU
                </div>
              </div>
            </div>

            {/* Revenue Bar */}
            <div className="mb-3">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${revenuePercentage}%` }}
                ></div>
              </div>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-gray-600 flex items-center">
                  <DollarSign className="w-3 h-3 mr-1" />
                  eCPM
                </span>
                <span className={`font-semibold ${getECPMColor(country.ecpm)}`}>
                  ${country.ecpm.toFixed(2)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600 flex items-center">
                  <MapPin className="w-3 h-3 mr-1" />
                  Market
                </span>
                <span className="font-semibold text-gray-900">
                  {country.arpu >= 0.01 ? 'Tier 1' : country.arpu >= 0.005 ? 'Tier 2' : 'Tier 3'}
                </span>
              </div>
            </div>

            {/* Performance Indicator */}
            <div className="mt-3 pt-3 border-t border-gray-100">
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-500">Revenue Share</span>
                <span className="font-medium text-gray-700">
                  {revenuePercentage.toFixed(1)}%
                </span>
              </div>
            </div>
          </div>
        );
      })}

      {/* Summary */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <h5 className="font-medium text-gray-900 mb-2">Geographic Summary</h5>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-gray-600">Countries:</span>
            <span className="ml-2 font-semibold">{data.length}</span>
          </div>
          <div>
            <span className="text-gray-600">Total Revenue:</span>
            <span className="ml-2 font-semibold">
              {formatCurrency(data.reduce((sum, d) => sum + d.revenue, 0))}
            </span>
          </div>
          <div>
            <span className="text-gray-600">Total Users:</span>
            <span className="ml-2 font-semibold">
              {formatNumber(data.reduce((sum, d) => sum + d.activeUsers, 0))}
            </span>
          </div>
          <div>
            <span className="text-gray-600">Avg ARPU:</span>
            <span className="ml-2 font-semibold">
              ${(data.reduce((sum, d) => sum + d.arpu, 0) / data.length).toFixed(4)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountryPerformance;

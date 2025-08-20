import React from 'react';
import { Filter, Database, TrendingUp, Users, Eye, DollarSign } from 'lucide-react';

interface FilterStatsProps {
  totalRecords: number;
  filteredRecords: number;
  totalRevenue: number;
  totalUsers: number;
  totalImpressions: number;
  hasActiveFilters: boolean;
}

const FilterStats: React.FC<FilterStatsProps> = ({
  totalRecords,
  filteredRecords,
  totalRevenue,
  totalUsers,
  totalImpressions,
  hasActiveFilters
}) => {
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

  const filterPercentage = totalRecords > 0 ? (filteredRecords / totalRecords) * 100 : 0;

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 mb-4">
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-sm font-medium text-gray-900 flex items-center">
          <Database className="w-4 h-4 mr-2" />
          Data Overview
        </h4>
        {hasActiveFilters && (
          <div className="flex items-center text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded">
            <Filter className="w-3 h-3 mr-1" />
            Filtered
          </div>
        )}
      </div>

      {/* Main Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
        <div className="text-center">
          <div className="text-lg font-semibold text-gray-900">
            {filteredRecords.toLocaleString()}
          </div>
          <div className="text-xs text-gray-600">Records</div>
          {hasActiveFilters && (
            <div className="text-xs text-blue-600">
              {filterPercentage.toFixed(1)}% of total
            </div>
          )}
        </div>

        <div className="text-center">
          <div className="text-lg font-semibold text-green-600">
            {formatCurrency(totalRevenue)}
          </div>
          <div className="text-xs text-gray-600">Revenue</div>
        </div>

        <div className="text-center">
          <div className="text-lg font-semibold text-purple-600">
            {formatNumber(totalUsers)}
          </div>
          <div className="text-xs text-gray-600">Users</div>
        </div>

        <div className="text-center">
          <div className="text-lg font-semibold text-orange-600">
            {formatNumber(totalImpressions)}
          </div>
          <div className="text-xs text-gray-600">Impressions</div>
        </div>
      </div>

      {/* Filter Progress Bar */}
      {hasActiveFilters && (
        <div className="mb-3">
          <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
            <span>Data Coverage</span>
            <span>{filterPercentage.toFixed(1)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${filterPercentage}%` }}
            ></div>
          </div>
        </div>
      )}

      {/* Additional Metrics */}
      <div className="grid grid-cols-3 gap-4 text-xs">
        <div className="flex items-center justify-center p-2 bg-gray-50 rounded">
          <DollarSign className="w-3 h-3 text-green-500 mr-1" />
          <span className="text-gray-700">
            ${totalUsers > 0 ? (totalRevenue / totalUsers).toFixed(4) : '0.0000'} ARPU
          </span>
        </div>

        <div className="flex items-center justify-center p-2 bg-gray-50 rounded">
          <Eye className="w-3 h-3 text-blue-500 mr-1" />
          <span className="text-gray-700">
            {totalImpressions > 0 ? (totalRevenue / totalImpressions * 1000).toFixed(2) : '0.00'} eCPM
          </span>
        </div>

        <div className="flex items-center justify-center p-2 bg-gray-50 rounded">
          <TrendingUp className="w-3 h-3 text-purple-500 mr-1" />
          <span className="text-gray-700">
            {totalUsers > 0 ? (totalImpressions / totalUsers).toFixed(1) : '0.0'} Imps/User
          </span>
        </div>
      </div>

      {/* Status Message */}
      <div className="mt-3 pt-3 border-t border-gray-200">
        <div className="text-xs text-gray-600 text-center">
          {hasActiveFilters ? (
            <>
              Showing {filteredRecords.toLocaleString()} of {totalRecords.toLocaleString()} records
              {filterPercentage < 50 && (
                <span className="text-orange-600 ml-1">
                  (Consider broadening filters for more comprehensive analysis)
                </span>
              )}
            </>
          ) : (
            `Displaying all ${totalRecords.toLocaleString()} records`
          )}
        </div>
      </div>
    </div>
  );
};

export default FilterStats;

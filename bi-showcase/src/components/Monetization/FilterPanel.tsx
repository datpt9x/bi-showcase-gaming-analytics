import React, { useState, useEffect } from 'react';
import { X, Calendar, Filter, RotateCcw } from 'lucide-react';
import { MonetizationRecord } from '../../services/MonetizationDataService';
import MultiSelectFilter from './MultiSelectFilter';
import FilterPresets from './FilterPresets';

interface FilterPanelProps {
  data: MonetizationRecord[];
  filters: {
    dateRange?: { start: string; end: string };
    apps?: string[];
    adSources?: string[];
    countries?: string[];
    formats?: string[];
  };
  onFiltersChange: (filters: any) => void;
  onClose: () => void;
}

const FilterPanel: React.FC<FilterPanelProps> = ({ data, filters, onFiltersChange, onClose }) => {
  const [localFilters, setLocalFilters] = useState(filters);
  const [availableOptions, setAvailableOptions] = useState({
    apps: [] as string[],
    adSources: [] as string[],
    countries: [] as string[],
    formats: [] as string[],
    dateRange: { min: '', max: '' }
  });


  useEffect(() => {
    if (data.length > 0) {
      const apps = [...new Set(data.map(d => d.app))].sort();
      const adSources = [...new Set(data.map(d => d.adSource))].sort();
      const countries = [...new Set(data.map(d => d.country))].sort();
      const formats = [...new Set(data.map(d => d.format))].sort();

      const dates = data.map(d => d.date).sort();
      const minDate = dates[0];
      const maxDate = dates[dates.length - 1];

      setAvailableOptions({
        apps,
        adSources,
        countries,
        formats,
        dateRange: { min: minDate, max: maxDate }
      });
    }
  }, [data]);

  const handleDateRangeChange = (field: 'start' | 'end', value: string) => {
    setLocalFilters(prev => ({
      ...prev,
      dateRange: {
        ...prev.dateRange,
        [field]: value
      }
    }));
  };

  const handleMultiSelectChange = (field: 'apps' | 'adSources' | 'countries' | 'formats', values: string[]) => {
    setLocalFilters(prev => ({
      ...prev,
      [field]: values.length > 0 ? values : undefined
    }));
  };

  const applyFilters = () => {
    onFiltersChange(localFilters);
    onClose();
  };

  const resetFilters = () => {
    const emptyFilters = {};
    setLocalFilters(emptyFilters);
    onFiltersChange(emptyFilters);
  };



  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-6 mb-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Filter className="w-5 h-5 text-gray-600 mr-2" />
          <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={resetFilters}
            className="flex items-center px-3 py-1 text-sm text-gray-600 hover:text-gray-800 transition-colors"
          >
            <RotateCcw className="w-4 h-4 mr-1" />
            Reset
          </button>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Filter Presets */}
      <div className="mb-6">
        <FilterPresets
          currentFilters={localFilters}
          onApplyPreset={(presetFilters) => {
            setLocalFilters(presetFilters);
            onFiltersChange(presetFilters);
          }}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Date Range */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Calendar className="w-4 h-4 inline mr-1" />
            Date Range
          </label>
          <div className="space-y-2">
            <input
              type="date"
              value={localFilters.dateRange?.start || ''}
              onChange={(e) => handleDateRangeChange('start', e.target.value)}
              min={availableOptions.dateRange.min}
              max={availableOptions.dateRange.max}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Start date"
            />
            <input
              type="date"
              value={localFilters.dateRange?.end || ''}
              onChange={(e) => handleDateRangeChange('end', e.target.value)}
              min={availableOptions.dateRange.min}
              max={availableOptions.dateRange.max}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="End date"
            />
          </div>
        </div>

        {/* Apps */}
        <MultiSelectFilter
          label="Apps"
          options={availableOptions.apps}
          selectedValues={localFilters.apps || []}
          onChange={(values) => handleMultiSelectChange('apps', values)}
          placeholder="Search apps..."
        />

        {/* Ad Sources */}
        <MultiSelectFilter
          label="Ad Sources"
          options={availableOptions.adSources}
          selectedValues={localFilters.adSources || []}
          onChange={(values) => handleMultiSelectChange('adSources', values)}
          placeholder="Search ad sources..."
        />

        {/* Countries */}
        <MultiSelectFilter
          label="Countries"
          options={availableOptions.countries}
          selectedValues={localFilters.countries || []}
          onChange={(values) => handleMultiSelectChange('countries', values)}
          placeholder="Search countries..."
        />

        {/* Formats */}
        <MultiSelectFilter
          label="Formats"
          options={availableOptions.formats}
          selectedValues={localFilters.formats || []}
          onChange={(values) => handleMultiSelectChange('formats', values)}
          placeholder="Search formats..."
        />
      </div>

      {/* Quick Filters */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <h4 className="text-sm font-medium text-gray-700 mb-3">Quick Filters</h4>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => {
              const today = new Date();
              const lastWeek = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
              handleDateRangeChange('start', lastWeek.toISOString().split('T')[0]);
              handleDateRangeChange('end', today.toISOString().split('T')[0]);
            }}
            className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors"
          >
            Last 7 Days
          </button>
          <button
            onClick={() => {
              const today = new Date();
              const lastMonth = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);
              handleDateRangeChange('start', lastMonth.toISOString().split('T')[0]);
              handleDateRangeChange('end', today.toISOString().split('T')[0]);
            }}
            className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors"
          >
            Last 30 Days
          </button>
          <button
            onClick={() => {
              const today = new Date();
              const thisMonth = new Date(today.getFullYear(), today.getMonth(), 1);
              handleDateRangeChange('start', thisMonth.toISOString().split('T')[0]);
              handleDateRangeChange('end', today.toISOString().split('T')[0]);
            }}
            className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors"
          >
            This Month
          </button>
          <button
            onClick={() => {
              // Select top 5 countries by default
              const topCountries = availableOptions.countries.slice(0, 5);
              handleMultiSelectChange('countries', topCountries);
            }}
            className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors"
          >
            Top Countries
          </button>
          <button
            onClick={() => {
              // Select AdMob sources
              const admobSources = availableOptions.adSources.filter(source =>
                source.toLowerCase().includes('admob')
              );
              handleMultiSelectChange('adSources', admobSources);
            }}
            className="px-3 py-1 text-sm bg-green-100 text-green-700 rounded hover:bg-green-200 transition-colors"
          >
            AdMob Only
          </button>
        </div>
      </div>

      {/* Apply Button */}
      <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-200">
        <div className="text-sm text-gray-600">
          {Object.values(localFilters).some(v => Array.isArray(v) ? v.length > 0 : v) && (
            <span>Filters will be applied to {data.length.toLocaleString()} records</span>
          )}
        </div>
        <div className="flex space-x-3">
          <button
            onClick={() => {
              setLocalFilters({});
              onFiltersChange({});
            }}
            className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Clear All
          </button>
          <button
            onClick={applyFilters}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;

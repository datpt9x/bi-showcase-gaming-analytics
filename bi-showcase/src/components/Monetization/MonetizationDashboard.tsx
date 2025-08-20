import React, { useState, useEffect } from 'react';
import { Upload, Download, Filter, Calendar, TrendingUp, TrendingDown, Minus, Share2, FileText } from 'lucide-react';
import { monetizationDataService, MonetizationRecord, KPIMetrics, TrendData, BreakdownData } from '../../services/MonetizationDataService';
import KPICard from './KPICard';
import RevenueTrendChart from './RevenueTrendChart';
import PerformanceMetricsChart from './PerformanceMetricsChart';
import AdSourceBreakdown from './AdSourceBreakdown';
import CountryPerformance from './CountryPerformance';
import FormatAnalysis from './FormatAnalysis';
import FilterPanel from './FilterPanel';
import CSVImporter from './CSVImporter';
import AlertsInsights from './AlertsInsights';
import FilterStats from './FilterStats';
import ExportService from '../../services/ExportService';

interface Filters {
  dateRange?: { start: string; end: string };
  apps?: string[];
  adSources?: string[];
  countries?: string[];
  formats?: string[];
}

const MonetizationDashboard: React.FC = () => {
  const [data, setData] = useState<MonetizationRecord[]>([]);
  const [filteredData, setFilteredData] = useState<MonetizationRecord[]>([]);
  const [kpis, setKpis] = useState<KPIMetrics>({
    totalRevenue: 0,
    averageECPM: 0,
    totalActiveUsers: 0,
    overallFillRate: 0,
    averageCTR: 0,
    totalImpressions: 0,
    totalAdViewers: 0,
    averageARPU: 0,
    averageARPV: 0,
  });
  const [trendData, setTrendData] = useState<TrendData[]>([]);
  const [breakdownData, setBreakdownData] = useState<BreakdownData>({
    adSources: [],
    countries: [],
    formats: [],
    apps: [],
  });
  const [filters, setFilters] = useState<Filters>({});
  const [showFilters, setShowFilters] = useState(false);
  const [showImporter, setShowImporter] = useState(false);
  const [loading, setLoading] = useState(false);

  // Load sample data and URL filters on component mount
  useEffect(() => {
    loadSampleData();
    loadFiltersFromURL();
  }, []);

  // Save filters to URL when filters change
  useEffect(() => {
    if (Object.keys(filters).length > 0) {
      saveFiltersToURL();
    }
  }, [filters]);

  // Update filtered data when filters change
  useEffect(() => {
    if (data.length > 0) {
      const filtered = monetizationDataService.filterData(filters);
      setFilteredData(filtered);
      updateMetrics(filtered);
    }
  }, [data, filters]);

  const loadSampleData = async () => {
    try {
      setLoading(true);
      // Load the CSV file from the public directory or use the existing data
      const response = await fetch('/Launcher OS MO report - Data.csv');
      if (response.ok) {
        const csvContent = await response.text();
        const parsedData = monetizationDataService.parseCSV(csvContent);
        setData(parsedData);
      }
    } catch (error) {
      console.error('Error loading sample data:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadFiltersFromURL = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const urlFilters: Filters = {};

    // Load date range
    const startDate = urlParams.get('dateRange_start');
    const endDate = urlParams.get('dateRange_end');
    if (startDate && endDate) {
      urlFilters.dateRange = { start: startDate, end: endDate };
    }

    // Load array filters
    ['apps', 'adSources', 'countries', 'formats'].forEach(key => {
      const value = urlParams.get(key);
      if (value) {
        urlFilters[key as keyof Filters] = value.split(',') as any;
      }
    });

    if (Object.keys(urlFilters).length > 0) {
      setFilters(urlFilters);
    }
  };

  const saveFiltersToURL = () => {
    const params = new URLSearchParams();

    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        if (Array.isArray(value) && value.length > 0) {
          params.set(key, value.join(','));
        } else if (typeof value === 'object' && 'start' in value) {
          params.set(`${key}_start`, value.start);
          params.set(`${key}_end`, value.end);
        }
      }
    });

    const newUrl = `${window.location.pathname}${params.toString() ? '?' + params.toString() : ''}`;
    window.history.replaceState({}, '', newUrl);
  };

  const updateMetrics = (dataToAnalyze: MonetizationRecord[]) => {
    const newKpis = monetizationDataService.calculateKPIs(dataToAnalyze);
    const newTrendData = monetizationDataService.getTrendData(dataToAnalyze);
    const newBreakdownData = monetizationDataService.getBreakdownData(dataToAnalyze);

    setKpis(newKpis);
    setTrendData(newTrendData);
    setBreakdownData(newBreakdownData);
  };

  const handleDataImport = (importedData: MonetizationRecord[]) => {
    setData(importedData);
    setShowImporter(false);
  };

  const handleFiltersChange = (newFilters: Filters) => {
    setFilters(newFilters);
  };

  const exportToCSV = () => {
    ExportService.exportToCSV(filteredData, `monetization-data-${new Date().toISOString().split('T')[0]}.csv`);
  };

  const exportReport = () => {
    ExportService.exportReportAsText(kpis, trendData, breakdownData, filters, `monetization-report-${new Date().toISOString().split('T')[0]}.txt`);
  };

  const shareLink = async () => {
    try {
      const shareableLink = ExportService.generateShareableLink(filters);
      await ExportService.copyToClipboard(shareableLink);
      alert('Shareable link copied to clipboard!');
    } catch (error) {
      console.error('Failed to copy link:', error);
      alert('Failed to copy link to clipboard');
    }
  };

  const getTrendIcon = (current: number, previous: number) => {
    if (current > previous) return <TrendingUp className="w-4 h-4 text-green-500" />;
    if (current < previous) return <TrendingDown className="w-4 h-4 text-red-500" />;
    return <Minus className="w-4 h-4 text-gray-500" />;
  };

  const getTrendPercentage = (current: number, previous: number) => {
    if (previous === 0) return 0;
    return ((current - previous) / previous) * 100;
  };

  // Calculate period comparisons for KPI cards
  const getPeriodComparison = () => {
    if (trendData.length < 2) return { revenue: 0, ecpm: 0, users: 0, fillRate: 0, ctr: 0 };

    const latest = trendData[trendData.length - 1];
    const previous = trendData[trendData.length - 2];

    return {
      revenue: getTrendPercentage(latest.revenue, previous.revenue),
      ecpm: getTrendPercentage(latest.ecpm, previous.ecpm),
      users: getTrendPercentage(latest.activeUsers, previous.activeUsers),
      fillRate: getTrendPercentage(latest.fillRate, previous.fillRate),
      ctr: getTrendPercentage(latest.ctr, previous.ctr),
    };
  };

  const periodComparison = getPeriodComparison();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Monetization Dashboard</h1>
            <p className="text-gray-600 mt-1">
              Theo dõi hiệu quả kiếm tiền từ quảng cáo và các chỉ số quan trọng
            </p>
          </div>
          <div className="flex space-x-3">
            <button
              onClick={() => setShowImporter(true)}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Upload className="w-4 h-4 mr-2" />
              Import CSV
            </button>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </button>
            <div className="flex space-x-2">
              <button
                onClick={exportToCSV}
                className="flex items-center px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <Download className="w-4 h-4 mr-2" />
                CSV
              </button>
              <button
                onClick={exportReport}
                className="flex items-center px-3 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                <FileText className="w-4 h-4 mr-2" />
                Report
              </button>
              <button
                onClick={shareLink}
                className="flex items-center px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </button>
            </div>
          </div>
        </div>

        {/* Filter Panel */}
        {showFilters && (
          <FilterPanel
            data={data}
            filters={filters}
            onFiltersChange={handleFiltersChange}
            onClose={() => setShowFilters(false)}
          />
        )}

        {/* Filter Stats */}
        <FilterStats
          totalRecords={data.length}
          filteredRecords={filteredData.length}
          totalRevenue={kpis.totalRevenue}
          totalUsers={kpis.totalActiveUsers}
          totalImpressions={kpis.totalImpressions}
          hasActiveFilters={Object.values(filters).some(value => {
            if (Array.isArray(value)) return value.length > 0;
            if (typeof value === 'object' && value !== null) {
              return Object.values(value).some(v => v !== '' && v !== null && v !== undefined);
            }
            return value !== '' && value !== null && value !== undefined;
          })}
        />
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
        <KPICard
          title="Total Revenue"
          value={`$${kpis.totalRevenue.toLocaleString('en-US', { maximumFractionDigits: 0 })}`}
          change={periodComparison.revenue}
          icon={getTrendIcon(kpis.totalRevenue, 0)}
          color="blue"
        />
        <KPICard
          title="Average eCPM"
          value={`$${kpis.averageECPM.toFixed(2)}`}
          change={periodComparison.ecpm}
          icon={getTrendIcon(kpis.averageECPM, 0)}
          color="green"
        />
        <KPICard
          title="Active Users"
          value={kpis.totalActiveUsers.toLocaleString()}
          change={periodComparison.users}
          icon={getTrendIcon(kpis.totalActiveUsers, 0)}
          color="purple"
        />
        <KPICard
          title="Fill Rate"
          value={`${kpis.overallFillRate.toFixed(1)}%`}
          change={periodComparison.fillRate}
          icon={getTrendIcon(kpis.overallFillRate, 0)}
          color="orange"
        />
        <KPICard
          title="Average CTR"
          value={`${kpis.averageCTR.toFixed(2)}%`}
          change={periodComparison.ctr}
          icon={getTrendIcon(kpis.averageCTR, 0)}
          color="red"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue Trend</h3>
          <RevenueTrendChart data={trendData} />
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Metrics</h3>
          <PerformanceMetricsChart data={trendData} />
        </div>
      </div>

      {/* Breakdown Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Ad Sources</h3>
          <AdSourceBreakdown data={breakdownData.adSources.slice(0, 10)} />
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Country Performance</h3>
          <CountryPerformance data={breakdownData.countries.slice(0, 10)} />
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Format Analysis</h3>
          <FormatAnalysis data={breakdownData.formats} />
        </div>
      </div>

      {/* Alerts and Insights */}
      <div className="mb-8">
        <AlertsInsights
          data={filteredData}
          kpis={kpis}
          trendData={trendData}
          breakdownData={breakdownData}
        />
      </div>

      {/* Detailed Analysis Table */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">App Performance Matrix</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  App
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Revenue
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Users
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ARPU
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Trend
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {breakdownData.apps.map((app, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {app.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ${app.revenue.toLocaleString('en-US', { maximumFractionDigits: 0 })}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {app.users.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ${app.arpu.toFixed(4)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div className="flex items-center">
                      <div className="w-16 h-8 bg-gray-100 rounded">
                        {/* Mini sparkline would go here */}
                        <div className="text-xs text-center pt-1">
                          {app.trend.length > 1 ?
                            (app.trend[app.trend.length - 1] > app.trend[0] ? '↗' : '↘') :
                            '→'
                          }
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* CSV Importer Modal */}
      {showImporter && (
        <CSVImporter
          onImport={handleDataImport}
          onClose={() => setShowImporter(false)}
        />
      )}
    </div>
  );
};

export default MonetizationDashboard;

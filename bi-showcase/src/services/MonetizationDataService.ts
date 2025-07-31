export interface MonetizationRecord {
  week: string;
  date: string;
  month: number;
  app: string;
  adSource: string;
  country: string;
  format: string;
  estimatedEarnings: number;
  observedECPM: number;
  requests: number;
  matchRate: number;
  matchedRequests: number;
  showRate: number;
  impressions: number;
  ctr: number;
  clicks: number;
  adsARPV: number;
  adsARPU: number;
  adViewers: number;
  activeUsers: number;
  adViewerRate: number;
  impsPerAV: number;
  impsPerAU: number;
  bidRequests: number;
  bidsInAuctionPercent: number;
  bidsInAuction: number;
  winRate: number;
  winningBids: number;
}

export interface KPIMetrics {
  totalRevenue: number;
  averageECPM: number;
  totalActiveUsers: number;
  overallFillRate: number;
  averageCTR: number;
  totalImpressions: number;
  totalAdViewers: number;
  averageARPU: number;
  averageARPV: number;
}

export interface TrendData {
  date: string;
  revenue: number;
  ecpm: number;
  activeUsers: number;
  adViewers: number;
  impressions: number;
  fillRate: number;
  ctr: number;
}

export interface BreakdownData {
  adSources: Array<{
    name: string;
    revenue: number;
    ecpm: number;
    impressions: number;
    fillRate: number;
  }>;
  countries: Array<{
    name: string;
    revenue: number;
    ecpm: number;
    activeUsers: number;
    arpu: number;
  }>;
  formats: Array<{
    name: string;
    revenue: number;
    ctr: number;
    impressions: number;
    share: number;
  }>;
  apps: Array<{
    name: string;
    revenue: number;
    users: number;
    arpu: number;
    trend: number[];
  }>;
}

export class MonetizationDataService {
  private data: MonetizationRecord[] = [];

  parseCSV(csvContent: string): MonetizationRecord[] {
    const lines = csvContent.trim().split('\n');
    const headers = lines[0].split(',');
    
    const records: MonetizationRecord[] = [];
    
    for (let i = 1; i < lines.length; i++) {
      const values = this.parseCSVLine(lines[i]);
      if (values.length >= 28) {
        const record: MonetizationRecord = {
          week: values[0],
          date: values[1],
          month: parseInt(values[2]) || 0,
          app: values[3],
          adSource: values[4],
          country: values[5],
          format: values[6],
          estimatedEarnings: parseFloat(values[7]) || 0,
          observedECPM: parseFloat(values[8]) || 0,
          requests: parseInt(values[9]) || 0,
          matchRate: this.parsePercentage(values[10]),
          matchedRequests: parseInt(values[11]) || 0,
          showRate: this.parsePercentage(values[12]),
          impressions: parseInt(values[13]) || 0,
          ctr: this.parsePercentage(values[14]),
          clicks: parseInt(values[15]) || 0,
          adsARPV: parseFloat(values[16]) || 0,
          adsARPU: parseFloat(values[17]) || 0,
          adViewers: parseInt(values[18]) || 0,
          activeUsers: parseInt(values[19]) || 0,
          adViewerRate: this.parsePercentage(values[20]),
          impsPerAV: parseFloat(values[21]) || 0,
          impsPerAU: parseFloat(values[22]) || 0,
          bidRequests: parseInt(values[23]) || 0,
          bidsInAuctionPercent: this.parsePercentage(values[24]),
          bidsInAuction: parseInt(values[25]) || 0,
          winRate: this.parsePercentage(values[26]),
          winningBids: parseInt(values[27]) || 0,
        };
        records.push(record);
      }
    }
    
    this.data = records;
    return records;
  }

  private parseCSVLine(line: string): string[] {
    const result: string[] = [];
    let current = '';
    let inQuotes = false;
    
    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      
      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === ',' && !inQuotes) {
        result.push(current.trim());
        current = '';
      } else {
        current += char;
      }
    }
    
    result.push(current.trim());
    return result;
  }

  private parsePercentage(value: string): number {
    if (!value || value === '') return 0;
    const cleaned = value.replace('%', '');
    return parseFloat(cleaned) || 0;
  }

  calculateKPIs(data?: MonetizationRecord[]): KPIMetrics {
    const records = data || this.data;
    
    if (records.length === 0) {
      return {
        totalRevenue: 0,
        averageECPM: 0,
        totalActiveUsers: 0,
        overallFillRate: 0,
        averageCTR: 0,
        totalImpressions: 0,
        totalAdViewers: 0,
        averageARPU: 0,
        averageARPV: 0,
      };
    }

    const totalRevenue = records.reduce((sum, r) => sum + r.estimatedEarnings, 0);
    const totalImpressions = records.reduce((sum, r) => sum + r.impressions, 0);
    const totalRequests = records.reduce((sum, r) => sum + r.requests, 0);
    const totalMatchedRequests = records.reduce((sum, r) => sum + r.matchedRequests, 0);
    const totalClicks = records.reduce((sum, r) => sum + r.clicks, 0);
    
    // Get unique users by aggregating by date and app
    const usersByDateApp = new Map<string, number>();
    const viewersByDateApp = new Map<string, number>();
    
    records.forEach(r => {
      const key = `${r.date}-${r.app}`;
      usersByDateApp.set(key, Math.max(usersByDateApp.get(key) || 0, r.activeUsers));
      viewersByDateApp.set(key, Math.max(viewersByDateApp.get(key) || 0, r.adViewers));
    });
    
    const totalActiveUsers = Array.from(usersByDateApp.values()).reduce((sum, users) => sum + users, 0);
    const totalAdViewers = Array.from(viewersByDateApp.values()).reduce((sum, viewers) => sum + viewers, 0);

    return {
      totalRevenue,
      averageECPM: totalImpressions > 0 ? (totalRevenue / totalImpressions) * 1000 : 0,
      totalActiveUsers,
      overallFillRate: totalRequests > 0 ? (totalMatchedRequests / totalRequests) * 100 : 0,
      averageCTR: totalImpressions > 0 ? (totalClicks / totalImpressions) * 100 : 0,
      totalImpressions,
      totalAdViewers,
      averageARPU: totalActiveUsers > 0 ? totalRevenue / totalActiveUsers : 0,
      averageARPV: totalAdViewers > 0 ? totalRevenue / totalAdViewers : 0,
    };
  }

  getTrendData(data?: MonetizationRecord[]): TrendData[] {
    const records = data || this.data;
    const trendMap = new Map<string, {
      revenue: number;
      impressions: number;
      requests: number;
      matchedRequests: number;
      clicks: number;
      activeUsers: number;
      adViewers: number;
    }>();

    records.forEach(r => {
      const existing = trendMap.get(r.date) || {
        revenue: 0,
        impressions: 0,
        requests: 0,
        matchedRequests: 0,
        clicks: 0,
        activeUsers: 0,
        adViewers: 0,
      };

      trendMap.set(r.date, {
        revenue: existing.revenue + r.estimatedEarnings,
        impressions: existing.impressions + r.impressions,
        requests: existing.requests + r.requests,
        matchedRequests: existing.matchedRequests + r.matchedRequests,
        clicks: existing.clicks + r.clicks,
        activeUsers: Math.max(existing.activeUsers, r.activeUsers),
        adViewers: Math.max(existing.adViewers, r.adViewers),
      });
    });

    return Array.from(trendMap.entries())
      .map(([date, data]) => ({
        date,
        revenue: data.revenue,
        ecpm: data.impressions > 0 ? (data.revenue / data.impressions) * 1000 : 0,
        activeUsers: data.activeUsers,
        adViewers: data.adViewers,
        impressions: data.impressions,
        fillRate: data.requests > 0 ? (data.matchedRequests / data.requests) * 100 : 0,
        ctr: data.impressions > 0 ? (data.clicks / data.impressions) * 100 : 0,
      }))
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }

  getBreakdownData(data?: MonetizationRecord[]): BreakdownData {
    const records = data || this.data;
    
    // Ad Sources breakdown
    const adSourceMap = new Map<string, {
      revenue: number;
      impressions: number;
      requests: number;
      matchedRequests: number;
    }>();

    // Countries breakdown
    const countryMap = new Map<string, {
      revenue: number;
      impressions: number;
      activeUsers: number;
    }>();

    // Formats breakdown
    const formatMap = new Map<string, {
      revenue: number;
      impressions: number;
      clicks: number;
    }>();

    // Apps breakdown
    const appMap = new Map<string, {
      revenue: number;
      activeUsers: number;
      dailyRevenue: Map<string, number>;
    }>();

    records.forEach(r => {
      // Ad Sources
      const adSource = adSourceMap.get(r.adSource) || {
        revenue: 0,
        impressions: 0,
        requests: 0,
        matchedRequests: 0,
      };
      adSource.revenue += r.estimatedEarnings;
      adSource.impressions += r.impressions;
      adSource.requests += r.requests;
      adSource.matchedRequests += r.matchedRequests;
      adSourceMap.set(r.adSource, adSource);

      // Countries
      const country = countryMap.get(r.country) || {
        revenue: 0,
        impressions: 0,
        activeUsers: 0,
      };
      country.revenue += r.estimatedEarnings;
      country.impressions += r.impressions;
      country.activeUsers = Math.max(country.activeUsers, r.activeUsers);
      countryMap.set(r.country, country);

      // Formats
      const format = formatMap.get(r.format) || {
        revenue: 0,
        impressions: 0,
        clicks: 0,
      };
      format.revenue += r.estimatedEarnings;
      format.impressions += r.impressions;
      format.clicks += r.clicks;
      formatMap.set(r.format, format);

      // Apps
      const app = appMap.get(r.app) || {
        revenue: 0,
        activeUsers: 0,
        dailyRevenue: new Map<string, number>(),
      };
      app.revenue += r.estimatedEarnings;
      app.activeUsers = Math.max(app.activeUsers, r.activeUsers);
      app.dailyRevenue.set(r.date, (app.dailyRevenue.get(r.date) || 0) + r.estimatedEarnings);
      appMap.set(r.app, app);
    });

    const totalRevenue = records.reduce((sum, r) => sum + r.estimatedEarnings, 0);

    return {
      adSources: Array.from(adSourceMap.entries())
        .map(([name, data]) => ({
          name,
          revenue: data.revenue,
          ecpm: data.impressions > 0 ? (data.revenue / data.impressions) * 1000 : 0,
          impressions: data.impressions,
          fillRate: data.requests > 0 ? (data.matchedRequests / data.requests) * 100 : 0,
        }))
        .sort((a, b) => b.revenue - a.revenue),

      countries: Array.from(countryMap.entries())
        .map(([name, data]) => ({
          name,
          revenue: data.revenue,
          ecpm: data.impressions > 0 ? (data.revenue / data.impressions) * 1000 : 0,
          activeUsers: data.activeUsers,
          arpu: data.activeUsers > 0 ? data.revenue / data.activeUsers : 0,
        }))
        .sort((a, b) => b.revenue - a.revenue),

      formats: Array.from(formatMap.entries())
        .map(([name, data]) => ({
          name,
          revenue: data.revenue,
          ctr: data.impressions > 0 ? (data.clicks / data.impressions) * 100 : 0,
          impressions: data.impressions,
          share: totalRevenue > 0 ? (data.revenue / totalRevenue) * 100 : 0,
        }))
        .sort((a, b) => b.revenue - a.revenue),

      apps: Array.from(appMap.entries())
        .map(([name, data]) => ({
          name,
          revenue: data.revenue,
          users: data.activeUsers,
          arpu: data.activeUsers > 0 ? data.revenue / data.activeUsers : 0,
          trend: Array.from(data.dailyRevenue.values()),
        }))
        .sort((a, b) => b.revenue - a.revenue),
    };
  }

  filterData(filters: {
    dateRange?: { start: string; end: string };
    apps?: string[];
    adSources?: string[];
    countries?: string[];
    formats?: string[];
  }): MonetizationRecord[] {
    let filtered = [...this.data];

    if (filters.dateRange) {
      const startDate = new Date(filters.dateRange.start);
      const endDate = new Date(filters.dateRange.end);
      filtered = filtered.filter(r => {
        const recordDate = new Date(r.date);
        return recordDate >= startDate && recordDate <= endDate;
      });
    }

    if (filters.apps && filters.apps.length > 0) {
      filtered = filtered.filter(r => filters.apps!.includes(r.app));
    }

    if (filters.adSources && filters.adSources.length > 0) {
      filtered = filtered.filter(r => filters.adSources!.includes(r.adSource));
    }

    if (filters.countries && filters.countries.length > 0) {
      filtered = filtered.filter(r => filters.countries!.includes(r.country));
    }

    if (filters.formats && filters.formats.length > 0) {
      filtered = filtered.filter(r => filters.formats!.includes(r.format));
    }

    return filtered;
  }

  getUniqueValues(field: keyof MonetizationRecord): string[] {
    const values = new Set(this.data.map(r => String(r[field])));
    return Array.from(values).sort();
  }

  getData(): MonetizationRecord[] {
    return this.data;
  }
}

export const monetizationDataService = new MonetizationDataService();

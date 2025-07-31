import { MonetizationRecord, KPIMetrics, TrendData, BreakdownData } from './MonetizationDataService';

export class ExportService {
  static exportToCSV(data: MonetizationRecord[], filename: string = 'monetization-data.csv'): void {
    if (data.length === 0) {
      alert('No data to export');
      return;
    }

    const headers = [
      'Week', 'Date', 'Month', 'App', 'Ad Source', 'Country', 'Format',
      'Estimated Earnings (USD)', 'Observed eCPM (USD)', 'Requests',
      'Match Rate (%)', 'Matched Requests', 'Show Rate (%)', 'Impressions',
      'CTR (%)', 'Clicks', 'Ads ARPV (USD)', 'Ads ARPU (USD)',
      'Ad Viewers (AV)', 'Active Users (AU)', 'Ad Viewer Rate (%)',
      'Imps / AV', 'Imps / AU', 'Bid Requests', 'Bids in Auction (%)',
      'Bids in Auction', 'Win Rate (%)', 'Winning Bids'
    ];

    const csvContent = [
      headers.join(','),
      ...data.map(row => [
        `"${row.week}"`,
        `"${row.date}"`,
        row.month,
        `"${row.app}"`,
        `"${row.adSource}"`,
        `"${row.country}"`,
        `"${row.format}"`,
        row.estimatedEarnings,
        row.observedECPM,
        row.requests,
        `${row.matchRate}%`,
        row.matchedRequests,
        `${row.showRate}%`,
        row.impressions,
        `${row.ctr}%`,
        row.clicks,
        row.adsARPV,
        row.adsARPU,
        row.adViewers,
        row.activeUsers,
        `${row.adViewerRate}%`,
        row.impsPerAV,
        row.impsPerAU,
        row.bidRequests,
        `${row.bidsInAuctionPercent}%`,
        row.bidsInAuction,
        `${row.winRate}%`,
        row.winningBids
      ].join(','))
    ].join('\n');

    this.downloadFile(csvContent, filename, 'text/csv');
  }

  static exportKPIsToCSV(kpis: KPIMetrics, filename: string = 'kpi-metrics.csv'): void {
    const headers = [
      'Metric', 'Value', 'Unit'
    ];

    const rows = [
      ['Total Revenue', kpis.totalRevenue.toFixed(2), 'USD'],
      ['Average eCPM', kpis.averageECPM.toFixed(2), 'USD'],
      ['Total Active Users', kpis.totalActiveUsers.toString(), 'Users'],
      ['Overall Fill Rate', kpis.overallFillRate.toFixed(2), '%'],
      ['Average CTR', kpis.averageCTR.toFixed(2), '%'],
      ['Total Impressions', kpis.totalImpressions.toString(), 'Impressions'],
      ['Total Ad Viewers', kpis.totalAdViewers.toString(), 'Users'],
      ['Average ARPU', kpis.averageARPU.toFixed(4), 'USD'],
      ['Average ARPV', kpis.averageARPV.toFixed(4), 'USD']
    ];

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');

    this.downloadFile(csvContent, filename, 'text/csv');
  }

  static exportBreakdownToCSV(breakdownData: BreakdownData, filename: string = 'breakdown-analysis.csv'): void {
    // Ad Sources
    const adSourcesCSV = [
      'Ad Source Analysis',
      'Ad Source,Revenue (USD),eCPM (USD),Impressions,Fill Rate (%)',
      ...breakdownData.adSources.map(source => 
        `"${source.name}",${source.revenue.toFixed(2)},${source.ecpm.toFixed(2)},${source.impressions},${source.fillRate.toFixed(2)}`
      ),
      '',
      'Country Analysis',
      'Country,Revenue (USD),eCPM (USD),Active Users,ARPU (USD)',
      ...breakdownData.countries.map(country => 
        `"${country.name}",${country.revenue.toFixed(2)},${country.ecpm.toFixed(2)},${country.activeUsers},${country.arpu.toFixed(4)}`
      ),
      '',
      'Format Analysis',
      'Format,Revenue (USD),CTR (%),Impressions,Share (%)',
      ...breakdownData.formats.map(format => 
        `"${format.name}",${format.revenue.toFixed(2)},${format.ctr.toFixed(2)},${format.impressions},${format.share.toFixed(2)}`
      ),
      '',
      'App Analysis',
      'App,Revenue (USD),Users,ARPU (USD)',
      ...breakdownData.apps.map(app => 
        `"${app.name}",${app.revenue.toFixed(2)},${app.users},${app.arpu.toFixed(4)}`
      )
    ].join('\n');

    this.downloadFile(adSourcesCSV, filename, 'text/csv');
  }

  static generateDashboardReport(
    kpis: KPIMetrics,
    trendData: TrendData[],
    breakdownData: BreakdownData,
    filters: any
  ): string {
    const formatCurrency = (value: number) => {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }).format(value);
    };

    const formatNumber = (value: number) => {
      return new Intl.NumberFormat('en-US').format(value);
    };

    const reportDate = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    return `
MONETIZATION DASHBOARD REPORT
Generated on: ${reportDate}

=== EXECUTIVE SUMMARY ===
Total Revenue: ${formatCurrency(kpis.totalRevenue)}
Average eCPM: ${formatCurrency(kpis.averageECPM)}
Total Active Users: ${formatNumber(kpis.totalActiveUsers)}
Overall Fill Rate: ${kpis.overallFillRate.toFixed(2)}%
Average CTR: ${kpis.averageCTR.toFixed(2)}%
Total Impressions: ${formatNumber(kpis.totalImpressions)}
Average ARPU: ${formatCurrency(kpis.averageARPU)}

=== TOP PERFORMING AD SOURCES ===
${breakdownData.adSources.slice(0, 5).map((source, index) => 
  `${index + 1}. ${source.name}
     Revenue: ${formatCurrency(source.revenue)}
     eCPM: ${formatCurrency(source.ecpm)}
     Fill Rate: ${source.fillRate.toFixed(2)}%
     Impressions: ${formatNumber(source.impressions)}`
).join('\n\n')}

=== TOP COUNTRIES BY REVENUE ===
${breakdownData.countries.slice(0, 5).map((country, index) => 
  `${index + 1}. ${country.name}
     Revenue: ${formatCurrency(country.revenue)}
     ARPU: ${formatCurrency(country.arpu)}
     Active Users: ${formatNumber(country.activeUsers)}
     eCPM: ${formatCurrency(country.ecpm)}`
).join('\n\n')}

=== FORMAT PERFORMANCE ===
${breakdownData.formats.map((format, index) => 
  `${index + 1}. ${format.name}
     Revenue: ${formatCurrency(format.revenue)} (${format.share.toFixed(1)}% share)
     CTR: ${format.ctr.toFixed(2)}%
     Impressions: ${formatNumber(format.impressions)}`
).join('\n\n')}

=== RECENT TRENDS ===
${trendData.slice(-7).map(trend => 
  `${trend.date}: Revenue ${formatCurrency(trend.revenue)}, eCPM ${formatCurrency(trend.ecpm)}, Users ${formatNumber(trend.activeUsers)}`
).join('\n')}

=== APPLIED FILTERS ===
${Object.entries(filters).map(([key, value]) => {
  if (Array.isArray(value) && value.length > 0) {
    return `${key}: ${value.join(', ')}`;
  } else if (value && typeof value === 'object' && 'start' in value) {
    return `${key}: ${value.start} to ${value.end}`;
  }
  return null;
}).filter(Boolean).join('\n') || 'No filters applied'}

Report generated by BI Showcase Gaming Analytics Platform
    `;
  }

  static exportReportAsText(
    kpis: KPIMetrics,
    trendData: TrendData[],
    breakdownData: BreakdownData,
    filters: any,
    filename: string = 'monetization-report.txt'
  ): void {
    const report = this.generateDashboardReport(kpis, trendData, breakdownData, filters);
    this.downloadFile(report, filename, 'text/plain');
  }

  static generateShareableLink(filters: any): string {
    const baseUrl = window.location.origin + window.location.pathname;
    const params = new URLSearchParams();
    
    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        if (Array.isArray(value) && value.length > 0) {
          params.set(key, value.join(','));
        } else if (typeof value === 'object' && 'start' in value) {
          params.set(`${key}_start`, value.start);
          params.set(`${key}_end`, value.end);
        } else {
          params.set(key, String(value));
        }
      }
    });

    return `${baseUrl}?${params.toString()}`;
  }

  static copyToClipboard(text: string): Promise<void> {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(text);
    } else {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      
      return new Promise((resolve, reject) => {
        if (document.execCommand('copy')) {
          resolve();
        } else {
          reject(new Error('Copy command failed'));
        }
        document.body.removeChild(textArea);
      });
    }
  }

  private static downloadFile(content: string, filename: string, mimeType: string): void {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }
}

export default ExportService;

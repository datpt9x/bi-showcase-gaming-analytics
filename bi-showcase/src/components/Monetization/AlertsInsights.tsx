import React from 'react';
import { AlertTriangle, TrendingDown, TrendingUp, Lightbulb, Target, DollarSign, Users, Eye } from 'lucide-react';
import { MonetizationRecord, KPIMetrics, TrendData, BreakdownData } from '../../services/MonetizationDataService';

interface Alert {
  id: string;
  type: 'critical' | 'warning' | 'info';
  title: string;
  message: string;
  metric: string;
  value: number;
  threshold: number;
  icon: React.ReactNode;
}

interface Insight {
  id: string;
  type: 'opportunity' | 'issue' | 'recommendation';
  title: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
  action: string;
  icon: React.ReactNode;
}

interface AlertsInsightsProps {
  data: MonetizationRecord[];
  kpis: KPIMetrics;
  trendData: TrendData[];
  breakdownData: BreakdownData;
}

const AlertsInsights: React.FC<AlertsInsightsProps> = ({ data, kpis, trendData, breakdownData }) => {
  const generateAlerts = (): Alert[] => {
    const alerts: Alert[] = [];

    // Revenue decline alert
    if (trendData.length >= 2) {
      const latest = trendData[trendData.length - 1];
      const previous = trendData[trendData.length - 2];
      const revenueChange = ((latest.revenue - previous.revenue) / previous.revenue) * 100;

      if (revenueChange < -20) {
        alerts.push({
          id: 'revenue-decline',
          type: 'critical',
          title: 'Revenue Decline Alert',
          message: `Revenue dropped by ${Math.abs(revenueChange).toFixed(1)}% compared to previous period`,
          metric: 'Revenue Change',
          value: revenueChange,
          threshold: -20,
          icon: <TrendingDown className="w-5 h-5" />
        });
      }

      // eCPM decline alert
      const ecpmChange = ((latest.ecpm - previous.ecpm) / previous.ecpm) * 100;
      if (ecpmChange < -15) {
        alerts.push({
          id: 'ecpm-decline',
          type: 'warning',
          title: 'eCPM Performance Alert',
          message: `eCPM decreased by ${Math.abs(ecpmChange).toFixed(1)}% in recent period`,
          metric: 'eCPM Change',
          value: ecpmChange,
          threshold: -15,
          icon: <DollarSign className="w-5 h-5" />
        });
      }

      // Fill Rate alert
      if (latest.fillRate < 70) {
        alerts.push({
          id: 'fill-rate-low',
          type: 'warning',
          title: 'Low Fill Rate',
          message: `Fill rate is ${latest.fillRate.toFixed(1)}%, below optimal threshold`,
          metric: 'Fill Rate',
          value: latest.fillRate,
          threshold: 70,
          icon: <Target className="w-5 h-5" />
        });
      }

      // CTR alert
      if (latest.ctr < 2) {
        alerts.push({
          id: 'ctr-low',
          type: 'info',
          title: 'CTR Below Average',
          message: `Click-through rate is ${latest.ctr.toFixed(2)}%, consider creative optimization`,
          metric: 'CTR',
          value: latest.ctr,
          threshold: 2,
          icon: <Eye className="w-5 h-5" />
        });
      }
    }

    // Ad Source performance alerts
    const underperformingSources = breakdownData.adSources.filter(source =>
      source.fillRate < 50 && source.revenue > 0
    );

    if (underperformingSources.length > 0) {
      alerts.push({
        id: 'ad-source-performance',
        type: 'warning',
        title: 'Underperforming Ad Sources',
        message: `${underperformingSources.length} ad sources have fill rates below 50%`,
        metric: 'Ad Sources',
        value: underperformingSources.length,
        threshold: 0,
        icon: <AlertTriangle className="w-5 h-5" />
      });
    }

    return alerts;
  };

  const generateInsights = (): Insight[] => {
    const insights: Insight[] = [];

    // Top performing ad source opportunity
    const topAdSource = breakdownData.adSources[0];
    if (topAdSource && topAdSource.fillRate > 80 && topAdSource.ecpm > 3) {
      insights.push({
        id: 'top-ad-source',
        type: 'opportunity',
        title: 'High-Performing Ad Source',
        description: `${topAdSource.name} shows excellent performance with ${topAdSource.fillRate.toFixed(1)}% fill rate and $${topAdSource.ecpm.toFixed(2)} eCPM`,
        impact: 'high',
        action: 'Consider increasing traffic allocation to maximize revenue',
        icon: <TrendingUp className="w-5 h-5" />
      });
    }

    // Country expansion opportunity
    const highARPUCountries = breakdownData.countries.filter(country =>
      country.arpu > 0.01 && country.activeUsers < 50000
    );

    if (highARPUCountries.length > 0) {
      const topCountry = highARPUCountries[0];
      insights.push({
        id: 'country-expansion',
        type: 'opportunity',
        title: 'Market Expansion Opportunity',
        description: `${topCountry.name} shows high ARPU ($${topCountry.arpu.toFixed(4)}) but low user base`,
        impact: 'medium',
        action: 'Focus marketing efforts to grow user base in this high-value market',
        icon: <Users className="w-5 h-5" />
      });
    }

    // Format optimization
    const lowCTRFormats = breakdownData.formats.filter(format =>
      format.ctr < 2 && format.revenue > 1000
    );

    if (lowCTRFormats.length > 0) {
      const format = lowCTRFormats[0];
      insights.push({
        id: 'format-optimization',
        type: 'issue',
        title: 'Format Performance Issue',
        description: `${format.name} format has low CTR (${format.ctr.toFixed(2)}%) despite generating significant revenue`,
        impact: 'medium',
        action: 'Review creative assets and consider A/B testing new ad formats',
        icon: <Eye className="w-5 h-5" />
      });
    }

    // Revenue concentration risk
    const topSourceRevenue = breakdownData.adSources[0]?.revenue || 0;
    const totalRevenue = breakdownData.adSources.reduce((sum, source) => sum + source.revenue, 0);
    const concentration = totalRevenue > 0 ? (topSourceRevenue / totalRevenue) * 100 : 0;

    if (concentration > 60) {
      insights.push({
        id: 'revenue-concentration',
        type: 'issue',
        title: 'Revenue Concentration Risk',
        description: `${concentration.toFixed(1)}% of revenue comes from a single ad source`,
        impact: 'high',
        action: 'Diversify ad sources to reduce dependency and improve resilience',
        icon: <AlertTriangle className="w-5 h-5" />
      });
    }

    // Seasonal trend insight
    if (trendData.length >= 7) {
      const recentAvg = trendData.slice(-3).reduce((sum, d) => sum + d.revenue, 0) / 3;
      const previousAvg = trendData.slice(-7, -3).reduce((sum, d) => sum + d.revenue, 0) / 4;
      const trendChange = ((recentAvg - previousAvg) / previousAvg) * 100;

      if (Math.abs(trendChange) > 10) {
        insights.push({
          id: 'trend-analysis',
          type: 'recommendation',
          title: 'Revenue Trend Analysis',
          description: `Revenue shows ${trendChange > 0 ? 'positive' : 'negative'} trend of ${Math.abs(trendChange).toFixed(1)}%`,
          impact: 'medium',
          action: trendChange > 0 ?
            'Capitalize on positive momentum with increased ad inventory' :
            'Investigate causes and implement optimization strategies',
          icon: trendChange > 0 ? <TrendingUp className="w-5 h-5" /> : <TrendingDown className="w-5 h-5" />
        });
      }
    }

    return insights;
  };

  const alerts = generateAlerts();
  const insights = generateInsights();

  const getAlertColor = (type: Alert['type']) => {
    switch (type) {
      case 'critical': return 'bg-red-50 border-red-200 text-red-800';
      case 'warning': return 'bg-yellow-50 border-yellow-200 text-yellow-800';
      case 'info': return 'bg-blue-50 border-blue-200 text-blue-800';
      default: return 'bg-gray-50 border-gray-200 text-gray-800';
    }
  };

  const getInsightColor = (type: Insight['type']) => {
    switch (type) {
      case 'opportunity': return 'bg-green-50 border-green-200 text-green-800';
      case 'issue': return 'bg-red-50 border-red-200 text-red-800';
      case 'recommendation': return 'bg-purple-50 border-purple-200 text-purple-800';
      default: return 'bg-gray-50 border-gray-200 text-gray-800';
    }
  };

  const getImpactBadge = (impact: Insight['impact']) => {
    const colors = {
      high: 'bg-red-100 text-red-800',
      medium: 'bg-yellow-100 text-yellow-800',
      low: 'bg-green-100 text-green-800'
    };
    return colors[impact];
  };

  if (alerts.length === 0 && insights.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="text-center py-8">
          <Lightbulb className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">All Systems Normal</h3>
          <p className="text-gray-600">No alerts or insights to display at this time.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Alerts Section */}
      {alerts.length > 0 && (
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <AlertTriangle className="w-5 h-5 mr-2 text-red-500" />
            Active Alerts ({alerts.length})
          </h3>
          <div className="space-y-3">
            {alerts.map(alert => (
              <div key={alert.id} className={`p-4 rounded-lg border ${getAlertColor(alert.type)}`}>
                <div className="flex items-start">
                  <div className="flex-shrink-0 mr-3">
                    {alert.icon}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium mb-1">{alert.title}</h4>
                    <p className="text-sm mb-2">{alert.message}</p>
                    <div className="flex items-center text-xs">
                      <span className="font-medium">{alert.metric}:</span>
                      <span className="ml-1">
                        {alert.metric.includes('%') ?
                          `${alert.value.toFixed(1)}%` :
                          alert.value.toFixed(2)
                        }
                      </span>
                      <span className="ml-2 text-gray-600">
                        (Threshold: {alert.threshold}{alert.metric.includes('%') ? '%' : ''})
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Insights Section */}
      {insights.length > 0 && (
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Lightbulb className="w-5 h-5 mr-2 text-blue-500" />
            Insights & Recommendations ({insights.length})
          </h3>
          <div className="space-y-4">
            {insights.map(insight => (
              <div key={insight.id} className={`p-4 rounded-lg border ${getInsightColor(insight.type)}`}>
                <div className="flex items-start">
                  <div className="flex-shrink-0 mr-3">
                    {insight.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">{insight.title}</h4>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getImpactBadge(insight.impact)}`}>
                        {insight.impact.toUpperCase()} IMPACT
                      </span>
                    </div>
                    <p className="text-sm mb-3">{insight.description}</p>
                    <div className="bg-white bg-opacity-50 rounded p-3">
                      <p className="text-sm font-medium text-gray-900 mb-1">Recommended Action:</p>
                      <p className="text-sm">{insight.action}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AlertsInsights;

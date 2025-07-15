import { useState, useEffect, useCallback } from 'react';
import { dataSimulation, GameData, GameMetrics } from '../services/DataSimulation';

export interface UseGameDataReturn {
  games: GameData[];
  aggregatedMetrics: GameMetrics | null;
  isLoading: boolean;
  isSimulating: boolean;
  startSimulation: () => void;
  stopSimulation: () => void;
  refreshData: () => void;
  getGameById: (id: string) => GameData | undefined;
  getTimeSeriesData: (gameId?: string, metric?: string, days?: number) => any[];
  getChartData: (type: 'revenue' | 'retention' | 'geographic' | 'campaigns', gameId?: string) => any;
}

export const useGameData = (): UseGameDataReturn => {
  const [games, setGames] = useState<GameData[]>([]);
  const [aggregatedMetrics, setAggregatedMetrics] = useState<GameMetrics | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSimulating, setIsSimulating] = useState(false);

  // Initialize data
  useEffect(() => {
    const initialGames = dataSimulation.getGames();
    setGames(initialGames);
    setAggregatedMetrics(dataSimulation.getAggregatedMetrics());
    setIsLoading(false);

    // Subscribe to data updates
    const unsubscribe = dataSimulation.subscribe((updatedGames) => {
      setGames(updatedGames);
      setAggregatedMetrics(dataSimulation.getAggregatedMetrics());
    });

    return unsubscribe;
  }, []);

  const startSimulation = useCallback(() => {
    dataSimulation.startSimulation();
    setIsSimulating(true);
  }, []);

  const stopSimulation = useCallback(() => {
    dataSimulation.stopSimulation();
    setIsSimulating(false);
  }, []);

  const refreshData = useCallback(() => {
    setIsLoading(true);
    // Simulate data refresh delay
    setTimeout(() => {
      const refreshedGames = dataSimulation.getGames();
      setGames(refreshedGames);
      setAggregatedMetrics(dataSimulation.getAggregatedMetrics());
      setIsLoading(false);
    }, 500);
  }, []);

  const getGameById = useCallback((id: string) => {
    return dataSimulation.getGameById(id);
  }, []);

  const getTimeSeriesData = useCallback((gameId?: string, metric = 'revenue', days = 7) => {
    const targetGames = gameId ? [dataSimulation.getGameById(gameId)].filter(Boolean) : games;
    if (!targetGames.length) return [];

    const endDate = new Date();
    const startDate = new Date(endDate.getTime() - days * 24 * 60 * 60 * 1000);

    const timeSeriesData: any[] = [];

    // Generate data points for each day
    for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
      const dateStr = d.toISOString().split('T')[0];
      
      let totalValue = 0;
      targetGames.forEach(game => {
        if (!game) return;
        
        // Find metrics for this date (or closest)
        const dayMetrics = game.metrics.find(m => 
          m.timestamp.toISOString().split('T')[0] === dateStr
        ) || game.metrics[game.metrics.length - 1];

        switch (metric) {
          case 'revenue':
            totalValue += dayMetrics.revenue;
            break;
          case 'dau':
            totalValue += dayMetrics.dau;
            break;
          case 'arpu':
            totalValue += dayMetrics.arpu;
            break;
          case 'retention_d1':
            totalValue += dayMetrics.retention.d1;
            break;
          case 'retention_d7':
            totalValue += dayMetrics.retention.d7;
            break;
          case 'retention_d30':
            totalValue += dayMetrics.retention.d30;
            break;
          default:
            totalValue += dayMetrics.revenue;
        }
      });

      timeSeriesData.push({
        date: dateStr,
        value: gameId ? totalValue : totalValue / targetGames.length,
        label: d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
      });
    }

    return timeSeriesData;
  }, [games]);

  const getChartData = useCallback((type: 'revenue' | 'retention' | 'geographic' | 'campaigns', gameId?: string) => {
    const metrics = gameId 
      ? getGameById(gameId)?.metrics[getGameById(gameId)?.metrics.length - 1 || 0]
      : aggregatedMetrics;

    if (!metrics) return null;

    switch (type) {
      case 'revenue':
        return {
          labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          datasets: [{
            label: 'Revenue ($)',
            data: getTimeSeriesData(gameId, 'revenue', 7).map(d => d.value),
            borderColor: 'rgb(59, 130, 246)',
            backgroundColor: 'rgba(59, 130, 246, 0.1)',
            tension: 0.4,
            fill: true,
          }],
        };

      case 'retention':
        return {
          labels: ['Day 1', 'Day 7', 'Day 30'],
          datasets: [{
            label: 'Retention Rate (%)',
            data: [metrics.retention.d1, metrics.retention.d7, metrics.retention.d30],
            backgroundColor: [
              'rgba(59, 130, 246, 0.8)',
              'rgba(16, 185, 129, 0.8)',
              'rgba(245, 158, 11, 0.8)',
            ],
            borderWidth: 0,
          }],
        };

      case 'geographic':
        const geoEntries = Object.entries(metrics.geographic)
          .sort(([,a], [,b]) => b.revenue - a.revenue)
          .slice(0, 6);
        
        return {
          labels: geoEntries.map(([country]) => country),
          datasets: [{
            label: 'Revenue by Region',
            data: geoEntries.map(([, data]) => data.revenue),
            backgroundColor: [
              'rgba(59, 130, 246, 0.8)',
              'rgba(16, 185, 129, 0.8)',
              'rgba(245, 158, 11, 0.8)',
              'rgba(239, 68, 68, 0.8)',
              'rgba(139, 92, 246, 0.8)',
              'rgba(107, 114, 128, 0.8)',
            ],
          }],
        };

      case 'campaigns':
        const campaignEntries = Object.entries(metrics.campaigns)
          .sort(([,a], [,b]) => b.spend - a.spend);
        
        return {
          labels: campaignEntries.map(([channel]) => channel),
          datasets: [{
            label: 'Ad Spend ($)',
            data: campaignEntries.map(([, data]) => data.spend),
            backgroundColor: 'rgba(59, 130, 246, 0.8)',
          }],
        };

      default:
        return null;
    }
  }, [aggregatedMetrics, getGameById, getTimeSeriesData]);

  return {
    games,
    aggregatedMetrics,
    isLoading,
    isSimulating,
    startSimulation,
    stopSimulation,
    refreshData,
    getGameById,
    getTimeSeriesData,
    getChartData,
  };
};

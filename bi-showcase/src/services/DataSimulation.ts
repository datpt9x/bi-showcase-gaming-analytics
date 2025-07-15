// Gaming metrics data simulation service
export interface GameMetrics {
  timestamp: Date;
  dau: number;
  revenue: number;
  arpu: number;
  retention: {
    d1: number;
    d7: number;
    d30: number;
  };
  sessionMetrics: {
    averageLength: number;
    frequency: number;
  };
  monetization: {
    iapConversion: number;
    adRevenue: number;
    ltv: number;
  };
  technical: {
    crashRate: number;
    loadTime: number;
    fps: number;
  };
  geographic: {
    [country: string]: {
      users: number;
      revenue: number;
    };
  };
  campaigns: {
    [channel: string]: {
      spend: number;
      installs: number;
      cpi: number;
      roas: number;
    };
  };
}

export interface GameData {
  id: string;
  name: string;
  genre: 'hyper-casual' | 'casual' | 'mid-core' | 'hardcore';
  platform: 'ios' | 'android' | 'cross-platform';
  launchDate: Date;
  metrics: GameMetrics[];
}

class DataSimulationService {
  private games: GameData[] = [];
  private isSimulating = false;
  private simulationInterval: NodeJS.Timeout | null = null;
  private subscribers: ((data: GameData[]) => void)[] = [];

  constructor() {
    this.initializeGames();
  }

  private initializeGames() {
    const gameTemplates = [
      { id: 'game-a', name: 'Puzzle Quest', genre: 'casual' as const, platform: 'cross-platform' as const },
      { id: 'game-b', name: 'Racing Fever', genre: 'mid-core' as const, platform: 'cross-platform' as const },
      { id: 'game-c', name: 'Quick Match', genre: 'hyper-casual' as const, platform: 'android' as const },
      { id: 'game-d', name: 'Strategy Empire', genre: 'hardcore' as const, platform: 'ios' as const },
      { id: 'game-e', name: 'Color Pop', genre: 'hyper-casual' as const, platform: 'cross-platform' as const },
    ];

    this.games = gameTemplates.map(template => ({
      ...template,
      launchDate: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000), // Random date within last year
      metrics: this.generateHistoricalData(template.genre, 30) // 30 days of historical data
    }));
  }

  private generateHistoricalData(genre: string, days: number): GameMetrics[] {
    const metrics: GameMetrics[] = [];
    const baseMetrics = this.getBaseMetricsByGenre(genre);
    
    for (let i = days; i >= 0; i--) {
      const date = new Date(Date.now() - i * 24 * 60 * 60 * 1000);
      const dayOfWeek = date.getDay();
      const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
      
      // Apply weekend multipliers
      const weekendMultiplier = isWeekend ? 1.2 : 1.0;
      const seasonalVariation = 1 + 0.1 * Math.sin((date.getTime() / (1000 * 60 * 60 * 24)) * 2 * Math.PI / 365);
      
      metrics.push({
        timestamp: date,
        dau: Math.floor(baseMetrics.dau * weekendMultiplier * seasonalVariation * (0.9 + Math.random() * 0.2)),
        revenue: Math.floor(baseMetrics.revenue * weekendMultiplier * seasonalVariation * (0.8 + Math.random() * 0.4)),
        arpu: baseMetrics.arpu * (0.9 + Math.random() * 0.2),
        retention: {
          d1: baseMetrics.retention.d1 * (0.95 + Math.random() * 0.1),
          d7: baseMetrics.retention.d7 * (0.95 + Math.random() * 0.1),
          d30: baseMetrics.retention.d30 * (0.95 + Math.random() * 0.1),
        },
        sessionMetrics: {
          averageLength: baseMetrics.sessionMetrics.averageLength * (0.9 + Math.random() * 0.2),
          frequency: baseMetrics.sessionMetrics.frequency * (0.9 + Math.random() * 0.2),
        },
        monetization: {
          iapConversion: baseMetrics.monetization.iapConversion * (0.95 + Math.random() * 0.1),
          adRevenue: Math.floor(baseMetrics.monetization.adRevenue * weekendMultiplier * (0.8 + Math.random() * 0.4)),
          ltv: baseMetrics.monetization.ltv * (0.9 + Math.random() * 0.2),
        },
        technical: {
          crashRate: baseMetrics.technical.crashRate * (0.8 + Math.random() * 0.4),
          loadTime: baseMetrics.technical.loadTime * (0.9 + Math.random() * 0.2),
          fps: baseMetrics.technical.fps * (0.95 + Math.random() * 0.1),
          errorRate: baseMetrics.technical.errorRate * (0.7 + Math.random() * 0.6),
          bugResolutionTime: baseMetrics.technical.bugResolutionTime * (0.8 + Math.random() * 0.4),
          appStoreRating: baseMetrics.technical.appStoreRating * (0.98 + Math.random() * 0.04),
          serverUptime: baseMetrics.technical.serverUptime * (0.995 + Math.random() * 0.01),
          userReports: Math.floor(baseMetrics.technical.userReports * (0.5 + Math.random() * 1.0)),
        },
        growth: {
          userGrowthRate: baseMetrics.growth.userGrowthRate * (0.8 + Math.random() * 0.4),
          viralCoefficient: baseMetrics.growth.viralCoefficient * (0.9 + Math.random() * 0.2),
          socialShareRate: baseMetrics.growth.socialShareRate * (0.85 + Math.random() * 0.3),
          engagementScore: baseMetrics.growth.engagementScore * (0.95 + Math.random() * 0.1),
          featureAdoptionRate: baseMetrics.growth.featureAdoptionRate * (0.9 + Math.random() * 0.2),
          timeToFirstPurchase: baseMetrics.growth.timeToFirstPurchase * (0.8 + Math.random() * 0.4),
        },
        geographic: this.generateGeographicData(baseMetrics.dau, baseMetrics.revenue),
        campaigns: this.generateCampaignData(genre),
      });
    }
    
    return metrics;
  }

  private getBaseMetricsByGenre(genre: string) {
    const baseMetrics = {
      'hyper-casual': {
        dau: 50000,
        revenue: 2500,
        arpu: 0.05,
        retention: { d1: 25, d7: 8, d30: 2 },
        sessionMetrics: { averageLength: 2.5, frequency: 3.2 },
        monetization: { iapConversion: 0.5, adRevenue: 2000, ltv: 0.25 },
        technical: {
          crashRate: 0.15,
          loadTime: 1.8,
          fps: 58,
          errorRate: 0.8,
          bugResolutionTime: 2.3,
          appStoreRating: 4.6,
          serverUptime: 99.8,
          userReports: 12
        },
        growth: {
          userGrowthRate: 12.8,
          viralCoefficient: 1.35,
          socialShareRate: 8.5,
          engagementScore: 78.2,
          featureAdoptionRate: 65,
          timeToFirstPurchase: 3.2
        },
      },
      'casual': {
        dau: 25000,
        revenue: 15000,
        arpu: 0.60,
        retention: { d1: 35, d7: 15, d30: 6 },
        sessionMetrics: { averageLength: 6.5, frequency: 4.1 },
        monetization: { iapConversion: 2.5, adRevenue: 5000, ltv: 8.50 },
        technical: {
          crashRate: 0.12,
          loadTime: 2.2,
          fps: 55,
          errorRate: 1.2,
          bugResolutionTime: 2.8,
          appStoreRating: 4.4,
          serverUptime: 99.6,
          userReports: 18
        },
        growth: {
          userGrowthRate: 10.5,
          viralCoefficient: 1.15,
          socialShareRate: 6.8,
          engagementScore: 72.5,
          featureAdoptionRate: 58,
          timeToFirstPurchase: 4.1
        },
      },
      'mid-core': {
        dau: 15000,
        revenue: 35000,
        arpu: 2.33,
        retention: { d1: 45, d7: 25, d30: 12 },
        sessionMetrics: { averageLength: 12.5, frequency: 3.8 },
        monetization: { iapConversion: 4.2, adRevenue: 3000, ltv: 25.80 },
        technical: {
          crashRate: 0.08,
          loadTime: 3.1,
          fps: 52,
          errorRate: 0.6,
          bugResolutionTime: 1.8,
          appStoreRating: 4.7,
          serverUptime: 99.9,
          userReports: 8
        },
        growth: {
          userGrowthRate: 8.2,
          viralCoefficient: 0.95,
          socialShareRate: 4.5,
          engagementScore: 85.3,
          featureAdoptionRate: 72,
          timeToFirstPurchase: 2.8
        },
      },
      'hardcore': {
        dau: 8000,
        revenue: 45000,
        arpu: 5.63,
        retention: { d1: 55, d7: 35, d30: 18 },
        sessionMetrics: { averageLength: 25.2, frequency: 2.9 },
        monetization: { iapConversion: 8.5, adRevenue: 1000, ltv: 65.20 },
        technical: {
          crashRate: 0.05,
          loadTime: 4.2,
          fps: 48,
          errorRate: 0.3,
          bugResolutionTime: 1.2,
          appStoreRating: 4.8,
          serverUptime: 99.95,
          userReports: 5
        },
        growth: {
          userGrowthRate: 6.5,
          viralCoefficient: 0.75,
          socialShareRate: 3.2,
          engagementScore: 92.1,
          featureAdoptionRate: 85,
          timeToFirstPurchase: 1.8
        },
      },
    };

    return baseMetrics[genre as keyof typeof baseMetrics] || baseMetrics['casual'];
  }

  private generateGeographicData(totalUsers: number, totalRevenue: number) {
    const countries = ['US', 'China', 'Japan', 'Germany', 'UK', 'France', 'Canada', 'Australia', 'Brazil', 'India'];
    const distribution = [0.28, 0.22, 0.12, 0.08, 0.06, 0.05, 0.04, 0.03, 0.03, 0.09]; // Sums to 1.0
    
    const geographic: { [country: string]: { users: number; revenue: number } } = {};
    
    countries.forEach((country, index) => {
      const baseShare = distribution[index];
      const variation = 0.9 + Math.random() * 0.2;
      const userShare = baseShare * variation;
      const revenueMultiplier = country === 'US' || country === 'Japan' ? 1.5 : country === 'China' ? 0.7 : 1.0;
      
      geographic[country] = {
        users: Math.floor(totalUsers * userShare),
        revenue: Math.floor(totalRevenue * userShare * revenueMultiplier),
      };
    });
    
    return geographic;
  }

  private generateCampaignData(genre: string) {
    const channels = ['Facebook', 'Google', 'Unity', 'ironSource', 'TikTok', 'Snapchat'];
    const campaigns: { [channel: string]: { spend: number; installs: number; cpi: number; roas: number } } = {};
    
    const baseCPI = genre === 'hyper-casual' ? 0.25 : genre === 'casual' ? 1.20 : genre === 'mid-core' ? 3.50 : 8.00;
    
    channels.forEach(channel => {
      const channelMultiplier = {
        'Facebook': 1.0,
        'Google': 1.1,
        'Unity': 0.8,
        'ironSource': 0.9,
        'TikTok': 1.3,
        'Snapchat': 1.2,
      }[channel] || 1.0;
      
      const cpi = baseCPI * channelMultiplier * (0.8 + Math.random() * 0.4);
      const spend = Math.floor(1000 + Math.random() * 5000);
      const installs = Math.floor(spend / cpi);
      const roas = (2.5 + Math.random() * 2.0) * 100; // 250% - 450%
      
      campaigns[channel] = { spend, installs, cpi, roas };
    });
    
    return campaigns;
  }

  public startSimulation() {
    if (this.isSimulating) return;
    
    this.isSimulating = true;
    this.simulationInterval = setInterval(() => {
      this.updateMetrics();
      this.notifySubscribers();
    }, 2000); // Update every 2 seconds
  }

  public stopSimulation() {
    this.isSimulating = false;
    if (this.simulationInterval) {
      clearInterval(this.simulationInterval);
      this.simulationInterval = null;
    }
  }

  private updateMetrics() {
    this.games.forEach(game => {
      const latestMetrics = game.metrics[game.metrics.length - 1];
      const newMetrics = { ...latestMetrics };
      
      // Apply small random variations for real-time simulation
      newMetrics.timestamp = new Date();
      newMetrics.dau += Math.floor((Math.random() - 0.5) * 1000);
      newMetrics.revenue += Math.floor((Math.random() - 0.5) * 500);
      newMetrics.arpu = newMetrics.revenue / newMetrics.dau;

      // Update technical metrics
      if (newMetrics.technical) {
        newMetrics.technical.crashRate *= (0.95 + Math.random() * 0.1);
        newMetrics.technical.loadTime *= (0.98 + Math.random() * 0.04);
        newMetrics.technical.fps *= (0.99 + Math.random() * 0.02);
        if (newMetrics.technical.errorRate) {
          newMetrics.technical.errorRate *= (0.9 + Math.random() * 0.2);
        }
        if (newMetrics.technical.userReports) {
          newMetrics.technical.userReports += Math.floor((Math.random() - 0.5) * 3);
          newMetrics.technical.userReports = Math.max(0, newMetrics.technical.userReports);
        }
      }

      // Update growth metrics
      if (newMetrics.growth) {
        newMetrics.growth.userGrowthRate *= (0.98 + Math.random() * 0.04);
        newMetrics.growth.viralCoefficient *= (0.95 + Math.random() * 0.1);
        newMetrics.growth.socialShareRate *= (0.95 + Math.random() * 0.1);
        newMetrics.growth.engagementScore *= (0.99 + Math.random() * 0.02);
        newMetrics.growth.featureAdoptionRate *= (0.98 + Math.random() * 0.04);
        newMetrics.growth.timeToFirstPurchase *= (0.95 + Math.random() * 0.1);
      }
      
      // Keep only last 100 data points to prevent memory issues
      if (game.metrics.length > 100) {
        game.metrics.shift();
      }
      
      game.metrics.push(newMetrics);
    });
  }

  public subscribe(callback: (data: GameData[]) => void) {
    this.subscribers.push(callback);
    return () => {
      this.subscribers = this.subscribers.filter(sub => sub !== callback);
    };
  }

  private notifySubscribers() {
    this.subscribers.forEach(callback => callback([...this.games]));
  }

  public getGames(): GameData[] {
    return [...this.games];
  }

  public getGameById(id: string): GameData | undefined {
    return this.games.find(game => game.id === id);
  }

  public getAggregatedMetrics(): GameMetrics {
    const latestMetrics = this.games.map(game => game.metrics[game.metrics.length - 1]);
    
    return {
      timestamp: new Date(),
      dau: latestMetrics.reduce((sum, m) => sum + m.dau, 0),
      revenue: latestMetrics.reduce((sum, m) => sum + m.revenue, 0),
      arpu: latestMetrics.reduce((sum, m) => sum + m.arpu, 0) / latestMetrics.length,
      retention: {
        d1: latestMetrics.reduce((sum, m) => sum + m.retention.d1, 0) / latestMetrics.length,
        d7: latestMetrics.reduce((sum, m) => sum + m.retention.d7, 0) / latestMetrics.length,
        d30: latestMetrics.reduce((sum, m) => sum + m.retention.d30, 0) / latestMetrics.length,
      },
      sessionMetrics: {
        averageLength: latestMetrics.reduce((sum, m) => sum + m.sessionMetrics.averageLength, 0) / latestMetrics.length,
        frequency: latestMetrics.reduce((sum, m) => sum + m.sessionMetrics.frequency, 0) / latestMetrics.length,
      },
      monetization: {
        iapConversion: latestMetrics.reduce((sum, m) => sum + m.monetization.iapConversion, 0) / latestMetrics.length,
        adRevenue: latestMetrics.reduce((sum, m) => sum + m.monetization.adRevenue, 0),
        ltv: latestMetrics.reduce((sum, m) => sum + m.monetization.ltv, 0) / latestMetrics.length,
      },
      technical: {
        crashRate: latestMetrics.reduce((sum, m) => sum + m.technical.crashRate, 0) / latestMetrics.length,
        loadTime: latestMetrics.reduce((sum, m) => sum + m.technical.loadTime, 0) / latestMetrics.length,
        fps: latestMetrics.reduce((sum, m) => sum + m.technical.fps, 0) / latestMetrics.length,
      },
      geographic: this.aggregateGeographicData(latestMetrics),
      campaigns: this.aggregateCampaignData(latestMetrics),
    };
  }

  private aggregateGeographicData(metrics: GameMetrics[]) {
    const aggregated: { [country: string]: { users: number; revenue: number } } = {};
    
    metrics.forEach(metric => {
      Object.entries(metric.geographic).forEach(([country, data]) => {
        if (!aggregated[country]) {
          aggregated[country] = { users: 0, revenue: 0 };
        }
        aggregated[country].users += data.users;
        aggregated[country].revenue += data.revenue;
      });
    });
    
    return aggregated;
  }

  private aggregateCampaignData(metrics: GameMetrics[]) {
    const aggregated: { [channel: string]: { spend: number; installs: number; cpi: number; roas: number } } = {};
    
    metrics.forEach(metric => {
      Object.entries(metric.campaigns).forEach(([channel, data]) => {
        if (!aggregated[channel]) {
          aggregated[channel] = { spend: 0, installs: 0, cpi: 0, roas: 0 };
        }
        aggregated[channel].spend += data.spend;
        aggregated[channel].installs += data.installs;
      });
    });
    
    // Calculate averages
    Object.keys(aggregated).forEach(channel => {
      const data = aggregated[channel];
      data.cpi = data.spend / data.installs;
      data.roas = (Math.random() * 200 + 250); // Simplified ROAS calculation
    });
    
    return aggregated;
  }
}

// Singleton instance
export const dataSimulation = new DataSimulationService();

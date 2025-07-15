import React, { useState, useEffect } from 'react';
import { Smartphone, Tablet, Monitor, Wifi, Battery, Signal } from 'lucide-react';

interface DeviceInfo {
  width: number;
  height: number;
  deviceType: 'mobile' | 'tablet' | 'desktop';
  orientation: 'portrait' | 'landscape';
}

const MobileOptimizations: React.FC = () => {
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo>({
    width: 0,
    height: 0,
    deviceType: 'desktop',
    orientation: 'landscape'
  });
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [connectionType, setConnectionType] = useState<string>('unknown');

  useEffect(() => {
    const updateDeviceInfo = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      let deviceType: 'mobile' | 'tablet' | 'desktop' = 'desktop';
      if (width < 768) deviceType = 'mobile';
      else if (width < 1024) deviceType = 'tablet';
      
      const orientation = width > height ? 'landscape' : 'portrait';
      
      setDeviceInfo({ width, height, deviceType, orientation });
    };

    const handleOnlineStatus = () => setIsOnline(navigator.onLine);
    
    // Get connection info if available
    const connection = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection;
    if (connection) {
      setConnectionType(connection.effectiveType || 'unknown');
    }

    updateDeviceInfo();
    window.addEventListener('resize', updateDeviceInfo);
    window.addEventListener('online', handleOnlineStatus);
    window.addEventListener('offline', handleOnlineStatus);

    return () => {
      window.removeEventListener('resize', updateDeviceInfo);
      window.removeEventListener('online', handleOnlineStatus);
      window.removeEventListener('offline', handleOnlineStatus);
    };
  }, []);

  const getDeviceIcon = () => {
    switch (deviceInfo.deviceType) {
      case 'mobile': return <Smartphone className="h-4 w-4" />;
      case 'tablet': return <Tablet className="h-4 w-4" />;
      default: return <Monitor className="h-4 w-4" />;
    }
  };

  const getConnectionColor = () => {
    if (!isOnline) return 'text-red-400';
    switch (connectionType) {
      case '4g': return 'text-green-400';
      case '3g': return 'text-yellow-400';
      case '2g': return 'text-orange-400';
      default: return 'text-blue-400';
    }
  };

  // Mobile-specific optimizations
  const mobileOptimizations = {
    // Reduce chart complexity on mobile
    chartOptions: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: deviceInfo.deviceType !== 'mobile',
          labels: {
            color: 'white',
            font: {
              size: deviceInfo.deviceType === 'mobile' ? 10 : 12
            }
          },
        },
      },
      scales: {
        x: {
          ticks: {
            color: 'white',
            maxTicksLimit: deviceInfo.deviceType === 'mobile' ? 5 : 10,
            font: {
              size: deviceInfo.deviceType === 'mobile' ? 10 : 12
            }
          },
          grid: {
            color: 'rgba(255, 255, 255, 0.1)',
          },
        },
        y: {
          ticks: {
            color: 'white',
            maxTicksLimit: deviceInfo.deviceType === 'mobile' ? 5 : 8,
            font: {
              size: deviceInfo.deviceType === 'mobile' ? 10 : 12
            }
          },
          grid: {
            color: 'rgba(255, 255, 255, 0.1)',
          },
        },
      },
    },

    // Touch-friendly button sizes
    buttonClass: deviceInfo.deviceType === 'mobile' 
      ? 'px-6 py-4 text-base min-h-[48px]' 
      : 'px-4 py-2 text-sm',

    // Responsive grid classes
    gridClass: deviceInfo.deviceType === 'mobile'
      ? 'grid-cols-1'
      : deviceInfo.deviceType === 'tablet'
      ? 'grid-cols-2'
      : 'grid-cols-3',

    // Font sizes
    headingClass: deviceInfo.deviceType === 'mobile'
      ? 'text-2xl md:text-3xl'
      : 'text-3xl md:text-4xl',

    // Spacing
    sectionPadding: deviceInfo.deviceType === 'mobile'
      ? 'py-8 px-4'
      : 'py-12 px-6',
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Device Info Panel */}
      <div className="bg-gray-900/90 backdrop-blur-md rounded-lg p-3 border border-gray-700 text-xs text-white">
        <div className="flex items-center space-x-2 mb-2">
          {getDeviceIcon()}
          <span className="font-medium">
            {deviceInfo.deviceType} ({deviceInfo.width}×{deviceInfo.height})
          </span>
        </div>
        
        <div className="flex items-center space-x-2 mb-1">
          <Wifi className={`h-3 w-3 ${getConnectionColor()}`} />
          <span>{isOnline ? 'Online' : 'Offline'}</span>
          {connectionType !== 'unknown' && (
            <span className="text-gray-400">({connectionType})</span>
          )}
        </div>
        
        <div className="text-gray-400">
          {deviceInfo.orientation} • {mobileOptimizations.gridClass}
        </div>
      </div>
    </div>
  );
};

// Hook for mobile optimizations
export const useMobileOptimizations = () => {
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo>({
    width: 0,
    height: 0,
    deviceType: 'desktop',
    orientation: 'landscape'
  });

  useEffect(() => {
    const updateDeviceInfo = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      let deviceType: 'mobile' | 'tablet' | 'desktop' = 'desktop';
      if (width < 768) deviceType = 'mobile';
      else if (width < 1024) deviceType = 'tablet';
      
      const orientation = width > height ? 'landscape' : 'portrait';
      
      setDeviceInfo({ width, height, deviceType, orientation });
    };

    updateDeviceInfo();
    window.addEventListener('resize', updateDeviceInfo);

    return () => {
      window.removeEventListener('resize', updateDeviceInfo);
    };
  }, []);

  return {
    deviceInfo,
    isMobile: deviceInfo.deviceType === 'mobile',
    isTablet: deviceInfo.deviceType === 'tablet',
    isDesktop: deviceInfo.deviceType === 'desktop',
    
    // Optimized classes
    getGridClass: (mobile = 1, tablet = 2, desktop = 3) => {
      if (deviceInfo.deviceType === 'mobile') return `grid-cols-${mobile}`;
      if (deviceInfo.deviceType === 'tablet') return `grid-cols-${tablet}`;
      return `grid-cols-${desktop}`;
    },
    
    getButtonClass: () => deviceInfo.deviceType === 'mobile' 
      ? 'px-6 py-4 text-base min-h-[48px] touch-manipulation' 
      : 'px-4 py-2 text-sm',
    
    getTextClass: (mobileSize = 'text-sm', desktopSize = 'text-base') => 
      deviceInfo.deviceType === 'mobile' ? mobileSize : desktopSize,
    
    getSpacingClass: (mobileSpacing = 'p-4', desktopSpacing = 'p-6') =>
      deviceInfo.deviceType === 'mobile' ? mobileSpacing : desktopSpacing,

    // Chart optimizations
    getChartOptions: (baseOptions: any) => ({
      ...baseOptions,
      plugins: {
        ...baseOptions.plugins,
        legend: {
          ...baseOptions.plugins?.legend,
          display: deviceInfo.deviceType !== 'mobile',
          labels: {
            ...baseOptions.plugins?.legend?.labels,
            font: {
              size: deviceInfo.deviceType === 'mobile' ? 10 : 12
            }
          },
        },
      },
      scales: {
        ...baseOptions.scales,
        x: {
          ...baseOptions.scales?.x,
          ticks: {
            ...baseOptions.scales?.x?.ticks,
            maxTicksLimit: deviceInfo.deviceType === 'mobile' ? 5 : 10,
            font: {
              size: deviceInfo.deviceType === 'mobile' ? 10 : 12
            }
          },
        },
        y: {
          ...baseOptions.scales?.y,
          ticks: {
            ...baseOptions.scales?.y?.ticks,
            maxTicksLimit: deviceInfo.deviceType === 'mobile' ? 5 : 8,
            font: {
              size: deviceInfo.deviceType === 'mobile' ? 10 : 12
            }
          },
        },
      },
    }),
  };
};

export default MobileOptimizations;

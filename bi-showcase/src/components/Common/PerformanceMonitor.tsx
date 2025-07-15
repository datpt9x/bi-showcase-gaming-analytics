import React, { useState, useEffect } from 'react';
import { Activity, Clock, Zap, AlertTriangle } from 'lucide-react';

interface PerformanceMetrics {
  loadTime: number;
  renderTime: number;
  memoryUsage: number;
  fps: number;
  connectionType: string;
  isSlowConnection: boolean;
}

const PerformanceMonitor: React.FC = () => {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    loadTime: 0,
    renderTime: 0,
    memoryUsage: 0,
    fps: 0,
    connectionType: 'unknown',
    isSlowConnection: false
  });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Measure initial load time
    const loadTime = performance.now();
    
    // Get memory usage if available
    const memory = (performance as any).memory;
    const memoryUsage = memory ? memory.usedJSHeapSize / 1024 / 1024 : 0;

    // Get connection info
    const connection = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection;
    const connectionType = connection?.effectiveType || 'unknown';
    const isSlowConnection = connection?.effectiveType === '2g' || connection?.effectiveType === 'slow-2g';

    // Measure FPS
    let fps = 0;
    let frameCount = 0;
    let lastTime = performance.now();

    const measureFPS = () => {
      frameCount++;
      const currentTime = performance.now();
      
      if (currentTime - lastTime >= 1000) {
        fps = Math.round((frameCount * 1000) / (currentTime - lastTime));
        frameCount = 0;
        lastTime = currentTime;
        
        setMetrics(prev => ({ ...prev, fps }));
      }
      
      requestAnimationFrame(measureFPS);
    };

    requestAnimationFrame(measureFPS);

    // Update metrics
    setMetrics({
      loadTime: loadTime,
      renderTime: performance.now() - loadTime,
      memoryUsage: memoryUsage,
      fps: fps,
      connectionType: connectionType,
      isSlowConnection: isSlowConnection
    });

    // Performance observer for navigation timing
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          if (entry.entryType === 'navigation') {
            const navEntry = entry as PerformanceNavigationTiming;
            setMetrics(prev => ({
              ...prev,
              loadTime: navEntry.loadEventEnd - navEntry.navigationStart,
              renderTime: navEntry.domContentLoadedEventEnd - navEntry.navigationStart
            }));
          }
        });
      });

      observer.observe({ entryTypes: ['navigation'] });

      return () => observer.disconnect();
    }
  }, []);

  const getPerformanceStatus = () => {
    if (metrics.loadTime > 3000 || metrics.isSlowConnection || metrics.fps < 30) {
      return { status: 'poor', color: 'text-red-400', icon: <AlertTriangle className="h-4 w-4" /> };
    } else if (metrics.loadTime > 1500 || metrics.fps < 50) {
      return { status: 'fair', color: 'text-yellow-400', icon: <Clock className="h-4 w-4" /> };
    } else {
      return { status: 'good', color: 'text-green-400', icon: <Zap className="h-4 w-4" /> };
    }
  };

  const performanceStatus = getPerformanceStatus();

  if (!isVisible) {
    return (
      <button
        onClick={() => setIsVisible(true)}
        className="fixed bottom-4 left-4 z-50 bg-gray-900/90 backdrop-blur-md rounded-lg p-2 border border-gray-700 text-white hover:bg-gray-800 transition-colors"
        title="Show Performance Metrics"
      >
        <Activity className="h-4 w-4" />
      </button>
    );
  }

  return (
    <div className="fixed bottom-4 left-4 z-50 bg-gray-900/90 backdrop-blur-md rounded-lg p-4 border border-gray-700 text-white min-w-[280px]">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold flex items-center space-x-2">
          <Activity className="h-4 w-4" />
          <span>Performance</span>
        </h3>
        <button
          onClick={() => setIsVisible(false)}
          className="text-gray-400 hover:text-white transition-colors"
        >
          ×
        </button>
      </div>

      <div className="space-y-2 text-sm">
        <div className="flex justify-between items-center">
          <span className="text-gray-400">Status:</span>
          <div className={`flex items-center space-x-1 ${performanceStatus.color}`}>
            {performanceStatus.icon}
            <span className="capitalize">{performanceStatus.status}</span>
          </div>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-400">Load Time:</span>
          <span className={metrics.loadTime > 3000 ? 'text-red-400' : metrics.loadTime > 1500 ? 'text-yellow-400' : 'text-green-400'}>
            {metrics.loadTime.toFixed(0)}ms
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-400">Render Time:</span>
          <span className={metrics.renderTime > 1000 ? 'text-red-400' : metrics.renderTime > 500 ? 'text-yellow-400' : 'text-green-400'}>
            {metrics.renderTime.toFixed(0)}ms
          </span>
        </div>

        {metrics.memoryUsage > 0 && (
          <div className="flex justify-between">
            <span className="text-gray-400">Memory:</span>
            <span className={metrics.memoryUsage > 100 ? 'text-red-400' : metrics.memoryUsage > 50 ? 'text-yellow-400' : 'text-green-400'}>
              {metrics.memoryUsage.toFixed(1)}MB
            </span>
          </div>
        )}

        <div className="flex justify-between">
          <span className="text-gray-400">FPS:</span>
          <span className={metrics.fps < 30 ? 'text-red-400' : metrics.fps < 50 ? 'text-yellow-400' : 'text-green-400'}>
            {metrics.fps}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-400">Connection:</span>
          <span className={metrics.isSlowConnection ? 'text-red-400' : 'text-green-400'}>
            {metrics.connectionType}
          </span>
        </div>
      </div>

      {/* Performance Tips */}
      {performanceStatus.status === 'poor' && (
        <div className="mt-3 p-2 bg-red-900/20 border border-red-700/30 rounded text-xs">
          <p className="text-red-400 font-medium mb-1">Performance Tips:</p>
          <ul className="text-red-300 space-y-1">
            {metrics.loadTime > 3000 && <li>• Slow loading detected</li>}
            {metrics.isSlowConnection && <li>• Slow connection detected</li>}
            {metrics.fps < 30 && <li>• Low frame rate detected</li>}
            <li>• Consider reducing chart complexity</li>
            <li>• Enable data compression</li>
          </ul>
        </div>
      )}

      {/* Mobile Optimization Notice */}
      {window.innerWidth < 768 && (
        <div className="mt-3 p-2 bg-blue-900/20 border border-blue-700/30 rounded text-xs">
          <p className="text-blue-400 font-medium mb-1">Mobile Optimizations:</p>
          <ul className="text-blue-300 space-y-1">
            <li>• Touch-friendly interface active</li>
            <li>• Reduced chart complexity</li>
            <li>• Optimized for small screens</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default PerformanceMonitor;

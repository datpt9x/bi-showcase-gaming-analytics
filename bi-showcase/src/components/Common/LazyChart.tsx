import React, { Suspense, lazy, useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';

// Lazy load ECharts components
const LazyLine = lazy(() => import('../Charts/EChartsComponents').then(module => ({ default: module.LineChart })));
const LazyBar = lazy(() => import('../Charts/EChartsComponents').then(module => ({ default: module.BarChart })));
const LazyDoughnut = lazy(() => import('../Charts/EChartsComponents').then(module => ({ default: module.DoughnutChart })));
const LazyPie = lazy(() => import('../Charts/EChartsComponents').then(module => ({ default: module.PieChart })));
const LazyRadar = lazy(() => import('../Charts/EChartsComponents').then(module => ({ default: module.RadarChart })));

interface LazyChartProps {
  type: 'line' | 'bar' | 'doughnut' | 'pie' | 'radar';
  data: any;
  options?: any;
  className?: string;
  theme?: 'light' | 'dark';
}

const ChartSkeleton: React.FC<{ theme?: 'light' | 'dark' }> = ({ theme = 'light' }) => (
  <div className={`w-full h-full flex items-center justify-center rounded-lg ${
    theme === 'dark' ? 'bg-gray-800/50' : 'bg-gray-100'
  }`}>
    <div className="text-center">
      <Loader2 className={`h-8 w-8 animate-spin mx-auto mb-2 ${
        theme === 'dark' ? 'text-blue-400' : 'text-gray-400'
      }`} />
      <p className={`text-sm ${
        theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
      }`}>Loading chart...</p>
    </div>
  </div>
);

const LazyChart: React.FC<LazyChartProps> = ({ type, data, options, className = "", theme = 'light' }) => {
  const [isInView, setIsInView] = useState(false);
  const [chartRef, setChartRef] = useState<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!chartRef) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(chartRef);

    return () => observer.disconnect();
  }, [chartRef]);

  const renderChart = () => {
    if (!isInView) {
      return <ChartSkeleton theme={theme} />;
    }

    const chartProps = { data, options, className, theme };

    switch (type) {
      case 'line':
        return (
          <Suspense fallback={<ChartSkeleton theme={theme} />}>
            <LazyLine {...chartProps} />
          </Suspense>
        );
      case 'bar':
        return (
          <Suspense fallback={<ChartSkeleton theme={theme} />}>
            <LazyBar {...chartProps} />
          </Suspense>
        );
      case 'doughnut':
        return (
          <Suspense fallback={<ChartSkeleton theme={theme} />}>
            <LazyDoughnut {...chartProps} />
          </Suspense>
        );
      case 'pie':
        return (
          <Suspense fallback={<ChartSkeleton theme={theme} />}>
            <LazyPie {...chartProps} />
          </Suspense>
        );
      case 'radar':
        return (
          <Suspense fallback={<ChartSkeleton theme={theme} />}>
            <LazyRadar {...chartProps} />
          </Suspense>
        );
      default:
        return <ChartSkeleton theme={theme} />;
    }
  };

  return (
    <div ref={setChartRef} className={className}>
      {renderChart()}
    </div>
  );
};

export default LazyChart;

import React, { Suspense, lazy, useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';

// Lazy load chart components
const LazyLine = lazy(() => import('react-chartjs-2').then(module => ({ default: module.Line })));
const LazyBar = lazy(() => import('react-chartjs-2').then(module => ({ default: module.Bar })));
const LazyDoughnut = lazy(() => import('react-chartjs-2').then(module => ({ default: module.Doughnut })));
const LazyPie = lazy(() => import('react-chartjs-2').then(module => ({ default: module.Pie })));
const LazyRadar = lazy(() => import('react-chartjs-2').then(module => ({ default: module.Radar })));

interface LazyChartProps {
  type: 'line' | 'bar' | 'doughnut' | 'pie' | 'radar';
  data: any;
  options: any;
  className?: string;
}

const ChartSkeleton: React.FC = () => (
  <div className="w-full h-full flex items-center justify-center bg-gray-800/50 rounded-lg">
    <div className="text-center">
      <Loader2 className="h-8 w-8 text-blue-400 animate-spin mx-auto mb-2" />
      <p className="text-gray-400 text-sm">Loading chart...</p>
    </div>
  </div>
);

const LazyChart: React.FC<LazyChartProps> = ({ type, data, options, className = "" }) => {
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
      return <ChartSkeleton />;
    }

    const chartProps = { data, options };

    switch (type) {
      case 'line':
        return (
          <Suspense fallback={<ChartSkeleton />}>
            <LazyLine {...chartProps} />
          </Suspense>
        );
      case 'bar':
        return (
          <Suspense fallback={<ChartSkeleton />}>
            <LazyBar {...chartProps} />
          </Suspense>
        );
      case 'doughnut':
        return (
          <Suspense fallback={<ChartSkeleton />}>
            <LazyDoughnut {...chartProps} />
          </Suspense>
        );
      case 'pie':
        return (
          <Suspense fallback={<ChartSkeleton />}>
            <LazyPie {...chartProps} />
          </Suspense>
        );
      case 'radar':
        return (
          <Suspense fallback={<ChartSkeleton />}>
            <LazyRadar {...chartProps} />
          </Suspense>
        );
      default:
        return <ChartSkeleton />;
    }
  };

  return (
    <div ref={setChartRef} className={className}>
      {renderChart()}
    </div>
  );
};

export default LazyChart;

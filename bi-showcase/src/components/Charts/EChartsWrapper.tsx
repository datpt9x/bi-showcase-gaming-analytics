import React, { useMemo, useEffect, useRef } from 'react';
import ReactECharts from 'echarts-for-react';
import * as echarts from 'echarts';

// Common chart options and themes
const getBaseOptions = (isDark = false) => ({
  backgroundColor: 'transparent',
  textStyle: {
    color: isDark ? '#e5e7eb' : '#374151',
    fontFamily: 'Inter, system-ui, sans-serif',
  },
  grid: {
    left: '10%',
    right: '10%',
    bottom: '15%',
    top: '15%',
    containLabel: true,
  },
  tooltip: {
    trigger: 'axis',
    backgroundColor: isDark ? 'rgba(31, 41, 55, 0.95)' : 'rgba(255, 255, 255, 0.95)',
    borderColor: isDark ? '#4b5563' : '#d1d5db',
    borderWidth: 1,
    textStyle: {
      color: isDark ? '#e5e7eb' : '#374151',
    },
    axisPointer: {
      type: 'cross',
      crossStyle: {
        color: isDark ? '#6b7280' : '#9ca3af',
      },
    },
  },
  legend: {
    textStyle: {
      color: isDark ? '#e5e7eb' : '#374151',
    },
    top: 'top',
  },
});

// Color palettes
export const colorPalettes = {
  default: ['#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6', '#06b6d4', '#84cc16', '#f97316'],
  business: ['#1e40af', '#dc2626', '#059669', '#d97706', '#7c3aed', '#0891b2', '#65a30d', '#ea580c'],
  pastel: ['#93c5fd', '#fca5a5', '#86efac', '#fcd34d', '#c4b5fd', '#67e8f9', '#bef264', '#fdba74'],
  dark: ['#60a5fa', '#f87171', '#34d399', '#fbbf24', '#a78bfa', '#22d3ee', '#a3e635', '#fb923c'],
};

interface EChartsWrapperProps {
  option: any;
  style?: React.CSSProperties;
  className?: string;
  theme?: 'light' | 'dark';
  colorPalette?: keyof typeof colorPalettes;
  onChartReady?: (chart: echarts.ECharts) => void;
  loading?: boolean;
  loadingOption?: any;
}

const EChartsWrapper: React.FC<EChartsWrapperProps> = ({
  option,
  style = { height: '100%', width: '100%', minHeight: '300px' },
  className = '',
  theme = 'light',
  colorPalette = 'default',
  onChartReady,
  loading = false,
  loadingOption,
}) => {
  const chartRef = useRef<ReactECharts>(null);

  const mergedOption = useMemo(() => {
    const baseOptions = getBaseOptions(theme === 'dark');
    const colors = colorPalettes[colorPalette];

    return {
      ...baseOptions,
      color: colors,
      ...option,
    };
  }, [option, theme, colorPalette]);

  // Auto-resize chart when container size changes
  useEffect(() => {
    const handleResize = () => {
      if (chartRef.current) {
        const chartInstance = chartRef.current.getEchartsInstance();
        if (chartInstance) {
          setTimeout(() => chartInstance.resize(), 100);
        }
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const defaultLoadingOption = {
    text: 'Loading...',
    color: theme === 'dark' ? '#60a5fa' : '#3b82f6',
    textColor: theme === 'dark' ? '#e5e7eb' : '#374151',
    maskColor: theme === 'dark' ? 'rgba(0, 0, 0, 0.8)' : 'rgba(255, 255, 255, 0.8)',
    zlevel: 0,
  };

  return (
    <div className={`w-full h-full ${className}`} style={{ minHeight: '300px' }}>
      <ReactECharts
        ref={chartRef}
        option={mergedOption}
        style={style}
        className="w-full h-full"
        theme={theme}
        onChartReady={(chart) => {
          if (onChartReady) onChartReady(chart);
          // Auto-resize after chart is ready
          setTimeout(() => chart.resize(), 100);
        }}
        showLoading={loading}
        loadingOption={loadingOption || defaultLoadingOption}
        opts={{ renderer: 'canvas', resize: true }}
      />
    </div>
  );
};

export default EChartsWrapper;

import React from 'react';
import EChartsWrapper from './EChartsWrapper';
import { EChartsOption } from 'echarts';

// Line Chart Component
interface LineChartProps {
  data: {
    labels: string[];
    datasets: Array<{
      label: string;
      data: (number | null)[];
      borderColor?: string;
      backgroundColor?: string;
      tension?: number;
      fill?: boolean;
      borderDash?: number[];
      pointRadius?: number;
      pointHoverRadius?: number;
      showLine?: boolean;
    }>;
  };
  options?: any;
  className?: string;
  theme?: 'light' | 'dark';
}

export const LineChart: React.FC<LineChartProps> = ({ data, options = {}, className = '', theme }) => {
  const echartsOption: EChartsOption = {
    xAxis: {
      type: 'category',
      data: data.labels,
      axisLine: {
        lineStyle: {
          color: theme === 'dark' ? '#4b5563' : '#d1d5db',
        },
      },
      axisLabel: {
        color: theme === 'dark' ? '#9ca3af' : '#6b7280',
        fontSize: 12,
      },
    },
    yAxis: {
      type: 'value',
      axisLine: {
        lineStyle: {
          color: theme === 'dark' ? '#4b5563' : '#d1d5db',
        },
      },
      axisLabel: {
        color: theme === 'dark' ? '#9ca3af' : '#6b7280',
        fontSize: 12,
      },
      splitLine: {
        lineStyle: {
          color: theme === 'dark' ? '#374151' : '#f3f4f6',
        },
      },
    },
    series: data.datasets.map((dataset, index) => ({
      name: dataset.label,
      type: 'line',
      data: dataset.data,
      smooth: dataset.tension ? dataset.tension > 0 : false,
      connectNulls: false,
      lineStyle: {
        color: dataset.borderColor,
        width: 2,
        type: dataset.borderDash ? 'dashed' : 'solid',
      },
      itemStyle: {
        color: dataset.borderColor,
      },
      symbol: dataset.showLine === false ? 'none' : 'circle',
      symbolSize: dataset.pointRadius || 4,
      areaStyle: dataset.fill ? {
        color: dataset.backgroundColor || dataset.borderColor,
        opacity: 0.1,
      } : undefined,
    })),
    ...options,
  };

  return (
    <EChartsWrapper
      option={echartsOption}
      className={`dashboard-chart-container ${className}`}
      theme={theme}
    />
  );
};

// Bar Chart Component
interface BarChartProps {
  data: {
    labels: string[];
    datasets: Array<{
      label: string;
      data: number[];
      backgroundColor?: string | string[];
      borderColor?: string | string[];
    }>;
  };
  options?: any;
  className?: string;
  theme?: 'light' | 'dark';
}

export const BarChart: React.FC<BarChartProps> = ({ data, options = {}, className = '', theme }) => {
  const echartsOption: EChartsOption = {
    xAxis: {
      type: 'category',
      data: data.labels,
      axisLine: {
        lineStyle: {
          color: theme === 'dark' ? '#4b5563' : '#d1d5db',
        },
      },
      axisLabel: {
        color: theme === 'dark' ? '#9ca3af' : '#6b7280',
      },
    },
    yAxis: {
      type: 'value',
      axisLine: {
        lineStyle: {
          color: theme === 'dark' ? '#4b5563' : '#d1d5db',
        },
      },
      axisLabel: {
        color: theme === 'dark' ? '#9ca3af' : '#6b7280',
      },
      splitLine: {
        lineStyle: {
          color: theme === 'dark' ? '#374151' : '#f3f4f6',
        },
      },
    },
    series: data.datasets.map((dataset) => ({
      name: dataset.label,
      type: 'bar',
      data: dataset.data,
      itemStyle: {
        color: Array.isArray(dataset.backgroundColor)
          ? (params: any) => dataset.backgroundColor?.[params.dataIndex] || dataset.backgroundColor?.[0]
          : dataset.backgroundColor,
        borderColor: dataset.borderColor,
        borderWidth: dataset.borderColor ? 1 : 0,
      },
    })),
    ...options,
  };

  return (
    <EChartsWrapper
      option={echartsOption}
      className={`dashboard-chart-container ${className}`}
      theme={theme}
    />
  );
};

// Doughnut Chart Component
interface DoughnutChartProps {
  data: {
    labels: string[];
    datasets: Array<{
      data: number[];
      backgroundColor?: string[];
      borderColor?: string[];
    }>;
  };
  options?: any;
  className?: string;
  theme?: 'light' | 'dark';
}

export const DoughnutChart: React.FC<DoughnutChartProps> = ({ data, options = {}, className = '', theme }) => {
  const dataset = data.datasets[0];
  const seriesData = data.labels.map((label, index) => ({
    name: label,
    value: dataset.data[index],
    itemStyle: {
      color: dataset.backgroundColor?.[index],
      borderColor: dataset.borderColor?.[index],
      borderWidth: dataset.borderColor ? 1 : 0,
    },
  }));

  const echartsOption: EChartsOption = {
    series: [
      {
        type: 'pie',
        radius: ['40%', '70%'],
        center: ['50%', '50%'],
        data: seriesData,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
          },
        },
        label: {
          show: false,
        },
        labelLine: {
          show: false,
        },
      },
    ],
    ...options,
  };

  return (
    <EChartsWrapper
      option={echartsOption}
      className={`dashboard-chart-container ${className}`}
      theme={theme}
    />
  );
};

// Pie Chart Component
interface PieChartProps {
  data: {
    labels: string[];
    datasets: Array<{
      data: number[];
      backgroundColor?: string[];
      borderColor?: string[];
    }>;
  };
  options?: any;
  className?: string;
  theme?: 'light' | 'dark';
}

export const PieChart: React.FC<PieChartProps> = ({ data, options = {}, className = '', theme }) => {
  const dataset = data.datasets[0];
  const seriesData = data.labels.map((label, index) => ({
    name: label,
    value: dataset.data[index],
    itemStyle: {
      color: dataset.backgroundColor?.[index],
      borderColor: dataset.borderColor?.[index],
      borderWidth: dataset.borderColor ? 1 : 0,
    },
  }));

  const echartsOption: EChartsOption = {
    series: [
      {
        type: 'pie',
        radius: '70%',
        center: ['50%', '50%'],
        data: seriesData,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
          },
        },
      },
    ],
    ...options,
  };

  return (
    <EChartsWrapper
      option={echartsOption}
      className={`dashboard-chart-container ${className}`}
      theme={theme}
    />
  );
};

// Radar Chart Component
interface RadarChartProps {
  data: {
    labels: string[];
    datasets: Array<{
      label: string;
      data: number[];
      backgroundColor?: string;
      borderColor?: string;
    }>;
  };
  options?: any;
  className?: string;
  theme?: 'light' | 'dark';
}

export const RadarChart: React.FC<RadarChartProps> = ({ data, options = {}, className = '', theme }) => {
  const indicators = data.labels.map(label => ({ name: label, max: 100 }));

  const echartsOption: EChartsOption = {
    radar: {
      indicator: indicators,
      axisName: {
        color: theme === 'dark' ? '#9ca3af' : '#6b7280',
      },
      splitLine: {
        lineStyle: {
          color: theme === 'dark' ? '#374151' : '#f3f4f6',
        },
      },
      axisLine: {
        lineStyle: {
          color: theme === 'dark' ? '#4b5563' : '#d1d5db',
        },
      },
    },
    series: data.datasets.map((dataset) => ({
      type: 'radar',
      data: [
        {
          value: dataset.data,
          name: dataset.label,
          itemStyle: {
            color: dataset.borderColor,
          },
          areaStyle: {
            color: dataset.backgroundColor,
            opacity: 0.3,
          },
        },
      ],
    })),
    ...options,
  };

  return (
    <EChartsWrapper
      option={echartsOption}
      className={`dashboard-chart-container ${className}`}
      theme={theme}
    />
  );
};

// Scatter Chart Component
interface ScatterChartProps {
  data: {
    datasets: Array<{
      label: string;
      data: Array<{ x: number; y: number }>;
      backgroundColor?: string;
      borderColor?: string;
    }>;
  };
  options?: any;
  className?: string;
  theme?: 'light' | 'dark';
}

export const ScatterChart: React.FC<ScatterChartProps> = ({ data, options = {}, className = '', theme }) => {
  const echartsOption: EChartsOption = {
    xAxis: {
      type: 'value',
      axisLine: {
        lineStyle: {
          color: theme === 'dark' ? '#4b5563' : '#d1d5db',
        },
      },
      axisLabel: {
        color: theme === 'dark' ? '#9ca3af' : '#6b7280',
      },
      splitLine: {
        lineStyle: {
          color: theme === 'dark' ? '#374151' : '#f3f4f6',
        },
      },
    },
    yAxis: {
      type: 'value',
      axisLine: {
        lineStyle: {
          color: theme === 'dark' ? '#4b5563' : '#d1d5db',
        },
      },
      axisLabel: {
        color: theme === 'dark' ? '#9ca3af' : '#6b7280',
      },
      splitLine: {
        lineStyle: {
          color: theme === 'dark' ? '#374151' : '#f3f4f6',
        },
      },
    },
    series: data.datasets.map((dataset) => ({
      name: dataset.label,
      type: 'scatter',
      data: dataset.data.map(point => [point.x, point.y]),
      itemStyle: {
        color: dataset.backgroundColor || dataset.borderColor,
      },
    })),
    ...options,
  };

  return (
    <EChartsWrapper
      option={echartsOption}
      className={`dashboard-chart-container ${className}`}
      theme={theme}
    />
  );
};

// Sankey Chart Component
interface SankeyChartProps {
  data: {
    nodes: Array<{
      name: string;
      category?: string;
    }>;
    links: Array<{
      source: string;
      target: string;
      value: number;
    }>;
  };
  options?: any;
  className?: string;
  theme?: 'light' | 'dark';
}

export const SankeyChart: React.FC<SankeyChartProps> = ({ data, options = {}, className = '', theme }) => {
  const echartsOption: EChartsOption = {
    series: [
      {
        type: 'sankey',
        data: data.nodes,
        links: data.links,
        emphasis: {
          focus: 'adjacency',
        },
        lineStyle: {
          color: 'gradient',
          curveness: 0.5,
        },
        label: {
          color: theme === 'dark' ? '#e5e7eb' : '#374151',
          fontSize: 12,
        },
        itemStyle: {
          borderWidth: 1,
          borderColor: theme === 'dark' ? '#4b5563' : '#d1d5db',
        },
        levels: [
          {
            depth: 0,
            itemStyle: {
              color: theme === 'dark' ? '#60a5fa' : '#3b82f6',
            },
          },
          {
            depth: 1,
            itemStyle: {
              color: theme === 'dark' ? '#34d399' : '#10b981',
            },
          },
          {
            depth: 2,
            itemStyle: {
              color: theme === 'dark' ? '#fbbf24' : '#f59e0b',
            },
          },
          {
            depth: 3,
            itemStyle: {
              color: theme === 'dark' ? '#f87171' : '#ef4444',
            },
          },
        ],
      },
    ],
    ...options,
  };

  return (
    <EChartsWrapper
      option={echartsOption}
      className={`dashboard-chart-container ${className}`}
      theme={theme}
    />
  );
};

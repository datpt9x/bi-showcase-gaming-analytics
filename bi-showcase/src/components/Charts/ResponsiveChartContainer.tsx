import React, { useEffect, useRef, useState } from 'react';

interface ResponsiveChartContainerProps {
  children: React.ReactNode;
  className?: string;
  minHeight?: number;
  aspectRatio?: number;
}

const ResponsiveChartContainer: React.FC<ResponsiveChartContainerProps> = ({
  children,
  className = '',
  minHeight = 300,
  aspectRatio = 16 / 9,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const { offsetWidth } = containerRef.current;
        const calculatedHeight = Math.max(offsetWidth / aspectRatio, minHeight);
        setDimensions({
          width: offsetWidth,
          height: calculatedHeight,
        });
      }
    };

    // Initial calculation
    updateDimensions();

    // Add resize listener
    const resizeObserver = new ResizeObserver(updateDimensions);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    // Fallback for older browsers
    window.addEventListener('resize', updateDimensions);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', updateDimensions);
    };
  }, [aspectRatio, minHeight]);

  return (
    <div
      ref={containerRef}
      className={`w-full ${className}`}
      style={{
        height: dimensions.height || minHeight,
        minHeight: minHeight,
      }}
    >
      {children}
    </div>
  );
};

export default ResponsiveChartContainer;

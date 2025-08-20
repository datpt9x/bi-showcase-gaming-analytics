# Sankey Chart Integration

## Overview

Đã bổ sung thành công **Sankey Chart** vào dự án BI Showcase để hiển thị luồng dữ liệu và user journey analysis. Sankey chart đặc biệt hữu ích cho Product Analysts để theo dõi user flow và conversion funnel.

## Features Added

### 1. **SankeyChart Component**
- **Location:** `src/components/Charts/EChartsComponents.tsx`
- **Features:**
  - Responsive design với dark/light theme
  - Gradient flow lines với curveness tùy chỉnh
  - Multi-level color coding
  - Interactive hover effects
  - Focus on adjacency nodes

### 2. **Product Owner Dashboard Integration**
- **Location:** `src/components/Dashboards/ProductOwnerDashboard.tsx`
- **Use Case:** User Journey Flow Analysis
- **Data Visualization:**
  - Acquisition channels (App Store, Google Play, Social Media, Referrals)
  - User progression (Install → Tutorial → Levels → Purchase)
  - Conversion rates and drop-off points
  - Final outcomes (Active Player, Churned)

### 3. **Chart Gallery Integration**
- **Location:** `src/components/Charts/ChartGallery.tsx`
- **Category:** User Behavior
- **Demo:** Simplified user journey flow

## Data Structure

### Sankey Chart Data Format
```typescript
interface SankeyData {
  nodes: Array<{
    name: string;
    category?: string;
  }>;
  links: Array<{
    source: string;
    target: string;
    value: number;
  }>;
}
```

### Example Implementation
```typescript
const userJourneyData = {
  nodes: [
    { name: 'App Store' },
    { name: 'App Install' },
    { name: 'Tutorial Complete' },
    { name: 'First Purchase' },
    { name: 'Active Player' },
    { name: 'Churned' }
  ],
  links: [
    { source: 'App Store', target: 'App Install', value: 45000 },
    { source: 'App Install', target: 'Tutorial Complete', value: 38000 },
    { source: 'Tutorial Complete', target: 'First Purchase', value: 8000 },
    { source: 'First Purchase', target: 'Active Player', value: 7500 },
    { source: 'App Install', target: 'Churned', value: 7000 }
  ]
};
```

## Usage Examples

### Basic Usage
```tsx
import { SankeyChart } from '../Charts/EChartsComponents';

<SankeyChart 
  data={userJourneyData} 
  options={{}} 
  theme="dark" 
/>
```

### Advanced Usage with Custom Options
```tsx
<SankeyChart 
  data={userJourneyData} 
  options={{
    series: [{
      lineStyle: {
        curveness: 0.7,
        opacity: 0.8
      },
      label: {
        fontSize: 14
      }
    }]
  }} 
  theme="dark" 
  className="custom-sankey"
/>
```

## Key Insights from Demo Data

### User Journey Analysis (Product Owner Dashboard)
- **100K total installs** from various acquisition channels
- **68% tutorial completion rate** - opportunity for improvement
- **41% reach Level 10** among tutorial completers
- **12% purchase rate** among engaged users

### Conversion Bottlenecks Identified
1. **17% drop-off during tutorial** - consider simplifying onboarding
2. **Strong retention after Level 5** - focus on getting users there
3. **App Store provides highest quality users** (better conversion)
4. **Social referrals have highest engagement** but lowest volume

## Styling & Theming

### Color Levels
- **Level 0 (Sources):** Blue (`#60a5fa` dark, `#3b82f6` light)
- **Level 1 (Actions):** Green (`#34d399` dark, `#10b981` light)
- **Level 2 (Progress):** Yellow (`#fbbf24` dark, `#f59e0b` light)
- **Level 3 (Outcomes):** Red (`#f87171` dark, `#ef4444` light)

### Responsive Design
- Auto-adjusts to container size
- Maintains readability on mobile devices
- Consistent with other ECharts components

## Business Value

### For Product Analysts
- **Identify conversion bottlenecks** in user journey
- **Optimize onboarding flow** based on drop-off data
- **Track feature adoption** and user progression
- **Measure acquisition channel quality**

### For Stakeholders
- **Visual representation** of user flow
- **Clear conversion metrics** at each stage
- **Data-driven insights** for product decisions
- **ROI analysis** for marketing channels

## Technical Implementation

### ECharts Configuration
- Uses ECharts `sankey` series type
- Implements gradient flow lines
- Supports interactive focus on adjacency
- Responsive canvas rendering

### Performance Optimizations
- Lazy loading compatible
- Efficient data processing
- Minimal re-renders
- Canvas-based rendering for smooth interactions

## Future Enhancements

### Potential Improvements
1. **Dynamic data filtering** by time period
2. **Drill-down capabilities** for detailed analysis
3. **Export functionality** for reports
4. **Real-time data updates** with WebSocket integration
5. **Custom node shapes** for different user types
6. **Animation effects** for data transitions

### Additional Use Cases
- **Revenue flow analysis** (sources to outcomes)
- **Feature adoption tracking** (feature usage paths)
- **A/B test result visualization** (variant comparisons)
- **Customer support ticket flow** (issue resolution paths)

## Files Modified

### Core Components
- ✅ `src/components/Charts/EChartsComponents.tsx` - Added SankeyChart component
- ✅ `src/components/Dashboards/ProductOwnerDashboard.tsx` - Integrated user journey analysis
- ✅ `src/components/Charts/ChartGallery.tsx` - Added demo and category

### Documentation
- ✅ `SANKEY_CHART_INTEGRATION.md` - This documentation

## Testing

To test the Sankey chart implementation:
1. Run `npm run dev`
2. Navigate to **Product Owner Dashboard**
3. Scroll to **User Journey Flow Analysis** section
4. Navigate to **Chart Gallery**
5. Filter by **User Behavior** category
6. Interact with the Sankey chart (hover, click)

## Conclusion

Sankey chart integration provides powerful visualization capabilities for user journey analysis, making it easier for Product Analysts to identify optimization opportunities and track user behavior patterns. The implementation is fully responsive, themeable, and consistent with the existing ECharts ecosystem.

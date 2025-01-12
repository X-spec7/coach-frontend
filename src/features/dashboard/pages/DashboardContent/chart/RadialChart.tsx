'use client'

import ApexCharts from 'apexcharts'

export const radialApexChartOptions: ApexCharts.ApexOptions = {
  colors: ['#CEE9FF', '#FFF080', '#DAF17E'],
  chart: {
    height: '380px',
    width: '100%',
    type: 'radialBar' as 'radialBar',
    sparkline: {
      enabled: true,
    },
  },
  stroke: {
    lineCap: 'round' as 'round',
    colors: ['#EFEFF0']
  },
  plotOptions: {
    bar: {
      borderRadius: 100,
      borderRadiusApplication: 'end',
      borderRadiusWhenStacked: 'all',
      colors: {
        backgroundBarRadius: 100,
      }
    },
    bubble: {
      minBubbleRadius: 100,
      maxBubbleRadius: 100,
    },
    heatmap: {
      radius: 100,
    },
    treemap: {
      borderRadius: 100,
    },
    radialBar: {
      offsetX: 0,
      offsetY: 0,
      track: {
        background: '#E5E7EB',
        // strokeWidth: '8px',
        margin: 10,
      },
      dataLabels: {
        show: false,
      },
      hollow: {
        margin: 0,
        size: '12%',
      },
      
    },
  },
  states: {
    normal: {
      filter: {
        type: 'none',
      },
    },
    hover: {
      filter: {
        type: 'darken',
        value: 0.85,
      },
    },
    active: {
      allowMultipleDataPointsSelection: false,
      filter: {
        type: 'darken',
        value: 0.65,
      },
    },
  },
  grid: {
    show: false,
    strokeDashArray: 4,
    padding: {
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
    },
  },
  legend: {
    show: false,
    position: 'bottom',
    fontFamily: 'Inter, sans-serif',
  },
  tooltip: {
    enabled: false,
    x: {
      show: false,
    },
  },
  yaxis: {
    show: false,
    labels: {
      formatter: function (value: number): string {
        return value + '%';
      }
    }
  }
}

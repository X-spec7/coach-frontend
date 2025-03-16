'use client'
import React from 'react'
import ReactApexChart from 'react-apexcharts'

const SplineChart = () => {
  const [state, setState] = React.useState({
    series: [{
      data: [60, 22, 10, 28, 16, 21, 13, 30]
    }],
    options: {
      chart: {
        height: 350,
        type: 'area' as 'area',
        toolbar: {
          show: false
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'smooth' as 'smooth'
      },
      fill: {
        colors: ['#CEE9FF'],
      },
      xaxis: {
        categories: [
          '5 Aug',
          '6 Aug',
          '7 Aug',
          '8 Aug',
          '9 Aug',
          '10 Aug',
          '11 Aug',
          '12 Aug',
          '13 Aug',
        ],
        labels: {
          style: {
            colors: [],
            fontSize: '12px'
          }
        }
      },
      yaxis: {
        min: 0,
        max: 100,
        tickAmount: 4,
        categories: [
          '0 Hours',
          '1 Hours',
          '2 Hours',
          '3 Hours',
          '4 Hours',
        ],
        labels: {
          formatter: (value: number) => `${value} %`,
          style: {
            colors: [],
            fontSize: '12px',
          },
        },
      },
      tooltip: {
        x: {
          format: 'dd/MM/yy HH:mm'
        },
      },
    },
  })

  return (
    <div>
      <ReactApexChart options={state.options} series={state.series} type='area' height={300} />
    </div>
  )
}

export default SplineChart

'use client'

import React from 'react'
import ReactApexChart from 'react-apexcharts'

const WeightDataAreaChart = () => {
  const [state, setState] = React.useState({

    series: [{
      name: 'weight',
      data: [96, 85, 85, 75, 80, 70]
    }],
    options: {
      chart: {
        height: 350,
        type: 'area' as 'area',
        zoom: {
          enabled: false
        },
        toolbar: {
          show: false
        }
      },
      colors: ['#CEE9FF'],
      dataLabels: {
        enabled: false
      },
      markers: {
        size: 5,
        hover: {
          size: 9
        }
      },
      yaxis: {
        show: false
      },
      tooltip: {
        enabled: true,
        // enabledOnSeries: [],
      },
      stroke: {
        curve: 'smooth' as 'smooth'
      },
      xaxis: {
        categories: [
          'Mar',
          'Apr',
          'May',
          'Jun',
          'Jul',
          'Aug',
        ],
        labels: {
          style: {
            colors: [],
            fontSize: '12px'
          }
        }
      },
    },


  })



  return (
    <div className='w-full'>
      <ReactApexChart options={state.options} series={state.series} type="area" height={350} />
    </div>
  )
}

export default WeightDataAreaChart

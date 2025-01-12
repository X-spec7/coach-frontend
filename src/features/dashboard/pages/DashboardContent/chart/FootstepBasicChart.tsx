'use client'

import { useState } from 'react'

import ReactApexChart from 'react-apexcharts'

const FootstepBasicChart = () => {

  const [state, setState] = useState({
      series: [{
          name: 'Desktops',
          data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
      }],
      options: {
        chart: {
          height: 110,
          type: 'line' as 'line',
          zoom: {
            enabled: false
          },
          toolbar: {
            show: false,
          }
        },
        markers: {
          size: 0,
          colors: ['#fff'],
          strokeColors: '#DAF17E',
          strokeWidth: 3,
          hover: {
            size: 5,
            sizeOffset: 3
          }
        },
        dataLabels: {
          enabled: false
        },
        tooltip: {
          enabled: false,
          // enabledOnSeries: [],
        },
        stroke: {
          curve: 'smooth' as 'smooth',
          width: 3,
          colors: ['#DAF17E']
        },
        grid: {
          column: {
            colors: ['transparent'],
            opacity: 0.5
          },
        },
        yaxis: {
          show: false
        },
        xaxis: {
          categories: ['Jan', '8', '9', '10', '11', '12', '13'],
          labels: {
            show: true,
            style: {
              colors: ['#BCBEC3'],
              fontSize: '12px'
            }
          },
          tickPlacement: 'on',
        }
      },
  })

  

  return (
    <div>
      <div className='w-full'>
        <ReactApexChart options={state.options} series={state.series} type='line' height={110} />
      </div>
    </div>
  )
}

export default FootstepBasicChart

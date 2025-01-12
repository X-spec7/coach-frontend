'use client'

import { useState } from 'react'
import ReactApexChart from 'react-apexcharts'

const RadialProgressBar = () => {
  const [state, setState] = useState({
      series: [75],
      options: {
        chart: {
          height: 350,
          type: 'radialBar' as 'radialBar',
        },
        stroke: {
          lineCap: 'round' as 'round',
          colors: ['#FFFCFB']
        },
        states: {
          hover: {
            filter: {
              type: 'none'
            }
          },
          active: {
            filter: {
              type: 'none'
            }
          }
        },
        colors: ['#FFFCFB'],
        plotOptions: {
          radialBar: {
            inverseOrder: true,
            hollow: {
              size: '70%',
            },
            track: {
              background: '#E3D46B',
            },
            total: {
              show: false,
            },
            dataLabels: {
              name: {
                show: false
              },
              value: {
                show: false,
              }
            }
          },
        },
        legend: {
          show: false
        },
        labels: ['Cricket'],
      },
  })

  return (
    <div>
      <div id='chart'>
          <ReactApexChart options={state.options} series={state.series} type='radialBar' height={450} />
        </div>
    </div>
  )
}

export default RadialProgressBar

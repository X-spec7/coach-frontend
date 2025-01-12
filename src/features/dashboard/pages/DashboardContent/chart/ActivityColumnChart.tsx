'use client'

import React, { useState } from 'react'
import ReactApexChart from 'react-apexcharts'

const ActivityColumnChart = () => {

  const [chartState, setChartState] = useState(
    {
      series: [{
        data: [60, 22, 10, 28, 16, 21, 13, 30]
      }],
      options: {
        chart: {
          height: 350,
          type: 'bar' as 'bar',
          events: {
            click: function(chart: any, w: any, e: MouseEvent) {
              console.log(chart, w, e)
            },
          },
          toolbar: {
            show: false
          }
        },
        tooltip: {
          x: {
            show: false
          }
        },
        fill: {
          colors: ['#CEE9FF'],
        },
        plotOptions: {
          bar: {
            columnWidth: '45%',
            distributed: true,
            borderRadius: 10,
            borderRadiusApplication: 'end' as 'end',
          },
        },
        dataLabels: {
          enabled: false
        },
        legend: {
          show: false
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
            '0 %',
            '25 %',
            '50 %',
            '75 %',
            '100 %',
          ],
          labels: {
            formatter: (value: number) => `${value} %`,
            style: {
              colors: [],
              fontSize: '12px',
            },
          },
        },
      },
    }
  )
  return (
    <div className='w-full apexcharts-bar-area'>
      <ReactApexChart
        options={chartState.options}
        series={chartState.series}
        type="bar"
        height={205}
      />
    </div>
  )
}

export default ActivityColumnChart

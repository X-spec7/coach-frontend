'use client'

import React, { useState } from 'react'
import ReactApexChart from 'react-apexcharts'

const CaloriesChart = () => {

  const [chartState, setChartState] = useState(
    {
      series: [
        {
          name: 'Team B',
          color: '#CEE9FF',
          data: [45, 55, 65, 70, 65, 45, 55],
        },
        {
          name: 'Team A',
          color: '#EFEFF0',
          data: [20, 25, 30, 17.5, 7.5, 25, 20],
        },
      ],
      options: {
        chart: {
          height: 350,
          type: 'bar' as 'bar',
          stacked: true,
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
        plotOptions: {
          bar: {
            columnWidth: '45%',
            distributed: false,
            borderRadius: 10,
            borderRadiusApplication: 'end' as 'end',
            borderRadiusWhenStacked: 'last' as 'last',
          },
        },
        dataLabels: {
          enabled: false
        },
        legend: {
          show: false
        },
        fill: {
          opacity: 1,
        },
        xaxis: {
          categories: [
            'Sun',
            'Mon',
            'Tue',
            'Wed',
            'Thu',
            'Fri',
            'Sat',
          ],
          labels: {
            style: {
              colors: [],
              fontSize: '12px'
            }
          }
        },
        yaxis: [
          {
            min: 0,
            max: 100,
            tickAmount: 4,
            categories: [
              '0',
              '500',
              '1000',
              '1500',
              '2000',
            ],
            labels: {
              formatter: (value: number) => `${value * 20}`,
              style: {
                colors: [],
                fontSize: '12px',
              },
            },
          },
        ]
      },
    }
  )
  return (
    <div className='w-full apexcharts-bar-area'>
      <ReactApexChart
        options={chartState.options}
        type='bar'
        series={chartState.series}
        height={280}
      />
    </div>
  )
}

export default CaloriesChart

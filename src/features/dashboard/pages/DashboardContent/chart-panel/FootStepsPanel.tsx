import React from 'react'

import { FootPrintSvg } from '@/shared/components/Svg'
import { FootstepChart } from '../chart'

const todayFootprintCount = 1050;
const yesterdayFootprintCount = 978;

const FootStepsPanel = () => {
  return (
    <div className='flex flex-col p-4 xl:p-6'>
      <div className='flex justify-start items-center gap-2'>
        <FootPrintSvg width='16' height='16' color='#212738' />
        <h3 className='text-gray-30 text-sm font-medium'>Steps</h3>
      </div>

      <FootstepChart />

      <div className='flex items-end justify-start gap-0.5 mb-2'>
        <p className='text-gray-30 text-xl font-bold'>{todayFootprintCount.toLocaleString()}</p>
        <p className='text-gray-30 text-sm font-medium'>steps</p>
      </div>

      <div className='flex justify-start items-center gap-1.5 text-gray-20 text-xxs2'>
        <label>Yesterday:</label>
        <p className='font-medium'>{yesterdayFootprintCount.toLocaleString()} steps</p>
      </div>
    </div>
  )
}

export default FootStepsPanel

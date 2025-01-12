import React from 'react'

import { ActivityColumnChart } from '../chart'

const ActivityPanel = () => {
  return (
    <div className='flex flex-col gap-4 w-full p-4 pt-8'>
      <div className='flex justify-start items-center'>
        <h3 className='text-black font-medium text-base px-4'>Activity</h3>
        {/* <div className='flex justify-center items-center w-38 h-7.5 bg-gray-bg rounded-xl'>Date Picker</div> */}
      </div>

      <ActivityColumnChart />
    </div>
  )
}

export default ActivityPanel

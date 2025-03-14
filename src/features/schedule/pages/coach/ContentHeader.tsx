import React from 'react'
import { SearchField } from '@/shared/components'
import { TimePeriodSelectButton } from '@/shared/components/Button'

const dropdownOptions = [
  'This Week',
  'This Month'
]

const ContentHeader = () => {
  return (
    <div className='flex justify-between items-center w-full p-4'>
      <div className='flex justify-start items-center gap-12'>
        <div className='flex justify-start items-center gap-4'>
          <div className='flex flex-col items-start justify-center text-gray-20 text-xxs'>
            <p>Booked</p>
            <p>Hours</p>
          </div>
          <div className='flex justify-start items-baseline gap-1 py-1 px-3 bg-gray-bg rounded-20'>
            <p className='text-black font-medium text-xl'>120</p>
            <p className='text-gray-20 text-xs'>Hours</p>
            <p className='text-black font-medium text-xl'>30</p>
            <p className='text-gray-20 text-xs'>Minutes</p>
          </div>
        </div>

        <div className='flex justify-start items-center gap-4 text-xs text-gray-20'>
          <div className='flex flex-col items-start justify-center'>
            <p>Booked</p>
            <p>Programs</p>
          </div>
          <div className='flex justify-start items-baseline gap-1 py-1 px-3 bg-gray-bg rounded-20'>
            <p className='text-black font-medium text-xl'>14</p>
            <p className=''>Schedules</p>
          </div>
        </div>
      </div>

      <div className='flex items-center justify-end gap-4'>
        <SearchField
          width='w-65'
          height='h-9'
          placeholder='Search Anything'
        />

        <TimePeriodSelectButton options={dropdownOptions} />
      </div>
    </div>
  )
}

export default ContentHeader

import React from 'react'
import { SearchField } from '@/shared/components'
import { AddButton, TimePeriodSelectButton } from '@/shared/components/Button'
import { FadersHorizontalSvg } from '@/shared/components/Svg'

const dropdownOptions = [
  'Activity',
  'Time',
  'Trainer',
  'Location',
  'Category',
]

const FadeButton = () => {
  return (
    <div className='flex justify-center items-center w-7.5 h-7.5 rounded-20 bg-gray-bg'>
      <FadersHorizontalSvg width='18' height='18' color='#212738' />
    </div>
  )
}

const ContentHeader = () => {
  return (
    <div className='flex justify-between items-center w-full'>
      <div className='flex items-center justify-start gap-4'>
        <SearchField
          width='w-65'
          height='h-9'
          placeholder='Search Anything'
        />

        <TimePeriodSelectButton options={dropdownOptions} className="!bg-gray-bg" />
      </div>
      <div className='flex items-center justify-end gap-4'>
        <FadeButton />
        <AddButton title="Add Appointment" />
      </div>
    </div>
  )
}

export default ContentHeader

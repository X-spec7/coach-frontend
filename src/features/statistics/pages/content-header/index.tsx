import { SearchField } from '@/shared/components'
import { TimePeriodSelectButton } from '@/shared/components/Button'
import React from 'react'

const timePeriods = ['This Week', 'Today', 'This Month']

interface WorkoutTime {
  hour: number
  minute: number
}

interface ContentHeaderProps {
  workoutTime: WorkoutTime
  totalWorkouts: number
}

const ContentHeader: React.FC<ContentHeaderProps> = ({workoutTime, totalWorkouts}) => {
  return (
    <div className='flex justify-between items-center w-full h-9.5'>
      <div className='flex justify-start items-center text-gray-20 rounded-20'>
        <p className='text-xxs leading-4'>Workout<br />Time</p>

        <div className='bg-gray-bg ml-5 mr-16 px-4 py-1 rounded-20'>
          <div className=' flex justify-start gap-2 items-end'>
            <p className='text-black text-xl font-medium'>{workoutTime.hour}</p>
            <p className='text-xs pb-1'>Hours</p>
            <p className='text-black text-xl font-medium'>{workoutTime.minute}</p>
            <p className='text-xs pb-1'>Minutes</p>
          </div>
        </div>

        <p className='text-xxs leading-4'>Total <br /> Workout</p>

        <div className='bg-gray-bg ml-3 px-4 py-1 rounded-20'>
          <div className='flex justify-start gap-2 items-end'>
            <p className='text-black text-xl font-medium'>{totalWorkouts}</p>
            <p className='text-xs pb-1'>Exercises</p>
          </div>
        </div>

      </div>

      <div className='flex justify-end gap-2 items-center'>
        <SearchField width="w-67" height="h-9" placeholder="Search anything" />
        <TimePeriodSelectButton options={timePeriods} />
      </div>
    </div>
  )
}

export default ContentHeader

import React from 'react'
import { TitleWithEllipsis } from '@/shared/components'
import { GoalDetail } from '@/features/statistics/types'

const goalDetailDummyData: GoalDetail[] = [
  {
    title: 'Complete 5K Runs',
    tag: 'Running',
    desc: '25 km (5 runs of 5 km each)',
    percent: 60,
    total: 25,
    value: 15,
    unit: 'km'
  },
  {
    title: 'Weekly Yoga Practice',
    tag: 'Yoga',
    desc: '4 sessions per week',
    percent: 75,
    total: 4,
    value: 3,
    unit: 'sessions'
  },
  {
    title: 'Daily Step Count',
    tag: 'Walking',
    desc: '70,000 steps/week',
    percent: 85,
    total: 70000,
    value: 59500,
    unit: 'steps'
  }
]

const GoalDetailCard: React.FC<GoalDetail> = ({ title, tag, desc, percent, total, value, unit }) => {
  return (
    <div className='flex flex-col justify-start items-center w-full border-stroke border rounded-20 p-4'>
      <h3 className='text-black text-sm font-medium w-full'>
        {title}
      </h3>

      <div className='mt-3 w-full'>
        <span className='px-1.5 py-0.5 text-gray-30 text-xxs bg-gray-bg rounded-md'>{tag}</span>
        <span className='ml-1.5 text-gray-20 text-xxs'>{desc}</span>
      </div>

      <div className='flex justify-between items-center w-full mt-5'>
        <p className='text-black text-xs font-medium'>{percent}%</p>
        <p className='text-gray-20 text-xxs'>
          {value}/{total} {unit}
        </p>
      </div>

      {/* Progress Bar */}
      <div className="flex gap-2 w-full h-2 rounded-full mt-3 overflow-hidden">
        <div
          className="flex h-full bg-green rounded-full transition-all duration-300"
          style={{ width: `${percent}%` }}
        />
        <div className='flex-1 bg-gray-bg h-gull' />
      </div>
    </div>
  )
}

const GoalsListPanel = () => {
  return (
    <div className='flex flex-col gap-4 items-center justify-start w-full'>
      <TitleWithEllipsis title='Goals List' />
      {
        goalDetailDummyData.map((goalDetail, index) => (
          <GoalDetailCard
            key={index}
            title={goalDetail.title}
            tag={goalDetail.tag}
            desc={goalDetail.desc}
            percent={goalDetail.percent}
            value={goalDetail.value}
            total={goalDetail.total}
            unit={goalDetail.unit}
          />
        ))
      }
    </div>
  )
}

export default GoalsListPanel

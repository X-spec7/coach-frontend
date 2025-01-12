'use client'

import React from 'react'
import ReactApexChart from 'react-apexcharts'

import { ClassCategory } from '@/shared/types'

import { radialApexChartOptions } from './chart'

const totalProgress = 75

interface TrainingProgressComponentProps {
  category: ClassCategory
  sessionName: string
  totalSessionCount: number
  completedSessionCount: number
  progress: number
}

const getColorByCategory = (category: ClassCategory): string => {
  switch (category) {
    case 'Strength':
      return 'bg-yellow'
    case 'Cardio':
      return 'bg-blue'
    case 'Core':
      return 'bg-red'
    case 'Flexibility':
      return 'bg-green'
    default:
      return 'bg-blue'
  }
}

const trainingProgressDummyData: TrainingProgressComponentProps[] = [
  {
    category: 'Cardio',
    sessionName: 'HIIT Session',
    totalSessionCount: 6,
    completedSessionCount: 5,
    progress: 85,
  },
  {
    category: 'Strength',
    sessionName: 'full-body strength circuit',
    totalSessionCount: 5,
    completedSessionCount: 4,
    progress: 75,
  },
  {
    category: 'Flexibility',
    sessionName: 'Yoga Sessions',
    totalSessionCount: 4,
    completedSessionCount: 3,
    progress: 65,
  }
]

const TrainingProgressComponent: React.FC<TrainingProgressComponentProps> = ({category, sessionName, totalSessionCount, completedSessionCount, progress}) => {

  const color = getColorByCategory(category)

  return (
    <div className='w-full'>
      <div className='flex justify-between items-start'>
        <div className='flex justify-start items-center gap-2'>
          <span className={`w-3 h-3 rounded-full ${color}`}></span>
          <div className='flex flex-col justify-start items-start gap-[6px]'>
            <h3>{category} Training</h3>
          </div>
        </div>

        <p className='text-black font-medium'>{progress}%</p>
      </div>

      <p className='text-gray-20 text-xs mt-[6px]'>
        {completedSessionCount}/{totalSessionCount} sets of {sessionName}
      </p>
    </div>
  )
}

const ProgressPanel = () => {
  return (
    <div className='flex flex-col flex-1 items-center h-[520px] bg-white rounded-20 px-4 pt-4 pb-5'>
      <div className='flex justify-between w-full items-center mb-4'>
        <h3 className='text-black text-base font-medium'>Progress</h3>
        {/* TODO: should be replaced with dropdown button */}
        <div className='flex justify-center items-center w-22 h-8 rounded-20 bg-green text-center text-gray-30 font-medium text-xxs'>This Week</div>
      </div>

      <div className='h-12 w-full'>
        <p className='text-2xl text-black font-medium'>{totalProgress}%</p>
        <p className='text-xxs text-gray-20'>Goal Completion</p>
      </div>

      <ReactApexChart
        options={radialApexChartOptions}
        series={[trainingProgressDummyData[0].progress, trainingProgressDummyData[1].progress, trainingProgressDummyData[2].progress]}
        type="radialBar"
        width={192}
        height={192}
      />
      
      {/* <div className='flex items-center text-center w-48 h-48 rounded-full border-red-30 border mb-[6px]'>Progress Circle Component</div> */}

      <div className='flex flex-col items-center gap-4 w-full'>
        {
          trainingProgressDummyData.map((progressData, index) => (
            <TrainingProgressComponent
              key={index}
              category={progressData.category}
              sessionName={progressData.sessionName}
              totalSessionCount={progressData.totalSessionCount}
              completedSessionCount={progressData.completedSessionCount}
              progress={progressData.progress}
            />
          ))
        }
      </div>

    </div>
  )
}

export default ProgressPanel

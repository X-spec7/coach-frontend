'use client'

import { useState } from 'react'

import { Pagination, SearchField } from '@/shared/components'
import { BasicDropdownButton, PrimaryButton } from '@/shared/components/Button'
import { UserCircleSvg, MonitorSvg, ClockSvg } from '@/shared/components/Svg'
import { IClass } from '@/shared/types'

const CATEGORY_OPTIONS = [
  'All Category',
  'Fitness',
  'Strength',
  'Cardio',
  'Mindfullness',
]

const LEVEL_OPTIONS = [
  'All Level',
  'Beginner',
  'Intermediate',
  'Expert'
]

interface IClassListItemProps {
  classData: IClass
}

const ClassListItem: React.FC<IClassListItemProps> = ( {classData }) => {

  const CategoryTag = ({category}: {category: string}) => (
    <div className='px-2 py-3 bg-blue-subtle text-gray-30'>
      {category}
    </div>
  )

  const LevelTag = ({level}: {level: string}) => (
    <div className='w-24 h-7 bg-blue'>
      {classData.level}
    </div>
  )

  const onViewDetailButtonClicked = () => {

  }

  return (
    <div className='flex items-center justify-between gap-14 p-4 border border-gray-bg rounded-20'>
      <div className='flex items-center justify-start gap-4'>
        <div className='flex justify-center items-center w-10 h-10 bg-green rounded-full'>

        </div>
        <div className='flex flex-col justify-start items-center gap-4'>
          <h3 className='text-black font-bold text-xs'>{classData.title}</h3>
          <CategoryTag category={classData.category} />
        </div>
      </div>

      <div className='flex items-center justify-between text-black text-xxs'>
        <div className='flex items-center justify-start gap-2'>
          <UserCircleSvg width='14' height='14' color='#212738' />
          <p>{classData.coachFullname}</p>
        </div>

        <div className='flex items-center justify-start gap-2'>
          <MonitorSvg width='14' height='14' color='#212738' />
          <p>{classData.sessionCount} sessions</p>
        </div>

        <div className='flex items-center justify-start gap-2'>
          <ClockSvg width='14' height='14' color='#212738' />
          <p>{classData.durationPerSession} minutes per session</p>
        </div>

        <LevelTag level={classData.level} />

        <div className='flex flex-col items-start justify-start gap-2'>
          <p className='text-black text-sm font-medium'>&euro; {classData.price}</p>
          <p>for the full course</p>
        </div>

        <PrimaryButton
          width='w-20'
          height='h-8'
          title='View Class'
          onClick={onViewDetailButtonClicked}
        />
      </div>
    </div>
  )
}

interface IAllClassesProps {
  allClasses: IClass[]
}

const AllClasses: React.FC<IAllClassesProps> = ({ allClasses }) => {
  const [totalCount, setTotalCount] = useState(allClasses.length)

  return (
    <div className='flex flex-col gap-4 bg-white rounded-20'>
      {/* Header */}
      <div className='flex items-center justify-between'>
        <h2 className='text-black font-medium'>All Classes</h2>

        <div className='flex items-center justify-end gap-4'>
          <SearchField width='w-60' height='h-8' placeholder='Search class, trainer, etc' />
          <BasicDropdownButton options={CATEGORY_OPTIONS} />
          <BasicDropdownButton options={LEVEL_OPTIONS} />
        </div>
      </div>

      {/* List of classes */}
      {allClasses.map((classData, index) => (
        <ClassListItem key={index} classData={classData}/>
      ))}

      <Pagination countPerPage={6} totalCounts={totalCount} />
    </div>
  )
}

export default AllClasses

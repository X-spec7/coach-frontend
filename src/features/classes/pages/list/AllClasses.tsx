'use client'

import Link from 'next/link'
import {
  usePathname,
  useRouter,
  useSearchParams
} from 'next/navigation'

import { Pagination, SearchField } from '@/shared/components'
import { BasicDropdownButton, PrimaryButton } from '@/shared/components/Button'
import { IClass } from '@/shared/types'
import {
  UserCircleSvg,
  MonitorSvg,
  ClockSvg,
  BarbellSvg
} from '@/shared/components/Svg'

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
    <div className='px-1.5 py-1 bg-blue-subtle text-gray-30 text-xxs2'>
      {category}
    </div>
  )

  const LevelTag = ({level}: {level: string}) => (
    <div className='flex justify-center items-center w-24 h-7 rounded-20 bg-blue'>
      {level}
    </div>
  )

  const onViewDetailButtonClicked = () => {

  }

  return (
    <div className='flex items-center justify-between gap-14 p-4 border border-gray-bg rounded-20'>
      <div className='flex items-center justify-start gap-4 w-60'>
        <div className='flex justify-center items-center w-10 h-10 bg-green rounded-full'>
          <BarbellSvg width='20' height='20' color='#4D5260' />
        </div>
        <div className='flex flex-col justify-start items-start gap-1'>
          <h3 className='text-black font-bold text-xs'>{classData.title}</h3>
          <CategoryTag category={classData.category} />
        </div>
      </div>

      <div className='flex flex-1 items-center justify-between text-black text-xxs'>
        <div className='flex items-center justify-start gap-2 w-32'>
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

        <div className='flex flex-col items-start justify-start gap-1'>
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
  query?: string
  category?: string
  level?: string
  totalClassesCount: number
}

const AllClasses: React.FC<IAllClassesProps> = ({
  allClasses,
  query,
  category,
  level,
  totalClassesCount,
}) => {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()

  const onCategorySelected = (category: string | null) => {
    const params = new URLSearchParams(searchParams)

    if (category && category !== 'All Category') {
      params.set('category', category)
    } else {
      params.delete('category')
    }

    params.delete('page')
    replace(`${pathname}?${params.toString()}`)
  }

  const onLevelSelected = (level: string | null) => {
    const params = new URLSearchParams(searchParams)
    
    if (level && level !== 'All Level') {
      params.set('level', level)
    } else {
      params.delete('level')
    }

    params.delete('page')
    replace(`${pathname}?${params.toString()}`)
  }

  return (
    <div className='flex flex-col gap-4 p-4 bg-white rounded-20'>
      {/* Header */}
      <div className='flex items-center justify-between'>
        <h2 className='text-black font-medium'>All Classes</h2>

        <div className='flex items-center justify-end gap-4'>
          <SearchField
            width='w-60'
            height='h-8'
            placeholder='Search class, trainer, etc'
            value={query}
          />
          <BasicDropdownButton
            options={CATEGORY_OPTIONS}
            onSelect={onCategorySelected}
            dropdownDefaultValue={category}
          />
          <BasicDropdownButton
            options={LEVEL_OPTIONS}
            onSelect={onLevelSelected}
            dropdownDefaultValue={level}
          />
        </div>
      </div>

      {allClasses.length === 0 && (
        <div className='flex justify-center items-center text-gray-30 text-3xl font-semibold py-20'>There are no classes yet</div>
      )}

      {/* List of classes */}
      {allClasses.map((classData, index) => (
        <Link href={`/classes/detail/${classData.id}`}>
          <ClassListItem key={index} classData={classData}/>
        </Link>
      ))}

      <Pagination countPerPage={6} totalCounts={totalClassesCount} />
    </div>
  )
}

export default AllClasses

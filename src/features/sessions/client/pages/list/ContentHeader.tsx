'use client'

import { SearchField } from '@/shared/components'
import { BasicDropdownButton } from '@/shared/components/Button'
import { PlusSvg, FadersHorizontalSvg } from '@/shared/components/Svg'

const sessionCategories = [
  'All Class Categories',
  'Fitness Class',
  'Strength Class',
  'Flexibility Class',
  'Mindfullness Class'
]

const FadeButton = () => {
  return (
    <div className='flex justify-center items-center w-7.5 h-7.5 rounded-20 bg-gray-bg'>
      <FadersHorizontalSvg width='18' height='18' color='#212738' />
    </div>
  )
}

const ContentHeader = ({ searchPlaceHolder } : { searchPlaceHolder: string}) => {
  return (
    <div className='flex justify-between items-center w-full h-7.5'>
      <div className='flex justify-start items-center gap-3'>
        <SearchField
          width='w-56'
          height='h-7.5'
          placeholder={searchPlaceHolder || 'Search for session'}
        />
        <BasicDropdownButton options = {sessionCategories} />
      </div>

      <div className='flex justify-end items-center gap-3'>
        <FadeButton />
        <p className='text-lg text-black font-medium'>Toggle Button</p>
      </div>
    </div>
  )
}

export default ContentHeader

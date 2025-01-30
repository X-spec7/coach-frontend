'use client'

import { SearchField } from '@/shared/components'
import { BasicDropdownButton } from '@/shared/components/Button'
import { PlusSvg, FadersHorizontalSvg } from '@/shared/components/Svg'
import { useSearchParams, usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

const classCategories = [
  'All Class Categories',
  'Fitness Class',
  'Strength Class',
  'Flexibility Class',
  'Mindfullness Class'
]

const handleAddTrainerButtonClick = () => {
  // 
}

const AddTrainerButton = () => {
  return (
    <button
      className='flex justify-center items-center gap-0.5 py-1.5 px-2.5 bg-green rounded-20'
      onClick={handleAddTrainerButtonClick}
    >
      <PlusSvg width='14' height='18' color='#4D5260' />
      <p className='text-gray-30 text-xxs font-medium'>Add Trainer</p>
    </button>
  )
}

const FadeButton = () => {
  return (
    <div className='flex justify-center items-center w-7.5 h-7.5 rounded-20 bg-gray-bg'>
      <FadersHorizontalSvg width='18' height='18' color='#212738' />
    </div>
  )
}

const ContentHeader = ({ searchPlaceHolder } : { searchPlaceHolder: string}) => {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()

  const onCategorySelected = (selectedOption: string | null) => {
    const params = new URLSearchParams(searchParams)

    if (selectedOption) {
      params.set('specialization', selectedOption)
    } else {
      params.delete('specialization')
    }

    params.delete('page')
    replace(`${pathname}?${params.toString()}`)
  }

  return (
    <div className='flex justify-between items-center w-full h-7.5'>
      <div className='flex justify-start items-center gap-3'>
        <SearchField
          width='w-56'
          height='h-7.5'
          placeholder={searchPlaceHolder || 'Search for trainer'}
        />
        <BasicDropdownButton
          options = {classCategories}
          onSelect={onCategorySelected}
        />
      </div>

      <div className='flex justify-end items-center gap-3'>
        <FadeButton />
        <AddTrainerButton />
      </div>
    </div>
  )
}

export default ContentHeader

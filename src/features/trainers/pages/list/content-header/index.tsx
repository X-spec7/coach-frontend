'use client'

import { SearchField } from '@/shared/components'
import { BasicDropdownButton } from '@/shared/components/Button'
import { PlusSvg, FadersHorizontalSvg } from '@/shared/components/Svg'
import { useAuth } from '@/shared/provider'
import { useSearchParams, usePathname, useRouter } from 'next/navigation'

const COACH_SPECIALITIES = [
  'All',
  'Fitness',
  'Strength',
  'Flexibility',
  'Mindfullness',
]

const LIST_OPTION = [
  'All',
  'Listed',
  'Unlisted',
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

interface IContentHeaderProps {
  searchPlaceHolder: string
  dropdownDefaultValue: string
  listOptionDefaultValue: string
}

const ContentHeader: React.FC<IContentHeaderProps> = ({
  searchPlaceHolder,
  dropdownDefaultValue,
  listOptionDefaultValue,
}) => {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()

  const { user } = useAuth()

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

  const onListOptionSelected = (selectedOption: string | null) => {
    const params = new URLSearchParams(searchParams)

    if (selectedOption) {
      params.set('listed', selectedOption)
    } else {
      params.delete('listed')
    }

    params.delete('page')
    replace(`${pathname}?${params.toString().toLowerCase()}`)
  }

  return (
    <div className='flex justify-between items-center w-full h-7.5'>
      <div className='flex justify-start items-center gap-3'>
        <SearchField
          width='w-56'
          height='h-7.5'
          placeholder={'Search for trainer'}
          value={searchPlaceHolder}
        />
        <BasicDropdownButton
          options={COACH_SPECIALITIES}
          onSelect={onCategorySelected}
          dropdownDefaultValue={dropdownDefaultValue}
        />
        {user?.isSuperuser && (
          <BasicDropdownButton
            options={LIST_OPTION}
            onSelect={onListOptionSelected}
            dropdownDefaultValue={listOptionDefaultValue}
          />
        )}
      </div>

      <div className='flex justify-end items-center gap-3'>
        <FadeButton />
        <AddTrainerButton />
      </div>
    </div>
  )
}

export default ContentHeader

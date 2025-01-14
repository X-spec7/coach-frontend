'use client'

import { SearchField } from '@/shared/components'
import { PlusSvg, FadersHorizontalSvg } from '@/shared/components/Svg'

const handleCreateSessionButtonClick = () => {
  console.log('create session button clicked')
}

const CreateSessionButton = () => {
  return (
    <button
      className='flex justify-center items-center gap-0.5 py-1.5 px-2.5 bg-green rounded-20'
      onClick={handleCreateSessionButtonClick}
    >
      <PlusSvg width='14' height='18' color='#4D5260' />
      <p className='text-gray-30 text-xxs font-medium'>Create Session</p>
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
  return (
    <div className='flex justify-between items-center w-full h-7.5 px-4'>
      <div className='flex justify-start items-center gap-3'>
        <SearchField
          width='w-56'
          height='h-7.5'
          placeholder={searchPlaceHolder || 'Search for session'}
        />
      </div>

      <div className='flex justify-end items-center gap-3'>
        <FadeButton />
        <CreateSessionButton />
      </div>
    </div>
  )
}

export default ContentHeader

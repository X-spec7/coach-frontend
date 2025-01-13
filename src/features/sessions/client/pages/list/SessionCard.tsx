import React from 'react'
import Image from 'next/image'
import { ISession } from '@/features/sessions/types'

interface ISesssionCardProps {
  session: ISession
}

const defaultBannerImageUrl = ''

const SessionCard: React.FC<ISesssionCardProps> = ({ session }) => {
  return (
    <div className='flex flex-col items-center justify-between gap-4 w-60 h-75 py-8 border-stroke border rounded-20'>
      <h4 className='text-lg text-black font-medium'>
        {session.title}
        <span className='text-xs text-gray-20'>({session.duration} min)</span>
      </h4>

      <div className='w-29 h-29 rounded-20'>
        <Image
          src={session.bannerImageUrl ?? defaultBannerImageUrl}
          width={114}
          height={114}
          // add trainer id or name to alt
          alt='trainer banner'
          className='rounded-20'
        />
      </div>

      <p className='text-lg text-black font-medium'>{session.coachFullname}</p>
      <p className='text-xs text-gray-20'>{session.startDate}</p>

      <div className='flex justify-center items-center gap-2'>
        <span className='text-gray-20 text-xxs py-1.5 px-2.5 bg-gray-bg rounded-20'>
          {session.goal}
        </span>
        <span className='text-gray-20 text-xxs py-1.5 px-2.5 bg-gray-bg rounded-20'>
          {session.goal}
        </span>
      </div>
    </div>
  )
}

export default SessionCard

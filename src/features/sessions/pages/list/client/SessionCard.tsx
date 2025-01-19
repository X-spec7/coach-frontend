import React from 'react'
import Image from 'next/image'
import { ISessionWithBookedStatus } from '@/features/sessions/types'
import { formatTimeToDisplay } from '@/shared/utils/format'

import * as dotenv from 'dotenv'

dotenv.config()

const backendHostUrl = process.env.NEXT_PUBLIC_BACKEND_HOST_URL

interface ISesssionCardProps {
  session: ISessionWithBookedStatus
}

const defaultBannerImageUrl = '/images/banner/banner8.png'

const SessionCard: React.FC<ISesssionCardProps> = ({ session }) => {
  return (
    <div className='flex flex-col items-center justify-between w-60 h-75 py-4 border-stroke border rounded-20'>
      <h4 className='text-lg text-black font-medium'>
        {session.title}
      </h4>
      <p className='text-xs text-gray-20 mb-1'>({session.duration} min)</p>

      <div className='w-29 h-29 rounded-20'>
        <Image
          src={(session.bannerImageUrl && session.bannerImageUrl !== '') ? backendHostUrl + session.bannerImageUrl : defaultBannerImageUrl}
          width={114}
          height={114}
          // add trainer id or name to alt
          alt='trainer banner'
          className='rounded-20'
        />
      </div>

      <p className='text-lg text-black font-medium'>{session.coachFullname}</p>
      <p className='text-xs text-gray-20'>{formatTimeToDisplay(session.startDate)}</p>

      <div className='flex justify-center items-center gap-2'>
        <span className='text-gray-20 text-xxs py-1.5 px-2.5 bg-gray-bg rounded-20'>
          {session.goal}
        </span>
        <span className='text-gray-20 text-xxs py-1.5 px-2.5 bg-gray-bg rounded-20'>
          {session.level}
        </span>
      </div>
    </div>
  )
}

export default SessionCard

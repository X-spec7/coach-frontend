import React from 'react'
import { ISession } from '@/features/sessions/types'

interface ISesssionCardProps {
  session: ISession
}

const SessionCard: React.FC<ISesssionCardProps> = ({ session }) => {
  return (
    <div className='flex flex-col items-center justify-between w-60 h-75 py-8 border-stroke border rounded-20'>
      <h4 className='text-lg text-black font-medium'></h4>
    </div>
  )
}

export default SessionCard

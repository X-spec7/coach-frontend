import Image from 'next/image'

import { ISession } from '@/shared/types'
import { DEFAULT_SESSION_BANNER_URL } from '@/shared/constants'
import { formatTimeToDisplay, getDateFromDateObject } from '@/shared/utils/format'
import { ClockSvg, TwoPeopleSvg } from '@/shared/components/Svg'

interface ISessionItemProps {
  session: ISession
}

const SessionItem: React.FC<ISessionItemProps> = ({ session }) => {
  return (
    <div className='flex justify-between items-center w-full p-4'>
      <div className='flex justify-start items-center gap-4'>
        <Image
          src={session.bannerImageUrl?.trim() ?? DEFAULT_SESSION_BANNER_URL}
          alt={`${session.title} banner image`}
          width={70}
          height={70}
        />

        <div className='flex flex-col items-center justify-start gap-1'>
          <p className='text-gray-20 text-xxs'>
            {getDateFromDateObject(session.startDate)}
          </p>
          <p className='text-black text-xs font-medium'>
            {formatTimeToDisplay(session.startDate)}
          </p>
        </div>

        <div className='w-0.5 h-full bg-stroke' />

        <h3 className='text-black text-base font-medium'>{session.title}</h3>

        <div className='flex flex-col items-start justify-center gap-1'>
          <div className='flex justify-start items-center gap-1'>
            <ClockSvg width='12' height='12' color='#878A94' />
            <p className='text-gray-20 text-xxs'>{session.duration} min</p>
          </div>
          <div className='flex justify-start items-center gap-1'>
            <TwoPeopleSvg width='12' height='12' color='#878A94' />
            <p className='text-gray-20 text-xxs'>{session.totalParticipantNumber} participants</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SessionItem

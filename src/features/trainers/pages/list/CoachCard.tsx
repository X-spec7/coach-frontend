import Image from 'next/image'
import { MonitorSvg } from '@/shared/components/Svg'
import { ICoachCard } from '../../types'
import { BACKEND_HOST_URL } from '@/shared/constants'

const defaultBannerImageUrl = '/images/banner/banner7.png'

interface TrainerCardInterface {
  coach: ICoachCard
}

const CoachCard: React.FC<TrainerCardInterface> = ({ coach }) => {
  return (
    <div className='flex flex-col items-center justify-between w-60 h-75 py-8 border-stroke border rounded-20'>
      <div className='w-29 h-29 rounded-20'>
        <Image
          src={coach.coachBannerImageUrl ? BACKEND_HOST_URL + coach.coachBannerImageUrl : defaultBannerImageUrl}
          width={114}
          height={114}
          // add coach id or name to alt
          alt='coach banner'
          className='rounded-20'
        />
      </div>

      <div className='flex flex-col items-center justify-center gap-3'>
        <p className='text-lg text-black font-medium'>{coach.coachName}</p>

        <div className='flex justify-center items-center gap-1.5'>
          <MonitorSvg width='16' height='16' color='#878A94' />
          <p className='text-xs text-gray-20'>{coach.className ?? 'No Class'}</p>
        </div>

        <span className='text-gray-20 text-xxs py-1.5 px-2.5 bg-gray-bg rounded-20'>
          {coach.specialization || 'No Category'}
        </span>
      </div>
    </div>
  )
}

export default CoachCard

import { Trainer } from '@/shared/types'
import Image from 'next/image'
import { MonitorSvg } from '@/shared/components/Svg'

const defaultBannerImageUrl = ''

interface TrainerCardInterface {
  trainer: Trainer
}

const TrainerCard: React.FC<TrainerCardInterface> = ({ trainer }) => {
  return (
    <div className='flex flex-col items-center justify-between w-60 h-75 py-8 border-stroke border rounded-20'>
      <div className='w-29 h-29 rounded-20'>
        <Image
          src={trainer.bannerUrl ?? defaultBannerImageUrl}
          width={114}
          height={114}
          // add trainer id or name to alt
          alt='trainer banner'
          className='rounded-20'
        />
      </div>

      <div className='flex flex-col items-center justify-center gap-3'>
        <p className='text-lg text-black font-medium'>{trainer.name}</p>

        <div className='flex justify-center items-center gap-1.5'>
          <MonitorSvg width='16' height='16' color='#878A94' />
          <p className='text-xs text-gray-20'>{trainer.classes?.[0].title || 'No Title'}</p>
        </div>

        <span className='text-gray-20 text-xxs py-1.5 px-2.5 bg-gray-bg rounded-20'>
          {trainer.classes?.[0].category || 'No Category'}
        </span>
      </div>
    </div>
  )
}

export default TrainerCard

import Image from 'next/image'

import { PrimaryButton, TitleWithEllipsis } from '@/shared/components'
import { DEFAULT_CLASS_BANNER_URL } from '@/shared/constants'
import { IClass } from '@/shared/types'
import { MonitorSvg, ClockSvg } from '@/shared/components/Svg'

interface IFeaturedClassProps {
  classData: IClass
}

const FeaturedClass: React.FC<IFeaturedClassProps> = ({ classData }) => {

  const Tag = ({content, isLevel}: {content: string, isLevel?: boolean}) => (
    <div className={`py-2 px-3.5 text-gray-30 text-xxs ${isLevel ? 'bg-yellow' : 'bg-blue'}`}>
      {content}
    </div>
  )

  const onViewDetailButtonClicked = () => {

  }

  return (
    <div className='flex flex-col gap-4'>
      <TitleWithEllipsis title='Featured Class' />

      <div className='flex justify-center gap-4 items-start'>
        <div className='relative flex flex-1 h-80'>
          <Image
            src={DEFAULT_CLASS_BANNER_URL}
            alt=''
            fill
            className='object-cover rounded-lg'
          />
        </div>

        <div className='flex flex-col flex-1 items-start justify-start gap-4'>
          <div className='flex items-start justify-start gap-4'>
            <Tag content={classData.category} />
            <Tag content={classData.level} isLevel />
          </div>

          <h3 className='text-black text-2xl font-bold'>{classData.title}</h3>

          {/* MonitorSvg + Text | Spacing | ClockSvg + Text */}
          <div className='flex items-center gap-6'>
            {/* MonitorSvg + Text */}
            <div className='flex items-center gap-2'>
              <MonitorSvg width='14' height='14' color='#878A94'/>
              <span className='text-gray-600 text-sm'>{classData.sessionCount} sessions</span>
            </div>

            {/* ClockSvg + Text */}
            <div className='flex items-center gap-2'>
              <ClockSvg width='14' height='14' color='#878A94'/>
              <span className='text-gray-600 text-sm'>{classData.durationPerSession} minutes per session</span>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className='text-black text-xs break-words'>
          {classData.description}
        </div>

        {/* Trainer */}
        <p className='text-xxs2 text-gray-20'>Trainers</p>
        <p className='text-black text-xs'>{classData.coachFullname}</p>

        {/* Devider */}
        <div className='h-0.5 w-full bg-gray-bg mt-4'/>
        
        {/* Price and Button */}
        <div className='flex justify-between items-center'>
          <div className='flex items-start justify-start gap-4'>
            <p className='text-black font-medium'>&euro; {classData.price}</p>
            <p className='text-gray-20 text-xxs2'>for the full course</p>
          </div>

          <PrimaryButton
            width='w-24'
            height='h-10'
            title='View Class'
            onClick={onViewDetailButtonClicked}
          />
        </div>
      </div>
    </div>
  )
}

export default FeaturedClass

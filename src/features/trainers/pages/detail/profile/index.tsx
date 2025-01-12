import Image from 'next/image'

import { Trainer } from '@/shared/types'
import { TitleWithEllipsis } from '@/shared/components'

import Overview from './Overview'
import Classes from './Classes'
import Contact from './Contact'
import Certification from './Certification'

interface TrainerProfileProps {
  trainer: Trainer
}

const TrainerProfile: React.FC<TrainerProfileProps> = ({ trainer }) => {

  const profileContent = (
    <div className='flex flex-col justify-start items-center'>
      <TitleWithEllipsis title='Profile' />

      <div className='w-30 h-30 mt-5.5 rounded-5xl'>
        <Image
          src={trainer.avatarUrl ?? ''}
          width={120}
          height={120}
          alt={`${trainer.name} avatar`}
          className='rounded-5xl'
        />
      </div>

      <p className='text-black font-medium text-2xl'>{trainer.name}</p>

      {/* TODO: replace with real availibility */}
      <p className='text-sm text-gray-30'>Available</p>
    </div>
  )

  return (
    <div className='flex flex-1 flex-col p-4 gap-7 bg-white rounded-4xl '>
      {profileContent}

      <Overview experience={trainer.experience} members={trainer.members} rating={trainer.rating} />
      <Classes classes={trainer.classes} />
      <Contact contact={trainer.contact} />
      <Certification certifications={trainer.certification} />

    </div>
  )
}

export default TrainerProfile

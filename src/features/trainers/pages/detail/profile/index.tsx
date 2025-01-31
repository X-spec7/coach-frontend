import Image from 'next/image'

import { ICoachDetail } from '@/shared/types'
import { TitleWithEllipsis } from '@/shared/components'

import Overview from './Overview'
import Classes from './Classes'
import Contact from './Contact'
import Certification from './Certification'
import { BACKEND_HOST_URL, DEFAULT_AVATAR_URL } from '@/shared/constants'

interface TrainerProfileProps {
  coach: ICoachDetail
}

const TrainerProfile: React.FC<TrainerProfileProps> = ({ coach }) => {

  const profileContent = (
    <div className='flex flex-col justify-start items-center'>
      <TitleWithEllipsis title='Profile' />

      <div className='w-30 h-30 mt-5.5 rounded-4xl overflow-hidden'>
        <Image
          src={
            coach.avatarImageUrl && coach.avatarImageUrl.trim() !== ''
              ? BACKEND_HOST_URL + coach.avatarImageUrl
              : DEFAULT_AVATAR_URL
          }
          width={120}
          height={120}
          alt={`${coach.fullName} avatar`}
          className='rounded-4xl'
        />
      </div>

      <p className='text-black font-medium text-2xl'>{coach.fullName}</p>

      {/* TODO: replace with real availibility */}
      <p className='text-sm text-gray-30'>Available</p>
    </div>
  )

  return (
    <div className='flex flex-1 flex-col p-4 gap-7 bg-white rounded-4xl '>
      {profileContent}

      <Overview
        experience={coach.yearsOfExperience}
        members={coach.members}
        reviews={coach.reviews}
      />
      <Classes classes={coach.classes} />
      <Contact
        address={coach.address}
        phoneNumber={coach.phoneNumber}
        email={coach.email}
      />
      <Certification certifications={coach.certifications} />

    </div>
  )
}

export default TrainerProfile

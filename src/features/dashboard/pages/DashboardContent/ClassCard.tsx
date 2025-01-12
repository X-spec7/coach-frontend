import { Class, ClassLevel } from "@/shared/types"

import { HeartBeatSvg } from "@/shared/components/Svg"
import KebabMenu from "@/shared/components/Menu/KebabMenu"
import { UserCircleSvg } from "@/shared/components/Svg"

interface ClassCardProps extends Omit<Class, 'durationPerSession' | 'price'>{}

const getColorByLevel = (level?: ClassLevel): string => {
  switch (level) {
    case 'Beginner':
      return 'bg-blue'
    case 'Intermediate':
      return 'bg-yellow'
    case 'Advanced':
      return 'bg-green'
    case 'All Levels':
      return 'bg-gray'
    default:
      return 'bg-gray'
  }
}

const ClassCard: React.FC<ClassCardProps> = ({ category, title, tutor, videoNumber, sessionRange, level }) => {
  const color = getColorByLevel(level)
  
  return (
    <div className='flex justify-between items-center p-4 bg-white rounded-20'>
      <div className='flex items-center justify-start gap-3 w-52'>
        <div className='flex justify-center items-center w-10 h-10 bg-blue rounded-full'>
          <HeartBeatSvg width="26" height="29" color="#4D5260"/>
        </div>
        <div className='flex flex-col items-start justify-center gap-1'>
          <span className='px-[6px] pb-[2px] pt-[3px] bg-blue-subtle text-xxs2'>
            {category} Training
          </span>
          <h3 className='text-black text-xs font-bold'>
            {title}
          </h3>
          <div className='flex justify-start gap-1 items-center text-gray-20 text-[11px]'>
            <UserCircleSvg width="14" height="14" color="#878A94"/>
            {tutor}
          </div>
        </div>
      </div>

      <div className='flex flex-col items-start justify-center gap-1'>
        <p className='text-black font-medium text-xxs'>{videoNumber} videos</p>
        <p className='text-gray-20 text-xxs'>
          {sessionRange?.minimumDuration}-{sessionRange?.maximumDuration} m/session
        </p>
      </div>

      <div className='w-21'>
        <span className={`px-2 py-1 rounded-lg text-black text-xxs ${color}`}>{level}</span>
      </div>

      <KebabMenu />

    </div>
  )
}

export default ClassCard

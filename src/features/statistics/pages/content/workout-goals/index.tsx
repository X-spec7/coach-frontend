import { HeartBeatSvg } from '@/shared/components/Svg'
import { TitleWithEllipsis } from '@/shared/components'

import RadialProgressBar from './RadialProgress'

const WorkoutGoalsPanel = () => {
  return (
    <div className='flex flex-col justify-center items-center w-full gap-5 px-4 py-5 xl:py-7 bg-yellow rounded-20'>
      <div className='flex items-center gap-3 w-full'>
        <HeartBeatSvg width='20' height='20' color='#4D5260' />
        <TitleWithEllipsis title='Workout Goals' />
      </div>

      {/* Radial Progress Bar */}
      <div className='relative w-48 h-48 xl:w-72 xl:h-72'>
        <RadialProgressBar />
        <div className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-99'>
          <div className='flex flex-col justify-center items-center gap-2'>
            <p className='text-black font-bold text-3xl'>75 %</p>
            <p className='text-gray-30 text-xs'>14/20 Completed</p>
          </div>
        </div>
      </div>

      <p className='flex justify-center items-center break-words text-gray-30 text-xs'>Almost there! Keep pushing to reach your goal!</p>
    </div>
  )
}

export default WorkoutGoalsPanel

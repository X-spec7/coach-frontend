import SplineChart from './SplineChart'
import { CalendarSvg, CaretRightSvg } from '@/shared/components/Svg'

const TrainingActivity = () => {
  return (
    <div className='flex flex-col p-4 gap-4 h-90 bg-white rounded-4xl'>
      <div className='flex justify-between items-center'>
        <h3 className='text-black font-medium'>Training Activity</h3>
        <button className='flex justify-between items-center w-38 h-8 py-2.5 px-1.5 rounded-20 bg-green'>
          <CalendarSvg width='16' height='16' color='#4D5260' />
          <p className='text-gray-30 text-xxs font-medium'>1 - 8 August 2028</p>
          <CaretRightSvg width='18' height='18' color='#4D5260' />
        </button>
      </div>

      <SplineChart />
    </div>
  )
}

export default TrainingActivity

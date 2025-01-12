import { FireSvg } from '@/shared/components/Svg'

import CaloriesChart from '../chart/CaloriesChart'

const calorie = 110
const remainingCalorie = 108

const CaloriesPanel = () => {
  return (
    <div className='flex flex-col gap-5.5 w-full p-4 xl:p-6'>
      <div className='flex items-center gap-2'>
        <FireSvg width='16' height='16' color='#4D5260' />
        <h3 className='text-gray-30 text-sm font-medium'>Calories</h3>
      </div>

      {/* TODO: replace with heart beat graph */}

      <div className='flex justify-center items-center w-full h-22.5 rounded-20'>
        <CaloriesChart degree={1} progressDegree={65} />
      </div>

      <div className='flex flex-col gap-1'>
        <div className='flex items-end justify-start gap-0.5 text-gray-30'>
          <p className='text-xl font-bold'>{calorie}</p>
          <p className='text-sm font-medium'>kcal</p>
        </div>

        <div className='flex justify-start items-center gap-1.5 text-gray-20 text-xxs2'>
          <label>Yesterday:</label>
          <p className='font-medium'>{remainingCalorie} kcal</p>
        </div>
      </div>
    </div>
  )
}

export default CaloriesPanel

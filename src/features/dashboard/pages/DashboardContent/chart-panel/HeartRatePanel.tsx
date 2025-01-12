import HeartRateChart from '../chart/HeartRateChart'
import { HeartBeatSvg } from '@/shared/components/Svg'

const bpmRateToday = 110
const bpmRateYesterday = 108

const HeartRatePanel = () => {
  return (
    <div className='flex flex-col gap-5.5 w-full p-4 xl:p-6'>
      <div className='flex items-center gap-2'>
        <HeartBeatSvg width='16' height='16' color='#4D5260' />
        <h3 className='text-gray-30 text-sm font-medium'>Heart Rate</h3>
      </div>

      {/* TODO: replace with heart beat graph */}
      <div className='flex justify-center items-center w-full h-22.5 px-4 rounded-20'>
        <HeartRateChart />
      </div>

      <div className='flex flex-col gap-1'>
        <div className='flex items-end justify-start gap-0.5 text-gray-30'>
          <p className='text-xl font-bold'>{bpmRateToday}</p>
          <p className='text-sm font-medium'>bpm</p>
        </div>

        <div className='flex justify-start items-center gap-1.5 text-gray-20 text-xxs2'>
          <label>Yesterday:</label>
          <p className='font-medium'>{bpmRateYesterday} bpm</p>
        </div>
      </div>
    </div>
  )
}

export default HeartRatePanel

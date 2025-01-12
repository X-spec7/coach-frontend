import { TitleWithEllipsis } from '@/shared/components'
import WeightDataAreaChart from './WeightDataAreaChart'

const WeightDataPanel = () => {
  return (
    <div className='flex flex-col justify-start gap-4 items-center border-stroke border rounded-20 p-4 xl:py-8'>
      <TitleWithEllipsis title='Weight Data' />

      {/* <!-- DETAIL --> */}
      <div className='flex justify-between items-end w-full text-xs text-gray-20 font-medium'>
        <p>Current Weight</p>
        <div>
          <span className='text-black text-2xl font-medium mr-1'>72</span>
          <span>kg</span>
        </div>
      </div>
      <div className='flex justify-between items-end w-full text-xs text-gray-20 font-medium'>
        <p>Weight Goal</p>
        <div>
          <span className='text-black text-2xl font-medium mr-1'>65</span>
          <span>kg</span>
        </div>
      </div>
      <div className='flex justify-between items-end w-full text-xs text-gray-20 font-medium'>
        <p>Progress</p>
        <div>
          <span className='text-black text-2xl font-medium mr-1'>18</span>
          <span>%</span>
        </div>
      </div>

      {/* <!-- CHART GRAPH --> */}
      <div className='flex justify-center items-center w-65 h-65 xl:w-full xl:h-80'>
        <WeightDataAreaChart />
      </div>
    </div>
  )
}

export default WeightDataPanel

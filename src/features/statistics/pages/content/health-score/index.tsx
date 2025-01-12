import { TitleWithEllipsis } from '@/shared/components'
import { HeartBeatSvg } from '@/shared/components/Svg'
import { BasicProgressBar } from '@/shared/components'

interface HealthScorePanelProps {
  percent: number
  tag: string
}

const HealthScorePanel: React.FC<HealthScorePanelProps> = ({ percent, tag }) => {
  const wholeSegments = Math.floor(percent / 20)

  const remainder = percent - 20 * wholeSegments

  const remainderPercent = remainder * 100 / 20

  return (
    <div className='flex flex-col justify-start items-start p-4 xl:py-8 bg-blue rounded-20'>
      <div className='flex items-center gap-3 w-full'>
        <HeartBeatSvg width='20' height='20' color='#4D5260' />
        <TitleWithEllipsis title='Health Score' />
      </div>

      <div className='flex justify-start items-center gap-3 mt-8 mb-2'>
        <p className='text-2xl font-medium text-black'>
          {percent} %
        </p>
        <span className='text-gray-30 text-xs font-medium bg-blue-subtle rounded-lg px-2.5 py-1'>{tag}</span>
      </div>

      {/* <!-- PROGRESS BAR --> */}
      <div className='flex justify-between items-center gap-2 w-full'>
        {Array.from({ length: 5 }, (_, i) => {
          const percent = i < wholeSegments ? 100 : (i - 1) < wholeSegments ? remainderPercent : 0

          return (
            <BasicProgressBar
              key={i}
              bgColor='bg-blue-subtle'
              progressColor='bg-blue-dark'
              height='h-2'
              progress={percent}
              radius='rounded-md'
            />
          )
        })}
      </div>

      <p className='text-gray-30 text-xs mt-2'>Keep up your good work, Kalendra!</p>
    </div>
  )
}

export default HealthScorePanel

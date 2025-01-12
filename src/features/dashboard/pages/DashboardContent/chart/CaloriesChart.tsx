import Image from 'next/image'
import SemiCircleProgressBar from "react-progressbar-semicircle";

const imageSrc = '/images/needle.png'

interface CaloriesChartProps {
  degree: number
  progressDegree: number
}

const CaloriesChart: React.FC<CaloriesChartProps> = ({ degree, progressDegree }) => {
  return (
    <div className="relative w-full h-full rounded-lg overflow-hidden">

      {/* Progress bar */}
      <div className='flex justify-center items-bottom w-full h-full'>
        <SemiCircleProgressBar
          percentage={progressDegree}
          strokeWidth={16}
          stroke='#CEE9FF'
          background='#F4F5F5'
        />
      </div>

      {/* Rotating bar */}
      <div
        className="absolute bottom-0 w-10 left-1/2 transform"
        style={{
          transform: `translateX(-50%) rotate(${-100 + progressDegree/100 * 180}deg)`,
        }}
      >
        <div className="absolute bottom-2 left-2 w-3 h-3 bg-white rounded-full border border-gray-300" />

        <Image
          width={40}
          height={104}
          alt='caories chart needle'
          src={imageSrc}
        />
      </div>
    </div>
  )
}

export default CaloriesChart

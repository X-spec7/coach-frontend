import Image from 'next/image'

const tempHeartRateChartImage = '/images/heart-rate.png'

const HeartRateChart = () => {
  return (
    <div className='relative w-full h-full'>
      <Image
        src={tempHeartRateChartImage}
        alt="heart rate chart"
        fill
        className="object-stretch"
      />
    </div>
  )
}

export default HeartRateChart

'use client'

import Image from 'next/image'

import { PrimaryButton } from '@/shared/components'
import { IClass } from '@/shared/types'

import { DEFAULT_CLASS_BANNER_URL } from '@/shared/constants'
import {
  ChartBarSvg,
  ClockSvg,
  FireSvg,
  MonitorSvg,
  SpeedoMeterSvg,
  CheckSvg
} from '@/shared/components/Svg'

interface IClassOverviewItemProps {
  keyName: string
  value: string | number
}

const ClassOverviewItem: React.FC<IClassOverviewItemProps> = ({ keyName, value }) => {

  return (
    <div className='flex items-center justify-start gap-2'>
      <div className={`flex justify-center items-center w-9 h-9 rounded-20 ${getBgColorByKey(keyName)}`}>
        {getSvgByKey(keyName)}
      </div>

      <div className='flex flex-col items-start justify-start gap-0.5'>
        <p className='text-gray-30 font-semibold text-xs'>{value}</p>
        <p className='text-gray-20 font-medium text-xxs'>{keyName}</p>
      </div>
    </div>
  )
}

interface IClassSpecProps {
  classDetailData: IClass
}

const ClassSpec: React.FC<IClassSpecProps> = ({ classDetailData }) => {
  const EquipmentItem = ({itemTitle}: {itemTitle: string}) => (
      <div className='flex items-center justify-start gap-2'>
        <div className='flex justify-center items-center w-4.5 h-4.5 rounded-full bg-blue'>
          <span className='w-1 h-1 bg-black rounded-full' />
        </div>
        <p className='text-gray-30 text-sm'>{itemTitle}</p>
      </div>
    )

  const BenefitItem = ({benefit}: {benefit: string}) => (
    <div className='flex items-center justify-start gap-2'>
      <div className='flex justify-center items-center w-4.5 h-4.5 rounded-full bg-blue'>
        <CheckSvg width='14' height='14' color='#4D5260' />
      </div>

      <p className='text-gray-30 text-sm'>{benefit}</p>
    </div>
  )

  const onTakeClassButtonClicked = () => {
    // 
  }
  return (
    <div className='flex flex-1 flex-col gap-4 p-4 bg-white rounded-4xl'>
      {/* Header */}
      <div className='flex items-center justify-between w-full'>
        <div className='flex flex-col items-start justify-start gap-0.5'>
          <h2 className='text-black text-2xl font-medium'>{classDetailData.title}</h2>
          <p className='text-gray-20 text-sm'>{classDetailData.category} | {classDetailData.coachFullname}</p>
        </div>

        <div className='flex items-center justify-end gap-4'>
          <div className='flex flex-col items-start justify-start gap-0.5'>
            <p className='text-black text-lg font-medium'>&euro; {classDetailData.price}</p>
            <p className='text-gray-20 text-xs'>for the full course</p>
          </div>
          <PrimaryButton title='Take Class' width='w-24' height='h-9' fontSize='text-sm' onClick={onTakeClassButtonClicked} />
        </div>
      </div>

      {/* Banner */}
      <div className='w-full bg-gray-bg-subtle rounded-lg'>
        <div className='relative w-full h-100 rounded-lg'>
          <Image
            src={DEFAULT_CLASS_BANNER_URL}
            alt={`${classDetailData.title} banner image`}
            fill
            className='object-cover rounded-lg'
          />
        </div>
        <div className='flex items-center justify-between w-full p-4'>
          <ClassOverviewItem keyName='level' value={classDetailData.level}/>
          <ClassOverviewItem keyName='intensity' value={classDetailData.intensity}/>
          <ClassOverviewItem keyName='Session Count' value={classDetailData.sessionCount}/>
          <ClassOverviewItem keyName='Duration per session' value={classDetailData.durationPerSession}/>
          <ClassOverviewItem keyName='Calorie per session' value={classDetailData.caloriePerSession}/>
        </div>
      </div>

      {/* Description */}
      <h3 className='text-black font-medium'>About the Class</h3>
      <p className='text-gray-30 text-sm break-words'>{classDetailData.description}</p>

      {/* Equipments */}
      <div className='grid grid-cols-2 justify-items-start items-center gap-y-1 mt-4'>
        {classDetailData.equipments?.map((equipment, index) => (
          <EquipmentItem key={index} itemTitle={equipment} />
        ))}
      </div>

      {/* Benefits */}
      <div className='grid grid-cols-2 justify-items-start items-center gap-y-1 mt-4'>
        {classDetailData.benefits?.map((benefit, index) => (
          <BenefitItem key={index} benefit={benefit} />
        ))}
      </div>
    </div>
  )
}

export default ClassSpec

const getSvgByKey = (key: string) => {
  console.log('key in getting svg: ', key)
  switch (key) {
    case 'level':
      return <ChartBarSvg width='16' height='16' color='#4D5260' />
    case 'intensity':
      return <SpeedoMeterSvg width='16' height='16' color='#4D5260' />
    case 'Session Count':
      return <MonitorSvg width='16' height='16' color='#4D5260' />
    case 'Duration per session':
      return <ClockSvg width='16' height='16' color='#4D5260' />
    case 'Calorie per session':
      return <FireSvg width='16' height='16' color='#4D5260' />
    default:
      return <>1234</>
  }
}

const getBgColorByKey = (key: string) => {
  switch (key) {
    case 'level':
      return 'bg-blue'
    case 'intensity':
      return 'bg-yellow'
    case 'Session Count':
      return 'bg-green'
    case 'Duration per session':
      return 'bg-stroke'
    case 'Calorie per session':
      return 'bg-red-20'
    default:
      return ''
  }
}

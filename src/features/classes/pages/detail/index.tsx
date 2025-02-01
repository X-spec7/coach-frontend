import { classDetailData } from '../dummy'
import ClassSpec from './ClassSpec'
import Exercises from './Exercises'
import ClassSession from './ClassSession'

const ClassDetail = () => {
  return (
    <div className='flex w-full justify-start items-start gap-4'>
      {/* Left */}
      <ClassSpec classDetailData={classDetailData} />

      {/* Right */}
      <div className='flex w-[calc(33.3%)] flex-col gap-4'>
        <Exercises exercises={classDetailData.exercises} />
        <ClassSession />
      </div>
    </div>
  )
}

export default ClassDetail

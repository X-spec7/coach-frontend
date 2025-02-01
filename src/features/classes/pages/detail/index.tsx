import { classDetailData } from '../dummy'
import ClassSpec from './ClassSpec'
import Exercises from './Exercises'
import ClassSession from './ClassSession'

const ClassDetail = () => {
  return (
    <div className='flex justify-start items-start w-full'>
      <ClassSpec classDetailData={classDetailData} />
      <div className='flex flex-1 flex-col gap-4'>
        <Exercises exercises={classDetailData.exercises} />
        <ClassSession />
      </div>
    </div>
  )
}

export default ClassDetail

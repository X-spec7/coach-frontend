import Profile from './Profile'
import MySchedule from './MySchedule'
import RecentActivity from './RecentActivity'
import { Calendar } from '@/shared/components'

const profileDummyData = {
  fullname: 'Mario Rossi',
  level: 'Advanced',
  number: 14750,
  weight: 75,
  height: 175,
  age: 29,
}

const RightSideBar = () => {
  return (
    <div className='flex flex-col gap-5 px-3.5 pt-4 pb-4.5 w-85 bg-white rounded-4xl'>
      <Profile
        fullname={profileDummyData.fullname}
        level={profileDummyData.level}
        number={profileDummyData.number}
        weight={profileDummyData.weight}
        height={profileDummyData.height}
        age={profileDummyData.age}
      />
      <Calendar />
      <MySchedule />
      <RecentActivity />
    </div>
  )
}

export default RightSideBar

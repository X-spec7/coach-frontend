import WorkoutActivityPanel from './workout-acitivity'
import CaloriesStatistics from './calories-statistics'
import WorkoutGoalsPanel from './workout-goals'
import GoalsListPanel from './goals-list'
import HealthScorePanel from './health-score'
import WeightDataPanel from './weight-data'

const StatisticsContent = () => {
  return (
    <div className='grid grid-cols-2 gap-4 w-full'>
      <div className='grid grid-cols-1 xl:grid-cols-2 gap-4 h-full'>
        <div className='flex flex-col gap-4'>
          <HealthScorePanel percent={70} tag='Very Healthy' />
          <WeightDataPanel />
        </div>

        <div className='flex flex-col gap-5 justify-start items-center'>
          <WorkoutGoalsPanel />
          <GoalsListPanel />
        </div>
      </div>

      <div className='flex flex-col gap-4 bg-white h-full'>
        <WorkoutActivityPanel />
        <CaloriesStatistics />
      </div>
    </div>
  )
}

export default StatisticsContent

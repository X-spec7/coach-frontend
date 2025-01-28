import ContentHeader from './content-header'
import StatisticsContent from './content'

import { useRoleGuard } from '@/shared/hooks/useRoleGuard'

const StatisticsPage = () => {

  useRoleGuard('Client')
  
  return (
      <div className='flex flex-col gap-4 p-4 rounded-4xl bg-white'>
        <ContentHeader workoutTime={{hour: 12, minute: 35}} totalWorkouts={14} />
        <StatisticsContent />
      </div>
  )
}

export default StatisticsPage

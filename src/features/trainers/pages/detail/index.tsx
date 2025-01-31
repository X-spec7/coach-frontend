import { ICoachDetail } from '@/shared/types'
import TrainerProfile from './profile'
import TrainingActivity from './TrainingActivity'
import TrainerSchedule from './TrainerSchedule'
import Reviews from './Reviews'

interface TrainerDetailPageProps {
  coach: ICoachDetail
}

const TrainerDetailPage: React.FC<TrainerDetailPageProps> = ({ coach }) => {

  if (coach === undefined) {
    return (
      <div>No Trainer Found</div>
    )
  }

  return (
    <div className='flex justify-center gap-4'>
      <TrainerProfile coach={coach}/>

      <div className='flex flex-[3] flex-col gap-4'>
        <TrainingActivity />
        <TrainerSchedule />
        <Reviews reviews={coach.reviews} />
      </div>
    </div>
  )
}

export default TrainerDetailPage

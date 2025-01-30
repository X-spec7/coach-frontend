import Link from 'next/link'

import trainersService from '../../service/trainers.service'
import TrainerCard from './TrainerCard'

interface ITrainersListProps {
  query: string
  specialization: string
  currentPage: number
}

const TrainersList: React.FC<ITrainersListProps> = async ({
  query,
  currentPage,
  specialization
}) => {

  const response = await trainersService.getTrainers({
    limit: 15,
    offset: (currentPage - 1) * 15,
    query,
    specialization,
  })
  const trainers = response.trainers

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-y-4 justify-content-between justify-items-center align-items-center w-full min-h-150'>
      {
        trainers.map((trainer, index) => (
          // TODO: update url param in future
          <Link href={`/trainers/detail/${trainer.trainerId}`} key={index}>
            <TrainerCard key={index} trainer={trainer} />
          </Link>
        ))
      }
    </div>
  )
}

export default TrainersList

import Link from 'next/link'

import trainersService from '../../service/trainers.service'
import TrainerCard from './TrainerCard'

interface ITrainersListProps {
  query: string
  expertise: string
  currentPage: number
}

const TrainersList: React.FC<ITrainersListProps> = async ({
  query,
  currentPage,
  expertise
}) => {
  const response = await trainersService.getTrainers({
    pageSize: 15,
    pageNum: currentPage,
    query: query,
    expertise: expertise
  })
  const trainers = response.trainers

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-y-4 justify-content-between justify-items-center align-items-center w-full min-h-150'>
      {
        trainers.map((trainer, index) => (
          // TODO: update url param in future
          <Link href={`/trainers/detail/1`} key={index}>
            <TrainerCard key={index} trainer={trainer} />
          </Link>
        ))
      }
    </div>
  )
}

export default TrainersList

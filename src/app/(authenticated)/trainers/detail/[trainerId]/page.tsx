import { trainersService } from '@/features/trainers/service'
import TrainerDetailPage from '@/features/trainers/pages/detail'
import { Suspense } from 'react'
import { Loader } from '@/shared/components'

interface Params {
  params: {
    trainerId: string
  }
}

export async function generateMetadata({params: { trainerId }}: Params) {
  const response = await trainersService.getTrainerById({ trainerId })
  const trainer = response?.trainer
  
  return {
    title: trainer ? `${trainer.name}'s Profile` : 'Trainer Profile',
    description: `Details about ${trainer?.name || 'this trainer'}.`,
  }
}

const TrainerDetail = async ({params: { trainerId }}: Params) => {

  const response = await trainersService.getTrainerById({ trainerId })

  // TODO: add response error handling
  const trainer = response?.trainer

  // TODO: replace skeleton
  if (trainer === null || trainer === undefined) {
    return <Loader />
  }
  
  return (
    <TrainerDetailPage trainer={trainer} />
  )
}

export default TrainerDetail

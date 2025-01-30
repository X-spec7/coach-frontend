import { trainersService } from '@/features/trainers/service'
import TrainerDetailPage from '@/features/trainers/pages/detail'
import { Suspense } from 'react'
import { Loader } from '@/shared/components'

interface Params {
  params: {
    trainerId: number
  }
}

export async function generateMetadata({params: { trainerId }}: Params) {
  const response = await trainersService.getTrainerById({ trainerId })
  const coach = response?.coach
  
  return {
    title: coach ? `${coach.fullName}'s Profile` : 'Trainer Profile',
    description: `Details about ${coach?.fullName || 'this trainer'}.`,
  }
}

const TrainerDetail = async ({params: { trainerId }}: Params) => {

  const response = await trainersService.getTrainerById({ trainerId })

  // TODO: add response error handling
  const coach = response?.coach

  // TODO: replace skeleton
  if (coach === null || coach === undefined) {
    return <Loader />
  }
  
  return (
    <TrainerDetailPage coach={coach} />
  )
}

export default TrainerDetail

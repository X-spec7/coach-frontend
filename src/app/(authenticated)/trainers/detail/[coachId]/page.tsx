'use client'

import { useEffect, useState } from 'react'
import { trainersService } from '@/features/coaches/service'
import TrainerDetailPage from '@/features/coaches/pages/detail'
import { Loader } from '@/shared/components'
import { ICoachDetail } from '@/shared/types'
import { useParams } from 'next/navigation'

// TODO!: Restore this after implement cookie-based authentication
// export async function generateMetadata({params: { coachId }}: Params) {
//   const response = await trainersService.getCoachById({ coachId })
//   const coach = response?.coach
  
//   return {
//     title: coach ? `${coach.fullName}'s Profile` : 'Trainer Profile',
//     description: `Details about ${coach?.fullName || 'this trainer'}.`,
//   }
// }

// TODO!: Turn this into async and implement suspension after implement cookie-based authentication

const TrainerDetail = () => {
  const params = useParams()
  const coachId = params?.coachId

  console.log('coach id from params: ', coachId)

  const [coach, setCoach] = useState<ICoachDetail>()

  useEffect(() => {
    const getTrainer = async (coachId: number) => {
      const response = await trainersService.getCoachById({ coachId })

      if (response.status === 200) {
        setCoach(response.coach)
      } else {
        alert('Something went wrong')
        console.log('Error when getting trainer: ', response.message)
      }
    }

    getTrainer(Number(coachId))
  }, [coachId])

  // TODO: replace skeleton
  if (coach === null || coach === undefined) {
    return <Loader />
  }
  
  return (
    <TrainerDetailPage coach={coach} />
  )
}

export default TrainerDetail

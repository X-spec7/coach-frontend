'use client'

import Link from 'next/link'

import trainersService from '../../service/trainers.service'
import CoachCard from './CoachCard'
import { ICoachCard } from '../../types'
import { useEffect, useState } from 'react'

interface ITrainersListProps {
  query: string
  specialization: string
  currentPage: number
}

const TrainersList: React.FC<ITrainersListProps> = ({
  query,
  currentPage,
  specialization
}) => {
  const [coaches, setCoaches] = useState<ICoachCard[]>([])

  useEffect(() => {
    const getCoaches = async () => {
      const response = await trainersService.getCoaches({
        limit: 15,
        offset: (currentPage - 1) * 15,
        query,
        specialization,
      })

      if (response.status === 200) {
        setCoaches(response.coaches)
      } else {
        alert('Sth went wrong when getting coaches')
      }
    }

    getCoaches()
  }, [currentPage, query, specialization])

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-y-4 justify-content-between justify-items-center align-items-center w-full min-h-150'>
      {
        coaches.map((coach, index) => (
          <Link href={`/trainers/detail/${coach.id}`} key={index}>
            <CoachCard key={index} coach={coach} />
          </Link>
        ))
      }
    </div>
  )
}

export default TrainersList

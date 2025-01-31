'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import trainersService from '../../service/trainers.service'
import CoachCard from './CoachCard'
import { ICoachCard } from '../../types'
import { useAuth } from '@/shared/provider'
import { DefaultModal } from '@/shared/components'

interface ICoachesListProps {
  query: string
  specialization: string
  currentPage: number
  listed: string
}

const CoachesList: React.FC<ICoachesListProps> = ({
  query,
  currentPage,
  specialization,
  listed
}) => {
  const { user } = useAuth()
  const router = useRouter()

  const [coaches, setCoaches] = useState<ICoachCard[]>([])
  const [showModal, setShowModal] = useState<boolean>(false)
  const [selectedCoach, setSelectedCoach] = useState<ICoachCard | null>(null)
  const [isToggling, setIsToggling] = useState<boolean>(false)

  const getCoaches = async () => {
    const response = await trainersService.getCoaches({
      limit: 15,
      offset: (currentPage - 1) * 15,
      query,
      specialization,
      listed
    })

    if (response.status === 200) {
      setCoaches(response.coaches)
    } else {
      alert('Sth went wrong when getting coaches')
    }
  }

  useEffect(() => {
    getCoaches()
  }, [currentPage, query, specialization])

  const handleCoachCardClicked = (coach: ICoachCard) => {
    if (user?.isSuperuser) {
      setSelectedCoach(coach)
      setShowModal(true)
    } else {
      router.push(`/trainers/detail/${coach.id}`)
    }
  }

  const toggleCoachListing = async () => {
    if (user?.isSuperuser && selectedCoach) {
      setIsToggling(true)
      try {
        const response = await trainersService.toggleCoachListedState({coachId: selectedCoach?.id})
        
        if (response.status === 200) {
          getCoaches()
        } else {
          alert('Something went wrong')
          console.log('Error when toggling coach listed state: ', response.message)
        }
      } catch (error) {
        console.log('Error when toggling coach listed state: ', error)
        console.log('')
      } finally {
        setIsToggling(false)
      }
    }
  }

  return (
    <div className='relative grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-y-4 justify-content-between justify-items-center align-items-center w-full min-h-150'>
      {
        coaches.map((coach, index) => (
          <div className='cursor-pointer' onClick={() => handleCoachCardClicked(coach)}>
            <CoachCard key={index} coach={coach} />
          </div>
        ))
      }
      {
        showModal && selectedCoach && (
          <DefaultModal onClose={() => setShowModal(false)}>
            <div className='p-4 flex flex-col gap-4'>
              <p className='text-lg text-gray-700'>
                {selectedCoach.listed
                  ? "This coach is currently listed. Do you want to unlist them?"
                  : "This coach is currently unlisted. Do you want to list them?"}
              </p>
              <div className='flex justify-end gap-4'>
                <button
                  onClick={toggleCoachListing}
                  disabled={isToggling}
                  className={`px-4 py-2 rounded text-white font-medium ${selectedCoach.listed ? 'bg-red-30 hover:bg-red-500' : 'bg-blue-500 hover:bg-blue-600'
                    }`}
                >
                  {selectedCoach.listed ? "Unlist" : "List"}
                </button>
                <Link href={`/trainers/detail/${selectedCoach.id}`}>
                  <button className='px-4 py-2 bg-green-dark text-black rounded hover:bg-green'>
                    See Detail
                  </button>
                </Link>
              </div>
            </div>
          </DefaultModal>
        )
      }
    </div>
  )
}

export default CoachesList

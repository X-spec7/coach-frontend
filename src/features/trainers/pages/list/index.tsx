'use client'

import { Pagination } from '@/shared/components'
import ContentHeader from './content-header'
import TrainersList from './CoachesList'
import { trainersService } from '../../service'
import { useEffect, useState } from 'react'

const countPerPage = 15

interface ICoachesPageProps {
  query: string
  currentPage: number
  specialization: string
}

const CoachesPage: React.FC<ICoachesPageProps> = ({ query, specialization, currentPage}) => {
  const [totalCoachesCount, setTotalCoachesCount] = useState<number>(0)

  useEffect(() => {
    const getTotalCoachesCount = async () => {
      const response = await trainersService.getTotalCoachesCount({
        query,
        specialization,
        listedState: "All"
      })
      setTotalCoachesCount(response.totalCount)
    }
    getTotalCoachesCount()
  }, [query, specialization])

  return (
    <div className='flex flex-col p-4 gap-4 bg-white rounded-4xl'>
      <ContentHeader searchPlaceHolder={query} />

      {/* <!-- MAIN CONTENT --> */}
      <TrainersList
        query={query}
        specialization={specialization}
        currentPage={currentPage}
      />

      <Pagination
        countPerPage={countPerPage}
        totalCounts={totalCoachesCount}
      />
    </div>
  )
}

export default CoachesPage

'use client'

import { Pagination } from '@/shared/components'
import ContentHeader from './content-header'
import CoachesList from './CoachesList'
import { trainersService } from '../../service'
import { useEffect, useState } from 'react'

const countPerPage = 15

interface ICoachesPageProps {
  query: string
  currentPage: number
  specialization: string
  listed: string
}

const CoachesPage: React.FC<ICoachesPageProps> = ({
  query,
  specialization,
  currentPage,
  listed,
}) => {
  const [totalCoachesCount, setTotalCoachesCount] = useState<number>(0)

  useEffect(() => {
    const getTotalCoachesCount = async () => {
      const response = await trainersService.getTotalCoachesCount({
        query,
        specialization,
        listed: listed.toLowerCase()
      })
      setTotalCoachesCount(response.totalCount)
    }
    getTotalCoachesCount()
  }, [query, specialization])

  return (
    <div className='flex flex-col p-4 gap-4 bg-white rounded-4xl'>
      <ContentHeader
        searchPlaceHolder={query}
        dropdownDefaultValue={specialization}
        listOptionDefaultValue={listed}
      />

      {/* <!-- MAIN CONTENT --> */}
      <CoachesList
        query={query}
        specialization={specialization}
        currentPage={currentPage}
        listed={listed}
      />

      <Pagination
        countPerPage={countPerPage}
        totalCounts={totalCoachesCount}
      />
    </div>
  )
}

export default CoachesPage

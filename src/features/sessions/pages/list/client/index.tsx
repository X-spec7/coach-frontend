import React, { useEffect, useState } from 'react'

import { Pagination, Loader } from '@/shared/components'
import ContentHeader from './ContentHeader'
import SessionsList from './SessionsList'
import { clientSessionService } from '@/features/sessions/service'

const countPerPage = 15

interface IClientSessionListPageProps {
  query: string
  currentPage: number
  goal: string
  booked?: boolean
}

const ClientSessionsListPage: React.FC<IClientSessionListPageProps> = ({
  query,
  currentPage,
  goal,
  booked
}) => {
  const [totalSessionCount, setTotalSessionCount] = useState<number>(0)

  useEffect(() => {
    const getTotalSessionCount = async () => {
      const response = await clientSessionService.getTotalSessionCount({
        goal: goal,
        query: query,
      })
      setTotalSessionCount(response.totalSessionCount)
    }
    getTotalSessionCount()
  }, [query, goal])

  return (
    <div className='flex flex-col p-4 gap-4 bg-white rounded-4xl'>
      <ContentHeader searchPlaceHolder={query} />

      {/* <!-- MAIN CONTENT --> */}
      <SessionsList
        query={query}
        goal={goal}
        currentPage={currentPage}
      />

      <Pagination
        countPerPage={countPerPage}
        totalCounts={totalSessionCount}
      />
    </div>
  )
}

export default ClientSessionsListPage

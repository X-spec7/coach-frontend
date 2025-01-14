import React, { Suspense } from 'react'

import { Pagination, Loader } from '@/shared/components'
import ContentHeader from './ContentHeader'
import SessionsList from './SessionsList'
import { clientSessionService } from '@/features/sessions/service'

const countPerPage = 15

interface IClientSessionListPageProps {
  query: string
  currentPage: number
  goal: string
  mySessions: boolean
}

const ClientSessionsListPage: React.FC<IClientSessionListPageProps> = async ({
  query,
  currentPage,
  goal,
  mySessions
}) => {
  const response = await clientSessionService.getTotalSessionCount({
    limit: 15,
    offset: ( currentPage - 1) * 15,
    goal: goal,
    query: query,
  })

  return (
    <div className='flex flex-col p-4 gap-4 bg-white rounded-4xl'>
      <ContentHeader searchPlaceHolder={query} />

      {/* <!-- MAIN CONTENT --> */}
      <Suspense fallback={<Loader />}>
        <SessionsList
          query={query}
          goal={goal}
          currentPage={currentPage}
        />
      </Suspense>

      <Pagination
        countPerPage={countPerPage}
        totalCounts={response.totalSessionCount}
      />
    </div>
  )
}

export default ClientSessionsListPage

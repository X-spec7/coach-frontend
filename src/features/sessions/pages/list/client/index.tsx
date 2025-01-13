import React, { Suspense } from 'react'

import { Pagination, Loader } from '@/shared/components'
import ContentHeader from './ContentHeader'
import SessionsList from './SessionsList'

const countPerPage = 15

interface IClientSessionListPageProps {
  query: string
  currentPage: number
  level: string
  mySessions: boolean
}

const ClientSessionsListPage: React.FC<IClientSessionListPageProps> = async ({
  query,
  currentPage,
  level,
  mySessions
}) => {
  const response = await sessionService.getTotalSessionsCount({ query })
  return (
    <div className='flex flex-col p-4 gap-4 bg-white rounded-4xl'>
      <ContentHeader searchPlaceHolder={query} />

      {/* <!-- MAIN CONTENT --> */}
      <Suspense fallback={<Loader />}>
        <SessionsList
          query={query}
          level={level}
          currentPage={currentPage}
        />
      </Suspense>

      <Pagination
        countPerPage={countPerPage}
        totalCounts={response.totalCount}
      />
    </div>
  )
}

export default ClientSessionsListPage

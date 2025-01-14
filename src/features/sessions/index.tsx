'use client'

import React from 'react'
import { useSelector } from 'react-redux'
import { useSearchParams } from 'next/navigation'

import { selectUser } from '../user/slice/userSlice'
import ClientSessionsListPage from './pages/list/client'
import CoachSessionsListPage from './pages/list/coach'
import SharedLayout from '@/shared/Layouts/SharedLayout'

interface ISessionsListPageProps {
  query: string
  currentPage: number
  goal: string
  booked: boolean
}

const SessionsListPage:React.FC = () => {
  const user = useSelector(selectUser)
  
  const searchParams = useSearchParams()
  const query = searchParams.get('query') || ''
  const currentPage = Number(searchParams.get('currentPage')) || 1
  const goal = searchParams.get('goal') || ''
  const booked = !!searchParams.get('booked')

  if (user.userType === 'Client') {
    return (
      <SharedLayout
        headerTitle='Sessions Page'
        headerDescription='Book and Join Session here'
      >
        <ClientSessionsListPage
          query={query}
          currentPage={currentPage}
          goal={goal}
          booked={booked}
        />
      </SharedLayout>
    )
  } else {
    return (
      <SharedLayout
        headerTitle='Coach Sessions Page'
        headerDescription='Create, Edit, and Join Session'
      >
        <CoachSessionsListPage
          query={query}
          currentPage={currentPage}
        />
      </SharedLayout>
    )
  }
}

export default SessionsListPage

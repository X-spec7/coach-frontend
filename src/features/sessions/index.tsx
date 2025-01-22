'use client'

import React from 'react'
import { useSearchParams } from 'next/navigation'

import ClientSessionsListPage from './pages/list/client'
import CoachSessionsListPage from './pages/list/coach'
import SharedLayout from '@/shared/Layouts/SharedLayout'
import { useAuth } from '@/shared/provider'

const SessionsListPage:React.FC = () => {
  
  const searchParams = useSearchParams()
  const query = searchParams.get('query') || ''
  const currentPage = Number(searchParams.get('currentPage')) || 1
  const goal = searchParams.get('goal') || ''
  const booked = !!searchParams.get('booked')

  const { user } = useAuth()

  // Assertion is fine cause it is checked in Layout
  if (user!.userType === 'Client') {
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

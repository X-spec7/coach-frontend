'use client'

import React from 'react'
import { selectUser } from '../user/slice/userSlice'
import { useSelector } from 'react-redux'

import ClientSessionsListPage from './client/pages/list'
import CoachSessionsListPage from './coach/pages/list'
import SharedLayout from '@/shared/Layouts/SharedLayout'

const SessionsListPage = () => {
  const user = useSelector(selectUser)

  if (user.userType === 'Client') {
    return (
      <SharedLayout
        headerTitle='Sessions Page'
        headerDescription='Find Session to book'
      >
        <ClientSessionsListPage />
      </SharedLayout>
    )
  } else {
    return <CoachSessionsListPage />
  }
}

export default SessionsListPage

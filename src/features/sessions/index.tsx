'use client'

import React from 'react'
import { selectUser } from '../user/slice/userSlice'
import { useSelector } from 'react-redux'

import ClientSessionsListPage from './client/pages/list'
import CoachSessionsListPage from './coach/pages/list'

const SessionsPage = () => {
  const user = useSelector(selectUser)

  if (user.userType === 'Coach') {
    return <CoachSessionsListPage />
  } else {
    return <ClientSessionsListPage />
  }

}

export default SessionsPage

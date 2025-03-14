'use client'

import { useAuth } from '@/shared/provider'

import ClientSchedulePage from './client'
import CoachSchedulePage from './coach'

const SchedulePage = () => {
  const { user } = useAuth()

  if (user?.userType === "Coach") {
    return (
      <CoachSchedulePage />
    )
  }
  return (
    <ClientSchedulePage />
  )
}

export default SchedulePage

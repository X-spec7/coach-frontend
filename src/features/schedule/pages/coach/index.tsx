'use client'

import { useCallback, useEffect, useState } from 'react'

import { coachSessionService } from '@/features/sessions/service'
import ContentHeader from './ContentHeader'
import Content from './Content'
import { ISession } from '@/shared/types'
import { GetMySessionsRequestDTO } from '@/features/sessions/types'

import { sessionsWithoutBookedDummyData } from '@/dev/dummy-data/sessions'

const CoachSchedulePage = () => {
  const [sessions, setSessions] = useState<ISession[]>([])

  const fetchSessionData = useCallback(async () => {
    const getMySessionsParam: GetMySessionsRequestDTO = {
      limit: 100,
      offset: 0,
    }

    try {
      const response = await coachSessionService.getMySessions(getMySessionsParam)

      if (response.status === 200) {
        const sessions = response.sessions
        setSessions(sessions)
      } else {
        console.log('Error while fetching sessions: ', response.message)
      }
    } catch (error) {
      console.log('Error fetching sessions: ', error)
    }

  }, [coachSessionService])

  useEffect(() => {
    fetchSessionData()
  }, [])
  
  return (
    <div className='flex flex-col gap-4 items-center justify-center w-full h-full bg-white rounded-20 px-4 pt-4 pb-28'>
      <ContentHeader />
      {/* TODO: Replace with action sessions data after checking UI */}
      <Content sessions={sessionsWithoutBookedDummyData} />
    </div>
  )
}

export default CoachSchedulePage

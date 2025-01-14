'use client'

import Link from 'next/link'
import SessionCard from './SessionCard'
import { clientSessionService } from '@/features/sessions/service'
import { useEffect, useState } from 'react'
import { ISession } from '@/features/sessions/types'

interface ISessionsListProps {
  query: string
  goal: string
  currentPage: number
}

const SessionsList: React.FC<ISessionsListProps> = ({
  query,
  goal,
  currentPage
}) => {
  const [sessions, setSessions] = useState<ISession[]>([])

  useEffect(() => {
    const getSessionsData = async () => {
      const response = await clientSessionService.getSessions({
        limit: 15,
        offset: (currentPage - 1) * 15,
        query: query,
        goal: goal,
      })
      const sessions = response.sessions
      setSessions(sessions)
    }
    getSessionsData()
  }, [currentPage, query, goal])

  const onSessionCardClicked = () => {

  }

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-y-4 justify-content-between justify-items-center align-items-center w-full min-h-150'>
      {
        sessions.map((session, index) => (
          // TODO: update url param in future
          // <Link href={`/sessions/detail/1`} key={index}>
          //   <SessionCard key={index} session={session} />
          // </Link>
          <div key={index} onClick={onSessionCardClicked} className='cursor-pointer'>
            <SessionCard session={session} />
          </div>
        ))
      }
    </div>
  )
}

export default SessionsList

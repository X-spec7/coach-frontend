'use client'

import SessionCard from './SessionCard'
import sharedSessionService, { clientSessionService, coachSessionService } from '@/features/sessions/service'
import { useEffect, useState } from 'react'
import { ISession, ISessionWithBookedStatus } from '@/features/sessions/types'
import { formatTimeToDisplay } from '@/shared/utils/format'

interface ISessionsListProps {
  query: string
  currentPage: number
}

const Modal: React.FC<{ onClose: () => void; children: React.ReactNode }> = ({ onClose, children }) => {
  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50'>
      <div className='relative bg-white p-6 rounded shadow-lg w-full max-w-md'>
        <button className='absolute top-2  right-4 text-3xl text-gray-500 hover:text-gray-700' onClick={onClose}>
          &times;
        </button>
        {children}
      </div>
    </div>
  )
}

const SessionsList: React.FC<ISessionsListProps> = ({
  query,
  currentPage
}) => {
  const [sessions, setSessions] = useState<ISession[]>([])
  const [selectedSession, setSelectedSession] = useState<ISession | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  
  const onSessionCardClicked = (session: ISession) => {
    setSelectedSession(session)
    setIsModalOpen(true)
  }

  const handleJoin = async () => {
    if (selectedSession) {
      const response = await sharedSessionService.joinSession({sessionId: selectedSession.id.toString()})
      const zoom_url = response.zoom_url
      if (zoom_url) {
        window.open(zoom_url, '_blank', 'noopener,noreferrer');
      }
    }
    setIsModalOpen(false)
  }

  useEffect(() => {
    const getSessionsData = async () => {
      const response = await coachSessionService.getMySessions({
        limit: 15,
        offset: (currentPage - 1) * 15,
        query: query,
      })
      const sessions = response.sessions
      setSessions(sessions)
    }
    getSessionsData()
  }, [currentPage, query])

  return (
    <div className='relative grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-y-4 justify-content-between justify-items-center align-items-center w-full min-h-150'>
      {
        sessions.map((session, index) => (
          // TODO: update url param in future
          // <Link href={`/sessions/detail/1`} key={index}>
          //   <SessionCard key={index} session={session} />
          // </Link>
          <div key={index} onClick={() => {onSessionCardClicked(session)}} className='cursor-pointer max-h-80'>
            <SessionCard session={session} />
          </div>
        ))
      }
      {isModalOpen && selectedSession && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <div className='p-4'>
            <h2 className='text-xl text-center font-bold mb-2'>
              Join this session
            </h2>
            <p className='mb-8 text-center text-gray-30'>
              {formatTimeToDisplay(selectedSession.startDate)}
            </p>
            <div className='flex justify-center gap-5'>
              <button
                onClick={handleJoin}
                className='w-40 py-2 bg-green-500 text-white rounded hover:bg-green-600'
              >
                Join
              </button>
            <button
              onClick={() => setIsModalOpen(false)}
              className='w-40 py-2 bg-gray-300 rounded hover:bg-gray-400'
            >
              Edit
            </button>
            </div>
          </div>
        </Modal>
      )}

    </div>
  )
}

export default SessionsList

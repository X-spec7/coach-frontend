'use client'

import SessionCard from './SessionCard'
import sharedSessionService, { clientSessionService } from '@/features/sessions/service'
import { useEffect, useState } from 'react'
import { ISessionWithBookedStatus } from '@/features/sessions/types'

interface ISessionsListProps {
  query: string
  goal: string
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
  goal,
  currentPage
}) => {
  const [sessions, setSessions] = useState<ISessionWithBookedStatus[]>([])
  const [selectedSession, setSelectedSession] = useState<ISessionWithBookedStatus | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

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
  
  const onSessionCardClicked = (session: ISessionWithBookedStatus) => {
    setSelectedSession(session)
    setIsModalOpen(true)
  }

  const handleBook = async () => {
    if (selectedSession) {
      await clientSessionService.bookSession({sessionId: selectedSession.id.toString()})
      await getSessionsData()
    }
    setIsModalOpen(false)
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
    getSessionsData()
  }, [currentPage, query, goal])

  return (
    <div className='relative grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-y-4 justify-content-between justify-items-center align-items-center w-full min-h-150 overflow-y-auto'>
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
            <h2 className='text-xl font-bold mb-4'>
              {selectedSession.booked ? 'Join this session' : 'Book this session'}
            </h2>
            <p className='mb-4'>
              {selectedSession.booked
                ? 'You have already booked this session. Would you like to join?'
                : 'This session is not booked yet. Would you like to book it?'}
            </p>
            <div className='flex justify-end gap-2'>
              {!selectedSession.booked && (
                <button
                  onClick={handleBook}
                  className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600'
                >
                  Book
                </button>
              )}
              {selectedSession.booked && (
                <button
                  onClick={handleJoin}
                  className='px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600'
                >
                  Join
                </button>
              )}
              <button
                onClick={() => setIsModalOpen(false)}
                className='px-4 py-2 bg-gray-300 rounded hover:bg-gray-400'
              >
                Cancel
              </button>
            </div>
          </div>
        </Modal>
      )}

    </div>
  )
}

export default SessionsList

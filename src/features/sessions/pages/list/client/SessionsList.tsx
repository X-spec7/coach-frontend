import Link from 'next/link'
import SessionCard from './SessionCard'
import { clientSessionService } from '@/features/sessions/service'

interface ISessionsListProps {
  query: string
  goal: string
  currentPage: number
}

const SessionsList: React.FC<ISessionsListProps> = async ({
  query,
  goal,
  currentPage
}) => {
  const response = await clientSessionService.getSessions({
    limit: 15,
    offset: (currentPage - 1) * 15,
    query: query,
    goal: goal,
  })
  const sessions = response.sessions

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-y-4 justify-content-between justify-items-center align-items-center w-full min-h-150'>
      {
        sessions.map((session, index) => (
          // TODO: update url param in future
          <Link href={`/sessions/detail/1`} key={index}>
            <SessionCard key={index} session={session} />
          </Link>
        ))
      }
    </div>
  )
}

export default SessionsList

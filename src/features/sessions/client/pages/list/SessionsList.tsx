import Link from 'next/link'
import SessionCard from './SessionCard'

interface ISessionsListProps {
  query: string
  level: string
  currentPage: number
}

const SessionsList: React.FC<ISessionsListProps> = async ({
  query,
  level,
  currentPage
}) => {
  const response = sessionService.getSessions({
    pageSize: 15,
    pageNum: currentPage,
    query: query,
    level: level,
    mySessions: false
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

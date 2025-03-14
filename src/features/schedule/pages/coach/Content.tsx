import { Calendar } from '@/shared/components'
import { ISession } from '@/shared/types'
import SessionItem from './SessionItem'

interface IContentProps {
  sessions: ISession[]
}

const Content: React.FC<IContentProps> = ({ sessions }) => {

  return (
    <div className='flex justify-start items-start w-full p-4 gap-16 bg-white rounded-4xl max-h-90'>
      <div className='w-100 h-100 pt-4'>
        <Calendar />
      </div>

      <div className='flex flex-1 flex-col gap-2 h-full overflow-y-auto no-scrollbar'>
        <h3 className='text-black font-medium'>The Trainer Schedule</h3>

        {sessions.map((session, index) => (
          <SessionItem key={index} session={session} />
        ))}
      </div>
    </div>
  )
}

export default Content

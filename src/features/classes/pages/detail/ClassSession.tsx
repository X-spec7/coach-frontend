import { TitleWithEllipsis } from '@/shared/components'

const ClassSession = () => {
  return (
    <div className='flex flex-col bg-white rounded-4xl gap-4 p-4'>
      <TitleWithEllipsis title='Session' />
      <div className='flex justify-center items-center py-8'>No Sessions yet</div>
    </div>
  )
}

export default ClassSession

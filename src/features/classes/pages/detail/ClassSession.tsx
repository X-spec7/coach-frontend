import { TitleWithEllipsis } from '@/shared/components'

const ClassSession = () => {
  return (
    <div className='flex flex-col bg-white rounded-4xl gap-4 p-4'>
      <TitleWithEllipsis title='Session' />
      <div className='flex justify-center items-center py-20'>This class has no sessions !</div>
    </div>
  )
}

export default ClassSession

'use client'

import { IClass } from '@/shared/types'
import { TitleWithEllipsis } from '@/shared/components'
import { BarbellSvg, ClockSvg } from '@/shared/components/Svg'
import { formatTimeToDisplay } from '@/shared/utils/format'

interface IClassSessionProps {
  classData: IClass
  onClassSessionClicked: (classSessionId: number) => void
}

const ClassSession: React.FC<IClassSessionProps> = ({
  classData,
  onClassSessionClicked
}) => {
  return (
    <div className='flex flex-col bg-white rounded-4xl gap-4 p-4'>
      <TitleWithEllipsis title='Session' />
      {!classData.sessions && (
        <div className='flex justify-center items-center py-20'>This class has no sessions !</div>
      )}
      {classData.sessions && (
        classData.sessions.map((session, index) => (
          <div
            key={index}
            className='flex items-center justify-start gap-4 w-full h-24 p-4 bg-blue rounded-20'
            onClick={() => {
              if (session.id) {
                onClassSessionClicked(session.id)
              } else {
                alert('This session has not id field.')
              }
            }}
          >
            <div className='flex items-center justify-center w-10 h-10 bg-blue-subtle rounded-2xl'>
              <BarbellSvg
                width='20'
                height='20'
                color='#212738'
              />
            </div>

            <div className='flex flex-1 flex-col items-start gap-2 justify-start'>
              <h3 className='text-base font-medium text-black'>{session.title}</h3>
              <p className='text-xs text-gray-30 line-clamp-3 break-words'>{session.description}</p>
              <div className='w-full h-0.5 bg-white' />
              <div className='flex items-center justify-start gap-1'>
                <ClockSvg width='14' height='14' color='#878A94' />
                <p className='text-xs text-gray-30'>{formatTimeToDisplay(session.startDate)}</p>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  )
}

export default ClassSession

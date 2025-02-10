'use client'

import { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

import ClassSpec from './ClassSpec'
import Exercises from './Exercises'
import ClassSession from './ClassSession'
import JoinClassSessionModal from './JoinClassSessionModal'
import { classService } from '../../services'

import { IClass } from '@/shared/types'
import { Loader } from '@/shared/components'
import { DefaultModal } from '@/shared/components'
import { useAuth } from '@/shared/provider'

interface IClassDetailProps {
  classId: number
}

const ClassDetail: React.FC<IClassDetailProps> = ({ classId }) => {
  const router = useRouter()
  const { user } = useAuth()

  if (!classId) {router.push('/classes')}

  const [classData, setClassData] = useState<IClass | null>(null)
  const [classSessionIdToJoin, setClassSessionIdToJoin] = useState<number | null>(null)

  const [showClassSessionJoinModal, setShowClassSessionJoinModal] = useState<boolean>(false)

  const fetchClassData = useCallback(async () => {
    try {
      const response = await classService.getClassById({ classId })

      if (response.status !== 200) {
        alert('An error occured while fetching class data')
        console.log('Error while fetching class data: ', response.message)
      } else {
        setClassData(response.class)
      }
    } catch (error) {
      alert('An error occured while fetching class data')
      console.log('Error while fetching class data: ', error)
      router.push('/classes')
    }
  }, [classId, classService])

  const startClassSession = useCallback(async () => {
    try {
      if (classSessionIdToJoin) {
        const response = await classService.getClassSessionStartUrl({classSessionId: classSessionIdToJoin})

        if (response.status === 200) {
          window.open(response.startUrl, '_blank', 'noopener,noreferrer')
        } else {
          alert('An error occured while fetching class session start url')
          console.log('error while fetching class session start url: ', response.message)
        }
      } else {
        alert('You need select a session to join')
      }
    } catch (error) {
      alert('An error occured while fetching class session start url')
      console.log('error while fetching class session start url: ', error)
    }
  }, [classSessionIdToJoin, classService])

  const joinClassSession = useCallback(async () => {
    try {
      if (classSessionIdToJoin) {
        const response = await classService.getClassSessionJoinUrl({classSessionId: classSessionIdToJoin})

        if (response.status === 200) {
          window.open(response.joinUrl, '_blank', 'noopener,noreferrer')
        } else {
          alert('An error occured while fetching class session join url')
          console.log('error while fetching class session join url: ', response.message)
        }
      } else {
        alert('You need select a session to join')
      }
    } catch (error) {
      alert('An error occured while fetching class session join url')
      console.log('error while fetching class session join url: ', error)
    }
  }, [classSessionIdToJoin, classService])

  useEffect(() => {
    fetchClassData()
  }, [classId])

  if (classData === null) {
    return <Loader />
  }

  return (
    <div className='relative flex w-full justify-start items-start gap-4'>
      {/* Left */}
      <ClassSpec
        classDetailData={classData}
        bookClassCallback={setClassData}
      />

      {/* Right */}
      <div className='flex w-[calc(33.3%)] flex-col gap-4'>
        <Exercises exercises={classData.exercises} />
        <ClassSession
          classData={classData}
          onClassSessionClicked={(classSessionId: number) => {
            setClassSessionIdToJoin(classSessionId)
            setShowClassSessionJoinModal(true)
          }}
        />
      </div>

      {/* Join Class Session Modal */}
      {showClassSessionJoinModal && (
        <DefaultModal onClose={() => setShowClassSessionJoinModal(false)}>
          <JoinClassSessionModal
            onClose={() => setShowClassSessionJoinModal(false)}
            startClassSession={startClassSession}
            joinClassSession={joinClassSession}
          />
        </DefaultModal>
      )}
    </div>
  )
}

export default ClassDetail

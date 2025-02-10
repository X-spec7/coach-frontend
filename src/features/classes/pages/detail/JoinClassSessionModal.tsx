'use client'

import { useAuth } from '@/shared/provider'
import React, { useState } from 'react'

interface IJoinClassSessionModalProps {
  onClose: () => void
  startClassSession: () => Promise<void>
  joinClassSession: () => Promise<void>
}

const JoinClassSessionModal: React.FC<IJoinClassSessionModalProps> = ({
  onClose,
  startClassSession,
  joinClassSession,
}) => {
  const { user } = useAuth()

  const [loading, setLoading] = useState<boolean>(false)

  const handleJoin = async () => {
    setLoading(true)
    const isStart = user?.userType === 'Coach'
    if (isStart) {
      await startClassSession()
    } else {
      await joinClassSession()
    }

    setLoading(false)
  }

  const text = user?.userType === 'Coach' ? 'Click Start to start the session!' : 'Click Join to join the session!'
  const buttonText = user?.userType === 'Coach' ? 'Start' : 'Join'

  return (
    <div className='p-4'>
      <h2 className='text-black text-lg font-medium text-center'>{text}</h2>
      <div className='flex items-center justify-center gap-6 mt-12'>
        <button
          type="button"
          onClick={onClose}
          disabled={loading}
          className="px-10 py-2 bg-gray-300 hover:bg-gray-400 text-gray-700 rounded-lg"
        >
          Cancel
        </button>
        <button
          type='button'
          className="px-10 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg"
          disabled={loading}
          onClick={handleJoin}
        >
          {buttonText}
        </button>
      </div>
    </div>
  )
}

export default JoinClassSessionModal

import React from 'react'
import Image from 'next/image'
import { useCall } from '@/shared/provider'

const CallModal = () => {
  const { callStatus, meetingInfo, endCall, acceptCall } = useCall()

  if (callStatus === 'Idle') {
    return null // Don't render anything when idle
  }

  if (meetingInfo === null) {
    alert('Meeting Info invalid, please check it again')
    return null
  }

  const isOutgoing = callStatus === 'Outgoing'
  const isIncoming = callStatus === 'Incoming'

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg p-6 w-96 text-center relative">
        {/* Avatar */}
        <div className="flex justify-center mb-4">
          <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-gray-200">
            <Image
              src={meetingInfo.otherPersonAvatarUrl}
              alt={meetingInfo.otherPersonName}
              width={96}
              height={96}
            />
          </div>
        </div>
        {/* Name */}
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          {meetingInfo.otherPersonName}
        </h2>
        <p className="text-gray-500 text-sm mb-6">
          {isIncoming ? 'Incoming Call' : 'Calling...'}
        </p>
        {/* Buttons */}
        {isIncoming && (
          <div className="flex justify-around">
            <button
              onClick={endCall}
              className="bg-red-600 text-white px-4 py-2 rounded-full shadow hover:bg-red-700"
            >
              Decline
            </button>
            <button
              onClick={acceptCall}
              className="bg-green-600 text-white px-4 py-2 rounded-full shadow hover:bg-green-700"
            >
              Accept
            </button>
          </div>
        )}
        {isOutgoing && (
          <button
            onClick={endCall}
            className="bg-red-600 text-white px-4 py-2 rounded-full shadow hover:bg-red-700 w-full"
          >
            Cancel Call
          </button>
        )}
      </div>
    </div>
  )
}

export default CallModal

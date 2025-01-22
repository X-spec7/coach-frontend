import React from 'react'
import Image from 'next/image'
import { useCall } from '@/shared/provider'
import { useWebSocket } from '@/shared/provider'

const CallModal = () => {
  const { callStatus, callInfo, endCall, acceptCall } = useCall()
  const websocketService = useWebSocket()

  const handleCancelCall = () => {
    const payload = {
      otherPersonId: callInfo?.otherPersonId
    }
    websocketService.sendMessage('cancle_call', payload)
    endCall()
  }

  const handleAcceptCall = () => {
    const payload = {
      otherPersonId: callInfo?.otherPersonId
    }
    websocketService.sendMessage('accept_call', payload)
    acceptCall()
  }

  const handleDeclineCall = () => {
    const payload = {
      otherPersonId: callInfo?.otherPersonId
    }
    websocketService.sendMessage('decline_call', payload)
    endCall()
  }

  if (callStatus === 'Idle') {
    return null // Don't render anything when idle
  }

  if (callInfo === null) {
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
              src={callInfo.otherPersonAvatarUrl}
              alt={callInfo.otherPersonName}
              width={96}
              height={96}
            />
          </div>
        </div>
        {/* Name */}
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          {callInfo.otherPersonName}
        </h2>
        <p className="text-gray-500 text-sm mb-6">
          {isIncoming ? 'Incoming Call' : 'Calling...'}
        </p>
        {/* Buttons */}
        {isIncoming && (
          <div className="flex justify-around">
            <button
              onClick={handleDeclineCall}
              className="bg-red-600 text-white px-4 py-2 rounded-full shadow hover:bg-red-700"
            >
              Decline
            </button>
            <button
              onClick={handleAcceptCall}
              className="bg-green-600 text-white px-4 py-2 rounded-full shadow hover:bg-green-700"
            >
              Accept
            </button>
          </div>
        )}
        {isOutgoing && (
          <button
            onClick={handleCancelCall}
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

'use client'
import { useCallback, useEffect } from 'react'

import Sidebar from '@/shared/Layouts/Sidebar'
import { CallModal } from '../components'
import { useCall, useWebSocket } from '../provider'

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { setIncomingCallInfo, endCall, callStatus, callInfo } = useCall()
  const websocketService = useWebSocket()

  // <------------ REGISTER WEBSOCKET HANDLERS -------------->
  // <------------ CALL WEBSOCKET HANDLERS -------------->
  const handleIncomingCall = useCallback((data: any) => {
    if (callStatus === 'Idle') {
      if (data.callInfo) {
        setIncomingCallInfo(data.callInfo)
      } 
    } else {
      const payload = {
        otherPersonId: data.callInfo.otherPersonId
      }
      websocketService.sendMessage('busy', payload)
    }
  }, [setIncomingCallInfo])

  useEffect(() => {
    websocketService.registerOnMessageHandler('incoming_call', handleIncomingCall)
    // Currently accept calls endCall
    websocketService.registerOnMessageHandler('accept_call', endCall)
    websocketService.registerOnMessageHandler('call_cancelled', endCall)
    websocketService.registerOnMessageHandler('call_declined', endCall)
    websocketService.registerOnMessageHandler('busy', endCall)

    return () => {
      websocketService.unRegisterOnMessageHandler('incoming_call', handleIncomingCall)
      websocketService.unRegisterOnMessageHandler('accept_call', endCall)
      websocketService.unRegisterOnMessageHandler('call_cancelled', endCall)
      websocketService.unRegisterOnMessageHandler('call_declined', endCall)
      websocketService.unRegisterOnMessageHandler('busy', endCall)
    }
  }, [handleIncomingCall, endCall])

  return (
    <>
      <div className='relative flex w-full min-h-screen bg-gray-bg'>
        {/* <!-- ===== Sidebar Start ===== --> */}
        <Sidebar />
        {/* <!-- ===== Sidebar End ===== --> */}

        {/* <!-- ===== Content Area Start ===== --> */}
        <div className='relative flex-1'>

          {/* <main className='h-[calc(100%-32px)]'> */}
          <main className='h-full'>
            <div className='mx-auto h-full'>
              {children}
            </div>
          </main>
        </div>
        {/* <!-- ===== Content Area End ===== --> */}

        {/* <!-- ===== Call Dialog ===== --> */}
        <CallModal />
      </div>
    </>
  )
}

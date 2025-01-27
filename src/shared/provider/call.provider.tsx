'use client'

import { useReducer, useMemo, createContext, useContext, useCallback } from 'react'
import { ILayoutProps } from '../types'
import { ICallInfo } from '../types'

type CallStatus = 'Idle' | 'Incoming' | 'Outgoing' | 'Busy' | 'Accepted'

interface State {
  // unreadMessageCount: number
  callStatus: CallStatus
  callInfo: ICallInfo | null
}

const initialState: State = {
  // unreadMessageCount: 0,
  callStatus: 'Idle',
  callInfo: null,
}

type Action = 
  | { type: 'OUTGOING_CALL', payload: ICallInfo }
  | { type: 'INCOMING_CALL', payload: ICallInfo }
  | { type: 'RESET_CALL_INFO' }
  | { type: 'CALL_ACCEPTED' }

function callReducer(state: State, action: Action): State {
  switch (action.type) {
    case 'OUTGOING_CALL':
      return { callStatus: 'Outgoing', callInfo: action.payload }
    case 'INCOMING_CALL':
      return { callStatus: 'Incoming', callInfo: action.payload }
    // use for canceling, rejecting
    case 'RESET_CALL_INFO':
      return { callStatus: 'Idle', callInfo: null}
    // set to idle because of the impossibility of detecting ending call cause the app is using external zoom service
    // call status just reflects app's status, not user's status
    case 'CALL_ACCEPTED':
      return { callStatus: 'Accepted', callInfo: state.callInfo}
  }  
}

interface CallContextType extends State {
  setIncomingCallInfo: (callInfo: ICallInfo) => void
  setOutgoingCallInfo: (callInfo: ICallInfo) => void
  endCall: () => void
  acceptCall: () => void
  handleCallAccepted: () => void
}

const CallContext = createContext<CallContextType | undefined>(undefined)

export const CallProvider: React.FC<ILayoutProps> =({ children }) => {
  const [state, dispatch] = useReducer(callReducer, initialState)

  const setIncomingCallInfo = (callInfo: ICallInfo) => {
    console.log('INCOMING CALL')
    dispatch({ type: 'INCOMING_CALL', payload: callInfo})
  }
  const setOutgoingCallInfo = (callInfo: ICallInfo) => {
    console.log('OUT GOING CALL')
    dispatch({ type: 'OUTGOING_CALL', payload: callInfo})
  }
  const endCall = () => {
    console.log('END CALL')
    dispatch({ type: 'RESET_CALL_INFO' })
  }
  const acceptCall = useCallback(() => {
    if (state.callInfo?.meetingLink && state.callInfo?.meetingLink !== '') {
      console.log('open new zoom meeting', state.callInfo?.meetingLink)
      window.open(state.callInfo?.meetingLink, '_blank', 'noopener,noreferrer')
    } else {
      alert('meeting link invalid')
    }
    dispatch({ type: 'RESET_CALL_INFO' })
  }, [state.callInfo])

  const handleCallAccepted = useCallback(() => {
    dispatch({ type: 'CALL_ACCEPTED' })
  }, [])

  const joinCall = useCallback(() => {
    if (state.callInfo?.meetingLink && state.callInfo?.meetingLink !== '') {
      console.log('open new zoom meeting', state.callInfo?.meetingLink)
      window.open(state.callInfo?.meetingLink, '_blank', 'noopener,noreferrer')
    } else {
      alert('meeting link invalid')
    }
    dispatch({ type: 'RESET_CALL_INFO' })
  }, [state.callInfo])

  const value = useMemo(() => ({
    ...state,
    setIncomingCallInfo,
    setOutgoingCallInfo,
    endCall,
    acceptCall,
    handleCallAccepted,
  }), [state, acceptCall, handleCallAccepted])

  return <CallContext.Provider value={value}>{children}</CallContext.Provider>
}

export const useCall = (): CallContextType => {
  const context = useContext(CallContext)

  if(!context) {
    throw new Error('useCall must be used within an CallProvider')
  }
  return context
}

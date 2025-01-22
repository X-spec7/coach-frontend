'use client'

import { useReducer, useMemo, createContext, useContext } from 'react'
import { ILayoutProps } from '../types'

type CallStatus = 'Idle' | 'Incoming' | 'Outgoing' | 'Busy'

interface State {
  // unreadMessageCount: number
  // isSidebarOpen: boolean
  callStatus: CallStatus
  meetingInfo: IMeetingInfo | null
}

const initialState: State = {
  // unreadMessageCount: 0,
  // isSidebarOpen: false,
  callStatus: 'Idle',
  meetingInfo: null,
}

interface IMeetingInfo {
  meetingLink: string
  otherPersonName: string
  otherPersonAvatarUrl: string
}

type Action = 
  | { type: 'OUTGOING_CALL', payload: IMeetingInfo }
  | { type: 'INCOMING_CALL', payload: IMeetingInfo }
  | { type: 'CALL_ENDED' }
  | { type: 'CALL_REJECTED' }
  | { type: 'CALL_ACCEPTED' }

function callReducer(state: State, action: Action): State {
  switch (action.type) {
    case 'OUTGOING_CALL':
      return { callStatus: 'Outgoing', meetingInfo: action.payload }
    case 'INCOMING_CALL':
      return { callStatus: 'Incoming', meetingInfo: action.payload }
    // TODO: check if this case can exist
    case 'CALL_ENDED':
      return { callStatus: 'Idle', meetingInfo: null}
    case 'CALL_REJECTED':
      return { callStatus: 'Idle', meetingInfo: null}
    // set to idle because of the impossibility of detecting ending call cause the app is using external zoom service
    // call status just reflects app's status, not user's status
    case 'CALL_ACCEPTED':
      return { callStatus: 'Idle', meetingInfo: null}
  }  
}

interface CallContextType extends State {
  incomingCall: (meetingInfo: IMeetingInfo) => void
  outgoingCall: (meetingInfo: IMeetingInfo) => void
  callRejected: () => void
  callAccepted: () => void
}

const CallContext = createContext<CallContextType | undefined>(undefined)

export const CallProvider: React.FC<ILayoutProps> =({ children }) => {
  const [state, dispatch] = useReducer(callReducer, initialState)

  const incomingCall = (meetingInfo: IMeetingInfo) => {
    dispatch({ type: 'INCOMING_CALL', payload: meetingInfo})
  }
  const outgoingCall = (meetingInfo: IMeetingInfo) => {
    dispatch({ type: 'OUTGOING_CALL', payload: meetingInfo})
  }
  const callRejected = () => {
    dispatch({ type: 'CALL_REJECTED' })
  }
  const callAccepted = () => {
    dispatch({ type: 'CALL_ACCEPTED' })
  }

  const value = useMemo(() => ({
    ...state,
    incomingCall,
    outgoingCall,
    callRejected,
    callAccepted,
  }), [state])

  return <CallContext.Provider value={value}>{children}</CallContext.Provider>
}

export const useCall = (): CallContextType => {
  const context = useContext(CallContext)

  if(!context) {
    throw new Error('useCall must be used within an CallProvider')
  }
  return context
}

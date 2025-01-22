'use client'

import { useReducer, useMemo, createContext, useContext } from 'react'
import { ILayoutProps } from '../types'
import { ICallInfo } from '../types'

type CallStatus = 'Idle' | 'Incoming' | 'Outgoing' | 'Busy'

interface State {
  // unreadMessageCount: number
  // isSidebarOpen: boolean
  callStatus: CallStatus
  callInfo: ICallInfo | null
}

const initialState: State = {
  // unreadMessageCount: 0,
  // isSidebarOpen: false,
  callStatus: 'Idle',
  callInfo: null,
}

type Action = 
  | { type: 'OUTGOING_CALL', payload: ICallInfo }
  | { type: 'INCOMING_CALL', payload: ICallInfo }
  | { type: 'CALL_ENDED' }
  | { type: 'CALL_ACCEPTED' }

function callReducer(state: State, action: Action): State {
  switch (action.type) {
    case 'OUTGOING_CALL':
      return { callStatus: 'Outgoing', callInfo: action.payload }
    case 'INCOMING_CALL':
      return { callStatus: 'Incoming', callInfo: action.payload }
    // use for canceling, rejecting
    case 'CALL_ENDED':
      return { callStatus: 'Idle', callInfo: null}
    // set to idle because of the impossibility of detecting ending call cause the app is using external zoom service
    // call status just reflects app's status, not user's status
    case 'CALL_ACCEPTED':
      return { callStatus: 'Idle', callInfo: null}
  }  
}

interface CallContextType extends State {
  setIncomingCallInfo: (callInfo: ICallInfo) => void
  setOutgoingCallInfo: (callInfo: ICallInfo) => void
  endCall: () => void
  acceptCall: () => void
}

const CallContext = createContext<CallContextType | undefined>(undefined)

export const CallProvider: React.FC<ILayoutProps> =({ children }) => {
  const [state, dispatch] = useReducer(callReducer, initialState)

  const setIncomingCallInfo = (callInfo: ICallInfo) => {
    dispatch({ type: 'INCOMING_CALL', payload: callInfo})
  }
  const setOutgoingCallInfo = (callInfo: ICallInfo) => {
    dispatch({ type: 'OUTGOING_CALL', payload: callInfo})
  }
  const endCall = () => {
    dispatch({ type: 'CALL_ENDED' })
  }
  const acceptCall = () => {
    dispatch({ type: 'CALL_ACCEPTED' })
  }

  const value = useMemo(() => ({
    ...state,
    setIncomingCallInfo,
    setOutgoingCallInfo,
    endCall,
    acceptCall,
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

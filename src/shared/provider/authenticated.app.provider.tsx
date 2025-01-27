'use client'

import { GlobalAppStateProvider } from './global.provider'
import { WebSocketProvider } from './websocket.provider'
import { CallProvider } from './call.provider'
import { useAuth } from './auth.provider'

import { ILayoutProps } from '../types'

const AuthenticatedAppProvider: React.FC<ILayoutProps> = ({ children }) => {
  const { user } = useAuth()
  
  return (
    // Assertion is safe because it is checked in parent component: Layout
    <WebSocketProvider userId={user!.id}>
      <CallProvider>
        <GlobalAppStateProvider>
          {children}
        </GlobalAppStateProvider>
      </CallProvider>
    </WebSocketProvider>
  )
}

export default AuthenticatedAppProvider

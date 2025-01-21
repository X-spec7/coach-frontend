'use client'

import React, { createContext, useContext, useEffect } from 'react'
import { websocketService } from '../services/websocket.service'

const WebSocketContext = createContext<typeof websocketService | null>(null)

interface IWebSocketProvider {
  userId: number
  children: React.ReactNode
}

export const WebSocketProvider: React.FC<IWebSocketProvider> = ({ userId, children }) => {
  useEffect(() => {
    websocketService.connect(userId)

    return () => {
      websocketService.disconnect()
    }
  }, [userId])

  return (
    <WebSocketContext.Provider value={websocketService}>
      {children}
    </WebSocketContext.Provider>
  )
}

export const useWebSocket = () => {
  const context = useContext(WebSocketContext)
  if (!context) {
    throw new Error('useWebSocket must be used within a WebSocketProvider')
  }
  return context
}

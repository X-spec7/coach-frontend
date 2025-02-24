'use client'

import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react'
import { IMessage } from '../types'
import { meetingService, messageService } from '../service'
import { useWebSocket, useAuth, useCall } from '@/shared/provider'
import { useChatUsersContext } from './chatusers.provider'

interface IChatContext {
  messages: IMessage[]
  setMessages: React.Dispatch<React.SetStateAction<IMessage[]>>
  getInitialData: () => Promise<void>
  getMoreData: () => Promise<void>
  fetchMessages: (isFirstFetching: boolean) => Promise<void>
  otherPersonName: string
  otherPersonAvatarUrl: string
  sendMessage: (message: string) => void
  startCall: () => void
  isLoadingMoreRef: React.MutableRefObject<boolean>
  hasMoreRef: React.MutableRefObject<boolean>
}

const ChatContext = createContext<IChatContext | undefined>(undefined)

export const ChatProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const websocketService = useWebSocket()
  const { user } = useAuth()
  const { setOutgoingCallInfo } = useCall()
  const { fetchContacts, currentChatUserId, contactUsers } = useChatUsersContext()

  const [messages, setMessages] = useState<IMessage[]>([])
  const [otherPersonName, setOtherPersonName] = useState('')
  const [otherPersonAvatarUrl, setOtherPersonAvatarUrl] = useState('')

  const offsetRef = useRef<number>(0)
  const hasMoreRef = useRef<boolean>(false)
  const isLoadingMoreRef = useRef<boolean>(false)
  const limit = 25

  const fetchMessages = useCallback(async (
    isFirstFetching: boolean
  ) => {
    if (!currentChatUserId || isLoadingMoreRef.current) return
    
    isLoadingMoreRef.current = true
    if (isFirstFetching) offsetRef.current = 0

    try {
      const response = await messageService.getMessagesByUserId({
        otherPersonId: currentChatUserId,
        offset: offsetRef.current,
        limit,
      })

      if (response.status === 200) {
        if (isFirstFetching) {
          setMessages(response.data.messages)
        } else {
          setMessages((prev) => [...prev, ...response.data.messages])
        }
        setOtherPersonAvatarUrl(response.data.otherPersonAvatarUrl)
        setOtherPersonName(response.data.otherPersonFullname)

        hasMoreRef.current = (offsetRef.current + response.data.messages.length < response.data.totalMessageCount)
        offsetRef.current = offsetRef.current + response.data.messages.length
      } else {
        alert(`Sth went wrong while fetching messages: ${response.message}`)
      }
    } catch (error) {
      alert(`Sth went wrong while fetching messages: ${error}`)
    } finally {
      isLoadingMoreRef.current = false
    }
  }, [currentChatUserId])

  const getInitialData = useCallback(async () => {
    if (!currentChatUserId) return

    const response = await messageService.getMessagesByUserId({
      otherPersonId: currentChatUserId,
      offset: offsetRef.current,
      limit,
    })

    setMessages(response.data.messages)
    setOtherPersonName(response.data.otherPersonFullname)
    setOtherPersonAvatarUrl(response.data.otherPersonAvatarUrl)
    hasMoreRef.current = response.data.messages.length < response.data.totalMessageCount
    offsetRef.current = response.data.messages.length

    const currentChatUser = contactUsers.find(user => user.id === currentChatUserId)
    if (currentChatUser?.unreadCount) {
      const res = await messageService.markMessagesAsRead({
        otherPersonId: currentChatUserId,
      })
      if (res.status === 200) {
        fetchContacts()
      }
    }
  }, [currentChatUserId])

  const getMoreData = useCallback(async () => {
    if (!currentChatUserId || isLoadingMoreRef.current) return

    isLoadingMoreRef.current = true

    try {
      const response = await messageService.getMessagesByUserId({
        otherPersonId: currentChatUserId,
        offset: offsetRef.current,
        limit,
      })

      if (response.status === 200) {
        setMessages((prev) => [...prev, ...response.data.messages])
        setOtherPersonAvatarUrl(response.data.otherPersonAvatarUrl)
        setOtherPersonName(response.data.otherPersonFullname)

        hasMoreRef.current = (offsetRef.current + response.data.messages.length < response.data.totalMessageCount)
        offsetRef.current = offsetRef.current + response.data.messages.length
      } else {
        alert(`Sth went wrong while fetching messages: ${response.message}`)
      }
    } catch (error) {
      alert(`Sth went wrong while fetching messages: ${error}`)
    } finally {
      isLoadingMoreRef.current = false
    }
  }, [currentChatUserId])

  const sendMessage = (message: string) => {
    if (websocketService.connectionStatus === 'OPEN') {
      websocketService.sendMessage('send_message', {
        recipient_id: currentChatUserId,
        message,
      })
    } else {
      alert('WebSocket is disconnected. Please check your connection.')
    }
  }

  const startCall = async () => {
    const response = await meetingService.createMeeting()
    if (response.status === 201) {
      const outgoingCallInfo = {
        otherPersonId: currentChatUserId!,
        meetingLink: response.startUrl,
        otherPersonName,
        otherPersonAvatarUrl,
      }
      setOutgoingCallInfo(outgoingCallInfo)
      websocketService.sendMessage('initiate_call', {
        otherPersonId: currentChatUserId!,
        meetingLink: response.joinUrl,
        otherPersonAvatarUrl: user!.avatarImageUrl ?? '',
        otherPersonName: `${user!.firstName} ${user!.lastName}`,
      })
    } else {
      alert('Failed to create meeting, please try again')
    }
  }

  return (
    <ChatContext.Provider value={{
      messages,
      setMessages,
      getInitialData,
      getMoreData,
      fetchMessages,
      otherPersonName,
      otherPersonAvatarUrl,
      sendMessage,
      startCall,
      isLoadingMoreRef,
      hasMoreRef,
    }}>
      {children}
    </ChatContext.Provider>
  )
}

export const useChat = () => {
  const context = useContext(ChatContext)
  if (!context) {
    throw new Error('useChat must be used within a ChatProvider')
  }
  return context
}

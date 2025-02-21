'use client'

import { useSearchParams } from 'next/navigation'
import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback
} from 'react'

import { contactService } from '../service'
import { useAuth, useWebSocket } from '@/shared/provider'
import {
  SearchUserRequestDTO,
  IContactUser,
  ISearchedUser
} from '../types'

const USERS_PER_PAGE = 25

interface MessagesContextType {
  contactUsers: IContactUser[]
  searchedUsers: ISearchedUser[]
  currentChatUserId?: number
  setCurrentChatUserId: (userId: number) => void
  fetchContacts: () => Promise<void>
  handleSearch: () => Promise<void>
}

const MessagesContext = createContext<MessagesContextType | undefined>(undefined)

export const MessagesContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const searchParams = useSearchParams()
  const query: string | null = searchParams.get('query')
  const page: string | null = searchParams.get('page')

  const { user } = useAuth()
  const websocketService = useWebSocket()

  const [contactUsers, setContactUsers] = useState<IContactUser[]>([])
  const [searchedUsers, setSearchedUsers] = useState<ISearchedUser[]>([])
  const [currentChatUserId, setCurrentChatUserId] = useState<number | undefined>(undefined)

  // Fetch contacts
  const fetchContacts = useCallback(async () => {
    const response = await contactService.getContacts()
    setContactUsers(response.contacts)
    setSearchedUsers([])
  }, [])

  // Search users
  const handleSearch = useCallback(async () => {
    const currentPage = page ? parseInt(page, 10) : 1
    const offset = (currentPage - 1) * USERS_PER_PAGE

    const payload: SearchUserRequestDTO = {
      query: query as string,
      limit: USERS_PER_PAGE,
      offset: offset
    }

    const response = await contactService.searchUsers(payload)

    if (user?.id) {
      const filteredUsers = response.users.filter(u => u.id !== user.id)
      setSearchedUsers(filteredUsers)
      setContactUsers([])
    }
  }, [page, query, user])

  // Fetch contacts or search based on query
  useEffect(() => {
    if (query && query.trim() !== '') {
      handleSearch()
    } else {
      fetchContacts()
    }
  }, [query, page])

  // Handle WebSocket messages
  const handleMessageReceivedFromNewChatUser = useCallback((data: any) => {
    if (searchedUsers.length > 0) return

    const senderId = data?.message?.senderId
    if (senderId && !contactUsers.some(user => user.id === senderId)) {
      fetchContacts()
    }
  }, [searchedUsers, fetchContacts])

  useEffect(() => {
    websocketService.unRegisterOnMessageHandler('chat', handleMessageReceivedFromNewChatUser)
    websocketService.registerOnMessageHandler('chat', handleMessageReceivedFromNewChatUser)

    return () => {
      websocketService.unRegisterOnMessageHandler('chat', handleMessageReceivedFromNewChatUser)
    }
  }, [handleMessageReceivedFromNewChatUser])

  return (
    <MessagesContext.Provider
      value={{
        contactUsers,
        searchedUsers,
        currentChatUserId,
        setCurrentChatUserId,
        fetchContacts,
        handleSearch
      }}
    >
      {children}
    </MessagesContext.Provider>
  )
}

// Custom hook for using the context
export const useMessagesContext = () => {
  const context = useContext(MessagesContext)
  if (!context) {
    throw new Error('useMessagesContext must be used within a UsersProvider')
  }
  return context
}

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

interface ChatUsersContextType {
  contactUsers: IContactUser[]
  searchedUsers: ISearchedUser[]
  currentChatUserId?: number
  setCurrentChatUserId: (userId: number) => void
  fetchContacts: () => Promise<void>
  handleSearch: () => Promise<void>
}

const ChatUsersContext = createContext<ChatUsersContextType | undefined>(undefined)

export const ChatUsersContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const searchParams = useSearchParams()
  const query: string | null = searchParams.get('query')
  const page: string | null = searchParams.get('page')

  const { user } = useAuth()

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

  return (
    <ChatUsersContext.Provider
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
    </ChatUsersContext.Provider>
  )
}

// Custom hook for using the context
export const useChatUsersContext = () => {
  const context = useContext(ChatUsersContext)
  if (!context) {
    throw new Error('useChatUsersContext must be used within a UsersProvider')
  }
  return context
}

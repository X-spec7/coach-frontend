'use client'

import Image from 'next/image'
import { useCallback, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'

import { SearchField } from '@/shared/components'
import { BACKEND_HOST_URL } from '@/shared/constants'
import { useWebSocket } from '@/shared/provider'
import { IContactUser, IMessage } from '../types'
import { useChatUsersContext } from '../providers/chatusers.provider'
import { get12HourTimeFromDateObject, getDateFromDateObject } from '@/shared/utils'

interface IUsers {
  isShow: boolean
}

const Users: React.FC<IUsers> = ({ isShow }) => {
  const searchParams = useSearchParams()
  const query: string | null = searchParams.get('query')
  const page: string | null = searchParams.get('page')

  const websocketService = useWebSocket()

  const {
    contactUsers,
    setContactUsers,
    searchedUsers,
    currentChatUserId,
    setCurrentChatUserId,
    fetchContacts,
    handleSearch,
  } = useChatUsersContext()

  useEffect(() => {
    if (query && query.trim() !== '') {
      handleSearch()
    } else {
      fetchContacts()
    }
  }, [query, page])

  const { todayUsers, yesterdayUsers, restUsers } = groupUsersByDate(contactUsers)

  // <------------- HANDLE SOCKET ------------->
  // TODO: Stay up to date with unread count, and last messages using socket instead of fetching data
  const handleMessageReceivedInUsersTab = useCallback((data: any) => {
    if (searchedUsers.length > 0) return
  
    const senderId = data?.message?.senderId
    if (!senderId) return
  
    if (!contactUsers.some(user => user.id === Number(senderId))) {
      fetchContacts()
    } else if (Number(senderId) === currentChatUserId) {
      const lastMessage: IMessage = {
        ...data.message,
        isRead: true,
      }

      setContactUsers((prevContacts) =>
        prevContacts.map((user) =>
          user.id === Number(senderId)
            ? { ...user, lastMessage }
            : user
        )
      )
    } else {
      console.log('last message check: ', data.message)
      setContactUsers((prevContacts) =>
        prevContacts.map((user) =>
          user.id === Number(senderId)
            ? { ...user, lastMessage: data.message, unreadCount: user.unreadCount + 1 }
            : user
        )
      )
    }
  }, [
    searchedUsers,
    fetchContacts,
    contactUsers,
    currentChatUserId,
    setContactUsers
  ]);

  useEffect(() => {
    websocketService.unRegisterOnMessageHandler('chat', handleMessageReceivedInUsersTab)
    websocketService.registerOnMessageHandler('chat', handleMessageReceivedInUsersTab)

    return () => {
      websocketService.unRegisterOnMessageHandler('chat', handleMessageReceivedInUsersTab)
    }
  }, [handleMessageReceivedInUsersTab])

  return (
    <div className='flex flex-col gap-4'>
      <SearchField
        width='w-full'
        height='h-14'
        value={query || ''}
        placeholder={'Search name to chat with'}
      />

      {searchedUsers.length === 0 ? (
        <div className='flex flex-col gap-4 overflow-y-auto no-scrollbar'>
          {todayUsers.length > 0 && (
            <div className='flex flex-col gap-4'>
              <h3 className='text-black text-sm font-medium'>Today</h3>
              <div className='flex flex-col rounded-20 border-stroke border'>
                {todayUsers.map((user, index) => (
                  <div key={index} className='w-full'>
                    <UserItem
                      key={index}
                      user={user}
                      isSelected={user.id === currentChatUserId}
                      isTodayOrYesterday
                      onClick={() => setCurrentChatUserId(user.id)}
                    />
                    {index < todayUsers.length - 1 && (
                      <div className='w-full h-[1px] bg-stroke' />
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
          {yesterdayUsers.length > 0 && (
            <div className='flex flex-col gap-4'>
              <h3 className='text-black text-sm font-medium'>Yesterday</h3>
              <div className='flex flex-col rounded-20 border-stroke border'>
                {yesterdayUsers.map((user, index) => (
                  <div key={index} className='w-full'>
                    <UserItem
                      key={index}
                      user={user}
                      isSelected={user.id === currentChatUserId}
                      isTodayOrYesterday
                      onClick={() => setCurrentChatUserId(user.id)}
                    />
                    {index < yesterdayUsers.length - 1 && (
                      <div className='w-full h-[1px] bg-stroke' />
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
          {restUsers.length > 0 && (
            <div className='flex flex-col gap-4'>
              <h3 className='text-black text-sm font-medium'>The Past</h3>
              <div className='flex flex-col rounded-20 border-stroke border'>
                {restUsers.map((user, index) => (
                  <div key={index} className='w-full'>
                    <UserItem
                      key={index}
                      user={user}
                      isSelected={user.id === currentChatUserId}
                      onClick={() => setCurrentChatUserId(user.id)}
                    />
                    {index < restUsers.length - 1 && (
                      <div className='w-full h-[1px] bg-stroke' />
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className='flex flex-col gap-4 overflow-y-auto no-scrollbar'>
          {searchedUsers.length > 0 && (
            <div className='flex flex-col gap-4'>
              <h3 className='text-black text-sm font-medium'>Searched Result</h3>
              <div className='flex flex-col rounded-20 border-stroke border'>
                {searchedUsers.map((user, index) => (
                  <div key={index} className='w-full'>
                    <UserItem
                      key={index}
                      user={{
                        unreadCount: 0,
                        ...user
                      }}
                      isSelected={user.id === currentChatUserId}
                      onClick={() => setCurrentChatUserId(user.id)}
                    />
                    {index < searchedUsers.length - 1 && (
                      <div className='w-full h-[1px] bg-stroke' />
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default Users

interface IUserItemProps {
  user: IContactUser
  isSelected: boolean
  isTodayOrYesterday?: boolean
  onClick: () => void
}

const UserItem: React.FC<IUserItemProps> = ({
  user,
  isSelected,
  isTodayOrYesterday,
  onClick
}) => {
  const containerStyle = `flex items-center p-4 gap-4 h-18.5 rounded-20 cursor-pointer
    ${isSelected ? 'bg-gray-subtle' : 'bg-white'}
    `

  // !type assertion
  const dateObj = new Date(user?.lastMessage?.sentDate!)

  let time: string = get12HourTimeFromDateObject(dateObj)
  let date: string | null = getDateFromDateObject(user?.lastMessage?.sentDate!)

  return (
    <div className={containerStyle} onClick={onClick}>
      <div className='flex w-10 h-10 rounded-full'>
        {user.avatarUrl ? (
          <Image
            src={BACKEND_HOST_URL + user.avatarUrl}
            width={40}
            height={40}
            alt=''
            className='rounded-full'
          />
        ) : (
          <Image
            src='/images/user/user-01.png'
            width={40}
            height={40}
            alt=''
            className='rounded-full'
          />
        )}
      </div>

      <div className='flex flex-1 flex-col'>
        <div className='flex justify-between items-center w-full'>
          {/* Name and Label */}
          <div className='flex justify-start items-center gap-0.5'>
            <p className='text-black font-medium max-w-22 truncate'>{user.fullName}</p>
            {user.userType === 'Trainer' && (
              <div className='flex justify-center items-center bg-blue w-12 h-5 text-black text-xxs'>Trainer</div>
            )}
          </div>

          {/* Time */}
          {isTodayOrYesterday ? (
            <p className={`text-xxs ${isSelected ? 'text-gray-20' : 'text-black'}`}>{time}</p>
          ) : (
            <p className='text-gray-20 text-xxs'>{date}</p>
          )}
        </div>

        {/* Chat content and unread message */}
        <div className='flex justify-start items-center gap-4'>
          <article className='flex-1 text-xxs max-w-32 max-h-10 overflow-hidden text-gray-30 text-medium truncate'>{user.lastMessage?.content}</article>
          {user?.unreadCount > 0 && (
            <div className='flex justify-center items-center w-5 h-5 rounded-full bg-yellow text-black text-xxs font-medium'>
              {user.unreadCount}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

const groupUsersByDate = (users: IContactUser[]) => {
  const today = new Date()
  const yesterday = new Date()
  yesterday.setDate(today.getDate() - 1)

  const formatDate = (date: Date) => date.toISOString().split('T')[0]

  const todayKey = formatDate(today)
  const yesterdayKey = formatDate(yesterday)

  const todayUsers: IContactUser[] = []
  const yesterdayUsers: IContactUser[] = []
  const restUsers: IContactUser[] = []

  users.forEach((user) => {
    if (user.lastMessage) {
      const sentDateKey = formatDate(new Date(user.lastMessage.sentDate))
      if (sentDateKey === todayKey) {
        todayUsers.push(user)
      } else if (sentDateKey === yesterdayKey) {
        yesterdayUsers.push(user)
      } else {
        restUsers.push(user)
      }
    } else {
      restUsers.push(user)
    }
  })

  return { todayUsers, yesterdayUsers, restUsers }
}

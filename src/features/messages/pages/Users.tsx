'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import Image from 'next/image'

import { SearchField } from '@/shared/components'
import { IContactUser } from '../types'
import { contactService } from '../service'
import { get12HourTimeFromDateObject, getDateFromDateObject } from '@/shared/utils'
import authorizedHttpServer from '@/shared/services/authorizedHttp'
import * as dotenv from 'dotenv'

dotenv.config()

const backendHostUrl = process.env.NEXT_PUBLIC_BACKEND_HOST_URL

interface IUsers {
  isShow: boolean
  currentChatUserId?: string
  setCurrentChatUser: (userId: string) => void
  setSearchResult: (obj: IContactUser[]) => void
}

const Users: React.FC<IUsers> = ({ isShow, setCurrentChatUser, setSearchResult, currentChatUserId }) => {
  const searchParams = useSearchParams()
  const query: string | null = searchParams.get('query')

  const [contactUsers, setContactUsers] = useState<IContactUser[]>([])
  const [nameSearchResultUsers, setNameSearchResultUsers] = useState<IContactUser[]>([])
  // const [chatSearchResultUsers, setChatSearchResultUsers] = useState()

  const onClick = (userId: string) => {
    console.log('setting chat user: ', userId)
    setCurrentChatUser(userId)
  }

  useEffect(() => {
    const getContacts = async () => {
      await authorizedHttpServer.get('/chat/rooms/sidebar-info/')
        .then((res) => {
          setContactUsers(res.data)
        })
    }

    getContacts()
  }, [])

  useEffect(() => {
    const getSearchResult = async () => {
      await authorizedHttpServer.get(`/chat/rooms/search-list/?query=${query}`)
        .then((res) => {
          setNameSearchResultUsers(res.data)
          setSearchResult(res.data)
        })
    }

    getSearchResult()
  }, [searchParams])

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

  const { todayUsers, yesterdayUsers, restUsers } = groupUsersByDate(contactUsers)

  return (
    <div className='flex flex-col gap-4'>
      <SearchField
        width='w-full'
        height='h-14'
        placeholder={query ?? 'Search name, chat, etc'}
      />

      {nameSearchResultUsers.length === 0 ? (
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
                    onClick={() => onClick(user.id)}
                  />
                  {index < todayUsers.length -1 && (
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
                    onClick={() => onClick(user.id)}
                  />
                  {index < yesterdayUsers.length -1 && (
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
                    onClick={() => onClick(user.id)}
                  />
                  {index < restUsers.length -1 && (
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
          {nameSearchResultUsers.length > 0 && (
          <div className='flex flex-col gap-4'>
            <h3 className='text-black text-sm font-medium'>Today</h3>
            <div className='flex flex-col rounded-20 border-stroke border'>
              {nameSearchResultUsers.map((user, index) => (
                <div key={index} className='w-full'>
                  <UserItem
                    key={index}
                    user={user}
                    isSelected={user.id === currentChatUserId}
                    isTodayOrYesterday
                    onClick={() => onClick(user.id)}
                  />
                  {index < nameSearchResultUsers.length -1 && (
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
  const containerStyle = `flex items-center p-4 gap-4 h-18.5 rounded-20
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
            src={backendHostUrl + user.avatarUrl}
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
        <div className='flex justify-between items-center'>
          {/* Name and Label */}
          <div className='flex justify-start items-center gap-0.5'>
            <p className='text-black font-medium'>{user.fullName}</p>
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
          <article className='flex-1 text-xxs text-gray-30 text-medium'>{user.lastMessage?.content}</article>
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

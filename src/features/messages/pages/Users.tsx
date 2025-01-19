'use client'

import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import Image from 'next/image'

import { SearchField } from '@/shared/components'
import { IContactUser } from '../types'
import { contactService } from '../service'
import { get12HourTimeFromDateObject, getDateFromDateObject } from '@/shared/utils'
import authorizedHttpServer from '@/shared/services/authorizedHttp'
import * as dotenv from 'dotenv'
import tokenUtil from '../utils/tokenUtils'
import ApiEndpoints from '../api/apiEndPoints'
import Constants from '../lib/constants'
import { useRouter } from 'next/navigation'
import { format } from 'path'

dotenv.config()

const backendHostUrl = process.env.NEXT_PUBLIC_BACKEND_HOST_URL

interface IUsers {
  isShow: boolean
  currentChatUserId?: string
  onlineUserList: any[]
  setCurrentChatUser: (userId: string) => void
  setSearchResult: (obj: any[]) => void
  setCurrentChattingMember: (obj: any) => void
}

const Users: React.FC<IUsers> = ({ isShow, setCurrentChatUser, setSearchResult, currentChatUserId, onlineUserList, setCurrentChattingMember }) => {
  const searchParams = useSearchParams()
  const query: string | null = searchParams.get('query')

  const [chatUsers, setChatUsers] = useState<any[]>([])
  const [searchUsers, setSearchUsers] = useState<any[]>([])

  const fetchChatUser = async () => {
    const url = ApiEndpoints.USER_CHAT_URL.replace(
      Constants.USER_ID_PLACE_HOLDER,
      tokenUtil.getUserId()
    )

    console.log('fetch chat user url: ', url)
    const chatUserLists = await authorizedHttpServer(url)
      .then((res) => {
        console.log('fetched chat user: ', res)
        return res.data
      })
      .catch((err) => false)

    const formatedChatUser = tokenUtil.getFormatedChatUser(
      chatUserLists,
      onlineUserList
    )

    console.log('formatted chat user: ', formatedChatUser)
    setChatUsers(formatedChatUser)
  }

  useEffect (() => {
    console.log('chat users: ', chatUsers)
    const activeChatUser = chatUsers.find((user: any) => {
      console.log('compare ids: ', user.id, currentChatUserId)
      console.log('compare id types: ', typeof user.id, typeof currentChatUserId)
      return user.id === currentChatUserId
    })

    console.log('activate chat user: ', activeChatUser)

    setCurrentChattingMember(activeChatUser)
  }, [currentChatUserId, chatUsers])

  useEffect(() => {
    const getSearchResult = async () => {
      await authorizedHttpServer.get(`authentication/users/search/?search=${query}`)
        .then((res) => {
          setSearchUsers(res.data)
          setSearchResult(res.data)
        })
    }

    getSearchResult()
  }, [searchParams])

  useEffect(() => {
    console.log('use effect')
    fetchChatUser()
  }, [])

  useEffect(() => {
  }, [chatUsers])

  const addMemberClickHandler = async (memberId: string) => {
    const userId = tokenUtil.getUserId()
    let requestBody = {
      members: [memberId, userId],
      type: "DM",
    }

    await authorizedHttpServer.post('chat/chats/', requestBody)
      .then((res) => `This is success to make a chattroom ${res.data}`)
      .catch((err) => console.log(`this is generating in chatroom ${err}`))
  }

  const onUserItemClicked = async (userId: string) => {

    const isIdIncluded = chatUsers.some(user => user.id === userId)

    console.log('selected user id: ', userId)

    console.log('included? ', isIdIncluded)
    if (!isIdIncluded) {
      console.log('handling not included case')
      try {
        await addMemberClickHandler(userId)
        console.log('room created')

        await fetchChatUser()
        console.log('fetched chat user: ', chatUsers)
      } catch (error) {
        console.log('error in adding room and fetching', error)
      }
    }
    
    console.log('setting current chat user')
    setCurrentChatUser(userId)
  }

  const groupUsersByDate = (users: IContactUser[]) => {
    const today = new Date()
    const yesterday = new Date()
    yesterday.setDate(today.getDate() - 1)

    const formatDate = (date: Date) => date.toISOString().split('T')[0]

    const todayKey = formatDate(today)
    const yesterdayKey = formatDate(yesterday)

    const todayUsers: any[] = []
    const yesterdayUsers: any[] = []
    const restUsers: any[] = []

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

  const { todayUsers, yesterdayUsers, restUsers } = groupUsersByDate(chatUsers)

  return (
    <div className='flex flex-col gap-4'>
      <SearchField
        width='w-full'
        height='h-14'
        placeholder={query ?? 'Search name, chat, etc'}
      />

      {searchUsers.length === 0 ? (
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
                    onClick={() => onUserItemClicked(user.id)}
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
                    onClick={() => onUserItemClicked(user.id)}
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
                    onClick={() => onUserItemClicked(user.id)}
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
          {searchUsers.length > 0 && (
          <div className='flex flex-col gap-4'>
            <h3 className='text-black text-sm font-medium'>Today</h3>
            <div className='flex flex-col rounded-20 border-stroke border'>
              {searchUsers.map((user, index) => (
                <div key={index} className='w-full'>
                  <UserItem
                    key={index}
                    user={user}
                    isSelected={user.id === currentChatUserId}
                    isTodayOrYesterday
                    onClick={() => onUserItemClicked(user.id)}
                  />
                  {index < searchUsers.length -1 && (
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
  user: any
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
  // const dateObj = new Date(user?.lastMessage?.sentDate!)

  // let time: string = get12HourTimeFromDateObject(dateObj)
  // let date: string | null = getDateFromDateObject(user?.lastMessage?.sentDate!)

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
            <p className='text-black font-medium'>{user.name}</p>
            {user.userType === 'Trainer' && (
              <div className='flex justify-center items-center bg-blue w-12 h-5 text-black text-xxs'>Trainer</div>
            )}
          </div>

          {/* Time */}
          {/* {isTodayOrYesterday ? (
            <p className={`text-xxs ${isSelected ? 'text-gray-20' : 'text-black'}`}>{time}</p>
          ) : (
             p className='text-gray-20 text-xxs'>{date}</p>
          )} */}
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

'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'

import ChatItem from './ChatItem'
import MessageTypeBox from './MessageTypeBox'

import { messageService } from '../service'
import { IMessage } from '../types'
import { ILayoutProps } from '@/shared/types/common.type'
import { EllipsisMenu } from '@/shared/components'
import { PhoneSvg, VideoCameraSvg, SidebarSimpleSvg } from '@/shared/components/Svg'

import * as dotenv from 'dotenv'

dotenv.config()

const backendHostUrl = process.env.NEXT_PUBLIC_BACKEND_HOST_URL
const defaultAvatarUrl = '/images/avatar/default.png'

interface IChat {
  isShow: boolean
  currentChatUserId?: string
}

const Chat: React.FC<IChat> = ({ isShow, currentChatUserId }) => {
  const chatRef = useRef<HTMLDivElement | null>(null)

  const [showScrollDown, setShowScrollDown] = useState(false)
  const [hasMore, setHasMore] = useState(false)
  const [otherPersonName, setOtherPersonName] = useState('')
  const [otherPersonAvatarUrl, setOtherPersonAvatarUrl] = useState('')
  const [messages, setMessages] = useState<IMessage[]>([])


  const offsetRef = useRef(0)
  const previousScrollHeightRef = useRef(0)
  const isLoadingMoreRef = useRef(false)
  const limit = 10

  const getInitialData = async () => {
    if (!currentChatUserId) return

    offsetRef.current = 0

    const response = await messageService.getMessagesByUserId({
      otherPersonId: currentChatUserId,
      offset: offsetRef.current,
      limit,
    })

    setOtherPersonName(response.otherPersonFullname)
    setOtherPersonAvatarUrl(response.otherPersonAvatarUrl)
    setMessages(response.messages)
    setHasMore(response.messages.length !== response.totalMessageCount)
  }

  const getMoreData = async () => {
    if (!currentChatUserId || isLoadingMoreRef.current) return

    isLoadingMoreRef.current = true
    offsetRef.current = messages.length

    const response = await messageService.getMessagesByUserId({
      otherPersonId: currentChatUserId,
      offset: offsetRef.current,
      limit,
    })

    setMessages((prev) => [...response.messages, ...prev])
    setHasMore((messages.length + response.messages.length) < response.totalMessageCount)
    isLoadingMoreRef.current = false
  }

  useEffect(() => {
    const container = chatRef.current
    if (!container) return

    getInitialData()
    previousScrollHeightRef.current = container.scrollHeight
  }, [currentChatUserId])

  const handleScroll = async () => {
    const container = chatRef.current
    if (!container) return

    const { scrollTop, scrollHeight, clientHeight } = container
    setShowScrollDown(scrollTop < scrollHeight - clientHeight - 100)

    if (scrollTop === 0 && hasMore && !isLoadingMoreRef.current) {
      previousScrollHeightRef.current = scrollHeight
      await getMoreData()
    }
  }

  useEffect(() => {
    const container = chatRef.current
    if (!container) return

    if (messages.length > 0 && hasMore) {
      container.scrollTop = container.scrollHeight - previousScrollHeightRef.current
    } else if (messages.length <= 10) {
      container.scrollTop = container.scrollHeight
    }
  }, [messages])

  useEffect(() => {
    const container = chatRef.current
    if (container) {
      container.addEventListener('scroll', handleScroll)
      return () => container.removeEventListener('scroll', handleScroll)
    }
  }, [messages, hasMore])

  if (!currentChatUserId) {
    return (
      <div className='relative flex flex-[2] flex-col justify-center items-center h-full bg-gray-bg-subtle rounded-20'>
        <h2 className='text-5xl font-semibold text-black mb-6 z-10'><span className='text-gray-30'>Hello, </span>COA-CH!</h2>
        <p className='text-gray-30 text-2xl mb-14 z-10'>Start chatting now with your connections and enjoy seamless conversations.</p>
        <button className='px-6 py-2 bg-green text-black rounded-full hover:bg-green-400 transition z-10'>
          Find someone to chat with
        </button>
      </div>
    )
  }

  return (
    <div className='relative flex flex-col flex-[2] h-full p-4 bg-gray-bg-subtle rounded-20'>
      {/* CONTENT HEADER */}
      <div className='absolute top-0 left-0 right-0 flex justify-between items-center h-19.5 px-4 bg-white border-stroke border-t border-x rounded-t-20 z-10'>
        <div className='flex justify-start items-center gap-3.5'>
          <div className='relative w-11.5 h-11.5 rounded-full'>
            {
              otherPersonAvatarUrl !== '' ? (
                <Image
                  src={backendHostUrl + otherPersonAvatarUrl}
                  alt={`${otherPersonName} avatar`}
                  width={46}
                  height={46}
                  className='w-full h-full rounded-full'
                />
              ) : (
                <Image
                  src={defaultAvatarUrl}
                  alt={`${otherPersonName} avatar`}
                  width={46}
                  height={46}
                  className='w-full h-full rounded-full'
                />
              )
            }
          </div>
          <div className='flex flex-col items-start'>
            <p className='text-black font-medium'>{otherPersonName}</p>
            <p className='text-gray-20 text-sm'>last seen recently</p>
          </div>
        </div>
        <div className='flex justify-end items-center gap-2.5'>
          <SvgWrapper>
            <PhoneSvg width='20' height='20' color='#4D5260' />
          </SvgWrapper>
          <SvgWrapper>
            <VideoCameraSvg width='20' height='20' color='#4D5260' />
          </SvgWrapper>
          <SvgWrapper>
            <SidebarSimpleSvg width='20' height='20' color='#4D5260' />
          </SvgWrapper>
          <EllipsisMenu menus={[]} />
        </div>
      </div>

      {/* MESSAGE CONTENT */}
      <div className='relative flex flex-col w-full h-full px-4 pt-19.5'>
        <div ref={chatRef} className='flex flex-1 flex-col gap-4 pb-4 overflow-y-auto no-scrollbar'>
          {isLoadingMoreRef.current && (
            <div className="text-gray-20 text-xs text-center">Loading more...</div>
          )}
          {messages.map((message, index) => (
            <ChatItem key={index} message={message} />
          ))}
        </div>
        <div className='flex w-full'>
          <MessageTypeBox />
        </div>
      </div>
    </div>
  )
}

const SvgWrapper: React.FC<ILayoutProps> = ({ children }) => {
  return (
    <div className='flex justify-center items-center w-9 h-9 bg-gray-bg-subtle rounded-full'>
      {children}
    </div>
  )
}

export default Chat

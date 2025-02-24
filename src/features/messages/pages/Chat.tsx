'use client'

import Image from 'next/image'
import {
  useEffect,
  useRef,
  useState
} from 'react'

import ChatItem from './ChatItem'
import MessageTypeBox from './MessageTypeBox'

import { EllipsisMenu } from '@/shared/components'
import { BACKEND_HOST_URL } from '@/shared/constants'
import { ILayoutProps } from '@/shared/types'
import { useCall, useWebSocket, useAuth } from '@/shared/provider'
import { useChatUsersContext } from '../providers/chatusers.provider'
import {
  PhoneSvg,
  VideoCameraSvg,
  SidebarSimpleSvg
} from '@/shared/components/Svg'
import { useChat } from '../providers/chat.provider'

const defaultAvatarUrl = '/images/user/user-09.png'

interface IChat {
  isShow: boolean
}

const Chat: React.FC<IChat> = ({ isShow }) => {

  const websocketService = useWebSocket()

  const { currentChatUserId } = useChatUsersContext()
  
  const {
    messages,
    setMessages,
    getInitialData,
    getMoreData,
    otherPersonAvatarUrl,
    otherPersonName,
    sendMessage,
    startCall,
    isLoadingMoreRef,
    hasMoreRef,
  } = useChat()

  const chatRef = useRef<HTMLDivElement | null>(null)

  const [showScrollDown, setShowScrollDown] = useState(false)
  const previousScrollHeightRef = useRef(0)

  // <------------- HANDLE DATA -------------->
  useEffect(() => {
    const container = chatRef.current
    if (!container) return

    if (currentChatUserId) {
      getInitialData()
    }

    previousScrollHeightRef.current = container.scrollHeight
  }, [currentChatUserId])

  // <-------------- HANDLE SCROLL ----------------->
  
  useEffect(() => {
    const container = chatRef.current
    if (!container) return

    if (messages.length > 0 && hasMoreRef.current) {
      container.scrollTop = container.scrollHeight - previousScrollHeightRef.current
    } else if (messages.length <= 10) {
      container.scrollTop = container.scrollHeight
    }
  }, [messages, hasMoreRef])

  const scrollListenerAttached = useRef<boolean>(false)

  useEffect(() => {  
    const handleScroll = async () => {
      const container = chatRef.current
      if (!container) return
  
      const { scrollTop, scrollHeight, clientHeight } = container
      setShowScrollDown(scrollTop < scrollHeight - clientHeight - 100)
  
      if (scrollTop === 0 && hasMoreRef.current && !isLoadingMoreRef.current) {
        previousScrollHeightRef.current = scrollHeight
        await getMoreData()
      }
    }

    const container = chatRef.current
    if (container && !scrollListenerAttached.current) {
      container.addEventListener('scroll', handleScroll)
      scrollListenerAttached.current = true
    }
    return () => {
      if (container && scrollListenerAttached.current) {
        container.removeEventListener('scroll', handleScroll)
        scrollListenerAttached.current = false
      }
    }
  }, [hasMoreRef, currentChatUserId, messages.length, scrollListenerAttached])

  const handleScrollOnMessageReceived = () => {
    const container = chatRef.current
    if (container) {
      const isAtBottom = container.scrollTop < container.clientHeight + 10
      if (isAtBottom) {
        container.scrollTop = container.scrollHeight
      }
    }
  }

  // <------------- HANDLE SOCKET ------------->
  useEffect(() => {
    const handleMessageReceived = (data: any) => {
      if (data.message) {
        setMessages((prev) => [data.message, ...prev])
      }
      handleScrollOnMessageReceived()
    }
    websocketService.registerOnMessageHandler('chat', handleMessageReceived)

    return () => {
      websocketService.unRegisterOnMessageHandler('chat', handleMessageReceived)
    }
  }, [])
  
  // <------------ FALLBACK SHOW ------------->
  if (currentChatUserId === null || currentChatUserId === undefined) {
    return (
      <div className='relative flex flex-[2] flex-col justify-center items-center h-full bg-gray-bg-subtle rounded-20'>
        <h2 className='text-5xl font-semibold text-black mb-6 z-10'><span className='text-gray-30'>Hello, </span>COA-CH!</h2>
        <p className='text-gray-30 text-2xl mb-14 z-10'>Start chatting now with your connections and enjoy seamless conversations.</p>
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
              currentChatUserId === null || currentChatUserId === undefined ? (
                <div className='w-12 h-12 bg-white rounded-full border-2 border-stroke'></div>
              ) : (
                  (otherPersonAvatarUrl && otherPersonAvatarUrl.trim() !== '') ? (
                    <Image
                      src={BACKEND_HOST_URL + otherPersonAvatarUrl}
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
              )
            }
          </div>
          <div className='flex flex-col items-start'>
            <p className='text-black font-medium'>{otherPersonName}</p>
            {
              ( currentChatUserId !== null && currentChatUserId !== undefined ) ? (
                <p className='text-gray-20 text-sm'>last seen recently</p>
              ) : (
                <p className='text-gray-20 text-sm'>Select or Search a user to chat with</p>
              )
            }
          </div>
        </div>
        <div className='flex justify-end items-center gap-2.5'>
          <SvgWrapper onClick={startCall}>
            <PhoneSvg width='20' height='20' color='#4D5260' />
          </SvgWrapper>
          <SvgWrapper onClick={startCall}>
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
            <div className='text-gray-20 text-xs text-center'>Loading more...</div>
          )}
          {[...messages].reverse().map((message, index) => (
            <ChatItem key={index} message={message} />
          ))}
        </div>
        <div className='flex w-full'>
          <MessageTypeBox sendMessage={sendMessage} />
        </div>
      </div>
    </div>
  )
}

interface ISvgWrapperProps extends ILayoutProps {
  onClick?: () => void
}

const SvgWrapper: React.FC<ISvgWrapperProps> = ({ children, onClick }) => {
  return (
    <div
      className='flex justify-center items-center w-9 h-9 bg-gray-bg-subtle rounded-full'
      onClick={onClick}
    >
      {children}
    </div>
  )
}

export default Chat

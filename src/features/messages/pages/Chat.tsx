'use client'

import Image from 'next/image'
import {
  useCallback,
  useEffect,
  useRef,
  useState
} from 'react'

import ChatItem from './ChatItem'
import MessageTypeBox from './MessageTypeBox'

import { EllipsisMenu } from '@/shared/components'
import { BACKEND_HOST_URL, DEFAULT_AVATAR_URL } from '@/shared/constants'
import { ILayoutProps } from '@/shared/types'
import { useWebSocket } from '@/shared/provider'
import { useChatUsersContext } from '../providers/chatusers.provider'
import {
  PhoneSvg,
  VideoCameraSvg,
  SidebarSimpleSvg
} from '@/shared/components/Svg'
import { useChat } from '../providers/chat.provider'
import { messageService } from '../service'

interface IChat {
  isShow: boolean
}

const Chat: React.FC<IChat> = ({ isShow }) => {

  const websocketService = useWebSocket()

  const {
    currentChatUserId,
    contactUsers,
    fetchContacts,
  } = useChatUsersContext()

  const {
    messages,
    setMessages,
    // getInitialData,
    fetchMessages,
    otherPersonAvatarUrl,
    otherPersonName,
    sendMessage,
    startCall,
    isLoadingMoreRef,
    hasMoreRef,
  } = useChat()

  const chatRef = useRef<HTMLDivElement | null>(null)
  const messagesUpdateReasonRef = useRef<string>('initial-loading')

  const [showScrollDown, setShowScrollDown] = useState(false)
  const previousScrollHeightRef = useRef(0)

  // <------------- FETCHING DATA -------------->
  const fetchInitialData = useCallback(async () => {
    messagesUpdateReasonRef.current = 'initial-loading'
    await fetchMessages(true)

    // mark unread messages as read
    const currentChatUser = contactUsers.find(user => user.id === currentChatUserId)
    if (currentChatUser?.unreadCount) {
      const res = await messageService.markMessagesAsRead({
        // NOTE: assertion is safe because it is checked before the function is used
        otherPersonId: currentChatUserId!,
      })
      if (res.status === 200) {
        fetchContacts()
      }
    }

    // handle scroll position
    const container = chatRef.current
    if (!container) return
    const { scrollTop, scrollHeight, clientHeight } = container
    if (scrollHeight > clientHeight) {
      container.scrollTop = scrollHeight - clientHeight
    }
  }, [
    fetchMessages,
    chatRef.current,
    contactUsers,
    messageService,
    messagesUpdateReasonRef
  ])

  useEffect(() => {
    const container = chatRef.current
    if (!container) return

    if (currentChatUserId) {
      fetchInitialData()
    }
  }, [currentChatUserId])

  const fetchMoreData = useCallback(async () => {
    messagesUpdateReasonRef.current = 'load-more'
    await fetchMessages(false)
  }, [fetchMessages, messagesUpdateReasonRef])

  // <-------------- HANDLE SCROLL ----------------->
  const handleScrollPosition = useCallback(() => {
    const container = chatRef.current
    if (!container) return

    const { scrollTop, scrollHeight, clientHeight } = container

    if (messagesUpdateReasonRef.current === 'initial-loading') {
      container.scrollTop = scrollHeight - clientHeight
      messagesUpdateReasonRef.current = 'websocket'
    } else if (messagesUpdateReasonRef.current === 'load-more') {
      container.scrollTop = scrollHeight - previousScrollHeightRef.current - 10
      messagesUpdateReasonRef.current = 'websocket'
    } else {
      if (scrollTop > scrollHeight - clientHeight - 100) {
        container.scrollTop = scrollHeight - clientHeight
      }
    }
  }, [
    chatRef.current,
    messagesUpdateReasonRef.current,
    previousScrollHeightRef.current
  ])

  useEffect(() => {
    handleScrollPosition()
  }, [messages, handleScrollPosition])

  const scrollListenerAttached = useRef<boolean>(false)

  const handleScroll = useCallback(async () => {
    const container = chatRef.current
    if (!container) return

    const { scrollTop, scrollHeight, clientHeight } = container

    // TODO: set only when its value needs to be changed
    setShowScrollDown(scrollTop < scrollHeight - clientHeight - 100)

    if (scrollTop === 0 && hasMoreRef.current && !isLoadingMoreRef.current) {
      previousScrollHeightRef.current = scrollHeight
      await fetchMoreData()
    }
  }, [
    chatRef.current,
    hasMoreRef.current,
    previousScrollHeightRef.current,
    isLoadingMoreRef.current,
    fetchMoreData
  ])

  // Attach scroll listener
  useEffect(() => {
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
  }, [chatRef.current, scrollListenerAttached, handleScroll])

  // <------------- HANDLE SOCKET ------------->
  useEffect(() => {
    const handleMessageReceived = (data: any) => {
      if (data.message) {
        setMessages((prev) => [data.message, ...prev])
      }
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
                    src={DEFAULT_AVATAR_URL}
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
              (currentChatUserId !== null && currentChatUserId !== undefined) ? (
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

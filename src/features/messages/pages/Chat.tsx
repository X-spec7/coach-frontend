'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Image from 'next/image'

import ChatItem from './ChatItem'
import MessageTypeBox from './MessageTypeBox'

import { messageService } from '../service'
import { IMessage } from '../types'
import { ILayoutProps } from '@/shared/types/common.type'
import { EllipsisMenu } from '@/shared/components'
import { PhoneSvg, VideoCameraSvg, SidebarSimpleSvg } from '@/shared/components/Svg'
import { IContactUser } from '../types'

import * as dotenv from 'dotenv'
import authorizedHttpServer from '@/shared/services/authorizedHttp'
import tokenUtil from '../utils/tokenUtils'
import ApiEndpoints from '../api/apiEndPoints'
import Constants from '../lib/constants'
import SocketActions from '../types/socketActions'
import { SendButton } from '@/shared/components/Button'
import { EmotiSmileSvg, PaperClipSvg } from '@/shared/components/Svg'

dotenv.config()

const backendHostUrl = process.env.NEXT_PUBLIC_BACKEND_HOST_URL
const wsHostUrl = process.env.NEXT_PUBLIC_WS_BASE_URL
const defaultAvatarUrl = '/images/avatar/default.png'

interface IChat {
  isShow: boolean
  currentChatUserId?: string
  setOnlineUserList: (obj: any[]) => void
  searchResult?: any[]
  currentChattingMember: any
}

let socket = new WebSocket(
  `${wsHostUrl}/ws/users/${tokenUtil.getUserId()}/chat/`
)
let typingTimer = 0
let isTypingSignalSent = false

const Chat: React.FC<IChat> = ({ isShow, currentChatUserId, searchResult, currentChattingMember, setOnlineUserList }) => {
  const chatRef = useRef<HTMLDivElement | null>(null)

  const [showScrollDown, setShowScrollDown] = useState(false)
  const [hasMore, setHasMore] = useState(false)
  const [otherPersonName, setOtherPersonName] = useState('')
  const [otherPersonAvatarUrl, setOtherPersonAvatarUrl] = useState('')
  const [messages, setMessages] = useState<any[]>([])
  const [inputMessage, setInputMessage] = useState<string>('')
  // input Message
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const previousScrollHeightRef = useRef(0)
  const isLoadingMoreRef = useRef(false)

  console.log('current chatting member in chatting: ', currentChattingMember)

  useEffect(() => {
    adjustHeight()
  }, [inputMessage])

  const adjustHeight = () => {
    const textarea = textareaRef.current
    if (textarea) {
      textarea.style.height = 'auto'
      textarea.style.height = `${Math.min(textarea.scrollHeight, 150)}px`
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      messageSubmitHandler()
    }
  }

  const fetchChatMessage = async () => {
    const currentChatId = currentChattingMember.roomId
    if (currentChatId) {
      const url = ApiEndpoints.CHAT_MESSAGE_URL.replace(
        Constants.CHAT_ID_PLACE_HOLDER, currentChatId
      ) + "?limit=20&offset=0"
      const chatMessages = await authorizedHttpServer.get(url)
        .then((res) => res.data)
        .catch((err) => err)

      setOtherPersonName(currentChattingMember.name)
      if (currentChattingMember.image && currentChattingMember.image.trim() === '') {
        setOtherPersonAvatarUrl(currentChattingMember.image)
      }
      setMessages(chatMessages.results)
      setHasMore(chatMessages.count)
    }
  }

  useEffect(() => {
    const container = chatRef.current
    if (!container) return

    if (currentChattingMember?.roomId && currentChattingMember.roomId.trim() !== '') {
      fetchChatMessage()
    }
    previousScrollHeightRef.current = container.scrollHeight
  }, [currentChattingMember, currentChatUserId])

  socket.onmessage = (event) => {
    const data = JSON.parse(event.data)
    console.log('on message data: ', data)

    const chatId = currentChattingMember.roomId
    const userId = tokenUtil.getUserId()

    if (data.action === SocketActions.MESSAGE) {
      setMessages((prev) => [
        ...prev,
        data,
      ])
    }
    
    if (data.action === SocketActions.ONLINE_USER) {
      setOnlineUserList(data.userList)
    }
  }

  const messageSubmitHandler = () => {
    
    if (inputMessage) {
      socket.send(
        JSON.stringify({
          action: SocketActions.MESSAGE,
          message: inputMessage,
          user: tokenUtil.getUserId(),
          roomId: currentChattingMember.roomId
        })
      )
    }
    console.log('sent message')
    setInputMessage("")
  }

  const sendTypingSignal = (typing: any) => {
    socket.send(
      JSON.stringify({
        action: SocketActions.TYPING,
        typing: typing,
        user: tokenUtil.getUserId(),
        roomId: currentChattingMember.roomId,
      })
    )
  }

  const handleScroll = async () => {
    const container = chatRef.current
    if (!container) return

    const { scrollTop, scrollHeight, clientHeight } = container
    setShowScrollDown(scrollTop < scrollHeight - clientHeight - 100)

    if (scrollTop === 0 && hasMore && !isLoadingMoreRef.current) {
      previousScrollHeightRef.current = scrollHeight
      fetchChatMessage()
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

  if (currentChatUserId === null || currentChatUserId === undefined || currentChatUserId === '') {
    return (
      <div className='relative flex flex-[2] flex-col justify-center items-center h-full bg-gray-bg-subtle rounded-20'>
        <h2 className='text-5xl font-semibold text-black mb-6 z-10'><span className='text-gray-30'>Hello, </span>COA-CH!</h2>
        <p className='text-gray-30 text-2xl mb-14 z-10'>Start chatting now with your connections and enjoy seamless conversations.</p>
        <button className='px-6 py-2 bg-green text-black rounded-full hover:bg-green-400 transition z-10' onClick={() => {}}>
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
              otherPersonAvatarUrl !== null && otherPersonAvatarUrl.trim() !== '' ? (
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
            <ChatItem key={index} socketData={message} />
          ))}
        </div>
        <div className='flex w-full'>
           
          <div className='flex justify-between items-end w-full p-2.5 bg-white rounded-20'>
            <div className='flex flex-1 justify-start items-end gap-2 bg-[#FFFFFF] p-4'>
              <EmotiSmileSvg
                width='24'
                height='24'
                color='#4D5260'
              />
              <textarea
                ref={textareaRef}
                className='flex-1 resize-none border-none outline-none rounded-lg px-3 text-sm focus:outline-none focus:border-transparent overflow-hidden'
                rows={1}
                placeholder='Type a message...'
                value={inputMessage}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setInputMessage(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <PaperClipSvg
                width='18'
                height='18'
                color='#4D5260'
              />
            </div>

            <div className='mb-2'>
              <SendButton
                title='Send'
                width='w-24'
                height='h-9.5'
                onClick={messageSubmitHandler}
              />
            </div>
          </div>
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

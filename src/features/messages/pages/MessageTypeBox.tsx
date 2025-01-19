'use client'

import { SendButton } from '@/shared/components/Button'
import { EmotiSmileSvg, PaperClipSvg } from '@/shared/components/Svg'
import { useEffect, useRef, useState } from 'react'

interface MessageTypeBoxProps {
  websocket?: WebSocket | null
}

const MessageTypeBox: React.FC<MessageTypeBoxProps> = ({ websocket }) => {
  const [message, setMessage] = useState('')
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    adjustHeight()
  }, [message])

  const adjustHeight = () => {
    const textarea = textareaRef.current
    if (textarea) {
      textarea.style.height = 'auto'
      textarea.style.height = `${Math.min(textarea.scrollHeight, 150)}px`
    }
  }

  const onClick = () => {
    if (message.trim() === '') {
      alert('Please enter a message before sending.')      
      return
    }

    if (!websocket) {
      return
    }

    if (websocket && message.trim()) {
      websocket.send(
        JSON.stringify({
          message: message,
          type: 'chat',
        })
      );
      setMessage('')
    }

    console.log('Message sent:', message)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      onClick()
    }
  }

  return (
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
          value={message}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setMessage(e.target.value)}
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
          onClick={onClick}
        />
      </div>
    </div>
  )
}

export default MessageTypeBox

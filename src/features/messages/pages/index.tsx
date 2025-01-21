'use client'

import { useState } from 'react'
import Chat from './Chat'
import Users from './Users'

const MessagesPage = () => {
  const [display, setDisplay] = useState<'Users' | 'Chat'>('Chat')
  const [currentChatUserId, setCurrentChatUserId] = useState<number>()

  return (
    <div className='flex h-230 p-4 gap-4 bg-white rounded-4xl'>
      <Users
        isShow={display === 'Users'}
        setCurrentChatUserId={setCurrentChatUserId}
        currentChatUserId={currentChatUserId}
      />
      <Chat
        isShow={display === 'Chat'}
        currentChatUserId={currentChatUserId}
      />
    </div>
  )
}

export default MessagesPage

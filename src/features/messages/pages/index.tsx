'use client'

import { useEffect, useState } from 'react'
import Chat from './Chat'
import Users from './Users'
import { IContactUser } from '../types'

const MessagesPage = () => {
  const [display, setDisplay] = useState<'Users' | 'Chat'>('Chat')
  const [currentChatUserId, setCurrentChatUser] = useState<string>()
  const [searchResult, setSearchResult] = useState<IContactUser[]>([])

  return (
    <div className='flex h-230 p-4 gap-4 bg-white rounded-4xl'>
      <Users
        isShow={display === 'Users'}
        setCurrentChatUser={setCurrentChatUser}
        setSearchResult={setSearchResult}
        currentChatUserId={currentChatUserId}
      />
      <Chat
        isShow={display === 'Chat'}
        currentChatUserId={currentChatUserId}
        searchResult={searchResult}
      />
    </div>
  )
}

export default MessagesPage

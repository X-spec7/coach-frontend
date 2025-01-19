'use client'

import { useEffect, useState } from 'react'
import Chat from './Chat'
import Users from './Users'
import { IContactUser } from '../types'

const MessagesPage = () => {
  const [display, setDisplay] = useState<'Users' | 'Chat'>('Chat')
  const [currentChatUserId, setCurrentChatUser] = useState<string>()
  const [searchResult, setSearchResult] = useState<IContactUser[]>([])
  const [onlineUserList, setOnlineUserList] = useState<IContactUser[]>([])
  const [currentChattingMember, setCurrentChattingMember] = useState({});

  return (
    <div className='flex h-230 p-4 gap-4 bg-white rounded-4xl'>
      <Users
        isShow={display === 'Users'}
        setCurrentChatUser={setCurrentChatUser}
        setSearchResult={setSearchResult}
        currentChatUserId={currentChatUserId}
        onlineUserList={onlineUserList}
      />
      <Chat
        isShow={display === 'Chat'}
        currentChatUserId={currentChatUserId}
        searchResult={searchResult}
        // setOnlineUserList={setOnlineUserList}
        // currentChattingMember={currentChattingMember}
      />
    </div>
  )
}

export default MessagesPage

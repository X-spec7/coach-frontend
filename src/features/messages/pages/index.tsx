'use client'

import { useEffect, useState } from 'react'
import Chat from './Chat'
import Users from './Users'
import { IContactUser } from '../types'

const MessagesPage = () => {
  const [display, setDisplay] = useState<'Users' | 'Chat'>('Chat')
  const [currentChatUser, setCurrentChatUser] = useState<string>()
  const [searchResult, setSearchResult] = useState<IContactUser[]>([])
  const [onlineUserList, setOnlineUserList] = useState<any[]>([])
  const [currentChattingMember, setCurrentChattingMember] = useState({});

  useEffect(() => {
    console.log("current onlineUserList ---->", onlineUserList)
  }, [currentChatUser])

  useEffect(() => {
    console.log("currentChattingMember----->", currentChattingMember)
  }, [currentChattingMember])

  return (
    <div className='flex h-230 p-4 gap-4 bg-white rounded-4xl'>
      <Users
        isShow={display === 'Users'}
        setCurrentChatUser={setCurrentChatUser}
        setSearchResult={setSearchResult}
        currentChatUserId={currentChatUser}
        onlineUserList={onlineUserList}
        setCurrentChattingMember={setCurrentChattingMember}
      />
      <Chat
        isShow={display === 'Chat'}
        currentChatUserId={currentChatUser}
        searchResult={searchResult}
        setOnlineUserList={setOnlineUserList}
        currentChattingMember={currentChattingMember}
      />
    </div>
  )
}

export default MessagesPage

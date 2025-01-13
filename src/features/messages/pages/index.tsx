'use client'

import { useState } from 'react'
import Chat from './Chat'
import Users from './Users'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

interface IMessagesPageProps {
  currentChatUserId?: string
}

const MessagesPage: React.FC<IMessagesPageProps> = ({ currentChatUserId }) => {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()

  const [display, setDisplay] = useState<'Users' | 'Chat'>('Chat')

  const setCurrentChatUser = (userId: string) => {
    const params = new URLSearchParams(searchParams)

    if (userId) {
      params.set('currentChatUserId', userId)
    } else {
      params.delete('currentChatUserId')
    }
    replace(`${pathname}?${params.toString()}`)
  }

  return (
    <div className='flex h-230 p-4 gap-4 bg-white rounded-4xl'>
      <Users
        isShow={display === 'Users'}
        setCurrentChatUser={setCurrentChatUser}
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

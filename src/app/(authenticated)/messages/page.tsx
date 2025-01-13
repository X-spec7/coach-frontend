import React from 'react'
import { Metadata } from 'next'
import MessagesPage from '@/features/messages/pages'

export const metadata: Metadata = {
  title:
    "Messages | COA-CH",
  description: "This is Messages for COA-CH",
}

const Messages: React.FC = async (props: {
  searchParams?: Promise<{currentChatUserId?: string}>;
}) => {
  const searchParams = await props.searchParams
  const currentChatUserId = searchParams?.currentChatUserId

  return (
    <MessagesPage currentChatUserId={currentChatUserId} />
  )
}

export default Messages

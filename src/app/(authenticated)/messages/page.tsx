import React from 'react'
import { Metadata } from 'next'
import MessagesPage from '@/features/messages/pages'

export const metadata: Metadata = {
  title:
    "Messages | COA-CH",
  description: "This is Messages for COA-CH",
}

const Messages: React.FC = () => {
  return (
    <MessagesPage />
  )
}

export default Messages

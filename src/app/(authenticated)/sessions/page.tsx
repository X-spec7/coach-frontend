import React from 'react'
import { Metadata } from 'next'
import SessionsListPage from '@/features/sessions'

export const metadata: Metadata = {
  title:
    "Sessions | COA-CH",
  description: "This is Sessions Page for COA-CH",
}

const Page = () => {
  return (
    <SessionsListPage />
  )
}

export default Page

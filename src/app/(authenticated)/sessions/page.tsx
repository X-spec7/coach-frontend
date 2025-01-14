import React from 'react'
import { Metadata } from 'next'
import SessionsListPage from '@/features/sessions'

export const metadata: Metadata = {
  title:
    "Sessions | COA-CH",
  description: "This is Sessions Page for COA-CH",
}

const Page: React.FC = async (props: {
  searchParams?: Promise<{
    query?: string
    currentPage?: number
    goal?: string
    booked?: boolean
  }>
}) => {
  const searchParams = await props.searchParams
  const query = searchParams?.query || ''
  const currentPage = searchParams?.currentPage ?? 1
  const goal = searchParams?.goal || ''
  const booked = searchParams?.booked ?? false

  return (
    <SessionsListPage
      
    />
  )
}

export default Page

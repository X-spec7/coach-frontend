'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSelector } from 'react-redux'

import { useAppDispatch } from '@/redux/hook'
import { DefaultLayout } from '@/shared/Layouts'
import Loader from '@/shared/components/Loader'
import { ILayoutProps } from '@/shared/types/common.type'
import { getProfileAsync, selectUser } from '@/features/user/slice/userSlice'
import { WebSocketProvider } from '@/shared/provider'

const Layout: React.FC<ILayoutProps> = ({ children }) => {
  const router = useRouter()
  const user = useSelector(selectUser)
  
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getProfileAsync())
  }, [dispatch])

  const [isUserProfileLoaded, setIsUserProfileLoaded] = useState(() => !!(user && user.firstName !== ''))

  useEffect(() => {
    setIsUserProfileLoaded(!!(user && user.id && user.firstName !== ''))
  }, [user])

  const [token, setToken] = useState<string | null>()

  useEffect(() => {
    const token = localStorage.getItem('access_token')
    setToken(token)
    if (!token) {
      router.push('/signin')
    }
  }, [router])

  if (token === null) {
    return (
      <></>
    )
  }

  if (!isUserProfileLoaded) {
    dispatch(getProfileAsync())
    
    return (
      <Loader />
    )
  }

  return (
    <DefaultLayout>
      <WebSocketProvider userId={user.id!}>
        {children}
      </WebSocketProvider>
    </DefaultLayout>
  )
}

export default Layout

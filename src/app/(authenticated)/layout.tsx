'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { DefaultLayout } from '@/shared/Layouts'
import Loader from '@/shared/components/Loader'
import { ILayoutProps } from '@/shared/types/common.type'
import { getProfileAsync, selectUser } from '@/features/user/slice/userSlice'
import { useSelector } from 'react-redux'
import { useAppDispatch } from '@/redux/hook'

const Layout: React.FC<ILayoutProps> = ({ children }) => {
  const router = useRouter()
  const user = useSelector(selectUser)
  
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getProfileAsync())
  }, [dispatch])

  const [isUserProfileLoaded, setIsUserProfileLoaded] = useState(() => !!(user && user.firstName !== ''))

  useEffect(() => {
    setIsUserProfileLoaded(!!(user && user.firstName !== ''))
  }, [user])

  const [token, setToken] = useState<string | null>()

  useEffect(() => {
    const token = localStorage.getItem('access_token')
    setToken(token)
    if (!token) {
      // Redirect to SignIn page if there's no token
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
      {children}
    </DefaultLayout>
  )
}

export default Layout
